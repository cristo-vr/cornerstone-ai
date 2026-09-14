import React from "react";

/**
 * Brand Pack v2 — the cornerstone mark.
 *
 * A 3D rough-cast stone block: three gold faces reading the light (lit top,
 * mid front, shadowed side). Holds down to 24px; below that pass `rough={false}`
 * so the displacement doesn't muddy the silhouette.
 *
 * Never recolour, flatten, stretch, or add a glow.
 */
export function Mark({
  className = "w-8 h-8",
  rough = true,
}: {
  className?: string;
  rough?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
    >
      <g filter={rough ? "url(#cs-rough)" : undefined}>
        {/* lit top face */}
        <path d="M50 10 L88 31 L50 52 L12 31 Z" fill="var(--face-lit)" />
        {/* mid front face */}
        <path d="M12 31 L50 52 L50 92 L12 71 Z" fill="var(--face-mid)" />
        {/* shadowed side face */}
        <path d="M88 31 L50 52 L50 92 L88 71 Z" fill="var(--face-shadow)" />
      </g>
    </svg>
  );
}

/**
 * The horizontal lockup: mark + wordmark. `tone` lets the wordmark sit on a
 * dark rail (footer, nav overlay) without hardcoding a colour.
 */
export function Logo({
  className = "",
  markClassName = "w-7 h-7",
  wordClassName = "text-xl",
  tone = "default",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  tone?: "default" | "onDark";
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className={markClassName} />
      <span
        className={`font-display font-extrabold uppercase tracking-[0.01em] leading-none ${wordClassName} ${
          tone === "onDark" ? "text-rail-text" : "text-foreground"
        }`}
      >
        Cornerstone
      </span>
    </span>
  );
}

export default Logo;
