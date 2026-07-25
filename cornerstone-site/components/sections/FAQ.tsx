"use client";

import React from "react";
import { Plus } from "lucide-react";
import Reveal from "../ui/Reveal";

const faqs = [
  {
    question: "What is this, exactly?",
    answer:
      "A right hand for your business that runs on AI. It does the day-to-day work your business depends on, onboarding, follow-ups, project tracking, invoicing, reporting, inside the tools your team already uses. You own it outright.",
  },
  {
    question: "Who's it for?",
    answer:
      "Founder-led businesses of one to ten people where the work runs through the founder's head. Agencies, advisory firms, professional services, coaching. If you can't take a week off without things slipping, or you're turning down work because you can't take on more, that's exactly the spot we fix. The industry doesn't matter. The bottleneck does.",
  },
  {
    question: "Is this just a chatbot that knows my company?",
    answer:
      "No. A chatbot answers questions. This does the work. It runs real tasks across your tools, on a loop, without you prompting it, and your whole team can use it.",
  },
  {
    question: "Is my data safe? Can I really let my team use it?",
    answer:
      "Yes, and that's the point. Access is locked at the data, so each person sees only what they're meant to. Every action it takes is logged. The whole system sits on your accounts, not ours.",
  },
  {
    question: "How long does it take?",
    answer:
      "Eight weeks. It starts with a workshop to pin down what you need, then we embed and build live, one piece at a time. You don't wait until the end to see it work, things go live as they're ready and your team trains on them each week.",
  },
  {
    question: "Do I own it, or am I renting it?",
    answer:
      "You own it. Every piece of data and the full system live on your accounts. If we ever stop working together, it keeps running. You pay us to keep making it better, not to keep it switched on.",
  },
  {
    question: "What if my team doesn't use it?",
    answer:
      "That's our job to solve, not yours. Every week of the build includes training your team on what's new, and we're not done until they'd rather use it than go back.",
  },
  {
    question: "What does it cost?",
    answer:
      "The build is a fixed price for the eight weeks, and we'll give you the number on a call once we've seen your business. We also guarantee the result: your team handles twice the clients by week eight, or we keep working for free until it does.",
  },
];

const FAQ: React.FC = () => (
  <section id="faq" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-3xl mx-auto px-6">
      <Reveal>
        <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4rem)] mb-12">
          Straight answers.
        </h2>
      </Reveal>

      <div className="border-t border-line">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={Math.min(i, 4) * 0.04}>
            <details className="group border-b border-line">
              <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer">
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground group-hover:text-accent-ink transition-colors duration-200">
                  {faq.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-2 transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-45 group-open:text-accent-ink"
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </span>
              </summary>
              <p className="pb-7 -mt-1 text-ink-2 leading-relaxed max-w-[62ch]">{faq.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
