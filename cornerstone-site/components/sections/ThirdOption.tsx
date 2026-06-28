import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    title: 'It holds your standard.',
    body: 'The work gets done to the bar you set, every time, not just when you’re watching.',
  },
  {
    title: 'It runs the routine.',
    body: 'Onboarding a client, chasing a missing document, sending the invoice, nudging the follow-up. It just happens.',
  },
  {
    title: 'It keeps everyone on the same page.',
    body: 'Your whole team works off one source of truth instead of five tools and a group chat.',
  },
  {
    title: 'It only brings you what matters.',
    body: 'The small stuff it handles on its own. The real decisions it brings to you, with the context already gathered.',
  },
];

const ThirdOption: React.FC = () => {
  return (
    <section className="py-28 md:py-32 bg-surface/40 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left: the statement + a calm image */}
        <div className="lg:col-span-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05]"
          >
            A right hand that already knows your business.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-6 text-lg text-muted leading-relaxed max-w-md"
          >
            We build you an operator that lives inside your business and runs the day-to-day. It
            knows your clients, your standards, and how you like things done. It takes the
            repetitive work that eats your team's time and handles it the way you would.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            className="mt-10 hidden lg:block"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-foreground/10">
              <img
                src="/images/ledger-calm.jpg"
                alt="An open ledger and fountain pen in calm morning light"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Right: the four capabilities, numbered list with hairlines */}
        <div className="lg:col-span-7">
          <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
            {capabilities.map((cap, i) => (
              <motion.li
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="flex gap-6 py-7 group"
              >
                <span className="font-display text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors tabular-nums shrink-0 w-10">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{cap.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 text-2xl md:text-3xl font-display font-medium text-foreground"
          >
            You stop being the thing every task waits on.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ThirdOption;
