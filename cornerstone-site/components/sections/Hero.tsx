"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";

interface HeroProps {
  onOpenContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const reduce = useReducedMotion();

  /* One orchestrated page-load cascade. Everything else on the site waits for
     scroll, so this is the only place motion announces itself.

     The props are deliberately identical whether or not motion is reduced, and
     only the transition collapses to zero. Branching the `animate` prop away
     strands the server-rendered `opacity:0` with nothing to drive it back, and
     the section renders blank. */
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.75, delay, ease: EASE },
  });

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[68px]">
      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center py-16">
        {/* The pitch */}
        <div className="lg:col-span-7">
          <motion.span
            {...rise(0)}
            className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-8"
          >
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            An AI Chief of Staff
          </motion.span>

          <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.86] tracking-[0.005em] text-[clamp(3rem,7.4vw,6rem)]">
            <motion.span {...rise(0.08)} className="block">
              Your next hire
            </motion.span>
            <motion.span {...rise(0.18)} className="block">
              isn&apos;t a <span className="text-accent-ink">person.</span>
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.32)}
            className="mt-8 max-w-lg text-lg md:text-xl text-ink-2 leading-relaxed"
          >
            It&apos;s a right hand that runs your operations, never quits, and{" "}
            <strong className="font-semibold text-foreground">belongs to you.</strong>
          </motion.p>

          <motion.div {...rise(0.44)} className="mt-10">
            <Button onClick={onOpenContact} icon>
              Book a call
            </Button>
          </motion.div>
        </div>

        {/* The cornerstone, bleeding off the right edge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduce ? { duration: 0 } : { duration: 1.1, delay: 0.3, ease: EASE }
          }
          className="lg:col-span-5 relative lg:-mr-12 xl:-mr-20"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-lift)]">
            <img
              src="/images/cornerstone-hero.webp"
              alt="A cornerstone block set into a foundation"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* film grade: warm in the shadows, cool in the light */}
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[rgba(120,150,170,0.12)] via-transparent to-[rgba(50,32,20,0.32)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
