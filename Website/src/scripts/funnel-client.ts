/**
 * The funnel adapter. ONE module between a funnel page and Mason, so the page
 * never knows where events, leads or bookings go and the whole thing can be
 * re-pointed here.
 *
 *   POST aios.../api/public/funnel/event   the analytics beacon
 *   POST aios.../api/public/funnel/lead    capture, answer, resume, booked
 *   GET  cal.../api/cal/cristo/<slug>/slots
 *   POST cal.../api/cal/cristo/<slug>/book
 *
 * DRY RUN unless the build sets PUBLIC_FUNNEL_LIVE=1: every event is logged
 * with console.info, the lead and booking calls return mocks, and nothing is
 * sent to aios. or cal. Mock edge cases for review: ?mock=slot_taken,
 * ?mock=already_booked, ?mock=cal_error, ?mock=no_slots, ?mock=net_error.
 *
 * Your own visits: ?internal=1 marks this browser internal for good
 * (?internal=0 undoes it). Internal visits fire no pixel and the panel
 * leaves them out.
 */

import { LIVE, LINKEDIN_CONVERSIONS } from "../lib/advisors-config";

export { LIVE };

/** The contract with the Mason funnel module. Use these names exactly. */
export type FunnelEvent =
  | "page_view"
  | "video_play"
  | "video_progress"
  | "form_start"
  | "form_step"
  | "form_submit"
  | "qualified"
  | "disqualified"
  | "booking_view"
  | "booked";

type Dict = Record<string, unknown>;

const API = "https://aios.cornerstone-ai.pro/api/public/funnel";
const CAL_BASE = "https://cal.cornerstone-ai.pro/api/cal/cristo";
/** Booking event type. [CONFIRM] a dedicated advisors slug once Mason has one;
 *  until then the expansion call is the one that exists. */
const CAL_SLUG = "expansion-call";
const TURNSTILE_LIVE_KEY = "0x4AAAAAACN3bXEw6zTOBNYc";
/** Cloudflare's always-pass test key: localhost isn't on the live widget. */
const TURNSTILE_TEST_KEY = "1x00000000000000000000AA";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, data: Dict) => void;
    Hls?: any;
    __axTurnstileReady?: () => void;
  }
}

// ─── storage ────────────────────────────────────────────────────────────────

