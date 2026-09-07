import React from 'react';
import { 
  PhoneCall, 
  Bot, 
  Radio, 
  Phone, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  Volume2, 
  ShieldCheck, 
  FileText,
  Play
} from 'lucide-react';
import { useVoiceAi, VoiceAiTabType } from '../../context/VoiceAiContext';

interface VoiceAiOverviewProps {
  onOpenCreateAgent: () => void;
  onOpenCreateCampaign: () => void;
  onOpenBuyNumber: () => void;
}

export const VoiceAiOverview: React.FC<VoiceAiOverviewProps> = ({
  onOpenCreateAgent,
  onOpenCreateCampaign,
  onOpenBuyNumber,
}) => {
  const { aiAgents, voiceCampaigns, callHistory, phoneNumbers, setActiveTab } = useVoiceAi();

  const totalCallsPlaced = voiceCampaigns.reduce((acc, c) => acc + c.callsPlaced, 0);
  const totalAnswered = voiceCampaigns.reduce((acc, c) => acc + c.answeredCount, 0);
  const totalMeetings = voiceCampaigns.reduce((acc, c) => acc + c.meetingsBooked, 0);
  const answerRate = totalCallsPlaced > 0 ? ((totalAnswered / totalCallsPlaced) * 100).toFixed(1) : '72.4';

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              VOICE SDR AGENTS
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {aiAgents.length}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Sub-400ms SDRs
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Autonomous multi-lingual qualification
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ANSWER RATE
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {answerRate}%
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              {totalAnswered.toLocaleString()} Pickups
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Local presence dialer rotation active
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              CALLS PLACED
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalCallsPlaced.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Outbound
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Connected across {phoneNumbers.length} caller ID numbers
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DEMOS BOOKED
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalMeetings}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Scheduled
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Automatically synced into Deals CRM Kanban
          </p>
        </div>

      </div>

      {/* 2. Quick Action Launchpad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('call-center')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            <span>Open Call Center & Dialer</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Live WebRTC dialer & real-time conversation waveform</p>
        </button>

        <button
          onClick={onOpenCreateAgent}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            <span>Create AI Voice Agent</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Configure prompt persona, voice model & knowledge base</p>
        </button>

        <button
          onClick={onOpenCreateCampaign}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Radio className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            <span>Launch Outbound Campaign</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Target audience batch qualification with concurrency limits</p>
        </button>
      </div>

      {/* 3. Active Voice SDR Agents & Recent Call Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: AI Agents Matrix (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-500" />
              <span>Voice SDR Agents ({aiAgents.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('ai-agents')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            {aiAgents.map((agent) => (
              <div
                key={agent.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{agent.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {agent.voiceModel}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {agent.purpose}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/40 dark:border-[#202020]">
                  <span>Assigned Number: {agent.assignedNumber}</span>
                  <span className="font-bold text-emerald-600">{agent.conversionRate}% Conversion</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Call Log Feed (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Recent Call Log & Audio Recs</span>
            </h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Full History
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {callHistory.slice(0, 3).map((call) => (
              <div
                key={call.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {call.prospectName} ({call.company})
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    {call.outcome}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {call.duration} • {call.timestamp} • {call.phone}
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-[#161616] border border-slate-200/60 dark:border-[#202020] text-[10px] text-slate-600 dark:text-slate-300 italic line-clamp-1">
                  "{call.transcript}"
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
