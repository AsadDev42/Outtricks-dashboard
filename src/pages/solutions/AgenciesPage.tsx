import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
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
  FolderLock,
  Globe,
  PieChart,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface AgencyClient {
  id: string;
  name: string;
  industry: string;
  domain: string;
  leads: string;
  campaigns: number;
  replyRate: string;
  meetings: number;
  pipelineValue: number;
  inboxHealth: string;
  status: 'Live' | 'Scaling' | 'Warming Up';
}

interface CampaignRow {
  id: string;
  campaignName: string;
  clientName: string;
  leads: number;
  sent: number;
  replies: number;
  positiveRate: string;
  meetings: number;
  status: 'Live' | 'Scaling' | 'Warming Up';
}

interface LaunchStage {
  id: string;
  stepNum: string;
  title: string;
  shortDesc: string;
  actionText: string;
  icon: any;
}

interface FaqItem {
  question: string;
  answer: string;
}

const AGENCY_CLIENTS: AgencyClient[] = [
  {
    id: 'c1',
    name: 'CloudScale AI',
    industry: 'B2B SaaS / Infrastructure',
    domain: 'cloudscale.ai',
    leads: '1,420',
    campaigns: 4,
    replyRate: '18.4%',
    meetings: 38,
    pipelineValue: 140000,
    inboxHealth: '100% Healthy (16 Inboxes)',
    status: 'Live'
  },
  {
    id: 'c2',
    name: 'HyperGrowth Labs',
    industry: 'Sales Tech / Growth Agency',
    domain: 'hypergrowth.io',
    leads: '890',
    campaigns: 2,
    replyRate: '16.2%',
    meetings: 24,
    pipelineValue: 92000,
    inboxHealth: '100% Healthy (8 Inboxes)',
    status: 'Scaling'
  },
  {
    id: 'c3',
    name: 'FinTech Stack',
    industry: 'B2B Payments / Billing API',
    domain: 'fintechstack.com',
    leads: '2,100',
    campaigns: 6,
    replyRate: '14.8%',
    meetings: 45,
    pipelineValue: 210000,
    inboxHealth: '99.8% Healthy (24 Inboxes)',
    status: 'Live'
  },
  {
    id: 'c4',
    name: 'StackOps Cloud',
    industry: 'DevOps / Cloud Observability',
    domain: 'stackops.com',
    leads: '650',
    campaigns: 2,
    replyRate: '19.1%',
    meetings: 18,
    pipelineValue: 78000,
    inboxHealth: '100% Healthy (6 Inboxes)',
    status: 'Warming Up'
  }
];

const CAMPAIGNS_DATA: CampaignRow[] = [
  {
    id: 'cmp1',
    campaignName: 'Enterprise CRO Multi-Inbox Outbound',
    clientName: 'CloudScale AI',
    leads: 650,
    sent: 1940,
    replies: 128,
    positiveRate: '18.4%',
    meetings: 22,
    status: 'Live'
  },
  {
    id: 'cmp2',
    campaignName: 'FinTech VP Engineering Mobile multiAttribute',
    clientName: 'FinTech Stack',
    leads: 850,
    sent: 2450,
    replies: 142,
    positiveRate: '16.1%',
    meetings: 28,
    status: 'Live'
  },
  {
    id: 'cmp3',
    campaignName: 'Series A Founder Design Partner Sequence',
    clientName: 'HyperGrowth Labs',
    leads: 420,
    sent: 1260,
    replies: 76,
    positiveRate: '17.2%',
    meetings: 16,
    status: 'Scaling'
  },
  {
    id: 'cmp4',
    campaignName: 'DevOps Leader LinkedIn Safe Proxy Connect',
    clientName: 'StackOps Cloud',
    leads: 320,
    sent: 890,
    replies: 54,
    positiveRate: '19.1%',
    meetings: 12,
    status: 'Warming Up'
  }
];

const LAUNCH_WORKFLOW: LaunchStage[] = [
  { id: 'l1', stepNum: '01', title: 'Client Brief', shortDesc: 'Capture target ICP criteria and value proposition.', actionText: 'Auto-generates persona prompt', icon: FileTextIcon },
  { id: 'l2', stepNum: '02', title: 'ICP Definition', shortDesc: 'Set technographics, headcount & location filters.', actionText: 'Filters 480M+ database', icon: Target },
  { id: 'l3', stepNum: '03', title: 'Lead Finder', shortDesc: 'Source 500+ verified decision-makers in 1 click.', actionText: 'Zero CSV exports needed', icon: Search },
  { id: 'l4', stepNum: '04', title: 'Contact Search', shortDesc: '15-source multiAttribute verifies work emails and cells.', actionText: '99.8% inbox deliverability', icon: Database },
  { id: 'l5', stepNum: '05', title: 'Cold Email', shortDesc: 'Auto-rotate volume across client sending mailboxes.', actionText: 'Automated ramp-up curves', icon: Mail },
  { id: 'l6', stepNum: '06', title: 'LinkedIn Touch', shortDesc: 'Safe residential proxy connection and DM touches.', actionText: '100 safe invites / week', icon: Linkedin },
  { id: 'l7', stepNum: '07', title: 'Booked Meetings', shortDesc: 'Deliver qualified appointments straight to client calendar.', actionText: 'Synced to client CRM', icon: PhoneCall }
];

