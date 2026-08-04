"use client";

import React from "react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";
import CtaLink from "./CtaLink";

/* One offer, one price, stated once on the whole page. The mechanics are here
   rather than on /build because they are the offer: what a buyer needs to know
   is how fast things happen and how much of their week it costs, not a list of
   features. */

const included = [
  "A working session in week one, with you and the people who actually do the job",
  "Eight weeks of build, and I work one thing at a time",
  "A direct line to me, answered inside 24 hours",
  "Two training sessions for your team",
  "Everything built inside your own accounts from the first day",
  "Handover at the end: keys, documentation, and your team shown how it works",
];

const promises = [
  {
    v: "24",
    u: "hours",
    body: "To answer anything you send, and to fix anything already built.",
  },
  {
    v: "7",
    u: "days",
    body: "From starting a new build to it running in your business. That's the ceiling, not the average.",
  },
  {
    v: "5",
    u: "open requests",
    body: "You can have five things in the queue. I work them one at a time, so nothing sits half finished.",
  },
];

const after = [
  {
    name: "Keep building",
    price: "$2,000",
    cycle: "per 4 weeks",
    body: "Same as the build. New things get made, everything stays fixed inside 24 hours.",
  },
  {
    name: "Support",
    price: "$500",
    cycle: "per 4 weeks",
    body: "I keep what you have working. Nothing new gets built.",
  },
];

const TheOffer: React.FC = () => (
  <section id="the-offer" className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow className="mb-8">What it costs</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-6">
            $6,000 buys eight weeks of my time, pointed at your business.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-ink-2 leading-relaxed">
            You&rsquo;re not buying a fixed list of features. You&rsquo;re buying eight
            weeks of building, aimed at whatever your business actually needs, decided
            as we go. Most businesses end up with somewhere around eight systems and a
            platform holding them together.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-12 gap-6">
        <Reveal className="lg:col-span-5">
          <div className="h-full rounded-xl border border-primary/50 bg-background p-8 md:p-10 shadow-[var(--shadow-soft)] flex flex-col">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
              The Build
            </span>
            <p className="mt-6 font-display text-[clamp(3rem,6vw,4.2rem)] font-extrabold uppercase leading-none tracking-[0.005em] text-accent-ink tabular-nums">
              $6,000
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink-2">
              Eight weeks, paid up front
            </p>
            <p className="mt-6 text-ink-2 leading-relaxed grow">
              Then four more weeks of support on me, so you get to use the thing with me
              still around before you decide whether you want me to stay.
            </p>
            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-sm font-semibold text-foreground">
                I take on three new businesses a month.
              </p>
              <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                That&rsquo;s what makes the turnaround times above worth anything.
              </p>
            </div>
            <div className="mt-8">
              <CtaLink href="/build">See how the eight weeks run</CtaLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="h-full rounded-xl border border-line bg-background p-8 md:p-10">
            <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-6">
              What you get
            </h3>
            <ul className="space-y-3.5">
              {included.map((line) => (
                <li key={line} className="flex gap-3 text-ink-2 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-3 shrink-0 bg-primary"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <p className="mt-16 mb-8 font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
          How fast things happen
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {promises.map((p, i) => (
          <Reveal key={p.u} delay={i * 0.06}>
            <div className="h-full bg-background p-8 md:p-9">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[2.6rem] font-extrabold leading-none tracking-[0.005em] text-accent-ink tabular-nums">
                  {p.v}
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-2">
                  {p.u}
                </span>
              </div>
              <p className="mt-4 text-ink-2 leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-8 max-w-3xl text-lg text-ink-2 leading-relaxed">
          There&rsquo;s no standing weekly call. We talk when something needs talking
          about, and the rest goes through the channel. You&rsquo;re short of time
          already, and a meeting in your diary every week isn&rsquo;t the thing that
          gets your business built.
        </p>
      </Reveal>

      <div className="mt-20 pt-16 border-t border-line">
        <Reveal>
          <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.8rem,3.6vw,2.6rem)] mb-5">
            After the twelve weeks.
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg text-ink-2 leading-relaxed max-w-2xl mb-10">
            The system is yours and it carries on whether I&rsquo;m involved or not.
            If you want me to stay, pick one. Nothing renews on its own and you can
            stop at the end of any cycle.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {after.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-line bg-background p-7 md:p-8">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h4 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground">
                    {a.name}
                  </h4>
                  <span className="text-right">
                    <span className="font-display text-2xl font-bold text-accent-ink tabular-nums">
                      {a.price}
                    </span>
                    <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink-2 mt-1">
                      {a.cycle}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-ink-2 leading-relaxed">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TheOffer;
