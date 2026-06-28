import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ParallaxGrid from '../ui/ParallaxGrid';

interface HeroProps {
  onOpenContact: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 overflow-hidden bg-background border-b border-foreground/5 pt-24">
      <ParallaxGrid color="255, 255, 255" opacity={0.18} />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: the pitch */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-[0.18em] uppercase">
              An AI Chief of Staff
            </span>
          </motion.div>

          <h1 className="font-display font-bold text-foreground tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[5rem]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="block"
            >
              Your next hire
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="block"
            >
              isn't a <span className="text-primary">person.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease }}
            className="mt-7 max-w-lg text-lg md:text-xl text-muted leading-relaxed"
          >
            It's a right hand that runs your operations, never quits, and{' '}
            <span className="text-foreground font-medium">belongs to you.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="mt-9"
          >
            <div onClick={onOpenContact} className="inline-block">
              <Button variant="primary" icon>Book a call</Button>
            </div>
          </motion.div>
        </div>

        {/* Right: the cornerstone, the brand made literal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10">
            <img
              src="/images/cornerstone-hero.jpg"
              alt="A cornerstone block set in a foundation, lit gold"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
