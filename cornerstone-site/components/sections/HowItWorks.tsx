import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-28 md:py-32 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-7"
            >
              Eight weeks. We build it with you, live.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="space-y-5 text-lg text-muted leading-relaxed"
            >
              <p>
                It starts with a workshop. We sit down with you to understand exactly what your
                business needs and where the time is bleeding out. Then it's eight weeks of our
                dedicated time, embedded with your team, building the real thing.
              </p>
              <p>
                We don't disappear for two months and hand back a finished box. We build one piece at
                a time and put it to work the moment it's ready. Some pieces take a few hours, others
                take a few days. Every week we sit with your team to train them on what's new, so by
                week eight they're running on it, not figuring it out.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10">
              <img
                src="/images/blueprint.jpg"
                alt="A building blueprint on a drafting table under warm light"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Eight-week rail */}
        <div className="mt-16 mb-20">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.14em] text-muted mb-4">
            <span>Workshop</span>
            <span className="text-foreground">Building live, every week</span>
            <span>You own it</span>
          </div>
          <div className="relative h-px bg-foreground/15">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.1, ease }}
              style={{ originX: 0 }}
              className="absolute inset-0 h-px bg-gradient-to-r from-primary to-primary/40"
            />
            <div className="absolute inset-0 flex justify-between items-center">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === 0 || i === 8 ? 'bg-primary' : 'bg-foreground/25'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-muted/70 mt-3">
            <span>Wk 1</span>
            <span>Wk 8</span>
          </div>
        </div>

        {/* Guarantee band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12"
        >
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-[0.18em]">Our guarantee</span>
          </div>
          <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-snug">
            In eight weeks, your team handles twice the clients without twice the work. If they
            can't, <span className="text-primary">we keep building for free until they can.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
