import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Clock, 
  CheckCircle2, 
  Award, 
  Video, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  TrendingUp, 
  BookOpen,
  SlidersHorizontal,
  Flame,
  Volume2,
  Tv
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface MasterclassVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Masterclass';
  description: string;
  instructor: string;
  views: string;
  thumbnailGradient: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURED_MASTERCLASS: MasterclassVideo = {
  id: 'master-01',
  title: 'Build a Complete Outbound Engine: From Zero to Repeatable Pipeline',
  category: 'Full Architecture',
  duration: '30 mins',
  difficulty: 'Masterclass',
  description: 'The step-by-step masterclass covering 480M+ prospect search, multiAttribute search Contact Search, 24-inbox rotation with automated warmup, sub-400ms Voice SDR qualification, and single PostgreSQL Deals CRM synchronization.',
  instructor: 'Alex Miller (Lead Outbound Architect)',
  views: '12,480 Views',
  thumbnailGradient: 'from-blue-600 via-indigo-700 to-blue-800'
};

const TUTORIAL_CATEGORIES = {
  leadGen: [
    {
      id: 'lg-01',
      title: 'Finding High-Intent Decision Makers in 480M+ Pool',
      category: 'Lead Generation',
      duration: '14 mins',
      difficulty: 'Intermediate' as const,
      description: 'How to bypass gatekeepers and query verified C-level and VP contacts with real-time SMTP handshakes.',
      instructor: 'Sarah Jenkins',
      views: '5,120 Views',
      thumbnailGradient: 'from-blue-500 to-sky-700'
    },
    {
      id: 'lg-02',
      title: 'Building Precision 8-Dimension ICP Filters',
      category: 'Lead Generation',
      duration: '18 mins',
      difficulty: 'Beginner' as const,
      description: 'Filter target accounts by headcount velocity, installed software, revenue tiers, and funding rounds.',
      instructor: 'David Miller',
      views: '4,890 Views',
      thumbnailGradient: 'from-sky-600 to-blue-800'
    },
    {
      id: 'lg-03',
      title: '15-Source contact search & Mobile Dial Verification',
      category: 'Lead Generation',
      duration: '12 mins',
      difficulty: 'Advanced' as const,
      description: 'Cascading multiple data providers sequentially to achieve 85%+ direct phone and email match rates.',
      instructor: 'Alex Chen',
      views: '3,740 Views',
      thumbnailGradient: 'from-indigo-600 to-blue-900'
    }
  ],
  coldEmail: [
    {
      id: 'ce-01',
      title: '24-Inbox Smart Rotation & DNS Architecture (SPF, DKIM, DMARC)',
      category: 'Cold Email',
      duration: '22 mins',
      difficulty: 'Intermediate' as const,
      description: 'Complete DNS setup, custom tracking domains, and automated peer-to-peer warmup schedules.',
      instructor: 'Sarah Jenkins',
      views: '8,450 Views',
      thumbnailGradient: 'from-blue-600 to-indigo-800'
    },
    {
      id: 'ce-02',
      title: 'Dynamic Spintax & AI Personalization at Scale',
      category: 'Cold Email',
      duration: '16 mins',
      difficulty: 'Beginner' as const,
      description: 'Generate unique syntactic sentence variations for every recipient to eliminate duplicate spam filters.',
      instructor: 'Elena Rostova',
      views: '6,210 Views',
      thumbnailGradient: 'from-indigo-500 to-blue-700'
    },
    {
      id: 'ce-03',
      title: 'Deliverability Optimization: Maintaining 99.4% Inbox Placement',
      category: 'Cold Email',
      duration: '19 mins',
      difficulty: 'Advanced' as const,
      description: 'How to monitor mailbox health scores, avoid spam words, and handle Google/Outlook throttling.',
      instructor: 'David Miller',
      views: '7,180 Views',
      thumbnailGradient: 'from-blue-700 to-slate-900'
    }
  ],
  linkedin: [
    {
      id: 'li-01',
      title: 'Ban-Free LinkedIn Automation with Dedicated Cloud Proxies',
      category: 'LinkedIn',
      duration: '15 mins',
      difficulty: 'Intermediate' as const,
      description: 'Why residential cloud proxies and human-like typing delays protect accounts from restrictions.',
      instructor: 'Marcus Vance',
      views: '4,930 Views',
      thumbnailGradient: 'from-blue-600 to-sky-600'
    },
    {
      id: 'li-02',
      title: 'Writing Connection Request Notes That Get 38%+ Acceptance',
      category: 'LinkedIn',
      duration: '11 mins',
      difficulty: 'Beginner' as const,
      description: 'Copy frameworks under 300 characters referencing recent posts, career shifts, and common ground.',
      instructor: 'Elena Rostova',
      views: '5,670 Views',
      thumbnailGradient: 'from-sky-500 to-indigo-700'
    },
    {
      id: 'li-03',
      title: 'Multi-Touch Social Selling & Follow-Up Cadences',
      category: 'LinkedIn',
      duration: '17 mins',
      difficulty: 'Advanced' as const,
      description: 'Coordinating profile views, connection invites, and value DMs with cold email touches.',
      instructor: 'Marcus Vance',
      views: '4,210 Views',
      thumbnailGradient: 'from-indigo-600 to-blue-800'
    }
  ],
  voiceAi: [
    {
      id: 'va-01',
      title: 'Configuring Sub-400ms WebRTC Voice AI SDRs',
      category: 'Voice AI SDR',
      duration: '24 mins',
      difficulty: 'Advanced' as const,
      description: 'Streaming raw Opus audio over UDP directly to edge nodes for zero-lag conversational turn-taking.',
      instructor: 'Alex Miller',
      views: '9,840 Views',
      thumbnailGradient: 'from-blue-600 to-indigo-800'
    },
    {
      id: 'va-02',
      title: 'Handling Objections & Speed-to-Lead Inbound Calls',
      category: 'Voice AI SDR',
      duration: '18 mins',
      difficulty: 'Intermediate' as const,
      description: 'Calling website demo requests within 45s and overcoming pricing and competitor objections.',
      instructor: 'Sarah Jenkins',
      views: '6,520 Views',
      thumbnailGradient: 'from-indigo-700 to-blue-900'
    },
    {
      id: 'va-03',
      title: 'Automated Live Calendar Booking via Google/Outlook API',
      category: 'Voice AI SDR',
      duration: '15 mins',
      difficulty: 'Intermediate' as const,
      description: 'Checking real-time rep availability and locking in confirmed calendar demo slots during live calls.',
      instructor: 'Alex Chen',
      views: '5,310 Views',
      thumbnailGradient: 'from-blue-600 to-blue-800'
    }
  ],
  crmPipeline: [
    {
      id: 'crm-01',
      title: 'Managing Deals & Pipeline Stages on 1 PostgreSQL Core',
      category: 'CRM & Pipeline',
      duration: '16 mins',
      difficulty: 'Beginner' as const,
      description: 'How a single database architecture eliminates webhook sync lag, duplicate entries, and Zapier errors.',
      instructor: 'David Miller',
      views: '4,150 Views',
      thumbnailGradient: 'from-slate-700 to-blue-900'
    },
    {
      id: 'crm-02',
      title: 'Zero-Lag Cross-Channel Activity Logging & Attribution',
      category: 'CRM & Pipeline',
      duration: '20 mins',
      difficulty: 'Advanced' as const,
      description: 'Tracking complete prospect touchpoints from first search to email reply and signed contract.',
      instructor: 'Alex Miller',
      views: '3,890 Views',
      thumbnailGradient: 'from-indigo-600 to-slate-900'
    },
    {
      id: 'crm-03',
      title: 'Automating Rep Assignments & Slack Handoffs',
      category: 'CRM & Pipeline',
      duration: '13 mins',
      difficulty: 'Intermediate' as const,
      description: 'Instantly notifying Account Executives with audio recordings and AI summary notes on positive replies.',
      instructor: 'Sarah Jenkins',
      views: '4,460 Views',
      thumbnailGradient: 'from-blue-800 to-indigo-950'
    }
  ],
  fullWorkflows: [
    {
      id: 'fw-01',
      title: 'Complete 6-Engine Workflow: Lead → Verify → Email → LinkedIn → Voice → CRM',
      category: 'End-to-End Flow',
      duration: '32 mins',
      difficulty: 'Masterclass' as const,
      description: 'The end-to-end master tutorial showing the complete outbound pipeline executing without human intervention.',
      instructor: 'Alex Miller',
      views: '14,200 Views',
      thumbnailGradient: 'from-blue-600 via-indigo-600 to-emerald-600'
    },
    {
      id: 'fw-02',
      title: 'Speed-to-Lead Inbound Demo Flow (< 45s Response)',
      category: 'End-to-End Flow',
      duration: '21 mins',
      difficulty: 'Masterclass' as const,
      description: 'How to ingest landing page forms, multiAttribute Verify in 10s, trigger Voice AI in 35s, and lock meetings.',
      instructor: 'Sarah Jenkins',
      views: '8,920 Views',
      thumbnailGradient: 'from-emerald-600 via-blue-600 to-indigo-700'
    },
    {
      id: 'fw-03',
      title: 'Agency Multi-Client Workspace & White-Label Setup',
      category: 'End-to-End Flow',
      duration: '28 mins',
      difficulty: 'Masterclass' as const,
      description: 'How lead gen agencies scale from 5 to 50+ clients with pooled wallets, custom domains, and isolated pipelines.',
      instructor: 'Marcus Vance',
      views: '7,640 Views',
      thumbnailGradient: 'from-blue-600 via-indigo-700 to-blue-800'
    }
  ]
};

