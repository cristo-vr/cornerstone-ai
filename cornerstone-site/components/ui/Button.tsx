import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out border uppercase";

  const variants = {
    primary: "bg-primary border-primary text-background hover:bg-foreground hover:border-foreground hover:text-background",
    outline: "bg-transparent border-neutral-700 text-foreground hover:border-primary hover:text-primary",
    ghost: "bg-transparent border-transparent text-muted hover:text-primary pl-0"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </motion.button>
  );
};

export default Button;