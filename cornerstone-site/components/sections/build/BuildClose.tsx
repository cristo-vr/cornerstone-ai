"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

interface BuildCloseProps {
  onOpenContact: () => void;
}

/* The one full-bleed carbon moment on the page. Carbon is reserved for the
   foundation moments in the brand pack, so the page closes on stone. */
const BuildClose: React.FC<BuildCloseProps> = ({ onOpenContact }) => (
  <section id="book" className="relative overflow-hidden bg-carbon py-28 md:py-40">
    <div className="relative z-10 max-w-4xl mx-auto px-6">
      <Reveal>
        <p className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,7vw,5rem)] text-rail-text">
          Three a month. <span className="text-[#DDBB7D]">That’s the capacity.</span>
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 space-y-6 text-lg md:text-xl leading-relaxed text-[#BEB9AC] max-w-3xl">
          <p>
            The next step is a call, and it&apos;s a working session rather than a
            pitch.
          </p>
          <p>
            Bring the part of your week that irritates you most. By the end
            you&apos;ll know what the first three systems would be and whether the eight
            weeks is the right move.{" "}
            <strong className="font-semibold text-rail-text">
              If it isn&apos;t, I&apos;ll tell you on the call rather than sell you
              something.
            </strong>
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-11 flex flex-wrap items-center gap-7">
          <Button onClick={onOpenContact} variant="onDark" icon>
            Book a call
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default BuildClose;
