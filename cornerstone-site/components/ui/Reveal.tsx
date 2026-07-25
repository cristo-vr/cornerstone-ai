"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll reveal. One shared motion signature across the whole site so the page
 * feels like one object rather than a pile of components.
 *
 * Purpose: hierarchy. Content settles into place in reading order.
 *
 * The motion props stay identical whether or not motion is reduced, and only
 * the transition collapses to zero. Swapping in a plain element (or dropping
 * `whileInView`) leaves the server-rendered `opacity:0` inline style with
 * nothing to drive it back to visible, which renders the section blank for
 * every reduced-motion visitor.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.7, delay, ease: EASE }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}
