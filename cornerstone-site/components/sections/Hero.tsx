import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden bg-brand-black border-b border-white/5 pt-20">
      {/* Background Grid - Technical aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* Animated Gradient Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 bg-brand-gold"></div>
          <span className="text-brand-gold font-mono text-sm tracking-widest uppercase">
            We engineer capacity for founder-led agencies
          </span>
        </motion.div>

        {/* Main Headline Block */}
        <div className="flex flex-col gap-2 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-white tracking-tighter leading-[0.9]"
          >
            HANDLE 2x <br className="hidden md:block" /> THE RETAINERS.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-gray tracking-tighter mt-2"
          >
            WITH THE SAME TEAM.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 inline-block"
          >
            <span className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 tracking-tight italic">
              THAT'S CAPACITY.
            </span>
          </motion.div>
        </div>

        {/* Bottom Section: Subtext & CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-12 border-t border-white/10 pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xl"
          >
            <p className="text-brand-white text-lg md:text-xl font-light leading-relaxed">
              No more theoreticals. <br />
              <span className="font-medium text-brand-gray">Straightforward strategy, Tangible impact.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex gap-4"
          >
            <div onClick={onOpenContact}>
              <Button variant="primary" icon>See If We Can Help</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;