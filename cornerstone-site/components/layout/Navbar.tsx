"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
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
  const reduce = useReducedMotion();
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
      <div className="max-w-7xl mx-auto px-6 h-[76px] md:h-[88px] flex items-center justify-between">
        <a href="/" aria-label="Cornerstone AI, home" className="shrink-0">
          <Logo
            markClassName="w-8 h-8 md:w-9 md:h-9"
            wordClassName="text-[1.5rem] md:text-[1.75rem]"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.95rem] font-medium text-ink-2 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenContact}
            className="rounded-lg bg-primary px-6 py-3 text-[0.9rem] font-semibold text-accent-txt transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-accent-dk active:scale-[0.97]"
          >
            Book a call
          </button>
        </nav>

        <button
          className="md:hidden text-foreground p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          /* Animating height relayouts the document every frame, on exactly the
             devices least able to afford it. The panel slides on transform and
             fades instead, and the wrapper is absolutely positioned so the
             page underneath never reflows. */
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute inset-x-0 top-full origin-top border-t border-line bg-background shadow-[var(--shadow-soft)]"
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
