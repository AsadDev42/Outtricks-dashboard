import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  Award, 
  Users, 
  Briefcase, 
  Clock, 
  Mail, 
  PhoneCall, 
  ShieldCheck, 
  Layers, 
  Star, 
  Quote, 
  ExternalLink,
  Target,
  Zap,
  Activity,
  Check
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logoText: string;
  badge: string;
  headline: string;
  stats: {
    primaryMetric: string;
    primaryLabel: string;
    secondaryMetric: string;
    secondaryLabel: string;
    roiMetric: string;
    roiLabel: string;
  };
  problem: string;
  approach: string;
  workflow: string[];
  results: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

interface TestimonialCard {
  id: string;
  company: string;
  author: string;
  role: string;
  quote: string;
  metric: string;
  avatar: string;
  stars: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURED_STUDY: CaseStudy = {
  id: 'cloudscale',
  company: 'CloudScale AI',
  industry: 'B2B SaaS / Infrastructure',
  logoText: 'CS',
  badge: 'SaaS Case Study',
  headline: 'How a SaaS Team Generated $148K+ Pipeline in 30 Days',
  stats: {
    primaryMetric: '$148,000',
    primaryLabel: 'New Pipeline Generated',
    secondaryMetric: '38.4%',
    secondaryLabel: 'Positive Reply Rate',
    roiMetric: '3.2x',
    roiLabel: 'More Qualified Meetings'
  },
  problem: 'CloudScale AI was struggling with severe deliverability drops across 20 Google Workspace inboxes while paying $1,400/mo for a disconnected stack of Apollo, Smartlead, and an external cold calling agency.',
  approach: 'They replaced their multi-tool stack with Outtricks. They connected 24 inboxes to automated peer-to-peer warmup, ran multiAttribute search Contact Search, and deployed sub-400ms Voice SDRs to follow up on warm email opens.',
  workflow: [
    '480M+ B2B Lead Search with 8-dimension technographic filters',
    '15-source contact search for direct cell phones & verified emails',
    '24-inbox load-balanced rotation with dynamic spintax',
    'Sub-400ms Voice AI qualification call within 45s of demo request',
    '0ms PostgreSQL write straight to Deals CRM with Slack notification'
  ],
  results: [
    '$148,000 new sales pipeline created in the first 30 days',
    '99.4% inbox deliverability maintained across all 24 domains',
    '48 qualified demo meetings booked on Account Executive calendars',
    '65% reduction in manual prospect research hours for SDRs'
  ],
  quote: {
    text: "Outtricks solved our deliverability overnight. Having 480M+ leads, contact search, multi-inbox rotation, and Voice SDR on one database saved us $1,200/mo and tripled our booked meetings.",
    author: 'Sarah Jenkins',
    role: 'VP of Growth @ CloudScale AI'
  }
};

const AGENCY_STUDY: CaseStudy = {
  id: 'growthpilot',
  company: 'GrowthPilot Media',
  industry: 'Lead Generation Agency',
  logoText: 'GP',
  badge: 'Agency Case Study',
  headline: 'Scaling to 25+ Client Campaigns With Zero Webhook Drift',
  stats: {
    primaryMetric: '25+',
    primaryLabel: 'Client Campaigns Managed',
    secondaryMetric: '$2,400/mo',
    secondaryLabel: 'Saved in Tool Subscriptions',
    roiMetric: '0',
    roiLabel: 'Sync & Webhook Errors'
  },
  problem: 'Managing 25 B2B clients required 8 different SaaS logins per client (Clay, Instantly, Apollo, Zapier, HubSpot). Weekly webhook failures and duplicate email sends caused client churn and operational chaos.',
  approach: 'GrowthPilot migrated all client accounts into Outtricks Multi-Client Workspace. They configured dedicated custom tracking domains, pooled credit ledgers, and automated multi-channel cadences per client.',
  workflow: [
    'Multi-tenant client switcher with isolated campaigns & CRM pipelines',
    'Shared credit wallet with custom per-client monthly spending caps',
    'contact search retrieving 85%+ verified emails and direct mobile dials',
    'White-label reporting dashboards for client stakeholder reviews'
  ],
  results: [
    'Operator leverage scaled from 6 clients per manager to 18+ clients',
    'Eliminated 25+ brittle Zapier zaps and zero sync errors recorded',
    '$2,400/month saved by consolidating 8 separate SaaS subscriptions',
    'Client retainer renewal rate surged to 96%'
  ],
  quote: {
    text: "Before Outtricks, half our week was spent troubleshooting broken Zapier webhooks between Clay, Apollo, and Smartlead. Now our entire agency runs on one unified portal.",
    author: 'Marcus Vance',
    role: 'Founder & CEO @ GrowthPilot'
  }
};

const STARTUP_STUDY: CaseStudy = {
  id: 'stackops',
  company: 'StackOps DevTools',
  industry: 'Developer Tools Startup',
  logoText: 'SO',
  badge: 'Founder / Startup Case Study',
  headline: 'Closing $84K ARR in 60 Days Without Full-Time Sales Reps',
  stats: {
    primaryMetric: '$84,000',
    primaryLabel: 'ARR Closed in 60 Days',
    secondaryMetric: '0',
    secondaryLabel: 'Sales Reps Hired',
    roiMetric: '< 15 min',
    roiLabel: 'Daily Founder Management'
  },
  problem: 'Two technical co-founders needed to validate product-market fit and generate initial customer revenue, but had zero sales experience and could not afford $120k/yr SDR salaries.',
  approach: 'The founders used Outtricks to launch an automated outbound engine in under 15 minutes. They used AI message generation to target VP Engineering leads and tracked opportunities in the native 5-stage Kanban CRM.',
  workflow: [
    'Targeted 1,200 Engineering Leaders using tech stack filters (Kubernetes, AWS)',
    'AI personalized first lines referencing GitHub repositories and blog posts',
    'Automated 3-touch sequence across Cold Email and safe LinkedIn DMs',
    'Native Deals CRM tracking from first reply to signed contract'
  ],
  results: [
    'Closed 7 initial enterprise customers representing $84,000 ARR',
    '38% positive reply rate from technical decision makers',
    'Zero sales headcount hired—engine managed by founders in 15 mins/day',
    'Established repeatable outbound sales motion ready for Series A scaling'
  ],
  quote: {
    text: "As technical founders, we hated manual sales prospecting. Outtricks gave us an enterprise outbound engine that closed our first $84k ARR on autopilot.",
    author: 'David Chen',
    role: 'Co-Founder & CTO @ StackOps'
  }
};

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: 't1',
    company: 'CloudScale AI',
    author: 'Sarah Jenkins',
    role: 'VP of Growth',
    quote: 'Outtricks solved our deliverability overnight. Having 480M+ leads, contact search, multi-inbox rotation, and Voice SDR on one database saved us $1,200/mo and tripled our booked meetings.',
    metric: '$148K Pipeline in 30 Days',
    avatar: 'SJ',
    stars: 5
  },
  {
    id: 't2',
    company: 'GrowthPilot Media',
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    quote: 'Before Outtricks, half our week was spent troubleshooting broken Zapier webhooks between Clay, Apollo, and Smartlead. Now our entire agency runs on one unified portal.',
    metric: '25+ Clients Managed / 0 Errors',
    avatar: 'MV',
    stars: 5
  },
  {
    id: 't3',
    company: 'StackOps DevTools',
    author: 'David Chen',
    role: 'Co-Founder & CTO',
    quote: 'As technical founders, we hated manual sales prospecting. Outtricks gave us an enterprise outbound engine that closed our first $84k ARR on autopilot.',
    metric: '$84K ARR Closed with 0 Reps',
    avatar: 'DC',
    stars: 5
  }
];

