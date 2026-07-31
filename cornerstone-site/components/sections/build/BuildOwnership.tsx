"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Key, FileText, Ban, DoorOpen, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const ownership = [
  { icon: Key, text: "It lives in your accounts. Your email, your tools, your logins." },
  { icon: FileText, text: "The system and its code belong to you. In writing." },
  { icon: Ban, text: "No platform fee to me, ever. The only thing you can pay me for is more work." },
  { icon: DoorOpen, text: "It doesn't need me to keep running." },
];

const handoverRows = [
  { label: "The accounts", value: "Yours" },
  { label: "The system & its code", value: "Yours" },
  { label: "The data", value: "Yours" },
  { label: "Ongoing platform fees", value: "None" },
];

/** The handover, itemised. What you walk away with at the end of week eight. */
const HandoverCard: React.FC = () => {
  const reduce = useReducedMotion();
  const step = (delay: number, duration = 0.5) =>
    reduce ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl border border-line bg-surface/50 overflow-hidden p-6 md:p-8 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2">
          At the end of week eight
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={step(0.35, 0.6)}
          className="w-11 h-11 rounded-full border border-primary bg-primary/12 flex items-center justify-center"
          aria-hidden="true"
        >
          <Key className="w-5 h-5 text-accent-ink" strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="divide-y divide-line">
        {handoverRows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={step(0.12 + i * 0.09)}
            className="py-3.5 flex items-center justify-between gap-4"
          >
            <span className="text-sm md:text-base text-ink-2">{row.label}</span>
            <span className="font-semibold text-xs md:text-sm uppercase tracking-wider text-accent-ink flex items-center gap-2">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 text-center">
        Handed over. Not rented out.
      </div>
    </div>
  );
};

const BuildOwnership: React.FC = () => (
  <section id="ownership" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
        <Reveal className="lg:col-span-5 order-2 lg:order-1">
          <HandoverCard />
        </Reveal>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-7">
              You own it. All of it.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg text-ink-2 leading-relaxed mb-10">
              There&apos;s no subscription here that you rent until the price goes up.
              I build the system into your business, hand it over, and if we stopped
              working together tomorrow it would run on Monday exactly the way it ran
              on Friday.
            </p>
          </Reveal>
          <ul className="space-y-4">
            {ownership.map((item, i) => (
              <Reveal as="li" key={item.text} delay={i * 0.06} y={12}>
                <span className="flex items-center gap-4 text-lg text-foreground">
                  <item.icon className="w-5 h-5 text-accent-ink shrink-0" strokeWidth={1.5} />
                  {item.text}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <Reveal>
        <div className="rounded-xl border border-line bg-surface/50 p-8 md:p-10">
          <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-bold text-foreground mb-5">
            Your client data stays in your business.
          </h3>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-4 text-lg text-ink-2 leading-relaxed">
            <p>
              Because it&apos;s built inside your own accounts, your data never moves
              into mine. It stays exactly where it lives today.
            </p>
            <p>
              I sign a confidentiality agreement before I look at anything. If your
              industry has rules about client information, I build to them.
            </p>
            <p>
              My access is yours to revoke. Any day, with one click, during the eight
              weeks as much as after them.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default BuildOwnership;
