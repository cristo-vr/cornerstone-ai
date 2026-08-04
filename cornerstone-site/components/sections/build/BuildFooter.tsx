"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

/* Deliberately thin. The close above already made the ask, so the footer only
   has to hold the mark, the other door, and the legal links. */
const links = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refunds", href: "/refund-policy" },
];

const BuildFooter: React.FC = () => (
  <footer className="bg-carbon border-t border-[#2C2B27]">
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <Link href="/" aria-label="Cornerstone AI, home">
        <Logo tone="onDark" markClassName="w-6 h-6" wordClassName="text-lg" />
      </Link>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8F8B7E]">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="hover:text-rail-text transition-colors duration-200"
          >
            {l.label}
          </Link>
        ))}
        <span>&copy; {new Date().getFullYear()} Cornerstone AI</span>
      </div>
    </div>
  </footer>
);

export default BuildFooter;
