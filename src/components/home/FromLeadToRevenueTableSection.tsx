import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Workflow, 
  Building2, 
  ArrowRight, 
  Check, 
  Database,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

interface WorkflowStage {
  num: string;
  id: string;
  name: string;
  descriptor: string;
  icon: React.ComponentType<{ className?: string }>;
  detailTitle: string;
  detailDescription: string;
  moduleBadge: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  visualizationType: 'find' | 'qualify' | 'reach' | 'engage' | 'followup' | 'close';
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    num: '01',
    id: 'find',
    name: 'FIND',
    descriptor: 'Lead Discovery',
    icon: Search,
    detailTitle: 'Build Your Ideal Prospect List',
    detailDescription: 'Search 480M+ verified B2B profiles with granular filters for role, company size, industry, revenue, technology stack, and real-time buying signals.',
    moduleBadge: 'Lead Finder Engine',
    features: [
      '480M+ verified B2B profiles',
      'Direct work emails & mobile dials',
      'Advanced ICP & firmographic filters',
      'Live buying intent signals'
    ],
    ctaText: 'Explore Lead Finder',
    ctaHref: '/platform/8-dimension-b2b-pool',
    visualizationType: 'find'
  },
  {
    num: '02',
    id: 'qualify',
    name: 'QUALIFY',
    descriptor: 'Contact Validation',
    icon: Database,
    detailTitle: 'Validate Every Contact Before Outreach',
    detailDescription: 'Validate contact deliverability and ensure direct work emails and direct phone lines are formatted and verified for immediate campaign staging.',
    moduleBadge: 'Validation Engine',
    features: [
      'Real-time MX & SMTP validation',
      'Direct work email formatting',
      'Direct phone & mobile dials',
      'Zero bounce protection safeguard'
    ],
    ctaText: 'Explore Validation',
    ctaHref: '/platform/8-dimension-b2b-pool',
    visualizationType: 'qualify'
  },
  {
    num: '03',
    id: 'reach',
    name: 'REACH',
    descriptor: 'Multi-Channel',
    icon: Mail,
    detailTitle: 'Launch Coordinated Outbound Outreach',
    detailDescription: 'Execute multi-inbox cold email with automated mailbox rotation, cloud-proxy LinkedIn touches, and phone outreach from one unified orchestrator.',
    moduleBadge: 'Multi-Channel Outreach Engine',
    features: [
      'Multi-inbox cold email rotation',
      'Cloud proxy LinkedIn safe actions',
      'Dynamic spintax personalization',
      '99.4% primary inbox placement'
    ],
    ctaText: 'Explore Multi-Channel Outreach',
    ctaHref: '/platform/multi-inbox-email-outreach',
    visualizationType: 'reach'
  },
  {
    num: '04',
    id: 'engage',
    name: 'ENGAGE',
    descriptor: 'AI Conversations',
    icon: PhoneCall,
    detailTitle: 'Turn Conversations Into Qualified Demos',
    detailDescription: 'Deploy sub-400ms WebRTC Voice AI SDRs that engage leads over the phone, handle complex objections dynamically, and book calendar meetings.',
    moduleBadge: 'Sub-400ms Voice AI SDR',
    features: [
      'Sub-400ms conversational latency',
      'Real-time objection handling',
      'Natural interruption support',
      'Instant calendar booking'
    ],
    ctaText: 'Explore Voice AI SDR',
    ctaHref: '/platform/sub-400ms-webrtc',
    visualizationType: 'engage'
  },
  {
    num: '05',
    id: 'followup',
    name: 'FOLLOW UP',
    descriptor: 'Automated Sequences',
    icon: Workflow,
    detailTitle: 'Automate Every Follow-Up & Touchpoint',
    detailDescription: 'Build smart conditional branches: trigger LinkedIn profile visits on email opens, auto-call on link clicks, and ensure zero pipeline leads drop off.',
    moduleBadge: 'Visual Flow Builder Engine',
    features: [
      'Drag-and-drop visual branching',
      'Cross-channel action triggers',
      'Dynamic delay & condition rules',
      'Zero lead drop-off automation'
    ],
    ctaText: 'Explore Flow Builder',
    ctaHref: '/platform/visual-flow-builder',
    visualizationType: 'followup'
  },
  {
    num: '06',
    id: 'close',
    name: 'CLOSE',
    descriptor: 'Revenue & CRM',
    icon: Building2,
    detailTitle: 'Track Pipeline Progression to Closed Revenue',
    detailDescription: 'Manage deals, track multi-touch revenue attribution, and sync interaction histories in real time on a zero-lag PostgreSQL database.',
    moduleBadge: 'Unified Deals CRM',
    features: [
      'Lead-to-cash pipeline stages',
      'Multi-touch revenue attribution',
      '1 unified PostgreSQL database',
      '0ms webhook synchronization'
    ],
    ctaText: 'Explore Deals CRM',
    ctaHref: '/platform/crm',
    visualizationType: 'close'
  }
];

export const FromLeadToRevenueTableSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const activeStage = WORKFLOW_STAGES[activeStageIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      {/* =========================================================================
          SECTION HEADER
          ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            END-TO-END REVENUE EXECUTION
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          From Lead to Revenue in Six Seamless Steps
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
          See exactly how Outtricks connects prospecting, qualification, outreach, engagement, follow-up, and revenue pipeline.
        </p>
      </div>

      {/* =========================================================================
          SIX COMPACT STEP PILL INDICATORS (e.g. [ 01  FIND ])
          ========================================================================= */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
        {WORKFLOW_STAGES.map((stg, idx) => {
          const isActive = idx === activeStageIndex;

          return (
            <button
              key={stg.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`flex-1 min-w-[105px] sm:min-w-0 px-3.5 py-2 rounded-full text-xs font-sans font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white dark:bg-[#141414] text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-2xs'
              }`}
              aria-label={`Go to step ${stg.num}: ${stg.name}`}
            >
              <span className={isActive ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500 font-semibold'}>
                {stg.num}
              </span>
              <span className="tracking-wider uppercase whitespace-nowrap">
                {stg.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          HORIZONTAL 6-STEP NAVIGATION TABLE (Minimal, Clean, 2s Scannable)
          Contains ONLY: Step Number, Short Step Name, 2-4 Word Descriptor
          ========================================================================= */}
      <div className="rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 sm:p-5 text-left transition-all cursor-pointer relative group flex flex-col justify-between h-[120px] sm:h-[130px] ${
                  isActive
                    ? 'bg-blue-50/70 dark:bg-white/[0.04] text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-[#141414] hover:bg-slate-50/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {/* Active Top Blue Accent Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500" />
                )}

                {/* Top Row: Step Number & Channel Icon */}
                <div className="flex items-center justify-between">
                  <span className={`font-sans text-xs font-bold ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {stage.num}
                  </span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Row: Step Name & Descriptor */}
                <div>
                  <div className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                    {stage.name}
                  </div>
                  <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    {stage.descriptor}
                  </div>
                </div>

              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          DETAILED INFORMATION PANEL (Clean, Spacious, Focused on Active Stage)
          ========================================================================= */}
      <div className="rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm p-6 sm:p-8 lg:p-10 animate-in fade-in duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Stage Explanation & Core Capabilities (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-sans font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  STAGE {activeStage.num} • {activeStage.name}
                </span>
                <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400">
                  {activeStage.moduleBadge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {activeStage.detailTitle}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {activeStage.detailDescription}
              </p>
            </div>

            {/* Core Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 dark:border-[#2A2A2A]/80">
              {activeStage.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs font-sans text-slate-800 dark:text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 font-bold" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Stage Action CTA */}
            <div className="pt-2">
              <Link
                to={activeStage.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{activeStage.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right Column: Live Stage Telemetry Sandbox (5 Cols) */}
          <div className="lg:col-span-5">
            <Card3DTilt maxTilt={3} scale={1.002}>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#090E1A] text-white border border-slate-800 shadow-xl space-y-4 font-sans text-xs">
                
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-blue-300">
                      OUTTRICKS PIPELINE ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    STAGE {activeStage.num}/06
                  </span>
                </div>

                {/* =========================================================================
                    STAGE 1: FIND (Kept exactly as it is)
                    ========================================================================= */}
                {activeStage.visualizationType === 'find' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span>SEARCH QUERY</span>
                        <span className="text-blue-400 font-bold">480M+ POOL</span>
                      </div>
                      <p className="text-xs font-bold text-white">Title: VP / Head of Sales • B2B SaaS • Funding: Series A+</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Sarah Jenkins</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          99.4% Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">VP Product @ Stripe • San Francisco, CA</p>
                      <div className="pt-1 flex items-center gap-2 text-[10px] font-sans text-slate-400 border-t border-slate-800/80">
                        <span className="text-emerald-400">✓ work email</span>
                        <span className="text-emerald-400">✓ direct dial</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================================================================
                    STAGE 2: QUALIFY (Contact Validation Engine)
                    ========================================================================= */}
                {activeStage.visualizationType === 'qualify' && (
                  <div className="space-y-3 font-sans">
                    
                    {/* Sub-Card 1: Direct Contact Validation Header */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                          <Layers className="w-3.5 h-3.5" />
                          Direct Contact Check
                        </span>
                        <span className="text-emerald-400 font-sans font-bold text-[10px]">REAL-TIME SMTP</span>
                      </div>
                      
                      {/* Step Badges */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <span className="text-slate-400">Corporate MX Check</span>
                          <span className="text-emerald-400 font-bold">✓ Email</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <span className="text-slate-400">Direct Dial Match</span>
                          <span className="text-emerald-400 font-bold">✓ Mobile</span>
                        </div>
                      </div>
                    </div>

                    {/* Sub-Card 2: Verified Record Result */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Marcus Vance</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                          100% Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">Head of Outbound @ HyperGrowth Labs</p>
                      
                      {/* Verification Badges */}
                      <div className="pt-1.5 flex flex-wrap items-center gap-2 text-[10px] font-sans border-t border-slate-800/80">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          marcus@hypergrowth.io
                        </span>
                        <span className="text-blue-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-blue-400" />
                          +1 (512) 890-3412
                        </span>
                      </div>
                    </div>

                    {/* Bottom Status Chip */}
                    <div className="p-2 rounded-lg bg-blue-950/50 border border-blue-800/50 text-[10.5px] font-sans text-blue-300 flex items-center justify-between">
                      <span>Bounce Risk: &lt;0.6%</span>
                      <span className="text-emerald-400 font-bold">✓ Pre-Verified</span>
                    </div>

                  </div>
                )}

                {/* =========================================================================
                    STAGE 3: REACH (Redesigned: Multi-Inbox Rotation & Cloud Proxy Outreach)
                    ========================================================================= */}
                {activeStage.visualizationType === 'reach' && (
                  <div className="space-y-3 font-sans">
                    
                    {/* Sub-Card 1: 24-Inbox Smart Rotation Monitor */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                          <Mail className="w-3.5 h-3.5" />
                          24-INBOX ROTATION
                        </span>
                        <span className="text-emerald-400 font-sans font-bold text-[10px]">100% HEALTH</span>
                      </div>
                      
                      {/* Progress Bar & Rate */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-sans text-slate-400">
                          <span>Pool: 8 Google • 16 MS 365</span>
                          <span className="text-white font-bold">35 sends/day cap</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[78%]" />
                        </div>
                      </div>
                    </div>

                    {/* Sub-Card 2: Multi-Touch Dispatched Cadence */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Enterprise Q3 Sequence</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
                          Multi-Channel
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-[11px] font-sans">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-blue-400" />
                            Email Touch (Spintax A/B)
                          </span>
                          <span className="text-emerald-400 text-[10px]">99.4% Inboxed</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Linkedin className="w-3 h-3 text-sky-400" />
                            Cloud Proxy LinkedIn Touch
                          </span>
                          <span className="text-sky-400 text-[10px]">Safe Delay</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Chip */}
                    <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/50 text-[10.5px] font-sans text-emerald-300 flex items-center justify-between">
                      <span>Isolation: Static Cloud Proxy</span>
                      <span className="text-emerald-400 font-bold">✓ 0 Ban Risk</span>
                    </div>

                  </div>
                )}

                {/* =========================================================================
                    STAGE 4: ENGAGE Voice AI Telemetry
                    ========================================================================= */}
                {activeStage.visualizationType === 'engage' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span>LIVE VOICE SDR CALL</span>
                        <span className="text-blue-400 font-bold">&lt;380ms WebRTC</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans italic">"We'd love to see how your multi-channel routing works."</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Call Outcome</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
                          Qualified Lead
                        </span>
                      </div>
                      <div className="pt-1 flex items-center gap-2 text-[10px] font-sans text-slate-400 border-t border-slate-800/80">
                        <span className="text-blue-400">✓ Objection Handled</span>
                        <span className="text-emerald-400">✓ Demo Booked for Thursday</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================================================================
                    STAGE 5: FOLLOW UP Automated Sequence Telemetry
                    ========================================================================= */}
                {activeStage.visualizationType === 'followup' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span>FLOW BUILDER ORCHESTRATOR</span>
                        <span className="text-amber-400 font-bold">Autonomous</span>
                      </div>
                      <p className="text-xs text-white">Condition: If Email Opened &gt; 2 times in 24h</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Next Action Triggered</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                          Dispatched
                        </span>
                      </div>
                      <div className="pt-1 flex items-center gap-2 text-[10px] font-sans text-slate-400 border-t border-slate-800/80">
                        <span className="text-blue-400">✓ LinkedIn Profile View</span>
                        <span className="text-emerald-400">✓ Auto-Call Queued</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================================================================
                    STAGE 6: CLOSE Unified CRM Telemetry
                    ========================================================================= */}
                {activeStage.visualizationType === 'close' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                        <span>DEALS CRM & ATTRIBUTION</span>
                        <span className="text-emerald-400 font-bold">0ms Webhooks</span>
                      </div>
                      <p className="text-xs text-white">Deal: Acme Corp Enterprise • $127,000 ARR</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Stage: Closed Won</span>
                        <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                          100% Win
                        </span>
                      </div>
                      <div className="pt-1 flex items-center gap-2 text-[10px] font-sans text-slate-400 border-t border-slate-800/80">
                        <span className="text-emerald-400">✓ 1 Immutable DB</span>
                        <span className="text-emerald-400">✓ Multi-Touch Attribution</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </Card3DTilt>
          </div>

        </div>
      </div>

    </section>
  );
};
