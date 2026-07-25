import React from "react";

/**
 * Brand Pack v2 eyebrow: a short accent rule + tracked caps in the body font.
 * Used sparingly (the pack treats it as punctuation, not decoration).
 */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink ${className}`}
    >
      <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
      {children}
    </span>
  );
}
