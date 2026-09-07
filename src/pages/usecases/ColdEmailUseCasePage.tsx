import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Search, 
  Database, 
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
  Users,
  Briefcase,
  SlidersHorizontal,
  Flame,
  Radio,
  Activity,
  Globe,
  RotateCw,
  Inbox,
  MessageSquare
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface SequenceStep {
  id: string;
  stepNum: string;
  title: string;
  timing: string;
  actionSummary: string;
  detailPayload: {
    subject?: string;
    preview?: string;
    triggerCondition?: string;
    openRate?: string;
    crmAction?: string;
  };
  icon: any;
  badge: string;
}

interface MailboxPoolItem {
  id: string;
  email: string;
  dailySent: string;
  healthScore: string;
  provider: string;
  status: 'Warmed Up' | 'Active Sending';
}

interface FaqItem {
  question: string;
  answer: string;
}

const SEQUENCE_STEPS: SequenceStep[] = [
  {
    id: 's1',
    stepNum: '01',
    title: 'Cold Email #1',
    timing: 'Day 1 • 09:15 AM',
    actionSummary: 'Personalized intro pitch sent from 24 rotating inboxes.',
    detailPayload: {
      subject: 'Quick question regarding CloudScale\'s SDR infrastructure',
      preview: 'Hi Sarah, noticed you\'re scaling out the outbound SDR team. Most growth leaders struggle with single-inbox spam filtering...',
      openRate: '68.4% Open Rate',
      triggerCondition: 'Dispatched to 650 verified ICP contacts'
    },
    icon: Mail,
    badge: 'Dispatched'
  },
  {
    id: 's2',
    stepNum: '02',
    title: 'Behavioral Delay',
    timing: '+48 Hours',
    actionSummary: 'System listens for open, click, or reply events.',
    detailPayload: {
      triggerCondition: 'If no reply after 48h → Execute Step 03',
      openRate: 'Listening 24/7'
    },
    icon: Clock,
    badge: 'Listening'
  },
  {
    id: 's3',
    stepNum: '03',
    title: 'Email #2 (Value Add)',
    timing: 'Day 3 • 10:30 AM',
    actionSummary: 'Contextual follow-up referencing technical benchmark report.',
    detailPayload: {
      subject: 'Re: Quick question regarding CloudScale\'s SDR infrastructure',
      preview: 'Wanted to share how HyperGrowth Labs fixed deliverability across 16 Google Workspace mailboxes with 0ms sync drift...',
      openRate: '54.2% Open Rate'
    },
    icon: Mail,
    badge: 'Follow-Up'
  },
  {
    id: 's4',
    stepNum: '04',
    title: 'Positive Reply Detected',
    timing: 'Day 3 • 02:45 PM',
    actionSummary: 'AI Sentiment Classifier detects high buyer readiness (96%).',
    detailPayload: {
      preview: '"Thanks for reaching out! The timing is great as we are reviewing our stack. Are you free Thursday 2 PM for a 15-min demo?"',
      triggerCondition: 'Auto-pauses cadence for this prospect'
    },
    icon: CheckCircle2,
    badge: 'Positive Reply (96%)'
  },
  {
    id: 's5',
    stepNum: '05',
    title: 'Deals CRM Updated',
    timing: 'Day 3 • 02:46 PM',
    actionSummary: 'Deal created in "Demo Booked" stage with $36,000 ARR value.',
    detailPayload: {
      crmAction: 'Deal #4892 created in stage "Demo Booked". AE notified on Slack.',
      triggerCondition: '0ms PostgreSQL Core Write ✓'
    },
    icon: Building2,
    badge: 'Deal Created ✓'
  }
];

const MAILBOX_POOLS: MailboxPoolItem[] = [
  { id: 'mb1', email: 'sarah.j@cloudscale-growth.io', dailySent: '34 / 35', healthScore: '100% (0 Spam)', provider: 'Google Workspace', status: 'Active Sending' },
  { id: 'mb2', email: 'sarah.j@cloudscale-outbound.com', dailySent: '35 / 35', healthScore: '99.8% (0 Spam)', provider: 'Microsoft 365', status: 'Active Sending' },
  { id: 'mb3', email: 's.jenkins@cloudscale-reach.io', dailySent: '32 / 35', healthScore: '100% (0 Spam)', provider: 'Google Workspace', status: 'Active Sending' },
  { id: 'mb4', email: 'sarah@cloudscale-pipeline.co', dailySent: '28 / 35', healthScore: '100% (0 Spam)', provider: 'Custom SMTP', status: 'Warmed Up' }
];

