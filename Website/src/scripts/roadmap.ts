/**
 * The Expansion Roadmap form.
 *
 * Collects six answers and four details, posts them to Mason, and renders what
 * comes back. The rubric is server side and deterministic: nothing here works
 * out a stage, and nothing here is trusted by the endpoint.
 *
 * The answer values ARE the scores (0..3, and 1..5 on the unscored gut check),
 * and the field names ARE the column names, so the body posted here is the row
 * that gets stored. One vocabulary end to end.
 */
const ENDPOINT = "https://aios.cornerstone-ai.pro/api/public/roadmap";

type Answers = Record<string, number | string | null>;

interface ResultPlacement {
  stage: number | null;
  stage_name: string | null;
  role: string | null;
  depends_on: string | null;
  when_doubles: string | null;
  bottleneck: string | null;
  track: string | null;
}
interface ResultProfile {
  scores?: Array<{ stage: number; label: string; score: number; passed: boolean }>;
  skipped?: Array<{ stage: number; name: string; note: string }>;
  gutCheck?: string | null;
  multiBusiness?: number | null;
}
interface CaptureResult {
  ok?: boolean;
  stored?: boolean;
  throttled?: boolean;
  error?: string;
  emailed?: boolean;
  /** Spread at the TOP level by the endpoint, not nested under `results`. */
  placement?: ResultPlacement;
  profile?: ResultProfile;
  pdf_url?: string | null;
}

const form = document.getElementById("rm-form") as HTMLFormElement | null;
const intro = document.getElementById("rm-intro");
const result = document.getElementById("rm-result");

