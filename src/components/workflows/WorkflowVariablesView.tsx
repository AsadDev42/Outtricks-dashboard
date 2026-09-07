import React from 'react';
import { FileCode, Plus, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';
import { useToast } from '../../context/ToastContext';

export interface WorkflowVariablesViewProps {
  onOpenCreateVariable: () => void;
}

export const WorkflowVariablesView: React.FC<WorkflowVariablesViewProps> = ({
  onOpenCreateVariable,
}) => {
  const { variables } = useWorkflows();
  const { success } = useToast();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    success(`Variable ${key} copied to clipboard!`, 'Copied');
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Dynamic Context Variables ({variables.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            System, lead, company, and deal context tokens resolved dynamically during execution.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onOpenCreateVariable}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          New Variable
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {variables.map((v) => (
          <div key={v.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-blue-600 dark:text-blue-400">{v.key}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300 font-bold uppercase">{v.type}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">{v.description}</div>
              <div className="text-[10px] text-slate-400">Sample: <span className="text-slate-800 dark:text-slate-200">{v.sampleValue}</span></div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(v.key)}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy Tag
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
