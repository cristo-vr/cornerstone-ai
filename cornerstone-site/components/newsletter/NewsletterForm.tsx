"use client";

import React, { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";

/**
 * Kit (ConvertKit) custom-form signup.
 *
 * KIT_FORM_ID is the numeric id of the form inside Kit:
 *   Kit > Grow > Landing Pages & Forms > (the form) > the id in the browser URL.
 *
 * While it is empty the form refuses to submit and shows the error state. That
 * is deliberate: a form posting into the void looks like it works and loses
 * every signup silently, which is the one failure nobody notices until the
 * list is a month old and empty.
 *
 * No Turnstile here on purpose. This is the highest-value conversion on the
 * site and every extra step costs signups; Kit's double opt-in is the spam
 * control instead, backed by the honeypot below. The contact form keeps
 * Turnstile because a booking request is worth the friction.
 */
const KIT_FORM_ID = "9736253";
const KIT_ENDPOINT = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

type Status = "idle" | "submitting" | "success" | "error";
type Tone = "light" | "dark";

const field: Record<Tone, string> = {
  light:
    "w-full rounded-lg border border-line bg-background px-4 py-3.5 text-foreground " +
    "placeholder:text-muted transition-colors duration-200 " +
    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
  dark:
    "w-full rounded-lg border border-[#423D33] bg-[#211F1B] px-4 py-3.5 text-rail-text " +
    "placeholder:text-[#8F8B7E] transition-colors duration-200 " +
    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
};

const microcopy: Record<Tone, string> = {
  light: "text-sm text-ink-2",
  dark: "text-sm text-[#8F8B7E]",
};

export default function NewsletterForm({
  tone = "light",
  cta = "Send me Saturday's issue",
}: {
  tone?: Tone;
  cta?: string;
}) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (company) return; // a bot filled the hidden field
    if (!KIT_FORM_ID) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(KIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={`rounded-xl border p-6 ${
          tone === "dark" ? "border-[#423D33] bg-[#211F1B]" : "border-line bg-surface/60"
        }`}
      >
        <span className="grid place-items-center w-11 h-11 rounded-full bg-primary/12 text-accent-ink mb-4">
          <Check className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <h3
          className={`font-display text-xl font-bold uppercase tracking-[0.005em] mb-2 ${
            tone === "dark" ? "text-rail-text" : "text-foreground"
          }`}
        >
          One last thing
        </h3>
        <p className={`${microcopy[tone]} leading-relaxed`}>
          Pop into your inbox and click the confirmation link, otherwise I can&apos;t send
          you anything. It sometimes lands in promotions, so have a look there too. See you
          Saturday.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <label htmlFor={`${uid}-email`} className="sr-only">
        Email address
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={`${uid}-email`}
          type="email"
          name="email_address"
          required
          autoComplete="email"
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${field[tone]} sm:flex-1`}
        />

        {/* Honeypot. Hidden from people, irresistible to bots. */}
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

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 shrink-0 rounded-lg
                     bg-primary px-6 py-3.5 font-sans text-[0.9rem] font-semibold tracking-[0.01em]
                     text-accent-txt border border-primary
                     transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-out)]
                     hover:bg-accent-dk hover:border-accent-dk active:scale-[0.97]
                     disabled:opacity-60 disabled:pointer-events-none"
        >
          {status === "submitting" && (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} aria-hidden="true" />
          )}
          {status === "submitting" ? "Signing you up" : cta}
        </button>
      </div>

      <p className={`mt-3 ${microcopy[tone]}`}>
        One email a week. It&apos;s free, and you can unsubscribe in a click.
      </p>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Submitting" : ""}
      </p>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-accent-dk">
          That didn&apos;t go through, sorry. Email info@cornerstone-ai.pro and I&apos;ll
          add you myself.
        </p>
      )}
    </form>
  );
}
