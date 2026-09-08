import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'liquid' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Strictly enforce horizontal flex layout with centered items and inline gap
    const baseStyles =
      'inline-flex flex-row items-center justify-center gap-2 font-bold tracking-tight rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none whitespace-nowrap shrink-0 box-border leading-tight text-center';

    const variants = {
      primary:
        'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-xs shadow-primary/25 border border-transparent',
      secondary:
        'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 dark:bg-[#161616] dark:hover:bg-[#202020] dark:active:bg-[#262626] text-slate-800 dark:text-white border border-slate-200/80 dark:border-[#2A2A2A]',
      outline:
        'bg-transparent hover:bg-slate-50 dark:hover:bg-[#161616] text-slate-800 dark:text-white border border-slate-300 dark:border-[#2A2A2A] hover:border-primary/40',
      ghost:
        'bg-transparent hover:bg-slate-100 dark:hover:bg-[#1C1C1C] text-slate-700 dark:text-[#B5B5B5] hover:text-slate-950 dark:hover:text-white border border-transparent',
      danger:
        'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm shadow-rose-500/25 border border-transparent',
      liquid:
        'liquid-glass-button text-slate-800 dark:text-white hover:border-primary/30 shadow-xs hover:scale-[1.01]',
      subtle:
        'bg-primary-muted text-primary hover:bg-primary/20 border border-primary-border',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-2 min-h-[34px] h-[34px]',
      md: 'text-xs sm:text-sm px-4 py-2 gap-2 min-h-[40px] h-[40px]',
      lg: 'text-sm sm:text-base px-6 py-2.5 gap-2.5 min-h-[48px] h-[48px]',
      icon: 'p-2 min-h-[34px] min-w-[34px] h-[34px] w-[34px] aspect-square',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0 inline-flex items-center justify-center [&>svg]:shrink-0">{leftIcon}</span>
        )}
        {children !== undefined && children !== null && (
          <span className="inline-flex items-center justify-center leading-tight text-center truncate gap-2 [&>svg]:shrink-0">
            {children}
          </span>
        )}
        {!isLoading && rightIcon && (
          <span className="shrink-0 inline-flex items-center justify-center [&>svg]:shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="primary" {...props} />
));
PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
));
SecondaryButton.displayName = 'SecondaryButton';

export const DangerButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="danger" {...props} />
));
DangerButton.displayName = 'DangerButton';

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  attached?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  attached = false,
}) => {
  return (
    <div
      className={`inline-flex items-center ${
        attached
          ? 'rounded-xl overflow-hidden [&>button]:rounded-none [&>button:first-child]:rounded-l-xl [&>button:last-child]:rounded-r-xl [&>button:not(:last-child)]:border-r-0'
          : 'gap-2'
      } ${className}`}
    >
      {children}
    </div>
  );
};
