import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Workflow, 
  Search, 
  Database, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Building2, 
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
  Users,
  Briefcase,
  SlidersHorizontal,
  Flame,
  Radio,
  Activity,
  Globe,
  GitBranch,
  Split
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface FlowNode {
  id: string;
  stepNum: string;
  title: string;
  nodeType: 'Trigger' | 'Contact Search' | 'Outreach' | 'Condition' | 'Voice SDR' | 'CRM Action';
  actionName: string;
  shortDesc: string;
  detailPayload: {
    configRule: string;
    runtimeTelemetry: string;
    branchLogic?: string;
  };
  icon: any;
  statusBadge: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'n1',
    stepNum: '01',
    title: 'New ICP Lead Sourced',
    nodeType: 'Trigger',
    actionName: 'Lead Directory Ingestion',
    shortDesc: 'Matches 480M+ B2B pool with 8-dimension filter criteria.',
    detailPayload: {
      configRule: 'Criteria: VP Growth, 50-200 Headcount, B2B SaaS, US/UK',
      runtimeTelemetry: '1,420 Qualified Leads Ingested Today',
      branchLogic: 'Instant trigger upon profile discovery'
    },
    icon: Search,
    statusBadge: 'Trigger Active'
  },
  {
    id: 'n2',
    stepNum: '02',
    title: 'contact search',
    nodeType: 'Contact Search',
    actionName: '15-Source Data Cascade',
    shortDesc: 'Secures verified work email and direct mobile dial via SMTP handshake.',
    detailPayload: {
      configRule: 'Cascade: Apollo → Datanyze → Hunter → Telco Registry',
      runtimeTelemetry: '99.8% SMTP Validated • 0 Credits Wasted',
      branchLogic: 'Pass if email is 100% verified'
    },
    icon: Database,
    statusBadge: 'Verified ✓'
  },
  {
    id: 'n3',
    stepNum: '03',
    title: 'Cold Email Step 1',
    nodeType: 'Outreach',
    actionName: 'Multi-Inbox Dispatch',
    shortDesc: 'Rotates 24 connected mailboxes with spintax and AI personalized line.',
    detailPayload: {
      configRule: 'Inbox Pool: 24 mailboxes (Cap: 35/day per inbox)',
      runtimeTelemetry: '99.4% Inboxed • 68.4% Open Rate',
      branchLogic: 'Wait 48h for open or reply event'
    },
    icon: Mail,
    statusBadge: 'Dispatched'
  },
  {
    id: 'n4',
    stepNum: '04',
    title: 'Behavioral Decision',
    nodeType: 'Condition',
    actionName: 'Engagement Branching',
    shortDesc: 'Branches sequence based on prospect opens, clicks, or replies.',
    detailPayload: {
      configRule: 'IF Positive Reply → Auto-Pause & Create Deal in CRM',
      runtimeTelemetry: 'IF No Reply after 48h → Trigger LinkedIn Connect',
      branchLogic: 'Dynamic real-time event evaluation'
    },
    icon: GitBranch,
    statusBadge: 'Listening 24/7'
  },
  {
    id: 'n5',
    stepNum: '05',
    title: 'LinkedIn Safe Touch',
    nodeType: 'Outreach',
    actionName: 'Residential Proxy Invite',
    shortDesc: 'Sends personalized connection request and warm value message.',
    detailPayload: {
      configRule: 'Channel: Dedicated Residential Cloud Proxy (100/wk cap)',
      runtimeTelemetry: '38.4% Connection Accept Rate',
      branchLogic: 'If accepted → Schedule welcome DM'
    },
    icon: Linkedin,
    statusBadge: 'Connected'
  },
  {
    id: 'n6',
    stepNum: '06',
    title: 'Sub-400ms Voice SDR',
    nodeType: 'Voice SDR',
    actionName: 'WebRTC Inbound/Outbound',
    shortDesc: 'Calls warm leads to answer technical questions and book calendar demos.',
    detailPayload: {
      configRule: 'Trigger: Visited pricing 3x or requested callback',
      runtimeTelemetry: '364ms Audio Latency • 94% Booked Rate',
      branchLogic: 'Locks slot on Google/Outlook Calendar'
    },
    icon: PhoneCall,
    statusBadge: 'Demo Booked'
  },
  {
    id: 'n7',
    stepNum: '07',
    title: 'Deals CRM Sync',
    nodeType: 'CRM Action',
    actionName: 'PostgreSQL Core Write',
    shortDesc: 'Logs complete timeline, call recording, and assigns deal to AE.',
    detailPayload: {
      configRule: 'Pipeline Stage: Demo Booked ($36,000 ARR)',
      runtimeTelemetry: '0ms Sync Lag • Slack Notification Sent',
      branchLogic: 'Handoff complete to Account Executive'
    },
    icon: Building2,
    statusBadge: 'Pipeline ARR Won'
  }
];

