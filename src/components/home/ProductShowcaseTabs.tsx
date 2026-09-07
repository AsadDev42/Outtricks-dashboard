import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Zap, 
  Building2, 
  Workflow, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Filter, 
  TrendingUp, 
  ShieldCheck, 
  Bot, 
  Check, 
  Layers, 
  Activity, 
  BarChart3,
  Calendar,
  Clock,
  ExternalLink,
  Phone,
  Building,
  Flame,
  CheckCircle,
  Download,
  Send,
  Plus,
  RotateCw,
  X,
  Copy,
  CheckCheck,
  Play,
  Pause,
  Eye,
  Settings,
  ChevronDown,
  MessageSquare,
  AlertCircle,
  Smile,
  Inbox,
  ArrowUpRight,
  TrendingDown,
  UserCheck,
  UserPlus,
  Share2,
  ThumbsUp,
  Briefcase,
  MapPin,
  ChevronRight,
  Mic,
  MicOff,
  PhoneOff,
  PhoneForwarded,
  Volume2,
  Radio,
  Headphones,
  Star,
  DollarSign,
  FileText,
  Award,
  MoveRight,
  GitBranch,
  Database
} from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

type TabId = 'ai-copilot' | 'lead-database' | 'email-outreach' | 'linkedin-safe' | 'voice-ai-sdr' | 'freelance-ai' | 'unified-crm' | 'workflow-automation';

interface TabItem {
  id: TabId;
  label: string;
  icon: any;
  href: string;
}

interface LeadRecord {
  id: number;
  name: string;
  avatar: string;
  title: string;
  company: string;
  email: string;
  status: 'verified' | 'catchall';
  statusLabel: string;
  location: string;
  phone: string;
  headcount: string;
  intent: string;
  techStack: string[];
  score: number;
  industry: string;
}

interface FeedEvent {
  id: string;
  type: 'sent' | 'opened' | 'replied' | 'scheduled';
  title: string;
  subtitle: string;
  time: string;
  badge?: string;
  prospect: string;
  company: string;
  inbox: string;
  bodySnippet?: string;
}

interface LinkedinFeedEvent {
  id: string;
  type: 'viewed' | 'request_sent' | 'accepted' | 'dm_sent' | 'replied' | 'scheduled';
  title: string;
  subtitle: string;
  time: string;
  badge?: string;
  prospect: string;
  company: string;
  detail: string;
}

interface VoiceTranscriptMessage {
  id: number;
  speaker: 'ai' | 'prospect';
  speakerName: string;
  text: string;
  time: string;
  sentiment?: 'positive' | 'neutral';
}

interface FreelanceJob {
  id: string;
  title: string;
  platform: string;
  budget: string;
  clientRating: string;
  clientSpend: string;
  matchScore: number;
  detectedTime: string;
  status: 'analyzing' | 'writing' | 'ready' | 'submitted';
  description: string;
  defaultProposal: string;
}


interface FlowNode {
  id: string;
  type: string;
  label: string;
  subtitle: string;
  icon: any;
  color: string;
  status: string;
  telemetry: string;
  configSummary: string;
}

const INITIAL_FLOW_NODES: FlowNode[] = [
  {
    id: 'n1',
    type: 'TRIGGER',
    label: 'New ICP Lead Sourced',
    subtitle: 'Filtered from 480M+ B2B pool',
    icon: Zap,
    color: 'amber',
    status: 'Instant Webhook',
    telemetry: '1,420 leads processed today',
    configSummary: 'Condition: Company headcount > 50, ICP Score >= 90%, Hiring for SDRs'
  },
  {
    id: 'n2',
    type: 'CONTACT',
    label: 'Lead Qualification',
    subtitle: 'Multi-attribute filtering',
    icon: Database,
    color: 'blue',
    status: 'Active',
    telemetry: '99.4% valid email rate',
    configSummary: 'Criteria: Verified corporate email, active title match, intent signal'
  },
  {
    id: 'n3',
    type: 'VERIFICATION',
    label: 'Deliverability & SMTP Check',
    subtitle: 'Zero bounce verification',
    icon: ShieldCheck,
    color: 'emerald',
    status: '99.8% Guaranteed',
    telemetry: '0.2% bounce rate average',
    configSummary: 'Real-time MX handshake, Catch-All safe sandbox routing, spam trap removal'
  },
  {
    id: 'n4',
    type: 'OUTREACH ACTION',
    label: 'Personalized Cold Email #1',
    subtitle: 'Dispatched via 24 rotating inboxes',
    icon: Mail,
    color: 'blue',
    status: '24 Inboxes Rotated',
    telemetry: '68.7% open rate across cohorts',
    configSummary: 'Dynamic spintax variation, custom AI first line, P2P warmup rotation'
  },
  {
    id: 'n5',
    type: 'CONDITION SPLIT',
    label: 'Intent & Engagement Router',
    subtitle: 'Branch on reply or time delay',
    icon: GitBranch,
    color: 'blue',
    status: 'Real-time Webhook',
    telemetry: 'Routes within 400ms of event',
    configSummary: 'If no reply after 48h → Branch A. If opened or positive reply → Branch B'
  },
  {
    id: 'n6a',
    type: 'BRANCH A (NO REPLY)',
    label: 'LinkedIn Touch & Safe DM',
    subtitle: 'Residential proxy connection',
    icon: Linkedin,
    color: 'blue',
    status: '100 / wk Safe Limit',
    telemetry: '38.4% invite acceptance rate',
    configSummary: '48h delay → Profile view → Custom connection request with post reference'
  },
  {
    id: 'n6b',
    type: 'BRANCH B (POSITIVE)',
    label: 'Voice AI Qualification Call',
    subtitle: 'Sub-400ms WebRTC voice SDR',
    icon: PhoneCall,
    color: 'emerald',
    status: '364ms Turn Latency',
    telemetry: '98.4% qualification accuracy',
    configSummary: 'Triggers instant outbound qualification call and books Google/Outlook calendar slot'
  },
  {
    id: 'n7',
    type: 'CONVERGENCE & CRM',
    label: 'Deals CRM Instant Sync',
    subtitle: 'Replicated to PostgreSQL core',
    icon: Building2,
    color: 'emerald',
    status: '0ms Sync Lag',
    telemetry: '$440,000 active pipeline synchronized',
    configSummary: 'Auto-creates opportunity, updates contract ARR, pushes telemetry to HubSpot & Salesforce'
  }
];

interface DealRecord {
  id: string;
  name: string;
  role: string;
  company: string;
  value: number;
  stage: 'lead-sourced' | 'engaged' | 'demo-booked' | 'proposal' | 'closed-won';
  avatar: string;
  statusBadge: string;
  lastActivity: string;
  time: string;
  nextAction: string;
}

const INITIAL_DEALS: DealRecord[] = [
  {
    id: 'd1',
    name: 'Sarah Jenkins',
    role: 'VP of Growth',
    company: 'CloudScale AI',
    value: 45000,
    stage: 'demo-booked',
    avatar: 'SJ',
    statusBadge: 'High Intent',
    lastActivity: 'Booked demo via Voice AI SDR',
    time: '1h ago',
    nextAction: 'Thursday 2:00 PM PST Kickoff Demo'
  },
  {
    id: 'd2',
    name: 'Marcus Vance',
    role: 'Head of Outbound',
    company: 'HyperGrowth Labs',
    value: 82000,
    stage: 'proposal',
    avatar: 'MV',
    statusBadge: 'Contract Review',
    lastActivity: 'Reviewed Enterprise MSA & Security Spec',
    time: '3h ago',
    nextAction: 'Awaiting signature from Finance'
  },
  {
    id: 'd3',
    name: 'Elena Rostova',
    role: 'Chief Revenue Officer',
    company: 'FinTech Stack',
    value: 120000,
    stage: 'engaged',
    avatar: 'ER',
    statusBadge: 'Warm Reply',
    lastActivity: 'Replied to LinkedIn custom outreach',
    time: '20m ago',
    nextAction: 'Send 24-inbox architecture diagram'
  },
  {
    id: 'd4',
    name: 'David Chen',
    role: 'Director of Demand Gen',
    company: 'SaaSFlow',
    value: 38000,
    stage: 'lead-sourced',
    avatar: 'DC',
    statusBadge: 'Verified',
    lastActivity: 'Indexed in Lead Finder',
    time: '15m ago',
    nextAction: 'Queued for Multi-Inbox Sequence #1'
  },
  {
    id: 'd5',
    name: 'Acme Global Corp',
    role: 'VP of RevOps',
    company: 'Acme Corp',
    value: 127000,
    stage: 'closed-won',
    avatar: 'AC',
    statusBadge: 'Won ✓',
    lastActivity: 'Annual Stripe billing activated',
    time: 'Yesterday',
    nextAction: 'Onboarding & Slack Connect setup'
  },
  {
    id: 'd6',
    name: 'Amira Patel',
    role: 'Founder & CEO',
    company: 'ScaleWave',
    value: 28000,
    stage: 'engaged',
    avatar: 'AP',
    statusBadge: 'Email Open',
    lastActivity: 'Email open #4 logged in Toronto',
    time: '45m ago',
    nextAction: 'Trigger Voice AI qualification sequence'
  }
];

