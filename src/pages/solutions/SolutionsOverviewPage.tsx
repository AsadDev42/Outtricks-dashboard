import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Rocket, 
  Briefcase, 
  UserCheck, 
  TrendingUp, 
  LineChart, 
  Search, 
  Database, 
  Mail, 
  PhoneCall, 
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
  SlidersHorizontal 
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface SolutionCard {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  icon: any;
  highlightStat: string;
  keyPoints: string[];
}

interface WorkflowStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: any;
  engineStat: string;
  keyCapabilities: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const SOLUTION_CARDS: SolutionCard[] = [
  {
    id: 'sales-teams',
    title: 'B2B Sales Teams',
    description: 'Build and scale a predictable outbound pipeline.',
    ctaText: 'Explore Sales Teams',
    href: '/solutions/sales-teams',
    icon: Users,
    highlightStat: '4.8x Pipeline Velocity',
    keyPoints: [
      'Multi-inbox rotating cold email cadences',
      'Automated LinkedIn connection & touch sequences',
      'Sub-400ms WebRTC Voice SDR qualification'
    ]
  },
  {
    id: 'founders',
    title: 'Founders & Startups',
    description: 'Build your first repeatable revenue engine.',
    ctaText: 'Explore Startups',
    href: '/solutions/founders',
    icon: Rocket,
    highlightStat: '$127K+ Seed Pipeline',
    keyPoints: [
      'Launch outbound campaigns in under 15 minutes',
      '480M+ verified B2B contacts included natively',
      'Zero complex webhook integration or sync drift'
    ]
  },
  {
    id: 'agencies',
    title: 'Lead Gen Agencies',
    description: 'Scale client campaigns without tool sprawl.',
    ctaText: 'Explore Agencies',
    href: '/solutions/agencies',
    icon: Briefcase,
    highlightStat: '15+ Clients per Operator',
    keyPoints: [
      'White-label portal with custom client branding',
      'Pooled wallet and granular per-client billing',
      'Dedicated workspace isolation and reporting'
    ]
  },
  {
    id: 'recruiters',
    title: 'Recruiters & Staffing',
    description: 'Find talent and clients faster.',
    ctaText: 'Explore Recruiting',
    href: '/solutions/recruiters',
    icon: UserCheck,
    highlightStat: '38.4% Candidate Response',
    keyPoints: [
      'Source passive talent by GitHub, skills & tenure',
      'Multi-channel candidate engagement cadences',
      'Instant interview scheduling and CRM sync'
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Teams',
    description: 'Turn intent into qualified pipeline.',
    ctaText: 'Explore Marketing',
    href: '/solutions/marketing',
    icon: TrendingUp,
    highlightStat: '68% Lower CAC',
    keyPoints: [
      'Deanonymize website intent into verified accounts',
      'Trigger instant outreach when intent score spikes',
      'Closed-loop revenue and pipeline attribution'
    ]
  },
  {
    id: 'revops',
    title: 'RevOps Leaders',
    description: 'Unify your revenue stack and workflows.',
    ctaText: 'Explore RevOps',
    href: '/solutions/revops',
    icon: LineChart,
    highlightStat: '0 Sync Drift & 1 Schema',
    keyPoints: [
      'One PostgreSQL database schema across all channels',
      'Eliminate $1,200+/mo in redundant SaaS licenses',
      'Real-time deliverability and domain reputation guard'
    ]
  }
];

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'find',
    stepNumber: '01',
    title: 'Find',
    shortDesc: 'Discover verified B2B prospects matching your ICP.',
    detailedDesc: 'Access 480M+ verified business contacts filtered across 8 granular dimensions including technographics, company headcount, revenue, and active hiring intent.',
    icon: Search,
    engineStat: '480M+ B2B Pool',
    keyCapabilities: ['8-Dimension Search Filter', 'Real-Time Intent Signals', 'Suppression List Matching']
  },
  {
    id: 'Verify',
    stepNumber: '02',
    title: 'Verify',
    shortDesc: 'Complete missing contact and company information.',
    detailedDesc: 'Run automated contact search across 15 primary data providers to secure verified work emails, direct mobile phone numbers, and LinkedIn social URLs.',
    icon: Database,
    engineStat: '15 multiAttribute Providers',
    keyCapabilities: ['SMTP Handshake Check', 'Catch-All Sandbox Verification', 'Direct Cell Phone Validation']
  },
  {
    id: 'reach',
    stepNumber: '03',
    title: 'Reach',
    shortDesc: 'Connect through email, LinkedIn, and AI voice.',
    detailedDesc: 'Distribute personalized outbound across 24 rotating inboxes with automated warmup, cloud-proxy LinkedIn touches, and dynamic variable personalization.',
    icon: Mail,
    engineStat: '99.4% Inbox Placement',
    keyCapabilities: ['Unlimited Inboxes Rotation', 'Safe LinkedIn Residential Cloud IPs', 'AI Spintax Generator']
  },
  {
    id: 'qualify',
    stepNumber: '04',
    title: 'Qualify',
    shortDesc: 'Identify intent and prioritize the best opportunities.',
    detailedDesc: 'Deploy conversational Sub-400ms WebRTC Voice AI SDR agents to conduct low-latency phone qualification, answer technical questions, and assess buying readiness.',
    icon: PhoneCall,
    engineStat: '<400ms Voice Latency',
    keyCapabilities: ['WebRTC Audio Stream', 'Real-Time Interruption Handling', 'Live Objection Resolution']
  },
  {
    id: 'manage',
    stepNumber: '05',
    title: 'Manage',
    shortDesc: 'Track conversations, activities, and deals.',
    detailedDesc: 'Organize deal stages and contact timelines on a native 5-stage Kanban CRM powered directly by PostgreSQL with 0ms sync lag and zero webhook failures.',
    icon: Building2,
    engineStat: '0ms PostgreSQL Lag',
    keyCapabilities: ['Unified Deal Timeline', 'Automated Stage Progression', 'Bidirectional CRM Sync']
  },
  {
    id: 'close',
    stepNumber: '06',
    title: 'Close',
    shortDesc: 'Turn qualified opportunities into measurable revenue.',
    detailedDesc: 'Lock in demo appointments directly to Google & Outlook calendars, generate executive proposals, and measure closed-won revenue attribution.',
    icon: DollarSign,
    engineStat: '+42.8% Conversion Lift',
    keyCapabilities: ['Instant Calendar Booking', 'Contract ARR Tracking', 'Closed-Loop Revenue Attribution']
  }
];

