import React from 'react';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  Clock, 
  Zap, 
  ArrowRight, 
  Building2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Filter,
  Play
} from 'lucide-react';
import { useLeadSearch } from '../../context/LeadSearchContext';
import { useAuth } from '../../context/AuthContext';

interface LeadFinderOverviewProps {
  onSwitchToSearch: () => void;
  onOpenImportModal: () => void;
}

const ICP_PRESETS = [
  {
    id: 'preset-1',
    title: 'Series A/B VP Sales in North America',
    description: 'Target decision-makers leading revenue and outbound expansion at high-growth Series A & B software companies.',
    filters: {
      roles: ['VP Sales', 'Head of Sales'],
      seniority: ['VP', 'Director'],
      headcount: ['51-200', '201-500'],
      locations: ['United States', 'Canada'],
      fundingStage: ['Series A', 'Series B']
    }
  },
  {
    id: 'preset-2',
    title: 'Enterprise RevOps & Sales Ops Leaders',
    description: 'Operations leaders evaluating multi-inbox rotation, pipeline attribution, and sales automation software.',
    filters: {
      roles: ['Head of Revenue Operations', 'Director of Sales Operations', 'VP RevOps'],
      seniority: ['Director', 'VP', 'Head'],
      headcount: ['201-500', '501-1000', '1001-5000'],
      industries: ['Software & SaaS', 'Information Technology']
    }
  },
  {
    id: 'preset-3',
    title: 'Mid-Market Founders & CEOs in UK / Europe',
    description: 'Founders and chief executives scaling outbound revenue teams across London, Berlin, and Paris hubs.',
    filters: {
      roles: ['Founder', 'Chief Executive Officer', 'Co-Founder'],
      seniority: ['C-Level', 'Owner'],
      locations: ['United Kingdom', 'Germany', 'France'],
      headcount: ['11-50', '51-200']
    }
  },
  {
    id: 'preset-4',
    title: 'Hiring Surge SDR / B2B SaaS Accounts',
    description: 'Companies exhibiting high buying signals with multiple active SDR job listings and marketing expansions.',
    filters: {
      intentSignals: ['Hiring Surge (+10 SDRs)', 'Funding Round'],
      industries: ['Software & SaaS'],
      headcount: ['51-200', '201-500']
    }
  }
];

export const LeadFinderOverview: React.FC<LeadFinderOverviewProps> = ({
  onSwitchToSearch,
  onOpenImportModal
}) => {
  const { 
    savedSearches, 
    searchHistory, 
    loadSavedSearch, 
    pagination,
    updateFilters,
    resetFilters
  } = useLeadSearch();

  const { currentWorkspace } = useAuth();

  const handleApplyPreset = (preset: typeof ICP_PRESETS[0]) => {
    resetFilters();
    updateFilters({
      roles: preset.filters.roles || [],
      seniority: preset.filters.seniority || [],
      locations: preset.filters.locations || [],
      industries: preset.filters.industries || [],
      headcount: preset.filters.headcount || [],
      intentSignals: preset.filters.intentSignals || [],
      fundingStage: preset.filters.fundingStage || [],
    });
    onSwitchToSearch();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DATABASE PROFILES
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              480M+
            </span>
            <span className="text-xs text-blue-600 font-bold">
              Global B2B
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Decision-makers across 180+ countries
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              WORKSPACE CREDITS
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {currentWorkspace ? currentWorkspace.credits.toLocaleString() : '1,840'}
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              Available
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            1 credit = 1 contact search query
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SAVED PRESETS
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {savedSearches.length}
            </span>
            <span className="text-xs text-slate-500">
              Saved Searches
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            One-click re-runs with current criteria
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE SEARCH MATCHES
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {pagination.totalResults.toLocaleString()}
            </span>
            <span className="text-xs text-sky-600 font-bold">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Available across current search criteria
          </p>
        </div>

      </div>

      {/* 2. Target ICP Search Presets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Recommended Target ICP Search Presets</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pre-configured multi-dimensional filters optimized for high-conversion B2B outbound campaigns.
            </p>
          </div>

          <button
            onClick={onSwitchToSearch}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Custom Search Builder</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ICP_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-300 dark:hover:border-blue-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {preset.title}
                  </h4>
                  <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400">
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400">
                <span>Apply & Run 8D Search</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Saved Searches & Search History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Saved Searches (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Saved Search Criteria ({savedSearches.length})</span>
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {savedSearches.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  loadSavedSearch(s);
                  onSwitchToSearch();
                }}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] hover:border-blue-400 cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    Saved {s.createdAt} • {s.resultsCount.toLocaleString()} matches
                  </div>
                </div>

                <button className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                  Run Search
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Search History (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Recent Search Log ({searchHistory.length})</span>
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {searchHistory.slice(0, 4).map((h) => (
              <div
                key={h.id}
                onClick={() => {
                  loadSavedSearch({ id: h.id, name: h.querySummary, filters: h.filters, createdAt: h.timestamp, resultsCount: h.resultsCount });
                  onSwitchToSearch();
                }}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] hover:border-blue-400 cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {h.querySummary}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    {h.timestamp} • {h.resultsCount.toLocaleString()} results
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
