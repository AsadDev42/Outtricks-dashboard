import React from 'react';
import { Workflow, Plus, ArrowRight, Zap } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const CallFlowsView: React.FC = () => {
  const { callFlows, toggleCallFlowStatus } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Call Event Flows & Automations ({callFlows.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Trigger automated SMS follow-ups, Cal.com invites, and CRM pipeline progression based on live call dispositions.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {callFlows.map((flow) => (
          <div key={flow.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{flow.name}</span>
                <Badge variant={flow.status === 'Active' ? 'emerald' : 'slate'} size="sm">{flow.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-500 font-mono text-[11px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">When: {flow.trigger}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 dark:text-white font-bold">Action: {flow.action}</span>
              </div>
            </div>

            <Button variant={flow.status === 'Active' ? 'outline' : 'primary'} size="sm" onClick={() => toggleCallFlowStatus(flow.id)}>
              {flow.status === 'Active' ? 'Pause Flow' : 'Activate'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
