'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-lg transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary)] text-white
      hover:bg-[var(--color-primary-dark)]
      focus-visible:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-[var(--color-charcoal)]
      hover:bg-[var(--color-secondary-dark)]
      focus-visible:ring-[var(--color-secondary)]
    `,
    accent: `
      bg-[var(--color-accent)] text-white
      hover:bg-[var(--color-accent-dark)]
      focus-visible:ring-[var(--color-accent)]
    `,
    outline: `
      bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)]
      hover:bg-[var(--color-primary)] hover:text-white
      focus-visible:ring-[var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[var(--color-charcoal)]
      hover:bg-[var(--color-beige)]
      focus-visible:ring-[var(--color-primary)]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;

