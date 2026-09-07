import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  containerClassName?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = 'Search...',
      className = '',
      containerClassName = '',
      sizeVariant = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'py-1.5 pl-8 pr-8 text-xs',
      md: 'py-2.5 pl-10 pr-9 text-xs sm:text-sm',
      lg: 'py-3.5 pl-11 pr-10 text-sm sm:text-base',
    };

    const iconSizes = {
      sm: 'w-3.5 h-3.5 left-2.5',
      md: 'w-4 h-4 left-3.5',
      lg: 'w-5 h-5 left-4',
    };

    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
      <div className={`relative flex items-center w-full ${containerClassName}`}>
        <Search
          className={`absolute ${iconSizes[sizeVariant]} text-slate-400 dark:text-slate-500 pointer-events-none shrink-0`}
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full rounded-xl bg-slate-50 dark:bg-[#111111] border border-slate-200/90 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#707070] focus:ring-2 focus:ring-[var(--focus-ring,rgba(16,185,129,0.25))] focus:border-[var(--primary,#10B981)] outline-none transition-all font-sans disabled:opacity-50 ${sizes[sizeVariant]} ${className}`}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
