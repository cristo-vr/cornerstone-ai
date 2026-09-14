/**
 * Where a visitor came from, captured once and kept for the session.
 *
 * The reason this is not just read off `window.location` at submit time: by the
 * time somebody fills in the contact form they have usually clicked through two
 * or three pages, and the UTM parameters died on the first navigation. Reading
 * them at submit gives you "referrer: cornerstone-ai.pro" for every lead, which
 * is the same as knowing nothing.
 *
 * So: capture on the FIRST page of the session, stash it, and attach it at
 * submit. sessionStorage rather than localStorage on purpose — a visit next
 * month is a new visit, and attributing it to a campaign they clicked in
 * February would be worse than saying "direct".
 */

const KEY = "cs_attribution";

export interface Attribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  /** The external page that sent them, blank for a direct visit. */
  referrer: string | null;
  /** First page of the session. */
  landingPath: string | null;
}

const EMPTY: Attribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmTerm: null,
  utmContent: null,
  referrer: null,
  landingPath: null,
};

/** Capture on first load of a session. Safe to call on every page — it only
 *  writes when nothing is stored yet, so the LANDING page wins, not the last. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k)?.trim() || null;

    // A same-origin referrer means an internal click, which tells us nothing
    // about acquisition. Only external referrers are recorded.
    let referrer: string | null = null;
    if (document.referrer) {
      try {
        const host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) referrer = document.referrer;
      } catch {
        /* malformed referrer — ignore it */
      }
    }

    const data: Attribution = {
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      utmTerm: get("utm_term"),
      utmContent: get("utm_content"),
      referrer,
      landingPath: window.location.pathname + window.location.search,
    };

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private browsing or storage disabled. A lead without attribution is still
    // a lead; never let this break the form.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) };
  } catch {
    return EMPTY;
  }
}
