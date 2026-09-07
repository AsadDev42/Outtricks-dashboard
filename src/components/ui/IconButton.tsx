import React, { forwardRef } from 'react';
import { Tooltip } from './Tooltip';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  showTooltip?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      className = '',
      variant = 'ghost',
      size = 'md',
      tooltipPlacement = 'top',
      showTooltip = true,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-md shadow-primary',
      secondary: 'bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200',
      outline: 'bg-transparent border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-[#1A1A1A] hover:border-primary-border text-slate-700 dark:text-slate-300',
      ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white',
      danger: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60',
      liquid: 'liquid-glass-button text-slate-800 dark:text-slate-200 shadow-xs',
    };

    const sizes = {
      sm: 'w-7 h-7 text-xs',
      md: 'w-9 h-9 text-sm',
      lg: 'w-11 h-11 text-base',
    };

    const buttonElement = (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {icon}
      </button>
    );

    if (showTooltip && label) {
      return (
        <Tooltip content={label} placement={tooltipPlacement}>
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
);

IconButton.displayName = 'IconButton';
