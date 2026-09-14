"use client";

import { useEffect } from "react";

/**
 * Shared, counted scroll lock.
 *
 * Four things on this page want to freeze the background: the preloader and
 * three dialogs. When each one saved and restored `body.style.overflow`
 * independently, an overlap restored the wrong value: whoever locked second
 * captured "hidden" as the value to go back to, and unlocking left the page
 * permanently unscrollable. Counting means only the first lock records the
 * original and only the last release restores it.
 */
let locks = 0;
let original = "";

export function lockScroll() {
  if (locks === 0) {
    original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
}

export function releaseScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.body.style.overflow = original;
  }
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return releaseScroll;
  }, [active]);
}
