"use client";

import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Problem from "../components/sections/Problem";
import GrowthSimulator from "../components/sections/GrowthSimulator";
import Shift from "../components/sections/Shift";
import WhatItIs from "../components/sections/WhatItIs";
import Levers from "../components/sections/Levers";
import Proof from "../components/sections/Proof";
import WhoItsFor from "../components/sections/WhoItsFor";
import TheBuild from "../components/sections/TheBuild";
import Pricing from "../components/sections/Pricing";
import Ownership from "../components/sections/Ownership";
import Safety from "../components/sections/Safety";
import About from "../components/sections/About";
import FAQ from "../components/sections/FAQ";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import ContactModal from "../components/ui/ContactModal";
import Preloader from "../components/ui/Preloader";

/**
 * One page, one argument, in order:
 *   the pain -> what it costs you -> the shift -> what it is -> what it returns
 *   -> proof -> fit -> the build -> the price -> ownership -> safety -> who -> answers -> ask
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
        <GrowthSimulator />
        <Shift />
        <WhatItIs />
        <Levers />
        <Proof onOpenContact={openContact} />
        <WhoItsFor />
        <TheBuild />
        <Pricing onOpenContact={openContact} />
        <Ownership onOpenContact={openContact} />
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
