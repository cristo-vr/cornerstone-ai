import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Activity, Plus } from 'lucide-react';
import Button from '../ui/Button';

const GrowthSimulator: React.FC = () => {
    const [clients, setClients] = useState(3);
    const [showFab, setShowFab] = useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);

    // Track visibility and viewport for FAB
    React.useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const isMobile = window.innerWidth < 1024;
            // Show FAB if:
            // 1. We are on mobile
            // 2. Variable (Controls) part is scrolled past (approx top < 0)
            // 3. We are still inside the section (bottom > windowHeight/2)
            // Actually simpler: Show FAB if the top of the section is near top of viewport, and we haven't scrolled past the bottom.
            const isInView = rect.top < 100 && rect.bottom > window.innerHeight / 2;

            setShowFab(isMobile && isInView);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        // Initial check
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Simulation Logic
    // Traditional: Hires every 3 clients. Stress increases 10% per client. Margin drops 5% per hire.
    // Cornerstone: Team stays flat. Stress increases 2% per client. Margin grows.

    const maxClients = 15;

    const addClient = () => {
        if (clients < maxClients) {
            setClients(prev => prev + 1);
        }
    };

    const resetValues = () => {
        setClients(3);
    };

    const calculateMetrics = (isCornerstone: boolean) => {
        const teamSize = isCornerstone ? 2 : Math.ceil(clients / 3) + 1; // Base team of 2
        const stress = isCornerstone
            ? Math.min(20 + (clients * 2), 40) // Cap stress at 40%
            : Math.min(20 + (clients * 8), 100);

        // Margin Calculation (Abstract visual score)
        // Cornerstone margins grow with scale (economies of scale)
        // Traditional margins compress due to hiring
        const baseRevenue = clients * 10;
        const costPerHead = 20;
        const profit = baseRevenue - (teamSize * costPerHead);

        // Normalize margin 0-100 for visual bar
        const margin = isCornerstone
            ? 40 + (clients * 3)
            : 40 - (Math.floor(clients / 3) * 5);

        return { teamSize, stress, margin };
    };

    const standard = calculateMetrics(false);
    const cornerstone = calculateMetrics(true);

    return (
        <section ref={sectionRef} className="py-24 bg-background border-t border-foreground/5 relative">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Controls & Context */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 static">
                        <div className="mb-6 lg:mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                                The <span className="text-primary">Leverage</span> Game
                            </h2>
                            <p className="text-muted text-lg leading-relaxed">
                                See what happens when you scale with Capacity vs. Bodies.
                                <br /><br />
                                Most agencies break because revenue tracks linearly with headcount.
                                <span className="text-foreground font-bold"> Real leverage means decoupling them.</span>
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4 h-auto relative">
                            {/* Placeholder to prevent layout shift when buttons become fixed */}
                            {showFab && <div className="w-full h-[100px] lg:h-[120px]" />}

                            <AnimatePresence>
                                {!showFab ? (
                                    <>
                                        <motion.button
                                            layoutId="sign-client-trigger"
                                            onClick={addClient}
                                            disabled={clients >= maxClients}
                                            className="group relative w-full inline-flex items-center justify-center gap-2 lg:gap-3 px-4 py-3 lg:px-8 lg:py-5 bg-primary text-background font-bold text-base lg:text-xl tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_80%)]"
                                        >
                                            <Plus className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-90 transition-transform" />
                                            Sign New Client <span className="text-xs lg:text-sm opacity-70 ml-1 bg-black/20 px-2 py-0.5 rounded-full normal-case tracking-normal whitespace-nowrap">(Try Me)</span>
                                        </motion.button>

                                        <motion.button
                                            layoutId="reset-sim-trigger"
                                            onClick={resetValues}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 border border-white/5 text-neutral-400 font-medium text-xs uppercase tracking-widest hover:text-white hover:border-white/20 transition-all rounded-sm"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                                            Reset Simulator
                                        </motion.button>
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
                                            Sign Client
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

                        {/* Traditional Agency */}
                        <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden transition-all duration-300">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700" />

                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-muted flex items-center gap-3">
                                    <Briefcase className="w-5 h-5" />
                                    Standard Agency
                                </h3>
                                <div className="text-xs font-mono uppercase text-neutral-500 tracking-widest bg-neutral-900 px-2 py-1 rounded">
                                    Linear Scaling
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6">
                                {/* Team Size Visualization */}
                                <div className="sm:col-span-3">
                                    <div className="text-xs text-muted mb-3 uppercase tracking-wider font-mono">Team Size</div>
                                    <div className="flex flex-wrap gap-2">
                                        <AnimatePresence>
                                            {[...Array(standard.teamSize)].map((_, i) => (
                                                <motion.div
                                                    key={`std-team-${i}`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-5 h-5 sm:w-8 sm:h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400"
                                                >
                                                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Margin Bar */}
                                <div className="sm:col-span-2">
                                    <div className="text-xs text-muted mb-2 uppercase tracking-wider font-mono flex justify-between">
                                        <span>Profit Margin</span>
                                        <span className="text-neutral-500">Compressing</span>
                                    </div>
                                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-neutral-500"
                                            animate={{ width: `${Math.max(standard.margin, 5)}%` }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        />
                                    </div>
                                </div>

                                {/* Stress Gauge */}
                                <div className="sm:col-span-1">
                                    <div className="text-xs text-muted mb-2 uppercase tracking-wider font-mono">Stress</div>
                                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-neutral-600 to-red-900"
                                            animate={{ width: `${standard.stress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cornerstone Agency */}
                        <div className="bg-gradient-to-br from-background to-primary/5 border border-primary/20 p-8 rounded-2xl relative overflow-hidden shadow-[0_0_30px_color-mix(in_srgb,var(--color-primary),transparent_95%)] transition-all duration-300">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Cornerstone Model
                                </h3>
                                <div className="text-xs font-mono uppercase text-primary tracking-widest bg-primary/10 px-2 py-1 rounded">
                                    Operational Leverage
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6">
                                {/* Team Size Visualization */}
                                <div className="sm:col-span-3">
                                    <div className="text-xs text-primary/60 mb-3 uppercase tracking-wider font-mono">Team Size</div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <AnimatePresence>
                                            {[...Array(cornerstone.teamSize)].map((_, i) => (
                                                <motion.div
                                                    key={`cs-team-${i}`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-5 h-5 sm:w-8 sm:h-8 bg-primary text-background rounded-full flex items-center justify-center shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary),transparent_60%)]"
                                                >
                                                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        <span className="text-xs text-primary/50 ml-2 font-mono border border-primary/20 px-2 py-1 rounded-full">
                                            + {clients * 2}0h Automation
                                        </span>
                                    </div>
                                </div>

                                {/* Margin Bar */}
                                <div className="sm:col-span-2">
                                    <div className="text-xs text-primary/60 mb-2 uppercase tracking-wider font-mono flex justify-between">
                                        <span>Profit Margin</span>
                                        <span className="text-primary">Expanding</span>
                                    </div>
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 10px color-mix(in_srgb,var(--color-primary),transparent_50%)' }}
                                            animate={{ width: `${Math.min(cornerstone.margin, 100)}%` }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        />
                                    </div>
                                </div>

                                {/* Stress Gauge */}
                                <div className="sm:col-span-1">
                                    <div className="text-xs text-primary/60 mb-2 uppercase tracking-wider font-mono">Stress</div>
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary/40"
                                            animate={{ width: `${cornerstone.stress}%` }}
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
