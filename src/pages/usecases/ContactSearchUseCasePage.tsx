import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Database, 
  Search, 
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
  RefreshCw,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface SearchStep {
  id: string;
  stepNum: string;
  providerName: string;
  actionSummary: string;
  returnedData: {
    emailStatus: string;
    phoneStatus: string;
    techStackStatus: string;
    note: string;
  };
  icon: any;
  statusBadge: 'Searching' | 'Missing Phone' | 'Found Phone' | 'Verified Email' | '100% Complete';
}

interface FaqItem {
  question: string;
  answer: string;
}

const SEARCH_STEPS: SearchStep[] = [
  {
    id: 'w1',
    stepNum: '01',
    providerName: 'Provider 1 (Apollo / ZoomInfo)',
    actionSummary: 'Queries primary B2B directory for work email and cell phone.',
    returnedData: {
      emailStatus: 'Found: info@cloudscale.ai (Generic)',
      phoneStatus: 'Missing (Null)',
      techStackStatus: 'Salesforce, HubSpot',
      note: 'Generic mailbox returned. Cascading to Provider 2...'
    },
    icon: Database,
    statusBadge: 'Missing Phone'
  },
  {
    id: 'w2',
    stepNum: '02',
    providerName: 'Provider 2 (Datanyze / Clearbit)',
    actionSummary: 'Verifyes direct mobile phone number & executive job title.',
    returnedData: {
      emailStatus: 'Found: sarah.j@cloudscale.ai (Unverified)',
      phoneStatus: 'Found: +1 (415) 892-4910 (Telco Verified)',
      techStackStatus: 'Stripe, BigQuery, AWS',
      note: 'Mobile number secured! Cascading for real-time SMTP email verification...'
    },
    icon: PhoneCall,
    statusBadge: 'Found Phone'
  },
  {
    id: 'w3',
    stepNum: '03',
    providerName: 'Provider 3 (Dropcontact / Hunter)',
    actionSummary: 'Executes real-time SMTP ping and MX record validation.',
    returnedData: {
      emailStatus: 'Verified: sarah.jenkins@cloudscale.ai (100% Valid)',
      phoneStatus: 'Confirmed: +1 (415) 892-4910',
      techStackStatus: 'PostgreSQL, Segment',
      note: 'SMTP handshake successful (Code 250 OK). Catch-all check initiated...'
    },
    icon: Mail,
    statusBadge: 'Verified Email'
  },
  {
    id: 'w4',
    stepNum: '04',
    providerName: 'Provider 4 (Catch-All Deep Sandbox)',
    actionSummary: 'Proprietary sandbox verifies mailbox response without bouncing.',
    returnedData: {
      emailStatus: 'Passed: 0% Bounce Risk (Deliverability 99.8%)',
      phoneStatus: 'Active Mobile Line (T-Mobile USA)',
      techStackStatus: 'Full Technographic Profile Complete',
      note: 'Sandbox verification complete. Contact profile 100% Verified.'
    },
    icon: ShieldCheck,
    statusBadge: '100% Complete'
  }
];

const SEARCH_FAQS: FaqItem[] = [
  {
    question: 'What is Lead Lead Search?',
    answer: 'Lead Lead Search cascades your prospect query through multiple data providers (up to 15 tier-1 sources) sequentially. If Provider 1 lacks a phone number or verified work email, the system automatically checks Provider 2, 3, and 4 until a 100% verified record is assembled.'
  },
  {
    question: 'How does provider fallback and credit saving work?',
    answer: 'Outtricks only charges credits when a valid, verified piece of contact data is retrieved. If Provider 1 returns null, you are not charged; the query passes seamlessly to the next provider until valid data is confirmed.'
  },
  {
    question: 'Are emails verified with real SMTP handshakes?',
    answer: 'Yes! Outtricks performs live SMTP handshakes, MX record checks, and deep catch-all sandbox validation before marking any email as "Verified", ensuring your cold campaigns maintain <0.5% bounce rates.'
  },
  {
    question: 'Can direct cell phone numbers be Verified and verified?',
    answer: 'Yes. Our multiAttribute engine connects with tier-1 telecom registries and mobile data providers to supply active direct mobile numbers with over 75% coverage across North America and Europe.'
  },
  {
    question: 'Does Verified contact data automatically sync with Deals CRM?',
    answer: 'Yes. All verified work emails, phone numbers, tech stacks, and company firmographics write natively to 1 PostgreSQL core database, immediately updating your CRM and active campaign sequences with 0ms sync lag.'
  },
  {
    question: 'Can I upload an existing CSV list for contact search?',
    answer: 'Yes! You can upload any CSV with partial data (e.g. just names and website domains), and Outtricks will automatically fill in missing verified emails, direct dials, LinkedIn URLs, and company tech stacks.'
  },
  {
    question: 'Is there a free trial for contact search?',
    answer: 'Yes! Your 7-Day Free Trial includes contact search credits to test coverage, data completeness, and SMTP accuracy against your actual target prospect lists.'
  }
];

