import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCw, 
  SkipForward, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  ExternalLink, 
  Send, 
  Eye, 
  UserPlus, 
  MessageSquare, 
  ThumbsUp, 
  Layers, 
  AlertCircle,
  Calendar,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInQueueItem } from '../../context/LinkedInContext';

export const LinkedInOutreachQueueView: React.FC = () => {
  const { 
    allQueueItems, 
    executeQueueAction, 
    retryQueueAction, 
    skipQueueAction, 
    pauseQueueAction,
    campaigns 
  } = useLinkedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Scheduled' | 'Rate limited' | 'Completed' | 'Failed' | 'In progress'>('All');
  const [campaignFilter, setCampaignFilter] = useState<string>('All');
  const [actionFilter, setActionFilter] = useState<string>('All');

  // Filtered Queue
  const filteredItems = useMemo(() => {
    return allQueueItems.filter((item) => {
      const matchesSearch = 
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.leadCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actionTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === 'All' 
          ? true 
          : statusFilter === 'Scheduled' 
          ? (item.status === 'Scheduled' || item.status === 'Pending')
          : item.status === statusFilter;

      const matchesCampaign = 
        campaignFilter === 'All' || item.campaignId === campaignFilter || item.campaignName === campaignFilter;

      const matchesAction = 
        actionFilter === 'All' || item.actionType === actionFilter;

      return matchesSearch && matchesStatus && matchesCampaign && matchesAction;
    });
  }, [allQueueItems, searchQuery, statusFilter, campaignFilter, actionFilter]);

  // Aggregate Metrics
  const totalCount = allQueueItems.length;
  const scheduledCount = allQueueItems.filter((i) => i.status === 'Scheduled' || i.status === 'Pending').length;
  const rateLimitedCount = allQueueItems.filter((i) => i.status === 'Rate limited').length;
  const completedCount = allQueueItems.filter((i) => i.status === 'Completed').length;
  const failedCount = allQueueItems.filter((i) => i.status === 'Failed').length;

  const getActionIcon = (type: LinkedInQueueItem['actionType']) => {
    switch (type) {
      case 'connect':
        return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'visit':
        return <Eye className="w-4 h-4 text-purple-500" />;
      case 'endorse':
        return <ThumbsUp className="w-4 h-4 text-amber-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: LinkedInQueueItem['status']) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="emerald" size="sm">Completed</Badge>;
      case 'In progress':
        return <Badge variant="blue" size="sm" dot>In Progress</Badge>;
      case 'Scheduled':
      case 'Pending':
        return <Badge variant="slate" size="sm">Scheduled</Badge>;
      case 'Rate limited':
        return <Badge variant="amber" size="sm">Rate Limited</Badge>;
      case 'Failed':
        return <Badge variant="rose" size="sm">Failed</Badge>;
      case 'Skipped':
        return <Badge variant="slate" size="sm">Skipped</Badge>;
      default:
        return <Badge variant="slate" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Outreach Execution Queue</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time rate-limited and humanized task pipeline. Transparently shows scheduled, deferred, and rate-limited actions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const nextPending = allQueueItems.find((i) => i.status === 'Pending' || i.status === 'Scheduled');
              if (nextPending) executeQueueAction(nextPending.id);
            }}
            leftIcon={<Play className="w-3.5 h-3.5" />}
          >
            Run Next Action
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              allQueueItems
                .filter((i) => i.status === 'Pending' || i.status === 'Scheduled')
                .slice(0, 3)
                .forEach((item) => executeQueueAction(item.id));
            }}
            leftIcon={<Zap className="w-3.5 h-3.5" />}
            className="shadow-md shadow-emerald-600/20"
          >
            Process Batch (3)
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total In Queue</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{totalCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scheduled</span>
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{scheduledCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rate Limited / Deferred</span>
          <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{rateLimitedCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Today</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{completedCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Failed / Errors</span>
          <span className="text-xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">{failedCount}</span>
        </div>
      </div>

      {/* 3. Safety Notice Banner */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 dark:text-white block">
              Autonomous Pacing & Cloud Proxy Active
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Actions execute with randomized 180s–420s jitter intervals through static residential IPs. If an account reaches its 25 daily invite limit, actions are safely deferred to the next business day.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 shrink-0">
          <span>Target Cap: 25 invites/day</span>
        </div>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prospect, campaign, or action..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto">
          {(['All', 'Scheduled', 'Rate limited', 'Completed', 'Failed'] as const).map((st) => {
            const count = 
              st === 'All' 
                ? totalCount 
                : st === 'Scheduled' 
                ? scheduledCount 
                : st === 'Rate limited' 
                ? rateLimitedCount 
                : st === 'Completed' 
                ? completedCount 
                : failedCount;

            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === st
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{st}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === st ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-[#262626] text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Campaign Filter Select */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden cursor-pointer w-full md:w-auto"
          >
            <option value="All">All Campaigns</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* 5. Queue Items Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-3">Target Prospect</th>
                <th className="py-3.5 px-3">Campaign</th>
                <th className="py-3.5 px-3">Scheduled Time</th>
                <th className="py-3.5 px-3">Status & Reason</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Clock className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Queue is Clear</span>
                    <p className="text-xs text-slate-400">No scheduled actions match your selected filters.</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors"
                  >
                    {/* Action Type */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#262626] flex items-center justify-center shrink-0">
                          {getActionIcon(item.actionType)}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 dark:text-white block">
                            {item.actionTitle}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono capitalize">
                            Type: {item.actionType}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Prospect */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5 min-w-[180px]">
                        <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                          {item.leadName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 dark:text-white truncate block">
                            {item.leadName}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {item.leadTitle} • {item.leadCompany}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Campaign */}
                    <td className="py-3.5 px-3 max-w-[180px] truncate text-slate-600 dark:text-slate-300 font-medium">
                      <div className="truncate font-semibold">{item.campaignName}</div>
                    </td>

                    {/* Scheduled Time */}
                    <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.scheduledAt}</span>
                      </div>
                    </td>

                    {/* Status & Reason */}
                    <td className="py-3.5 px-3 max-w-[280px]">
                      <div className="space-y-1">
                        <div>{getStatusBadge(item.status)}</div>
                        {item.reason && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {item.reason}
                          </p>
                        )}
                        {item.errorReason && (
                          <p className="text-[10px] text-rose-500 line-clamp-1">
                            Error: {item.errorReason}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Action Controls */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status !== 'Completed' && (
                          <button
                            type="button"
                            onClick={() => executeQueueAction(item.id)}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
                            title="Run Immediately"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        )}

                        {item.status === 'Failed' && (
                          <button
                            type="button"
                            onClick={() => retryQueueAction(item.id)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/60 text-blue-500 transition-colors cursor-pointer"
                            title="Retry Action"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {item.status !== 'Completed' && (
                          <>
                            <button
                              type="button"
                              onClick={() => pauseQueueAction(item.id)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#262626] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                              title="Hold / Postpone"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => skipQueueAction(item.id)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#262626] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                              title="Skip Action"
                            >
                              <SkipForward className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
