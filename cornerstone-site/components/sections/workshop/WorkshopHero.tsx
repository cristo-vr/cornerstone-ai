"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The four facts that decide whether someone keeps reading. Format, size of the
   room, and that it isn't a solo seat. */
const facts = ["8 weeks", "2 sessions a week", "Max 8 businesses", "Bring your team"];

interface Props {
  onOpenContact: () => void;
}

/**
 * Page-load cascade, same signature as the home hero: the motion props stay
 * identical whether or not motion is reduced, and only the transition collapses
 * to zero, so the server-rendered opacity:0 always gets driven back to visible.
 */
const WorkshopHero: React.FC<Props> = ({ onOpenContact }) => {
  const reduce = useReducedMotion();

  const rise = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.75, delay, ease: EASE },
  });

  return (
    <section className="relative pt-[124px] md:pt-[168px] pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.span
          {...rise(0, 12)}
          className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-9"
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          The Workshop
        </motion.span>

        <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.86] tracking-[0.005em] text-[clamp(2.8rem,8vw,6rem)] max-w-4xl">
          <motion.span {...rise(0.08)} className="block">
            Eight weeks and
          </motion.span>
          <motion.span {...rise(0.16)} className="block">
            you&apos;ll build it
          </motion.span>
          <motion.span {...rise(0.24)} className="block">
            <span className="text-accent-ink">yourself.</span>
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.38)}
          className="mt-9 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed"
        >
          You&apos;ll come out knowing exactly what this technology can do inside your
          business, able to point it at anything, with{" "}
          <strong className="font-semibold text-foreground">
            three working systems running
          </strong>{" "}
          to show for it. I teach, you build, on your own real work.
        </motion.p>

        <motion.div {...rise(0.48)} className="mt-10 flex flex-wrap items-center gap-3">
          {facts.map((fact, i) => (
            <span
              key={fact}
              className={`border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                i === 0
                  ? "border-rail bg-rail text-rail-text"
                  : "border-foreground/25 text-foreground"
              }`}
            >
              {fact}
            </span>
          ))}
        </motion.div>

        <motion.div {...rise(0.58)} className="mt-11 flex flex-wrap items-center gap-5">
          <Button onClick={onOpenContact} icon>
            Book a call
          </Button>
          <a
            href="#the-eight-weeks"
            className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-1 py-3"
          >
            See the eight weeks
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkshopHero;
