// Exercises the page's JavaScript against the built site.
import puppeteer from "puppeteer-core";
const S = process.argv[2];
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error" && !/CORS|ERR_FAILED/.test(m.text())) errors.push("console: " + m.text()); });
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle0" });

await page.evaluate(async () => { for (let y = 0; y < 3000; y += 400) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 120)); } });
const storyIn = await page.$$eval(".stream .w", (els) => els.filter((e) => e.classList.contains("lit")).length > 20);

// Step one validation, then the post (refused from localhost by CORS, which is expected)
await page.$eval("#lead-form", (f) => f.scrollIntoView({ behavior: "instant" }));
await page.evaluate(() => { document.querySelector('#lead-form button[data-step="1"]').disabled = false; });
await page.click('#lead-form button[data-step="1"]');
await new Promise((r) => setTimeout(r, 300));
const validation = await page.$eval('[data-error-for="fullName"]', (e) => e.textContent);
await page.type("#fullName", "Smoke Test");
await page.type("#email", "smoke@example.com");
await page.type("#biggestPain", "Everything still comes through me.");
await page.evaluate(() => { document.querySelector('#lead-form button[data-step="1"]').disabled = false; });
await page.click('#lead-form button[data-step="1"]');
await new Promise((r) => setTimeout(r, 3000));
const step1Status = await page.$eval("#lead-form [data-status]", (e) => e.textContent);
const step2Hidden = await page.$eval("#step-2", (e) => e.hidden);
await page.screenshot({ path: `${S}/shots/smoke-form.png` });

// Force step two visible to check its layout
await page.evaluate(() => { document.getElementById("step-1").hidden = true; document.getElementById("step-2").hidden = false; });
await page.$eval("#step-2", (f) => f.scrollIntoView({ behavior: "instant", block: "center" }));
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: `${S}/shots/smoke-step2.png` });

// Newsletter validation
await page.type("#news-footer-email", "not-an-email");
await page.click("form[data-newsletter] button[type=submit]");
await new Promise((r) => setTimeout(r, 300));
const newsStatus = await page.$eval("form[data-newsletter] [data-status]", (e) => e.textContent);

// Mobile nav
await page.setViewport({ width: 400, height: 860 });
await page.goto("http://127.0.0.1:4321/", { waitUntil: "networkidle0" });
await page.click("#nav-toggle");
await new Promise((r) => setTimeout(r, 300));
const sheetOpen = await page.$eval("#nav-sheet", (s) => !s.classList.contains("hidden"));

console.log(JSON.stringify({ storyIn, validation, step1Status, step2Hidden, newsStatus, sheetOpen, errors }, null, 2));
await browser.close();
