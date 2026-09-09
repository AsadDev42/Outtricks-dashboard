import React, { useState, useCallback, useMemo } from 'react';
import { SearchableMultiSelect, SearchableMultiSelectOption } from './SearchableMultiSelect';
import { ChevronDown, ChevronUp, X, Check, ShieldAlert } from 'lucide-react';

export interface IncludeExcludeFilterGroupProps {
  label?: string;
  icon?: React.ReactNode;
  options: (string | SearchableMultiSelectOption)[];
  include: string[];
  exclude: string[];
  onIncludeChange: (newInclude: string[]) => void;
  onExcludeChange: (newExclude: string[]) => void;
  includePlaceholder?: string;
  excludePlaceholder?: string;
  searchPlaceholder?: string;
  allowCustom?: boolean;
  countNoun?: string;
  extraControls?: React.ReactNode;
  className?: string;
}

export const IncludeExcludeFilterGroup: React.FC<IncludeExcludeFilterGroupProps> = ({
  label,
  icon,
  options,
  include,
  exclude,
  onIncludeChange,
  onExcludeChange,
  includePlaceholder = 'Search to include...',
  excludePlaceholder = 'Search to exclude...',
  searchPlaceholder,
  allowCustom = true,
  countNoun,
  extraControls,
  className = '',
}) => {
  // Mode switch: 'include' | 'exclude'
  const [activeMode, setActiveMode] = useState<'include' | 'exclude'>('include');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Automatic conflict resolution:
  // If in Include mode, adding value removes it from Exclude
  const handleSelectionChange = useCallback((newSelected: string[]) => {
    if (activeMode === 'include') {
      const newlyAdded = newSelected.filter((item) => !include.includes(item));
      if (newlyAdded.length > 0 && exclude.some((ex) => newlyAdded.includes(ex))) {
        onExcludeChange(exclude.filter((ex) => !newlyAdded.includes(ex)));
      }
      onIncludeChange(newSelected);
    } else {
      const newlyAdded = newSelected.filter((item) => !exclude.includes(item));
      if (newlyAdded.length > 0 && include.some((inc) => newlyAdded.includes(inc))) {
        onIncludeChange(include.filter((inc) => !newlyAdded.includes(inc)));
      }
      onExcludeChange(newSelected);
    }
  }, [activeMode, include, exclude, onIncludeChange, onExcludeChange]);

  const handleRemoveInclude = (val: string) => {
    onIncludeChange(include.filter((item) => item !== val));
  };

  const handleRemoveExclude = (val: string) => {
    onExcludeChange(exclude.filter((item) => item !== val));
  };

  const totalActiveCount = include.length + exclude.length;

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {/* Header with Title and Active Badge Count */}
      {label && (
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-2 truncate">
            {icon && <span className="text-primary shrink-0">{icon}</span>}
            <span className="truncate">{label}</span>
          </div>

          {totalActiveCount > 0 && (
            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
              {include.length > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  title={`${include.length} included`}
                >
                  +{include.length}
                </span>
              )}
              {exclude.length > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded-full font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  title={`${exclude.length} excluded`}
                >
                  -{exclude.length}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mode Switch Pills: [ Include | Exclude ] */}
      <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#282828] text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setActiveMode('include')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
            activeMode === 'include'
              ? 'bg-white dark:bg-[#252525] text-emerald-600 dark:text-emerald-400 shadow-xs border border-emerald-500/20 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span>Include</span>
          {include.length > 0 && (
            <span className="text-[10px] font-mono font-bold px-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {include.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('exclude')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
            activeMode === 'exclude'
              ? 'bg-white dark:bg-[#252525] text-rose-600 dark:text-rose-400 shadow-xs border border-rose-500/20 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          <span>Exclude</span>
          {exclude.length > 0 && (
            <span className="text-[10px] font-mono font-bold px-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {exclude.length}
            </span>
          )}
        </button>
      </div>

      {/* Unified Single Searchable Selector */}
      <div>
        <SearchableMultiSelect
          variant={activeMode}
          options={options}
          selected={activeMode === 'include' ? include : exclude}
          onChange={handleSelectionChange}
          placeholder={activeMode === 'include' ? includePlaceholder : excludePlaceholder}
          searchPlaceholder={
            searchPlaceholder ||
            (activeMode === 'include' ? includePlaceholder : excludePlaceholder)
          }
          allowCustom={allowCustom}
          countNoun={countNoun}
          maxDisplayPills={1}
        />
      </div>

      {/* Compact Active Value Summaries */}
      {totalActiveCount > 0 && (
        <div className="space-y-1.5 pt-1 text-[11px]">
          {/* Included summary */}
          {include.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide shrink-0">
                Inc:
              </span>
              {include.slice(0, 3).map((item) => (
                <span
                  key={`inc-${item}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-medium max-w-[150px] truncate"
                  title={item}
                >
                  <span className="truncate">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInclude(item)}
                    className="hover:text-rose-500 shrink-0 cursor-pointer"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
              {include.length > 3 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  +{include.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Excluded summary */}
          {exclude.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide shrink-0">
                Exc:
              </span>
              {exclude.slice(0, 3).map((item) => (
                <span
                  key={`exc-${item}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 text-[10px] font-medium max-w-[150px] truncate"
                  title={item}
                >
                  <span className="truncate">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExclude(item)}
                    className="hover:text-rose-500 shrink-0 cursor-pointer"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
              {exclude.length > 3 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  +{exclude.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Advanced Options Collapsible (e.g. Include similar titles, etc.) */}
      {extraControls && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Advanced</span>
            {showAdvanced ? (
              <ChevronUp className="w-3 h-3 text-slate-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-slate-400" />
            )}
          </button>
          {showAdvanced && (
            <div className="pt-1.5 pl-0.5 space-y-1 animate-in fade-in-50 duration-150">
              {extraControls}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
