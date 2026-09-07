import React from 'react';
import { 
  Bot, 
  Plus, 
  Sparkles, 
  Volume2, 
  Play, 
  Pause, 
  Trash2, 
  CheckCircle2, 
  BookOpen, 
  Phone 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export interface AiAgentsViewProps {
  onOpenCreateAgent: () => void;
}

export const AiAgentsView: React.FC<AiAgentsViewProps> = ({
  onOpenCreateAgent,
}) => {
  const { aiAgents, toggleAgentStatus, deleteAiAgent } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Autonomous Voice SDR Roster ({aiAgents.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ultra-realistic neural voice callers trained on your product knowledge and objection handling playbook.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenCreateAgent} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          + Deploy New SDR
        </Button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-[#1A1A1A]/80 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                    {agent.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-950 dark:text-white">{agent.name}</h4>
                    <div className="text-[11px] text-slate-500">{agent.title}</div>
                  </div>
                </div>

                <Badge variant={agent.status === 'Active' ? 'emerald' : 'slate'} size="sm">
                  {agent.status}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {agent.purpose}
              </p>

              {/* Voice Model Pill */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 truncate">
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{agent.voiceModel}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] text-slate-400">Total Calls</div>
                  <div className="font-extrabold text-slate-900 dark:text-white">{agent.totalCalls}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] text-slate-400">Conversion</div>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{agent.conversionRate}%</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs">
              <Button
                variant={agent.status === 'Active' ? 'outline' : 'primary'}
                size="sm"
                onClick={() => toggleAgentStatus(agent.id)}
              >
                {agent.status === 'Active' ? 'Pause Agent' : 'Activate'}
              </Button>

              <button
                type="button"
                onClick={() => deleteAiAgent(agent.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Delete Agent"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
