import React from 'react';
import { Bell, Plus, Trash2, Zap } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export interface JobAlertsViewProps {
  onOpenCreateAlert: () => void;
}

export const JobAlertsView: React.FC<JobAlertsViewProps> = ({
  onOpenCreateAlert,
}) => {
  const { jobAlerts, deleteJobAlert } = useUpwork();

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Real-Time Upwork RSS Job Alerts ({jobAlerts.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated keyword filters monitoring newly posted jobs to alert your team within 60 seconds.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenCreateAlert} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New Alert
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {jobAlerts.map((al) => (
          <div key={al.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{al.name}</span>
                <Badge variant="emerald" size="sm">{al.status}</Badge>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Keywords: <span className="font-bold text-blue-600 dark:text-blue-400">{al.keywords}</span> • Min Rate: ${al.minBudget}/hr • Max Proposals: {al.maxProposals}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 font-mono text-[10px] font-bold">
                {al.notificationState}
              </span>
              <button
                type="button"
                onClick={() => deleteJobAlert(al.id)}
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