export const ContactSearchUseCasePage: React.FC = () => {
  // multiAttribute Demo State
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Auto-advance multiAttribute loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % SEARCH_STEPS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const activeStep = SEARCH_STEPS[activeStepIdx];
  const ActiveStepIcon = activeStep.icon;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="multiAttribute search Lead Search Workflows | Outtricks"
        description="Cascade searches across 15 premium data providers in real time for 99.4% verified emails and mobile numbers."
        canonical="https://outtricks.com/use-cases/lead-Contact Search"
        keywords={["contact search playbook","data verification cascading","direct dial discovery","email validation"]}
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Lead Lead Search","url":"/use-cases/lead-Contact Search"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (Get the Contact Data Others Miss)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            contact search ENGINE
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Get the Contact Data<br className="hidden sm:inline" /> Others Miss
        </h1>

        {/* Subtext */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Combine multiple data providers into one intelligent Contact Search workflow to improve coverage, accuracy, and contact completeness.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start contact search</span>
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
            <span className="text-[10px] text-slate-400 block uppercase">DATA SOURCES</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">15 Tier-1 Providers</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">MATCH COVERAGE</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">85%+ Total Match</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-emerald-600 block uppercase">SMTP ACCURACY</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">99.8% Handshake Pass</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs text-center space-y-1">
            <span className="text-[10px] text-blue-600 block uppercase">CREDIT EFFICIENCY</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0 Wasted Credits</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: MULTI-PROVIDER multiAttribute (One Search. Multiple Data Providers.)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CASCADE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            One Search. Multiple Data Providers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Queries cascade automatically across top providers in real time until every contact field is validated.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-sans text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">SOURCE 01</span>
            <strong className="text-slate-900 dark:text-white block">Apollo / ZoomInfo</strong>
            <span className="text-slate-500 text-[10px] block">Primary B2B Core</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] block font-bold">SOURCE 02</span>
            <strong className="text-slate-900 dark:text-white block">Clearbit / Datanyze</strong>
            <span className="text-slate-500 text-[10px] block">Technographic Match</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-blue-600 dark:text-blue-400 text-[10px] block font-bold">SOURCE 03</span>
            <strong className="text-slate-900 dark:text-white block">Dropcontact / Hunter</strong>
            <span className="text-slate-500 text-[10px] block">SMTP Handshake</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-1">
            <span className="text-emerald-600 text-[10px] block font-bold">SOURCE 04</span>
            <strong className="text-slate-900 dark:text-white block">Direct Telco Registry</strong>
            <span className="text-slate-500 text-[10px] block">Mobile Line Verify</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-blue-600 text-white space-y-1 shadow-md">
            <span className="text-blue-100 text-[10px] block font-bold">FINAL RESULT</span>
            <strong className="text-white block">100% Verified ✓</strong>
            <span className="text-blue-100 text-[10px] block">0% Bounce Rate</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: COMPLETE CONTACT PROFILES
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            RICH FIRMOGRAPHICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Build Complete Contact Profiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Every contact record contains verified communication channels and deep technographic intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">WORK EMAIL</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold text-[10px]">100% Valid SMTP</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">sarah.jenkins@cloudscale.ai</strong>
            <p className="text-slate-500 font-sans text-xs">Real-time code 250 handshake confirmation.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">DIRECT MOBILE PHONE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold text-[10px]">Active Carrier Line</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">+1 (415) 892-4910</strong>
            <p className="text-slate-500 font-sans text-xs">Verified direct mobile dial (T-Mobile USA).</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">JOB TITLE & SENIORITY</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 font-bold text-[10px]">Executive Tier</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">VP of Growth</strong>
            <p className="text-slate-500 font-sans text-xs">Executive decision-maker with buying authority.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">COMPANY & REVENUE</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-slate-600 font-bold text-[10px]">Series B Funded</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">CloudScale AI • $25M ARR</strong>
            <p className="text-slate-500 font-sans text-xs">120-250 employees based in San Francisco, CA.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">TECHNOGRAPHIC STACK</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 font-bold text-[10px]">5 Techs Detected</span>
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block">Salesforce, HubSpot, Stripe</strong>
            <p className="text-slate-500 font-sans text-xs">Plus BigQuery, Segment, and AWS cloud hosting.</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-600 text-[10px] font-bold uppercase">BUYING INTENT SIGNAL</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">High Intent (98%)</span>
            </div>
            <strong className="text-emerald-900 dark:text-emerald-200 text-sm block">Hiring 4 Outbound SDRs</strong>
            <p className="text-emerald-700 dark:text-emerald-300 font-sans text-xs">Active job posting detected in last 48 hours.</p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: AUTOMATED MISSING-DATA DISCOVERY (Interactive multiAttribute Demo)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              INTERACTIVE multiAttribute SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Let the System Find the Missing Data
            </h2>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause multiAttribute' : 'Resume multiAttribute'}</span>
          </button>
        </div>

        {/* 4 Provider Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SEARCH_STEPS.map((st, idx) => {
            const StIcon = st.icon;
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setActiveStepIdx(idx);
                  setIsPlaying(false);
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
                <strong className="block text-xs font-bold truncate">{st.providerName}</strong>
                <span className={`text-[10px] font-sans block ${isSelected ? 'text-blue-100' : 'text-emerald-600 font-bold'}`}>
                  {st.statusBadge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Provider Data Inspector */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <ActiveStepIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-400 uppercase">
                  multiAttribute STEP {activeStep.stepNum} • {activeStep.providerName}
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {activeStep.actionSummary}
                </h4>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-sans font-bold">
              {activeStep.statusBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">EMAIL STATUS:</span>
              <strong className="text-blue-400 block mt-0.5">{activeStep.returnedData.emailStatus}</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PHONE STATUS:</span>
              <strong className="text-emerald-400 block mt-0.5">{activeStep.returnedData.phoneStatus}</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">DETECTED TECH:</span>
              <strong className="text-blue-400 block mt-0.5">{activeStep.returnedData.techStackStatus}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            <strong className="text-emerald-400">System Log:</strong> {activeStep.returnedData.note}
          </p>
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: VERIFICATION (Verify Before You Reach Out)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DELIVERABILITY PROTECTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Verify Before You Reach Out
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Never risk burnt domains or blacklists. Outtricks tags every record with strict deliverability indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <strong className="text-emerald-900 dark:text-emerald-200 text-sm block">1. Verified (Safe)</strong>
            <p className="text-emerald-800 dark:text-emerald-300 font-sans text-xs">
              100% SMTP handshake passed (Code 250 OK). Safe for multi-inbox campaigns.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <strong className="text-blue-900 dark:text-blue-200 text-sm block">2. Catch-All Sandbox</strong>
            <p className="text-blue-800 dark:text-blue-300 font-sans text-xs">
              Validated via proprietary deep sandbox simulation to eliminate soft bounces.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <strong className="text-amber-900 dark:text-amber-200 text-sm block">3. Missing (Suppressed)</strong>
            <p className="text-amber-800 dark:text-amber-300 font-sans text-xs">
              No valid email confirmed across multiDimensional filters. Automatically suppressed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 shadow-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
            <strong className="text-rose-900 dark:text-rose-200 text-sm block">4. Rejected (Risky)</strong>
            <p className="text-rose-800 dark:text-rose-300 font-sans text-xs">
              Spam trap, dead domain, or invalid MX record detected. Auto-blocked.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: COVERAGE COMPARISON
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            multiAttribute ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Improve Coverage Without Manual Research
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Compare single-vendor databases with Outtricks multi-provider contact search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-rose-200 dark:border-rose-900/60 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="font-extrabold text-base text-rose-600">Single Data Provider (e.g. Apollo Only)</h3>
              <span className="text-xs font-sans text-rose-500 font-bold">40–50% Match Rate</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-sans">
              <li className="flex items-center gap-2 text-rose-600">✕ Missing 50%+ of direct mobile numbers</li>
              <li className="flex items-center gap-2 text-rose-600">✕ Stale CSV exports decay at 3% monthly</li>
              <li className="flex items-center gap-2 text-rose-600">✕ High bounce rates (8–15%) burn sending domains</li>
              <li className="flex items-center gap-2 text-rose-600">✕ Wasted credits on invalid email guesses</li>
            </ul>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-300 dark:border-blue-800 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200 dark:border-blue-800">
              <h3 className="font-extrabold text-base text-blue-600 dark:text-blue-400">Outtricks 15-Source multiAttribute</h3>
              <span className="text-xs font-sans text-emerald-600 font-bold">85%+ Match Rate</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200 font-sans">
              <li className="flex items-center gap-2 text-emerald-600 font-bold">✓ 75%+ direct mobile phone coverage</li>
              <li className="flex items-center gap-2 text-emerald-600 font-bold">✓ Real-time SMTP handshake on every query</li>
              <li className="flex items-center gap-2 text-emerald-600 font-bold">✓ Less than 0.5% bounce rate guarantee</li>
              <li className="flex items-center gap-2 text-emerald-600 font-bold">✓ 0 credits charged for missing data</li>
            </ul>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: Contact Search-TO-CRM WORKFLOW
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Send Saved leads Anywhere
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Zero manual export/import hassles. Verified contacts flow seamlessly into campaigns and CRM.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans text-center">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-blue-600 font-bold block">1. multiAttribute Verify</span>
              <strong className="text-slate-900 dark:text-white block truncate">multiDimensional filters</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-blue-600 font-bold block">2. SMTP VERIFY</span>
              <strong className="text-slate-900 dark:text-white block truncate">99.8% Accuracy</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border space-y-1">
              <span className="text-emerald-600 font-bold block">3. CAMPAIGN LAUNCH</span>
              <strong className="text-slate-900 dark:text-white block truncate">24 Inboxes Rotator</strong>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-blue-600 text-white space-y-1 shadow-sm">
              <span className="text-blue-100 font-bold block">4. DEALS CRM</span>
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
            <span>multiAttribute ACCURACY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Eliminate Missing Data and Burnt Domains Today
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Run contact search across 15+ data sources and start outbound campaigns with 99.8% verified data.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
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
          7-Day Free Trial • multiDimensional filters • 99.8% SMTP Accuracy Guarantee
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Contact Search QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {SEARCH_FAQS.map((faq, fIdx) => {
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
