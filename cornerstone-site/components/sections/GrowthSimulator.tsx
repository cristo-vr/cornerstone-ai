"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, RotateCcw, User, TrendingUp, Clock } from "lucide-react";
import Reveal from "../ui/Reveal";

const MAX_CLIENTS = 50;
const START_CLIENTS = 10;

function metricsFor(clients: number, automated: boolean) {
  const adminStaff = automated ? 1 : 1 + Math.floor((clients - 10) / 10);
  const profitMargin = automated
    ? Math.min(25 + (clients - 10) * 1.5, 85)
    : Math.max(25 - (clients - 10) * 0.35, 10);
  const ownerHours = automated ? 5 : Math.min(10 + (clients - 10) * 1.25, 60);
  return { adminStaff, profitMargin, ownerHours };
}

/** One bar. `tone` picks concrete (the trap) or gold (the fix). */
function Bar({ pct, tone }: { pct: number; tone: "concrete" | "gold" }) {
  const reduce = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
      <motion.div
        className={`h-full rounded-full ${tone === "gold" ? "bg-primary" : "bg-muted"}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 15 }}
      />
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  pct,
  tone,
  note,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  pct: number;
  tone: "concrete" | "gold";
  note?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5 gap-4">
        <span className="flex items-center gap-2 text-ink-2">
          <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
            {label}
          </span>
        </span>
        <span
          className={`font-display text-lg font-bold tabular-nums ${
            tone === "gold" ? "text-accent-ink" : "text-foreground"
          }`}
        >
          {value}
        </span>
      </div>
      <Bar pct={pct} tone={tone} />
      {note && (
        <p className="mt-2 text-right text-[0.68rem] uppercase tracking-[0.14em] text-ink-2">
          {note}
        </p>
      )}
    </div>
  );
}

const GrowthSimulator: React.FC = () => {
  const [clients, setClients] = useState(START_CLIENTS);
  const manual = metricsFor(clients, false);
  const automated = metricsFor(clients, true);
  const atMax = clients >= MAX_CLIENTS;

  return (
    <section className="py-28 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Reveal>
            <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.6rem)] mb-6">
              The scaling reality
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg text-ink-2 leading-relaxed mb-9">
              Every new client adds admin load. More clients, more chaos. That&apos;s the trap.{" "}
              <strong className="font-semibold text-foreground">
                An operating system breaks the pattern. Your margins grow and your time
                comes back.
              </strong>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-ink-2 leading-relaxed mb-9">
              This shows the shape of the problem rather than a forecast for your
              business. Your real numbers are what we map in week one.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setClients((c) => Math.min(c + 5, MAX_CLIENTS))}
                disabled={atMax}
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-accent-txt transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-accent-dk active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none"
              >
                <Plus className="w-4 h-4" strokeWidth={2.25} />
                {atMax ? "At capacity" : "Sign five more clients"}
              </button>
              <button
                onClick={() => setClients(START_CLIENTS)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink-2 transition-colors duration-200 hover:border-muted hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
                Reset
              </button>
            </div>
          </Reveal>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* The trap */}
          <div className="rounded-xl border border-line bg-surface/60 p-8">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-ink-2 mb-1">
                  Without a system
                </h3>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-foreground tabular-nums">
                    {clients}
                  </span>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Clients
                  </span>
                </p>
              </div>
              <span className="rounded-md bg-surface-2 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                Spreadsheets &amp; WhatsApp
              </span>
            </div>
            <div className="space-y-7">
              <Metric
                icon={User}
                label="Admin headcount"
                value={`${manual.adminStaff} staff`}
                pct={(manual.adminStaff / 6) * 100}
                tone="concrete"
              />
              <Metric
                icon={TrendingUp}
                label="Profit margin"
                value={`${Math.round(manual.profitMargin)}%`}
                pct={manual.profitMargin}
                tone="concrete"
                note="Crushed"
              />
              <Metric
                icon={Clock}
                label="Your hours in ops each week"
                value={`${Math.round(manual.ownerHours)}h`}
                pct={(manual.ownerHours / 60) * 100}
                tone="concrete"
              />
            </div>
          </div>

          {/* The fix */}
          <div className="rounded-xl border border-primary/35 bg-surface p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-1">
                  With your operating system
                </h3>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-accent-ink tabular-nums">
                    {clients}
                  </span>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
                    Clients
                  </span>
                </p>
              </div>
              <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-accent-ink">
                Cornerstone
              </span>
            </div>
            <div className="space-y-7">
              <Metric
                icon={User}
                label="Admin headcount"
                value={`${automated.adminStaff} staff`}
                pct={(automated.adminStaff / 6) * 100}
                tone="gold"
              />
              <Metric
                icon={TrendingUp}
                label="Profit margin"
                value={`${Math.round(automated.profitMargin)}%`}
                pct={automated.profitMargin}
                tone="gold"
                note="Expanding"
              />
              <Metric
                icon={Clock}
                label="Your hours in ops each week"
                value={`${Math.round(automated.ownerHours)}h`}
                pct={(automated.ownerHours / 60) * 100}
                tone="gold"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSimulator;
