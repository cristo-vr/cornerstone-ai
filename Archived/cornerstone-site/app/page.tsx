"use client";

import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/home/Hero";
import Problem from "../components/sections/home/Problem";
import TheBetterWay from "../components/sections/home/TheBetterWay";
import HowIBuild from "../components/sections/home/HowIBuild";
import Proof from "../components/sections/Proof";
import About from "../components/sections/About";
import TheOffer from "../components/sections/home/TheOffer";
import FinalCTA from "../components/sections/home/FinalCTA";
import Footer from "../components/sections/Footer";
import ContactModal from "../components/ui/ContactModal";
import Preloader from "../components/ui/Preloader";

/**
 * The page tells one story, in order:
 *
 *   hook -> what you already tried -> what it costs you -> what a system is
 *   -> how I build one -> proof -> who I am -> what it costs -> the ask
 *
 * Pricing appears in exactly one place, TheOffer, and only once the reader
 * knows what they would be buying. A number quoted anywhere above that is a
 * regression, not a shortcut.
 */
const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContact = () => setIsContactModalOpen(true);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-accent-txt">
      <Preloader />
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <main>
        <Hero onOpenContact={openContact} />
        <Problem />
        <TheBetterWay />
        <HowIBuild />
        <Proof onOpenContact={openContact} />
        <About onOpenContact={openContact} />
        <TheOffer />
        <FinalCTA />
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default App;