function FileTextIcon(props: any) {
  return <Briefcase {...props} />;
}

const AGENCY_FAQS: FaqItem[] = [
  {
    question: 'How does Outtricks isolate data between different agency clients?',
    answer: 'Outtricks uses hard row-level tenant isolation in PostgreSQL. Each client operates in their own segregated workspace with dedicated sending domains, suppression lists, inbox rotations, and CRM deal boards. There is zero risk of cross-client data contamination.'
  },
  {
    question: 'Can I white-label the Outtricks platform on my custom domain?',
    answer: 'Yes! Agencies can host client dashboards on their own custom subdomain (e.g., app.youragency.com) with custom agency logos, brand colors, and automated white-label weekly performance email digests.'
  },
  {
    question: 'How do lead credits work across multiple clients?',
    answer: 'You have a pooled agency credit wallet that you can allocate dynamically across client workspaces, or set strict hard monthly usage caps per client.'
  },
  {
    question: 'How many clients can one operator manage on Outtricks?',
    answer: 'Because Outtricks unifies lead discovery, multi-inbox rotation, and CRM reporting into a single dashboard, a single agency operator can comfortably manage 15 to 20 active client campaigns without tool sprawl.'
  },
  {
    question: 'Can clients have view-only access to their campaign results?',
    answer: 'Yes. You can invite client stakeholders with role-based permissions (View Only, Editor, or Admin) so they can inspect their live positive reply feeds, booked meetings, and call transcripts without seeing backend infrastructure settings.'
  },
  {
    question: 'Can we connect client-owned Google Workspace or Outlook inboxes?',
    answer: 'Yes. You can connect unlimited mailboxes from client domains or secondary agency-managed lookalike domains with automated SPF, DKIM, and DMARC verification and unified warmup.'
  },
  {
    question: 'How does Outtricks replace a 25-tool agency software stack?',
    answer: 'Traditional agencies subscribe to Apollo ($99) + Clay ($240) + Smartlead ($94) + Expandi ($99) for EACH client ($500+/client/mo). Outtricks includes all 6 core outbound engines for your entire agency starting at $79/mo, saving thousands in software overhead.'
  }
];

