/**
 * Renders the Open Graph cards with the system Chrome, so the mark keeps its
 * rough-cast filter and the display face is the real one.
 *
 *   node scripts/build-og.mjs
 *
 * Writes public/og.png and public/og-simple-systems.png at 1200x630.
 */
import puppeteer from "puppeteer-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const root = resolve(import.meta.dirname, "..");
const font = (f) => `data:font/woff2;base64,${readFileSync(resolve(root, "public/fonts", f)).toString("base64")}`;

const cards = [
  {
    out: "public/og.png",
    kicker: "Cornerstone AI",
    line1: "Scale on",
    line2: "solid",
    line3: "ground.",
    foot: "AI advisory and development. The foundations a business scales on.",
  },
  {
    out: "public/og-simple-systems.png",
    kicker: "Simple Systems",
    line1: "Simple",
    line2: "scales.",
    line3: "",
    foot: "Notes from Cristo Van Rensburg on scaling by simplifying. cornerstone-ai.pro/simple-systems",
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:BSD;src:url(${font("big-shoulders-display.woff2")}) format("woff2-variations");font-weight:100 900}
@font-face{font-family:HG;src:url(${font("hanken-grotesk.woff2")}) format("woff2-variations");font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:#1c1b18;color:#edebe4;font-family:HG,sans-serif;overflow:hidden}
.wrap{position:relative;width:1200px;height:630px;padding:64px 72px;box-sizing:border-box}
.kicker{font-size:22px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#a9a498}
h1{font-family:BSD;font-weight:800;text-transform:uppercase;font-size:118px;line-height:.9;margin:34px 0 0;letter-spacing:.005em}
h1 .b{color:#ddbb7d}
.foot{position:absolute;left:72px;bottom:64px;font-size:24px;color:#a9a498}
.mark{position:absolute;right:72px;top:64px;width:190px;height:190px}
</style></head><body><div class="wrap">
<svg width="0" height="0" style="position:absolute"><defs><filter id="rc" x="-25%" y="-25%" width="150%" height="150%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="8" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.5"/></filter></defs></svg>
<svg class="mark" viewBox="0 0 100 100"><g filter="url(#rc)"><path d="M50 10 L88 31 L50 52 L12 31 Z" fill="#DEBD82"/><path d="M12 31 L50 52 L50 92 L12 71 Z" fill="#D1A24F"/><path d="M88 31 L50 52 L50 92 L88 71 Z" fill="#986F28"/></g></svg>
<div class="kicker">${c.kicker}</div>
<h1>${c.line1}<br><span class="b">${c.line2}</span>${c.line3 ? `<br><span class="b">${c.line3}</span>` : ""}</h1>
<div class="foot">${c.foot}</div>
</div></body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
mkdirSync(resolve(root, ".og-tmp"), { recursive: true });
for (const c of cards) {
  const tmp = resolve(root, ".og-tmp", "card.html");
  writeFileSync(tmp, html(c));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(root, c.out), type: "png" });
  console.log("wrote", c.out);
}
await browser.close();
