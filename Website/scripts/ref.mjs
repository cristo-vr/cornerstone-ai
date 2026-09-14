import puppeteer from "puppeteer-core";
const [url, out] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars", "--disable-gpu"] });
const page = await browser.newPage();
await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36");
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: out + "-fold.png" });
await page.evaluate(async () => {
  const step = 500;
  for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 180)); }
  window.scrollTo({ top: 0, behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: out + "-full.png", fullPage: true, captureBeyondViewport: true });
const info = await page.evaluate(() => ({
  title: document.title,
  h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()).slice(0, 3),
  h2: [...document.querySelectorAll("h2")].map((h) => h.innerText.trim()).slice(0, 20),
  fonts: [...new Set([...document.querySelectorAll("h1,h2,p,a")].map((e) => getComputedStyle(e).fontFamily))].slice(0, 6),
  bg: getComputedStyle(document.body).backgroundColor,
  height: document.body.scrollHeight,
}));
console.log(JSON.stringify(info, null, 2));
await browser.close();
