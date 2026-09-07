import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Zap, 
  Workflow, 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  Check,
  ChevronDown,
  ChevronUp,
  Database,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Sliders,
  Play
} from 'lucide-react';
import { LeadDatabaseSearch } from '../../components/LeadDatabaseSearch';
import { DealPipelineKanban } from '../../components/DealPipelineKanban';
import { VoiceSimulator } from '../../components/VoiceSimulator';
import { FlowSimulator } from '../../components/FlowSimulator';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

export const PlatformOverviewPage: React.FC = () => {
  // 1. Workflow Stage State
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<number>(0);
  // 2. Interactive Platform Demo Tab
  const [activeDemoTab, setActiveDemoTab] = useState<'lead-finder' | 'voice-ai' | 'crm' | 'automation'>('lead-finder');
  // 3. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Workflow Stages Data
  const WORKFLOW_STEPS = [
    {
      id: "find",
      title: "1. Find",
      subtitle: "480M+ B2B Database",
      desc: "Search verified decision-makers with 8-dimensional filters: seniority, tech stack, company headcount, funding round, and verified direct contact details.",
      actionLabel: "Explore Lead Finder",
      actionHref: "/platform/lead-finder",
      metric: "480M+ Profiles",
      highlights: ["Direct mobile dials & verified work emails", "Real-time buying intent signals", "Custom ICP list exports"]
    },
    {
      id: "Verify",
      title: "2. Verify",
      subtitle: "Lead Data Engine",
      desc: "Automatically verify emails via multi-provider multiAttribute routing with live MX/SMTP validation to guarantee sub-0.6% bounce rates.",
      actionLabel: "Explore Contact Search",
      actionHref: "/platform/data-Contact Search",
      metric: "99.4% Accuracy",
      highlights: ["15+ Verified data partner multiAttribute", "Disposable domain & spam trap detection", "Company headcount & revenue verification"]
    },
    {
      id: "reach",
      title: "3. Reach",
      subtitle: "Multi-Inbox Cold Email",
      desc: "Distribute cold email campaigns safely across 50+ Google Workspace and Microsoft 365 inboxes with automated ramp-up and peer warmup.",
      actionLabel: "Explore Email Outreach",
      actionHref: "/platform/email-outreach",
      metric: "99.4% Inboxed",
      highlights: ["Automated inbox rotation & spintax", "DKIM, SPF & DMARC health watchdog", "Custom tracking domains with SSL"]
    },
    {
      id: "engage",
      title: "4. Engage",
      subtitle: "LinkedIn Safe API & Voice AI",
      desc: "Engage prospects across LinkedIn connections and natural sub-400ms WebRTC Voice AI SDR calls that sound indistinguishable from human reps.",
      actionLabel: "Explore Voice AI",
      actionHref: "/platform/voice-ai",
      metric: "Sub-400ms Latency",
      highlights: ["Official LinkedIn API (0% ban risk)", "Conversational objection handling", "Automated gatekeeper navigation"]
    },
    {
      id: "followup",
      title: "5. Follow Up",
      subtitle: "Visual Workflow Engine",
      desc: "Automate cross-channel follow-ups based on real prospect actions: if email is opened 3x without a reply, trigger a LinkedIn DM or Voice AI SDR follow-up.",
      actionLabel: "Explore Workflow Graph",
      actionHref: "/platform/workflow-automation",
      metric: "0-Lag Webhooks",
      highlights: ["Multi-branch condition logic", "Automatic suppression on reply", "Native timeline event triggers"]
    },
    {
      id: "close",
      title: "6. Close",
      subtitle: "Native Deals CRM",
      desc: "Track every conversation, booked meeting, and revenue stage inside a clean Kanban pipeline with zero sync drift or third-party CRM fees.",
      actionLabel: "Explore Native CRM",
      actionHref: "/platform/crm",
      metric: "$127K+ Avg Pipeline",
      highlights: ["Unified contact activity timeline", "Drag-and-drop revenue stages", "Cross-channel revenue attribution"]
    }
  ];

  // 10 Platform Modules
  const PLATFORM_MODULES = [
    { title: "Lead Finder", desc: "Search 480M+ verified B2B contacts with 8D targeting filters: title, seniority, tech stack, headcount & revenue.", href: "/platform/lead-finder", icon: Search, badge: "480M+ Pool" },
    { title: "Lead discovery", desc: "contact search combining 15+ data partners with live MX & SMTP inbox validation.", href: "/platform/data-Contact Search", icon: Sparkles, badge: "99.4% Valid" },
    { title: "Email Outreach", desc: "Scale personalized cold email with multi-inbox rotation, dynamic spintax, and automated peer warmup.", href: "/platform/email-outreach", icon: Mail, badge: "Multi-Inbox" },
    { title: "LinkedIn Automation", desc: "100% safe social selling using official versioned OAuth API and dedicated static IP proxies.", href: "/platform/linkedin-automation", icon: Linkedin, badge: "Official API" },
    { title: "Voice AI SDR", desc: "Deploy conversational WebRTC Voice AI SDRs that qualify prospects and book calendar meetings in sub-400ms.", href: "/platform/voice-ai", icon: PhoneCall, badge: "Sub-400ms" },
    { title: "Unified CRM", desc: "Unified contact timeline and deals pipeline running directly on your workspace schema with 0 sync drift.", href: "/platform/crm", icon: Building2, badge: "0-Sync" },
    { title: "Workflow Automation", desc: "Visual multi-step trigger and action graph orchestrating multi-channel touches on live prospect intent.", href: "/platform/workflow-automation", icon: Workflow, badge: "Visual Graph" },
    { title: "Freelance Bidding AI", desc: "24/7 autonomous bidding agents that scan Upwork & Freelancer feeds and submit tailored proposals in < 3 mins.", href: "/platform/ai-agents", icon: Zap, badge: "Upwork AI" },
    { title: "AI Sales Agents", desc: "Autonomous SDR agents that conduct pre-call prospect research, craft spintax variations, and draft replies.", href: "/platform/ai-agents", icon: Cpu, badge: "GenAI" },
    { title: "Revenue Analytics", desc: "Cross-channel revenue attribution connecting campaign touchpoints directly to closed-won deals.", href: "/platform/analytics", icon: BarChart3, badge: "Attribution" }
  ];

  // Personas Data
  const PERSONAS = [
    {
      role: "Sales Teams & SDRs",
      icon: Users,
      headline: "Give Your Reps More Selling Time",
      desc: "Eliminate 80% of repetitive prospecting, list-cleaning, and manual follow-up work. SDRs get pre-qualified leads and automated multi-channel sequences.",
      metric: "+320% Meetings Booked",
      link: "/solutions/sales-teams"
    },
    {
      role: "Founders & Solo Reps",
      icon: Briefcase,
      headline: "Build an Enterprise Outbound Engine Solo",
      desc: "Generate predictable outbound pipeline without hiring a 5-person sales development team or managing 6 separate SaaS subscriptions.",
      metric: "Save $1,400/mo in Tools",
      link: "/solutions/founders"
    },
    {
      role: "Lead Gen Agencies",
      icon: Building2,
      headline: "Run 50+ Client Portals From One Login",
      desc: "White-label custom domains (app.youragency.com), isolated client workspaces, shared master credit wallets, and unified multi-client reporting.",
      metric: "50+ Client Portals",
      link: "/solutions/agencies"
    },
    {
      role: "Recruiters & Talent Teams",
      icon: Search,
      headline: "Engage Passive Top 1% Candidates",
      desc: "Find verified personal phone numbers and work emails of software engineers, executives, and specialists with automated multi-touch sequences.",
      metric: "88% Response Rate",
      link: "/solutions/recruiters"
    },
    {
      role: "Marketing Teams",
      icon: TrendingUp,
      headline: "Align Demand Gen with Real Outbound",
      desc: "Feed webinar attendees, content downloaders, and website visitors directly into automated outbound cadences with zero webhook latency.",
      metric: "100% Intent Captured",
      link: "/solutions/enterprise"
    },
    {
      role: "RevOps Leaders",
      icon: Sliders,
      headline: "One Single PostgreSQL Source of Truth",
      desc: "Say goodbye to Zapier sync loops, mismatched CRM IDs, and fragmented revenue reporting. One schema powers your entire outreach stack.",
      metric: "0ms Webhook Lag",
      link: "/solutions/revops"
    }
  ];

  // Detailed Platform FAQs
  const PLATFORM_FAQS = [
    {
      q: "What is Outtricks?",
      a: "Outtricks is a unified AI Revenue Operating System that combines B2B lead generation, Lead Lead Search, cold email outreach, LinkedIn automation, conversational Voice AI SDRs, CRM, freelance bidding, and revenue analytics on a single connected database schema."
    },
    {
      q: "What channels does Outtricks support natively?",
      a: "Outtricks natively supports 6 connected revenue channels: (1) Cold Email with multi-inbox rotation, (2) LinkedIn safe API messaging, (3) Sub-400ms conversational Voice AI SDR calls, (4) 480M+ verified B2B prospecting, (5) 24/7 Upwork & Freelancer bidding AI, and (6) Unified Deals Pipeline CRM."
    },
    {
      q: "How does the single database architecture benefit our team?",
      a: "Traditional sales stacks use 5 to 7 disconnected tools tied together with Zapier webhooks, leading to sync errors, duplicated contacts, and delayed follow-ups. Outtricks runs every channel on a single PostgreSQL schema. When an email is opened or a Voice AI call completes, your CRM and LinkedIn sequences update immediately with 0ms sync drift."
    },
    {
      q: "Can Outtricks automate cross-channel follow-ups?",
      a: "Yes. Using the visual Workflow Automation graph, you can build condition-based sequences such as: 'Send Cold Email Step 1 → If opened 3x but no reply after 48h → Dispatch Voice AI SDR Call → If prospect agrees to meeting → Automatically book Google Calendar slot and move CRM deal to Qualified'."
    },
    {
      q: "Is Outtricks suitable for lead generation agencies?",
      a: "Absolutely. Outtricks includes built-in multi-client workspace isolation, custom white-label client portals (e.g. app.youragency.com), master credit pooling, and aggregated multi-account reporting so agencies can scale dozens of client campaigns without tool chaos."
    },
    {
      q: "Can Outtricks connect with our existing tools?",
      a: "Yes. Outtricks natively integrates with Google Workspace, Microsoft 365, Salesforce, HubSpot, Slack, Pipedrive, webhook triggers, and REST APIs for bi-directional data synchronization."
    },
    {
      q: "How does Outtricks use AI safely across outreach?",
      a: "Outtricks applies specialized AI models tailored to each motion: dynamic spintax & personalized icebreakers for email, human-like voice synthesis with conversational latency (<400ms) for Voice SDR calls, and real-time proposal generation for freelance bidding."
    },
    {
      q: "How does the 7-day free trial work?",
      a: "The 7-day free trial gives your team full access to all 6 revenue engines, 1,500 lead unlocks, multi-inbox setup, and Voice AI credits with no credit card required. You can upgrade, change plans, or cancel anytime."
    },
    {
      q: "What makes Outtricks different from Apollo, Instantly, or Smartlead?",
      a: "While single-purpose tools only provide email or database search, Outtricks eliminates tool sprawl by consolidating database, email warmup, official LinkedIn API, voice calling AI, visual graph automations, and CRM pipeline into one cohesive workspace for a fraction of the cost ($79/mo vs $1,400+/mo)."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks Platform | Unified AI Revenue Operating System"
        description="Explore Outtricks 6 synchronized outbound engines: 480M+ lead discovery, multi-inbox email, LinkedIn automation, Voice AI SDR, CRM, and flow automation."
        canonical="https://outtricks.com/platform"
        keywords={["AI revenue platform","outbound platform","sales automation engine","unified sales platform"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"}]}
      />
      
      {/* HERO SECTION */}
      <section className="relative text-center max-w-4xl mx-auto space-y-7 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-indigo-400 animate-ping" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            THE UNIFIED AI REVENUE OPERATING SYSTEM
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
          One Platform.{' '}
          <span className="animated-gradient-text">
            Every Revenue Channel.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          Outtricks brings prospecting, lead generation, cold email, LinkedIn outreach, Voice AI, CRM, and workflow automation into one unified revenue operating system.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#modules"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore Platform</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 480M+ B2B Contacts</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 99.4% Deliverability</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Sub-400ms Voice AI</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 0 Webhook Sync Lag</span>
        </div>
      </section>

      {/* SECTION 1: One Operating System. Every Sales Motion. */}
      <section id="modules" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            COMPLETE CAPABILITIES OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            One Operating System. Every Sales Motion.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click any module below to inspect its dedicated workflow, interactive simulator, and technical architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORM_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Card3DTilt key={idx} maxTilt={6} scale={1.02}>
                <Link
                  to={mod.href}
                  className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-4 group flex flex-col justify-between h-full block"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-[#181818] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A]">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: From Lead to Revenue */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            END-TO-END REVENUE EXECUTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Lead to Revenue in Six Seamless Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click each step below to inspect how Outtricks synchronizes data across every stage of your outbound pipeline.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {WORKFLOW_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setSelectedWorkflowStep(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedWorkflowStep === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'liquid-glass-pill text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        <Card3DTilt maxTilt={4} scale={1.01} className="max-w-5xl mx-auto">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-[#2A2A2A]">
              <div>
                <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  Stage {selectedWorkflowStep + 1} of 6
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-1">
                  {WORKFLOW_STEPS[selectedWorkflowStep].subtitle}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs font-sans font-bold">
                  ● Verified: {WORKFLOW_STEPS[selectedWorkflowStep].metric}
                </span>
                <Link
                  to={WORKFLOW_STEPS[selectedWorkflowStep].actionHref}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>{WORKFLOW_STEPS[selectedWorkflowStep].actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {WORKFLOW_STEPS[selectedWorkflowStep].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {WORKFLOW_STEPS[selectedWorkflowStep].highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl liquid-glass-pill text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </Card3DTilt>
      </section>

      {/* SECTION 3: Six Channels. One Database. */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ARCHITECTURAL ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Six Channels. One Database.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every channel reads and writes to the exact same customer record with 0 sync drift.
          </p>
        </div>

        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 py-4 bg-blue-50/50 dark:bg-white/[0.04] rounded-2xl border border-blue-100/80 dark:border-blue-900/80">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-sans font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>Single PostgreSQL Database Core</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-blue-200 font-medium">
              Zero webhooks · Zero CSV imports · Zero data sync delays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Cold Email", detail: "Multi-Inbox P2P Warmup", icon: Mail, color: "text-blue-500", href: "/platform/email-outreach" },
              { name: "LinkedIn Automation", detail: "Safe OAuth API + Dedicated IP", icon: Linkedin, color: "text-sky-500", href: "/platform/linkedin-automation" },
              { name: "Voice AI SDR", detail: "Conversational Sub-400ms WebRTC", icon: PhoneCall, color: "text-blue-500", href: "/platform/voice-ai" },
              { name: "Lead Generation", detail: "480M+ B2B Contacts", icon: Search, color: "text-cyan-500", href: "/platform/lead-finder" },
              { name: "Freelance Bidding AI", detail: "24/7 Upwork Proposal Engine", icon: Zap, color: "text-amber-500", href: "/platform/ai-agents" },
              { name: "Native Deals CRM", detail: "Unified Contact Activity Timeline", icon: Building2, color: "text-emerald-500", href: "/platform/crm" }
            ].map((ch, i) => {
              const Icon = ch.icon;
              return (
                <Link
                  key={i}
                  to={ch.href}
                  className="liquid-glass-card p-5 rounded-2xl space-y-2.5 block group hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl bg-slate-50 dark:bg-[#181818] ${ch.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-sans text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      Channel 0{i+1} →
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {ch.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{ch.detail}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Let AI Run the Repetitive Work */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AUTONOMOUS SALES EXECUTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let AI Run the Repetitive Work
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Outtricks handles the time-consuming administrative tasks so your sales team can focus 100% on closing conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { task: "Prospect Research", desc: "AI scans company news, tech stacks, and hiring signals to find ready-to-buy prospects automatically.", icon: Search },
            { task: "Lead Qualification", desc: "Voice AI & intent engines qualify inbound and outbound leads before routing them to human reps.", icon: Sparkles },
            { task: "Personalized Outreach", desc: "Generative spintax dynamically personalizes value props, case studies, and tone for each prospect.", icon: Mail },
            { task: "Cross-Channel Follow-Ups", desc: "Multi-step workflows automatically follow up across email and LinkedIn when prospects view messages.", icon: Workflow },
            { task: "Meeting Booking", desc: "AI SDRs negotiate calendar slots during live calls and insert events directly into Google Calendar.", icon: PhoneCall },
            { task: "CRM Auto-Updates", desc: "Every call recording, transcript, sentiment score, and email interaction logs directly into your CRM timeline.", icon: Building2 },
            { task: "Pipeline Management", desc: "Deals advance automatically based on prospect sentiment, reply classifications, and contract signals.", icon: Sliders },
            { task: "Revenue Intelligence", desc: "Automated attribution reports reveal which outreach angles and subject lines generate maximum closed ARR.", icon: BarChart3 }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-6 rounded-3xl shadow-clean space-y-3 h-full">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.task}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Built for Modern Revenue Teams */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            WHO USES OUTTRICKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Modern Revenue Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Card3DTilt key={idx} maxTilt={6}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900">
                        {p.metric}
                      </span>
                    </div>
                    <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">{p.role}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.headline}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                  <Link to={p.link} className="pt-2 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    <span>Inspect Workflows →</span>
                  </Link>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: Before Outtricks vs With Outtricks */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            THE OUTTRICKS ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Before Outtricks vs. With Outtricks
          </h2>
        </div>

        <div className="liquid-glass rounded-3xl shadow-clean overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#181818]/80 border-b border-slate-200/80 dark:border-[#2A2A2A]">
                <th className="py-4 px-6 text-slate-500 dark:text-slate-400 font-sans uppercase text-xs">Without Outtricks (Fragmented Stack)</th>
                <th className="py-4 px-6 bg-blue-50/80 dark:bg-white/[0.04] text-slate-900 dark:text-blue-200 font-extrabold border-x border-blue-100 dark:border-blue-900">With Outtricks (Unified AI Revenue OS)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {[
                { old: "6+ Disjointed subscriptions ($1,400+/mo)", new: "1 Unified platform ($79/mo)" },
                { old: "Manual CSV exports & Zapier sync errors", new: "1 Native PostgreSQL database schema" },
                { old: "Manual prospect prospecting & list cleaning", new: "480M+ Verified database with live Contact Search" },
                { old: "Manual follow-ups & dropped conversations", new: "Automated cross-channel trigger workflows" },
                { old: "Fragmented CRM timelines across tools", new: "Centralized deal pipeline & live attribution" }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{row.old}</span>
                  </td>
                  <td className="py-4 px-6 bg-blue-50/40 dark:bg-white/[0.04] text-slate-900 dark:text-blue-200 font-bold border-x border-blue-100 dark:border-blue-900">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{row.new}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: Platform Performance */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            VERIFIED PLATFORM METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Performance Engineered for Scale
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-sans">$127K+</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Pipeline per Workspace</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1.5">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-sans">99.4%</span>
            <p className="text-xs text-slate-800 dark:text-blue-300 font-medium">Email Deliverability Rate</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1.5">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-sans">14.8×</span>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">Average Client ROI</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1.5">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-sans">&lt;400ms</span>
            <p className="text-xs text-blue-900 dark:text-blue-300 font-medium">Voice AI SDR Latency</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Interactive Platform Demo Sandbox */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LIVE PLATFORM SANDBOX
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore the Interactive Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click across the modules below to test live prospecting, Voice AI call flows, and deals pipeline management.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'lead-finder', label: 'Lead Finder (480M+)' },
            { id: 'voice-ai', label: 'Voice AI SDR' },
            { id: 'crm', label: 'Deals Pipeline CRM' },
            { id: 'automation', label: 'Workflow Graph Engine' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDemoTab(tab.id as any)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeDemoTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'liquid-glass-pill text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-clean">
          {activeDemoTab === 'lead-finder' && <LeadDatabaseSearch />}
          {activeDemoTab === 'voice-ai' && <VoiceSimulator />}
          {activeDemoTab === 'crm' && <DealPipelineKanban />}
          {activeDemoTab === 'automation' && <FlowSimulator />}
        </div>
      </section>

      {/* SECTION 9: Integrations & Infrastructure */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ECOSYSTEM & CONNECTIVITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Integrates With Your Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Native bi-directional integrations and real-time Webhooks for seamless enterprise data sync.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
          {[
            { name: "Google Workspace", detail: "OAuth Inbox Sync" },
            { name: "Microsoft 365", detail: "Graph API Sending" },
            { name: "Salesforce", detail: "Bi-Directional CRM" },
            { name: "HubSpot", detail: "Live Pipeline Sync" },
            { name: "Slack", detail: "Real-Time Alerts" },
            { name: "Pipedrive", detail: "Deal Activity Feed" },
            { name: "Stripe / Paddle", detail: "Revenue Webhooks" },
            { name: "Zapier & Webhooks", detail: "Custom REST APIs" }
          ].map((app, idx) => (
            <div key={idx} className="liquid-glass-card p-4 rounded-2xl space-y-1 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-xs font-bold font-sans">
                {app.name.charAt(0)}
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">{app.name}</h4>
              <p className="text-[10px] text-slate-400">{app.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            PLATFORM ARCHITECTURE FAQ
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {PLATFORM_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="liquid-glass-card rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-[#2A2A2A] pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11: Final Platform CTA */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-14 text-white space-y-6 border border-blue-900/60 shadow-2xl relative overflow-hidden text-center backdrop-blur-md">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-indigo-400/30 text-blue-300 text-xs font-sans font-bold uppercase tracking-wider">
            YOUR NEXT REVENUE ENGINE STARTS HERE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Build Your Revenue Engine With Outtricks
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Consolidate your outbound tools. Find high-value prospects, launch cold email and LinkedIn sequences, deploy Voice AI SDRs, and close more pipeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] text-slate-900 dark:text-white font-extrabold text-xs hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
            >
              <span>Start Free 7-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-800/80 text-white font-bold text-xs hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <span>Schedule Platform Demo</span>
            </Link>
          </div>

          <div className="text-[11px] text-slate-400 font-sans pt-2">
            No credit card required • Cancel anytime • 7-Day Free Trial
          </div>
        </div>
      </section>

    </div>
  );
};


