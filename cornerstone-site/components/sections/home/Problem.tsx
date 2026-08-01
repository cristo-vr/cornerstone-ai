"use client";

import React from "react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";

/* The knife. Three costs that are already being paid, stated as facts about
   the reader's week rather than as an argument. This section does not sell
   anything and does not mention an offer. */
const costs = [
  {
    n: "01",
    title: "The business moves at your speed",
    body: "Work only progresses when you touch it. Take a week off and the business takes the week off with you, then hands you the backlog on the Monday.",
  },
  {
    n: "02",
    title: "You pay senior rates for data entry",
    body: "The people you hired for judgement spend their day retyping, chasing and updating. You are buying their best hours and getting their worst ones.",
  },
  {
    n: "03",
    title: "Growing costs more every time",
    body: "Headcount is the only lever left, so more work means more people, and more people means more of the same admin. The margin moves the wrong way as you grow.",
  },
];

const Problem: React.FC = () => (
  <section id="the-problem" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow className="mb-8">The problem</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-8">
            You&rsquo;ve already spent money on AI and the business runs exactly as it did
            before.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
            <p>
              A subscription somebody recommended. A tool that demoed beautifully and now
              lives in a tab nobody opens. Maybe an agency that took three months and
              handed back a chatbot answering questions your customers were never asking.
            </p>
            <p>
              So AI got filed somewhere between hype and money pit, with one thing still
              nagging: the suspicion that a competitor has worked something out that you
              haven&rsquo;t, and no reliable way to tell a real capability from a good
              demo.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <p className="mt-20 mb-10 font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
          What it costs you while nothing changes
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {costs.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.06}>
            <div className="h-full bg-background p-8 md:p-9">
              <span className="font-display text-3xl font-bold text-accent-ink block mb-4">
                {c.n}
              </span>
              <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-3 leading-[1.08]">
                {c.title}
              </h3>
              <p className="text-ink-2 leading-relaxed">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-12 max-w-3xl text-xl md:text-2xl text-foreground font-medium leading-[1.5]">
          Every one of those things you bought was a tool, and a tool sits there until a
          person opens it and types.{" "}
          <span className="text-accent-ink">That person is still you.</span>
        </p>
      </Reveal>
    </div>
  </section>
);

export default Problem;