const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "S",
    title: "VP of Growth",
    company: "CloudScale AI",
    email: "sarah@cloudscale.ai",
    status: "verified",
    statusLabel: "99.8%",
    location: "San Francisco, CA",
    phone: "+1 (415) 892-4910",
    headcount: "120–250",
    intent: "Evaluating Outbound SDR & Multi-Inbox Stack",
    techStack: ["Salesforce", "HubSpot", "Stripe", "Outreach"],
    score: 98,
    industry: "B2B SaaS / AI Infrastructure"
  },
  {
    id: 2,
    name: "Marcus Vance",
    avatar: "M",
    title: "Head of Outbound",
    company: "HyperGrowth Labs",
    email: "marcus@hypergrowth.io",
    status: "verified",
    statusLabel: "99.8%",
    location: "Austin, TX",
    phone: "+1 (512) 473-1980",
    headcount: "50–100",
    intent: "Hiring 4 Outbound SDRs (+35% Growth)",
    techStack: ["Apollo", "Smartlead", "PostgreSQL"],
    score: 96,
    industry: "Growth Agency / Sales Tech"
  },
  {
    id: 3,
    name: "Elena Rostova",
    avatar: "E",
    title: "Chief Revenue Officer",
    company: "FinTech Stack",
    email: "elena@fintechstack.com",
    status: "verified",
    statusLabel: "99.8%",
    location: "London, UK",
    phone: "+44 20 7946 0912",
    headcount: "300–600",
    intent: "Expanding European Enterprise Sales Operations",
    techStack: ["Salesforce", "ZoomInfo", "Salesloft"],
    score: 94,
    industry: "FinTech / B2B Payments"
  },
  {
    id: 4,
    name: "David Chen",
    avatar: "D",
    title: "Director of Demand Gen",
    company: "SaaSFlow",
    email: "david@saasflow.co",
    status: "catchall",
    statusLabel: "Catch-All",
    location: "New York, NY",
    phone: "+1 (212) 658-4421",
    headcount: "80–150",
    intent: "Re-evaluating Cold Email Deliverability & Warmup",
    techStack: ["HubSpot", "Lemlist", "Gong"],
    score: 91,
    industry: "Workflow Automation"
  },
  {
    id: 5,
    name: "Amira Patel",
    avatar: "A",
    title: "Founder & CEO",
    company: "ScaleWave Media",
    email: "amira@scalewave.agency",
    status: "verified",
    statusLabel: "99.8%",
    location: "Toronto, Canada",
    phone: "+1 (416) 555-0199",
    headcount: "30–60",
    intent: "Replacing Clay + Apollo with Unified Stack",
    techStack: ["Notion", "Instantly", "Stripe"],
    score: 97,
    industry: "Performance Marketing"
  },
  {
    id: 6,
    name: "Tom Hiddleston",
    avatar: "T",
    title: "VP of Sales",
    company: "Apex Global Logistics",
    email: "tom@apexlogistics.com",
    status: "verified",
    statusLabel: "99.8%",
    location: "Chicago, IL",
    phone: "+1 (312) 884-2100",
    headcount: "500–1000",
    intent: "Automating Freight Broker Outbound Cadences",
    techStack: ["Microsoft Dynamics", "Oracle", "Twilio"],
    score: 93,
    industry: "Logistics & Supply Chain"
  },
  {
    id: 7,
    name: "Rachel Green",
    avatar: "R",
    title: "Head of Talent Acquisition",
    company: "NextGen Ventures",
    email: "rachel@nextgen.vc",
    status: "verified",
    statusLabel: "99.8%",
    location: "Boston, MA",
    phone: "+1 (617) 492-8814",
    headcount: "100–250",
    intent: "Sourcing Senior AI & Growth Engineers",
    techStack: ["Greenhouse", "LinkedIn Recruiter"],
    score: 95,
    industry: "Venture Capital / Executive Recruiting"
  },
  {
    id: 8,
    name: "Carlos Mendez",
    avatar: "C",
    title: "Director of RevOps",
    company: "PayPulse Corp",
    email: "carlos@paypulse.io",
    status: "verified",
    statusLabel: "99.8%",
    location: "Miami, FL",
    phone: "+1 (305) 779-3320",
    headcount: "200–400",
    intent: "Eliminating 6 SaaS Sync Tools for Single Database",
    techStack: ["Salesforce", "Segment", "BigQuery"],
    score: 99,
    industry: "B2B Billing Infrastructure"
  }
];

const INITIAL_FEED: FeedEvent[] = [
  {
    id: 'f1',
    type: 'sent',
    title: 'Email sent to Marcus Vance',
    subtitle: 'Subject: Quick question about Datadog',
    time: '2s ago',
    prospect: 'Marcus Vance',
    company: 'HyperGrowth Labs',
    inbox: 'alex@outtricks-growth.com (Inbox #04)',
    bodySnippet: 'Noticed HyperGrowth Labs is expanding hiring for your sales team...'
  },
  {
    id: 'f2',
    type: 'sent',
    title: 'Email sent to Sarah Jenkins',
    subtitle: 'Subject: Quick question about Stripe',
    time: '6s ago',
    prospect: 'Sarah Jenkins',
    company: 'CloudScale AI',
    inbox: 'sdr@outtricks-scale.io (Inbox #12)',
    bodySnippet: 'Saw you are evaluating multi-inbox rotation. We route through 24 verified mailboxes...'
  },
  {
    id: 'f3',
    type: 'opened',
    title: 'Email opened by Elena Rostova',
    subtitle: 'Subject: Quick question about Figma',
    time: '12s ago',
    prospect: 'Elena Rostova',
    company: 'FinTech Stack',
    inbox: 'elena.sdr@outtricks.co (Inbox #07)',
    bodySnippet: 'Opened via Apple Mail iOS • 2nd read in 1 hour'
  },
  {
    id: 'f4',
    type: 'replied',
    title: 'Replied by David Chen',
    subtitle: 'Sounds interesting. Let\'s chat.',
    time: '28s ago',
    badge: 'Positive',
    prospect: 'David Chen',
    company: 'SaaSFlow',
    inbox: 'david.c@outtricks-reach.com (Inbox #19)',
    bodySnippet: '"Sounds interesting. Let\'s chat Thursday afternoon at 2 PM PST. Send over an invite."'
  },
  {
    id: 'f5',
    type: 'sent',
    title: 'Email sent to Amira Patel',
    subtitle: 'Subject: Quick question about ScaleWave',
    time: '35s ago',
    prospect: 'Amira Patel',
    company: 'ScaleWave Media',
    inbox: 'alex.p@outtricks-ops.io (Inbox #02)',
    bodySnippet: 'Distribute sending across unlimited inboxes with automated warmup...'
  },
  {
    id: 'f6',
    type: 'scheduled',
    title: 'Follow-up scheduled',
    subtitle: 'Step 1 • In 2 days',
    time: '1m ago',
    prospect: 'Tom Hiddleston',
    company: 'Apex Global Logistics',
    inbox: 'Auto-Sequence Engine',
    bodySnippet: 'Scheduled condition: If no reply after 48 hours, dispatch Sequence Step #2 with social proof.'
  }
];

const INITIAL_LINKEDIN_FEED: LinkedinFeedEvent[] = [
  {
    id: 'lf1',
    type: 'viewed',
    title: 'Profile viewed',
    subtitle: 'Sarah Jenkins • CloudScale AI',
    time: '10s ago',
    prospect: 'Sarah Jenkins',
    company: 'CloudScale AI',
    detail: 'Human-like profile visit via Residential Cloud Proxy. Logged 96% ICP score.'
  },
  {
    id: 'lf2',
    type: 'request_sent',
    title: 'Connection request sent',
    subtitle: 'Marcus Vance • HyperGrowth Labs',
    time: '45s ago',
    prospect: 'Marcus Vance',
    company: 'HyperGrowth Labs',
    detail: 'Personalized invite dispatched referencing recent post.'
  },
  {
    id: 'lf3',
    type: 'accepted',
    title: 'Connection accepted',
    subtitle: 'Elena Rostova • FinTech Stack',
    time: '2m ago',
    badge: 'Accepted',
    prospect: 'Elena Rostova',
    company: 'FinTech Stack',
    detail: 'Invite accepted. Automated sequence triggered personalized DM.'
  },
  {
    id: 'lf4',
    type: 'dm_sent',
    title: 'Message delivered',
    subtitle: 'David Chen • SaaSFlow',
    time: '4m ago',
    prospect: 'David Chen',
    company: 'SaaSFlow',
    detail: 'First sequence message delivered: "Hey David, saw your recent note on pipeline acceleration..."'
  },
  {
    id: 'lf5',
    type: 'replied',
    title: 'Positive reply received',
    subtitle: '"Yes, let\'s connect Friday at 11 AM!"',
    time: '8m ago',
    badge: 'Positive',
    prospect: 'Sarah Jenkins',
    company: 'CloudScale AI',
    detail: 'Positive intent analyzed (99%). Deal auto-created in CRM.'
  },
  {
    id: 'lf6',
    type: 'scheduled',
    title: 'Follow-up scheduled',
    subtitle: 'Amira Patel • ScaleWave Media',
    time: '12m ago',
    prospect: 'Amira Patel',
    company: 'ScaleWave Media',
    detail: 'Condition queued: If no reply in 48 hours, send case study.'
  }
];

