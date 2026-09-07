import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  Sliders, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Layers, 
  Zap, 
  UserCheck, 
  Cpu,
  MessageSquare,
  TrendingUp,
  Target,
  SlidersHorizontal,
  Flame,
  Activity,
  AlertTriangle,
  Play,
  Pause,
  Filter,
  CheckCheck,
  FileText,
  User,
  Shield,
  Eye,
  Settings,
  Database
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// ============================================================================
// 6 AGENT SPECIALTY PROFILES (SECTION 6)
// ============================================================================
const AGENT_PROFILES = [
  {
    id: 'prospecting',
    title: 'Prospecting Agent',
    badge: 'ICP Discovery',
    icon: Search,
    whatItDoes: 'Continuously queries the 480M+ verified B2B database to identify target accounts and decision-makers that strictly adhere to your ICP filters.',
    whenToUse: 'When expanding into new markets or setting up continuous weekly top-of-funnel account sourcing.',
    exampleTask: 'Find 50 VP Sales profiles in Series A B2B SaaS companies hiring SDRs in North America.',
    actionOutcome: 'Populates a dynamic target list and triggers contact search in sub-10ms.'
  },
  {
    id: 'research',
    title: 'Research Agent',
    badge: 'Deep Intelligence',
    icon: Sparkles,
    whatItDoes: 'Gathers deep contextual intelligence across 10-K filings, press releases, hiring boards, and GitHub commits before any outreach begins.',
    whenToUse: 'Before reaching out to Tier-1 Enterprise target accounts that require hyper-personalized hooks.',
    exampleTask: 'Analyze CloudScale AI recent announcements, hiring spikes, and installed CRM/data stack.',
    actionOutcome: 'Generates 3 contextual icebreakers referencing executive quotes and tech migrations.'
  },
  {
    id: 'personalization',
    title: 'Personalization Agent',
    badge: 'Dynamic Messaging',
    icon: Mail,
    whatItDoes: 'Transforms unstructured research data into relevant, non-robotic value propositions tailored to the prospect exact pain point.',
    whenToUse: 'When running multi-variant cold email and LinkedIn touchpoints that require bespoke spintax variation.',
    exampleTask: 'Draft a 3-step sequence highlighting how Outtricks replaces 4 disconnected sales tools.',
    actionOutcome: 'Queues high-relevance draft messages with unique personalized snippet variables.'
  },
  {
    id: 'qualification',
    title: 'Qualification Agent',
    badge: 'BANT / MEDDPICC',
    icon: Target,
    whatItDoes: 'Analyzes inbound replies, audio transcripts, and sentiment scores to determine whether a prospect meets commercial buying criteria.',
    whenToUse: 'To instantly filter out unqualified inquiries, pricing requests, or out-of-office autoreplies 24/7.',
    exampleTask: 'Evaluate lead response: "We have 25 reps and need multi-inbox rotation by next month."',
    actionOutcome: 'Scores buying intent at 96%, tags as Qualified Enterprise, and creates a Deals CRM opportunity.'
  },
  {
    id: 'followup',
    title: 'Follow-Up Agent',
    badge: 'Cadence Engine',
    icon: Clock,
    whatItDoes: 'Analyzes conversation history and timing constraints to dynamically calculate the optimal follow-up day, channel, and message angle.',
    whenToUse: 'When prospects state "check back in Q3" or when email opens stall without a formal reply.',
    exampleTask: 'Parse reply: "In the middle of Q3 budgeting, ping me again November 1st."',
    actionOutcome: 'Schedules a personalized reminder sequence for Nov 1 with historical conversation context.'
  },
  {
    id: 'crm',
    title: 'CRM Agent',
    badge: 'Zero Data Decay',
    icon: Building2,
    whatItDoes: 'Maintains pristine pipeline records by logging structured conversation notes, deal stage changes, and verified contact updates in real time.',
    whenToUse: 'To eliminate manual CRM data entry for reps and ensure total visibility across the revenue team.',
    exampleTask: 'Log completed Voice SDR discovery call transcript and update deal value to $36,000 ARR.',
    actionOutcome: 'Synchronizes deal stage to "Demo Scheduled" and assigns enterprise AE in Deals CRM.'
  }
];

