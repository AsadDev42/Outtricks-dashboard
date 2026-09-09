import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';

interface BuyingIntentControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const BuyingIntentControl: React.FC<BuyingIntentControlProps> = ({ draft, setDraft }) => {
  const intentOptions = leadFilterOptions.intentTopics.map((t) => ({ value: t, label: t }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeIntentTopics || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, intentTopics: next, excludeIntentTopics: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.intentTopics || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeIntentTopics: next, intentTopics: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      <IncludeExcludeFilterGroup
        label="Intent Topics & Surges"
        options={intentOptions}
        include={draft.intentTopics || []}
        exclude={draft.excludeIntentTopics || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Search intent topics to include..."
        excludePlaceholder="Search intent topics to exclude..."
        allowCustom={true}
        countNoun="intent topics"
      />

      {/* Recency Selector */}
      <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Signal Recency
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {['Past 7 Days', 'Past 30 Days', 'Past 90 Days'].map((recency) => {
            const isSelected = (draft.activityRecency || []).includes(recency);
            return (
              <button
                key={recency}
                type="button"
                onClick={() => {
                  setDraft((prev) => {
                    const current = prev.activityRecency || [];
                    const next = isSelected ? current.filter((r) => r !== recency) : [...current, recency];
                    return { ...prev, activityRecency: next };
                  });
                }}
                className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium border transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {recency}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
