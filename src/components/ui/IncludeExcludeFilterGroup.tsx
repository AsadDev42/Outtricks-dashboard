import React, { useCallback } from 'react';
import { SearchableMultiSelect, SearchableMultiSelectOption } from './SearchableMultiSelect';

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
  // Automatic conflict resolution:
  // If a value is added to Include while in Exclude, remove it from Exclude
  const handleIncludeChange = useCallback((newInclude: string[]) => {
    const newlyAdded = newInclude.filter((item) => !include.includes(item));
    if (newlyAdded.length > 0 && exclude.some((ex) => newlyAdded.includes(ex))) {
      onExcludeChange(exclude.filter((ex) => !newlyAdded.includes(ex)));
    }
    onIncludeChange(newInclude);
  }, [include, exclude, onIncludeChange, onExcludeChange]);

  // If a value is added to Exclude while in Include, remove it from Include
  const handleExcludeChange = useCallback((newExclude: string[]) => {
    const newlyAdded = newExclude.filter((item) => !exclude.includes(item));
    if (newlyAdded.length > 0 && include.some((inc) => newlyAdded.includes(inc))) {
      onIncludeChange(include.filter((inc) => !newlyAdded.includes(inc)));
    }
    onExcludeChange(newExclude);
  }, [include, exclude, onIncludeChange, onExcludeChange]);

  const hasActiveSelections = include.length > 0 || exclude.length > 0;

  return (
    <div className={`space-y-2.5 font-sans ${className}`}>
      {/* Header with Title and Active Badge Count */}
      {label && (
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-2 truncate">
            {icon && <span className="text-primary shrink-0">{icon}</span>}
            <span className="truncate">{label}</span>
          </div>

          {hasActiveSelections && (
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

      {/* Include Filter Field */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Include</span>
          </span>
          {include.length > 0 && (
            <span className="text-[10px] text-slate-400 font-mono">
              {include.length} selected
            </span>
          )}
        </div>
        <SearchableMultiSelect
          variant="include"
          options={options}
          selected={include}
          onChange={handleIncludeChange}
          placeholder={includePlaceholder}
          searchPlaceholder={searchPlaceholder || includePlaceholder}
          allowCustom={allowCustom}
          countNoun={countNoun}
          maxDisplayPills={2}
        />
      </div>

      {/* Exclude Filter Field */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>Exclude</span>
          </span>
          {exclude.length > 0 && (
            <span className="text-[10px] text-rose-500/80 font-mono">
              {exclude.length} excluded
            </span>
          )}
        </div>
        <SearchableMultiSelect
          variant="exclude"
          options={options}
          selected={exclude}
          onChange={handleExcludeChange}
          placeholder={excludePlaceholder}
          searchPlaceholder={searchPlaceholder || excludePlaceholder}
          allowCustom={allowCustom}
          countNoun={countNoun}
          maxDisplayPills={2}
        />
      </div>

      {/* Optional Extra Controls (Switches / Toggles) */}
      {extraControls && <div className="pt-0.5">{extraControls}</div>}
    </div>
  );
};
