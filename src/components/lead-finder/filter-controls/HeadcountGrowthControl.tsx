import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface HeadcountGrowthControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const HeadcountGrowthControl: React.FC<HeadcountGrowthControlProps> = ({ draft, setDraft }) => {
  const deptOptions = leadFilterOptions.departments.map((d) => ({ value: d, label: d }));

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Growth Range Min / Max */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Growth range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min (%)"
            value={draft.headcountGrowthMin || ''}
            onChange={(e) => setDraft((p) => ({ ...p, headcountGrowthMin: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="text-slate-400 font-bold">—</span>
          <input
            type="number"
            placeholder="Max (%)"
            value={draft.headcountGrowthMax || ''}
            onChange={(e) => setDraft((p) => ({ ...p, headcountGrowthMax: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Timeframe */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Timeframe
        </label>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400">Past</span>
          <select
            value={draft.headcountGrowthTimeframe || '12'}
            onChange={(e) => setDraft((p) => ({ ...p, headcountGrowthTimeframe: e.target.value }))}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            {leadFilterOptions.growthTimeframes.map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </select>
          <span className="text-slate-500 dark:text-slate-400">Months</span>
        </div>
      </div>

      {/* Department */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Department
        </label>
        <SearchableMultiSelect
          options={deptOptions}
          selected={draft.headcountGrowthDepartment || []}
          onChange={(next) => setDraft((p) => ({ ...p, headcountGrowthDepartment: next }))}
          placeholder="Search departments..."
          allowCustom={true}
        />
      </div>
    </div>
  );
};
