"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mark } from "../brand/Logo";
import { useScrollLock } from "./useScrollLock";

const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD_MS = 1800;

/**
 * Brand intro: the cornerstone is set, the wordmark draws in, the panel lifts.
 *
 * Plays once per browser session and never for reduced-motion visitors. Kept
 * short on purpose, a marketing page should not hold a visitor hostage.
 */
const Preloader: React.FC = () => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem("cs-intro-seen") === "1";
    } catch {
      /* private mode: treat as unseen */
    }
    if (seen) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("cs-intro-seen", "1");
      } catch {
        /* private mode: just don't persist */
      }
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  useScrollLock(visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-7"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* the string line the block is set against */}
          <motion.span
            className="absolute h-px w-44 bg-primary/40"
            style={{ originX: 0.5 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <Mark className="w-14 h-14" />
          </motion.div>

          <motion.div
            className="relative overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          >
            <span className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-[0.14em] text-foreground">
              Cornerstone
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
