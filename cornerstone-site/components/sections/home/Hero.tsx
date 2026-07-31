"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../../ui/Button";

interface HeroProps {
  onOpenContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* The fork, pinned to the bottom of the first screen. A visitor who reads
   nothing else still leaves knowing there are two offers and what they cost. */
const paths = [
  {
    href: "/build",
    label: "I build it for you",
    price: "$5,500",
    note: "8 weeks, done for you",
  },
  {
    href: "/workshop",
    label: "I teach you to build it",
    price: "$2,000",
    note: "8 weeks per seat, done with you",
  },
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
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-[76px] md:pt-[88px] pb-32 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full px-6 py-14">
        <motion.span
          {...rise(0, 12)}
          className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-9"
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          Cristo Van Rensburg, Cornerstone AI
        </motion.span>

        <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.86] tracking-[0.005em] text-[clamp(2.7rem,7.6vw,6rem)]">
          <motion.span {...rise(0.08)} className="block">
            I build the AI
          </motion.span>
          <motion.span {...rise(0.16)} className="block">
            that does your
          </motion.span>
          <motion.span {...rise(0.24)} className="block">
            company&rsquo;s <span className="text-accent-ink">admin.</span>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.38)}
          className="mt-9 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed"
        >
          The quote drafted the minute the enquiry lands. The invoice that&rsquo;s two
          weeks late, chased. Monday&rsquo;s report written off live numbers instead of
          somebody&rsquo;s memory. The meeting notes filed and the project updated before
          anyone opens a laptop.{" "}
          <strong className="font-semibold text-foreground">
            Software that does the work, not software that waits for you to open it.
          </strong>
        </motion.p>

        <motion.p {...rise(0.46)} className="mt-5 max-w-2xl text-lg text-ink-2">
          Two ways to get it: I build it for your business, or I teach you and your team
          to build it yourselves.
        </motion.p>

        <motion.div {...rise(0.56)} className="mt-10 flex flex-wrap items-center gap-5">
          <Button onClick={onOpenContact} icon>
            Book a call
          </Button>
          <a
            href="#two-paths"
            className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-1 py-3"
          >
            Compare the two
          </a>
        </motion.div>
      </div>

      {/* The fork, one glance. Doubles as the scroll cue. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.8, ease: EASE }}
        className="absolute bottom-0 inset-x-0 border-t border-line bg-surface/40"
      >
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2">
          {paths.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-surface-2/60 ${
                i === 1 ? "sm:border-l sm:border-line sm:pl-6" : "sm:pr-6"
              } ${i === 0 ? "border-b border-line sm:border-b-0" : ""}`}
            >
              <span className="min-w-0">
                <span className="block font-display text-lg md:text-xl font-bold uppercase tracking-[0.005em] text-foreground group-hover:text-accent-ink transition-colors">
                  {p.label}
                </span>
                <span className="block text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                  {p.note}
                </span>
              </span>
              <span className="shrink-0 font-display text-xl md:text-2xl font-bold text-accent-ink">
                {p.price}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
