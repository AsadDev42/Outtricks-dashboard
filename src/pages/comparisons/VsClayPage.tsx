import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  Search, 
  Database, 
  Mail, 
  ShieldCheck, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  BarChart3, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Zap, 
  Award, 
  Users, 
  TrendingUp,
  Scale
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface FeatureRow {
  domain: string;
  feature: string;
  outtricks: string;
  clay: string;
  winner: 'outtricks' | 'clay' | 'tie';
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURE_ROWS: FeatureRow[] = [
  {
    domain: 'Lead Search',
    feature: '15-Source multiAttribute Cascade',
    outtricks: 'Built-in multiDimensional Real-Time multiAttribute',
    clay: 'Multi-Provider Contact Search (Consumes Credits)',
    winner: 'tie'
  },
  {
    domain: 'Cold Email Execution',
    feature: 'Multi-Inbox Cold Email Dispatch',
    outtricks: 'Built-in 24+ Inbox Rotation & Auto-Warmup',
    clay: 'Not Supported (Requires Smartlead/Instantly Sync)',
    winner: 'outtricks'
  },
  {
    domain: 'AI SDR & Voice AI',
    feature: 'Autonomous Conversational Voice SDR',
    outtricks: 'Sub-400ms WebRTC Voice SDR + Calendar Booking',
    clay: 'Not Supported (Contact Search-Only)',
    winner: 'outtricks'
  },
  {
    domain: 'LinkedIn Automation',
    feature: 'Official LinkedIn Cloud Automation',
    outtricks: '100% Safe Versioned API + Cloud Proxies',
    clay: 'Profile Scraping Only (No Sending)',
    winner: 'outtricks'
  },
  {
    domain: 'Lead Discovery',
    feature: 'Native 480M+ B2B Prospect Search',
    outtricks: 'Built-in 8-Dimension ICP Search Engine',
    clay: 'Third-Party Data Integrations (Extra Credits)',
    winner: 'outtricks'
  },
  {
    domain: 'Pricing & Credit Burn',
    feature: 'Credit Predictability & Cost',
    outtricks: 'Flat Predictable Plans with Shared Ledger',
    clay: 'Credit Burn per Column ($349-$800+/mo easily)',
    winner: 'outtricks'
  },
  {
    domain: 'Pipeline & CRM',
    feature: 'Native Zero-Sync Deals CRM',
    outtricks: 'Single PostgreSQL Core (0ms Sync Drift)',
    clay: 'Spreadsheet Grid Only (Must Sync to CRM)',
    winner: 'outtricks'
  },
  {
    domain: 'Technical Usability',
    feature: 'Setup & Maintenance Overhead',
    outtricks: 'Out-of-the-box Pre-built Revenue Workflows',
    clay: 'Complex Formula Writing & API Key Management',
    winner: 'outtricks'
  },
  {
    domain: 'Freelance Proposals',
    feature: 'Upwork & Freelancer AI Bidding',
    outtricks: '24/7 AI Proposal Dispatch (< 3 Mins)',
    clay: 'Not Supported',
    winner: 'outtricks'
  }
];

const CLAY_FAQS: FaqItem[] = [
  {
    question: 'How is Outtricks different from Clay.com?',
    answer: 'Clay is a spreadsheet-based Lead Search tool that requires you to connect external senders like Smartlead or Instantly to execute campaigns. Outtricks combines multiAttribute search Contact Search with full native execution: multi-inbox cold email, sub-400ms Voice AI SDRs, official LinkedIn automation, and a native Deals CRM on 1 single database.'
  },
  {
    question: 'Can Clay send cold emails or make phone calls directly?',
    answer: 'No. Clay only prepares and Verifyes spreadsheet rows. You must configure webhook exports to push contacts into separate sending tools like Smartlead or dialers, adding tool sprawl and sync failures. Outtricks discovers, Verifyes, emails, and calls leads in one unified workflow.'
  },
  {
    question: 'Why do teams switch from Clay to Outtricks to reduce costs?',
    answer: 'Clay charges expensive subscription tiers ($149/mo to $800+/mo) where every cell Contact Search burns credits rapidly. Outtricks provides flat monthly pricing with generous shared credit ledgers and native execution included, reducing monthly software spend by over 60%.'
  },
  {
    question: 'Does Outtricks require complex formula writing like Clay?',
    answer: "No. Outtricks features pre-built 1-click multiAttribute workflows and 8-dimension ICP filters. You don't need to write custom regex formulas, configure dozens of separate API keys, or troubleshoot broken cell webhooks."
  },
  {
    question: 'Does Clay offer autonomous Voice AI phone agents?',
    answer: 'No. Clay has zero voice calling capabilities. Outtricks includes autonomous sub-400ms WebRTC Voice AI SDRs that qualify inbound demo leads within 45 seconds and book meetings directly to rep calendars.'
  },
  {
    question: 'How does Outtricks handle Lead Search accuracy compared to Clay?',
    answer: 'Both platforms query top data providers. Outtricks uses an automated 15-source multiAttribute cascade with live SMTP handshakes and mobile carrier pinging to guarantee 85%+ contact accuracy without requiring you to manually chain multiple table columns.'
  },
  {
    question: 'Can I import my existing Clay tables into Outtricks?',
    answer: 'Yes! You can export your Clay tables as CSVs and upload them directly into Outtricks, or simply use Outtricks native 480M+ directory to find and Verify fresh leads in one step.'
  },
  {
    question: 'Does Outtricks provide a free trial to test against Clay?',
    answer: 'Yes! Outtricks includes a 7-Day Free Trial with instant sandbox access to all 6 revenue engines, 480M+ lead search, contact search, and Deals CRM.'
  }
];

export const VsClayPage: React.FC = () => {
  const [leadSearchVolume, setleadSearchVolume] = useState<number>(5000);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Cost Calculations: Clay Pro/Enterprise + Senders + Dialers
  const clayStackCost = Math.round(349 + (leadSearchVolume / 1000) * 40 + 97 + 150); // Clay ($349) + extra credits + Instantly ($97) + Voice Tool ($150)
  const outtricksMonthlyCost = 149; // Scale Plan
  const annualSavings = (clayStackCost - outtricksMonthlyCost) * 12;

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks vs Clay: Lead Search & Execution Engine Comparison"
        description="Compare Outtricks vs Clay. Outtricks delivers 15-source contact search plus native multi-inbox sending, Voice SDRs, and CRM without complex credit pricing."
        canonical="https://outtricks.com/comparisons/outtricks-vs-clay"
        keywords={["Outtricks vs Clay","Clay alternative","Clay competitor","contact search platform"]}
        breadcrumbs={[{"name":"Comparisons","url":"/comparisons"},{"name":"Outtricks vs Clay","url":"/comparisons/outtricks-vs-clay"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: Outtricks vs Clay
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            HEAD-TO-HEAD BATTLECARD
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Outtricks vs Clay.com
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Why outbound teams are moving from complex spreadsheet tables and credit burning to Outtricks' unified data and multi-channel execution platform.
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
            <span>Book Architecture Demo</span>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          EXECUTIVE SUMMARY: Contact Search Only vs Data + Execution OS
          ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            EXECUTIVE COMPARISON SUMMARY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Spreadsheet Canvas vs Full Revenue Execution OS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl">
            Clay is a great spreadsheet Contact Search grid, but it cannot send cold emails, place phone calls, or automate LinkedIn actions without exporting rows into third-party tools. Outtricks delivers the same deep multiAttribute search Contact Search with native multi-channel execution built directly in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans pt-2">
          
          <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Where Outtricks Wins</span>
            </div>
            <ul className="space-y-2 text-slate-800 dark:text-slate-200 font-sans text-xs">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Native Multi-Channel Execution:</strong> Cold Email, Sub-400ms Voice SDR, and LinkedIn touchpoints built-in.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>No Credit Burning Anxiety:</strong> Predictable flat monthly pricing without per-column credit microtransactions.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Zero Formula Maintenance:</strong> Pre-built multiAttribute cascades and ICP filters work out-of-the-box.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Native Deals CRM:</strong> Track leads from contact search to closed-won revenue on 1 PostgreSQL database.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Clay.com Limitations</span>
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Native Senders:</strong> Must pay for and configure separate sending tools (Smartlead/Instantly).</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>High Credit Costs:</strong> Costs rapidly scale to $600-$1,200+/mo when running multi-step multiAttributes.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Voice AI SDR:</strong> Zero capability to place phone calls or qualify inbound leads.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Steep Learning Curve:</strong> Requires extensive formula writing, prompt engineering, and table management.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* =========================================================================
          FEATURE-BY-FEATURE BREAKDOWN TABLE
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DETAILED SPECIFICATION COMPARISON
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Feature-by-Feature Comparison
          </h2>
        </div>

        <div className="bg-white dark:bg-[#0b101f] rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl shadow-slate-900/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(37,99,235,0.04)] overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/90 dark:bg-[#0a0e1a] font-sans text-xs">
                  <th className="py-4.5 px-6 font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Function / Capability</th>
                  <th className="py-4.5 px-6 bg-blue-500/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 font-extrabold border-x border-blue-200/80 dark:border-blue-500/25">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                      <span>Outtricks</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 text-slate-700 dark:text-slate-300 font-bold">
                    Clay.com
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] font-sans">
                {FEATURE_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-[#131d35]/50 transition-colors group even:bg-slate-50/25 dark:even:bg-white/[0.015]">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      <span className="inline-block px-2 py-0.5 mb-1 rounded bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 text-[9px] font-sans font-extrabold uppercase tracking-wider border border-blue-100 dark:border-blue-900/40">
                        {row.domain}
                      </span>
                      <div className="text-xs sm:text-sm font-bold">{row.feature}</div>
                    </td>
                    <td className="py-4 px-6 bg-blue-50/50 dark:bg-white/[0.04] font-bold text-slate-950 dark:text-white border-x border-blue-100/80 dark:border-blue-500/15 group-hover:bg-blue-50/70 dark:group-hover:bg-blue-950/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-600/60 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                        </div>
                        <span className="font-extrabold text-slate-950 dark:text-white text-xs sm:text-sm">{row.outtricks}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {row.winner === 'outtricks' ? (
                          <X className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span>{row.clay}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* =========================================================================
          INTERACTIVE TCO CALCULATOR SECTION
          ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2 text-center">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            TOTAL COST OF OWNERSHIP (TCO)
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Contact Search + Execution Stack Savings
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Clay credits ($349+) + Smartlead ($97) + Voice Tool ($150) vs Outtricks flat pricing
          </p>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-bold font-sans text-slate-700 dark:text-slate-300 mb-2">
              <span>Monthly Saved contacts:</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-extrabold">{leadSearchVolume.toLocaleString()} Leads</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="25000" 
              step="1000"
              value={leadSearchVolume}
              onChange={(e) => setleadSearchVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-sans">
            <div className="p-5 bg-slate-50 dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-1">
              <span className="text-xs text-slate-500 font-sans block">Clay + Senders + Dialers</span>
              <strong className="text-2xl font-black text-rose-600 block">${clayStackCost}/mo</strong>
              <span className="text-[10px] text-slate-400 font-sans block">Credits + multi-tool stack</span>
            </div>

            <div className="p-5 bg-blue-50/80 dark:bg-white/[0.04] rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-sans block">Outtricks All-in-One</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block">${outtricksMonthlyCost}/mo</strong>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans block">Data & execution included</span>
            </div>

            <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-sans block">Your Annual Savings</span>
              <strong className="text-2xl font-black text-emerald-600 block">${Math.max(0, annualSavings).toLocaleString()}/yr</strong>
              <span className="text-[10px] text-emerald-600 font-sans block">Zero credit markups</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEST-FOR SECTION: Who Should Choose What?
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            BUYER DECISION GUIDE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Which Platform Is Right for Your Team?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-300 dark:border-blue-800 shadow-md space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-sans font-bold uppercase text-[10px]">
              RECOMMENDED FOR MODERN TEAMS
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Choose Outtricks If You Want:
            </h3>
            <ul className="space-y-2.5 text-slate-700 dark:text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>An integrated platform where contact search flows directly into Email, Voice SDR, and LinkedIn sending.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Flat predictable pricing with zero credit burning anxiety or complex per-cell formula setup.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Autonomous sub-400ms Voice AI SDRs that call and qualify leads directly from Verified mobile numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Native Deals CRM with closed-loop revenue attribution on 1 single PostgreSQL schema.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-4">
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-sans font-bold uppercase text-[10px]">
              SPREADSHEET-ONLY USE CASE
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Choose Clay.com If You:
            </h3>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Only need to build custom spreadsheet Contact Search recipes and have in-house engineers to maintain webhook exports.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Already pay for separate cold email senders, LinkedIn automation tools, and manual SDR dialers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Have a large budget for high-volume credit consumption tiers ($800+/mo).</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* =========================================================================
          WHY CHOOSE OUTTRICKS: 4 Architectural Differentiators
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ARCHITECTURAL ADVANTAGE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Why Teams Switch from Clay to Outtricks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 01</span>
            <strong className="text-slate-900 dark:text-white text-sm block">15-Source multiAttribute</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Real-time multi-provider cascade delivers 85%+ verified direct phones and valid emails without cell formulas.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 02</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Native Multi-Channel</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Saved leads immediately trigger Email, Sub-400ms Voice SDR, and LinkedIn touches without Zapier webhooks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-indigo-600 font-bold uppercase text-[10px]">PILLAR 03</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Predictable Pricing</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Zero credit burning anxiety. Unlimited users and generous pooled ledgers keep your costs low and predictable.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2.5">
            <span className="text-emerald-600 font-bold uppercase text-[10px]">PILLAR 04</span>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block">1 PostgreSQL Schema</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Native Deals CRM, activity logging, and contact history unified on 1 database with 0ms webhook synchronization lag.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          FINAL CTA
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFY DATA & EXECUTION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Upgrade from Clay to Outtricks?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Consolidate your Contact Search tables, email sender, and Voice SDR into one intelligent revenue platform.
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
            <span>Schedule Architecture Demo</span>
          </Link>
        </div>

        <p className="text-[11px] font-sans text-slate-400 relative z-10">
          7-Day Free Trial • 15-Source multiAttribute Included • 0ms Webhook Sync Lag
        </p>
      </section>

      {/* =========================================================================
          FAQ SECTION (8 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Outtricks vs Clay.com FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {CLAY_FAQS.map((faq, fIdx) => {
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
