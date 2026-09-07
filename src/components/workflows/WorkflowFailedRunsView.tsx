import React from 'react';
import { AlertCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowFailedRunsView: React.FC = () => {
  const { runs, retryFailedRun } = useWorkflows();
  const failedRuns = runs.filter(r => r.status === 'Failed');

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Failed Runs & Diagnostics ({failedRuns.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Fail-safe circuit breakers with automated error extraction and real 1-click step retry execution.
        </p>
      </div>

      {failedRuns.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] text-slate-400 text-xs space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">All Workflow Runs Healthy</div>
          <p className="text-xs text-slate-400">Zero unhandled execution failures or stalled branches.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
          {failedRuns.map((r) => (
            <div key={r.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{r.runId}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate">{r.workflowName}</span>
                  <Badge variant="rose" size="sm">Failed Step: {r.failedStepId}</Badge>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Trigger: {r.trigger} • Occurred at {r.startedAt}
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 font-mono text-[10px]">
                  Reason: {r.errorMessage}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => retryFailedRun(r.runId)}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Retry Step Now
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
