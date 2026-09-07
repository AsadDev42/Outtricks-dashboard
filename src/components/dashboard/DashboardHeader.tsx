import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  RotateCw, 
  Download, 
  Plus, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  Zap,
  Building2,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';

export interface DashboardHeaderProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  channelFilter: string;
  onChannelFilterChange: (channel: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenNewSequence: () => void;
  onOpenExportModal: () => void;
  lastUpdated: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  channelFilter,
  onChannelFilterChange,
  onRefresh,
  isRefreshing,
  onOpenNewSequence,
  onOpenExportModal,
  lastUpdated,
}) => {
  const { currentWorkspace } = useAuth();
  const { success } = useToast();

  const DATE_OPTIONS = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'this_month', label: 'This Month' },
    { value: 'all_time', label: 'All Time' },
  ];

  const CHANNEL_OPTIONS = [
    { value: 'all', label: 'All Channels (6)' },
    { value: 'email', label: 'Cold Email' },
    { value: 'linkedin', label: 'LinkedIn Safe' },
    { value: 'voice', label: 'Voice AI SDR' },
    { value: 'crm', label: 'Deals CRM' },
  ];

  const selectedDateLabel = DATE_OPTIONS.find((d) => d.value === dateRange)?.label || 'Last 7 Days';
  const selectedChannelLabel = CHANNEL_OPTIONS.find((c) => c.value === channelFilter)?.label || 'All Channels';

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner: Shift Briefing & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-emerald-950 via-[#161616] to-[#121212] rounded-3xl border border-emerald-800/40 shadow-xl text-white">
        
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
              Live Outbound Engine • Single Postgres Schema
            </span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="text-[11px] text-slate-400 font-medium">
              Last synced {lastUpdated}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Shift Briefing & Pipeline Pulse
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time telemetry across 480M+ verified leads, 24 rotating mailboxes, sub-400ms Voice SDR, and 5-stage CRM Kanban.
          </p>
        </div>

        {/* Workspace Quick Ledger Stats */}
        {currentWorkspace && (
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Credits Available
              </div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                {currentWorkspace.credits.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Active Inboxes
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white font-mono">
                {currentWorkspace.connectedInboxes} / {currentWorkspace.maxInboxes}
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-xs space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Deliverability
              </div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                99.4%
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Control Bar: Filters, Date Picker, Refresh & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        
        {/* Left: Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Date Range Selector */}
          <Dropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222222] transition-all cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>{selectedDateLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            }
            items={DATE_OPTIONS.map((opt) => ({
              label: opt.label,
              onClick: () => {
                onDateRangeChange(opt.value);
                success(`Showing data for ${opt.label}`, 'Filter Updated');
              },
              badge: opt.value === dateRange ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : undefined,
            }))}
            placement="bottom-left"
          />

          {/* Channel Filter */}
          <Dropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222222] transition-all cursor-pointer shadow-xs"
              >
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedChannelLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            }
            items={CHANNEL_OPTIONS.map((opt) => ({
              label: opt.label,
              onClick: () => {
                onChannelFilterChange(opt.value);
                success(`Filtered to ${opt.label}`, 'Channel Filter');
              },
              badge: opt.value === channelFilter ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : undefined,
            }))}
            placement="bottom-left"
          />

          {/* Refresh Action */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-[#2A2A2A] transition-all cursor-pointer disabled:opacity-50"
            title="Refresh live outbound metrics"
            aria-label="Refresh metrics"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>

        </div>

        {/* Right: Quick Action CTAs */}
        <div className="flex items-center gap-2.5">
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenExportModal}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Report
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewSequence}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Sequence
          </Button>

        </div>

      </div>

    </div>
  );
};
