"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";

interface HeroProps {
  onOpenContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const strip = [
  { week: "Wk 1", label: "Map" },
  { week: "Wk 2-3", label: "Foundation" },
  { week: "Wk 4-7", label: "Build live" },
  { week: "Wk 8", label: "You own it" },
];

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const reduce = useReducedMotion();

  /* One orchestrated page-load cascade. Everything else on the site waits for
     scroll, so this is the only place motion announces itself.

     The props are deliberately identical whether or not motion is reduced, and
     only the transition collapses to zero. Branching the `animate` prop away
     strands the server-rendered `opacity:0` with nothing to drive it back, and
     the section renders blank. */
  const rise = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE },
  });

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-[68px] pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full px-6 py-16">
        <motion.span
          {...rise(0, 12)}
          className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-9"
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          The 8-week OS build
        </motion.span>

        <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.86] tracking-[0.005em] text-[clamp(2.9rem,8.2vw,6.5rem)]">
          <motion.span {...rise(0.08)} className="block">
            Right now, your
          </motion.span>
          <motion.span {...rise(0.16)} className="block">
            business runs
          </motion.span>
          <motion.span {...rise(0.24)} className="block">
            on <span className="text-accent-ink">you.</span>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.38)}
          className="mt-9 max-w-xl text-lg md:text-xl text-ink-2 leading-relaxed"
        >
          The 8-week OS build sets you up with a system built around how you work, run
          by AI, and{" "}
          <strong className="font-semibold text-foreground">owned by you.</strong>
        </motion.p>

        <motion.div {...rise(0.5)} className="mt-11 flex flex-wrap items-center gap-5">
          <Button onClick={onOpenContact} icon>
            Book a call
          </Button>
          <a
            href="#the-build"
            className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-1 py-3"
          >
            See the eight weeks
          </a>
        </motion.div>
      </div>

      {/* The whole build, one glance. Doubles as the scroll cue. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.75, ease: EASE }}
        className="absolute bottom-0 inset-x-0 border-t border-line"
      >
        <a
          href="#the-build"
          className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-3 overflow-x-auto font-semibold text-[10px] md:text-xs uppercase tracking-[0.14em] text-ink-2 hover:text-foreground transition-colors"
        >
          {strip.map((s, i) => (
            <React.Fragment key={s.week}>
              {i > 0 && (
                <span className="h-px flex-1 min-w-3 bg-foreground/15" aria-hidden="true" />
              )}
              <span className="whitespace-nowrap">
                <span className="text-accent-ink">{s.week}</span> {s.label}
              </span>
            </React.Fragment>
          ))}
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
