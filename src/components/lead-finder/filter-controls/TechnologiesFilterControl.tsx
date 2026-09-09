import React from 'react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { leadFilterOptions } from '../../../data/leadFilterOptions';
import { IncludeExcludeFilterGroup } from '../../ui/IncludeExcludeFilterGroup';

interface TechnologiesFilterControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const TechnologiesFilterControl: React.FC<TechnologiesFilterControlProps> = ({ draft, setDraft }) => {
  const techOptions = leadFilterOptions.technologies.map((t) => ({ value: t, label: t }));

  const handleIncludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentExclude = prev.excludeTechnologies || [];
      const cleanedExclude = currentExclude.filter((item) => !next.includes(item));
      return { ...prev, technologies: next, excludeTechnologies: cleanedExclude };
    });
  };

  const handleExcludeChange = (next: string[]) => {
    setDraft((prev) => {
      const currentInclude = prev.technologies || [];
      const cleanedInclude = currentInclude.filter((item) => !next.includes(item));
      return { ...prev, excludeTechnologies: next, technologies: cleanedInclude };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      <IncludeExcludeFilterGroup
        label="Technology Stack"
        options={techOptions}
        include={draft.technologies || []}
        exclude={draft.excludeTechnologies || []}
        onIncludeChange={handleIncludeChange}
        onExcludeChange={handleExcludeChange}
        includePlaceholder="Search technologies (e.g. Salesforce, AWS, React)..."
        excludePlaceholder="Search technologies to exclude..."
        allowCustom={true}
        countNoun="technologies"
      />
    </div>
  );
};
