/**
 * /walkthrough and /w/<code>: find out who this is from their personal link, play
 * the video, and let them book. Every event goes through funnel-client, carrying
 * the lead id, so Cristo can see who watched how much.
 */
import { BookError, cal, flush, lead as leadApi, mountTurnstile, setCalSlug, setFunnel, setLeadId, store, takeToken, track } from "./funnel-client";
import { trackRetention } from "./vsl-retention";
import { WALKTHROUGH_VERSION } from "../lib/advisors-config";

const HLS_JS = "https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js";
const STORE_KEY = "cs_wt_lead";
const TZ = "Africa/Johannesburg";

setFunnel("walkthrough");
setCalSlug("first-blueprint-session");

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const on = (el: HTMLElement, show: boolean) => (el.hidden = !show);

interface Who {
  id: string;
  token: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
}
let who: Who | null = null;
let picked: string | null = null;
const answers: Record<string, string> = {};

/** The code from /w/<code>, or the id and token from an email link. */
function linkFromUrl(): { code?: string; id?: string; token?: string } {
  const m = location.pathname.match(/^\/w\/([a-zA-Z0-9]{6,20})\/?$/);
  if (m) return { code: m[1] };
  const q = new URLSearchParams(location.search);
  const id = q.get("l");
  const token = q.get("t");
  return id && token ? { id, token } : {};
}

async function identify(): Promise<void> {
  const link = linkFromUrl();
  let saved: { id: string; token: string } | null = null;
  try {
    saved = JSON.parse(store.get(STORE_KEY) || "null");
  } catch {
    /* start clean */
  }
  const r = link.code
    ? await leadApi.resumeCode(link.code)
    : link.id && link.token
      ? await leadApi.resume(link.id, link.token)
      : saved
        ? await leadApi.resume(saved.id, saved.token)
        : null;
  if (!r) return;
  const id = String(r.lead_id ?? link.id ?? saved?.id ?? "");
  const token = String(r.token ?? link.token ?? saved?.token ?? "");
  if (!id || !token) return;
  who = { id, token, name: String(r.name ?? ""), lastName: String(r.last_name ?? ""), email: String(r.email ?? ""), status: String(r.status ?? "") };
  setLeadId(id);
  store.set(STORE_KEY, JSON.stringify({ id, token }));
}

// ── the video ──

function loadScript(src: string): Promise<void> {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res();
    s.onerror = () => rej(new Error("script"));
    document.head.appendChild(s);
  });
}