const WHY_OUTTRICKS_BENEFITS = [
  {
    title: 'Unified prospect data',
    description: 'Direct access to 480M+ verified B2B leads with instant contact search.',
    icon: Database,
    color: 'blue'
  },
  {
    title: 'Multi-channel outreach',
    description: 'Coordinate high-deliverability Cold Email, LinkedIn, and Voice AI in unified sequences.',
    icon: Mail,
    color: 'blue'
  },
  {
    title: 'AI-powered conversations',
    description: 'Sub-400ms WebRTC Voice SDR agents that qualify prospects and book meetings in real time.',
    icon: PhoneCall,
    color: 'emerald'
  },
  {
    title: 'CRM visibility',
    description: 'Live pipeline tracking and deal progress unified on a single PostgreSQL core.',
    icon: Building2,
    color: 'blue'
  },
  {
    title: 'Workflow automation',
    description: 'Trigger smart multi-step follow-ups and branching logic based on prospect behavior.',
    icon: Workflow,
    color: 'amber'
  },
  {
    title: 'Revenue analytics',
    description: 'Full-funnel attribution, email deliverability, and conversion performance reporting.',
    icon: BarChart3,
    color: 'blue'
  }
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What teams is Outtricks built for?',
    answer: 'Outtricks is built for modern revenue teams including B2B Sales Teams, Founders & Startups, Lead Gen Agencies, Recruiters & Staffing Firms, Marketing Teams, and RevOps Leaders. Each role gets dedicated tools optimized for their specific pipeline motions.'
  },
  {
    question: 'Can different teams use the same platform?',
    answer: 'Yes. Because Outtricks operates on a unified PostgreSQL database core, sales reps, founders, recruiters, and marketing leads can all collaborate with customized role-based permissions, shared suppression lists, and isolated workspaces.'
  },
  {
    question: 'Can I connect prospecting with outreach?',
    answer: 'Absolutely. Unlike fragmented stacks where you must export CSV files from a lead database and import them into an email sequencer, Outtricks lets you push verified leads directly into multi-inbox and multi-channel campaigns in 1 click with 0 sync delay.'
  },
  {
    question: 'Does Outtricks include CRM functionality?',
    answer: 'Yes. Outtricks includes Deals CRM—a native 5-stage sales pipeline that automatically captures email opens, replies, LinkedIn connections, and Voice AI call recordings without manual data entry.'
  },
  {
    question: 'Can I automate revenue workflows?',
    answer: 'Yes. With Flow Builder, you can visually create multi-channel cadences with smart branching logic (for example: Send Cold Email #1 → If No Reply in 48h → Send LinkedIn Touch → If Positive Reply → Trigger Voice AI Qualification Call).'
  },
  {
    question: 'Can agencies manage multiple clients?',
    answer: 'Yes. Outtricks provides dedicated multi-tenant agency management with pooled credit ledgers, custom white-label client portals, and isolated workspace data.'
  },
  {
    question: 'Can Outtricks replace multiple sales tools?',
    answer: 'Yes. Outtricks replaces separate subscriptions for lead databases (Apollo/ZoomInfo), Lead Search (Clay), cold email sequencers (Smartlead/Instantly), LinkedIn automation, voice dialers, and pipeline CRMs into a single unified platform.'
  }
];

