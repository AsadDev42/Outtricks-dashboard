import React from 'react';
import { FileCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowLogsView: React.FC = () => {
  const { logs } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Granular Step-Level Execution Logs ({logs.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Raw input payloads, output JSON responses, and millisecond execution timings per DAG step.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {logs.map((l) => (
          <div key={l.id} className="p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{l.runId}</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-slate-900 dark:text-white">{l.stepName}</span>
                <Badge variant="emerald" size="sm">{l.status}</Badge>
              </div>

              <div className="text-[10px] text-slate-400">
                Duration: <span className="font-bold text-slate-900 dark:text-white">{l.duration}</span> • {l.timestamp}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px]">
              <div className="p-3 rounded-2xl bg-slate-900 text-slate-300 space-y-1">
                <span className="text-slate-500 uppercase font-bold">Input Payload:</span>
                <pre className="overflow-x-auto leading-relaxed">{l.inputData}</pre>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 text-emerald-400 space-y-1">
                <span className="text-slate-500 uppercase font-bold">Output Response:</span>
                <pre className="overflow-x-auto leading-relaxed">{l.outputData}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