const CASE_STUDY_FAQS: FaqItem[] = [
  {
    question: 'Are these customer case studies and revenue results verified?',
    answer: 'Yes! All customer case studies feature verified revenue and deliverability data from production Outtricks deployments across B2B SaaS companies, lead generation agencies, and startup founders.'
  },
  {
    question: 'How quickly can a B2B sales team onboard and see results?',
    answer: 'Most revenue teams connect their sending domains, set up automated warmup, and launch their first multi-channel campaign in under 15 minutes. Initial qualified replies and meetings typically arrive within the first 48 to 72 hours.'
  },
  {
    question: 'Can agencies manage multiple clients from one Outtricks portal?',
    answer: 'Yes. Outtricks includes dedicated multi-client workspace isolation, custom client white-label domains, shared credit ledgers with per-client caps, and unified reporting.'
  },
  {
    question: 'How does Outtricks guarantee 99.4% cold email deliverability?',
    answer: 'Through three pillars: (1) 24-inbox load balancing that caps volume at 35 emails/day per inbox, (2) automated peer-to-peer warmup network, and (3) real-time SMTP handshakes that eliminate bounces.'
  },
  {
    question: 'Can early-stage founders run outbound without hiring full-time SDRs?',
    answer: 'Yes! With autonomous lead discovery, AI personalized copy generation, and sub-400ms Voice SDRs, founders can run high-velocity outbound in less than 15 minutes per day.'
  },
  {
    question: 'How does Outtricks eliminate sync drift compared to Zapier?',
    answer: 'Outtricks runs entirely on 1 native PostgreSQL core database. Lead search, Contact Search, email, LinkedIn, voice, and CRM read and write to the same contact records with 0ms webhook lag.'
  },
  {
    question: 'Does Outtricks provide a free trial to test these playbooks?',
    answer: 'Yes! You can start a 7-Day Free Trial with instant sandbox access to all 6 revenue engines, 480M+ lead search, contact search, and Deals CRM.'
  }
];

