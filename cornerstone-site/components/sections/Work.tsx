import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { CaseStudy } from '../../types';

const cases: CaseStudy[] = [
  {
    id: "1",
    title: "Reporting Automation",
    description: "Automated complex financial reporting for a mid-market fintech firm, reducing closing time by 80%.",
    tag: "Saved 15 hours/week",
    image: "https://picsum.photos/800/600?grayscale&blur=2"
  },
  {
    id: "2",
    title: "CRM Intelligence Layer",
    description: "Implemented an AI agent to clean, enrich, and prioritize leads within Salesforce automatically.",
    tag: "+40% Conversion Rate",
    image: "https://picsum.photos/800/601?grayscale&blur=2"
  },
  {
    id: "3",
    title: "Customer Support Triaging",
    description: "Deployed a Tier-1 support bot capable of resolving 65% of queries without human intervention.",
    tag: "$120k Annual Savings",
    image: "https://picsum.photos/800/602?grayscale&blur=2"
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-brand-white mb-4">Selected Works</h2>
          <div className="w-24 h-1 bg-brand-gold"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-neutral-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {project.tag}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-white mb-2 group-hover:text-brand-gold transition-colors">
                {project.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" icon>View All Case Studies</Button>
        </div>
      </div>
    </section>
  );
};

export default Work;