import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  BarChart3, 
  Building2, 
  DollarSign, 
  Zap,
  Users,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export type IntelligenceSection = 'job-intel' | 'proposal-intel' | 'client-intel' | 'match-score';

export interface JobIntelligenceViewProps {
  initialSection?: IntelligenceSection;
}

export const JobIntelligenceView: React.FC<JobIntelligenceViewProps> = ({
  initialSection = 'job-intel',
}) => {
  const [activeSection, setActiveSection] = useState<IntelligenceSection>(initialSection);
  const navigate = useNavigate();
  const { jobs, proposals } = useUpwork();

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const handleSectionSelect = (secId: IntelligenceSection) => {
    setActiveSection(secId);
    const pathMap: Record<IntelligenceSection, string> = {
      'job-intel': '/upwork/intelligence',
      'proposal-intel': '/upwork/proposal-intel',
      'client-intel': '/upwork/client-intel',
      'match-score': '/upwork/match-score',
    };
    if (pathMap[secId]) {
      navigate(pathMap[secId]);
    }
  };

  const sections: { id: IntelligenceSection; label: string; icon: React.ReactNode }[] = [
    { id: 'job-intel', label: 'Job Intelligence', icon: <BrainCircuit className="w-3.5 h-3.5" /> },
    { id: 'proposal-intel', label: 'Proposal Intelligence', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'client-intel', label: 'Client Intelligence', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'match-score', label: 'Match Score Engine', icon: <Target className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner & Section Selector */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-primary-muted flex items-center justify-center text-primary">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                Upwork AI Intelligence & Scoring Hub
              </h2>
              <Badge variant="emerald" size="sm">Real-time Telemetry</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Predictive models calculating job win probability, proposal hook effectiveness, verified client hiring habits, and multi-factor match synergy.
            </p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-[#222222] pt-4">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSectionSelect(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Section Views */}
      
      {/* 1. JOB INTELLIGENCE */}
      {activeSection === 'job-intel' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Opportunity Match</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">96.4%</div>
              <p className="text-[11px] text-slate-400 font-sans">Filtered for high-budget jobs matching agency verified skills.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Competition Density</div>
              <div className="text-2xl font-black text-primary">4.2 Proposals/Job</div>
              <p className="text-[11px] text-slate-400 font-sans">RSS trigger auto-bids in under 3 minutes when proposal count &lt; 5.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Win Probability Threshold</div>
              <div className="text-2xl font-black text-primary">&gt; 82% Expected</div>
              <p className="text-[11px] text-slate-400 font-sans">Algorithmic scoring weights client payment verification and budget fit.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              Top Scored Job Opportunities
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {jobs.slice(0, 3).map((j) => (
                <div key={j.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{j.title}</div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {j.budgetType === 'Hourly' ? j.hourlyRateRange : `$${j.budgetAmount?.toLocaleString()}`} • {j.clientCountry} • Client Rating: ⭐ {j.clientRating} ({j.clientReviewsCount})
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-xl bg-primary-muted text-primary font-mono font-bold text-xs">
                      {j.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PROPOSAL INTELLIGENCE */}
      {activeSection === 'proposal-intel' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">First 2-Line Hook Conversion</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">44.8%</div>
              <p className="text-[11px] text-slate-400 font-sans">Open/reply rate when using personalized architectural teardowns.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Optimal Word Count</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">140 - 180 Words</div>
              <p className="text-[11px] text-slate-400 font-sans">Concise bulleted action plans outperform long generic bios by 3.4x.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Response Velocity</div>
              <div className="text-2xl font-black text-primary">&lt; 2.8 Hours</div>
              <p className="text-[11px] text-slate-400 font-sans">Proposals dispatched within 5 minutes get reviewed 3x faster.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              AI Cover Letter Performance Matrix
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Problem Statement + Code Sample Hook</span>
                <span className="text-emerald-500 font-mono">51.2% Win Rate</span>
              </div>
              <p className="text-slate-500 font-sans">
                Directly addressing the client's repo challenge in line 1 and attaching 2 relevant live production URLs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CLIENT INTELLIGENCE */}
      {activeSection === 'client-intel' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Target Client Spend Tier</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">&gt; $50,000+</div>
              <p className="text-[11px] text-slate-400 font-sans">Filter excludes zero-spend clients and unverified payment profiles.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Client Hire Rate</div>
              <div className="text-2xl font-black text-primary">89.4%</div>
              <p className="text-[11px] text-slate-400 font-sans">Targeting buyers who actively hire rather than gathering market quotes.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Hourly Rate Paid</div>
              <div className="text-2xl font-black text-primary">$110 - $150/hr</div>
              <p className="text-[11px] text-slate-400 font-sans">US / UK / EU enterprise clients with verified budget authority.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              Verified Enterprise Client Accounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">FinTech Core Inc.</span>
                  <Badge variant="emerald" size="sm">Payment Verified</Badge>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  United States • $280K Total Spent • ⭐ 4.98 (42 reviews) • 94% Hire Rate
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">CloudScale Labs</span>
                  <Badge variant="emerald" size="sm">Payment Verified</Badge>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  United Kingdom • $145K Total Spent • ⭐ 5.0 (28 reviews) • 88% Hire Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MATCH SCORE ENGINE */}
      {activeSection === 'match-score' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
          <div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              8-Dimension AI Match Scoring Weight Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              How the Outtricks autonomous engine evaluates each incoming Upwork RSS job before auto-drafting proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Skill & Tech Stack Overlap</span>
                <span className="text-primary font-mono">40% Weight</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
              </div>
              <p className="text-[11px] text-slate-500 font-sans">Matching React, TypeScript, AI Agent Architecture, Next.js, and Python backend.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Client Budget & Rate Alignment</span>
                <span className="text-primary font-mono">25% Weight</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '25%' }} />
              </div>
              <p className="text-[11px] text-slate-500 font-sans">Aligns with agency rate target of $100-$150/hr or $5k+ milestones.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Client Payment & Hire History</span>
                <span className="text-primary font-mono">20% Weight</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '20%' }} />
              </div>
              <p className="text-[11px] text-slate-500 font-sans">Verified payment method, &gt;75% hire rate, and positive reviews.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Proposal Density & Speed Window</span>
                <span className="text-primary font-mono">15% Weight</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '15%' }} />
              </div>
              <p className="text-[11px] text-slate-500 font-sans">Under 5 proposals submitted; posted within the last 1 hour.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

