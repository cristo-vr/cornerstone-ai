import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-black">
      {/* Background Grid & Nodes */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Abstract Node Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-brand-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.path
            d="M 25% 25% L 75% 66%"
            className="stroke-brand-gold"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 border border-neutral-700 rounded-full text-xs font-medium text-brand-gold tracking-[0.2em] mb-6 bg-white/5 backdrop-blur-sm">
            AI INFRASTRUCTURE FOR ENTERPRISE
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-brand-white mb-8 leading-[1.1]">
            Scale Without <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-gray-400 to-gray-600">The Sprawl.</span>
          </h1>

          <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Break the linear growth trap. We deploy AI infrastructure that creates capacity,
            increases margins, and lets your team focus on the work that matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" icon>Audit Your Capacity</Button>
            <Button variant="ghost">View Case Studies</Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Footer Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;