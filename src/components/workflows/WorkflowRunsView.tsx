import React, { useState, useMemo } from 'react';
import { Play, CheckCircle2, AlertCircle, Clock, RotateCcw, ArrowRight, Search, Filter } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useWorkflows, WorkflowRun } from '../../context/WorkflowsContext';

export const WorkflowRunsView: React.FC = () => {
  const { runs, retryFailedRun } = useWorkflows();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Running' | 'Success' | 'Failed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRuns = useMemo(() => {
    return runs.filter(run => {
      const matchesStatus = statusFilter === 'All' || run.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        run.runId.toLowerCase().includes(q) ||
        run.workflowName.toLowerCase().includes(q) ||
        run.trigger.toLowerCase().includes(q) ||
        (run.outputSummary && run.outputSummary.toLowerCase().includes(q)) ||
        (run.errorMessage && run.errorMessage.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [runs, statusFilter, searchQuery]);

  const counts = useMemo(() => ({
    all: runs.length,
    running: runs.filter(r => r.status === 'Running').length,
    success: runs.filter(r => r.status === 'Success').length,
    failed: runs.filter(r => r.status === 'Failed').length,
  }), [runs]);

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-current" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                Workflow Execution Runs & History
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Live execution logs, status telemetry, and error recovery for all automated flows.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search runs, triggers, errors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-[#111111] border border-slate-200/80 dark:border-[#282828] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'All'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>All Runs</span>
            <span className="font-mono text-[10px] opacity-80">({counts.all})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('Success')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'Success'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Success</span>
            <span className="font-mono text-[10px] opacity-80">({counts.success})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('Failed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'Failed'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Failed</span>
            <span className="font-mono text-[10px] opacity-80">({counts.failed})</span>
          </button>

          {counts.running > 0 && (
            <button
              type="button"
              onClick={() => setStatusFilter('Running')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'Running'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Running</span>
              <span className="font-mono text-[10px] opacity-80">({counts.running})</span>
            </button>
          )}
        </div>
      </div>

      {/* Execution Runs List */}
      {filteredRuns.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] text-slate-400 text-xs space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">No Runs Found</div>
          <p className="text-xs text-slate-400">No executions match the selected filter criteria.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
          {filteredRuns.map((run) => (
            <div key={run.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{run.runId}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate">{run.workflowName}</span>
                  <Badge variant={run.status === 'Success' ? 'emerald' : run.status === 'Failed' ? 'rose' : 'emerald'} size="sm">
                    {run.status}
                  </Badge>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Trigger: {run.trigger} • Duration: <span className="font-bold text-emerald-600 dark:text-emerald-400">{run.duration}</span> ({run.stepsCount} steps)
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {run.outputSummary}
                </div>

                {run.errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-mono text-[10px]">
                    Error: {run.errorMessage}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {run.status === 'Failed' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => retryFailedRun(run.runId)}
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Retry Run
                  </Button>
                )}

                <span className="text-slate-400 font-mono text-[10px]">
                  {run.startedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
