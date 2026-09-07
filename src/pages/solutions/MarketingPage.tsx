import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Search, 
  Database, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Building2, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  Zap, 
  Check, 
  Bot, 
  Target, 
  DollarSign, 
  Clock, 
  Send, 
  X, 
  UserCheck, 
  Award, 
  MoveRight, 
  ExternalLink,
  Users,
  Briefcase,
  PieChart,
  Eye,
  Radio,
  Activity,
  Flame
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface IntentProspect {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  intentSignal: string;
  engagementScore: number;
  email: string;
  phone: string;
  avatar: string;
  websiteVisits: string;
  recentContent: string;
  nextAction: string;
}

interface WorkflowStage {
  id: string;
  stepNum: string;
  title: string;
  shortDesc: string;
  actionText: string;
  icon: any;
}

interface ActivationStep {
  id: string;
  stepNum: string;
  title: string;
  type: string;
  desc: string;
  icon: any;
}

interface FaqItem {
  question: string;
  answer: string;
}

const SAMPLE_INTENT_PROSPECTS: IntentProspect[] = [
  {
    id: 'ip1',
    name: 'Rachel Sterling',
    role: 'Director of Demand Generation',
    company: 'CloudScale AI',
    industry: 'B2B SaaS / Infrastructure',
    intentSignal: 'Visited Enterprise Pricing page 3x in 24h • Read "Tool Consolidation" Whitepaper',
    engagementScore: 98,
    email: 'rachel.sterling@cloudscale.ai',
    phone: '+1 (415) 892-3341',
    avatar: 'RS',
    websiteVisits: '6 Pageviews • 4m 12s on Pricing & Integrations',
    recentContent: 'Posted on LinkedIn about eliminating disconnected sales tools',
    nextAction: 'Trigger High-Intent Pricing Trigger Cadence'
  },
  {
    id: 'ip2',
    name: 'Michael Chang',
    role: 'VP of Marketing',
    company: 'FinPulse Tech',
    industry: 'FinTech / SaaS Billing',
    intentSignal: 'Clicked Google Search Ads for "Multi-Inbox Cold Email" • Hiring 2 SDRs',
    engagementScore: 95,
    email: 'michael.chang@finpulse.io',
    phone: '+1 (512) 678-9012',
    avatar: 'MC',
    websiteVisits: '3 Pageviews • Downloaded Deliverability Benchmark Report',
    recentContent: 'Looking for modern deliverability infrastructure for outbound reps',
    nextAction: 'Auto-assign to AE & Dispatch Personalized Email'
  },
  {
    id: 'ip3',
    name: 'Emma Watson-Lee',
    role: 'Head of Growth',
    company: 'StackOps Cloud',
    industry: 'DevOps / Cloud Observability',
    intentSignal: 'Attended live product webinar • High technographic match (HubSpot + BigQuery)',
    engagementScore: 92,
    email: 'emma.w@stackops.com',
    phone: '+1 (212) 456-7890',
    avatar: 'EW',
    websiteVisits: 'Attended 35 mins of Live Demo & Q&A session',
    recentContent: 'Scaling inbound-to-outbound conversion rate this quarter',
    nextAction: 'Send Webinar Follow-Up with Custom Video Demo'
  }
];

