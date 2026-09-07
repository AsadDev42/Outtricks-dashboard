import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      className = '',
      containerClassName = '',
      id,
      required,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '_') : undefined);

    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-bold text-slate-700 dark:text-slate-300 font-sans"
          >
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={`w-full text-xs sm:text-sm rounded-xl p-3 bg-slate-50 dark:bg-[#111111] border text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#707070] transition-all duration-150 outline-none font-sans resize-y ${
            error
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-200/90 dark:border-[#2A2A2A] focus:ring-2 focus:ring-primary focus:border-primary'
          } disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-[#181818] ${className}`}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
