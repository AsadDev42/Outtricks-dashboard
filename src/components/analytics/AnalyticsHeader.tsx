import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Download, 
  Printer, 
  RotateCcw, 
  Filter, 
  RefreshCw,
  Search,
  Users,
  ChevronDown,
  X,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ComparisonDropdown } from './ComparisonDropdown';
import { 
  useAnalytics, 
  DateRangeType, 
  ComparisonPeriod,
  AnalyticsSubTab 
} from '../../context/AnalyticsContext';

export interface AnalyticsHeaderProps {
  currentSection: AnalyticsSubTab;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ currentSection }) => {
  const { 
    dateRange, 
    setDateRange, 
    comparison,
    setComparison,
    comparePriorPeriod,
    setComparePriorPeriod,
    filters, 
    setFilter, 
    resetFilters, 
    isRefreshing, 
    refreshData, 
    exportReport 
  } = useAnalytics();

  const DATE_RANGE_OPTIONS: { id: DateRangeType; label: string }[] = [
    { id: 'TODAY', label: 'Today' },
    { id: '7D', label: '7D' },
    { id: '30D', label: '30D' },
    { id: '90D', label: '90D' },
    { id: 'THIS_MONTH', label: 'This Month' },
    { id: 'THIS_QUARTER', label: 'This Qtr' },
    { id: 'YTD', label: 'YTD' },
    { id: '12M', label: '12M' },
  ];

  const hasActiveFilterOverrides = 
    filters.team !== 'all' || 
    filters.module !== 'all' || 
    filters.channel !== 'all' || 
    filters.user !== 'all' ||
    filters.plan !== 'all';

  return (
    <div className="space-y-3 font-sans">
      
      {/* 1. Top Unified Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4">
        
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold shrink-0">
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 dark:text-white capitalize">
              {currentSection === 'ai-usage' ? 'Tricksy AI Telemetry & LLM Intelligence' : currentSection === 'overview' ? 'Revenue Intelligence & Analytics' : `${currentSection} Analytics`}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Live Telemetry
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Multi-touch revenue attribution, campaign conversion velocity, channel ROI comparisons, and predictive pipeline intelligence.
          </p>
        </div>

        {/* Date Range Selector & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Date Range Dropdown / Switcher Pills */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-mono overflow-x-auto max-w-full">
            {DATE_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDateRange(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  dateRange === opt.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Toggle: Compare to Prior Period */}
          <button
            type="button"
            onClick={() => setComparePriorPeriod(!comparePriorPeriod)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer select-none ${
              comparePriorPeriod
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-[#1C1C1C] border-slate-200/80 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]'
            }`}
            title="Toggle period-over-period percentage delta comparison badges"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${comparePriorPeriod ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`} />
            <span>Compare Delta</span>
          </button>

          {/* Comparison Selector (visible when compare is active) */}
          {comparePriorPeriod && (
            <ComparisonDropdown
              value={comparison}
              onChange={setComparison}
            />
          )}

          {/* Refresh Action */}
          <Button
            variant="secondary"
            size="sm"
            onClick={refreshData}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />}
          >
            Refresh
          </Button>

          {/* Export CSV */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportReport('CSV')}
            leftIcon={<Download className="w-3 h-3" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 2. Global Compact Filter Strip */}
      <div className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>Scope:</span>
          </div>

          {/* Team Filter */}
          <select
            value={filters.team}
            onChange={(e) => setFilter('team', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-[#3A3A3A] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Team: All Teams</option>
            <option value="tm-1" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">CloudScale Revenue Ops</option>
            <option value="tm-2" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Apex Outbound Growth</option>
            <option value="tm-3" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Solaris Strategic Deals</option>
          </select>

          {/* Channel Filter */}
          <select
            value={filters.channel}
            onChange={(e) => setFilter('channel', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-[#3A3A3A] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Channel: All Channels</option>
            <option value="email" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Cold Email</option>
            <option value="voice" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Voice AI SDR</option>
            <option value="linkedin" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">LinkedIn Safe</option>
            <option value="upwork" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Upwork Studio</option>
            <option value="leadfinder" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">8D Lead Finder</option>
          </select>

          {/* Module Filter */}
          <select
            value={filters.module}
            onChange={(e) => setFilter('module', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-[#3A3A3A] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Module: All Modules</option>
            <option value="email" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Cold Email</option>
            <option value="voice" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Voice AI</option>
            <option value="linkedin" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">LinkedIn</option>
            <option value="leadfinder" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Lead Finder</option>
            <option value="agents" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Tricksy Agents</option>
            <option value="workflows" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Workflows</option>
            <option value="crm" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Deals CRM</option>
          </select>

          {/* User Filter */}
          <select
            value={filters.user}
            onChange={(e) => setFilter('user', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-[#3A3A3A] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">User: All Users</option>
            <option value="usr-1" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Sarah Jenkins</option>
            <option value="usr-2" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">David Zhao</option>
            <option value="usr-3" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Alex Rivera</option>
            <option value="usr-4" className="bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200">Elena Rostova</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        {hasActiveFilterOverrides && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
