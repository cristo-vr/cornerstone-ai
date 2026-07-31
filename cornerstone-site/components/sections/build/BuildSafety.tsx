"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, ScrollText, Database, Hand, LayoutDashboard, Check, Minus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const points = [
  {
    icon: Lock,
    title: "Everyone sees only what they should",
    body: "Access is set at the data itself, not by asking the AI nicely. Your bookkeeper sees the books. Your newest hire doesn't see the bank balance.",
  },
  {
    icon: ScrollText,
    title: "Every action is logged",
    body: "Who asked for what, what the system did, and when. You can read back any day of the last year, and so can your accountant.",
  },
  {
    icon: Hand,
    title: "Money and messages wait for a yes",
    body: "Anything leaving your business needs a human to approve it, until you decide a particular system has earned the right to send on its own.",
  },
  {
    icon: Database,
    title: "One database, on your accounts",
    body: "A single source of truth that belongs to you, backed up, and sitting well away from anything of mine.",
  },
  {
    icon: LayoutDashboard,
    title: "One screen to run it from",
    body: "You and your team see the work, the log and the approvals in one place. Everyone else carries on working where they already work.",
  },
];

/* Roles down the side, data across the top. The point isn't this specific grid,
   it's that a grid exists at all: access is a property of the data. */
const COLUMNS = ["Clients", "Projects", "Invoices", "Bank"];
const ROLES: { role: string; grants: boolean[] }[] = [
  { role: "You", grants: [true, true, true, true] },
  { role: "Bookkeeper", grants: [true, false, true, true] },
  { role: "Account manager", grants: [true, true, true, false] },
  { role: "New hire", grants: [true, true, false, false] },
];

const PermissionMatrix: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="w-full rounded-xl border border-line bg-surface/50 p-6 md:p-7 overflow-x-auto">
      <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-6">
        Who can see what
      </div>

      <table className="w-full border-collapse min-w-[22rem]">
        <thead>
          <tr>
            <th className="w-1/3" />
            {COLUMNS.map((c) => (
              <th
                key={c}
                scope="col"
                className="pb-4 text-center text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink-2"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((r, ri) => (
            <tr key={r.role} className="border-t border-line">
              <th
                scope="row"
                className="py-3.5 pr-3 text-left text-sm font-medium text-foreground whitespace-nowrap"
              >
                {r.role}
              </th>
              {r.grants.map((granted, ci) => (
                <td key={COLUMNS[ci]} className="py-3.5 text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.35, delay: ri * 0.1 + ci * 0.05, ease: EASE }
                    }
                    className={`inline-grid place-items-center w-6 h-6 rounded-md ${
                      granted ? "bg-primary/15 text-accent-ink" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {granted ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    )}
                    <span className="sr-only">
                      {granted ? "has access" : "no access"} to {COLUMNS[ci]}
                    </span>
                  </motion.span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-6 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2 leading-relaxed">
        An example. Yours gets set to your roles in week two, and you can change it
        any day after that.
      </p>
    </div>
  );
};

const BuildSafety: React.FC = () => (
  <section id="safety" className="py-28 md:py-36 border-t border-line">
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* min-w-0: a grid item defaults to min-width:auto, so the matrix table's
          min-width would otherwise push the column past the viewport instead of
          scrolling inside its own overflow container. */}
      <div className="lg:col-span-5 min-w-0">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5vw,3.4rem)]">
            Built to be safe.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-lg text-ink-2 leading-relaxed">
            Letting AI touch the business only works if it can&apos;t do damage while
            nobody&apos;s looking. Five things handle that, and they go in before any
            of the clever stuff.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-11">
          <PermissionMatrix />
        </Reveal>
      </div>

      <div className="lg:col-span-7 min-w-0">
        <div className="rounded-xl border border-line bg-background overflow-hidden">
          {points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.06}
              className={i > 0 ? "border-t border-line" : ""}
            >
              <div className="flex gap-5 p-6 md:p-7">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/12 text-accent-ink shrink-0">
                  <point.icon className="w-[1.15rem] h-[1.15rem]" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.005em] text-foreground mb-1">
                    {point.title}
                  </h3>
                  <p className="text-ink-2 leading-relaxed">{point.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BuildSafety;