const COLD_EMAIL_FAQS: FaqItem[] = [
  {
    question: 'How does Outtricks maintain 99.4% cold email deliverability?',
    answer: 'Outtricks uses a three-pillar deliverability engine: (1) multi-inbox load balancing that caps sending at 35 emails/day per inbox, (2) automated peer-to-peer inbox warmup network, and (3) real-time pre-send spam keyword analysis and SMTP handshake verification.'
  },
  {
    question: 'How many inboxes can I connect to Outtricks?',
    answer: 'You can connect unlimited inboxes across Google Workspace, Microsoft 365, Zoho, and custom SMTP/IMAP servers. Outtricks automatically groups and rotates them based on your campaign sending schedules.'
  },
  {
    question: 'How long does automated inbox warmup take?',
    answer: 'Our peer-to-peer warmup network ramps up sending volume over 14 to 21 days following a natural algorithmic curve, ensuring new domains establish positive sender reputation before cold volume starts.'
  },
  {
    question: 'Does Outtricks automatically configure SPF, DKIM, and DMARC?',
    answer: 'Yes! Outtricks provides automated DNS verification wizards with 1-click status checks for SPF, DKIM, DMARC, MX records, and Custom Tracking Domains (CTD).'
  },
  {
    question: 'What is dynamic spintax and how does it prevent spam filtering?',
    answer: 'Spintax allows you to create sentence and phrase variations like {Hey | Hi | Hello} or {reaching out | following up}. Outtricks generates unique cryptographic message variations for every recipient so mail servers never detect duplicate bulk templates.'
  },
  {
    question: 'What happens when a prospect replies to a cold email?',
    answer: 'Outtricks instantly detects the reply, automatically pauses all subsequent follow-up steps for that contact, sentiment-scores the response, and writes the conversation history directly to Deals CRM while notifying your sales rep on Slack.'
  },
  {
    question: 'Can I A/B test cold email subjects and body copy?',
    answer: 'Yes! You can set up unlimited A/B/C/D variant testing on subject lines, body copy, and call-to-action buttons with automatic winner distribution based on open and positive reply rates.'
  }
];

