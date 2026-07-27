"use client";

import React from "react";
import { Check, X } from "lucide-react";
import Reveal from "../ui/Reveal";

const forYou = [
  "You run a service business with real clients and a small team.",
  "Everything still routes through you, and it's capping your growth.",
  "You have demand. What you're short of is capacity.",
  "You want to own your system, not rent another subscription.",
];

const notForYou = [
  "You're pre-revenue and still finding your offer.",
  "You want a chatbot, not a way your business runs.",
  "You want a tool your team has to bend around.",
  "You want it done to you, not built with you.",
];

const WhoItsFor: React.FC = () => (
  <section className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-14">
          Who it&apos;s for. And who it isn&apos;t.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-xl border border-primary/40 bg-primary/[0.07] p-8 md:p-10">
            <h3 className="font-display uppercase tracking-[0.005em] text-2xl font-bold text-foreground mb-8">
              Built for you if
            </h3>
            <ul className="space-y-5">
              {forYou.map((line) => (
                <li key={line} className="flex items-start gap-3 text-lg text-ink-2 leading-relaxed">
                  <Check className="w-5 h-5 text-accent-ink shrink-0 mt-1" strokeWidth={2} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-xl border border-line bg-surface/60 p-8 md:p-10">
            <h3 className="font-display uppercase tracking-[0.005em] text-2xl font-bold text-ink-2 mb-8">
              Not for you if
            </h3>
            <ul className="space-y-5">
              {notForYou.map((line) => (
                <li key={line} className="flex items-start gap-3 text-lg text-ink-2 leading-relaxed">
                  <X className="w-5 h-5 text-muted shrink-0 mt-1" strokeWidth={2} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default WhoItsFor;
