import React from 'react';
import { Users } from 'lucide-react';

export type LeadSearchMode = 'people' | 'company' | 'import';

export interface LeadFinderSearchModesToolbarProps {
  activeMode?: LeadSearchMode;
  onModeChange?: (mode: LeadSearchMode) => void;
  onTriggerCsvModal?: () => void;
}

export const LeadFinderSearchModesToolbar: React.FC<LeadFinderSearchModesToolbarProps> = () => {
  return (
    <div className="font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-[#1E1E1E] text-xs font-bold text-blue-600 dark:text-blue-400">
          <Users className="w-3.5 h-3.5" />
          <span>People (8D Matrix)</span>
        </div>

        {/* Right stats / quick badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs pr-2 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">100M+ Verified B2B Profiles</span>
        </div>
      </div>
    </div>
  );
};

export default LeadFinderSearchModesToolbar;
