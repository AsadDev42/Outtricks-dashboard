import React, { useState } from 'react';
import { 
  Briefcase, 
  Play, 
  Pause, 
  Settings, 
  Search, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  Star, 
  ExternalLink,
  Sliders,
  Filter,
  Check,
  RotateCw
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const UpworkBiddingAgentView: React.FC = () => {
  const { agents } = useAgents();
  const { success, info } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'pipeline' | 'jobs' | 'proposals' | 'settings'>('pipeline');
  const [minBudget, setMinBudget] = useState(1500);
  const [minMatchScore, setMinMatchScore] = useState(85);
  const [dailyProposalCap, setDailyProposalCap] = useState(8);

  const PIPELINE_STAGES = [
    { id: 'discovered', label: 'Discovered', count: 142, color: 'text-slate-500 bg-slate-100 dark:bg-[#181818]' },
    { id: 'qualified', label: 'Qualified', count: 34, color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60' },
    { id: 'drafted', label: 'Drafted', count: 12, color: 'text-blue-500 bg-blue-50 dark:bg-white/[0.04]' },
    { id: 'approval', label: 'Needs Approval', count: 4, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
    { id: 'submitted', label: 'Submitted', count: 88, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60' },
    { id: 'interview', label: 'Interview', count: 19, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' },
    { id: 'won', label: 'Won', count: 9, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60' },
    { id: 'rejected', label: 'Rejected', count: 14, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60' },
  ];

  const DISCOVERED_JOBS = [
    { id: 'job-01', title: 'Senior Full-Stack AI Engineer for Enterprise SaaS MVP', client: 'Enterprise FinTech (US)', budget: '$8,000 Fixed', score: 96, discovered: '12 mins ago', status: 'Drafting Proposal' },
    { id: 'job-02', title: 'Cold Email & Outbound Infrastructure Architect', client: 'B2B Growth Agency (UK)', budget: '$4,500 Fixed', score: 94, discovered: '28 mins ago', status: 'Ready for Review' },
    { id: 'job-03', title: 'Autonomous Multi-Agent AI Workflow Developer', client: 'AI Startup Studio (CA)', budget: '$95/hr ($10k cap)', score: 91, discovered: '45 mins ago', status: 'Submitted' },
    { id: 'job-04', title: 'Lead Scraping & CRM Enrichment Pipeline Builder', client: 'Sales Ops Advisory (US)', budget: '$3,200 Fixed', score: 88, discovered: '1 hour ago', status: 'Needs Approval' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            <Briefcase className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Upwork Bidding Agent
              </h1>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                Live Radar Active
              </span>

              <span className="text-xs font-mono text-slate-400">ID: agt_upwork_bidder</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Continuously scans Upwork RSS feeds, evaluates client verified spend, drafts hyper-tailored proposals with code samples, and handles bid approvals.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
              <span>Connects Balance: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">140 Connects</strong></span>
              <span>•</span>
              <span>Average Job Size: <strong className="text-slate-700 dark:text-slate-300 font-bold">$5,400</strong></span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => success('Upwork Bidding radar running.', 'Radar Active')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Active Radar</span>
          </button>
          <button
            onClick={() => info('Upwork Bidding paused.', 'Radar Paused')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Jobs Found</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">142</div>
          <span className="text-[10px] text-slate-400">Past 24 hours</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Qualified Jobs</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">34</div>
          <span className="text-[10px] text-emerald-600 font-bold">&gt;85% match</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Proposals Drafted</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">12</div>
          <span className="text-[10px] text-emerald-600 font-bold">Custom spintax</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Submitted</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">88</div>
          <span className="text-[10px] text-slate-400">Total lifetime</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Interviews</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">19</div>
          <span className="text-[10px] text-emerald-600 font-bold">21.5% interview rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Win Rate</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">47.3%</div>
          <span className="text-[10px] text-emerald-600 font-bold">9 contracts won</span>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-[#2A2A2A] pb-1 text-xs font-bold">
        {[
          { id: 'pipeline', label: 'Opportunity Pipeline' },
          { id: 'jobs', label: 'Discovered Jobs' },
          { id: 'proposals', label: 'Proposal Queue' },
          { id: 'settings', label: 'Bidding Rules & Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Section: Opportunity Pipeline */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {PIPELINE_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-3 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{stage.label}</span>
                  <span className={`text-xs font-black px-1.5 py-0.2 rounded-md font-mono ${stage.color}`}>
                    {stage.count}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, stage.count * 4)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Active Job Discovery Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Top Matched Upwork Opportunities
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
              {DISCOVERED_JOBS.map((job) => (
                <div key={job.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-xl">
                    <div className="font-extrabold text-slate-900 dark:text-white">{job.title}</div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>Client: {job.client}</span>
                      <span>•</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{job.budget}</span>
                      <span>•</span>
                      <span>{job.discovered}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 rounded-md font-mono font-black text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                      {job.score}% Match
                    </span>
                    <Badge variant={job.status.includes('Draft') ? 'amber' : 'primary'}>{job.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Section: Bidding Settings */}
      {activeSubTab === 'settings' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 max-w-2xl">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Upwork Bidding Rules & Connects Guardrails
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Minimum Job Budget ($ USD)
              </label>
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Minimum AI Match Score Threshold (%)
              </label>
              <input
                type="number"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Max Daily Proposal Submissions
              </label>
              <input
                type="number"
                value={dailyProposalCap}
                onChange={(e) => setDailyProposalCap(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => success('Upwork bidding parameters saved.', 'Settings Saved')}
              className="mt-2"
            >
              Save Bidding Rules
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
