import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Rocket, 
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
  TrendingUp, 
  Award, 
  MoveRight, 
  ExternalLink,
  MessageSquare,
  Repeat
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface StartupProspect {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
  headcount: string;
  industry: string;
  location: string;
  techStack: string[];
  icpMatch: number;
  buyingIntent: string;
  painPoint: string;
  nextAction: string;
}

interface FounderStage {
  id: string;
  stepNum: string;
  title: string;
  shortDesc: string;
  detailedGuide: string;
  icon: any;
  metric: string;
  founderAction: string;
}

interface FounderDeal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: 'prospect' | 'contacted' | 'meeting' | 'proposal' | 'won';
  avatar: string;
  statusBadge: string;
  lastActivity: string;
  nextAction: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const SAMPLE_STARTUP_PROSPECTS: StartupProspect[] = [
  {
    id: 'sp1',
    name: 'Alex Rivera',
    role: 'Co-Founder & CTO',
    company: 'HyperScale AI',
    email: 'alex@hyperscale.ai',
    phone: '+1 (415) 672-8819',
    avatar: 'AR',
    headcount: '15–30',
    industry: 'Developer Tools / AI Infra',
    location: 'San Francisco, CA',
    techStack: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL'],
    icpMatch: 99,
    buyingIntent: 'Recently closed $2.5M Seed • Hiring first 3 engineers',
    painPoint: 'Needs reliable outbound infrastructure without engineering webhook glue',
    nextAction: 'Dispatch Founder-to-Founder Personalized Sequence'
  },
  {
    id: 'sp2',
    name: 'Jessica Tran',
    role: 'Founder & CEO',
    company: 'FinPulse Analytics',
    email: 'jessica@finpulse.io',
    phone: '+1 (512) 890-3412',
    avatar: 'JT',
    headcount: '10–25',
    industry: 'FinTech / SaaS Billing',
    location: 'Austin, TX',
    techStack: ['Segment', 'HubSpot', 'BigQuery'],
    icpMatch: 97,
    buyingIntent: 'Looking for initial 20 design partners for enterprise billing API',
    painPoint: 'Founder has zero time for manual list building and CSV imports',
    nextAction: 'Queued for Multi-Inbox Cold Email #1'
  },
  {
    id: 'sp3',
    name: 'Liam Vance',
    role: 'Head of Growth',
    company: 'StackOps Cloud',
    email: 'liam@stackops.com',
    phone: '+1 (212) 492-1088',
    avatar: 'LV',
    headcount: '20–50',
    industry: 'DevOps / Observability',
    location: 'New York, NY',
    techStack: ['AWS', 'Datadog', 'Kubernetes'],
    icpMatch: 95,
    buyingIntent: 'Scaling outbound pipeline from $10k to $50k MRR this quarter',
    painPoint: 'Deliverability issues across Google Workspace mailboxes',
    nextAction: 'Send 24-inbox warmup guide'
  }
];

