import React, { useState } from 'react';
import { 
  Briefcase, 
  Bookmark, 
  Sparkles, 
  Send, 
  Star, 
  CheckCircle2, 
  Clock, 
  Globe, 
  DollarSign, 
  Filter 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork, UpworkJob } from '../../context/UpworkContext';

export type JobsViewFilter = 'all' | 'saved' | 'alerts';

export interface UpworkJobsFeedProps {
  onOpenApply: (job: UpworkJob) => void;
  initialFilter?: JobsViewFilter;
}

export const UpworkJobsFeed: React.FC<UpworkJobsFeedProps> = ({
  onOpenApply,
  initialFilter = 'all',
}) => {
  const { jobs, jobAlerts, toggleSaveJob, setActiveTab } = useUpwork();
  const [viewFilter, setViewFilter] = useState<JobsViewFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState<'All' | 'Fixed Price' | 'Hourly'>('All');

  const savedJobsCount = jobs.filter(j => j.isSaved).length;

  const filteredJobs = jobs.filter(job => {
    if (viewFilter === 'saved' && !job.isSaved) return false;

    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesBudget = 
      budgetFilter === 'All' || job.budgetType === budgetFilter;

    return matchesSearch && matchesBudget;
  });

  return (
    <div className="space-y-4 font-sans">
      
      {/* Contextual Sub-Controls & Quick Search Filter */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Segmented Mode Selector: [ All Jobs ] [ Saved ] [ Job Alerts ] */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#262626] self-start">
          <button
            type="button"
            onClick={() => setViewFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewFilter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>All Jobs</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              viewFilter === 'all' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
            }`}>
              {jobs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewFilter('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewFilter === 'saved'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              viewFilter === 'saved' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
            }`}>
              {savedJobsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('job-alerts')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Job Alerts</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300">
              {jobAlerts.length}
            </span>
          </button>
        </div>

        {/* Search & Budget Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword or skill..."
              className="w-full pl-3 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] rounded-xl p-1 text-xs shrink-0">
            {(['All', 'Fixed Price', 'Hourly'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setBudgetFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  budgetFilter === t
                    ? 'bg-white dark:bg-[#2A2A2A] text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t === 'All' ? 'All' : t === 'Fixed Price' ? 'Fixed' : 'Hourly'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Jobs Stream List or Empty State */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-muted text-primary mx-auto flex items-center justify-center">
            {viewFilter === 'saved' ? <Bookmark className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {viewFilter === 'saved' ? 'No Saved Jobs Yet' : 'No Matching Jobs Found'}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {viewFilter === 'saved'
              ? 'Click the bookmark icon on any job in your feed to save high-intent opportunities for later proposal dispatch.'
              : 'Try adjusting your search query or budget filters to discover more open opportunities.'}
          </p>
          {viewFilter === 'saved' && (
            <button
              type="button"
              onClick={() => setViewFilter('all')}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse All Jobs</span>
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 space-y-4 hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]/40 transition-colors"
            >
              {/* Top Row: Title, Match Score, Save Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 max-w-2xl min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white leading-snug">
                      {job.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold shrink-0">
                      {job.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="text-slate-900 dark:text-white font-bold">{job.budgetType === 'Hourly' ? job.hourlyRateRange : `$${job.budgetAmount?.toLocaleString()} Fixed`}</span>
                    <span>•</span>
                    <span>Posted {job.postedTime}</span>
                    <span>•</span>
                    <span>{job.proposalsCount} proposals</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      job.isSaved 
                        ? 'bg-primary-muted border-primary/30 text-primary' 
                        : 'border-slate-200 dark:border-[#2E2E2E] text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={job.isSaved ? 'Remove from saved' : 'Save job'}
                  >
                    <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenApply(job)}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Draft Proposal
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {job.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Client Specs Footer */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Payment Verified</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{job.clientRating} ({job.clientReviewsCount} reviews)</span>
                </div>

                <div>
                  <span className="text-slate-400">Total Spent:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{job.clientSpent}</span>
                </div>

                <div>
                  <span className="text-slate-400">Location:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{job.clientCountry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
