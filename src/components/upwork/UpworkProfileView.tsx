import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  User, 
  BrainCircuit, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Target, 
  Star
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useUpwork } from '../../context/UpworkContext';

export type ProfileSubTab = 'overview' | 'intelligence' | 'insights' | 'settings';

export interface UpworkProfileViewProps {
  initialSubTab?: ProfileSubTab;
}

export const UpworkProfileView: React.FC<UpworkProfileViewProps> = ({ initialSubTab }) => {
  const location = useLocation();
  const { accounts, jobs, isEmergencyPaused, todayConnectsUsed, todayConnectsBudget } = useUpwork();
  const profile = accounts[0] || {
    id: 'acc-1',
    name: 'Sarah Jenkins',
    title: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    topRatedBadge: 'TOP RATED PLUS',
    jss: 100,
    hourlyRate: '$125.00/hr',
    totalEarnings: '$34,000+ Earned',
  };

  // Determine active tab from prop or route backward-compatibility
  const resolveInitialTab = (): ProfileSubTab => {
    if (initialSubTab) return initialSubTab;
    const p = location.pathname.toLowerCase();
    if (p.includes('/intelligence') || p.includes('/match-score') || p.includes('/job-intel')) {
      return 'intelligence';
    }
    if (p.includes('/proposal-intel') || p.includes('/client-intel') || p.includes('/insights')) {
      return 'insights';
    }
    if (p.includes('/settings') || p.includes('/optimization')) {
      return 'settings';
    }
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<ProfileSubTab>(resolveInitialTab);
  const [availability, setAvailability] = useState<'more30' | 'less30' | 'asNeeded'>('more30');
  const [hourlyRate, setHourlyRate] = useState<string>('$125.00/hr');
  const [isEditingRate, setIsEditingRate] = useState<boolean>(false);
  const [tempRate, setTempRate] = useState<string>('$125.00/hr');

  useEffect(() => {
    setActiveTab(resolveInitialTab());
  }, [location.pathname, initialSubTab]);

  const tabs: { id: ProfileSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'intelligence', label: 'Profile Intelligence', icon: <BrainCircuit className="w-3.5 h-3.5" /> },
    { id: 'insights', label: 'Performance / Insights', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings / Optimization', icon: <Sliders className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. UNIFIED PROFILE IDENTITY & ACTION BAR */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-primary/50 shadow-sm" 
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-[#161616] rounded-full flex items-center justify-center text-[10px] text-white font-bold" title="Profile Active & Available">
                ✓
              </span>
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {profile.name}
                </h2>
                <Badge variant="emerald" size="sm" className="font-extrabold tracking-wide uppercase">
                  {profile.topRatedBadge}
                </Badge>
                <Badge variant="slate" size="sm" className="font-mono text-[11px]">
                  100% Job Success
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
                {profile.title}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 pt-0.5 flex-wrap">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  JSS: {profile.jss}% (Top Rated Score)
                </span>
                <span>•</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  Rate: {hourlyRate}
                </span>
                <span>•</span>
                <span className="text-primary font-bold">
                  {profile.totalEarnings}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Availability / Health Pill */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
            <div className="p-3 px-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-right font-mono text-xs">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Availability Status</div>
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span>More than 30 hrs/week</span>
              </div>
              <div className="text-[10px] text-emerald-500 font-bold mt-0.5">Open to Contract Offers</div>
            </div>
          </div>
        </div>

        {/* 2. PROFILE INTERNAL NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-[#222222] pt-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC TAB CONTENT */}

      {/* TAB A: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Health & Strength KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Completeness</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                100%
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">All portfolio items, certifications, and identity verified.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Success Score</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">100% Top Rated+</div>
              <p className="text-[11px] text-slate-400 font-sans">0 negative client outcomes across 12 completed enterprise contracts.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Response Velocity</div>
              <div className="text-2xl font-black text-primary">&lt; 2.8 Hours</div>
              <p className="text-[11px] text-slate-400 font-sans">Direct interview inquiries answered 4.1x faster than average.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daily Safety Meter</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{todayConnectsUsed} / {todayConnectsBudget}</div>
              <p className="text-[11px] text-slate-400 font-sans">Connects usage pacing active with residential IP safety shield.</p>
            </div>
          </div>

          {/* Verified Skills & Stack Synergies */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
                  Verified Skills & Match Synergies
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Core competencies weighted by the AI scoring engine for incoming RSS job triggers.
                </p>
              </div>
              <Badge variant="primary" size="sm">40% Stack Weight</Badge>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: 'React', level: 'Verified Top 5%' },
                { name: 'TypeScript', level: 'Verified Top 5%' },
                { name: 'AI Agent Architecture', level: 'High Demand' },
                { name: 'Next.js', level: 'Verified' },
                { name: 'Python Backend', level: 'Verified' },
                { name: 'DKIM / DMARC Infrastructure', level: 'High Demand' },
                { name: 'Multi-Inbox Cold Email', level: 'Agency Core' },
                { name: 'REST & GraphQL APIs', level: 'Verified' },
                { name: 'Conversational Voice AI', level: 'Specialized' },
              ].map((skill, idx) => (
                <div key={idx} className="p-2.5 px-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#262626] flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                  <span className="text-[10px] font-mono text-primary font-semibold px-1.5 py-0.5 rounded-md bg-primary-muted">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Contract Portfolio */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
                Active Client Engagements (2 Projects)
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-500">Escrow Protected</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Enterprise Outbound Multi-Inbox System</span>
                  <Badge variant="emerald" size="sm">Active Contract</Badge>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  Apex Revenue Systems • Rate: $125.00/hr • 25 hrs logged this week
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Conversational Voice AI Agent Infrastructure</span>
                  <Badge variant="emerald" size="sm">Active Contract</Badge>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  CloudScale Labs • Rate: $140.00/hr • Milestone 2 In Progress
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: PROFILE INTELLIGENCE */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          {/* Intelligence KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Opportunity Match</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">96.4%</div>
              <p className="text-[11px] text-slate-400 font-sans">Filtered for high-budget jobs matching profile verified skills.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Competition Density</div>
              <div className="text-2xl font-black text-primary">4.2 Proposals/Job</div>
              <p className="text-[11px] text-slate-400 font-sans">Trigger auto-bids in under 3 minutes when proposal count &lt; 5.</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Win Probability Threshold</div>
              <div className="text-2xl font-black text-primary">&gt; 82% Expected</div>
              <p className="text-[11px] text-slate-400 font-sans">Scoring algorithm weights client payment verification and budget fit.</p>
            </div>
          </div>

          {/* 8-Dimension Scoring Weight Matrix */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
                  8-Dimension AI Match Scoring Weight Matrix
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How Outtricks evaluates incoming Upwork opportunities against Sarah Jenkins' profile skill vector.
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
                <p className="text-[11px] text-slate-500 font-sans">Aligns with profile rate target of $100-$150/hr or $5k+ milestones.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Client Payment & Hire History</span>
                  <span className="text-primary font-mono">20% Weight</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '20%' }} />
                </div>
                <p className="text-[11px] text-slate-500 font-sans">Verified payment method, &gt;75% hire rate, and positive client reviews.</p>
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

          {/* Top Scored Matching Opportunities */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              Top Scored Job Opportunities for Profile
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

      {/* TAB C: PERFORMANCE / INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Proposal Performance Stats */}
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

          {/* AI Cover Letter Matrix */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
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

          {/* Client Intelligence & Enterprise Tiers */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              Target Enterprise Client Accounts
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

      {/* TAB D: SETTINGS / OPTIMIZATION */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
                  Profile Availability & Rate Settings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Adjust contract availability and baseline hourly pricing synchronized with Upwork.
                </p>
              </div>
              <Badge variant="emerald" size="sm">OAuth Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Availability Setting */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-3">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Weekly Work Availability</span>
                  <span className="text-emerald-500 font-mono">Current: &gt; 30 hrs/wk</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setAvailability('more30')}
                    className={`py-2 px-2.5 rounded-xl font-bold cursor-pointer transition-all ${
                      availability === 'more30' 
                        ? 'bg-primary text-white shadow-xs' 
                        : 'bg-white dark:bg-[#222222] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#2A2A2A]'
                    }`}
                  >
                    &gt; 30 hrs/wk
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailability('less30')}
                    className={`py-2 px-2.5 rounded-xl font-bold cursor-pointer transition-all ${
                      availability === 'less30' 
                        ? 'bg-primary text-white shadow-xs' 
                        : 'bg-white dark:bg-[#222222] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#2A2A2A]'
                    }`}
                  >
                    &lt; 30 hrs/wk
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailability('asNeeded')}
                    className={`py-2 px-2.5 rounded-xl font-bold cursor-pointer transition-all ${
                      availability === 'asNeeded' 
                        ? 'bg-primary text-white shadow-xs' 
                        : 'bg-white dark:bg-[#222222] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#2A2A2A]'
                    }`}
                  >
                    As Needed
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">Upwork algorithm rewards &gt;30 hrs/wk availability with higher search visibility.</p>
              </div>

              {/* Rate Adjustment */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-3">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Profile Hourly Rate</span>
                  <span className="text-emerald-500 font-mono">{hourlyRate}</span>
                </div>
                {isEditingRate ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempRate}
                      onChange={(e) => setTempRate(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#222222] border border-primary text-slate-900 dark:text-white font-mono font-bold text-xs flex-1 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setHourlyRate(tempRate);
                        setIsEditingRate(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer hover:bg-emerald-500"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingRate(false)}
                      className="px-2 py-1.5 rounded-xl bg-slate-200 dark:bg-[#2A2A2A] text-slate-700 dark:text-slate-300 text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs text-slate-500">Synchronized with Upwork Profile</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTempRate(hourlyRate);
                        setIsEditingRate(true);
                      }}
                      className="text-primary hover:underline font-bold text-xs cursor-pointer"
                    >
                      Edit Rate
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-slate-400">Applies as standard baseline for automated proposal cost estimates.</p>
              </div>
            </div>
          </div>

          {/* Account Connection & Residential Proxy Safeguard */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">
              Profile Connection & Anti-Ban Infrastructure
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Residential Proxy Pool</span>
                  <Badge variant="emerald" size="sm">ACTIVE</Badge>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Pacing requests with 45s - 120s randomized jitter over static residential IPs to prevent rate-limiting.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Emergency Kill Switch</span>
                  <Badge variant={isEmergencyPaused ? 'rose' : 'emerald'} size="sm">
                    {isEmergencyPaused ? 'HALTED' : 'ALL SYSTEMS SAFE'}
                  </Badge>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Instant kill-switch available under Automation Rules to pause all automated proposals if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UpworkProfileView;
