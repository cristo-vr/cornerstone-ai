import React from "react";
import { Check, X } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const limits = [
  {
    lead: "I'm not building it for you.",
    body: "You build, I teach and unstick you. If you'd rather have it built around your business instead, that's The Build, and plenty of people are better served by it.",
  },
  {
    lead: "What you build runs on your machine and your accounts.",
    body: "You'll get scheduled work running, which is genuinely useful. You won't get one shared system your whole team logs into with different permissions and a full audit trail.",
  },
  {
    lead: "It doesn't do your delivery work.",
    body: "If your team fits kitchens or treats patients, this clears the paperwork wrapped around that work and those hours are real. It won't put another van on the road.",
  },
  {
    lead: "It isn't a course you watch.",
    body: "Skip the work between sessions and you won't hit the guarantee. I'd rather you kept the money.",
  },
];

const goodFit = [
  {
    lead: "You run the business.",
    body: "This is built for founders and owners, the people who decide what's worth building, in any industry.",
  },
  {
    body: "You're already good at what you do, and this is the one gap that hasn't closed yet.",
  },
  {
    lead: "Ten or more hours a week",
    body: "across the business going on work that isn't your craft.",
  },
  {
    body: "You want to understand this yourself rather than depend on someone who does.",
  },
];

const badFit = [
  {
    lead: "You'd send your developer or IT person in your place.",
    body: "The judgement being taught is about your business, and you're the only one who holds it.",
  },
  {
    body: "You're after developer training. This teaches you to point the technology at the right problems, not software engineering.",
  },
  {
    body: "Under ten hours of non craft work across the business. The maths doesn't favour you yet.",
  },
  { body: "You need it working inside a fortnight." },
];

type Line = { lead?: string; body: string };

function FitList({ items, tone }: { items: Line[]; tone: "good" | "bad" }) {
  const Icon = tone === "good" ? Check : X;
  return (
    <ul className="mt-5 space-y-3.5">
      {items.map((item) => (
        <li key={item.body} className="flex items-start gap-3 text-ink-2 leading-relaxed">
          <Icon
            className={`w-4 h-4 shrink-0 mt-1.5 ${
              tone === "good" ? "text-accent-ink" : "text-muted"
            }`}
            strokeWidth={2.5}
          />
          <span>
            {item.lead && (
              <strong className="font-semibold text-foreground">{item.lead} </strong>
            )}
            {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

const HonestLimits: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line bg-surface/30">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>Being straight with you</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)]">
          What this doesn&apos;t do.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
          Better you know now than in week six.
        </p>
      </Reveal>

      <ul className="mt-12 space-y-6 max-w-3xl">
        {limits.map((l, i) => (
          <Reveal as="li" key={l.lead} delay={i * 0.04} y={12}>
            <div className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.72em] h-0.5 w-3 bg-muted"
              />
              <p className="text-lg text-ink-2 leading-relaxed">
                <strong className="font-semibold text-foreground">{l.lead} </strong>
                {l.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-xl border border-rail bg-background p-7 md:p-8">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent-dk">
              A good fit
            </p>
            <FitList items={goodFit} tone="good" />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="h-full rounded-xl border border-line bg-background p-7 md:p-8">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Not a good fit
            </p>
            <FitList items={badFit} tone="bad" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default HonestLimits;
