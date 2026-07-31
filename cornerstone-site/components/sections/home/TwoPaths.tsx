"use client";

import React from "react";
import Reveal from "../../ui/Reveal";
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

const paths: Path[] = [
  {
    id: "build",
    kicker: "Done for you",
    title: "I build it for you",
    name: "The Build",
    price: "$5,500",
    priceNote: "or $4,950 paid in full",
    who: "Owners who want the thing running and have no interest in becoming the person who builds it.",
    what: [
      "Eight weeks. Week one I map how the business actually runs.",
      "Then I build, live, in your own accounts. You watch it go in piece by piece instead of waiting for a reveal.",
      "The whole team gets it, each person seeing only what they should, with an audit trail of every action.",
      "You own all of it outright. No licence, no platform fee, nothing that switches off if we part ways.",
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
    kicker: "Done with you",
    title: "I teach you to build it",
    name: "The Workshop",
    price: "$2,000",
    priceNote: "per seat for 8 weeks, team seats $750",
    who: "Owners who want the skill inside the business, and will sit down and build it themselves.",
    what: [
      "Eight weeks of hands on training. You build on your own real work, not on a toy example.",
      "Two sessions a week, plus two private sessions and six written support requests.",
      "It runs in a group setting with other businesses, so you see problems solved that you haven’t hit yet.",
      "You leave able to build the next one without me, and able to tell a real capability from a good demo.",
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
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-6">
            Two ways to work with me.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed">
            It&rsquo;s the same system either way. The Build costs $5,500 and I do the
            work. The Workshop costs $2,000 a seat and you do it, with me teaching.
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
          It isn&rsquo;t a course, a community or a coaching programme. It&rsquo;s
          training that happens to run in a group, where you build your own system on your
          own work while I&rsquo;m in the room to correct it.
        </p>
      </Reveal>
    </div>
  </section>
);

export default TwoPaths;
