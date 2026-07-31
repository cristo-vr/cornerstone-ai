"use client";

import React from "react";
import { Layers, ShieldCheck } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/* The concrete list. Every entry is a trigger and the work that follows it,
   because "a system built around how you work" tells a buyer nothing. */
const systems = [
  {
    n: "01",
    name: "The enquiry desk",
    when: "A new enquiry lands",
    body: "It reads the enquiry, pulls up the history if that name has been in before, and drafts the quote against your price list and your terms. It flags the two things the enquiry didn't tell it. The draft is sitting in your inbox with a one line summary. You check the number and hit send.",
  },
  {
    n: "02",
    name: "The invoice chase",
    when: "An invoice goes past due",
    body: "Every unpaid invoice in your accounting system gets watched. A light nudge at seven days, a firmer one at fourteen, and it comes to you at thirty. Written in your voice, stopped the moment the payment clears, and it never chases the client you told it to leave alone.",
  },
  {
    n: "03",
    name: "The Monday report",
    when: "06:00, every Monday",
    body: "Built from live numbers instead of somebody's memory of the week. Won, lost, shipped, late, invoiced, owed. Who is over capacity, and the three things that need you to decide something. One page, in your inbox before you open the laptop.",
  },
  {
    n: "04",
    name: "Meeting to actions",
    when: "A call ends",
    body: "The notes get filed against the right client. The decisions land on the project. Everything anyone promised becomes a task with an owner and a date. The follow up email is drafted before you're out of the car park.",
  },
  {
    n: "05",
    name: "New client onboarding",
    when: "A client signs",
    body: "Project opened, folders created, welcome pack out, kickoff booked against real availability, deposit invoice drafted. You get one message: Anika is live, kickoff Thursday 09:00, invoice ready for your sign off.",
  },
  {
    n: "06",
    name: "The answer desk",
    when: "Someone on your team has a question",
    body: "They ask the system instead of asking you. It answers out of your actual documents: your pricing, your process, what you decided in March, what you promised this client in the contract. When it doesn't know, it says it doesn't know.",
  },
];

const WhatGetsBuilt: React.FC = () => (
  <section id="what-gets-built" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Sticky brief on the left, the goods on the right. */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <Reveal>
            <Eyebrow>What gets built</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.6rem)]">
              Real systems, doing real jobs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-ink-2 leading-relaxed">
              Six examples of the kind of thing that comes out of the eight weeks.
              Each one runs on a Tuesday without anybody thinking about it, which is
              the only test that matters.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8 min-w-0">
          <div className="rounded-xl border border-line bg-background overflow-hidden">
            {systems.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 0.04}
                y={12}
                className={i > 0 ? "border-t border-line" : ""}
              >
                <article className="p-7 md:p-9 transition-colors duration-300 hover:bg-surface/60">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span
                      className="font-display text-lg font-extrabold tracking-[0.06em] text-accent-ink tabular-nums"
                      aria-hidden="true"
                    >
                      {s.n}
                    </span>
                    <h3 className="font-display text-2xl md:text-[1.75rem] font-bold uppercase tracking-[0.005em] text-foreground leading-none">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-2 mb-4">
                    {s.when}
                  </p>
                  <p className="text-ink-2 text-lg leading-relaxed">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* The two things that stop the list above reading as a menu. */}
      <div className="mt-5 grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-xl border border-line bg-surface/50 p-8">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink mb-6">
              <Layers className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
              Your list won&apos;t be this list.
            </h3>
            <p className="text-ink-2 leading-relaxed">
              Week one is where I trace how a job actually moves through your
              business, from first contact to paid, and we pick what gets built and
              in what order. Usually four to six systems, plus the layer they all
              stand on: your clients, projects and money in one place, wired into the
              tools your team already opens every morning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-xl border border-primary/30 bg-primary/[0.07] p-8">
            <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/15 text-accent-ink mb-6">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
              One rule sits under all of it.
            </h3>
            <p className="text-ink-2 leading-relaxed">
              The routine runs on its own. Anything that leaves your business, money
              or a message to a client, waits for a human yes. You choose where that
              line sits, system by system, and you can move it the day you decide to
              trust something more.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default WhatGetsBuilt;
