"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

const traceSteps = [
  "Project opened, team assigned",
  "Welcome pack sent",
  "Kickoff call booked",
  "Deposit invoice drafted in Xero",
];

/** One trigger, four things handled, one message back. The whole idea, traced.
    The stagger is the point: it reads as a sequence the system runs, not as
    decoration. Kept under a second end to end so nobody scrolls past the
    payoff line. */
const TraceCard: React.FC = () => {
  const reduce = useReducedMotion();
  const step = (delay: number) =>
    reduce ? { duration: 0 } : { duration: 0.45, delay, ease: EASE };

  return (
    <div className="w-full rounded-xl border border-line bg-background p-6 md:p-8">
      <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-6">
        A real example, start to finish
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={step(0)}
        className="inline-block px-4 py-2 rounded-lg border border-primary bg-primary/12 text-accent-ink text-sm font-semibold mb-5"
      >
        New client signs: Anika
      </motion.div>

      <div className="relative pl-5 border-l border-line space-y-3 mb-6">
        {traceSteps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={step(0.18 + i * 0.11)}
            className="flex items-center gap-3 text-sm md:text-base text-ink-2"
          >
            <Check className="w-4 h-4 text-accent-ink shrink-0" strokeWidth={2.5} />
            {label}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={step(0.68)}
        className="rounded-xl border border-line bg-surface/60 p-4"
      >
        <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-2">
          The one message you get
        </div>
        <p className="text-foreground text-sm md:text-base">
          &ldquo;Anika is live. Kickoff Thursday 09:00. Invoice ready for your
          sign-off.&rdquo;
        </p>
      </motion.div>

      <p className="mt-5 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2 leading-relaxed">
        Yours might be a VAT deadline, a placement, or a patient booking.
      </p>
    </div>
  );
};

const rules = [
  {
    title: "You own it outright",
    body: "No licence, no platform fee, nothing that switches off if we stop working together. It lives in your accounts from the first day, so it is yours before it is finished.",
  },
  {
    title: "Anything leaving the business waits for a yes",
    body: "Money and messages to clients need a person to approve them, and you choose where that line sits.",
  },
  {
    title: "Each person sees only what they should",
    body: "Permissions per role, and a record of every action the system took and when.",
  },
  {
    title: "Your team keeps working where they work",
    body: "Most systems die because the team has to bend around them. This one goes in on the tools they already open.",
  },
];

/* The four week timeline that used to sit here is on /build, with more detail,
   and the offer section's CTA sends the reader straight to it. Repeating it
   here was the home page pre-answering the question its own CTA exists for. */
const HowIBuild: React.FC = () => (
    <section id="how-i-build" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-8">How I build it</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-8">
              Eight weeks, built live, inside your own accounts.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg text-ink-2 leading-relaxed">
              I don&rsquo;t disappear for two months and come back with a finished box.
              Each piece starts working the day it lands, so you can tell early whether
              this is worth carrying on with.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 max-w-2xl">
            <TraceCard />
          </div>
        </Reveal>

        <div className="mt-20 pt-16 border-t border-line">
          <Reveal>
            <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.9rem,4vw,3rem)] mb-12 max-w-2xl">
              Four things that are true of every build.
            </h3>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {rules.map((rule, i) => (
              <Reveal key={rule.title} delay={Math.min(i, 3) * 0.06}>
                <div className="h-full bg-background p-8 md:p-9">
                  <h4 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3 leading-[1.08]">
                    {rule.title}
                  </h4>
                  <p className="text-ink-2 leading-relaxed">{rule.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
);

export default HowIBuild;
