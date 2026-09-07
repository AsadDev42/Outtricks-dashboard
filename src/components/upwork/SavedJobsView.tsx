import React from 'react';
import { Bookmark, Sparkles, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUpwork, UpworkJob } from '../../context/UpworkContext';

export interface SavedJobsViewProps {
  onOpenApply: (job: UpworkJob) => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  onOpenApply,
}) => {
  const { jobs, toggleSaveJob } = useUpwork();
  const savedJobs = jobs.filter((j) => j.isSaved);

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Saved Upwork Jobs ({savedJobs.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Bookmarked opportunities prioritized for AI proposal generation and custom outreach.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {savedJobs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No saved jobs yet. Click the bookmark icon on any job in the feed.
          </div>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0 max-w-xl">
                <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                  {job.title}
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  {job.budgetType === 'Hourly' ? job.hourlyRateRange : `$${job.budgetAmount?.toLocaleString()}`} • {job.clientCountry} • Match: {job.matchScore}%
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => toggleSaveJob(job.id)}>
                  Unsave
                </Button>
                <Button variant="primary" size="sm" onClick={() => onOpenApply(job)} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                  Apply
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
