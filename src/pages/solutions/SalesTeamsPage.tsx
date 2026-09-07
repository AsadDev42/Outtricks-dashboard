import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
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
  SlidersHorizontal,
  Clock,
  Send,
  Calendar,
  X,
  Phone,
  UserCheck,
  TrendingUp,
  Award,
  MoveRight,
  ExternalLink,
  GitBranch,
  Radio
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface ProspectRecord {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  avatar: string;
  headcount: string;
  industry: string;
  location: string;
  techStack: string[];
  icpMatch: number;
  buyingIntent: string;
  nextAction: string;
  verificationStatus: 'verified' | 'catchall';
}

interface ChannelNode {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  metric: string;
  previewTitle: string;
  previewDesc: string;
  features: string[];
}

interface SequenceStep {
  id: string;
  stepNum: string;
  title: string;
  actionType: string;
  delayText: string;
  ruleDetail: string;
  icon: any;
  statusBadge: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const PROSPECTS_DATA: ProspectRecord[] = [
  {
    id: 'p1',
    name: 'Sarah Jenkins',
    role: 'VP of Growth',
    company: 'CloudScale AI',
    email: 'sarah@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    linkedin: 'linkedin.com/in/sarah-jenkins-growth',
    avatar: 'SJ',
    headcount: '120–250',
    industry: 'B2B SaaS / AI Infrastructure',
    location: 'San Francisco, CA',
    techStack: ['Salesforce', 'HubSpot', 'Stripe', 'Apollo'],
    icpMatch: 98,
    buyingIntent: 'Hiring 4 Outbound SDRs & evaluating multi-inbox rotation',
    nextAction: 'Dispatch to Sequence #1 (Cold Email + LinkedIn)',
    verificationStatus: 'verified'
  },
  {
    id: 'p2',
    name: 'Marcus Vance',
    role: 'Head of Outbound',
    company: 'HyperGrowth Labs',
    email: 'marcus@hypergrowth.io',
    phone: '+1 (512) 473-1980',
    linkedin: 'linkedin.com/in/marcus-vance-sales',
    avatar: 'MV',
    headcount: '50–100',
    industry: 'Growth Agency / Sales Tech',
    location: 'Austin, TX',
    techStack: ['Smartlead', 'Apollo', 'PostgreSQL'],
    icpMatch: 96,
    buyingIntent: 'Scaling outbound pipeline to $200k MRR this quarter',
    nextAction: 'Queued for WebRTC Voice AI Qualification',
    verificationStatus: 'verified'
  },
  {
    id: 'p3',
    name: 'Elena Rostova',
    role: 'Chief Revenue Officer',
    company: 'FinTech Stack',
    email: 'elena@fintechstack.com',
    phone: '+44 20 7946 0912',
    linkedin: 'linkedin.com/in/elena-rostova-cro',
    avatar: 'ER',
    headcount: '300–600',
    industry: 'FinTech / B2B Payments',
    location: 'London, UK',
    techStack: ['Salesforce', 'ZoomInfo', 'Salesloft'],
    icpMatch: 94,
    buyingIntent: 'Replacing disconnected Apollo & Clay stack with unified CRM',
    nextAction: 'Send Enterprise Architecture MSA spec',
    verificationStatus: 'verified'
  },
  {
    id: 'p4',
    name: 'David Chen',
    role: 'Director of Demand Gen',
    company: 'SaaSFlow',
    email: 'david@saasflow.co',
    phone: '+1 (212) 658-4421',
    linkedin: 'linkedin.com/in/david-chen-demand',
    avatar: 'DC',
    headcount: '80–150',
    industry: 'Workflow Automation',
    location: 'New York, NY',
    techStack: ['HubSpot', 'Lemlist', 'Gong'],
    icpMatch: 91,
    buyingIntent: 'Fixing deliverability and spam placement across 12 inboxes',
    nextAction: 'Trigger 24-inbox warmup sequence',
    verificationStatus: 'catchall'
  }
];

const CHANNELS_DATA: ChannelNode[] = [
  {
    id: 'lead-finder',
    title: 'Lead Finder',
    subtitle: '480M+ B2B Directory',
    icon: Search,
    metric: '480M+ Contacts',
    previewTitle: '8-Dimension Precision Prospect Discovery',
    previewDesc: 'Filter prospects by buying intent, tech stack, funding, and revenue. multiAttribute verify work emails and direct dials with zero manual CSV exports.',
    features: ['MultiDimensional Lead Search', '99.8% inbox deliverability guarantee', 'Direct cell phone Contact Search']
  },
  {
    id: 'cold-email',
    title: 'Cold Email',
    subtitle: '24 Rotating Inboxes',
    icon: Mail,
    metric: '99.4% Inboxed',
    previewTitle: 'Multi-Inbox Infrastructure & Automated Warmup',
    previewDesc: 'Distribute sending volume across unlimited connected mailboxes with automated ramp-up curves, smart spintax variation, and unified inbox reply handling.',
    features: ['Automated domain health warmup', 'P2P network peer rotation', 'Spam trigger word detection']
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Safe Cloud Proxies',
    icon: Linkedin,
    metric: '100 / wk Safe Limit',
    previewTitle: 'Human-Emulated LinkedIn Outreach',
    previewDesc: 'Execute profile visits, connection requests, and direct messages using dedicated residential cloud proxies with zero browser extension ban risk.',
    features: ['38.4% invite acceptance rate', 'AI dynamic message personalization', 'Residential cloud proxy rotation']
  },
  {
    id: 'voice-ai',
    title: 'Voice AI SDR',
    subtitle: 'Sub-400ms WebRTC',
    icon: PhoneCall,
    metric: '364ms Turn Latency',
    previewTitle: 'Autonomous Inbound & Outbound Calling SDR',
    previewDesc: 'Deploy ultra-fast conversational Voice AI agents that dial cold prospects, handle objections naturally, qualify ICP fit, and book demo calendar slots.',
    features: ['Bidirectional WebRTC audio', 'Real-time interruption detection', 'Instant Google Calendar booking']
  },
  {
    id: 'deals-crm',
    title: 'Deals CRM',
    subtitle: 'PostgreSQL Core',
    icon: Building2,
    metric: '0ms Sync Lag',
    previewTitle: 'Unified Lead-to-Cash Pipeline CRM',
    previewDesc: 'Track every conversation, call recording, and stage transition on a native 5-stage Kanban CRM powered directly by PostgreSQL without webhook failures.',
    features: ['Automatic timeline activity logging', 'Kanban deal stage management', 'Closed-loop ARR attribution']
  }
];

const SEQUENCE_STEPS: SequenceStep[] = [
  {
    id: 's1',
    stepNum: '01',
    title: 'New Lead Detected',
    actionType: 'Trigger',
    delayText: '0ms',
    ruleDetail: 'Triggered when prospect matches ICP criteria (Headcount > 50, Tech = Salesforce, Hiring = SDRs).',
    icon: Zap,
    statusBadge: 'Active Trigger'
  },
  {
    id: 's2',
    stepNum: '02',
    title: 'multiAttribute Verify',
    actionType: 'Contact Search',
    delayText: '+15s',
    ruleDetail: 'Cascades through multiDimensional filters to retrieve verified direct email, mobile phone, and LinkedIn URL.',
    icon: Database,
    statusBadge: '99.8% Match'
  },
  {
    id: 's3',
    stepNum: '03',
    title: 'Send Cold Email #1',
    actionType: 'Outreach',
    delayText: '+2m',
    ruleDetail: 'Dispatches personalized email from 24 rotating inboxes with custom AI first line referencing recent hiring.',
    icon: Mail,
    statusBadge: 'Dispatched'
  },
  {
    id: 's4',
    stepNum: '04',
    title: 'Wait 2 Days',
    actionType: 'Condition Check',
    delayText: '48h',
    ruleDetail: 'Listens for reply or open events. If no reply after 48 hours, automatically executes Step 05.',
    icon: Clock,
    statusBadge: 'Listening'
  },
  {
    id: 's5',
    stepNum: '05',
    title: 'LinkedIn Touch & DM',
    actionType: 'Social Outreach',
    delayText: '+48h',
    ruleDetail: 'Views prospect profile via Residential Cloud Proxy and sends connection invite with reference to email.',
    icon: Linkedin,
    statusBadge: 'Safe Limit'
  },
  {
    id: 's6',
    stepNum: '06',
    title: 'Voice AI Phone Call',
    actionType: 'Qualification',
    delayText: '+72h',
    ruleDetail: 'If email opened 2+ times, triggers sub-400ms Voice AI SDR to qualify interest and book demo slot.',
    icon: PhoneCall,
    statusBadge: 'Sub-400ms'
  },
  {
    id: 's7',
    stepNum: '07',
    title: 'Auto-Create Deal',
    actionType: 'CRM Sync',
    delayText: 'Instant',
    ruleDetail: 'Logs opportunity in Deals CRM, syncs call transcript, and notifies Account Executive on Slack.',
    icon: Building2,
    statusBadge: 'Deal Created ✓'
  }
];

const PRODUCTIVITY_CARDS = [
  {
    title: 'Prospect Research',
    description: 'Autonomous account research across 480M+ verified profiles with technographic & hiring filters.',
    icon: Search,
    benefit: 'Eliminates 8 hrs/week of manual list building'
  },
  {
    title: 'Lead Search',
    description: '15-source multiAttribute phone and email verification with instant SMTP handshakes and 0 bounce.',
    icon: Database,
    benefit: 'Zero manual Clay or CSV exports required'
  },
  {
    title: 'Personalized Outreach',
    description: 'Dynamic spintax and AI first-line personalization that adapts to prospect role and recent posts.',
    icon: Mail,
    benefit: '3.4x higher cold email positive reply rates'
  },
  {
    title: 'Multi-Channel Follow-Ups',
    description: 'Automated coordination across Email, LinkedIn touches, and Voice AI calling that pauses on reply.',
    icon: Workflow,
    benefit: 'No leads fall through the cracks'
  },
  {
    title: 'CRM Auto-Updates',
    description: 'Call transcripts, email threads, and meeting dates automatically sync to PostgreSQL deal records.',
    icon: Building2,
    benefit: 'Saves 6 hours/week of rep CRM admin time'
  },
  {
    title: 'Smart Lead Routing',
    description: 'Instant buyer intent scoring and automated round-robin assignment directly to Account Executives.',
    icon: Target,
    benefit: 'Under 1-minute lead response velocity'
  }
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does Outtricks help B2B sales teams find leads?',
    answer: 'Outtricks includes a native directory of 480M+ verified B2B contacts. Reps can filter by job title, company size, industry, tech stack, and buying intent signals. In 1 click, verified contacts are pushed directly into outreach sequences without CSV exports.'
  },
  {
    question: 'How does Outtricks replace a fragmented sales stack?',
    answer: 'Instead of paying for separate tools for prospecting (Apollo), Contact Search (Clay), email sequencing (Smartlead), LinkedIn automation, voice dialers, and CRMs, Outtricks unifies all 6 functions on a single PostgreSQL core with zero sync delay and one subscription.'
  },
  {
    question: 'How does multi-inbox rotation work?',
    answer: 'Outtricks connects unlimited Google, Outlook, and SMTP mailboxes. Sending volume is automatically distributed using round-robin algorithms and automated warmup to maintain 99.4% inbox placement.'
  },
  {
    question: 'Is LinkedIn automation safe from account bans?',
    answer: 'Yes. Outtricks uses dedicated residential cloud proxies and human-like delay intervals strictly capped at 100 safe connection invites per week, ensuring zero account restriction risk.'
  },
  {
    question: 'How fast is the Voice AI SDR agent?',
    answer: 'Outtricks Voice AI operates at sub-400ms WebRTC latency. The AI speaks naturally, handles interruptions seamlessly, answers technical questions, and books qualified meetings directly to your rep\'s calendar.'
  },
  {
    question: 'Does Outtricks include a CRM or sync with our existing CRM?',
    answer: 'Both. Outtricks includes Deals CRM with a native 5-stage Kanban sales pipeline. It also provides bidirectional real-time webhook sync with Salesforce, HubSpot, and Pipedrive.'
  },
  {
    question: 'How many sales reps can use the platform?',
    answer: 'Outtricks supports unlimited sales team members with role-based permissions, shared company suppression lists, team-wide activity leaderboards, and pooled lead credits.'
  }
];

