"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const weeks = [
  {
    label: "Week 1",
    title: "Map",
    body: "We workshop with you and your team, trace how work actually moves, and find where the hours bleed out.",
  },
  {
    label: "Weeks 2-3",
    title: "Foundation",
    body: "The core layer goes in. Your clients, projects and money in one place, connected to the tools you already use. Everything is built inside your accounts from day one, so even the work in progress is already yours.",
  },
  {
    label: "Weeks 4-7",
    title: "Build live",
    body: "One piece at a time, put to work the moment it is ready. Weekly sessions train your team as the system grows.",
  },
  {
    label: "Week 8",
    title: "Handover",
    body: "Keys, documentation, ownership. Your team runs it without us.",
  },
];

const TheBuild: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="the-build" className="py-28 md:py-36 bg-surface/40 border-t border-line">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <span className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-7">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            The build
          </span>
        </Reveal>

        <Reveal delay={0.04}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5">
            The eight-week OS build.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 mb-16 max-w-2xl leading-relaxed">
            One build, fixed scope, done with you. Not a two-month disappearing act. Your
            side of it: a workshop in week one, then about an hour a week with your team.
            One hour together, not one hour per person.
          </p>
        </Reveal>

        <div className="relative">
          {/* Rail: a string line pulled taut as you scroll it. */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10" aria-hidden="true" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE }}
            style={{ originY: 0 }}
            className="absolute left-[7px] top-2 bottom-2 w-px bg-primary"
            aria-hidden="true"
          />
          <div className="space-y-14">
            {weeks.map((week, i) => (
              <Reveal key={week.label} delay={i * 0.08} y={12}>
                <div className="relative pl-12">
                  <span
                    className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background"
                    aria-hidden="true"
                  />
                  <div className="font-semibold text-xs uppercase tracking-[0.14em] text-accent-ink mb-2">
                    {week.label}
                  </div>
                  <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {week.title}
                  </h3>
                  <p className="text-ink-2 text-lg leading-relaxed max-w-xl">{week.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-20 rounded-xl border border-line bg-background p-8 md:p-10">
            <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-bold text-foreground mb-4">
              And after week eight?
            </h3>
            <div className="space-y-4 text-lg text-ink-2 leading-relaxed max-w-3xl">
              <p>
                The system is yours and keeps running on its own. Nothing turns off because
                we walked out the door.
              </p>
              <p>
                If you want us to keep building and looking after it, there&apos;s an
                optional monthly retainer. No lock-in: stop it any month, and everything you
                own keeps working. If one of your tools changes something down the line, we
                handle it on the retainer, or your team fixes it with the documentation we
                hand over.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TheBuild;
