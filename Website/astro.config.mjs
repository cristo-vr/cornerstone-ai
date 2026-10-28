// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { rm } from "node:fs/promises";

// public/_local/ holds local-only preview media (the 415 MB VSL for /advisors
// in dev). It is gitignored, and this keeps it out of any local dist/ too, so
// a hand upload of dist can never carry it.
/** @type {import("astro").AstroIntegration} */
const dropLocalMedia = {
  name: "drop-local-media",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await rm(new URL("_local/", dir), { recursive: true, force: true });
    },
  },
};

// Static output. Cloudflare Pages serves `dist/` as-is; the only server-side
// piece the site talks to is Mason's public lead endpoint, cross-origin.
export default defineConfig({
  site: "https://cornerstone-ai.pro",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  // The cast: @tailwindcss/vite types against the top-level vite, Astro against
  // its own nested copy. Same plugin, two type identities, no runtime difference.
  integrations: [dropLocalMedia],
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
