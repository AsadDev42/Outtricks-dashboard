import React from 'react';
import { ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const ObjectionHandlingView: React.FC = () => {
  const { objections } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Objection Handling Playbook & Counter-Matrix ({objections.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Sub-400ms neural objection responses deployed automatically during conversational hesitation or competitive mentions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {objections.map((obj) => (
          <div key={obj.id} className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">{obj.objectionName}</span>
              <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-mono text-[10px] font-bold">
                {obj.outcomeRate}% Win
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] leading-relaxed italic">
              "{obj.counterScript}"
            </p>

            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>Agent: {obj.aiAgent}</span>
              <span>Triggered {obj.frequency} times</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