function setUpVideo(): void {
  const player = document.getElementById("vsl");
  const v = document.getElementById("vsl-video") as HTMLVideoElement | null;
  const start = document.getElementById("vsl-start");
  if (!player || !v || !start) return;
  try {
    trackRetention(v, WALKTHROUGH_VERSION);
  } catch {
    /* measuring is optional, playing isn't */
  }
  let played = false;
  v.addEventListener("play", () => {
    if (played) return;
    played = true;
    track("video_play");
    flush();
  });
  const hlsUrl = player.dataset.hls || "";
  const mp4Url = player.dataset.mp4 || "";

  async function attach(): Promise<void> {
    if (!hlsUrl) {
      v!.src = mp4Url;
      return;
    }
    if ("MediaSource" in window || "ManagedMediaSource" in window) {
      try {
        await loadScript(HLS_JS);
        if (window.Hls?.isSupported()) {
          const h = new window.Hls({ capLevelToPlayerSize: true, abrEwmaDefaultEstimate: 6_000_000, maxBufferLength: 30 });
          h.on(window.Hls.Events.ERROR, (_e: unknown, data: { fatal?: boolean }) => {
            if (data?.fatal) {
              h.destroy();
              v!.src = mp4Url;
              v!.play().catch(() => {});
            }
          });
          h.loadSource(hlsUrl);
          h.attachMedia(v!);
          return;
        }
      } catch {
        /* fall through to the plain file */
      }
    }
    v!.src = v!.canPlayType("application/vnd.apple.mpegurl") ? hlsUrl : mp4Url;
  }

  // The player from /advisors: one big button, the speeds, one bar.
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

  const mmss = (t: number) => {
    const s = Math.max(0, Math.floor(t || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  const setRate = (r: number) => {
    rate = r;
    v.defaultPlaybackRate = r;
    v.playbackRate = r;
    rateBtn.textContent = `${r}x`;
    rateBtn.setAttribute("aria-label", `Playback speed, ${r}x`);
  };
  const wake = () => {
    delete player.dataset.idle;
    clearTimeout(idleTimer);
    if (!v.paused) idleTimer = window.setTimeout(() => (player.dataset.idle = ""), 2500);
  };
  const paint = () => {
    if (v.paused) player.dataset.paused = "";
    else delete player.dataset.paused;
    toggle.setAttribute("aria-label", v.paused ? "Play" : "Pause");
    resume.hidden = !started || !v.paused || v.ended;
    wake();
  };
  const togglePlay = () => (v.paused ? v.play().catch(() => {}) : v.pause());
  const begin = async (r = rate) => {
    started = true;
    start.hidden = true;
    v.hidden = false;
    bar.hidden = false;
    await attach();
    setRate(r);
    v.play().catch(() => paint());
  };

  $("vsl-play").addEventListener("click", () => void begin());
  start.querySelectorAll<HTMLButtonElement>("[data-rate]").forEach((b) => b.addEventListener("click", () => void begin(Number(b.dataset.rate))));
  resume.addEventListener("click", () => v.play().catch(() => {}));
  toggle.addEventListener("click", togglePlay);
  rateBtn.addEventListener("click", () => setRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length]));
  v.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "mouse" && player.dataset.idle !== undefined) return wake();
    togglePlay();
  });
  player.addEventListener("pointermove", wake);
  seek.addEventListener("input", () => {
    seeking = true;
    seek.style.setProperty("--p", `${Number(seek.value) / 10}%`);
    if (v.duration) time.textContent = mmss((Number(seek.value) / 1000) * v.duration);
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
    time.textContent = `${mmss(v.currentTime)} / ${mmss(v.duration)}`;
  });
  v.addEventListener("loadedmetadata", () => {
    if (v.playbackRate !== rate) v.playbackRate = rate;
  });
  for (const ev of ["play", "pause", "ended"]) v.addEventListener(ev, paint);
  $("vsl-full").addEventListener("click", () => {
    const ios = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (player.requestFullscreen) player.requestFullscreen().catch(() => ios.webkitEnterFullscreen?.());
    else ios.webkitEnterFullscreen?.();
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
  });
}

// ── booking ──

const dayLabel = (iso: string) => new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, weekday: "short", day: "numeric", month: "short" }).format(new Date(iso));
const clock = (iso: string) => new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
const fullWhen = (iso: string) => new Intl.DateTimeFormat("en-ZA", { timeZone: TZ, dateStyle: "full", timeStyle: "short" }).format(new Date(iso));

function pick(group: HTMLElement, b: HTMLElement) {
  group.querySelectorAll("button").forEach((x) => {
    x.classList.remove("is-picked");
    x.setAttribute("aria-pressed", "false");
  });
  b.classList.add("is-picked");
  b.setAttribute("aria-pressed", "true");
}

function chip(label: string, onClick: (b: HTMLButtonElement) => void): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => onClick(b));
  return b;
}