export const SolutionsOverviewPage: React.FC = () => {
  // Interactive Workflow State
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  const [isWorkflowPlaying, setIsWorkflowPlaying] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Workflow auto-advance loop
  useEffect(() => {
    if (!isWorkflowPlaying) return;

    const timer = setInterval(() => {
      setActiveWorkflowIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isWorkflowPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const activeStage = WORKFLOW_STAGES[activeWorkflowIndex];
  const ActiveStageIcon = activeStage.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outbound Solutions by Role & Revenue Model | Outtricks"
        description="Discover how Outtricks accelerates pipeline for B2B sales teams, founders, agencies, recruiters, marketing, and RevOps."
        canonical="https://outtricks.com/solutions"
        keywords={["sales solutions","outbound strategies by industry","revenue operations software","pipeline generation"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Centered, Spacious, Balanced 2-Line Headline)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            BUILT FOR EVERY REVENUE TEAM
          </span>
        </div>

        {/* Balanced Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Revenue Infrastructure<br className="hidden sm:inline" /> Built for How You Sell
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          One unified platform for finding prospects, automating outreach, managing conversations, and turning pipeline into revenue.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href="#solutions-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: TEAM INTRODUCTION & REVENUE FLOW STRIP
          ========================================================================= */}
      <section className="space-y-8 max-w-5xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            One Platform. Different Revenue Motions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Whether you're scaling outbound, building your first sales engine, running campaigns for clients, or managing a complex RevOps stack, Outtricks gives your team one connected place to work.
          </p>
        </div>

        {/* Visual Workflow Representation with Animated Pulse Connections */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
            
            <div className="w-full sm:w-auto p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
                <Search className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">STEP 01</span>
                <strong className="text-slate-900 dark:text-white font-bold block truncate">Lead Finder</strong>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 hidden sm:block animate-pulse" />

            <div className="w-full sm:w-auto p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">STEP 02</span>
                <strong className="text-slate-900 dark:text-white font-bold block truncate">Outreach</strong>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 hidden sm:block animate-pulse" />

            <div className="w-full sm:w-auto p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">STEP 03</span>
                <strong className="text-slate-900 dark:text-white font-bold block truncate">AI Conversations</strong>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 hidden sm:block animate-pulse" />

            <div className="w-full sm:w-auto p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">STEP 04</span>
                <strong className="text-slate-900 dark:text-white font-bold block truncate">Deals CRM</strong>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 hidden sm:block animate-pulse" />

            <div className="w-full sm:w-auto p-3 rounded-2xl bg-blue-50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Workflow className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">STEP 05</span>
                <strong className="text-blue-950 dark:text-blue-100 font-bold block truncate">Automation</strong>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: SOLUTION GRID (6 Clickable Cards)
          ========================================================================= */}
      <section id="solutions-grid" className="space-y-10 scroll-mt-24">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Built Around Your Revenue Team
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            Choose the workflow that matches how your team generates revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.href}
                className="group block h-full focus:outline-none"
              >
                <Card3DTilt maxTilt={4} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 group-hover:border-blue-500/80 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-4">
                      
                      {/* Top Card Bar */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A]">
                          {card.highlightStat}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#2A2A2A]/80 text-xs text-slate-600 dark:text-slate-300">
                        {card.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                    </div>

                    {/* Card CTA Action */}
                    <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                      <span>{card.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>

                  </div>
                </Card3DTilt>
              </Link>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: REVENUE WORKFLOW (Interactive 6-Stage Pipeline with Pause Toggle)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              END-TO-END CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From First Lead to Closed Revenue
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsWorkflowPlaying(!isWorkflowPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              {isWorkflowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isWorkflowPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
            </button>
          </div>
        </div>

        {/* 6-Stage Horizontal Interactive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isSelected = activeWorkflowIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveWorkflowIndex(idx);
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
                    {stage.stepNumber}
                  </span>
                  <StageIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{stage.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ActiveStageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                    STAGE {activeStage.stepNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-sans font-bold">
                    {activeStage.engineStat}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                  {activeStage.title}: {activeStage.shortDesc}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-center">
              <Link
                to="/platform"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/25 transition-all"
              >
                <span>Explore Live Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activeStage.detailedDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {activeStage.keyCapabilities.map((cap, capIdx) => (
              <div
                key={capIdx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 5: WHY OUTTRICKS (6 Connected Benefits)
          ========================================================================= */}
      <section className="space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Everything Your Revenue Team Needs. Connected.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            Eliminate sync delay and data silos across your entire revenue operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_OUTTRICKS_BENEFITS.map((benefit, bIdx) => {
            const BIcon = benefit.icon;
            return (
              <div
                key={bIdx}
                className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: BEFORE VS AFTER (Visual Workflow Comparison)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            WORKFLOW ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Replace Fragmented Revenue Workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Disconnected Stack (Left) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-200 dark:border-[#2A2A2A] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]/80">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Disconnected Stack
                </h3>
              </div>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900">
                6 Tools • $1,200+/mo
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {[
                'Multiple lead databases with disparate credit costs',
                'Separate email tools requiring manual CSV imports',
                'Separate LinkedIn tools with high account ban risk',
                'Separate CRM requiring webhook and Zapier maintenance',
                'Manual automation prone to duplicate outreach & sync lag',
                'Scattered reporting with zero closed-loop attribution'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outtricks Unified (Right) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800/80 space-y-5 shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-blue-950 dark:text-blue-100">
                  Outtricks
                </h3>
              </div>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                1 Unified Platform • $79/mo
              </span>
            </div>

            <ul className="space-y-3 text-xs text-blue-950 dark:text-blue-200">
              {[
                'One platform running on 1 connected PostgreSQL database',
                'Unified data with 480M+ contacts and multiAttribute searchs',
                'Connected outreach across Email, LinkedIn, and Voice AI SDR',
                'Integrated CRM capturing deals and timeline events automatically',
                'Automated workflows with 0ms delay and zero webhook drift',
                'Centralized revenue visibility from first touch to closed ARR'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <strong className="font-semibold">{item}</strong>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 7: FINAL CTA (Premium Dark Banner)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED SALES PLATFORM</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Your Revenue Team Shouldn't Need Six Tools to Run One Process.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Bring prospecting, outreach, conversations, CRM, and automation together in one revenue platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Get Started</span>
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
          Credit card required • Cancel anytime • Built for modern revenue teams
        </p>

      </section>

      {/* =========================================================================
          SECTION 8: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, fIdx) => {
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
