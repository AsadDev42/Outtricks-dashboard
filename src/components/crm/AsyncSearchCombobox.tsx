import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  X, 
  Loader2, 
  AlertCircle, 
  Clock, 
  RotateCcw
} from 'lucide-react';

export interface AsyncSearchComboboxProps<T> {
  label?: string;
  placeholder?: string;
  value?: string; // Selected item ID
  onChange: (id: string, item?: T) => void;
  onSearch: (query: string, signal: AbortSignal) => Promise<T[]>;
  getItemById?: (id: string) => Promise<T | undefined>;
  initialItem?: T;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  renderSelected: (item: T, onClear: () => void) => React.ReactNode;
  getItemKey: (item: T) => string;
  recentSectionTitle?: string;
  emptyMessage?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AsyncSearchCombobox<T>({
  label,
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  getItemById,
  initialItem,
  renderItem,
  renderSelected,
  getItemKey,
  recentSectionTitle = 'Recent Contacts',
  emptyMessage = 'No matching results found',
  errorMessage = 'Unable to load results. Try again.',
  required = false,
  disabled = false,
  className = '',
}: AsyncSearchComboboxProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | undefined>(initialItem);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<any>(null);

  // Hydrate selected item if value changes externally
  useEffect(() => {
    if (!value) {
      setSelectedItem(undefined);
      return;
    }
    if (selectedItem && getItemKey(selectedItem) === value) {
      return;
    }
    if (getItemById) {
      let isMounted = true;
      getItemById(value).then((found) => {
        if (isMounted && found) {
          setSelectedItem(found);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [value, getItemById, getItemKey]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Fetch logic with server-side simulation and AbortController
  const performSearch = useCallback(async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const results = await onSearch(query, controller.signal);
      if (!controller.signal.aborted) {
        setItems(results);
        setIsLoading(false);
        setHighlightedIndex(-1);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError' || err?.message === 'Aborted') {
        return; // Ignore cancelled requests
      }
      if (!controller.signal.aborted) {
        setError(errorMessage);
        setIsLoading(false);
        setItems([]);
      }
    }
  }, [onSearch, errorMessage]);

  // Trigger search when query changes with 250ms debounce
  const handleQueryChange = (text: string) => {
    setSearchQuery(text);
    if (!isOpen) setIsOpen(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(text);
    }, 250);
  };

  // Open handler: load recent items immediately when opening with empty query
  const handleFocusOrOpen = () => {
    if (disabled || selectedItem) return;
    setIsOpen(true);
    performSearch(searchQuery);
  };

  const handleSelect = (item: T) => {
    const key = getItemKey(item);
    setSelectedItem(item);
    setIsOpen(false);
    setSearchQuery('');
    setItems([]);
    onChange(key, item);
  };

  const handleClear = () => {
    setSelectedItem(undefined);
    setSearchQuery('');
    setItems([]);
    onChange('');
    setTimeout(() => {
      inputRef.current?.focus();
      handleFocusOrOpen();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        handleFocusOrOpen();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < items.length) {
        handleSelect(items[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const isRecentMode = searchQuery.trim().length === 0;

  return (
    <div ref={containerRef} className={`relative space-y-1 font-sans ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Selected Item Card View */}
      {selectedItem ? (
        <div className="relative">
          {renderSelected(selectedItem, handleClear)}
        </div>
      ) : (
        /* Search Input View */
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={handleFocusOrOpen}
            onClick={handleFocusOrOpen}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:opacity-50"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Dropdown Flyout */}
      {isOpen && !selectedItem && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-[#181818] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl shadow-xl overflow-hidden max-h-72 flex flex-col">
          
          {/* Header indicator */}
          <div className="px-3 py-1.5 bg-slate-50/80 dark:bg-[#202020] border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>
              {isRecentMode ? (
                <span className="flex items-center gap-1.5 text-primary">
                  <Clock className="w-3 h-3" />
                  {recentSectionTitle}
                </span>
              ) : (
                `Matching Results (${items.length})`
              )}
            </span>
            <span className="text-[9px] lowercase opacity-70">server-side indexed</span>
          </div>

          {/* List Content */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100/60 dark:divide-white/[0.04]">
            {/* Loading State */}
            {isLoading && items.length === 0 && (
              <div className="p-6 flex flex-col items-center justify-center gap-2 text-center text-slate-400 dark:text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-xs font-medium">Searching...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-4 flex flex-col items-center justify-center gap-2 text-center text-rose-500 dark:text-rose-400">
                <AlertCircle className="w-5 h-5" />
                <span className="text-xs font-medium">{error}</span>
                <button
                  type="button"
                  onClick={() => performSearch(searchQuery)}
                  className="mt-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && items.length === 0 && (
              <div className="p-6 text-center text-slate-400 dark:text-slate-500 space-y-1">
                <Search className="w-5 h-5 mx-auto opacity-40 mb-1" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {emptyMessage}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Try searching by name, email, company, job title, phone, or ID.
                </p>
              </div>
            )}

            {/* Result Items */}
            {!error && items.map((item, index) => {
              const key = getItemKey(item);
              const isHighlighted = highlightedIndex === index;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full text-left p-2.5 transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    isHighlighted
                      ? 'bg-slate-100 dark:bg-white/[0.08]'
                      : 'hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {renderItem(item, isHighlighted)}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-3 py-1 bg-slate-50/50 dark:bg-[#1C1C1C] border-t border-slate-100 dark:border-[#262626] text-[10px] text-slate-400 text-right">
            <span>Use ↑↓ to navigate, Enter to select</span>
          </div>
        </div>
      )}
    </div>
  );
}
