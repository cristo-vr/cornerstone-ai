"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/* The honest fork. Anyone who isn't buying the Build should leave with the
   other door open, and with the ceiling of that door stated plainly. */
const facts = [
  { k: "$2,000", v: "Per seat, eight weeks" },
  { k: "$750", v: "Each extra person from your company" },
  { k: "2", v: "Sessions a week" },
  { k: "8", v: "Businesses per intake, maximum" },
];

const WorkshopRoute: React.FC = () => (
  <section className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>If this isn&apos;t the one</Eyebrow>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5.4vw,3.8rem)] max-w-3xl">
          Or you learn to build it yourself.
        </h2>
      </Reveal>

      <div className="mt-9 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
            <p>
              The Build is done for you. Some people would rather have the skill than
              the system, and some aren&apos;t ready to put $5,500 into something they
              can&apos;t picture yet. Both of those are fair, so there&apos;s a second
              door.
            </p>
            <p>
              The Workshop is hands on training in a group setting. Two sessions a
              week for eight weeks, at most eight businesses in an intake, and you
              build on your own real work while I&apos;m in the room with you. Not a
              course, not a community, and nobody is going to coach you. You turn up
              and do the work with someone who has done it before.
            </p>
            <p>
              Here&apos;s the ceiling, said now rather than in week seven. What you
              build there lives on your laptop, under your login. It won&apos;t hold
              state between runs, your team can&apos;t each have their own access to
              it, and there&apos;s no permission model or audit trail underneath it.
              That part is what the Build adds.
            </p>
            <p className="text-foreground font-medium">
              Start there and move to the Build within 30 days, and every dollar you
              paid, team seats included, comes off the Build price.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/workshop"
              className="group inline-flex items-center gap-2 rounded-lg border border-muted/60 bg-transparent px-6 py-3 font-sans text-[0.9rem] font-semibold tracking-[0.01em] text-foreground transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out)] hover:border-foreground hover:bg-surface-2 hover:-translate-y-px active:scale-[0.97]"
            >
              Read about the Workshop
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="lg:col-span-5">
          <div className="rounded-xl border border-line bg-background p-7 md:p-8">
            <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-6">
              The Workshop, in short
            </div>
            <dl className="divide-y divide-line">
              {facts.map((f) => (
                <div key={f.k} className="py-4 flex items-baseline justify-between gap-5">
                  <dt className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-accent-ink tabular-nums leading-none">
                    {f.k}
                  </dt>
                  <dd className="text-right text-sm text-ink-2 leading-snug max-w-[11rem]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ink-2 leading-relaxed">
              Nothing renews on its own. Another eight week block is $1,500 a seat if you want to keep going.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default WorkshopRoute;
