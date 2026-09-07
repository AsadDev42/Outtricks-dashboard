import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Bot, 
  Code, 
  X, 
  ExternalLink,
  Zap,
  Check,
  ChevronRight,
  Filter,
  RotateCw,
  Terminal
} from 'lucide-react';
import { useAgents, AgentExecution } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AgentExecutionsView: React.FC = () => {
  const { executions, searchQuery } = useAgents();
  const { success } = useToast();

  const [selectedExecution, setSelectedExecution] = useState<AgentExecution | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');

  const runningCount = executions.filter(e => e.status === 'Running').length;
  const completedCount = executions.filter(e => e.status === 'Success').length;
  const failedCount = executions.filter(e => e.status === 'Failed').length;
  const totalCount = executions.length;

  const filteredExecutions = executions.filter((exec) => {
    const query = localSearch || searchQuery;
    const matchesSearch = 
      exec.taskTitle.toLowerCase().includes(query.toLowerCase()) ||
      exec.agentName.toLowerCase().includes(query.toLowerCase()) ||
      exec.id.toLowerCase().includes(query.toLowerCase()) ||
      exec.triggerSource.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'Completed' && exec.status === 'Success') ||
      (statusFilter === 'Running' && exec.status === 'Running') ||
      (statusFilter === 'Failed' && exec.status === 'Failed') ||
      exec.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesAgent = agentFilter === 'all' || exec.agentName.toLowerCase().includes(agentFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesAgent;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-emerald-500" />
            <span>Execution Runs</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time trace logs of all agent tool invocations, prompts, and database sync events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search run ID, agent, task..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20 w-48 sm:w-56"
            />
          </div>

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Agents</option>
            <option value="sdr">SDR Outreach</option>
            <option value="linkedin">LinkedIn Safe Bot</option>
            <option value="upwork">Upwork Bidding</option>
            <option value="research">DeepContext Researcher</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            onClick={() => success('Execution runs refreshed.', 'Refreshed')}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Currently Running</span>
          <div className="text-2xl font-black text-emerald-500 font-mono">
            {runningCount}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">Active tool pipelines</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Completed</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {completedCount}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Successful resolutions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Failed Runs</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
            {failedCount}
          </div>
          <span className="text-[10px] text-slate-400">Zero unhandled crashes</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Runs</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalCount}
          </div>
          <span className="text-[10px] text-slate-400">Indexed telemetry runs</span>
        </div>
      </div>

      {/* 3. Executions Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        <div className="w-full max-w-full overflow-x-auto min-w-0 no-scrollbar">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">RUN ID & AGENT</th>
                <th className="py-3 px-3">TASK</th>
                <th className="py-3 px-3">STARTED</th>
                <th className="py-3 px-3">DURATION</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3">RESULT SUMMARY</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {filteredExecutions.map((exec) => (
                <tr
                  key={exec.id}
                  onClick={() => setSelectedExecution(exec)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{exec.agentName}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{exec.id}</div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 max-w-xs truncate">
                      {exec.taskTitle}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Trigger: {exec.triggerSource}</div>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {exec.startedAt}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap">
                    {exec.durationMs}ms
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <Badge variant={exec.status === 'Success' ? 'emerald' : exec.status === 'Running' ? 'emerald' : 'rose'}>
                      {exec.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400 max-w-xs truncate text-[11px]">
                    {exec.outputSummary}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExecution(exec);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Execution Detail Drawer / Modal */}
      {selectedExecution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Run Trace: {selectedExecution.id}</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedExecution.taskTitle}</h3>
                <span className="text-xs text-slate-400">Agent: {selectedExecution.agentName} • Started {selectedExecution.startedAt}</span>
              </div>
              <button onClick={() => setSelectedExecution(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedExecution.status}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedExecution.durationMs}ms</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Trigger Source</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedExecution.triggerSource}</strong>
                </div>
              </div>

              {/* Tool Calls */}
              <div className="space-y-2">
                <strong className="text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
                  Agent Tool Invocations ({selectedExecution.toolCalls?.length || 0})
                </strong>
                <div className="space-y-2">
                  {selectedExecution.toolCalls?.map((tc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-500">{tc.toolName}</span>
                        <span className="text-[10px] font-mono text-emerald-600">{tc.status}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">Module: {tc.module}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Summary */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1 font-mono text-[11px]">
                <strong className="text-slate-900 dark:text-white block font-sans text-xs">Final Execution Output</strong>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{selectedExecution.outputSummary}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedExecution(null)}>
                Close Trace
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
