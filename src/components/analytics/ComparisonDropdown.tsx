import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ComparisonPeriod } from '../../context/AnalyticsContext';

export interface ComparisonDropdownProps {
  value: ComparisonPeriod;
  onChange: (value: ComparisonPeriod) => void;
  className?: string;
}

export const COMPARISON_OPTIONS: { id: ComparisonPeriod; label: string }[] = [
  { id: 'PREVIOUS_PERIOD', label: 'vs Prev Period' },
  { id: 'PREVIOUS_MONTH', label: 'vs Prev Month' },
  { id: 'PREVIOUS_QUARTER', label: 'vs Prev Quarter' },
  { id: 'PREVIOUS_YEAR', label: 'vs Prev Year' },
];

export const ComparisonDropdown: React.FC<ComparisonDropdownProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = COMPARISON_OPTIONS.find((opt) => opt.id === value) || COMPARISON_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionId: ComparisonPeriod) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-[145px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2 transition-all cursor-pointer select-none focus:outline-none hover:border-primary/60 hover:text-slate-950 dark:hover:text-white ${
          isOpen ? 'border-primary ring-1 ring-primary/30 text-slate-950 dark:text-white' : ''
        }`}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : 'text-slate-400 dark:text-slate-500'
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 w-[145px] z-50 p-1 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-xl shadow-xl shadow-slate-900/10 dark:shadow-black/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
        >
          {COMPARISON_OPTIONS.map((option) => {
            const isSelected = option.id === value;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.id)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors select-none cursor-pointer ${
                  isSelected
                    ? 'bg-primary/15 text-primary font-bold border border-primary/25'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
