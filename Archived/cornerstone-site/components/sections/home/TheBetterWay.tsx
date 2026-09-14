"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../../ui/Reveal";
import Eyebrow from "../../ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------- diagrams -- */

const Node: React.FC<{
  x: number;
  y: number;
  label: string;
  variant?: "default" | "you";
  sub?: string;
}> = ({ x, y, label, variant = "default", sub }) => {
  const styles =
    variant === "you"
      ? "border-primary bg-background text-foreground font-medium"
      : "border-line bg-background text-ink-2";
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: `${(x / 400) * 100}%`, top: `${(y / 300) * 100}%` }}
    >
      <div
        className={`px-2.5 py-1 rounded-lg border text-[10px] md:text-[11px] whitespace-nowrap ${styles}`}
      >
        {label}
      </div>
      {sub && (
        /* Same background as the pills above. The connectors are drawn under
           the nodes, so a pill masks them and a bare caption does not: without
           this the lines run straight through the label text. */
        <span className="mt-1 rounded-sm bg-background px-1.5 text-[8px] md:text-[9px] font-semibold uppercase tracking-wider text-ink-2 whitespace-nowrap">
          {sub}
        </span>
      )}
    </div>
  );
};

/**
 * Drawn as a <path>, not a <line>, on purpose.
 *
 * Framer Motion animates `pathLength` by writing a `pathLength="1"` attribute
 * and driving stroke-dasharray against it. WebKit only honours that attribute
 * on <path>, so on iOS the dasharray was being read in user units instead:
 * "0 1" means a zero-length dash, and every connector rendered invisible while
 * the nodes around it drew fine.
 *
 * `amount: "some"` for the same class of reason: two connectors in each
 * diagram are perfectly horizontal, so their bounding box has zero height and
 * therefore zero area. Any threshold above zero can never be satisfied by a
 * zero-area target, and whether it fires anyway is down to the engine.
 */
const Line: React.FC<{
  x1: number; y1: number; x2: number; y2: number; gold?: boolean; delay: number;
}> = ({ x1, y1, x2, y2, gold, delay }) => {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={`M ${x1} ${y1} L ${x2} ${y2}`}
      fill="none"
      className={gold ? "stroke-primary" : "stroke-foreground/25"}
      strokeWidth="1"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: EASE }}
    />
  );
};

/** Everything converges on one person. */
const TodayDiagram: React.FC = () => (
  <>
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Line x1={70} y1={55} x2={200} y2={150} delay={0.05} />
      <Line x1={330} y1={55} x2={200} y2={150} delay={0.1} />
      <Line x1={45} y1={150} x2={200} y2={150} delay={0.15} />
      <Line x1={355} y1={150} x2={200} y2={150} delay={0.2} />
      <Line x1={80} y1={245} x2={200} y2={150} delay={0.25} />
      <Line x1={320} y1={245} x2={200} y2={150} delay={0.3} />
    </svg>
    <Node x={70} y={55} label="Email" />
    <Node x={330} y={55} label="WhatsApp" />
    <Node x={45} y={150} label="Spreadsheets" />
    <Node x={355} y={150} label="Client list" />
    <Node x={80} y={245} label="Xero" />
    <Node x={320} y={245} label="Your team" />
    <Node x={200} y={150} label="You" variant="you" sub="every task, every day" />
  </>
);

/** The same tools, routed through a layer that isn't a person. */
const OSDiagram: React.FC = () => (
  <>
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Line x1={140} y1={45} x2={160} y2={128} gold delay={0.45} />
      <Line x1={260} y1={45} x2={240} y2={128} gold delay={0.5} />
      <Line x1={95} y1={255} x2={140} y2={172} gold delay={0.55} />
      <Line x1={165} y1={255} x2={180} y2={172} gold delay={0.6} />
      <Line x1={235} y1={255} x2={220} y2={172} gold delay={0.65} />
      <Line x1={305} y1={255} x2={260} y2={172} gold delay={0.7} />
    </svg>
    <Node x={140} y={45} label="You" variant="you" sub="decisions only" />
    <Node x={260} y={45} label="Your team" variant="you" sub="the real work" />
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
      <div className="px-4 py-2.5 rounded-xl border border-primary bg-primary/12 text-accent-ink font-semibold text-[11px] md:text-xs whitespace-nowrap text-center">
        Your Operating
        <br />
        System
      </div>
    </div>
    <Node x={95} y={255} label="Email" />
    <Node x={165} y={255} label="Client list" />
    <Node x={235} y={255} label="Xero" />
    <Node x={305} y={255} label="Projects" />
  </>
);

