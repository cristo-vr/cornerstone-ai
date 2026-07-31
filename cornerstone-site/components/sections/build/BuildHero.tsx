"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

interface BuildHeroProps {
  onOpenContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* The four facts a buyer wants before they read a word of the argument.
   Doubles as the scroll cue, same as the home hero. */
const facts = [
  { value: "8 weeks", label: "Start to handover" },
  { value: "2 calls", label: "A week, that's your side" },
  { value: "$5,500", label: "Fixed, agreed up front" },
  { value: "3 clients", label: "A quarter, that's the cap" },
];

const BuildHero: React.FC<BuildHeroProps> = ({ onOpenContact }) => {
  const reduce = useReducedMotion();

  /* One page-load cascade. Props stay identical whether or not motion is
     reduced, and only the transition collapses, so the server-rendered
     opacity:0 always has something to drive it back. */
  const rise = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE },
  });

  /* The pb clears the absolutely positioned fact strip, which wraps to two rows
     below md and so needs more room there than it does on a wide screen. */
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-[76px] md:pt-[88px] pb-40 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full px-6 py-16">
        <motion.span
          {...rise(0, 12)}
          className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-9"
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          The Build
        </motion.span>

        <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.86] tracking-[0.005em] text-[clamp(2.6rem,7.4vw,5.8rem)]">
          <motion.span {...rise(0.08)} className="block">
            It drafts the quote.
          </motion.span>
          <motion.span {...rise(0.16)} className="block">
            Chases the invoice.
          </motion.span>
          <motion.span {...rise(0.24)} className="block">
            Writes the <span className="text-accent-ink">Monday report.</span>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.38)}
          className="mt-9 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed"
        >
          Eight weeks. I build a custom AI system around the way your business
          already runs, on your accounts, permissioned for your team, with a log of
          everything it does.{" "}
          <strong className="font-semibold text-foreground">
            You own the whole thing at the end of week eight.
          </strong>
        </motion.p>

        <motion.div {...rise(0.5)} className="mt-11 flex flex-wrap items-center gap-5">
          <Button onClick={onOpenContact} icon>
            Book a call
          </Button>
          <a
            href="#what-gets-built"
            className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-1 py-3"
          >
            See what gets built
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.75, ease: EASE }}
        className="absolute bottom-0 inset-x-0 border-t border-line"
      >
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
          {facts.map((f) => (
            <div key={f.value}>
              <div className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-accent-ink leading-none tabular-nums">
                {f.value}
              </div>
              <div className="mt-1.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BuildHero;