export const store = {
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
  del(k: string, session = false) {
    try {
      (session ? sessionStorage : localStorage).removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

export function cookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${days * 86400}; Path=/; SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
}

const uid = () =>
  (crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`).toLowerCase();

// ─── identity ───────────────────────────────────────────────────────────────

const params = new URLSearchParams(location.search);
if (params.get("internal") === "1") store.set("cs_internal", "1");
if (params.get("internal") === "0") store.del("cs_internal");
export const internal = store.get("cs_internal") === "1";
const mock = LIVE ? null : params.get("mock");

export const visitorId: string = (() => {
  let v = store.get("cs_vid");
  if (!v) {
    v = uid();
    store.set("cs_vid", v);
  }
  return v;
})();

export const sessionId: string = (() => {
  let s = store.get("cs_sid", true);
  if (!s) {
    s = uid();
    store.set("cs_sid", s, true);
  }
  return s;
})();

let leadId: string | null = null;
export const setLeadId = (id: string | null) => {
  leadId = id;
};

// ─── attribution, first touch ───────────────────────────────────────────────
//
// Read on landing: by the time someone submits, the click ids may be several
// navigations gone. Session storage holds this session's first touch; a 30 day
// first-party cookie keeps it for a visitor who comes back from an email link
// with a bare URL.

const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "li_fat_id", "gclid"];
const ATTR_SESSION = "cs_ax_attr";
const ATTR_COOKIE = "cs_attr";

export const attribution: Record<string, string> = (() => {
  const saved = store.get(ATTR_SESSION, true);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      /* fall through */
    }
  }
  const fresh: Record<string, string> = {};
  for (const k of ATTR_KEYS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 500);
  }
  if (document.referrer && !document.referrer.startsWith(location.origin)) fresh.referrer = document.referrer.slice(0, 500);
  fresh.landing_path = location.pathname;
  fresh.first_seen = new Date().toISOString();

  // A bare return visit inherits the campaign it first came from.
  const hasClick = ATTR_KEYS.some((k) => fresh[k]);
  let out = fresh;
  if (!hasClick) {
    try {
      const prior = JSON.parse(cookie(ATTR_COOKIE) || "null");
      if (prior && typeof prior === "object") out = { ...prior, referrer: fresh.referrer ?? prior.referrer ?? "", returning: "1" };
    } catch {
      /* ignore */
    }
  }
  store.set(ATTR_SESSION, JSON.stringify(out), true);
  if (hasClick || !cookie(ATTR_COOKIE)) setCookie(ATTR_COOKIE, JSON.stringify(out).slice(0, 3500), 30);
  return out;
})();

export const fbp = () => cookie("_fbp");
export const fbc = () => cookie("_fbc") ?? (attribution.fbclid ? `fb.1.${Date.now()}.${attribution.fbclid}` : null);

// ─── the beacon ─────────────────────────────────────────────────────────────

let funnelName = "advisors";
export const setFunnel = (name: string) => {
  funnelName = name;
};

interface Queued {
  event: FunnelEvent;
  props?: Dict;
  at: string;
  lead_id: string | null;
}
let queue: Queued[] = [];

export function flush() {
  if (!queue.length) return;
  const batch = queue.splice(0, 25);
  const body = {
    funnel: funnelName,
    visitor_id: visitorId,
    session_id: sessionId,
    lead_id: leadId,
    internal,
    path: location.pathname,
    attribution,
    events: batch,
  };
  if (!LIVE) {
    console.info("[funnel dry-run] flush", body);
  } else {
    const json = JSON.stringify(body);
    // text/plain: no CORS preflight, so it survives pagehide.
    const sent = navigator.sendBeacon?.(`${API}/event`, new Blob([json], { type: "text/plain" }));
    if (!sent) {
      fetch(`${API}/event`, { method: "POST", body: json, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
    }
  }
  if (queue.length) flush();
}

export function track(event: FunnelEvent, props?: Dict) {
  const item: Queued = { event, at: new Date().toISOString(), lead_id: leadId };
  if (props) item.props = props;
  queue.push(item);
  if (!LIVE) console.info(`[funnel dry-run] ${event}`, props ?? {}, { session_id: sessionId, lead_id: leadId });
  if (queue.length >= 10) flush();
}

setInterval(flush, 4000);
addEventListener("pagehide", flush);
document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && flush());

// ─── ad platforms ───────────────────────────────────────────────────────────
//
// form_start: a custom event, for retargeting only. Lead: on qualified, only.
// Schedule: on booked. eventID matches the server's CAPI event for dedupe.

export function pixel(...args: unknown[]) {
  if (internal) return;
  if (!LIVE) {
    console.info("[funnel dry-run] fbq", ...args);
    return;
  }
  window.fbq?.(...args);
}

export function linkedin(kind: keyof typeof LINKEDIN_CONVERSIONS) {
  const id = LINKEDIN_CONVERSIONS[kind];
  if (internal || !id) return;
  if (!LIVE) {
    console.info("[funnel dry-run] lintrk", kind, id);
    return;
  }
  window.lintrk?.("track", { conversion_id: Number(id) });
}

// ─── Turnstile ──────────────────────────────────────────────────────────────

/** Typed locally: other scripts on the site declare window.turnstile too. */
interface TurnstileApi {
  render: (el: HTMLElement, opts: Dict) => string;
  reset: (id?: string) => void;
}
const ts = () => (window as unknown as { turnstile?: TurnstileApi }).turnstile;
//
// Rendered once, invisible unless Cloudflare wants a challenge. A token is
// single use, so every spend is followed by a reset to mint the next one. It
// never blocks the visitor: a capture without a token is still stored.

let tsWidget: string | undefined;
let tsToken: string | null = null;
const tsWaiters: Array<(t: string | null) => void> = [];

export function mountTurnstile(slot: HTMLElement | null) {
  if (!slot || document.getElementById("cf-turnstile-script")) return;
  window.__axTurnstileReady = () => {
    tsWidget = ts()?.render(slot, {
      sitekey: LIVE ? TURNSTILE_LIVE_KEY : TURNSTILE_TEST_KEY,
      appearance: "interaction-only",
      retry: "auto",
      "retry-interval": 1500,
      "refresh-expired": "auto",
      "before-interactive-callback": () => slot.classList.add("is-open"),
      "after-interactive-callback": () => slot.classList.remove("is-open"),
      callback: (t: string) => {
        tsToken = t;
        slot.classList.remove("is-open");
        tsWaiters.splice(0).forEach((w) => w(t));
      },
      "expired-callback": () => {
        tsToken = null;
      },
      "error-callback": () => {
        tsToken = null;
        slot.classList.remove("is-open");
        return true;
      },
    });
  };
  const s = document.createElement("script");
  s.id = "cf-turnstile-script";
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__axTurnstileReady&render=explicit";
  s.async = true;
  document.head.appendChild(s);
}

export function takeToken(ms = 6000): Promise<string | null> {
  // Dry run never waits long: the mocks don't check the token.
  if (!LIVE) ms = Math.min(ms, 800);
  const use = (t: string | null) => {
    tsToken = null;
    if (tsWidget !== undefined) setTimeout(() => ts()?.reset(tsWidget), 50);
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

// ─── lead API ───────────────────────────────────────────────────────────────

export interface LeadResult {
  lead_id?: string;
  token?: string;
  status?: string;
  country?: string;
  returning?: boolean;
  name?: string;
  email?: string;
  answers?: Record<string, string | string[]>;
  step_reached?: number;
  error?: string;
  [k: string]: unknown;
}

const NET_ERROR = "That didn't go through. Try again in a moment.";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Dry run keeps mock leads in this browser so resume can be reviewed. */
const DRY_DB = "cs_ax_dry_leads";
type DryLead = { name: string; email: string; answers: Record<string, string | string[]>; status: string; step_reached: number };
const dryAll = (): Record<string, DryLead> => {
  try {
    return JSON.parse(store.get(DRY_DB) || "{}");
  } catch {
    return {};
  }
};
const drySave = (id: string, patch: Partial<DryLead>) => {
  const all = dryAll();
  all[id] = { ...(all[id] ?? { name: "", email: "", answers: {}, status: "partial", step_reached: 1 }), ...patch };
  store.set(DRY_DB, JSON.stringify(all));
  return all[id];
};

async function mockLead(body: Dict): Promise<LeadResult> {
  await sleep(350);
  console.info("[funnel dry-run] lead", body);
  if (mock === "net_error") throw new Error(NET_ERROR);
  const action = body.action;
  if (action === "capture") {
    const email = String(body.email ?? "").toLowerCase();
    const found = Object.entries(dryAll()).find(([, l]) => l.email === email);
    if (found) return { lead_id: found[0], token: "dry", returning: true, country: "ZA", ...found[1] };
    const id = `dry-${uid().slice(0, 8)}`;
    drySave(id, { name: String(body.name ?? ""), email });
    return { lead_id: id, token: "dry", status: "partial", country: "ZA", returning: false };
  }
  const id = String(body.lead_id ?? "");
  const known = dryAll()[id];
  if (action === "resume") {
    if (!known) throw new Error("not found");
    return { lead_id: id, token: "dry", country: "ZA", ...known };
  }
  if (action === "answer") {
    const answers = (body.answers ?? {}) as Record<string, string | string[]>;
    const patch: Partial<DryLead> = { answers, step_reached: Number(body.step ?? 1) };
    if (body.complete) patch.status = body.disqualified ? "disqualified" : "qualified";
    const l = drySave(id, patch);
    return { status: l.status };
  }
  if (action === "booked") {
    drySave(id, { status: "booked" });
    return { status: "booked" };
  }
  return {};
}

async function postLead(body: Dict): Promise<LeadResult> {
  if (!LIVE) return mockLead(body);
  let res: Response;
  try {
    res = await fetch(`${API}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, funnel: funnelName, page_url: location.href.split("?")[0] }),
    });
  } catch {
    throw new Error(NET_ERROR);
  }
  const data = (await res.json().catch(() => ({}))) as LeadResult;
  if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : NET_ERROR);
  return data;
}

