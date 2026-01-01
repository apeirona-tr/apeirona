'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-stone)]">
              {leftIcon}
            </div>
          )}
          <motion.input
            ref={ref}
            whileFocus={{ scale: 1.01 }}
            className={`
              w-full px-4 py-3 bg-white border-2 rounded-lg
              text-[var(--color-charcoal)] placeholder-[var(--color-stone)]
              transition-all duration-200
              focus:outline-none focus:border-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              ${error 
                ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' 
                : 'border-[var(--color-sand)]'
              }
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-stone)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-[var(--color-error)]"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[var(--color-stone)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

