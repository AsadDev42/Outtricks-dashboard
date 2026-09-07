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
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-[#222222] shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold shrink-0">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white capitalize">
              {currentSection === 'ai-usage' ? 'Tricksy AI Telemetry & LLM Intelligence' : currentSection === 'overview' ? 'Revenue Intelligence & Analytics' : `${currentSection} Analytics`}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Multi-touch revenue attribution, campaign conversion velocity, channel ROI comparisons, and predictive pipeline intelligence.
          </p>
        </div>

        {/* Date Range Selector & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Date Range Dropdown / Switcher Pills */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] text-xs font-mono overflow-x-auto max-w-full">
            {DATE_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDateRange(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  dateRange === opt.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Comparison Selector */}
          <ComparisonDropdown
            value={comparison}
            onChange={setComparison}
          />

          {/* Refresh Action */}
          <Button
            variant="secondary"
            size="sm"
            onClick={refreshData}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />}
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
      <div className="px-4 py-2.5 rounded-xl bg-[#141414] border border-[#222222] shadow-xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scope:</span>
          </div>

          {/* Team Filter */}
          <select
            value={filters.team}
            onChange={(e) => setFilter('team', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-slate-300 font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">Team: All Teams</option>
            <option value="tm-1">CloudScale Revenue Ops</option>
            <option value="tm-2">Apex Outbound Growth</option>
            <option value="tm-3">Solaris Strategic Deals</option>
          </select>

          {/* Channel Filter */}
          <select
            value={filters.channel}
            onChange={(e) => setFilter('channel', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-slate-300 font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">Channel: All Channels</option>
            <option value="email">Cold Email</option>
            <option value="voice">Voice AI SDR</option>
            <option value="linkedin">LinkedIn Safe</option>
            <option value="upwork">Upwork Studio</option>
            <option value="leadfinder">8D Lead Finder</option>
          </select>

          {/* Module Filter */}
          <select
            value={filters.module}
            onChange={(e) => setFilter('module', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-slate-300 font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">Module: All Modules</option>
            <option value="email">Cold Email</option>
            <option value="voice">Voice AI</option>
            <option value="linkedin">LinkedIn</option>
            <option value="leadfinder">Lead Finder</option>
            <option value="agents">Tricksy Agents</option>
            <option value="workflows">Workflows</option>
            <option value="crm">Deals CRM</option>
          </select>

          {/* User Filter */}
          <select
            value={filters.user}
            onChange={(e) => setFilter('user', e.target.value)}
            className="pl-2.5 pr-6 py-1 rounded-lg bg-[#1C1C1C] border border-[#2A2A2A] text-slate-300 font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">User: All Users</option>
            <option value="usr-1">Sarah Jenkins</option>
            <option value="usr-2">David Zhao</option>
            <option value="usr-3">Alex Rivera</option>
            <option value="usr-4">Elena Rostova</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        {hasActiveFilterOverrides && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