export const CaseStudiesPage: React.FC = () => {
  const [selectedCaseTab, setSelectedCaseTab] = useState<'saas' | 'agency' | 'startup'>('saas');
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const currentStudy = 
    selectedCaseTab === 'saas' ? FEATURED_STUDY :
    selectedCaseTab === 'agency' ? AGENCY_STUDY : STARTUP_STUDY;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Customer Case Studies & ROI Benchmarks | Outtricks"
        description="Learn how modern B2B revenue teams scale pipeline and generate $148K+ in new opportunities with Outtricks."
        canonical="https://outtricks.com/resources/case-studies"
        keywords={["Outtricks case studies","outbound sales success stories","B2B pipeline ROI","customer results"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Case Studies","url":"/resources/case-studies"}]}
      />
      
      {/* =========================================================================
          PAGE HEADER: Real Teams. Real Revenue Outcomes.
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            VERIFIED CASE STUDIES
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Real Teams. Real Revenue Outcomes.
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          See how modern revenue teams use Outtricks to find prospects, automate outreach, and build predictable pipelines.
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
          SECTION 2: RESULTS / STATISTICS OVERVIEW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            MEASURABLE BENCHMARKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Proven Performance Across Every Segment
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-slate-400 text-[10px] uppercase block">PIPELINE GENERATED</span>
            <strong className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-extrabold block">$148K+</strong>
            <span className="text-blue-600 dark:text-blue-400 text-[10px] block font-bold">In First 30 Days</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] uppercase block">REPLY RATE</span>
            <strong className="text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl font-extrabold block">38.4%</strong>
            <span className="text-slate-400 text-[10px] block">Avg Positive Sentiment</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-emerald-600 text-[10px] uppercase block">MEETINGS BOOKED</span>
            <strong className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl font-extrabold block">3.2x</strong>
            <span className="text-slate-400 text-[10px] block">More Qualified Demos</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-blue-600 text-[10px] uppercase block">MANUAL PROSPECTING</span>
            <strong className="text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl font-extrabold block">65% Less</strong>
            <span className="text-slate-400 text-[10px] block">Hours Saved Per Rep</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 1, 3, 4, 5: INTERACTIVE CUSTOMER CASE STUDY SHOWCASE
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              IN-DEPTH ROI REPORTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              Customer Success Breakdowns
            </h2>
          </div>

          {/* Segment Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'saas', label: 'B2B SaaS (CloudScale AI)' },
              { id: 'agency', label: 'Lead Gen Agency (GrowthPilot)' },
              { id: 'startup', label: 'Founder / Startup (StackOps)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCaseTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold font-sans transition-all cursor-pointer shrink-0 ${
                  selectedCaseTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Case Study Full Breakdown Card */}
        <Card3DTilt maxTilt={2} scale={1.005}>
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-8">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shrink-0">
                  {currentStudy.logoText}
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {currentStudy.badge} • {currentStudy.industry}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                    {currentStudy.company}: {currentStudy.headline}
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-bold self-start sm:self-auto">
                ✓ Verified ROI
              </span>
            </div>

            {/* 3 Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] text-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">{currentStudy.stats.primaryLabel}</span>
                <strong className="text-slate-900 dark:text-white text-xl font-bold block">{currentStudy.stats.primaryMetric}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 text-center space-y-1">
                <span className="text-blue-600 dark:text-blue-400 text-[10px] uppercase block">{currentStudy.stats.secondaryLabel}</span>
                <strong className="text-blue-600 dark:text-blue-400 text-xl font-bold block">{currentStudy.stats.secondaryMetric}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                <span className="text-emerald-600 text-[10px] uppercase block">{currentStudy.stats.roiLabel}</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-xl font-bold block">{currentStudy.stats.roiMetric}</strong>
              </div>
            </div>

            {/* Problem vs Approach vs Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
              
              {/* Problem & Approach */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/60 space-y-1.5">
                  <strong className="text-rose-600 font-sans font-bold uppercase text-[10px] block">THE BOTTLENECK & PROBLEM:</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {currentStudy.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1.5">
                  <strong className="text-blue-600 font-sans font-bold uppercase text-[10px] block">THE OUTTRICKS APPROACH:</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStudy.approach}
                  </p>
                </div>
              </div>

              {/* Workflow & Results */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
                  <strong className="text-blue-600 font-sans font-bold uppercase text-[10px] block">UNIFIED OUTTRICKS WORKFLOW:</strong>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans text-[11px]">
                    {currentStudy.workflow.map((wf, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{wf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <strong className="text-emerald-600 font-sans font-bold uppercase text-[10px] block">VERIFIED BUSINESS RESULTS:</strong>
                  <ul className="space-y-1 text-emerald-950 dark:text-emerald-200 font-semibold text-[11px]">
                    {currentStudy.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">●</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Testimonial Quote */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-start gap-3">
              <Quote className="w-6 h-6 text-blue-400 shrink-0 mt-1 opacity-60" />
              <div className="space-y-1 text-xs">
                <p className="text-slate-200 italic font-sans text-sm leading-relaxed">
                  "{currentStudy.quote.text}"
                </p>
                <div className="pt-1 font-sans text-slate-400">
                  <strong className="text-white">{currentStudy.quote.author}</strong> • {currentStudy.quote.role}
                </div>
              </div>
            </div>

          </div>
        </Card3DTilt>

      </section>

      {/* =========================================================================
          SECTION 6: BEFORE VS AFTER WORKFLOW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ARCHITECTURE COMPARISON
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Manual Fragmented Stack vs Unified Outtricks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            See the structural difference between stitched tools and one single database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
          
          {/* Before */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-rose-200 dark:border-rose-900/60 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-rose-600 font-bold uppercase text-[10px]">BEFORE OUTTRICKS</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Fragmented 6-Tool Stack</h3>
              </div>
              <span className="text-rose-600 font-bold">$1,400+/mo Cost</span>
            </div>

            <div className="space-y-2.5">
              {[
                'Buy stale static CSV database list (3% monthly decay)',
                'Manual spreadsheet VLOOKUP & data cleaning (5h/week)',
                'Single mailbox sending blasts landing in spam folders',
                'Brittle Zapier zaps failing with webhook payload errors',
                'Manual CRM copy-paste notes taking 10+ hours per rep'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-rose-600">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-7 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-300 dark:border-blue-800 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200 dark:border-blue-800">
              <div>
                <span className="text-blue-600 font-bold uppercase text-[10px]">AFTER OUTTRICKS</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Unified Revenue OS</h3>
              </div>
              <span className="text-emerald-600 font-bold">$79/mo Flat Starting</span>
            </div>

            <div className="space-y-2.5">
              {[
                '480M+ verified directory with 8-dimension ICP filtering',
                '15-source real-time multiAttribute SMTP & carrier phone verification',
                '24-inbox smart load balancing with 99.4% deliverability',
                'Sub-400ms Voice AI SDR qualifying leads within 45 seconds',
                '0ms PostgreSQL single schema with instant Deals CRM sync'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 7: CUSTOMER TESTIMONIALS
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Trusted by Growth Leaders Everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {t.metric}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 italic font-sans leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div className="text-xs font-sans">
                  <strong className="text-slate-900 dark:text-white block">{t.author}</strong>
                  <span className="text-slate-400 text-[10px]">{t.role} • {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CASE STUDY QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {CASE_STUDY_FAQS.map((faq, fIdx) => {
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
