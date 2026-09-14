// usage: node shot.mjs <url> <out.png> <width> <height> [full]
import puppeteer from "puppeteer-core";
const [url, out, w, h, full, sel] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
if (full === "full") {
  // Walk the page so IntersectionObserver reveals fire, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));
} else if (sel) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" }), sel);
  await new Promise((r) => setTimeout(r, 1400));
} else {
  await new Promise((r) => setTimeout(r, 1500));
}
await page.screenshot({ path: out, fullPage: full === "full", captureBeyondViewport: full === "full" });
await browser.close();
console.log("saved", out);
