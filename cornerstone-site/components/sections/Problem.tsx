"use client";

import React from "react";
import { Users, AppWindow } from "lucide-react";
import Reveal from "../ui/Reveal";

const doors = [
  {
    label: "Door 1",
    icon: Users,
    title: "Hire more people",
    body: "More salaries, more managing, more of your week spent training and checking work. Good people are hard to find and harder to keep. When one leaves, the whole job lands back on you overnight.",
  },
  {
    label: "Door 2",
    icon: AppWindow,
    title: "Buy more software",
    body: "Another tool, another login, another thing your team half-uses. The data sits in five places and someone still has to tie it all together. That someone is you.",
  },
];

const Problem: React.FC = () => (
  <section className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-7">
              Every time you win,{" "}
              <span className="text-ink-2">you lose.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg text-ink-2 leading-relaxed">
              You sign a great client, and now there&apos;s more work landing on you. You grow,
              and the business needs more of you, not less. There&apos;s only so much of you to
              go around, so eventually you start saying no. No to the project you actually
              wanted. No to marketing, because you couldn&apos;t handle the leads it would
              bring. You end up capping your own business to protect the part that barely
              holds together.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
            <img
              src="/images/late-night-desk.webp"
              alt="A founder's desk late at night, papers stacked under a single lamp"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[rgba(120,150,170,0.12)] via-transparent to-[rgba(50,32,20,0.32)]"
            />
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground mb-8">
          Most founders try one of two ways out. Neither one fixes it.
        </p>
      </Reveal>

      {/* Dead ends render as inert concrete: no accent, no lift. */}
      <div className="grid md:grid-cols-2 gap-5 mb-20">
        {doors.map((door, i) => (
          <Reveal key={door.title} delay={i * 0.08}>
            <div className="h-full rounded-xl border border-line bg-surface/60 p-8 md:p-9">
              <div className="flex items-center justify-between mb-6">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-surface-2 text-ink-2">
                  <door.icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                  {door.label}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
                {door.title}
              </h3>
              <p className="text-ink-2 leading-relaxed">{door.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <blockquote className="max-w-3xl border-l-2 border-primary pl-7">
          <p className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground">
            The problem was never how hard your team works. It&apos;s that everything still
            runs through you.{" "}
            <span className="text-accent-ink">That&apos;s the part to fix.</span>
          </p>
        </blockquote>
      </Reveal>
    </div>
  </section>
);

export default Problem;
