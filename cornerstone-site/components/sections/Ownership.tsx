"use client";

import React from "react";
import Reveal from "../ui/Reveal";

/**
 * The one full-bleed carbon moment on the page.
 *
 * Deliberate: ownership is the emotional peak of the argument, so it gets the
 * weight of stone. Carbon holds in both themes, so this reads as an anchor in
 * light mode and a deepening in dark mode rather than a jarring invert.
 */
const Ownership: React.FC = () => (
  <section className="relative overflow-hidden bg-carbon py-32 md:py-44">
    <img
      src="/images/foundation-texture.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover opacity-35"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/90 to-carbon/55"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/80"
    />

    <div className="relative z-10 max-w-4xl mx-auto px-6">
      <Reveal>
        <h2 className="font-display font-extrabold uppercase leading-[0.88] tracking-[0.005em] text-[clamp(3rem,8vw,6rem)] text-rail-text mb-11">
          You own it. <span className="text-[#DDBB7D]">All of it.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-7 text-lg md:text-xl leading-relaxed text-[#BEB9AC]">
          <p>
            You own the whole system. It sits on your accounts, with your data, under your
            control. We don&apos;t hold the keys, and there&apos;s no licence to keep renewing.{" "}
            <strong className="font-semibold text-rail-text">
              If we stopped working together tomorrow, it keeps running exactly as it did.
            </strong>
          </p>
          <p>
            So why would you keep us around? Because the technology keeps moving and you want
            someone in your corner who&apos;s already three steps ahead. We stay on to keep
            improving the system and adding what it can do. Not to keep the lights on. You
            could do that yourself.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Ownership;
