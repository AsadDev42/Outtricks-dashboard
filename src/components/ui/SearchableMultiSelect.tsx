import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Plus } from 'lucide-react';
import { filterMatches } from '../../data/leadFilterOptions';

export interface SearchableMultiSelectOption {
  value: string;
  label: string;
  category?: string;
  count?: number;
}

export interface SearchableMultiSelectProps {
  options: (string | SearchableMultiSelectOption)[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
  variant?: 'include' | 'exclude';
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  icon?: React.ReactNode;
  allowCustom?: boolean;
  maxDisplayPills?: number;
  className?: string;
  countNoun?: string;
  disabled?: boolean;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  options,
  selected,
  onChange,
  variant = 'include',
  placeholder = 'Select options...',
  searchPlaceholder = 'Search...',
  label,
  icon,
  allowCustom = true,
  maxDisplayPills = 2,
  className = '',
  countNoun,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Normalize options to object format
  const normalizedOptions = useMemo<SearchableMultiSelectOption[]>(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  // Filter options based on query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      filterMatches(opt.label, searchQuery) ||
      filterMatches(opt.value, searchQuery) ||
      (opt.category ? filterMatches(opt.category, searchQuery) : false)
    );
  }, [normalizedOptions, searchQuery]);

  // Check if query is an exact match in normalizedOptions
  const hasExactMatch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return normalizedOptions.some(
      (opt) => opt.value.toLowerCase() === q || opt.label.toLowerCase() === q
    );
  }, [normalizedOptions, searchQuery]);

  // Can add custom value if allowed, query is non-empty, and not an exact match
  const canAddCustom = allowCustom && searchQuery.trim().length > 0 && !hasExactMatch;

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Toggle selection
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Remove specific selected value
  const handleRemoveOne = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== val));
  };

  // Clear all selections
  const handleClearAll = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange([]);
  };

  // Handle adding custom value
  const handleAddCustom = () => {
    const val = searchQuery.trim();
    if (!val) return;
    if (!selected.includes(val)) {
      onChange([...selected, val]);
    }
    setSearchQuery('');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const totalItems = filteredOptions.length + (canAddCustom ? 1 : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1 < totalItems ? prev + 1 : 0));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalItems - 1));
        break;

      case 'Enter':
        e.preventDefault();
        if (canAddCustom && highlightedIndex === filteredOptions.length) {
          handleAddCustom();
        } else if (filteredOptions[highlightedIndex]) {
          handleToggle(filteredOptions[highlightedIndex].value);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[data-option-index]');
    const target = items[highlightedIndex] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const isExclude = variant === 'exclude';

  return (
    <div className={`relative w-full text-left font-sans ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full min-h-[36px] px-2.5 py-1.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all cursor-pointer select-none outline-none ${
          isOpen
            ? isExclude
              ? 'border-rose-500 ring-2 ring-rose-500/20 bg-white dark:bg-[#1A1A1A]'
              : 'border-primary ring-2 ring-primary/20 bg-white dark:bg-[#1A1A1A]'
            : isExclude
              ? 'border-rose-300/70 dark:border-rose-900/50 bg-rose-500/[0.03] hover:border-rose-400 dark:hover:border-rose-800'
              : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-50/70 dark:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 flex-wrap">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}

          {selected.length === 0 ? (
            <span className="text-slate-400 truncate">{placeholder}</span>
          ) : selected.length <= maxDisplayPills ? (
            // Show pills directly if within limit
            selected.map((val) => {
              const opt = normalizedOptions.find((o) => o.value === val);
              const displayLabel = opt ? opt.label : val;
              return (
                <span
                  key={val}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold truncate max-w-[170px] ${
                    isExclude
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : 'bg-primary/10 text-primary border border-primary/20'
                  }`}
                >
                  <span className="truncate">{displayLabel}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveOne(e, val)}
                    className="hover:opacity-70 cursor-pointer p-0.5 rounded-xs"
                    title={`Remove ${displayLabel}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              );
            })
          ) : countNoun ? (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold truncate ${
              isExclude
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}>
              {selected.length} {countNoun} {isExclude ? 'excluded' : 'selected'}
            </span>
          ) : (
            // Compact summary when many items are selected
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[11.5px]">
                {selected[0]}
                {selected.length > 1 && `, ${selected[1]}`}
              </span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-white shrink-0 ${
                isExclude ? 'bg-rose-500' : 'bg-primary'
              }`}>
                +{selected.length - 2}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="p-1 hover:text-red-500 rounded-md transition-colors cursor-pointer"
              title="Clear all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? (isExclude ? 'rotate-180 text-rose-500' : 'rotate-180 text-primary') : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute z-50 left-0 right-0 mt-1 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2C2C2C] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 min-w-[260px]"
          style={{ maxWidth: '100vw' }}
        >
          {/* Search Header */}
          <div className="p-2 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none p-0.5"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Info / Clear Header */}
          {selected.length > 0 && (
            <div className="px-3 py-1.5 bg-slate-50/80 dark:bg-white/[0.03] border-b border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-[10.5px]">
              <span className={`font-semibold ${isExclude ? 'text-rose-600 dark:text-rose-400' : 'text-primary'}`}>
                {selected.length} {isExclude ? (selected.length === 1 ? 'excluded' : 'excluded') : (selected.length === 1 ? 'included' : 'included')}
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-slate-500 hover:text-red-500 font-bold hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Options Scroll List */}
          <div
            ref={listRef}
            className="max-h-[260px] overflow-y-auto p-1 divide-y divide-slate-50 dark:divide-white/[0.02]"
            role="listbox"
          >
            {filteredOptions.length === 0 && !canAddCustom && (
              <div className="py-6 px-4 text-center text-xs text-slate-400">
                No matching options found
              </div>
            )}

            {filteredOptions.map((opt, index) => {
              const isSelected = selected.includes(opt.value);
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={opt.value}
                  data-option-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleToggle(opt.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer select-none ${
                    isHighlighted
                      ? 'bg-slate-100 dark:bg-white/[0.07] text-slate-950 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Checkbox box indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? isExclude
                            ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                            : 'bg-primary border-primary text-white shadow-xs'
                          : 'border-slate-300 dark:border-white/20 bg-white dark:bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>

                    <span className="truncate">{opt.label}</span>
                    {opt.category && (
                      <span className="text-[9.5px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400 shrink-0 ml-auto">
                        {opt.category}
                      </span>
                    )}
                  </div>

                  {opt.count !== undefined && (
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {opt.count}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Custom Value Adder Item */}
            {canAddCustom && (
              <div
                data-option-index={filteredOptions.length}
                onClick={handleAddCustom}
                onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isExclude
                    ? highlightedIndex === filteredOptions.length
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/5'
                    : highlightedIndex === filteredOptions.length
                      ? 'bg-primary/10 text-primary'
                      : 'text-primary hover:bg-primary/5'
                }`}
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  Add custom: &ldquo;<span className="underline">{searchQuery.trim()}</span>&rdquo;
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};