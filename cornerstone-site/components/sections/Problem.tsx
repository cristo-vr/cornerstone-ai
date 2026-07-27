"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Users, AppWindow } from "lucide-react";
import Reveal from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const pileTasks = [
  "New client signed",
  "Invoice still not sent",
  'WhatsApp: "where’s the file?"',
  "Follow-up overdue",
  "Proposal to write",
  "Onboarding half done",
  "Chase the missing doc",
  "Approve the timesheet",
];

/**
 * The pile-up. Work keeps arriving on a timer and it all lands on one person.
 * It only runs while on screen, and stops entirely under reduced motion.
 */
const PileUp: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setCount((c) => c + 1), 1600);
    return () => clearInterval(t);
  }, [reduce, inView]);

  const visible = 5;
  const stack = Array.from({ length: visible }, (_, i) => {
    const idx = count - (visible - 1) + i;
    return {
      key: idx,
      label: pileTasks[((idx % pileTasks.length) + pileTasks.length) % pileTasks.length],
    };
  });

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/5] rounded-xl border border-line bg-surface/50 overflow-hidden flex flex-col justify-end p-6 md:p-8"
    >
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <span className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2">
          Today, at your desk
        </span>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
      </div>

      <div className="flex flex-col-reverse items-center gap-2.5 mb-5">
        <AnimatePresence initial={false} mode="popLayout">
          {stack.map((item, i) => (
            <motion.div
              key={item.key}
              layout
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -32, scale: 0.96 }}
              animate={{ opacity: i === 0 ? 0.35 : 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ rotate: `${((item.key % 3) - 1) * 1.2}deg` }}
              className="px-4 py-2.5 rounded-lg border border-line bg-background text-ink-2 text-xs md:text-sm whitespace-nowrap shadow-[var(--shadow-soft)]"
            >
              {item.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* You, underneath all of it */}
      <div className="flex flex-col items-center pb-2">
        <div className="h-px w-24 bg-foreground/15 mb-4" aria-hidden="true" />
        <div className="px-5 py-2 rounded-lg border border-primary bg-background text-foreground font-medium text-sm">
          You
        </div>
        <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-2">
          where it all lands
        </span>
      </div>
    </div>
  );
};

const doors = [
  {
    label: "Door 1",
    icon: Users,
    title: "Hire more people",
    body: "More salaries, more managing, more of your week spent training and checking work. Good people are hard to find and harder to keep. When one leaves, the whole job lands back on you overnight.",
  },
  {
    label: "Door 2",
    icon: AppWindow,
    title: "Buy more software",
    body: "Another tool, another login, another thing your team half-uses. The data sits in five places and someone still has to tie it all together. That someone is you.",
  },
];

const Problem: React.FC = () => (
  <section id="the-problem" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-7">
              Every business has an operating system. Most founders never chose theirs.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
              <p>
                An operating system is the way work moves through your business.
                How a new client, patient or placement gets onboarded. How projects get
                tracked. How invoices go out. How nothing falls through the cracks.
              </p>
              <p>
                Most businesses never designed that system. It grew by accident: your
                memory, a group chat, five tools that don&apos;t talk to each other, a
                spreadsheet someone updates when they remember.
              </p>
              <p className="text-foreground font-medium">
                It holds together because you hold it together. You became the operating
                system. That&apos;s why growth feels like drowning: every new client adds
                load to the one part of the business that can&apos;t scale. You.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5">
          <PileUp />
        </Reveal>
      </div>

      <Reveal>
        <p className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground mb-8">
          Most founders try one of two ways out. Neither one fixes it.
        </p>
      </Reveal>

      {/* Dead ends render as inert concrete: no accent, no lift. */}
      <div className="grid md:grid-cols-2 gap-5 mb-20">
        {doors.map((door, i) => (
          <Reveal key={door.title} delay={i * 0.08}>
            <div className="h-full rounded-xl border border-line bg-surface/60 p-8 md:p-9">
              <div className="flex items-center justify-between mb-6">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-surface-2 text-ink-2">
                  <door.icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                  {door.label}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
                {door.title}
              </h3>
              <p className="text-ink-2 leading-relaxed">{door.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <blockquote className="max-w-3xl border-l-2 border-primary pl-7">
          <p className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground">
            The problem was never how hard your team works. It&apos;s that everything still
            runs through you.{" "}
            <span className="text-accent-ink">That&apos;s the part to fix.</span>
          </p>
        </blockquote>
      </Reveal>
    </div>
  </section>
);

export default Problem;
