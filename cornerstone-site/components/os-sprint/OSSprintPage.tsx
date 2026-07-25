"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Check, X, Key, FileText, Ban, DoorOpen, ListChecks, ShieldCheck, Database, Inbox } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../sections/Footer';
import ContactModal from '../ui/ContactModal';
import Button from '../ui/Button';
import CaseStudies from './CaseStudies';

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------- Hero ---------------------------------- */

const Hero: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center px-6 pt-24 pb-16 border-b border-line overflow-hidden">
            <div className="max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex items-center gap-3 mb-7"
                >
                    <span className="h-px w-10 bg-primary" />
                    <span className="text-accent-ink font-semibold text-xs tracking-[0.18em] uppercase">
                        The 8-week operating sprint
                    </span>
                </motion.div>

                <h1 className="font-display font-bold uppercase tracking-[0.005em] text-foreground leading-[0.92] text-[clamp(2.6rem,6.5vw,5rem)]">
                    <motion.span
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                        className="block"
                    >
                        Right now, your business
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.22, ease }}
                        className="block"
                    >
                        runs on <span className="text-accent-ink">you.</span>
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.38, ease }}
                    className="mt-7 max-w-xl text-lg md:text-xl text-ink-2 leading-relaxed"
                >
                    The OS Sprint replaces that with a system. Built around how you work,
                    run by AI, <span className="text-foreground font-medium">owned by you.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.55, ease }}
                    className="mt-9 flex items-center gap-4"
                >
                    <div onClick={onOpenContact} className="inline-block">
                        <Button variant="primary" icon>Book a call</Button>
                    </div>
                    <a
                        href="#the-sprint"
                        className="text-sm font-semibold uppercase tracking-wide text-ink-2 hover:text-accent-ink transition-colors px-2 py-3"
                    >
                        See the eight weeks
                    </a>
                </motion.div>
            </div>

            {/* Slim sprint strip: the whole build, one glance */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.75, ease }}
                className="absolute bottom-0 left-0 right-0 border-t border-line"
            >
                <a
                    href="#the-sprint"
                    className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-3 overflow-x-auto font-semibold text-[10px] md:text-xs uppercase tracking-[0.14em] text-ink-2 hover:text-foreground transition-colors"
                >
                    <span className="whitespace-nowrap"><span className="text-accent-ink">Wk 1</span> Map</span>
                    <span className="h-px flex-1 min-w-4 bg-foreground/15" aria-hidden />
                    <span className="whitespace-nowrap"><span className="text-accent-ink">Wk 2-3</span> Foundation</span>
                    <span className="h-px flex-1 min-w-4 bg-foreground/15" aria-hidden />
                    <span className="whitespace-nowrap"><span className="text-accent-ink">Wk 4-7</span> Build live</span>
                    <span className="h-px flex-1 min-w-4 bg-foreground/15" aria-hidden />
                    <span className="whitespace-nowrap"><span className="text-accent-ink">Wk 8</span> You own it</span>
                </a>
            </motion.div>
        </section>
    );
};

/* ------------------------------- The problem ------------------------------ */

const pileTasks = [
    'New client signed',
    'Invoice still not sent',
    'WhatsApp: "where’s the file?"',
    'Follow-up overdue',
    'Proposal to write',
    'Onboarding half done',
    'Chase the missing doc',
    'Approve the timesheet',
];