if (form && intro && result) {
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>(".rm-step"));
  const bars = Array.from(form.querySelectorAll<HTMLElement>(".progress-bar"));
  const backBtn = form.querySelector<HTMLButtonElement>("[data-back]")!;
  const status = form.querySelector<HTMLElement>("[data-status]")!;
  const submitBtn = form.querySelector<HTMLButtonElement>("[data-submit]")!;
  const answers: Answers = {};
  let step = 1;

  /** Attribution, read once. utm_* survive the click; referrer and path are what
   *  the browser already knows. None of it is required and none of it is
   *  trusted: the endpoint reads country and user agent from its own headers. */
  const attribution = (() => {
    const out: Record<string, string> = {};
    try {
      const q = new URLSearchParams(location.search);
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
        const v = q.get(k);
        if (v) out[k] = v.slice(0, 120);
      }
      if (document.referrer && !document.referrer.startsWith(location.origin)) {
        out.referrer = document.referrer.slice(0, 500);
      }
      out.landing_path = location.pathname;
    } catch {
      /* a blocked referrer or a weird URL is not worth failing a capture over */
    }
    return out;
  })();

  const show = (n: number) => {
    step = n;
    steps.forEach((s) => {
      s.hidden = Number(s.dataset.step) !== n;
    });
    bars.forEach((b, i) => b.classList.toggle("is-on", i < n));
    form.querySelector<HTMLElement>(".progress")?.setAttribute("aria-valuenow", String(n));
    backBtn.hidden = n === 1;
    const heading = steps[n - 1]?.querySelector<HTMLElement>("h2");
    heading?.focus?.();
    heading?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  document.querySelector<HTMLButtonElement>("[data-start]")?.addEventListener("click", () => {
    intro.hidden = true;
    form.hidden = false;
    show(1);
  });

  // A tapped answer records the score and moves on. No Next button on the six:
  // the form is the answer.
  form.querySelectorAll<HTMLButtonElement>(".rm-answer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = btn.dataset.field!;
      answers[field] = Number(btn.dataset.value);
      btn.parentElement?.querySelectorAll(".rm-answer").forEach((b) => b.classList.remove("is-picked"));
      btn.classList.add("is-picked");
      window.setTimeout(() => show(Math.min(step + 1, steps.length)), 140);
    });
  });

  backBtn.addEventListener("click", () => show(Math.max(step - 1, 1)));

  // "Answer for the one that takes most of your time" only makes sense to
  // somebody running more than one, so it appears when they say so.
  const businesses = form.querySelector<HTMLSelectElement>("#businesses")!;
  const multiHint = form.querySelector<HTMLElement>("[data-multi]")!;
  businesses.addEventListener("change", () => {
    multiHint.hidden = Number(businesses.value) < 2;
  });

  form.querySelector<HTMLButtonElement>("[data-next]")?.addEventListener("click", () => show(steps.length));

  const setError = (name: string, message: string) => {
    const el = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    const input = form.querySelector<HTMLInputElement>(`#${name}`);
    if (el) el.textContent = message;
    input?.setAttribute("aria-invalid", message ? "true" : "false");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    setError("first_name", "");
    setError("email", "");

    const first_name = (form.querySelector<HTMLInputElement>("#first_name")!.value || "").trim();
    const email = (form.querySelector<HTMLInputElement>("#email")!.value || "").trim();
    if (!first_name) return setError("first_name", "What should I call you?");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("email", "That address doesn't look right.");

    // Every one of the five scored answers has to be there. The endpoint refuses
    // an incomplete form rather than scoring a missing answer as zero, and zero
    // is the worst answer on every question, so catching it here is a kindness
    // rather than a duplicate guard.
    const missing = ["q1_doing", "q2_knowing", "q3_deciding", "q4_checking", "q5_seeing"].find(
      (f) => typeof answers[f] !== "number",
    );
    if (missing) {
      status.textContent = "One of the questions didn't record an answer. Go back and check.";
      return;
    }

    const token = (form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value || "").trim();
    const honeypot = form.querySelector<HTMLInputElement>("#company_website")!.value;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending";

    let data: CaptureResult | null = null;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          ...attribution,
          first_name,
          email,
          one_liner: form.querySelector<HTMLInputElement>("#one_liner")!.value.trim() || null,
          revenue_band: form.querySelector<HTMLSelectElement>("#revenue_band")!.value || null,
          team_size: form.querySelector<HTMLSelectElement>("#team_size")!.value || null,
          businesses: businesses.value ? Number(businesses.value) : null,
          company_website: honeypot,
          turnstileToken: token || null,
        }),
      });
      data = (await res.json().catch(() => null)) as CaptureResult | null;
      if (!res.ok || !data) {
        // The endpoint's own sentence when it has one. Never a status code at a
        // person, and never a fake success: a capture that did not store must
        // not render a results screen.
        status.textContent = data?.error || "That didn't go through. Try again in a moment.";
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send me the roadmap<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>';
        return;
      }
    } catch {
      status.textContent = "That didn't go through. Check your connection and try again.";
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send me the roadmap<span class="arrow" aria-hidden="true">&nbsp;&rarr;</span>';
      return;
    }

    render(data);
  });

  function render(data: CaptureResult) {
    const placement = data.placement;
    const profile = data.profile ?? {};
    form.hidden = true;
    result.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    const stageEl = result.querySelector<HTMLElement>("[data-result-stage]")!;
    stageEl.textContent =
      placement?.stage && placement.stage_name
        ? placement.stage === 6
          ? placement.stage_name
          : `Stage ${placement.stage}: ${placement.stage_name}`
        : "Your roadmap is on its way";
    result.querySelector<HTMLElement>("[data-result-bottleneck]")!.textContent = placement?.bottleneck ?? "";

    // Absent renders as absent: a score that did not come back is left out
    // rather than drawn as a zero bar.
    const scores = result.querySelector<HTMLElement>("[data-result-scores]")!;
    scores.innerHTML = "";
    for (const s of profile.scores ?? []) {
      const li = document.createElement("li");
      li.className = "flex items-center gap-3 text-[0.95rem]";
      const dots = document.createElement("span");
      dots.className = "rm-dots";
      dots.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 3; i += 1) {
        const d = document.createElement("i");
        if (i < s.score) d.className = "is-on";
        dots.appendChild(d);
      }
      const label = document.createElement("span");
      label.className = s.passed ? "text-text-2" : "text-text";
      label.textContent = `${s.label}${s.passed ? "" : " — where it stops"}`;
      li.append(dots, label);
      scores.appendChild(li);
    }

    const skipped = profile.skipped ?? [];
    if (skipped.length) {
      result.querySelector<HTMLElement>("[data-result-skipped-wrap]")!.hidden = false;
      const ul = result.querySelector<HTMLElement>("[data-result-skipped]")!;
      ul.innerHTML = "";
      for (const s of skipped) {
        const li = document.createElement("li");
        li.textContent = s.note;
        ul.appendChild(li);
      }
    }

    if (profile.gutCheck) {
      result.querySelector<HTMLElement>("[data-result-gut-wrap]")!.hidden = false;
      result.querySelector<HTMLElement>("[data-result-gut]")!.textContent = profile.gutCheck;
    }

    // A NUMBER or nothing. "How many businesses" unanswered is not one.
    if (typeof profile.multiBusiness === "number" && profile.multiBusiness >= 2) {
      result.querySelector<HTMLElement>("[data-result-multi-wrap]")!.hidden = false;
      result.querySelector<HTMLElement>("[data-result-multi-head]")!.textContent =
        `You're running ${profile.multiBusiness === 3 ? "three or more" : "two"} businesses.`;
    }

    // Never claim an email that did not send.
    result.querySelector<HTMLElement>("[data-result-sent]")!.textContent = data.emailed
      ? "The full roadmap is on its way to your inbox. If it hasn't arrived in a few minutes, check the spam folder."
      : "Your roadmap is below. If it doesn't arrive by email in a few minutes, reply to this page's contact form and I'll send it over.";

    const pdf = result.querySelector<HTMLAnchorElement>("[data-result-pdf]")!;
    if (data.pdf_url) {
      pdf.href = data.pdf_url;
      pdf.hidden = false;
    }
  }
}
