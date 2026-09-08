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
  Filter,
  ShieldCheck,
  ChevronDown,
  AlertTriangle,
  Building2,
  SlidersHorizontal,
  X,
  Radio
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork, UpworkJob, QualityTier } from '../../context/UpworkContext';
import { JobAlertsView } from './JobAlertsView';
import { JobDetailDrawer } from './JobDetailDrawer';
import { CreateRadarModal } from './CreateRadarModal';

export type JobsViewFilter = 'all' | 'recommended' | 'invitations' | 'saved' | 'radars';

export interface UpworkJobsFeedProps {
  onOpenApply: (job: UpworkJob) => void;
  initialFilter?: JobsViewFilter;
}

export const UpworkJobsFeed: React.FC<UpworkJobsFeedProps> = ({
  onOpenApply,
  initialFilter = 'all',
}) => {
  const { jobs, radars, toggleSaveJob } = useUpwork();
  const [viewFilter, setViewFilter] = useState<JobsViewFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState<'All' | 'Fixed Price' | 'Hourly'>('All');
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  
  // Advanced filter states
  const [filterPaymentVerified, setFilterPaymentVerified] = useState(false);
  const [filterMinHireRate, setFilterMinHireRate] = useState<number>(0);
  const [filterMaxProposals, setFilterMaxProposals] = useState<'All' | '10' | '15'>('All');
  const [filterMinMatch, setFilterMinMatch] = useState<number>(0);

  // Drawer state
  const [selectedDrawerJob, setSelectedDrawerJob] = useState<UpworkJob | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Radar modal state
  const [isCreateRadarOpen, setIsCreateRadarOpen] = useState(false);

  const savedJobsCount = jobs.filter(j => j.isSaved).length;
  const invitationsCount = jobs.filter(j => j.opportunityType === 'invitation').length;
  const recommendedCount = jobs.filter(j => (j.qualityTier === 'recommended' || j.matchScore >= 90) && !j.isSkipped).length;

  const filteredJobs = jobs.filter(job => {
    if (job.isSkipped) return false;

    if (viewFilter === 'saved' && !job.isSaved) return false;
    if (viewFilter === 'invitations' && job.opportunityType !== 'invitation') return false;
    if (viewFilter === 'recommended' && !(job.qualityTier === 'recommended' || job.matchScore >= 90)) return false;

    // Search query
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    // Budget filter
    if (budgetFilter !== 'All' && job.budgetType !== budgetFilter) return false;

    // Advanced filters
    if (filterPaymentVerified && !job.paymentVerified) return false;
    if (filterMinHireRate > 0 && (job.riskSignals?.clientHireRate || 0) < filterMinHireRate) return false;
    if (filterMinMatch > 0 && job.matchScore < filterMinMatch) return false;

    if (filterMaxProposals === '10') {
      if (job.proposalsCount.includes('15') || job.proposalsCount.includes('20') || job.proposalsCount.includes('50')) {
        return false;
      }
    }

    return true;
  });

  const handleOpenDrawer = (job: UpworkJob) => {
    setSelectedDrawerJob(job);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Contextual Sub-Controls & Quick Search Filter */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
        
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Segmented Mode Selector: [ All ] [ Recommended ] [ Invitations ] [ Saved ] [ Smart Radars ] */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#262626] overflow-x-auto no-scrollbar">
            
            <button
              type="button"
              onClick={() => setViewFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                viewFilter === 'all'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>All Opportunities</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                viewFilter === 'all' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
              }`}>
                {jobs.filter(j => !j.isSkipped).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewFilter('recommended')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                viewFilter === 'recommended'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                viewFilter === 'recommended' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
              }`}>
                {recommendedCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewFilter('invitations')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                viewFilter === 'invitations'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invitations</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                viewFilter === 'invitations' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
              }`}>
                {invitationsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewFilter('saved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
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
              onClick={() => setViewFilter('radars')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                viewFilter === 'radars'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#252525]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-blue-500" />
              <span>Smart Radars</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                viewFilter === 'radars' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
              }`}>
                {radars.length}
              </span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          {viewFilter !== 'radars' && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter keywords, skills..."
                  className="w-full pl-3 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400"
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

              <button
                type="button"
                onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
                className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  isAdvancedFiltersOpen || filterPaymentVerified || filterMinHireRate > 0 || filterMinMatch > 0
                    ? 'bg-primary-muted border-primary/40 text-primary'
                    : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Toggle advanced screening filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Collapsible Advanced Filters Bar */}
        {isAdvancedFiltersOpen && viewFilter !== 'radars' && (
          <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex flex-wrap items-center gap-4 text-xs animate-in fade-in duration-150">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterPaymentVerified}
                onChange={(e) => setFilterPaymentVerified(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Payment Verified Only</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Min Client Hire Rate:</span>
              <select
                value={filterMinHireRate}
                onChange={(e) => setFilterMinHireRate(Number(e.target.value))}
                className="p-1 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono font-bold"
              >
                <option value={0}>Any</option>
                <option value={50}>50%+</option>
                <option value={70}>70%+</option>
                <option value={80}>80%+</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Max Proposals:</span>
              <select
                value={filterMaxProposals}
                onChange={(e) => setFilterMaxProposals(e.target.value as any)}
                className="p-1 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono font-bold"
              >
                <option value="All">All</option>
                <option value="10">&lt; 10 proposals</option>
                <option value="15">&lt; 15 proposals</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Min Match Score:</span>
              <select
                value={filterMinMatch}
                onChange={(e) => setFilterMinMatch(Number(e.target.value))}
                className="p-1 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400"
              >
                <option value={0}>Any</option>
                <option value={85}>85%+</option>
                <option value={90}>90%+</option>
                <option value={95}>95%+</option>
              </select>
            </div>

            {(filterPaymentVerified || filterMinHireRate > 0 || filterMaxProposals !== 'All' || filterMinMatch > 0) && (
              <button
                type="button"
                onClick={() => {
                  setFilterPaymentVerified(false);
                  setFilterMinHireRate(0);
                  setFilterMaxProposals('All');
                  setFilterMinMatch(0);
                }}
                className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

      </div>

      {/* Render Radars Dashboard or Opportunities Feed */}
      {viewFilter === 'radars' ? (
        <JobAlertsView onOpenCreateAlert={() => setIsCreateRadarOpen(true)} />
      ) : filteredJobs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-muted text-primary mx-auto flex items-center justify-center">
            {viewFilter === 'saved' ? <Bookmark className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {viewFilter === 'saved' ? 'No Saved Opportunities' : 'No Matching Opportunities Found'}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {viewFilter === 'saved'
              ? 'Click the bookmark icon on any opportunity card to save high-intent jobs for later proposal dispatch.'
              : 'Try adjusting your search query, budget filters, or match score threshold.'}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
          {filteredJobs.map((job) => {
            const isInvitation = job.opportunityType === 'invitation';
            const isRisky = job.qualityTier === 'risky';

            return (
              <div
                key={job.id}
                onClick={() => handleOpenDrawer(job)}
                className={`p-5 sm:p-6 space-y-4 hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C]/60 transition-all cursor-pointer ${
                  isInvitation ? 'bg-purple-500/[0.02]' : isRisky ? 'bg-rose-500/[0.02]' : ''
                }`}
              >
                {/* Top Row: Title, Match Score, Tags, Save Button */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 max-w-2xl min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isInvitation && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Direct Client Invitation
                        </span>
                      )}

                      {isRisky && (
                        <span className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          High Risk / Non-Verified
                        </span>
                      )}

                      <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white leading-snug hover:text-primary transition-colors">
                        {job.title}
                      </h3>

                      <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold shrink-0">
                        {job.matchScore}% Match
                      </span>

                      {job.crmLeadId && (
                        <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          CRM Linked
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                      <span className="text-slate-900 dark:text-white font-bold">
                        {job.budgetType === 'Hourly' ? job.hourlyRateRange : `$${job.budgetAmount?.toLocaleString()} Fixed`}
                      </span>
                      <span>•</span>
                      <span>Posted {job.postedTime}</span>
                      <span>•</span>
                      <span>{job.proposalsCount} proposals</span>
                      <span>•</span>
                      <span>Connects: {job.opportunityType === 'invitation' ? '0' : (job.connectsCost ?? 16)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div 
                    className="flex items-center gap-2 shrink-0 self-start"
                    onClick={(e) => e.stopPropagation()} // Prevent card click opening drawer when clicking buttons
                  >
                    <button
                      type="button"
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        job.isSaved 
                          ? 'bg-primary-muted border-primary/30 text-primary' 
                          : 'border-slate-200 dark:border-[#2E2E2E] text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title={job.isSaved ? 'Remove from saved' : 'Save opportunity'}
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

                {/* Description Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* TRIXIE AI Highlight Banner */}
                {job.trixieInsights?.whyMatches?.[0] && (
                  <div className="p-2.5 rounded-xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/15 flex items-center gap-2 text-[11px] text-purple-700 dark:text-purple-300">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="font-semibold truncate">
                      {job.trixieInsights.whyMatches[0]}
                    </span>
                  </div>
                )}

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
                  <div className="flex items-center gap-1 font-bold">
                    {job.paymentVerified ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Payment Verified</span>
                      </span>
                    ) : (
                      <span className="text-rose-500 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Payment Unverified</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{job.clientRating} ({job.clientReviewsCount} reviews)</span>
                  </div>

                  <div>
                    <span className="text-slate-400">Total Spent:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{job.clientSpent}</span>
                  </div>

                  {job.riskSignals?.clientHireRate !== undefined && (
                    <div>
                      <span className="text-slate-400">Hire Rate:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{job.riskSignals.clientHireRate}%</span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-400">Location:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{job.clientCountry}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Opportunity Slide-over Decision Drawer */}
      <JobDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        job={selectedDrawerJob}
        onOpenDraftProposal={(job) => {
          setIsDrawerOpen(false);
          onOpenApply(job);
        }}
      />

      {/* Radar Wizard Modal */}
      <CreateRadarModal
        isOpen={isCreateRadarOpen}
        onClose={() => setIsCreateRadarOpen(false)}
      />

    </div>
  );
};
