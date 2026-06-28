import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ScrollText, Database, LayoutDashboard } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const points = [
  {
    icon: Lock,
    title: 'Everyone sees only what they should',
    body: 'Access is set at the data itself, not by asking the AI nicely. Your bookkeeper sees the books. Your newest hire doesn\'t see the bank balance.',
  },
  {
    icon: ScrollText,
    title: 'Every action is logged',
    body: 'You can see exactly what it did and when. Nothing happens in the dark.',
  },
  {
    icon: Database,
    title: 'One database, on your accounts',
    body: 'There\'s a single source of truth, and it belongs to you.',
  },
  {
    icon: LayoutDashboard,
    title: 'A simple control panel',
    body: 'You and your team run the whole thing from one screen.',
  },
];

const Safety: React.FC = () => {
  return (
    <section className="py-28 md:py-32 bg-surface/40 border-t border-foreground/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
              className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight"
            >
              Powerful, and locked down.
            </motion.h2>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Letting AI into your business only works if it's safe. Here's how that's handled.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
              className="mt-10 hidden lg:block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10">
                <img
                  src="/images/vault.webp"
                  alt="A brushed-brass vault dial on a dark door"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-foreground/10 bg-background/60 divide-y divide-foreground/10 overflow-hidden">
              {points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className="flex gap-5 p-6 md:p-7"
                >
                  <div className="p-2.5 bg-primary/10 rounded-lg text-primary h-fit shrink-0">
                    <point.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-1">
                      {point.title}
                    </h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed">{point.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
