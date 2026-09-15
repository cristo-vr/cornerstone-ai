export {};

/**
 * The whole site's JavaScript. Three jobs: scroll reveals, the nav, and the
 * two forms. No framework, nothing runs on scroll events.
 */

// ── Reveal on scroll ───────────────────────────────────────────────────────
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduce || !("IntersectionObserver" in window)) {
  revealables.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

// ── The stream: words light up as they cross the reading line ─────────────
// A band between 48% and 68% of the viewport is the "reading line". A word
// entering it lights, and so does every word before it, so a fast flick never
// leaves a gap. A word dropping back below the band (scrolling up) goes dim,
// and so does everything after it. Nothing listens to scroll events.
{
  const words = Array.from(document.querySelectorAll<HTMLElement>(".stream .w"));
  if (words.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      words.forEach((w) => w.classList.add("lit"));
    } else {
      const index = new Map(words.map((w, i) => [w, i]));
      let lit = 0; // how many words from the start are lit
      const apply = (n: number) => {
        if (n === lit) return;
        const from = Math.min(n, lit);
        const to = Math.max(n, lit);
        for (let i = from; i < to; i++) words[i].classList.toggle("lit", n > lit);
        lit = n;
      };
      const io = new IntersectionObserver(
        (entries) => {
          let next = lit;
          for (const e of entries) {
            const i = index.get(e.target as HTMLElement)!;
            if (e.isIntersecting) next = Math.max(next, i + 1);
            else if (e.boundingClientRect.top > window.innerHeight * 0.68) next = Math.min(next, i);
          }
          apply(next);
        },
        { rootMargin: "-48% 0px -32% 0px", threshold: 0 },
      );
      words.forEach((w) => io.observe(w));
    }
  }
}

// ── Nav: solid once the hero scrolls away; mobile sheet ────────────────────
const nav = document.getElementById("site-nav");
const sentinel = document.getElementById("nav-sentinel");
if (nav && sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(
    ([entry]) => nav.classList.toggle("is-scrolled", !entry.isIntersecting),
    { rootMargin: "-1px 0px 0px 0px", threshold: 0 },
  ).observe(sentinel);
} else if (nav) {
  nav.classList.add("is-scrolled");
}

const toggle = document.getElementById("nav-toggle");
const sheet = document.getElementById("nav-sheet");
if (nav && toggle && sheet) {
  const setOpen = (open: boolean) => {
    nav.classList.toggle("is-open", open);
    sheet.toggleAttribute("inert", !open);
    sheet.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) sheet.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// ── The hero cube: a click on the blocks rebuilds it from the cornerstone ──
{
  const bind = (stage: Element) => {
    stage.addEventListener("click", () => {
      // New nodes, new animations: the cleanest restart CSS offers.
      const fresh = stage.cloneNode(true) as Element;
      stage.replaceWith(fresh);
      bind(fresh);
    });
  };
  const stage = document.querySelector(".cube-stage");
  if (stage) bind(stage);
}

// ── The pillar cards on touch: a tap swaps the icon for the object ─────────
// Hover does it on a mouse; a finger has no hover, so a tap toggles the same
// state, one card at a time. Mouse users are left alone.
{
  const pillars = Array.from(document.querySelectorAll<HTMLElement>(".pillar"));
  pillars.forEach((card) =>
    card.addEventListener("pointerup", (e) => {
      if (e.pointerType === "mouse") return;
      const on = !card.classList.contains("is-active");
      pillars.forEach((c) => c.classList.remove("is-active"));
      if (on) card.classList.add("is-active");
    }),
  );
}

// ── Attribution: first touch of the session, attached to the lead ──────────
const ATTR_KEY = "cs_attr";
type Attribution = Record<string, string>;
function captureAttribution(): Attribution {
  try {
    const existing = sessionStorage.getItem(ATTR_KEY);
    if (existing) return JSON.parse(existing) as Attribution;
    const q = new URLSearchParams(location.search);
    const attr: Attribution = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = q.get(k);
      if (v) attr[k] = v;
    }
    if (document.referrer && !document.referrer.startsWith(location.origin)) attr.referrer = document.referrer;
    attr.landingPath = location.pathname;
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
    return attr;
  } catch {
    return {};
  }
}
const attribution = captureAttribution();

