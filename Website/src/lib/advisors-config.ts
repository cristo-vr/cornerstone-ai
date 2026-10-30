/**
 * /advisors page settings. Everything a launch flips lives here.
 */

/** Production posts to Mason only when the build sets PUBLIC_FUNNEL_LIVE=1.
 *  Anything else (local dev, a preview build) is dry run: events go to the
 *  console, the form and the calendar are mocked, no pixel is rendered. */
export const LIVE = import.meta.env.PUBLIC_FUNNEL_LIVE === "1";

export const FUNNEL = "advisors";

/** Gate the video behind name and email. Off: the video plays for anyone and
 *  step 1 sits directly under it. The funnel measures video_play against
 *  form_start either way. */
export const GATE_VIDEO = false;

/** The v3 Giveaway cut on R2. Flip MEDIA_READY once hls/, vsl-720.mp4 and
 *  poster.jpg are uploaded under this prefix. */
export const MEDIA_V3 = "https://media.cornerstone-ai.pro/vsl/advisors-v3";
export const MEDIA_READY = true;
/** The v2 media, used as a labelled placeholder until v3 is uploaded. */
export const MEDIA_FALLBACK = "https://media.cornerstone-ai.pro/vsl/expansion-v2";

export interface VideoSource {
  hls: string | null;
  mp4: string;
  poster: string;
  /** Shown as a badge on the player, never in production with real media. */
  badge: string | null;
}

/** Local dev plays the real v3 file from public/_local/ (gitignored). */
export function videoSource(dev: boolean): VideoSource {
  if (dev) {
    return { hls: null, mp4: "/_local/vsl-advisors.mp4", poster: "/_local/vsl-advisors-poster.jpg", badge: "Local preview video" };
  }
  const base = MEDIA_READY ? MEDIA_V3 : MEDIA_FALLBACK;
  return {
    hls: `${base}/hls/master.m3u8`,
    mp4: `${base}/vsl-720.mp4`,
    poster: `${base}/poster.jpg`,
    badge: MEDIA_READY ? null : "Placeholder video",
  };
}

export const META_PIXEL_ID = "1412498887021989";
/** LinkedIn Insight Tag partner id. Empty: the tag isn't rendered. */
export const LINKEDIN_PARTNER_ID = "11242129";
/** LinkedIn conversion ids, per event. Empty: not sent. */
export const LINKEDIN_CONVERSIONS: Record<"qualified" | "booked", string> = { qualified: "", booked: "" };

/** Where a visitor writes when the calendar fails. */
export const CONTACT_EMAIL = "cristo@cornerstone-ai.pro";

export const CLOSE_DATE = "15 November 2026";
export const ANNOUNCE_DATE = "20 November 2026";
