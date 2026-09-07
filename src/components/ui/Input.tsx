import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '_') : undefined);

    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 font-sans"
          >
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500 shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            className={`w-full text-xs sm:text-sm rounded-xl transition-all duration-150 outline-none font-sans ${
              leftIcon ? 'pl-10' : 'pl-3.5'
            } ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 bg-slate-50 dark:bg-[#111111] border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#707070] ${
              error
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200/90 dark:border-[#242424] focus:ring-2 focus:ring-primary focus:border-primary'
            } disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-[#181818] ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 dark:text-slate-500 shrink-0">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
