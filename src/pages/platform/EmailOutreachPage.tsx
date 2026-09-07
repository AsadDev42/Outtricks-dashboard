import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Send, 
  BarChart3, 
  Layers, 
  RotateCw, 
  Users, 
  Sliders, 
  Building2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  RefreshCw, 
  Calendar, 
  Eye, 
  FileText,
  Filter,
  Inbox,
  UserCheck,
  TrendingUp,
  Globe
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// Inboxes for Hero Visual
const CONNECTED_INBOXES = [
  { id: 'inbox-1', email: 'alex@outtricks-growth.io', provider: 'Google Workspace', status: 'Healthy', sentToday: 62, dailyLimit: 75, health: 99.6 },
  { id: 'inbox-2', email: 'alex.vance@company-outbound.tech', provider: 'Google Workspace', status: 'Healthy', sentToday: 58, dailyLimit: 75, health: 99.4 },
  { id: 'inbox-3', email: 'a.vance@enterprise-scale.co', provider: 'Microsoft 365', status: 'Healthy', sentToday: 64, dailyLimit: 75, health: 99.2 },
  { id: 'inbox-4', email: 'alex@growth-engine-hq.net', provider: 'Microsoft 365', status: 'Healthy', sentToday: 56, dailyLimit: 75, health: 99.5 }
];

// 4-Step Email Sequence
const SEQUENCE_STEPS = [
  {
    step: "01",
    name: "Initial Value Proposition",
    timing: "Day 1 - 09:30 AM",
    subject: "{{first_name}} / scaling outbound deliverability",
    preview: "Hi {{first_name}}, noticed {{company}} is expanding your SDR team. Most growth leaders struggle with 20+ disconnected mailboxes landing in spam. Outtricks handles multi-inbox rotation and 99.4% inbox placement on a single database. Open to a 10-min intro this Thursday?",
    condition: "Dispatched from rotating healthy mailbox",
    metric: "64.8% Open • 8.2% Reply"
  },
  {
    step: "02",
    name: "Threaded Value-Add Follow-up",
    timing: "Day 3 - 10:15 AM (Threaded Reply)",
    subject: "Re: {{first_name}} / scaling outbound deliverability",
    preview: "Quick follow-up {{first_name}} — here is a 2-minute breakdown of how Stripe and Ramp unified their cold email infrastructure with 0ms sync drift. Would this be relevant for your team?",
    condition: "Triggered if no reply within 48 hours",
    metric: "48.2% Open • 14.6% Reply"
  },
  {
    step: "03",
    name: "Customer Social Proof",
    timing: "Day 6 - 02:00 PM (Threaded Reply)",
    subject: "Re: {{first_name}} / scaling outbound deliverability",
    preview: "Hey {{first_name}}, saw {{company}} recently rolled out new enterprise features. Datasync generated $148K in qualified pipeline during their first 30 days using our automated multi-inbox cadences. Free for a quick demo tomorrow?",
    condition: "Triggered if no reply to Step 2",
    metric: "36.4% Open • 9.8% Reply"
  },
  {
    step: "04",
    name: "Graceful Break-Up",
    timing: "Day 10 - 11:00 AM (Threaded Reply)",
    subject: "Re: {{first_name}} / scaling outbound deliverability",
    preview: "Assuming multi-inbox cold email automation isn't top priority for {{company}} right now, {{first_name}}. I'll pause outreach here. If things change in Q4, feel free to grab a time directly on my calendar: [link].",
    condition: "Final sequence wrap-up",
    metric: "28.5% Open • 5.4% Reply"
  }
];

