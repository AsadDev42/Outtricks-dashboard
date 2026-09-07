import React, { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  Zap, 
  Pause, 
  Play, 
  ArrowRight,
  FilterX
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { AgentCard } from './AgentCard';

interface AgentsListProps {
  onOpenDetail: (agent: AgentRecord) => void;
  onOpenTest: (agent: AgentRecord) => void;
  onOpenEdit: (agent: AgentRecord) => void;
  onOpenCreateModal: () => void;
}

export const AgentsList: React.FC<AgentsListProps> = ({
  onOpenDetail,
  onOpenTest,
  onOpenEdit,
  onOpenCreateModal
}) => {
  const { agents, searchQuery, statusFilter, typeFilter, setSearchQuery, setStatusFilter, setTypeFilter } = useAgents();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="space-y-4">
      {/* Subheader & View Toggles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            All Configured Agents ({filteredAgents.length})
          </h2>
          {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FilterX className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#181818] flex items-center gap-1 border border-slate-200/80 dark:border-[#2A2A2A]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1f2e24] text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#1f2e24] text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              No Agents Matched Your Query
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search terms or status filters, or build a new specialized outbound operator for your workspace.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs shadow-emerald-500/20"
            >
              Create New Agent
            </button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {filteredAgents.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onOpenDetail={onOpenDetail}
              onOpenTest={onOpenTest}
              onOpenEdit={onOpenEdit}
            />
          ))}

          {/* Quick Add Agent Placeholder Card */}
          <div
            onClick={onOpenCreateModal}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-400 dark:hover:border-emerald-600 bg-slate-50/50 dark:bg-[#141414]/20 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 min-h-[220px] group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#1A1A1A] text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Build Custom Agent
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
                Configure bespoke instructions, tools, permissions, and triggers for your custom workflow.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table View */}
      {filteredAgents.length > 0 && viewMode === 'table' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0a0e1a] text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4">AGENT NAME & ROLE</th>
                  <th className="py-3 px-3">STATUS</th>
                  <th className="py-3 px-3">AUTONOMY</th>
                  <th className="py-3 px-3">ENABLED TOOLS</th>
                  <th className="py-3 px-3">TASKS COMPLETED</th>
                  <th className="py-3 px-3">SUCCESS RATE</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    onClick={() => onOpenDetail(agent)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${agent.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                          {agent.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100">
                            {agent.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {agent.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                        agent.status === 'Active'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {agent.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {agent.autonomyLevel}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        {agent.tools.filter(t => t.enabled).length} Tools Connected
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                      {agent.metrics.completedTasks.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {agent.metrics.successRate}%
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenTest(agent)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          Test
                        </button>
                        <button
                          onClick={() => onOpenDetail(agent)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs shadow-emerald-500/20"
                        >
                          Configure
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
