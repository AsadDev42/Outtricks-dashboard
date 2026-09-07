import React from 'react';
import { 
  Workflow, 
  Plus, 
  FileCode
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export interface WorkflowsHeaderProps {
  onOpenCreateWorkflow: () => void;
  onOpenCreateVariable: () => void;
}

export const WorkflowsHeader: React.FC<WorkflowsHeaderProps> = ({
  onOpenCreateWorkflow,
  onOpenCreateVariable,
}) => {
  const { 
    workflows, 
    runs, 
  } = useWorkflows();

  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(w => w.status === 'Active').length;
  const failedRuns = runs.filter(r => r.status === 'Failed').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Title & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Visual Flows & Revenue Orchestration
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-extrabold">
                  DAG Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Autonomous event-driven workflows connecting Lead Finder, Cold Email, LinkedIn, Voice AI SDR, and Deals CRM.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCreateVariable}
            leftIcon={<FileCode className="w-3.5 h-3.5" />}
          >
            + Variable
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateWorkflow}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Visual Flow
          </Button>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Workflows</div>
          <div className="text-xl font-black text-slate-950 dark:text-white">{activeWorkflows} of {totalWorkflows}</div>
          <div className="text-[10px] text-emerald-500 font-bold">100% Operational</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Executions Today</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">3,420 Runs</div>
          <div className="text-[10px] text-emerald-500 font-bold">Sub-100ms Latency</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Success Rate</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">99.4%</div>
          <div className="text-[10px] text-slate-400 font-sans">Idempotency Enforced</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Failed Runs</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{failedRuns}</div>
          <div className="text-[10px] text-emerald-500 font-bold">1-Click Retries Available</div>
        </div>
      </div>

    </div>
  );
};

