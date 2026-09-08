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
  const { contracts, rssPollInterval, setRssPollInterval } = useUpwork();

  const activeContractsCount = contracts.filter((c) => c.status === 'Active').length;
  const totalEarned = contracts.reduce((acc, c) => acc + c.totalEarned, 0);

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner with KPIs & Actions */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        
        {/* Top row: Title and CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary-muted border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Upwork Studio & Freelance Pipeline
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Real-time RSS job feed monitoring, AI cover letter generation, auto-bid triggers, and contract escrow management.
            </p>
          </div>

          {/* Action CTAs & RSS Interval Selector */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {/* RSS Poller Interval */}
            <div className="h-[34px] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#262626] text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className={`w-2 h-2 rounded-full shrink-0 ${rssPollInterval === 'manual' ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="text-[11px] font-bold text-slate-500 hidden md:inline">RSS:</span>
              <select
                value={rssPollInterval}
                onChange={(e) => setRssPollInterval(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                title="Select background RSS job feed scraping interval"
              >
                <option value="1m" className="dark:bg-[#1C1C1C] text-slate-900 dark:text-white">1m (Fast)</option>
                <option value="5m" className="dark:bg-[#1C1C1C] text-slate-900 dark:text-white">5m (Recommended)</option>
                <option value="15m" className="dark:bg-[#1C1C1C] text-slate-900 dark:text-white">15m</option>
                <option value="30m" className="dark:bg-[#1C1C1C] text-slate-900 dark:text-white">30m</option>
                <option value="manual" className="dark:bg-[#1C1C1C] text-slate-900 dark:text-white">Manual</option>
              </select>
            </div>

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

        {/* Bottom row: Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-[#222222] text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold">JSS Score</div>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">100% Top Rated</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Hourly Rate</div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">$125.00/hr</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Active Contracts</div>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{activeContractsCount} Projects</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Total Earned</div>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${totalEarned.toLocaleString()}</div>
          </div>
        </div>

      </div>

    </div>
  );
};

