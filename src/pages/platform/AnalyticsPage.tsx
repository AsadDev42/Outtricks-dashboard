import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Layers, 
  Zap, 
  PieChart, 
  Globe,
  Target,
  Clock,
  Sparkles
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// 7-Step Interactive Customer Revenue Journey
const JOURNEY_NODES = [
  {
    id: 0,
    label: "Lead",
    fullName: "Lead Found",
    channel: "Prospecting",
    icon: Search,
    time: "Day 1 - 09:15 AM",
    title: "1. ICP Lead Match: Sarah Jenkins (VP Product @ Stripe)",
    details: "Identified via 8D targeting filters. Verified work email with 100% deliverability score and technographic signal match.",
    weight: "15% First-Touch Weight",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 1,
    label: "Email",
    fullName: "Email Outreach",
    channel: "Cold Email",
    icon: Mail,
    time: "Day 1 - 10:30 AM",
    title: "2. Cold Email Delivered & Opened (2x)",
    details: "Dispatched from mailbox-04 with personalized spintax token. Sarah opened the sequence and viewed the attached case study.",
    weight: "20% Multi-Touch Weight",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 2,
    label: "LinkedIn",
    fullName: "LinkedIn Touch",
    channel: "LinkedIn API",
    icon: Linkedin,
    time: "Day 3 - 02:45 PM",
    title: "3. Connection Accepted & Profile View",
    details: "Connection invite accepted via safe OAuth API. Sarah visited the Outtricks customer success page via LinkedIn post share.",
    weight: "15% Multi-Touch Weight",
    badgeColor: "text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-900"
  },
  {
    id: 3,
    label: "Voice AI",
    fullName: "Voice AI SDR",
    channel: "Voice AI SDR",
    icon: PhoneCall,
    time: "Day 4 - 11:20 AM",
    title: "4. Sub-400ms Qualifying Call (02m 14s)",
    details: "Voice SDR qualified budget ($40K+) and automatically scheduled an executive demo on the AE's sales calendar.",
    weight: "25% Multi-Touch Weight",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 4,
    label: "Meeting",
    fullName: "Meeting Held",
    channel: "AE Calendar",
    icon: Calendar,
    time: "Day 7 - 02:00 PM",
    title: "5. Live Product Demo Conducted",
    details: "AE conducted 30-min product walkthrough. Security and single-tenant database governance approved by procurement.",
    weight: "10% Multi-Touch Weight",
    badgeColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900"
  },
  {
    id: 5,
    label: "Opportunity",
    fullName: "Opportunity Created",
    channel: "Deals CRM",
    icon: Building2,
    time: "Day 10 - 04:00 PM",
    title: "6. Enterprise Deal Created ($48,000 ARR)",
    details: "Advanced to 'Proposal' stage with 82% win probability based on conversational intent and executive sponsorship.",
    weight: "15% Pipeline Weight",
    badgeColor: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/70 border-cyan-200 dark:border-cyan-900"
  },
  {
    id: 6,
    label: "Won",
    fullName: "Closed Won Deal",
    channel: "Revenue Engine",
    icon: DollarSign,
    time: "Day 18 - 05:30 PM",
    title: "7. Signed 1-Year Enterprise Contract ($48K)",
    details: "Payment processed via Stripe. 100% closed-won revenue reconciled and attributed across all 6 preceding touchpoints.",
    weight: "100% Attributed ARR",
    badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-900"
  }
];

