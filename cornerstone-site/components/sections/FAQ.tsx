"use client";

import React from "react";
import { Plus } from "lucide-react";
import Reveal from "../ui/Reveal";
import { faqs } from "@/lib/faqs";

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
