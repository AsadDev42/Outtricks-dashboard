import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
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
  TrendingUp, 
  Award, 
  MoveRight, 
  ExternalLink,
  Users,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  experience: string;
  location: string;
  skills: string[];
  email: string;
  phone: string;
  avatar: string;
  seniority: string;
  matchScore: number;
  recentActivity: string;
  hiringContext: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  timeText: string;
  type: 'message' | 'reply' | 'followup' | 'interview' | 'placement';
  desc: string;
  detail: string;
  icon: any;
}

interface FaqItem {
  question: string;
  answer: string;
}

const SAMPLE_CANDIDATES: CandidateProfile[] = [
  {
    id: 'c1',
    name: 'David Zhou',
    role: 'Staff Distributed Systems Engineer',
    company: 'Ex-Stripe / CloudScale',
    experience: '8+ Years Exp',
    location: 'San Francisco, CA (Open to Remote)',
    skills: ['Rust', 'Go', 'Kubernetes', 'Kafka', 'PostgreSQL'],
    email: 'david.zhou.eng@gmail.com',
    phone: '+1 (415) 782-9910',
    avatar: 'DZ',
    seniority: 'Staff / Principal',
    matchScore: 98,
    recentActivity: 'Recently contributed to high-throughput open-source Kafka client',
    hiringContext: 'Targeting $220k–$260k Base + 0.4% Equity at Series A/B startup'
  },
  {
    id: 'c2',
    name: 'Sarah Lindqvist',
    role: 'VP of Engineering',
    company: 'FinPulse Tech',
    experience: '12+ Years Exp',
    location: 'New York, NY',
    skills: ['Engineering Management', 'System Architecture', 'FinTech', 'AWS'],
    email: 'sarah.lindqvist@finpulse.io',
    phone: '+1 (212) 903-4412',
    avatar: 'SL',
    seniority: 'Executive / VP',
    matchScore: 96,
    recentActivity: 'Scaled engineering team from 12 to 65 across US and EU',
    hiringContext: 'Open to CTO / VP Eng roles at fast-growing Series B companies'
  },
  {
    id: 'c3',
    name: 'Marcus Bell',
    role: 'Lead Full-Stack AI Engineer',
    company: 'HyperGrowth Labs',
    experience: '6+ Years Exp',
    location: 'Austin, TX',
    skills: ['TypeScript', 'Next.js', 'Python', 'LLM Agents', 'WebRTC'],
    email: 'marcus.bell.dev@outlook.com',
    phone: '+1 (512) 674-1290',
    avatar: 'MB',
    seniority: 'Senior / Lead',
    matchScore: 94,
    recentActivity: 'Built production LLM streaming application with sub-400ms response time',
    hiringContext: 'Looking for founding engineer or early AI product lead position'
  }
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'e1',
    title: 'Initial Multi-Channel Outreach Dispatched',
    timeText: 'Day 1 • 09:30 AM',
    type: 'message',
    desc: 'Personalized email referencing David\'s recent open-source Rust contributions sent from 24-inbox rotator.',
    detail: 'Subject: David — Staff Distributed Systems role @ high-growth Series A. Open rate: 100% Inboxed.',
    icon: Mail
  },
  {
    id: 'e2',
    title: 'Candidate Replied with High Interest',
    timeText: 'Day 2 • 02:15 PM',
    type: 'reply',
    desc: 'David replied: "Thanks for reaching out. Timing is great as I\'m exploring remote staff opportunities. Would love to see the JD."',
    detail: 'Sentiment: Positive (98% Score). Auto-tagged as Active Candidate Pipeline.',
    icon: MessageSquare
  },
  {
    id: 'e3',
    title: 'Automated Recruiter Follow-Up & Calendar Link',
    timeText: 'Day 2 • 02:18 PM',
    type: 'followup',
    desc: 'Outtricks auto-sent compensation brief and 15-minute introductory screening call link.',
    detail: 'Instant response velocity: 3 minutes.',
    icon: Clock
  },
  {
    id: 'e4',
    title: 'Screening Interview Booked & Synced',
    timeText: 'Day 3 • 11:00 AM',
    type: 'interview',
    desc: '15-minute intro screen conducted. Candidate qualified for technical depth and $240k compensation fit.',
    detail: 'Interview notes and scorecard synced to Deals CRM and submitted to client hiring manager.',
    icon: Calendar
  },
  {
    id: 'e5',
    title: 'Offer Accepted & Placement Signed ✓',
    timeText: 'Day 18 • 04:00 PM',
    type: 'placement',
    desc: 'Client extended offer: $245,000 Base + 0.45% Equity. David accepted.',
    detail: 'Contingency fee generated: $49,000 ARR Fee (20% placement tier).',
    icon: Award
  }
];

