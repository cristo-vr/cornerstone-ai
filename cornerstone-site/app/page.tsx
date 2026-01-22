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
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-background">
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