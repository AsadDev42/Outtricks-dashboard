import React from 'react';
import { 
  PhoneCall, 
  Bot, 
  Radio, 
  Workflow, 
  BrainCircuit, 
  ShieldAlert, 
  Clock, 
  BarChart3, 
  Phone, 
  BookOpen, 
  Layers, 
  Plus, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useVoiceAi, VoiceAiTabType } from '../../context/VoiceAiContext';

export interface VoiceHeaderProps {
  onOpenCreateAgent: () => void;
  onOpenCreateCampaign: () => void;
  onOpenBuyNumber: () => void;
}

export const VoiceHeader: React.FC<VoiceHeaderProps> = ({
  onOpenCreateAgent,
  onOpenCreateCampaign,
  onOpenBuyNumber,
}) => {
  const { aiAgents, voiceCampaigns } = useVoiceAi();

  const totalCallsPlaced = voiceCampaigns.reduce((acc, c) => acc + c.callsPlaced, 0);
  const totalAnswered = voiceCampaigns.reduce((acc, c) => acc + c.answeredCount, 0);
  const totalMeetings = voiceCampaigns.reduce((acc, c) => acc + c.meetingsBooked, 0);
  const answerRate = totalCallsPlaced > 0 ? ((totalAnswered / totalCallsPlaced) * 100).toFixed(1) : '72.4';

  return (
    <div className="font-sans">
      {/* Top Banner with Stats and Quick Action CTAs */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        
        {/* Title & Description */}
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Voice AI SDR Studio & Live Dialer
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time conversational voice agents with sub-400ms WebRTC latency and automated CRM deal booking.
          </p>
        </div>

        {/* Right Section: Metric Badges & Action CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Active Agents</div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{aiAgents.length} SDRs</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Latency</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">&lt; 380ms</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Answer Rate</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{answerRate}%</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Booked</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{totalMeetings} Demos</div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenBuyNumber}
              leftIcon={<Phone className="w-3.5 h-3.5" />}
            >
              Add Number
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCreateAgent}
              leftIcon={<Bot className="w-3.5 h-3.5" />}
            >
              Deploy SDR
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCreateCampaign}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Voice Campaign
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