// ============================================================================
// 8 REAL-WORLD OPERATIONAL USE CASES (SECTION 7)
// ============================================================================
const USE_CASES_DATA = [
  {
    id: 'uc-1',
    title: 'Automated Prospect Research',
    problem: 'SDRs spend 15–20 minutes per account manually browsing LinkedIn and news feeds before writing a single email.',
    agentAction: 'Agent automatically parses recent funding rounds, hiring surges, podcast appearances, and technographic migrations.',
    workflow: 'Lead Finder → Agent Research → Context Extraction → Verified Lead Card',
    result: 'Reduces pre-call research time from 20 minutes to 3 seconds per account.'
  },
  {
    id: 'uc-2',
    title: 'ICP-Based Lead Discovery',
    problem: 'Teams pull broad, noisy contact lists resulting in low response rates and wasted outbound credits.',
    agentAction: 'Agent continuously evaluates 480M+ profiles against 8 search dimensions, discarding mismatched accounts.',
    workflow: 'ICP Rules Engine → Database Scan → MultiDimensional Lead Search → Verified List',
    result: 'Achieves 99.4% deliverability and doubles meeting booking conversion rates.'
  },
  {
    id: 'uc-3',
    title: 'Personalized Outbound at Scale',
    problem: 'Generic template blasts end up in spam and generate single-digit reply rates from sophisticated buyers.',
    agentAction: 'Agent tailors each email hook and value proposition to the prospect specific tech stack and role priorities.',
    workflow: 'Prospect Context → Dynamic Copywriting → Spintax Randomization → Multi-Inbox Dispatch',
    result: '3.2x higher positive reply rates compared to static copy templates.'
  },
  {
    id: 'uc-4',
    title: 'Lead Qualification & Intent Scoring',
    problem: 'Account Executives waste high-value discovery slots on tire-kickers, students, and unqualified inbound leads.',
    agentAction: 'Agent evaluates company headcount, budget authority, and timeline from replies before routing.',
    workflow: 'Inbound Reply → Semantic Intent Analysis → BANT Score Calculation → AE Routing',
    result: 'Guarantees AEs only take meetings with verified decision-makers matching commercial thresholds.'
  },
  {
    id: 'uc-5',
    title: 'Autonomous Meeting Booking',
    problem: 'Back-and-forth scheduling tag causes 30% of interested warm leads to go cold before a demo is confirmed.',
    agentAction: 'Agent parses proposed time slots, checks rep Google Calendar availability in real time, and sends calendar invites.',
    workflow: 'Positive Reply → Calendar Availability Check → Invite Generation → Deals CRM Update',
    result: 'Books qualified meetings in under 2 minutes with zero scheduling friction.'
  },
  {
    id: 'uc-6',
    title: 'Stalled Lead Reactivation',
    problem: 'Thousands of past demo leads and closed-lost opportunities sit idle in CRM databases without follow-up.',
    agentAction: 'Agent detects when stalled accounts announce new funding, hire new leadership, or change tech stacks.',
    workflow: 'CRM Trigger → Signal Detection → Contextual Re-engagement Email → Live Conversation',
    result: 'Recovers 12–18% of previously lost opportunities into active sales pipeline.'
  },
  {
    id: 'uc-7',
    title: 'Intelligent Follow-Up Management',
    problem: 'Sales reps forget to follow up when prospects ask to reconnect in 60–90 days, leaking revenue.',
    agentAction: 'Agent parses date constraints from natural language replies and queues automatic re-engagement sequences.',
    workflow: 'Temporal Parser → Scheduled Wait State → Contextual Follow-Up Dispatch → Rep Alert',
    result: 'Zero dropped follow-ups and complete execution of long-cycle nurturing.'
  },
  {
    id: 'uc-8',
    title: 'CRM Data Maintenance & Hygiene',
    problem: 'Sales reps despise data entry, leading to outdated contact titles, duplicate accounts, and missing stage info.',
    agentAction: 'Agent automatically writes call summaries, updates deal stages, logs verified mobile dials, and removes invalid emails.',
    workflow: 'Action Event → Structured JSON Payload → Direct DB Write → Pipeline Sync',
    result: 'Eliminates CRM data decay completely with zero manual data entry required from reps.'
  }
];