const LINKEDIN_PIPELINE_STAGES = [
  'Prospect Found',
  'Profile Viewed',
  'Request Sent',
  'Accepted',
  'DM Sent',
  'Follow-up',
  'Positive Reply'
];

const VOICE_CALL_TRANSCRIPT: VoiceTranscriptMessage[] = [
  {
    id: 1,
    speaker: 'ai',
    speakerName: 'Voice AI SDR (Alex)',
    text: "Hi Sarah, this is Alex from Outtricks. Saw CloudScale AI recently expanded its SDR team. Free for a quick 2-minute check on your outbound pipeline?",
    time: "00:06"
  },
  {
    id: 2,
    speaker: 'prospect',
    speakerName: 'Sarah Jenkins (VP of Growth)',
    text: "Hey Alex. Yeah, we're actually evaluating solutions to replace our disconnected Apollo and Smartlead setup. Can your voice agent handle sub-400ms WebRTC latency?",
    time: "00:24",
    sentiment: 'positive'
  },
  {
    id: 3,
    speaker: 'ai',
    speakerName: 'Voice AI SDR (Alex)',
    text: "Absolutely. Outtricks runs under 380ms turn-latency with natural interruption handling and live database synchronization. I can lock in a 15-minute demo with our founder this Thursday at 2:00 PM PST. Does that time work?",
    time: "00:52"
  },
  {
    id: 4,
    speaker: 'prospect',
    speakerName: 'Sarah Jenkins (VP of Growth)',
    text: "Thursday at 2:00 PM PST works great. Send the calendar invite over to sarah@cloudscale.ai.",
    time: "01:18",
    sentiment: 'positive'
  },
  {
    id: 5,
    speaker: 'ai',
    speakerName: 'Voice AI SDR (Alex)',
    text: "Done! Calendar invite dispatched to sarah@cloudscale.ai and deal logged in CRM. Thanks Sarah, speak with you Thursday!",
    time: "01:38"
  }
];

const INITIAL_FREELANCE_JOBS: FreelanceJob[] = [
  {
    id: 'job1',
    title: 'Full-Stack Next.js 15 & Supabase Enterprise B2B Platform',
    platform: 'Upwork',
    budget: '$15,000 Fixed',
    clientRating: '★ 5.0 (28 reviews)',
    clientSpend: '$140k+ Spent',
    matchScore: 99.2,
    detectedTime: '45s ago',
    status: 'ready',
    description: 'Looking for a senior engineer to architect our multi-tenant SaaS dashboard using Next.js App Router, Tailwind CSS, and Supabase PostgreSQL with real-time sync.',
    defaultProposal: `Hi there,

Reviewed your requirements for the Next.js 15 & Supabase multi-tenant platform. We've built similar high-concurrency architectures for B2B SaaS teams with sub-second query latency and zero webhook drift.

Key Deliverables:
1. Next.js 15 App Router + Tailwind CSS enterprise dashboard
2. PostgreSQL / Supabase schema with Row-Level Security (RLS)
3. Webhook pipelines with 99.99% deliverability guarantee

Attached our case study. Available for a kickoff call today!`
  },
  {
    id: 'job2',
    title: 'Build Multi-Inbox Outbound Mailer & Cloud AI SDR',
    platform: 'Contra',
    budget: '$95–$125 / hr',
    clientRating: '★ 4.9 (18 reviews)',
    clientSpend: '$85k+ Spent',
    matchScore: 97.8,
    detectedTime: '3m ago',
    status: 'submitted',
    description: 'Need an expert in cold email deliverability, DNS record orchestration (SPF, DKIM, DMARC), and automated warmup rotation over PostgreSQL.',
    defaultProposal: `Hello! We specialize in high-scale outbound email infrastructure and multi-inbox rotation algorithms. We recently helped a client reach 99.4% inbox placement across 24 domains with automated ramp-up curves. Would love to share our technical spec.`
  },
  {
    id: 'job3',
    title: 'Enterprise WebRTC Voice AI Agent with Sub-400ms Turn Latency',
    platform: 'Upwork',
    budget: '$22,000 Fixed',
    clientRating: '★ 5.0 (42 reviews)',
    clientSpend: '$220k+ Spent',
    matchScore: 96.4,
    detectedTime: '6m ago',
    status: 'ready',
    description: 'Seeking a voice AI engineer to develop low-latency bidirectional WebRTC voice agents with real-time speech-to-text and interruption detection.',
    defaultProposal: `Hi! We run native sub-400ms WebRTC voice SDR architectures with live calendar booking integration. Our latency benchmarks consistently beat standard websocket setups. Open to a live demo.`
  },
  {
    id: 'job4',
    title: 'PostgreSQL Real-Time Data Pipeline & CRM Sync Engine',
    platform: 'Freelancer',
    budget: '$80–$100 / hr',
    clientRating: '★ 4.8 (12 reviews)',
    clientSpend: '$45k+ Spent',
    matchScore: 94.5,
    detectedTime: '11m ago',
    status: 'analyzing',
    description: 'Build a unified CRM synchronization engine that pulls contacts, deals, and engagement telemetry into a single PostgreSQL database.',
    defaultProposal: `Hey there! We have pre-built robust bidirectional sync adapters for HubSpot, Salesforce, and PostgreSQL. Let's discuss your schema requirements.`
  }
];

const CRM_STAGES: { id: DealRecord['stage']; label: string; countLabel: string }[] = [
  { id: 'lead-sourced', label: 'Lead Sourced', countLabel: '14 Leads' },
  { id: 'engaged', label: 'Engaged', countLabel: '8 Leads' },
  { id: 'demo-booked', label: 'Demo Booked', countLabel: '5 Deals' },
  { id: 'proposal', label: 'Proposal Sent', countLabel: '3 Deals' },
  { id: 'closed-won', label: 'Closed Won', countLabel: '2 Won' }
];

const TABS: TabItem[] = [
  { id: 'ai-copilot', label: 'Let AI handle it', icon: Sparkles, href: '/platform/ai-agents' },
  { id: 'lead-database', label: 'Find B2B leads', icon: Search, href: '/platform/8-dimension-b2b-pool' },
  { id: 'email-outreach', label: 'Cold Email', icon: Mail, href: '/platform/multi-inbox-email-outreach' },
  { id: 'linkedin-safe', label: 'LinkedIn Safe', icon: Linkedin, href: '/platform/linkedin-automation' },
  { id: 'voice-ai-sdr', label: 'Voice AI SDR', icon: PhoneCall, href: '/platform/sub-400ms-webrtc' },
  { id: 'freelance-ai', label: 'Freelance AI', icon: Zap, href: '/platform/ai-agents' },
  { id: 'unified-crm', label: 'Deals Pipeline', icon: Building2, href: '/platform/crm' },
  { id: 'workflow-automation', label: 'Flow Builder', icon: Workflow, href: '/platform/visual-flow-builder' },
];

