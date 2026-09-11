#!/usr/bin/env node
/**
 * Builds the Simple Systems link-preview card into public/images/.
 *
 *   node scripts/build-og-simple-systems.mjs
 *
 * WHY A GENERATOR. The card is the /simple-systems page at 1200x630: the same
 * mark, the same Big Shoulders face, the same concrete. Hand-exporting it from
 * a design tool makes a second copy of the brand that stops tracking the first,
 * which is the exact failure the mason brand-asset builder exists to avoid.
 * Change the line here, re-run.
 *
 * The card's line is NOT the page's H1. The page argues ("simpler businesses
 * scale further"); the card is read in a feed at thumbnail size and has to name
 * the thing instead. That is also why there is no eyebrow: with the newsletter
 * named in the headline, a tracked-caps "SIMPLE SYSTEMS" above it was the same
 * words twice.
 *
 * WHY CHROME. The mark's character is the `cs-rough` feDisplacementMap. sharp /
 * librsvg silently drop feTurbulence and hand back a clean geometric block,
 * which the brand pack's do-not list forbids. Only a browser engine renders it.
 *
 * WHY THE FONTS ARE FETCHED. Big Shoulders Display and Hanken Grotesk are not
 * installed on this machine. A card that names them in CSS without embedding
 * them renders in whatever the machine has, and the difference is invisible
 * until it is on someone's LinkedIn feed.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";

const OUT_JPG = "public/images/og-simple-systems.jpg";
const TMP = join(tmpdir(), "cornerstone-og-build");
const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const W = 1200;
const H = 630;

/* -- the brand, verbatim -------------------------------------------------- */

/** The three mark faces, brand pack section 02, on a 0 0 100 100 viewBox. */
const FACES = [
  { d: "M50 10 L88 31 L50 52 L12 31 Z", fill: "#DEBD82" }, // lit
  { d: "M12 31 L50 52 L50 92 L12 71 Z", fill: "#D1A24F" }, // mid
  { d: "M88 31 L50 52 L50 92 L88 71 Z", fill: "#986F28" }, // shadow
];

const GROUND = "#EAEAE6";
const TEXT = "#2F2F2C";
const TEXT_2 = "#63625B";
const LINE = "#D3D3CD";
const ACCENT = "#D1A24F"; // a FILL. never type.
const ACCENT_INK = "#785614"; // brass as a glyph, pack v2.2

/* The concrete, lifted from app/globals.css so the card sits on the same
   surface the page does. */
const MOTTLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='900'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.012' numOctaves='4' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23fff'/%3E%3Crect width='100%25' height='100%25' filter='url(%23m)' opacity='.15'/%3E%3C/svg%3E\")";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/* -- fonts ---------------------------------------------------------------- */

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function fontFace(family, weight, cssFamily) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${cssFamily}:wght@${weight}&display=swap`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();
  // Google returns one @font-face per unicode subset. Latin is all this card sets.
  const blocks = css.split("@font-face").filter(Boolean);
  const latin =
    blocks.find((b) => /unicode-range:[^;]*U\+0000/.test(b)) || blocks[blocks.length - 1];
  const url = latin.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font URL in the Google Fonts CSS for ${family}.`);
  const buf = Buffer.from(
    await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer(),
  );
  const fmt = url.endsWith(".woff2") ? "woff2" : url.endsWith(".woff") ? "woff" : "truetype";
  console.log(`  ${family} ${weight}: ${fmt}, ${(buf.length / 1024).toFixed(1)} kB`);
  return (
    `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};` +
    `src:url(data:font/${fmt};base64,${buf.toString("base64")}) format("${fmt}");}`
  );
}

/* -- chrome --------------------------------------------------------------- */

