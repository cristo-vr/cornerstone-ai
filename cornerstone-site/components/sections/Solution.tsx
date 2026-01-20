import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Heart, Zap } from 'lucide-react';

const Solution: React.FC = () => {
  return (
    <section id="method" className="py-32 bg-brand-black relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-brand-gold uppercase tracking-widest mb-4">The Cornerstone Method</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-brand-white mb-6">People First. Systems Second.</h3>
            <p className="text-brand-gray text-lg">
              Automation is useless if your team hates using it. We analyze your workflow, redesign it with AI, and implement systems that your people actually love.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Heart className="w-8 h-8 text-brand-white" />,
              title: "Human-Centric Design",
              desc: "We don't replace humans; we give them superpowers. We design interfaces that feel natural, not robotic."
            },
            {
              icon: <Cpu className="w-8 h-8 text-brand-white" />,
              title: "Surgical AI Injection",
              desc: "We don't automate for the sake of it. We target high-friction bottlenecks where AI yields 10x ROI."
            },
            {
              icon: <Zap className="w-8 h-8 text-brand-white" />,
              title: "Infrastructure as Code",
              desc: "Scalable, secure, and documented. We build robust engines, not fragile scripts held together by duct tape."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 hover:border-brand-gold transition-colors duration-500 group"
            >
              <div className="mb-6 p-4 inline-block bg-brand-black border border-neutral-800 group-hover:border-brand-gold/50 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-brand-white mb-4">{item.title}</h4>
              <p className="text-brand-gray leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;