const MASTERCLASS_FAQS: FaqItem[] = [
  {
    question: 'Are these video masterclasses completely free to watch?',
    answer: 'Yes! All video masterclasses, architecture breakdowns, and tutorial lessons in the Outtricks Academy are 100% free for revenue teams, founders, and agency operators.'
  },
  {
    question: 'Do I need technical coding knowledge to follow along?',
    answer: 'No coding is required. Outtricks is built for revenue operators with a visual drag-and-drop Flow Builder, 1-click DNS wizards, and pre-built campaign templates.'
  },
  {
    question: 'Can I earn an Outbound Specialist Certification badge?',
    answer: 'Yes! Completing all 6 core masterclass tracks unlocks your official Outtricks Certified Outbound Specialist badge, which can be added to your LinkedIn profile and resume.'
  },
  {
    question: 'How often are new tutorials and playbooks released?',
    answer: 'We publish new video masterclasses weekly covering latest deliverability changes, AI SDR prompt engineering, and real-world multi-channel campaign tear-downs.'
  },
  {
    question: 'Can I replicate these exact workflows inside my Outtricks account?',
    answer: 'Yes. Every tutorial includes pre-configured workflow templates that you can import into your Outtricks workspace in 1 click.'
  },
  {
    question: 'Is there live support if I get stuck on a module?',
    answer: 'Yes! Outtricks includes 24/7 in-app live chat support and bi-weekly live Q&A office hours with our lead revenue engineers.'
  },
  {
    question: 'Does Outtricks provide a free trial to test these tutorials live?',
    answer: 'Yes! You can start a 7-Day Free Trial with instant sandbox access to all 6 revenue engines, 480M+ lead search, contact search, and Deals CRM.'
  }
];