export const lead = {
  capture: (b: { name: string; email: string; company: string; turnstileToken: string | null }) =>
    postLead({
      action: "capture",
      funnel: funnelName,
      ...b,
      visitor_id: visitorId,
      session_id: sessionId,
      attribution,
      internal,
      fbp: fbp(),
      fbc: fbc(),
    }),
  answer: (b: Dict) => postLead({ action: "answer", ...b }),
  resume: (lead_id: string, token: string) => postLead({ action: "resume", lead_id, token }),
  booked: (lead_id: string, token: string, booking_id?: string) =>
    postLead({ action: "booked", lead_id, token, ...(booking_id ? { booking_id } : {}) }),
};

// ─── booking ────────────────────────────────────────────────────────────────

/** Next ten weekdays, 09:00 to 16:00 SAST on the hour, a few already taken. */
function mockSlots(): string[] {
  const out: string[] = [];
  const d = new Date();
  let days = 0;
  while (days < 10) {
    d.setUTCDate(d.getUTCDate() + 1);
    const wd = d.getUTCDay();
    if (wd === 0 || wd === 6) continue;
    days++;
    for (let h = 9; h <= 16; h++) {
      if ((h + days) % 4 === 0) continue;
      out.push(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h - 2, 0)).toISOString());
    }
  }
  return out;
}