export const SalesTeamsPage: React.FC = () => {
  // Lead Discovery States
  const [selectedProspect, setSelectedProspect] = useState<ProspectRecord | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Channel Nodes State
  const [selectedChannelId, setSelectedChannelId] = useState<string>('lead-finder');

  // Sequence Animation State
  const [activeSeqStepIndex, setActiveSeqStepIndex] = useState<number>(0);
  const [isSeqPlaying, setIsSeqPlaying] = useState<boolean>(true);

  // FAQ State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Sequence auto-advance loop
  useEffect(() => {
    if (!isSeqPlaying) return;

    const timer = setInterval(() => {
      setActiveSeqStepIndex((prev) => (prev + 1) % SEQUENCE_STEPS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isSeqPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedChannel = CHANNELS_DATA.find(c => c.id === selectedChannelId) || CHANNELS_DATA[0];
  const activeStep = SEQUENCE_STEPS[activeSeqStepIndex];
  const ActiveStepIcon = activeStep.icon;

  const filteredProspects = PROSPECTS_DATA.filter(p => {
    const matchesSearch = searchFilter === '' || 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.role.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesIndustry = industryFilter === 'all' || 
      (industryFilter === 'saas' && p.industry.includes('SaaS')) ||
      (industryFilter === 'agency' && p.industry.includes('Agency')) ||
      (industryFilter === 'fintech' && p.industry.includes('FinTech'));

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outbound Execution Platform for B2B Sales Teams | Outtricks"
        description="Equip your SDRs and AEs with 480M+ leads, multi-inbox cold email, and Voice AI calling to 3x quota attainment."
        canonical="https://outtricks.com/solutions/sales-teams"
        keywords={["sales team outbound software","SDR automation platform","account executive pipeline","B2B sales execution"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"B2B Sales Teams","url":"/solutions/sales-teams"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (B2B SALES TEAMS)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            B2B SALES TEAMS
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Build a Sales Pipeline<br className="hidden sm:inline" /> That Scales With Your Team
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Find the right accounts, reach decision-makers, automate follow-ups, and manage every opportunity from one unified revenue platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Build Your Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Compact Product Visual: Lead -> Verify -> Outreach -> Meeting -> Deal */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-sans">
              
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/70 dark:border-[#2A2A2A] text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">01 • DISCOVER</span>
                <strong className="text-slate-900 dark:text-white block font-bold">480M+ ICP Leads</strong>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/70 dark:border-[#2A2A2A] text-center space-y-1">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block uppercase">02 • Verify</span>
                <strong className="text-slate-900 dark:text-white block font-bold">15-Source multiAttribute</strong>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/70 dark:border-[#2A2A2A] text-center space-y-1">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block uppercase">03 • OUTREACH</span>
                <strong className="text-slate-900 dark:text-white block font-bold">Email + LinkedIn</strong>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800 text-center space-y-1">
                <span className="text-[10px] text-emerald-600 font-bold block uppercase">04 • MEETING</span>
                <strong className="text-emerald-950 dark:text-emerald-200 block font-bold">Voice AI Booked</strong>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-blue-600 text-white shadow-md text-center space-y-1">
                <span className="text-[10px] text-blue-200 font-bold block uppercase">05 • REVENUE</span>
                <strong className="text-white block font-bold">$127k Deal Won ✓</strong>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: PROBLEM (Fragmented Stack vs Outtricks Unified)
          ========================================================================= */}
      <section className="space-y-8 max-w-5xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-rose-500 uppercase tracking-wider">
            THE REVENUE BOTTLENECK
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Stop Stitching Your Sales Stack Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Your reps shouldn't have to jump between prospecting tools, email platforms, LinkedIn, calling software, CRM systems, and automation just to move one lead forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Fragmented Stack (Left) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-200/60 dark:border-rose-900/60">
              <span className="text-xs font-sans font-bold text-rose-600 dark:text-rose-400 uppercase">
                Fragmented Sales Stack
              </span>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-white dark:bg-[#141414] border border-rose-200">
                6 Tools • 20h Wasted/mo
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs font-sans">
              {['Lead Database (Apollo)', 'Email Tool (Smartlead)', 'LinkedIn Tool (Expandi)', 'Calling Tool (Orum)', 'CRM (HubSpot)', 'Automation (Zapier)'].map((tool, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#141414] border border-rose-100 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
                  <span>{tool}</span>
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                </div>
              ))}
            </div>

            <p className="text-[11px] text-rose-700 dark:text-rose-300 font-sans pt-1">
              ✕ Result: Duplicate CSV exports, high email bounce rates, and constant webhook drift.
            </p>
          </div>

          {/* Outtricks Unified (Right) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                OUTTRICKS REVENUE OPERATING SYSTEM
              </span>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                1 Platform • 0ms Delay
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                One Connected Revenue Workflow
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                480M+ Verified Contacts $\rightarrow$ multiAttribute search Verify $\rightarrow$ 24-Inbox Rotator $\rightarrow$ Safe LinkedIn $\rightarrow$ Voice AI SDR $\rightarrow$ Deals CRM on 1 PostgreSQL database.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>0 CSV File Exports</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>99.4% Inbox Placement</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Sub-400ms Voice SDR</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>$79/mo Single Bill</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 3: LEAD DISCOVERY (Interactive Lead Finder Demo & Prospect Drawer)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRECISION PROSPECTING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Find Your Next Best Prospects
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Search 480M+ verified profiles with 8-dimension ICP filters. Click any prospect to inspect verified contact data.
          </p>
        </div>

        {/* Lead Table Demo Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-2">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, job title, company..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div className="sm:col-span-4">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="all">All Industries (480M+ Pool)</option>
                <option value="saas">B2B SaaS / Infrastructure</option>
                <option value="agency">Sales Tech / Agencies</option>
                <option value="fintech">FinTech / Payments</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:bg-[#181818] text-[11px] font-sans font-bold text-slate-500">
                    <th className="py-3 px-4">PROSPECT NAME</th>
                    <th className="py-3 px-3">TITLE & ROLE</th>
                    <th className="py-3 px-3">COMPANY</th>
                    <th className="py-3 px-3">VERIFIED EMAIL</th>
                    <th className="py-3 px-3">BUYING INTENT</th>
                    <th className="py-3 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProspects.map((prospect) => (
                    <tr
                      key={prospect.id}
                      onClick={() => setSelectedProspect(prospect)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {prospect.avatar}
                          </div>
                          <strong className="font-bold text-slate-900 dark:text-white">
                            {prospect.name}
                          </strong>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium">
                        {prospect.role}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {prospect.company}
                      </td>
                      <td className="py-3.5 px-3 font-sans text-[11px] text-blue-600 dark:text-blue-400">
                        {prospect.email}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 text-emerald-700 dark:text-emerald-400 text-[10px] font-sans font-bold">
                          {prospect.icpMatch}% ICP Match
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-bold font-sans hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                          Inspect ›
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-1">
            <span>Showing 4 verified decision makers • Click any row to inspect</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">● 100% Real-Time multiAttribute Validated</span>
          </div>

        </div>

      </section>

      {/* Prospect Drawer Modal */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {selectedProspect.avatar}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {selectedProspect.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedProspect.role} • <strong className="text-slate-700 dark:text-slate-300">{selectedProspect.company}</strong>
                  </p>
                </div>
              </div>

              <button onClick={() => setSelectedProspect(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Verified Email:</span>
                <strong className="text-blue-600 dark:text-blue-400 font-bold">{selectedProspect.email}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Direct Phone:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedProspect.phone}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">ICP Match Score:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{selectedProspect.icpMatch}% (High Priority)</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Buying Intent Signal:</span>
                <p className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs">
                  {selectedProspect.buyingIntent}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Next Scheduled Action:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {selectedProspect.nextAction}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setSelectedProspect(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Push to Sales Sequence</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedProspect(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: MULTI-CHANNEL OUTREACH (Clickable Node Showcase)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            OMNICHANNEL REVENUE ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Reach Buyers Across Every Channel
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Click any channel node to inspect how Outtricks coordinates outreach across email, social, voice, and CRM.
          </p>
        </div>

        {/* Horizontal Node Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {CHANNELS_DATA.map((ch) => {
            const ChIcon = ch.icon;
            const isSelected = selectedChannelId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChannelId(ch.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ChIcon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                  }`}>
                    {ch.metric}
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs">{ch.title}</h4>
                  <p className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {ch.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Channel Interactive Preview Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="space-y-1">
              <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                CHANNEL CAPABILITY: {selectedChannel.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                {selectedChannel.previewTitle}
              </h3>
            </div>

            <Link
              to="/platform"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/25 transition-all self-start sm:self-center"
            >
              <span>Explore Platform Docs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {selectedChannel.previewDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {selectedChannel.features.map((feat, fIdx) => (
              <div
                key={fIdx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: AUTOMATION (Animated Multi-Step Sequence with Step Inspector)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              FLOW BUILDER CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Automate the Follow-Up
            </h2>
          </div>

          <button
            onClick={() => setIsSeqPlaying(!isSeqPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isSeqPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSeqPlaying ? 'Pause Animation' : 'Resume Animation'}</span>
          </button>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SEQUENCE_STEPS.map((step, sIdx) => {
            const StepIcon = step.icon;
            const isSelected = activeSeqStepIndex === sIdx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveSeqStepIndex(sIdx);
                  setIsSeqPlaying(false);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {step.stepNum}
                  </span>
                  <StepIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{step.title}</strong>
                <span className={`text-[10px] font-sans block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {step.delayText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Inspector Card */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStepIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  STEP {activeStep.stepNum} • {activeStep.actionType}
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {activeStep.title}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-sans font-bold">
              {activeStep.statusBadge}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {activeStep.ruleDetail}
          </p>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: REP PRODUCTIVITY (6 Productivity Cards)
          ========================================================================= */}
      <section className="space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVENUE VELOCITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Give Reps More Time to Sell
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto">
            Automate tedious prospect research and admin so your sales team spends 80% of their day in active conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTIVITY_CARDS.map((pCard, pIdx) => {
            const PIcon = pCard.icon;
            return (
              <div
                key={pIdx}
                className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <PIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    {pCard.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {pCard.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] text-[11px] font-sans font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ {pCard.benefit}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: REVENUE VISIBILITY (Interactive Metrics & Live Chart)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FULL-FUNNEL REPORTING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Know What's Actually Driving Revenue
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Real-time pipeline analytics connecting every email touch, LinkedIn message, and voice call directly to closed ARR.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">PIPELINE CREATED</span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans">$440,000</h4>
            <p className="text-xs text-emerald-600 font-medium">+38% vs last month</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">MEETINGS BOOKED</span>
            <h4 className="text-2xl font-extrabold text-blue-600 font-sans">42 Demos</h4>
            <p className="text-xs text-slate-500 font-medium">88% Qualified ICP</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">WIN RATE</span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans">34.6%</h4>
            <p className="text-xs text-emerald-600 font-medium">+6.2% vs industry average</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">CLOSED REVENUE</span>
            <h4 className="text-2xl font-extrabold text-emerald-600 font-sans">$127,000 ARR</h4>
            <p className="text-xs text-slate-500 font-medium">Won this month</p>
          </div>
        </div>

        {/* Conversion Lift Visualizer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Multi-Channel Conversion Funnel
              </h4>
              <p className="text-xs text-slate-500">Prospect to Closed-Won Velocity</p>
            </div>
            <span className="text-xs font-sans text-emerald-600 font-bold">● PostgreSQL Real-Time Sync</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Verified Contacts Dispatched', count: '1,420 Prospects', pct: 100, color: 'bg-blue-600' },
              { label: 'Outreach Delivered & Inboxed', count: '1,411 Inboxed (99.4%)', pct: 99, color: 'bg-blue-500' },
              { label: 'Engaged & Replied (Email + LinkedIn)', count: '242 Active Threads (17.1%)', pct: 45, color: 'bg-indigo-600' },
              { label: 'Voice AI Qualified & Demo Booked', count: '42 Demos Scheduled', pct: 28, color: 'bg-blue-600' },
              { label: 'Closed-Won Pipeline ARR', count: '$127,000 ARR', pct: 18, color: 'bg-emerald-500' }
            ].map((bar, bIdx) => (
              <div key={bIdx} className="space-y-1 text-xs font-sans">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{bar.label}</span>
                  <strong className="text-slate-900 dark:text-white">{bar.count}</strong>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                  <div style={{ width: `${bar.pct}%` }} className={`h-full rounded-full ${bar.color} transition-all duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA (Sales Teams Focused)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED SALES PLATFORM</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build Your Revenue Engine Around Your Sales Team
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Give your reps the data, automation, and visibility they need to spend more time selling.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free</span>
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
          Credit card required • Cancel anytime • Built for modern revenue teams
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
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
          {FAQ_ITEMS.map((faq, fIdx) => {
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