export const AcademyPage: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<MasterclassVideo | null>(null);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderVideoCard = (video: MasterclassVideo) => (
    <div
      key={video.id}
      onClick={() => setActiveVideoModal(video)}
      className="group block h-full cursor-pointer"
    >
      <Card3DTilt maxTilt={4} scale={1.01} className="h-full">
        <div className="h-full rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 group-hover:border-blue-500/80 transition-all flex flex-col justify-between overflow-hidden">
          
          {/* Video Thumbnail Header */}
          <div className={`relative h-40 bg-gradient-to-br ${video.thumbnailGradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>

            <div className="flex items-center justify-between relative z-10 text-[10px] font-sans font-bold">
              <span className="px-2 py-0.5 rounded bg-slate-950/60 backdrop-blur-xs">
                {video.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-950/60 backdrop-blur-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-sans text-slate-200">
              <span>{video.category}</span>
              <span>{video.views}</span>
            </div>

          </div>

          {/* Video Details */}
          <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {video.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-[11px] font-sans text-slate-400">
              <span>{video.instructor}</span>
              <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                Watch Lesson ›
              </span>
            </div>
          </div>

        </div>
      </Card3DTilt>
    </div>
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outbound Masterclasses & Video Academy | Outtricks"
        description="Watch live workflow setups, cold email copywriting teardowns, and Voice AI call training."
        canonical="https://outtricks.com/resources/academy"
        keywords={["outbound sales academy","cold email masterclass","Voice AI SDR tutorials","sales video training"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Academy","url":"/resources/academy"}]}
      />
      
      {/* =========================================================================
          PAGE HEADER: Outbound Masterclasses
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Tv className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            VIDEO MASTERCLASSES & CERTIFICATION
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Outbound Masterclasses
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Watch practical walkthroughs showing how modern revenue teams build, automate, and scale outbound systems.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          SECTION 1: FEATURED MASTERCLASS (Build a Complete Outbound Engine)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FEATURED MASTERCLASS
          </span>
          <span className="text-xs font-sans text-slate-400">30-Minute Complete Walkthrough</span>
        </div>

        <div
          onClick={() => setActiveVideoModal(FEATURED_MASTERCLASS)}
          className="group block cursor-pointer"
        >
          <Card3DTilt maxTilt={3} scale={1.01}>
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl space-y-6 overflow-hidden relative">
              
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans relative z-10">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold uppercase text-[10px]">
                  ★ {FEATURED_MASTERCLASS.difficulty}
                </span>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{FEATURED_MASTERCLASS.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{FEATURED_MASTERCLASS.views}</span>
                </div>
              </div>

              <div className="space-y-3 max-w-4xl relative z-10">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {FEATURED_MASTERCLASS.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {FEATURED_MASTERCLASS.description}
                </p>
              </div>

              {/* Video Player Preview Box */}
              <div className="aspect-video max-h-72 w-full rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/60 transition-colors">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <div className="absolute bottom-3 left-4 text-[10px] font-sans text-slate-400">
                  1080p 60fps • Single PostgreSQL Architecture & 6-Engine Workflow
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-sans relative z-10">
                <span className="text-slate-400 font-bold">Instructor: {FEATURED_MASTERCLASS.instructor}</span>
                <span className="inline-flex items-center gap-1.5 text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Start Watching</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          </Card3DTilt>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: LEAD GENERATION TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>LEAD GENERATION TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Find Your Ideal Prospects & Verify Contact Data
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.leadGen.map(renderVideoCard)}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: COLD EMAIL TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>COLD EMAIL DELIVERABILITY TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Build Campaigns & Improve Deliverability at Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.coldEmail.map(renderVideoCard)}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LINKEDIN PROSPECTING TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Linkedin className="w-3.5 h-3.5" />
            <span>LINKEDIN PROSPECTING TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Prospect Discovery & Automated Follow-Up Sequences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.linkedin.map(renderVideoCard)}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: VOICE AI SDR TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>VOICE AI SDR TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            AI Qualification, Speed-to-Lead & Meeting Booking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.voiceAi.map(renderVideoCard)}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CRM & PIPELINE TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>CRM & PIPELINE TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Deal Management, Pipeline Stages & Revenue Tracking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.crmPipeline.map(renderVideoCard)}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMPLETE END-TO-END WORKFLOW TUTORIALS
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>END-TO-END MASTER TUTORIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Complete Workflows: Lead → Email → LinkedIn → Voice → CRM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TUTORIAL_CATEGORIES.fullWorkflows.map(renderVideoCard)}
        </div>
      </section>

      {/* Video Playback Modal Simulator */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  {activeVideoModal.category} • {activeVideoModal.duration}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {activeVideoModal.title}
                </h4>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <span className="text-xs font-sans text-slate-400 font-bold">
                1080p 60fps HD Playback • Outtricks Architecture Academy
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeVideoModal.description}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs font-sans text-slate-400 border-t border-slate-800">
              <span>Instructor: {activeVideoModal.instructor}</span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
              >
                Done Watching
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 8: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            MASTERCLASS QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {MASTERCLASS_FAQS.map((faq, fIdx) => {
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