// ============================================================================
// ACTIVITY LOG ENTRIES (SECTION 10)
// ============================================================================
interface ActivityLogItem {
  id: string;
  time: string;
  category: 'research' | 'outreach' | 'crm' | 'errors';
  module: string;
  action: string;
  details: string;
  status: 'completed' | 'running' | 'queued' | 'flagged';
}

const SAMPLE_LOGS: ActivityLogItem[] = [
  { id: '1', time: '09:47:12', category: 'crm', module: 'Deals CRM', action: 'Updated Deal Stage', details: 'Advanced "CloudScale AI" to Stage 3: Demo Scheduled ($36K ARR)', status: 'completed' },
  { id: '2', time: '09:46:04', category: 'outreach', module: 'Multi-Inbox Email', action: 'Dispatched Personalized Touchpoint', details: 'Sent step 1 to Sarah Jenkins (VP Growth) via sarah@outtricks.io mailbox', status: 'completed' },
  { id: '3', time: '09:45:18', category: 'research', module: 'Personalization Engine', action: 'Generated Bespoke Hook', details: 'Referenced CloudScale hiring surge (+6 SDRs) and current Salesforce/PostgreSQL stack', status: 'completed' },
  { id: '4', time: '09:44:02', category: 'research', module: 'Intent Signals', action: 'Detected Buying Surge', details: 'Identified Series B funding announcement ($32M) and new outbound expansion postings', status: 'completed' },
  { id: '5', time: '09:43:20', category: 'research', module: 'contact search', action: 'Verified Contact Data', details: 'Confirmed direct mobile dial & 99.4% deliverable work email via multiDimensional search', status: 'completed' },
  { id: '6', time: '09:42:01', category: 'research', module: 'Lead Finder', action: 'Discovered ICP Target', details: 'Matched Sarah Jenkins (VP Growth @ CloudScale AI, 180 headcount, SaaS)', status: 'completed' }
];

// ============================================================================
// 12 COMPREHENSIVE FAQS (SECTION 15)
// ============================================================================
const AGENT_FAQS = [
  {
    question: 'What are Outtricks AI Agents?',
    answer: 'Outtricks AI Agents are autonomous digital operators designed specifically for B2B revenue teams. Unlike simple chatbots that merely generate text, Outtricks Agents understand business goals, research prospect and company context, make data-driven decisions, execute multi-step revenue actions (email, LinkedIn, Voice AI calls), and update your CRM without requiring continuous manual clicks.'
  },
  {
    question: 'What can an AI Agent do for a sales team?',
    answer: 'An AI Agent can handle the entire repetitive outbound lifecycle: discovering accounts matching your ICP, executing multiAttribute search Contact Search, gathering contextual buying signals, writing personalized messages, sending emails across rotated mailboxes, managing LinkedIn connection steps, placing low-latency Voice AI qualification calls, answering inbound queries, and booking calendar demos.'
  },
  {
    question: 'Can AI Agents research prospects before outreach?',
    answer: 'Yes. The Research Agent crawls verified company databases, recent funding press releases, hiring board expansions, executive appointments, and technographic software stacks to extract relevant business triggers before drafting or sending any message.'
  },
  {
    question: 'Can AI Agents personalize outreach dynamically?',
    answer: 'Yes. The Personalization Agent uses verified prospect intelligence—such as current tools, recent team promotions, or shared industry challenges—to generate hyper-relevant icebreakers and value propositions, completely avoiding generic one-size-fits-all email templates.'
  },
  {
    question: 'Can AI Agents qualify leads automatically?',
    answer: 'Yes. The Qualification Agent analyzes incoming email replies, LinkedIn messages, or real-time Voice SDR call transcripts against your predefined BANT (Budget, Authority, Need, Timeline) or MEDDPICC criteria to score commercial readiness.'
  },
  {
    question: 'Can AI Agents update CRM records directly?',
    answer: 'Yes. Outtricks operates on a single connected PostgreSQL database. Whenever an agent books a meeting, qualifies a prospect, or logs a conversation, Deals CRM is updated in sub-10ms with zero CSV exports or sync drift.'
  },
  {
    question: 'Can humans review and approve agent actions before they execute?',
    answer: 'Yes. You have full granular control. You can set agents to "Autonomous Mode" for automated execution or "Human-in-the-Loop Mode," requiring a human rep to click "Approve" on draft messages, prospect selections, or deal promotions.'
  },
  {
    question: 'How are AI Agent workflows controlled and configured?',
    answer: 'You define agent goals, target audience filters, allowed actions, custom exclusion rules, and escalation parameters through an intuitive visual configuration UI. No coding or complex scripting is required.'
  },
  {
    question: 'Can I pause an AI Agent at any time?',
    answer: 'Yes. Every active agent includes an instant Pause/Resume toggle. When paused, all scheduled outbound messages, voice dispatches, and research queues freeze safely without dropping campaign state.'
  },
  {
    question: 'What happens when an agent encounters an exception or complex question?',
    answer: 'If an agent encounters an ambiguous prospect reply, a security compliance query, or an out-of-bounds objection, it triggers an Escalation Rule. It halts automated outreach for that contact and immediately alerts the assigned human rep via Slack, email, or CRM task.'
  },
  {
    question: 'How are Outtricks AI Agents different from traditional automation tools?',
    answer: 'Traditional sales automation relies on rigid, static "if/then" triggers that break whenever a prospect reply deviates from a keyword list. Outtricks AI Agents are goal-oriented and context-aware—they evaluate unstructured natural language, adapt the next action dynamically, and execute across multiple revenue channels on one unified platform.'
  },
  {
    question: 'Can AI Agents work with other native Outtricks platform features?',
    answer: 'Yes. AI Agents are natively integrated with Lead Finder (480M+ database), contact search (multiDimensional filters), Multi-Inbox Cold Email, LinkedIn Cloud Automation, Sub-400ms Voice AI SDRs, and Deals CRM on one shared architecture.'
  }
];

