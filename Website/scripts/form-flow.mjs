// Walks the two-step contact form against a local preview. Turnstile can't
// issue a token on localhost, so the button is enabled by hand; the final post
// is refused by the endpoint's origin check, which is the expected ending here.
import puppeteer from "puppeteer-core";
const [out] = process.argv.slice(2);
const BASE = "http://127.0.0.1:4321/";

for (let i = 0; i < 40; i++) {
  try {
    if ((await fetch(BASE)).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE, { waitUntil: "networkidle0" });
await page.evaluate(() => document.getElementById("contact").scrollIntoView({ behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1200));

const enable = () => page.evaluate(() => { document.querySelector("#lead-form button[data-next]").disabled = false; });
const state = () =>
  page.evaluate(() => ({
    step: document.getElementById("lead-form").dataset.step,
    step1Hidden: document.getElementById("step-1").hidden,
    step2Hidden: document.getElementById("step-2").hidden,
    button: document.querySelector("#lead-form button[data-next]").textContent,
    backHidden: document.querySelector("#lead-form [data-back]").hidden,
    barsOn: [...document.querySelectorAll(".progress-bar")].map((b) => b.classList.contains("is-on")),
    errors: [...document.querySelectorAll("#lead-form .error")].map((e) => e.textContent).filter(Boolean),
    status: document.querySelector("#lead-form [data-status]").textContent,
    optionalCopy: /optional/i.test(document.getElementById("lead-form").textContent),
  }));

const r = {};
r.start = await state();
await page.screenshot({ path: `${out}/form-step1.png` });

await enable();
await page.click("#lead-form button[data-next]");
await new Promise((r) => setTimeout(r, 300));
r.emptyStep1 = await state();

await page.type("#fullName", "Flow Test");
await page.type("#email", "flow@example.com");
await page.type("#biggestPain", "Testing the two-step form.");
await enable();
await page.click("#lead-form button[data-next]");
await new Promise((r) => setTimeout(r, 900));
r.afterContinue = await state();
await page.screenshot({ path: `${out}/form-step2.png` });

await enable();
await page.click("#lead-form button[data-next]");
await new Promise((r) => setTimeout(r, 300));
r.emptyStep2 = await state();

await page.click("#lead-form [data-back]");
await new Promise((r) => setTimeout(r, 400));
r.afterBack = { ...(await state()), nameKept: await page.$eval("#fullName", (e) => e.value) };

await enable();
await page.click("#lead-form button[data-next]");
await new Promise((r) => setTimeout(r, 400));
await page.select("#budget", "$5,000 to $15,000");
await page.select("#role", "It's my call");
await page.type("#need", "A test answer.");
await page.select("#timeline", "This month");
await enable();
await page.click("#lead-form button[data-next]");
await new Promise((r) => setTimeout(r, 11000));
r.afterSend = await state();
await page.screenshot({ path: `${out}/form-after-send.png` });

console.log(JSON.stringify({ ...r, pageErrors: errors }, null, 2));
await browser.close();
