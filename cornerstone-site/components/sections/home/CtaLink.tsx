import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Button.tsx renders a real <button>, which can't be nested inside a link.
 * The home page's primary actions are navigations (/build, /workshop), so this
 * is the same Brand Pack v2 button skin worn by an anchor. Classes are kept in
 * sync with components/ui/Button.tsx on purpose: one visual language, two
 * elements.
 */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 " +
  "font-sans text-[0.9rem] font-semibold tracking-[0.01em] " +
  "transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out)] " +
  "active:scale-[0.97]";

const variants = {
  primary:
    "bg-primary text-accent-txt border border-primary hover:bg-accent-dk hover:border-accent-dk hover:-translate-y-px",
  outline:
    "bg-transparent text-foreground border border-muted/60 hover:border-foreground hover:bg-surface-2 hover:-translate-y-px",
} as const;

export default function CtaLink({
  href,
  children,
  variant = "primary",
  icon = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  icon?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}
