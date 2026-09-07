import React from 'react';
import { 
  Mail, 
  Plus, 
  Send, 
  Layers
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useEmail } from '../../context/EmailContext';

export interface EmailHeaderProps {
  onOpenCreateCampaign: () => void;
  onOpenCreateSequence: () => void;
  onOpenConnectMailbox: () => void;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  onOpenCreateCampaign,
  onOpenCreateSequence,
  onOpenConnectMailbox,
}) => {
  const { campaigns, mailboxes } = useEmail();

  const activeMailboxesCount = mailboxes.filter((m) => m.status === 'Optimal' || m.status === 'Warming').length;
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0);
  const totalReplies = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.meetings, 0);
  const avgReplyRate = totalSent > 0 ? ((totalReplies / totalSent) * 100).toFixed(1) : '11.8';

  return (
    <div className="font-sans">
      {/* Top Banner with KPIs & Actions */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Mail className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Cold Email Multi-Inbox Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-inbox rotation across 24+ Google Workspace & Microsoft 365 sender pools with deliverability health monitoring.
          </p>
        </div>

        {/* Right Area: Metric Badges & Action CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 font-bold uppercase">Active Inboxes</div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">{activeMailboxesCount} Pools</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 font-bold uppercase">Delivery Rate</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">98.5%</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 font-bold uppercase">Avg Reply</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{avgReplyRate}%</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 font-bold uppercase">Booked</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{totalMeetings} Demos</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenConnectMailbox}
              leftIcon={<Mail className="w-3.5 h-3.5" />}
            >
              Connect Inbox
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCreateSequence}
              leftIcon={<Layers className="w-3.5 h-3.5" />}
            >
              Sequence
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCreateCampaign}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Campaign
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
