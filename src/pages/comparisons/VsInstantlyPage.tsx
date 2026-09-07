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
  instantly: string;
  winner: 'outtricks' | 'instantly' | 'tie';
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURE_ROWS: FeatureRow[] = [
  {
    domain: 'Cold Email & Warmup',
    feature: 'Multi-Inbox Rotation & Warmup Pool',
    outtricks: 'Unlimited Inboxes + Peer-to-Peer Auto Warmup',
    instantly: 'Unlimited Inboxes + Auto Warmup',
    winner: 'tie'
  },
  {
    domain: 'Lead Generation',
    feature: 'Native 480M+ B2B Prospect Search',
    outtricks: 'Built-in 8-Dimension ICP Search Engine',
    instantly: 'Add-on Lead Database ($47-$197/mo extra)',
    winner: 'outtricks'
  },
  {
    domain: 'Lead Search',
    feature: '15-Source direct phone & Email',
    outtricks: 'Real-Time SMTP & Telco Carrier multiAttribute',
    instantly: 'Basic Verification Only (No Mobile multiAttribute)',
    winner: 'outtricks'
  },
  {
    domain: 'AI SDR & Voice AI',
    feature: 'Autonomous Conversational Voice SDR',
    outtricks: 'Sub-400ms WebRTC Voice SDR + Meeting Booking',
    instantly: 'Not Supported (Email-Only)',
    winner: 'outtricks'
  },
  {
    domain: 'LinkedIn Outreach',
    feature: 'Official LinkedIn Cloud Automation',
    outtricks: '100% Safe Versioned API + Cloud Proxies',
    instantly: 'Not Supported (Email-Only)',
    winner: 'outtricks'
  },
  {
    domain: 'Freelance Marketplace',
    feature: 'Upwork & Freelancer Bidding Engine',
    outtricks: '24/7 AI Proposal Dispatch (< 3 Mins)',
    instantly: 'Not Supported',
    winner: 'outtricks'
  },
  {
    domain: 'CRM & Pipeline',
    feature: 'Native Zero-Sync Deals CRM',
    outtricks: 'Single PostgreSQL Core (0ms Sync Drift)',
    instantly: 'Basic Unibox (Requires External CRM Sync)',
    winner: 'outtricks'
  },
  {
    domain: 'Workflow Automation',
    feature: 'Cross-Channel Behavioral Flow Builder',
    outtricks: 'Drag-and-Drop 6-Engine Visual Flow Canvas',
    instantly: 'Linear Email Sequences Only',
    winner: 'outtricks'
  },
  {
    domain: 'Revenue Attribution',
    feature: 'Closed-Loop Revenue Tracking',
    outtricks: '100% Attribution from Lead Discovery to Won ARR',
    instantly: 'Email Open & Reply Metrics Only',
    winner: 'outtricks'
  }
];

const INSTANTLY_FAQS: FaqItem[] = [
  {
    question: 'How does Outtricks compare to Instantly.ai?',
    answer: 'Instantly is built primarily as a high-volume cold email sending tool. Outtricks is a complete AI Revenue Operating System that combines unlimited cold email with native 480M+ lead search, multiAttribute search Contact Search, autonomous sub-400ms Voice AI SDRs, official LinkedIn automation, and a native Deals CRM on 1 single database.'
  },
  {
    question: 'Can I do multi-channel outreach on Instantly?',
    answer: 'No. Instantly only supports cold email. It does not offer conversational Voice AI calling, LinkedIn touchpoints, or freelance proposal bidding. Outtricks coordinates touches across Email, LinkedIn, Phone, and Freelance feeds in one synchronized cadence.'
  },
  {
    question: 'Do I still need a separate lead database with Instantly vs Outtricks?',
    answer: 'With Instantly, you must purchase external lead lists or pay expensive monthly add-on fees for their lead database. Outtricks includes 480M+ verified global B2B profiles natively with multiDimensional real-time multiAttribute validation.'
  },
  {
    question: 'How does email deliverability compare between Outtricks and Instantly?',
    answer: 'Both platforms support unlimited inbox connection and automated peer-to-peer warmup. Outtricks goes further by integrating dynamic spintax personalization, custom tracking domain alignment, and real-time SMTP handshakes that keep bounce rates under 0.6%.'
  },
  {
    question: 'Does Instantly have a built-in CRM for closing deals?',
    answer: 'Instantly only has an email Unibox. To manage sales deals, you must connect external CRMs like HubSpot or Salesforce via Zapier webhooks, which introduces sync lag and data drift. Outtricks includes a native 5-stage Deals Kanban on 1 PostgreSQL database.'
  },
  {
    question: 'What is the Total Cost of Ownership (TCO) difference?',
    answer: 'With Instantly ($97/mo for Hypergrowth), you still need to pay for Apollo ($99/mo), an AI Voice tool ($150/mo), and Zapier ($50/mo) totaling over $390/mo. Outtricks provides all these capabilities starting at $79/mo, saving teams over $3,500 annually.'
  },
  {
    question: 'Can I migrate my sending inboxes from Instantly to Outtricks?',
    answer: 'Yes! You can connect Google Workspace, Microsoft Office 365, or custom SMTP/IMAP inboxes into Outtricks in under 5 minutes with automated DNS verification wizards.'
  },
  {
    question: 'Does Outtricks provide a free trial to test against Instantly?',
    answer: 'Yes! Outtricks includes a 7-Day Free Trial with instant sandbox access to all 6 revenue engines, 480M+ lead search, contact search, and Deals CRM.'
  }
];

