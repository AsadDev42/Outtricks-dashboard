import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bookmark, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Star, 
  Clock, 
  Globe, 
  Briefcase, 
  Share2, 
  Check, 
  Building2,
  ChevronDown,
  Info
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork, UpworkJob, QualityTier } from '../../context/UpworkContext';
import { useToast } from '../../context/ToastContext';

export interface JobDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: UpworkJob | null;
  onOpenDraftProposal: (job: UpworkJob) => void;
}

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({
  isOpen,
  onClose,
  job,
  onOpenDraftProposal,
}) => {
  const { toggleSaveJob, skipJob, linkJobToCrm } = useUpwork();
  const { success } = useToast();
  const [isSkipDropdownOpen, setIsSkipDropdownOpen] = useState(false);

  if (!isOpen || !job) return null;

  const qualityBadgeConfig: Record<QualityTier, { label: string; variant: 'emerald' | 'amber' | 'rose' | 'slate'; icon: React.ReactNode }> = {
    recommended: { label: 'Recommended Fit', variant: 'emerald', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    review: { label: 'Review Required', variant: 'amber', icon: <Info className="w-3.5 h-3.5" /> },
    low_fit: { label: 'Low Fit', variant: 'slate', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    risky: { label: 'High Risk / Skip', variant: 'rose', icon: <XCircle className="w-3.5 h-3.5" /> },
  };

  const tier = job.qualityTier || (job.matchScore >= 90 ? 'recommended' : job.matchScore >= 75 ? 'review' : 'low_fit');
  const currentTierConfig = qualityBadgeConfig[tier];

  const handleSkip = (reason: string) => {
    skipJob(job.id, reason);
    setIsSkipDropdownOpen(false);
    onClose();
  };

  const handleLinkCrm = () => {
    linkJobToCrm(job.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white dark:bg-[#141414] border-l border-slate-200 dark:border-[#262626] shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          
          {/* Top Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-[#222222] flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-[#181818]/60">
            <div className="flex items-center gap-2.5 flex-wrap">
              {job.opportunityType === 'invitation' ? (
                <span className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Client Invitation
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-xl bg-slate-200/70 dark:bg-[#252525] text-slate-700 dark:text-slate-300 text-xs font-bold font-mono flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Marketplace Opportunity
                </span>
              )}

              <Badge variant={currentTierConfig.variant} size="sm">
                <span className="flex items-center gap-1">
                  {currentTierConfig.icon}
                  <span>{currentTierConfig.label}</span>
                </span>
              </Badge>

              {job.crmLeadId && (
                <Badge variant="blue" size="sm">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>CRM Linked</span>
                  </span>
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1.5">
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

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Title & Core Metrics */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-tight">
                {job.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>{job.budgetType === 'Hourly' ? job.hourlyRateRange : `$${job.budgetAmount?.toLocaleString()} Fixed`}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Posted {job.postedTime}</span>
                </div>
                <span>•</span>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{job.proposalsCount}</span> proposals
                </div>
                <span>•</span>
                <div>
                  Connects: <span className="font-bold text-blue-600 dark:text-blue-400">{job.connectsCost ?? 16}</span>
                </div>
              </div>
            </div>

            {/* Outtricks Match Score & Breakdown Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-slate-50 to-emerald-500/5 dark:from-emerald-950/20 dark:via-[#1A1A1A] dark:to-emerald-950/10 border border-emerald-500/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-mono font-black text-base shadow-sm">
                    {job.matchScore}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Outtricks Multi-Factor Match Score</span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Evaluated across 7 real-time dimensions against your profile & case studies.
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {job.matchScore >= 95 ? 'Top 1% Fit' : job.matchScore >= 85 ? 'High Fit' : 'Moderate'}
                </span>
              </div>

              {job.matchBreakdown && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/15">
                  <div className="p-2 rounded-xl bg-white/70 dark:bg-[#202020]/70 border border-slate-200/50 dark:border-white/5">
                    <div className="text-[10px] text-slate-500">Skills Alignment</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{job.matchBreakdown.skills}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/70 dark:bg-[#202020]/70 border border-slate-200/50 dark:border-white/5">
                    <div className="text-[10px] text-slate-500">Client Quality</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{job.matchBreakdown.clientQuality}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/70 dark:bg-[#202020]/70 border border-slate-200/50 dark:border-white/5">
                    <div className="text-[10px] text-slate-500">Budget Health</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{job.matchBreakdown.budget}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/70 dark:bg-[#202020]/70 border border-slate-200/50 dark:border-white/5">
                    <div className="text-[10px] text-slate-500">Competition</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{job.matchBreakdown.competition}%</div>
                  </div>
                </div>
              )}
            </div>

            {/* TRIXIE AI Opportunity Analysis */}
            {job.trixieInsights && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-purple-500/25 dark:border-purple-500/20 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      TRIXIE AI Opportunity Intelligence
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-md">
                    Actionable Brief
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      Why This Opportunity Matches:
                    </span>
                    <ul className="space-y-1 pl-4 list-disc marker:text-purple-500 text-[11px] leading-relaxed">
                      {job.trixieInsights.whyMatches.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/30">
                    <span className="font-bold text-purple-900 dark:text-purple-300 block mb-0.5 text-[11px]">
                      Your Competitive Advantage:
                    </span>
                    <p className="text-[11px] text-purple-800/90 dark:text-purple-300/90 leading-relaxed">
                      {job.trixieInsights.yourAdvantage}
                    </p>
                  </div>

                  {job.trixieInsights.potentialRisks.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block mb-1 text-[11px]">
                        Watchouts & Risk Considerations:
                      </span>
                      <ul className="space-y-1 pl-4 list-disc marker:text-amber-500 text-[11px] text-amber-700 dark:text-amber-400">
                        {job.trixieInsights.potentialRisks.map((risk, i) => (
                          <li key={i}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Recommended Action:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{job.trixieInsights.recommendedAction}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Risk & Anti-Spam Screening Signals */}
            {job.riskSignals && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>Safety & Anti-Spam Screen</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    job.riskSignals.riskLevel === 'low' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                      : job.riskSignals.riskLevel === 'medium' 
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                  }`}>
                    {job.riskSignals.riskLevel.toUpperCase()} RISK
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    {job.riskSignals.isPaymentVerified ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    )}
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">Payment Verified</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Hire Rate:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{job.riskSignals.clientHireRate}%</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Scope:</span>
                    <span className={`font-bold ${job.riskSignals.vagueScopeWarning ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {job.riskSignals.vagueScopeWarning ? 'Vague' : 'Clear'}
                    </span>
                  </div>
                </div>

                {job.riskSignals.suspiciousSignals.length > 0 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Flagged Suspicious Signals:</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                      {job.riskSignals.suspiciousSignals.map((sig, i) => (
                        <li key={i}>{sig}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Client Intelligence */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Client Historical Intelligence
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {job.clientCountry}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400">Total Spent</div>
                  <div className="font-bold text-slate-900 dark:text-white">{job.clientSpent}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400">Rating</div>
                  <div className="font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{job.clientRating} ({job.clientReviewsCount})</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400">Avg Hourly Paid</div>
                  <div className="font-bold text-slate-900 dark:text-white">${job.clientStats?.avgHourlyPaid || 115}/hr</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400">Hires / Active</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {job.clientStats?.totalHires || 42} / {job.clientStats?.activeHires || 5}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Full Job Description
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#222222] text-xs leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Required Technical Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202020] border border-slate-200/60 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Screening Questions Preview (if any) */}
            {job.screeningQuestions && job.screeningQuestions.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Client Screening Questions ({job.screeningQuestions.length})
                  </h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    ✓ Pre-Drafted Grounded Answers Available
                  </span>
                </div>

                <div className="space-y-2">
                  {job.screeningQuestions.map((sq, idx) => (
                    <div key={sq.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424] text-xs space-y-1.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-start gap-2">
                        <span className="text-primary font-mono text-[10px]">Q{idx + 1}:</span>
                        <span>{sq.question}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                        "{sq.suggestedAnswer}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-[#222222] bg-white dark:bg-[#141414] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Skip Reason Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSkipDropdownOpen(!isSkipDropdownOpen)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2E2E2E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Skip Opportunity</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isSkipDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 p-1 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2E2E2E] shadow-xl text-xs z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2 text-[10px] uppercase font-bold text-slate-400">
                      Select reason to tune AI radar:
                    </div>
                    {[
                      'Budget too low / unrealistic',
                      'High proposal competition (>15)',
                      'Client history unverified / poor rating',
                      'Vague scope / high dispute risk',
                      'Outside primary tech stack'
                    ].map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => handleSkip(reason)}
                        className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-200 text-xs transition-colors cursor-pointer"
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Link to CRM */}
              <button
                type="button"
                onClick={handleLinkCrm}
                disabled={!!job.crmLeadId}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  job.crmLeadId 
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 cursor-default'
                    : 'border-slate-200 dark:border-[#2E2E2E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Sync opportunity as Deal / Prospect to Deals CRM"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{job.crmLeadId ? 'Synced to CRM' : 'Link to CRM'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.upwork.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-[#2E2E2E] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Open live on Upwork"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onClose();
                  onOpenDraftProposal(job);
                }}
                leftIcon={<Send className="w-4 h-4" />}
                className="flex-1 sm:flex-initial"
              >
                Draft Proposal
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