const Panel: React.FC<{
  label: string;
  caption: React.ReactNode;
  accent?: boolean;
  children: React.ReactNode;
}> = ({ label, caption, accent, children }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`h-0.5 w-6 ${accent ? "bg-primary" : "bg-foreground/25"}`}
        aria-hidden="true"
      />
      <span
        className={`text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${
          accent ? "text-accent-ink" : "text-ink-2"
        }`}
      >
        {label}
      </span>
    </div>
    <div
      className={`relative aspect-[4/3] rounded-xl border overflow-hidden ${
        accent ? "border-primary/40 bg-primary/[0.05]" : "border-line bg-surface/50"
      }`}
    >
      {children}
    </div>
    <p className="mt-5 text-ink-2 leading-relaxed">{caption}</p>
  </div>
);

/* ---------------------------------------------------------- ordinary week -- */

/* Four moments, each one finished before anybody asked. Concrete on purpose:
   this is the part a visitor has to be able to repeat to their partner. */
const moments = [
  {
    trigger: "An enquiry lands at 21:40.",
    result:
      "The quote is drafted off your own rates and last year’s similar jobs, sitting in your drafts before you’ve read the email. You change two numbers and send it.",
  },
  {
    trigger: "An invoice goes fourteen days past due.",
    result:
      "The chase goes out in your wording, then again a week later. You hear about it when the money lands.",
  },
  {
    trigger: "It’s Monday, 06:00.",
    result:
      "The report is written: what came in, what went out, which client has gone quiet, off live numbers rather than somebody’s memory of last week.",
  },
];

/* ---------------------------------------------------------------- section -- */

const TheBetterWay: React.FC = () => (
  <section id="the-better-way" className="py-20 md:py-28 bg-surface/40 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow className="mb-8">The better way</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.3rem,5.6vw,4rem)] mb-8">
            The difference between a tool and a system.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
            <p>
              A tool waits for you. A system already knows how your business runs, has
              permission to act, and gets on with it before anyone asks.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative grid md:grid-cols-2 gap-10 md:gap-14 items-start mt-16">
        <Reveal>
          <Panel
            label="Today"
            caption={<>Everything routes through you.</>}
          >
            <TodayDiagram />
          </Panel>
        </Reveal>

        {/* The turn, sitting in the gutter between the two states */}
        <div
          className="hidden md:grid absolute left-1/2 top-[7.5rem] -translate-x-1/2 place-items-center w-10 h-10 rounded-full border border-primary bg-background text-accent-ink z-10"
          aria-hidden="true"
        >
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </div>

        <Reveal delay={0.12}>
          <Panel
            label="With an operating system"
            accent
            caption={
              <>
                Work flows through the system.{" "}
                <span className="text-foreground font-medium">
                  You get decisions, not tasks.
                </span>
              </>
            }
          >
            <OSDiagram />
          </Panel>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <p className="mt-24 mb-10 font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
          What that looks like in an ordinary week
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
        {moments.map((m, i) => (
          <Reveal key={m.trigger} delay={Math.min(i, 3) * 0.06}>
            <div className="h-full bg-background p-8 md:p-9">
              <span className="font-display text-3xl font-bold text-accent-ink block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-foreground font-semibold mb-2">{m.trigger}</h3>
              <p className="text-ink-2 leading-relaxed">{m.result}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          <p className="lg:col-span-7 text-lg text-ink-2 leading-relaxed">
            It runs on the tools you already pay for, inside your own accounts, with
            permissions per person and a record of every action it took.
          </p>
          <blockquote className="lg:col-span-5 border-l-2 border-primary pl-6">
            <p className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold uppercase leading-[1.08] tracking-[0.005em] text-foreground">
              Once you can see how it&rsquo;s put together, you can point it at anything.{" "}
              <span className="text-accent-ink">That&rsquo;s the part worth owning.</span>
            </p>
          </blockquote>
        </div>
      </Reveal>
    </div>
  </section>
);

export default TheBetterWay;
