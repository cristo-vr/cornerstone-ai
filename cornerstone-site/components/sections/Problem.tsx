import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Users, Zap } from 'lucide-react';

const Problem: React.FC = () => {
  return (
    <section className="py-32 bg-brand-black border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-brand-white tracking-tighter mb-6"
          >
            The <span className="text-red-500">Capacity Ceiling</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-gray max-w-2xl mx-auto font-light"
          >
            You are running a founder-led agency. You have the vision, and the clients who love you. <br />
            <span className="text-brand-white font-medium">But your operations are fragile.</span>
          </motion.p>
        </div>

        {/* The Dilemma - Two Bad Choices */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Choice 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative p-8 rounded-xl border border-white/10 bg-neutral-900/50 hover:bg-neutral-900/80 transition-all duration-300 hover:border-red-500/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-brand-white">Sell More</h3>
            </div>
            <p className="text-brand-gray text-lg leading-relaxed">
              If you push sales, your team burns out. Quality drops, churn spikes, and you become the firefighter-in-chief.
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs font-mono uppercase tracking-widest">
              Burnout Risk
            </div>
          </motion.div>

          {/* Choice 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative p-8 rounded-xl border border-white/10 bg-neutral-900/50 hover:bg-neutral-900/80 transition-all duration-300 hover:border-red-500/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-brand-white">Hire More</h3>
            </div>
            <p className="text-brand-gray text-lg leading-relaxed">
              If you hire recklessly, your margins vanish. You take on management debt and spend more time training than billing.
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs font-mono uppercase tracking-widest">
              Margin Compression
            </div>
          </motion.div>
        </div>

        {/* The Symptom & Reality */}
        {/* The Symptom & Reality */}
        <div className="max-w-4xl mx-auto space-y-12 pt-12 border-t border-white/5">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 p-8 rounded-lg border-l-4 border-brand-gray"
          >
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-brand-gray shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-brand-white mb-2">The Symptom</h4>
                <p className="text-brand-gray text-lg">
                  You find yourself <span className="text-brand-white italic">"throttling"</span> your own growth.
                  You stop marketing because operations feels like a house of cards.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-brand-gold/10 to-transparent p-8 rounded-lg border border-brand-gold/30 text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-brand-gold/20 rounded-full text-brand-gold mb-6">
              <Zap className="w-8 h-8 fill-brand-gold" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">
              The Reality
            </h3>
            <p className="text-xl md:text-2xl text-brand-gray font-light">
              You don’t need more talent yet. <span className="text-brand-gold font-bold">You need Capacity.</span>
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Problem;