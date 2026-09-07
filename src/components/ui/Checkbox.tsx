import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', containerClassName = '', id, checked, disabled, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '_') : undefined);

    return (
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-start gap-3 select-none cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${containerClassName}`}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`w-4 h-4 rounded-md border transition-all duration-150 flex items-center justify-center ${
              checked
                ? 'bg-primary border-primary text-white shadow-xs'
                : 'bg-white dark:bg-[#1C1C1C] border-slate-300 dark:border-[#2A2A2A] peer-hover:border-primary'
            } peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${className}`}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block font-sans">
                {label}
              </span>
            )}
            {description && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
