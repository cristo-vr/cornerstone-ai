"use client";

import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/home/Hero";
import Problem from "../components/sections/home/Problem";
import TwoPaths from "../components/sections/home/TwoPaths";
import Proof from "../components/sections/Proof";
import About from "../components/sections/About";
import FinalCTA from "../components/sections/home/FinalCTA";
import Footer from "../components/sections/Footer";
import ContactModal from "../components/ui/ContactModal";
import Preloader from "../components/ui/Preloader";

/**
 * Six sections, one job: make the fork obvious.
 *
 *   what I do -> why the last thing you bought didn't work -> the two ways in
 *   -> proof -> who I am -> the ask
 *
 * The detail of each offer lives on /build and /workshop. This page exists to
 * send the reader to the right one of the two, in under two minutes.
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
        <TwoPaths />
        <Proof onOpenContact={openContact} />
        <About onOpenContact={openContact} />
        <FinalCTA />
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default App;
