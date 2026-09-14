// Captures the header closed and the menu open, desktop and phone, and step two of the form.
import puppeteer from "puppeteer-core";
const [out] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const result = {};
for (const [w, h, tag] of [[1440, 900, "d"], [400, 860, "m"]]) {
  await page.setViewport({ width: w, height: h });
  await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${out}/menu-closed-${tag}.png` });
  await page.click("#nav-toggle");
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${out}/menu-open-${tag}.png` });
  result[tag] = await page.evaluate(() => ({
    open: document.getElementById("site-nav").classList.contains("is-open"),
    inert: document.getElementById("nav-sheet").hasAttribute("inert"),
    label: document.getElementById("nav-toggle").getAttribute("aria-label"),
    headerLinks: document.querySelectorAll("#site-nav > .wrap a").length,
  }));
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 500));
  result[tag].closedByEsc = !(await page.$eval("#site-nav", (n) => n.classList.contains("is-open")));
}
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle0" });
await page.evaluate(() => {
  document.getElementById("step-1").hidden = true;
  document.getElementById("step-2").hidden = false;
  document.getElementById("contact").scrollIntoView({ behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `${out}/contact-step2.png` });
console.log(JSON.stringify({ ...result, errors }, null, 2));
await browser.close();