const winPath = (p) => resolve(p).replace(/\//g, "\\");
const fileUrl = (p) => `file:///${resolve(p).replace(/\\/g, "/")}`;

function pngSize(path) {
  const b = readFileSync(path);
  if (b.length < 24 || b.readUInt32BE(12) !== 0x49484452) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

function shoot(htmlPath, outPath) {
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      // Without its own profile, headless attaches to a RUNNING Chrome and
      // returns instantly having rendered nothing.
      `--user-data-dir=${winPath(join(TMP, "profile"))}`,
      `--window-size=${W},${H}`,
      "--force-device-scale-factor=1",
      // The webfonts and the SVG filter each need a paint after load.
      "--virtual-time-budget=6000",
      `--screenshot=${winPath(outPath)}`,
      fileUrl(htmlPath),
    ],
    { stdio: ["ignore", "pipe", "pipe"], timeout: 90_000 },
  );

  // Chrome exits 0 on a write failure and clamps a viewport it cannot honour,
  // so neither the exit code nor the request is evidence. The file is.
  if (!existsSync(outPath)) throw new Error(`${outPath}: Chrome wrote no file.`);
  const got = pngSize(outPath);
  if (!got) throw new Error(`${outPath}: not a PNG.`);
  if (got.w !== W || got.h !== H)
    throw new Error(`${outPath}: asked for ${W}x${H}, got ${got.w}x${got.h}.`);
}

/* -- the card ------------------------------------------------------------- */

const paths = () => FACES.map((f) => `<path d="${f.d}" fill="${f.fill}"/>`).join("");

const markSvg = (px) => `
  <svg width="${px}" height="${px}" viewBox="0 0 100 100" style="overflow:visible">
    <defs>
      <!-- cs-rough: baseFrequency .04 / scale 3.5. Cast by hand, not chipped. -->
      <filter id="cs-rough" x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="8" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5"/>
      </filter>
    </defs>
    <g filter="url(#cs-rough)">${paths()}</g>
  </svg>`;

const card = (faces) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{
  background-color:${GROUND};
  background-image:${MOTTLE};
  background-size:900px 900px;
  background-blend-mode:multiply;
  font-family:"Hanken Grotesk",sans-serif;
  color:${TEXT};
  -webkit-font-smoothing:antialiased;
}
/* The tooth of the surface, above everything, same as the site. */
body::after{
  content:"";position:fixed;inset:0;pointer-events:none;
  opacity:.42;mix-blend-mode:multiply;background-image:${GRAIN};
}
.card{position:relative;z-index:2;height:100%;padding:72px 76px;display:flex;flex-direction:column}
.lockup{display:flex;align-items:center;gap:13px}
.word{font-family:"Big Shoulders Display",sans-serif;font-weight:800;font-size:37px;
      text-transform:uppercase;letter-spacing:.01em;line-height:1}
.spacer{flex:1}
.rule{width:56px;height:4px;background:${ACCENT}}
h1{font-family:"Big Shoulders Display",sans-serif;font-weight:800;font-size:148px;
   line-height:.88;text-transform:uppercase;letter-spacing:.005em;margin-top:30px}
.hair{height:1px;background:${LINE};margin-top:44px}
.foot{margin-top:24px;font-size:23px;color:${TEXT_2}}
</style></head>
<body>
  <div class="card">
    <div class="lockup">${markSvg(46)}<span class="word">Cornerstone</span></div>
    <div class="spacer"></div>
    <div class="rule"></div>
    <h1>Simple systems<br>that scale.</h1>
    <div class="hair"></div>
    <div class="foot">One email a week. Free.</div>
  </div>
</body></html>`;

/* -- main ----------------------------------------------------------------- */

const display = await fontFace("Big Shoulders Display", 800, "Big+Shoulders+Display");
const bodySemi = await fontFace("Hanken Grotesk", 600, "Hanken+Grotesk");
const bodyRegular = await fontFace("Hanken Grotesk", 400, "Hanken+Grotesk");

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
const htmlPath = join(TMP, "card.html");
const pngPath = join(TMP, "card.png");
writeFileSync(htmlPath, card([display, bodySemi, bodyRegular].join("\n")), "utf8");

shoot(htmlPath, pngPath);

// JPEG, not PNG: the card is a concrete ground with grain, which PNG cannot
// compress. Every OG consumer accepts JPEG.
const info = await sharp(pngPath)
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toFile(OUT_JPG);
console.log(`  ${OUT_JPG}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} kB`);
