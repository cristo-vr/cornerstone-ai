"use client";

import React from "react";
import { Plus } from "lucide-react";
import Reveal from "../../ui/Reveal";
import ContactForm from "../../ui/ContactForm";

/* Five questions. Anything longer belongs on /build or /workshop, where the
   reader has already chosen a direction and wants the detail. */
const faqs = [
  {
    question: "How do I know which of the two I need?",
    answer:
      "If you want it running and you don’t want to be the person maintaining it, that’s the Build. If you’d rather the skill lived inside your business, and you or someone on your team will actually sit down and build, that’s the Workshop. Book a call and I’ll tell you which one I think fits, including when the answer is neither.",
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
      "The usual reason a new system dies is that it was built for a generic company and the team has to bend around it. This is the other way round: it’s built around how they already work, on the tools they already open, and it goes in live one piece at a time with training as it lands. By week eight they’re running on it rather than working it out.",
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
            Tell me the part of the week that eats you.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
            Thirty minutes, with me, not a salesperson. I&rsquo;ll tell you what
            I&rsquo;d build, which of the two paths fits, and what it costs. If neither
            fits, you&rsquo;ll hear that on the call rather than after the invoice.
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
