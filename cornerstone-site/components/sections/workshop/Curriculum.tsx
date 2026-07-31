import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

type Week = {
  n: number;
  title: string;
  learn: string;
  why: string;
  have: string;
};

const phaseOne: Week[] = [
  {
    n: 1,
    title: "Set up, and find where the time goes",
    learn:
      "Getting everything installed, and how to work without risk of breaking anything. It shows you what it plans to do before it does it, and you can undo back to any point.",
    why: "Most people never really start because they're nervous about what it might do. Undo something once and that goes away.",
    have: "A working setup, one small win, and your audit",
  },
  {
    n: 2,
    title: "Teach it your business",
    learn:
      "Writing down how your business works so the AI can use it. Services, pricing, clients, process, how you speak to people, what good looks like to you.",
    why: "Generic AI gives generic answers because it knows nothing about you. This is why your version beats what a competitor gets out of the identical tool.",
    have: "Your business documented, in a form AI can work from",
  },
  {
    n: 3,
    title: "Why structure beats clever wording",
    learn:
      "Organising week two into layers, so the AI picks up only what the current job needs instead of wading through everything. Files and folders, arranged on purpose.",
    why: "Hand a new hire a fifty page manual and they'll spend the day reading. Give them a contents page and tell them which chapter to open, and they're useful by lunchtime. Same idea, and it's what makes everything after this week work.",
    have: "A setup that stays fast as it grows",
  },
  {
    n: 4,
    title: "Build your first system",
    learn:
      "Turning a job you repeat into something you run in one line. You start by watching where it gets things wrong unaided, then write only what fixes that.",
    why: "Where it stops being a chat window and starts being a system. Pick the task from your audit that annoys you most.",
    have: "System one, live",
  },
];

const phaseTwo: Week[] = [
  {
    n: 5,
    title: "Plug in your real data",
    learn:
      "Connecting the tools you already use so it works from your actual numbers, jobs and clients. How to do that safely, and what to keep well away from it.",
    why: "Until now it worked from what you told it. Now it works from what's true today. That's the difference between a smart assistant and something you'd trust with a client quote.",
    have: "Live data connected, safely",
  },
  {
    n: 6,
    title: "Make it permanent",
    learn:
      "Keeping a proper history so nothing gets lost and any change rolls back. Putting rules in place that always apply, whether or not the AI decides to follow them.",
    why: "Systems that only live on your laptop disappear when the laptop does. This is the week yours becomes something the business owns.",
    have: "System two, live and backed up",
  },
  {
    n: 7,
    title: "Get it running without you",
    learn:
      "Putting work on a schedule so it happens on its own. The Monday report that writes itself, the follow ups nobody has to remember. I'll also be straight about where the do it yourself version stops.",
    why: "Everything so far helps while you're working. This part keeps working when you're not.",
    have: "System three, plus something on a schedule",
  },
  {
    n: 8,
    title: "Prove it worked",
    learn:
      "Checking your systems still do their job as things change, and keeping running costs sensible. Then you run the audit again.",
    why: "A number instead of a feeling. My guess is the biggest saving comes from something you'd have called minor in week one.",
    have: "Your measured result",
  },
];

const allWeeks = [...phaseOne, ...phaseTwo];

function PhaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted">
        <span>{children}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
    </Reveal>
  );
}

function WeekCard({ week, delay }: { week: Week; delay: number }) {
  return (
    <Reveal delay={delay} y={12}>
      <article
        id={`week-${week.n}`}
        className="scroll-mt-32 grid md:grid-cols-[112px_1fr] overflow-hidden rounded-xl border border-line bg-surface/50"
      >
        <div className="flex md:flex-col items-baseline md:items-center md:justify-center gap-3 md:gap-1.5 border-b md:border-b-0 md:border-r border-line bg-surface-2/50 px-6 py-4 md:px-4 md:py-8">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Week
          </span>
          <span className="font-display text-3xl md:text-[2.9rem] font-extrabold leading-none tracking-[0.005em] text-accent-dk tabular-nums">
            {week.n}
          </span>
        </div>

        <div className="p-6 md:p-9">
          <h3 className="font-display text-2xl md:text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[0.005em] text-foreground max-w-2xl">
            {week.title}
          </h3>

          <div className="mt-7 grid md:grid-cols-2 gap-7 md:gap-10">
            <div>
              <h4 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted mb-2.5">
                What you learn
              </h4>
              <p className="text-ink-2 leading-relaxed">{week.learn}</p>
            </div>
            <div>
              <h4 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted mb-2.5">
                Why it matters to you
              </h4>
              <p className="text-ink-2 leading-relaxed">{week.why}</p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-line flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent-dk whitespace-nowrap">
              You&apos;ll have
            </span>
            <span className="font-semibold text-foreground">{week.have}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const Curriculum: React.FC = () => (
  <section id="the-eight-weeks" className="py-20 md:py-28 border-t border-line bg-surface/30">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>The eight weeks</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Eight weeks, one thing built at a time.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          You learn something and use it on your own business the same week. No theory
          you&apos;ll get to later.
        </p>
      </Reveal>

      {/* The whole eight weeks in one glance, before the detail. */}
      <Reveal delay={0.12}>
        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {allWeeks.map((w) => (
            <li key={w.n} className="bg-background">
              <a
                href={`#week-${w.n}`}
                className="group flex h-full flex-col gap-2 p-5 transition-colors duration-200 hover:bg-surface/70"
              >
                <span className="font-display text-lg font-extrabold leading-none tracking-[0.005em] text-accent-dk tabular-nums">
                  {String(w.n).padStart(2, "0")}
                </span>
                <span className="text-[0.95rem] font-medium leading-snug text-ink-2 group-hover:text-foreground transition-colors duration-200">
                  {w.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-16">
        <PhaseLabel>Weeks 1 to 4 &middot; Getting your own work in order</PhaseLabel>
        <div className="mt-6 space-y-4">
          {phaseOne.map((week, i) => (
            <WeekCard key={week.n} week={week} delay={i * 0.04} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <PhaseLabel>Weeks 5 to 8 &middot; Connecting it to your real business</PhaseLabel>
        <div className="mt-6 space-y-4">
          {phaseTwo.map((week, i) => (
            <WeekCard key={week.n} week={week} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Curriculum;