const MULTICHANNEL_FAQS: FaqItem[] = [
  {
    question: 'Can I combine multiple outreach channels into a single workflow?',
    answer: 'Yes! In Flow Builder, you can drag and drop Cold Email, LinkedIn Safe Outreach, WebRTC Voice AI, and CRM actions onto one unified visual canvas that executes sequentially.'
  },
  {
    question: 'How do workflows react to prospect behavior in real time?',
    answer: 'Outtricks listens for opens, clicks, website visits, LinkedIn accepts, and email replies 24/7. When a trigger event occurs, the workflow immediately executes the corresponding branch without delay.'
  },
  {
    question: 'Can I create complex conditional IF / THEN branches?',
    answer: 'Yes! You can branch based on prospect attributes (e.g. "If company size > 100"), engagement behavior ("If opened 3x but no reply"), or reply sentiment ("If positive intent >= 90%").'
  },
  {
    question: 'What happens when a prospect replies on any channel?',
    answer: 'Outtricks automatically pauses all subsequent outreach steps across email, LinkedIn, and phone for that contact, updates their status in Deals CRM, and notifies your sales rep on Slack.'
  },
  {
    question: 'Does the visual workflow engine require third-party tools like Zapier?',
    answer: 'No. Outtricks is a unified revenue operating system running on 1 PostgreSQL database. All 6 engines communicate natively with 0ms webhook lag and zero sync drift.'
  },
  {
    question: 'Can I A/B test entire multi-channel paths?',
    answer: 'Yes! You can split traffic 50/50 between two different sequence structures (e.g. Email-First vs LinkedIn-First) to determine which multi-touch cadence produces higher booked pipeline.'
  },
  {
    question: 'Is there a free trial to test Flow Builder?',
    answer: 'Yes! Your 7-Day Free Trial includes full access to the Visual Flow Builder canvas, contact search, multi-inbox rotation, and live CRM pipeline sync.'
  }
];