export const AgenciesPage: React.FC = () => {
  // Client Switcher State
  const [selectedClientId, setSelectedClientId] = useState<string>('c1');

  // Selected Campaign Modal State
  const [selectedCampaignModal, setSelectedCampaignModal] = useState<CampaignRow | null>(null);

  // Workflow Stage Animation
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState<number>(0);
  const [isWorkflowPlaying, setIsWorkflowPlaying] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Active client object
  const activeClient = AGENCY_CLIENTS.find(c => c.id === selectedClientId) || AGENCY_CLIENTS[0];

  // Auto-advance Workflow
  useEffect(() => {
    if (!isWorkflowPlaying) return;

    const timer = setInterval(() => {
      setActiveWorkflowIdx((prev) => (prev + 1) % LAUNCH_WORKFLOW.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isWorkflowPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const activeStage = LAUNCH_WORKFLOW[activeWorkflowIdx];
  const ActiveStageIcon = activeStage.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Scalable Outbound Infrastructure for Lead Gen Agencies | Outtricks"
        description="Manage unlimited client workspaces, multi-inbox fleets, and white-labeled pipeline reporting from one unified console."
        canonical="https://outtricks.com/solutions/agencies"
        keywords={["agency lead generation software","multi-client cold email","lead gen agency platform","white label outbound"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"Lead Gen Agencies","url":"/solutions/agencies"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (LEAD GEN AGENCIES)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            LEAD GEN AGENCIES
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Run More Client Campaigns<br className="hidden sm:inline" /> Without More Operational Overhead
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Manage prospecting, Contact Search, outreach, campaigns, conversations, and client pipelines from one unified revenue platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Scale Your Agency</span>
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
            <span className="text-[10px] text-slate-400 font-bold uppercase">OPERATOR LEVERAGE</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">15+ Clients per Operator</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">WHITE-LABEL PORTAL</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">Custom Agency Domain</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-emerald-600 font-bold uppercase">STACK CONSOLIDATION</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">0 Multiplied SaaS Tools</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: MULTI-CLIENT WORKSPACE (Interactive Client Switcher)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            MULTI-TENANT CONTROL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            One Workspace for Every Client
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Switch between client sub-accounts with 1 click. Leads, inboxes, reply rates, and pipeline values update dynamically.
          </p>
        </div>

        {/* Client Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {AGENCY_CLIENTS.map((client) => {
            const isSelected = selectedClientId === client.id;
            return (
              <button
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600'
                  }`}>
                    {client.status}
                  </span>
                  <span className={`text-[11px] font-sans ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {client.campaigns} Campaigns
                  </span>
                </div>
                <strong className="block text-xs sm:text-sm font-bold truncate">{client.name}</strong>
                <p className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {client.industry}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Client Workspace Live Telemetry Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                ACTIVE CLIENT WORKSPACE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                {activeClient.name} • <span className="text-slate-500 text-base font-normal">{activeClient.domain}</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-sans text-slate-700 dark:text-slate-300 font-bold">
                {activeClient.inboxHealth}
              </span>
            </div>
          </div>

          {/* 4 Live Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-slate-400 block text-[10px]">TOTAL SOURCED LEADS</span>
              <strong className="text-slate-900 dark:text-white text-lg font-bold">{activeClient.leads}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px]">POSITIVE REPLY RATE</span>
              <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">{activeClient.replyRate}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-1">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px]">QUALIFIED MEETINGS</span>
              <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">{activeClient.meetings} Demos</strong>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-emerald-600 block text-[10px]">CLIENT PIPELINE GENERATED</span>
              <strong className="text-emerald-700 dark:text-emerald-300 text-lg font-bold">${activeClient.pipelineValue.toLocaleString()} ARR</strong>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: CLIENT ICP (Build Client-Specific ICPs Filter Matrix)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CUSTOM TARGETING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Build Client-Specific ICPs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Define granular targeting criteria tailored to each client's unique buyer persona and value proposition.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Target ICP Matrix for {activeClient.name}
              </h4>
              <p className="text-xs text-slate-500">480M+ B2B profiles filtered in real time</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold">
              Isolated Client Persona
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">TARGET INDUSTRIES</span>
              <div className="flex flex-wrap gap-1.5">
                {['B2B SaaS', 'Enterprise Security', 'Cloud Infrastructure'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">DECISION MAKER TITLES</span>
              <div className="flex flex-wrap gap-1.5">
                {['VP of Growth', 'Head of Outbound', 'Chief Revenue Officer'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
              <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">COMPANY SIZE & REVENUE</span>
              <div className="flex flex-wrap gap-1.5">
                {['50–200 Employees', '$5M–$50M ARR', 'Series A / B'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">TARGET GEOGRAPHY</span>
              <div className="flex flex-wrap gap-1.5">
                {['United States (US)', 'United Kingdom (UK)', 'Canada (CA)'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] space-y-2">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">TECH STACK FILTERS</span>
              <div className="flex flex-wrap gap-1.5">
                {['Salesforce', 'HubSpot', 'Stripe', 'Segment'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-emerald-600 block text-[10px] font-bold uppercase">BUYING INTENT SIGNALS</span>
              <div className="flex flex-wrap gap-1.5">
                {['Hiring 3+ Outbound SDRs', 'Recent Funding Round', 'Expanding Sales Team'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-emerald-100/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: CAMPAIGN LAUNCH (7-Stage Animated Workflow)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              RAPID CLIENT ONBOARDING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Launch Client Campaigns Faster
            </h2>
          </div>

          <button
            onClick={() => setIsWorkflowPlaying(!isWorkflowPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isWorkflowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isWorkflowPlaying ? 'Pause Animation' : 'Resume Animation'}</span>
          </button>
        </div>

        {/* 7 Horizontal Workflow Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {LAUNCH_WORKFLOW.map((stage, idx) => {
            const StepIcon = stage.icon;
            const isSelected = activeWorkflowIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveWorkflowIdx(idx);
                  setIsWorkflowPlaying(false);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {stage.stepNum}
                  </span>
                  <StepIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{stage.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Card */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStageIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  AGENCY LAUNCH STEP {activeStage.stepNum}
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {activeStage.title}: {activeStage.shortDesc}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              ✓ {activeStage.actionText}
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: CAMPAIGN MANAGEMENT (Interactive Multi-Client Table)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CENTRALIZED OPERATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Manage Multiple Campaigns Without the Chaos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Monitor all active client campaigns across inboxes, reply rates, and booked meetings from one screen. Click any campaign to inspect details.
          </p>
        </div>

        {/* Campaign Table */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          <div className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:bg-[#181818] text-[11px] font-sans font-bold text-slate-500">
                    <th className="py-3 px-4">CAMPAIGN NAME</th>
                    <th className="py-3 px-3">CLIENT</th>
                    <th className="py-3 px-3">LEADS</th>
                    <th className="py-3 px-3">SENT</th>
                    <th className="py-3 px-3">REPLIES</th>
                    <th className="py-3 px-3">MEETINGS</th>
                    <th className="py-3 px-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {CAMPAIGNS_DATA.map((cmp) => (
                    <tr
                      key={cmp.id}
                      onClick={() => setSelectedCampaignModal(cmp)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {cmp.campaignName}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-blue-600 dark:text-blue-400">
                        {cmp.clientName}
                      </td>
                      <td className="py-3.5 px-3 font-sans">{cmp.leads.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-sans">{cmp.sent.toLocaleString()}</td>
                      <td className="py-3.5 px-3 font-sans text-emerald-600 font-bold">
                        {cmp.replies} ({cmp.positiveRate})
                      </td>
                      <td className="py-3.5 px-3 font-sans font-bold text-blue-600 dark:text-blue-400">
                        {cmp.meetings} Demos
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-sans font-bold">
                          {cmp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </section>

      {/* Campaign Detail Modal */}
      {selectedCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  CLIENT: {selectedCampaignModal.clientName}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {selectedCampaignModal.campaignName}
                </h4>
              </div>

              <button onClick={() => setSelectedCampaignModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Leads Targeted:</span>
                <strong className="text-slate-900 dark:text-white">{selectedCampaignModal.leads} Verified Contacts</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Total Emails Dispatched:</span>
                <strong className="text-slate-900 dark:text-white">{selectedCampaignModal.sent.toLocaleString()} Messages</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Positive Reply Conversion:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{selectedCampaignModal.positiveRate} ({selectedCampaignModal.replies} Replies)</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <span className="text-blue-600 dark:text-blue-400 font-bold">Booked Sales Meetings:</span>
                <strong className="text-slate-900 dark:text-blue-200 font-bold">{selectedCampaignModal.meetings} Demo Appointments</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCampaignModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close Campaign Telemetry
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: CLIENT DATA (Organized Workspace Modules)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            TENANT ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Keep Every Client's Data Organized
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Each client workflow remains completely segregated while operating from the same high-leverage operator dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Contacts', desc: 'Dedicated client lead lists with strict suppression walls.', icon: Users },
            { title: 'Campaigns', desc: 'Separate sending schedules and lookalike domain warmup.', icon: Mail },
            { title: 'Conversations', desc: 'Unified inbox filtering replies by client workspace.', icon: MessageSquare },
            { title: 'Deals', desc: 'Client-specific Kanban pipelines and ARR tracking.', icon: Building2 },
            { title: 'Reports', desc: 'White-label automated live link digests for clients.', icon: PieChart }
          ].map((mod, mIdx) => {
            const MIcon = mod.icon;
            return (
              <div
                key={mIdx}
                className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <MIcon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{mod.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{mod.desc}</p>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: SCALE (Agency Multi-Tool Stack vs Outtricks)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AGENCY MARGIN ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Scale Without Adding Another Tool for Every Client
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Before */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-200 dark:border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]/80">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                BEFORE (5 CLIENTS = 25 SUBSCRIPTIONS)
              </h3>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200">
                $3,500+/mo in Software
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {[
                '5 separate Apollo & Clay accounts with multiplied costs',
                '25 separate tool logins and disconnected dashboards',
                'Manual weekly spreadsheet reports compiled for clients',
                'Constant risk of sending the wrong message to the wrong client list'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <h3 className="font-extrabold text-base text-blue-950 dark:text-blue-100">
                AFTER (5+ CLIENTS ON OUTTRICKS)
              </h3>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                1 Platform • $79/mo Core
              </span>
            </div>

            <ul className="space-y-3 text-xs text-blue-950 dark:text-blue-200">
              {[
                'One unified agency portal with row-level workspace separation',
                'Connected multi-channel outreach across Email, LinkedIn & Voice AI',
                'Automated white-label reporting dashboards on your custom domain',
                'Pooled credit wallets and centralized billing management'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <strong className="font-semibold">{item}</strong>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA (Agency Focus)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AGENCY REVENUE OPERATING SYSTEM</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            More Clients. Less Operational Complexity.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Scale your agency revenue without multiplying your tool subscriptions or operational chaos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Run Your First Campaign</span>
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
          7-Day Free Trial • Multi-Client Portal • Built for Lead Gen Agencies
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AGENCY QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {AGENCY_FAQS.map((faq, fIdx) => {
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
