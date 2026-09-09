import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface IndustryKeywordsControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const IndustryKeywordsControl: React.FC<IndustryKeywordsControlProps> = ({ draft, setDraft }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const industryOptions = leadFilterOptions.industries.map((ind) => ({ value: ind, label: ind }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeIndustries || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, industries: next, excludeIndustries: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.industries || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeIndustries: next, industries: cleanedInclude };
    });
  };

  const handleKeywordsInclude = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeIndustryKeywords || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, industryKeywords: next, excludeIndustryKeywords: cleanedExclude };
    });
  };

  const handleKeywordsExclude = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.industryKeywords || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeIndustryKeywords: next, industryKeywords: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Industry Include / Exclude */}
      <IncludeExcludeFilterGroup
        label="Industries"
        options={industryOptions}
        include={draft.industries || []}
        exclude={draft.excludeIndustries || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Search industries to include..."
        excludePlaceholder="Search industries to exclude..."
        allowCustom={true}
        countNoun="industries"
      />

      {/* Advanced Settings Toggle */}
      <div className="pt-1 border-t border-slate-200/60 dark:border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-primary" />
            <span>Company Keywords & Matching</span>
          </div>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showAdvanced && (
          <div className="space-y-3 pt-2 pl-1 animate-in fade-in duration-150">
            {/* Match Mode Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Match Keywords:</span>
              <div className="flex items-center rounded-lg p-0.5 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={() => setDraft((p) => ({ ...p, keywordMatchMode: 'any' }))}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    draft.keywordMatchMode !== 'all'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ANY
                </button>
                <button
                  type="button"
                  onClick={() => setDraft((p) => ({ ...p, keywordMatchMode: 'all' }))}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    draft.keywordMatchMode === 'all'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ALL
                </button>
              </div>
            </div>

            {/* Include Keywords */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Include Company Keywords
              </label>
              <SearchableMultiSelect
                options={(draft.industryKeywords || []).map((k) => ({ value: k, label: k }))}
                selected={draft.industryKeywords || []}
                onChange={handleKeywordsInclude}
                placeholder="Type keywords and press Enter..."
                allowCustom={true}
              />
            </div>

            {/* Exclude Keywords */}
            <div>
              <label className="block text-[11px] font-semibold text-rose-600 dark:text-rose-400 mb-1">
                Exclude Company Keywords
              </label>
              <SearchableMultiSelect
                options={(draft.excludeIndustryKeywords || []).map((k) => ({ value: k, label: k }))}
                selected={draft.excludeIndustryKeywords || []}
                onChange={handleKeywordsExclude}
                placeholder="Keywords to exclude..."
                allowCustom={true}
                variant="exclude"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
