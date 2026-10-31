// VSL retention: which 5 s slices of the video this session actually played.
//
// Sent as `video_watch` (tracking contract §5): a hex bitmap of slices, saved
// every 30 s while playing, on pause and end, and when the page hides, so a
// phone that kills the tab still leaves its last checkpoint. The latest `seq`
// per session is the record.
//
// Only continuous playback counts: a jump marks nothing until the video plays
// on from where it landed. Everything here is wrapped so a failure stops the
// measuring, never the player or the form.

import { flush, track } from "./funnel-client";

const SLICE = 5;
const MAX_SLICES = 160; // 40 hex chars, the server's cap

/** Bit i lives in hex char i >> 2, mask 8 >> (i & 3). */
function toHex(bits: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bits.length; i += 4) {
    out += ((bits[i] << 3) | ((bits[i + 1] ?? 0) << 2) | ((bits[i + 2] ?? 0) << 1) | (bits[i + 3] ?? 0)).toString(16);
  }
  return out;
}

export function trackRetention(v: HTMLVideoElement, version: string): void {
  let bits: Uint8Array | null = null;
  let last: number | null = null;
  let seq = 0;
  let dirty = false;
  let seeks = 0;
  let pos = 0;
  let maxRate = 1;

  const ensure = (): Uint8Array | null => {
    if (bits) return bits;
    const dur = v.duration;
    if (!dur || !Number.isFinite(dur)) return null;
    const n = Math.ceil(dur / SLICE);
    if (n < 1 || n > MAX_SLICES) return null;
    bits = new Uint8Array(n);
    return bits;
  };

  const send = (final: boolean) => {
    try {
      if (!bits || !dirty) return;
      dirty = false;
      seq += 1;
      track("video_watch", {
        v: version,
        b: toHex(bits),
        dur: Math.round(v.duration),
        slice: SLICE,
        pos: Math.round(pos),
        seq,
        rate: maxRate,
        seeks,
        final,
      });
    } catch {
      /* measuring is optional */
    }
  };

  v.addEventListener("timeupdate", () => {
    try {
      const b = ensure();
      if (!b || v.paused || v.seeking) return;
      const t = v.currentTime;
      // A gap of more than a few seconds between updates is a jump, not play.
      if (last !== null && t > last && t - last < 3 + v.playbackRate) {
        const from = Math.floor(last / SLICE);
        const to = Math.min(Math.floor(t / SLICE), b.length - 1);
        for (let i = from; i <= to; i++) {
          if (!b[i]) {
            b[i] = 1;
            dirty = true;
          }
        }
      }
      last = t;
      if (t > pos) pos = t;
      if (v.playbackRate > maxRate) maxRate = v.playbackRate;
    } catch {
      /* measuring is optional */
    }
  });
  v.addEventListener("seeking", () => {
    seeks += 1;
    last = null;
  });
  v.addEventListener("pause", () => {
    last = null;
    send(false);
  });
  v.addEventListener("ended", () => send(true));

  setInterval(() => {
    if (!v.paused) send(false);
  }, 30_000);

  // funnel-client flushes on these too, but registered first, so queue then flush here.
  const leave = () => {
    send(true);
    flush();
  };
  addEventListener("pagehide", leave);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      send(false);
      flush();
    }
  });
}
