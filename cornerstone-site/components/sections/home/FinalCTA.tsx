"use client";

import React from "react";
import { Plus } from "lucide-react";
import Reveal from "../../ui/Reveal";
import ContactForm from "../../ui/ContactForm";

/* The short answers. Anything longer belongs on /build, where the reader has
   already decided they are interested and wants the detail. */
const faqs = [
  {
    question: "How much of my time does this actually take?",
    answer:
      "A working session in week one, then very little. There’s no standing weekly call, because you’re short of time already and a meeting in your diary every week isn’t what gets your business built. You get a direct line to me instead, answered inside 24 hours, and we talk when something needs talking about.",
  },
  {
    question: "If the scope isn’t fixed, what stops it drifting?",
    answer:
      "The queue. You can keep five requests open at a time and I work them one at a time, each one live within seven days of me starting it. So instead of agreeing a list up front and arguing about it later, you decide what matters most that week and it gets built. Most businesses end up with around eight systems by the end.",
  },
  {
    question: "Which tools does it work with?",
    answer:
      "The ones you already use. Email, WhatsApp, Xero or whatever you do the books in, spreadsheets, your project board, your client list, your booking calendar, your online store. I map your exact stack in week one and tell you straight away if something can’t connect, before anything gets built on the assumption that it can.",
  },
  {
    question: "Do I own it, or am I renting it from you?",
    answer:
      "You own it. Everything is built inside your own accounts from day one, so the system and the data are yours before the build even finishes. No licence, no platform fee, nothing to renew with me. If we stop working together, nothing switches off.",
  },
  {
    question: "My team isn’t technical. Will they use it?",
    answer:
      "Most systems die because the team has to bend around them. This one gets built around how they already work, on the tools they already open. It goes in live, one piece at a time, with training as it lands. By week eight they’re using it, not learning it.",
  },
  {
    question: "We handle sensitive information. Patients, legal files, payroll.",
    answer:
      "That changes how I build, not whether I can. Sensitive information gets tighter access, human sign-off on anything that touches it, and I build to your industry’s rules rather than around them. Bring the specifics to the call and I’ll walk you through exactly how it would work for yours.",
  },
];

const FinalCTA: React.FC = () => (
  <section id="contact" className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-3xl mx-auto px-6">
      <div id="faq" className="scroll-mt-28">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.4rem)] mb-10">
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
                <p className="pb-7 -mt-1 text-ink-2 leading-relaxed max-w-[62ch]">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-6">
            Book a call.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
            Thirty minutes, with me. Bring the part of your week that irritates you
            most and I&rsquo;ll tell you what I&rsquo;d build first and what it&rsquo;s
            worth doing. If it isn&rsquo;t worth doing, you&rsquo;ll hear that on the
            call rather than after the invoice.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="mt-12 rounded-xl border border-line bg-background p-7 md:p-10 shadow-[var(--shadow-soft)]">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  </section>
);

export default FinalCTA;