const PileUp: React.FC = () => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.4 });
    const [count, setCount] = useState(4);

    useEffect(() => {
        if (reduce || !inView) return;
        const t = setInterval(() => setCount((c) => c + 1), 1600);
        return () => clearInterval(t);
    }, [reduce, inView]);

    const visible = 5;
    const stack = Array.from({ length: visible }, (_, i) => {
        const idx = count - (visible - 1) + i;
        return { key: idx, label: pileTasks[((idx % pileTasks.length) + pileTasks.length) % pileTasks.length] };
    });

    return (
        <div
            ref={ref}
            className="relative w-full aspect-[4/5] rounded-xl border border-line bg-surface/40 overflow-hidden flex flex-col justify-end p-6 md:p-8"
        >
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2/70">
                    Today, at your desk
                </span>
                <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" aria-hidden />
            </div>

            {/* Falling stack */}
            <div className="flex flex-col-reverse items-center gap-2.5 mb-5">
                <AnimatePresence initial={false} mode="popLayout">
                    {stack.map((item, i) => (
                        <motion.div
                            key={item.key}
                            layout
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -32, scale: 0.96 }}
                            animate={{ opacity: i === 0 ? 0.35 : 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.45, ease }}
                            style={{ rotate: `${((item.key % 3) - 1) * 1.2}deg` }}
                            className="px-4 py-2.5 rounded-lg border border-line bg-surface text-ink-2 text-xs md:text-sm whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                        >
                            {item.label}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* You, underneath all of it */}
            <div className="flex flex-col items-center pb-2">
                <div className="h-px w-24 bg-foreground/15 mb-4" aria-hidden />
                <div className="px-5 py-2 rounded-lg border border-primary/60 bg-surface text-foreground font-medium text-sm">
                    You
                </div>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-ink-2/70">
                    where it all lands
                </span>
            </div>
        </div>
    );
};

const TheProblem: React.FC = () => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-7">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease }}
                        className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-7"
                    >
                        Every business has an operating system. Most founders never chose theirs.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="space-y-5 text-lg text-ink-2 leading-relaxed"
                    >
                        <p>
                            An operating system is simply the way work moves through your business.
                            How a new client, patient or placement gets onboarded. How projects get
                            tracked. How invoices go out. How nothing falls through the cracks.
                        </p>
                        <p>
                            Most founder-led businesses never designed that system. It grew by
                            accident: your memory, a group chat, five tools that don&apos;t talk to
                            each other, a spreadsheet someone updates when they remember.
                        </p>
                        <p className="text-foreground font-medium">
                            It holds together because you hold it together. That&apos;s why growth
                            feels like drowning: every new client adds load to the one part of the
                            business that can&apos;t scale. You.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease }}
                    className="lg:col-span-5"
                >
                    <PileUp />
                </motion.div>
            </div>
        </section>
    );
};

/* -------------------------- The before/after diagram ----------------------- */

type DiagramState = 'today' | 'os';

