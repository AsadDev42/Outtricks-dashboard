import React from 'react';
import { Layers, ArrowRight, CheckCircle2, DollarSign, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const VoiceCrmSyncView: React.FC = () => {
  const { crmSyncEvents } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Real-Time Deals CRM Sync ({crmSyncEvents.length} Recent Events)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Voice AI calls automatically create and update pipeline deals, stage progressions, and demo calendar slots in Deals CRM.
          </p>
        </div>

        <Link to="/crm">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Open Deals CRM
          </Button>
        </Link>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {crmSyncEvents.map((evt) => (
          <div key={evt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-extrabold text-slate-900 dark:text-white">{evt.event}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Stage: <span className="font-bold text-emerald-600 dark:text-emerald-400">{evt.stage}</span> • Deal Value: <span className="font-bold text-emerald-600 dark:text-emerald-400">${evt.dealValue.toLocaleString()} ARR</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 shrink-0">{evt.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
