import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, TrendingUp, Wallet, ShieldCheck } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const levers = [
  {
    icon: UserPlus,
    title: 'Sign more clients',
    body: 'Your capacity stops being capped by your hours, so you can say yes again.',
  },
  {
    icon: TrendingUp,
    title: 'Make each client worth more',
    body: 'Nothing slips. Every client gets your standard every time, so they stay longer and spend more.',
  },
  {
    icon: Wallet,
    title: 'Spend less to deliver',
    body: 'The admin layer runs itself instead of eating salaries and your evenings.',
  },
  {
    icon: ShieldCheck,
    title: 'Depend on fewer people',
    body: 'The business runs without you in every loop, and without us. That last one is worth more than it sounds.',
  },
];

const Levers: React.FC = () => {
  return (
    <section className="py-28 md:py-32 bg-background border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight"
          >
            Four ways this puts money back in the business.
          </motion.h2>
          <p className="mt-5 text-lg text-muted">
            Everything we build has to do at least one of these. If it doesn't, we don't build it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
          {levers.map((lever, i) => (
            <motion.div
              key={lever.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="bg-background p-8 md:p-10 hover:bg-surface/60 transition-colors duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit text-primary mb-5">
                <lever.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-2">
                {lever.title}
              </h3>
              <p className="text-muted leading-relaxed">{lever.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mt-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12"
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed max-w-4xl">
            A business that only works when you're in it is risky to own and hard to sell. A business
            that runs on its own is worth more, full stop.{' '}
            <span className="text-primary font-medium">
              This doesn't just make you more money while it's running. It makes the whole company
              more valuable.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Levers;
