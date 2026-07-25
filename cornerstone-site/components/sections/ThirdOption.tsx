"use client";

import React from "react";
import Reveal from "../ui/Reveal";

const capabilities = [
  {
    title: "It holds your standard.",
    body: "The work gets done to the bar you set, every time, not just when you're watching.",
  },
  {
    title: "It runs the routine.",
    body: "Onboarding a client, chasing a missing document, sending the invoice, nudging the follow-up. It just happens.",
  },
  {
    title: "It keeps everyone on the same page.",
    body: "Your whole team works off one source of truth instead of five tools and a group chat.",
  },
  {
    title: "It only brings you what matters.",
    body: "The small stuff it handles on its own. The real decisions it brings to you, with the context already gathered.",
  },
];

const ThirdOption: React.FC = () => (
  <section className="py-28 md:py-36 bg-surface/50 border-t border-line">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20">
      <div className="lg:col-span-5">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5vw,3.8rem)]">
            A right hand that already knows your business.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 text-lg text-ink-2 leading-relaxed max-w-md">
            We build you an operator that lives inside your business and runs the day-to-day.
            It knows your clients, your standards, and how you like things done. It takes the
            repetitive work that eats your team&apos;s time and handles it the way you would.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-12 hidden lg:block">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
            <img
              src="/images/ledger-calm.webp"
              alt="An open ledger and fountain pen in calm morning light"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[rgba(120,150,170,0.12)] via-transparent to-[rgba(50,32,20,0.3)]"
            />
          </div>
        </Reveal>
      </div>

      {/* Ledger of capabilities: hairlines, not cards. */}
      <div className="lg:col-span-7">
        <ul className="border-t border-line">
          {capabilities.map((cap, i) => (
            <Reveal as="li" key={cap.title} delay={i * 0.06} className="border-b border-line">
              <div className="flex gap-6 py-7">
                <span className="font-display text-2xl font-extrabold text-accent-ink tabular-nums shrink-0 w-9 leading-none pt-1">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-ink-2 leading-relaxed">{cap.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-11 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-foreground">
            You stop being the thing every task waits on.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ThirdOption;
