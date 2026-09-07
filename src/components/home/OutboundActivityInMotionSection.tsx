import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  ArrowRight, 
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Check
} from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

interface ActivityItem {
  id: string;
  typeBadge: string;
  title: string;
  subtitle: string;
  resultMetric: string;
  time: string;
  secondaryStep: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'all' | 'lead' | 'email' | 'linkedin' | 'voice' | 'crm';
  badgeStyle: string;
}

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 'act-1',
    typeBadge: 'LEAD DISCOVERED',
    title: 'Sarah Jenkins',
    subtitle: 'VP Product @ Stripe • Verified work email found',
    resultMetric: '✓ Direct dial available',
    time: 'Just now',
    secondaryStep: '480M+ Pool',
    icon: Search,
    type: 'lead',
    badgeStyle: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/[0.04] border-blue-200/60 dark:border-blue-900/60'
  },
  {
    id: 'act-2',
    typeBadge: 'EMAIL OUTREACH',
    title: 'Enterprise SaaS Q3 Campaign',
    subtitle: 'Personalized follow-up sent with dynamic content',
    resultMetric: '✓ Open rate 44.2% • 99.4% inboxed',
    time: '2 min ago',
    secondaryStep: 'Step 2/6',
    icon: Mail,
    type: 'email',
    badgeStyle: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/[0.04] border-blue-200/60 dark:border-blue-900/60'
  },
  {
    id: 'act-3',
    typeBadge: 'LINKEDIN AUTOMATION',
    title: 'Connection Accepted',
    subtitle: 'Michael Chang • Head of Growth @ Datadog',
    resultMetric: '✓ Automated follow-up scheduled',
    time: '10 min ago',
    secondaryStep: 'Safe API',
    icon: Linkedin,
    type: 'linkedin',
    badgeStyle: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200/60 dark:border-sky-900/60'
  },
  {
    id: 'act-4',
    typeBadge: 'VOICE AI SDR',
    title: 'Sub-400ms Call Completed',
    subtitle: 'Objection handled: "Timing" • Demo agreed',
    resultMetric: '✓ $45K opportunity created',
    time: '15 min ago',
    secondaryStep: 'Sub-400ms',
    icon: PhoneCall,
    type: 'voice',
    badgeStyle: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/[0.04] border-blue-200/60 dark:border-blue-900/60'
  },
  {
    id: 'act-5',
    typeBadge: 'DEAL PROGRESSION',
    title: 'Deal Moved to Qualified',
    subtitle: 'Acme Corp • 40 seats Enterprise License',
    resultMetric: '✓ Pipeline value: $127,000 ARR',
    time: '25 min ago',
    secondaryStep: 'Stage: Qualified',
    icon: Building2,
    type: 'crm',
    badgeStyle: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-900/60'
  },
  {
    id: 'act-6',
    typeBadge: 'WORKFLOW ENGINE',
    title: 'Auto-Route Triggered',
    subtitle: 'Routing to Account Executive • High intent score',
    resultMetric: '✓ Next action: AE notification',
    time: '35 min ago',
    secondaryStep: 'Workflow Running',
    icon: Workflow,
    type: 'all',
    badgeStyle: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/60 dark:border-indigo-900/60'
  }
];

export const OutboundActivityInMotionSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'lead' | 'email' | 'linkedin' | 'voice' | 'crm'>('all');

  const filteredActivities = activeFilter === 'all' 
    ? ACTIVITIES_DATA 
    : ACTIVITIES_DATA.filter(a => a.type === activeFilter || a.type === 'all');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* =========================================================================
            LEFT COLUMN: Narrative, Value Proposition & Stats (5 Cols)
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
              OUTBOUND, WITHOUT THE BUSYWORK
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
            Turn every lead into a{' '}
            <span className="animated-gradient-text">
              revenue opportunity.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed font-sans">
            Outtricks coordinates prospecting, cold email, LinkedIn, Voice AI, and CRM actions in one continuous revenue workflow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
            <Link
              to="/platform"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Watch it in action</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* 3 Proof Stats Strip */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 dark:border-[#2A2A2A]">
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-sans text-slate-950 dark:text-white">99.4%</span>
              <p className="text-xs text-slate-500 font-medium font-sans">Inboxed Rate</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-sans text-blue-600 dark:text-blue-400">480M+</span>
              <p className="text-xs text-slate-500 font-medium font-sans">Verified Leads</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-sans text-emerald-600 dark:text-emerald-400">6</span>
              <p className="text-xs text-slate-500 font-medium font-sans">Native Channels</p>
            </div>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: Clean, Minimal, Structured Live Activity Cards Feed (7 Cols)
            ========================================================================= */}
        <div className="lg:col-span-7">
          <Card3DTilt maxTilt={2.5} scale={1.002}>
            <div className="bg-white dark:bg-[#090d16] border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              
              {/* 1. STREAM HEADER (Live Status & Event Counter) */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]/80">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Live Revenue Stream
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-sans text-slate-500 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>24 events / min</span>
                </div>
              </div>

              {/* 2. SINGLE-LINE HORIZONTAL FILTER ROW (Never Wraps) */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-[#141414] border border-slate-200/60 dark:border-[#2A2A2A] overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'lead', label: 'Leads' },
                  { id: 'email', label: 'Email' },
                  { id: 'linkedin', label: 'LinkedIn' },
                  { id: 'voice', label: 'Voice AI' },
                  { id: 'crm', label: 'Deals CRM' }
                ].map((chip) => {
                  const isActive = activeFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => setActiveFilter(chip.id as any)}
                      className={`flex-1 min-w-fit px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* 3. STRUCTURED ACTIVITY CARDS LIST (Clean, Spacious, Scannable) */}
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto no-scrollbar pr-0.5">
                {filteredActivities.map((act) => {
                  const Icon = act.icon;

                  return (
                    <div
                      key={act.id}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A]/80 hover:bg-white dark:hover:bg-[#131d35] hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xs transition-all duration-150 space-y-2.5"
                    >
                      {/* Top Row: [Icon] [Activity Type Badge] .............. Time */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${act.badgeStyle}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <span className={`text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${act.badgeStyle}`}>
                            {act.typeBadge}
                          </span>
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 dark:text-slate-400 shrink-0">
                          {act.time}
                        </span>
                      </div>

                      {/* Middle: Main Activity Title + Short Supporting Line */}
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-slate-100 tracking-tight leading-tight">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans line-clamp-1">
                          {act.subtitle}
                        </p>
                      </div>

                      {/* Bottom Row: [Result Metric] .............. [Secondary Step / Status] */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/50 dark:border-[#2A2A2A]/80">
                        <span className="text-[11px] font-sans font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                          {act.resultMetric}
                        </span>
                        <span className="text-[10px] font-sans font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#181818] px-2 py-0.5 rounded border border-slate-200/80 dark:border-[#2A2A2A] shrink-0 shadow-2xs">
                          {act.secondaryStep}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* 4. STREAM FOOTER */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-[#2A2A2A]/80 flex items-center justify-between text-[11px] font-sans text-slate-400 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Autonomous 24/7 revenue execution</span>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  0ms Sync Delay • 1 DB
                </span>
              </div>

            </div>
          </Card3DTilt>
        </div>

      </div>

    </section>
  );
};
