"use client";

import React from "react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface AboutProps {
  onOpenContact: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenContact }) => (
  <section id="about" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
            <img
              src="/images/founder.webp"
              alt="Cristo Van Rensburg, founder of Cornerstone AI"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-8">
        <Reveal>
          <span className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            Meet the founder
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.94] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.6rem)]">
            I started my first business at 16, selling firewood to neighbours.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
            <p>
              A year later I was cold calling from my high school classroom. Since then
              I&apos;ve built systems across hospitality, construction, real estate,
              insurance, fintech and franchise operations, and for the founders of a
              podcast, a financing platform, an accounting practice and a sport academy.
            </p>
            <p className="text-foreground font-medium">
              Different industries, same bottleneck every time: the founder had become the
              operating system of their own business. And the fix was always the same, a
              real one, built around how they actually work.
            </p>
            <p>
              The name comes from my faith. Christ is the cornerstone of the church, and
              that&apos;s the foundation this company is built on. People come first. I
              don&apos;t build tech that looks impressive on a slide deck, I build systems
              that make a difference to the humans using them every day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-7 border-t border-line">
            <p className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground">
              Whatever we build, you own outright. No lock-in, no licence, no dependency
              on us.
            </p>
            <div className="shrink-0">
              <Button onClick={onOpenContact} icon>
                Book a call
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
