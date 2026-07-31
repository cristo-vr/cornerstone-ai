import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const items = [
  {
    n: "01",
    title: "You'll know what this can actually do",
    body: "Look at any process in your business and tell whether AI can take it, what building it would involve, and whether it's worth doing.",
  },
  {
    n: "02",
    title: "Three systems you built yourself",
    body: "Running in your business, used on a normal Tuesday. Plus your operation documented, which is what makes the fourth and fifth faster than these three.",
  },
  {
    n: "03",
    title: "Evidence, not a feeling",
    body: "The same audit run in week one and week eight, so you can put a number on exactly what changed.",
  },
];

const WhatYouWalkAwayWith: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line bg-surface/30">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>What you walk away with</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Three things, by the end of week eight.
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <Reveal key={item.n} delay={i * 0.06} y={12}>
            <div
              className={`h-full rounded-xl border bg-background p-7 md:p-8 ${
                i === 0 ? "border-rail" : "border-line"
              }`}
            >
              <p className="font-display text-[2.4rem] font-extrabold leading-none tracking-[0.005em] text-accent-dk tabular-nums">
                {item.n}
              </p>
              <h3 className="mt-5 font-display text-lg md:text-xl font-bold uppercase leading-[1.08] tracking-[0.01em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-ink-2 leading-relaxed">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-10 text-lg text-ink-2 leading-relaxed max-w-2xl">
          The systems are the visible part. The judgement is what you&apos;re really buying,
          because in twelve months the tools will have moved and the person who understands
          how it fits together will still be ahead.
        </p>
      </Reveal>
    </div>
  </section>
);

export default WhatYouWalkAwayWith;
