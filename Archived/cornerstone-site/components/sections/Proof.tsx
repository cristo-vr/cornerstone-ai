"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Lock, X, ArrowLeft, ArrowRight,
  BrainCircuit, Bot, UserCheck,
} from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { useScrollLock } from "../ui/useScrollLock";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------- the named -- */

type Study = {
  slug: string;
  name: string;
  industry: string;
  what: string;
  metric: string;
  metricLabel: string;
  runs: string[];
  images: number; // count of N.webp files in /case-studies/<slug>/
  captions: string[];
};

const STUDIES: Study[] = [
  {
    slug: "bioharmony",
    name: "BioHarmony",
    industry: "E-commerce health brand",
    what: "A supplement brand where the founder was the bottleneck between orders, ads, suppliers and customers. Now one system runs the trading floor.",
    metric: "1,378",
    metricLabel: "orders fulfilled through it",
    runs: [
      "Orders from placed to packed to shipped, on one board",
      "A live revenue and product analytics view",
      "Meta ad spend and results synced in",
      "An AI assistant that drafts creative and answers questions on the numbers",
    ],
    images: 5,
    captions: [
      "Order management board, from new order to shipped",
      "Live revenue and product analytics",
      "The AI assistant generating product creative",
      "Meta ads synced in, spend and results in one place",
      "The media-model registry behind the creative engine",
    ],
  },
  {
    slug: "technolease",
    name: "Technolease",
    industry: "Security-tech rent-to-own distribution",
    what: "A rent-to-own security distributor running deals across email and spreadsheets.",
    metric: "61",
    metricLabel: "deals tracked, application to payout",
    runs: [
      "A deal pipeline from application to credit-vet to install to payment",
      "A product-kit catalogue with pricing variants",
      "Installer commission worked out per deal",
      "Income forecasting across the contract term",
    ],
    images: 3,
    captions: [
      "The deal pipeline, application through to payout",
      "The product-kit catalogue, grouped by brand",
      "The returns model across the contract term",
    ],
  },
  {
    slug: "roxburgh",
    name: "Roxburgh Trust",
    industry: "Trust & fiduciary administration",
    what: "A fiduciary firm holding client files across a shared drive and memory.",
    metric: "Every file",
    metricLabel: "client, FICA status and document, in one place",
    runs: [
      "A searchable file for every client and trust",
      "FICA compliance tracked, with what is missing surfaced",
      "Take-on document packs captured at sign-up",
      "A folder tree seeded automatically for every new client",
    ],
    images: 4,
    captions: [
      "Every client and trust file, searchable",
      "The onboarding pack, captured at sign-up",
      "The folder template seeded for every new client",
      "A client file with compliance and group at a glance",
    ],
  },
  {
    slug: "etj",
    name: "ETJ Consulting",
    industry: "Accounting & tax practice",
    what: "An accounting practice where tax season lived in inboxes and spreadsheets.",
    metric: "74",
    metricLabel: "taxpayers run through one tax season",
    runs: [
      "A client account for every taxpayer and company",
      "Document management with status and origin per file",
      "A tax-season register, queue and questionnaire",
      "Compliance and statutory obligations tracked",
    ],
    images: 4,
    captions: [
      "The client dashboard",
      "Tax season, from register to filed",
      "Document management per client",
      "A client record with compliance and registration",
    ],
  },
  {
    slug: "podcast",
    name: "A Better Question",
    industry: "Podcast & media",
    what: "A podcast run off a to-do list that needed a production line instead.",
    metric: "24 episodes",
    metricLabel: "a full season, planned to published",
    runs: [
      "Season and episode planning across a phased listener journey",
      "AI content packs: show notes, quotes, captions, hashtags",
      "Multi-platform social scheduling from one clip",
      "A media library for everything captured or produced",
    ],
    images: 4,
    captions: [
      "The season, every episode across four phases",
      "AI content packs generated per episode",
      "One clip, scheduled across every platform",
      "The media library behind the season",
    ],
  },
  {
    slug: "mason",
    name: "Cornerstone",
    industry: "My own operating system",
    what: "The system I run Cornerstone on. I build you the same kind of thing I rely on myself.",
    metric: "Tenant zero",
    metricLabel: "I run on what I sell",
    runs: [
      "One place to chat to the business and get decisions back",
      "Sessions, clients and billing tracked",
      "Open loops ranked by effort and impact",
      "Where the week actually went, categorised",
    ],
    images: 4,
    captions: [
      "Chat to the business, get decisions back",
      "Where the week actually went",
      "Sessions and billing tracked",
      "Meetings captured and filed",
    ],
  },
];

