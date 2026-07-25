"use client";

import React from "react";
import { Lock, ScrollText, Database, LayoutDashboard } from "lucide-react";
import Reveal from "../ui/Reveal";

const points = [
  {
    icon: Lock,
    title: "Everyone sees only what they should",
    body: "Access is set at the data itself, not by asking the AI nicely. Your bookkeeper sees the books. Your newest hire doesn't see the bank balance.",
  },
  {
    icon: ScrollText,
    title: "Every action is logged",
    body: "You can see exactly what it did and when. Nothing happens in the dark.",
  },
  {
    icon: Database,
    title: "One database, on your accounts",
    body: "There's a single source of truth, and it belongs to you.",
  },
  {
    icon: LayoutDashboard,
    title: "A simple control panel",
    body: "You and your team run the whole thing from one screen.",
  },
];

const Safety: React.FC = () => (
  <section className="py-28 md:py-36 bg-surface/50 border-t border-line">
    <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.4rem)]">
            Powerful, and locked down.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-lg text-ink-2 leading-relaxed">
            Letting AI into your business only works if it&apos;s safe. Here&apos;s how that
            gets handled.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-11 hidden lg:block">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
            <img
              src="/images/vault.webp"
              alt="A brushed-brass vault dial on a dark door"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[rgba(120,150,170,0.12)] via-transparent to-[rgba(50,32,20,0.3)]"
            />
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-xl border border-line bg-background overflow-hidden">
          {points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.06}
              className={i > 0 ? "border-t border-line" : ""}
            >
              <div className="flex gap-5 p-6 md:p-7">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/12 text-accent-ink shrink-0">
                  <point.icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-1">
                    {point.title}
                  </h3>
                  <p className="text-ink-2 leading-relaxed">{point.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Safety;
