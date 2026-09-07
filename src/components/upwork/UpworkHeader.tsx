import React from 'react';
import { 
  Briefcase, 
  Bell, 
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export interface UpworkHeaderProps {
  onOpenCreateAlert: () => void;
  onOpenCreateRule: () => void;
  onOpenCreateTemplate: () => void;
}

export const UpworkHeader: React.FC<UpworkHeaderProps> = ({
  onOpenCreateAlert,
  onOpenCreateRule,
  onOpenCreateTemplate,
}) => {
  const { contracts } = useUpwork();

  const activeContractsCount = contracts.filter((c) => c.status === 'Active').length;
  const totalEarned = contracts.reduce((acc, c) => acc + c.totalEarned, 0);

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner with KPIs & Actions */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Briefcase className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Upwork Autonomous Bidding & Freelance Studio
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time RSS job feed monitoring, AI cover letter generation, auto-bid triggers, and contract escrow management.
          </p>
        </div>

        {/* Right Section: Metric Badges & Action CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">JSS Score</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">100% Top Rated</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Hourly Rate</div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">$125.00/hr</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Active Contracts</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{activeContractsCount} Projects</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[95px]">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Total Earned</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${totalEarned.toLocaleString()}</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenCreateAlert}
              leftIcon={<Bell className="w-3.5 h-3.5" />}
            >
              + Job Alert
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCreateRule}
              leftIcon={<Zap className="w-3.5 h-3.5" />}
            >
              + Auto-Bid Rule
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
};

