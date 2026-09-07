import React from 'react';
import { GitBranch, CheckCircle2, Split } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowConditionsView: React.FC = () => {
  const { conditions } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Conditional Branching Rules & Operators ({conditions.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          IF / ELSE IF / ELSE decision logic evaluating email intent, company headcount, and deal values.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {conditions.map((cond) => (
          <div key={cond.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{cond.name}</span>
                <Badge variant="blue" size="sm">{cond.category}</Badge>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Field: <span className="font-bold text-slate-900 dark:text-white">{cond.field}</span> • Operator: <span className="text-blue-600 dark:text-blue-400 font-bold">{cond.operator}</span> • Target: <span className="text-emerald-600 dark:text-emerald-400 font-bold">"{cond.value}"</span>
              </div>
            </div>
            <span className="text-emerald-500 font-bold font-mono text-[11px] shrink-0">
              ✓ Active Evaluator
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
