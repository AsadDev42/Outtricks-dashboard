import { SEOHead } from '../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Search, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Key, 
  Zap, 
  Building2, 
  Sliders, 
  CheckCircle2,
  HelpCircle,
  Clock,
  DollarSign,
  Workflow,
  Database,
  PackageCheck,
  Award
} from 'lucide-react';
import { Card3DTilt } from '../components/3d/Card3DTilt';

type ModuleId = 'lead-finder' | 'cold-email' | 'voice-ai' | 'linkedin' | 'freelance-ai' | 'bundles';

interface TierPackage {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  volume: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

interface CustomPlanInfo {
  name: string;
  volume: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

interface ModulePricingData {
  id: ModuleId;
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  packages: [TierPackage, TierPackage, TierPackage]; // Exactly 3 packages per module
  customPlan: CustomPlanInfo;
  tableFeatures: { name: string; starter: string; pro: string; scale: string; custom: string }[];
}

const MODULES_DATA: ModulePricingData[] = [
  {
    id: 'lead-finder',
    name: 'Lead Finder & 8D Pool',
    label: 'Lead Finder',
    icon: Search,
    tagline: '480M+ verified B2B prospects, multiAttribute search Contact Search & hiring intent signals.',
    packages: [
      {
        name: 'STARTER',
        monthlyPrice: 39,
        annualPrice: 31,
        volume: '2,500 Credits / mo',
        features: [
          '480M+ B2B search pool',
          '99.4% verified work emails',
          'Standard multiAttribute cascade',
          'CSV & basic filters',
          'Standard email support'
        ],
        ctaText: 'Get Starter',
        ctaHref: '/signup'
      },
      {
        name: 'PRO',
        monthlyPrice: 79,
        annualPrice: 63,
        popular: true,
        badge: 'MOST POPULAR',
        volume: '10,000 Credits / mo',
        features: [
          '10,000 verified credits / mo',
          'Direct mobile phone Contact Search',
          'Real-time hiring & intent signals',
          'Includes Deals CRM (Deal pipeline & tracking)',
          'Catch-all server handshake'
        ],
        ctaText: 'Start Pro Free Trial',
        ctaHref: '/signup'
      },
      {
        name: 'SCALE',
        monthlyPrice: 149,
        annualPrice: 119,
        volume: '25,000 Credits / mo',
        features: [
          '25,000 verified credits / mo',
          'multiDimensional query filters',
          'Includes Deals CRM & Flow Builder',
          'Advanced multi-channel automation & webhooks',
          'Dedicated account manager'
        ],
        ctaText: 'Scale Prospecting',
        ctaHref: '/signup'
      }
    ],
    customPlan: {
      name: 'ENTERPRISE CUSTOM',
      volume: '50,000+ to 1M+ Credits',
      features: [
        'Custom credit volume allocation',
        'Dedicated scraping & Contact Search pipeline',
        'Includes Enterprise CRM & Flow Engine',
        'Custom SLA & 24/7 dedicated support'
      ],
      ctaText: 'Talk to Sales',
      ctaHref: '/book-a-demo'
    },
    tableFeatures: [
      { name: 'Monthly Credits', starter: '2,500', pro: '10,000', scale: '25,000', custom: 'Custom (1M+)' },
      { name: 'Global B2B Database Search', starter: 'Yes (480M+)', pro: 'Yes (480M+)', scale: 'Yes (480M+)', custom: 'Full API Access' },
      { name: 'Direct Mobile Numbers', starter: '4 credits/no', pro: 'Included (15-Source)', scale: 'Included (15-Source)', custom: 'Dedicated Providers' },
      { name: 'Deals CRM Integration', starter: 'Export Only', pro: 'Included Natively', scale: 'Included Natively', custom: 'Dedicated Replica' },
      { name: 'Flow Builder Automation', starter: 'No', pro: 'Basic Triggers', scale: 'Included Full Engine', custom: 'Custom Code Nodes' }
    ]
  },
  {
    id: 'cold-email',
    name: 'Multi-Inbox Cold Email',
    label: 'Cold Email',
    icon: Mail,
    tagline: 'Scale deliverability with multi-inbox rotation, peer-to-peer warmup, and AI spintax.',
    packages: [
      {
        name: 'STARTER',
        monthlyPrice: 20,
        annualPrice: 16,
        volume: '2,000 Emails / mo',
        features: [
          '2 connected inboxes (Google/MS)',
          '2,000 emails dispatched / mo',
          'Free automated peer warmup',
          'Dynamic spintax copy tags',
          'Unified reply inbox'
        ],
        ctaText: 'Start Emailing',
        ctaHref: '/signup'
      },
      {
        name: 'PRO',
        monthlyPrice: 49,
        annualPrice: 39,
        popular: true,
        badge: 'MOST POPULAR',
        volume: '10,000 Emails / mo',
        features: [
          '10 connected inboxes',
          '10,000 emails dispatched / mo',
          'Smart multi-inbox load rotation',
          'Includes Deals CRM (Auto-advances on reply)',
          'Custom tracking domains & AI sentiment'
        ],
        ctaText: 'Start Pro Trial',
        ctaHref: '/signup'
      },
      {
        name: 'SCALE',
        monthlyPrice: 99,
        annualPrice: 79,
        volume: '35,000 Emails / mo',
        features: [
          'Unlimited connected inboxes',
          '35,000 emails dispatched / mo',
          'Includes Deals CRM & Flow Builder',
          'Multi-channel behavioral branching',
          'Priority sending queues & ramp-up pacing'
        ],
        ctaText: 'Scale Deliverability',
        ctaHref: '/signup'
      }
    ],
    customPlan: {
      name: 'HIGH-VOLUME ENTERPRISE',
      volume: '100,000+ Emails / mo',
      features: [
        'Custom enterprise sending volume',
        'Dedicated private IP ranges & subnets',
        'Includes Full Deals CRM & Flow Engine',
        'Dedicated deliverability engineer'
      ],
      ctaText: 'Contact Deliverability Team',
      ctaHref: '/book-a-demo'
    },
    tableFeatures: [
      { name: 'Monthly Sending Volume', starter: '2,000', pro: '10,000', scale: '35,000', custom: '100k - 1M+' },
      { name: 'Connected Inboxes', starter: '2 Inboxes', pro: '10 Inboxes', scale: 'Unlimited', custom: 'Unlimited' },
      { name: 'Peer Warmup & Spintax', starter: 'Included', pro: 'Included', scale: 'Priority Warmup', custom: 'Dedicated Pool' },
      { name: 'Deals CRM Integration', starter: 'Export Only', pro: 'Included Natively', scale: 'Included Natively', custom: 'Dedicated Sync' },
      { name: 'Flow Builder Automation', starter: 'No', pro: 'Linear Only', scale: 'Included Full Engine', custom: 'Custom Webhooks' }
    ]
  },
  {
    id: 'voice-ai',
    name: 'Sub-400ms Voice AI SDR',
    label: 'Voice AI SDR',
    icon: PhoneCall,
    tagline: 'Autonomous AI phone agents that handle conversations, qualify leads, and book meetings in sub-400ms.',
    packages: [
      {
        name: 'STARTER',
        monthlyPrice: 60,
        annualPrice: 48,
        volume: '150 Call Minutes / mo',
        features: [
          '150 talk minutes included',
          '1 AI voice personality',
          'Live qualification script engine',
          'Calendar link booking',
          'Call transcripts & logs'
        ],
        ctaText: 'Launch Voice AI',
        ctaHref: '/signup'
      },
      {
        name: 'PRO',
        monthlyPrice: 129,
        annualPrice: 103,
        popular: true,
        badge: 'MOST POPULAR',
        volume: '500 Call Minutes / mo',
        features: [
          '500 talk minutes included',
          '3 custom voice personas',
          'Dynamic objection handling',
          'Includes Deals CRM (Auto-creates booked deals)',
          'Inbound & outbound qualification'
        ],
        ctaText: 'Start Voice Pro',
        ctaHref: '/signup'
      },
      {
        name: 'SCALE',
        monthlyPrice: 249,
        annualPrice: 199,
        volume: '1,500 Call Minutes / mo',
        features: [
          '1,500 talk minutes included',
          'High-concurrency calling campaigns',
          'Includes Deals CRM & Flow Builder',
          'Automated post-call workflow dispatch',
          'Sub-400ms WebRTC low-latency SLA'
        ],
        ctaText: 'Scale Voice SDR',
        ctaHref: '/signup'
      }
    ],
    customPlan: {
      name: 'VOICE AI ENTERPRISE',
      volume: '3,000+ Call Minutes',
      features: [
        'High-volume concurrent channels',
        'Custom voice cloning & studio audio',
        'Dedicated SIP trunks & carrier routing',
        'Sub-300ms enterprise SLA'
      ],
      ctaText: 'Talk to Sales',
      ctaHref: '/book-a-demo'
    },
    tableFeatures: [
      { name: 'Monthly Talk Minutes', starter: '150 mins', pro: '500 mins', scale: '1,500 mins', custom: '3,000+ mins' },
      { name: 'AI Voice Personas', starter: '1 Persona', pro: '3 Personas', scale: 'Unlimited', custom: 'Custom Voice Clone' },
      { name: 'Objection Handling', starter: 'Basic Tree', pro: 'Dynamic GenAI', scale: 'Multi-turn Neural', custom: 'Domain Fine-Tuned' },
      { name: 'Deals CRM Integration', starter: 'Transcripts Only', pro: 'Included Natively', scale: 'Included Natively', custom: 'Dedicated Sync' },
      { name: 'Flow Builder Automation', starter: 'No', pro: 'Basic Triggers', scale: 'Included Full Engine', custom: 'Private Clusters' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Safe Automation',
    label: 'LinkedIn',
    icon: Linkedin,
    tagline: 'Official cloud API actions with dedicated residential proxies and zero account ban risks.',
    packages: [
      {
        name: 'STARTER',
        monthlyPrice: 40,
        annualPrice: 32,
        volume: '1 Connected Profile',
        features: [
          '1 connected LinkedIn account',
          '400 connection requests / mo',
          'Human-like delay patterns',
          'Dedicated residential cloud proxy',
          'Auto-message follow-up sequence'
        ],
        ctaText: 'Start LinkedIn',
        ctaHref: '/signup'
      },
      {
        name: 'PRO',
        monthlyPrice: 80,
        annualPrice: 64,
        popular: true,
        badge: 'MOST POPULAR',
        volume: '3 Connected Profiles',
        features: [
          '3 connected LinkedIn accounts',
          '1,500 connection requests / mo',
          'Profile views & skill endorsement touches',
          'Includes Deals CRM (Syncs accepted invites)',
          'AI personalized invite messages'
        ],
        ctaText: 'Start Pro Trial',
        ctaHref: '/signup'
      },
      {
        name: 'SCALE',
        monthlyPrice: 150,
        annualPrice: 120,
        volume: '8 Connected Profiles',
        features: [
          '8 connected LinkedIn accounts',
          '4,000 connection requests / mo',
          'Includes Deals CRM & Flow Builder',
          'Multi-channel cross triggers (Email + LinkedIn)',
          'Team account delegation & centralized inbox'
        ],
        ctaText: 'Scale LinkedIn Team',
        ctaHref: '/signup'
      }
    ],
    customPlan: {
      name: 'AGENCY / ENTERPRISE',
      volume: '15+ Connected Profiles',
      features: [
        '15+ accounts with isolated proxy subnets',
        'Custom agency white-label portals',
        'Includes Deals CRM & Flow Builder Engine',
        'Dedicated LinkedIn compliance audit'
      ],
      ctaText: 'Reach Out for Agency Plan',
      ctaHref: '/book-a-demo'
    },
    tableFeatures: [
      { name: 'Connected Accounts', starter: '1 Account', pro: '3 Accounts', scale: '8 Accounts', custom: '15+ Accounts' },
      { name: 'Monthly Requests / DMs', starter: '400', pro: '1,500', scale: '4,000', custom: 'Custom High-Volume' },
      { name: 'Proxy Protection', starter: 'Cloud Proxy', pro: 'Residential Dedicated', scale: 'Static Residential', custom: 'Isolated Subnets' },
      { name: 'Deals CRM Integration', starter: 'Export Only', pro: 'Included Natively', scale: 'Included Natively', custom: 'Dedicated Sync' },
      { name: 'Flow Builder Automation', starter: 'No', pro: 'Basic Triggers', scale: 'Included Full Engine', custom: 'Custom Logic Nodes' }
    ]
  },
  {
    id: 'freelance-ai',
    name: 'Freelance AI Bidding Agents',
    label: 'Freelance AI',
    icon: Bot,
    tagline: 'Autonomous AI bidding engine that detects matching jobs on Upwork & Freelancer and bids in seconds.',
    packages: [
      {
        name: 'STARTER',
        monthlyPrice: 35,
        annualPrice: 28,
        volume: '50 Auto-Proposals / mo',
        features: [
          '1 platform account (Upwork)',
          '50 auto-proposals dispatched / mo',
          'Real-time job scanner alerts',
          'Standard proposal templates',
          'Notification webhook triggers'
        ],
        ctaText: 'Launch Bidding Agent',
        ctaHref: '/signup'
      },
      {
        name: 'PRO',
        monthlyPrice: 69,
        annualPrice: 55,
        popular: true,
        badge: 'MOST POPULAR',
        volume: '200 Auto-Proposals / mo',
        features: [
          '3 platform accounts (Upwork & Freelancer)',
          '200 auto-proposals / mo',
          'Sub-60 second rapid bidding',
          'Includes Deals CRM (Auto-logs client replies)',
          'AI portfolio matching & proposal tailoring'
        ],
        ctaText: 'Start Pro Trial',
        ctaHref: '/signup'
      },
      {
        name: 'SCALE',
        monthlyPrice: 129,
        annualPrice: 103,
        volume: '600 Auto-Proposals / mo',
        features: [
          'Unlimited platform accounts',
          '600 auto-proposals / mo',
          'Multi-skill bidding matrix',
          'Includes Deals CRM & Flow Builder',
          'Custom prompt fine-tuning & automated follow-ups'
        ],
        ctaText: 'Scale Agency Bids',
        ctaHref: '/signup'
      }
    ],
    customPlan: {
      name: 'AGENCY BIDDING FLEET',
      volume: '1,500+ Proposals / mo',
      features: [
        'Enterprise agency bidding team management',
        'Custom LLM proposal model fine-tuning',
        'Includes Deals CRM & Flow Builder Engine',
        'Dedicated strategy consulting'
      ],
      ctaText: 'Talk to Agency Sales',
      ctaHref: '/book-a-demo'
    },
    tableFeatures: [
      { name: 'Monthly Auto-Proposals', starter: '50 bids', pro: '200 bids', scale: '600 bids', custom: '1,500+ bids' },
      { name: 'Supported Platforms', starter: 'Upwork', pro: 'Upwork + Freelancer', scale: 'All Platforms', custom: 'Custom Job Boards' },
      { name: 'Bidding Speed', starter: 'Within 5 mins', pro: '< 60 seconds', scale: '< 30 seconds', custom: 'Instant Webhook' },
      { name: 'Deals CRM Integration', starter: 'Export Only', pro: 'Included Natively', scale: 'Included Natively', custom: 'Dedicated Sync' },
      { name: 'Flow Builder Automation', starter: 'No', pro: 'Basic Triggers', scale: 'Included Full Engine', custom: 'Custom Pipelines' }
    ]
  }
];

interface BundlePlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  targetAudience: string;
  valueTag: string;
  includedChannels: string[];
  features: string[];
  ctaText: string;
  ctaHref: string;
}

const BUNDLE_PLANS: BundlePlan[] = [
  {
    id: 'growth-bundle',
    name: 'Growth Bundle',
    monthlyPrice: 199,
    annualPrice: 159,
    targetAudience: 'For lean teams starting to build a repeatable outbound engine.',
    valueTag: 'Built for Lean Teams • Save $119/mo',
    includedChannels: ['Lead Finder', 'Cold Email', 'LinkedIn', 'Voice AI SDR', 'Deals CRM'],
    features: [
      '5,000 Verified Lead Credits / mo',
      '10,000 Cold Emails across 10 inboxes',
      '1,500 Safe LinkedIn Requests / mo (1 Profile)',
      '200 Voice AI SDR Talk Minutes / mo',
      'Unified Deals CRM included natively',
      'Standard Multi-Channel Lead Sync',
      'Automated Peer-to-Peer Warmup',
      'Standard Email & Chat Support'
    ],
    ctaText: 'Start Growth Bundle',
    ctaHref: '/signup'
  },
  {
    id: 'revenue-bundle',
    name: 'Revenue Bundle',
    monthlyPrice: 299,
    annualPrice: 239,
    popular: true,
    badge: 'MOST POPULAR • BEST VALUE',
    targetAudience: 'For growing teams that need multi-channel outbound, automation, CRM, and workflow orchestration.',
    valueTag: 'Save $230/mo vs. buying separately',
    includedChannels: ['Lead Finder', 'Cold Email', 'Voice AI SDR', 'LinkedIn', 'Freelance AI', 'Deals CRM', 'Flow Builder'],
    features: [
      '15,000 Verified Lead Credits (multiAttribute + Mobile)',
      '25,000 Cold Emails across Unlimited inboxes',
      '3,000 Safe LinkedIn Requests (3 Profiles)',
      '600 Sub-400ms Voice AI SDR Minutes',
      '150 Auto-Proposals on Upwork & Freelancer',
      'Unified Deals CRM (Unlimited Deals & ARR tracking)',
      'Visual Flow Builder (15 Active Multi-Channel Flows)',
      'Behavioral Branching & Cross-Channel Telemetry',
      'Priority Support with Fast Response SLA'
    ],
    ctaText: 'Start Revenue Free Trial',
    ctaHref: '/signup'
  },
  {
    id: 'scale-bundle',
    name: 'Scale Bundle',
    monthlyPrice: 499,
    annualPrice: 399,
    targetAudience: 'For serious revenue teams running high-volume outbound across multiple channels.',
    valueTag: 'Maximum Scale • Save $420/mo',
    includedChannels: ['All 6 Engines', 'Deals CRM', 'Flow Builder', 'Dedicated Account Manager'],
    features: [
      '50,000 Verified Lead Credits (multiDimensional search)',
      '75,000 Cold Emails (Priority Sending Queue)',
      '8,000 Safe LinkedIn Requests (8 Profiles)',
      '2,000 Voice AI SDR Minutes + WebRTC Recordings',
      '500 Auto-Proposals for Multi-Seat Teams',
      'Full Deals CRM + Multi-Currency ARR Attribution',
      'Visual Flow Builder (Unlimited Automated Workflows)',
      'Dedicated Account Manager & Private Slack Channel'
    ],
    ctaText: 'Scale Entire Revenue Stack',
    ctaHref: '/signup'
  }
];

const INCLUDED_CORE_CAPABILITIES = [
  {
    title: 'Dedicated TRIXIE AI Assistant',
    description: 'Autonomous TRIXIE AI that builds sequences, crafts personalized copy, and optimizes workflow graphs dynamically.',
    icon: Bot
  },
  {
    title: 'Multi-Channel Workflows',
    description: 'Connect lead finding, Lead Data, cold email, LinkedIn, voice AI, and CRM actions in one unified system.',
    icon: Layers
  },
  {
    title: 'Built-In Safety & Pacing',
    description: 'Smart load-balancing, account ramp-up pacing, and compliance safeguards protect domain and social accounts.',
    icon: ShieldCheck
  },
  {
    title: 'Bring Your Own API (BYOK)',
    description: 'Plug in your own OpenAI, Anthropic, or Gemini API keys to run generative copy at direct provider costs.',
    icon: Key
  }
];

const PRICING_FAQS = [
  {
    question: 'What is the difference between Individual Modules and Bundles?',
    answer: 'Individual Modules let you buy just one specific capability (e.g. Cold Email from $20/mo, Lead Finder from $39/mo, or Voice AI from $60/mo). Bundles ($199, $299, and $499) combine multiple core channels, Deals CRM, and Flow Builder into an all-in-one package, saving you up to $420/month compared with buying separately.'
  },
  {
    question: 'Where are Deals CRM and Flow Builder included?',
    answer: 'Deals CRM is natively included in all Pro and Scale module tiers as well as every Bundle. Flow Builder is included in all Scale module tiers and the $299 & $499 Bundles for complete visual cross-channel automation.'
  },
  {
    question: 'How do the 3 package tiers per module work?',
    answer: 'Each module offers 3 structured tiers: Starter (focused core functionality), Pro (advanced module features + native Deals CRM), and Scale (full volume + Deals CRM + Flow Builder automation).'
  },
  {
    question: 'How do I get a Custom / Enterprise plan?',
    answer: 'For high-volume requirements, custom credit limits, private dedicated IP subnets, or specialized enterprise integrations, click "Talk to Sales" or "Book a Demo". Our engineering team will configure a custom setup for your revenue team.'
  },
  {
    question: 'How do credits work across the platform?',
    answer: 'Usage is transparent: 1 credit = 1 email sent, 4 credits = 1 mobile phone Verified, and 0.25 credit = 1 lead verified. Credits draw from a shared workspace ledger with zero hidden fees.'
  },
  {
    question: 'Can I upgrade, downgrade, or switch between plans anytime?',
    answer: 'Yes! You can switch between individual modules and bundles, change tiers, or switch billing cycles from your workspace settings with instant prorated adjustments.'
  },
  {
    question: 'Do unused credits expire at the end of the month?',
    answer: 'Subscription credits roll over each billing cycle as long as your workspace plan remains active, so you never lose value during seasonal or quiet outbound weeks.'
  },
  {
    question: 'Is there a free trial to test the modules and bundles?',
    answer: 'Yes! We offer a full-access 7-Day Free Trial across all modules and bundles. You can test 480M+ lead search, multi-inbox cold email dispatch, and Voice AI calling with no credit card required to start.'
  }
];

export const PricingPage: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('lead-finder');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Interactive usage simulator state
  const [calcEmails, setCalcEmails] = useState<number>(10000);
  const [calcPhones, setCalcPhones] = useState<number>(1000);
  const [calcVerifications, setCalcVerifications] = useState<number>(4000);

  const totalCreditsNeeded = Math.round(
    calcEmails * 1 + calcPhones * 4 + calcVerifications * 0.25
  );

  const isBundleActive = activeModuleId === 'bundles';
  const activeModule = MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
      <SEOHead 
        title="Outtricks Pricing & Modular Packages | Transparent ROI for Sales Teams"
        description="Flexible, modular outbound pricing starting from $20/mo. Choose individual engines (Lead Finder, Cold Email, Voice AI, LinkedIn) or all-in-one revenue bundles with Deals CRM and credit rollover."
        canonical="https://outtricks.com/pricing"
        keywords={["Outtricks pricing","cold email pricing","lead finder pricing","voice AI SDR pricing","sales CRM pricing","outbound bundles"]}
        breadcrumbs={[{"name":"Pricing","url":"/pricing"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            PRICING & MODULE PACKAGES
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Choose the Right Outbound Package
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Start with one module or combine your entire revenue stack with a value-focused bundle.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full ${
                billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Talk to Sales</span>
          </Link>
        </div>

        {/* Trust Line */}
        <p className="text-xs font-sans text-slate-500 dark:text-slate-400 pt-1">
          No hidden setup fees • Flexible modular scale • Cancel anytime
        </p>

      </section>

      {/* =========================================================================
          SECTION 2: REFINED MODULE & BUNDLE SELECTOR (Single-Line Navigation)
          ========================================================================= */}
      <section className="space-y-8">
        
        {/* Module Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {isBundleActive ? 'ALL-IN-ONE BUNDLES' : 'INDIVIDUAL MODULES'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {isBundleActive ? 'More Channels. Better Value.' : 'Select a Module to View Packages'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isBundleActive 
              ? 'Combine your outbound stack in one plan and save compared with buying each module separately.' 
              : 'Choose the specific outbound engine your team needs today. Upgrade to Pro/Scale to include Deals CRM & Flow Builder.'}
          </p>
        </div>

        {/* Clean Single-Line Horizontal Selector (Contains ONLY 5 Modules + Bundles) */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-xs max-w-full overflow-x-auto no-scrollbar">
            
            {/* 1. Lead Finder */}
            <button
              onClick={() => setActiveModuleId('lead-finder')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'lead-finder'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Search className={`w-3.5 h-3.5 ${activeModuleId === 'lead-finder' ? 'text-white' : 'text-slate-500'}`} />
              <span>Lead Finder</span>
            </button>

            {/* 2. Cold Email */}
            <button
              onClick={() => setActiveModuleId('cold-email')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'cold-email'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Mail className={`w-3.5 h-3.5 ${activeModuleId === 'cold-email' ? 'text-white' : 'text-slate-500'}`} />
              <span>Cold Email</span>
            </button>

            {/* 3. Voice AI SDR */}
            <button
              onClick={() => setActiveModuleId('voice-ai')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'voice-ai'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${activeModuleId === 'voice-ai' ? 'text-white' : 'text-slate-500'}`} />
              <span>Voice AI SDR</span>
            </button>

            {/* 4. LinkedIn */}
            <button
              onClick={() => setActiveModuleId('linkedin')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'linkedin'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Linkedin className={`w-3.5 h-3.5 ${activeModuleId === 'linkedin' ? 'text-white' : 'text-slate-500'}`} />
              <span>LinkedIn</span>
            </button>

            {/* 5. Freelance AI */}
            <button
              onClick={() => setActiveModuleId('freelance-ai')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'freelance-ai'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Bot className={`w-3.5 h-3.5 ${activeModuleId === 'freelance-ai' ? 'text-white' : 'text-slate-500'}`} />
              <span>Freelance AI</span>
            </button>

            {/* 6. BUNDLES (Highlighted Option) */}
            <button
              onClick={() => setActiveModuleId('bundles')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeModuleId === 'bundles'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.03]'
                  : 'bg-white dark:bg-[#181818] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Bundles</span>
              <span className={`text-[9px] font-sans px-1.5 py-0.2 rounded-full ${
                activeModuleId === 'bundles' ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold'
              }`}>
                BEST VALUE
              </span>
            </button>

          </div>
        </div>

        {/* =========================================================================
            VIEW A: DEDICATED BUNDLES VIEW ($199, $299, $499 Plans)
            ========================================================================= */}
        {isBundleActive ? (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Bundle Highlight Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                    Unified Multi-Channel Bundles
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                    Includes Lead Finder, Cold Email, LinkedIn, Voice AI SDR, Deals CRM, and Flow Builder on one synchronized database.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-sans font-bold px-3 py-1 rounded-full bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Save up to $420/month vs. separate
                </span>
              </div>
            </div>

            {/* 3 Bundle Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {BUNDLE_PLANS.map((plan) => {
                const isPopular = plan.popular;
                const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

                return (
                  <Card3DTilt key={plan.id} maxTilt={isPopular ? 5 : 3}>
                    <div className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full space-y-6 transition-all relative ${
                      isPopular
                        ? 'bg-blue-50/70 dark:bg-white/[0.04] border-2 border-blue-600 shadow-xl shadow-blue-500/15'
                        : 'bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm hover:shadow-md'
                    }`}>
                      
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="px-3.5 py-0.5 rounded-full bg-blue-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-md">
                            {plan.badge || 'MOST POPULAR • BEST VALUE'}
                          </span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
                              {plan.name}
                            </h4>
                            <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-blue-100 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-bold">
                              {plan.valueTag}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white font-sans">
                              ${price}
                            </span>
                            <span className="text-xs text-slate-500 font-sans">/mo</span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-2 leading-relaxed">
                            {plan.targetAudience}
                          </p>
                        </div>

                        {/* Included Features List */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-200/80 dark:border-[#2A2A2A]">
                          <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                            Included in this Bundle:
                          </span>
                          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                            {plan.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isPopular ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
                                }`} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-2">
                        <Link
                          to={plan.ctaHref}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            isPopular
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                              : 'bg-slate-900 hover:bg-slate-800 dark:bg-[#181818] dark:hover:bg-slate-700 text-white shadow-xs hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  </Card3DTilt>
                );
              })}
            </div>

            {/* Custom Enterprise Bundle Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a0f1d] to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-sans font-bold uppercase">
                  <Building2 className="w-3 h-3" />
                  <span>HIGH-VOLUME ENTERPRISE STACK</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Need Custom Infrastructure or Agency White-Label?
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  We provision dedicated IP subnets, custom LLM fine-tuning, private PostgreSQL instances, and 24/7 dedicated engineering support for high-scale revenue operations.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-a-demo"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Talk to Enterprise Sales</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        ) : (
          /* =========================================================================
              VIEW B: INDIVIDUAL MODULE VIEW (3 Tiers + Custom Plan)
              ========================================================================= */
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Selected Module Summary Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <activeModule.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                    {activeModule.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                    {activeModule.tagline}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-sans font-bold px-3 py-1 rounded-full bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Starter • Pro (with CRM) • Scale (with Flow Builder)
                </span>
              </div>
            </div>

            {/* 3 Tier Cards + 1 Custom Plan Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* PACKAGE 1, 2, 3 */}
              {activeModule.packages.map((pkg, idx) => {
                const isPopular = pkg.popular;
                const price = billingCycle === 'annual' ? pkg.annualPrice : pkg.monthlyPrice;

                return (
                  <Card3DTilt key={idx} maxTilt={isPopular ? 5 : 3}>
                    <div className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full space-y-6 transition-all relative ${
                      isPopular
                        ? 'bg-blue-50/60 dark:bg-white/[0.04] border-2 border-blue-600 shadow-xl shadow-blue-500/10'
                        : 'bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm hover:shadow-md'
                    }`}>
                      
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="px-3 py-0.5 rounded-full bg-blue-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-md">
                            {pkg.badge || 'MOST POPULAR'}
                          </span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
                            {pkg.name}
                          </h4>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-3xl font-black text-slate-950 dark:text-white font-sans">
                              ${price}
                            </span>
                            <span className="text-xs text-slate-500 font-sans">/mo</span>
                          </div>
                          <div className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 mt-1">
                            {pkg.volume}
                          </div>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans pt-2 border-t border-slate-200/80 dark:border-[#2A2A2A]">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isPopular ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
                              }`} />
                              <span className={feat.includes('Includes') ? 'font-bold text-blue-700 dark:text-blue-300' : ''}>
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <Link
                          to={pkg.ctaHref}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            isPopular
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                              : 'bg-slate-900 hover:bg-slate-800 dark:bg-[#181818] dark:hover:bg-slate-700 text-white shadow-xs hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                        >
                          <span>{pkg.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  </Card3DTilt>
                );
              })}

              {/* CUSTOM ENTERPRISE PLAN (Reach Out CTA) */}
              <Card3DTilt maxTilt={3}>
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between h-full space-y-6 relative overflow-hidden">
                  
                  <div className="space-y-4 relative z-10">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-sans font-bold uppercase mb-1">
                        <Building2 className="w-3 h-3" />
                        <span>HIGH SCALE</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">
                        {activeModule.customPlan.name}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="text-3xl font-black text-white font-sans">
                          Custom
                        </span>
                      </div>
                      <div className="text-xs font-sans font-bold text-blue-400 mt-1">
                        {activeModule.customPlan.volume}
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans pt-2 border-t border-slate-800">
                      {activeModule.customPlan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reach Out / Contact Sales CTA */}
                  <div className="pt-2 relative z-10 space-y-2">
                    <Link
                      to={activeModule.customPlan.ctaHref}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>{activeModule.customPlan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <p className="text-[10px] font-sans text-center text-slate-400">
                      Reach out for custom volume & SLA
                    </p>
                  </div>

                </div>
              </Card3DTilt>

            </div>

            {/* Detailed Feature Comparison Table for Selected Module */}
            <div className="pt-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{activeModule.name} • Feature Breakdown</span>
                  <span className="text-xs text-slate-500 font-sans">Compare all 4 options</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-[#2A2A2A] text-slate-500 font-sans">
                        <th className="py-2.5 pr-4">Feature / Limit</th>
                        <th className="py-2.5 px-3">Starter</th>
                        <th className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">Pro (Popular)</th>
                        <th className="py-2.5 px-3">Scale</th>
                        <th className="py-2.5 pl-3">Custom Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                      {activeModule.tableFeatures.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">
                            {row.name}
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-sans">
                            {row.starter}
                          </td>
                          <td className="py-3 px-3 text-blue-600 dark:text-blue-400 font-sans font-bold">
                            {row.pro}
                          </td>
                          <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-sans">
                            {row.scale}
                          </td>
                          <td className="py-3 pl-3 text-slate-900 dark:text-slate-100 font-sans font-bold">
                            {row.custom}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

      </section>

      {/* =========================================================================
          SECTION 3: CREDIT / USAGE EXPLAINER & SIMULATOR
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            TRANSPARENT USAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Simple Usage. Clear Costs.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Every action consumes simple predictable credits from your pooled workspace ledger.
          </p>
        </div>

        {/* 3 Metric Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto font-sans text-center">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-1">
            <span className="text-xs font-sans text-slate-500 block">Cold Email Outreach</span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">1 Credit</div>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-sans block">= 1 Email Sent</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-1">
            <span className="text-xs font-sans text-slate-500 block">Direct Mobile Phone</span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">4 Credits</div>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-sans block">= 1 Verified Phone Number</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-1">
            <span className="text-xs font-sans text-slate-500 block">Lead Verification</span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">0.25 Credit</div>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-sans block">= 1 Real-time Verified Record</span>
          </div>

        </div>

        {/* Interactive Usage Calculator */}
        <div className="p-8 sm:p-10 rounded-2xl bg-blue-50/50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-blue-800/80 pb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Interactive Usage Simulator</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                Adjust the sliders below to estimate your monthly credit consumption.
              </p>
            </div>

            <div className="text-right font-sans">
              <span className="text-xs text-slate-500 font-sans block">Total Credits Needed</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {totalCreditsNeeded.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            
            {/* Slider 1: Emails */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300">
                <span>Emails / Month:</span>
                <span className="text-blue-600">{calcEmails.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={calcEmails}
                onChange={(e) => setCalcEmails(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[11px] font-sans text-slate-500 block">
                = {(calcEmails * 1).toLocaleString()} credits
              </span>
            </div>

            {/* Slider 2: Phone Numbers */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300">
                <span>Phones Verified:</span>
                <span className="text-blue-600">{calcPhones.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={calcPhones}
                onChange={(e) => setCalcPhones(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[11px] font-sans text-slate-500 block">
                = {(calcPhones * 4).toLocaleString()} credits
              </span>
            </div>

            {/* Slider 3: Verifications */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300">
                <span>Verifications:</span>
                <span className="text-blue-600">{calcVerifications.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={calcVerifications}
                onChange={(e) => setCalcVerifications(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[11px] font-sans text-slate-500 block">
                = {(calcVerifications * 0.25).toLocaleString()} credits
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 4: INCLUDED WITH EVERY PLAN (More Than Just Credits)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CORE PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            More Than Just Credits
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Foundational architecture and AI features included natively in every plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INCLUDED_CORE_CAPABILITIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: ENTERPRISE SECTION (Need More Scale?)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/70 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-blue-800 shadow-lg relative overflow-hidden space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-sans font-bold uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>CUSTOM ENTERPRISE INFRASTRUCTURE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              Need Custom High-Volume Scale?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl">
              Build a tailored revenue infrastructure around your team with custom credit volumes, dedicated IP subnets, 2-way CRM integrations, and 24/7 dedicated support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Custom high-volume credit allocation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Dedicated private IP & proxy infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Full REST API & webhook rate limit increases</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Dedicated Slack channel & custom onboarding</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              <span>Talk to Sales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              <span>Book a Demo</span>
            </Link>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 6: FAQ (Pricing Questions, Answered)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Pricing Questions, Answered
          </h2>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, fIdx) => {
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
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#2A2A2A]/80 animate-in fade-in duration-150 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: FINAL HIGH-CONVERSION CTA
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-sans text-white">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET STARTED IN MINUTES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build a Revenue Engine That Scales With You
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-xl mx-auto font-sans">
            Start with the modules you need today or choose an all-in-one bundle as your revenue operation grows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] text-slate-900 dark:text-white hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start 7-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-900/60 hover:bg-blue-900/80 border border-blue-400/40 text-white font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Talk to Sales</span>
          </Link>
        </div>

        <p className="text-[11px] font-sans text-blue-200 relative z-10">
          7-Day Free Trial • No Credit Card Required • Flexible Scale
        </p>
      </section>

    </div>
  );
};
