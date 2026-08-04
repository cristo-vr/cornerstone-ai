"use client";

import React from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

interface BuildPricingProps {
  onOpenContact: () => void;
}

const included = [
  "A working session in week one, with you and the people who do the job",
  "Eight weeks of building, one thing at a time",
  "A direct line to me, with answers and fixes inside 24 hours",
  "Anything new, live within seven days of me starting it",
  "Two training sessions for your team",
  "Handover: keys, documentation, and your team shown how it works",
  "Four more weeks of support afterwards, at no charge",
];

/* The two continuity options differ on whether anything new gets built. That
   is the whole distinction, so the table shows that and stops. */
const continuity = [
  {
    name: "Keep building",
    fixes: "Inside 24 hours",
    development: "Live within 7 days",
    price: "$2,000",
    cycle: "per 4 week cycle",
  },
  {
    name: "Support",
    fixes: "Inside 24 hours",
    development: "Not included",
    price: "$500",
    cycle: "per 4 week cycle",
  },
];

const BuildPricing: React.FC<BuildPricingProps> = ({ onOpenContact }) => (
  <section id="price" className="py-20 md:py-28 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <Eyebrow>What it costs</Eyebrow>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 max-w-3xl">
          One price, paid once, before we start.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-lg text-ink-2 leading-relaxed max-w-2xl mb-14">
          You&rsquo;re buying eight weeks of my time, not a fixed list of features. You
          decide what gets built, in the order that costs you the most.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-5">
        <Reveal className="lg:col-span-5">
          <div className="h-full rounded-xl border border-primary bg-primary/[0.09] p-8 md:p-10 flex flex-col">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2 mb-6">
              The Build
            </span>
            <p className="font-display text-[clamp(3rem,6vw,4rem)] font-extrabold uppercase leading-none tracking-[0.005em] text-accent-ink tabular-nums">
              $6,000
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink-2">
              USD, total
            </p>
            <p className="mt-6 text-ink-2 leading-relaxed grow">
              Eight weeks of building, then four more weeks of support at no charge. No
              hourly billing and no change orders.
            </p>
            <div className="mt-8">
              <Button onClick={onOpenContact} icon>
                Book a call
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="h-full rounded-xl border border-line bg-background p-8 md:p-9 flex flex-col">
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-6">
              What&apos;s in it
            </h3>
            <ul className="space-y-3.5 grow">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink-2 leading-relaxed">
                  <Check className="w-4 h-4 text-accent-ink shrink-0 mt-1.5" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ------------------------------------------- after the twelve weeks */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.9rem,4vw,3rem)]">
            After the twelve weeks.
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-3xl">
            Nothing switches off when I stop. If you want me to carry on after the four
            free weeks of support, pick one of these at the start of each cycle.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-xl border border-line bg-surface/50 overflow-x-auto">
            <table className="w-full border-collapse min-w-[36rem]">
              <thead>
                <tr>
                  <th className="w-[24%] text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    &nbsp;
                  </th>
                  <th className="text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Fixes to what&apos;s built
                  </th>
                  <th className="text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Anything new
                  </th>
                  <th className="text-right px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {continuity.map((row) => (
                  <tr key={row.name} className="border-t border-line">
                    <th
                      scope="row"
                      className="text-left px-6 py-5 font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground whitespace-nowrap"
                    >
                      {row.name}
                    </th>
                    <td className="px-6 py-5 text-ink-2">{row.fixes}</td>
                    <td className="px-6 py-5 text-ink-2">{row.development}</td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <span className="font-display text-xl font-bold text-accent-ink tabular-nums">
                        {row.price}
                      </span>
                      <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink-2 mt-1">
                        {row.cycle}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="mt-5 grid md:grid-cols-3 gap-5">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                Cycle to cycle
              </h4>
              <p className="text-ink-2 leading-relaxed">
                Nothing renews on its own. Move between the two whenever you want, or
                stop at the end of any cycle.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                Paying ahead
              </h4>
              <p className="text-ink-2 leading-relaxed">
                Three cycles of Keep building bought up front is $5,100 instead of
                $6,000.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                The AI&apos;s own usage
              </h4>
              <p className="text-ink-2 leading-relaxed">
                Billed straight to your account by the provider, at cost. I take no
                margin on it and I&rsquo;ll show you the meter during the build.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default BuildPricing;