export const AiAgentsPage: React.FC = () => {
  // State for interactive builder
  const [selectedAgentTab, setSelectedAgentTab] = useState<'outbound' | 'inbound' | 'reactivation'>('outbound');
  const [agentStatus, setAgentStatus] = useState<'running' | 'paused'>('running');
  const [selectedLogFilter, setSelectedLogFilter] = useState<'all' | 'research' | 'outreach' | 'crm' | 'errors'>('all');
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(2);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter activity logs
  const filteredLogs = SAMPLE_LOGS.filter((log) => {
    if (selectedLogFilter === 'all') return true;
    return log.category === selectedLogFilter;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pt-20 pb-24 overflow-x-hidden">
      
      {/* 1. SEO Head & Structured Data Schema */}
      <SEOHead 
        title="AI Agents for Sales & Autonomous Revenue Workflows | Outtricks"
        description="Deploy intelligent AI sales agents that research prospects, personalize outreach, manage follow-ups, qualify leads, and update CRM records autonomously."
        canonical="https://outtricks.com/platform/ai-agents"
        keywords={[
          'AI agents for sales',
          'AI sales agents',
          'AI agents for revenue teams',
          'sales automation agents',
          'autonomous sales workflows',
          'AI SDR',
          'AI prospecting agent',
          'AI lead qualification',
          'AI sales automation',
          'revenue automation',
          'AI outbound agents'
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Platform', url: 'https://outtricks.com/platform' },
          { name: 'AI Agents', url: 'https://outtricks.com/platform/ai-agents' }
        ]}
        faqs={AGENT_FAQS}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Outtricks AI Agents",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, Cloud",
          "description": "Autonomous AI sales agents that research prospects, personalize outreach, qualify leads, and execute revenue workflows with human oversight.",
          "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD"
          }
        }}
      />

      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE AGENT WORKSPACE
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">AI Agents</span>
          </nav>

          {/* Hero Main Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#2563eb]" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                AI AGENTS FOR REVENUE TEAMS
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              AI Agents That{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Actually Move Revenue Forward
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto font-sans">
              Deploy intelligent agents that research prospects, personalize outreach, manage follow-ups, qualify opportunities, and execute repetitive revenue workflows without constant manual intervention.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href="#agent-workspace"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
              >
                <span>Explore AI Agents</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:border-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group font-sans"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Metrics Strip */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto border-t border-slate-200/60 dark:border-white/[0.07]">
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">100%</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Autonomous Execution</div>
              </div>
              <div className="text-center space-y-0.5 border-x border-slate-200/60 dark:border-white/[0.07]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">&lt; 3 sec</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Context Analysis</div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">0 Drift</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Deals CRM Sync</div>
              </div>
            </div>

          </div>

          {/* =====================================================================
              HERO PRODUCT VISUAL: INTERACTIVE AI AGENT WORKSPACE
              ===================================================================== */}
          <div id="agent-workspace" className="pt-4 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-4 sm:p-7 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6">
              
              {/* Workspace Top Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.07] pb-5">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-sans">
                        Outbound SDR Agent
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-sans border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {agentStatus === 'running' ? 'Running' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      Active Campaign: <span className="font-bold text-slate-700 dark:text-slate-300">Q3 Tier-1 B2B SaaS Enterprise</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAgentStatus(agentStatus === 'running' ? 'paused' : 'running')}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                      agentStatus === 'running'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40 hover:bg-rose-100'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40 hover:bg-emerald-100'
                    }`}
                  >
                    {agentStatus === 'running' ? <><Pause className="w-3.5 h-3.5" /> Pause Agent</> : <><Play className="w-3.5 h-3.5" /> Resume Agent</>}
                  </button>
                  <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans border border-blue-500/20">
                    Human-in-the-Loop: Active
                  </span>
                </div>

              </div>

              {/* Workspace Main 3-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
                
                {/* Col 1: Current Task & Progress (4 Cols) */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">CURRENT OPERATION</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      Researching Target Prospect
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Execution Pipeline</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">Stage 2 of 4</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-[#262626] overflow-hidden">
                      <div className="w-3/5 h-full bg-blue-600 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Found company buying signals (+6 SDR hires)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center gap-2 font-bold">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 animate-spin" />
                      <span>Personalizing value proposition hook...</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#222222] text-slate-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Preparing multi-inbox cold email dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: Prospect Intelligence Context (4 Cols) */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">PROSPECT CONTEXT</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        alt="Sarah Jenkins"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">Sarah Jenkins</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">VP Growth @ CloudScale AI</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020]">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Industry</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Enterprise SaaS</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020]">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Headcount</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">180 Employees</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-current" /> Detected Tech Stack
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                      Salesforce, Stripe, AWS, PostgreSQL
                    </p>
                  </div>
                </div>

                {/* Col 3: Workflow Action & Telemetry (4 Cols) */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">NEXT AUTOMATED ACTION</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      Queue Multi-Inbox Dispatch
                    </h4>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Sending Domain:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">sarah@outtricks.io</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Spintax Variant:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Variant C (Tech-Hook)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Scheduled Send:</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Today @ 10:14 AM CST</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link
                      to="/signup"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-sans text-center block transition-all shadow-md shadow-blue-500/25"
                    >
                      Configure This Agent →
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AUTONOMOUS REVENUE WORKFLOWS (4 Digital Operators)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8">
          
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              AUTONOMOUS REVENUE WORKFLOWS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Give Your Revenue Team{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Digital Operators
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Outtricks AI Agents do far more than generate text. They execute structured, end-to-end revenue operations across your outbound pipeline with deterministic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Research Agent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Researches companies, prospects, job roles, installed technologies, and relevant business buying signals before outreach.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Outreach Agent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Creates bespoke outreach tailored to prospect role pain points across rotated cold email mailboxes and cloud LinkedIn.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Qualification Agent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyzes responses and call audio in real time, scores commercial intent, and determines if a lead meets BANT criteria.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Follow-Up Agent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dynamically parses timing constraints (e.g. "reach back in Q3") and automates appropriate next steps across channels.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FROM INSTRUCTION TO EXECUTION (Visual Workflow)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From Instruction to{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Autonomous Execution
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Outtricks AI Agents operate as goal-oriented execution systems, not conversational toys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {[
              { step: '01', title: 'Goal Given', desc: 'Define agent mission & target criteria.' },
              { step: '02', title: 'Context', desc: 'Parses ICP attributes & tech stack.' },
              { step: '03', title: 'Research', desc: 'Finds verified signals in real time.' },
              { step: '04', title: 'Decision', desc: 'Selects optimal channel & hook.' },
              { step: '05', title: 'Execution', desc: 'Dispatches email, LinkedIn, or call.' },
              { step: '06', title: 'Workflow', desc: 'Logs telemetry & intent score.' },
              { step: '07', title: 'Next Step', desc: 'Moves pipeline to demo or nurture.' }
            ].map((st, idx) => (
              <div
                key={idx}
                onClick={() => setActiveWorkflowStage(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                  activeWorkflowStage === idx
                    ? 'bg-blue-50/80 dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-[#0b101f] border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 block">{st.step}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{st.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: BUILD YOUR AGENT (Interactive Config Interface)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              BUILD YOUR AGENT
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Create Agents Around the Way{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Your Team Works
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Define goals, allowed actions, strict business rules, and human-in-the-loop escalation criteria in minutes.
            </p>
          </div>

          {/* Interactive Configuration Studio */}
          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 font-sans">
            
            {/* Agent Preset Switcher */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-[#202020] pb-4">
              {[
                { id: 'outbound', label: 'Outbound SDR Agent' },
                { id: 'inbound', label: 'Inbound Qualification Agent' },
                { id: 'reactivation', label: 'Stalled Lead Reactivation Agent' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedAgentTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedAgentTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Configuration Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Agent Objective</span>
                <p className="text-slate-900 dark:text-white font-bold">
                  {selectedAgentTab === 'outbound' && 'Find qualified SaaS prospects & book discovery calls.'}
                  {selectedAgentTab === 'inbound' && 'Qualify inbound website demo requests in < 60 seconds.'}
                  {selectedAgentTab === 'reactivation' && 'Re-engage closed-lost deals with new funding or hires.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Audience Filters</span>
                <p className="text-slate-900 dark:text-white font-bold">
                  {selectedAgentTab === 'outbound' && 'VP Growth / CRO, 50–500 Headcount, B2B SaaS.'}
                  {selectedAgentTab === 'inbound' && 'Form Submissions from Business Email Domains.'}
                  {selectedAgentTab === 'reactivation' && 'CRM Stage: Lost (>90 Days Ago) + New Funding.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Permitted Action Cascade</span>
                <p className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                  Research → Personalize → Outreach → Follow Up → CRM Sync
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Guardrails & Exclusion Rules</span>
                <p className="text-slate-700 dark:text-slate-300">
                  Never contact active deals in Stage 2–5. Respect global domain suppression lists.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Commercial Success Criteria</span>
                <p className="text-slate-700 dark:text-slate-300">
                  Confirmed Google Calendar slot booked with decision-maker + CRM opportunity created.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Human Escalation Triggers</span>
                <p className="text-amber-600 dark:text-amber-400 font-bold">
                  Flag custom contract inquiries, enterprise legal queries, or angry sentiment to rep.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: AGENTS ACROSS YOUR REVENUE STACK
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Agents That Work Across Your{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Entire Revenue Stack
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Outtricks AI Agents seamlessly orchestrate across all native platform modules on a single connected PostgreSQL data layer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Lead Finder', desc: '480M+ Profiles' },
              { title: 'contact search', desc: 'multiDimensional filters' },
              { title: 'Email Outreach', desc: 'Multi-Inbox Rotation' },
              { title: 'LinkedIn Automation', desc: 'Cloud API Actions' },
              { title: 'Voice AI SDR', desc: 'Sub-400ms WebRTC' },
              { title: 'Deals CRM', desc: 'Real-Time Sync' }
            ].map((mod, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-center space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">0{idx + 1} MODULE</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{mod.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{mod.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CHOOSE THE RIGHT AGENT FOR THE JOB (6 Agent Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Choose the Right Agent for{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                the Exact Task
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Specialized digital operators engineered for distinct revenue milestones across your outbound motion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {AGENT_PROFILES.map((agent) => {
              const Icon = agent.icon;

              return (
                <div
                  key={agent.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {agent.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                      {agent.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {agent.whatItDoes}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020] text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400">When to use:</span>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px]">{agent.whenToUse}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] text-[11px] font-mono text-slate-800 dark:text-slate-200 space-y-0.5">
                      <span className="text-[9px] uppercase font-bold text-blue-600 dark:text-blue-400 block">Example Task:</span>
                      {agent.exampleTask}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: REAL-WORLD USE CASES (8 Detailed Operational Playbooks)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              REAL-WORLD USE CASES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Put AI Agents to Work on{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Bottlenecks
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              8 concrete operational playbooks resolving common sales team capacity constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {USE_CASES_DATA.map((uc, idx) => (
              <div
                key={uc.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">USE CASE 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    Autonomous Playbook
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                  {uc.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1">
                    <span className="font-bold text-rose-800 dark:text-rose-300 uppercase text-[10px]">The Challenge</span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">{uc.problem}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 uppercase text-[10px]">Agent Action</span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">{uc.agentAction}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-xs font-mono space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Workflow Path:</span>
                  <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold">{uc.workflow}</p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-white/[0.04] border border-blue-200/60 dark:border-blue-900/30 text-xs space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">Measurable Result:</span>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-[11px]">{uc.result}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: AI THAT KNOWS WHEN TO ACT (Visual Decision Tree)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              AI That Knows{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                When to Act
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              How Outtricks AI Agents evaluate dynamic conditions, conversation signals, and safety guardrails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">STAGE 1: LEAD EVALUATION</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">New Lead Ingested</h3>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                  ✓ ICP Match = YES → Trigger Research Agent
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold">
                  ✕ ICP Match = NO → Suppress & Archive
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">STAGE 2: INTENT DETECTION</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Research Complete</h3>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                  ✓ High Intent (Hiring/Funding) = YES → Launch Outreach
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold">
                  ✕ Low Intent = Nurture Sequence (45 Days)
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">STAGE 3: RESPONSE PARSING</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Prospect Reply</h3>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                  ✓ Qualified = YES → Book Demo & Create Deal
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">
                  ✕ Not Ready = Schedule Future Follow-Up
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: KEEP HUMANS IN CONTROL (Safety & Governance)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Keep Humans{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                in Complete Control
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Autonomy without blind execution. Establish strict safety rules, approval gates, and instant escalation paths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
            {[
              { icon: ShieldCheck, title: 'Approval Steps', desc: 'Require rep approval before launching high-value enterprise emails.' },
              { icon: SlidersHorizontal, title: 'Rules & Guardrails', desc: 'Enforce strict constraints on daily send volumes and target domains.' },
              { icon: AlertTriangle, title: 'Live Escalation', desc: 'Route sensitive objections and pricing negotiations directly to a human rep.' },
              { icon: Eye, title: 'Audit Logs', desc: 'Inspect full execution logs explaining why each decision was made.' },
              { icon: Pause, title: 'Instant Pause', desc: 'Halt or resume any active agent with a single click at any time.' }
            ].map((gov, idx) => {
              const Icon = gov.icon;

              return (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2.5 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{gov.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{gov.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: AGENT ACTIVITY LOG UI (Interactive Filterable Feed)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 font-sans">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                See Exactly What Your{' '}
                <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                  Agent Is Doing
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                Real-time timestamped audit log of every decision, research lookup, and pipeline action.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-xs">
              {(['all', 'research', 'outreach', 'crm', 'errors'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedLogFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    selectedLogFilter === filter
                      ? 'bg-white dark:bg-[#222222] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-4 sm:p-6 shadow-xl space-y-3">
            <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="font-mono text-slate-400 text-[11px] shrink-0">{log.time}</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] shrink-0">
                      {log.module}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white mr-2">{log.action}:</span>
                      <span className="text-slate-600 dark:text-slate-300">{log.details}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold self-start sm:self-center shrink-0">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: CAPABILITY MATRIX (AI Agent vs Manual)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              One Agent.{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Multiple Revenue Actions.
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Compare autonomous agent operations against fragmented manual sales workflows.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A]">
                  <th className="pb-4 font-bold uppercase tracking-wider text-slate-400 w-1/3">Revenue Capability</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 w-1/3">Outtricks AI Agent</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">Manual Rep Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Prospect Research</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Automated (&lt; 3 seconds per lead)</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual (15–20 minutes per lead)</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Message Personalization</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Contextual dynamic spintax</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Generic static copy templates</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Lead Qualification</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Real-time BANT / MEDDPICC scoring</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Delayed manual reply review</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Follow-Up Management</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Automated contextual scheduling</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Forgotten calendar reminders</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Deals CRM Updates</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Sub-10ms direct DB writes</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual end-of-week data entry</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Human Escalation</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Instant Slack & email alert to rep</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">N/A (Rep overwhelmed with busywork)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: WHY REVENUE TEAMS USE AI AGENTS (6 Core Benefits)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Why Revenue Teams{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Deploy AI Agents
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Direct operational and financial advantages of autonomous revenue workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Less Manual Research', desc: 'Spend less time gathering repetitive prospect information and more time closing.' },
              { title: 'Faster Execution', desc: 'Move from research to outreach in seconds without unnecessary handoffs or lag.' },
              { title: 'Consistent Processes', desc: 'Apply the same high-standard qualification rules across every single lead.' },
              { title: 'Better Context', desc: 'Leverage deep technographic and hiring signals before taking any outreach action.' },
              { title: 'Scalable Operations', desc: 'Run structured outbound workflows across larger account volumes without adding headcount.' },
              { title: 'Human Focus', desc: 'Free up AEs to focus purely on high-stakes sales conversations that require human judgment.' }
            ].map((ben, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">BENEFIT 0{idx + 1}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{ben.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ben.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 13: BUILT FOR THE MODERN REVENUE WORKFLOW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-[#0b101f] dark:to-[#060913] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-8 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Connecting the Entire{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Outbound Lifecycle
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              AI Agents act as the intelligent execution layer across all 10 stages of the revenue journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold font-mono">
            {['Find', 'Verify', 'Research', 'Personalize', 'Reach', 'Engage', 'Follow Up', 'Qualify', 'Update CRM', 'Close'].map((stage, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-slate-800 dark:text-slate-200 shadow-xs">
                  {stage}
                </span>
                {idx < 9 && <span className="text-blue-600 dark:text-blue-400">→</span>}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 14: AI AGENTS VS TRADITIONAL AUTOMATION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              AI Agents vs.{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Traditional Automation
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Understanding the difference between brittle rule-based scripts and context-aware execution agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">TRADITIONAL AUTOMATION</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Brittle Trigger Sequences</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">✕ Fixed triggers that fail on natural language variations</li>
                <li className="flex items-center gap-2">✕ Predefined rigid templates with zero live context</li>
                <li className="flex items-center gap-2">✕ Cannot research or verify signals before taking action</li>
                <li className="flex items-center gap-2">✕ Requires manual rep intervention for every exception</li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b101f] border border-blue-500/40 dark:border-blue-500/30 space-y-4 shadow-xl">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">OUTTRICKS AI AGENTS</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Goal-Oriented Execution</h3>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2">✓ Understands natural language replies and context</li>
                <li className="flex items-center gap-2">✓ Researches fresh data points before personalizing</li>
                <li className="flex items-center gap-2">✓ Dynamically decides next optimal action (call, email, wait)</li>
                <li className="flex items-center gap-2">✓ Escalates gracefully to humans when complex rules trigger</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 15: FREQUENTLY ASKED QUESTIONS (12 FAQs)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 font-sans">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Frequently Asked{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Everything you need to know about Outtricks AI Agents, autonomous execution, controls, and CRM sync.
            </p>
          </div>

          <div className="space-y-3">
            {AGENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#0b101f] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#202020] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 16: FINAL CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-700 text-white p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider font-sans border border-white/20">
            READY TO AUTOMATE THE WORK?
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Turn Revenue Workflows Into{' '}
            <span className="font-serif italic font-normal underline decoration-white/30">
              Autonomous Systems.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
            Build AI Agents that research, decide, execute, and move qualified opportunities through your revenue workflow while your team stays in control.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Explore AI Agents
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Book a Demo
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
