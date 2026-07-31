import React from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const paras = [
  "Most owners I talk to have already tried. A subscription somebody recommended, a tool that looked good in the demo, maybe an agency that took thirty thousand and delivered a chatbot. Six months later the business runs the way it always did, and AI is filed somewhere between hype and a money pit.",
  "You've taught yourself harder things than this. What's been missing is somebody showing you the mechanics, on your own business, until you can do it without them.",
];

const WhyThisExists: React.FC = () => (
  <section className="py-20 md:py-28 border-t border-line">
    <div className="max-w-5xl mx-auto px-6">
      <Reveal>
        <Eyebrow>Why this exists</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
          Everyone tells you AI matters. Almost nobody shows you the mechanics.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 space-y-5 text-lg text-ink-2 leading-relaxed max-w-2xl">
          {paras.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Reveal>

      {/* Carbon rail: the argument, said once, with weight behind it. */}
      <Reveal delay={0.12}>
        <div className="mt-14 rounded-xl bg-rail px-8 py-10 md:px-12 md:py-12">
          <p className="font-display font-extrabold uppercase leading-[1.02] tracking-[0.005em] text-[clamp(1.7rem,4.2vw,2.7rem)] text-primary max-w-3xl">
            There&apos;s a real difference between a company that uses AI and one that
            bought some.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#CFCCC2] max-w-2xl">
            The businesses on the right side of that line aren&apos;t running better
            software. Someone inside them understood how this actually works and pointed it
            at the parts of the operation holding everyone back. That&apos;s a skill, and
            it&apos;s learnable in eight weeks.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WhyThisExists;
