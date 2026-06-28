import React from 'react';
import { motion } from 'framer-motion';
import { Users, AppWindow } from 'lucide-react';
import ParallaxGrid from '../ui/ParallaxGrid';

const ease = [0.16, 1, 0.3, 1] as const;

const doors = [
  {
    label: 'Door 1',
    icon: Users,
    title: 'Hire more people',
    body: 'More salaries, more managing, more of your week spent training and checking work. Good people are hard to find and harder to keep. When one leaves, the whole job lands back on you overnight.',
  },
  {
    label: 'Door 2',
    icon: AppWindow,
    title: 'Buy more software',
    body: 'Another tool, another login, another thing your team half-uses. The data sits in five places and someone still has to tie it all together. That someone is you.',
  },
];

const Problem: React.FC = () => {
  return (
    <section className="py-28 md:py-32 bg-background border-t border-foreground/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <ParallaxGrid color="255, 255, 255" opacity={0.12} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6"
            >
              Every time you win, <span className="text-red-500">you lose.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-lg text-muted leading-relaxed"
            >
              You sign a great client, and now there's more work landing on you. You grow, and the
              business needs more of you, not less. There's only so much of you to go around, so
              eventually you start saying no. No to the project you actually wanted. No to
              marketing, because you couldn't handle the leads it would bring. You end up capping
              your own business to protect the part that barely holds together.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10">
              <img
                src="/images/late-night-desk.jpg"
                alt="A founder's desk late at night, papers stacked under a single lamp"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-foreground font-medium text-lg mb-8"
        >
          Most founders try one of two ways out. Neither one fixes it.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {doors.map((door, i) => (
            <motion.div
              key={door.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group p-8 rounded-2xl border border-foreground/10 bg-neutral-900/50 hover:border-red-500/30 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                  <door.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono text-muted uppercase tracking-[0.18em]">
                  {door.label}
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">{door.title}</h3>
              <p className="text-muted leading-relaxed">{door.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl border-l-2 border-primary pl-6"
        >
          <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-snug">
            The problem was never how hard your team works. It's that everything still runs through
            you. <span className="text-primary">That's the part to fix.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
