import React from "react";
import { Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const conditions = [
  { lead: "Both audits", rest: ", week one and week eight" },
  { lead: "12 of the 16 sessions", rest: ", or catch up on the recordings" },
  { lead: "Three systems", rest: " shipped from your own shortlist" },
  { lead: "Use your support", rest: " rather than getting stuck quietly" },
];

const Guarantee: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>Taking the risk off you</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          You shouldn&apos;t have to take my word for it.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          Skill is hard to put a number on, so I&apos;ll guarantee the thing that&apos;s
          easy to measure. If the capability is real, it shows up in the audit.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-12 rounded-xl bg-rail px-8 py-10 md:px-12 md:py-12">
          <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[0.005em] text-[clamp(1.7rem,4.2vw,2.7rem)] text-primary max-w-3xl">
            Five hours a week back, per seat, or that seat runs free for the next eight
            weeks and I keep working with you until it does.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#CFCCC2] max-w-2xl">
            Every seat runs its own audit, so a team of three gets judged three times. Five
            is the floor I&apos;ll put in writing, not a description of a good result. If
            your audit opens at seventeen hours, I&apos;d expect to beat it comfortably.
          </p>
        </div>
      </Reveal>

      <div className="mt-5 grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-xl border border-line bg-surface/50 p-7 md:p-8">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
              What I need from each seat
            </p>
            <ul className="mt-5 space-y-3.5">
              {conditions.map((c) => (
                <li key={c.lead} className="flex items-start gap-3 text-ink-2 leading-relaxed">
                  <Check className="w-4 h-4 text-accent-ink shrink-0 mt-1.5" strokeWidth={2.5} />
                  <span>
                    <strong className="font-semibold text-foreground">{c.lead}</strong>
                    {c.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-xl border border-line bg-surface/50 p-7 md:p-8">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
              If it falls short
            </p>
            <p className="mt-5 text-ink-2 leading-relaxed">
              That seat runs the following eight weeks at no charge and I work with whoever
              holds it until they&apos;re past five hours. No forms, no argument. If the
              audit says four and a half, that&apos;s a miss and I&apos;ll treat it as one.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Guarantee;