export class BookError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export const cal = {
  async slots(): Promise<string[]> {
    if (!LIVE) {
      await sleep(500);
      if (mock === "cal_error") throw new Error("calendar");
      return mock === "no_slots" ? [] : mockSlots();
    }
    const res = await fetch(`${CAL_BASE}/${CAL_SLUG}/slots`);
    const data = (await res.json().catch(() => ({}))) as { slots?: string[]; error?: string };
    if (!res.ok) throw new Error(data.error || "calendar");
    return data.slots ?? [];
  },

  /** ⚠ Never send a field called "website" here: it is the booking service's
   *  honeypot, and a filled one is silently dropped as a bot. */
  async book(b: { startsAt: string; name: string; email: string; timezone: string; context: string; turnstileToken: string | null }) {
    const body = {
      startsAt: b.startsAt,
      name: b.name,
      email: b.email,
      timezone: b.timezone,
      answers: [{ key: "funnel_context", answer: b.context }],
      turnstileToken: b.turnstileToken,
    };
    if (!LIVE) {
      await sleep(600);
      console.info("[funnel dry-run] book", body);
      if (mock === "slot_taken") throw new BookError("slot_taken", "slot_taken");
      if (mock === "already_booked") throw new BookError("already_booked", "already_booked");
      return { bookingId: `dry-booking-${uid().slice(0, 6)}`, startsAt: b.startsAt };
    }
    const res = await fetch(`${CAL_BASE}/${CAL_SLUG}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as Dict;
    if (!res.ok) throw new BookError(String(data.code ?? res.status), typeof data.error === "string" ? data.error : "book_failed");
    return { bookingId: String(data.bookingId ?? ""), startsAt: String(data.startsAt ?? b.startsAt) };
  },
};

if (!LIVE) {
  console.info(
    "%c[funnel] DRY RUN%c events log here, nothing is sent to Mason or the calendar. Set PUBLIC_FUNNEL_LIVE=1 to go live.",
    "background:#D1A24F;color:#141310;padding:2px 6px;font-weight:700",
    "",
  );
}
