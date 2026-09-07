import React from 'react';
import { Phone, Plus, Globe, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export interface PhoneNumbersViewProps {
  onOpenBuyNumber: () => void;
}

export const PhoneNumbersView: React.FC<PhoneNumbersViewProps> = ({
  onOpenBuyNumber,
}) => {
  const { phoneNumbers, releasePhoneNumber } = useVoiceAi();

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Local Presence SIP Phone Numbers ({phoneNumbers.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Twilio & Telnyx verified caller IDs with automated local area code matching.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenBuyNumber} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          + Provision Number
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {phoneNumbers.map((num) => (
          <div key={num.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{num.number}</span>
                <Badge variant="emerald" size="sm">{num.status}</Badge>
                <span className="text-[10px] text-slate-400">Latency: {num.latency}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                {num.country} • Assigned Agent: <span className="font-bold text-slate-700 dark:text-slate-300">{num.assignedAgent}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => releasePhoneNumber(num.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
              title="Release Number"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
