import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Mic, 
  Volume2, 
  Radio, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Search, 
  Database, 
  Mail, 
  Linkedin, 
  Workflow, 
  Layers, 
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
  Activity,
  Globe,
  MessageSquare
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface DialogueTurn {
  speaker: 'Voice AI' | 'Prospect';
  text: string;
  time: string;
  annotation?: string;
}

interface DialogueStage {
  id: string;
  stepNum: string;
  title: string;
  turnIndex: number;
  stageName: string;
  stageSummary: string;
  bantSignal: string;
  icon: any;
}

interface FaqItem {
  question: string;
  answer: string;
}

const LIVE_CONVERSATION: DialogueTurn[] = [
  {
    speaker: 'Voice AI',
    text: 'Hi Sarah, this is Alex with Outtricks. Saw you just requested a demo on our site regarding multi-inbox cold email deliverability. Did I catch you at a good time?',
    time: '00:02',
    annotation: 'Speed-to-Lead Call triggered within 45s of form fill'
  },
  {
    speaker: 'Prospect',
    text: "Hey Alex, yes! We're currently evaluating outbound tools because our emails are hitting spam across 20 Google accounts.",
    time: '00:07',
    annotation: 'Pain Point: 20 burnt Google Workspace domains'
  },
  {
    speaker: 'Voice AI',
    text: 'I can definitely help with that. Outtricks handles automated peer-to-peer warmup and rotating inbox throttling with 99.4% inbox placement. How many SDRs are on your team currently?',
    time: '00:13',
    annotation: 'Qualifying team headcount and volume requirements'
  },
  {
    speaker: 'Prospect',
    text: "We have 6 SDRs right now, and we're planning to scale to 12 next quarter.",
    time: '00:19',
    annotation: 'Company Size: 6 SDRs scaling to 12 (Scale Tier)'
  },
  {
    speaker: 'Voice AI',
    text: 'That is a perfect fit for our Scale tier. Are you free this Thursday at 2 PM for a 15-minute technical walkthrough with our lead architect?',
    time: '00:24',
    annotation: 'Live calendar availability checked via Google Cal API'
  },
  {
    speaker: 'Prospect',
    text: 'Thursday at 2 PM works great. Send the calendar invite to sarah@cloudscale.ai.',
    time: '00:29',
    annotation: 'Meeting Agreed & confirmed by prospect'
  },
  {
    speaker: 'Voice AI',
    text: 'Calendar invite is on its way, Sarah! Looking forward to speaking on Thursday.',
    time: '00:32',
    annotation: 'Opportunity logged to Deals CRM with $36,000 ARR value'
  }
];

const DIALOGUE_STAGES: DialogueStage[] = [
  { id: 'st1', stepNum: '01', title: 'Greeting & Context', turnIndex: 0, stageName: 'Speed-to-Lead', stageSummary: 'Calls within 45s of demo request', bantSignal: 'Context: Demo Request', icon: PhoneCall },
  { id: 'st2', stepNum: '02', title: 'Pain Identification', turnIndex: 1, stageName: 'Problem Discovery', stageSummary: 'Identifies 20 spam-blocked domains', bantSignal: 'Need: Deliverability', icon: Flame },
  { id: 'st3', stepNum: '03', title: 'Headcount Qual', turnIndex: 3, stageName: 'BANT Qualification', stageSummary: 'Confirms 6 SDRs scaling to 12', bantSignal: 'Tier: Scale Plan', icon: Users },
  { id: 'st4', stepNum: '04', title: 'Calendar Lock', turnIndex: 5, stageName: 'Demo Scheduled', stageSummary: 'Locks Thursday 2:00 PM EST slot', bantSignal: 'Meeting: Confirmed ✓', icon: Calendar },
  { id: 'st5', stepNum: '05', title: 'CRM Deal Created', turnIndex: 6, stageName: 'Automated Handoff', stageSummary: 'Writes call audio & logs deal', bantSignal: 'ARR: $36,000 Won', icon: Building2 }
];

