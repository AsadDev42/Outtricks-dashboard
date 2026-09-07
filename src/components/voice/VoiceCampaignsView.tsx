import React from 'react';
import { Radio, Play, Pause, Trash2, Calendar, PhoneCall, CheckCircle2, Flame } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export interface VoiceCampaignsViewProps {
  onOpenCreateCampaign: () => void;
}

export const VoiceCampaignsView: React.FC<VoiceCampaignsViewProps> = ({
  onOpenCreateCampaign,
}) => {
  const { voiceCampaigns, toggleVoiceCampaignStatus, deleteVoiceCampaign } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Automated Voice Calling Campaigns ({voiceCampaigns.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Parallel multi-line outbound calling pools with local area presence and automated demo booking.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenCreateCampaign} leftIcon={<Radio className="w-3.5 h-3.5" />}>
          New Voice Campaign
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {voiceCampaigns.map((camp) => (
          <div key={camp.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0 max-w-md">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">{camp.name}</span>
                <Badge variant={camp.status === 'Running' ? 'emerald' : 'slate'} size="sm">{camp.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                <span>SDR: {camp.agentName}</span>
                <span>•</span>
                <span>{camp.concurrency} concurrent lines</span>
                <span>•</span>
                <span>Created {camp.createdAt}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0 font-mono">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] min-w-[90px]">
                <div className="text-[10px] text-slate-400">Calls Placed</div>
                <div className="font-extrabold text-slate-900 dark:text-white">{camp.callsPlaced} / {camp.audienceCount}</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] min-w-[90px]">
                <div className="text-[10px] text-slate-400">Answered</div>
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{camp.answeredCount}</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] min-w-[90px]">
                <div className="text-[10px] text-slate-400">Qualified</div>
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{camp.qualifiedCount}</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] min-w-[90px]">
                <div className="text-[10px] text-slate-400">Demos Booked</div>
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{camp.meetingsBooked}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => toggleVoiceCampaignStatus(camp.id)}>
                {camp.status === 'Running' ? 'Pause' : 'Resume'}
              </Button>
              <button
                type="button"
                onClick={() => deleteVoiceCampaign(camp.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
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
