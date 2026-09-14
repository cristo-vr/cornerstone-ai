# Cornerstone AI, the site

The brand site for Cornerstone AI at cornerstone-ai.pro: who the company is
and the outcome it stands for, not the offer. The home page (hero, the story,
what we do, work, manifesto, contact), an about page, the Simple Systems
newsletter page, and the legal pages.
Astro, static output, no framework on the client. Built 13 September 2026.
The offer itself gets its own landing page elsewhere.

## Run it

```
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/
npm run check      # astro type-check
```

## Where things are

| Path | What |
| --- | --- |
| `src/pages/index.astro` | The home page. Copy lives in the frontmatter arrays (story, pillars, work). |
| `src/components/Cube.astro` | The hero background: the cornerstone, then hollow blocks glitching into a 3x3x3 cube that orbits. Real CSS 3D. |
| `src/components/Icon.astro` | Inlines a Phosphor icon at build time. |
| `src/pages/about.astro` | Mission, what we believe, the founder (photo slot is empty until a real one arrives). |
| `src/pages/simple-systems.astro` | Simple Systems Saturday signup. Kit form 9736253. |
| `src/pages/privacy.astro`, `terms.astro`, `refund-policy.astro` | Legal. Written to the 12 week offer. Review before publishing. |
| `src/components/LeadForm.astro` | Two steps: name, email, message posts at once (a visitor who leaves is still captured); then budget, authority, need, timeline post again and merge into the same lead. Turnstile on both. |
| `src/scripts/site.ts` | All the JavaScript: scroll reveals, nav, both forms. |
| `src/styles/global.css` | Brand tokens (v2.2 Set in Concrete), type scale, buttons, forms. |
| `public/brand/` | Generated brand assets, copied from the Mason repo. Never hand-edit. |
| `public/_redirects` | Every old URL, mapped. |
| `scripts/build-og.mjs` | Renders `public/og.png` and `public/og-simple-systems.png` with system Chrome. Run after changing the hero line. |
| `scripts/shot.mjs`, `scripts/smoke.mjs` | Screenshot and smoke-test the built site with system Chrome. |

## Wiring that lives elsewhere

- **Leads** go to `https://aios.cornerstone-ai.pro/api/public/lead`. That endpoint has an origin allowlist (`functions/api/public/lead.ts` in Mason), and since commit c30d566 a repeat post from the same email inside 30 minutes merges into the existing lead, which is what the second form step relies on. A new Pages project name or preview host has to be added to the allowlist before the form works from it.
- **Turnstile** site key `0x4AAAAAACN3bXEw6zTOBNYc`. Hostnames are managed in the Cloudflare dashboard; add the new host before testing.
- **Booking** is Mason's own booking service: `https://cal.cornerstone-ai.pro/cristo/discovery-call-30-mins`.
- **Newsletter** is Kit, form `9736253`, double opt-in.
- **Analytics** is Cloudflare Web Analytics, injected at the edge. Nothing in the code.

## Deploy

Cloudflare Pages, build command `npm run build`, output directory `dist`.
Connect the repo to Pages and deploy from `main`; a `wrangler pages deploy`
is transient and gets replaced on the next git-connected build.
