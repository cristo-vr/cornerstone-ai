"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ContactModal from "@/components/ui/ContactModal";

import WorkshopHero from "./WorkshopHero";
import WhyThisExists from "./WhyThisExists";
import WhatASystemIs from "./WhatASystemIs";
import WhatYouWalkAwayWith from "./WhatYouWalkAwayWith";
import TheAudit from "./TheAudit";
import Guarantee from "./Guarantee";
import Curriculum from "./Curriculum";
import HowItRuns from "./HowItRuns";
import HonestLimits from "./HonestLimits";
import RatherHaveItBuilt from "./RatherHaveItBuilt";
import WorkshopPricing from "./WorkshopPricing";
import WorkshopClose from "./WorkshopClose";

/**
 * The Workshop, in the order the argument has to land:
 *   the promise -> why it exists -> what a system actually is -> what you leave
 *   with -> where you aim it -> the guarantee -> the eight weeks -> how it runs
 *   -> what it doesn't do -> the other door -> the price -> the ask
 *
 * Client shell so the whole page can share one contact modal. The page file
 * stays a server component and keeps its metadata export.
 */
const WorkshopPage: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-accent-txt">
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <main>
        <WorkshopHero onOpenContact={openContact} />
        <WhyThisExists />
        <WhatASystemIs />
        <WhatYouWalkAwayWith />
        <TheAudit />
        <Guarantee />
        <Curriculum />
        <HowItRuns />
        <HonestLimits />
        <RatherHaveItBuilt />
        <WorkshopPricing />
        <WorkshopClose onOpenContact={openContact} />
      </main>

      <Footer onOpenContact={openContact} />
    </div>
  );
};

export default WorkshopPage;
