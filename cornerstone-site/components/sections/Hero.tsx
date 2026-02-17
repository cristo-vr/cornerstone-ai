import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ParallaxGrid from '../ui/ParallaxGrid';

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden bg-background border-b border-foreground/5 pt-20">
      {/* Background Grid - Technical aesthetic */}
      {/* Background Grid - Technical aesthetic */}
      <ParallaxGrid color="255, 255, 255" opacity={0.25} />

      {/* Animated Gradient Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 bg-primary"></div>
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            The FSP Operations Accelerator
          </span>
        </motion.div>

        {/* Main Headline Block */}
        <div className="flex flex-col gap-2 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter leading-[0.9]"
          >
            THE <br className="hidden md:block" /> OPERATING SYSTEM
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-muted tracking-tighter mt-2"
          >
            FOR FAST GROWING FSP'S
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 inline-block"
          >
            <span className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground tracking-tight italic">
              UNLOCK 20+ HOURS EACH WEEK.
            </span>
          </motion.div>
        </div>

        {/* Bottom Section: Subtext & CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-12 border-t border-foreground/10 pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xl"
          >
            <p className="text-foreground text-lg md:text-xl font-light leading-relaxed">
              Your FSP has outgrown spreadsheets. <br />
              <span className="font-medium text-muted">We build the operational backbone to match your ambition.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex gap-4"
          >
            <div onClick={onOpenContact}>
              <Button variant="primary" icon>Book Your Discovery</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;