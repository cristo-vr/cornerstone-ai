import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const Ownership: React.FC = () => {
  return (
    <section className="py-32 md:py-44 border-t border-foreground/5 relative overflow-hidden">
      {/* foundation texture, you own the foundation */}
      <img
        src="/images/foundation-texture.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-10"
        >
          You own it. <span className="text-primary">All of it.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="space-y-6 text-lg md:text-xl text-muted leading-relaxed"
        >
          <p>
            You own the whole system. It sits on your accounts, with your data, under your control.
            We don't hold the keys, and there's no licence to keep renewing.{' '}
            <span className="text-foreground font-medium">
              If we stopped working together tomorrow, it keeps running exactly as it did.
            </span>
          </p>
          <p>
            So why would you keep us around? Because the technology keeps moving and you want someone
            in your corner who's already three steps ahead. We stay on to keep improving the system
            and adding what it can do. Not to keep the lights on. You could do that yourself.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Ownership;
