import React from 'react';
import { 
  Briefcase, 
  Send, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Bookmark, 
  Bell, 
  Zap, 
  Calendar, 
  Layers, 
  Clock, 
  TrendingUp, 
  User
} from 'lucide-react';
import { useUpwork, UpworkTabType, UpworkJob } from '../../context/UpworkContext';

interface UpworkOverviewProps {
  onOpenApply?: (job: UpworkJob) => void;
  onOpenCreateAlert: () => void;
  onOpenCreateRule: () => void;
  onOpenCreateTemplate: () => void;
}

export const UpworkOverview: React.FC<UpworkOverviewProps> = ({
  onOpenApply,
  onOpenCreateAlert,
  onOpenCreateRule,
  onOpenCreateTemplate,
}) => {
  const { jobs, applications, contracts, interviews, accounts, setActiveTab } = useUpwork();

  const activeContractsCount = contracts.filter((c) => c.status === 'Active').length;
  const totalEarned = contracts.reduce((acc, c) => acc + c.totalEarned, 0);
  const pendingProposals = applications.filter((a) => a.status === 'Submitted' || a.status === 'Interview').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              JOB SUCCESS SCORE
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              100%
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              Top Rated Plus
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Across 100% verified completed contracts
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE CONTRACTS
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {activeContractsCount}
            </span>
            <span className="text-xs text-blue-600 font-bold">
              In Escrow
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            ${(totalEarned).toLocaleString()} total revenue billed
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE INTERVIEWS
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {interviews.length}
            </span>
            <span className="text-xs text-indigo-600 font-bold">
              Scheduled
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Synchronized directly into Master Inbox
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              PENDING PROPOSALS
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {pendingProposals}
            </span>
            <span className="text-xs text-sky-600 font-bold">
              Dispatched
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            AI-customized cover letter proposals
          </p>
        </div>

      </div>

      {/* 2. Quick Action Launchpad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('jobs')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-500 dark:hover:border-blue-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
            <span>Explore Jobs Feed</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Live RSS job feed with AI match scoring</p>
        </button>

        <button
          onClick={onOpenCreateAlert}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-500 dark:hover:border-blue-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
            <span>Set Instant Job Alert</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Get notified the second a matching high-ticket job posts</p>
        </button>

        <button
          onClick={onOpenCreateRule}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-500 dark:hover:border-blue-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
            <span>Configure Auto-Bid Rule</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Auto-dispatch tailored proposals for 90%+ match scores</p>
        </button>
      </div>

      {/* 3. High-Match Jobs & Active Contracts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Top Matched Jobs Stream (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Top AI-Matched Jobs ({jobs.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              View Feed
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {job.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {job.budgetType} • {job.budgetAmount ? `$${job.budgetAmount.toLocaleString()}` : job.hourlyRateRange} • Posted {job.postedTime}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 shrink-0 font-mono">
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 dark:border-[#202020] text-[10px]">
                  <div className="text-slate-400">
                    Client in {job.clientCountry} • ⭐ {job.clientRating} ({job.clientSpent} spent)
                  </div>
                  {onOpenApply && (
                    <button
                      onClick={() => onOpenApply(job)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Draft Proposal →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Contracts & Escrow (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>Active Contracts ({contracts.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('contracts')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              All Contracts
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {contract.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    contract.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' :
                    'bg-slate-100 dark:bg-[#181818] text-slate-600'
                  }`}>
                    {contract.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Client: {contract.clientName}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/40 dark:border-[#202020]">
                  <span>Type: {contract.contractType}</span>
                  <span className="font-bold text-emerald-600">${contract.totalEarned.toLocaleString()} earned</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
