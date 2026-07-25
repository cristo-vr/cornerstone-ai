"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book a call"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-carbon/75 backdrop-blur-sm"
          />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-line bg-background shadow-[var(--shadow-lift)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>

            <div className="p-7 md:p-10">
              <div className="mb-9 pr-10">
                <h2 className="font-display text-3xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">
                  Book a call
                </h2>
                <p className="text-ink-2 leading-relaxed">
                  Tell us what&apos;s keeping you stuck. We&apos;ll find where your operations
                  are leaking time, and show you the fix.
                </p>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
