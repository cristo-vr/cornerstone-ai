"use client";
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import GrowthSimulator from '../components/sections/GrowthSimulator';
import ThirdOption from '../components/sections/ThirdOption';
import Levers from '../components/sections/Levers';
import Ownership from '../components/sections/Ownership';
import HowItWorks from '../components/sections/HowItWorks';
import Work from '../components/sections/Work';
import Safety from '../components/sections/Safety';
import About from '../components/sections/About';
import FAQ from '../components/sections/FAQ';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';
import ContactModal from '../components/ui/ContactModal';
import Preloader from '../components/ui/Preloader';

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContact = () => setIsContactModalOpen(true);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-background">
      <Preloader />
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <main>
        <Hero onOpenContact={openContact} />
        <Problem />
        <GrowthSimulator />
        <ThirdOption />
        <Levers />
        <Ownership />
        <HowItWorks />
        <Work onOpenContact={openContact} />
        <Safety />
        <About onOpenContact={openContact} />
        <FAQ />
        <ContactSection />
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default App;
