import React, { useState } from 'react';
import { Bot, Plus, Play, Search, RotateCw, Calendar } from 'lucide-react';
import { useAgents } from '../../context/AgentsContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';

interface AgentsHeaderProps {
  onOpenCreateModal: () => void;
  onOpenTestModal: () => void;
}

export const AgentsHeader: React.FC<AgentsHeaderProps> = ({
  onOpenCreateModal,
  onOpenTestModal
}) => {
  const {
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter
  } = useAgents();
  const { success } = useToast();
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-4 font-sans">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xs shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  Workforce Overview
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {stats.activeAgents} / {stats.totalAgents} Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Monitor autonomous agents, executions, tasks, and workforce performance.
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20 w-36 sm:w-44"
            />
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
          </select>

          <button
            onClick={() => success('Workforce overview data refreshed.', 'Refreshed')}
            className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <Button
            onClick={onOpenCreateModal}
            variant="primary"
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Deploy Agent</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
