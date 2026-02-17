import React from 'react';
import { motion } from 'framer-motion';
import { Search, Hammer, Rocket } from 'lucide-react';
import { ProcessStep } from '../../types';

const steps: ProcessStep[] = [
  {
    phase: "01",
    title: "Discovery",
    duration: "5 Days. In and Out.",
    description: (
      <div className="space-y-4">
        <p>
          We embed with your team for one week. We map every process across Acquisition, Service, and Visibility — where the hours disappear, where data leaks, where the bottlenecks hide.
        </p>
        <p>
          You get a concrete execution plan: what we'll build, in what order, and the exact hours your team will recover. <span className="text-foreground font-medium">You see the full picture before you spend a cent on the build.</span>
        </p>
      </div>
    )
  },
  {
    phase: "02",
    title: "Development",
    duration: "6 Weeks. Stacked Live.",
    description: (
      <div className="space-y-4">
        <p>
          We build your systems one pillar at a time. Each module goes live the moment it's ready — your team starts using it immediately. No six-month "big bang" launch. No surprises.
        </p>
        <p className="text-foreground font-medium">
          Every system is yours. Built on your existing tools. Nothing rented.
        </p>
      </div>
    )
  },
  {
    phase: "03",
    title: "Adoption",
    duration: "Until It Sticks.",
    description: (
      <div className="space-y-4">
        <p>
          The best system is worthless if your team opens the spreadsheet out of habit. We train every user, handle the edge cases, and stay until the new way is the default way.
        </p>
        <p>
          <span className="text-foreground font-medium">We measure adoption, not delivery. If your team isn't using it confidently, we're not done.</span>
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
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tighter">
              Zero Disruption. <br />
              <span className="text-primary">Maximum Adoption.</span>
            </h2>
            <p className="text-muted max-w-md">Your team keeps working. We build around them. Systems go live one at a time.</p>
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
              className="relative bg-background border border-neutral-800 p-8 h-full flex flex-col justify-between group hover:border-neutral-600 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-5xl font-bold text-neutral-800 group-hover:text-primary/20 transition-colors select-none">
                    {step.phase}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-primary border border-primary/20 px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <div className="text-muted text-sm leading-7">
                  {step.description}
                </div>
              </div>

              <div className="w-full h-1 bg-neutral-900 mt-8 overflow-hidden">
                <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;