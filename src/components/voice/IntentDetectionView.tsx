import React from 'react';
import { BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const IntentDetectionView: React.FC = () => {
  const { intentDetections } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Natural Language Intent Classification ({intentDetections.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Real-time semantic classification of buyer intent, budget availability, and decision-making authority.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {intentDetections.map((int) => (
          <div key={int.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white">{int.prospectName} ({int.company})</span>
                <Badge variant={int.intentType.includes('High') ? 'emerald' : 'slate'} size="sm">
                  {int.intentType} ({int.confidence}%)
                </Badge>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Action: {int.resultingAction}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 shrink-0">{int.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
