import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const TheAudit: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>Where you aim it</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)]">
          The audit.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 space-y-5 text-lg text-ink-2 leading-relaxed max-w-2xl">
          <p>
            In the first session you and I map your week. Every task that repeats, how
            often, roughly how long, and whether it&apos;s the work you&apos;re good at or
            the work that simply has to get done.
          </p>
          <p>
            Most people who try AI alone point it at whatever they read about that week, get
            a mediocre result, and decide the technology is overrated. You&apos;ll be aiming
            deliberately, from week one.
          </p>
        </div>
      </Reveal>

      {/* Before / after, with the delta as the spine between them. */}
      <Reveal delay={0.12}>
        <div className="mt-12 grid md:grid-cols-[1fr_78px_1fr] overflow-hidden rounded-xl border border-line">
          <div className="bg-surface/60 p-7 md:p-9">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Week one
            </p>
            <h3 className="mt-3 font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground">
              The before
            </h3>
            <p className="mt-3 text-ink-2 leading-relaxed">
              A map of how your operation runs, which becomes the shortlist of what you
              build. You never waste a week on the wrong thing.
            </p>
            <p className="mt-6 font-display text-[2.2rem] font-extrabold leading-none tracking-[0.005em] text-accent-dk tabular-nums">
              e.g. 17h / week
            </p>
            <p className="mt-2 text-sm text-muted">On work that isn&apos;t your craft</p>
          </div>

          <div className="bg-rail grid place-items-center py-4 md:py-0">
            <span
              className="hidden md:block font-display text-[1.5rem] font-extrabold uppercase tracking-[0.06em] text-primary"
              style={{ writingMode: "vertical-rl" }}
            >
              Delta
            </span>
            <span className="md:hidden font-display text-lg font-extrabold uppercase tracking-[0.14em] text-primary">
              Delta
            </span>
          </div>

          <div className="bg-surface/60 p-7 md:p-9 border-t md:border-t-0 border-line">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Week eight
            </p>
            <h3 className="mt-3 font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground">
              The after
            </h3>
            <p className="mt-3 text-ink-2 leading-relaxed">
              Same questions, same method. The gap between the two is what the eight weeks
              were worth.
            </p>
            <p className="mt-6 font-display text-[2.2rem] font-extrabold leading-none tracking-[0.005em] text-accent-dk tabular-nums">
              e.g. 9h / week
            </p>
            <p className="mt-2 text-sm text-muted">8 hours a week back</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mt-5 text-sm text-muted">
          Figures illustrative. Your starting number is whatever your audit says it is.
        </p>
      </Reveal>
    </div>
  </section>
);

export default TheAudit;