const Node: React.FC<{
    x: number; y: number; label: string; variant?: 'default' | 'you' | 'os';
    sub?: string;
}> = ({ x, y, label, variant = 'default', sub }) => {
    const styles = {
        default: 'border-line bg-surface text-ink-2',
        you: 'border-primary/60 bg-surface text-foreground font-medium',
        os: 'border-primary bg-primary/10 text-accent-ink font-semibold',
    }[variant];
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(x / 400) * 100}%`, top: `${(y / 300) * 100}%` }}
        >
            <div className={`px-3 py-1.5 rounded-lg border text-[11px] md:text-xs whitespace-nowrap ${styles}`}>
                {label}
            </div>
            {sub && (
                <span className="mt-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-ink-2/70 whitespace-nowrap">
                    {sub}
                </span>
            )}
        </div>
    );
};

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; gold?: boolean }> = ({ x1, y1, x2, y2, gold }) => (
    <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={gold ? 'stroke-primary/40' : 'stroke-foreground/20'}
        strokeWidth="1"
    />
);

const TodayDiagram: React.FC = () => (
    <>
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden>
            <Line x1={70} y1={55} x2={200} y2={150} />
            <Line x1={330} y1={55} x2={200} y2={150} />
            <Line x1={45} y1={150} x2={200} y2={150} />
            <Line x1={355} y1={150} x2={200} y2={150} />
            <Line x1={80} y1={245} x2={200} y2={150} />
            <Line x1={320} y1={245} x2={200} y2={150} />
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

const OSDiagram: React.FC = () => (
    <>
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden>
            <Line x1={140} y1={45} x2={160} y2={128} gold />
            <Line x1={260} y1={45} x2={240} y2={128} gold />
            <Line x1={95} y1={255} x2={140} y2={172} gold />
            <Line x1={165} y1={255} x2={180} y2={172} gold />
            <Line x1={235} y1={255} x2={220} y2={172} gold />
            <Line x1={305} y1={255} x2={260} y2={172} gold />
        </svg>
        <Node x={140} y={45} label="You" variant="you" sub="decisions only" />
        <Node x={260} y={45} label="Your team" variant="you" sub="the real work" />
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%' }}
        >
            <div className="px-6 py-3 rounded-xl border border-primary bg-primary/10 text-accent-ink font-semibold text-xs md:text-sm whitespace-nowrap">
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
    const [state, setState] = useState<DiagramState>('today');
    const [touched, setTouched] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const reduce = useReducedMotion();

    // Auto-flip once to show the transformation, unless the visitor beat us to it.
    // Delay is generous so nobody gets cut off mid-read.
    useEffect(() => {
        if (!inView || touched || reduce) return;
        const t = setTimeout(() => setState('os'), 3000);
        return () => clearTimeout(t);
    }, [inView, touched, reduce]);

    const pick = (s: DiagramState) => {
        setTouched(true);
        setState(s);
    };

    return (
        <div ref={ref}>
            {/* Toggle */}
            <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Before and after">
                {([['today', 'Today'], ['os', 'With an operating system']] as const).map(([key, label]) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={state === key}
                        onClick={() => pick(key)}
                        className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-colors duration-200 active:scale-[0.98] ${
                            state === key
                                ? 'border-primary bg-primary/10 text-accent-ink'
                                : 'border-line text-ink-2 hover:text-foreground hover:border-line'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Canvas */}
            <div className="relative max-w-2xl mx-auto aspect-[4/3] rounded-xl border border-line bg-surface/40 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={state}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                        transition={{ duration: 0.35, ease }}
                        className="absolute inset-0"
                    >
                        {state === 'today' ? <TodayDiagram /> : <OSDiagram />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="mt-6 text-center min-h-[3rem]">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={state}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease }}
                        className="text-ink-2 text-base md:text-lg max-w-xl mx-auto"
                    >
                        {state === 'today' ? (
                            <>Everything routes through you. When you stop, everything stops.</>
                        ) : (
                            <>Work flows through the system. <span className="text-foreground font-medium">You get decisions, not tasks.</span></>
                        )}
                    </motion.p>
                </AnimatePresence>
                <p className="mt-3 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2/60">
                    Not an off-the-shelf platform. Every piece is built around how your team
                    already works. The tools shown are just examples.
                </p>
            </div>
        </div>
    );
};

const TheShift: React.FC = () => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-5 text-center"
                >
                    One layer changes how everything moves.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="text-lg text-ink-2 text-center max-w-2xl mx-auto mb-14"
                >
                    We build one system that sits across the tools you already use.
                    Work flows through it, not through you.
                </motion.p>
                <Diagram />
            </div>
        </section>
    );
};

/* ------------------------------ What it's made of -------------------------- */

const traceSteps = [
    'Project opened, team assigned',
    'Welcome pack sent',
    'Kickoff call booked',
    'Deposit invoice drafted in Xero',
];

const TraceCard: React.FC = () => {
    return (
        <div className="relative w-full rounded-xl border border-line bg-surface/40 p-6 md:p-8">
            <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2/70 mb-6">
                A real example, start to finish
            </div>

            {/* The trigger */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease }}
                className="inline-block px-4 py-2 rounded-lg border border-primary/60 bg-primary/10 text-accent-ink text-sm font-semibold mb-5"
            >
                New client signs: Anika
            </motion.div>

            {/* What the system does */}
            <div className="relative pl-5 border-l border-line space-y-3 mb-6">
                {traceSteps.map((step, i) => (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.45, delay: 0.3 + i * 0.18, ease }}
                        className="flex items-center gap-3 text-sm md:text-base text-ink-2"
                    >
                        <Check className="w-4 h-4 text-accent-ink shrink-0" strokeWidth={2.5} />
                        {step}
                    </motion.div>
                ))}
            </div>

            {/* What you see */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 1.1, ease }}
                className="rounded-xl border border-line bg-background/60 p-4"
            >
                <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2/70 mb-2">
                    The one message you get
                </div>
                <p className="text-foreground text-sm md:text-base">
                    &ldquo;Anika is live. Kickoff Thursday 09:00. Invoice ready for your sign-off.&rdquo;
                </p>
            </motion.div>

            <p className="mt-5 font-semibold text-[10px] uppercase tracking-[0.14em] text-ink-2/60 leading-relaxed">
                Yours might be a VAT deadline, a placement, or a patient booking.
                Week one is where we map it.
            </p>
        </div>
    );
};

const WhatItIs: React.FC = () => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease }}
                        className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-7"
                    >
                        So what is it, actually?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="space-y-5 text-lg text-ink-2 leading-relaxed"
                    >
                        <p>
                            Plainly: it&apos;s AI, doing your business&apos;s routine work. Not an
                            off-the-shelf platform your team has to bend around. Not a person
                            doing your admin by hand.
                        </p>
                        <p>
                            One rule is built in from day one: the routine runs on its own, but
                            anything that leaves your business, money or a message to a client,
                            waits for a human yes. You choose where that line sits.
                        </p>
                        <p>
                            We build it custom, around how your business already works. It reads
                            and writes in your email, your client list, your invoicing, your
                            project board. Your team keeps working where they work, and sees one
                            shared, up-to-date picture instead of five half-updated tools.
                        </p>
                        <p className="text-foreground font-medium">
                            The result: the chasing, the retyping, the &ldquo;did anyone send
                            that?&rdquo; stops landing on your desk.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease }}
                    className="lg:col-span-6"
                >
                    <TraceCard />
                </motion.div>
            </div>
        </section>
    );
};

/* ------------------------------ What it does ------------------------------ */

const dayToDay = [
    {
        icon: ListChecks,
        title: 'It runs the routine.',
        body: 'Onboarding, follow-ups, invoices, reminders. It just happens, the way you would do it.',
    },
    {
        icon: ShieldCheck,
        title: 'It holds your standard.',
        body: 'Work gets done to the bar you set, every time. Not just when you are watching.',
    },
    {
        icon: Database,
        title: 'It keeps everyone on the same page.',
        body: 'Your whole team sees the same, up-to-date picture, instead of five tools and a group chat.',
    },
    {
        icon: Inbox,
        title: 'It brings you decisions, not tasks.',
        body: 'The small stuff gets handled. The real calls come to you with the context already gathered.',
    },
];

const WhatItDoes: React.FC = () => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-14"
                >
                    What it actually does all day.
                </motion.h2>
                <div className="divide-y divide-line border-t border-b border-line">
                    {dayToDay.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.06, ease }}
                            className="py-8 flex items-start gap-6"
                        >
                            <item.icon className="w-6 h-6 text-accent-ink shrink-0 mt-1" strokeWidth={1.5} />
                            <div>
                                <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-[0.005em] text-foreground mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-ink-2 text-lg leading-relaxed max-w-xl">{item.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* -------------------------------- Who it's for ----------------------------- */

const forYou = [
    'You run a service business with real clients and a small team.',
    'Everything still routes through you, and it is capping your growth.',
    'You have demand. What you are missing is capacity.',
    'You want to own your system, not rent another subscription.',
];

const notForYou = [
    'You are pre-revenue and still finding your offer.',
    'You want a chatbot, not a way your business runs.',
    'You want a tool your team has to bend around.',
    'You want it done to you, not built with you.',
];

const WhoItsFor: React.FC = () => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-14"
                >
                    Who it&apos;s for. And who it isn&apos;t.
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease }}
                        className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.07] to-transparent p-8 md:p-10"
                    >
                        <h3 className="font-display uppercase tracking-[0.005em] text-2xl font-semibold text-foreground mb-8">
                            Built for you if
                        </h3>
                        <ul className="space-y-5">
                            {forYou.map((line) => (
                                <li key={line} className="flex items-start gap-3 text-lg text-ink-2 leading-relaxed">
                                    <Check className="w-5 h-5 text-accent-ink shrink-0 mt-1" strokeWidth={2} />
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="rounded-xl border border-line p-8 md:p-10"
                    >
                        <h3 className="font-display uppercase tracking-[0.005em] text-2xl font-semibold text-ink-2 mb-8">
                            Not for you if
                        </h3>
                        <ul className="space-y-5">
                            {notForYou.map((line) => (
                                <li key={line} className="flex items-start gap-3 text-lg text-ink-2 leading-relaxed">
                                    <X className="w-5 h-5 text-ink-2/50 shrink-0 mt-1" strokeWidth={2} />
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* --------------------------------- The sprint ------------------------------ */

const weeks = [
    {
        label: 'Week 1',
        title: 'Map',
        body: 'We workshop with you and your team, trace how work actually moves, and find where the hours bleed out.',
    },
    {
        label: 'Weeks 2-3',
        title: 'Foundation',
        body: 'The core layer goes in. Your clients, projects and money in one place, connected to the tools you already use. Everything is built inside your accounts from day one, so even the work in progress is already yours.',
    },
    {
        label: 'Weeks 4-7',
        title: 'Build live',
        body: 'One piece at a time, put to work the moment it is ready. Weekly sessions train your team as the system grows.',
    },
    {
        label: 'Week 8',
        title: 'Handover',
        body: 'Keys, documentation, ownership. Your team runs it without us.',
    },
];

const TheSprint: React.FC = () => {
    return (
        <section id="the-sprint" className="py-28 md:py-32 border-b border-line">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex items-center gap-3 mb-7"
                >
                    <span className="h-px w-10 bg-primary" />
                    <span className="text-accent-ink font-semibold text-xs tracking-[0.18em] uppercase">
                        The build
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-5"
                >
                    The eight-week operating sprint.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="text-lg text-ink-2 mb-16 max-w-2xl"
                >
                    One build, fixed scope, done with you. Not a two-month disappearing act.
                    Your side of it: a workshop in week one, then about an hour a week with
                    your team. One hour together, not one hour per person.
                </motion.p>

                <div className="relative">
                    {/* Rail */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10" aria-hidden />
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease }}
                        style={{ originY: 0 }}
                        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary to-primary/30"
                        aria-hidden
                    />
                    <div className="space-y-14">
                        {weeks.map((week, i) => (
                            <motion.div
                                key={week.label}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                                className="relative pl-12"
                            >
                                <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background" aria-hidden />
                                <div className="font-semibold text-xs uppercase tracking-[0.14em] text-accent-ink mb-2">
                                    {week.label}
                                </div>
                                <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-semibold text-foreground mb-3">
                                    {week.title}
                                </h3>
                                <p className="text-ink-2 text-lg leading-relaxed max-w-xl">{week.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* After week eight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="mt-20 rounded-xl border border-line p-8 md:p-10"
                >
                    <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        And after week eight?
                    </h3>
                    <div className="space-y-4 text-lg text-ink-2 leading-relaxed max-w-3xl">
                        <p>
                            The system is yours and keeps running on its own. Nothing turns off
                            because we walked out the door.
                        </p>
                        <p>
                            If you want us to keep building and looking after it, there&apos;s an
                            optional monthly retainer. No lock-in: stop it any month, and
                            everything you own keeps working. If one of your tools changes
                            something down the line, we handle it on the retainer, or your team
                            fixes it with the documentation we hand over.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* --------------------------------- Ownership ------------------------------- */

const ownership = [
    { icon: Key, text: 'It lives in your accounts: your email, your tools, your logins.' },
    { icon: FileText, text: 'The system and its code belong to you. In writing.' },
    { icon: Ban, text: 'No platform fees to us, ever. The only thing you can pay us for is more work.' },
    { icon: DoorOpen, text: 'It does not need us to keep running.' },
];

const handoverRows = [
    { label: 'The accounts', value: 'Yours' },
    { label: 'The system & its code', value: 'Yours' },
    { label: 'The data', value: 'Yours' },
    { label: 'Ongoing platform fees', value: 'None' },
];

const HandoverCard: React.FC = () => {
    return (
        <div className="relative w-full aspect-[4/3] rounded-xl border border-line bg-surface/40 overflow-hidden p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2/70">
                    At the end of week eight
                </span>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.5, ease }}
                    className="w-11 h-11 rounded-full border border-primary/60 bg-primary/10 flex items-center justify-center"
                    aria-hidden
                >
                    <Key className="w-5 h-5 text-accent-ink" strokeWidth={1.5} />
                </motion.div>
            </div>

            <div className="divide-y divide-line">
                {handoverRows.map((row, i) => (
                    <motion.div
                        key={row.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}
                        className="py-3.5 flex items-center justify-between gap-4"
                    >
                        <span className="text-sm md:text-base text-ink-2">{row.label}</span>
                        <span className="font-semibold text-xs md:text-sm uppercase tracking-wider text-accent-ink flex items-center gap-2">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                            {row.value}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="font-semibold text-[10px] uppercase tracking-[0.18em] text-ink-2/50 text-center">
                Handed over. Not rented out.
            </div>
        </div>
    );
};

const Ownership: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease }}
                        className="lg:col-span-5 order-2 lg:order-1"
                    >
                        <HandoverCard />
                    </motion.div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease }}
                            className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-7"
                        >
                            You own it. Properly.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease }}
                            className="text-lg text-ink-2 leading-relaxed mb-10"
                        >
                            This is not a subscription you rent until the price goes up. It is a
                            system we build into your business, and then hand over.
                        </motion.p>
                        <ul className="space-y-4">
                            {ownership.map((item, i) => (
                                <motion.li
                                    key={item.text}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease }}
                                    className="flex items-center gap-4 text-lg text-foreground"
                                >
                                    <item.icon className="w-5 h-5 text-accent-ink shrink-0" strokeWidth={1.5} />
                                    {item.text}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Your data */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-8 rounded-xl border border-line p-8 md:p-10"
                >
                    <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        Your client data stays in your business.
                    </h3>
                    <div className="grid md:grid-cols-3 gap-x-10 gap-y-4 text-lg text-ink-2 leading-relaxed">
                        <p>
                            Because it&apos;s built inside your own accounts, your data never
                            moves into ours. It stays where it lives today.
                        </p>
                        <p>
                            We sign a confidentiality agreement before we look at anything.
                            If your industry has rules about client information, we build to them.
                        </p>
                        <p>
                            Our access is yours to revoke. Any day, with one click, including
                            after week eight.
                        </p>
                    </div>
                </motion.div>

                {/* Guarantee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12"
                >
                    <div className="font-semibold text-xs uppercase tracking-[0.18em] text-accent-ink mb-4">
                        The guarantee
                    </div>
                    <p className="text-2xl md:text-3xl font-display font-bold uppercase tracking-[0.005em] text-foreground leading-[1.05] max-w-3xl">
                        At the end of week eight: keep the system, or hand it back and{' '}
                        <span className="text-accent-ink">get your money back. All of it.</span>
                    </p>
                    <p className="mt-4 text-ink-2 text-lg max-w-3xl">
                        The mechanics, plainly: you decide at the end of week eight. Hand it
                        back means we disconnect the layer and refund the sprint in full.
                        Your tools, your data and your accounts stay exactly as they were.
                    </p>
                    <div className="mt-8">
                        <div onClick={onOpenContact} className="inline-block">
                            <Button variant="outline" icon>Book a call</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* ------------------------------------ FAQ ----------------------------------- */

const faqs = [
    {
        q: 'What does it cost?',
        a: 'A fixed, once-off fee for the whole sprint, agreed in writing before week one starts, and the guarantee applies to all of it. No subscription to us afterwards. The only ongoing cost is the AI’s own usage, billed to your account directly: for most businesses that’s closer to a phone bill than a salary.',
    },
    {
        q: 'Which tools does it work with?',
        a: 'The ones you already use. Email, WhatsApp, Xero or your bookkeeping tool, spreadsheets, your client list, your project board. Online store, booking calendar, warehouse system: same story. We map your exact stack in week one and tell you then if something can’t connect, before anything is built.',
    },
    {
        q: 'Who fixes it if something breaks in month three?',
        a: 'If you’re on the optional retainer, we do, as part of it. If you’re not, your team uses the documentation from the handover, or you call us in for the fix. Either way you’re never locked out of your own system: it runs on your accounts and your team holds the keys.',
    },
    {
        q: 'We handle sensitive information. Patients, legal files, payroll. Still fine?',
        a: 'Yes, and that changes how we build, not whether we can. Regulated information gets stricter rules: tighter access, human sign-off on anything that touches it, and we build to your industry’s requirements, not around them. On the first call we’ll walk you through exactly how, for your specific rules.',
    },
    {
        q: 'My team isn’t technical. Will they actually use it?',
        a: 'The usual reason a new system dies is that it was built for a generic company, and your team is forced to bend around how it thinks work should happen. This is the opposite: every piece is built for your team, around the way they already work, connected to the tools they already use. And it goes in live, one piece at a time, with training every week, so by week eight they’re running on it, not figuring it out.',
    },
];

const FAQItem: React.FC<{ q: string; a: string; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle }) => (
    <div className="border-b border-line">
        <button
            onClick={onToggle}
            aria-expanded={open}
            className="w-full py-6 flex items-center justify-between gap-6 text-left group"
        >
            <span className="font-display uppercase tracking-[0.005em] text-lg md:text-xl font-semibold text-foreground group-hover:text-accent-ink transition-colors">
                {q}
            </span>
            <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2, ease }}
                className="text-accent-ink text-2xl leading-none shrink-0"
                aria-hidden
            >
                +
            </motion.span>
        </button>
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-ink-2 text-lg leading-relaxed max-w-2xl">{a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <section className="py-28 md:py-32 border-b border-line">
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-5xl font-bold text-foreground  mb-12"
                >
                    The questions you&apos;re probably asking.
                </motion.h2>
                <div className="border-t border-line">
                    {faqs.map((f, i) => (
                        <FAQItem
                            key={f.q}
                            q={f.q}
                            a={f.a}
                            open={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* --------------------------------- Final CTA ------------------------------- */

const FinalCTA: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
    return (
        <section className="py-28 md:py-36">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-display uppercase tracking-[0.005em] text-4xl md:text-6xl font-bold text-foreground  mb-6"
                >
                    See what yours would look like.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="text-lg md:text-xl text-ink-2 leading-relaxed mb-10 max-w-xl mx-auto"
                >
                    A 30-minute call. We map where your hours go and show you what an
                    operating system would change. No pitch deck. And the sprint itself is
                    money-back guaranteed, so the risk stays ours.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease }}
                >
                    <div onClick={onOpenContact} className="inline-block">
                        <Button variant="primary" icon>Book a call</Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

/* ----------------------------------- Page ---------------------------------- */

const OSSprintPage: React.FC = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const openContact = () => setIsContactModalOpen(true);

    return (
        <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-background">
            <Navbar onOpenContact={openContact} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <main>
                <Hero onOpenContact={openContact} />
                <TheProblem />
                <TheShift />
                <WhatItIs />
                <WhatItDoes />
                <CaseStudies />
                <WhoItsFor />
                <TheSprint />
                <Ownership onOpenContact={openContact} />
                <FAQ />
                <FinalCTA onOpenContact={openContact} />
            </main>
            <Footer onOpenContact={openContact} />
        </div>
    );
};

export default OSSprintPage;
