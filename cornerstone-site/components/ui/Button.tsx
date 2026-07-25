import React from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost" | "onDark";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  icon?: boolean;
}

/**
 * Brand Pack v2 button.
 * Body font (not condensed display), 8px radius, matte fill, no glow.
 * Press feedback is instant (160ms) so it feels like the UI is listening.
 */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 " +
  "font-sans text-[0.9rem] font-semibold tracking-[0.01em] " +
  "transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out)] " +
  "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-accent-txt border border-primary hover:bg-accent-dk hover:border-accent-dk hover:-translate-y-px",
  outline:
    "bg-transparent text-foreground border border-muted/60 hover:border-foreground hover:bg-surface-2 hover:-translate-y-px",
  ghost:
    "bg-transparent text-ink-2 border border-transparent px-2 hover:text-foreground",
  onDark:
    "bg-primary text-accent-txt border border-primary hover:bg-accent-dk hover:border-accent-dk hover:-translate-y-px",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  icon = false,
  className = "",
  ...props
}) => (
  <button className={`${base} ${variants[variant]} ${className}`} {...props}>
    {children}
    {icon && (
      <ArrowRight
        className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    )}
  </button>
);

export default Button;
