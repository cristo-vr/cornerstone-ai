"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const pills = ["$2,000 per seat", "Team seats $750", "8 places per intake"];

interface Props {
  onOpenContact: () => void;
}

/* Carbon is reserved for the foundation moments in the brand pack, so the page
   closes on stone the same way the rest of the site does. */
const WorkshopClose: React.FC<Props> = ({ onOpenContact }) => (
  <section className="bg-carbon py-24 md:py-32">
    <div className="max-w-4xl mx-auto px-6">
      <Reveal>
        <p className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,6.5vw,4.2rem)] text-rail-text">
          Eight weeks from now
          <br />
          you&apos;ll know <span className="text-[#DDBB7D]">how this works.</span>
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#BEB9AC] max-w-2xl">
          Properly, on your own business, with three systems running to prove it. And if the
          audit doesn&apos;t back that up, the seat runs free until it does.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-11 flex flex-wrap items-center gap-3">
          {pills.map((p) => (
            <span
              key={p}
              className="border border-[#4A463D] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#CFCCC2]"
            >
              {p}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-10">
          <Button variant="onDark" onClick={onOpenContact} icon>
            Book a call
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WorkshopClose;
