// Captures the hero at several moments so the block build and the orbit can be checked.
import puppeteer from "puppeteer-core";
const [out] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const t0 = Date.now();
await page.goto("http://127.0.0.1:4321/", { waitUntil: "domcontentloaded" });
for (const ms of [900, 1800, 2800, 4200, 9000]) {
  const wait = ms - (Date.now() - t0);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  await page.screenshot({ path: `${out}/hero-${ms}.png` });
}
await browser.close();
console.log("frames saved");
