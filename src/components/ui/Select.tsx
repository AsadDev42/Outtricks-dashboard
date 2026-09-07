import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      helperText,
      error,
      className = '',
      containerClassName = '',
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '_') : undefined);

    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 font-sans"
          >
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={`w-full text-xs sm:text-sm rounded-xl pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-[#111111] border text-slate-900 dark:text-white appearance-none transition-all duration-150 outline-none font-sans cursor-pointer ${
              error
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200/90 dark:border-[#242424] focus:ring-2 focus:ring-primary focus:border-primary'
            } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-white dark:bg-[#161616] text-slate-900 dark:text-white py-1"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select';
