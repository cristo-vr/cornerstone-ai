"use client";

import React, { useState, useId } from "react";
import Turnstile from "react-turnstile";
import { Check } from "lucide-react";
import { readAttribution } from "@/lib/attribution";

const SITE_KEY = "0x4AAAAAACN3bXEw6zTOBNYc";

/**
 * Inquiries land in the Cornerstone OS (Supabase), not in a third-party
 * automation tool.
 *
 * This used to POST to a make.com webhook, which meant the only record of a lead
 * lived somewhere nobody looked, the Turnstile token was handed to Make and its
 * verdict trusted rather than verified, and there was no way to answer "how many
 * enquiries came in last month" without logging into another product.
 *
 * The endpoint verifies Turnstile server-side against Cloudflare, checks the
 * origin, and writes the row. Cross-origin by design: this site is a static
 * export with no server of its own, and the OS is where the data belongs.
 */
const LEAD_ENDPOINT = "https://aios.cornerstone-ai.pro/api/public/lead";

const EMPTY = {
  fullName: "",
  role: "",
  email: "",
  phone: "",
  companyName: "",
  website: "",
  teamSize: "5-10",
  monthlyRevenue: "",
  biggestPain: "",
  anythingElse: "",
};

const TEAM_SIZES = ["1-5", "5-10", "10-20", "20-35", "35-50", "50+"];

/* USD brackets. The band that matters for qualifying is the middle three, so
   the low and high ends stay deliberately coarse. */
const REVENUE_BANDS = [
  "Less than $5,000 / month",
  "$5,000 - $15,000 / month",
  "$15,000 - $30,000 / month",
  "$30,000 - $75,000 / month",
  "$75,000 - $150,000 / month",
  "More than $150,000 / month",
  "Rather not say",
];

const fieldClass =
  "w-full rounded-lg border border-line bg-background px-4 py-3.5 text-foreground " +
  "transition-colors duration-200 " +
  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const labelClass =
  "block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-2 mb-2";

const ContactForm: React.FC = () => {
  const uid = useId();
  const [formData, setFormData] = useState(EMPTY);
  const [token, setToken] = useState<string | null>(null);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      // Captured on the landing page, not here — by now the UTM parameters are
      // several navigations gone. See lib/attribution.ts.
      const attribution = readAttribution();

      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...attribution,
          company, // honeypot: empty for every real person
          submittedPath: window.location.pathname,
          turnstileToken: token,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFormData(EMPTY);
      setToken(null);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-primary/12 text-accent-ink mx-auto mb-6">
          <Check className="w-6 h-6" strokeWidth={2.25} />
        </span>
        <h3 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
          Request received
        </h3>
        <p className="text-ink-2 max-w-sm mx-auto leading-relaxed">
          We&apos;ll go through your details and come back to you within 24 hours to set up
          the call.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm font-semibold text-accent-ink hover:text-accent-ink transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Full name <span className="text-accent-ink">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            name="fullName"
            required
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-role`} className={labelClass}>
            Role <span className="text-accent-ink">*</span>
          </label>
          <input
            id={`${uid}-role`}
            type="text"
            name="role"
            required
            autoComplete="organization-title"
            value={formData.role}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>
            Email <span className="text-accent-ink">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            Phone <span className="text-accent-ink">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${uid}-company`} className={labelClass}>
            Company <span className="text-accent-ink">*</span>
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            name="companyName"
            required
            autoComplete="organization"
            value={formData.companyName}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-website`} className={labelClass}>
            Website <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-website`}
            type="url"
            name="website"
            autoComplete="url"
            value={formData.website}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${uid}-team`} className={labelClass}>
            Team size <span className="text-accent-ink">*</span>
          </label>
          <select
            id={`${uid}-team`}
            name="teamSize"
            required
            value={formData.teamSize}
            onChange={handleChange}
            className={`${fieldClass} appearance-none`}
          >
            {TEAM_SIZES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-revenue`} className={labelClass}>
            Monthly revenue (USD) <span className="text-accent-ink">*</span>
          </label>
          <select
            id={`${uid}-revenue`}
            name="monthlyRevenue"
            required
            value={formData.monthlyRevenue}
            onChange={handleChange}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              Select a range
            </option>
            {REVENUE_BANDS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-pain`} className={labelClass}>
          What would you fix tomorrow if you could? <span className="text-accent-ink">*</span>
        </label>
        <textarea
          id={`${uid}-pain`}
          name="biggestPain"
          required
          rows={4}
          value={formData.biggestPain}
          onChange={handleChange}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-else`} className={labelClass}>
          Anything else we should know?
        </label>
        <textarea
          id={`${uid}-else`}
          name="anythingElse"
          rows={2}
          value={formData.anythingElse}
          onChange={handleChange}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots — the same pattern
          the newsletter form uses. The endpoint answers a filled one with a 200
          so the bot believes it worked and doesn't come back in another shape. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
      />

      <div className="space-y-4 pt-1">
        <Turnstile sitekey={SITE_KEY} onVerify={setToken} theme="auto" />

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-foreground">
            {token
              ? "Something went wrong on our side. Please try again."
              : "Please complete the security check above."}
          </p>
        )}

        <p className="text-xs text-ink-2 leading-relaxed">
          By sending this, you consent to us collecting and processing your details in line
          with our{" "}
          <a
            href="/privacy"
            className="text-accent-ink underline underline-offset-2 hover:text-accent-ink transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-primary py-4 text-sm font-semibold text-accent-txt transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-accent-dk active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "submitting" ? "Sending..." : "Request a call"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
