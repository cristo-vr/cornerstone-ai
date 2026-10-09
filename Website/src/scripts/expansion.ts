/**
 * /expansion: the video, the form, the calendar, and the counting.
 *
 * Talks to Mason only:
 *   POST aios.../api/public/funnel/event   the analytics beacon (what happened)
 *   POST aios.../api/public/funnel/lead    the form (who, and their answers)
 *   GET  cal.../api/cal/cristo/expansion-call/slots   open times
 *   POST cal.../api/cal/cristo/expansion-call/book    the booking itself
 *
 * Nothing here is trusted by the server. The gates are run here only to pick
 * the next screen; Mason runs them again and its answer is the one stored.
 *
 * Your own visits: open the page once with ?internal=1 and this browser is
 * marked internal for good (?internal=0 undoes it). The panel leaves those out.
 */

export {};

const API = "https://aios.cornerstone-ai.pro/api/public/funnel";
const CAL = "https://cal.cornerstone-ai.pro/api/cal/cristo/expansion-call";
const FUNNEL = "expansion";
const TURNSTILE_SITE_KEY = "0x4AAAAAACN3bXEw6zTOBNYc";
const HLS_JS = "https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js";

type Dict = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    turnstile?: {
      render: (el: HTMLElement, opts: Dict) => string;
      reset: (id?: string) => void;
      getResponse: (id?: string) => string | undefined;
    };
    Hls?: any;
    __fxTurnstileReady?: () => void;
  }
}

// ─── identity, attribution, internal ────────────────────────────────────────