const FOUNDER_STAGES: FounderStage[] = [
  {
    id: 'find',
    stepNum: '01',
    title: 'Find Leads',
    shortDesc: 'Identify 100+ ideal early customers in under 5 minutes.',
    detailedGuide: 'Filter 480M+ verified profiles by exact startup tech stack, hiring signals, and funding stages to find buyers with budget and intent.',
    icon: Search,
    metric: '480M+ Verified Contacts',
    founderAction: 'Build targeted ICP list in 2 clicks'
  },
  {
    id: 'conversations',
    stepNum: '02',
    title: 'Start Conversations',
    shortDesc: 'Launch personalized multi-inbox cold email and LinkedIn sequences.',
    detailedGuide: 'Distribute outreach across 24 warm inboxes with automated ramp-up curves and AI-personalized first lines that reference their recent milestones.',
    icon: Mail,
    metric: '99.4% Inbox Placement',
    founderAction: 'Auto-pilot outreach while building product'
  },
  {
    id: 'meetings',
    stepNum: '03',
    title: 'Book Meetings',
    shortDesc: 'Direct qualification and calendar links synced automatically.',
    detailedGuide: 'Deploy sub-400ms Voice AI SDR agents to qualify inbound interest or handle cold follow-ups, locking meetings into your Google Calendar.',
    icon: PhoneCall,
    metric: '38+ Demos Booked / mo',
    founderAction: 'Wake up to qualified demos'
  },
  {
    id: 'deals',
    stepNum: '04',
    title: 'Track Deals',
    shortDesc: 'Manage pipeline on a clean 5-stage Kanban CRM with 0ms sync lag.',
    detailedGuide: 'Every conversation, email open, and call transcript writes directly to the deal record without manual data entry or Zapier maintenance.',
    icon: Building2,
    metric: '0ms PostgreSQL Core',
    founderAction: 'Zero CRM admin overhead'
  },
  {
    id: 'repeat',
    stepNum: '05',
    title: 'Repeat & Scale',
    shortDesc: 'Automate proven messaging and hand off playbooks to your first hire.',
    detailedGuide: 'Once a cadence hits 15%+ positive reply rates, turn on continuous autonomous lead ingestion to create a permanent revenue engine.',
    icon: Repeat,
    metric: '10x Stack Leverage',
    founderAction: 'Seamlessly scale to your first SDR'
  }
];

const FOUNDER_DEALS: FounderDeal[] = [
  {
    id: 'fd1',
    name: 'Alex Rivera',
    company: 'HyperScale AI',
    value: 12000,
    stage: 'meeting',
    avatar: 'AR',
    statusBadge: 'Demo Booked',
    lastActivity: 'Calendar slot locked for Thursday 2:00 PM',
    nextAction: 'Founder Architecture Demo Call'
  },
  {
    id: 'fd2',
    name: 'Jessica Tran',
    company: 'FinPulse Analytics',
    value: 24000,
    stage: 'proposal',
    avatar: 'JT',
    statusBadge: 'MSA Sent',
    lastActivity: 'Reviewed annual enterprise pilot agreement',
    nextAction: 'Follow up on security review checklist'
  },
  {
    id: 'fd3',
    name: 'Liam Vance',
    company: 'StackOps Cloud',
    value: 36000,
    stage: 'won',
    avatar: 'LV',
    statusBadge: 'Closed Won ✓',
    lastActivity: 'Annual Stripe subscription activated',
    nextAction: 'Onboarding & Slack Connect setup'
  },
  {
    id: 'fd4',
    name: 'Devin Cole',
    company: 'LogixFlow Corp',
    value: 18000,
    stage: 'contacted',
    avatar: 'DC',
    statusBadge: 'Warm Thread',
    lastActivity: 'Replied to founder-to-founder sequence',
    nextAction: 'Send 15-minute intro calendar link'
  }
];

const FOUNDER_FAQS: FaqItem[] = [
  {
    question: 'Why is Outtricks ideal for early-stage founders & solo operators?',
    answer: 'As a founder, you cannot afford to spend 20 hours a week jumping between Apollo, Clay, Smartlead, Expandi, and HubSpot. Outtricks combines lead discovery, contact search, multi-inbox cold email, safe LinkedIn automation, Voice AI, and CRM into one platform for $79/mo.'
  },
  {
    question: 'How quickly can a startup launch its first outbound campaign?',
    answer: 'Most founders launch in under 15 minutes. You connect your sending domains, select your target ICP from our 480M+ database, and let our AI personalize your initial sequence.'
  },
  {
    question: 'Do I need technical skills or webhook knowledge?',
    answer: 'No. Outtricks operates on a unified PostgreSQL core. That means data moves natively between lead discovery, outreach, call recordings, and deal pipelines without writing Zapier zaps or debugging webhooks.'
  },
  {
    question: 'How does AI personalization work for founders?',
    answer: 'Outtricks analyzes your target account\'s website, recent LinkedIn posts, job openings, and tech stack to generate authentic, context-aware first lines that sound like a thoughtful message directly from the founder.'
  },
  {
    question: 'What happens when I hire my first sales rep?',
    answer: 'You don\'t have to rebuild your sales tech stack. You simply invite your new rep to your Outtricks workspace. All historical playbooks, verified contacts, and CRM deals are already organized and ready for them to take over.'
  },
  {
    question: 'Does Outtricks provide a free trial?',
    answer: 'Yes! Outtricks includes a 7-Day Free Trial with instant sandbox access to all 6 engines so you can verify deliverability and book your first demo risk-free.'
  },
  {
    question: 'How does Outtricks compare in cost to building a multi-tool stack?',
    answer: 'A traditional startup stack costs $1,200+/month across 5-6 subscriptions (Apollo $99 + Clay $240 + Smartlead $94 + Expandi $99 + HubSpot $500). Outtricks replaces the entire stack starting at just $79/month.'
  }
];

