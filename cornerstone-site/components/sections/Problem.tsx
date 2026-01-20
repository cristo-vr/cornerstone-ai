import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertCircle } from 'lucide-react';

const Problem: React.FC = () => {
  const painPoints = [
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-gold" />,
      title: "Linear Scaling",
      text: "Every new dollar of revenue requires a dollar of effort. Your margins are stagnant."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Admin Saturation",
      text: "Your high-value talent is spending 40% of their week on copy-paste tasks."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-brand-gold" />,
      title: "Complexity Trap",
      text: "Systems that worked at $1M break at $10M. Chaos increases with every hire."
    }
  ];

  return (
    <section className="py-24 bg-charcoal border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-6 tracking-tight">
              You’ve hit the <span className="text-brand-gold">complexity ceiling.</span>
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-6">
              You need to grow, but hiring more people kills your margins. Your current team is drowning in admin. You are scaling linearly in an exponential world.
            </p>
            <p className="text-brand-gray text-lg leading-relaxed border-l-2 border-brand-gold pl-6">
              "What got you here won't get you there. Manual workflows are the silent killer of enterprise velocity."
            </p>
          </motion.div>

          <div className="grid gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-black p-6 border border-neutral-800 hover:border-brand-gold/30 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-neutral-900 rounded-sm group-hover:bg-brand-gold/10 transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-white mb-2">{point.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{point.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Problem;