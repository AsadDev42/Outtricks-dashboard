import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
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
  Globe
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface UseCaseCard {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  icon: any;
  highlightMetric: string;
  problem: string;
  outcome: string;
  capabilities: string[];
}

interface WorkflowStep {
  id: string;
  stepNum: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: any;
  metric: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const SIX_USE_CASE_CARDS: UseCaseCard[] = [
  {
    id: 'cold-email',
    title: 'Cold Email Outreach',
    category: 'High Deliverability',
    description: 'Scale cold outbound across 24 rotating inboxes with automated warmup, smart spintax, and 99.4% inbox placement.',
    href: '/use-cases/cold-email',
    icon: Mail,
    highlightMetric: '99.4% Inboxed',
    problem: 'Single-inbox spam filtering and burnt domains destroying sender reputation.',
    outcome: 'Unlimited inbox rotation with automated ramp-up curves and zero deliverability drops.',
    capabilities: ['24-inbox smart rotation', 'Automated P2P peer warmup', 'Dynamic variable spintax']
  },
  {
    id: 'lead-generation',
    title: 'B2B Lead Generation',
    category: 'Precision Prospecting',
    description: 'Discover verified B2B decision makers across 480M+ profiles using 8-dimension filters including technographics and hiring intent.',
    href: '/use-cases/lead-generation',
    icon: Search,
    highlightMetric: '480M+ B2B Pool',
    problem: 'Stale CSV database exports with 25%+ bounce rates and missing direct phone numbers.',
    outcome: 'Fresh, real-time verified contact directory with 0 CSV export hassle.',
    capabilities: ['8-Dimension Search Filter', 'Real-time hiring intent triggers', 'Direct cell phone Contact Search']
  },
  {
    id: 'linkedin-prospecting',
    title: 'LinkedIn Prospecting',
    category: 'Safe Social Selling',
    description: 'Automate profile visits, personalized connection requests, and direct messaging with dedicated residential cloud proxies.',
    href: '/use-cases/linkedin-prospecting',
    icon: Linkedin,
    highlightMetric: '100 / wk Safe Limit',
    problem: 'Chrome extension scraper bots triggering LinkedIn security checkouts and account bans.',
    outcome: 'Zero account ban risk with human-emulated delays and dedicated cloud IP rotation.',
    capabilities: ['Dedicated residential proxies', 'AI message personalization', '38.4% invite acceptance']
  },
  {
    id: 'lead-Contact Search',
    title: 'Lead Lead Search',
    category: 'Data Accuracy',
    description: 'Cascade through 15 premium data providers in real time to secure validated work emails, direct mobile dials, and social URLs.',
    href: '/use-cases/lead-Contact Search',
    icon: Database,
    highlightMetric: 'multiDimensional filters',
    problem: 'Single-source databases missing 50%+ of mobile numbers and European contact data.',
    outcome: '85%+ Contact Search match rate with real-time SMTP handshakes.',
    capabilities: ['Real-time SMTP handshake', 'Catch-all sandbox validation', 'Direct cell phone verification']
  },
  {
    id: 'voice-ai',
    title: 'Conversational Voice AI',
    category: 'Sub-400ms SDR',
    description: 'Deploy autonomous WebRTC Voice AI SDR agents that dial cold lists, handle complex objections, qualify ICP fit, and book demo slots.',
    href: '/platform/voice-ai',
    icon: PhoneCall,
    highlightMetric: '364ms Turn Latency',
    problem: 'Manual cold calling takes 40+ hours per week per rep with 85% unanswered calls.',
    outcome: 'Qualify 500+ prospects daily and schedule qualified meetings straight to rep calendars.',
    capabilities: ['Sub-400ms WebRTC audio', 'Real-time interruption handling', 'Google Calendar integration']
  },
  {
    id: 'multichannel-workflows',
    title: 'Multi-Channel Sales Workflows',
    category: 'Workflow Automation',
    description: 'Orchestrate synchronized cadences across Email, LinkedIn, Voice AI, and Deals CRM with smart behavioral branching logic.',
    href: '/use-cases/sales-automation',
    icon: Workflow,
    highlightMetric: '3.8x Reply Lift',
    problem: 'Single-channel outreach gets ignored in noisy inboxes with less than 2% response.',
    outcome: 'Synchronized multi-channel touchpoints that pause automatically when a prospect replies.',
    capabilities: ['Visual Flow Builder canvas', 'Smart IF/THEN branching logic', 'Instant Deals CRM sync']
  }
];

const LEAD_TO_REVENUE_WORKFLOW: WorkflowStep[] = [
  {
    id: 'w1',
    stepNum: '01',
    title: 'Find Leads',
    shortDesc: 'Search 480M+ verified profiles with 8-dimension ICP filters.',
    detailedDesc: 'Identify exact decision-makers using granular filters: company size, industry, revenue, tech stack, and real-time hiring intent.',
    icon: Search,
    metric: '480M+ B2B Pool'
  },
  {
    id: 'w2',
    stepNum: '02',
    title: 'multiAttribute Verify',
    shortDesc: 'Cascade through 15 data sources for verified emails & cell phones.',
    detailedDesc: 'Validate contact data in real time with SMTP pinging and catch-all sandboxing to eliminate email bounces and invalid dials.',
    icon: Database,
    metric: '99.8% Accuracy'
  },
  {
    id: 'w3',
    stepNum: '03',
    title: 'Multi-Channel Touch',
    shortDesc: 'Launch coordinated Cold Email and LinkedIn cadences.',
    detailedDesc: 'Distribute sending volume across 24 rotating inboxes with automated warmup and residential cloud proxy LinkedIn touches.',
    icon: Mail,
    metric: '99.4% Inbox Rate'
  },
  {
    id: 'w4',
    stepNum: '04',
    title: 'Voice AI Qualify',
    shortDesc: 'Deploy sub-400ms WebRTC Voice SDR to qualify buyer intent.',
    detailedDesc: 'AI agents conduct conversational phone qualification, answer technical questions, and lock demo slots into your calendar.',
    icon: PhoneCall,
    metric: '<400ms Latency'
  },
  {
    id: 'w5',
    stepNum: '05',
    title: 'Deals CRM Sync',
    shortDesc: 'Track pipeline progress on native 5-stage Kanban board.',
    detailedDesc: 'All conversations, call transcripts, and stage transitions write natively to 1 PostgreSQL database with 0ms sync delay.',
    icon: Building2,
    metric: '0ms PostgreSQL Lag'
  },
  {
    id: 'w6',
    stepNum: '06',
    title: 'Closed Revenue',
    shortDesc: 'Turn qualified sales meetings into closed-won ARR.',
    detailedDesc: 'Measure closed-loop attribution from initial prospect discovery touch to final contract signature.',
    icon: DollarSign,
    metric: '+42% Pipeline Velocity'
  }
];

const USE_CASE_FAQS: FaqItem[] = [
  {
    question: 'How does Outtricks unify multiple outbound use cases in one platform?',
    answer: 'Outtricks operates on a single PostgreSQL core database. That means B2B lead generation, contact search, multi-inbox cold email, safe LinkedIn outreach, WebRTC Voice AI, and CRM pipelines all share the same contact records and activity timelines without CSV exports or Zapier webhooks.'
  },
  {
    question: 'Can I use Outtricks for cold email only or multi-channel outreach?',
    answer: 'You can start with cold email using our 24-inbox rotation and automated warmup, and seamlessly activate LinkedIn touches and Voice AI SDR calling whenever your revenue team is ready.'
  },
  {
    question: 'How does the multiAttribute search Contact Search work?',
    answer: 'When you find a prospect or upload a list, Outtricks cascades through 15 tier-1 data providers sequentially. As soon as a verified work email, mobile phone number, or social URL is confirmed via SMTP handshake, the record is finalized, ensuring 85%+ match rates with zero wasted credits.'
  },
  {
    question: 'Is LinkedIn outreach safe from account restrictions?',
    answer: 'Yes! Outtricks uses dedicated residential cloud proxies, randomized human-like typing delays, and enforces a strict cap of 100 safe connection invites per week to ensure 100% account compliance.'
  },
  {
    question: 'How fast is the conversational Voice AI SDR?',
    answer: 'Outtricks Voice AI operates at sub-400ms WebRTC latency. The AI speaks naturally with low-latency audio streaming, handles interruptions seamlessly, answers technical questions, and books qualified meetings directly to your rep\'s calendar.'
  },
  {
    question: 'Can different teams (Sales, Founders, Agencies, Recruiters) use Outtricks?',
    answer: 'Yes. Outtricks provides dedicated, role-optimized workflows for B2B sales teams, founders, lead gen agencies, recruiters, marketing leads, and RevOps managers with multi-tenant workspace isolation.'
  },
  {
    question: 'Does Outtricks provide a free trial?',
    answer: 'Yes! Outtricks includes a 7-Day Free Trial with instant sandbox access to all 6 revenue engines so you can test email deliverability, search 480M+ leads, and book qualified meetings risk-free.'
  }
];

export const UseCasesOverviewPage: React.FC = () => {
  // Active Channel Selector State
  const [selectedChannelId, setSelectedChannelId] = useState<string>('email');

  // Interactive Workflow Animation State
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState<number>(0);
  const [isWorkflowPlaying, setIsWorkflowPlaying] = useState<boolean>(true);

  // FAQ State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance workflow loop
  useEffect(() => {
    if (!isWorkflowPlaying) return;

    const timer = setInterval(() => {
      setActiveWorkflowIdx((prev) => (prev + 1) % LEAD_TO_REVENUE_WORKFLOW.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isWorkflowPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const activeWorkflow = LEAD_TO_REVENUE_WORKFLOW[activeWorkflowIdx];
  const ActiveWorkflowIcon = activeWorkflow.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outbound Sales Use Cases & Playbooks | Outtricks"
        description="Explore real-world playbooks for cold email, B2B lead generation, LinkedIn prospecting, and Voice AI calling."
        canonical="https://outtricks.com/use-cases"
        keywords={["outbound use cases","sales playbooks","multi-channel outreach strategies","pipeline playbooks"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Turn Every Sales Challenge Into a Revenue Workflow)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            PROVEN OUTBOUND USE CASES
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Turn Every Sales Challenge<br className="hidden sm:inline" /> Into a Revenue Workflow
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          From finding the right prospects to closing more deals, Outtricks gives your revenue team one unified platform to build, automate, and manage outbound workflows.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href="#use-cases-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore Use Cases</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Top Summary Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 max-w-4xl mx-auto text-xs font-sans">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 block uppercase">COLD EMAIL</span>
            <strong className="text-slate-900 dark:text-white font-bold block">99.4% Inboxed</strong>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">B2B DATA</span>
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">480M+ Contacts</strong>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center">
            <span className="text-[10px] text-emerald-600 block uppercase">VOICE SDR</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold block">&lt;400ms Latency</strong>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center">
            <span className="text-[10px] text-blue-600 block uppercase">DATABASE CORE</span>
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">0ms Sync Lag</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: SIX USE-CASE CARDS
          ========================================================================= */}
      <section id="use-cases-grid" className="space-y-10 scroll-mt-24">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE PLAYBOOKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Six Core Outbound Workflows
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            Choose the execution playbook that matches your current sales bottleneck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIX_USE_CASE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.href}
                className="group block h-full focus:outline-none"
              >
                <Card3DTilt maxTilt={4} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 group-hover:border-blue-500/80 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-4">
                      
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A]">
                          {card.highlightMetric}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>

                      {/* Problem vs Outcome */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#2A2A2A]/80 text-xs">
                        <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300">
                          <strong className="font-bold block text-[10px] uppercase text-rose-600">The Problem:</strong>
                          <span className="text-[11px]">{card.problem}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300">
                          <strong className="font-bold block text-[10px] uppercase text-emerald-600">Outtricks Outcome:</strong>
                          <span className="text-[11px] font-semibold">{card.outcome}</span>
                        </div>
                      </div>

                    </div>

                    {/* Footer CTA */}
                    <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore {card.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>

                  </div>
                </Card3DTilt>
              </Link>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: BETTER PROSPECT DATA
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DATA FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Better Prospect Data. Zero Bounce Rates.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Access 480M+ verified profiles with automated MultiDimensional Lead Search and real-time SMTP handshakes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">8-Dimension Search Filtering</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Filter by job title, company headcount, revenue tiers, technographics, funding rounds, and real-time hiring intent.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ 480M+ Profiles Indexed</div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">15-Source contact search</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cascades sequentially across top data providers to secure verified direct cell phones, work emails, and social profiles.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ 85%+ Match Rate Guaranteed</div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time Deliverability Guard</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Real-time SMTP pings and catch-all sandbox checks ensure 99.4% inbox placement with 0 spam blacklisting risk.
            </p>
            <div className="pt-2 text-[11px] font-sans text-emerald-600 font-bold">✓ &lt; 0.5% Bounce Rate</div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: MULTI-CHANNEL OUTREACH (Interactive Channel Selector)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            OMNICHANNEL EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Multi-Channel Outreach Built for Conversion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Coordinate Cold Email, LinkedIn touches, and Voice AI calling in unified sequences that pause automatically on reply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'email', title: 'Cold Email', metric: '99.4% Inboxed', desc: '24 rotating inboxes with automated ramp-up curves and spintax variables.', icon: Mail },
            { id: 'linkedin', title: 'LinkedIn Safe Social', metric: '100 / wk Limit', desc: 'Dedicated residential cloud proxies with human-like delays and AI personalized DMs.', icon: Linkedin },
            { id: 'voice', title: 'Voice AI SDR', metric: '<400ms Turn Latency', desc: 'Sub-400ms WebRTC conversational AI for instant qualification and demo booking.', icon: PhoneCall }
          ].map((ch) => {
            const ChIcon = ch.icon;
            const isSelected = selectedChannelId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChannelId(ch.id)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ChIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                  }`}>
                    {ch.metric}
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-base">{ch.title}</h4>
                  <p className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {ch.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: AUTOMATED FOLLOW-UPS
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PERSISTENT ENGAGEMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Automated Follow-Ups That Never Drop Deals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            80% of closed revenue comes from follow-ups 3 through 7. Outtricks handles multi-touch cadences 24/7 in the background.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-slate-400 block text-[10px]">TOUCH 01</span>
              <strong className="text-slate-900 dark:text-white block font-bold">Cold Email #1</strong>
              <span className="text-blue-600 text-[10px] block">Personalized AI Line</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px]">TOUCH 02 (+48h)</span>
              <strong className="text-slate-900 dark:text-white block font-bold">LinkedIn Connect</strong>
              <span className="text-slate-500 text-[10px] block">Safe Proxy View</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px]">TOUCH 03 (+72h)</span>
              <strong className="text-slate-900 dark:text-white block font-bold">Voice AI Call</strong>
              <span className="text-blue-600 text-[10px] block">Sub-400ms WebRTC</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-emerald-600 block text-[10px]">REPLY DETECTED</span>
              <strong className="text-emerald-700 dark:text-emerald-300 block font-bold">Auto-Pause Cadence</strong>
              <span className="text-emerald-600 text-[10px] block font-bold">Deal Created on CRM ✓</span>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: LEAD-TO-REVENUE WORKFLOW (6-Stage Interactive Loop)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              END-TO-END PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Lead-to-Revenue Workflow
            </h2>
          </div>

          <button
            onClick={() => setIsWorkflowPlaying(!isWorkflowPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isWorkflowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isWorkflowPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>
        </div>

        {/* 6 Horizontal Progression Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {LEAD_TO_REVENUE_WORKFLOW.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isSelected = activeWorkflowIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveWorkflowIdx(idx);
                  setIsWorkflowPlaying(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {stage.stepNum}
                  </span>
                  <StageIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{stage.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ActiveWorkflowIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  WORKFLOW STAGE {activeWorkflow.stepNum}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                  {activeWorkflow.title}: {activeWorkflow.shortDesc}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-bold self-start sm:self-center">
              ✓ {activeWorkflow.metric}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activeWorkflow.detailedDesc}
          </p>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: TEAMS & USE CASES
          ========================================================================= */}
      <section className="space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE TEAMS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Built for Every Revenue Motion
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            See how Outtricks adapts to your specific team structure and sales process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/solutions/sales-teams" className="group block">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md group-hover:border-blue-500/80 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600">B2B Sales Teams</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Scale outbound pipeline with multi-inbox rotation and sub-400ms Voice SDR qualification.
              </p>
            </div>
          </Link>

          <Link to="/solutions/founders" className="group block">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md group-hover:border-blue-500/80 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600">Founders & Startups</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Launch your first repeatable outbound sales engine in under 15 minutes with zero reps.
              </p>
            </div>
          </Link>

          <Link to="/solutions/agencies" className="group block">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md group-hover:border-blue-500/80 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600">Lead Gen Agencies</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run 15+ client accounts from one portal with custom white-label domains and pooled wallets.
              </p>
            </div>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {USE_CASE_FAQS.map((faq, fIdx) => {
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
