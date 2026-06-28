"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: 'What is this, exactly?',
    answer:
      "A right hand for your business that runs on AI. It does the day-to-day work your business depends on, onboarding, follow-ups, project tracking, invoicing, reporting, inside the tools your team already uses. You own it outright.",
  },
  {
    question: "Who's it for?",
    answer:
      "Founder-led businesses of one to ten people where the work runs through the founder's head. Agencies, advisory firms, professional services, coaching. If you can't take a week off without things slipping, or you're turning down work because you can't take on more, that's exactly the spot we fix. The industry doesn't matter. The bottleneck does.",
  },
  {
    question: 'Is this just a chatbot that knows my company?',
    answer:
      'No. A chatbot answers questions. This does the work. It runs real tasks across your tools, on a loop, without you prompting it, and your whole team can use it.',
  },
  {
    question: 'Is my data safe? Can I really let my team use it?',
    answer:
      "Yes, and that's the point. Access is locked at the data, so each person sees only what they're meant to. Every action it takes is logged. The whole system sits on your accounts, not ours.",
  },
  {
    question: 'How long does it take?',
    answer:
      "Eight weeks. It starts with a workshop to pin down what you need, then we embed and build live, one piece at a time. You don't wait until the end to see it work, things go live as they're ready and your team trains on them each week.",
  },
  {
    question: 'Do I own it, or am I renting it?',
    answer:
      'You own it. Every piece of data and the full system live on your accounts. If we ever stop working together, it keeps running. You pay us to keep making it better, not to keep it switched on.',
  },
  {
    question: "What if my team doesn't use it?",
    answer:
      "That's our job to solve, not yours. Every week of the build includes training your team on what's new, and we're not done until they'd rather use it than go back.",
  },
  {
    question: 'What does it cost?',
    answer:
      "The build is a fixed price for the eight weeks, and we'll give you the number on a call once we've seen your business. We also guarantee the result: your team handles twice the clients by week eight, or we keep working for free until it does.",
  },
];

const FAQ = () => {
  return (
    <section className="py-28 md:py-32 bg-background border-t border-foreground/5 w-full" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-12"
        >
          Straight answers.
        </motion.h2>

        <div className="divide-y divide-foreground/10 border-t border-foreground/10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.04, ease }}
            >
              <details className="group">
                <summary className="flex justify-between items-center gap-6 py-6 cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-display font-medium text-foreground">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-muted shrink-0 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                </summary>
                <div className="pb-6 -mt-1 text-muted leading-relaxed max-w-[60ch]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
