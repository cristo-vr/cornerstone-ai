"use client";

import React from "react";
import { Logo } from "../brand/Logo";

interface FooterProps {
  onOpenContact: () => void;
}

const sitemap = [
  { label: "Home", href: "/" },
  { label: "The OS Sprint", href: "/the-os-sprint" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Proof", href: "/#proof" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refunds", href: "/refund-policy" },
];

/**
 * Carbon footer. Same treatment as the Ownership section on purpose: carbon is
 * reserved for the foundation moments, so the page opens light, sets its weight
 * twice, and closes on stone.
 */
const Footer: React.FC<FooterProps> = ({ onOpenContact }) => (
  <footer className="bg-carbon text-[#BEB9AC]">
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="grid md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-[#2C2B27]">
        <div className="md:col-span-7">
          <Logo tone="onDark" markClassName="w-8 h-8" wordClassName="text-2xl" />
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            An AI Chief of Staff for founder-led businesses. A right hand that runs your
            operations, built into your business and owned by you.
          </p>
          <button
            onClick={onOpenContact}
            className="mt-8 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-accent-txt transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[#DDBB7D] active:scale-[0.97]"
          >
            Book a call
          </button>
        </div>

        <nav className="md:col-span-3" aria-label="Sitemap">
          <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#8F8B7E] mb-5">
            Sitemap
          </h2>
          <ul className="space-y-3 text-sm">
            {sitemap.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-rail-text transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-label="Legal">
          <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#8F8B7E] mb-5">
            Legal
          </h2>
          <ul className="space-y-3 text-sm">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-rail-text transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="pt-8 text-xs text-[#8F8B7E]">
        © {new Date().getFullYear()} Cornerstone AI. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
