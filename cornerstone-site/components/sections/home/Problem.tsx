"use client";

import React from "react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";

/* Four ordinary moments in a week, each one finished before anybody asked.
   Concrete on purpose: this is the part of the pitch a visitor has to be able
   to repeat to their business partner. */
const moments = [
  {
    trigger: "An enquiry lands at 21:40.",
    result:
      "The quote is drafted off your own rates and last year’s similar jobs, sitting in your drafts before you’ve read the email. You change two numbers and send it.",
  },
  {
    trigger: "An invoice goes fourteen days past due.",
    result:
      "The chase goes out in your wording, politely, then again a week later. You hear about it when the money lands.",
  },
  {
    trigger: "It’s Monday, 06:00.",
    result:
      "The report is already written: what came in, what went out, what slipped, which client has gone quiet. Off live numbers, not off somebody’s memory of last week.",
  },
  {
    trigger: "A meeting ends.",
    result:
      "Notes filed where they belong, the project updated, and the three things you promised on the call are on the right person’s list with dates.",
  },
];

const Problem: React.FC = () => (
  <section id="the-problem" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow className="mb-8">The honest version</Eyebrow>
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
              So AI got filed somewhere between hype and money pit, with one splinter left
              in it: the suspicion that a competitor has worked something out that you
              haven&rsquo;t. And no reliable way to tell a real capability from a good
              demo.
            </p>
            <p className="text-foreground font-medium">
              Every one of those things was a tool. A tool sits there until a person opens
              it and types. What changes a business is a system that already knows how the
              place runs, has permission to act, and gets on with it.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <p className="mt-20 mb-10 font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
          What that actually looks like in a week
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {moments.map((m, i) => (
          <Reveal key={m.trigger} delay={Math.min(i, 3) * 0.06}>
            <div className="h-full bg-background p-8 md:p-9">
              <span className="font-display text-3xl font-bold text-accent-ink block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-foreground font-semibold mb-2">{m.trigger}</h3>
              <p className="text-ink-2 leading-relaxed">{m.result}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          <p className="lg:col-span-7 text-lg text-ink-2 leading-relaxed">
            None of that is exotic. It runs on the tools you already pay for (email,
            WhatsApp, your accounting package, your project board, your client list),
            inside your own accounts, with permissions per person and a record of every
            action it took. Anything that leaves the business, money or a message to a
            client, waits for a human yes.
          </p>
          <blockquote className="lg:col-span-5 border-l-2 border-primary pl-6">
            <p className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold uppercase leading-[1.08] tracking-[0.005em] text-foreground">
              Once you can see how it&rsquo;s put together, you can point it at anything.{" "}
              <span className="text-accent-ink">That&rsquo;s the part worth owning.</span>
            </p>
          </blockquote>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Problem;
