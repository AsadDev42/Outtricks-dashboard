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
  Globe,
  Filter,
  Download
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface B2BProspect {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  headcount: string;
  industry: string;
  techStack: string[];
  icpScore: number;
  intentSignal: string;
  revenueTier: string;
  funding: string;
  verificationStatus: 'verified' | 'catchall';
}

interface DiscoveryStage {
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

const SAMPLE_B2B_PROSPECTS: B2BProspect[] = [
  {
    id: 'p1',
    name: 'Sarah Jenkins',
    role: 'VP of Growth',
    company: 'CloudScale AI',
    email: 'sarah.jenkins@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    location: 'San Francisco, CA',
    avatar: 'SJ',
    headcount: '120–250',
    industry: 'B2B SaaS / AI Infrastructure',
    techStack: ['Salesforce', 'HubSpot', 'Stripe', 'BigQuery'],
    icpScore: 98,
    intentSignal: 'Hiring 4 Outbound SDRs • Visited pricing page 3x',
    revenueTier: '$15M–$30M ARR',
    funding: 'Series B ($24M Raised)',
    verificationStatus: 'verified'
  },
  {
    id: 'p2',
    name: 'Marcus Vance',
    role: 'Head of Outbound',
    company: 'HyperGrowth Labs',
    email: 'marcus@hypergrowth.io',
    phone: '+1 (512) 473-1980',
    location: 'Austin, TX',
    avatar: 'MV',
    headcount: '50–100',
    industry: 'Sales Tech / Growth Agency',
    techStack: ['Smartlead', 'PostgreSQL', 'Apollo'],
    icpScore: 96,
    intentSignal: 'Scaling outbound pipeline to $200k MRR this quarter',
    revenueTier: '$5M–$10M ARR',
    funding: 'Series A ($8M Raised)',
    verificationStatus: 'verified'
  },
  {
    id: 'p3',
    name: 'Elena Rostova',
    role: 'Chief Revenue Officer',
    company: 'FinTech Stack',
    email: 'elena.rostova@fintechstack.com',
    phone: '+44 20 7946 0912',
    location: 'London, UK',
    avatar: 'ER',
    headcount: '300–600',
    industry: 'FinTech / B2B Payments',
    techStack: ['Salesforce', 'ZoomInfo', 'Salesloft'],
    icpScore: 94,
    intentSignal: 'Replacing disconnected Clay & Apollo stack with unified CRM',
    revenueTier: '$45M–$80M ARR',
    funding: 'Series C ($65M Raised)',
    verificationStatus: 'verified'
  },
  {
    id: 'p4',
    name: 'David Chen',
    role: 'Director of Demand Generation',
    company: 'SaaSFlow Corp',
    email: 'david.chen@saasflow.co',
    phone: '+1 (212) 658-4421',
    location: 'New York, NY',
    avatar: 'DC',
    headcount: '80–150',
    industry: 'Workflow Automation',
    techStack: ['HubSpot', 'Lemlist', 'Gong'],
    icpScore: 91,
    intentSignal: 'Fixing deliverability and spam placement across 12 inboxes',
    revenueTier: '$10M–$20M ARR',
    funding: 'Series A ($12M Raised)',
    verificationStatus: 'catchall'
  }
];

const DISCOVERY_STAGES: DiscoveryStage[] = [
  { id: 'd1', stepNum: '01', title: 'Search', shortDesc: 'Query 480M+ global profiles across 8 dimensions.', actionText: 'Instant SQL Query', icon: Search },
  { id: 'd2', stepNum: '02', title: 'Filter ICP', shortDesc: 'Apply headcount, technographics & hiring intent filters.', actionText: 'Zero noise matching', icon: Filter },
  { id: 'd3', stepNum: '03', title: 'Verify', shortDesc: 'Real-time SMTP handshake & catch-all sandbox check.', actionText: '99.8% valid emails', icon: ShieldCheck },
  { id: 'd4', stepNum: '04', title: 'multiAttribute Verify', shortDesc: 'Cascade through multiDimensional filters for direct mobile phones.', actionText: '85%+ match rate', icon: Database },
  { id: 'd5', stepNum: '05', title: 'Save & Dispatch', shortDesc: 'Push verified list straight into multi-inbox sequences.', actionText: '0 CSV exports needed', icon: Send }
];

const LEAD_GEN_FAQS: FaqItem[] = [
  {
    question: 'How large is the Outtricks B2B prospect database?',
    answer: 'Outtricks indexes over 480 Million verified business profiles and 48 Million company records globally, refreshed continuously on a 30-day verification cycle.'
  },
  {
    question: 'Can I filter prospects by job title, tech stack, and buying intent?',
    answer: 'Yes! You can filter across 8 dimensions: exact job titles, seniority levels, company size, geographic location, installed tech stack (e.g. Salesforce, HubSpot, Stripe), funding rounds, and real-time hiring intent signals.'
  },
  {
    question: 'Are emails verified in real time before sending?',
    answer: 'Yes. Outtricks executes real-time SMTP handshakes, MX record lookups, and catch-all sandbox pings before you export or dispatch to any contact, guaranteeing less than 0.5% bounce rates.'
  },
  {
    question: 'Can I export leads to CSV or push them directly into campaigns?',
    answer: 'Both! You can download clean CSV files with full technographic data, or in 1 click push verified contacts directly into 24-inbox cold email and LinkedIn sequences with 0 sync delay.'
  },
  {
    question: 'Can leads automatically enter outbound campaigns as they match criteria?',
    answer: 'Yes! With Flow Builder, you can create continuous autonomous lead ingestion workflows (e.g. "Whenever a new B2B SaaS company in the US raises Series A and hires SDRs → Auto-Verify VP of Growth → Dispatch Sequence #1").'
  },
  {
    question: 'How does Outtricks compare to buying static Apollo or ZoomInfo lists?',
    answer: 'Static CSV lists decay at ~3% per month and result in high bounce rates and burnt sending domains. Outtricks provides real-time contact search across 15 sources and integrates directly with your sending inboxes.'
  },
  {
    question: 'How many credits are included in the 7-day free trial?',
    answer: 'Your 7-Day Free Trial includes instant access to the 480M+ lead search, contact search verification, and live sandbox campaign dispatching so you can test data quality risk-free.'
  }
];

export const LeadGenUseCasePage: React.FC = () => {
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSeniority, setSelectedSeniority] = useState('all');

