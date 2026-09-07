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
  Clock,
  Layers,
  Scale
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface FeatureRow {
  domain: string;
  feature: string;
  outtricks: string;
  apollo: string;
  winner: 'outtricks' | 'apollo' | 'tie';
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURE_ROWS: FeatureRow[] = [
  {
    domain: 'Lead Generation',
    feature: 'B2B Contact Database Size',
    outtricks: '480M+ Verified Global Contacts',
    apollo: '275M+ Global Contacts',
    winner: 'outtricks'
  },
  {
    domain: 'Lead Search',
    feature: 'contact search Cascade',
    outtricks: 'multiDimensional Real-Time SMTP & Telco Cascade',
    apollo: 'Single Internal Apollo Database',
    winner: 'outtricks'
  },
  {
    domain: 'Cold Email',
    feature: 'Multi-Inbox Sending & Rotation',
    outtricks: 'Unlimited Inboxes with Smart Auto-Rotation',
    apollo: 'Limited Mailbox Rotation (Seat Restricted)',
    winner: 'outtricks'
  },
  {
    domain: 'Email Deliverability',
    feature: 'Automated Warmup & DNS Monitoring',
    outtricks: 'Built-in Peer-to-Peer Warmup & SPF/DKIM/DMARC Health',
    apollo: 'Basic Warmup Integration (Often Flagged)',
    winner: 'outtricks'
  },
  {
    domain: 'LinkedIn Outreach',
    feature: 'LinkedIn Automation Safety',
    outtricks: '100% Official Versioned API + Dedicated Cloud Proxies',
    apollo: 'Chrome Extension / Manual Tasks Only',
    winner: 'outtricks'
  },
  {
    domain: 'AI SDR & Voice AI',
    feature: 'Autonomous Conversational Voice SDR',
    outtricks: 'Sub-400ms WebRTC Voice SDR with Live Calendar Booking',
    apollo: 'Manual Click-to-Call Rep Dialer Only',
    winner: 'outtricks'
  },
  {
    domain: 'CRM & Pipeline',
    feature: 'Native Deals CRM & Contact Timeline',
    outtricks: 'Single PostgreSQL Core (0ms Sync Lag)',
    apollo: 'Basic CRM (Requires Sync to Salesforce/HubSpot)',
    winner: 'outtricks'
  },
  {
    domain: 'Workflow Automation',
    feature: 'Visual Multi-Channel Flow Builder',
    outtricks: 'Drag-and-Drop 6-Engine Visual Flow Canvas',
    apollo: 'Linear Email/Call Task Sequences',
    winner: 'outtricks'
  },
  {
    domain: 'Analytics',
    feature: 'Closed-Loop Revenue Attribution',
    outtricks: '100% Attribution from Search to Closed-Won ARR',
    apollo: 'Open & Click Tracking (No Full Attribution)',
    winner: 'outtricks'
  },
  {
    domain: 'Freelance Marketplace',
    feature: 'Upwork & Freelancer Bidding Engine',
    outtricks: '24/7 AI Proposal Dispatch (< 3 Mins)',
    apollo: 'Not Supported',
    winner: 'outtricks'
  }
];

const APOLLO_FAQS: FaqItem[] = [
  {
    question: 'How is Outtricks different from Apollo.io?',
    answer: 'Apollo is primarily a legacy B2B contact directory with basic email sequencing. Outtricks is a unified AI Revenue Operating System that combines 480M+ lead search, multiAttribute search Contact Search, unlimited multi-inbox cold email, official LinkedIn automation, sub-400ms Voice AI SDRs, and a native CRM on 1 single PostgreSQL database.'
  },
  {
    question: 'Why does Apollo have higher email bounce rates than Outtricks?',
    answer: 'Apollo relies on its own static internal database, which suffers from natural data decay (approx 3% per month). Outtricks uses a multiDimensional real-time contact search cascade with live SMTP handshakes, verifying email validity and mobile carrier status at the exact moment of outreach.'
  },
  {
    question: 'Can I replace my Apollo subscription completely with Outtricks?',
    answer: 'Yes. Outtricks includes a 480M+ B2B lead search engine with 8-dimension filters, multi-inbox cold email dispatch with automated warmup, and native Deals CRM, eliminating the need for Apollo and additional sending tools like Smartlead or Instantly.'
  },
  {
    question: 'Does Apollo offer autonomous Voice AI phone agents?',
    answer: 'No. Apollo only offers a manual browser-based dialer for human SDRs to make cold calls. Outtricks includes autonomous sub-400ms WebRTC Voice AI SDRs that qualify inbound demo leads within 45 seconds and book meetings directly to rep calendars.'
  },
  {
    question: 'How does Outtricks pricing compare to Apollo for growing teams?',
    answer: 'Apollo charges steep per-seat fees ($99/seat/mo) plus extra add-on costs for mobile credits, dialer minutes, and export limits. Outtricks offers flat predictable pricing with unlimited team seats and shared credit ledgers, saving teams up to 65% in Total Cost of Ownership (TCO).'
  },
  {
    question: 'How does Outtricks protect LinkedIn accounts compared to Apollo?',
    answer: 'Apollo relies on local Chrome extension browser scraping, which LinkedIn actively detects and restricts. Outtricks uses dedicated residential cloud proxies and official versioned API endpoints with randomized human-like delays, ensuring 100% account safety.'
  },
  {
    question: 'How easy is it to migrate from Apollo to Outtricks?',
    answer: 'Migration takes under 15 minutes. You can export existing Apollo CSVs and import them directly into Outtricks, or use our 1-click lead finder to query fresher verified data without manual spreadsheet cleanup.'
  },
  {
    question: 'Does Outtricks provide a free trial to test against Apollo?',
    answer: 'Yes! Outtricks offers a 7-Day Free Trial with instant sandbox access to 480M+ lead search, contact search, multi-inbox warmup, and Deals CRM.'
  }
];

export const VsApolloPage: React.FC = () => {
  const [repsCount, setRepsCount] = useState<number>(5);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Cost Calculations
  const apolloMonthlyCost = repsCount * 99 + 150; // $99/seat + mobile credits & dialer
  const outtricksMonthlyCost = 199; // Agency Pro flat
  const annualSavings = (apolloMonthlyCost - outtricksMonthlyCost) * 12;

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks vs Apollo.io: In-Depth Platform & Feature Comparison"
        description="See why revenue teams choose Outtricks over Apollo: multiAttribute search Contact Search, sub-400ms Voice AI SDRs, and unified multi-channel execution."
        canonical="https://outtricks.com/comparisons/outtricks-vs-apollo"
        keywords={["Outtricks vs Apollo","Apollo.io alternative","contact search vs Apollo","Apollo competitor"]}
        breadcrumbs={[{"name":"Comparisons","url":"/comparisons"},{"name":"Outtricks vs Apollo.io","url":"/comparisons/outtricks-vs-apollo"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: Outtricks vs Apollo.io
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
          Outtricks vs Apollo.io
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Why modern revenue teams are replacing Apollo's legacy database and expensive seat tiers with Outtricks' unified 6-engine revenue operating system.
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
          EXECUTIVE SUMMARY: The Core Architectural Difference
          ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            EXECUTIVE COMPARISON SUMMARY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Single Database Revenue OS vs Legacy Data Silo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl">
            Apollo offers a vast contact database, but its multi-inbox email deliverability is severely restricted by per-seat pricing, and it completely lacks autonomous Voice AI SDRs, official LinkedIn cloud automation, and freelance marketplace bidding. Outtricks unifies lead intelligence and 6 execution engines onto 1 single PostgreSQL database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans pt-2">
          
          {/* Outtricks Advantages */}
          <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Where Outtricks Wins</span>
            </div>
            <ul className="space-y-2 text-slate-800 dark:text-slate-200 font-sans text-xs">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>multiAttribute search Contact Search:</strong> 85%+ verified direct phones & emails vs Apollo's single stale database.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Sub-400ms Voice AI SDR:</strong> Autonomous conversational calling with live Google/Outlook calendar booking.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Unlimited Inbox Rotation:</strong> 24+ inboxes with peer-to-peer warmup and zero seat penalty fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>100% Safe LinkedIn Automation:</strong> Cloud proxies & official versioned API without Chrome extension bans.</span>
              </li>
            </ul>
          </div>

          {/* Apollo Limitations */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Apollo.io Limitations</span>
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>High Data Decay:</strong> Single database records decay at ~3% monthly with frequent bounce spikes.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Voice AI Automation:</strong> Only provides a basic manual rep dialer without conversational AI.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Seat-Based Tool Sprawl:</strong> Adding reps rapidly scales monthly subscription costs ($99/seat/mo).</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Extension Ban Risk:</strong> Relies on local Chrome extensions for LinkedIn touchpoints.</span>
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
                    Apollo.io
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
                        <span>{row.apollo}</span>
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
            Calculate Your Stack Savings
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Apollo seat fees ($99/mo) + mobile credit add-ons vs Outtricks flat pricing
          </p>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-bold font-sans text-slate-700 dark:text-slate-300 mb-2">
              <span>Sales Team Size:</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-extrabold">{repsCount} Reps</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              value={repsCount}
              onChange={(e) => setRepsCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-sans">
            <div className="p-5 bg-slate-50 dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-1">
              <span className="text-xs text-slate-500 font-sans block">Apollo.io + Add-ons</span>
              <strong className="text-2xl font-black text-rose-600 block">${apolloMonthlyCost}/mo</strong>
              <span className="text-[10px] text-slate-400 font-sans block">$99/seat + mobile packs</span>
            </div>

            <div className="p-5 bg-blue-50/80 dark:bg-white/[0.04] rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-sans block">Outtricks All-in-One</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block">${outtricksMonthlyCost}/mo</strong>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans block">Unlimited team seats included</span>
            </div>

            <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-sans block">Your Annual Savings</span>
              <strong className="text-2xl font-black text-emerald-600 block">${Math.max(0, annualSavings).toLocaleString()}/yr</strong>
              <span className="text-[10px] text-emerald-600 font-sans block">Reinvested in growth</span>
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
                <span>A single unified revenue operating system that executes Email, Voice AI, LinkedIn, and CRM without Zapier.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>15-source real-time Lead Lead Search for verified mobile dials and 99.4% cold email deliverability.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Autonomous sub-400ms Voice SDRs that call, qualify, and book meetings on autopilot.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Predictable flat monthly pricing with unlimited team seats and shared credit pools.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-4">
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-sans font-bold uppercase text-[10px]">
              LEGACY USE CASE
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Choose Apollo.io If You:
            </h3>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Only need a static database search and don't mind manually scrubbing data or verifying bounce rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Are already locked into multi-year Salesforce/HubSpot enterprise contracts with full-time RevOps engineers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Do not require autonomous Voice AI calling, official LinkedIn automation, or freelance marketplace bidding.</span>
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
            Why High-Growth Teams Switch to Outtricks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 01</span>
            <strong className="text-slate-900 dark:text-white text-sm block">1 Immutable Database</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              No webhook drift. Lead finder, email inboxes, LinkedIn, voice, and Deals CRM read and write to the same contact record.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 02</span>
            <strong className="text-slate-900 dark:text-white text-sm block">15-Source multiAttribute</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Cascades queries across top providers to guarantee 85%+ verified direct phones and valid emails before dispatch.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-indigo-600 font-bold uppercase text-[10px]">PILLAR 03</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Sub-400ms Voice SDR</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Responds to warm inbound demo requests in under 45 seconds and books qualified meetings directly to rep calendars.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2.5">
            <span className="text-emerald-600 font-bold uppercase text-[10px]">PILLAR 04</span>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block">Zero Seat Penalties</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Invite your entire sales team, SDRs, and agency managers without paying expensive per-seat software taxes.
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
            <span>MIGRATE IN 15 MINUTES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Upgrade from Apollo to Outtricks?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Consolidate your outbound stack, eliminate seat taxes, and start generating predictable pipeline on 1 platform.
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
          7-Day Free Trial • No Credit Card Required • Instant CSV Migration
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
            Outtricks vs Apollo.io FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {APOLLO_FAQS.map((faq, fIdx) => {
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