export const FoundersPage: React.FC = () => {
  // Selected Prospect State
  const [selectedProspect, setSelectedProspect] = useState<StartupProspect | null>(null);

  // Founder Journey State
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState<boolean>(true);

  // AI Message Generator Simulator
  const [aiTargetCompany, setAiTargetCompany] = useState('HyperScale AI');
  const [aiTargetRole, setAiTargetRole] = useState('Co-Founder & CTO');
  const [aiActivity, setAiActivity] = useState('Recently raised $2.5M Seed & hiring engineers');
  const [generatedPitch, setGeneratedPitch] = useState(`Hi Alex,

Congrats on HyperScale's recent $2.5M Seed round!

Saw you're scaling out the core engineering team. Most early-stage CTOs struggle with stitch-together outbound tools and webhook drift when trying to land their first 20 enterprise design partners.

Outtricks unifies 480M+ verified leads, 24 rotating inboxes, and native CRM on a single PostgreSQL core so you can book design partners on autopilot.

Open to a quick 10-min intro Thursday?

Best,
Founder @ Outtricks`);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // CRM Pipeline State
  const [activeDealModal, setActiveDealModal] = useState<FounderDeal | null>(null);

  // FAQ State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance Founder Journey
  useEffect(() => {
    if (!isJourneyPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % FOUNDER_STAGES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isJourneyPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRegeneratePitch = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setGeneratedPitch(`Hey Alex,

Saw HyperScale AI is scaling fast post-Seed.

When we were finding our first enterprise customers, managing CSV exports between Apollo and Smartlead ate up 15 hours a week that belonged on code.

We built Outtricks so founders can target 480M+ verified CTOs and run multi-inbox rotation with 0 maintenance.

Free for a 5-minute sync this week?`);
    }, 800);
  };

  const activeStage = FOUNDER_STAGES[activeStageIdx];
  const ActiveStageIcon = activeStage.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outbound Growth Engine for Founders & Startups | Outtricks"
        description="Launch your initial outbound engine in hours with modular pricing, 480M+ leads, and automated multi-channel sequences."
        canonical="https://outtricks.com/solutions/founders"
        keywords={["startup outbound software","founder lead generation","early stage B2B growth","outbound from scratch"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"Founders & Startups","url":"/solutions/founders"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (FOUNDERS & STARTUPS)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Rocket className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            FOUNDERS & STARTUPS
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Build Your First Revenue Engine<br className="hidden sm:inline" /> Without Building a Huge Team
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Find your first customers, automate outbound, and create a repeatable sales process from one unified platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Top Mini Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">LAUNCH VELOCITY</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">&lt; 15 Minutes to Launch</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">TEAM LEVERAGE</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0 SDR Hires Needed</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-emerald-600 font-bold uppercase">COST EFFICIENCY</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">$79/mo vs $1,200/mo Stack</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: FOUNDER JOURNEY (Animated 5-Stage Progression)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              FOUNDER-LED SALES ROADMAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Go From Founder-Led Sales to Repeatable Growth
            </h2>
          </div>

          <button
            onClick={() => setIsJourneyPlaying(!isJourneyPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isJourneyPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isJourneyPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>
        </div>

        {/* Horizontal Progression Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FOUNDER_STAGES.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageIdx(idx);
                  setIsJourneyPlaying(false);
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
                  <StageIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{stage.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ActiveStageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  FOUNDER STAGE {activeStage.stepNum}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                  {activeStage.title}: {activeStage.shortDesc}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-bold self-start sm:self-center">
              {activeStage.metric}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activeStage.detailedGuide}
          </p>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Founder Benefit: {activeStage.founderAction}</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: ICP DISCOVERY (Interactive Lead Finder for Startups)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRECISION TARGETING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Find Customers Who Actually Fit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Zero in on target accounts using 8-dimension filters including tech stack, headcount, and buying intent. Click any prospect to view full profile.
          </p>
        </div>

        {/* Filtered Prospect Table */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
            <span className="text-xs font-sans font-bold text-slate-400 uppercase">
              SAMPLE STARTUP ICP PROSPECTS (480M+ POOL)
            </span>
            <span className="text-xs font-sans font-bold text-emerald-600">● 100% Verified Dials & Emails</span>
          </div>

          <div className="space-y-2.5">
            {SAMPLE_STARTUP_PROSPECTS.map((prospect) => (
              <div
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 hover:border-blue-500/80 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {prospect.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prospect.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-sans font-bold">
                        {prospect.icpMatch}% ICP Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {prospect.role} @ <strong className="text-slate-700 dark:text-slate-300">{prospect.company}</strong> ({prospect.headcount} • {prospect.location})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-sans text-slate-400 hidden lg:inline">
                    {prospect.email}
                  </span>
                  <button className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold font-sans group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    Inspect Profile ›
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
                <span className="text-slate-400 block text-[10px]">Identified Pain Point:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {selectedProspect.painPoint}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Next Action:</span>
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
                <span>Launch Founder Cadence</span>
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
          SECTION 4: AUTOMATION (Before vs After Comparison)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FOUNDER TIME RECOVERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Automate the Work You Don't Have Time For
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Stop losing 20+ hours a week on manual prospect research, copy-paste messaging, and CRM data entry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Before Column */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-200 dark:border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]/80">
              <span className="text-xs font-sans font-bold text-rose-500 uppercase">
                BEFORE (MANUAL FOUNDER SALES)
              </span>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200">
                20+ Hours Wasted/wk
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Manual Lead Research</strong>
                  <span className="text-slate-500 text-[11px]">Spending entire weekends scraping LinkedIn and guessing email permutations.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Copy-Paste Outreach</strong>
                  <span className="text-slate-500 text-[11px]">Writing one-off cold emails from Gmail with zero inbox deliverability warmup.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Missed Follow-Ups</strong>
                  <span className="text-slate-500 text-[11px]">80% of warm prospects get dropped because you get busy writing code.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Scattered CRM</strong>
                  <span className="text-slate-500 text-[11px]">Notion notes and spreadsheets with missing contact data and sync drift.</span>
                </div>
              </div>
            </div>
          </div>

          {/* After Column */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                AFTER (OUTTRICKS AUTONOMOUS ENGINE)
              </span>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                15 Mins / Week
              </span>
            </div>

            <div className="space-y-3 text-xs text-blue-950 dark:text-blue-100">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Automated Workflows</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">Target accounts auto-ingest into sequences when they trigger hiring signals.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Personalized Messaging</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">AI drafts contextual pitches referencing their tech stack and recent funding.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Automatic Follow-Ups</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">Cadences automatically touch prospects across Email and LinkedIn until they reply.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Unified Pipeline</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">Every deal, transcript, and email response logs natively on 1 PostgreSQL database.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 5: AI PERSONALIZATION (Interactive Message Generator Simulator)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FOUNDER-TO-FOUNDER COPY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Turn Your Best Message Into a Repeatable System
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Scale your authentic founder voice without sounding like a generic automated marketing template.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A] text-xs font-sans">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">TARGET COMPANY:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{aiTargetCompany}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">DECISION MAKER ROLE:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{aiTargetRole}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">RECENT CONTEXT / PAIN POINT:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold truncate block">{aiActivity}</strong>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                AI-GENERATED FOUNDER INTRO PITCH
              </span>
              <button
                onClick={handleRegeneratePitch}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isGeneratingAi ? 'Regenerating...' : 'Regenerate AI Pitch'}</span>
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
            <span>Dynamic Variables: {'{{first_name}}'}, {'{{company}}'}, {'{{funding_round}}'}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">● High Reply Rate Template</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 6: SIMPLE CRM (Kanban Pipeline for Founders)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FOUNDER PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            See Every Opportunity in One Place
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            A simple 5-stage sales pipeline built directly into your database. Click any deal to view full conversation history.
          </p>
        </div>

        {/* 5-Stage Kanban Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { id: 'prospect', label: '1. Prospect', count: '12 Leads', color: 'text-slate-500' },
            { id: 'contacted', label: '2. Contacted', count: '8 In Sequence', color: 'text-blue-600' },
            { id: 'meeting', label: '3. Meeting', count: '4 Demos', color: 'text-blue-600' },
            { id: 'proposal', label: '4. Proposal', count: '2 In Review', color: 'text-indigo-600' },
            { id: 'won', label: '5. Won', count: '3 Won ✓', color: 'text-emerald-600' }
          ].map((col) => {
            const colDeals = FOUNDER_DEALS.filter(d => d.stage === col.id);
            return (
              <div
                key={col.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 space-y-3 min-h-[200px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-[#2A2A2A]/60 text-xs font-sans">
                  <span className={`font-bold ${col.color}`}>{col.label}</span>
                  <span className="text-[10px] text-slate-400">{col.count}</span>
                </div>

                <div className="space-y-2">
                  {colDeals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => setActiveDealModal(deal)}
                      className="p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-2xs hover:border-blue-500 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                          {deal.company}
                        </strong>
                        <span className="text-[10px] font-sans text-emerald-600 font-bold">
                          ${deal.value.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {deal.name}
                      </span>
                      <div className="p-1 rounded bg-slate-50 dark:bg-[#181818] text-[9px] font-sans text-slate-400 truncate">
                        {deal.statusBadge}
                      </div>
                    </div>
                  ))}

                  {colDeals.length === 0 && (
                    <div className="p-3 text-center text-[10px] font-sans text-slate-400 border border-dashed border-slate-200 dark:border-[#2A2A2A] rounded-xl">
                      No active deals
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Deal Modal */}
      {activeDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {activeDealModal.company}
                </h4>
                <p className="text-xs text-slate-500">Contact: {activeDealModal.name}</p>
              </div>

              <button onClick={() => setActiveDealModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Contract ARR:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">${activeDealModal.value.toLocaleString()} ARR</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Latest Activity:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {activeDealModal.lastActivity}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Founder Next Action:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {activeDealModal.nextAction}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveDealModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close Deal Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 7: SCALE WITHOUT HEADCOUNT (Two-Column Comparison)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LEAN STARTUP LEVERAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Scale Revenue Before You Scale Headcount
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Without Outtricks */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-200 dark:border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]/80">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                WITHOUT OUTTRICKS
              </h3>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200">
                Fragile & Expensive
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {[
                'Multiple disconnected tools costing $1,200+/month',
                'Manual copy-paste work stealing 20+ hours from product',
                'Lost follow-ups and dropped warm buyer threads',
                'Scattered contact information in spreadsheets and Notion'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Outtricks */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <h3 className="font-extrabold text-base text-blue-950 dark:text-blue-100">
                WITH OUTTRICKS
              </h3>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                Autonomous & Fast
              </span>
            </div>

            <ul className="space-y-3 text-xs text-blue-950 dark:text-blue-200">
              {[
                'One unified platform starting at $79/month single bill',
                'Automated workflows that run 24/7 in the background',
                'Connected outreach across Email, LinkedIn, and Voice AI',
                'Centralized pipeline tracking with 0ms database lag'
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
          SECTION 8: FINAL CTA (Founder Focused)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED REVENUE ENGINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Your Next Customer Could Be One Workflow Away
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Start prospecting, sending multi-inbox campaigns, and closing deals on autopilot today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free</span>
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
          7-Day Free Trial • Instant Setup • Built for Startups
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FOUNDER QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FOUNDER_FAQS.map((faq, fIdx) => {
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