const store = {
  get(k: string, session = false): string | null {
    try {
      return (session ? sessionStorage : localStorage).getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string, session = false) {
    try {
      (session ? sessionStorage : localStorage).setItem(k, v);
    } catch {
      /* private mode: the page still works, it just forgets */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

const uid = () =>
  (crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`).toLowerCase();

const params = new URLSearchParams(location.search);
if (params.get("internal") === "1") store.set("cs_internal", "1");
if (params.get("internal") === "0") store.del("cs_internal");
const internal = store.get("cs_internal") === "1";

let visitorId = store.get("cs_vid");
if (!visitorId) {
  visitorId = uid();
  store.set("cs_vid", visitorId);
}
let sessionId = store.get("cs_sid", true);
if (!sessionId) {
  sessionId = uid();
  store.set("cs_sid", sessionId, true);
}

/** First touch of the session. Read on landing, because by the time someone
 *  submits, the utm parameters may be several navigations gone. */
const attribution: Record<string, string> = (() => {
  const saved = store.get("cs_fx_attr", true);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      /* fall through */
    }
  }
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid"]) {
    const v = params.get(k);
    if (v) out[k] = v.slice(0, 500);
  }
  if (document.referrer && !document.referrer.startsWith(location.origin)) out.referrer = document.referrer.slice(0, 500);
  out.landing_path = location.pathname;
  store.set("cs_fx_attr", JSON.stringify(out), true);
  return out;
})();

function cookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
const fbc = () => cookie("_fbc") ?? (attribution.fbclid ? `fb.1.${Date.now()}.${attribution.fbclid}` : null);

// ─── the beacon ─────────────────────────────────────────────────────────────

let queue: { event: string; props?: Dict }[] = [];

function flush() {
  if (!queue.length) return;
  const body = JSON.stringify({
    funnel: FUNNEL,
    visitor_id: visitorId,
    session_id: sessionId,
    internal,
    path: location.pathname,
    attribution,
    events: queue.splice(0, 25),
  });
  const sent = navigator.sendBeacon?.(`${API}/event`, new Blob([body], { type: "text/plain" }));
  if (!sent) {
    fetch(`${API}/event`, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
  }
  if (queue.length) flush();
}

function track(event: string, props?: Dict) {
  queue.push(props ? { event, props } : { event });
  if (queue.length >= 10) flush();
}
setInterval(flush, 4000);
addEventListener("pagehide", flush);
document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && flush());

const pixel = (...args: unknown[]) => {
  if (!internal) window.fbq?.(...args);
};

track("page_view", { referrer_host: attribution.referrer ? safeHost(attribution.referrer) : "" });

function safeHost(u: string): string {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
}

// ─── the video ──────────────────────────────────────────────────────────────

const vsl = document.getElementById("vsl") as HTMLElement | null;
const video = document.getElementById("vsl-video") as HTMLVideoElement | null;
const start = document.getElementById("vsl-start") as HTMLButtonElement | null;

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

if (vsl && video && start) {
  const v: HTMLVideoElement = video;
  const media = vsl.dataset.media!;
  const hlsUrl = `${media}/hls/master.m3u8`;
  const mp4Url = `${media}/vsl-720.mp4`;
  const marks = new Set<number>();
  let played = false;

  const useMp4 = () => {
    v.src = mp4Url;
  };

  async function attach(): Promise<void> {
    if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = hlsUrl; // Safari and iOS play HLS natively
      return;
    }
    try {
      await loadScript(HLS_JS);
      if (window.Hls?.isSupported()) {
        const hls = new window.Hls({ capLevelToPlayerSize: true, startLevel: -1 });
        hls.on(window.Hls.Events.ERROR, (_e: unknown, data: { fatal?: boolean }) => {
          if (data?.fatal) {
            hls.destroy();
            useMp4();
            v.play().catch(() => {});
          }
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(v);
        return;
      }
    } catch {
      /* fall back to the single file */
    }
    useMp4();
  }

  start.addEventListener("click", async () => {
    start.hidden = true;
    video.hidden = false;
    await attach();
    video.play().catch(() => {
      /* autoplay refused: the native controls are showing, one more tap plays */
    });
  });

  video.addEventListener("play", () => {
    if (!played) {
      played = true;
      track("video_play");
      pixel("trackCustom", "VideoPlay");
    }
  });

  video.addEventListener("timeupdate", () => {
    if (!video.duration || !Number.isFinite(video.duration)) return;
    const pct = Math.floor(((video.currentTime / video.duration) * 100) / 10) * 10;
    for (let p = 10; p <= Math.min(pct, 90); p += 10) {
      if (!marks.has(p)) {
        marks.add(p);
        track("video_progress", { pct: p, seconds: Math.round(video.currentTime) });
        if (p === 50) pixel("trackCustom", "VideoHalf");
      }
    }
  });

  video.addEventListener("ended", () => {
    if (!marks.has(100)) {
      marks.add(100);
      track("video_progress", { pct: 100 });
      pixel("trackCustom", "VideoComplete");
      flush();
    }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// CTAs anywhere on the page.
document.querySelectorAll<HTMLElement>("[data-cta]").forEach((el) =>
  el.addEventListener("click", () => track("cta_click", { where: el.dataset.cta ?? "" })),
);

// The sticky phone CTA: shown once the hero ask has scrolled away, hidden once
// the form is in view.
(() => {
  const sticky = document.getElementById("fx-sticky");
  const heroCta = document.querySelector<HTMLElement>('[data-cta="hero"]');
  const book = document.getElementById("book");
  if (!sticky || !heroCta || !book || !("IntersectionObserver" in window)) return;
  let heroGone = false;
  let bookIn = false;
  const update = () => {
    sticky.hidden = !(heroGone && !bookIn);
  };
  new IntersectionObserver(([e]) => {
    heroGone = !e.isIntersecting && e.boundingClientRect.top < 0;
    update();
  }).observe(heroCta);
  new IntersectionObserver(([e]) => {
    bookIn = e.isIntersecting;
    update();
  }, { rootMargin: "0px 0px -30% 0px" }).observe(book);
})();

// ─── Turnstile ──────────────────────────────────────────────────────────────
//
// Rendered once, invisible unless Cloudflare wants a challenge. A token is
// single use, so every spend is followed by a reset to mint the next one.

let tsWidget: string | undefined;
let tsToken: string | null = null;
let tsWaiters: Array<(t: string | null) => void> = [];

function mountTurnstile() {
  if (document.getElementById("cf-turnstile-script")) return;
  const slot = document.querySelector<HTMLElement>(".fx-turnstile");
  if (!slot) return;
  window.__fxTurnstileReady = () => {
    tsWidget = window.turnstile?.render(slot, {
      sitekey: TURNSTILE_SITE_KEY,
      appearance: "interaction-only",
      callback: (t: string) => {
        tsToken = t;
        tsWaiters.splice(0).forEach((w) => w(t));
      },
      "expired-callback": () => {
        tsToken = null;
      },
      "error-callback": () => {
        tsToken = null;
        tsWaiters.splice(0).forEach((w) => w(null));
      },
    });
  };
  const s = document.createElement("script");
  s.id = "cf-turnstile-script";
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__fxTurnstileReady&render=explicit";
  s.async = true;
  document.head.appendChild(s);
}

/** A fresh token, waiting up to `ms` for one. Never blocks the visitor forever:
 *  a capture without a token is still stored, the server just won't email it. */
function takeToken(ms = 6000): Promise<string | null> {
  const use = (t: string | null) => {
    tsToken = null;
    if (tsWidget !== undefined) setTimeout(() => window.turnstile?.reset(tsWidget), 50);
    return t;
  };
  if (tsToken) return Promise.resolve(use(tsToken));
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    tsWaiters.push((t) => {
      clearTimeout(timer);
      resolve(use(t));
    });
  });
}

// ─── the form ───────────────────────────────────────────────────────────────

interface Lead {
  id: string;
  token: string;
  status: string;
}

const form = document.getElementById("fx-form") as HTMLFormElement | null;

if (form) {
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>(".fx-step"));
  const bar = document.getElementById("fx-bar")!;
  const err = document.getElementById("fx-error")!;
  const back = document.getElementById("fx-back") as HTMLButtonElement;
  const next = document.getElementById("fx-next") as HTMLButtonElement;
  const box = document.getElementById("fx")!;
  const done = document.getElementById("fx-done")!;
  const notyet = document.getElementById("fx-notyet")!;
  const answers: Record<string, string | string[]> = {};
  const breaking = new Set<string>();
  let step = 1;
  let lead: Lead | null = null;
  let busy = false;
  let started = false;
  const shown = new Set<number>();

  // Saved session, so a reload or a second visit picks up where it stopped.
  try {
    const saved = JSON.parse(store.get("cs_fx_lead") || "null");
    if (saved?.id && saved?.token) lead = saved;
  } catch {
    /* ignore */
  }
  const urlLead = params.get("l");
  const urlToken = params.get("t");
  if (urlLead && urlToken) lead = { id: urlLead, token: urlToken, status: "partial" };

  const saveLead = () => lead && store.set("cs_fx_lead", JSON.stringify(lead));

  const setBusy = (b: boolean, label?: string) => {
    busy = b;
    next.disabled = b;
    if (label) next.innerHTML = label;
  };

  const nextLabel = () =>
    step === 7
      ? 'See available times<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>'
      : step === 8
        ? 'Book this time<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>'
        : 'Continue<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>';

  function show(n: number, focus = true) {
    step = n;
    steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    bar.style.width = `${Math.round((n / steps.length) * 100)}%`;
    back.hidden = n <= 1 || (n === 2 && !!lead);
    err.textContent = "";
    const auto = steps[n - 1]?.hasAttribute("data-auto");
    next.hidden = auto;
    next.innerHTML = nextLabel();
    next.disabled = n === 8 && !picked;
    if (!shown.has(n)) {
      shown.add(n);
      track("form_step", { step: n });
    }
    if (focus) {
      const target = steps[n - 1]?.querySelector<HTMLElement>("input:not([type=hidden]), .fx-opt, .fx-chip");
      target?.focus({ preventScroll: true });
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (n === 8) loadSlots();
  }

  function end(panel: HTMLElement) {
    form!.hidden = true;
    bar.parentElement!.hidden = true;
    panel.hidden = false;
    panel.focus();
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const fail = (msg: string) => {
    err.textContent = msg;
  };

  async function post(body: Dict): Promise<Dict> {
    const res = await fetch(`${API}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, page_url: location.href.split("?")[0] }),
    });
    const data = (await res.json().catch(() => ({}))) as Dict;
    if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "That didn't go through. Try again in a moment.");
    return data;
  }

  /** Save an answer. Best effort for the middle steps: a dropped save must not
   *  stop someone getting to the calendar, and the final step re-sends them all. */
  async function save(extra: Dict = {}, complete = false): Promise<Dict | null> {
    if (!lead) return null;
    const payload: Dict = {
      action: "answer",
      lead_id: lead.id,
      token: lead.token,
      step,
      answers: { ...answers, breaking: [...breaking] },
      complete,
      ...extra,
    };
    if (complete) payload.turnstileToken = await takeToken(2500);
    const data = await post(payload);
    if (typeof data.status === "string") lead.status = data.status;
    saveLead();
    return data;
  }

  const notYet = (reason: string) => {
    const why = document.getElementById("fx-notyet-why")!;
    if (reason === "demand") {
      why.textContent = "From what you said, your main challenge right now is getting more leads and sales. That's a real problem, it's just not the one I solve. What I build helps once the business is at capacity.";
    } else if (reason === "early") {
      why.textContent = "From what you said, the offer is still taking shape. That's the right thing to be working on, and a system built now would be built around something that's about to change.";
    } else if (reason === "revenue") {
      why.textContent = "What I build works best once the business is past $20k a month, when there's enough volume for the bottlenecks to really bite.";
    }
    track("disqualified", { reason });
    end(notyet);
  };

  // Step 1 → the lead exists.
  async function capture() {
    const name = (document.getElementById("fx-name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("fx-email") as HTMLInputElement).value.trim();
    if (!name) return fail("What should I call you?");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("That email doesn't look right.");
    setBusy(true, "One moment");
    try {
      const data = await post({
        action: "capture",
        funnel: FUNNEL,
        name,
        email,
        company: (document.getElementById("fx-company") as HTMLInputElement).value,
        visitor_id: visitorId,
        attribution,
        internal,
        fbp: cookie("_fbp"),
        fbc: fbc(),
        turnstileToken: await takeToken(),
      });
      lead = { id: String(data.lead_id), token: String(data.token), status: String(data.status) };
      saveLead();
      track("lead_captured");
      if (!data.returning) pixel("track", "Lead", {}, { eventID: `lead:${lead.id}` });
      if (data.returning) restore(data);
      else show(2);
    } catch (e) {
      fail(e instanceof Error ? e.message : "That didn't go through.");
    } finally {
      setBusy(false, nextLabel());
    }
  }

  /** Someone we already know: put their answers back and send them onward. */
  function restore(data: Dict, focus = true) {
    const prev = (data.answers ?? {}) as Dict;
    for (const k of ["stage", "revenue", "authority", "urgency"]) {
      if (typeof prev[k] === "string") {
        answers[k] = prev[k] as string;
        form!.querySelector(`.fx-opt[data-field="${k}"][data-value="${prev[k]}"]`)?.classList.add("is-picked");
      }
    }
    if (Array.isArray(prev.breaking)) (prev.breaking as string[]).forEach((b) => breaking.add(b));
    form!.querySelectorAll<HTMLButtonElement>(".fx-chip").forEach((c) => c.setAttribute("aria-pressed", String(breaking.has(c.dataset.value!))));
    const status = String(data.status ?? "partial");
    if (["booked", "showed", "won", "lost"].includes(status)) {
      document.getElementById("fx-done-when")!.textContent = "You've already booked a call with me. The details are in your calendar invite.";
      end(done);
      return;
    }
    if (status === "qualified" || status === "no_show") return show(8, focus);
    if (status === "disqualified") return show(2, focus);
    show(Math.min(Math.max(Number(data.step_reached ?? 1) + 1, 2), 7), focus);
  }

  function choose(btn: HTMLButtonElement) {
    const field = btn.dataset.field!;
    const value = btn.dataset.value!;
    answers[field] = value;
    btn.parentElement?.querySelectorAll(".fx-opt").forEach((b) => b.classList.remove("is-picked"));
    btn.classList.add("is-picked");

    // The gates, run here only to choose the screen. Mason decides for real.
    if (field === "stage" && value !== "fit") {
      void save().catch(() => {});
      return notYet(value);
    }
    if (field === "revenue" && value === "u20") {
      void save().catch(() => {});
      return notYet("revenue");
    }
    void save().catch(() => {});
    setTimeout(() => show(step + 1), 160);
  }

  form.querySelectorAll<HTMLButtonElement>(".fx-opt").forEach((b) => b.addEventListener("click", () => choose(b)));

  form.querySelectorAll<HTMLButtonElement>(".fx-chip").forEach((c) =>
    c.addEventListener("click", () => {
      const v = c.dataset.value!;
      if (breaking.has(v)) breaking.delete(v);
      else breaking.add(v);
      c.setAttribute("aria-pressed", String(breaking.has(v)));
    }),
  );
  const other = document.getElementById("fx-other") as HTMLInputElement;
  const addOther = () => {
    const v = other.value.trim().slice(0, 160);
    if (!v) return;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fx-chip";
    chip.dataset.value = v;
    chip.textContent = v;
    chip.setAttribute("aria-pressed", "true");
    breaking.add(v);
    chip.addEventListener("click", () => {
      if (breaking.has(v)) breaking.delete(v);
      else breaking.add(v);
      chip.setAttribute("aria-pressed", String(breaking.has(v)));
    });
    document.getElementById("fx-chips")!.appendChild(chip);
    other.value = "";
    other.focus();
  };
  document.getElementById("fx-add")!.addEventListener("click", addOther);
  other.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOther();
    }
  });

  // First touch of the form: count it, and wake Turnstile so a token is ready
  // by the time they press Continue.
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    track("form_start");
    mountTurnstile();
  });

  back.addEventListener("click", () => {
    if (step === 8) picked = null;
    show(Math.max(step - 1, 1));
  });
  document.getElementById("fx-notyet-back")!.addEventListener("click", () => {
    notyet.hidden = true;
    form.hidden = false;
    bar.parentElement!.hidden = false;
    show(answers.revenue === "u20" ? 4 : 2);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;
    err.textContent = "";
    if (step === 1) return capture();
    if (step === 3) {
      void save().catch(() => {});
      return show(4);
    }
    if (step === 7) {
      const phone = (document.getElementById("fx-phone") as HTMLInputElement).value.trim();
      const site = (document.getElementById("fx-site") as HTMLInputElement).value.trim();
      if (phone.replace(/\D/g, "").length < 8) return fail("I need a number to confirm the call on.");
      if (!site) return fail("Add your website so I can look before we speak.");
      setBusy(true, "One moment");
      try {
        const data = await save({ phone, website: site }, true);
        if (data?.status === "disqualified") return notYet(answers.stage !== "fit" ? String(answers.stage) : "revenue");
        track("qualified", { grade: String(data?.grade ?? "") });
        pixel("track", "CompleteRegistration", {}, { eventID: `qualified:${lead!.id}` });
        show(8);
      } catch (e2) {
        fail(e2 instanceof Error ? e2.message : "That didn't go through.");
      } finally {
        setBusy(false, nextLabel());
        next.disabled = (step as number) === 8 && !picked;
      }
      return;
    }
    if (step === 8) return book();
  });

  // ─── the calendar ─────────────────────────────────────────────────────────

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Johannesburg";
  document.getElementById("fx-tz")!.textContent = tz.replace(/_/g, " ");
  const daysEl = document.getElementById("fx-days")!;
  const timesEl = document.getElementById("fx-times")!;
  const loadingEl = document.getElementById("fx-cal-loading")!;
  const confirmEl = document.getElementById("fx-confirm")!;
  let slots: string[] | null = null;
  let picked: string | null = null;

  const dayKey = (iso: string) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
  const fmtTime = (iso: string) => new Intl.DateTimeFormat(undefined, { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  const fmtFull = (iso: string) =>
    new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  async function loadSlots(force = false) {
    if (slots && !force) return;
    loadingEl.hidden = false;
    loadingEl.textContent = "Finding open times…";
    daysEl.hidden = true;
    timesEl.hidden = true;
    try {
      const res = await fetch(`${CAL}/slots`);
      const data = (await res.json().catch(() => ({}))) as { slots?: string[]; error?: string };
      if (!res.ok) throw new Error(data.error || "The calendar didn't load.");
      slots = data.slots ?? [];
      track("slots_viewed", { count: slots.length });
      renderDays();
    } catch (e) {
      loadingEl.textContent = `${e instanceof Error ? e.message : "The calendar didn't load."} Refresh the page to try again, or email cristo@cornerstone-ai.pro and I'll find a time with you.`;
    }
  }

  function renderDays() {
    const byDay = new Map<string, string[]>();
    for (const s of slots ?? []) {
      const k = dayKey(s);
      if (!byDay.has(k)) byDay.set(k, []);
      byDay.get(k)!.push(s);
    }
    if (byDay.size === 0) {
      loadingEl.textContent = "Every slot in the next ten days is taken. Email cristo@cornerstone-ai.pro and I'll make a time for you.";
      return;
    }
    loadingEl.hidden = true;
    daysEl.hidden = false;
    daysEl.innerHTML = "";
    let first: HTMLButtonElement | null = null;
    for (const [k, list] of byDay) {
      const d = new Date(list[0]);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "fx-day";
      const wd = new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "short" }).format(d);
      const dm = new Intl.DateTimeFormat(undefined, { timeZone: tz, day: "numeric", month: "short" }).format(d);
      b.innerHTML = `${wd}<b>${dm}</b>`;
      b.addEventListener("click", () => {
        daysEl.querySelectorAll(".fx-day").forEach((x) => x.classList.remove("is-picked"));
        b.classList.add("is-picked");
        renderTimes(list);
      });
      daysEl.appendChild(b);
      if (!first) first = b;
      void k;
    }
    first?.click();
  }

  function renderTimes(list: string[]) {
    timesEl.hidden = false;
    timesEl.innerHTML = "";
    for (const s of list) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "fx-time";
      b.textContent = fmtTime(s);
      if (s === picked) b.classList.add("is-picked");
      b.addEventListener("click", () => {
        picked = s;
        timesEl.querySelectorAll(".fx-time").forEach((x) => x.classList.remove("is-picked"));
        b.classList.add("is-picked");
        document.getElementById("fx-picked")!.textContent = fmtFull(s);
        confirmEl.hidden = false;
        next.disabled = false;
        track("slot_selected");
        next.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      timesEl.appendChild(b);
    }
  }

  function summary(): string {
    const label = (sel: string) => form!.querySelector<HTMLElement>(sel)?.textContent?.trim() ?? "";
    const lines = [
      `Revenue: ${label(`.fx-opt[data-field="revenue"][data-value="${answers.revenue}"]`)}`,
      `Decides: ${label(`.fx-opt[data-field="authority"][data-value="${answers.authority}"]`)}`,
      `Urgency: ${label(`.fx-opt[data-field="urgency"][data-value="${answers.urgency}"]`)}`,
      `Website: ${(document.getElementById("fx-site") as HTMLInputElement).value.trim()}`,
      `WhatsApp: ${(document.getElementById("fx-phone") as HTMLInputElement).value.trim()}`,
    ];
    const chips = [...breaking].map((b) => form!.querySelector<HTMLElement>(`.fx-chip[data-value="${CSS.escape(b)}"]`)?.textContent?.trim() || b);
    if (chips.length) lines.push(`In the way: ${chips.join("; ")}`);
    return lines.filter((l) => !/: $/.test(l)).join("\n");
  }

  async function book() {
    if (!picked || !lead) return fail("Pick a time first.");
    setBusy(true, "Booking");
    const name = (document.getElementById("fx-name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("fx-email") as HTMLInputElement).value.trim();
    try {
      // ⚠ Never send a field called "website" here: it is the booking
      // service's honeypot, and a filled one is silently dropped as a bot.
      let who = { name, email };
      if (!name || !email) {
        const r = await post({ action: "resume", lead_id: lead.id, token: lead.token });
        who = { name: String(r.name ?? ""), email: String(r.email ?? "") };
      }
      mountTurnstile();
      const res = await fetch(`${CAL}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startsAt: picked,
          name: who.name,
          email: who.email,
          timezone: tz,
          answers: [{ key: "funnel_context", answer: summary() }],
          turnstileToken: await takeToken(8000),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as Dict;
      if (!res.ok) {
        track("book_failed", { code: String(data.code ?? res.status) });
        if (data.code === "already_booked") {
          // A double tap that landed: the first one booked it.
          post({ action: "booked", lead_id: lead.id, token: lead.token }).catch(() => {});
          document.getElementById("fx-done-when")!.textContent = `${fmtFull(picked)} (${tz.replace(/_/g, " ")}).`;
          end(done);
          return;
        }
        if (data.code === "slot_taken") {
          picked = null;
          confirmEl.hidden = true;
          await loadSlots(true);
          throw new Error("Someone just took that time. Pick another.");
        }
        throw new Error(typeof data.error === "string" ? data.error : "That didn't book. Try again.");
      }
      const bookingId = String(data.bookingId ?? "");
      track("booked");
      pixel("track", "Schedule", {}, { eventID: `schedule:${lead.id}` });
      flush();
      // Tell Mason it happened. If this one call fails the booking still stands
      // (it's in the calendar); the panel just shows the lead as qualified until
      // the next sync.
      post({ action: "booked", lead_id: lead.id, token: lead.token, booking_id: bookingId }).catch(() => {});
      lead.status = "booked";
      saveLead();
      document.getElementById("fx-done-when")!.textContent = `${fmtFull(String(data.startsAt ?? picked))} (${tz.replace(/_/g, " ")}).`;
      document.getElementById("fx-done-partner")!.hidden = answers.authority !== "partner";
      end(done);
    } catch (e) {
      fail(e instanceof Error ? e.message : "That didn't book. Try again.");
    } finally {
      setBusy(false, nextLabel());
      next.disabled = !picked;
    }
  }

  // ─── start ────────────────────────────────────────────────────────────────

  if (lead) {
    // Back from an email link, or a returning browser: ask Mason where they got to.
    post({ action: "resume", lead_id: lead.id, token: lead.token })
      .then((data) => {
        const nameEl = document.getElementById("fx-name") as HTMLInputElement;
        const emailEl = document.getElementById("fx-email") as HTMLInputElement;
        if (typeof data.name === "string") nameEl.value = data.name;
        if (typeof data.email === "string") emailEl.value = data.email;
        restore(data, !!urlLead);
        if (urlLead) track("resumed");
      })
      .catch(() => {
        lead = null;
        store.del("cs_fx_lead");
        show(1, false);
      });
  } else {
    show(1, false);
  }
}
