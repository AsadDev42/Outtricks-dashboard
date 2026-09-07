import React from 'react';
import { 
  Linkedin, 
  Plus, 
  Users, 
  Zap,
  CheckCircle2,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useLinkedIn } from '../../context/LinkedInContext';

export interface LinkedInHeaderProps {
  onOpenCreateCampaign: () => void;
  onOpenConnectAccount: () => void;
  onOpenCreateRule: () => void;
}

export const LinkedInHeader: React.FC<LinkedInHeaderProps> = ({
  onOpenCreateCampaign,
  onOpenConnectAccount,
  onOpenCreateRule,
}) => {
  const { accounts, campaigns } = useLinkedIn();

  const totalConnected = campaigns.reduce((acc, c) => acc + c.connected, 0);
  const totalInvites = campaigns.reduce((acc, c) => acc + c.invitesSent, 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalInterested = campaigns.reduce((acc, c) => acc + c.interested, 0);
  const acceptanceRate = totalInvites > 0 ? ((totalConnected / totalInvites) * 100).toFixed(1) : '38.4';

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
              <Linkedin className="w-4 h-4 fill-sky-500" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              LinkedIn Safe Cloud Automation
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dedicated static residential proxies with humanized pacing, automated action throttles, and connection health monitoring.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Connected Senders</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{accounts.length} Profiles</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Acceptance Rate</div>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{acceptanceRate}%</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Replies Received</div>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{totalReplied} DMs</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Qualified Leads</div>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{totalInterested} Deals</div>
          </div>
        </div>

      </div>

      {/* Action Strip */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Ban Engine Active</span>
          </span>
          <span className="text-slate-300 dark:text-white/[0.1]">•</span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>Residential IP Pacing</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenConnectAccount}
            leftIcon={<Users className="w-3.5 h-3.5" />}
          >
            Connect Profile
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenCreateRule}
            leftIcon={<Zap className="w-3.5 h-3.5" />}
          >
            New Rule
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateCampaign}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Campaign
          </Button>
        </div>
      </div>

    </div>
  );
};
