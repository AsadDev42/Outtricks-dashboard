import React from 'react';
import { useLeadSearch } from '../../context/LeadSearchContext';
import { Button } from '../ui/Button';
import { X, Bookmark, Share2, RotateCcw, Sliders } from 'lucide-react';

export interface LeadFilterChipsBarProps {
  onOpenSaveSearchModal: () => void;
  onOpenSavedSearchesDrawer: () => void;
  onOpenAdvancedFilters?: () => void;
}

export const LeadFilterChipsBar: React.FC<LeadFilterChipsBarProps> = ({
  onOpenSaveSearchModal,
  onOpenSavedSearchesDrawer,
  onOpenAdvancedFilters,
}) => {
  const {
    filters,
    removeFilterChip,
    resetFilters,
    copyShareableSearchUrl,
    setIsAdvancedFiltersDrawerOpen
  } = useLeadSearch();

  // Construct readable chips list
  const chips: { id: string; category: keyof typeof filters; label: string; value?: string }[] = [];

  if (filters.searchQuery) {
    chips.push({ id: 'q', category: 'searchQuery', label: `Keyword: "${filters.searchQuery}"` });
  }

  filters.contactTypes.forEach((c) => {
    chips.push({ id: `c_${c}`, category: 'contactTypes', label: `Contact: ${c.replace('_', ' ')}`, value: c });
  });

  filters.roles.forEach((r) => {
    chips.push({ id: `role_${r}`, category: 'roles', label: `Role: ${r}`, value: r });
  });

  filters.seniority.forEach((s) => {
    chips.push({ id: `sen_${s}`, category: 'seniority', label: `Seniority: ${s}`, value: s });
  });

  filters.departments.forEach((d) => {
    chips.push({ id: `dept_${d}`, category: 'departments', label: `Dept: ${d}`, value: d });
  });

  filters.industries.forEach((ind) => {
    chips.push({ id: `ind_${ind}`, category: 'industries', label: `Industry: ${ind}`, value: ind });
  });

  filters.headcount.forEach((s) => {
    chips.push({ id: `size_${s}`, category: 'headcount', label: `Size: ${s}`, value: s });
  });

  filters.revenue.forEach((rev) => {
    chips.push({ id: `rev_${rev}`, category: 'revenue', label: `Rev: ${rev}`, value: rev });
  });

  filters.locations.forEach((loc) => {
    chips.push({ id: `loc_${loc}`, category: 'locations', label: `Location: ${loc}`, value: loc });
  });

  filters.workplaceType.forEach((wp) => {
    chips.push({ id: `wp_${wp}`, category: 'workplaceType', label: `Workplace: ${wp}`, value: wp });
  });

  filters.technologies.forEach((t) => {
    chips.push({ id: `tech_${t}`, category: 'technologies', label: `Tech: ${t}`, value: t });
  });

  filters.intentSignals.forEach((sig) => {
    chips.push({ id: `intent_${sig}`, category: 'intentSignals', label: `Intent: ${sig}`, value: sig });
  });

  filters.intentTopics.forEach((topic) => {
    chips.push({ id: `topic_${topic}`, category: 'intentTopics', label: `Topic: ${topic}`, value: topic });
  });

  filters.fundingStage.forEach((st) => {
    chips.push({ id: `fnd_${st}`, category: 'fundingStage', label: `Funding: ${st}`, value: st });
  });

  if (filters.qualityScoreMin > 0) {
    chips.push({ id: 'score_min', category: 'qualityScoreMin', label: `Score >= ${filters.qualityScoreMin}` });
  }

  filters.customRules.forEach((rule) => {
    chips.push({ id: rule.id, category: 'customRules', label: `${rule.field} ${rule.operator} "${rule.value}"`, value: rule.id });
  });

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-wrap items-center justify-between gap-3 font-sans animate-in fade-in duration-200">
      
      {/* Left: Chips List */}
      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
          <Sliders className="w-3 h-3" />
          <span>Active Filters ({chips.length}):</span>
        </div>

        {chips.map((chip) => (
          <span
            key={chip.id}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 text-xs font-semibold"
          >
            <span>{chip.label}</span>
            <button
              type="button"
              onClick={() => removeFilterChip(chip.category, chip.value)}
              className="p-0.5 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-500 hover:text-blue-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Remove filter"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-bold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ml-1 cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Right: Quick Actions (Save Search & Share URL) */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyShareableSearchUrl}
          leftIcon={<Share2 className="w-3.5 h-3.5" />}
        >
          Share Query
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenSaveSearchModal}
          leftIcon={<Bookmark className="w-3.5 h-3.5" />}
        >
          Save Search
        </Button>
      </div>

    </div>
  );
};
