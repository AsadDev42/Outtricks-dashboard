import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface JobTitlesFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const JobTitlesFilterControl: React.FC<JobTitlesFilterControlProps> = ({ draft, setDraft }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const titleOptions = leadFilterOptions.jobTitles.map((t) => ({ value: t, label: t }));
  const deptOptions = leadFilterOptions.departments.map((d) => ({ value: d, label: d }));
  const seniorityOptions = leadFilterOptions.seniorities.map((s) => ({ value: s, label: s }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeRoles || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, roles: next, excludeRoles: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.roles || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeRoles: next, roles: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Include & Exclude Job Titles */}
      <IncludeExcludeFilterGroup
        label="Job Titles"
        options={titleOptions}
        include={draft.roles || []}
        exclude={draft.excludeRoles || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Search job titles to include..."
        excludePlaceholder="Search job titles to exclude..."
        allowCustom={true}
        countNoun="titles"
      />

      {/* Checkboxes: Similar Titles */}
      <div className="space-y-2 pt-1 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(draft.includeSimilarTitles)}
            onChange={(e) => setDraft((p) => ({ ...p, includeSimilarTitles: e.target.checked }))}
            className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span className="font-medium">Include similar & normalized titles</span>
        </label>

        <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(draft.includePastTitles)}
            onChange={(e) => setDraft((p) => ({ ...p, includePastTitles: e.target.checked }))}
            className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
          />
          <span className="font-medium">Include past job titles held by contact</span>
        </label>
      </div>

      {/* Advanced Controls: Seniority & Department */}
      <div className="pt-1 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-primary" />
            <span>Seniority & Department Alignment</span>
          </div>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showAdvanced && (
          <div className="space-y-3 pt-2 pl-1 animate-in fade-in duration-150">
            {/* Seniority */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Seniority Level
              </label>
              <SearchableMultiSelect
                options={seniorityOptions}
                selected={draft.seniority || []}
                onChange={(next) => setDraft((p) => ({ ...p, seniority: next }))}
                placeholder="Select seniority (e.g. C-Level, VP, Director)..."
                allowCustom={true}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department / Function
              </label>
              <SearchableMultiSelect
                options={deptOptions}
                selected={draft.departments || []}
                onChange={(next) => setDraft((p) => ({ ...p, departments: next }))}
                placeholder="Select department (e.g. Sales, Engineering)..."
                allowCustom={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
