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
  "The week one mapping session with you and your team",
  "Eight weeks of build, one development live at a time",
  "Two calls a week, eight per four week cycle",
  "Seven day maximum turnaround on whatever is in flight",
  "Everything built inside your own accounts from day one",
  "Handover: keys, documentation, and your team trained on it",
];

/* Upkeep and Extensions differ on new development and nothing else, so the
   table shows exactly that and stops. */
const continuity = [
  {
    name: "Upkeep",
    fixes: "Inside 48 hours",
    development: "Not included",
    price: "$500",
    cycle: "per 4 week cycle",
  },
  {
    name: "Extensions",
    fixes: "Inside 48 hours",
    development: "7 to 10 days",
    price: "$2,000",
    cycle: "per 4 week cycle",
  },
];

const BuildPricing: React.FC<BuildPricingProps> = ({ onOpenContact }) => (
  <section id="price" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <Eyebrow>What it costs</Eyebrow>
      </Reveal>

      <Reveal delay={0.04}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 max-w-3xl">
          One price for the whole build.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-lg text-ink-2 leading-relaxed max-w-2xl mb-14">
          Fixed and agreed in writing before week one starts. No hourly billing, no
          scope creep, no line items at the end that you never saw coming.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-5">
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
                Two payments across the eight weeks. Half to start, half at the
                midpoint.
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
                One payment up front, ten percent off. Same build, same scope, same
                eight weeks.
              </p>
            </div>
          </Reveal>
        </div>

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

      {/* ---------------------------------------------------- after week eight */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.9rem,4vw,3rem)]">
            After week eight.
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-3xl">
            Nothing switches off when I walk out the door. The system is yours and it
            carries on. If you want me to stay involved there are two ways to do it,
            and you pick which one you&apos;re on at the start of every cycle.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-xl border border-line bg-surface/50 overflow-x-auto">
            <table className="w-full border-collapse min-w-[36rem]">
              <thead>
                <tr>
                  <th className="w-[22%] text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    &nbsp;
                  </th>
                  <th className="text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Fixes to what&apos;s built
                  </th>
                  <th className="text-left px-6 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    New development
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
                Both tiers include a call a week, plus the ports and model upgrades
                for when something changes upstream. Move between them whenever you
                want, or stop, and everything you own keeps working.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                More of my time
              </h4>
              <p className="text-ink-2 leading-relaxed">
                Two calls a week covers the build for most people. If you want more,
                extra sessions are $200 for sixty minutes, or four of them for $600.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h4 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                The AI&apos;s own usage
              </h4>
              <p className="text-ink-2 leading-relaxed">
                Billed straight to your account by the provider, at cost, because the
                system runs on your accounts. I take no margin on it and I&apos;ll
                show you the meter during the build.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default BuildPricing;
