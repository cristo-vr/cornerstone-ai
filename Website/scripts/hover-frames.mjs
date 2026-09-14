// Captures the pillar cards at rest and hovered, and the cube after a click.
import puppeteer from "puppeteer-core";
const [out] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle0" });
await page.evaluate(() => document.querySelector("#what").scrollIntoView({ behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `${out}/pillars-rest.png` });
const cards = await page.$$(".pillar");
for (const [i, card] of cards.entries()) {
  await card.hover();
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${out}/pillars-hover-${i + 1}.png` });
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 4500));
await page.mouse.click(720, 620);
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${out}/cube-after-click.png` });
await browser.close();
console.log("done");
