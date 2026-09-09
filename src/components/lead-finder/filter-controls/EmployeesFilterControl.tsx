import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';

interface EmployeesFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const EmployeesFilterControl: React.FC<EmployeesFilterControlProps> = ({ draft, setDraft }) => {
  const rangeType = draft.headcountRangeType || 'predefined';

  const setRangeType = (type: 'predefined' | 'custom' | 'unknown') => {
    setDraft((prev) => ({ ...prev, headcountRangeType: type }));
  };

  const toggleHeadcount = (val: string) => {
    setDraft((prev) => {
      const current = prev.headcount || [];
      const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
      return { ...prev, headcount: next };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Radio: Predefined Range */}
      <div className={`p-2.5 rounded-xl border transition-colors ${rangeType === 'predefined' ? 'border-primary/40 bg-primary/[0.02] dark:bg-primary/[0.04]' : 'border-slate-200 dark:border-[#2A2A2A]'}`}>
        <label className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer mb-2">
          <input
            type="radio"
            name="headcountType"
            checked={rangeType === 'predefined'}
            onChange={() => setRangeType('predefined')}
            className="w-3.5 h-3.5 text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span>Predefined Range</span>
        </label>

        {rangeType === 'predefined' && (
          <div className="grid grid-cols-1 gap-1.5 pl-5 pt-1">
            {leadFilterOptions.detailedHeadcountRanges.map((item) => {
              const isChecked = (draft.headcount || []).includes(item.value);
              return (
                <label
                  key={item.value}
                  className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleHeadcount(item.value)}
                      className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{item.countText}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Radio: Custom Range */}
      <div className={`p-2.5 rounded-xl border transition-colors ${rangeType === 'custom' ? 'border-primary/40 bg-primary/[0.02] dark:bg-primary/[0.04]' : 'border-slate-200 dark:border-[#2A2A2A]'}`}>
        <label className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
          <input
            type="radio"
            name="headcountType"
            checked={rangeType === 'custom'}
            onChange={() => setRangeType('custom')}
            className="w-3.5 h-3.5 text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span>Custom Range</span>
        </label>

        {rangeType === 'custom' && (
          <div className="grid grid-cols-2 gap-2 pl-5 pt-2.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Min</label>
              <input
                type="number"
                placeholder="e.g. 25"
                value={draft.customHeadcountMin || ''}
                onChange={(e) => setDraft((p) => ({ ...p, customHeadcountMin: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Max</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={draft.customHeadcountMax || ''}
                onChange={(e) => setDraft((p) => ({ ...p, customHeadcountMax: e.target.value }))}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Radio: Unknown */}
      <div className={`p-2.5 rounded-xl border transition-colors ${rangeType === 'unknown' ? 'border-primary/40 bg-primary/[0.02] dark:bg-primary/[0.04]' : 'border-slate-200 dark:border-[#2A2A2A]'}`}>
        <label className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
          <input
            type="radio"
            name="headcountType"
            checked={rangeType === 'unknown'}
            onChange={() => setRangeType('unknown')}
            className="w-3.5 h-3.5 text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span># of employees is unknown</span>
        </label>
      </div>
    </div>
  );
};
