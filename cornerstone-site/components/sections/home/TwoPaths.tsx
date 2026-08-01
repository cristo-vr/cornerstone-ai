"use client";

import React from "react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";
import CtaLink from "./CtaLink";

type Path = {
  id: string;
  kicker: string;
  title: string;
  name: string;
  price: string;
  priceNote: string;
  who: string;
  what: string[];
  after: string;
  limit: string;
  href: string;
  cta: string;
  feature?: boolean;
};

/* These are two different purchases, not two prices for one thing. The Build
   delivers a system; the Workshop delivers a capability. Framing them as
   "who does the building" makes the cheaper one read as the same product with
   the labour removed, which undersells the training and promises a custom
   operating system the Workshop does not deliver. The deeper pages already
   draw the line as the skill vs the system, so this matches that vocabulary. */
const paths: Path[] = [
  {
    id: "build",
    kicker: "Done for you",
    title: "I build your operating system",
    name: "The Build",
    price: "$5,500",
    priceNote: "or $4,950 paid in full",
    who: "Owners who want the system running, and have no interest in becoming the person who builds it.",
    what: [
      "I do the building. Your side is the week one workshop, then about an hour a week with your team.",
      "It runs in your own accounts, permissioned per person, with an audit trail on everything it touches.",
      "Fixed scope agreed before I start, so the price doesn’t move once we’re underway.",
      "Documentation and training at handover, so your team can change it later without calling me.",
    ],
    after:
      "After it ships: Upkeep at $500 per 4 week cycle (fixes only), or Extensions at $2,000 per cycle (fixes plus continued development). Both optional.",
    limit: "Three clients a quarter. That’s the whole capacity.",
    href: "/build",
    cta: "See the build",
    feature: true,
  },
  {
    id: "workshop",
    kicker: "Tactical training",
    title: "I train you to build with AI",
    name: "The Workshop",
    price: "$2,000",
    priceNote: "per seat for 8 weeks, team seats $750",
    who: "Owners and their teams who want the capability in the building, and will sit down and do the work to get it.",
    what: [
      "Eight weeks of hands on training, two sessions a week, worked on your own real operation rather than a toy example.",
      "Two private sessions and six written support requests, so nobody stays stuck on their own problem.",
      "You leave able to tell a real capability from a good demo, and to build the next thing without me.",
      "What you build in the room runs on your machine, under your login. Team wide access and permissions are what the Build adds.",
    ],
    after: "After the eight weeks: $1,500 per block if you want to keep going.",
    limit: "Maximum eight businesses per intake.",
    href: "/workshop",
    cta: "See the workshop",
  },
];

const Card: React.FC<{ path: Path }> = ({ path }) => (
  <div
    className={`h-full flex flex-col rounded-xl border p-8 md:p-10 ${
      path.feature
        ? "border-primary/50 bg-background shadow-[var(--shadow-soft)]"
        : "border-line bg-surface/50"
    }`}
  >
    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
      {path.kicker}
    </span>

    <h3 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold uppercase leading-[0.95] tracking-[0.005em] text-foreground">
      {path.title}
    </h3>

    <div className="mt-6 pb-6 border-b border-line flex items-end justify-between gap-4 flex-wrap">
      <span className="font-display text-[2.75rem] leading-none font-bold text-accent-ink">
        {path.price}
      </span>
      <span className="text-sm text-ink-2 text-right">{path.priceNote}</span>
    </div>

    <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
      Who it&rsquo;s for
    </p>
    <p className="mt-3 text-lg text-foreground leading-relaxed">{path.who}</p>

    <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
      What happens
    </p>
    <ul className="mt-3 space-y-3 text-ink-2 leading-relaxed">
      {path.what.map((line) => (
        <li key={line} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
          <span>{line}</span>
        </li>
      ))}
    </ul>

    <div className="mt-8 pt-6 border-t border-line space-y-3">
      <p className="text-ink-2 leading-relaxed">{path.after}</p>
      <p className="text-sm font-semibold text-foreground">{path.limit}</p>
    </div>

    <div className="mt-auto pt-8">
      <CtaLink href={path.href} variant={path.feature ? "primary" : "outline"}>
        {path.cta}
      </CtaLink>
    </div>
  </div>
);

const TwoPaths: React.FC = () => (
  <section id="two-paths" className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <Reveal>
          <Eyebrow className="mb-8">Working together</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-6">
            One hands you a system. The other hands you the skill.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-ink-2 leading-relaxed">
            These do different jobs. The Build puts a custom operating system into your
            business for your team to run on. The Workshop trains you and your people to
            build with AI, and the systems you produce along the way are the proof it
            worked.
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {paths.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-full">
            <Card path={p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.06}>
        <p className="mt-10 max-w-3xl text-ink-2 leading-relaxed">
          <strong className="font-semibold text-foreground">
            One thing about the Workshop.
          </strong>{" "}
          It&rsquo;s tactical training that happens to run in a group. You work on your
          own operation while I&rsquo;m in the room correcting it, which means there is no
          curriculum to sit through, no community to join, and nobody coaching you.
        </p>
      </Reveal>
    </div>
  </section>
);

export default TwoPaths;
