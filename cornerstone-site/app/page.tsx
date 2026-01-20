"use client";
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import Process from '../components/sections/Process';
import Work from '../components/sections/Work';
import Footer from '../components/sections/Footer';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="bg-brand-black min-h-screen text-brand-white font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Solution />
        <Process />
        <Work />

        {/* Simple Testimonial Marquee Placeholder */}
        <section className="py-20 bg-neutral-900 overflow-hidden border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">Trusted by Industry Leaders</span>
          </div>
          <div className="flex gap-12 animate-scroll whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-500 justify-center">
            {["FINCORP", "TECHFLOW", "DATASCALE", "OMNI", "NEXUS SYSTEMS"].map((logo, i) => (
              <span key={i} className="text-2xl font-bold text-brand-white font-mono tracking-tighter">{logo}</span>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 bg-brand-black relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold text-brand-white mb-8"
            >
              Ready to break the ceiling?
            </motion.h2>
            <p className="text-brand-gray text-xl mb-12">
              Let's identify your first high-impact automation. No obligation.
            </p>
            <button className="bg-brand-gold text-brand-black px-10 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300">
              Schedule Your Audit
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;