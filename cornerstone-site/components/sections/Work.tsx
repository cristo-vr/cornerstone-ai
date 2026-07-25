"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Waypoints,
  Bot,
  Factory,
  Rocket,
  UserCheck,
  X,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface CaseStudy {
  id: string;
  title: string;
  icon: React.ElementType;
  pain: string;
  fix: string;
  win: string;
}

const cases: CaseStudy[] = [
  {
    id: "1",
    title: "The Automated Analyst",
    icon: BrainCircuit,
    pain: "This team was drowning in raw data. Their highest-paid experts were spending hours digging through messy, confusing spreadsheets just to get a basic pulse on performance. It was impossible for leadership to make decisions because the data was always a \"work in progress.\"",
    fix: "We built a custom engine that pulls all that data automatically. No humans involved. It does the math and turns that raw mess into a clean, consolidated report.",
    win: "We gave executives clarity. Instead of staring at rows of numbers, they get a clear report on demand that lets them make strategic decisions instantly. The \"grunt work\" is gone.",
  },
  {
    id: "2",
    title: "The Zero-Loss Router",
    icon: Waypoints,
    pain: "They were losing money because leads were getting stuck in a manual bottleneck. Every time a lead came in, someone literally had to copy the data, type up a new email, and hit send to the right branch. It was slow, boring, and prone to typos.",
    fix: "We built a logic system that sits between the ad and the inbox. The second a lead comes in, our system looks at where they are and instantly routes them to the correct branch's pipeline.",
    win: "Zero leakage. We removed the \"traffic cop\" role entirely. Now, the sales team gets the lead while the prospect is still looking at the screen. Speed to lead went from \"hours\" to \"seconds.\"",
  },
  {
    id: "3",
    title: "The 24/7 Qualifier",
    icon: Bot,
    pain: "Their sales team was burning out. They were getting hundreds of leads, but 80% of them weren't qualified. The closers were wasting their entire day asking basic questions like \"Do you have the budget?\" instead of closing deals.",
    fix: "We deployed a WhatsApp bot trained on their specific sales scripts. It chats with every new lead, answers their questions, and collects their financial info before a human ever speaks to them.",
    win: "We filtered out the noise. Now, the sales team only picks up the phone when a lead is qualified and ready to buy. Same team size, double the closing rate.",
  },
  {
    id: "4",
    title: "The Content Machine",
    icon: Factory,
    pain: "Their marketing team was stuck on a hamster wheel. They knew they needed SEO blogs and social posts to grow, but creating it all manually was eating up their entire week. They had no time to actually be creative.",
    fix: "We built a workflow that does the heavy lifting. It drafts the blog posts for them to review, then automatically turns those blogs into Instagram captions and visuals, and queues them for posting.",
    win: "A perfect blend of human and machine. The team provides the strategy and the final \"thumbs up,\" and our system handles the production. They 5x'd their output without hiring a single extra writer.",
  },
  {
    id: "5",
    title: "The 3-Day SaaS Build",
    icon: Rocket,
    pain: "The client had a massive idea to disrupt the security industry, but they were staring down the barrel of a 6-month development cycle. They needed to prove the concept was viable before sinking a fortune into it.",
    fix: "We didn't just consult; we built. In a 3-day live workshop, we coded the MVP from scratch. That MVP proved the value instantly, justifying the full push to production.",
    win: "A double capacity unlock. We saved the client months of development time, and the platform we built uses AI to unlock capacity for their users. Speed to market was instant, and the tech is exponential.",
  },
  {
    id: "6",
    title: "Recruitment on Autopilot",
    icon: UserCheck,
    pain: "One of their best recruiters was barely recruiting. She was spending 80% of her day acting like an admin assistant, scheduling interviews, chasing candidates for documents, and updating the CRM.",
    fix: "We automated the entire boring part of her funnel. From the moment a candidate applies, our system handles the vetting, the emails, and the calendar booking.",
    win: "We automated 80% of the job. Every single lead is handled instantly, 24/7, for less than the cost of a cup of coffee a day. She got her job back, and the agency got a machine that never sleeps.",
  },
];

const Work: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setSelected(null), []);

  /* Escape to close + scroll lock while the dialog is up. */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  return (
    <section id="proof" className="py-28 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-6">
              Real businesses. <span className="text-accent-ink">Real results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg text-ink-2 leading-relaxed">
              A few of the systems we&apos;ve built. Open any one for the before, the fix, and
              the result.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setSelected(project)}
                className="group h-full w-full text-left rounded-xl border border-line bg-surface/60 p-8 flex flex-col transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface active:scale-[0.99]"
              >
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink mb-6">
                  <project.icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-ink-2 text-[0.95rem] leading-relaxed line-clamp-3 mb-7 grow">
                  {project.win}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-ink">
                  Read the case
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="absolute inset-0 bg-carbon/75 backdrop-blur-sm"
            />
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-xl border border-line bg-background shadow-[var(--shadow-lift)]"
            >
              <button
                onClick={close}
                aria-label="Close case study"
                className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8 pr-10">
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink shrink-0">
                    <selected.icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
                    {selected.title}
                  </h3>
                </div>

                <div className="space-y-7">
                  {[
                    { k: "The pain", v: selected.pain },
                    { k: "The fix", v: selected.fix },
                  ].map((block) => (
                    <div key={block.k}>
                      <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-ink mb-2.5">
                        {block.k}
                      </h4>
                      <p className="text-ink-2 leading-relaxed">{block.v}</p>
                    </div>
                  ))}

                  <div className="rounded-lg border border-primary/25 bg-primary/[0.07] p-6">
                    <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-ink mb-2.5">
                      The win
                    </h4>
                    <p className="text-foreground leading-relaxed">{selected.win}</p>
                  </div>
                </div>

                <div className="mt-9 pt-6 border-t border-line flex justify-end">
                  <Button
                    onClick={() => {
                      close();
                      onOpenContact();
                    }}
                    icon
                  >
                    Book a call
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
