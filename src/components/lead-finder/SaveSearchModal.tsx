import React, { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLeadSearch, LeadFilterState } from '../../context/LeadSearchContext';
import { Bookmark, Sparkles, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Automatically generates a concise meaningful search preset name based on active criteria
 * Examples:
 * - VP Sales · SaaS · USA · 51–200
 * - CRO · FinTech · 201–500
 * - Healthcare · Recently Funded · UK
 */
export function generateSuggestedSearchName(filters: LeadFilterState): string {
  const parts: string[] = [];

  // Role / Seniority
  if (filters.roles.length > 0) {
    const roleClean = filters.roles[0].replace('VP of ', 'VP ').replace('Head of ', 'Head ').split(' / ')[0].trim();
    parts.push(roleClean);
  } else if (filters.seniority.length > 0) {
    parts.push(filters.seniority[0]);
  }

  // Industry
  if (filters.industries.length > 0) {
    const indClean = filters.industries[0].replace('Enterprise B2B ', '').replace(' & B2B Payments', '').split(' & ')[0].trim();
    parts.push(indClean);
  }

  // Location
  const loc = (filters.contactLocations && filters.contactLocations.length > 0)
    ? filters.contactLocations[0]
    : filters.locations[0];
  if (loc) {
    let locClean = loc.split(',')[0].trim();
    if (loc.includes('United States') || loc.includes('USA')) locClean = 'USA';
    else if (loc.includes('United Kingdom') || loc.includes('UK')) locClean = 'UK';
    parts.push(locClean);
  }

  // Headcount / Intent / Funding
  if (filters.headcount.length > 0) {
    parts.push(filters.headcount[0]);
  } else if (filters.fundingStage.length > 0) {
    parts.push(filters.fundingStage[0]);
  } else if (filters.intentSignals.length > 0) {
    parts.push(filters.intentSignals[0]);
  }

  if (parts.length === 0) {
    return 'Target ICP Search';
  }

  return parts.join(' · ');
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, saveCurrentSearch, pagination } = useLeadSearch();
  const { success } = useToast();
  const [searchName, setSearchName] = useState('');

  const suggestedName = useMemo(() => {
    return generateSuggestedSearchName(filters);
  }, [filters]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = searchName.trim() || suggestedName;

    saveCurrentSearch(finalName);
    success(`Saved search preset "${finalName}" to Saved Searches.`, 'Search Saved');
    setSearchName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Search"
      description={`Save your current filter criteria snapshot (${pagination.totalResults.toLocaleString()} matching prospects) to your team's Saved Searches library.`}
      size="sm"
    >
      <form onSubmit={handleSave} className="space-y-4 font-sans">
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Preset Name (Optional)</span>
            <span className="text-[11px] text-slate-400 font-normal">Leave blank to use suggestion</span>
          </label>
          <Input
            placeholder={suggestedName}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            autoFocus
          />
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-0.5">
            <span className="font-semibold">Suggested:</span>
            <button
              type="button"
              onClick={() => setSearchName(suggestedName)}
              className="text-blue-600 dark:text-blue-400 font-mono hover:underline cursor-pointer truncate"
              title="Click to use this name"
            >
              {suggestedName}
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Complete Criteria Snapshot</span>
          </div>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
            Saves all include/exclude rules, titles, industries, locations, headcount, technologies, intent, and domains. Accessible anytime in Lead Finder → Saved Searches.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            leftIcon={<Bookmark className="w-3.5 h-3.5" />}
          >
            Save Search
          </Button>
        </div>

      </form>
    </Modal>
  );
};
