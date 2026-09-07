import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Linkedin, 
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
  MessageSquare,
  Eye,
  UserPlus
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface LinkedInStage {
  id: string;
  stepNum: string;
  title: string;
  timing: string;
  actionSummary: string;
  detailPayload: {
    actionType: string;
    previewText?: string;
    metricStat?: string;
    safetyRule?: string;
  };
  icon: any;
  badge: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const LINKEDIN_STAGES: LinkedInStage[] = [
  {
    id: 'l1',
    stepNum: '01',
    title: 'Profile View',
    timing: 'Day 1 • 10:15 AM',
    actionSummary: 'Automated soft touch profile visit via dedicated residential cloud proxy.',
    detailPayload: {
      actionType: 'Cloud Proxy Visit',
      previewText: 'Visited Sarah Jenkins (VP Growth @ CloudScale AI) with human-emulated scroll speed.',
      metricStat: '100% Ban-Free Safety',
      safetyRule: 'Dedicated Residential IP Rotation'
    },
    icon: Eye,
    badge: 'Soft Touch'
  },
  {
    id: 'l2',
    stepNum: '02',
    title: 'Connection Request',
    timing: 'Day 1 • 11:30 AM',
    actionSummary: 'Personalized AI connection note referencing recent tech blog post.',
    detailPayload: {
      actionType: 'Invite Dispatched',
      previewText: '"Hi Sarah, loved your insights on SDR infrastructure. Would love to connect and follow your growth journey at CloudScale!"',
      metricStat: '38.4% Acceptance Rate',
      safetyRule: 'Strict 100/wk Safe Cap'
    },
    icon: UserPlus,
    badge: 'Invite Sent'
  },
  {
    id: 'l3',
    stepNum: '03',
    title: 'Invite Accepted',
    timing: 'Day 2 • 09:20 AM',
    actionSummary: 'Prospect accepts invitation. Outtricks logs event and schedules welcome DM.',
    detailPayload: {
      actionType: 'Accepted Notification',
      previewText: 'Sarah Jenkins accepted your connection request. Cooldown timer started (4 hours).',
      metricStat: 'Auto-Queued Follow-Up',
      safetyRule: 'Randomized 2-6 Hour Human Delay'
    },
    icon: CheckCircle2,
    badge: 'Accepted ✓'
  },
  {
    id: 'l4',
    stepNum: '04',
    title: 'Value DM Sent',
    timing: 'Day 2 • 02:45 PM',
    actionSummary: 'Contextual direct message sharing benchmark case study.',
    detailPayload: {
      actionType: 'Direct Message',
      previewText: '"Thanks for connecting Sarah! Saw you are reviewing outbound deliverability this quarter—thought you might find our multi-inbox playbook helpful."',
      metricStat: '24.8% DM Reply Rate',
      safetyRule: 'Native LinkedIn OAuth API'
    },
    icon: MessageSquare,
    badge: 'DM Delivered'
  },
  {
    id: 'l5',
    stepNum: '05',
    title: 'Positive Reply & CRM',
    timing: 'Day 2 • 04:10 PM',
    actionSummary: 'Prospect replies: "Let\'s chat Thursday!" Auto-pauses cadence & creates CRM deal.',
    detailPayload: {
      actionType: 'CRM Deal Created',
      previewText: '"Thanks! Would love to see a live demo of the multi-inbox rotation. Thursday 2 PM works."',
      metricStat: '$36,000 Deal Created',
      safetyRule: '0ms PostgreSQL Core Sync ✓'
    },
    icon: Building2,
    badge: 'Deal Won'
  }
];

const LINKEDIN_FAQS: FaqItem[] = [
  {
    question: 'Can I personalize LinkedIn connection requests and messages?',
    answer: 'Yes! Outtricks uses dynamic AI variables like {{first_name}}, {{company}}, {{recent_post_topic}}, and {{mutual_connections}} to write natural, context-rich notes that don\'t sound like robotic templates.'
  },
  {
    question: 'How does Outtricks protect my LinkedIn profile from account restrictions?',
    answer: 'Outtricks uses dedicated residential cloud proxies matching your local geographic area, randomized human typing delays, and enforces a strict safe cap of 100 connection requests per week.'
  },
  {
    question: 'Can LinkedIn sequences run automatically in the background?',
    answer: 'Yes. Once you define your sequence (Profile View → Wait 1h → Invite → Wait on Accept → Welcome DM), Outtricks executes every step automatically 24/7 in the cloud without keeping your browser open.'
  },
  {
    question: 'Can I track connection acceptance and reply rates?',
    answer: 'Yes! You get real-time analytics on profile views, connection acceptance rates, message delivery, reply sentiment, and conversion into booked sales demos.'
  },
  {
    question: 'Does LinkedIn conversation history sync with Deals CRM?',
    answer: 'Yes. Every connection accept, direct message, and prospect reply is automatically recorded to the unified contact timeline in Deals CRM on 1 PostgreSQL database with 0ms sync lag.'
  },
  {
    question: 'Can our sales team manage multiple LinkedIn accounts from one dashboard?',
    answer: 'Yes! You can connect multiple rep LinkedIn accounts, assign specific prospecting lists to individual reps, and monitor team performance from one centralized workspace.'
  },
  {
    question: 'Does Outtricks include a free trial for LinkedIn prospecting?',
    answer: 'Yes! Your 7-Day Free Trial includes full access to LinkedIn automation, AI message personalization, and live sandbox CRM sync.'
  }
];

export const LinkedInUseCasePage: React.FC = () => {
  // Sequence Animation State
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isSeqPlaying, setIsSeqPlaying] = useState<boolean>(true);

  // AI Connection Note Generator State
  const [targetName, setTargetName] = useState('Sarah Jenkins');
  const [targetRole, setTargetRole] = useState('VP of Growth');
  const [targetCompany, setTargetCompany] = useState('CloudScale AI');
  const [aiNote, setAiNote] = useState(`Hi Sarah, saw your recent post on scaling SDR outbound deliverability. Really resonated with your point on inbox rotation. Would love to connect and share notes!`);
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance sequence loop
  useEffect(() => {
    if (!isSeqPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % LINKEDIN_STAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isSeqPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRegenerateNote = () => {
    setIsGeneratingNote(true);
    setTimeout(() => {
      setIsGeneratingNote(false);
      setAiNote(`Hey Sarah, noticed CloudScale AI is aggressively scaling the sales team this quarter. Thought I'd reach out—would love to connect and follow your growth journey!`);
    }, 700);
  };

  const activeStage = LINKEDIN_STAGES[activeStageIdx];
  const ActiveStageIcon = activeStage.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Safe LinkedIn Prospecting & Social Selling Workflows | Outtricks"
        description="Automate warm LinkedIn interactions and connection requests with cloud pacing and zero account risk."
        canonical="https://outtricks.com/use-cases/linkedin-prospecting"
        keywords={["LinkedIn prospecting playbook","social selling automation","cloud LinkedIn sequences"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"LinkedIn Prospecting","url":"/use-cases/linkedin-prospecting"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Turn LinkedIn Into a Predictable Prospecting Channel)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            SAFE SOCIAL SELLING
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Turn LinkedIn Into a<br className="hidden sm:inline" /> Predictable Prospecting Channel
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Find the right people, personalize connection requests, automate follow-ups, and manage LinkedIn conversations without leaving your revenue workflow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start LinkedIn Outreach</span>
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
            <span className="text-[10px] text-slate-400 block uppercase">SAFE VOLUME CAP</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">100 / wk Limit</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">ACCEPTANCE RATE</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">38.4% Accepted</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">ACCOUNT SAFETY</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">0% Account Bans</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">CRM SYNC</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0ms Sync Lag</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: PROSPECT DISCOVERY (Find the Right People)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRECISE TARGETING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Find the Right Decision-Makers on LinkedIn
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Target key stakeholders across company headcount, seniority levels, geography, and real-time job change triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">TARGET ROLES</span>
            <div className="flex flex-wrap gap-1.5">
              {['VP Growth', 'Chief Revenue Officer', 'Head of Sales', 'Co-Founder'].map((r, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 border border-blue-200/60 text-[10px]">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">COMPANY & INDUSTRY</span>
            <div className="flex flex-wrap gap-1.5">
              {['B2B SaaS', 'FinTech', 'AI Software', '50–500 Employees'].map((c, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border text-[10px]">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">SENIORITY & GEOGRAPHY</span>
            <div className="flex flex-wrap gap-1.5">
              {['CXO / VP Tier', 'United States', 'United Kingdom', 'European Union'].map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-emerald-600 block text-[10px] font-bold uppercase">ICP MATCH ACCURACY</span>
            <div className="flex flex-wrap gap-1.5">
              {['98% Match Score', 'Active in last 7 days', 'Posted this week'].map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-[10px]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: AI PERSONALIZATION (Personalize Every Connection)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            HIGH-ACCEPTANCE NOTES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Personalize Every Connection Request With AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Generate relevant, authentic invite notes referencing recent posts, career updates, and industry insights.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                SJ
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{targetName}</h4>
                <p className="text-xs text-slate-500 font-sans">{targetRole} • <strong className="text-slate-700 dark:text-slate-300">{targetCompany}</strong></p>
              </div>
            </div>

            <button
              onClick={handleRegenerateNote}
              disabled={isGeneratingNote}
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isGeneratingNote ? 'Regenerating...' : 'Regenerate AI Note'}</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
              AI GENERATED INVITATION NOTE (UNDER 300 CHARACTERS)
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]">
              <textarea
                rows={3}
                value={aiNote}
                onChange={(e) => setAiNote(e.target.value)}
                className="w-full bg-transparent text-xs font-sans text-slate-800 dark:text-slate-200 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-1">
            <span>Character Count: {aiNote.length} / 300</span>
            <span className="text-emerald-600 font-bold">● 38.4% Average Acceptance Rate</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: LINKEDIN SEQUENCE BUILDER (Interactive Sequence Demo)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              AUTOMATED SOCIAL CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Build Automated LinkedIn Sequences
            </h2>
          </div>

          <button
            onClick={() => setIsSeqPlaying(!isSeqPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isSeqPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSeqPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>
        </div>

        {/* 5 Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {LINKEDIN_STAGES.map((st, idx) => {
            const StIcon = st.icon;
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setActiveStageIdx(idx);
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
                    {st.stepNum}
                  </span>
                  <StIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{st.title}</strong>
                <span className={`text-[10px] font-sans block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {st.timing}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStageIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  LINKEDIN STAGE {activeStage.stepNum} • {activeStage.timing}
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {activeStage.title}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              {activeStage.badge}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeStage.actionSummary}
          </p>

          {activeStage.detailPayload.previewText && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-sans text-slate-300 space-y-1">
              <strong className="text-blue-400 block">{activeStage.detailPayload.actionType}:</strong>
              <p>{activeStage.detailPayload.previewText}</p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-xs font-sans text-slate-400 border-t border-slate-800">
            <span>Safety Rule: {activeStage.detailPayload.safetyRule}</span>
            <span className="text-emerald-400 font-bold">{activeStage.detailPayload.metricStat}</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: ACTIVITY TRACKING (React to Every Signal)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REAL-TIME SIGNALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            React to Every Engagement Signal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Automate actions based on exact prospect behavior without manual inbox monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-slate-400 block text-[10px] uppercase">SIGNAL 01</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">Profile Viewed</strong>
            <p className="text-slate-500 font-sans text-xs">Soft profile touch logged in activity feed.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase">SIGNAL 02</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">Invite Accepted</strong>
            <p className="text-slate-500 font-sans text-xs">Queues welcome DM after human delay.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px] uppercase">SIGNAL 03</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">DM Delivered</strong>
            <p className="text-slate-500 font-sans text-xs">Delivery receipt confirmed by LinkedIn.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-1.5">
            <span className="text-emerald-600 block text-[10px] uppercase font-bold">SIGNAL 04</span>
            <strong className="text-emerald-700 dark:text-emerald-300 block font-bold text-sm">Positive Reply</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans text-xs">Auto-pauses cadence & creates CRM deal.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1.5">
            <span className="text-indigo-600 block text-[10px] uppercase">SIGNAL 05</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">Follow-Up Queued</strong>
            <p className="text-slate-500 font-sans text-xs">Next value-add touchpoint scheduled.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: CONVERSATION MANAGEMENT (Keep Conversations Moving)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED INBOX
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Keep Conversations Moving
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Reply to LinkedIn DMs directly from Outtricks with AI smart suggestions and 1-click meeting links.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">LinkedIn Thread • Sarah Jenkins</h4>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-bold">
              ● Positive Intent (96%)
            </span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-100 text-slate-800 dark:text-slate-200 max-w-lg">
              <strong className="text-blue-600 block text-[10px] uppercase">YOU SENT (VIA LINKEDIN DM):</strong>
              "Thanks for connecting Sarah! Saw you are reviewing outbound deliverability this quarter—thought you might find our multi-inbox playbook helpful."
            </div>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#181818] text-slate-800 dark:text-slate-200 max-w-lg ml-auto">
              <strong className="text-emerald-600 block text-[10px] uppercase text-right">SARAH REPLIED:</strong>
              "Thanks for sharing! Would love to see a live demo of the multi-inbox rotation. Thursday 2 PM works."
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-[#2A2A2A] text-xs font-sans text-slate-500">
            <span>1-Click AI Quick Reply: "Sent demo calendar link for Thursday 2 PM"</span>
            <span className="text-blue-600 font-bold">Deal Created in Deals CRM ✓</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: MULTI-CHANNEL WORKFLOW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            OMNICHANNEL PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Connect LinkedIn With Your Revenue Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Coordinate LinkedIn touches with cold email sequences, Voice AI qualification, and Deals CRM.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-blue-600 font-bold block">1. LINKEDIN TOUCH</span>
              <strong className="text-slate-900 dark:text-white block truncate">Safe Cloud Proxies</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">2. COLD EMAIL</span>
              <strong className="text-slate-900 dark:text-white block truncate">24 Rotating Inboxes</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-emerald-600 font-bold block">3. VOICE AI SDR</span>
              <strong className="text-slate-900 dark:text-white block truncate">&lt;400ms WebRTC Call</strong>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-blue-600 text-white space-y-1 shadow-sm">
              <span className="text-blue-100 font-bold block">4. DEALS CRM</span>
              <strong className="text-white block truncate">0ms Sync Lag ✓</strong>
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
            <span>LINKEDIN AUTOMATION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Scale Your Social Selling Engine Safely
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Connect your LinkedIn account with dedicated residential cloud proxies and start booking meetings risk-free.
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
          7-Day Free Trial • Dedicated Cloud Proxies • 100% Account Safety Guarantee
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LINKEDIN QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {LINKEDIN_FAQS.map((faq, fIdx) => {
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
