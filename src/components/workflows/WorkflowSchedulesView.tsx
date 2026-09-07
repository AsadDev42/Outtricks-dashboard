import React from 'react';
import { Clock, Play, Pause, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowSchedulesView: React.FC = () => {
  const { schedules, toggleSchedule } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Automated Cron Schedules ({schedules.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Recurring interval timers, time-zone bounded triggers, and batch lead ingestion scrapers.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {schedules.map((sch) => (
          <div key={sch.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                  {sch.workflowName}
                </span>
                <Badge variant={sch.status === 'Active' ? 'emerald' : 'slate'} size="sm">
                  {sch.status}
                </Badge>
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                Pattern: <span className="font-bold text-blue-600 dark:text-blue-400">{sch.schedulePattern}</span> ({sch.frequency}) • Timezone: {sch.timezone}
              </div>

              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono pt-0.5">
                <span>Prev Run: {sch.previousRun}</span>
                <span>•</span>
                <span className="text-emerald-500 font-bold">Next Run: {sch.nextRun}</span>
              </div>
            </div>

            <Button
              variant={sch.status === 'Active' ? 'outline' : 'primary'}
              size="sm"
              onClick={() => toggleSchedule(sch.id)}
              leftIcon={sch.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            >
              {sch.status === 'Active' ? 'Pause Schedule' : 'Activate'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
