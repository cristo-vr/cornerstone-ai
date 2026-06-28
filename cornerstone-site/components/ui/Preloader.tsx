"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const HOLD_MS = 3400;
// REVIEW MODE: intro replays on every load so it's easy to see.
// For launch, set PLAY_ONCE_PER_SESSION = true to show it only on first visit.
const PLAY_ONCE_PER_SESSION = false;

/**
 * Brand intro: a single gold cornerstone is set, the wordmark draws in, then the
 * panel lifts to reveal the hero. Plays once per browser session. Honours reduced motion.
 */
const Preloader: React.FC = () => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (
      PLAY_ONCE_PER_SESSION &&
      typeof window !== 'undefined' &&
      sessionStorage.getItem('cs-intro-seen')
    ) {
      setVisible(false);
      return;
    }
    if (reduce) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('cs-intro-seen', '1');
      } catch {
        /* private mode: just don't persist */
      }
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          {/* the level line */}
          <motion.span
            className="absolute h-px w-40 bg-primary/50"
            style={{ originX: 0.5 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* the cornerstone being set */}
            <motion.span
              className="w-5 h-5 bg-primary"
              initial={{ scale: 0.85, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 45, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease, rotate: { type: 'spring', duration: 0.9, bounce: 0.25, delay: 0.45 } }}
            />

            {/* wordmark, revealed by a left-to-right clip wipe */}
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
            >
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.2em] text-foreground">
                CORNERSTONE
              </span>
            </motion.div>
          </div>

          {/* quiet category line */}
          <motion.span
            className="absolute bottom-[28%] text-xs font-mono uppercase tracking-[0.22em] text-muted"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease }}
          >
            An AI Chief of Staff
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
