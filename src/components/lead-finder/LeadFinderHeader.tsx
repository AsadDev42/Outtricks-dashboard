import React from 'react';
import { 
  Search, 
  Sliders, 
  Upload, 
  Download, 
  Bookmark, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Check,
  RotateCw,
  Plus,
  Clock,
  RefreshCw,
  Users,
  Building2,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLeadSearch } from '../../context/LeadSearchContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';

export type LeadFinderTabType = 'search' | 'overview' | 'saved' | 'history';

export interface LeadFinderHeaderProps {
  activeTab?: LeadFinderTabType;
  onSelectTab?: (tab: LeadFinderTabType) => void;
  onOpenImportModal: () => void;
  onOpenSavedSearchesDrawer: () => void;
  onToggleMobileFilters: () => void;
}

export const LeadFinderHeader: React.FC<LeadFinderHeaderProps> = ({
  activeTab = 'search',
  onSelectTab,
  onOpenImportModal,
  onOpenSavedSearchesDrawer,
  onToggleMobileFilters,
}) => {
  const { currentWorkspace } = useAuth();
  const { 
    filters, 
    setSearchQuery, 
    savedSearches, 
    loadSavedSearch, 
    pagination,
    refreshSearch,
    exportToCsv,
    searchHistory
  } = useLeadSearch();

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Telemetry Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-[#161616] to-slate-900 border border-blue-800/80 shadow-xl text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest font-mono">
              8-Dimension B2B Lead Database
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Search 480M+ Global Decision Makers
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Query B2B decision-makers, direct emails, mobile dials, tech stack indicators, and hiring signals.
          </p>
        </div>

        {/* Workspace Balance & Live Count Badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs space-y-0.5 min-w-[110px]">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Available Credits
            </div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
              {currentWorkspace ? currentWorkspace.credits.toLocaleString() : '1,840'}
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs space-y-0.5 min-w-[110px]">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Search Matches
            </div>
            <div className="text-sm sm:text-base font-extrabold text-blue-400 font-mono">
              {pagination.totalResults.toLocaleString()}
            </div>
          </div>
        </div>

      </div>

      {/* Actions Toolbar */}
      <div className="flex items-center justify-end gap-2.5 sm:gap-3">
        <button
          onClick={onOpenImportModal}
          className="h-[34px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200/60 dark:border-[#202020]"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import CSV</span>
        </button>
        <button
          onClick={exportToCsv}
          className="h-[34px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200/60 dark:border-[#202020]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Control Bar: Search Input & Saved Presets (Active on search tab) */}
      {activeTab === 'search' && (
        <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center justify-between gap-3">
          
          {/* Search Field */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contact name, job title, company name, or technology keyword..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden h-[34px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Saved Presets Drawer Trigger */}
            <button
              onClick={onOpenSavedSearchesDrawer}
              className="h-[34px] px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Presets ({savedSearches.length})</span>
            </button>

            {/* Refresh Live DB Query */}
            <button
              onClick={refreshSearch}
              className="w-[34px] h-[34px] rounded-xl bg-slate-50 dark:bg-[#1C1C1C] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center cursor-pointer"
              title="Refresh Search Results"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