export const ColdEmailUseCasePage: React.FC = () => {
  // Interactive Campaign Sequence Animation State
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isSeqPlaying, setIsSeqPlaying] = useState<boolean>(true);

  // AI Personalization Composer State
  const [targetName, setTargetName] = useState('Sarah Jenkins');
  const [targetCompany, setTargetCompany] = useState('CloudScale AI');
  const [targetRole, setTargetRole] = useState('VP of Growth');
  const [targetPainPoint, setTargetPainPoint] = useState('Hiring 4 SDRs • Evaluating multi-inbox rotation');
  const [aiGeneratedEmail, setAiGeneratedEmail] = useState(`Subject: Quick question regarding CloudScale's SDR infrastructure

Hi Sarah,

Noticed CloudScale AI is aggressively scaling out the outbound SDR team this quarter.

Most growth leaders struggle with single-inbox spam filtering and burnt domains when trying to ramp rep outbound volume past 500 emails/week.

Outtricks rotates 24 connected inboxes with automated P2P warmup and native CRM on 1 PostgreSQL database—guaranteeing 99.4% inbox placement.

Open to a quick 10-min intro Thursday to see our deliverability benchmarks?

Best,
Outbound Lead @ Outtricks`);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance sequence loop
  useEffect(() => {
    if (!isSeqPlaying) return;

    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % SEQUENCE_STEPS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isSeqPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRegeneratePitch = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiGeneratedEmail(`Subject: CloudScale AI outbound deliverability benchmarks

Hey Sarah,

Saw your recent post on sales infrastructure and scaling SDR outbound without sacrificing deliverability.

We built Outtricks so growth teams can distribute volume across 24+ Google & Outlook inboxes with dynamic spintax and zero domain burn.

Would love to share our 2-minute live demo if you're reviewing outbound tools this month?`);
    }, 750);
  };

  const activeStep = SEQUENCE_STEPS[activeStepIdx];
  const ActiveStepIcon = activeStep.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Cold Email Outreach Playbook & Inbox Warmup | Outtricks"
        description="Scale high-converting cold email campaigns across unlimited inboxes with spintax and 99.4% deliverability."
        canonical="https://outtricks.com/use-cases/cold-email"
        keywords={["cold email playbook","email deliverability guide","cold email best practices","multi inbox strategy"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Cold Email Outreach","url":"/use-cases/cold-email"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Send More Cold Emails. Land More Conversations.)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            HIGH-DELIVERABILITY OUTBOUND
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Send More Cold Emails.<br className="hidden sm:inline" /> Land More Conversations.
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Build targeted outbound campaigns, rotate inboxes, personalize messages, and manage replies from one unified cold email platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Launch Your Campaign</span>
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
            <span className="text-[10px] text-slate-400 block uppercase">INBOX ROTATION</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">24 Mailboxes Active</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">INBOX PLACEMENT</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">99.4% Inboxed</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">POSITIVE REPLIES</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">14.2% Positive Rate</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">CRM SYNC</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0ms PostgreSQL Lag</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: DELIVERABILITY & INBOX INFRASTRUCTURE
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DOMAIN HEALTH & DELIVERABILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Enterprise Deliverability Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Maintain pristine sender reputation with automated peer-to-peer warmup, DNS alignment, and spam keyword shielding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <RotateCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">P2P Network Peer Warmup</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated algorithmic warmup network exchanges high-reputation emails with positive thread engagement to guarantee primary inbox placement.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ 100% Algorithmic Health</div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">DNS & Custom Tracking Alignment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated verification of SPF, DKIM, DMARC, and Custom Tracking Domains (CTD) on your own isolated subdomains.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ 100% DNS Alignment Pass</div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time Spam Word Shield</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pre-flight spam keyword scanning and AI link analysis prevent risky phrases from triggering Gmail and Outlook spam filters.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ Zero Blacklist Risk</div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: AI PERSONALIZATION (Interactive Copy Generator)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CONTEXT-AWARE COPY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Scale 1-to-1 Personalization With Dynamic AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Generate relevant first lines and spintax variations that sound like authentic research done by your top Account Executive.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A] text-xs font-sans">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">PROSPECT & COMPANY:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{targetName} • {targetCompany}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">ROLE & TITLE:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{targetRole}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">IDENTIFIED CONTEXT:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold truncate block">{targetPainPoint}</strong>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                AI PERSONALIZED CAMPAIGN MESSAGE
              </span>
              <button
                onClick={handleRegeneratePitch}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isGeneratingAi ? 'Regenerating...' : 'Regenerate AI Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]">
              <textarea
                rows={7}
                value={aiGeneratedEmail}
                onChange={(e) => setAiGeneratedEmail(e.target.value)}
                className="w-full bg-transparent text-xs font-sans text-slate-800 dark:text-slate-200 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-1">
            <span>Spintax Format: {'{Hey | Hi | Hello}'}, {'{{first_name}}'}, {'{{company}}'}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">● 14.2% Average Positive Reply</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: AUTOMATED EMAIL SEQUENCES (Interactive Animated Demo)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              INTERACTIVE CAMPAIGN PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Automated Email Sequences That Convert
            </h2>
          </div>

          <button
            onClick={() => setIsSeqPlaying(!isSeqPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isSeqPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSeqPlaying ? 'Pause Sequence' : 'Resume Sequence'}</span>
          </button>
        </div>

        {/* 5 Sequence Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SEQUENCE_STEPS.map((step, idx) => {
            const SIcon = step.icon;
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStepIdx(idx);
                  setIsSeqPlaying(false);
                }}
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
                  <SIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{step.title}</strong>
                <span className={`text-[10px] font-sans block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {step.timing}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Context Inspector Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStepIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  STEP {activeStep.stepNum} • {activeStep.timing}
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {activeStep.title}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              {activeStep.badge}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeStep.actionSummary}
          </p>

          {activeStep.detailPayload.preview && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-sans text-slate-300">
              <strong className="text-blue-400 block mb-1">Payload Content:</strong>
              {activeStep.detailPayload.preview}
            </div>
          )}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: MULTI-INBOX ROTATION (Mailbox Pools Load Balancer)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LOAD BALANCED SENDING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Distribute Volume Across 24+ Mailboxes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Never burn a single sending domain. Volume is evenly distributed with human-like randomized sending intervals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
          {MAILBOX_POOLS.map((mb) => (
            <div
              key={mb.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 text-[10px] font-bold">
                  {mb.provider}
                </span>
                <span className="text-emerald-600 font-bold text-[10px]">● {mb.status}</span>
              </div>

              <div>
                <strong className="text-slate-900 dark:text-white text-xs block truncate">{mb.email}</strong>
                <span className="text-slate-400 text-[11px]">Daily Cap: {mb.dailySent}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] text-[10px] font-bold text-slate-600 dark:text-slate-300 flex justify-between">
                <span>Health Score:</span>
                <span className="text-emerald-600">{mb.healthScore}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: CAMPAIGN ANALYTICS (Real-Time Metrics)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PERFORMANCE METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Know What Drives Replies and Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-sans text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">EMAILS SENT</span>
            <strong className="text-slate-900 dark:text-white text-lg font-bold">14,280</strong>
            <span className="text-emerald-600 text-[10px] block">99.4% Inboxed</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 text-[10px] uppercase block">OPEN RATE</span>
            <strong className="text-blue-600 text-lg font-bold">64.2%</strong>
            <span className="text-slate-400 text-[10px] block">9,167 Opens</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 text-[10px] uppercase block">CLICK RATE</span>
            <strong className="text-blue-600 text-lg font-bold">18.6%</strong>
            <span className="text-slate-400 text-[10px] block">Custom Domain</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-indigo-600 text-[10px] uppercase block">REPLY RATE</span>
            <strong className="text-indigo-600 text-lg font-bold">14.2%</strong>
            <span className="text-emerald-600 text-[10px] block font-bold">Positive Sent</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-emerald-600 text-[10px] uppercase block">DEMOS BOOKED</span>
            <strong className="text-emerald-600 text-lg font-bold">48 Demos</strong>
            <span className="text-slate-400 text-[10px] block">Synced to Cal</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs space-y-1">
            <span className="text-emerald-600 text-[10px] uppercase block">PIPELINE ARR</span>
            <strong className="text-emerald-700 dark:text-emerald-300 text-lg font-bold">$184K ARR</strong>
            <span className="text-emerald-600 text-[10px] block font-bold">Closed-Won ✓</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: REPLY-TO-CRM WORKFLOW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED INBOX CONVERSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            From Cold Reply to Closed Deal in Seconds
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Handle all campaign replies in one unified inbox with AI sentiment scoring, automated deal creation, and Slack notifications.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-blue-600" />
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Unified Reply Handling</h4>
            </div>
            <span className="text-xs font-sans text-emerald-600 font-bold">● Auto-Stop Follow-Up Active</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 font-bold block">1. INBOX REPLY RECEIVED</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans font-medium">
                Prospect writes: "Sounds interesting, let's connect Thursday."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 font-bold block">2. AI SENTIMENT SCORING</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans font-medium">
                Categorized as Positive Intent (96% Confidence).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-emerald-600 font-bold block">3. DEALS CRM SYNC</span>
              <p className="text-emerald-950 dark:text-emerald-200 font-sans font-semibold">
                Opportunity created in pipeline stage "Demo Booked".
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
            <span>COLD EMAIL ENGINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Start Inboxing More Cold Emails Today
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Connect your domains, set up automated warmup, and scale your outbound pipeline risk-free.
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
          7-Day Free Trial • Unlimited Inboxes • 99.4% Deliverability Guarantee
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            COLD EMAIL QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {COLD_EMAIL_FAQS.map((faq, fIdx) => {
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