export const EmailOutreachPage: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<'saas' | 'agency' | 'enterprise'>('saas');
  const [selectedSequenceIndex, setSelectedSequenceIndex] = useState<number>(0);
  const [selectedInboxIndex, setSelectedInboxIndex] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentSequence = SEQUENCE_STEPS[selectedSequenceIndex];
  const activeInbox = CONNECTED_INBOXES[selectedInboxIndex];

  const FAQS = [
    {
      q: "What is multi-inbox rotation and why is it important?",
      a: "Multi-inbox rotation distributes your total cold email volume across multiple connected email accounts and secondary domains. Instead of sending 300 emails from a single address (which triggers spam filters), Outtricks sends 30–50 emails across 6–10 inboxes, ensuring maximum inbox deliverability and domain safety."
    },
    {
      q: "How many inboxes can I connect to Outtricks?",
      a: "You can connect unlimited Google Workspace, Microsoft 365, and custom SMTP/IMAP inboxes on all Outtricks plans. There are no artificial mailbox limits."
    },
    {
      q: "Does Outtricks support Google Workspace and Microsoft 365?",
      a: "Yes. We support 1-click OAuth integration for both Google Workspace and Microsoft 365, as well as any standard SMTP/IMAP mail server with custom port configurations."
    },
    {
      q: "How does automated warmup work?",
      a: "Outtricks connects your inboxes to our private network of thousands of verified active business mailboxes. The system gradually exchanges peer-to-peer emails, marks them as important, rescues any test messages from spam, and builds pristine domain reputation over 14 days."
    },
    {
      q: "How does Outtricks prevent emails from landing in spam?",
      a: "Outtricks utilizes custom spintax generation, automated sending throttling (randomized 45–180 second delays), automated DNS health verification (SPF, DKIM, DMARC), and native contact suppression to ensure 99%+ deliverability."
    },
    {
      q: "Can I manage replies from all inboxes in one place?",
      a: "Yes. Our Master Unified Inbox aggregates incoming replies across all your connected domains into a single workspace, complete with AI sentiment tagging and 1-click calendar scheduling."
    },
    {
      q: "Does Outtricks support Spintax and dynamic variables?",
      a: "Yes. Outtricks supports advanced nested spintax (e.g. `{Hi | Hello | Hey} {{first_name}}`) along with 20+ dynamic prospect and company variables (e.g. `{{pain_point}}`, `{{tech_stack}}`, `{{recent_news}}`)."
    },
    {
      q: "What happens when a prospect replies to an email?",
      a: "The moment a prospect replies, Outtricks automatically halts all future sequence steps across all connected channels (Email, LinkedIn, and Voice AI) and tags the conversation in your CRM."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Multi-Inbox Cold Email Outreach & Automated Warmup | Outtricks"
        description="Scale cold email volume safely with unlimited inboxes, peer-to-peer warmup, dynamic spintax, and 99.4% inbox placement."
        canonical="https://outtricks.com/platform/multi-inbox-email-outreach"
        keywords={["multi-inbox cold email","automated email warmup","inbox placement","cold email software","spintax email generator"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Multi-Inbox Outreach","url":"/platform/multi-inbox-email-outreach"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: MULTI-INBOX EMAIL OUTREACH
          ========================================================================= */}
      <section className="relative pt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                MULTI-INBOX EMAIL OUTREACH
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              Scale Cold Email{' '}
              <span className="animated-gradient-text">
                Without Scaling the Complexity
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Connect multiple sending inboxes, launch personalized campaigns, distribute outreach automatically, and manage replies from one unified workspace.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Launch a Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Trust Line */}
            <div className="pt-2 text-xs font-sans text-slate-500 dark:text-slate-400">
              Unlimited Inboxes • Automated Warmup • Unified Master Inbox • Spintax AI
            </div>

          </div>

          {/* Right Column: Interactive Multi-Inbox Hero Visual (Spans 6 cols) */}
          <div className="lg:col-span-6">
            <Card3DTilt maxTilt={4} scale={1.01}>
              <div className="liquid-glass rounded-3xl p-6 sm:p-7 shadow-clean space-y-5">
                
                {/* Header Strip with Live Activity Metrics */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                      Campaign Status
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      US FinTech Leaders • 4 Inboxes Rotating
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-sans font-bold">
                    ● Active Sending
                  </span>
                </div>

                {/* 4 Connected Inboxes List */}
                <div className="space-y-2">
                  {CONNECTED_INBOXES.map((box, idx) => {
                    const isSelected = selectedInboxIndex === idx;
                    return (
                      <button
                        key={box.id}
                        onClick={() => setSelectedInboxIndex(idx)}
                        className={`w-full p-3 rounded-2xl transition-all cursor-pointer text-left flex items-center justify-between text-xs border ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-300 dark:border-blue-800 shadow-xs'
                            : 'liquid-glass-card border-slate-200/60 dark:border-[#2A2A2A] hover:border-blue-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-sans font-bold text-[11px]">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{box.email}</span>
                            <span className="text-[10px] text-slate-400 font-sans">{box.provider}</span>
                          </div>
                        </div>

                        <div className="text-right font-sans">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                            {box.sentToday}/{box.dailyLimit} Sent
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{box.health}% Health</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Campaign Performance Summary */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans pt-1">
                  <div className="p-2.5 rounded-xl liquid-glass-pill">
                    <span className="text-[10px] text-slate-400 block">Sent Today</span>
                    <span className="font-bold text-slate-900 dark:text-white">240 Emails</span>
                  </div>
                  <div className="p-2.5 rounded-xl liquid-glass-pill">
                    <span className="text-[10px] text-slate-400 block">Total Replies</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">18 (14.2%)</span>
                  </div>
                  <div className="p-2.5 rounded-xl liquid-glass-pill">
                    <span className="text-[10px] text-slate-400 block">Demos Booked</span>
                    <span className="font-bold text-emerald-600">6 Meetings</span>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </section>

      {/* =========================================================================
          1. ALL YOUR SENDING INBOXES. ONE CONTROL CENTER. (4 Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            INBOX INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All Your Sending Inboxes. One Control Center.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Scale outreach volume safely without managing dozens of separate logins and dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Unlimited Inbox Connection",
              desc: "Connect unlimited Google Workspace, Microsoft 365, and custom SMTP accounts with 1-click OAuth authentication.",
              icon: Inbox
            },
            {
              title: "Automated Sending Limits",
              desc: "Set per-inbox daily limits (e.g. 40 emails/day) and randomized sending delays to mimic natural human behavior.",
              icon: Sliders
            },
            {
              title: "Continuous Deliverability Health",
              desc: "Real-time monitoring of SPF, DKIM, DMARC, and custom tracking domains to keep mailboxes healthy.",
              icon: ShieldCheck
            },
            {
              title: "Domain Protection & Isolation",
              desc: "Quarantine any mailbox automatically if bounce rates exceed 2%, safeguarding your primary corporate domain.",
              icon: AlertCircle
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-3 h-full">
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
          2. DISTRIBUTE OUTREACH AUTOMATICALLY (Campaign -> Lead Distribution)
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            INTELLIGENT ROTATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Distribute Outreach Automatically
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Outtricks smoothly balances email dispatch across all active inboxes to maximize deliverability.
          </p>
        </div>

        {/* Visual Distribution Flow Canvas */}
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean max-w-5xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
              Campaign: Enterprise Growth (1,000 Prospects)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-sans font-bold">
              ✓ 100% Load Balanced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: "Mailbox 01 (Google)", assigned: "250 Leads", rate: "42/hr", status: "Active" },
              { name: "Mailbox 02 (Google)", assigned: "250 Leads", rate: "38/hr", status: "Active" },
              { name: "Mailbox 03 (M365)", assigned: "250 Leads", rate: "40/hr", status: "Active" },
              { name: "Mailbox 04 (M365)", assigned: "250 Leads", rate: "44/hr", status: "Active" }
            ].map((box, i) => (
              <div key={i} className="p-5 rounded-2xl liquid-glass-card space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{box.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-slate-500">
                  Assigned: <strong className="text-blue-600 dark:text-blue-400">{box.assigned}</strong>
                </div>
                <div className="text-slate-500">
                  Pacing: <strong className="text-slate-800 dark:text-slate-200">{box.rate}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-100 dark:border-blue-900/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 dark:text-slate-300 font-sans">
            <span>Result: Clean sending patterns with 0 spikes, 0 domain reputation penalties, and 99.4% inbox placement.</span>
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0">
              Start Free Trial →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. EVERY EMAIL FEELS 1-TO-1 (Dynamic Personalization & Spintax)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ADVANCED PERSONALIZATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Every Email Feels 1-to-1
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Combine nested spintax with real-time technographics and company signals for hyper-relevant outreach.
          </p>
        </div>

        {/* Persona Switcher & Live Preview */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'saas', label: 'B2B SaaS VP' },
              { id: 'agency', label: 'Lead Gen Agency Founder' },
              { id: 'enterprise', label: 'Enterprise RevOps Leader' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPersona(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedPersona === tab.id
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : 'liquid-glass-pill text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Card3DTilt maxTilt={3} scale={1.01}>
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-clean space-y-4 text-xs font-sans">
              <div className="pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A] flex items-center justify-between text-slate-400">
                <span>Subject: {`{Quick question | Touching base} / scaling outbound deliverability`}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Dynamic Spintax Active</span>
              </div>

              <div className="space-y-3 leading-relaxed text-slate-700 dark:text-slate-200">
                <p>
                  Hi <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1 rounded font-bold">{`{{first_name | Sarah}}`}</span>,
                </p>
                <p>
                  Saw that <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1 rounded font-bold">{`{{company | Stripe}}`}</span> is expanding hiring for your sales engineering team in San Francisco.
                </p>
                <p>
                  Most growth leaders struggle with <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1 rounded font-bold">{`{{pain_point | multi-inbox deliverability}}`}</span> when scaling beyond 10 mailboxes. Outtricks distributes sending across unlimited inboxes with automated warmup and unified reply management on a single PostgreSQL core.
                </p>
                <p>
                  Would you be open to a 10-minute intro this <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 px-1 rounded font-bold">{`{{target_day | Thursday}}`}</span> at 2 PM?
                </p>
              </div>
            </div>
          </Card3DTilt>
        </div>
      </section>

      {/* =========================================================================
          4. BUILD OUTREACH SEQUENCES THAT ADAPT (Email Sequence Visualizer)
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SEQUENCE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Build Outreach Sequences That Adapt
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click a sequence step below to inspect timing, condition triggers, and copy.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SEQUENCE_STEPS.map((st, idx) => (
            <button
              key={st.step}
              onClick={() => setSelectedSequenceIndex(idx)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedSequenceIndex === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'liquid-glass-pill text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span className="font-sans opacity-80">{st.step}.</span>
              <span>{st.name}</span>
            </button>
          ))}
        </div>

        {/* Active Step Details Card */}
        <Card3DTilt maxTilt={3} scale={1.01} className="max-w-4xl mx-auto">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-[#2A2A2A]">
              <div>
                <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  Timing: {currentSequence.timing}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Step {currentSequence.step}: {currentSequence.name}
                </h3>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-sans font-bold self-start sm:self-center">
                {currentSequence.metric}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200 dark:border-[#2A2A2A] text-xs font-sans space-y-2">
              <div className="text-slate-400 pb-1 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                Subject: <strong className="text-slate-800 dark:text-slate-200">{currentSequence.subject}</strong>
              </div>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 pt-1">
                {currentSequence.preview}
              </p>
            </div>

            <div className="text-xs font-sans text-slate-500">
              Condition: <strong className="text-blue-600 dark:text-blue-400">{currentSequence.condition}</strong>
            </div>

          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          5. NEVER LOSE A HIGH-INTENT REPLY (Unified Reply Interface)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            MASTER INBOX
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Never Lose a High-Intent Reply
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            One consolidated inbox for all incoming replies across every mailbox, domain, and campaign.
          </p>
        </div>

        {/* Master Inbox Mockup */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-clean max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Unified Master Inbox</h3>
            <span className="text-xs font-sans text-emerald-600 font-bold">● 4 Unread High-Intent Replies</span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                sender: "Sarah Jenkins (VP Product @ Stripe)",
                inbox: "alex@outtricks-growth.io",
                snippet: "Thanks for reaching out Alex! Let's do a 15-minute call Thursday at 2 PM.",
                tag: "Meeting Request (+0.96)",
                tagColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              },
              {
                sender: "David Miller (Director of Growth @ Datasync)",
                inbox: "alex.vance@company-outbound.tech",
                snippet: "Can you send over your pricing sheet for 20 connected inboxes and API access?",
                tag: "Pricing Question (+0.88)",
                tagColor: "bg-blue-50 text-blue-700 dark:bg-[#1A1A1A] dark:text-blue-300"
              },
              {
                sender: "Elena Rostova (Head of RevOps @ FinTech Scale)",
                inbox: "a.vance@enterprise-scale.co",
                snippet: "Circle back with me next quarter once our new sales hires start.",
                tag: "Snoozed / Q4 Followup",
                tagColor: "bg-slate-100 text-slate-700 dark:bg-[#181818] dark:text-slate-300"
              }
            ].map((reply, i) => (
              <div key={i} className="p-4 rounded-2xl liquid-glass-card space-y-1.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{reply.sender}</span>
                    <span className="text-[10px] text-slate-400 font-sans">via {reply.inbox}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">{reply.snippet}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold shrink-0 self-start sm:self-center ${reply.tagColor}`}>
                  {reply.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. KNOW WHAT'S DRIVING REPLIES (Email Campaign Analytics)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PERFORMANCE METRICS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Know What's Driving Replies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Detailed email campaign metrics without exaggerated claims.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-slate-900 dark:text-white">24,800</span>
            <p className="text-xs text-slate-500 font-medium">Emails Dispatched</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-emerald-600">99.2%</span>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">Delivery Rate</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-blue-600 dark:text-blue-400">14.2%</span>
            <p className="text-xs text-slate-800 dark:text-blue-300 font-medium">Average Reply Rate</p>
          </div>
          <div className="p-6 rounded-3xl liquid-glass-card space-y-1">
            <span className="text-3xl font-black font-sans text-blue-600">38</span>
            <p className="text-xs text-blue-900 dark:text-blue-300 font-medium">Meetings Booked</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BUILT FOR RELIABLE OUTBOUND OPERATIONS (4 Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            OPERATIONAL CONTROLS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Reliable Outbound Operations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Intelligent safety rails engineered to safeguard your sending infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Ramp-Up Scheduling",
              desc: "Automate gradual sending increases from 5 to 50 emails/day over 14 days for newly added inboxes.",
              icon: TrendingUp
            },
            {
              title: "Threaded Follow-ups",
              desc: "Ensure all follow-ups stay within the same email thread for natural context and higher engagement.",
              icon: Layers
            },
            {
              title: "Bounce & Spam Detection",
              desc: "Auto-pause campaigns if hard bounce rates exceed 2% to protect sending domain health.",
              icon: ShieldCheck
            },
            {
              title: "Timezone Smart Delivery",
              desc: "Schedule emails to arrive during your prospect's local business hours (9:00 AM – 4:30 PM).",
              icon: Clock
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-3 h-full">
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
          8. USE CASES (Sales Teams, Agencies, Founders, Recruiters)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            WHO USES OUTTRICKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Outreach Solutions for Every Growth Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Scale multi-channel pipeline with tools tailored to your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Sales Teams",
              desc: "Scale multi-rep outbound pipelines with centralized inbox management and automatic CRM deal logging.",
              tag: "B2B Sales"
            },
            {
              title: "Lead Gen Agencies",
              desc: "Manage multiple client sending infrastructures with separated workspaces, custom domains, and white-label reporting.",
              tag: "Agencies"
            },
            {
              title: "Founders",
              desc: "Generate high-intent enterprise pipeline without hiring a massive SDR team or spending hours on manual outreach.",
              tag: "Founders"
            },
            {
              title: "Recruiters",
              desc: "Reach passive top-tier candidates with hyper-personalized talent outreach sequences that get answered.",
              tag: "Recruiting"
            }
          ].map((uc, idx) => (
            <Card3DTilt key={idx} maxTilt={5}>
              <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {uc.tag}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CTA: TURN EVERY INBOX INTO A REVENUE CHANNEL
          ========================================================================= */}
      <section className="max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-8 sm:p-14 shadow-clean text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold uppercase tracking-wider">
            START SCALING OUTBOUND
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Turn Every Inbox Into a Revenue Channel
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Connect your sending inboxes and launch high-deliverability outbound campaigns in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Launch a Campaign Free</span>
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
          10. FAQ SECTION (Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            EMAIL OUTREACH FAQ
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

