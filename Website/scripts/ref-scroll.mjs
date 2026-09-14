import puppeteer from "puppeteer-core";
const [url, out, ...ys] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars", "--disable-gpu"] });
const page = await browser.newPage();
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36");
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
let last = 0;
for (const y of ys.map(Number)) {
  for (let s = last; s < y; s += 300) { await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), s); await new Promise((r) => setTimeout(r, 120)); }
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${out}-${y}.png` });
  last = y;
}
await browser.close();