// ── Lead form, two steps → Mason's public lead endpoint ────────────────────
const LEAD_ENDPOINT = "https://aios.cornerstone-ai.pro/api/public/lead";
const lead = document.getElementById("lead-form") as HTMLFormElement | null;

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
    onTurnstileReady?: () => void;
  }
}

if (lead) {
  const status = lead.querySelector<HTMLElement>("[data-status]")!;
  const step1 = document.getElementById("step-1") as HTMLFieldSetElement;
  const step2 = document.getElementById("step-2") as HTMLFieldSetElement;
  // One button carries both steps: "Continue", then "Send".
  const btn1 = lead.querySelector<HTMLButtonElement>("button[data-next]")!;
  const done = document.getElementById("lead-done")!;
  const slot = lead.querySelector<HTMLElement>(".cf-turnstile")!;
  let token: string | null = null;
  let widgetId: string | undefined;
  let step = 1;

  // Turnstile is loaded lazily: the script tag is only injected once the form
  // is near the viewport, so nobody who never scrolls to it pays for it.
  const mountTurnstile = () => {
    if (document.getElementById("cf-turnstile-script")) return;
    window.onTurnstileReady = () => {
      widgetId = window.turnstile?.render(slot, {
        sitekey: slot.dataset.sitekey,
        theme: "dark",
        callback: (t: string) => {
          token = t;
          btn1.disabled = false;
          if (status.dataset.kind === "turnstile") {
            status.textContent = "";
            delete status.dataset.kind;
          }
        },
        "expired-callback": () => {
          token = null;
          if (step === 1) btn1.disabled = true;
        },
        "error-callback": () => {
          token = null;
        },
      });
    };
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady&render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  };
  btn1.disabled = true;
  // Judged by the widget's own signals, never by looking for its iframe:
  // Turnstile renders inside a shadow root, where a page query can't see it,
  // so an iframe check reported "didn't load" under a widget saying Success.
  const fallbackTimer = () =>
    window.setTimeout(() => {
      if (!window.turnstile && widgetId === undefined && !token) {
        status.dataset.kind = "turnstile";
        status.textContent =
          "The security check didn't load, so the form can't send. Email info@cornerstone-ai.pro with the same details and we'll take it from there.";
      }
    }, 9000);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          mountTurnstile();
          fallbackTimer();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(lead);
  } else {
    mountTurnstile();
    fallbackTimer();
  }

  const v = (k: string) => {
    const el = lead.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    return el ? el.value.trim() : "";
  };
  const setError = (name: string, msg: string | null) => {
    const input = lead.elements.namedItem(name) as HTMLElement | null;
    const err = lead.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg ?? "";
  };

  // A fresh Turnstile token for the second post. The first one was spent on
  // step one; reset() runs the widget again without the visitor doing anything.
  const freshToken = (): Promise<string | null> =>
    new Promise((resolve) => {
      token = null;
      if (widgetId !== undefined) window.turnstile?.reset(widgetId);
      const started = Date.now();
      const tick = () => {
        if (token) return resolve(token);
        if (Date.now() - started > 8000) return resolve(null);
        setTimeout(tick, 150);
      };
      tick();
    });

  const basePayload = () => ({
    fullName: v("fullName"),
    email: v("email"),
    biggestPain: v("biggestPain"),
    company: v("company"), // honeypot, stays empty for humans
    utmSource: attribution.utm_source ?? "",
    utmMedium: attribution.utm_medium ?? "",
    utmCampaign: attribution.utm_campaign ?? "",
    utmTerm: attribution.utm_term ?? "",
    utmContent: attribution.utm_content ?? "",
    referrer: attribution.referrer ?? "",
    landingPath: attribution.landingPath ?? "",
    submittedPath: location.pathname,
    submittedAt: new Date().toISOString(),
  });

  const post = async (payload: Record<string, unknown>) => {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong on our side.");
  };

  const finish = () => {
    lead.hidden = true;
    done.hidden = false;
    done.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  const explain = (err: unknown) => {
    const reason =
      err instanceof TypeError
        ? "That didn't send, which usually means the connection dropped."
        : err instanceof Error
          ? err.message
          : "Something went wrong.";
    status.textContent = `${reason} If it keeps failing, email info@cornerstone-ai.pro and we'll set it up by hand.`;
  };


  const back = lead.querySelector<HTMLButtonElement>("[data-back]")!;
  const progress = lead.querySelector<HTMLElement>(".progress")!;
  const bars = lead.querySelectorAll<HTMLElement>(".progress-bar");

  const required = (keys: string[]) => {
    let ok = true;
    let first: HTMLElement | null = null;
    for (const k of keys) {
      const empty = !v(k);
      setError(k, empty ? "This one we need." : null);
      if (empty) {
        ok = false;
        first ??= lead.elements.namedItem(k) as HTMLElement;
      }
    }
    return { ok, first };
  };

  const showStep = (n: 1 | 2) => {
    step = n;
    lead.dataset.step = String(n);
    step1.hidden = n !== 1;
    step2.hidden = n !== 2;
    back.hidden = n !== 2;
    btn1.textContent = n === 1 ? "Continue" : "Send";
    btn1.disabled = !token;
    bars[1].classList.toggle("is-on", n === 2);
    progress.setAttribute("aria-valuenow", String(n));
    progress.setAttribute("aria-label", `Step ${n} of 2`);
    status.textContent = "";
    const firstField = (n === 1 ? step1 : step2).querySelector<HTMLElement>("input, select, textarea");
    lead.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    firstField?.focus({ preventScroll: true });
  };

  back.addEventListener("click", () => showStep(1));

  // An error clears the moment its field gets an answer.
  const clearIfAnswered = (e: Event) => {
    const el = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (el.name && el.getAttribute("aria-invalid") === "true" && el.value.trim()) setError(el.name, null);
  };
  lead.addEventListener("input", clearIfAnswered);
  lead.addEventListener("change", clearIfAnswered);

  lead.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    status.textContent = "";

    if (step === 1) {
      let { ok, first } = required(["fullName", "email", "biggestPain"]);
      if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) {
        setError("email", "That email doesn't look right.");
        first ??= lead.elements.namedItem("email") as HTMLElement;
        ok = false;
      }
      if (!ok) return first?.focus();

      // Save what they've written so far, silently. If it fails, the final
      // send carries all of it again, so nothing is lost and nothing is shown.
      if (token) void post({ ...basePayload(), turnstileToken: token }).catch(() => {});
      showStep(2);
      // The first token is spent; fetch the next one now so Send never waits.
      void freshToken();
      return;
    }

    const { ok, first } = required(["budget", "role", "need", "timeline"]);
    if (!ok) return first?.focus();

    btn1.disabled = true;
    back.disabled = true;
    btn1.textContent = "Sending";
    const lines = [`Budget: ${v("budget")}`, `Timeline: ${v("timeline")}`, `Six months from now: ${v("need")}`];
    try {
      const t = token ?? (await freshToken());
      await post({ ...basePayload(), role: v("role"), anythingElse: lines.join("\n"), turnstileToken: t });
      finish();
    } catch (err) {
      explain(err);
      btn1.textContent = "Send";
      back.disabled = false;
      if (widgetId !== undefined) window.turnstile?.reset(widgetId);
    }
  });
}

