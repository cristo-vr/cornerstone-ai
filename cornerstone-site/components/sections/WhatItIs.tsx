"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ListChecks, ShieldCheck, Database, Inbox } from "lucide-react";
import Reveal from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const traceSteps = [
  "Project opened, team assigned",
  "Welcome pack sent",
  "Kickoff call booked",
  "Deposit invoice drafted in Xero",
];

/** One trigger, four things handled, one message back. The whole idea, traced.
    The stagger is the point here: it reads as a sequence the system runs, not
    as decoration. Kept under a second end to end so nobody scrolls past the
    payoff line. */
const TraceCard: React.FC = () => {
  const reduce = useReducedMotion();
  const step = (delay: number) =>
    reduce ? { duration: 0 } : { duration: 0.45, delay, ease: EASE };
  return (
  <div className="relative w-full rounded-xl border border-line bg-surface/50 p-6 md:p-8">
    <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-6">
      A real example, start to finish
    </div>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={step(0)}
      className="inline-block px-4 py-2 rounded-lg border border-primary bg-primary/12 text-accent-ink text-sm font-semibold mb-5"
    >
      New client signs: Anika
    </motion.div>

    <div className="relative pl-5 border-l border-line space-y-3 mb-6">
      {traceSteps.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={step(0.18 + i * 0.11)}
          className="flex items-center gap-3 text-sm md:text-base text-ink-2"
        >
          <Check className="w-4 h-4 text-accent-ink shrink-0" strokeWidth={2.5} />
          {label}
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={step(0.68)}
      className="rounded-xl border border-line bg-background p-4"
    >
      <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-2">
        The one message you get
      </div>
      <p className="text-foreground text-sm md:text-base">
        &ldquo;Anika is live. Kickoff Thursday 09:00. Invoice ready for your sign-off.&rdquo;
      </p>
    </motion.div>

    <p className="mt-5 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2 leading-relaxed">
      Yours might be a VAT deadline, a placement, or a patient booking. Week one is where
      we map it.
    </p>
  </div>
  );
};

const dayToDay = [
  {
    icon: ListChecks,
    title: "It runs the routine.",
    body: "Onboarding, follow-ups, invoices, reminders. It just happens, the way you would do it.",
  },
  {
    icon: ShieldCheck,
    title: "It holds your standard.",
    body: "Work gets done to the bar you set, whether or not you're watching.",
  },
  {
    icon: Database,
    title: "It keeps everyone on the same page.",
    body: "Your whole team sees the same, up-to-date picture, instead of five tools and a group chat.",
  },
  {
    icon: Inbox,
    title: "It brings you decisions, not tasks.",
    body: "The small stuff gets handled. The real calls come to you with the context already gathered.",
  },
];

const WhatItIs: React.FC = () => (
  <section id="what-it-is" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-7">
              What it actually is.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
              <p>
                It&apos;s AI doing your business&apos;s routine work. Your team
                doesn&apos;t bend around it the way they bend around off-the-shelf
                software, and nobody sits there working through your admin by hand.
              </p>
              <p>
                One rule is built in from day one: the routine runs on its own, but
                anything that leaves your business, money or a message to a client, waits
                for a human yes. You choose where that line sits.
              </p>
              <p>
                We build it custom, around how your business already works. It reads and
                writes in your email, your client list, your invoicing, your project
                board. Your team keeps working where they work, and sees one shared,
                up-to-date picture instead of five half-updated tools.
              </p>
              <p className="text-foreground font-medium">
                The result: the chasing, the retyping, the &ldquo;did anyone send
                that?&rdquo; stops landing on your desk.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6">
          <TraceCard />
        </Reveal>
      </div>

      {/* What that looks like as a working day */}
      <div className="mt-24 md:mt-28">
        <Reveal>
          <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.9rem,4vw,3rem)] mb-12">
            What it actually does all day.
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {dayToDay.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full bg-background p-8 md:p-9 transition-colors duration-300 hover:bg-surface/70">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink mb-6">
                  <item.icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <h4 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-2.5">
                  {item.title}
                </h4>
                <p className="text-ink-2 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhatItIs;
