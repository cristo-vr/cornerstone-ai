"use client";

import React from "react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface AboutProps {
  onOpenContact: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenContact }) => (
  <section id="about" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
            <img
              src="/images/founder.webp"
              alt="Cristo Van Rensburg, founder of Cornerstone AI"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[rgba(120,150,170,0.1)] via-transparent to-[rgba(50,32,20,0.28)]"
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
              A year later I was making cold calls from my high school classroom. Since then
              I&apos;ve built systems across hospitality, construction, real estate, insurance,
              fintech, and franchise operations. Every time, the same problem showed up: the
              founder was the operating system of their own business. Everything ran on them.
            </p>
            <p>
              I&apos;ve built operating systems for the founder of a podcast, the founder of a
              financing platform, the founding team of an accounting practice, and the founder
              of a sport academy. Different industries, but the bottleneck was always the same,
              the founder. And the fix was always the same, a custom platform that puts
              everything in one place.
            </p>
            <p>That&apos;s what Cornerstone AI exists to build.</p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="rounded-xl border border-primary/30 bg-primary/[0.07] p-7 md:p-8">
            <p className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground mb-3">
              Different industries.{" "}
              <span className="text-accent-ink">Same bottleneck: the founder.</span>
            </p>
            <p className="text-ink-2 leading-relaxed">
              Whatever we build, you own outright. It lives on your accounts, your team runs
              it, and it keeps working whether we&apos;re in the room or not. No lock-in, no
              licence, no dependency on us.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-lg text-ink-2 leading-relaxed">
            The name Cornerstone comes from my faith. Christ is the cornerstone of the church,
            and that&apos;s the foundation this company is built on. People come first, always.
            I don&apos;t build tech that looks impressive on a slide deck, I build operating
            systems that make a real difference to the actual humans using them every day.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-7 border-t border-line">
            <p className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground">
              We guarantee the outcome, or we keep building for free.
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