const MARKETING_WORKFLOW: WorkflowStage[] = [
  { id: 'w1', stepNum: '01', title: 'Campaign Activity', shortDesc: 'Website traffic, ad clicks, content downloads, and webinar signups.', actionText: 'Multi-touch capture', icon: Activity },
  { id: 'w2', stepNum: '02', title: 'Intent Signal', shortDesc: 'Deanonymize visiting IP addresses and track buying interest spikes.', actionText: 'Real-time scoring', icon: Flame },
  { id: 'w3', stepNum: '03', title: 'Lead Identified', shortDesc: 'Resolve visiting company into verified decision makers in our 480M+ pool.', actionText: '480M+ directory match', icon: Search },
  { id: 'w4', stepNum: '04', title: 'contact search', shortDesc: '15-source multiAttribute retrieves validated work email and direct dials.', actionText: '99.8% inbox verification', icon: Database },
  { id: 'w5', stepNum: '05', title: 'Multi-Channel Outreach', shortDesc: 'Automated email and LinkedIn touches reference their exact intent action.', actionText: 'Context-aware cadences', icon: Mail },
  { id: 'w6', stepNum: '06', title: 'Sales Conversation', shortDesc: 'Reps step in only when warm prospects reply or book calendar demos.', actionText: 'Meeting booked on CRM', icon: PhoneCall }
];

const ACTIVATION_STEPS: ActivationStep[] = [
  { id: 'a1', stepNum: '01', title: 'High Intent Trigger', type: 'Signal Detection', desc: 'Account visits high-intent URL (e.g. /pricing) or engages with outbound webinar.', icon: Flame },
  { id: 'a2', stepNum: '02', title: 'contact search', type: 'Data Verification', desc: 'Retrieves verified decision-maker emails, phone numbers, and LinkedIn profiles in 15 seconds.', icon: Database },
  { id: 'a3', stepNum: '03', title: 'Auto-Assign to Rep', type: 'Lead Routing', desc: 'Scores lead intent and routes account round-robin to the dedicated Account Executive.', icon: UserCheck },
  { id: 'a4', stepNum: '04', title: 'Cold Email #1 Dispatched', type: 'Omnichannel Outreach', desc: 'Dispatches contextual email referencing their exact intent trigger from rotating inboxes.', icon: Mail },
  { id: 'a5', stepNum: '05', title: 'LinkedIn Social Touch', type: 'Social Sequence', desc: 'Safe cloud proxy views profile and sends tailored connection invite referencing email.', icon: Linkedin },
  { id: 'a6', stepNum: '06', title: 'Deals CRM Sync', type: 'Closed-Loop Revenue', desc: 'Logs complete timeline on PostgreSQL with multi-touch marketing attribution.', icon: Building2 }
];

const MARKETING_FAQS: FaqItem[] = [
  {
    question: 'How does Outtricks capture and deanonymize website intent signals?',
    answer: 'Outtricks uses reverse-IP intelligence and first-party cookie tracking to deanonymize B2B website visitors. It identifies the company name, industry, pages viewed, and session duration, then instantly surfaces verified decision-makers matching your ICP from our 480M+ directory.'
  },
  {
    question: 'How does automated activation work when an account shows intent?',
    answer: 'You can set automated trigger rules (e.g., "If an ICP account visits /pricing 2+ times in 24 hours → multiAttribute verify VP of Marketing → Dispatch personalized sequence referencing pricing within 10 minutes").'
  },
  {
    question: 'How does Outtricks connect marketing campaigns to sales outbound?',
    answer: 'Unlike fragmented setups where marketing leads sit in HubSpot for days before SDRs export a CSV, Outtricks operates on a single PostgreSQL core. Marketing intent signals instantly trigger multi-channel email, LinkedIn, and Voice AI outreach with zero sync delay.'
  },
  {
    question: 'Can we track closed-won revenue back to initial marketing campaigns?',
    answer: 'Yes! Outtricks includes closed-loop revenue attribution. You can see exactly which marketing campaign, ad click, or intent signal initiated the sequence that led to a closed-won deal in Deals CRM.'
  },
  {
    question: 'How does AI personalize outreach based on marketing intent?',
    answer: 'Outtricks AI incorporates real intent metadata—such as the specific whitepaper downloaded, webinar attended, or pricing page viewed—into the email first line, ensuring outreach feels timely and relevant rather than cold and generic.'
  },
  {
    question: 'Does Outtricks replace HubSpot or integrate with it?',
    answer: 'Outtricks can completely replace fragmented tools (visitor deanonymizers, lead databases, sequencers) while providing bidirectional real-time sync with existing HubSpot and Salesforce instances.'
  },
  {
    question: 'What is the typical conversion lift when using intent-driven activation?',
    answer: 'Outtricks customers see a 68% lower customer acquisition cost (CAC) and a 3.8x increase in meeting booking rates compared to cold outbound because outreach reaches buyers while their intent is active.'
  }
];

