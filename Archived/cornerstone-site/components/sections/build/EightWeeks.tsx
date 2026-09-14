"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The three numbers that describe how the eight weeks actually feel to a
   client. Brass carries the figure, the label carries the meaning. */
const cadence = [
  {
    value: "24",
    unit: "hours",
    body: "To answer anything you send me, and to fix anything already built. There is no weekly call to wait for.",
  },
  {
    value: "1",
    unit: "build at a time",
    body: "You can keep five requests in the queue, and I work them in order.",
  },
  {
    value: "7",
    unit: "days, maximum",
    body: "From starting a new build to it running in your business.",
  },
];

const weeks = [
  {
    label: "Week 1",
    title: "Map",
    body: "A working session with you and the people who do the work. I trace how a job moves from first contact to paid, and where the hours go. It ends with a list of what gets built and in what order.",
  },
  {
    label: "Weeks 2 to 3",
    title: "Foundation",
    body: "The layer everything else stands on. Your clients, projects and money in one place, connected to the tools you already use, with roles and access set to match your team.",
  },
  {
    label: "Weeks 4 to 7",
    title: "Build live",
    body: "The builds land in the order we agreed. Your team learns each piece as it arrives, which beats a training day at the end that everybody forgets by Friday.",
  },
  {
    label: "Week 8",
    title: "Handover",
    body: "Keys, documentation, and a walkthrough of every piece with whoever is going to own it.",
  },
];

const EightWeeks: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="eight-weeks" className="py-20 md:py-28 bg-surface/40 border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <Eyebrow>How it runs</Eyebrow>
        </Reveal>

        <Reveal delay={0.04}>
          <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-6">
            Eight weeks, built in front of you.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 max-w-2xl leading-relaxed">
            Each piece goes in one at a time and starts working the week it&apos;s
            built, so you can feel the thing growing rather than take my word for it.
          </p>
        </Reveal>

        {/* Cadence first: it answers "what does this cost me in time" before the
            timeline asks for eight weeks of attention. */}
        <div className="mt-14 grid sm:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {cadence.map((c, i) => (
            <Reveal key={c.unit} delay={i * 0.06}>
              <div className="h-full bg-background p-7 md:p-8">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[2.6rem] font-extrabold leading-none tracking-[0.005em] text-accent-ink tabular-nums">
                    {c.value}
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-2">
                    {c.unit}
                  </span>
                </div>
                <p className="mt-4 text-ink-2 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-20">
          {/* Rail: a string line pulled taut as you scroll it. */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10"
            aria-hidden="true"
          />
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
              Three new businesses a month.
            </h3>
            <p className="text-lg text-ink-2 leading-relaxed max-w-3xl">
              I start three a month and no more, which is what makes the seven day
              turnaround possible. The calendar usually decides when you can start,
              rather than the paperwork.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EightWeeks;
