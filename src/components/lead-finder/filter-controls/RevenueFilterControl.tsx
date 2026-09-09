import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';

interface RevenueFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const RevenueFilterControl: React.FC<RevenueFilterControlProps> = ({ draft, setDraft }) => {
  const revOptions = leadFilterOptions.revenueRanges.map((r) => ({ value: r, label: r }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeRevenue || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, revenue: next, excludeRevenue: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.revenue || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeRevenue: next, revenue: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      <IncludeExcludeFilterGroup
        label="Annual Revenue (ARR)"
        options={revOptions}
        include={draft.revenue || []}
        exclude={draft.excludeRevenue || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Select revenue tiers to include..."
        excludePlaceholder="Select revenue tiers to exclude..."
        countNoun="tiers"
      />
    </div>
  );
};
