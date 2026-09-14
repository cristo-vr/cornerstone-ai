"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records where this session came from, once, on the first page that renders.
 *
 * Mounted in the root layout so it runs regardless of entry point — people land
 * on /blog posts and /the-os-sprint far more often than on the homepage, and an
 * attribution that only worked for homepage traffic would quietly misattribute
 * every one of them to "direct".
 */
export default function SiteAnalytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