export const ProductShowcaseTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('ai-copilot');

  // AI Copilot States (Matching Image 2 Reference)
  const [aiPromptText, setAiPromptText] = useState('Find 500 VPs of Sales at Series B SaaS companies with verified mobile numbers and launch multi-inbox sequence');
  const [aiRunning, setAiRunning] = useState(false);
  const [aiStepIndex, setAiStepIndex] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiResultReady, setAiResultReady] = useState(false);

  const handleRunAiExecution = () => {
    if (aiRunning) return;
    setAiRunning(true);
    setAiStepIndex(1);
    setAiProgress(25);
    setAiResultReady(false);
    showToast('🚀 Outtricks AI Copilot initializing 4-engine autonomous pipeline...');

    setTimeout(() => {
      setAiStepIndex(2);
      setAiProgress(50);
    }, 700);

    setTimeout(() => {
      setAiStepIndex(3);
      setAiProgress(75);
    }, 1400);

    setTimeout(() => {
      setAiStepIndex(4);
      setAiProgress(100);
      setAiRunning(false);
      setAiResultReady(true);
      showToast('✓ Autonomous campaign live! 500 leads queued across 24 inboxes.');
    }, 2200);
  };

  // Lead Finder States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [activeDetailLead, setActiveDetailLead] = useState<LeadRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cold Email States
  const [emailSubject, setEmailSubject] = useState("Quick question about {{company}}'s outbound deliverability");
  const [emailBody, setEmailBody] = useState(`Hi {{first_name}},

Noticed {{company}} is expanding hiring for your sales team.

Most teams struggle with multiple mailboxes landing in spam.

Outtricks distributes sending across unlimited inboxes with automated warmup and unified reply management on a single PostgreSQL core.

Open to a 10-min intro Thursday?

Best,
{{Your_Name}}`);

  const [rotationMode, setRotationMode] = useState('Round Robin');
  const [warmupStatus, setWarmupStatus] = useState('100% Healthy');
  const [abTestMode, setAbTestMode] = useState('Subject Lines');
  const [followUpSteps, setFollowUpSteps] = useState('3 Steps');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>(INITIAL_FEED);
  const [activeFeedDetail, setActiveFeedDetail] = useState<FeedEvent | null>(null);
  const [feedPaused, setFeedPaused] = useState(false);

  // LinkedIn Specific States
  const [linkedinMessage, setLinkedinMessage] = useState("Hey Sarah, saw your recent post on scaling sales infrastructure at CloudScale AI. Would love to connect and follow your journey.");
  const [linkedinConnectState, setLinkedinConnectState] = useState<'connect' | 'sending' | 'sent'>('connect');
  const [linkedinProfileModalOpen, setLinkedinProfileModalOpen] = useState(false);
  const [linkedinPreviewModalOpen, setLinkedinPreviewModalOpen] = useState(false);
  const [activePipelineStage, setActivePipelineStage] = useState<string>('Request Sent');
  const [linkedinFeedEvents, setLinkedinFeedEvents] = useState<LinkedinFeedEvent[]>(INITIAL_LINKEDIN_FEED);
  const [activeLinkedinFeedDetail, setActiveLinkedinFeedDetail] = useState<LinkedinFeedEvent | null>(null);
  const [linkedinFeedPaused, setLinkedinFeedPaused] = useState(false);

  // Voice AI SDR Specific States
  const [voiceCallStatus, setVoiceCallStatus] = useState<'active' | 'paused' | 'ended'>('active');
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'ai' | 'prospect' | 'booking'>('ai');
  const [voiceCallSeconds, setVoiceCallSeconds] = useState(102); // 01:42

  // Freelance AI Specific States
  const [freelanceJobs, setFreelanceJobs] = useState<FreelanceJob[]>(INITIAL_FREELANCE_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>('job1');
  const [proposalText, setProposalText] = useState<string>(INITIAL_FREELANCE_JOBS[0].defaultProposal);
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalPreviewModalOpen, setProposalPreviewModalOpen] = useState(false);

  // Deals CRM Specific States
  const [deals, setDeals] = useState<DealRecord[]>(INITIAL_DEALS);
  const [activeDealModal, setActiveDealModal] = useState<DealRecord | null>(null);

  // Workflow Flow Builder States
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>(INITIAL_FLOW_NODES);
  const [activeFlowNodeModal, setActiveFlowNodeModal] = useState<FlowNode | null>(null);
  const [flowStatus, setFlowStatus] = useState<'active' | 'paused'>('active');
  const [isTestingFlow, setIsTestingFlow] = useState(false);

  const handleRunFlowTest = () => {
    if (isTestingFlow) return;
    setIsTestingFlow(true);
    showToast('🚀 Dispatching test payload through 7-step autonomous flow...');
    setTimeout(() => {
      setIsTestingFlow(false);
      showToast('✓ Flow Test Successful! All 7 nodes executed in 364ms with 0 errors.');
    }, 2000);
  };

  const selectedJob = freelanceJobs.find(j => j.id === selectedJobId) || freelanceJobs[0];

  // Dynamic Counters
  const totalPipelineValue = deals.reduce((acc, d) => acc + d.value, 0);
  const activeDealsCount = deals.filter(d => d.stage !== 'closed-won').length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Move deal to next stage
  const handleAdvanceDeal = (dealId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const stageOrder: DealRecord['stage'][] = ['lead-sourced', 'engaged', 'demo-booked', 'proposal', 'closed-won'];

    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        const currentIndex = stageOrder.indexOf(deal.stage);
        const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1);
        const nextStage = stageOrder[nextIndex];
        const newStatus = nextStage === 'closed-won' ? 'Won ✓' : nextStage === 'proposal' ? 'Contract Review' : nextStage === 'demo-booked' ? 'Demo Scheduled' : 'Active Conversation';
        
        showToast(`Moved ${deal.company} to ${CRM_STAGES.find(s => s.id === nextStage)?.label}!`);
        return {
          ...deal,
          stage: nextStage,
          statusBadge: newStatus
        };
      }
      return deal;
    }));

    if (activeDealModal && activeDealModal.id === dealId) {
      setActiveDealModal(null);
    }
  };

  // Filter Leads
  const filteredLeads = INITIAL_LEADS.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'verified' && lead.status === 'verified') ||
      (statusFilter === 'catchall' && lead.status === 'catchall');

    const matchesLocation = locationFilter === 'all' ||
      (locationFilter === 'us' && (lead.location.includes('CA') || lead.location.includes('TX') || lead.location.includes('NY') || lead.location.includes('IL') || lead.location.includes('MA') || lead.location.includes('FL'))) ||
      (locationFilter === 'eu' && (lead.location.includes('UK') || lead.location.includes('Europe'))) ||
      (locationFilter === 'ca' && lead.location.includes('Canada'));

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectRow = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveLead = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savingId || savedIds.includes(id)) return;
    
    setSavingId(id);
    setTimeout(() => {
      setSavingId(null);
      setSavedIds(prev => [...prev, id]);
      showToast(`✓ Lead saved for ${INITIAL_LEADS.find(l => l.id === id)?.name}`);
    }, 1100);
  };

  const handlePushCampaign = () => {
    if (selectedIds.length === 0) {
      showToast('Please select at least 1 lead');
      return;
    }
    showToast(`🚀 ${selectedIds.length} leads dispatched to campaign!`);
    setSelectedIds([]);
  };

  // Voice AI Live Call Simulation Loop
  useEffect(() => {
    if (activeTab !== 'voice-ai-sdr' || voiceCallStatus !== 'active') return;

    const timer = setInterval(() => {
      setVoiceCallSeconds(prev => prev + 1);
    }, 1000);

    const speakerInterval = setInterval(() => {
      setActiveSpeaker(prev => {
        if (prev === 'ai') return 'prospect';
        if (prev === 'prospect') return 'booking';
        return 'ai';
      });
    }, 3800);

    return () => {
      clearInterval(timer);
      clearInterval(speakerInterval);
    };
  }, [activeTab, voiceCallStatus]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Freelance Job Switch
  const handleSelectJob = (job: FreelanceJob) => {
    setSelectedJobId(job.id);
    setProposalText(job.defaultProposal);
    setProposalSubmitted(job.status === 'submitted');
    showToast(`Selected job: ${job.title.slice(0, 32)}...`);
  };

  // Freelance AI Proposal Generation
  const handleRegenerateProposal = () => {
    setProposalText(`Hi there,

Read your brief for "${selectedJob.title}". Our autonomous engineering team has previously shipped 14+ production systems in this exact category with 100% test coverage and verified client reviews.

Proposed Roadmap:
1. Technical Architecture & Architecture Blueprint (Day 1-2)
2. Core Pipeline Implementation & Real-Time Sync (Day 3-7)
3. Deployment, Security Hardening & Monitoring Handover (Day 8-10)

Would love to hop on a 10-minute kickoff call today!`);
    showToast('✨ AI Proposal regenerated with custom milestones and portfolio proof');
  };

  // Submit Proposal Action
  const handleSubmitProposal = () => {
    if (isSubmittingProposal || proposalSubmitted) return;

    setIsSubmittingProposal(true);
    showToast(`🚀 Submitting custom proposal for ${selectedJob.budget}...`);

    setTimeout(() => {
      setIsSubmittingProposal(false);
      setProposalSubmitted(true);
      setFreelanceJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, status: 'submitted' } : j));
      showToast(`✓ Proposal dispatched in 42 seconds! Bid logged on ${selectedJob.platform}`);
    }, 1200);
  };

  // LinkedIn Connect Action
  const handleLinkedinConnect = () => {
    if (linkedinConnectState !== 'connect') return;
    setLinkedinConnectState('sending');
    showToast('Sending personalized connection request...');

    setTimeout(() => {
      setLinkedinConnectState('sent');
      showToast('✓ Request sent to Sarah Jenkins!');
    }, 1000);
  };

  // LinkedIn AI Personalize Action
  const handleLinkedinAiPersonalize = () => {
    setLinkedinMessage("Hi Sarah, saw your recent post on sales infrastructure bottlenecks at CloudScale. We solved similar sync drift for fast-growing B2B teams. Would love to connect!");
    showToast('✨ Message personalized with AI using Sarah\'s recent activity');
  };

  const insertLinkedinVariable = (varName: string) => {
    setLinkedinMessage(prev => prev + ' ' + varName);
    showToast(`Added ${varName}`);
  };

  // Email Campaign Simulation
  const handleStartCampaignSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setSimProgress(10);
    showToast('🚀 Dispatching 24-inbox campaign...');

    setTimeout(() => {
      setSimProgress(100);
      setIsSimulating(false);
      showToast('✓ Campaign live! 18 emails queued.');
    }, 2000);
  };

  return (
    <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Segmented Tab Pill Row */}
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 rounded-full bg-slate-100/90 dark:bg-[#141414]/90 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs max-w-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Product Showcase Card */}
      <Card3DTilt maxTilt={1.5} scale={1.002} className="max-w-6xl mx-auto relative">
        <div className="bg-white/95 dark:bg-[#141414]/95 border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl shadow-slate-900/5 space-y-6">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="absolute top-6 right-6 z-50 bg-slate-900 text-white text-xs font-sans py-2.5 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Module Content Switcher */}
          <div className="relative min-h-[460px]">
            
            {/* =========================================================================
                0. LET AI HANDLE IT (OUTTRICKS AI COPILOT - MATCHING IMAGE 2 REFERENCE)
                ========================================================================= */}
            {activeTab === 'ai-copilot' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                {/* Window Bar Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">Outtricks AI</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-xs text-slate-500 font-medium font-sans">New conversation</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  </div>
                </div>

                {/* Main Centered Action Prompt Area */}
                <div className="py-6 sm:py-8 max-w-2xl mx-auto text-center space-y-6">
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                      Hi, what do you want to achieve?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
                      Ask a question or click on a suggestion below
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {[
                      { label: 'Find Saved leads', prompt: 'Find 500 VPs of Sales at Series B SaaS companies with direct mobile numbers' },
                      { label: 'Create a campaign', prompt: 'Create a multi-inbox cold email campaign targeting US FinTech founders' },
                      { label: 'Launch Voice AI SDR', prompt: 'Configure an AI phone agent to call inbound demo signups within 60 seconds' },
                      { label: 'Set up LinkedIn cadence', prompt: 'Set up safe cloud proxy connection requests with personalized opening lines' },
                      { label: 'Other (enter)', prompt: '' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAiPromptText(item.prompt || 'Find high-intent accounts currently hiring SDRs and launch an automated multi-channel sequence');
                          showToast(`Selected: ${item.label}`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Textarea Action Box */}
                  <div className="relative text-left bg-slate-50/80 dark:bg-[#141414]/60 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A]/80 p-4 space-y-3 shadow-xs">
                    <textarea
                      rows={3}
                      value={aiPromptText}
                      onChange={(e) => setAiPromptText(e.target.value)}
                      placeholder="Describe what you want to do..."
                      className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none resize-none"
                    />

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A]/60">
                      <span className="text-[10px] font-sans text-slate-400">
                        Powered by 6 native engines • 0 sync delay
                      </span>

                      <button
                        onClick={handleRunAiExecution}
                        disabled={aiRunning}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
                      >
                        {aiRunning ? (
                          <>
                            <RotateCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Executing Workflow...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Run with AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live Execution Telemetry Container */}
                  {(aiRunning || aiResultReady) && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-left space-y-2.5 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs font-sans font-bold pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
                        <span className="text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Autonomous Engine Telemetry
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-sans">{aiProgress}% Complete</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className={`flex items-center gap-2 ${aiStepIndex >= 1 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>1. Sourced 500 verified ICP leads from 480M+ pool</span>
                        </div>
                        <div className={`flex items-center gap-2 ${aiStepIndex >= 2 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>2. Multi-dimensional search completed</span>
                        </div>
                        <div className={`flex items-center gap-2 ${aiStepIndex >= 3 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>3. Multi-inbox rotation & spintax generated (24 mailboxes ready)</span>
                        </div>
                        <div className={`flex items-center gap-2 ${aiStepIndex >= 4 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>4. Sub-400ms Voice AI SDR & Deals CRM pipeline linked</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* =========================================================================
                1. LEAD DATABASE PREVIEW
                ========================================================================= */}
            {activeTab === 'lead-database' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold font-sans tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        LIVE LEAD DIRECTORY (480M+ B2B POOL)
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      8-Dimension B2B Prospect Search
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => showToast('Custom lead dialog ready.')} className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom Lead</span>
                    </button>
                    <button onClick={() => showToast('Exporting 8 records to CSV...')} className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button onClick={handlePushCampaign} disabled={selectedIds.length === 0} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${selectedIds.length > 0 ? 'bg-blue-600 text-white' : 'bg-blue-500/30 text-white/70'}`}>
                      <Send className="w-3.5 h-3.5" />
                      <span>Push to Campaign ({selectedIds.length})</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search by name, job title, company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="sm:col-span-3">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="all" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">All Verification Statuses</option>
                      <option value="verified" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">Verified Only (99.8%)</option>
                      <option value="catchall" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">Catch-All Safe</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="all" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">All Global Locations</option>
                      <option value="us" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">United States (US)</option>
                      <option value="eu" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">Europe & UK</option>
                      <option value="ca" className="bg-white dark:bg-[#131d35] text-slate-900 dark:text-slate-100">Canada (CA)</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#0b101f]">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0a0e1a] text-[11px] font-sans font-bold text-slate-500 dark:text-slate-400">
                          <th className="py-3 px-4 w-10">
                            <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredLeads.length} onChange={handleSelectAll} className="rounded border-slate-300 dark:border-[#2A2A2A] dark:bg-[#181818] text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          </th>
                          <th className="py-3 px-3">CONTACT NAME</th>
                          <th className="py-3 px-3">JOB TITLE</th>
                          <th className="py-3 px-3">COMPANY</th>
                          <th className="py-3 px-3">VERIFIED EMAIL</th>
                          <th className="py-3 px-3">LOCATION</th>
                          <th className="py-3 px-3 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} onClick={() => setActiveDetailLead(lead)} className="hover:bg-slate-50 dark:hover:bg-[#131d35]/60 cursor-pointer transition-colors">
                            <td className="py-3.5 px-4" onClick={(e) => toggleSelectRow(lead.id, e)}>
                              <input type="checkbox" checked={selectedIds.includes(lead.id)} onChange={() => {}} className="rounded border-slate-300 dark:border-[#2A2A2A] dark:bg-[#181818] text-blue-600 focus:ring-blue-500 cursor-pointer" />
                            </td>
                            <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-slate-100">{lead.name}</td>
                            <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">{lead.title}</td>
                            <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{lead.company}</td>
                            <td className="py-3.5 px-3 font-sans text-[11px] text-slate-600 dark:text-slate-400">{lead.email}</td>
                            <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">{lead.location}</td>
                            <td className="py-3.5 px-3 text-right">
                              <button onClick={(e) => handleSaveLead(lead.id, e)} className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-300 text-xs font-bold font-sans transition-colors cursor-pointer border border-blue-200/60 dark:border-blue-800/80">
                                {savedIds.includes(lead.id) ? 'Saved' : 'Save Lead'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                2. COLD EMAIL OUTREACH
                ========================================================================= */}
            {activeTab === 'email-outreach' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] space-y-2">
                    <span className="text-[10px] font-sans text-slate-400 font-bold uppercase">ACTIVE ROTATION</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">24 Connected Inboxes</h4>
                    <p className="text-xs text-emerald-600">● 100% Healthy Warmup</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] space-y-2">
                    <span className="text-[10px] font-sans text-slate-400 font-bold uppercase">DELIVERY RATE</span>
                    <h4 className="font-extrabold text-blue-600 text-lg">99.4% Inboxed</h4>
                    <p className="text-xs text-slate-500">0 Spam Placement</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] space-y-2">
                    <span className="text-[10px] font-sans text-slate-400 font-bold uppercase">AVERAGE REPLY RATE</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">14.2% Positive</h4>
                    <p className="text-xs text-slate-500">38 Demo Meetings Booked</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-bold text-slate-400 uppercase">SUBJECT</label>
                      <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#181818] border text-xs" />
                    </div>
                    <textarea rows={6} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border text-xs font-sans" />
                    <div className="flex items-center gap-2">
                      <button onClick={handleStartCampaignSimulation} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5" />
                        <span>Start Campaign</span>
                      </button>
                      <button onClick={() => setPreviewModalOpen(true)} className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#181818] text-xs font-bold">
                        Preview Email
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b">
                      <span className="text-[10px] font-sans font-bold text-slate-400">LIVE INBOX FEED</span>
                      <span className="text-xs font-sans font-bold text-emerald-600">● Live</span>
                    </div>
                    <div className="space-y-2">
                      {feedEvents.slice(0, 5).map((f) => (
                        <div key={f.id} onClick={() => setActiveFeedDetail(f)} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs">
                          <strong className="block">{f.title}</strong>
                          <span className="text-slate-500 text-[11px]">{f.subtitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                3. LINKEDIN SAFE AUTOMATION
                ========================================================================= */}
            {activeTab === 'linkedin-safe' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <UserPlus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          SAFE INVITES
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                        0% Ban Risk
                      </span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        100 / wk
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Residential Cloud IPs
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <UserCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          ACCEPTANCE RATE
                        </span>
                      </div>
                      <svg className="w-16 h-4 text-emerald-500/80" viewBox="0 0 100 30" fill="none">
                        <path d="M0 24 Q 25 15, 50 18 T 75 8 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xl tracking-tight font-sans">
                        38.4%
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Industry-leading conversion
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          DM REPLY RATE
                        </span>
                      </div>
                      <svg className="w-16 h-4 text-blue-500/80" viewBox="0 0 100 30" fill="none">
                        <path d="M0 20 Q 25 22, 50 12 T 75 14 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        22.8%
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Direct to CRM conversation sync
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]/80">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 items-center">
                    {LINKEDIN_PIPELINE_STAGES.map((stageName, idx) => {
                      const isActive = activePipelineStage === stageName;
                      return (
                        <button
                          key={stageName}
                          onClick={() => {
                            setActivePipelineStage(stageName);
                            showToast(`Stage 0${idx + 1}: ${stageName}`);
                          }}
                          className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm font-bold'
                              : 'bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-emerald-500'}`} />
                          <span className="truncate">{stageName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                          SJ
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              Sarah Jenkins
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-[#1A1A1A]/70 border border-blue-200/60 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-sans font-bold">
                              96% Match
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                            VP of Growth • <strong className="text-slate-700 dark:text-slate-300">CloudScale AI</strong> (500+ employees • US / Remote)
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setLinkedinProfileModalOpen(true)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <span>View Profile</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] text-xs">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase block">
                        RECENT ACTIVITY (2D AGO)
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 pt-0.5 italic text-[11px]">
                        "Scaling our outbound sales infrastructure without webhook drift has been our top priority this quarter..."
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                          PERSONALIZED LINKEDIN MESSAGE
                        </label>
                        <button
                          onClick={handleLinkedinAiPersonalize}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-[#1A1A1A] border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span>Personalize with AI</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]">
                        <textarea
                          rows={3}
                          value={linkedinMessage}
                          onChange={(e) => setLinkedinMessage(e.target.value)}
                          className="w-full bg-transparent text-xs font-sans text-slate-800 dark:text-slate-200 outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {['{{first_name}}', '{{company}}', '{{role}}', '{{recent_post}}'].map((item) => (
                            <button
                              key={item}
                              onClick={() => insertLinkedinVariable(item)}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] hover:bg-blue-50 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[10px] font-sans cursor-pointer"
                            >
                              {item}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setLinkedinPreviewModalOpen(true)}
                            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={handleLinkedinConnect}
                            disabled={linkedinConnectState === 'sent'}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer ${
                              linkedinConnectState === 'sent'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {linkedinConnectState === 'sent' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Send className="w-3.5 h-3.5" />}
                            <span>{linkedinConnectState === 'sent' ? 'Request Sent' : 'Send Request'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">LIVE LINKEDIN ACTIVITY</span>
                      <span className="text-xs font-sans font-bold text-emerald-600">● Live</span>
                    </div>
                    <div className="space-y-2">
                      {linkedinFeedEvents.slice(0, 6).map((item) => (
                        <div key={item.id} className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs flex items-center justify-between gap-2">
                          <div>
                            <strong className="block text-slate-900 dark:text-white font-bold">{item.title}</strong>
                            <span className="text-slate-500 text-[11px]">{item.subtitle}</span>
                          </div>
                          <span className="text-[10px] font-sans text-slate-400 shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* =========================================================================
                4. VOICE AI SDR
                ========================================================================= */}
            {activeTab === 'voice-ai-sdr' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans font-bold text-emerald-400 uppercase tracking-wider">
                          LIVE INBOUND QUALIFICATION CALL
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-sans">
                          WebRTC Audio
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white">
                        Sarah Jenkins • <span className="text-slate-400 font-normal">VP of Growth @ CloudScale AI</span>
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-right">
                      <span className="text-[10px] font-sans text-slate-400 block uppercase">Turn Latency</span>
                      <strong className="text-xs font-sans text-blue-400">364ms Ultra-Fast</strong>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-right">
                      <span className="text-[10px] font-sans text-slate-400 block uppercase">Duration</span>
                      <strong className="text-xs font-sans text-white">{formatTime(voiceCallSeconds)}</strong>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                          <Radio className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-[10px] font-sans text-slate-400 uppercase font-bold block">Status</span>
                          <span className={`text-xs font-bold font-sans ${
                            activeSpeaker === 'ai' 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : activeSpeaker === 'prospect'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-blue-600 dark:text-blue-400'
                          }`}>
                            {activeSpeaker === 'ai' && '● Voice AI Speaking...'}
                            {activeSpeaker === 'prospect' && '● Prospect Speaking (Sarah)...'}
                            {activeSpeaker === 'booking' && '● AI Booking Calendar Slot...'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 h-6">
                        {[18, 28, 14, 32, 22, 36, 16, 26, 12].map((height, i) => (
                          <span
                            key={i}
                            style={{ height: `${height}px` }}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              activeSpeaker === 'ai' 
                                ? 'bg-blue-600 dark:bg-blue-400 animate-pulse' 
                                : 'bg-emerald-500 dark:bg-emerald-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1 no-scrollbar">
                      {VOICE_CALL_TRANSCRIPT.map((msg) => {
                        const isAi = msg.speaker === 'ai';
                        return (
                          <div
                            key={msg.id}
                            className={`flex gap-3 text-xs ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                              isAi ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                            }`}>
                              {isAi ? 'AI' : 'SJ'}
                            </div>

                            <div className={`p-3 rounded-2xl max-w-[85%] space-y-1 ${
                              isAi 
                                ? 'bg-blue-50/70 dark:bg-white/[0.04] border border-blue-100 dark:border-blue-900/60 rounded-tl-xs' 
                                : 'bg-slate-100 dark:bg-[#181818]/80 border border-slate-200/70 dark:border-[#2A2A2A] rounded-tr-xs text-right'
                            }`}>
                              <div className={`flex items-center gap-2 text-[10px] font-sans text-slate-500 ${isAi ? 'justify-start' : 'justify-end'}`}>
                                <strong>{msg.speakerName}</strong>
                                <span>{msg.time}</span>
                              </div>
                              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-left">
                                "{msg.text}"
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#2A2A2A]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setVoiceMuted(!voiceMuted);
                            showToast(voiceMuted ? 'Microphone unmuted' : 'Microphone muted');
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                            voiceMuted 
                              ? 'bg-rose-50 border-rose-200 text-rose-600' 
                              : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {voiceMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          <span className="hidden sm:inline">{voiceMuted ? 'Muted' : 'Mute'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setVoiceCallStatus(voiceCallStatus === 'active' ? 'paused' : 'active');
                            showToast(voiceCallStatus === 'active' ? 'Call simulation paused' : 'Call simulation resumed');
                          }}
                          className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                        >
                          {voiceCallStatus === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{voiceCallStatus === 'active' ? 'Pause' : 'Resume'}</span>
                        </button>

                        <button
                          onClick={() => showToast('Transferred live call to Account Executive (0ms drop)')}
                          className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                        >
                          <PhoneForwarded className="w-3.5 h-3.5 text-blue-600" />
                          <span className="hidden sm:inline">Transfer</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setVoiceCallStatus(voiceCallStatus === 'ended' ? 'active' : 'ended');
                          showToast(voiceCallStatus === 'ended' ? 'Started new inbound qualification session' : 'Call completed: Meeting logged in Deals CRM');
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer ${
                          voiceCallStatus === 'ended'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                        }`}
                      >
                        {voiceCallStatus === 'ended' ? <Phone className="w-3.5 h-3.5" /> : <PhoneOff className="w-3.5 h-3.5" />}
                        <span>{voiceCallStatus === 'ended' ? 'Restart Call' : 'End Call'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
                        <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                          REAL-TIME QUALIFICATION
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                          ✓ Qualified ICP
                        </span>
                      </div>

                      <div className="space-y-2 text-xs font-sans">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] flex items-center justify-between">
                          <span className="text-slate-500">Intent Score:</span>
                          <strong className="text-emerald-600 dark:text-emerald-400 font-bold">98.4% (High Intent)</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] flex items-center justify-between">
                          <span className="text-slate-500">Team Size:</span>
                          <strong className="text-slate-800 dark:text-slate-200">12 Outbound SDRs</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] flex items-center justify-between">
                          <span className="text-slate-500">Replacing:</span>
                          <strong className="text-slate-800 dark:text-slate-200">Apollo + Smartlead</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/70 dark:border-[#2A2A2A] flex items-center justify-between">
                          <span className="text-slate-500">Budget Approved:</span>
                          <strong className="text-blue-600 dark:text-blue-400">$45,000 ARR</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-900 dark:to-slate-800 border border-blue-200/70 dark:border-blue-900/60 shadow-2xs space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <h5 className="font-extrabold text-xs text-slate-900 dark:text-white">
                          Demo Booked & Synced
                        </h5>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-[#141414] border border-blue-100 dark:border-[#2A2A2A] text-xs space-y-1 font-sans">
                        <strong className="text-slate-900 dark:text-white block font-sans font-bold">
                          Enterprise Architecture Walkthrough
                        </strong>
                        <p className="text-blue-600 dark:text-blue-400 font-bold">
                          Thursday, Oct 24 • 2:00 PM PST
                        </p>
                        <span className="text-slate-400 block text-[11px]">
                          Attendees: sarah@cloudscale.ai + Founder
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                5. FREELANCE AI
                ========================================================================= */}
            {activeTab === 'freelance-ai' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          BID SPEED ADVANTAGE
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                        Top 1% First Bid
                      </span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        42s Avg Response
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Autonomous vector matching on Upwork & Contra
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          AI RELEVANCE FILTER
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-[#1A1A1A]/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-sans font-bold">
                        High Match Only
                      </span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xl tracking-tight font-sans">
                        99.2% Accuracy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Filters out low-budget & spam clients
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          INTERVIEW CONVERSION
                        </span>
                      </div>
                      <svg className="w-16 h-4 text-blue-500/80" viewBox="0 0 100 30" fill="none">
                        <path d="M0 22 Q 25 24, 50 14 T 75 12 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        74.8% Win Rate
                      </h4>
                      <p className="text-xs text-slate-500 font-medium pt-0.5">
                        Dynamic portfolio proof injection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">LIVE OPPORTUNITY SCANNER</span>
                      <span className="text-xs font-sans font-bold text-emerald-600">● Scanning</span>
                    </div>

                    <div className="space-y-2.5">
                      {freelanceJobs.map((job) => {
                        const isSelected = selectedJob.id === job.id;
                        return (
                          <div
                            key={job.id}
                            onClick={() => handleSelectJob(job)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-2 group ${
                              isSelected
                                ? 'bg-blue-50/70 dark:bg-white/[0.04] border-blue-500 shadow-xs'
                                : 'bg-slate-50/60 dark:bg-[#181818]/40 border-slate-200/80 dark:border-[#2A2A2A]/80 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span className="inline-block px-2 py-0.5 rounded bg-slate-200/80 dark:bg-[#181818] text-[10px] font-sans font-bold text-slate-700 dark:text-slate-300 mb-1">
                                  {job.platform}
                                </span>
                                <h5 className={`font-bold text-xs line-clamp-1 ${
                                  isSelected ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-900 dark:text-white'
                                }`}>
                                  {job.title}
                                </h5>
                              </div>
                              <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-600 text-[10px] font-sans font-bold shrink-0">
                                {job.matchScore}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-sans text-slate-500 pt-0.5">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{job.budget}</span>
                              <span className="text-slate-400">{job.detectedTime}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-4">
                    <div className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">TARGET OPPORTUNITY</span>
                        <span className="text-xs font-sans font-bold text-slate-700 dark:text-slate-300">{selectedJob.clientRating}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{selectedJob.title}</h4>
                      <p className="text-xs text-slate-500">{selectedJob.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-sans font-bold text-slate-400 uppercase">AUTONOMOUSLY GENERATED PROPOSAL</label>
                        <button onClick={handleRegenerateProposal} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/70 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span>Regenerate</span>
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]">
                        <textarea rows={6} value={proposalText} onChange={(e) => setProposalText(e.target.value)} className="w-full bg-transparent text-xs font-sans text-slate-800 dark:text-slate-200 outline-none resize-none leading-relaxed" />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <span className="text-xs font-sans text-slate-500">Budget: <strong className="text-slate-900 dark:text-white">{selectedJob.budget}</strong></span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setProposalPreviewModalOpen(true)} className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#181818] border text-xs font-bold">
                          Review Proposal
                        </button>
                        <button onClick={handleSubmitProposal} disabled={proposalSubmitted || isSubmittingProposal} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs">
                          {proposalSubmitted ? 'Proposal Submitted ✓' : isSubmittingProposal ? 'Submitting...' : 'Submit Proposal'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                6. UNIFIED DEALS CRM (Interactive 5-Stage Sales Pipeline Demo)
                ========================================================================= */}
            {activeTab === 'unified-crm' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* 6.1 Top Summary Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Summary Metric 1 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#131d35] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <DollarSign className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          TOTAL PIPELINE VALUE
                        </span>
                      </div>
                      
                      {/* Live Upward Sparkline */}
                      <svg className="w-16 h-4 text-emerald-500/80" viewBox="0 0 100 30" fill="none">
                        <path d="M0 24 Q 25 15, 50 18 T 75 8 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        ${totalPipelineValue.toLocaleString()}
                      </h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
                        +$127,000 Won this quarter
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric 2 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#131d35] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          ACTIVE PIPELINE DEALS
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-[#1A1A1A]/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-sans font-bold">
                        Avg: 14 Days
                      </span>
                    </div>

                    <div className="pt-1">
                      <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-xl tracking-tight font-sans">
                        {activeDealsCount} Active Deals
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                        Connected to PostgreSQL core
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric 3 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#131d35] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider">
                          PIPELINE WIN RATE
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-bold">
                        +6.2% vs SDR Avg
                      </span>
                    </div>

                    <div className="pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight font-sans">
                        34.6% Win Rate
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                        Multi-channel orchestration boost
                      </p>
                    </div>
                  </div>

                </div>

                {/* 6.2 5-Stage Interactive Kanban Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/70 dark:divide-white/[0.07] pt-2">
                  {CRM_STAGES.map((stageObj, colIdx) => {
                    const stageDeals = deals.filter(d => d.stage === stageObj.id);
                    const stageSum = stageDeals.reduce((acc, d) => acc + d.value, 0);

                    return (
                      <div
                        key={stageObj.id}
                        className={`space-y-3 flex flex-col ${
                          colIdx === 0 ? 'md:pr-3.5' : colIdx === 4 ? 'md:pl-3.5' : 'md:px-3.5'
                        }`}
                      >
                        {/* Stage Column Header */}
                        <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-[#202020]">
                          <div className="flex items-center justify-between">
                            <span className="text-[10.5px] font-sans font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              0{colIdx + 1} • {stageObj.label}
                            </span>
                            <span className="text-[10px] font-sans font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300">
                              {stageDeals.length}
                            </span>
                          </div>
                          <div className="text-xs font-sans font-bold text-slate-900 dark:text-white">
                            ${stageSum.toLocaleString()}
                          </div>
                        </div>

                        {/* Column Deal Cards */}
                        <div className="space-y-2.5">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              onClick={() => setActiveDealModal(deal)}
                              className="p-3.5 rounded-2xl bg-white dark:bg-[#131d35] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-400/50 transition-all cursor-pointer space-y-2.5 group"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="min-w-0">
                                  <strong className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block truncate">
                                    {deal.company}
                                  </strong>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                                    {deal.name}
                                  </span>
                                </div>

                                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-sans font-bold shrink-0 ${
                                  deal.stage === 'closed-won'
                                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80'
                                    : 'bg-blue-50 dark:bg-[#1A1A1A]/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/80'
                                }`}>
                                  {deal.statusBadge}
                                </span>
                              </div>

                              <div className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.03] text-[10px] font-sans text-slate-500 dark:text-slate-400 truncate">
                                ⚡ {deal.lastActivity}
                              </div>

                              <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-[#202020] text-xs font-sans">
                                <span className="font-extrabold text-slate-900 dark:text-white">
                                  ${deal.value.toLocaleString()}
                                </span>

                                {deal.stage !== 'closed-won' && (
                                  <button
                                    onClick={(e) => handleAdvanceDeal(deal.id, e)}
                                    className="px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Advance to Next Stage"
                                  >
                                    <span>Advance</span>
                                    <MoveRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}

                          {stageDeals.length === 0 && (
                            <div className="py-4 text-center text-[10px] text-slate-400 font-sans border border-dashed border-slate-200/80 dark:border-[#202020] rounded-2xl">
                              No deals
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 6.3 Telemetry Strip */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/80 dark:border-[#2A2A2A]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>PostgreSQL Real-Time Replication: <strong>0ms sync lag across all pipeline stages</strong></span>
                  </div>
                  <button
                    onClick={() => showToast('Dispatched HubSpot & Salesforce bidirectional webhook sync!')}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Sync with External CRM ›
                  </button>
                </div>

              </div>
            )}

            {/* =========================================================================
                DEALS CRM DETAIL MODAL
                ========================================================================= */}
            {activeDealModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
                <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
                  
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                        {activeDealModal.avatar}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {activeDealModal.company}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {activeDealModal.name} • {activeDealModal.role}
                        </p>
                      </div>
                    </div>

                    <button onClick={() => setActiveDealModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                      <span className="text-slate-500">Contract Value:</span>
                      <strong className="text-slate-900 dark:text-white text-sm font-bold">
                        ${activeDealModal.value.toLocaleString()} ARR
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                      <span className="text-slate-500">Current Stage:</span>
                      <strong className="text-blue-600 dark:text-blue-400 capitalize">
                        {CRM_STAGES.find(s => s.id === activeDealModal.stage)?.label}
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                      <span className="text-slate-400 block text-[10px]">Next Scheduled Action:</span>
                      <p className="text-slate-800 dark:text-slate-200 font-sans font-medium">
                        {activeDealModal.nextAction}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    {activeDealModal.stage !== 'closed-won' && (
                      <button
                        onClick={() => handleAdvanceDeal(activeDealModal.id)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Advance to Next Stage</span>
                        <MoveRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => setActiveDealModal(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* =========================================================================
                7. FLOW BUILDER (Visual Omnichannel Workflow Canvas)
                ========================================================================= */}
            {activeTab === 'workflow-automation' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* 7.1 Top Canvas Toolbar */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white font-sans">
                        AUTONOMOUS REVENUE CADENCE #01
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A]/70 border border-blue-200/60 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-sans font-bold">
                        PostgreSQL Webhooks
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Multi-channel orchestration across Cold Email, LinkedIn Safe API, Voice AI & CRM.
                    </p>
                  </div>

                  {/* Toolbar Actions */}
                  <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
                    
                    {/* Run Test */}
                    <button
                      onClick={handleRunFlowTest}
                      disabled={isTestingFlow}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                    >
                      {isTestingFlow ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating Flow...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Run Test</span>
                        </>
                      )}
                    </button>

                    {/* Pause / Resume */}
                    <button
                      onClick={() => {
                        setFlowStatus(flowStatus === 'active' ? 'paused' : 'active');
                        showToast(flowStatus === 'active' ? 'Workflow cadence paused' : 'Workflow cadence active');
                      }}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {flowStatus === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{flowStatus === 'active' ? 'Pause' : 'Resume'}</span>
                    </button>

                    {/* Add Step */}
                    <button
                      onClick={() => showToast('Step drawer opened: Select from 30+ integrations')}
                      className="px-3 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Step</span>
                    </button>

                  </div>

                </div>

                {/* 7.2 Top Mini Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">FLOW THROUGHPUT</span>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-sm font-extrabold text-slate-900 dark:text-white font-sans">1,420 Executions/Day</strong>
                      <span className="text-[10px] font-sans text-emerald-600 font-bold">100% Uptime</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">AVG DISPATCH SPEED</span>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-sans">48s from Lead to Touch</strong>
                      <span className="text-[10px] font-sans text-slate-500">Real-Time Routing</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#181818]/40 border border-slate-200/80 dark:border-[#2A2A2A]/80 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">CONVERSION LIFT</span>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">+42.8% Reply Lift</strong>
                      <span className="text-[10px] font-sans text-emerald-600 font-bold">vs Single Channel</span>
                    </div>
                  </div>
                </div>

                {/* 7.3 Visual Node Workflow Canvas */}
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
                  
                  {/* Subtle Grid Canvas Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                  {/* Flow Steps: Linear Stage 1 -> 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                    {flowNodes.slice(0, 4).map((node, idx) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setActiveFlowNodeModal(node)}
                          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/80 transition-all cursor-pointer space-y-2.5 relative group shadow-md hover:scale-[1.02]"
                        >
                          {/* Connection Handle Right (Desktop) */}
                          <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-blue-500 z-20" />

                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                              STEP 0{idx + 1} • {node.type}
                            </span>
                            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-blue-400">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h5 className="font-extrabold text-xs text-white group-hover:text-blue-400 transition-colors">
                              {node.label}
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                              {node.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans">
                            <span className="text-emerald-400 font-bold">{node.status}</span>
                            <span className="text-slate-500">Inspect ›</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Branching Divider Strip */}
                  <div className="flex items-center justify-center gap-3 relative z-10 py-1">
                    <div className="h-px bg-slate-800 flex-1" />
                    <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-[10px] font-sans font-bold flex items-center gap-1.5 shadow-sm">
                      <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                      <span>INTENT & RESPONSE ROUTER (SPLIT LOGIC)</span>
                    </div>
                    <div className="h-px bg-slate-800 flex-1" />
                  </div>

                  {/* Flow Steps: Branch A & Branch B -> Convergence */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10 items-stretch">
                    
                    {/* Branch A Node */}
                    {(() => {
                      const nodeA = flowNodes[5];
                      const IconA = nodeA.icon;
                      return (
                        <div
                          onClick={() => setActiveFlowNodeModal(nodeA)}
                          className="p-4 rounded-2xl bg-slate-900/90 border border-blue-900/60 hover:border-blue-500 transition-all cursor-pointer space-y-2.5 group shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-bold text-blue-400 uppercase tracking-wider">
                              BRANCH A (IF NO REPLY IN 48H)
                            </span>
                            <div className="w-6 h-6 rounded-md bg-blue-950 flex items-center justify-center text-blue-400">
                              <IconA className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h5 className="font-extrabold text-xs text-white group-hover:text-blue-400 transition-colors">
                              {nodeA.label}
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                              {nodeA.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans">
                            <span className="text-blue-400 font-bold">{nodeA.status}</span>
                            <span className="text-slate-500">Inspect ›</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Branch B Node */}
                    {(() => {
                      const nodeB = flowNodes[6];
                      const IconB = nodeB.icon;
                      return (
                        <div
                          onClick={() => setActiveFlowNodeModal(nodeB)}
                          className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-500 transition-all cursor-pointer space-y-2.5 group shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-bold text-emerald-400 uppercase tracking-wider">
                              BRANCH B (POSITIVE REPLY / OPEN)
                            </span>
                            <div className="w-6 h-6 rounded-md bg-emerald-950 flex items-center justify-center text-emerald-400">
                              <IconB className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h5 className="font-extrabold text-xs text-white group-hover:text-emerald-400 transition-colors">
                              {nodeB.label}
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                              {nodeB.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans">
                            <span className="text-emerald-400 font-bold">{nodeB.status}</span>
                            <span className="text-slate-500">Inspect ›</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Convergence Node */}
                    {(() => {
                      const nodeC = flowNodes[7];
                      const IconC = nodeC.icon;
                      return (
                        <div
                          onClick={() => setActiveFlowNodeModal(nodeC)}
                          className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer space-y-2.5 group shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans font-bold text-emerald-400 uppercase tracking-wider">
                              CONVERGENCE (FINAL SYNC)
                            </span>
                            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-emerald-400">
                              <IconC className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h5 className="font-extrabold text-xs text-white group-hover:text-emerald-400 transition-colors">
                              {nodeC.label}
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-tight pt-0.5">
                              {nodeC.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-sans">
                            <span className="text-emerald-400 font-bold">{nodeC.status}</span>
                            <span className="text-slate-500">Inspect ›</span>
                          </div>
                        </div>
                      );
                    })()}

                  </div>

                </div>

              </div>
            )}

            {/* =========================================================================
                FLOW NODE CONFIGURATION & TELEMETRY MODAL
                ========================================================================= */}
            {activeFlowNodeModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
                <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
                  
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                        NODE INSPECTOR • {activeFlowNodeModal.type}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {activeFlowNodeModal.label}
                      </h4>
                    </div>

                    <button onClick={() => setActiveFlowNodeModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60">
                      <span className="text-slate-400 block text-[10px]">Execution Rule</span>
                      <p className="text-slate-800 dark:text-slate-200 font-sans pt-0.5">
                        {activeFlowNodeModal.configSummary}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                      <span className="text-slate-500">Live Telemetry:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{activeFlowNodeModal.telemetry}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                      <span className="text-slate-500">Status:</span>
                      <strong className="text-blue-600 dark:text-blue-400">{activeFlowNodeModal.status}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        showToast(`Executed test packet on ${activeFlowNodeModal.label}`);
                        setActiveFlowNodeModal(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Test Node Now</span>
                    </button>

                    <button
                      onClick={() => setActiveFlowNodeModal(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </Card3DTilt>

    </section>
  );
};
