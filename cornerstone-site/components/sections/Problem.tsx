import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Users, Zap } from 'lucide-react';
import ParallaxGrid from '../ui/ParallaxGrid';

const Problem: React.FC = () => {
  return (
    <section className="py-32 bg-background border-t border-foreground/5 relative overflow-hidden">
      {/* Background Ambience */}
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Parallax Grid */}
      <ParallaxGrid color="255, 255, 255" opacity={0.15} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter mb-6"
          >
            The <span className="text-red-500">Operations Trap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-2xl mx-auto font-light"
          >
            You built something real. Your team is good. Your clients trust you. <br />
            <span className="text-foreground font-medium">But behind the scenes? It's held together with spreadsheets, willpower, and you.</span>
          </motion.p>
        </div>

        {/* Bridge Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-foreground font-medium text-lg">
            Right now, you're stuck with two options — and neither one works:
          </p>
        </motion.div>

        {/* The Dilemma - Two Bad Choices */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Choice 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative p-8 rounded-xl border border-foreground/10 bg-neutral-900/50 hover:bg-neutral-900/80 transition-all duration-300 hover:border-red-500/30"
          >
            <div className="absolute top-4 left-0 right-0 text-center">
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Option A</span>
            </div>
            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Scale Revenue</h3>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              Sign more clients and your admin team drowns. Important details slip through the cracks, onboarding backs up, and your best people spend half their day chasing paperwork instead of closing deals or serving clients.
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs font-mono uppercase tracking-widest">
              Quality Risk
            </div>
          </motion.div>

          {/* Choice 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative p-8 rounded-xl border border-foreground/10 bg-neutral-900/50 hover:bg-neutral-900/80 transition-all duration-300 hover:border-red-500/30"
          >
            <div className="absolute top-4 left-0 right-0 text-center">
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Option B</span>
            </div>
            <div className="flex items-center gap-4 mb-6 mt-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Hire More Admin</h3>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              Throw bodies at the problem and your margins vanish. You end up managing people who manage spreadsheets. The data is still fragmented — just spread across more desks.
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs font-mono uppercase tracking-widest">
              Margin Erosion
            </div>
          </motion.div>
        </div>

        {/* The Symptom & Reality */}
        <div className="max-w-4xl mx-auto space-y-12 pt-12 border-t border-white/5">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 p-8 rounded-lg border-l-4 border-muted"
          >
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-muted shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">The Symptom</h4>
                <p className="text-muted text-lg">
                  You find yourself <span className="text-foreground italic">capping your own</span> growth.
                  You stop recruiting, pause marketing, and say no to opportunities — because taking on anything more might break what barely works.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-lg border border-primary/30 text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full text-primary mb-6">
              <Zap className="w-8 h-8 fill-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Reality
            </h3>
            <p className="text-xl md:text-2xl text-muted font-light">
              You don't need more admin staff. <span className="text-primary font-bold">You need operational infrastructure.</span>
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Problem;