// ── The library gate: name + email → the file, Kit, and a telemetry row ────
const KIT_ENDPOINT = "https://app.kit.com/forms/9736253/subscriptions";
const TELEMETRY = "https://aios.cornerstone-ai.pro/api/public/resource-event";
const GATE_KEY = "cs_library_lead";
const track = (payload: Record<string, unknown>) => {
  try {
    void fetch(TELEMETRY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* telemetry never breaks the page it measures */
  }
};
const shareSource = () => {
  try {
    return new URLSearchParams(location.search).get("s");
  } catch {
    return null;
  }
};

document.querySelectorAll<HTMLFormElement>("form[data-gate]").forEach((gate) => {
  const slug = gate.dataset.slug!;
  const href = gate.dataset.href!;
  const fileName = gate.dataset.file || null;
  const done = gate.parentElement?.querySelector<HTMLElement>("[data-gate-done]") ?? null;
  const status = gate.querySelector<HTMLElement>("[data-status]")!;
  const button = gate.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const nameEl = gate.elements.namedItem("firstName") as HTMLInputElement;
  const emailEl = gate.elements.namedItem("email") as HTMLInputElement;

  track({ kind: "view", slug, source: shareSource(), referrer: document.referrer || null });

  // Someone who has given their details on this device gets them back.
  try {
    const known = JSON.parse(localStorage.getItem(GATE_KEY) || "null") as { name?: string; email?: string } | null;
    if (known?.email) {
      nameEl.value = known.name ?? "";
      emailEl.value = known.email;
    }
  } catch {
    /* storage may be unavailable; the form still works */
  }

  const setError = (name: string, msg: string | null) => {
    const input = gate.elements.namedItem(name) as HTMLElement | null;
    const err = gate.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg ?? "";
  };

  const startDownload = () => {
    const a = document.createElement("a");
    a.href = href;
    if (fileName) a.download = fileName;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  gate.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const trap = gate.querySelector<HTMLInputElement>("input[name=company]");
    if (trap && trap.value) return; // bot
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    let ok = true;
    setError("firstName", name ? null : "Your first name, so the email has one.");
    if (!name) ok = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", "That email doesn't look right.");
      ok = false;
    } else setError("email", null);
    if (!ok) return;

    // The file first. Nothing below can stand between them and it.
    startDownload();
    button.disabled = true;
    button.textContent = "Sending";
    try {
      localStorage.setItem(GATE_KEY, JSON.stringify({ name, email }));
    } catch {
      /* fine */
    }

    let kitOk = false;
    try {
      const body = new URLSearchParams({ email_address: email, "fields[first_name]": name });
      const res = await fetch(KIT_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body });
      kitOk = res.ok;
    } catch {
      kitOk = false;
    }
    track({
      kind: "download",
      slug,
      source: shareSource(),
      email,
      kitOk,
      referrer: attribution.referrer ?? document.referrer ?? null,
      landingPath: attribution.landingPath ?? location.pathname,
      utmSource: attribution.utm_source ?? null,
      utmMedium: attribution.utm_medium ?? null,
      utmCampaign: attribution.utm_campaign ?? null,
    });

    if (done) {
      gate.hidden = true;
      done.hidden = false;
    } else {
      status.textContent = "";
      button.textContent = "Sent";
    }
  });
});

// ── Newsletter → Kit ───────────────────────────────────────────────────────
document.querySelectorAll<HTMLFormElement>("form[data-newsletter]").forEach((form) => {
  const input = form.querySelector<HTMLInputElement>("input[type=email]")!;
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const msg = form.querySelector<HTMLElement>("[data-status]")!;
  const doneEl = form.parentElement?.querySelector<HTMLElement>("[data-newsletter-done]");

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const trap = form.querySelector<HTMLInputElement>("input[name=company]");
    if (trap && trap.value) return; // bot
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "That email doesn't look right.";
      input.setAttribute("aria-invalid", "true");
      return;
    }
    input.setAttribute("aria-invalid", "false");
    msg.textContent = "";
    button.disabled = true;
    const label = button.textContent;
    button.textContent = "Sending";
    try {
      const res = await fetch(KIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email }),
      });
      if (!res.ok) throw new Error();
      if (doneEl) {
        form.hidden = true;
        doneEl.hidden = false;
      } else {
        msg.textContent = "Check your inbox for the confirmation link.";
      }
    } catch {
      msg.textContent = "That didn't go through. Email info@cornerstone-ai.pro and I'll add you myself.";
      button.disabled = false;
      button.textContent = label;
    }
  });
});
