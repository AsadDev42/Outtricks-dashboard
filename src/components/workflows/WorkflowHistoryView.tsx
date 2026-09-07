import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowHistoryView: React.FC = () => {
  const { history } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Workflow Audit Trail & Activity History ({history.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Chronological record of automated trigger invocations, configuration updates, and execution states.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {history.map((h) => (
          <div key={h.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-xs">{h.event}</span>
                <Badge variant={h.status === 'Success' ? 'emerald' : h.status === 'Warning' ? 'amber' : 'blue'} size="sm">
                  {h.status}
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Workflow: <span className="font-bold text-slate-800 dark:text-slate-200">{h.workflowName}</span> • Actor: {h.actor}
              </div>
              <div className="text-[10px] text-slate-400 font-sans">{h.details}</div>
            </div>

            <span className="text-slate-400 text-[10px] shrink-0">
              {h.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
