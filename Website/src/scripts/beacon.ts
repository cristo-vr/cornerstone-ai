export {};

/**
 * The page count, on every page of the site. One post per page load to
 * Mason's public endpoint, which is where the visitor count is worked out.
 *
 * WHAT THE PRIVACY PAGE PROMISES, AND THIS FILE KEEPS:
 *   - no cookie, and nothing written to the browser's storage
 *   - the path only, with a personal /w/<code> link collapsed to /w
 *   - the referrer as a hostname only, the five utm_ values, and no other part
 *     of the query string
 * Change any of those and /privacy has to change with it.
 *
 * Your own visits: ?internal=1 marks that one load. A browser already marked
 * for good on a program page (?internal=1 there, read as cs_internal) is left
 * out as well. Reading that flag is all this file does with storage.
 */
const ENDPOINT = "https://aios.cornerstone-ai.pro/api/public/site-event";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function send(): void {
  const params = new URLSearchParams(location.search);

  let internal = params.get("internal") === "1";
  try {
    internal = internal || localStorage.getItem("cs_internal") === "1";
  } catch {
    // Storage blocked: the visit simply is not marked.
  }

  let referrer = "";
  try {
    if (document.referrer) referrer = new URL(document.referrer).hostname;
  } catch {
    // Not a URL: treated as direct.
  }

  const body: Record<string, string | boolean> = {
    path: location.pathname.replace(/^\/w\/.*/, "/w"),
    referrer,
    internal,
  };
  for (const key of UTM) {
    const value = params.get(key);
    if (value) body[key] = value;
  }

  const payload = JSON.stringify(body);
  // text/plain keeps this a CORS "simple" request: no preflight, and the page never waits on it.
  if (navigator.sendBeacon?.(ENDPOINT, payload)) return;
  void fetch(ENDPOINT, { method: "POST", body: payload, keepalive: true, credentials: "omit", headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

try {
  send();
} catch {
  // A count must never break a page.
}