const RECRUITING_FAQS: FaqItem[] = [
  {
    question: 'Can recruiters use Outtricks for both candidate sourcing and client business development?',
    answer: 'Yes! Outtricks is built to power both sides of your recruiting desk: candidate talent discovery (sourcing passive engineers, executives, and specialists) and client BD (prospecting VPs of Engineering, Talent Leaders, and Founders who have active open job requisitions).'
  },
  {
    question: 'How accurate is the contact data for passive candidates?',
    answer: 'Outtricks uses automated multiAttribute search Contact Search to verify personal emails, work emails, direct mobile phone numbers, and LinkedIn URLs with real-time SMTP handshakes and catch-all validation.'
  },
  {
    question: 'How does Outtricks personalize outreach to busy technical candidates?',
    answer: 'Outtricks AI analyzes candidate GitHub repositories, recent LinkedIn activity, past company pedigree, and exact tenure to draft genuine, tailored outreach that avoids sounding like automated recruiter spam.'
  },
  {
    question: 'Is LinkedIn automation safe for recruiter profiles?',
    answer: 'Yes. Outtricks uses dedicated residential cloud proxies, randomized human typing cadences, and strictly caps outreach to 100 safe connection invites per week to keep your LinkedIn recruiter account 100% compliant.'
  },
  {
    question: 'Does Outtricks integrate with Applicant Tracking Systems (ATS) and CRMs?',
    answer: 'Yes. Outtricks includes Deals CRM with native recruitment pipeline tracking (Sourced → Screened → Client Interview → Offer → Placed) and supports bidirectional webhook sync with Greenhouse, Lever, Ashby, and Bullhorn.'
  },
  {
    question: 'How fast can a staffing agency scale outbound client prospecting?',
    answer: 'With 24 rotating inboxes and automated domain warmup, staffing operators can scale outreach to 1,500+ hiring managers weekly without hurting domain reputation or ending up in spam folders.'
  },
  {
    question: 'Can multiple recruiters collaborate in one agency workspace?',
    answer: 'Yes. Outtricks supports collaborative team workspaces with shared candidate suppression lists (so two recruiters never contact the same candidate twice), role-based permissions, and team performance analytics.'
  }
];

export const RecruitersPage: React.FC = () => {
  // Candidate Search Filters State
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);

  // Two Revenue Motions State ('talent' or 'client')
  const [activeMotion, setActiveMotion] = useState<'talent' | 'client'>('talent');

  // AI Personalization Simulator State
  const [candidateRole, setCandidateRole] = useState('Staff Distributed Systems Engineer');
  const [candidateCompany, setCandidateCompany] = useState('Ex-Stripe / CloudScale');
  const [hiringContext, setHiringContext] = useState('$240k Base + Equity • Series A Infra Startup');
  const [generatedPitch, setGeneratedPitch] = useState(`Hi David,

Saw your recent work with Kafka client throughput and your distributed systems track record at Stripe.

I'm partnering directly with the founders of a high-growth Series A infrastructure startup (backed by Sequoia). They're looking for their founding Staff Distributed Systems Engineer to lead core engine architecture ($230k–$260k Base + generous early equity).

Open to a discrete 10-minute preview call this week?

Best,
Senior Tech Recruiter`);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // 5-Stage Automation Step State
  const [activeAutoStepIdx, setActiveAutoStepIdx] = useState<number>(0);

  // Timeline Event Modal State
  const [activeTimelineModal, setActiveTimelineModal] = useState<TimelineEvent | null>(null);

  // FAQ State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRegeneratePitch = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setGeneratedPitch(`Hey David,

Impressive Rust & distributed systems background—especially your contributions to high-throughput data streams.

