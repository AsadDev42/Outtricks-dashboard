import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface FundingFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const FundingFilterControl: React.FC<FundingFilterControlProps> = ({ draft, setDraft }) => {
  const stageOptions = (leadFilterOptions.fundingStages || []).map((s) => ({ value: s, label: s }));

  return (
    <div className="space-y-3 pt-1 text-xs">
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Funding Rounds & Stages
        </label>
        <SearchableMultiSelect
          options={stageOptions}
          selected={draft.fundingStage || []}
          onChange={(next) => setDraft((p) => ({ ...p, fundingStage: next }))}
          placeholder="Select funding stages (Seed, Series A, Series B)..."
        />
      </div>

      <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Total Funding Amount
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['$0 - $1M', '$1M - $5M', '$5M - $20M', '$20M - $50M', '$50M - $100M', '$100M+'].map((tier) => {
            const isChecked = (draft.totalFunding || []).includes(tier);
            return (
              <label
                key={tier}
                className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setDraft((prev) => {
                      const cur = prev.totalFunding || [];
                      const next = cur.includes(tier) ? cur.filter((t) => t !== tier) : [...cur, tier];
                      return { ...prev, totalFunding: next };
                    });
                  }}
                  className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{tier}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
