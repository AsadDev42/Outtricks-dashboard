import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Mic, 
  Volume2, 
  Zap, 
  Activity, 
  Clock, 
  Radio, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Layers, 
  Play, 
  Square, 
  ChevronDown, 
  ChevronUp, 
  Server, 
  Globe, 
  Sliders, 
  Cpu,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Check,
  HelpCircle,
  MessageSquare,
  Bot,
  Flame,
  Filter,
  BarChart3,
  Share2,
  Workflow,
  Search,
  Mail,
  Linkedin,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// ============================================================================
// SIMULATOR SCENARIOS DATA
// ============================================================================
interface DialogueLine {
  speaker: 'Voice AI' | 'Customer';
  text: string;
  time: string;
  sentiment?: 'positive' | 'neutral' | 'question';
}

interface ScenarioData {
  id: string;
  name: string;
  badge: string;
  prospect: {
    name: string;
    role: string;
    company: string;
    phone: string;
    avatar: string;
    intent: 'High' | 'Medium';
    qualification: string;
    nextAction: string;
  };
  dialogue: DialogueLine[];
  outcomeSummary: string;
}

const VOICE_SCENARIOS: ScenarioData[] = [
  {
    id: 'speed-to-lead',
    name: 'Inbound Speed-to-Lead',
    badge: 'Under 45s Response',
    prospect: {
      name: 'Sarah Jenkins',
      role: 'VP of Growth',
      company: 'CloudScale AI',
      phone: '+1 (415) 890-2410',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      intent: 'High',
      qualification: 'Qualified - Tier 1 ICP',
      nextAction: 'Book Discovery Demo (Thu 2:00 PM EST)'
    },
    dialogue: [
      { speaker: 'Voice AI', text: 'Hi Sarah, this is Alex with Outtricks. Noticed you just requested our revenue architecture teardown. Did I catch you between meetings?', time: '00:02', sentiment: 'neutral' },
      { speaker: 'Customer', text: 'Hey Alex, yes! We have 12 SDRs and our multi-inbox deliverability dropped below 75% last week. We need a reliable fix.', time: '00:07', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'That makes total sense. Outtricks handles automated mailbox rotation and DNS health checks so deliverability stays at 99.4%. Are you open to a 15-minute technical walkthrough this Thursday at 2 PM?', time: '00:13', sentiment: 'positive' },
      { speaker: 'Customer', text: 'Thursday at 2 PM works. Send the invite to sarah@cloudscale.ai and include our RevOps lead.', time: '00:18', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'Invite is sent to both emails, Sarah. Looking forward to showing you the architecture on Thursday!', time: '00:23', sentiment: 'positive' }
    ],
    outcomeSummary: 'Demo Confirmed for Thursday 2:00 PM EST. Contact tagged "Enterprise ICP" in Deals CRM.'
  },
  {
    id: 'cold-outbound',
    name: 'Outbound Qualification',
    badge: 'Post-Email Trigger',
    prospect: {
      name: 'Marcus Vance',
      role: 'Head of Revenue Operations',
      company: 'Apex Data Labs',
      phone: '+1 (212) 555-0198',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      intent: 'High',
      qualification: 'Qualified - 50+ Seats',
      nextAction: 'Create Deal in Deals CRM ($48K ARR)'
    },
    dialogue: [
      { speaker: 'Voice AI', text: 'Hello Marcus, Alex calling from Outtricks. I saw you opened our teardown on multiAttribute search Contact Search yesterday. Quick question: are your reps still manually exporting CSVs?', time: '00:03', sentiment: 'question' },
      { speaker: 'Customer', text: 'We spend about 10 hours a week cleaning data from Apollo and Clay. Does Outtricks do that automatically?', time: '00:08', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'Exactly. We cascade queries across multiDimensional filters directly on one database with zero manual CSV handling. Would Friday morning work for a quick sandbox demo?', time: '00:14', sentiment: 'positive' },
      { speaker: 'Customer', text: 'Friday at 10 AM EST works. Let us see how the multiAttribute handles mobile dials.', time: '00:19', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'Calendar hold is on your desk for Friday 10 AM. We will test your exact target ICP live.', time: '00:24', sentiment: 'positive' }
    ],
    outcomeSummary: 'Discovery call booked for Friday 10 AM. Deal opportunity created in pipeline.'
  },
  {
    id: 'lead-reactivation',
    name: 'Cold Lead Reactivation',
    badge: 'Stalled Deal Re-engagement',
    prospect: {
      name: 'Elena Rostova',
      role: 'Director of Business Development',
      company: 'Synapse Global',
      phone: '+1 (312) 840-3921',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      intent: 'Medium',
      qualification: 'Re-activated Opportunity',
      nextAction: 'Send Custom Proposal & Assign AE'
    },
    dialogue: [
      { speaker: 'Voice AI', text: 'Hi Elena, Alex from Outtricks checking in. I know your team paused outbound tooling evaluation last quarter. We just released native LinkedIn cloud automation and wanted to see if outbound is back on the radar for Q3?', time: '00:04', sentiment: 'neutral' },
      { speaker: 'Customer', text: 'Hi Alex! Yes, we actually just hired 4 new BDRs and need to equip them with LinkedIn and email tools next month.', time: '00:10', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'Great timing. Our Agency plan lets you provision mailboxes and residential proxies for all 4 reps with zero seat penalty. Can I reconnect you with David, your previous AE?', time: '00:16', sentiment: 'positive' },
      { speaker: 'Customer', text: 'Yes please. Have David send over an updated proposal for 4 seats.', time: '00:20', sentiment: 'positive' },
      { speaker: 'Voice AI', text: 'David has been notified and will email the proposal within 30 minutes. Have a great day, Elena!', time: '00:25', sentiment: 'positive' }
    ],
    outcomeSummary: 'Re-activated stalled lead. Assigned to Senior AE David with updated 4-seat proposal.'
  }
];