  // Selected Prospect Drawer State
  const [selectedProspect, setSelectedProspect] = useState<B2BProspect | null>(null);

  // Discovery Sequence Animation State
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isSeqPlaying, setIsSeqPlaying] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance Discovery sequence
  useEffect(() => {
    if (!isSeqPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % DISCOVERY_STAGES.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isSeqPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredProspects = SAMPLE_B2B_PROSPECTS.filter(p => {
    const matchesSearch = searchKeyword === '' ||
      p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      p.role.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesIndustry = selectedIndustry === 'all' ||
      (selectedIndustry === 'saas' && p.industry.includes('SaaS')) ||
      (selectedIndustry === 'fintech' && p.industry.includes('FinTech')) ||
      (selectedIndustry === 'agency' && p.industry.includes('Agency'));

    const matchesSeniority = selectedSeniority === 'all' ||
      (selectedSeniority === 'csuite' && (p.role.includes('CRO') || p.role.includes('VP'))) ||
      (selectedSeniority === 'director' && p.role.includes('Director')) ||
      (selectedSeniority === 'head' && p.role.includes('Head'));

    return matchesSearch && matchesIndustry && matchesSeniority;
  });

  const activeStage = DISCOVERY_STAGES[activeStageIdx];
  const ActiveStageIcon = activeStage.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="B2B Lead Generation Playbook with 480M+ Database | Outtricks"
        description="Build hyper-targeted prospect lists using 8-dimension filtering, verified emails, and direct phone numbers."
        canonical="https://outtricks.com/use-cases/lead-generation"
        keywords={["B2B lead generation playbook","prospect list building","verified contact data","outbound lead gen"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"B2B Lead Generation","url":"/use-cases/lead-generation"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Find the Buyers Your Business Actually Wants)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            B2B LEAD GENERATION
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Find the Buyers<br className="hidden sm:inline" /> Your Business Actually Wants
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Search millions of B2B prospects, filter by your ICP, verify contact information, and build targeted lists ready for outreach.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Find Your Prospects</span>
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
            <span className="text-[10px] text-slate-400 block uppercase">GLOBAL B2B POOL</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">480M+ Contacts</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">SEARCH FILTERING</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">8-Dimension Filters</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">multiAttribute MATCH</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">85%+ Contact Search Match</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">FILE EXPORTS</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0 CSV Exports Needed</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: ICP BUILDER (Start With Your Ideal Customer Profile)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            GRANULAR PROSPECTING FILTERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Start With Your Ideal Customer Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Zero in on target accounts using 8 granular dimensions to match buyers with active budget and intent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">JOB TITLES & ROLES</span>
            <div className="flex flex-wrap gap-1.5">
              {['VP of Growth', 'CRO', 'Head of Outbound', 'Director Demand Gen'].map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-white/[0.04] text-blue-700 dark:text-blue-300 border border-blue-200/60">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">COMPANY SIZE & REVENUE</span>
            <div className="flex flex-wrap gap-1.5">
              {['50–200 Employees', '200–500 Employees', '$10M–$50M ARR', 'Series A / B'].map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">TECH STACK FILTERS</span>
            <div className="flex flex-wrap gap-1.5">
              {['Salesforce', 'HubSpot', 'Stripe', 'BigQuery', 'PostgreSQL'].map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-[#181818] text-slate-700 dark:text-slate-300 border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <span className="text-emerald-600 block text-[10px] font-bold uppercase">BUYING INTENT SIGNALS</span>
            <div className="flex flex-wrap gap-1.5">
              {['Hiring 3+ SDRs', 'Recent Series Funding', 'Visited /pricing 3x'].map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: SEARCH VERIFIED B2B PROFILES (Interactive Lead Finder UI)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LIVE DIRECTORY PREVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Search Verified B2B Profiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Click any prospect row to inspect verified work emails, direct mobile dials, and company technographics.
          </p>
        </div>

        {/* Lead Table Container */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          
          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-2">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, role, company..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div className="sm:col-span-3">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="all">All Industries (480M+ Pool)</option>
                <option value="saas">B2B SaaS / Infrastructure</option>
                <option value="fintech">FinTech / Payments</option>
                <option value="agency">Sales Tech & Growth</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <select
                value={selectedSeniority}
                onChange={(e) => setSelectedSeniority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="all">All Seniority Tiers</option>
                <option value="csuite">C-Suite / VP Level</option>
                <option value="director">Director Level</option>
                <option value="head">Head of Department</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:bg-[#181818] text-[11px] font-sans font-bold text-slate-500">
                    <th className="py-3 px-4">PROSPECT</th>
                    <th className="py-3 px-3">TITLE & ROLE</th>
                    <th className="py-3 px-3">COMPANY</th>
                    <th className="py-3 px-3">VERIFIED EMAIL</th>
                    <th className="py-3 px-3">DIRECT PHONE</th>
                    <th className="py-3 px-3">LOCATION</th>
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
                      <td className="py-3.5 px-3 font-sans text-[11px] text-slate-600 dark:text-slate-300">
                        {prospect.phone}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500">
                        {prospect.location}
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
            <span>Showing verified decision makers • Real-time SMTP validated</span>
            <span className="text-emerald-600 font-bold">● 100% Bounce-Free Guarantee</span>
          </div>

        </div>

      </section>

      {/* Prospect Profile Drawer Modal */}
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
                <span className="text-slate-500">Verified Work Email:</span>
                <strong className="text-blue-600 dark:text-blue-400 font-bold">{selectedProspect.email}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Direct Mobile Phone:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedProspect.phone}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-500">Company Headcount & Rev:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedProspect.headcount} • {selectedProspect.revenueTier}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 space-y-1">
                <span className="text-slate-400 block text-[10px]">Detected Technographic Stack:</span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {selectedProspect.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white dark:bg-[#141414] border text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="text-blue-600 dark:text-blue-400 block text-[10px] font-bold uppercase">Buying Intent Signal:</span>
                <p className="text-blue-950 dark:text-blue-100 font-sans font-semibold text-xs">
                  {selectedProspect.intentSignal}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setSelectedProspect(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Push to Outbound Sequence</span>
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
          SECTION 4: GO BEYOND BASIC CONTACT DATA (Lead Search)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DEEP Contact Search
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Go Beyond Basic Contact Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Access full account context including funding, headcount velocity, installed software, and buying triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Company Information', desc: 'Verified website domains, headquarters, corporate descriptions, and LinkedIn company pages.', icon: Building2 },
            { title: 'Employee Count & Growth', desc: 'Headcount velocity tracking across engineering, sales, and executive departments.', icon: Users },
            { title: 'Installed Technologies', desc: 'Real-time technographic detection of CRM, email sequencers, billing APIs, and data warehouses.', icon: Layers },
            { title: 'Revenue & Headcount Tiers', desc: 'Verified annual recurring revenue ranges and employee tier classifications.', icon: DollarSign },
            { title: 'Funding & Investors', desc: 'Seed, Series A/B/C stages, total capital raised, and lead institutional venture investors.', icon: TrendingUp },
            { title: 'Real-Time Intent Signals', desc: 'Active job openings, website pricing page visits, and technology migration triggers.', icon: Flame }
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ItemIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: BUILD LISTS IN SECONDS (Interactive Discovery Workflow)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              DISCOVERY CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Build Lists in Seconds
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

        {/* 5 Progression Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DISCOVERY_STAGES.map((st, idx) => {
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
              </button>
            );
          })}
        </div>

        {/* Active Stage Card */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStageIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  DISCOVERY STAGE {activeStage.stepNum}
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
          SECTION 6: ICP / INTENT SCORING
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRIORITIZATION ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Know Which Leads Matter Most
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Outtricks scores prospects based on firmographic ICP fit, real-time intent signals, and email deliverability.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1.5">
              <span className="text-blue-600 font-bold block text-[10px] uppercase">1. FIRMOGRAPHIC FIT (50%)</span>
              <strong className="text-slate-900 dark:text-white text-sm block">VP / C-Level & $10M+ ARR</strong>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">Matches exact target headcount and SaaS vertical.</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-1.5">
              <span className="text-blue-600 font-bold block text-[10px] uppercase">2. INTENT SIGNALS (30%)</span>
              <strong className="text-slate-900 dark:text-white text-sm block">Hiring SDRs & Visited Pricing</strong>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">Active buying triggers detected in the last 48 hours.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
              <span className="text-emerald-600 font-bold block text-[10px] uppercase">3. DATA ACCURACY (20%)</span>
              <strong className="text-slate-900 dark:text-white text-sm block">100% SMTP Handshake Pass</strong>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">Zero bounce risk with direct cell phone verified.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-400" />
              <div>
                <span className="text-[10px] font-sans text-emerald-400 font-bold uppercase block">COMPOSITE ICP PRIORITY SCORE</span>
                <strong className="text-base font-bold">98 / 100 • Tier-1 Immediate Outbound Candidate</strong>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-sans font-bold">
              Auto-Dispatched
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: LEAD-TO-OUTREACH WORKFLOW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Send Leads Directly Into Your Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            From search to closed deal, data flows seamlessly across all 6 outbound engines on 1 PostgreSQL database.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-sans text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">1. LEAD FINDER</span>
              <strong className="text-slate-900 dark:text-white block truncate">480M+ ICP Match</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">2. COLD EMAIL</span>
              <strong className="text-slate-900 dark:text-white block truncate">24 Inboxes Rotator</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">3. LINKEDIN</span>
              <strong className="text-slate-900 dark:text-white block truncate">Safe Cloud Proxies</strong>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 space-y-1">
              <span className="text-emerald-600 font-bold block">4. VOICE AI SDR</span>
              <strong className="text-emerald-950 dark:text-emerald-200 block truncate">&lt;400ms Turn Latency</strong>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-blue-600 text-white space-y-1 shadow-sm">
              <span className="text-blue-100 font-bold block">5. DEALS CRM</span>
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
            <span>GLOBAL B2B DIRECTORY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Start Finding High-Intent B2B Prospects Today
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Access 480M+ verified contacts, filter by your ICP, and launch outreach campaigns instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Find Your Prospects</span>
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
          7-Day Free Trial • 480M+ Verified Contacts • 0 CSV Exports Needed
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            LEAD GENERATION QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {LEAD_GEN_FAQS.map((faq, fIdx) => {
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