const VOICE_AI_FAQS: FaqItem[] = [
  {
    question: 'Can Outtricks Voice AI qualify inbound leads automatically?',
    answer: 'Yes! Outtricks integrates with your website demo forms and webhooks. The moment a prospect submits a form, Voice AI calls them within 45 seconds to answer questions, qualify budget/timing, and book a meeting while their buying intent is highest.'
  },
  {
    question: 'Can the AI book meetings directly into my sales team\'s calendar?',
    answer: 'Yes. Outtricks connects natively with Google Calendar, Microsoft Outlook, and Calendly. During the call, the AI checks real-time rep availability and books the calendar invitation directly to the prospect\'s email.'
  },
  {
    question: 'Does the Voice AI support real-time interruption detection?',
    answer: 'Yes. Outtricks uses sub-100ms Voice Activity Detection (VAD). If the prospect speaks while the AI is talking, the AI instantly stops speaking and listens with natural human conversational flow.'
  },
  {
    question: 'How low is the audio response latency?',
    answer: 'Outtricks operates on a sub-400ms WebRTC voice infrastructure. By streaming raw Opus audio over UDP directly to edge nodes and using token-by-token neural speech synthesis, there are zero awkward delays.'
  },
  {
    question: 'Does every conversation automatically sync with Deals CRM?',
    answer: 'Yes. Every call recording, full speaker-diarized transcript, and AI executive summary is automatically written to the contact timeline in Deals CRM on 1 PostgreSQL database with 0ms sync delay.'
  },
  {
    question: 'Can we customize the AI voice, persona, and objection playbooks?',
    answer: 'Yes! You can choose from dozens of ultra-realistic neural voices, adjust pacing and tone, and configure granular objection-handling rules specific to your product and pricing.'
  },
  {
    question: 'Is there a free trial to test live AI voice calls?',
    answer: 'Yes! Your 7-Day Free Trial includes sandbox calling minutes so you can test conversational turn latency, objection handling, and calendar booking risk-free.'
  }
];

