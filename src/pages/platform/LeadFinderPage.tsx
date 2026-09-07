import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Building2, 
  Users, 
  Briefcase, 
  MapPin, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Activity, 
  Filter, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Sliders, 
  Layers, 
  Target,
  Workflow,
  Linkedin,
  PhoneCall,
  Flame,
  BarChart3,
  Download,
  Share2,
  RefreshCw,
  Clock,
  DollarSign,
  Globe,
  SlidersHorizontal,
  CheckCheck
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// ============================================================================
// 8 SEARCH DIMENSIONS DATA
// ============================================================================
const DIMENSIONS_DATA = [
  {
    id: 'firmographics',
    title: '1. Firmographic Data',
    icon: Building2,
    badge: 'Company Attributes',
    description: 'Filter across company headcount (10–10,000+ employees), annual revenue tiers ($1M–$500M+ ARR), funding stages (Seed, Series A–E, Bootstrapped, Public), and year-over-year headcount growth velocity.',
    metrics: '480M+ Company Records'
  },
  {
    id: 'roles',
    title: '2. Job Title & Seniority',
    icon: Users,
    badge: 'Decision Makers',
    description: 'Pinpoint exact executive levels: C-Suite, VP, Director, Head of, Lead, or Individual Contributor across Engineering, Product, Sales, RevOps, Marketing, Finance, and HR departments.',
    metrics: '85M+ Decision-Maker Profiles'
  },
  {
    id: 'industry',
    title: '3. Industry & Vertical',
    icon: Briefcase,
    badge: '240+ Sub-Sectors',
    description: 'Target hyper-specific verticals including Enterprise B2B SaaS, HealthTech, FinTech, Cybersecurity, Logistics & Supply Chain, CleanTech, E-Commerce Infrastructure, and Cloud DevTools.',
    metrics: '240+ Granular Categories'
  },
  {
    id: 'technographics',
    title: '4. Technographic Stack',
    icon: Cpu,
    badge: '8,000+ Tech Tools',
    description: 'Identify accounts actively running specific software tools such as Salesforce, HubSpot, Stripe, PostgreSQL, AWS, React, Snowflake, Datadog, or identify users of legacy competitor systems.',
    metrics: '8,200+ Tracked Technologies'
  },
  {
    id: 'intent',
    title: '5. Real-Time Buying Signals',
    icon: TrendingUp,
    badge: 'Active Evaluation',
    description: 'Filter accounts demonstrating strong buying intent: active job postings (e.g. +5 SDR hiring openings), recent venture funding rounds, executive leadership promotions, and tool migration signals.',
    metrics: 'Real-Time Intent Feeds'
  },
  {
    id: 'geography',
    title: '6. Location & Market',
    icon: MapPin,
    badge: 'Global Coverage',
    description: 'Granular geographic segmentation across 150+ countries, states, metro markets, primary headquarters, regional branch offices, and distributed remote engineering clusters.',
    metrics: '150+ Countries & Regions'
  },
  {
    id: 'contact',
    title: '7. verified Contacts',
    icon: Mail,
    badge: '99.4% Deliverability',
    description: 'Retrieve verified direct-to-inbox work emails via multiDimensional cascading validation, validated direct mobile phone dials, and confirmed LinkedIn profile URLs.',
    metrics: 'multiDimensional search'
  },
  {
    id: 'engagement',
    title: '8. Account Engagement History',
    icon: Activity,
    badge: 'Fatigue Protection',
    description: 'Track historical contact responsiveness, sequence status, prior outreach dates, and enforce global suppression rules to prevent embarrassing duplicate outreach across team members.',
    metrics: 'Zero Fatigue Guarantee'
  }
];

// ============================================================================
// PROSPECT RECORDS FOR LIVE SANDBOX
// ============================================================================
interface ProspectRecord {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  headcount: string;
  revenue: string;
  location: string;
  email: string;
  phone: string;
  tech: string[];
  intentSignal: string;
  icpScore: number;
  avatar: string;
}

