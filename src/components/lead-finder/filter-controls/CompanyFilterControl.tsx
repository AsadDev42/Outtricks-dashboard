import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';
import { LeadFinderCompanyDomainFilter } from '../LeadFinderCompanyDomainFilter';

interface CompanyFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const CompanyFilterControl: React.FC<CompanyFilterControlProps> = ({ draft, setDraft }) => {
  const companyOptions = leadFilterOptions.companies.map((c) => ({ value: c, label: c }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeCompanies || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, companies: next, excludeCompanies: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.companies || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeCompanies: next, companies: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* 1. Named Companies Include & Exclude */}
      <IncludeExcludeFilterGroup
        label="Company Names"
        options={companyOptions}
        include={draft.companies || []}
        exclude={draft.excludeCompanies || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Search company names (e.g. Stripe, OpenAI)..."
        excludePlaceholder="Search companies to exclude..."
        allowCustom={true}
        countNoun="companies"
      />

      {/* 2. Specific Target Domains */}
      <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <LeadFinderCompanyDomainFilter
          selectedDomains={draft.companyDomains || []}
          onChange={(next) => setDraft((p) => ({ ...p, companyDomains: next }))}
          onClearAll={() => setDraft((p) => ({ ...p, companyDomains: [] }))}
        />
      </div>

      {/* 3. Include Past Companies */}
      <div className="pt-1">
        <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(draft.includePastCompanies)}
            onChange={(e) => setDraft((p) => ({ ...p, includePastCompanies: e.target.checked }))}
            className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span className="font-medium">Include prospects who previously worked at these companies</span>
        </label>
      </div>
    </div>
  );
};