const Lightbox: React.FC<{
  study: Study; index: number; onClose: () => void; onNav: (dir: number) => void;
}> = ({ study, index, onClose, onNav }) => {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    },
    [onClose, onNav]
  );

  useScrollLock(true);

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-carbon/85 backdrop-blur-md p-4 md:p-10"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-rail-text/70 hover:text-rail-text transition-colors p-2"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <img
          src={`/case-studies/${study.slug}/${index + 1}.webp`}
          alt={study.captions[index]}
          className="w-full h-auto rounded-lg border border-[#3C382F] shadow-2xl"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[#BEB9AC] text-sm md:text-base">{study.captions[index]}</p>
          <span className="font-semibold text-xs text-[#8F8B7E] shrink-0">
            {index + 1} / {study.images}
          </span>
        </div>
      </motion.div>

      {study.images > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-[#3C382F] bg-[#343029]/70 text-rail-text hover:border-primary transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            aria-label="Next"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-[#3C382F] bg-[#343029]/70 text-rail-text hover:border-primary transition-colors active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );
};

/* ------------------------------------------------------------ the patterns -- */

interface Pattern {
  id: string;
  title: string;
  icon: React.ElementType;
  pain: string;
  fix: string;
  win: string;
}

const patterns: Pattern[] = [
  {
    id: "1",
    title: "Reporting that writes itself",
    icon: BrainCircuit,
    pain: "Their highest-paid people were spending hours a week in spreadsheets to work out how the business was doing. By the time a number reached leadership it was already out of date, so decisions kept getting deferred to the next meeting.",
    fix: "I built an engine that pulls the data, does the arithmetic, and writes the report. Nobody touches a spreadsheet.",
    win: "The report is there when leadership opens it, so the conversation starts at what to do rather than what happened.",
  },
  {
    id: "3",
    title: "Qualifying before a human picks up",
    icon: Bot,
    pain: "They were getting hundreds of leads a month and most were nowhere near ready to buy. Closers spent their days asking the same opening questions, and the good leads waited behind the bad ones.",
    fix: "I built a WhatsApp assistant on their own sales scripts. It talks to every new lead, answers what they ask, and collects the budget and timing details before anyone on the team is involved.",
    win: "The team only picks up the phone for a lead that's ready. Same headcount, double the closing rate.",
  },
  {
    id: "6",
    title: "Recruiters recruiting again",
    icon: UserCheck,
    pain: "One of their strongest recruiters was spending most of her day booking interviews, chasing candidates for documents, and updating the CRM. The actual recruiting fit into whatever was left.",
    fix: "I automated the admin end of her funnel. From the moment a candidate applies, the system handles vetting, the emails and the calendar.",
    win: "She got most of her week back, and every applicant gets a response straight away at any hour.",
  },
];

/* ---------------------------------------------------------------- section -- */

const Proof: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const reduce = useReducedMotion();
  const study = STUDIES[active];

  const nav = useCallback(
    (dir: number) => {
      setLightbox((i) => (i === null ? i : (i + dir + study.images) % study.images));
    },
    [study.images]
  );

  const closePattern = useCallback(() => setPattern(null), []);

  /* Escape to close + scroll lock while the pattern dialog is up. */
  useScrollLock(pattern !== null);

  useEffect(() => {
    if (!pattern) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePattern();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pattern, closePattern]);

  return (
    <section id="proof" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <span className="flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink mb-7">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            Systems I&apos;ve built
          </span>
        </Reveal>

        <Reveal delay={0.04}>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-5 max-w-3xl">
            Real businesses, running on systems I built them.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 mb-10 max-w-2xl">
            In every one of these, the routine work moved off the founder and onto the
            system.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {STUDIES.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors duration-200 active:scale-[0.98] ${
                active === i
                  ? "border-primary bg-primary/12 text-accent-ink"
                  : "border-line text-ink-2 hover:text-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Active study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={study.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-14"
          >
            <div className="lg:col-span-5">
              <div className="font-semibold text-xs uppercase tracking-[0.16em] text-ink-2 mb-4">
                {study.industry}
              </div>
              <p className="text-xl text-foreground leading-relaxed mb-8">{study.what}</p>

              <div className="border-l-2 border-primary pl-5 mb-8">
                <div className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-accent-ink leading-none mb-2">
                  {study.metric}
                </div>
                <div className="text-ink-2">{study.metricLabel}</div>
              </div>

              <div className="font-semibold text-xs uppercase tracking-[0.16em] text-ink-2 mb-4">
                What it runs
              </div>
              <ul className="space-y-3">
                {study.runs.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-ink-2 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: study.images }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className={`group relative overflow-hidden rounded-xl border border-line hover:border-primary transition-colors ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[16/10]"
                    }`}
                  >
                    <img
                      src={`/case-studies/${study.slug}/${i + 1}.webp`}
                      alt={study.captions[i]}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-carbon/85 to-transparent" />
                    <span className="absolute bottom-2.5 left-3 right-3 text-left text-[11px] md:text-xs text-rail-text leading-tight">
                      {study.captions[i]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Redaction disclaimer */}
        <Reveal>
          <div className="mt-14 flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-5 max-w-3xl">
            <Lock className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-ink-2 leading-relaxed">
              These are screenshots of live client systems. Client names, personal details
              and financial figures have been redacted to protect confidentiality.
            </p>
          </div>
        </Reveal>

        {/* --- the patterns underneath, folded into the same proof section --- */}
        <div className="mt-24 md:mt-28 pt-20 border-t border-line">
          <Reveal>
            <h3 className="font-display font-bold uppercase text-foreground leading-[0.95] tracking-[0.005em] text-[clamp(1.9rem,4vw,3rem)] mb-5 max-w-2xl">
              The pieces that show up in almost every build.
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-lg text-ink-2 leading-relaxed max-w-2xl mb-12">
              Open any one for the before, the fix, and the result.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {patterns.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06}>
                <button
                  onClick={() => setPattern(p)}
                  className="group h-full w-full text-left rounded-xl border border-line bg-surface/60 p-8 flex flex-col transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-primary hover:bg-surface active:scale-[0.99]"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink mb-6">
                    <p.icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <h4 className="font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
                    {p.title}
                  </h4>
                  <p className="text-ink-2 text-[0.95rem] leading-relaxed line-clamp-3 mb-7 grow">
                    {p.win}
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
      </div>

      {/* Screenshot lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            study={study}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNav={nav}
          />
        )}
      </AnimatePresence>

      {/* Pattern dialog */}
      <AnimatePresence>
        {pattern && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={pattern.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closePattern}
              className="absolute inset-0 bg-carbon/75 backdrop-blur-sm"
            />
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-xl border border-line bg-background shadow-[var(--shadow-lift)]"
            >
              <button
                onClick={closePattern}
                aria-label="Close case study"
                className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8 pr-10">
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-primary/12 text-accent-ink shrink-0">
                    <pattern.icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground">
                    {pattern.title}
                  </h4>
                </div>

                <div className="space-y-7">
                  {[
                    { k: "The pain", v: pattern.pain },
                    { k: "The fix", v: pattern.fix },
                  ].map((block) => (
                    <div key={block.k}>
                      <h5 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-ink mb-2.5">
                        {block.k}
                      </h5>
                      <p className="text-ink-2 leading-relaxed">{block.v}</p>
                    </div>
                  ))}

                  <div className="rounded-lg border border-primary/40 bg-primary/[0.09] p-6">
                    <h5 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-ink mb-2.5">
                      The win
                    </h5>
                    <p className="text-foreground leading-relaxed">{pattern.win}</p>
                  </div>
                </div>

                <div className="mt-9 pt-6 border-t border-line flex justify-end">
                  <Button
                    onClick={() => {
                      closePattern();
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

export default Proof;