export const VsInstantlyPage: React.FC = () => {
  const [inboxCount, setInboxCount] = useState<number>(15);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Cost Calculations
  const instantlyStackCost = 97 + 99 + 150 + 49; // Instantly ($97) + Apollo ($99) + Voice Tool ($150) + Zapier ($49)
  const outtricksMonthlyCost = 149; // Scale Plan
  const annualSavings = (instantlyStackCost - outtricksMonthlyCost) * 12;

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks vs Instantly: Feature, Deliverability & Channel Comparison"
        description="Compare Outtricks and Instantly. Outtricks combines multi-inbox cold email with 480M+ leads, LinkedIn automation, Voice AI SDR, and Deals CRM."
        canonical="https://outtricks.com/comparisons/outtricks-vs-instantly"
        keywords={["Outtricks vs Instantly","Instantly alternative","Instantly competitor","cold email tool comparison"]}
        breadcrumbs={[{"name":"Comparisons","url":"/comparisons"},{"name":"Outtricks vs Instantly","url":"/comparisons/outtricks-vs-instantly"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: Outtricks vs Instantly
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
          Outtricks vs Instantly.ai
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Why revenue teams are upgrading from email-only senders to Outtricks' synchronized multi-channel revenue operating system.
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
          EXECUTIVE SUMMARY: Single Channel vs Multi-Channel OS
          ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            EXECUTIVE COMPARISON SUMMARY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Beyond Cold Email: The Unified Multi-Channel Revenue OS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl">
            Instantly is a proven high-volume cold email sender, but it stops at email. To run a modern sales motion, teams must stitch together Instantly, Apollo, an AI voice tool, and Zapier. Outtricks unifies lead search (480M+), contact search, cold email, Voice AI SDRs, and CRM into one native platform.
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
                <span><strong>Full 6-Engine Multi-Channel:</strong> Cold Email, Voice AI SDR, Official LinkedIn, Upwork Bidding, 480M+ Leads, and CRM.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Sub-400ms Voice SDR:</strong> Calls warm leads to handle objections and book calendar slots automatically.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Built-In 480M+ Lead Finder:</strong> No need to pay extra for Apollo or external lead scrapers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Zero-Sync Deals CRM:</strong> Full sales pipeline tracking without brittle Zapier webhooks.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Instantly.ai Limitations</span>
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Email-Only Channel:</strong> Zero support for conversational Voice AI calling or LinkedIn automation.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Expensive Data Add-Ons:</strong> Lead database requires extra monthly credits ($47-$197/mo).</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Native CRM Pipeline:</strong> Unibox does not manage pipeline stages or ARR attribution.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Requires Webhook Syncs:</strong> Relies on Zapier/Make to push replies to external databases.</span>
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
                    Instantly.ai
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
                        <span>{row.instantly}</span>
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
            Stack Consolidation Savings
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Instantly ($97) + Apollo ($99) + AI Voice ($150) + Zapier ($49) vs Outtricks flat pricing
          </p>
        </div>

        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-sans">
            <div className="p-5 bg-slate-50 dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-1">
              <span className="text-xs text-slate-500 font-sans block">Stitched 4-Tool Stack</span>
              <strong className="text-2xl font-black text-rose-600 block">${instantlyStackCost}/mo</strong>
              <span className="text-[10px] text-slate-400 font-sans block">Multiple subscriptions</span>
            </div>

            <div className="p-5 bg-blue-50/80 dark:bg-white/[0.04] rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-sans block">Outtricks All-in-One</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block">${outtricksMonthlyCost}/mo</strong>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans block">All 6 engines included</span>
            </div>

            <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-sans block">Your Annual Savings</span>
              <strong className="text-2xl font-black text-emerald-600 block">${Math.max(0, annualSavings).toLocaleString()}/yr</strong>
              <span className="text-[10px] text-emerald-600 font-sans block">Zero tool sprawl</span>
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
                <span>Full multi-channel execution across Cold Email, Voice AI SDR, Official LinkedIn, and CRM on 1 database.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Built-in 480M+ verified prospect search with multiDimensional real-time contact search.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Sub-400ms conversational Voice AI SDRs that qualify inbound signups in under 45 seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Zero webhook drift and native deal pipeline tracking without paying for external CRMs.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-4">
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-sans font-bold uppercase text-[10px]">
              SINGLE-CHANNEL USE CASE
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Choose Instantly.ai If You:
            </h3>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Only ever intend to send cold email and have zero plans for Voice AI calling or LinkedIn automation.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Already have external subscriptions for lead databases and custom webhook workflows set up in Make/Zapier.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Do not require closed-loop revenue attribution back to specific data discovery touches.</span>
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
            Why Teams Upgrade from Instantly to Outtricks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 01</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Voice AI Calling</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Sub-400ms WebRTC conversational voice caller that turns warm email openers into booked calendar meetings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 02</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Safe LinkedIn Cloud</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Official versioned API & dedicated residential cloud proxies for automated connection requests and DMs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-indigo-600 font-bold uppercase text-[10px]">PILLAR 03</span>
            <strong className="text-slate-900 dark:text-white text-sm block">480M+ Lead Finder</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Built-in directory with multiDimensional real-time contact search without expensive third-party data subscriptions.
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
            <span>SCALE MULTI-CHANNEL REVENUE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Upgrade from Instantly to Outtricks?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Consolidate your email sender, lead database, and Voice SDR into one intelligent revenue platform.
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
          7-Day Free Trial • Connect Unlimited Inboxes • 0ms Webhook Sync Lag
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
            Outtricks vs Instantly.ai FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {INSTANTLY_FAQS.map((faq, fIdx) => {
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
