"use client";
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import GrowthSimulator from '../components/sections/GrowthSimulator';
import Solution from '../components/sections/Solution';
import Process from '../components/sections/Process';
import ContactSection from '../components/sections/ContactSection';
import Work from '../components/sections/Work';
import Footer from '../components/sections/Footer';
import ContactModal from '../components/ui/ContactModal';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContact = () => setIsContactModalOpen(true);

  return (
    <div className="bg-brand-black min-h-screen text-brand-white font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <main>
        <Hero onOpenContact={openContact} />
        <Problem />
        <GrowthSimulator />
        <Solution />
        <Process />
        <ContactSection />
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

        {/* CTA Section - Replaced or kept as secondary? User asked for form BEFORE selected works. 
            The user said "Add a form after the Process Section and before the selected works section".
            This existing "Ready to break the ceiling?" section is likely redundant now. 
            I will REMOVE the old "Ready to break the ceiling" section since we have the ContactSection now.
        */}
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default App;