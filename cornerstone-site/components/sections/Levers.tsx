"use client";

import React from "react";
import { UserPlus, TrendingUp, Wallet, ShieldCheck } from "lucide-react";
import Reveal from "../ui/Reveal";

const levers = [
  {
    icon: UserPlus,
    title: "Sign more clients",
    body: "Your capacity stops being capped by your hours, so you can say yes again.",
  },
  {
    icon: TrendingUp,
    title: "Make each client worth more",
    body: "Nothing slips. Every client gets your standard every time, so they stay longer and spend more.",
  },
  {
    icon: Wallet,
    title: "Spend less to deliver",
    body: "The admin layer runs itself instead of eating salaries and your evenings.",
  },
  {
    icon: ShieldCheck,
    title: "Depend on fewer people",
    body: "The business runs without you in every loop, and without us. That last one is worth more than it sounds.",
  },
];

const Levers: React.FC = () => (
  <section className="py-28 md:py-36 border-t border-line">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)]">
            Four ways this puts money back in the business.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-lg text-ink-2 leading-relaxed">
            Everything we build has to do at least one of these. If it doesn&apos;t, we
            don&apos;t build it.
          </p>
        </Reveal>
      </div>

      {/* Hairline grid: the joints show, like set blocks. */}
      <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {levers.map((lever, i) => (
          <Reveal key={lever.title} delay={i * 0.06}>
            <div className="h-full bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-surface/70">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink mb-6">
                <lever.icon className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                {lever.title}
              </h3>
              <p className="text-ink-2 leading-relaxed">{lever.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/[0.07] p-8 md:p-12">
          <p className="text-xl md:text-2xl text-ink-2 leading-relaxed max-w-4xl">
            A business that only works when you&apos;re in it is risky to own and hard to sell.
            A business that runs on its own is worth more, full stop.{" "}
            <strong className="font-semibold text-foreground">
              This doesn&apos;t just make you more money while it&apos;s running. It makes the
              whole company more valuable.
            </strong>
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Levers;
