import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Activity, Plus } from 'lucide-react';
import Button from '../ui/Button';

const GrowthSimulator: React.FC = () => {
    const [clients, setClients] = useState(3);

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
        <section className="py-24 bg-brand-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Controls & Context */}
                    <div className="lg:col-span-5 sticky top-24">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-6">
                                The <span className="text-brand-gold">Leverage</span> Game
                            </h2>
                            <p className="text-brand-gray text-lg leading-relaxed">
                                See what happens when you scale with Capacity vs. Bodies.
                                <br /><br />
                                Most agencies break because revenue tracks linearly with headcount.
                                <span className="text-brand-white font-bold"> Real leverage means decoupling them.</span>
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <button
                                onClick={addClient}
                                disabled={clients >= maxClients}
                                className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-brand-gold text-brand-black font-bold text-xl tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                Sign New Client <span className="text-sm opacity-70 ml-1 bg-black/20 px-2 py-0.5 rounded-full normal-case tracking-normal">(Try Me)</span>
                            </button>

                            {clients > 3 && (
                                <button
                                    onClick={resetValues}
                                    className="w-full text-center text-sm text-brand-gray hover:text-white underline decoration-dotted py-2"
                                >
                                    Reset Simulation
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Results Stacked */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Traditional Agency */}
                        <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden transition-all duration-300">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700" />

                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-brand-gray flex items-center gap-3">
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
                                    <div className="text-xs text-brand-gray mb-3 uppercase tracking-wider font-mono">Team Size</div>
                                    <div className="flex flex-wrap gap-2">
                                        <AnimatePresence>
                                            {[...Array(standard.teamSize)].map((_, i) => (
                                                <motion.div
                                                    key={`std-team-${i}`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400"
                                                >
                                                    <Users className="w-4 h-4" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Margin Bar */}
                                <div className="sm:col-span-2">
                                    <div className="text-xs text-brand-gray mb-2 uppercase tracking-wider font-mono flex justify-between">
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
                                    <div className="text-xs text-brand-gray mb-2 uppercase tracking-wider font-mono">Stress</div>
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
                        <div className="bg-gradient-to-br from-brand-black to-brand-gold/5 border border-brand-gold/20 p-8 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-300">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold" />

                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-brand-white flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-brand-gold" />
                                    Cornerstone Model
                                </h3>
                                <div className="text-xs font-mono uppercase text-brand-gold tracking-widest bg-brand-gold/10 px-2 py-1 rounded">
                                    Operational Leverage
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6">
                                {/* Team Size Visualization */}
                                <div className="sm:col-span-3">
                                    <div className="text-xs text-brand-gold/60 mb-3 uppercase tracking-wider font-mono">Team Size</div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <AnimatePresence>
                                            {[...Array(cornerstone.teamSize)].map((_, i) => (
                                                <motion.div
                                                    key={`cs-team-${i}`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-8 h-8 bg-brand-gold text-brand-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                                >
                                                    <Users className="w-4 h-4" />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        <span className="text-xs text-brand-gold/50 ml-2 font-mono border border-brand-gold/20 px-2 py-1 rounded-full">
                                            + {clients * 2}0h Automation
                                        </span>
                                    </div>
                                </div>

                                {/* Margin Bar */}
                                <div className="sm:col-span-2">
                                    <div className="text-xs text-brand-gold/60 mb-2 uppercase tracking-wider font-mono flex justify-between">
                                        <span>Profit Margin</span>
                                        <span className="text-brand-gold">Expanding</span>
                                    </div>
                                    <div className="h-2 bg-brand-gold/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-brand-goldShadow"
                                            style={{ backgroundColor: '#D4AF37', boxShadow: '0 0 10px rgba(212,175,55,0.5)' }}
                                            animate={{ width: `${Math.min(cornerstone.margin, 100)}%` }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        />
                                    </div>
                                </div>

                                {/* Stress Gauge */}
                                <div className="sm:col-span-1">
                                    <div className="text-xs text-brand-gold/60 mb-2 uppercase tracking-wider font-mono">Stress</div>
                                    <div className="h-2 bg-brand-gold/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-brand-gold/40"
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
