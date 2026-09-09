import React, { useState } from 'react';
import { Radar, ExternalLink, ShieldAlert } from 'lucide-react';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { Button } from '../../ui/Button';

interface WebsiteVisitorsControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const WebsiteVisitorsControl: React.FC<WebsiteVisitorsControlProps> = () => {
  const [visitorTab, setVisitorTab] = useState<'people' | 'companies'>('companies');

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Sub-tabs: People | Companies */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => setVisitorTab('companies')}
          className={`flex-1 py-1 px-2.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
            visitorTab === 'companies'
              ? 'bg-white dark:bg-[#202020] text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Companies
        </button>
        <button
          type="button"
          onClick={() => setVisitorTab('people')}
          className={`flex-1 py-1 px-2.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
            visitorTab === 'people'
              ? 'bg-white dark:bg-[#202020] text-slate-950 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          People
        </button>
      </div>

      {/* Realistic Connection Required State */}
      <div className="p-3 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 text-slate-700 dark:text-slate-300 space-y-2">
        <div className="flex items-start gap-2">
          <Radar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">
              Website Tracking Not Connected
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Install the Outtricks tracking pixel on your website to identify anonymous {visitorTab} and match them against your Lead Finder dataset.
            </p>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-500" />
            Zero tracking tag detected
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open('#', '_blank')}
            className="text-[11px] h-7 gap-1"
          >
            <span>Setup Tracking Tag</span>
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
