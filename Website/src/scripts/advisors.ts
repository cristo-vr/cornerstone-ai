/**
 * /advisors: the video, the application, the calendar.
 *
 * Every request and every event goes through ./funnel-client (dry run unless
 * PUBLIC_FUNNEL_LIVE=1). The questions come from ../lib/advisor-questions; the
 * gates are run here only to pick the next screen, Mason runs them again.
 */

import { DIAL_CODES, toE164 } from "../lib/dial-codes";
import { QUESTIONS, TOTAL_STEPS, DISQUALIFY_COPY, gate, summarise, type DisqualifyReason } from "../lib/advisor-questions";
import { CONTACT_EMAIL, FUNNEL, VSL_VERSION } from "../lib/advisors-config";
import { trackRetention } from "./vsl-retention";
import {
  BookError,
  cal,
  flush,
  lead as leadApi,
  linkedin,
  mountTurnstile,
  pixel,
  setFunnel,
  setLeadId,
  store,
  takeToken,
  track,
} from "./funnel-client";

setFunnel(FUNNEL);

const EMAIL_RE = /^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}$/i;
const HLS_JS = "https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js";
const LEAD_KEY = "cs_adv_lead";
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const arrow = '<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>';

const params = new URLSearchParams(location.search);
const referrerHost = (() => {
  try {
    return document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    return "";
  }
})();
track("page_view", { referrer_host: referrerHost });

// Visitors on the scoreboard count `engaged`, not page_view (tracking contract): once
// per session, after 5 s visible or on the first scroll, click or play. A page_view on
// its own is a link preview, a bot or a bounce.
(() => {
  const KEY = "cs_adv_engaged";
  try {
    if (sessionStorage.getItem(KEY)) return;
  } catch {
    /* no storage: fire once for this page load */
  }
  let done = false;
  let timer = 0;
  const fire = (via: "time" | "scroll" | "click" | "play") => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    track("engaged", { via });
  };
  const arm = () => {
    clearTimeout(timer);
    if (document.visibilityState === "visible") timer = window.setTimeout(() => fire("time"), 5000);
  };
  arm();
  document.addEventListener("visibilitychange", arm);
  addEventListener("scroll", () => fire("scroll"), { once: true, passive: true });
  addEventListener("pointerdown", () => fire("click"), { once: true });
  document.getElementById("vsl-video")?.addEventListener("play", () => fire("play"), { once: true });
})();

interface Lead {
  id: string;
  token: string;
  status: string;
}
let lead: Lead | null = null;
let videoUnlocked = true;
const unlockWaiters: Array<() => void> = [];

// ─── the video ──────────────────────────────────────────────────────────────

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`could not load ${src}`));
    document.head.appendChild(s);
  });
}

