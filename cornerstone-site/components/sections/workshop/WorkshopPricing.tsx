import React from "react";
import { Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const included = [
  "Sixteen sessions, two a week for eight weeks",
  "Two private sessions, just you and me",
  "Six written support requests, answered with a fix",
  "Both audits, week one and week eight",
  "The shared library, and everything you build is yours",
];

const WorkshopPricing: React.FC = () => (
  <section id="price" className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>What it costs</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Two thousand a seat, for the eight weeks.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          Agreed in writing before week one. Eight businesses in the room, never two direct
          competitors, and nothing renews on its own when it&apos;s over.
        </p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-12 gap-5">
        <Reveal className="lg:col-span-7">
          <div className="h-full rounded-xl border border-primary bg-primary/[0.09] p-8 md:p-9 flex flex-col">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
              Your seat
            </span>
            <p className="mt-6 font-display text-[clamp(2.8rem,6vw,4rem)] font-extrabold uppercase leading-none tracking-[0.005em] text-accent-ink tabular-nums">
              $2,000
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink-2">
              USD, all eight weeks
            </p>
            <ul className="mt-8 space-y-3.5 grow">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink-2 leading-relaxed">
                  <Check className="w-4 h-4 text-accent-ink shrink-0 mt-1.5" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="lg:col-span-5 grid gap-5">
          <Reveal delay={0.06}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7 md:p-8">
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                Every extra seat
              </span>
              <p className="mt-5 font-display text-[2.4rem] font-extrabold uppercase leading-none tracking-[0.005em] text-foreground tabular-nums">
                $750
              </p>
              <p className="mt-4 text-ink-2 leading-relaxed">
                Bring whoever runs the work with you. Skill spreads faster than systems, and
                every seat runs its own audit against its own guarantee.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-xl border border-line bg-surface/50 p-7 md:p-8">
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                After the eight weeks
              </span>
              <p className="mt-5 font-display text-[2.4rem] font-extrabold uppercase leading-none tracking-[0.005em] text-foreground tabular-nums">
                $1,500
              </p>
              <p className="mt-4 text-ink-2 leading-relaxed">
                Another block, if you want one. When the eight weeks are up you&apos;re done
                unless you&apos;d rather not be, and you keep everything you built either
                way.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.08}>
        <p className="mt-8 text-ink-2 leading-relaxed max-w-3xl">
          If you finish and decide you want the whole operation built properly
          around their team. That&apos;s separate work, I&apos;ll tell you honestly whether
          you need it, and nobody gets pushed towards it.
        </p>
      </Reveal>
    </div>
  </section>
);

export default WorkshopPricing;
