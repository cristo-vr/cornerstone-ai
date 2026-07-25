"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, X, ArrowLeft, ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

type Study = {
    slug: string;
    name: string;
    industry: string;
    what: string;
    metric: string;
    metricLabel: string;
    runs: string[];
    images: number;   // count of N.webp files in /case-studies/<slug>/
    captions: string[];
};

const STUDIES: Study[] = [
    {
        slug: 'bioharmony',
        name: 'BioHarmony',
        industry: 'E-commerce health brand',
        what: 'A supplement brand where the founder was the bottleneck between orders, ads, suppliers and customers. Now one system runs the trading floor.',
        metric: '1,378',
        metricLabel: 'orders fulfilled through it',
        runs: [
            'Orders from placed to packed to shipped, on one board',
            'A live revenue and product analytics view',
            'Meta ad spend and results synced in',
            'An AI assistant that drafts creative and answers questions on the numbers',
        ],
        images: 5,
        captions: [
            'Order management board, from new order to shipped',
            'Live revenue and product analytics',
            'The AI assistant generating product creative',
            'Meta ads synced in, spend and results in one place',
            'The media-model registry behind the creative engine',
        ],
    },
    {
        slug: 'technolease',
        name: 'Technolease',
        industry: 'Security-tech rent-to-own distribution',
        what: 'A rent-to-own security distributor running deals across email and spreadsheets. Now every deal moves through one pipeline from application to payout.',
        metric: '61',
        metricLabel: 'deals tracked, application to payout',
        runs: [
            'A deal pipeline from application to credit-vet to install to payment',
            'A product-kit catalogue with pricing variants',
            'Installer commission worked out per deal',
            'Income forecasting across the contract term',
        ],
        images: 3,
        captions: [
            'The deal pipeline, application through to payout',
            'The product-kit catalogue, grouped by brand',
            'The returns model across the contract term',
        ],
    },
    {
        slug: 'roxburgh',
        name: 'Roxburgh Trust',
        industry: 'Trust & fiduciary administration',
        what: 'A fiduciary firm holding client files across a shared drive and memory. Now every trust file, compliance check and take-on document sits in one place.',
        metric: 'Every file',
        metricLabel: 'client, FICA status and document, in one place',
        runs: [
            'A searchable file for every client and trust',
            'FICA compliance tracked, with what is missing surfaced',
            'Take-on document packs captured at sign-up',
            'A folder tree seeded automatically for every new client',
        ],
        images: 4,
        captions: [
            'Every client and trust file, searchable',
            'The onboarding pack, captured at sign-up',
            'The folder template seeded for every new client',
            'A client file with compliance and group at a glance',
        ],
    },
    {
        slug: 'etj',
        name: 'ETJ Consulting',
        industry: 'Accounting & tax practice',
        what: 'An accounting practice where tax season lived in inboxes and spreadsheets. Now the whole register, document chase and compliance run through one system.',
        metric: '74',
        metricLabel: 'taxpayers run through one tax season',
        runs: [
            'A client account for every taxpayer and company',
            'Document management with status and origin per file',
            'A tax-season register, queue and questionnaire',
            'Compliance and statutory obligations tracked',
        ],
        images: 4,
        captions: [
            'The client dashboard',
            'Tax season, from register to filed',
            'Document management per client',
            'A client record with compliance and registration',
        ],
    },
    {
        slug: 'podcast',
        name: 'A Better Question',
        industry: 'Podcast & media',
        what: 'A podcast that needed a production line, not a to-do list. Now a full season moves from idea to published across research, production and distribution.',
        metric: '24 episodes',
        metricLabel: 'a full season, planned to published',
        runs: [
            'Season and episode planning across a phased listener journey',
            'AI content packs: show notes, quotes, captions, hashtags',
            'Multi-platform social scheduling from one clip',
            'A media library for everything captured or produced',
        ],
        images: 4,
        captions: [
            'The season, every episode across four phases',
            'AI content packs generated per episode',
            'One clip, scheduled across every platform',
            'The media library behind the season',
        ],
    },
    {
        slug: 'mason',
        name: 'Cornerstone',
        industry: 'Our own operating layer',
        what: 'The system we run Cornerstone on. Chat, brief, sessions, clients, time. We build you the same kind of thing we would not run without.',
        metric: 'Tenant zero',
        metricLabel: 'we run on what we sell',
        runs: [
            'One place to chat to the business and get decisions back',
            'Sessions, clients and billing tracked',
            'Open loops ranked by effort and impact',
            'Where the week actually went, categorised',
        ],
        images: 4,
        captions: [
            'Chat to the business, get decisions back',
            'Where the week actually went',
            'Sessions and billing tracked',
            'Meetings captured and filed',
        ],
    },
];

