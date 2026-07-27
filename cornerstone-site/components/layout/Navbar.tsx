"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "../brand/Logo";

interface NavbarProps {
  onOpenContact: () => void;
}

const navLinks = [
  { label: "What it is", href: "/#what-it-is" },
  { label: "Proof", href: "/#proof" },
  { label: "The build", href: "/#the-build" },
  { label: "Pricing", href: "/#pricing" },
];

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ease-[var(--ease-out)] border-b ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-line"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <a href="/" aria-label="Cornerstone AI, home" className="shrink-0">
          <Logo markClassName="w-7 h-7" wordClassName="text-[1.35rem]" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-2 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenContact}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-accent-txt transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-accent-dk active:scale-[0.97]"
          >
            Book a call
          </button>
        </nav>

        <button
          className="md:hidden text-foreground p-1 -mr-1"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-line bg-background"
          >
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-display text-2xl font-bold uppercase tracking-[0.01em] text-foreground hover:text-accent-ink transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenContact();
                }}
                className="mt-4 rounded-lg bg-primary py-3.5 text-sm font-semibold text-accent-txt transition-transform duration-200 active:scale-[0.98]"
              >
                Book a call
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
