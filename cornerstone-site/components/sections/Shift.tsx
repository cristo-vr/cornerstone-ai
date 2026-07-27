"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

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
        <span className="mt-1 text-[8px] md:text-[9px] font-semibold uppercase tracking-wider text-ink-2 whitespace-nowrap">
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
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
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

/**
 * Both states at once. The comparison is the argument, so hiding half of it
 * behind a tab made the visitor do work to see the point. Side by side, the
 * difference reads in a glance.
 */
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

const Shift: React.FC = () => (
  <section className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 text-center">
          One layer changes how everything moves.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-lg text-ink-2 text-center max-w-2xl mx-auto mb-16">
          We build one system that sits across the tools you already use. Work flows
          through it, not through you.
        </p>
      </Reveal>

      <div className="relative grid md:grid-cols-2 gap-10 md:gap-14 items-start">
        <Reveal>
          <Panel
            label="Today"
            caption={<>Everything routes through you. When you stop, everything stops.</>}
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

      <Reveal delay={0.1}>
        <p className="mt-12 text-center font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2 max-w-2xl mx-auto leading-relaxed">
          Not an off-the-shelf platform. Every piece is built around how your team already
          works. The tools shown are just examples.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Shift;