export const MultichannelUseCasePage: React.FC = () => {
  // Flow Canvas State
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(0);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(true);

  // Selected Node Modal State
  const [selectedNodeModal, setSelectedNodeModal] = useState<FlowNode | null>(null);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance workflow loop
  useEffect(() => {
    if (!isFlowPlaying) return;

    const timer = setInterval(() => {
      setActiveNodeIdx((prev) => (prev + 1) % FLOW_NODES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isFlowPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const activeNode = FLOW_NODES[activeNodeIdx];
  const ActiveNodeIcon = activeNode.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Multi-Channel Sales Execution Workflows | Outtricks"
        description="Orchestrate email, LinkedIn, phone calls, and CRM updates in unified drag-and-drop workflows."
        canonical="https://outtricks.com/use-cases/multichannel"
        keywords={["multi-channel outbound playbook","synchronized sales sequences","cross channel touchpoints"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Multi-Channel Workflows","url":"/use-cases/multichannel"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Build One Sales Workflow Across Every Channel)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            UNIFIED MULTI-CHANNEL FLOWS
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Build One Sales Workflow<br className="hidden sm:inline" /> Across Every Channel
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Connect lead generation, email, LinkedIn, voice, CRM, and automation into one intelligent revenue workflow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Build Your Workflow</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase">NATIVE CHANNELS</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">6 Unified Engines</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">REPLY LIFT</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">3.8x Higher Replies</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">WEBHOOK LAG</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">0ms Native Sync</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">ATTRIBUTION</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">100% Closed-Loop</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: WORKFLOW TRIGGERS (Start With a Trigger)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AUTOMATION TRIGGERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Start With a Trigger
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Kick off autonomous outreach whenever target buyer signals are detected.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase font-bold">TRIGGER 01</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">New ICP Lead</strong>
            <p className="text-slate-500 font-sans text-xs">Matches target headcount & industry in 480M+ pool.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase font-bold">TRIGGER 02</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">Website Visitor</strong>
            <p className="text-slate-500 font-sans text-xs">Reverse-IP deanonymizes company visiting pricing.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-indigo-600 block text-[10px] uppercase font-bold">TRIGGER 03</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">Form Submitted</strong>
            <p className="text-slate-500 font-sans text-xs">Inbound demo inquiry filled out on landing page.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-emerald-600 block text-[10px] uppercase font-bold">TRIGGER 04</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">Lead Verified</strong>
            <p className="text-slate-500 font-sans text-xs">multiDimensional search retrieves validated direct dial.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-1.5">
            <span className="text-emerald-600 block text-[10px] uppercase font-bold">TRIGGER 05</span>
            <strong className="text-emerald-700 dark:text-emerald-300 block font-bold text-xs">Positive Intent</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans text-xs">AI sentiment scores prospect intent &gt;= 90%.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: MULTI-CHANNEL ACTIONS (Choose the Right Next Action)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            COORDINATED EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Choose the Right Next Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Seamlessly sequence across Lead Search, cold email, LinkedIn, voice AI, and CRM actions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">1. multiAttribute Verify</strong>
            <p className="text-slate-500 font-sans text-xs">SMTP handshake & mobile carrier lookup.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">2. Cold Email Send</strong>
            <p className="text-slate-500 font-sans text-xs">24-inbox rotation with spintax copy.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Linkedin className="w-4 h-4" />
            </div>
            <strong className="text-slate-900 dark:text-white block font-bold text-xs">3. LinkedIn Connect</strong>
            <p className="text-slate-500 font-sans text-xs">Dedicated cloud residential proxy invite.</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <strong className="text-blue-950 dark:text-blue-200 block font-bold text-xs">4. Voice AI SDR</strong>
            <p className="text-blue-700 dark:text-blue-300 font-sans text-xs">Sub-400ms conversational call.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <strong className="text-emerald-950 dark:text-emerald-200 block font-bold text-xs">5. Deals CRM Sync</strong>
            <p className="text-emerald-700 dark:text-emerald-300 font-sans text-xs">0ms pipeline update & AE handoff.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: BEHAVIORAL BRANCHING (Let Buyer Behavior Drive the Workflow)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SMART CONDITIONALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Let Buyer Behavior Drive the Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Dynamic IF / THEN branching adapts your outreach based on real prospect actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <span className="text-blue-600 font-bold uppercase text-[10px]">BRANCH 01</span>
              <span className="text-slate-400 text-[10px]">Email Opened 3x</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Execute LinkedIn Touch</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              When a prospect opens your cold email multiple times without replying, system automatically triggers a personalized LinkedIn connection invite within 2 hours.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <span className="text-blue-600 font-bold uppercase text-[10px]">BRANCH 02</span>
              <span className="text-slate-400 text-[10px]">No Reply (48 Hours)</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Send Follow-Up #2</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              If no engagement occurs after 48 hours, automatically rotate sending mailbox and dispatch follow-up value-add email with new spintax variation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-800">
              <span className="text-emerald-600 font-bold uppercase text-[10px]">BRANCH 03</span>
              <span className="text-emerald-600 font-bold text-[10px]">Positive Reply ✓</span>
            </div>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block">Auto-Pause & Assign AE</strong>
            <p className="text-emerald-800 dark:text-emerald-300 font-sans leading-relaxed">
              Instantly stops all sequence touches across all channels, creates a deal in Deals CRM, and routes meeting task to Account Executive on Slack.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: AUTOMATED HANDOFFS (Automate the Handoff)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ZERO-LEAKAGE PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Automate the Handoff Across Your Entire Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            From the initial inbound signal to closed-won revenue, every team member receives rich context automatically.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-sans text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">1. MARKETING</span>
              <strong className="text-slate-900 dark:text-white block truncate">Signals Ingested</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">2. AI ENGINE</span>
              <strong className="text-slate-900 dark:text-white block truncate">verified</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-indigo-600 font-bold block">3. VOICE SDR</span>
              <strong className="text-slate-900 dark:text-white block truncate">BANT Qualified</strong>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 space-y-1">
              <span className="text-emerald-600 font-bold block">4. DEALS CRM</span>
              <strong className="text-emerald-950 dark:text-emerald-200 block truncate">Deal Created ✓</strong>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-blue-600 text-white space-y-1 shadow-sm">
              <span className="text-blue-100 font-bold block">5. SALES AE</span>
              <strong className="text-white block truncate">Demo Executed</strong>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: VISUAL WORKFLOW BUILDER (Interactive Flow Builder Demo)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              INTERACTIVE FLOW CANVAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              See Every Workflow in One Place
            </h2>
          </div>

          <button
            onClick={() => setIsFlowPlaying(!isFlowPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isFlowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isFlowPlaying ? 'Pause Animation' : 'Resume Animation'}</span>
          </button>
        </div>

        {/* 7 Workflow Nodes Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {FLOW_NODES.map((node, idx) => {
            const NIcon = node.icon;
            const isSelected = activeNodeIdx === idx;
            return (
              <button
                key={node.id}
                onClick={() => {
                  setActiveNodeIdx(idx);
                  setIsFlowPlaying(false);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {node.stepNum}
                  </span>
                  <NIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-[11px] font-bold truncate">{node.title}</strong>
                <span className={`text-[9px] font-sans block truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {node.nodeType}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Node Detail Inspector Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveNodeIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  NODE {activeNode.stepNum} • {activeNode.nodeType}
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {activeNode.title}: {activeNode.actionName}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              {activeNode.statusBadge}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeNode.shortDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-blue-400 font-bold block text-[10px]">CONFIGURED RULE:</span>
              <p className="text-slate-300">{activeNode.detailPayload.configRule}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-[10px]">LIVE RUNTIME TELEMETRY:</span>
              <p className="text-slate-300">{activeNode.detailPayload.runtimeTelemetry}</p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-sans text-slate-400 border-t border-slate-800">
            <span>Branch Logic: {activeNode.detailPayload.branchLogic}</span>
            <span className="text-emerald-400 font-bold">0ms Sync Delay ✓</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: UNIFIED REVENUE ARCHITECTURE
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED OPERATING SYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Turn Your Entire Outbound Motion Into One System
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Consolidate 7 disconnected point solutions into 1 unified revenue layer.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-300 dark:border-blue-800 shadow-xl space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
              OUTTRICKS REVENUE OPERATING SYSTEM
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              One Single PostgreSQL Core Schema
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-xs font-sans text-center pt-2">
            {['Lead Finder', 'Contact Search', 'Cold Email', 'LinkedIn', 'Voice SDR', 'Deals CRM', 'Automation'].map((comp, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-blue-600 font-bold block text-[10px]">● NATIVE</span>
                <strong className="text-slate-900 dark:text-white block text-xs truncate mt-0.5">{comp}</strong>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLOW BUILDER</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build Smarter Sales Workflows Today
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Unify your outbound channels, automate cross-platform handoffs, and scale revenue on 1 platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
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
          7-Day Free Trial • Visual Flow Canvas • 0ms Webhook Synchronization Delay
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            WORKFLOW AUTOMATION QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {MULTICHANNEL_FAQS.map((faq, fIdx) => {
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