async function loadSlots(): Promise<void> {
  const loading = $("wt-loading");
  const days = $("wt-days");
  const times = $("wt-times");
  on(loading, true);
  on(days, false);
  on(times, false);
  loading.textContent = "Finding open times...";
  picked = null;
  $<HTMLButtonElement>("wt-go").disabled = true;
  let slots: string[];
  try {
    slots = await cal.slots();
  } catch {
    loading.textContent = "The calendar didn't load. Refresh the page, or email cristo@cornerstone-ai.pro.";
    return;
  }
  track("booking_view", { count: slots.length });
  if (!slots.length) {
    loading.textContent = "No open times right now. I'll find one with you when I call.";
    return;
  }
  const byDay = new Map<string, string[]>();
  for (const s of slots) {
    const k = dayLabel(s);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(s);
  }
  on(loading, false);
  on(days, true);
  days.replaceChildren();
  let first: HTMLButtonElement | null = null;
  for (const [label, list] of byDay) {
    const b = chip(label, (btn) => {
      pick(days, btn);
      on(times, true);
      times.replaceChildren(
        ...list.map((s) =>
          chip(clock(s), (t) => {
            pick(times, t);
            picked = s;
            $<HTMLButtonElement>("wt-go").disabled = false;
            $("wt-err").textContent = "";
          }),
        ),
      );
    });
    days.appendChild(b);
    first ??= b;
  }
  first?.click();
}

function showDone(heading: string, when: string) {
  on($("wt-book"), false);
  on($("wt-done"), true);
  $("wt-done-h").textContent = heading;
  $("wt-done-when").textContent = when;
}

function setUpBooking(): void {
  document.querySelectorAll<HTMLElement>(".wt-chips[data-q]").forEach((group) => {
    group.querySelectorAll<HTMLButtonElement>("button").forEach((b) => {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        pick(group, b);
        answers[group.dataset.q as string] = b.dataset.v as string;
      });
    });
  });
  const go = $<HTMLButtonElement>("wt-go");
  const err = $("wt-err");
  go.addEventListener("click", async () => {
    if (!who || !picked) return;
    err.textContent = "";
    go.disabled = true;
    go.textContent = "Booking";
    const firstName = who.name.split(/\s+/)[0];
    try {
      if (answers.has_team && answers.looking_for) {
        await leadApi.answer({ lead_id: who.id, token: who.token, answers, step: 2, complete: true }).catch(() => {});
      } else if (Object.keys(answers).length) {
        await leadApi.answer({ lead_id: who.id, token: who.token, answers, step: 2 }).catch(() => {});
      }
      const data = await cal.book({
        startsAt: picked,
        name: [who.name, who.lastName].filter(Boolean).join(" ") || who.email,
        email: who.email,
        timezone: TZ,
        context: `Team: ${answers.has_team ?? "not said"}. Looking for: ${answers.looking_for ?? "not said"}.`,
        turnstileToken: await takeToken(8000),
      });
      track("booked");
      flush();
      leadApi.booked(who.id, who.token, data.bookingId).catch(() => {});
      showDone(firstName ? `You're booked, ${firstName}.` : "You're booked.", `${fullWhen(data.startsAt)} (SA time). The invite is in your inbox.`);
    } catch (e) {
      go.textContent = "Book this time";
      if (e instanceof BookError && e.code === "already_booked") {
        leadApi.booked(who.id, who.token).catch(() => {});
        showDone(firstName ? `You're booked, ${firstName}.` : "You're booked.", "You already have a session booked. The details are in your inbox.");
        return;
      }
      if (e instanceof BookError && e.code === "slot_taken") {
        await loadSlots();
        err.textContent = "Someone just took that time. Pick another one.";
        return;
      }
      go.disabled = !picked;
      err.textContent = "That didn't go through. Try again, or email cristo@cornerstone-ai.pro.";
    }
  });
}

// ── start ──

(async () => {
  void setUpVideo();
  try {
    await identify();
  } catch {
    /* a bad link still plays the video */
  }
  track("page_view");
  flush();
  const me = who as Who | null;
  if (!me) {
    on($("wt-nolink"), true);
    return;
  }
  if (["booked", "showed", "won"].includes(me.status)) {
    showDone("You're booked.", "The details are in your inbox.");
    return;
  }
  on($("wt-book"), true);
  setUpBooking();
  mountTurnstile($("wt-turnstile"));
  await loadSlots();
})();