// ============================================================================
// CONVERSATION WORKFLOW STAGES
// ============================================================================
const WORKFLOW_STAGES = [
  { step: '01', title: 'Lead Called', desc: 'Triggered automatically by inbound form, email engagement signal, or cadence schedule.', icon: PhoneCall },
  { step: '02', title: 'AI Introduction', desc: 'Natural, low-latency opening greeting referencing the exact prospect context and recent touchpoints.', icon: Radio },
  { step: '03', title: 'Qualification', desc: 'Engages in natural B2B discovery, asking targeted BANT/MEDDPICC criteria without rigid scripts.', icon: Sliders },
  { step: '04', title: 'Questions & Answers', desc: 'Resolves technical, pricing, and integration inquiries using deep enterprise knowledge base embeddings.', icon: MessageSquare },
  { step: '05', title: 'Intent Detection', desc: 'Real-time neural analysis scores intent, buyer urgency, and conversation sentiment instantaneously.', icon: Zap },
  { step: '06', title: 'Appointment / Next Step', desc: 'Queries live sales rep availability and secures confirmed calendar bookings directly during the call.', icon: Calendar },
  { step: '07', title: 'CRM Update', desc: 'Transcripts, audio recordings, deal stages, and follow-up tasks sync to Deals CRM in sub-10ms.', icon: Database }
];

