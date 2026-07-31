import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/* Concrete on purpose. "A system" means nothing to somebody reading this for the
   first time, so name four jobs they will recognise from their own week. */
const systems = [
  {
    title: "The quote off the enquiry",
    body: "Enquiry lands, the quote comes back drafted in your pricing and your words, waiting for you to check it rather than write it.",
  },
  {
    title: "The invoice that chases itself",
    body: "Day seven, a polite nudge. Day fourteen, a firmer one. Nobody has to notice it went unpaid.",
  },
  {
    title: "Monday's report, from live numbers",
    body: "Written off what's actually in your systems this morning, not off what you can remember about last week.",
  },
  {
    title: "The meeting, filed",
    body: "Notes written up, the project updated, the follow ups pulled out and put somewhere they'll get done.",
  },
];

const WhatASystemIs: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>What you&apos;ll actually build</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          A system is a job that stops needing you.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          Not a chat window you go and ask things. A job you repeat every week, turned into
          something you run in one line, or something that runs on a schedule while
          you&apos;re on site. Things like these.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {systems.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05} y={12}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7">
              <h3 className="font-display text-xl md:text-[1.4rem] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-ink-2 leading-relaxed">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-lg text-ink-2 leading-relaxed max-w-2xl">
          Three of them, built by you, running in your business by week eight. Which three
          comes out of your own audit in week one. It doesn&apos;t come out of my
          curriculum.
        </p>
      </Reveal>
    </div>
  </section>
);

export default WhatASystemIs;