const Lightbox: React.FC<{
    study: Study; index: number; onClose: () => void; onNav: (dir: number) => void;
}> = ({ study, index, onClose, onNav }) => {
    const onKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNav(1);
        if (e.key === 'ArrowLeft') onNav(-1);
    }, [onClose, onNav]);

    useEffect(() => {
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onKey]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            onClick={onClose}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md p-4 md:p-10"
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 text-ink-2 hover:text-accent-ink transition-colors p-2"
            >
                <X className="w-6 h-6" />
            </button>

            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl"
            >
                <img
                    src={`/case-studies/${study.slug}/${index + 1}.webp`}
                    alt={study.captions[index]}
                    className="w-full h-auto rounded-lg border border-line shadow-2xl"
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-ink-2 text-sm md:text-base">{study.captions[index]}</p>
                    <span className="font-semibold text-xs text-ink-2/60 shrink-0">
                        {index + 1} / {study.images}
                    </span>
                </div>
            </motion.div>

            {study.images > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
                        aria-label="Previous"
                        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-line bg-surface/60 text-foreground hover:border-primary hover:text-accent-ink transition-colors active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNav(1); }}
                        aria-label="Next"
                        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-line bg-surface/60 text-foreground hover:border-primary hover:text-accent-ink transition-colors active:scale-95"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </>
            )}
        </motion.div>
    );
};

const CaseStudies: React.FC = () => {
    const [active, setActive] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const reduce = useReducedMotion();
    const study = STUDIES[active];

    const nav = useCallback((dir: number) => {
        setLightbox((i) => {
            if (i === null) return i;
            return (i + dir + study.images) % study.images;
        });
    }, [study.images]);

    return (
        <section id="proof" className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex items-center gap-3 mb-7"
                >
                    <span className="h-px w-10 bg-primary" />
                    <span className="text-accent-ink font-semibold text-xs tracking-[0.18em] uppercase">
                        Systems we&apos;ve built
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-5 max-w-3xl"
                >
                    Real businesses, running on systems we built them.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="text-lg text-ink-2 mb-10 max-w-2xl"
                >
                    Different industries, same pattern: the routine work moves off the founder
                    and onto the system. These are the real ones.
                </motion.p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {STUDIES.map((s, i) => (
                        <button
                            key={s.slug}
                            onClick={() => setActive(i)}
                            aria-pressed={active === i}
                            className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors duration-200 active:scale-[0.98] ${
                                active === i
                                    ? 'border-primary bg-primary/10 text-accent-ink'
                                    : 'border-line text-ink-2 hover:text-foreground hover:border-line'
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
                        transition={{ duration: 0.3, ease }}
                        className="grid lg:grid-cols-12 gap-10 lg:gap-14"
                    >
                        {/* Narrative */}
                        <div className="lg:col-span-5">
                            <div className="font-semibold text-xs uppercase tracking-[0.16em] text-ink-2/70 mb-4">
                                {study.industry}
                            </div>
                            <p className="text-xl text-foreground leading-relaxed mb-8">{study.what}</p>

                            <div className="border-l-2 border-primary/50 pl-5 mb-8">
                                <div className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-accent-ink leading-none mb-2">
                                    {study.metric}
                                </div>
                                <div className="text-ink-2">{study.metricLabel}</div>
                            </div>

                            <div className="font-semibold text-xs uppercase tracking-[0.16em] text-ink-2/70 mb-4">
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

                        {/* Gallery */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: study.images }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setLightbox(i)}
                                        className={`group relative overflow-hidden rounded-xl border border-line hover:border-primary/50 transition-colors ${
                                            i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[16/10]'
                                        }`}
                                    >
                                        <img
                                            src={`/case-studies/${study.slug}/${i + 1}.webp`}
                                            alt={study.captions[i]}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60" />
                                        <span className="absolute bottom-2.5 left-3 right-3 text-left text-[11px] md:text-xs text-foreground/90 leading-tight">
                                            {study.captions[i]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Redaction disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mt-14 flex items-start gap-3 rounded-xl border border-line bg-surface/30 p-5 max-w-3xl"
                >
                    <Lock className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-sm text-ink-2 leading-relaxed">
                        These are screenshots of live client systems. Client names, personal
                        details and financial figures have been redacted to protect
                        confidentiality. The systems themselves are real and running.
                    </p>
                </motion.div>
            </div>

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
        </section>
    );
};

export default CaseStudies;
