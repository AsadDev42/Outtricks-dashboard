import React from 'react';
import { Zap, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowTriggersView: React.FC = () => {
  const { triggers } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Event Triggers & Webhook Listeners ({triggers.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Native PostgreSQL change-data-capture listeners and incoming REST API webhooks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {triggers.map((trig) => (
          <div key={trig.id} className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{trig.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                  {trig.source}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {trig.description}
              </p>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Event JSON Payload:</span>
                <pre className="p-3 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[10px] overflow-x-auto leading-relaxed">
                  {trig.samplePayload}
                </pre>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>{trig.activeCount} Active Flows</span>
              <span>{trig.conditionsCount} Filter Conditions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