export const VoiceAiUseCasePage: React.FC = () => {
  // Active Dialogue Turn State
  const [activeTurnIdx, setActiveTurnIdx] = useState<number>(0);
  const [isDialoguePlaying, setIsDialoguePlaying] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance dialogue loop
  useEffect(() => {
    if (!isDialoguePlaying) return;

    const timer = setInterval(() => {
      setActiveTurnIdx((prev) => (prev + 1) % LIVE_CONVERSATION.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isDialoguePlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentTurn = LIVE_CONVERSATION[activeTurnIdx];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Conversational Voice AI Phone Calling Workflows | Outtricks"
        description="Engage high-intent prospects via phone with sub-400ms WebRTC voice AI agents."
        canonical="https://outtricks.com/use-cases/voice-ai"
        keywords={["Voice AI phone workflow","AI cold calling playbook","autonomous SDR calling","sub-400ms WebRTC calls"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Conversational Voice AI","url":"/use-cases/voice-ai"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (AI Voice Agents That Actually Move Deals Forward)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            AUTONOMOUS CONVERSATIONAL SDR
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          AI Voice Agents That<br className="hidden sm:inline" /> Actually Move Deals Forward
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Qualify inbound leads, answer questions, handle objections, and book meetings with AI voice conversations connected to your revenue workflow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Launch Voice SDR</span>
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
            <span className="text-[10px] text-slate-400 block uppercase">TURN LATENCY</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">364ms WebRTC</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">SPEED-TO-LEAD</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">&lt; 45s Response</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">MEETING BOOKING</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">94% Booked Rate</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">CRM SYNC</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0ms PostgreSQL Lag</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: INSTANT LEAD RESPONSE (Respond The Moment a Lead Arrives)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SPEED-TO-LEAD ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Respond The Moment a Lead Arrives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Calling demo requests within 60 seconds delivers 391% higher qualification rates than waiting 30 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-slate-400 text-[10px] block font-bold">STEP 01 (00:00)</span>
            <strong className="text-slate-900 dark:text-white block text-xs">Form Submission</strong>
            <p className="text-slate-500 font-sans text-xs">Prospect requests demo on website.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] block font-bold">STEP 02 (00:10)</span>
            <strong className="text-slate-900 dark:text-white block text-xs">multiAttribute Verify</strong>
            <p className="text-slate-500 font-sans text-xs">Retrieves tech stack & mobile phone.</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] block font-bold">STEP 03 (00:35)</span>
            <strong className="text-blue-950 dark:text-blue-200 block text-xs">Voice AI Call</strong>
            <p className="text-blue-700 dark:text-blue-300 font-sans text-xs">Sub-400ms WebRTC outbound call.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-1.5">
            <span className="text-emerald-600 text-[10px] block font-bold">STEP 04 (01:15)</span>
            <strong className="text-emerald-900 dark:text-emerald-200 block text-xs">Meeting Confirmed</strong>
            <p className="text-emerald-700 dark:text-emerald-300 font-sans text-xs">Calendar slot locked on rep cal.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE VOICE CONVERSATION (Have Real Revenue Conversations)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              LIVE CALL SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Have Real Revenue Conversations
            </h2>
          </div>

          <button
            onClick={() => setIsDialoguePlaying(!isDialoguePlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isDialoguePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isDialoguePlaying ? 'Pause Call' : 'Resume Call'}</span>
          </button>
        </div>

        {/* 5 Stage Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DIALOGUE_STAGES.map((st) => {
            const StIcon = st.icon;
            const isSelected = activeTurnIdx >= st.turnIndex;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setActiveTurnIdx(st.turnIndex);
                  setIsDialoguePlaying(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {st.stepNum}
                  </span>
                  <StIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{st.title}</strong>
                <span className={`text-[10px] font-sans block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {st.bantSignal}
                </span>
              </button>
            );
          })}
        </div>

        {/* Call Simulator Window */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-5">
          
          {/* Audio Waveform & Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <span className="text-emerald-400 font-bold block text-[11px]">● Live WebRTC Audio Stream (Opus 48kHz)</span>
                <span className="text-slate-400 text-[10px]">Prospect: Sarah Jenkins • VP Growth @ CloudScale AI</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span>Latency: <strong className="text-emerald-400">364ms RTT</strong></span>
              <span>Interruption VAD: <strong className="text-blue-400">&lt;100ms</strong></span>
            </div>
          </div>

          {/* Waveform Bar */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-1 h-12 px-4">
            {[40, 70, 90, 30, 85, 55, 75, 95, 35, 65, 80, 45, 90, 50, 70, 85, 40, 65, 90, 30, 75, 50].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="w-1 bg-gradient-to-t from-blue-500 to-emerald-400 rounded-full animate-pulse transition-all duration-300"
              />
            ))}
          </div>

          {/* Transcript Dialogue Stream */}
          <div className="space-y-3 pt-1">
            {LIVE_CONVERSATION.slice(0, activeTurnIdx + 1).map((turn, tIdx) => (
              <div
                key={tIdx}
                className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1 animate-in fade-in duration-200 ${
                  turn.speaker === 'Voice AI'
                    ? 'bg-blue-950/60 border-blue-900/70 text-slate-200'
                    : 'bg-slate-800/80 border-slate-700 text-white ml-auto max-w-xl'
                }`}
              >
                <div className="flex items-center justify-between font-sans text-[10px]">
                  <strong className={turn.speaker === 'Voice AI' ? 'text-blue-400' : 'text-emerald-400'}>
                    {turn.speaker} ({turn.time})
                  </strong>
                  {turn.annotation && <span className="text-slate-400 italic">[{turn.annotation}]</span>}
                </div>
                <p className="text-[11px]">{turn.text}</p>
              </div>
            ))}
          </div>

          {/* Bottom Live Result */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-sans text-slate-400">
            <span>Call Status: <strong className="text-white">Active Conversation</strong></span>
            <span className="text-emerald-400 font-bold">✓ Meeting Booked: Thursday 2:00 PM EST</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: LEAD QUALIFICATION (Qualify Before Your Team Gets Involved)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ORGANIC BANT GATHERING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Qualify Before Your Team Gets Involved
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            The AI uncovers critical qualification data during natural conversation without sounding like a rigid survey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-slate-400 block text-[10px] uppercase">1. COMPANY SIZE</span>
            <strong className="text-slate-900 dark:text-white block text-xs">120–250 Employees</strong>
            <p className="text-slate-500 font-sans text-xs">6 SDRs scaling to 12 next quarter.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase">2. CURRENT STACK</span>
            <strong className="text-slate-900 dark:text-white block text-xs">20 Google Accounts</strong>
            <p className="text-slate-500 font-sans text-xs">Currently using single-inbox Apollo.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase">3. PRIMARY NEED</span>
            <strong className="text-slate-900 dark:text-white block text-xs">Deliverability Fix</strong>
            <p className="text-slate-500 font-sans text-xs">Wants automated P2P warmup rotation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-indigo-600 block text-[10px] uppercase">4. BUDGET TIER</span>
            <strong className="text-slate-900 dark:text-white block text-xs">Scale Plan Tier</strong>
            <p className="text-slate-500 font-sans text-xs">$249/mo with unlimited inboxes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-1.5">
            <span className="text-emerald-600 block text-[10px] uppercase font-bold">5. TIMELINE</span>
            <strong className="text-emerald-700 dark:text-emerald-300 block text-xs">Active Q3 Evaluation</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans text-xs">Ready for immediate pilot deployment.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: REAL-TIME OBJECTION HANDLING
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SUB-400MS OBJECTION TRACKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Handle Questions & Objections in Real Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Configured with battle-tested enterprise sales talk tracks to address concerns smoothly without pauses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <span className="text-rose-600 font-bold uppercase text-[10px]">OBJECTION 01</span>
              <span className="text-emerald-600 font-bold text-[10px]">Passed ✓</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">"Are you an AI bot?"</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              "Yes! I'm Alex, an AI voice SDR built on Outtricks. I'm calling to save your team time and make sure you get quick answers without waiting for an email back."
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <span className="text-blue-600 font-bold uppercase text-[10px]">OBJECTION 02</span>
              <span className="text-emerald-600 font-bold text-[10px]">Passed ✓</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">"Does this sync with Salesforce?"</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              "Absolutely. Outtricks features native bidirectional Salesforce and HubSpot connectors with zero sync lag. Our solution engineer can show you live on Thursday."
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <span className="text-blue-600 font-bold uppercase text-[10px]">OBJECTION 03</span>
              <span className="text-emerald-600 font-bold text-[10px]">Passed ✓</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">"How are you different from Smartlead?"</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              "Smartlead only does email. Outtricks unifies 480M+ lead search, contact search, multi-inbox email, LinkedIn, and Voice SDR on 1 database."
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: MEETING BOOKING
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SEAMLESS SCHEDULING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Book Meetings Automatically in Live Calls
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Checks rep calendar availability in real time and sends Google/Outlook calendar invites instantly.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-slate-400 block">1. CONVERSATION</span>
              <strong className="text-slate-900 dark:text-white block">Sub-400ms Dialogue</strong>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 space-y-1">
              <span className="text-blue-600 block">2. QUALIFIED FIT</span>
              <strong className="text-blue-950 dark:text-blue-200 block">BANT Verified</strong>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 space-y-1">
              <span className="text-blue-600 block">3. CALENDAR CHECK</span>
              <strong className="text-slate-900 dark:text-blue-200 block">Google / Outlook API</strong>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 space-y-1">
              <span className="text-emerald-600 block">4. MEETING BOOKED</span>
              <strong className="text-emerald-950 dark:text-emerald-200 block">Thursday 2 PM EST ✓</strong>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: CRM SYNCHRONIZATION
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ZERO-ADMIN LOGGING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Every Conversation Updates Your CRM in Real Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Full call audio, diarized transcripts, and AI-generated deal summaries write natively to Deals CRM with 0ms sync drift.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1.5">
              <span className="text-blue-600 font-bold block text-[10px] uppercase">1. CALL RECORDING & TRANSCRIPT</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans">
                Full Opus 48kHz audio file and timestamped speaker-diarized text saved to contact timeline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1.5">
              <span className="text-blue-600 font-bold block text-[10px] uppercase">2. AI EXECUTIVE SUMMARY</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans">
                "Prospect evaluating deliverability across 20 inboxes for 6 SDRs. Scheduled demo Thursday 2 PM."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
              <span className="text-emerald-600 font-bold block text-[10px] uppercase">3. DEALS CRM OPPORTUNITY</span>
              <p className="text-emerald-950 dark:text-emerald-200 font-sans font-semibold">
                Deal created in "Demo Booked" stage ($36,000 ARR). AE notified on Slack.
              </p>
            </div>
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
            <span>SUB-400MS VOICE AI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Deploy Autonomous Voice SDRs in Under 10 Minutes
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Turn website demo requests and cold lists into booked pipeline with sub-400ms WebRTC Voice AI.
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
          7-Day Free Trial • Sub-400ms Audio • Google/Outlook Calendar Integration
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            VOICE SDR QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {VOICE_AI_FAQS.map((faq, fIdx) => {
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
