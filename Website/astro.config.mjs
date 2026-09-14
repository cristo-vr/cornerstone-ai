// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output. Cloudflare Pages serves `dist/` as-is; the only server-side
// piece the site talks to is Mason's public lead endpoint, cross-origin.
export default defineConfig({
  site: "https://cornerstone-ai.pro",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  // The cast: @tailwindcss/vite types against the top-level vite, Astro against
  // its own nested copy. Same plugin, two type identities, no runtime difference.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