Our client (Series A, $18M funding) is building next-gen developer infrastructure and needs a Staff Engineer to own consensus and low-latency storage ($240k Base + 0.5% equity).

Would love to share the confidential founder brief if you're open to exploring?`);
    }, 750);
  };

  const filteredCandidates = SAMPLE_CANDIDATES.filter(c => {
    if (roleFilter === 'all') return true;
    if (roleFilter === 'staff' && c.seniority.includes('Staff')) return true;
    if (roleFilter === 'exec' && c.seniority.includes('Executive')) return true;
    if (roleFilter === 'lead' && c.seniority.includes('Lead')) return true;
    return true;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Talent Sourcing & Candidate Outreach for Recruiters | Outtricks"
        description="Source passive executive talent with 480M+ profiles, direct mobile phones, and automated multi-channel follow-ups."
        canonical="https://outtricks.com/solutions/recruiters"
        keywords={["recruitment outreach platform","talent sourcing database","candidate email sequences","executive search tool"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"Recruiters & Staffing","url":"/solutions/recruiters"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (RECRUITERS & STAFFING)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            RECRUITERS & STAFFING
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Find the Right People<br className="hidden sm:inline" /> Before Your Competitors Do
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover talent and decision-makers, personalize outreach, automate follow-ups, and manage every conversation from one platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Recruiting</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">CANDIDATE ENGAGEMENT</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">38.4% Response Rate</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">DATA VERIFICATION</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">15-Source multiAttribute</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-emerald-600 font-bold uppercase">PLACEMENT SPEED</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">2x Faster Time-to-Hire</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: DISCOVERY (Interactive Candidate & Client Search)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRECISION SOURCING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Find Decision-Makers and Talent Faster
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Search 480M+ verified profiles with recruiter-grade filters including technical skills, tenure, and location. Click any profile to inspect data.
          </p>
        </div>

        {/* Search Matrix */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans font-bold text-slate-400">SENIORITY:</span>
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                  roleFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300'
                }`}
              >
                All Roles
              </button>
              <button
                onClick={() => setRoleFilter('staff')}
                className={`px-3 py-1 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                  roleFilter === 'staff' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300'
                }`}
              >
                Staff / Principal
              </button>
              <button
                onClick={() => setRoleFilter('exec')}
                className={`px-3 py-1 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                  roleFilter === 'exec' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300'
                }`}
              >
                Executive / VP
              </button>
              <button
                onClick={() => setRoleFilter('lead')}
                className={`px-3 py-1 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all ${
                  roleFilter === 'lead' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300'
                }`}
              >
                Lead Engineers
              </button>
            </div>

            <span className="text-xs font-sans text-emerald-600 font-bold">● Direct Cell Phones & Personal Emails</span>
          </div>

          {/* Candidate List Cards */}
          <div className="space-y-3">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 hover:border-blue-500/80 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {candidate.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {candidate.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-sans font-bold">
                        {candidate.matchScore}% Match
                      </span>
                      <span className="text-xs text-slate-400 font-sans">• {candidate.experience}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {candidate.role} @ <strong className="text-slate-900 dark:text-white">{candidate.company}</strong> ({candidate.location})
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {candidate.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-[10px] font-sans text-slate-600 dark:text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button className="px-4 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 text-xs font-bold font-sans group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-xs">
                    Inspect Candidate ›
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {selectedCandidate.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedCandidate.role} • <strong className="text-slate-700 dark:text-slate-300">{selectedCandidate.company}</strong>
                  </p>
                </div>
              </div>

              <button onClick={() => setSelectedCandidate(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Personal Email:</span>
                <strong className="text-blue-600 dark:text-blue-400 font-bold">{selectedCandidate.email}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Direct Mobile Phone:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedCandidate.phone}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Recent Technical Activity:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {selectedCandidate.recentActivity}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Target Compensation & Stage:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {selectedCandidate.hiringContext}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Dispatch Recruiter Pitch</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: TWO REVENUE MOTIONS (Talent Discovery vs Client BD)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DUAL-ENGINE PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Build Both Sides of Your Recruiting Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Recruiting agencies need two continuous engines: sourcing top-tier candidate talent and winning new client staffing agreements.
          </p>
        </div>

        {/* 2 Selectable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Talent Discovery Tab */}
          <button
            onClick={() => setActiveMotion('talent')}
            className={`p-6 rounded-3xl border text-left transition-all cursor-pointer space-y-3 ${
              activeMotion === 'talent'
                ? 'bg-blue-50/80 dark:bg-white/[0.04] border-blue-500 shadow-lg shadow-blue-500/10'
                : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                activeMotion === 'talent' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                MOTION 01
              </span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Talent Discovery (Candidate Sourcing)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Candidate $\rightarrow$ Profile $\rightarrow$ Outreach $\rightarrow$ Response $\rightarrow$ Interview Screen
              </p>
            </div>
          </button>

          {/* Client Acquisition Tab */}
          <button
            onClick={() => setActiveMotion('client')}
            className={`p-6 rounded-3xl border text-left transition-all cursor-pointer space-y-3 ${
              activeMotion === 'client'
                ? 'bg-blue-50/80 dark:bg-white/[0.04] border-blue-500 shadow-lg shadow-blue-500/10'
                : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                activeMotion === 'client' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                MOTION 02
              </span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Client Acquisition (Staffing Business Dev)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Company $\rightarrow$ Decision Maker $\rightarrow$ Outreach $\rightarrow$ Contract Meeting $\rightarrow$ Placement
              </p>
            </div>
          </button>

        </div>

        {/* Selected Motion Dynamic Visualizer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div>
              <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                ACTIVE WORKFLOW PIPELINE
              </span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {activeMotion === 'talent' ? 'Candidate Headhunting Sequence' : 'Client Staffing BD Outbound'}
              </h4>
            </div>
            <span className="text-xs font-sans text-emerald-600 font-bold">● Continuous Multi-Channel Automation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs font-sans">
            {activeMotion === 'talent' ? (
              <>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">01 • SOURCING</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">480M+ Candidates</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">02 • Verify</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">Personal Email + Phone</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">03 • OUTREACH</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">Email + LinkedIn Touch</strong>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] text-emerald-600 font-bold block uppercase">04 • RESPONSE</span>
                  <strong className="text-emerald-950 dark:text-emerald-200 block font-bold">38.4% Reply Rate</strong>
                </div>
                <div className="p-3 rounded-2xl bg-blue-600 text-white text-center space-y-1 shadow-sm">
                  <span className="text-[10px] text-blue-100 font-bold block uppercase">05 • INTERVIEW</span>
                  <strong className="text-white block font-bold">Screening Booked ✓</strong>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">01 • ACCOUNT</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">Companies Hiring SDRs/Eng</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">02 • BUYER</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">VP Eng / Head of Talent</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border text-center space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">03 • OUTREACH</span>
                  <strong className="text-slate-900 dark:text-white block font-bold">Staffing Value Pitch</strong>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] text-emerald-600 font-bold block uppercase">04 • MEETING</span>
                  <strong className="text-emerald-950 dark:text-emerald-200 block font-bold">Fee Agreement Call</strong>
                </div>
                <div className="p-3 rounded-2xl bg-blue-600 text-white text-center space-y-1 shadow-sm">
                  <span className="text-[10px] text-blue-100 font-bold block uppercase">05 • PLACEMENT</span>
                  <strong className="text-white block font-bold">$49,000 Fee Won ✓</strong>
                </div>
              </>
            )}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: PERSONALIZATION (Recruiter AI Message Generator)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            HIGH-REPLY TALENT COPY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Personalize Every Conversation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Generate authentic messages referencing technical achievements, GitHub activity, and compensation targets.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A] text-xs font-sans">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">CANDIDATE ROLE:</span>
              <strong className="text-slate-900 dark:text-white font-bold truncate block">{candidateRole}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">CURRENT / PAST PEDIGREE:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{candidateCompany}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#2A2A2A]">
              <span className="text-slate-400 block text-[10px]">CLIENT OPPORTUNITY & COMP:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold truncate block">{hiringContext}</strong>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                AI RECRUITER HEADHUNTING PITCH
              </span>
              <button
                onClick={handleRegeneratePitch}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isGeneratingAi ? 'Regenerating...' : 'Regenerate Candidate Pitch'}</span>
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
            <span>Dynamic Variables: {'{{candidate_name}}'}, {'{{github_repo}}'}, {'{{comp_range}}'}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">● 38.4% Average Positive Response</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 5: FOLLOW-UP AUTOMATION (5-Stage Workflow)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AUTOMATED NURTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Never Lose a Valuable Conversation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Top candidates often ignore message #1. Outtricks coordinates smart multi-channel touches that pause automatically the moment they reply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {[
            { stepNum: '01', title: 'Profile Found', desc: 'Auto-scraped & verified with direct phone & personal email.', icon: Search },
            { stepNum: '02', title: 'Initial Message', desc: 'Dispatched via rotating warm mailbox with personalized technical line.', icon: Mail },
            { stepNum: '03', title: 'LinkedIn Follow-Up', desc: 'Safe cloud proxy profile view & connection touch if no reply in 48h.', icon: Linkedin },
            { stepNum: '04', title: 'Positive Response', desc: 'Candidate expresses interest and requests confidential JD overview.', icon: MessageSquare },
            { stepNum: '05', title: 'Recruiter Action', desc: '1-click calendar sync locks 15-minute screening call into schedule.', icon: Calendar }
          ].map((st, idx) => {
            const StIcon = st.icon;
            const isSelected = activeAutoStepIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveAutoStepIdx(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    STEP {st.stepNum}
                  </span>
                  <StIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{st.title}</strong>
                <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {st.desc}
                </p>
              </button>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: CONVERSATION TIMELINE (Interactive Event Timeline)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED TALENT RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Keep Every Conversation Organized
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            From first cold email to signed offer letter, track the entire candidate lifecycle on one clean PostgreSQL timeline. Click any event to inspect logs.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="space-y-3">
            {TIMELINE_EVENTS.map((evt) => {
              const EvtIcon = evt.icon;
              return (
                <div
                  key={evt.id}
                  onClick={() => setActiveTimelineModal(evt)}
                  className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#181818]/40 border border-slate-200/70 dark:border-[#2A2A2A]/70 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <EvtIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {evt.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[10px] font-sans text-slate-400 font-bold px-2 py-0.5 rounded bg-white dark:bg-[#141414] border">
                      {evt.timeText}
                    </span>
                    <button className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-bold font-sans group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Details ›
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Timeline Modal */}
      {activeTimelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  TIMELINE EVENT LOG
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {activeTimelineModal.title}
                </h4>
              </div>

              <button onClick={() => setActiveTimelineModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Timestamp:</span>
                <strong className="text-slate-900 dark:text-white">{activeTimelineModal.timeText}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Event Description:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {activeTimelineModal.desc}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">System Telemetry & Notes:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {activeTimelineModal.detail}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTimelineModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close Event Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 7: RECRUITING PERFORMANCE (Interactive Metrics & Lift)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            RECRUITING REVENUE VELOCITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Turn More Conversations Into Placements
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-slate-400 block text-[10px]">PROFILES CONTACTED</span>
            <strong className="text-slate-900 dark:text-white text-lg font-bold">1,840</strong>
            <span className="text-[10px] text-emerald-600 block">100% Inboxed</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">RESPONSE RATE</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">38.4%</strong>
            <span className="text-[10px] text-slate-500 block">+14% vs InMail</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">INTERVIEWS SCREENED</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">64 Demos</strong>
            <span className="text-[10px] text-slate-500 block">85% Qualified</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-indigo-600 dark:text-indigo-400 block text-[10px]">PLACEMENTS WON</span>
            <strong className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">14 Hires</strong>
            <span className="text-[10px] text-slate-500 block">18 Days Avg</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs space-y-1">
            <span className="text-emerald-600 block text-[10px]">PLACEMENT FEES</span>
            <strong className="text-emerald-700 dark:text-emerald-300 text-lg font-bold">$348,000</strong>
            <span className="text-[10px] text-emerald-600 block font-bold">+42% Margin Lift</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA (Recruiting Focus)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED RECRUITMENT ENGINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Recruit Faster. Sell Smarter.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Discover top candidates and win high-margin staffing contracts with unified outbound automation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Recruiting</span>
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
          7-Day Free Trial • Instant Candidate Sourcing • Built for Staffing Firms
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            RECRUITING QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {RECRUITING_FAQS.map((faq, fIdx) => {
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
