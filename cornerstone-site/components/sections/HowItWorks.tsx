"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";

const HowItWorks: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="py-28 md:py-36 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-8">
                Eight weeks. We build it with you, live.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-6 text-lg text-ink-2 leading-relaxed">
                <p>
                  It starts with a workshop. We sit down with you to understand exactly what
                  your business needs and where the time is bleeding out. Then it&apos;s eight
                  weeks of our dedicated time, embedded with your team, building the real
                  thing.
                </p>
                <p>
                  We don&apos;t disappear for two months and hand back a finished box. We build
                  one piece at a time and put it to work the moment it&apos;s ready. Some
                  pieces take a few hours, others take a few days. Every week we sit with your
                  team to train them on what&apos;s new, so by week eight they&apos;re running
                  on it, not figuring it out.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
              <img
                src="/images/blueprint.webp"
                alt="A building blueprint on a drafting table under warm light"
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

        {/* The eight-week course, set like a string line */}
        <div className="mt-20 mb-20">
          <div className="flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-2 mb-5">
            <span>Workshop</span>
            <span className="text-foreground hidden sm:block">Building live, every week</span>
            <span>You own it</span>
          </div>
          <div className="relative h-px bg-line">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute inset-0 h-px bg-primary"
            />
            <div className="absolute inset-0 flex justify-between items-center">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === 0 || i === 8 ? "bg-primary" : "bg-muted/50"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-2 mt-3.5">
            <span>Week 1</span>
            <span>Week 8</span>
          </div>
        </div>

        <Reveal>
          <div className="rounded-xl border border-primary/30 bg-primary/[0.07] p-8 md:p-12">
            <span className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-5">
              <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
              Our guarantee
            </span>
            <p className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground">
              In eight weeks, your team handles twice the clients without twice the work. If
              they can&apos;t,{" "}
              <span className="text-accent-ink">we keep building for free until they can.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HowItWorks;
