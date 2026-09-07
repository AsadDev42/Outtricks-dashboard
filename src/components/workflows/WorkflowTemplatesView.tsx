import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowTemplatesView: React.FC = () => {
  const { templates, createWorkflowFromTemplate } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Pre-Built Multi-Channel Blueprints ({templates.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Battle-tested revenue cadences connecting email warmup, safe LinkedIn messaging, sub-400ms Voice SDR calling, and Deals CRM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4 text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white">{tmpl.title}</span>
                    {tmpl.badge && <Badge variant="emerald" size="sm">{tmpl.badge}</Badge>}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                    {tmpl.category}
                  </span>
                </div>

                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shrink-0">
                  {tmpl.metric}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {tmpl.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-1 font-mono text-[11px]">
                <span className="text-slate-400 block text-[10px] uppercase">Execution Pipeline:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {tmpl.stepsSummary}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {tmpl.integrations.map((app, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300 text-[10px] font-mono">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Used by {tmpl.usageCount.toLocaleString()} revenue teams</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => createWorkflowFromTemplate(tmpl.id)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Clone Blueprint
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
