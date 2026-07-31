import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

type Item = { lead?: string; body: string };

const columns: { label: string; items: Item[] }[] = [
  {
    label: "Every week",
    items: [
      {
        lead: "A teaching session.",
        body: "I share my screen and walk that week's build start to finish. Recorded.",
      },
      {
        body: "A working session where everyone builds and asks whatever they're stuck on. Not recorded, so people talk freely about their actual business.",
      },
    ],
  },
  {
    label: "Between sessions",
    items: [
      { lead: "Two private sessions,", body: "just you." },
      {
        body: "Six written support requests. Send a recording or a description, get a fix back.",
      },
      {
        body: "The shared library: everything I build, plus whatever other members publish.",
      },
    ],
  },
  {
    label: "The room",
    items: [
      {
        lead: "Eight businesses maximum,",
        body: "and never two direct competitors.",
      },
      {
        body: "Founders and owners in the room, not the people they'd delegate this to.",
      },
      {
        body: "Extra seats at $750. Skill spreads faster than systems, and every seat runs its own audit.",
      },
    ],
  },
];

const HowItRuns: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>How it runs</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Two sessions a week, and me on hand between them.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          This is training that happens in a group setting. Everyone builds on their own
          business, in the same room, at the same time. It isn&apos;t a course you watch on
          your own and it isn&apos;t a community to hang around in.
        </p>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {columns.map((col, i) => (
          <Reveal key={col.label} delay={i * 0.06} y={12}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7 md:p-8">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {col.label}
              </p>
              <ul className="mt-5 space-y-3.5">
                {col.items.map((item) => (
                  <li key={item.body} className="relative pl-6 text-ink-2 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.62em] h-2 w-2 bg-primary"
                    />
                    {item.lead && (
                      <strong className="font-semibold text-foreground">{item.lead} </strong>
                    )}
                    {item.body}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-8 border-l-[3px] border-primary bg-surface/60 px-6 py-5 max-w-3xl">
          <p className="text-ink-2 leading-relaxed">
            Weeks 5 and 6 involve your live data. None of it needs to go on a group call.
            Anything private goes through your private sessions or written requests, and
            when a problem is worth teaching I rebuild it on my own machine so the group
            learns without ever seeing your books.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default HowItRuns;
