"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import ContactModal from "@/components/ui/ContactModal";
import Footer from "@/components/sections/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Rewards are paid in build weeks to clients and cash to everyone else. The
   reasoning behind that trade is in the money model doc and stays there: this
   page tells a client what they get, not how the decision was reached. */

const sides = [
  {
    who: "You get",
    what: "Two weeks of building on your system",
    body: "New work, shipped the same way it was during your eight weeks. If you're on a cycle it gets added to it. If you're not, it runs on its own.",
  },
  {
    who: "They get",
    what: "Ten weeks of building instead of eight",
    body: "Same price, same everything else.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell them, or tell me",
    body: "Send them my way, or send me their name and I'll reach out.",
  },
  {
    n: "02",
    title: "They book a call",
    body: "The same call anyone else gets.",
  },
  {
    n: "03",
    title: "They start",
    body: "Your two weeks are confirmed when their build starts.",
  },
  {
    n: "04",
    title: "We schedule yours",
    body: "You tell me what you want built and it goes into the queue.",
  },
];

const terms = [
  "Their price doesn't change. The reward is time rather than money off, so it sits on top of whatever payment terms they take.",
  "I start three new businesses a month and a referral doesn't jump that queue, but I'll tell you straight away when the next start is.",
  "Up to four a year each. Past that, come and talk to me.",
  "If they cancel before the build starts and get refunded, the reward goes with it.",
];

/* The whole ask, in a form nobody has to think about. Most referrals die at
   "I should introduce them at some point", so the page ends by handing over
   the actual sentence. */
const INTRO =
  "Hey [Name], this is Cristo. He built a custom operating system for my team and it has taken a serious amount of admin off us. Thought you two should talk.";

const ReferralsShell: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const openContact = () => setContactOpen(true);
  const reduce = useReducedMotion();

  const copyIntro = async () => {
    try {
      await navigator.clipboard.writeText(INTRO);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked, the text is on screen to select by hand */
    }
  };

  const rise = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.7, delay, ease: EASE },
  });

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-accent-txt">
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="pt-[124px] md:pt-[152px] pb-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.span
              {...rise(0, 12)}
              className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-8"
            >
              <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
              For clients
            </motion.span>

            <h1 className="font-display font-extrabold uppercase text-foreground leading-[0.88] tracking-[0.005em] text-[clamp(2.5rem,7vw,5.2rem)] max-w-4xl">
              <motion.span {...rise(0.08)} className="block">
                Send someone my way
              </motion.span>
              <motion.span {...rise(0.16)} className="block">
                and you both get{" "}
                <span className="text-accent-ink">two extra weeks.</span>
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.3)}
              className="mt-9 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed"
            >
              If someone you introduce becomes a client, I add two weeks of building to
              their engagement and two weeks to yours.
            </motion.p>

            <motion.p
              {...rise(0.38)}
              className="mt-5 max-w-2xl text-lg md:text-xl text-foreground leading-relaxed font-medium"
            >
              I don&rsquo;t run ads. Almost every client I have came from someone telling
              someone else, so that&rsquo;s where the budget goes.
            </motion.p>
          </div>
        </section>

        {/* -------------------------------------------------------- the two */}
        <section className="py-20 md:py-24 border-t border-line bg-surface/40">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Eyebrow className="mb-8">What each side gets</Eyebrow>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-5">
              {sides.map((s, i) => (
                <Reveal key={s.who} delay={i * 0.08}>
                  <div
                    className={`h-full rounded-xl border p-8 md:p-9 ${
                      i === 0
                        ? "border-primary/50 bg-background shadow-[var(--shadow-soft)]"
                        : "border-line bg-background"
                    }`}
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                      {s.who}
                    </span>
                    <h2 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.1rem)] font-bold uppercase leading-[1.02] tracking-[0.005em] text-foreground">
                      {s.what}
                    </h2>
                    <p className="mt-5 text-ink-2 leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- how it runs */}
        <section className="py-20 md:py-24 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold uppercase text-foreground leading-[0.94] tracking-[0.005em] text-[clamp(2rem,4.6vw,3.2rem)] mb-12">
                How it works.
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={Math.min(i, 3) * 0.06}>
                  <div className="h-full bg-background p-7 md:p-8">
                    <span className="font-display text-2xl font-extrabold text-accent-ink tabular-nums">
                      {s.n}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold uppercase leading-[1.1] tracking-[0.005em] text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-ink-2 leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- terms */}
        <section className="py-20 md:py-24 border-t border-line bg-surface/40">
          <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display font-bold uppercase text-foreground leading-[0.94] tracking-[0.005em] text-[clamp(2rem,4.6vw,3.2rem)]">
                  The fine print.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-5">
                {terms.map((t, i) => (
                  <Reveal as="li" key={t} delay={Math.min(i, 3) * 0.05} y={12}>
                    <span className="flex gap-4 text-lg text-ink-2 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-3 h-px w-4 shrink-0 bg-primary"
                      />
                      <span>{t}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- not a client */}
        <section className="py-16 md:py-20 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <div className="rounded-xl border border-line bg-surface/50 p-8 md:p-10 max-w-3xl">
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-4">
                  If you don&rsquo;t have a system of mine
                </h3>
                <p className="text-lg text-ink-2 leading-relaxed">
                  Build weeks are no use to you, so it works differently. Accountants,
                  consultants and anyone else who sends people my way get $750 for every
                  one who becomes a client, paid once their fee is collected.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------- close */}
        <section className="py-20 md:py-24 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold uppercase text-foreground leading-[0.94] tracking-[0.005em] text-[clamp(2rem,4.6vw,3.2rem)] max-w-3xl">
                Got someone in mind?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-2xl">
                Add us both to a group chat and send something like this. That&rsquo;s
                the whole thing.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 max-w-2xl">
                <div className="rounded-xl rounded-bl-sm border border-line bg-surface/60 p-6 md:p-7">
                  <p className="text-lg text-foreground leading-relaxed">{INTRO}</p>
                </div>

                <button
                  type="button"
                  onClick={copyIntro}
                  className="group mt-4 inline-flex items-center gap-2.5 rounded-lg border border-muted/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-out)] hover:border-foreground hover:bg-surface-2 active:scale-[0.97]"
                >
                  {copied && (
                    <Check className="w-4 h-4 text-accent-ink" strokeWidth={2.5} />
                  )}
                  {copied ? "Copied" : "Copy the message"}
                </button>

                <p className="mt-6 text-ink-2 leading-relaxed">
                  Or send me their name and what they do, and I&rsquo;ll take it from
                  there.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default ReferralsShell;
