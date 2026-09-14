"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ContactModal from "@/components/ui/ContactModal";

import BuildHero from "./BuildHero";
import WhatGetsBuilt from "./WhatGetsBuilt";
import EightWeeks from "./EightWeeks";
import BuildPricing from "./BuildPricing";
import BuildOwnership from "./BuildOwnership";
import BuildSafety from "./BuildSafety";
import BuildClose from "./BuildClose";
import BuildFooter from "./BuildFooter";

/**
 * The Build page, one argument in order:
 *   the offer -> what actually gets built -> how the eight weeks run
 *   -> what it costs (and what follows it) -> you own it -> it's safe
 *   -> the ask
 *
 * Lives as a client shell because the booking modal is stateful and the route's
 * page.tsx has to stay a server component to export metadata.
 */
const BuildShell: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-accent-txt">
      <Navbar onOpenContact={openContact} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <main>
        <BuildHero onOpenContact={openContact} />
        <WhatGetsBuilt />
        <EightWeeks />
        <BuildPricing onOpenContact={openContact} />
        <BuildOwnership />
        <BuildSafety />
        <BuildClose onOpenContact={openContact} />
      </main>

      <BuildFooter />
    </div>
  );
};

export default BuildShell;
