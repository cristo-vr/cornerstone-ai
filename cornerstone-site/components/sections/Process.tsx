import React from 'react';
import { motion } from 'framer-motion';
import { Search, Hammer, Rocket } from 'lucide-react';
import { ProcessStep } from '../../types';

const steps: ProcessStep[] = [
  {
    phase: "01",
    title: "The Blueprint",
    duration: "In and Out. 5 Days.",
    description: (
      <div className="space-y-4">
        <p>
          No endless consulting. Give us 5 days to find exactly where "robot work" is killing your capacity.
        </p>
        <p>
          We don't do fluff decks. You get a specific execution plan: what to build, what it costs, and the exact ROI. <span className="text-brand-white font-medium">You see the full solution before you pay a cent for the build.</span>
        </p>
      </div>
    )
  },
  {
    phase: "02",
    title: "The Build",
    duration: "We Build It",
    description: (
      <div className="space-y-4">
        <p>
          We don't sell generic software. We engineer the specific tools your agency is missing.
        </p>
        <p>
          We don't make you wait months for a "big reveal." We ship features weekly, stacking wins so you feel the impact immediately.
        </p>
        <p className="text-brand-white font-medium">
          You own every line of code—these are permanent assets, not rented tools.
        </p>
      </div>
    )
  },
  {
    phase: "03",
    title: "The Handover",
    duration: "Adoption is the Only Metric",
    description: (
      <div className="space-y-4">
        <p>
          The best system is worthless if your team hates it. We don't just email a login and vanish.
        </p>
        <p>
          We train your team, refine the tools, and <span className="text-brand-white font-medium">ensure they prefer the new way.</span>
        </p>
      </div>
    )
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 bg-charcoal border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-brand-white mb-4 tracking-tighter">
              Zero Fluff. <br />
              <span className="text-brand-gold">Maximum Velocity.</span>
            </h2>
            <p className="text-brand-gray max-w-md">No 200-slide presentations. Just deployed code and measurable efficiency gains.</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-neutral-700"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-brand-black border border-neutral-800 p-8 h-full flex flex-col justify-between group hover:border-neutral-600 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-5xl font-bold text-neutral-800 group-hover:text-brand-gold/20 transition-colors select-none">
                    {step.phase}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-gold border border-brand-gold/20 px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-brand-white mb-4">{step.title}</h3>
                <p className="text-brand-gray text-sm leading-7">
                  {step.description}
                </p>
              </div>

              <div className="w-full h-1 bg-neutral-900 mt-8 overflow-hidden">
                <div className="h-full bg-brand-gold w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;