(() => {
  const vsl = document.getElementById("vsl");
  const video = document.getElementById("vsl-video") as HTMLVideoElement | null;
  const start = document.getElementById("vsl-start");
  if (!vsl || !video || !start) return;
  const v = video;
  const player = vsl;
  try {
    trackRetention(v, VSL_VERSION);
  } catch {
    /* retention is optional; the player and form never depend on it */
  }
  const hlsUrl = vsl.dataset.hls || "";
  const mp4Url = vsl.dataset.mp4 || "";
  videoUnlocked = vsl.dataset.gate !== "1";
  const marks = new Set<number>();
  let played = false;

  async function attach(): Promise<void> {
    if (!hlsUrl) {
      v.src = mp4Url;
      return;
    }
    // hls.js wherever Media Source exists; native HLS only on old iOS.
    if ("MediaSource" in window || "ManagedMediaSource" in window) {
      try {
        await loadScript(HLS_JS);
        if (window.Hls?.isSupported()) {
          const hls = new window.Hls({ capLevelToPlayerSize: true, abrEwmaDefaultEstimate: 6_000_000, maxBufferLength: 30 });
          hls.on(window.Hls.Events.ERROR, (_e: unknown, data: { fatal?: boolean }) => {
            if (data?.fatal) {
              hls.destroy();
              v.src = mp4Url;
              v.play().catch(() => {});
            }
          });
          hls.loadSource(hlsUrl);
          hls.attachMedia(v);
          return;
        }
      } catch {
        /* fall through */
      }
    }
    v.src = v.canPlayType("application/vnd.apple.mpegurl") ? hlsUrl : mp4Url;
  }

  // ── the player: one big button, the speeds, one bar ──
  const RATES = [1, 1.2, 1.5, 1.7, 2];
  let rate = 1;
  const resume = $<HTMLButtonElement>("vsl-resume");
  const bar = $("vsl-bar");
  const toggle = $<HTMLButtonElement>("vsl-toggle");
  const seek = $<HTMLInputElement>("vsl-seek");
  const time = $("vsl-time");
  const rateBtn = $<HTMLButtonElement>("vsl-rate");
  let started = false;
  let seeking = false;
  let idleTimer = 0;

  const clock = (t: number) => {
    const s = Math.max(0, Math.floor(t || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  const setRate = (r: number) => {
    rate = r;
    v.defaultPlaybackRate = r;
    v.playbackRate = r;
    const label = `${r}x`;
    rateBtn.textContent = label;
    rateBtn.setAttribute("aria-label", `Playback speed, ${label}`);
  };
  const wake = () => {
    delete player.dataset.idle;
    clearTimeout(idleTimer);
    if (!v.paused) idleTimer = window.setTimeout(() => (player.dataset.idle = ""), 2500);
  };
  const paint = () => {
    const paused = v.paused;
    if (paused) player.dataset.paused = "";
    else delete player.dataset.paused;
    toggle.setAttribute("aria-label", paused ? "Play" : "Pause");
    resume.hidden = !started || !paused || v.ended;
    wake();
  };
  const togglePlay = () => (v.paused ? v.play().catch(() => {}) : v.pause());

  const play = async (r = rate) => {
    started = true;
    start.hidden = true;
    v.hidden = false;
    bar.hidden = false;
    await attach();
    setRate(r);
    v.play().catch(() => {
      /* autoplay refused: the big button shows, one more tap plays */
      paint();
    });
  };

  const begin = (r?: number) => {
    if (!videoUnlocked) {
      // Gated: the name and email step comes first, then the video plays.
      $("vsl-gate-note").hidden = false;
      $("apply").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => $<HTMLInputElement>("ax-name").focus({ preventScroll: true }), 400);
      unlockWaiters.push(() => {
        vsl.scrollIntoView({ behavior: "smooth", block: "center" });
        void play(r);
      });
      return;
    }
    void play(r);
  };

  $("vsl-play").addEventListener("click", () => begin());
  start.querySelectorAll<HTMLButtonElement>("[data-rate]").forEach((b) =>
    b.addEventListener("click", () => begin(Number(b.dataset.rate))),
  );

  resume.addEventListener("click", () => v.play().catch(() => {}));
  toggle.addEventListener("click", togglePlay);
  rateBtn.addEventListener("click", () => setRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length]));
  // Tapping the picture pauses. On a phone the first tap only brings the bar back.
  v.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "mouse" && player.dataset.idle !== undefined) return wake();
    togglePlay();
  });
  player.addEventListener("pointermove", wake);

  seek.addEventListener("input", () => {
    seeking = true;
    seek.style.setProperty("--p", `${Number(seek.value) / 10}%`);
    if (v.duration) time.textContent = clock((Number(seek.value) / 1000) * v.duration);
  });
  seek.addEventListener("change", () => {
    if (v.duration) v.currentTime = (Number(seek.value) / 1000) * v.duration;
    seeking = false;
  });
  v.addEventListener("timeupdate", () => {
    if (seeking || !v.duration || !Number.isFinite(v.duration)) return;
    const f = v.currentTime / v.duration;
    seek.value = String(Math.round(f * 1000));
    seek.style.setProperty("--p", `${f * 100}%`);
    time.textContent = `${clock(v.currentTime)} / ${clock(v.duration)}`;
  });
  // A new source resets the speed; keep the one they picked.
  v.addEventListener("loadedmetadata", () => {
    if (v.playbackRate !== rate) v.playbackRate = rate;
  });
  for (const ev of ["play", "pause", "ended"]) v.addEventListener(ev, paint);

  $("vsl-full").addEventListener("click", () => {
    const iosVideo = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (player.requestFullscreen) player.requestFullscreen().catch(() => iosVideo.webkitEnterFullscreen?.());
    else iosVideo.webkitEnterFullscreen?.();
  });

  player.addEventListener("keydown", (e) => {
    if (!started || (e.target as HTMLElement).tagName === "INPUT") return;
    if (e.key === " " || e.key === "k") {
      if ((e.target as HTMLElement).tagName === "BUTTON" && e.key === " ") return;
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      v.currentTime = Math.max(0, v.currentTime + (e.key === "ArrowRight" ? 5 : -5));
    }
    wake();
  });

  v.addEventListener("play", () => {
    if (played) return;
    played = true;
    track("video_play");
    pixel("trackCustom", "VideoPlay");
  });

  const mark = (p: 25 | 50 | 75 | 100) => {
    if (marks.has(p)) return;
    marks.add(p);
    track("video_progress", { pct: p, seconds: Math.round(v.currentTime) });
    if (p === 50) pixel("trackCustom", "VideoHalf");
    if (p === 100) {
      pixel("trackCustom", "VideoComplete");
      flush();
    }
  };

  // A threshold counts only when playback runs through it. A jump moves the
  // position without passing anything, so skipping to the middle is not "watched 50%".
  let lastT: number | null = null;
  v.addEventListener("seeking", () => {
    lastT = null;
  });
  v.addEventListener("timeupdate", () => {
    if (!v.duration || !Number.isFinite(v.duration)) return;
    const t = v.currentTime;
    const prev = lastT;
    lastT = t;
    if (prev === null || v.seeking || t <= prev || t - prev >= 3 + v.playbackRate) return;
    const from = (prev / v.duration) * 100;
    const to = (t / v.duration) * 100;
    for (const p of [25, 50, 75] as const) if (from < p && to >= p) mark(p);
    if (from < 99.5 && to >= 99.5) mark(100);
  });

  v.addEventListener("ended", () => {
    if (lastT !== null && v.duration - lastT < 3 + v.playbackRate) mark(100);
    $("apply").scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

// The sticky phone CTA: the form sits right under the video, so the bar shows
// only once the application has scrolled up past the top, and hides again at
// the closing ask.
(() => {
  const sticky = document.getElementById("ax-sticky");
  const apply = document.getElementById("apply");
  const closing = document.getElementById("closing");
  if (!sticky || !apply || !("IntersectionObserver" in window)) return;
  let applyGone = false;
  let closingIn = false;
  // Kept rendered so it can slide; inert while it's off screen.
  const update = () => {
    const on = applyGone && !closingIn;
    sticky.classList.toggle("is-on", on);
    sticky.inert = !on;
  };
  new IntersectionObserver(([e]) => {
    applyGone = !e.isIntersecting && e.boundingClientRect.top < 0;
    update();
  }).observe(apply);
  if (closing)
    new IntersectionObserver(([e]) => {
      closingIn = e.isIntersecting;
      update();
    }).observe(closing);
})();

// Scroll reveals: each [data-ax-rv] block fades up once as it enters. Bare
// pages don't load site.ts, so the page carries its own. ?still shows all.
(() => {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-ax-rv]"));
  const all = () => els.forEach((el) => el.classList.add("is-in"));
  if (params.has("still") || !("IntersectionObserver" in window)) return all();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -5% 0px" },
  );
  els.forEach((el) => io.observe(el));
})();

