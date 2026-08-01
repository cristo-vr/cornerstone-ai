"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../../ui/Button";

interface HeroProps {
  onOpenContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* Real systems, running now. This rail is the only claim the hero makes
   besides the headline, and it is one a visitor can go and verify further
   down the page. No pricing up here: nobody knows what I do yet. */
const running = [
  "BioHarmony",
  "Technolease",
  "Roxburgh Trust",
  "ETJ Consulting",
  "A Better Question",
];

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const reduce = useReducedMotion();

  /* One orchestrated page-load cascade. Everything else on the page waits for
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
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-[76px] md:pt-[88px] pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full px-6 py-14">
        <motion.span
          {...rise(0, 12)}
          className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-9"
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          Custom AI operating systems
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
          I build the system that takes the routine work off you and your team: the quote
          drafted the moment an enquiry lands, the late invoice chased, Monday&rsquo;s
          report written off live numbers.{" "}
          <strong className="font-semibold text-foreground">
            It runs on the tools you already pay for, and you own all of it.
          </strong>
        </motion.p>

        <motion.div {...rise(0.5)} className="mt-11 flex flex-wrap items-center gap-5">
          <Button onClick={onOpenContact} icon>
            Book a call
          </Button>
          <a
            href="#proof"
            className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-1 py-3"
          >
            See what I&rsquo;ve built
          </a>
        </motion.div>
      </div>

      {/* Credibility rail. Doubles as the scroll cue. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.8, ease: EASE }}
        className="absolute bottom-0 inset-x-0 border-t border-line bg-surface/40"
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-baseline gap-x-7 gap-y-2">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
            Running today at
          </span>
          {running.map((name) => (
            <span
              key={name}
              className="font-display text-base md:text-lg font-bold uppercase tracking-[0.01em] text-foreground/75"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