// ============================================================================
// REVENUE AUTOMATION TRIGGERS DATA
// ============================================================================
const AUTOMATION_TRIGGERS = [
  {
    condition: 'Qualified Lead',
    action: 'Create CRM Opportunity',
    desc: 'Automatically establishes a weighted deal in Deals CRM, assigns the appropriate AE, and generates call notes.',
    tag: 'Pipeline Velocity',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  },
  {
    condition: 'Interested Prospect',
    action: 'Book Meeting',
    desc: 'Locks in calendar slot, issues Google/Outlook calendar invites, and sends personalized confirmation via SMS/email.',
    tag: 'Zero Friction',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  {
    condition: 'Follow-Up Required',
    action: 'Add Automated Sequence',
    desc: 'Enrolls the contact into a coordinated 3-touch multi-inbox sequence referencing the exact call conversation.',
    tag: 'Multi-Channel Touch',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
  },
  {
    condition: 'Not Ready Yet',
    action: 'Schedule Future Follow-Up',
    desc: 'Sets automated re-engagement triggers for 30, 60, or 90 days with updated intent checks.',
    tag: 'Pipeline Nurturing',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
  },
  {
    condition: 'Wrong Fit / Disqualified',
    action: 'Suppress from Future Outreach',
    desc: 'Instantaneously applies global suppression across all email domains and LinkedIn accounts to protect sender reputation.',
    tag: 'Brand Protection',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  },
  {
    condition: 'High Intent Detected',
    action: 'Notify Sales Team',
    desc: 'Dispatches instant real-time webhook alerts to Slack and Microsoft Teams for immediate human intervention.',
    tag: 'Instant Alert',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  }
];

// ============================================================================
// 6 OPERATIONAL USE CASES
// ============================================================================
const USE_CASES_DATA = [
  {
    id: 'b2b-qualification',
    title: 'B2B Lead Qualification',
    subtitle: 'Qualify prospects before sending them to sales reps',
    problem: 'Sales representatives waste 60% of their daily calling hours reaching voicemails or speaking with non-decision makers.',
    solution: 'Voice AI conducts intelligent discovery calls to verify team size, tech stack, and budget readiness before handing off.',
    workflow: 'Lead Discovered → Voice AI Qualifies ICP → BANT Criteria Met → Meeting Placed on AE Calendar',
    nextAction: 'Generate qualified deal opportunity in Deals CRM with full audio recording & transcript summary.'
  },
  {
    id: 'inbound-response',
    title: 'Inbound Lead Response',
    subtitle: 'Respond quickly when a high-intent lead enters the pipeline',
    problem: 'Inbound conversion rates drop by 391% when response times exceed 5 minutes after a form submission.',
    solution: 'Voice AI initiates an outbound phone call within 45 seconds of website form submission while interest is peak.',
    workflow: 'Website Demo Request → Webhook Triggers Voice SDR → Sub-400ms Discovery Call → Calendar Demo Confirmed',
    nextAction: 'Instant calendar confirmation dispatched to prospect and notification sent to assigned Account Executive.'
  },
  {
    id: 'appointment-setting',
    title: 'Appointment Setting',
    subtitle: 'Move qualified prospects toward booked meetings',
    problem: 'Email follow-ups often get delayed or lost in spam filters when attempting to coordinate calendar schedules.',
    solution: 'Voice AI handles live scheduling conversationally, offering dynamic time slots and confirming attendance verbally.',
    workflow: 'Email Intent Signal → Voice Call Initiated → Live Availability Checked → Verbal Time Agreement → Calendar Synced',
    nextAction: 'Syncs meeting details to Google Calendar, Microsoft 365, and Deals CRM with zero human intervention.'
  },
  {
    id: 'lead-reactivation',
    title: 'Reactivation of Stalled Leads',
    subtitle: 'Reconnect with older leads that have gone quiet',
    problem: 'Thousands of previously interested leads sit dormant in legacy CRMs without systematic SDR follow-up.',
    solution: 'Autonomous Voice SDRs run conversational re-engagement campaigns to uncover newly opened budget cycles.',
    workflow: 'Stalled Lead Filter (90+ Days) → Re-engagement Call → Re-qualification Check → Revived Pipeline Opportunity',
    nextAction: 'Re-opens opportunity in pipeline, alerts original account owner, and updates intent score.'
  },
  {
    id: 'event-followup',
    title: 'Event & Webinar Follow-Up',
    subtitle: 'Follow up with event attendees and campaign leads',
    problem: 'Post-webinar lead lists take days for sales teams to call manually, losing post-event momentum.',
    solution: 'Voice AI contacts hundreds of attendees concurrently within 2 hours of event completion while topic is top of mind.',
    workflow: 'Webinar Attendance CSV → multiAttribute Phone Validation → Same-Day Voice Follow-Up → High-Intent Demo Booked',
    nextAction: 'Tags attendee engagement level and routes qualified enterprise accounts to specialized product specialists.'
  },
  {
    id: 'customer-screening',
    title: 'Customer Screening & Triage',
    subtitle: 'Collect structured information before routing conversations',
    problem: 'High-volume lead influxes overwhelm specialized engineering and solutions consulting teams.',
    solution: 'Voice AI screens incoming inquiries, answers standard product requirements, and routes enterprise accounts.',
    workflow: 'Inbound Call Received → Intent Categorization → Technical Screening → Intelligent Skill-Based Routing',
    nextAction: 'Transfers live call or schedules priority callback with the precise technical domain expert.'
  }
];

// ============================================================================
// 9 COMPREHENSIVE FAQS
// ============================================================================
const VOICE_FAQS = [
  {
    question: 'What is Outtricks Voice AI?',
    answer: 'Outtricks Voice AI is a real-time conversational voice engine built specifically for B2B outbound and inbound revenue teams. Powered by low-latency WebRTC audio infrastructure and responsive neural speech synthesis, it executes natural, two-way phone conversations for lead qualification, inbound response, appointment booking, and CRM pipeline automation.'
  },
  {
    question: 'How does real-time Voice AI work?',
    answer: 'When a call connects, audio streams in real-time over UDP directly to edge nodes via WebRTC. Low-latency Voice Activity Detection (VAD) captures speech boundaries in milliseconds, streaming text tokens through contextual large language models while synthesizing natural human speech simultaneously. This eliminates the awkward multi-second delay typical of legacy voice bots.'
  },
  {
    question: 'What makes Voice AI feel natural?',
    answer: 'Natural human conversation requires ultra-low latency, fluid interruption handling, and contextual memory. Outtricks Voice AI can be interrupted mid-sentence just like a human: if the prospect speaks, the AI instantly pauses, processes the new input, and adapts its response without robotic stuttering or rigid script playback.'
  },
  {
    question: 'Can Voice AI qualify leads?',
    answer: 'Yes. Voice AI dynamically conducts B2B discovery according to your criteria (such as company size, existing software stack, timeline, and decision-maker status). It understands nuanced, indirect answers and extracts structured BANT or MEDDPICC data fields directly into your CRM.'
  },
  {
    question: 'Can Voice AI book meetings?',
    answer: 'Yes. Voice AI connects directly to rep calendars via Google Workspace and Microsoft 365. During the phone conversation, it offers available time slots, confirms timezone compatibility, verbally agrees on a time with the prospect, and dispatches calendar invites with meeting links in real time.'
  },
  {
    question: 'Can Voice AI update CRM records?',
    answer: 'Immediately upon call completion, Outtricks Voice AI generates a structured call summary, sentiment score, full transcript, and audio recording. It updates the prospect status in the native Deals CRM (or synced HubSpot/Salesforce instances) in under 10 milliseconds without requiring manual data entry.'
  },
  {
    question: 'How does Voice AI fit into outbound workflows?',
    answer: 'Voice AI is not an isolated dialer; it is a native stage in the Outtricks revenue operating system. It can be triggered automatically based on prior prospect engagement—for instance, when a prospect opens an outbound email twice or clicks a proposal link, a Voice AI call can be initiated to capitalize on live intent.'
  },
  {
    question: 'Can Voice AI work alongside email and LinkedIn outreach?',
    answer: 'Yes. Outtricks coordinates Voice AI with multi-inbox cold email and cloud LinkedIn automation on a single PostgreSQL database. If a prospect books a meeting on a Voice AI call, Outtricks immediately executes global cross-channel suppression to cancel all future scheduled emails and LinkedIn touches across all accounts.'
  },
  {
    question: 'Can teams test the Voice AI before using it?',
    answer: 'Yes. You can test live conversational voice agents directly in our interactive sandbox or start a 7-Day Free Trial to configure custom call scripts, test voice personas, and simulate real-world customer objection scenarios before launching live campaigns.'
  }
];

export const VoiceAiPage: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('speed-to-lead');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  const [activeUseCaseId, setActiveUseCaseId] = useState<string>('b2b-qualification');

  const currentScenario = VOICE_SCENARIOS.find((s) => s.id === activeScenarioId) || VOICE_SCENARIOS[0];

  // Turn-taking dialogue simulation timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isPlaying) {
      timer = setTimeout(() => {
        setCurrentLineIndex((prev) => (prev + 1) % currentScenario.dialogue.length);
      }, 2800);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentLineIndex, currentScenario.dialogue.length]);

  // Reset dialogue on scenario change
  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setCurrentLineIndex(0);
    setIsPlaying(true);
  };

  const activeLine = currentScenario.dialogue[currentLineIndex] || currentScenario.dialogue[0];
  const isAiSpeaking = activeLine.speaker === 'Voice AI';

  return (
    <div className="space-y-24 sm:space-y-32 pt-20 pb-24 overflow-x-hidden">
      
      {/* 1. SEO Head & Structured Data Schema */}
      <SEOHead 
        title="Voice AI for Sales & Real-Time AI SDR | Outtricks"
        description="Power real-time Voice AI conversations with ultra-low latency audio, responsive turn-taking, and reliable WebRTC infrastructure built for modern revenue teams."
        canonical="https://outtricks.com/platform/voice-ai"
        keywords={[
          'Voice AI for sales',
          'AI voice SDR',
          'sales voice AI',
          'AI sales calls',
          'conversational AI for sales',
          'real-time Voice AI',
          'AI lead qualification',
          'automated sales calls',
          'Voice AI SDR',
          'WebRTC Voice AI'
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Platform', url: 'https://outtricks.com/platform' },
          { name: 'Voice AI', url: 'https://outtricks.com/platform/voice-ai' }
        ]}
        faqs={VOICE_FAQS}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Outtricks Voice AI",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, Cloud",
          "description": "Real-time conversational Voice AI system with sub-400ms WebRTC latency and automated CRM pipeline synchronization.",
          "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD"
          }
        }}
      />

      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE VOICE AI COCKPIT
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Atmosphere Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">Voice AI</span>
          </nav>

          {/* Hero Main Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#2563eb]" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                REAL-TIME VOICE AI
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              AI Conversations That Feel{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Almost Instant
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              Power real-time Voice AI conversations with ultra-low latency audio, responsive turn-taking, and reliable WebRTC infrastructure built for revenue teams.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href="#live-simulator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Test Voice AI</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:border-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>Book a Demo</span>
              </Link>
            </div>

          </div>

          {/* =====================================================================
              HERO VISUAL: REALISTIC INTERACTIVE VOICE AI COCKPIT
              ===================================================================== */}
          <div id="live-simulator" className="pt-4 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-4 sm:p-7 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6">
              
              {/* Cockpit Top Bar: Status, Scenarios & Latency Metrics */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.07] pb-5">
                
                {/* Left: Active Call Status & Timer */}
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0b101f]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-sans uppercase tracking-wider text-slate-900 dark:text-white">Active Call Session</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        Live Full-Duplex
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      Duration: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">01:42</span> • Latency: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">184ms WebRTC</span>
                    </p>
                  </div>
                </div>

                {/* Center: Scenario Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] rounded-2xl">
                  {VOICE_SCENARIOS.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectScenario(scenario.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                        activeScenarioId === scenario.id
                          ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {scenario.name}
                    </button>
                  ))}
                </div>

                {/* Right: Simulation Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#222222] hover:bg-slate-200 dark:hover:bg-[#1e2c50] text-slate-800 dark:text-slate-200 text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200/60 dark:border-[#202020]"
                  >
                    {isPlaying ? <Square className="w-3.5 h-3.5 fill-current text-amber-500" /> : <Play className="w-3.5 h-3.5 fill-current text-emerald-500" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentLineIndex(0); setIsPlaying(true); }}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#222222] hover:bg-slate-200 dark:hover:bg-[#1e2c50] text-slate-600 dark:text-slate-300 transition-all cursor-pointer border border-slate-200/60 dark:border-[#202020]"
                    title="Restart Simulation"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Cockpit Main Grid: Split Live Transcript & Real-Time Context Engine */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Panel (7 Cols): Live Streaming Dialogue & Audio Waveforms */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Speaker State Indicator & Dynamic Audio Waveform */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isAiSpeaking ? 'bg-blue-600 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                          {isAiSpeaking ? 'AI Speaking: Alex (Voice SDR)' : `Customer Speaking: ${currentScenario.prospect.name}`}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                          {isAiSpeaking ? 'Streaming Opus tokens @ 48kHz' : 'Neural VAD detecting voice packet boundaries'}
                        </p>
                      </div>
                    </div>

                    {/* Animated Waveform Visualizer */}
                    <div className="flex items-center gap-1 h-6">
                      {[40, 75, 100, 60, 90, 45, 80, 100, 65, 30].map((height, i) => (
                        <div
                          key={i}
                          style={{ height: `${isPlaying ? Math.max(20, (height * (currentLineIndex % 3 + 1)) / 3) : 25}%` }}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isAiSpeaking ? 'bg-blue-600 dark:bg-blue-400' : 'bg-emerald-500 dark:bg-emerald-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Streaming Dialogue Bubbles */}
                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {currentScenario.dialogue.map((line, idx) => {
                      const isCurrent = idx === currentLineIndex;
                      const isPast = idx < currentLineIndex;
                      const isAi = line.speaker === 'Voice AI';

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl transition-all duration-200 border ${
                            isCurrent
                              ? isAi
                                ? 'bg-blue-50/80 dark:bg-white/[0.04] border-blue-400/40 dark:border-blue-500/40 shadow-xs'
                                : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-400/40 dark:border-emerald-500/40 shadow-xs'
                              : isPast
                              ? 'bg-slate-50/60 dark:bg-[#1C1C1C]/60 border-slate-200/50 dark:border-[#202020] opacity-80'
                              : 'bg-slate-50/20 dark:bg-[#1C1C1C]/20 border-slate-200/20 dark:border-white/[0.02] opacity-40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-bold font-sans uppercase ${isAi ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {line.speaker}
                              </span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-600 text-white animate-pulse">
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{line.time}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                            {line.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Right Panel (5 Cols): Live AI Telemetry & CRM Action Card */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Prospect Intelligence Card */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3.5">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#202020]">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentScenario.prospect.avatar}
                          alt={currentScenario.prospect.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">{currentScenario.prospect.name}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">{currentScenario.prospect.role} • {currentScenario.prospect.company}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20">
                        {currentScenario.badge}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020]">
                        <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Intent Score</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> {currentScenario.prospect.intent} Intent
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020]">
                        <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Qualification</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                          {currentScenario.prospect.qualification}
                        </span>
                      </div>
                      <div className="col-span-2 p-2 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020]">
                        <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Direct Phone Number</span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {currentScenario.prospect.phone}
                        </span>
                      </div>
                    </div>

                    {/* Live Automated CRM Trigger Preview */}
                    <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-white/[0.04] border border-blue-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Automated CRM Action</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-snug">
                        {currentScenario.prospect.nextAction}
                      </p>
                    </div>

                  </div>

                  {/* Call Summary Outcome Note */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs font-sans text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-emerald-900 dark:text-emerald-200">Conversation Result</span>
                      <p className="leading-snug text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5">
                        {currentScenario.outcomeSummary}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BUILT FOR REAL-TIME CONVERSATIONS (3 Feature Blocks)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              BUILT FOR REAL-TIME CONVERSATIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Conversations Without the{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Awkward Delay
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Human conversation depends on razor-thin response windows, natural interruption recovery, and zero audio packet loss. Outtricks replaces sluggish multi-second API chains with unified WebRTC voice architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Block 1: Ultra-Low Latency */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm hover:border-blue-500/40 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-sans">Ultra-Low Latency</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Keep responses fast enough to support natural conversational flow. Audio streams token-by-token so conversations feel like speaking to a real person, not an awkward recorded bot.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 font-sans">
                <span>Sub-400ms Turnaround</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Block 2: Responsive Turn-Taking */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm hover:border-blue-500/40 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-sans">Responsive Turn-Taking</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Detect when the person is speaking, pause appropriately, and respond without awkward overlaps. Sub-100ms Voice Activity Detection (VAD) stops the AI gracefully when interrupted.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 font-sans">
                <span>Instant Interruption Recovery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Block 3: Reliable WebRTC Infrastructure */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm hover:border-blue-500/40 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white font-sans">Reliable WebRTC Infrastructure</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Deliver real-time audio communication through a modern low-latency infrastructure layer. Raw Opus audio routes over UDP edge gateways with global failover and zero jitter.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                <span>Enterprise Edge Gateways</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CONVERSATION WORKFLOW (From First Hello to Qualified Opportunity)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/60 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-10 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From First Hello to{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Qualified Opportunity
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans">
              Click any stage in the conversational journey to inspect the underlying AI intelligence and revenue actions.
            </p>
          </div>

          {/* Desktop & Mobile Interactive Horizontal Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeWorkflowIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowIndex(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-white dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/60 dark:bg-[#1C1C1C]/80 border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                      {stage.step}
                    </span>
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-400'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans leading-tight">
                      {stage.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Workflow Stage Deep Dive Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase font-sans">
                  Stage {WORKFLOW_STAGES[activeWorkflowIndex].step}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans">
                  {WORKFLOW_STAGES[activeWorkflowIndex].title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {WORKFLOW_STAGES[activeWorkflowIndex].desc}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-sans transition-all"
              >
                Configure Voice SDR →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: VOICE AI SDR (6 Feature Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              VOICE AI SDR
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Give Your Revenue Team an{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                AI Voice Layer
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Voice AI handles repetitive phone conversations while human sales representatives focus on closing higher-value, late-stage opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Lead Qualification</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Ask qualification questions and identify relevant prospects based on company size, tech stack, and budget authority.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Inbound Response</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Respond to incoming opportunities and website demo submissions in under 60 seconds while buyer intent is at its peak.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Appointment Booking</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Move qualified conversations toward meetings by querying rep calendars in real time and confirming appointments verbally.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Follow-Up Calls</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Reconnect with prospects who opened emails or clicked links without relying on manual, forgotten SDR call spreadsheets.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Lead Routing</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Send qualified enterprise opportunities to senior Account Executives while routing SMB leads into automated nurture cadences.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">CRM Updates</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Automatically pass conversation recordings, full transcripts, sentiment scores, and next tasks into the revenue pipeline in 0ms.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BUILT AROUND YOUR REVENUE WORKFLOW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-[#0b101f] dark:to-[#060913] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Built Around Your{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Workflow
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              Voice AI should never operate as an isolated calling silo. In Outtricks, it is one synchronized engine in an integrated revenue operating system.
            </p>
          </div>

          {/* Linear Connected Outtricks Pipeline Architecture */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            {[
              { name: 'Lead Finder', icon: Search, href: '/platform/8-dimension-b2b-pool' },
              { name: 'Contact Search', icon: Zap, href: '/use-cases/lead-Contact Search' },
              { name: 'Email', icon: Mail, href: '/platform/multi-inbox-email-outreach' },
              { name: 'LinkedIn', icon: Linkedin, href: '/platform/linkedin-automation' },
              { name: 'Voice AI', icon: PhoneCall, active: true, href: '/platform/voice-ai' },
              { name: 'Follow-Up', icon: RefreshCw, href: '/use-cases/automated-followups' },
              { name: 'Deals CRM', icon: Database, href: '/platform/crm' }
            ].map((node, i, arr) => {
              const Icon = node.icon;
              return (
                <React.Fragment key={i}>
                  <Link
                    to={node.href}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold font-sans ${
                      node.active
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30 ring-2 ring-blue-400/30'
                        : 'bg-white dark:bg-[#1C1C1C] border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{node.name}</span>
                  </Link>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200/70 dark:border-blue-900/30 text-center max-w-2xl mx-auto">
            <p className="text-xs text-blue-900 dark:text-blue-200 font-sans leading-relaxed">
              <strong>Instant Cross-Channel Suppression:</strong> When Voice AI confirms a meeting, scheduled emails and LinkedIn connection touches are halted across all accounts in &lt;10ms.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SEE WHAT THE AI HEARS AND UNDERSTANDS (Live Context Cockpit)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              See What the AI{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Hears and Understands
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Watch real-time speech transcription synchronize with semantic context extraction and instant CRM action triggers.
            </p>
          </div>

          {/* Two-Column Interface: Transcript on Left, AI Context on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* Left: Live Transcript */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#202020] pb-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">Live Audio Transcript</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Stream: WebRTC Opus UDP</span>
              </div>

              <div className="space-y-3 font-sans">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase block">Voice SDR (00:02)</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                    "Hi Sarah, this is Alex with Outtricks. Saw you just requested our revenue architecture teardown. Did I catch you between meetings?"
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">Sarah Jenkins (00:07)</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                    "Hey Alex! Yes, we have 12 SDRs and our deliverability dropped below 75% last week. We need a reliable fix."
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase block">Voice SDR (00:13)</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                    "That makes total sense. Outtricks handles automated mailbox rotation so deliverability stays at 99.4%. Are you free Thursday at 2 PM?"
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">Sarah Jenkins (00:18)</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                    "Thursday at 2 PM works. Send the invite to sarah@cloudscale.ai and include our RevOps lead."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: AI Context Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#202020] pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">AI Context & Telemetry</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  AI Listening
                </span>
              </div>

              <div className="space-y-2.5 font-sans text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-slate-500 dark:text-slate-400">Contact</span>
                  <span className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-slate-500 dark:text-slate-400">Role</span>
                  <span className="font-bold text-slate-900 dark:text-white">VP of Growth</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-slate-500 dark:text-slate-400">Company</span>
                  <span className="font-bold text-slate-900 dark:text-white">CloudScale AI</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-slate-500 dark:text-slate-400">Intent Level</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> High (96%)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-slate-500 dark:text-slate-400">Qualification</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">Qualified - Tier 1 Enterprise</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 dark:bg-white/[0.04] border border-blue-500/20 text-blue-700 dark:text-blue-300">
                  <span className="font-bold">Next Action</span>
                  <span className="font-bold">Book Demo (Thu 2 PM)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: REVENUE AUTOMATION (Every Conversation Can Trigger Next Action)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              REVENUE AUTOMATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Every Conversation Can Trigger the{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Next Action
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Voice AI is part of your revenue automation layer rather than just an isolated phone tool. Structured conversation outcomes trigger automated pipeline actions in milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUTOMATION_TRIGGERS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-sans ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">Trigger Condition</span>
                    <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans mt-0.5">
                      {item.condition}
                    </h3>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase font-sans">Automated Action</span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans mt-0.5">
                      → {item.action}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: DESIGNED FOR NATURAL CONVERSATIONS (4 Architectural Pillars)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Designed for{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Natural Conversations
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Conversations must feel organic, adaptable, and contextually grounded. Our architecture solves the 4 critical challenges of conversational voice systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans">Fluid Interruptions</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Allow conversations to naturally change direction without forcing the caller to wait for a script to finish. Sub-100ms Voice Activity Detection (VAD) stops speech instantly when a caller speaks.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans">Context Awareness</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Keep relevant prospect and account context available during the interaction. The AI knows what emails were opened, which website pages were viewed, and past conversation notes.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans">Fast Responses</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Reduce unnecessary delays between speech and AI response. Edge WebRTC streaming delivers turnaround times fast enough to maintain true conversational cadence without cognitive friction.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-sans">Consistent Workflows</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Use predefined qualification and routing logic across all conversations. Every single lead is evaluated against the exact same rigorous B2B criteria with zero rep fatigue.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: WHY REVENUE TEAMS USE VOICE AI (Comparison Table)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Why Revenue Teams{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Use Voice AI
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Compare traditional manual phone outreach with unified, real-time Voice AI automation.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A]">
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-sans w-1/3">Dimension</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans w-1/3">Traditional Calling</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans w-1/3">Outtricks Voice AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] text-xs sm:text-sm font-sans">
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Dialing Mechanism</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual dialing & slow list navigation</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Automated multi-channel event triggers</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Calling Capacity</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Limited by human stamina (40-60 calls/day)</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Continuous qualification at scale</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Discovery & Qualification</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Repetitive fatigue & subjective notes</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Real-time conversations with BANT criteria</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Meeting Coordination</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual calendar link back-and-forth</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Verbal agreement & instant calendar hold</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">CRM Logging & Notes</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Delayed manual entry (often forgotten)</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Structured summaries & recordings in 0ms</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Follow-Up Speed</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Delayed by 24–48 hours</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Automated next action triggered instantly</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BUILT FOR THE FULL OUTBOUND JOURNEY (6 Stages)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Built for the Full{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Outbound Journey
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              See how Voice AI connects with the entire Outtricks revenue operating system from prospect discovery to closed-won revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">01 FIND</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Discover Relevant Prospects</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Filter 480M+ verified global B2B decision makers using 8 search dimensions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">02 Verify</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Build Complete Prospect Context</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Retrieve verified direct mobile dials and work emails via multiDimensional query filters.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">03 REACH</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Start Multi-Channel Outreach</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Dispatch personalized cold emails and cloud-proxy LinkedIn touchpoints safely.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border-2 border-blue-500/60 dark:border-blue-500/60 shadow-lg space-y-2 relative">
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold">CURRENT ENGINE</span>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">04 ENGAGE</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Continue with Voice AI</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Engage warm intent leads with sub-400ms conversational phone qualification calls.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">05 FOLLOW UP</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Automate the Next Touch</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Trigger context-aware follow-up sequences across email, SMS, and LinkedIn automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">06 CLOSE</span>
              <h3 className="text-base font-bold text-slate-950 dark:text-white font-sans">Push Opportunities to CRM</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Sync qualified meetings directly to Deals CRM with zero manual data entry.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: VOICE AI USE CASES (6 Detailed Playbooks)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Voice AI{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Use Cases
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Practical revenue playbooks engineered for high-growth B2B sales teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Use Case Selection Pills */}
            <div className="lg:col-span-4 space-y-2">
              {USE_CASES_DATA.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => setActiveUseCaseId(uc.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    activeUseCaseId === uc.id
                      ? 'bg-white dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/60 dark:bg-[#0b101f] border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                  }`}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">{uc.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5 line-clamp-1">{uc.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Right: Active Use Case Breakdown Box */}
            <div className="lg:col-span-8">
              {(() => {
                const uc = USE_CASES_DATA.find((item) => item.id === activeUseCaseId) || USE_CASES_DATA[0];
                return (
                  <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans">OPERATIONAL PLAYBOOK</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white font-sans mt-1">
                        {uc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">{uc.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                      <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1.5">
                        <span className="font-bold text-rose-800 dark:text-rose-300 uppercase text-[10px]">The Problem</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{uc.problem}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1.5">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 uppercase text-[10px]">How Voice AI Helps</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{uc.solution}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5 font-sans">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Example Workflow</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {uc.workflow}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-white/[0.04] border border-blue-200/60 dark:border-blue-900/30 space-y-1 font-sans">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Automated Next Action</span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">{uc.nextAction}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: CONNECT VOICE AI TO YOUR REVENUE STACK
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Connect Voice AI to Your{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Stack
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              Conversation outcomes move automatically across your native Outtricks tools without fragile middleware scripts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-sans">
            {[
              { title: 'Lead Finder', desc: 'Auto-feed verified ICP leads' },
              { title: 'Contact Search', desc: '15-source phone multiAttribute' },
              { title: 'Email', desc: 'Coordinate multi-inbox touches' },
              { title: 'LinkedIn', desc: 'Synchronize cloud touches' },
              { title: 'Voice AI', desc: 'Sub-400ms phone SDR' },
              { title: 'Deals CRM', desc: 'Instant pipeline updates' },
              { title: 'Automation', desc: 'Global suppression triggers' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 13: BUILT FOR TEAMS THAT CARE ABOUT RESPONSE TIME (Technical Credibility)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-8 sm:p-12 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Built for Teams That Care About{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Response Time
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans">
              Engineered from the ground up for low-latency, deterministic B2B phone conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">PROTOCOL LAYER</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Real-Time WebRTC</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Full-duplex Opus audio streaming over UDP edge gateways with global geographically distributed nodes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">DETECTION LAYER</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sub-100ms VAD</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Neural Voice Activity Detection identifies speaker onset and pauses in milliseconds to handle interruptions gracefully.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">SYNTHESIS LAYER</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Token Streaming TTS</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Converts generated text tokens to voice audio streamingly without waiting for full sentence completion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">DATA LAYER</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Single Database Sync</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Call logs, recordings, and lead status updates write to 1 central PostgreSQL database with sub-10ms query execution.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 14: FREQUENTLY ASKED QUESTIONS (9 Questions)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Frequently Asked{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-sans">
              Everything you need to know about Outtricks Voice AI architecture, turn-taking, and CRM integration.
            </p>
          </div>

          <div className="space-y-3 font-sans">
            {VOICE_FAQS.map((faq, idx) => {
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
          FINAL CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-700 text-white p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider font-sans border border-white/20">
            READY TO TALK?
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Turn More Conversations Into{' '}
            <span className="font-serif italic font-normal underline decoration-white/30">
              Revenue Opportunities.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 font-normal max-w-2xl mx-auto leading-relaxed">
            Connect real-time Voice AI with your outbound workflow and let every qualified conversation move naturally toward the next step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Test Voice AI
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Book a Demo
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
