"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type DiagramState = "today" | "os";

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
      <div className={`px-3 py-1.5 rounded-lg border text-[11px] md:text-xs whitespace-nowrap ${styles}`}>
        {label}
      </div>
      {sub && (
        <span className="mt-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-ink-2 whitespace-nowrap">
          {sub}
        </span>
      )}
    </div>
  );
};

const Line: React.FC<{
  x1: number; y1: number; x2: number; y2: number; gold?: boolean; delay: number;
}> = ({ x1, y1, x2, y2, gold, delay }) => {
  const reduce = useReducedMotion();
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      className={gold ? "stroke-primary" : "stroke-foreground/25"}
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
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
      <Line x1={140} y1={45} x2={160} y2={128} gold delay={0.05} />
      <Line x1={260} y1={45} x2={240} y2={128} gold delay={0.1} />
      <Line x1={95} y1={255} x2={140} y2={172} gold delay={0.15} />
      <Line x1={165} y1={255} x2={180} y2={172} gold delay={0.2} />
      <Line x1={235} y1={255} x2={220} y2={172} gold delay={0.25} />
      <Line x1={305} y1={255} x2={260} y2={172} gold delay={0.3} />
    </svg>
    <Node x={140} y={45} label="You" variant="you" sub="decisions only" />
    <Node x={260} y={45} label="Your team" variant="you" sub="the real work" />
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
      <div className="px-6 py-3 rounded-xl border border-primary bg-primary/12 text-accent-ink font-semibold text-xs md:text-sm whitespace-nowrap">
        Your Operating System
      </div>
    </div>
    <Node x={95} y={255} label="Email" />
    <Node x={165} y={255} label="Client list" />
    <Node x={235} y={255} label="Xero" />
    <Node x={305} y={255} label="Projects" />
  </>
);

const Diagram: React.FC = () => {
  const [state, setState] = useState<DiagramState>("today");
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  /* Auto-flip once to show the transformation, unless the visitor beat us to
     it. The delay is generous so nobody gets cut off mid-read. */
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const t = setTimeout(() => setState("os"), 3000);
    return () => clearTimeout(t);
  }, [inView, touched, reduce]);

  const pick = (s: DiagramState) => {
    setTouched(true);
    setState(s);
  };

  return (
    <div ref={ref}>
      <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Before and after">
        {(
          [
            ["today", "Today"],
            ["os", "With an operating system"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={state === key}
            onClick={() => pick(key)}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-colors duration-200 active:scale-[0.98] ${
              state === key
                ? "border-primary bg-primary/12 text-accent-ink"
                : "border-line text-ink-2 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative max-w-2xl mx-auto aspect-[4/3] rounded-xl border border-line bg-surface/50 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0"
          >
            {state === "today" ? <TodayDiagram /> : <OSDiagram />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center min-h-[3rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="text-ink-2 text-base md:text-lg max-w-xl mx-auto"
          >
            {state === "today" ? (
              <>Everything routes through you. When you stop, everything stops.</>
            ) : (
              <>
                Work flows through the system.{" "}
                <span className="text-foreground font-medium">
                  You get decisions, not tasks.
                </span>
              </>
            )}
          </motion.p>
        </AnimatePresence>
        <p className="mt-3 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2">
          Not an off-the-shelf platform. Every piece is built around how your team already
          works. The tools shown are just examples.
        </p>
      </div>
    </div>
  );
};

const Shift: React.FC = () => (
  <section className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 text-center">
          One layer changes how everything moves.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-lg text-ink-2 text-center max-w-2xl mx-auto mb-14">
          We build one system that sits across the tools you already use. Work flows
          through it, not through you.
        </p>
      </Reveal>
      <Diagram />
    </div>
  </section>
);

export default Shift;
