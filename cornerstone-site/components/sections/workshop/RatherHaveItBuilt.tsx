import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const compare = [
  { k: "Who does the work", workshop: "You do, with me in the room", build: "I do" },
  {
    k: "What you end up with",
    workshop: "Able to run it better yourself, plus three systems",
    build: "One system, finished",
  },
  { k: "Where it runs", workshop: "Your machine, your accounts", build: "Your accounts, your whole team" },
  { k: "What it costs", workshop: "$2,000 a seat", build: "$5,500" },
];

const RatherHaveItBuilt: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>The other door</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Would you rather I just built it?
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 space-y-5 text-lg text-ink-2 leading-relaxed max-w-2xl">
          <p>
            Some owners want to learn to run the business better themselves. Some want the
            thing running and their attention back on the work they actually do. Both are
            reasonable, and the second one is The Build.
          </p>
          <p>
            Same eight weeks, except I do the work. A system built around how your business
            actually runs, hosted on your accounts, permissioned for your whole team, with
            an audit trail on everything it touches. You get a finished operating system,
            and the know-how stays with me rather than moving into your team.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-12 overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[minmax(0,1.1fr)_1fr_1fr]">
            <div className="hidden sm:block bg-surface-2/40 border-b border-line" />
            <div className="bg-surface-2/40 border-b border-line px-5 py-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                You&apos;re here
              </p>
              <p className="mt-1 font-display text-lg font-bold uppercase tracking-[0.01em] text-foreground">
                The Workshop
              </p>
            </div>
            <div className="bg-surface-2/40 border-b border-l border-line px-5 py-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent-dk">
                Done for you
              </p>
              <p className="mt-1 font-display text-lg font-bold uppercase tracking-[0.01em] text-foreground">
                The Build
              </p>
            </div>

            {compare.map((row) => (
              <React.Fragment key={row.k}>
                <p className="hidden sm:flex items-center bg-surface/40 border-b border-line px-5 py-4 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {row.k}
                </p>
                <div className="border-b border-line px-5 py-4">
                  <p className="sm:hidden text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted mb-1.5">
                    {row.k}
                  </p>
                  <p className="text-ink-2 leading-snug">{row.workshop}</p>
                </div>
                <div className="border-b border-l border-line px-5 py-4">
                  <p className="sm:hidden text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted mb-1.5">
                    &nbsp;
                  </p>
                  <p className="text-foreground leading-snug">{row.build}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
          <Link
            href="/build"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-muted/60 px-6 py-3 font-sans text-[0.9rem] font-semibold tracking-[0.01em] text-foreground transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out)] hover:border-foreground hover:bg-surface-2 hover:-translate-y-px active:scale-[0.97]"
          >
            See The Build
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
          <p className="text-ink-2 leading-relaxed max-w-md">
            Neither one is the junior version of the other. Tell me which problem
            you&apos;ve actually got on the call and I&apos;ll point you at the right one.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default RatherHaveItBuilt;
