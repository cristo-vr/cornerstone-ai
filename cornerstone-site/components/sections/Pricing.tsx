"use client";

import React from "react";
import { Check } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface PricingProps {
  onOpenContact: () => void;
}

const included = [
  "The week-one mapping workshop with you and your team",
  "Eight weeks of build, embedded, one piece live at a time",
  "Weekly training sessions as each piece goes in",
  "Everything built inside your own accounts from day one",
  "Handover: keys, documentation, full ownership",
];

const Pricing: React.FC<PricingProps> = ({ onOpenContact }) => (
  <section id="pricing" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <span className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-7">
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          What it costs
        </span>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 max-w-3xl">
          One price for the whole build.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-lg text-ink-2 leading-relaxed max-w-2xl mb-14">
          Fixed and agreed in writing before week one starts. No hourly billing, no scope
          creep, no surprise line items at the end.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-5">
        {/* The two ways to pay */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-surface/60 p-8 flex flex-col">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2 mb-6">
                Split in two
              </span>
              <p className="font-display text-[clamp(2.6rem,5vw,3.4rem)] font-extrabold uppercase leading-none tracking-[0.005em] text-foreground tabular-nums">
                $5,500
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink-2">
                USD, total
              </p>
              <p className="mt-6 text-ink-2 leading-relaxed grow">
                Two payments across the eight weeks. Half to start, half at the midpoint.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full rounded-xl border border-primary bg-primary/[0.09] p-8 flex flex-col">
              <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent-txt">
                Save 10%
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2 mb-6">
                Paid in full
              </span>
              <p className="font-display text-[clamp(2.6rem,5vw,3.4rem)] font-extrabold uppercase leading-none tracking-[0.005em] text-accent-ink tabular-nums">
                $4,950
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink-2">
                USD, total
              </p>
              <p className="mt-6 text-ink-2 leading-relaxed grow">
                One payment up front, 10% off the full price. Same build, same scope.
              </p>
            </div>
          </Reveal>
        </div>

        {/* What the number buys */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="h-full rounded-xl border border-line bg-background p-8 md:p-9 flex flex-col">
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-6">
              What&apos;s in it
            </h3>
            <ul className="space-y-4 grow">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink-2 leading-relaxed">
                  <Check className="w-4 h-4 text-accent-ink shrink-0 mt-1.5" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button onClick={onOpenContact} icon>
                Book a call
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The two things the number does not cover. Said plainly, not buried. */}
      <Reveal delay={0.08}>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-line bg-surface/50 p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
              After week eight
            </h3>
            <p className="text-ink-2 leading-relaxed">
              There&apos;s an optional monthly retainer if you want us to keep building and
              looking after it. We price that on the call, once we know what your system
              actually needs. It is never required: stop any month and everything you own
              keeps working.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
              The AI&apos;s own usage
            </h3>
            <p className="text-ink-2 leading-relaxed">
              Billed to your account directly, not to us, because the system runs on your
              accounts. For most businesses it lands closer to a phone bill than a salary.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Pricing;
