import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { SearchableMultiSelect } from '../../ui/SearchableMultiSelect';

interface EducationFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const EducationFilterControl: React.FC<EducationFilterControlProps> = ({ draft, setDraft }) => {
  const schoolOptions = leadFilterOptions.schools.map((s) => ({ value: s, label: s }));
  const degreeOptions = leadFilterOptions.degrees.map((d) => ({ value: d, label: d }));
  const majorOptions = leadFilterOptions.majors.map((m) => ({ value: m, label: m }));

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* School */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          School
        </label>
        <SearchableMultiSelect
          options={schoolOptions}
          selected={draft.educationSchools || []}
          onChange={(next) => setDraft((p) => ({ ...p, educationSchools: next }))}
          placeholder="Select schools..."
          allowCustom={true}
        />
      </div>

      {/* Degree */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Degree
        </label>
        <SearchableMultiSelect
          options={degreeOptions}
          selected={draft.educationDegrees || []}
          onChange={(next) => setDraft((p) => ({ ...p, educationDegrees: next }))}
          placeholder="Select degrees..."
          allowCustom={true}
        />
      </div>

      {/* Major */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Major
        </label>
        <SearchableMultiSelect
          options={majorOptions}
          selected={draft.educationMajors || []}
          onChange={(next) => setDraft((p) => ({ ...p, educationMajors: next }))}
          placeholder="Select majors..."
          allowCustom={true}
        />
      </div>

      {/* Graduation Year */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Graduation Year
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min YYYY"
            value={draft.graduationYearMin || ''}
            onChange={(e) => setDraft((p) => ({ ...p, graduationYearMin: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="text-slate-400 font-bold">—</span>
          <input
            type="number"
            placeholder="Max YYYY"
            value={draft.graduationYearMax || ''}
            onChange={(e) => setDraft((p) => ({ ...p, graduationYearMax: e.target.value }))}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};
