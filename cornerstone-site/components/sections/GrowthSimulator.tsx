import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, TrendingUp, Database, Clock } from 'lucide-react';

const GrowthSimulator: React.FC = () => {
    const [clients, setClients] = useState(10); // Start with 10 clients
    const [showFab, setShowFab] = useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const maxClients = 50;

    // Track visibility and viewport for FAB
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const isMobile = window.innerWidth < 1024;
            // Show FAB if top is near viewport top and not scrolled past bottom
            const isInView = rect.top < 100 && rect.bottom > window.innerHeight / 2;
            setShowFab(isMobile && isInView);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const addClient = () => {
        if (clients < maxClients) {
            setClients((prev) => Math.min(prev + 5, maxClients));
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    const resetValues = () => {
        setClients(10);
    };

    // --- NEW SIMULATION LOGIC ---
    const calculateMetrics = (isCornerstone: boolean) => {
        // Admin Staff Calculation
        const adminStaff = isCornerstone
            ? 1 // Auto-pilot: minimal staff needed even at scale
            : 1 + Math.floor((clients - 10) / 10); // Manual: Starts at 1, goes up with scale

        // Profit Margin Calculation (0-100%)
        // If revenue scales 5x (10 -> 50) and costs remain flat, margins multiply.
        const profitMargin = isCornerstone
            ? Math.min(25 + (clients - 10) * 1.5, 85) // Margins expand exponentially as revenue divorces cost
            : Math.max(25 - (clients - 10) * 0.35, 10); // Margins get crushed due to admin bloat

        // Owner Hours on Ops Calculation (Hours/week)
        const ownerHoursOnOps = isCornerstone
            ? 5 // Low and flat
            : Math.min(10 + (clients - 10) * 1.25, 60); // Scales linearly to burnout

        return { adminStaff, profitMargin, ownerHoursOnOps };
    };

    const spreadsheetMetrics = calculateMetrics(false);
    const cornerstoneMetrics = calculateMetrics(true);

    return (
        <section ref={sectionRef} className="py-24 bg-background border-t border-foreground/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Controls & Context */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 static">
                        <div className="mb-6 lg:mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                                The <span className="text-primary">Scaling</span> Reality
                            </h2>
                            <p className="text-muted text-lg leading-relaxed">
                                Most founders hit a wall because every new client adds admin load that scales linearly. <br />
                                <span className="text-foreground font-bold">Operational infrastructure breaks that equation — and gives you your margins and your time back.</span>
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4 h-auto relative">
                            {/* Placeholder to prevent layout shift when buttons become fixed */}
                            {showFab && <div className="w-full h-[100px] lg:h-[120px]" />}

                            <AnimatePresence>
                                {!showFab ? (
                                    <>
                                        <button
                                            onClick={addClient}
                                            disabled={clients >= maxClients}
                                            className="group relative w-full inline-flex items-center justify-center gap-2 lg:gap-3 px-4 py-3 lg:px-8 lg:py-5 bg-primary text-background font-bold text-base lg:text-xl tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_80%)]"
                                        >
                                            <Plus className={`w-5 h-5 lg:w-6 lg:h-6 ${isAnimating ? 'animate-spin' : ''}`} />
                                            {clients >= maxClients ? 'Max Clients' : 'Onboard New Clients'} <span className="text-xs lg:text-sm opacity-70 ml-1 bg-black/20 px-2 py-0.5 rounded-full normal-case tracking-normal whitespace-nowrap">(Try Me)</span>
                                        </button>

                                        <button
                                            onClick={resetValues}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 border border-white/5 text-neutral-400 font-medium text-xs uppercase tracking-widest hover:text-white hover:border-white/20 transition-all rounded-sm"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                            Reset Simulator
                                        </button>
                                    </>
                                ) : (
                                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-max pointer-events-none">
                                        <motion.button
                                            layoutId="sign-client-trigger"
                                            onClick={addClient}
                                            disabled={clients >= maxClients}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 100, opacity: 0 }}
                                            className="pointer-events-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-bold text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-full border border-white/20"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Clients
                                        </motion.button>

                                        <motion.button
                                            layoutId="reset-sim-trigger"
                                            onClick={resetValues}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 100, opacity: 0 }}
                                            className="pointer-events-auto flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-neutral-400 hover:text-white border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-full font-medium text-sm tracking-widest uppercase"
                                        >
                                            <div className="w-2 h-2 rounded-sm border border-current" />
                                            Reset
                                        </motion.button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Results Stacked */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* TRADITIONAL OPS CARD (The "Before") */}
                        <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden transition-all duration-300">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700" />
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-muted mb-1">Traditional Operations</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-white">{clients}</span>
                                        <span className="text-neutral-500 text-sm uppercase tracking-wider">Clients</span>
                                    </div>
                                </div>
                                <div className="text-xs font-mono uppercase text-neutral-500 tracking-widest bg-neutral-900 px-2 py-1 rounded">
                                    Manual Scaling
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Metric 1: Admin Headcount */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-neutral-400">
                                            <User className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Admin Headcount</span>
                                        </div>
                                        <span className="text-red-400 font-bold text-sm">{spreadsheetMetrics.adminStaff} Staff</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {Array.from({ length: spreadsheetMetrics.adminStaff }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-3 h-3 rounded-full bg-red-500/50"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Metric 2: Profit Margin */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-neutral-400">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Profit Margin</span>
                                        </div>
                                        <span className="text-red-400 font-bold text-sm">{Math.round(spreadsheetMetrics.profitMargin)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden mb-1">
                                        <motion.div
                                            className="h-full bg-red-500"
                                            initial={{ width: '50%' }}
                                            animate={{ width: `${spreadsheetMetrics.profitMargin}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                        />
                                    </div>
                                    <p className="text-right text-[10px] text-red-500 uppercase tracking-wider">Crushed</p>
                                </div>

                                {/* Metric 3: Owner Hours */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-neutral-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Your Hours Trapped in Ops/wk</span>
                                        </div>
                                        <span className="text-red-400 font-bold text-sm">{Math.round(spreadsheetMetrics.ownerHoursOnOps)}h</span>
                                    </div>
                                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                                            initial={{ width: '20%' }}
                                            animate={{ width: `${(spreadsheetMetrics.ownerHoursOnOps / 60) * 100}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AUTOMATED OPS CARD (The "After") */}
                        <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 rounded-2xl p-8 border border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Automated Operations</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-primary">{clients}</span>
                                        <span className="text-neutral-400 text-sm uppercase tracking-wider">Clients</span>
                                    </div>
                                </div>
                                <div className="text-xs font-mono uppercase text-primary tracking-widest bg-primary/20 px-2 py-1 rounded border border-primary/20">
                                    Systems-Driven
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Metric 1: Admin Headcount */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-white">
                                            <User className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Admin Headcount</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30">
                                                + Automated
                                            </span>
                                            <span className="text-primary font-bold text-sm">{cornerstoneMetrics.adminStaff} Staff</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                        {Array.from({ length: cornerstoneMetrics.adminStaff }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Metric 2: Profit Margin */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-white">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Profit Margin</span>
                                        </div>
                                        <span className="text-primary font-bold text-sm">{Math.round(cornerstoneMetrics.profitMargin)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden mb-1">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: '60%' }}
                                            animate={{ width: `${cornerstoneMetrics.profitMargin}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                        />
                                    </div>
                                    <p className="text-right text-[10px] text-primary uppercase tracking-wider">Expanding</p>
                                </div>

                                {/* Metric 3: Owner Hours */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-wide">Your Hours Trapped in Ops/wk</span>
                                        </div>
                                        <span className="text-primary font-bold text-sm">{Math.round(cornerstoneMetrics.ownerHoursOnOps)}h</span>
                                    </div>
                                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary/50"
                                            initial={{ width: '10%' }}
                                            animate={{ width: `${(cornerstoneMetrics.ownerHoursOnOps / 60) * 100}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthSimulator;