// What we build: the sticky index marks the part crossing the middle band.
(() => {
  const idx = Array.from(document.querySelectorAll<HTMLElement>("[data-ax-idx]"));
  const parts = Array.from(document.querySelectorAll<HTMLElement>("[data-ax-part]"));
  if (!idx.length || !parts.length || !("IntersectionObserver" in window)) return;
  const on = (i: number) => idx.forEach((el, j) => el.classList.toggle("is-on", j === i));
  on(0);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) on(Number((e.target as HTMLElement).dataset.axPart));
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  parts.forEach((el) => io.observe(el));
})();

// ─── the application ────────────────────────────────────────────────────────

const form = document.getElementById("ax-form") as HTMLFormElement | null;

if (form) {
  const box = $("ax");
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>(".ax-step"));
  const bar = $("ax-bar");
  const progress = $("ax-progress");
  const err = $("ax-error");
  const back = $<HTMLButtonElement>("ax-back");
  const actions = $("ax-actions");
  const next = $<HTMLButtonElement>("ax-next");
  const resumeNote = $("ax-resume");
  const nameEl = $<HTMLInputElement>("ax-name");
  const emailEl = $<HTMLInputElement>("ax-email");
  const bookPanel = $("ax-book");
  const done = $("ax-done");
  const dq = $("ax-dq");
  const tsSlot = $("ax-turnstile");

  const answers: Record<string, string | string[]> = {};
  const multi: Record<string, Set<string>> = {};
  for (const q of QUESTIONS) if (q.kind === "multi") multi[q.key] = new Set();

  let step = 1;
  let busy = false;
  let started = false;
  const shown = new Set<number>();
  let firstName = "";

  const questionAt = (n: number) => QUESTIONS[n - 2];
  const allAnswers = () => {
    const out: Record<string, string | string[]> = { ...answers };
    for (const [k, s] of Object.entries(multi)) out[k] = [...s];
    return out;
  };

  try {
    const saved = JSON.parse(store.get(LEAD_KEY) || "null");
    if (saved?.id && saved?.token) lead = saved;
  } catch {
    /* ignore */
  }
  const urlLead = params.get("l");
  const urlToken = params.get("t");
  if (urlLead && urlToken) lead = { id: urlLead, token: urlToken, status: "partial" };
  const saveLead = () => lead && store.set(LEAD_KEY, JSON.stringify(lead));
  const setLead = (l: Lead) => {
    lead = l;
    setLeadId(l.id);
    saveLead();
    if (!videoUnlocked) {
      videoUnlocked = true;
      $("vsl-gate-note").hidden = true;
      unlockWaiters.splice(0).forEach((w) => w());
    }
  };

  const fail = (msg: string) => {
    err.textContent = msg;
  };

  /** A field's own error, right under it. */
  const fieldError = (el: HTMLInputElement, msg: string) => {
    const hint = $(`${el.id}-err`);
    el.setAttribute("aria-invalid", String(!!msg));
    hint.textContent = msg;
    hint.hidden = !msg;
  };
  for (const el of [nameEl, emailEl]) el.addEventListener("input", () => fieldError(el, ""));

  const buttonLabel = (n: number) => {
    const q = questionAt(n);
    return `${q?.button ?? "Continue"}${arrow}`;
  };

  function show(n: number, focus = true) {
    step = n;
    steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    // Filled by the steps already answered, so step 1 starts empty.
    bar.style.width = `${Math.round(((n - 1) / TOTAL_STEPS) * 100)}%`;
    back.hidden = n <= 1 || (n === 2 && !!lead);
    err.textContent = "";
    const q = questionAt(n);
    next.hidden = !!q?.auto;
    next.innerHTML = buttonLabel(n);
    // Auto advance steps have no buttons: drop the empty row and its space.
    actions.hidden = back.hidden && next.hidden;
    err.style.minHeight = q?.auto ? "0" : "";
    resumeNote.hidden = Number(resumeNote.dataset.keep || 0) !== n;
    // Step 1 is on screen for every visitor; it counts once they touch it.
    if (!shown.has(n) && (n > 1 || started)) {
      shown.add(n);
      track("form_step", { step: n, key: q?.key ?? "contact" });
    }
    if (focus) {
      const target = steps[n - 1]?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1']), .ax-opt, .ax-chip");
      target?.focus({ preventScroll: true });
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function end(panel: HTMLElement) {
    form!.hidden = true;
    progress.hidden = true;
    for (const p of [bookPanel, done, dq]) p.hidden = p !== panel;
    panel.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /** Best effort for the middle steps: a dropped save must not stop anyone
   *  reaching the calendar, and the final submit re-sends everything. */
  async function save(extra: Record<string, unknown> = {}, complete = false) {
    if (!lead) return null;
    const payload: Record<string, unknown> = {
      lead_id: lead.id,
      token: lead.token,
      step,
      answers: allAnswers(),
      complete,
      ...extra,
    };
    if (complete) payload.turnstileToken = await takeToken(2500);
    const data = await leadApi.answer(payload);
    if (typeof data.status === "string") lead.status = data.status;
    saveLead();
    return data;
  }

  function disqualify(reason: DisqualifyReason, fresh = true) {
    $("ax-dq-h").textContent = firstName ? `Thanks, ${firstName}.` : "Thanks.";
    $("ax-dq-why").textContent = DISQUALIFY_COPY[reason];
    if (fresh) track("disqualified", { reason });
    end(dq);
  }

  // Step 1: the lead exists.
  async function capture() {
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const okEmail = EMAIL_RE.test(email);
    fieldError(nameEl, name ? "" : "Add your name.");
    fieldError(emailEl, okEmail ? "" : "That email doesn't look right.");
    if (!name) return nameEl.focus();
    if (!okEmail) return emailEl.focus();
    busy = true;
    next.disabled = true;
    next.textContent = "One moment";
    try {
      const data = await leadApi.capture({
        name,
        email,
        company: $<HTMLInputElement>("ax-company").value,
        turnstileToken: await takeToken(),
      });
      firstName = name.split(/\s+/)[0];
      setLead({ id: String(data.lead_id), token: String(data.token), status: String(data.status ?? "partial") });
      if (data.returning) restore(data);
      else show(2);
    } catch (e) {
      fail(e instanceof Error ? e.message : "That didn't go through. Try again in a moment.");
    } finally {
      busy = false;
      next.disabled = false;
      if (step === 1) next.innerHTML = buttonLabel(1);
    }
  }

  function pickSingle(key: string, value: string) {
    answers[key] = value;
    form!.querySelectorAll<HTMLButtonElement>(`.ax-opt[data-field="${key}"]`).forEach((b) => {
      const on = b.dataset.value === value;
      b.classList.toggle("is-picked", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function restore(data: Record<string, unknown>, focus = true) {
    const prev = (data.answers ?? {}) as Record<string, unknown>;
    for (const q of QUESTIONS) {
      const v = prev[q.key];
      if (q.kind === "single" && typeof v === "string") pickSingle(q.key, v);
      if (q.kind === "multi" && Array.isArray(v)) {
        v.forEach((x) => multi[q.key].add(String(x)));
        form!.querySelectorAll<HTMLButtonElement>(`.ax-chip[data-field="${q.key}"]`).forEach((c) =>
          c.setAttribute("aria-pressed", String(multi[q.key].has(c.dataset.value!))),
        );
      }
    }
    if (typeof data.name === "string" && data.name) {
      nameEl.value = data.name;
      firstName = data.name.split(/\s+/)[0];
    }
    if (typeof data.email === "string") emailEl.value = data.email;
    const status = String(data.status ?? "partial");
    if (["booked", "showed", "won", "lost"].includes(status)) {
      $("ax-done-h").textContent = firstName ? `You're booked, ${firstName}.` : "You're booked.";
      $("ax-done-when").textContent =
        "You already have a call booked with us. The details are in your inbox, and you can reply to that email to move it.";
      $("ax-done-entry").hidden = true;
      return end(done);
    }
    if (status === "qualified" || status === "no_show") return openBooking();
    if (status === "disqualified") {
      const reason = gate(allAnswers());
      if (reason) return disqualify(reason, false);
    }
    const n = Math.min(Math.max(Number(data.step_reached ?? 1) + 1, 2), TOTAL_STEPS);
    resumeNote.textContent = `Welcome back${firstName ? `, ${firstName}` : ""}. You're on question ${n - 1}.`;
    resumeNote.dataset.keep = String(n);
    resumeNote.hidden = false;
    show(n, focus);
  }

  async function submit() {
    track("form_submit", { step });
    next.disabled = true;
    next.textContent = "One moment";
    busy = true;
    try {
      const local = gate(allAnswers());
      const data = await save(local ? { disqualified: true } : {}, true);
      if (local || data?.status === "disqualified") return disqualify(local ?? "role");
      track("qualified");
      pixel("track", "Lead", {}, { eventID: `lead:${lead!.id}` });
      linkedin("qualified");
      openBooking();
    } catch (e) {
      fail(e instanceof Error ? e.message : "That didn't go through. Try again in a moment.");
    } finally {
      busy = false;
      next.disabled = false;
      next.innerHTML = buttonLabel(step);
    }
  }

  form.querySelectorAll<HTMLButtonElement>(".ax-opt").forEach((b) =>
    b.addEventListener("click", () => {
      if (busy) return;
      const key = b.dataset.field!;
      const value = b.dataset.value!;
      pickSingle(key, value);
      err.textContent = "";
      const q = QUESTIONS.find((x) => x.key === key)!;
      if (!q.auto) return;
      if (q.options.find((o) => o.value === value)?.disqualify) return void submit();
      void save().catch(() => {});
      setTimeout(() => show(step + 1), 160);
    }),
  );

  form.querySelectorAll<HTMLButtonElement>(".ax-chip").forEach((c) =>
    c.addEventListener("click", () => {
      const set = multi[c.dataset.field!];
      const v = c.dataset.value!;
      if (set.has(v)) set.delete(v);
      else set.add(v);
      c.setAttribute("aria-pressed", String(set.has(v)));
      if (set.size) err.textContent = "";
    }),
  );

  // First touch of the form: count it, and wake Turnstile so a token is ready.
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    track("form_start");
    track("form_step", { step: 1, key: "contact" });
    shown.add(1);
    pixel("trackCustom", "FormStart");
    mountTurnstile(tsSlot);
  });

  back.addEventListener("click", () => show(Math.max(step - 1, 1)));

  $("ax-dq-back").addEventListener("click", () => {
    dq.hidden = true;
    form.hidden = false;
    progress.hidden = false;
    // Back to the question that closed the door.
    const idx = QUESTIONS.findIndex((q) => q.options.some((o) => o.disqualify && answers[q.key] === o.value));
    show(idx >= 0 ? idx + 2 : 2);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    err.textContent = "";
    if (step === 1) return void capture();
    const q = questionAt(step);
    if (!q) return;
    if (q.kind === "multi") {
      if (multi[q.key].size < (q.min ?? 0)) return fail("Pick at least one.");
      void save().catch(() => {});
      return show(step + 1);
    }
    if (!answers[q.key]) return fail("Pick one.");
    if (step === TOTAL_STEPS) return void submit();
    void save().catch(() => {});
    show(step + 1);
  });

  // ─── the calendar ─────────────────────────────────────────────────────────

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Johannesburg";
  const SA_TZ = tz === "Africa/Johannesburg";
  const daysEl = $("ax-days");
  const timesEl = $("ax-times");
  const loadingEl = $("ax-cal-loading");
  const pickedWrap = $("ax-picked-wrap");
  const bookErr = $("ax-book-error");
  const bookBtn = $<HTMLButtonElement>("ax-book-btn");
  const countryEl = $<HTMLSelectElement>("ax-country");
  const phoneEl = $<HTMLInputElement>("ax-phone");
  let slots: string[] | null = null;
  let picked: string | null = null;

  (() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames([navigator.language || "en"], { type: "region" });
    } catch {
      /* codes only */
    }
    const opts = DIAL_CODES.map((c) => ({ ...c, name: names?.of(c.iso) ?? c.iso })).sort((a, b) => a.name.localeCompare(b.name));
    // No flag emoji: Windows draws them as the letters "ZA".
    countryEl.innerHTML = opts.map((c) => `<option value="${c.iso}">${c.name} +${c.dial}</option>`).join("");
    countryEl.value = DIAL_CODES.some((c) => c.iso === "ZA") ? "ZA" : opts[0].iso;
    const face = $("ax-cc-label");
    const sync = () => {
      const c = DIAL_CODES.find((x) => x.iso === countryEl.value);
      face.textContent = c ? `+${c.dial}` : "+";
      phoneEl.placeholder = countryEl.value === "ZA" ? "082 123 4567" : "Your number";
    };
    sync();
    countryEl.addEventListener("change", sync);
  })();

  const fmtTime = (iso: string) => new Intl.DateTimeFormat(undefined, { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  const fmtFull = (iso: string) =>
    new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(
      new Date(iso),
    );
  /** "SA time" at home, the short zone name ("GMT+1") anywhere else. */
  const zoneLabel = (iso: string) => {
    if (SA_TZ) return "SA time";
    try {
      const part = new Intl.DateTimeFormat(undefined, { timeZone: tz, timeZoneName: "short" })
        .formatToParts(new Date(iso))
        .find((x) => x.type === "timeZoneName");
      return part?.value ?? tz.replace(/_/g, " ");
    } catch {
      return tz.replace(/_/g, " ");
    }
  };
  const dayKey = (iso: string) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));

  function openBooking() {
    end(bookPanel);
    void loadSlots();
  }

  const mailto = `<a class="link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;

  async function loadSlots(force = false) {
    if (slots && !force) return;
    loadingEl.hidden = false;
    loadingEl.textContent = "Finding open times...";
    daysEl.hidden = true;
    timesEl.hidden = true;
    try {
      slots = await cal.slots();
      track("booking_view", { count: slots.length });
      renderDays();
    } catch {
      loadingEl.innerHTML = `The calendar didn't load. Refresh the page, or email ${mailto}.`;
    }
  }

  function renderDays() {
    const byDay = new Map<string, string[]>();
    for (const s of slots ?? []) {
      const k = dayKey(s);
      if (!byDay.has(k)) byDay.set(k, []);
      byDay.get(k)!.push(s);
    }
    if (!byDay.size) {
      loadingEl.innerHTML = `No open times right now. Email ${mailto} and we'll find one.`;
      return;
    }
    loadingEl.hidden = true;
    daysEl.hidden = false;
    daysEl.innerHTML = "";
    let first: HTMLButtonElement | null = null;
    for (const list of byDay.values()) {
      const d = new Date(list[0]);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ax-day";
      b.setAttribute("aria-pressed", "false");
      const wd = new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "short" }).format(d);
      const dm = new Intl.DateTimeFormat(undefined, { timeZone: tz, day: "numeric", month: "short" }).format(d);
      b.innerHTML = `${wd}<b>${dm}</b>`;
      b.addEventListener("click", () => {
        daysEl.querySelectorAll(".ax-day").forEach((x) => {
          x.classList.remove("is-picked");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("is-picked");
        b.setAttribute("aria-pressed", "true");
        renderTimes(list);
      });
      daysEl.appendChild(b);
      if (!first) first = b;
    }
    first?.click();
    fadeDays();
  }

  /** Fade the right edge while more days sit off screen. */
  function fadeDays() {
    daysEl.classList.toggle("is-more", daysEl.scrollLeft + daysEl.clientWidth < daysEl.scrollWidth - 4);
  }
  daysEl.addEventListener("scroll", fadeDays, { passive: true });
  window.addEventListener("resize", fadeDays, { passive: true });

  function renderTimes(list: string[]) {
    timesEl.hidden = false;
    timesEl.innerHTML = "";
    for (const s of list) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ax-time";
      b.textContent = fmtTime(s);
      b.setAttribute("aria-pressed", String(s === picked));
      if (s === picked) b.classList.add("is-picked");
      b.addEventListener("click", () => {
        picked = s;
        timesEl.querySelectorAll(".ax-time").forEach((x) => {
          x.classList.remove("is-picked");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("is-picked");
        b.setAttribute("aria-pressed", "true");
        $("ax-picked").textContent = fmtFull(s);
        pickedWrap.hidden = false;
        bookBtn.disabled = false;
        bookErr.textContent = "";
      });
      timesEl.appendChild(b);
    }
  }

  bookBtn.addEventListener("click", async () => {
    if (busy) return;
    bookErr.textContent = "";
    if (!picked || !lead) {
      bookErr.textContent = "Pick a time first.";
      return;
    }
    let phone = "";
    if (phoneEl.value.trim()) {
      const r = toE164(countryEl.value, phoneEl.value);
      phoneEl.setAttribute("aria-invalid", String(!r.ok));
      if (!r.ok) {
        phoneEl.focus();
        bookErr.textContent = r.error;
        return;
      }
      phone = r.value;
    }
    busy = true;
    bookBtn.disabled = true;
    bookBtn.textContent = "Booking";
    try {
      if (phone) void save({ phone }).catch(() => {});
      let who = { name: nameEl.value.trim(), email: emailEl.value.trim() };
      if (!who.name || !who.email) {
        const r = await leadApi.resume(lead.id, lead.token);
        who = { name: String(r.name ?? ""), email: String(r.email ?? "") };
        firstName = who.name.split(/\s+/)[0];
      }
      mountTurnstile(tsSlot);
      const data = await cal.book({
        startsAt: picked,
        name: who.name,
        email: who.email,
        timezone: tz,
        context: summarise(allAnswers()) + (phone ? `\nWhatsApp: ${phone}` : ""),
        turnstileToken: await takeToken(8000),
      });
      track("booked");
      pixel("track", "Schedule", {}, { eventID: `schedule:${lead.id}` });
      linkedin("booked");
      flush();
      leadApi.booked(lead.id, lead.token, data.bookingId).catch(() => {});
      lead.status = "booked";
      saveLead();
      $("ax-done-h").textContent = firstName ? `You're booked, ${firstName}.` : "You're booked.";
      $("ax-done-when").textContent = `${fmtFull(data.startsAt)} ${zoneLabel(data.startsAt)} with Cristo. The invite is in your inbox.`;
      end(done);
    } catch (e) {
      if (e instanceof BookError && e.code === "already_booked") {
        leadApi.booked(lead.id, lead.token).catch(() => {});
        $("ax-done-h").textContent = firstName ? `You're booked, ${firstName}.` : "You're booked.";
        $("ax-done-when").textContent =
          "You already have a call booked with us. The details are in your inbox, and you can reply to that email to move it.";
        return end(done);
      }
      if (e instanceof BookError && e.code === "slot_taken") {
        picked = null;
        pickedWrap.hidden = true;
        await loadSlots(true);
        bookErr.textContent = "Someone just took that time. Pick another one.";
        return;
      }
      bookErr.innerHTML = `That didn't go through. Try again, or email ${mailto}.`;
    } finally {
      busy = false;
      bookBtn.disabled = !picked;
      bookBtn.innerHTML = `Book this time${arrow}`;
    }
  });

  // ─── start ────────────────────────────────────────────────────────────────

  if (lead) {
    setLeadId(lead.id);
    leadApi
      .resume(lead.id, lead.token)
      .then((data) => {
        if (!videoUnlocked) setLead(lead!);
        restore(data, !!urlLead);
      })
      .catch(() => {
        lead = null;
        setLeadId(null);
        store.del(LEAD_KEY);
        show(1, false);
      });
  } else {
    show(1, false);
  }
}