const SAMPLE_PROSPECTS: ProspectRecord[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    title: 'VP of Growth & Revenue',
    company: 'CloudScale AI',
    industry: 'Enterprise B2B SaaS',
    headcount: '150-250',
    revenue: '$25M - $50M',
    location: 'San Francisco, CA',
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    tech: ['Salesforce', 'Stripe', 'PostgreSQL', 'AWS'],
    intentSignal: 'Hiring +6 SDRs & Scaling Outbound',
    icpScore: 98,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    title: 'Head of Revenue Operations',
    company: 'Apex Data Labs',
    industry: 'Data Infrastructure',
    headcount: '50-100',
    revenue: '$10M - $25M',
    location: 'New York, NY',
    email: 'marcus@apexdata.io',
    phone: '+1 (212) 749-1120',
    tech: ['HubSpot', 'Snowflake', 'React', 'GCP'],
    intentSignal: 'Series B Funding ($32M Announced)',
    icpScore: 96,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    title: 'Director of Business Development',
    company: 'Vertex Scale',
    industry: 'FinTech / Payments',
    headcount: '250-500',
    revenue: '$50M - $100M',
    location: 'Austin, TX',
    email: 'elena@vertexscale.com',
    phone: '+1 (512) 480-9921',
    tech: ['Salesforce', 'Segment', 'Stripe', 'Datadog'],
    intentSignal: 'Tool Migration from Legacy Database',
    icpScore: 94,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '4',
    name: 'David Miller',
    title: 'Founder & CEO',
    company: 'Datasync Technologies',
    industry: 'Cloud Security / DevOps',
    headcount: '25-50',
    revenue: '$5M - $10M',
    location: 'Boston, MA',
    email: 'david@datasync.tech',
    phone: '+1 (617) 390-8412',
    tech: ['PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    intentSignal: 'Evaluating Multi-Inbox Outreach',
    icpScore: 92,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

// ============================================================================
// 6 OPERATIONAL USE CASES
// ============================================================================
const USE_CASES = [
  {
    id: 'sales-teams',
    title: 'B2B Sales Teams',
    subtitle: 'Scale predictable outbound pipeline with verified decision makers',
    pain: 'Sales reps waste 35% of their prospecting time manually searching LinkedIn and verifying work emails one by one.',
    solution: 'Build dynamic target lists of verified VP and Director-level buyers filtered by company size, tech stack, and intent.',
    filterExample: 'VP Sales / CRO + 50–500 Employees + Using Salesforce + Hiring SDRs',
    result: '3.4x faster list building and 99.4% inbox delivery on cold outbound sequences.'
  },
  {
    id: 'sdr-bdr',
    title: 'SDR & BDR Teams',
    subtitle: 'Eliminate manual research and focus on booked meetings',
    pain: 'SDRs spend hours toggling across 5 different database tools, resulting in call reluctance and high bounce rates.',
    solution: 'Give SDRs one unified database with verified direct mobile phone dials and multiAttribute-validated work emails.',
    filterExample: 'Director of Growth + B2B SaaS + Series A/B Funding + Verified Mobile',
    result: '8 to 12 hours recovered per SDR per week, driving a 42% increase in completed conversations.'
  },
  {
    id: 'founders',
    title: 'Founders & Startups',
    subtitle: 'Build your first repeatable outbound revenue engine',
    pain: 'Early-stage founders cannot afford expensive $10K/year enterprise database contracts with rigid credit caps.',
    solution: 'Access 480M+ verified global B2B profiles on flat, transparent monthly plans with zero per-seat penalties.',
    filterExample: 'CEO / Head of Product + 10–50 Employees + High Growth Velocity',
    result: 'Launch targeted founder-led sales campaigns in under 15 minutes with verified decision-maker contacts.'
  },
  {
    id: 'agencies',
    title: 'Lead Generation Agencies',
    subtitle: 'Deliver high-converting prospect lists for multiple client ICPs',
    pain: 'Agencies juggle fragmented database subscriptions for each client, driving up software overhead.',
    solution: 'Manage multi-client prospecting workspaces with separate saved ICP filters, dynamic list exports, and bulk multiAttribute credits.',
    filterExample: 'Multi-Industry Segmentation (FinTech, HealthTech, Logistics) + Custom Tech Stacks',
    result: '65% reduction in agency data software costs and significantly higher client meeting conversion rates.'
  },
  {
    id: 'revops',
    title: 'RevOps Teams',
    subtitle: 'Enforce clean data governance and eliminate sync drift',
    pain: 'Duplicate records and outdated emails in CRMs poison outbound domain reputations and create attribution gaps.',
    solution: 'Direct PostgreSQL database architecture writes Verified, validated contact data cleanly with zero CSV drift.',
    filterExample: 'Accounts with $10M+ ARR + Technographic Shifts + No Prior Outreach in 90 Days',
    result: 'Zero CRM data decay and instant bidirectional pipeline updates across all outbound channels.'
  },
  {
    id: 'recruiters',
    title: 'Recruiting & Staffing Teams',
    subtitle: 'Source high-caliber talent and hiring managers faster',
    pain: 'Generic recruiting databases lack verified personal emails and direct phone dials for passive executive candidates.',
    solution: 'Filter top talent by seniority, specific technical skill sets, past company pedigree, and verified mobile numbers.',
    filterExample: 'Staff / Principal Engineer + React / PostgreSQL / Go + San Francisco or Remote',
    result: 'Double candidate response rates with verified direct mobile and email outreach.'
  }
];

// ============================================================================
// 10 COMPREHENSIVE FAQS
// ============================================================================
const LEAD_FINDER_FAQS = [
  {
    question: 'What is Outtricks Lead Finder?',
    answer: 'Outtricks Lead Finder is an advanced B2B prospect discovery engine giving revenue teams access to over 480 Million verified global business profiles. It combines 8 search dimensions—including firmographics, job seniority, technographic software stacks, and real-time buying intent signals—with multiAttribute search Lead Search on a single connected platform.'
  },
  {
    question: 'How does B2B lead search work in Outtricks?',
    answer: 'You define your Ideal Customer Profile (ICP) using multi-layered search filters such as industry vertical, company headcount, annual revenue, job titles, technologies used, and geographic region. Outtricks instantly queries its 480M+ record index to surface matching decision-makers, validating their contact details in real time before you launch outreach.'
  },
  {
    question: 'How accurate is the contact data (emails & phone numbers)?',
    answer: 'Outtricks delivers an average 99.4% inbox deliverability rate on verified business emails. When a prospect record is retrieved, our system executes a multi-criteria search that performs real-time DNS MX checks, SMTP mailbox handshakes, and spam-trap suppression to ensure every email is 100% deliverable.'
  },
  {
    question: 'Can I filter prospects by job title and seniority?',
    answer: 'Yes. You can filter by exact job titles (e.g. VP of Sales, Head of RevOps, Chief Technology Officer) as well as broad seniority tiers (C-Suite, VP, Director, Manager, Individual Contributor) and specific job functions (Sales, Marketing, Engineering, Product, Finance, Operations).'
  },
  {
    question: 'Can I search by company size, industry, and revenue?',
    answer: 'Yes. Outtricks allows granular filtering by company employee headcount (1–10, 11–50, 51–200, 201–500, 501–1,000, 1,000–5,000, 5,000+), annual revenue brackets ($1M to $500M+), funding stages (Seed through IPO), and over 240 specialized industry sub-sectors.'
  },
  {
    question: 'Does Lead Finder provide verified work emails and direct mobile dials?',
    answer: 'Yes. Every prospect profile includes verified business email addresses, direct dial mobile phone numbers, verified corporate phone lines, and direct LinkedIn profile URLs.'
  },
  {
    question: 'Can I identify high-intent prospects who are actively evaluating software?',
    answer: 'Yes. Outtricks indexes real-time buying signals including active job hiring surges (e.g., companies expanding their sales development teams), recent venture capital funding announcements, executive leadership appointments, and technographic installation events.'
  },
  {
    question: 'Who should use Outtricks Lead Finder?',
    answer: 'Lead Finder is built for B2B Sales Teams, SDRs/BDRs, Founders, Lead Generation Agencies, Revenue Operations leaders, and Executive Recruiters who need high-accuracy contact data and intent signals to drive predictable pipeline growth.'
  },
  {
    question: 'Can prospect lists be exported or synced directly to outreach campaigns?',
    answer: 'Yes. You can export clean CSV files or push filtered prospect lists directly into Outtricks multi-inbox cold email cadences, cloud LinkedIn sequences, Voice AI SDR phone queues, or your Deals CRM with a single click and zero manual data formatting.'
  },
  {
    question: 'How does Outtricks Lead Finder differ from traditional lead databases?',
    answer: 'Traditional lead databases sell static, outdated CSV lists with 30–50% bounce rates and no live intent context. Outtricks provides a dynamic, continuously refreshed 480M+ profile index with automated MultiDimensional Lead Search, live technographic intelligence, and instant 0-ETL campaign activation on 1 connected database.'
  }
];

export const LeadFinderPage: React.FC = () => {
  const [selectedDimensionIndex, setSelectedDimensionIndex] = useState<number>(0);
  const [selectedProspectIndex, setSelectedProspectIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeUseCaseId, setActiveUseCaseId] = useState<string>('sales-teams');

  const activeDimension = DIMENSIONS_DATA[selectedDimensionIndex];
  const activeProspect = SAMPLE_PROSPECTS[selectedProspectIndex];

  const filteredProspects = SAMPLE_PROSPECTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || p.industry.toLowerCase().includes(industryFilter.toLowerCase());
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pt-20 pb-24 overflow-x-hidden">
      
      {/* 1. SEO Head & Structured Data Schema */}
      <SEOHead 
        title="B2B Lead Finder & Verified Prospect Database | Outtricks"
        description="Build high-intent B2B prospect lists with 480M+ verified profiles, advanced ICP filters, technographic data, and real-time buying signals on Outtricks."
        canonical="https://outtricks.com/platform/lead-finder"
        keywords={[
          'B2B lead finder',
          'B2B lead generation',
          'B2B prospecting',
          'verified B2B leads',
          'sales prospecting',
          'lead database',
          'ICP targeting',
          'buyer intent data',
          'verified business emails',
          'B2B contact database'
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Platform', url: 'https://outtricks.com/platform' },
          { name: 'Lead Finder', url: 'https://outtricks.com/platform/lead-finder' }
        ]}
        faqs={LEAD_FINDER_FAQS}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Outtricks Lead Finder",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, Cloud",
          "description": "Enterprise B2B Lead Finder with 480M+ verified profiles, MultiDimensional Lead Search, and real-time buying intent filters.",
          "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD"
          }
        }}
      />

      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE DATA ENGINE VISUAL
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Ambient Atmosphere Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">Lead Finder</span>
          </nav>

          {/* Hero Main Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#2563eb]" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                B2B PROSPECT DISCOVERY ENGINE
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              Find the Right B2B Prospects{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Before You Start Outreach
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto font-sans">
              Build highly targeted prospect lists using verified B2B data, advanced ICP filters, firmographic signals, job titles, company attributes, technology data, and real-time buying signals. Turn raw data into high-intent qualified pipeline.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href="#lead-finder-sandbox"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
              >
                <span>Explore Lead Finder</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:border-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group font-sans"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto border-t border-slate-200/60 dark:border-white/[0.07]">
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">480M+</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Verified B2B Profiles</div>
              </div>
              <div className="text-center space-y-0.5 border-x border-slate-200/60 dark:border-white/[0.07]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">99.4%</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Inbox Deliverability</div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">15</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Lead Data Providers</div>
              </div>
            </div>

          </div>

          {/* =====================================================================
              HERO VISUAL: INTERACTIVE LEAD FINDER PRODUCT COCKPIT
              ===================================================================== */}
          <div id="lead-finder-sandbox" className="pt-4 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-4 sm:p-7 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6">
              
              {/* Cockpit Header & Filter Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.07] pb-5">
                
                {/* Search Bar Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, company, job title, or technology (e.g. Stripe, VP Growth, Salesforce)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  />
                </div>

                {/* Industry Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-bold text-slate-800 dark:text-slate-200 font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Industries (240+ Sectors)</option>
                    <option value="SaaS">Enterprise B2B SaaS</option>
                    <option value="FinTech">FinTech & Payments</option>
                    <option value="Data">Data Infrastructure</option>
                    <option value="Security">Cloud Security & DevOps</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-sans border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5" /> multiDimensional search Active
                  </span>
                </div>

              </div>

              {/* Cockpit Main Grid: Split List and Live Intelligence Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Prospect List Table (7 Cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 font-sans px-1">
                    <span>MATCHED DECISION MAKERS ({filteredProspects.length})</span>
                    <span>1-CLICK ACTIVATE</span>
                  </div>

                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {filteredProspects.map((prospect, idx) => {
                      const isSelected = activeProspect.id === prospect.id;

                      return (
                        <div
                          key={prospect.id}
                          onClick={() => setSelectedProspectIndex(SAMPLE_PROSPECTS.findIndex(p => p.id === prospect.id))}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                              : 'bg-slate-50/60 dark:bg-[#1C1C1C] border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={prospect.avatar}
                              alt={prospect.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-sans">
                                  {prospect.name}
                                </h4>
                                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                                  {prospect.icpScore}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                                {prospect.title} • <span className="font-bold text-slate-700 dark:text-slate-300">{prospect.company}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="hidden sm:inline-flex px-2 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-sans">
                              {prospect.industry}
                            </span>
                            <div className="p-1.5 rounded-lg bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] text-blue-600 dark:text-blue-400">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Verified Prospect Inspector Card (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-4">
                    
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-[#202020]">
                      <div className="flex items-center gap-3">
                        <img
                          src={activeProspect.avatar}
                          alt={activeProspect.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
                        />
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans">{activeProspect.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">{activeProspect.title}</p>
                          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 font-sans">{activeProspect.company}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-sans border border-emerald-500/20">
                        Verified Contact
                      </span>
                    </div>

                    {/* Contact & Firmographics Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Verified Work Email</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white truncate block text-[11px]">
                          {activeProspect.email}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Direct Mobile Dial</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-[11px]">
                          {activeProspect.phone}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Company Headcount</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                          {activeProspect.headcount} Employees
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Annual Revenue</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                          {activeProspect.revenue}
                        </span>
                      </div>
                    </div>

                    {/* Technographic Stack Tags */}
                    <div className="space-y-1.5 font-sans">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Detected Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProspect.tech.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] text-[10px] font-mono text-slate-700 dark:text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Live Buying Intent Signal */}
                    <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 text-xs font-sans space-y-1">
                      <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 text-[11px]">
                        <Flame className="w-3.5 h-3.5 fill-current" /> Live Buying Intent Signal
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-snug">
                        {activeProspect.intentSignal}
                      </p>
                    </div>

                    {/* 1-Click Launch Button */}
                    <Link
                      to="/signup"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-sans text-center block transition-all shadow-md shadow-blue-500/25 cursor-pointer"
                    >
                      Activate in Campaign Cadence →
                    </Link>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: LEAD FINDER OVERVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8">
          
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              PLATFORM OVERVIEW
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Precision Prospecting Built for{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Predictable Revenue
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Traditional outbound prospecting is broken. Sales reps waste countless hours scouring outdated directory sites, formatting broken CSV spreadsheets, and sending cold emails to defunct mailboxes that burn sending domains. Outtricks unifies 480M+ decision-maker profiles with automated multiDimensional verification on a single connected database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">480M+ Global Index</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Access an exhaustive, continuously verified global B2B prospect database spanning enterprise, mid-market, and high-growth SMB companies worldwide.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">multiAttribute Validation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stop paying for single-source databases with 50% match rates. Our multiDimensional search verifies emails and mobile dials dynamically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Zero-ETL Activation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamlessly push filtered leads directly into multi-inbox cold email, LinkedIn sequences, Voice AI SDRs, or Deals CRM in seconds.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 8 INTERACTIVE SEARCH DIMENSIONS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              The 8 Dimensions of{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                B2B Prospect Data
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Click any data dimension below to explore how deep segmentation isolates high-converting buyers.
            </p>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-sans">
            {DIMENSIONS_DATA.map((dim, idx) => {
              const Icon = dim.icon;
              const isSelected = selectedDimensionIndex === idx;

              return (
                <button
                  key={dim.id}
                  onClick={() => setSelectedDimensionIndex(idx)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/60 dark:bg-[#1C1C1C]/80 border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg w-fit ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-400'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {dim.title.split('. ')[1]}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-sans">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                  {activeDimension.badge}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {activeDimension.metrics}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                {activeDimension.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeDimension.description}
              </p>
            </div>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-sans whitespace-nowrap transition-all shadow-md shadow-blue-500/25"
            >
              Filter Prospects Live →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW LEAD FINDER WORKS (6-Step Workflow)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-50 to-white dark:from-[#0b101f] dark:to-[#060913] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-10 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              How Lead Finder{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Works in 6 Steps
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              From defining your Ideal Customer Profile to launching verified multi-channel outbound campaigns in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Discover', desc: 'Define target criteria across 480M+ global profiles by company size, industry, role, and geography.' },
              { step: '02', title: 'Filter', desc: 'Layer advanced technographic software tags and exact decision-maker job title hierarchies.' },
              { step: '03', title: 'Verify', desc: 'Cascade queries across 15 premier validation sources for real-time MX deliverability verification.' },
              { step: '04', title: 'Identify Intent', desc: 'Prioritize accounts undergoing hiring surges, funding rounds, and software migration signals.' },
              { step: '05', title: 'Build List', desc: 'Group verified decision-makers into organized dynamic lists with automatic Contact search.' },
              { step: '06', title: 'Activate Outreach', desc: 'Push lists directly into multi-inbox cold email, LinkedIn sequences, Voice SDRs, or Deals CRM.' }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{step.step} {step.title.toUpperCase()}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ICP BUILDER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Define Your Ideal Customer Profile with{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                MultiDimensional Data
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Stop relying on generic databases that return irrelevant leads. Outtricks lets you construct granular, high-conversion ICP definitions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-xl font-sans">
            
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                Beyond Basic Job Titles & Headcount
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Most outbound campaigns fail because prospect lists are built on surface-level filters. Two companies with 100 employees in "Software" can have completely different budgets, tech stacks, and buying readiness.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Technographic Matching:</strong> Target companies running complementary software (e.g., Salesforce + Snowflake).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Hiring Velocity:</strong> Filter accounts actively recruiting for specific technical roles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Revenue & Growth:</strong> Focus your reps on high-LTV accounts with verified purchasing power.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">EXAMPLE ICP DEFINITION MATRIX</span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Industry Vertical</span>
                  <span className="font-bold text-slate-900 dark:text-white">Enterprise B2B SaaS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Employee Range</span>
                  <span className="font-bold text-slate-900 dark:text-white">50 – 500 Employees</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Annual Revenue</span>
                  <span className="font-bold text-slate-900 dark:text-white">$10M – $50M ARR</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Installed Tech</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">Salesforce, Stripe, AWS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Intent Trigger</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Hiring SDRs / Recent Funding</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: VERIFIED DATA & multiAttribute search
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              MultiDimensional Lead Search for{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Zero Bounce Rates
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Why accurate contact data is the single most critical factor in outbound sales success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">99.4% DELIVERABILITY</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Real-Time MX Handshakes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We perform live SMTP handshakes directly with recipient mail servers to verify inbox existence without sending an email.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">DOMAIN PROTECTION</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Spam-Trap Suppression</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Continuous filtering removes honeypots, spam traps, and dead catch-all domains before they can harm your sender score.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">91.4% MATCH RATE</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">multiDimensional search</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If Provider 1 lacks a direct mobile or verified email, Outtricks instantly queries Provider 2, 3, through 15 sequentially.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BUYING INTENT SIGNALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Prioritize Accounts with Active{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Buying Intent Signals
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Reach out when decision-makers are actively evaluating solutions, expanding teams, or deploying new budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Hiring Surges</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Identify companies rapidly adding SDRs, engineers, or RevOps leaders signaling budget allocation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Funding Rounds</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Target accounts within 30–90 days of announcing new Seed, Series A, B, or growth funding rounds.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Tech Migrations</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Detect when an account installs or uninstalls complementary software or competitor tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Leadership Changes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Engage new VPs and C-level executives in their first 90 days when they evaluate new software stacks.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: USE CASES (6 ICP Personas)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Lead Finder for Every{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Team
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Tailored prospecting workflows engineered for sales teams, agencies, founders, and RevOps leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
            
            {/* Left: Persona Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {USE_CASES.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => setActiveUseCaseId(uc.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    activeUseCaseId === uc.id
                      ? 'bg-white dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/60 dark:bg-[#0b101f] border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                  }`}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">{uc.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5 line-clamp-1">{uc.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Right: Persona Deep Dive */}
            <div className="lg:col-span-8">
              {(() => {
                const uc = USE_CASES.find((item) => item.id === activeUseCaseId) || USE_CASES[0];
                return (
                  <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans">AUDIENCE PLAYBOOK</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white font-sans mt-1">
                        {uc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">{uc.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                      <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 space-y-1">
                        <span className="font-bold text-rose-800 dark:text-rose-300 uppercase text-[10px]">The Challenge</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{uc.pain}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 uppercase text-[10px]">Outtricks Solution</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{uc.solution}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1 font-sans">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Example Filter Query</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">
                        {uc.filterExample}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-white/[0.04] border border-blue-200/60 dark:border-blue-900/30 space-y-1 font-sans">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Measurable Outcome</span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-bold">{uc.result}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: LEAD FINDER VS TRADITIONAL LEAD DATABASES (Comparison Table)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Lead Finder vs.{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Traditional Databases
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              See why static lead downloads are obsolete and how unified, verified contact data drives higher ROI.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px] font-sans">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A]">
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/3">Dimension</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">Traditional Lead Databases</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 w-1/3">Outtricks Lead Finder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] text-xs sm:text-sm">
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Data Freshness</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Static quarterly CSV updates (high data decay)</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Continuously updated 24/7 global index</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Email Deliverability</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">50–70% (causes high domain bounce rates)</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">99.4% with multiDimensional query filters</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Technographic Tracking</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Limited to basic website CMS tags</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">8,000+ deep software and infrastructure tools</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Buying Intent Signals</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Expensive third-party add-on or unavailable</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Native real-time hiring & funding triggers</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Campaign Activation</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual CSV export/import & Zapier bridges</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">1-click direct push to Email, LinkedIn & Voice SDR</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Pricing Model</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Rigid annual contracts + expensive per-seat fees</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Transparent monthly tiers with zero seat penalties</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BENEFITS (Outcomes-Focused)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Tangible Outcomes for{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Growth
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience the direct operational and financial advantages of precision B2B prospecting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">70% Less</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Research Time</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Reps stop searching across LinkedIn and spreadsheets manually, recovering 8+ hours every week.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans">99.4%</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Inbox Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Eliminate email bounces and preserve sending domain reputations permanently with real-time MX checks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-sans">3.2x Higher</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Response Rates</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Targeting high-intent accounts with relevant technographic context dramatically increases reply rates.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">0-ETL</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Instant Activation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Move leads directly from search results into active multi-inbox campaigns in one synchronized workflow.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FREQUENTLY ASKED QUESTIONS (10 Questions)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 font-sans">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Frequently Asked{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Everything you need to know about Outtricks Lead Finder, data accuracy, contact search, and filters.
            </p>
          </div>

          <div className="space-y-3">
            {LEAD_FINDER_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#0b101f] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#202020] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: FINAL CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-700 text-white p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider font-sans border border-white/20">
            START PROSPECTING TODAY
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Build Your High-Intent B2B{' '}
            <span className="font-serif italic font-normal underline decoration-white/30">
              Pipeline Faster.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
            Access 480M+ verified profiles with multiAttribute search Contact Search and start engaging ready-to-buy decision-makers in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Explore Lead Finder
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Book a Demo
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