export const AnalyticsPage: React.FC = () => {
  const [heroSelectedStep, setHeroSelectedStep] = useState<number>(3); // Voice AI default
  const [journeySelectedStep, setJourneySelectedStep] = useState<number>(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroStep = JOURNEY_NODES[heroSelectedStep];
  const journeyStep = JOURNEY_NODES[journeySelectedStep];

  const FAQS = [
    {
      q: "What is cross-channel attribution?",
      a: "Cross-channel attribution is the science of tracking and measuring every touchpoint—from the first cold email open and LinkedIn connection to Voice AI calls and CRM deal creation—to determine exactly which channels and campaigns generate pipeline and closed-won revenue."
    },
    {
      q: "Which channels can Outtricks track?",
      a: "Outtricks tracks all 6 native outbound channels in real time: Cold Email (Google & Microsoft inboxes), LinkedIn outreach, Voice AI SDR phone calls, B2B Database queries, Upwork/Freelance proposals, and native CRM deal stages."
    },
    {
      q: "Can I see the complete prospect journey?",
      a: "Yes. Because Outtricks operates on a single PostgreSQL schema, every interaction writes directly to the contact's unified timeline. You can trace any closed won deal back through every email opened, call transcript, and demo held."
    },
    {
      q: "How does Outtricks attribute revenue?",
      a: "Outtricks supports customizable attribution models including Multi-Touch (W-Shaped and U-Shaped), First-Touch, Last-Touch, and Linear Attribution, giving appropriate revenue weight to the touchpoints that initiated, nurtured, and closed the deal."
    },
    {
      q: "Can attribution be tracked at campaign level?",
      a: "Yes. You can compare campaign performance side-by-side by meetings generated, qualified pipeline, cost per meeting, and closed ARR to know exactly where to scale budget."
    },
    {
      q: "Does it work with CRM data?",
      a: "Yes. Outtricks CRM data is natively unified with outreach channels with 0ms sync drift. You can also export attribution reports or sync revenue data bidirectionally with Salesforce and HubSpot."
    },
    {
      q: "Can I compare Email, LinkedIn, and Voice AI performance?",
      a: "Yes. The Revenue by Channel dashboard breaks down pipeline influenced, meeting conversion rates, and closed ARR across all outreach channels in real time."
    },
    {
      q: "How does multi-touch attribution work?",
      a: "Multi-touch attribution distributes revenue credit proportionally across every verified touchpoint in the buyer journey, ensuring you understand how top-of-funnel email, mid-funnel LinkedIn nurturing, and bottom-of-funnel Voice AI calls work together."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Multi-Touch Revenue Attribution & Sales Analytics | Outtricks"
        description="Attribute closed pipeline revenue back to specific campaigns, inboxes, phone calls, and LinkedIn touches."
        canonical="https://outtricks.com/platform/analytics"
        keywords={["revenue attribution","outbound analytics","sales pipeline reporting","conversion tracking"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Analytics & Attribution","url":"/platform/analytics"}]}
      />
      
      {/* =========================================================================
          1. HERO SECTION: CROSS-CHANNEL ATTRIBUTION
          ========================================================================= */}
      <section className="relative pt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                CROSS-CHANNEL ATTRIBUTION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              See What{' '}
              <span className="animated-gradient-text">
                Actually Drives Revenue
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Connect every touchpoint across email, LinkedIn, Voice AI, and CRM to understand which channels and campaigns create real pipeline and revenue.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Attribution</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Small Trust Line */}
            <div className="pt-2 text-xs font-sans text-slate-500 dark:text-slate-400">
              Full Multi-Touch Modeling • Single Event Stream • 0ms Sync Drift
            </div>

          </div>

          {/* Right Column: Clean Interactive Customer Journey Flow (Spans 6 cols) */}
          <div className="lg:col-span-6">
            <Card3DTilt maxTilt={4} scale={1.01}>
              <div className="liquid-glass rounded-3xl p-6 sm:p-7 shadow-clean space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                      Live Prospect Attribution Path
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Sarah Jenkins (VP Product @ Stripe)
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-sans font-bold">
                    $48K Won
                  </span>
                </div>

                {/* 7-Step Interactive Node Bar: Lead → Email → LinkedIn → Voice AI → Meeting → Opportunity → Won */}
                <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar text-center">
                  {JOURNEY_NODES.map((node, idx) => {
                    const Icon = node.icon;
                    const isSelected = heroSelectedStep === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setHeroSelectedStep(idx)}
                        className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer flex-1 min-w-[44px] sm:min-w-[50px] ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                            : 'liquid-glass-card hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                        title={node.fullName}
                      >
                        <div className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-[#181818] text-blue-600 dark:text-blue-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-[10px] block truncate pt-1">{node.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Details Box */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-100 dark:border-blue-900/60 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-900 dark:text-blue-200 font-bold">
                    <span>{heroStep.title}</span>
                    <span className="font-sans text-[10px] text-slate-500">{heroStep.time}</span>
                  </div>
                  <p className="text-slate-800 dark:text-blue-300 leading-relaxed text-[11px]">
                    {heroStep.details}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-sans text-blue-600 dark:text-blue-400">
                    <span>Medium: {heroStep.channel}</span>
                    <span className="font-bold">{heroStep.weight}</span>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </section>

      {/* =========================================================================
          2. ATTRIBUTION OVERVIEW (3 Core Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE CLARITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            One Customer Journey. Every Revenue Touchpoint.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Stop guessing which channel drove the demo. Outtricks tracks the entire prospect lifecycle under one connected roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Channel Attribution",
              desc: "See which channels influence pipeline and closed revenue with multi-touch weighting across Email, LinkedIn, Voice AI, and CRM.",
              icon: PieChart
            },
            {
              title: "Campaign Performance",
              desc: "Compare campaigns by meetings, opportunities, and revenue generated to allocate budget where conversion velocity is highest.",
              icon: TrendingUp
            },
            {
              title: "Contact-Level Journey",
              desc: "Follow every interaction from first touch to closed deal on a unified timeline with zero manual data entry or sync errors.",
              icon: Target
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-8 rounded-3xl shadow-clean space-y-3 h-full">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE REVENUE JOURNEY: TRACE EVERY DEAL BACK TO ITS SOURCE
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DEAL PROVENANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trace Every Deal Back to Its Source
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click any step along the conversion timeline below to inspect touchpoint metadata and multi-channel attribution weight.
          </p>
        </div>

        {/* 7 Connected Step Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {JOURNEY_NODES.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setJourneySelectedStep(idx)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                journeySelectedStep === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'liquid-glass-pill text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span className="font-sans opacity-80">{idx + 1}.</span>
              <span>{st.fullName}</span>
            </button>
          ))}
        </div>

        {/* Detailed Connected Timeline Box */}
        <Card3DTilt maxTilt={3} scale={1.01} className="max-w-4xl mx-auto">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold font-sans">
                  0{journeySelectedStep + 1}
                </span>
                <div>
                  <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                    Channel: {journeyStep.channel}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {journeyStep.title}
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold self-start sm:self-center">
                {journeyStep.weight}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {journeyStep.details}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans pt-2">
              <div className="p-3 rounded-xl liquid-glass-pill">
                <span className="text-[10px] text-slate-400 block">Timestamp</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{journeyStep.time}</span>
              </div>
              <div className="p-3 rounded-xl liquid-glass-pill">
                <span className="text-[10px] text-slate-400 block">Touchpoint Medium</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{journeyStep.channel}</span>
              </div>
              <div className="p-3 rounded-xl liquid-glass-pill">
                <span className="text-[10px] text-slate-400 block">Attributed Outcome</span>
                <span className="font-bold text-emerald-600">Pipeline Advanced</span>
              </div>
            </div>

          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          4. REVENUE ATTRIBUTION DASHBOARD: TURN ACTIVITY INTO REVENUE INTELLIGENCE
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Turn Activity Into Revenue Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Real metrics connecting prospecting volume directly to closed-won ARR across every channel and campaign.
          </p>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-slate-900 dark:text-white">$485,000</span>
            <p className="text-xs text-slate-500 font-medium">Pipeline Influenced</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-blue-600 dark:text-blue-400">84</span>
            <p className="text-xs text-slate-800 dark:text-blue-300 font-medium">Meetings Generated</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-emerald-600">28.4%</span>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">Conversion Rate</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-blue-600">$184,000</span>
            <p className="text-xs text-blue-900 dark:text-blue-300 font-medium">Closed Won ARR</p>
          </div>
        </div>

        {/* 1. Revenue by Channel Table */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-clean max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Revenue by Channel</h3>
            <span className="text-xs font-sans text-slate-500">Live Q3 Channel Breakdown</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-sans border-b border-slate-200/60 dark:border-[#2A2A2A]">
                  <th className="pb-3">Channel</th>
                  <th className="pb-3">Sent / Touched</th>
                  <th className="pb-3">Meetings</th>
                  <th className="pb-3">Pipeline Influenced</th>
                  <th className="pb-3">Closed Won ARR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {[
                  { channel: "Cold Email (Multi-Inbox)", sent: "24,800 sent", meetings: "38", pipeline: "$192,000", revenue: "$74,000", color: "text-blue-600" },
                  { channel: "Voice AI SDR (WebRTC)", sent: "1,420 calls", meetings: "26", pipeline: "$148,000", revenue: "$58,000", color: "text-blue-600" },
                  { channel: "LinkedIn Safe API", sent: "3,100 invites", meetings: "14", pipeline: "$98,000", revenue: "$36,000", color: "text-sky-600" },
                  { channel: "Freelance Bidding AI", sent: "185 proposals", meetings: "6", pipeline: "$47,000", revenue: "$16,000", color: "text-amber-600" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className={`py-3.5 font-bold ${row.color}`}>{row.channel}</td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-400">{row.sent}</td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{row.meetings}</td>
                    <td className="py-3.5 text-blue-600 dark:text-blue-400 font-bold">{row.pipeline}</td>
                    <td className="py-3.5 text-emerald-600 font-bold">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Revenue by Campaign Table */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-clean max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Revenue by Campaign</h3>
            <span className="text-xs font-sans text-slate-500">Top Outbound Sequences</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-sans border-b border-slate-200/60 dark:border-[#2A2A2A]">
                  <th className="pb-3">Campaign Name</th>
                  <th className="pb-3">Target ICP</th>
                  <th className="pb-3">Meetings</th>
                  <th className="pb-3">Win Rate</th>
                  <th className="pb-3">Attributed ARR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                {[
                  { name: "US Series B FinTech - VPs", icp: "VP Product / Eng", meetings: "28", winRate: "32.1%", revenue: "$96,000", color: "text-blue-600 dark:text-blue-400" },
                  { name: "EMEA HealthTech Scalers", icp: "Head of Growth", meetings: "22", winRate: "28.5%", revenue: "$52,000", color: "text-blue-600" },
                  { name: "Enterprise B2B SaaS Founders", icp: "CEOs & Founders", meetings: "18", winRate: "26.0%", revenue: "$36,000", color: "text-blue-600" }
                ].map((camp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className={`py-3.5 font-bold ${camp.color}`}>{camp.name}</td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-400">{camp.icp}</td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{camp.meetings}</td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-400">{camp.winRate}</td>
                    <td className="py-3.5 text-emerald-600 font-bold">{camp.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* =========================================================================
          5. MULTI-TOUCH ATTRIBUTION: UNDERSTAND THE FULL PATH TO CONVERSION
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ATTRIBUTION METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Understand the Full Path to Conversion
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Choose the attribution lens that best matches your sales cycle and team structure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "First-Touch Attribution",
              desc: "Know what introduced the prospect. Gives full credit to the initial outreach touchpoint that sparked first discovery.",
              icon: Target
            },
            {
              title: "Multi-Touch Attribution",
              desc: "Understand how multiple interactions contributed. Distributes revenue weight across email opens, LinkedIn touches, and Voice AI calls.",
              icon: Layers
            },
            {
              title: "Revenue Attribution",
              desc: "Connect those interactions to actual closed revenue in your CRM with exact contract value reconciliation.",
              icon: DollarSign
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-8 rounded-3xl shadow-clean space-y-3 h-full">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. INTEGRATIONS: CONNECT EVERY REVENUE CHANNEL
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CONNECTED ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect Every Revenue Channel
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Outtricks natively attributes events across all your core revenue channels.
          </p>
        </div>

        {/* Integration Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto text-center">
          {[
            { label: "Email Outreach", icon: Mail, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
            { label: "LinkedIn API", icon: Linkedin, color: "text-sky-600 bg-sky-50 dark:bg-sky-950" },
            { label: "Voice AI SDR", icon: PhoneCall, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
            { label: "Unified CRM", icon: Building2, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
            { label: "Campaigns", icon: Zap, color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
            { label: "Website Events", icon: Globe, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl liquid-glass-card space-y-2 group hover:scale-105 transition-transform">
                <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. FINAL CTA: STOP GUESSING WHICH CHANNELS WORK
          ========================================================================= */}
      <section className="max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-8 sm:p-14 shadow-clean text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold uppercase tracking-wider">
            CONFIDENT REVENUE GROWTH
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Stop Guessing Which Channels Work
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            See the complete revenue journey and invest more confidently in the channels that actually create pipeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book a Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION (8 Page-Specific Accordion Questions)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            ATTRIBUTION FAQ
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {FAQS.map((faq, idx) => {
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

    </div>
  );
};