export const MarketingPage: React.FC = () => {
  // Selected Intent Prospect State
  const [selectedProspect, setSelectedProspect] = useState<IntentProspect | null>(null);

  // Workflow State & Animation
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState<number>(0);
  const [isWorkflowPlaying, setIsWorkflowPlaying] = useState<boolean>(true);

  // Activation Step State
  const [activeActivationIdx, setActiveActivationIdx] = useState<number>(0);

  // AI Message Simulator State
  const [aiCompany, setAiCompany] = useState('CloudScale AI');
  const [aiRole, setAiRole] = useState('Director of Demand Generation');
  const [aiIntentContext, setAiIntentContext] = useState('Visited Enterprise Pricing 3x • Viewed Tool Consolidation Whitepaper');
  const [generatedPitch, setGeneratedPitch] = useState(`Hi Rachel,

Noticed CloudScale AI has been exploring our enterprise pricing and tool consolidation architecture recently.

Most Demand Gen leaders struggle when marketing intent leads sit in silos before SDRs manually export CSVs into separate sequencers.

Outtricks connects intent signals directly to 24 rotating inboxes and native CRM on 1 PostgreSQL database—activating warm accounts within 5 minutes.

Open to a brief 10-minute walkthrough on how we turn pricing page intent into qualified pipeline?

Best,
Enterprise Growth Lead`);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // FAQ State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance Workflow
  useEffect(() => {
    if (!isWorkflowPlaying) return;

    const timer = setInterval(() => {
      setActiveWorkflowIdx((prev) => (prev + 1) % MARKETING_WORKFLOW.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isWorkflowPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRegeneratePitch = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setGeneratedPitch(`Hey Rachel,

Saw your recent post on eliminating disconnected outbound tool sprawl, and noticed your team checked out our enterprise pricing.

When marketing intent triggers instant multi-channel cadences (Email + LinkedIn), meeting conversion jumps by 3.8x.

Would love to send over our 2-minute interactive demo tailored for CloudScale AI's demand gen stack if you're open to it?`);
    }, 750);
  };

  const activeWorkflow = MARKETING_WORKFLOW[activeWorkflowIdx];
  const ActiveWorkflowIcon = activeWorkflow.icon;
  const activeActivation = ACTIVATION_STEPS[activeActivationIdx];
  const ActiveActivationIcon = activeActivation.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Intent-Driven Outbound Platform for Marketing Teams | Outtricks"
        description="Convert intent signals and ABM account lists into qualified sales pipeline with personalized multi-touch campaigns."
        canonical="https://outtricks.com/solutions/marketing"
        keywords={["ABM outbound software","marketing intent outreach","demand generation platform","B2B campaign orchestration"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"Marketing Teams","url":"/solutions/marketing"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (MARKETING TEAMS)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            MARKETING TEAMS
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Turn Marketing Signals<br className="hidden sm:inline" /> Into Revenue Conversations
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Connect campaigns, prospect data, intent signals, outreach, and sales workflows in one unified revenue platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Activate Your Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Top Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">EFFICIENCY LIFT</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">68% Lower CAC</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">INTENT CAPTURE</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">Deanonymized IP Signals</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-emerald-600 font-bold uppercase">ATTRIBUTION</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">Closed-Loop Revenue Tracking</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: MARKETING TO REVENUE (Animated 6-Stage Progression)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              END-TO-END REVENUE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From Marketing Activity to Sales Action
            </h2>
          </div>

          <button
            onClick={() => setIsWorkflowPlaying(!isWorkflowPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isWorkflowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isWorkflowPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>
        </div>

        {/* 6 Horizontal Workflow Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MARKETING_WORKFLOW.map((stage, idx) => {
            const StepIcon = stage.icon;
            const isSelected = activeWorkflowIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveWorkflowIdx(idx);
                  setIsWorkflowPlaying(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {stage.stepNum}
                  </span>
                  <StepIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{stage.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ActiveWorkflowIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  REVENUE STAGE {activeWorkflow.stepNum}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                  {activeWorkflow.title}: {activeWorkflow.shortDesc}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-bold self-start sm:self-center">
              ✓ {activeWorkflow.actionText}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            When marketing engagement occurs, Outtricks bypasses manual lead-routing queues and immediately triggers coordinated multi-channel touches while buyer interest is at its absolute peak.
          </p>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: SIGNAL DISCOVERY (Prospect Intelligence & Drawer)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DEANONYMIZED INTENT INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Find the People Behind the Signal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            See which companies are browsing your pricing and documentation. Match anonymous traffic to verified decision-makers. Click any row to inspect.
          </p>
        </div>

        {/* Signal Table */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
            <span className="text-xs font-sans font-bold text-slate-400 uppercase">
              LIVE DEANONYMIZED INTENT STREAM
            </span>
            <span className="text-xs font-sans font-bold text-emerald-600">● 100% Real-Time Reverse-IP Match</span>
          </div>

          <div className="space-y-3">
            {SAMPLE_INTENT_PROSPECTS.map((prospect) => (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 hover:border-blue-500/80 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {prospect.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prospect.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-sans font-bold">
                        {prospect.engagementScore}/100 Intent Score
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {prospect.role} @ <strong className="text-slate-900 dark:text-white">{prospect.company}</strong> ({prospect.industry})
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] font-sans text-blue-600 dark:text-blue-400 pt-0.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{prospect.intentSignal}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button className="px-4 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 text-xs font-bold font-sans group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-xs">
                    Inspect Intent Lead ›
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Prospect Drawer Modal */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {selectedProspect.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {selectedProspect.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedProspect.role} • <strong className="text-slate-700 dark:text-slate-300">{selectedProspect.company}</strong>
                  </p>
                </div>
              </div>

              <button onClick={() => setSelectedProspect(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Verified Email:</span>
                <strong className="text-blue-600 dark:text-blue-400 font-bold">{selectedProspect.email}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Direct Phone:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedProspect.phone}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Session Telemetry:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {selectedProspect.websiteVisits}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Automated Sales Action:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {selectedProspect.nextAction}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setSelectedProspect(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Trigger Intent Cadence</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedProspect(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: AUTOMATIC ACTIVATION (6-Step Sequence)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            INSTANT LEAD ACTIVATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Activate Your Best Leads Automatically
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Eliminate lead decay by routing high-intent buyers into context-aware sales sequences within seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ACTIVATION_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isSelected = activeActivationIdx === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveActivationIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {step.stepNum}
                  </span>
                  <StepIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{step.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Step Detail Card */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveActivationIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  ACTIVATION STAGE {activeActivation.stepNum} • {activeActivation.type}
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {activeActivation.title}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              ✓ Real-Time PostgreSQL Sync
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeActivation.desc}
          </p>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: PERSONALIZATION (Intent-Aware AI Message Preview)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ABM COPY PERSONALIZATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Personalize Outreach With Real Context
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Combine website session data, whitepaper downloads, and tech stack signals into high-converting outbound copy.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A] text-xs font-sans">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">ACCOUNT & ROLE:</span>
              <strong className="text-slate-900 dark:text-white font-bold truncate block">{aiCompany} • {aiRole}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">DETECTED INTENT SIGNAL:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold truncate block">{aiIntentContext}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">DYNAMIC CADENCE:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold block">Multi-Inbox + LinkedIn</strong>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                AI INTENT-ACTIVATED PITCH
              </span>
              <button
                onClick={handleRegeneratePitch}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isGeneratingAi ? 'Regenerating...' : 'Regenerate ABM Pitch'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]">
              <textarea
                rows={7}
                value={generatedPitch}
                onChange={(e) => setGeneratedPitch(e.target.value)}
                className="w-full bg-transparent text-xs font-sans text-slate-800 dark:text-slate-200 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-1">
            <span>Dynamic Variables: {'{{first_name}}'}, {'{{page_viewed}}'}, {'{{whitepaper_title}}'}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">● 3.8x Higher Meeting Conversion</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 6: MARKETING + SALES (Funnel Progression)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ALIGNMENT & HANDOFF
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Connect Marketing and Sales
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Bridge the gap between top-of-funnel demand generation and bottom-of-funnel closed-won ARR.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="space-y-3">
            {[
              { stage: '01. Marketing Lead (Intent Captured)', count: '1,420 Accounts', pct: 100, color: 'bg-blue-600', note: 'Reverse-IP & Webhook capture' },
              { stage: '02. Qualified ICP Lead (Verified)', count: '680 Decision Makers', pct: 75, color: 'bg-blue-500', note: '15-source multiAttribute validation' },
              { stage: '03. Active Sales Conversation', count: '242 Warm Threads', pct: 45, color: 'bg-indigo-600', note: 'Multi-inbox & LinkedIn touches' },
              { stage: '04. Pipeline Opportunity', count: '78 Qualified Demos', pct: 28, color: 'bg-blue-600', note: 'Deals CRM pipeline sync' },
              { stage: '05. Closed-Won Revenue', count: '$184,000 ARR', pct: 18, color: 'bg-emerald-500', note: 'Full attribution logged ✓' }
            ].map((f, fIdx) => (
              <div key={fIdx} className="space-y-1 text-xs font-sans">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span className="font-bold">{f.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] hidden sm:inline">{f.note} •</span>
                    <strong className="text-slate-900 dark:text-white">{f.count}</strong>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                  <div style={{ width: `${f.pct}%` }} className={`h-full rounded-full ${f.color} transition-all duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: REVENUE ANALYTICS (Metrics & Attribution)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CLOSED-LOOP ROI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Measure Revenue, Not Just Engagement
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-slate-400 block text-[10px]">QUALIFIED LEADS</span>
            <strong className="text-slate-900 dark:text-white text-lg font-bold">680</strong>
            <span className="text-[10px] text-emerald-600 block">88% ICP Fit</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">MEETINGS BOOKED</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">52 Demos</strong>
            <span className="text-[10px] text-slate-500 block">3.8x Lift</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">OPPORTUNITIES</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">34 Deals</strong>
            <span className="text-[10px] text-slate-500 block">Kanban Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-indigo-600 dark:text-indigo-400 block text-[10px]">PIPELINE VALUE</span>
            <strong className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">$520,000</strong>
            <span className="text-[10px] text-slate-500 block">Generated ARR</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs space-y-1">
            <span className="text-emerald-600 block text-[10px]">CLOSED-WON ARR</span>
            <strong className="text-emerald-700 dark:text-emerald-300 text-lg font-bold">$184,000</strong>
            <span className="text-[10px] text-emerald-600 block font-bold">+68% Lower CAC</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA (Marketing Focus)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED MARKETING-TO-SALES ENGINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Make Every Marketing Signal Actionable
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Connect marketing demand generation directly with autonomous outbound sales execution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Activate Your Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        <p className="text-[11px] font-sans text-slate-400 relative z-10">
          7-Day Free Trial • Real-Time Intent Capture • Built for Marketing Teams
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            MARKETING QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {MARKETING_FAQS.map((faq, fIdx) => {
            const isOpen = openFaqIndices.includes(fIdx);
            return (
              <div
                key={fIdx}
                className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#2A2A2A]/80 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};
