import React from 'react';
import { Layers, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowActionsView: React.FC = () => {
  const { actions } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Action Library & Native Executors ({actions.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Native dispatchers for multi-inbox cold email, LinkedIn OAuth, WebRTC Voice SDR, and CRM updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((act) => (
          <div key={act.id} className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{act.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                  {act.module}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {act.description}
              </p>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-1 font-mono text-[11px]">
                <span className="text-slate-400 block text-[10px] uppercase">Parameters:</span>
                {act.parameters.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>{p.label}:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{p.defaultValue || 'dynamic'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span>Category: {act.category}</span>
              <span className="text-emerald-500 font-bold">✓ Sub-100ms Native</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
