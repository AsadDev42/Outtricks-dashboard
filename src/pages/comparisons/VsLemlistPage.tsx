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
  lemlist: string;
  winner: 'outtricks' | 'lemlist' | 'tie';
}

interface FaqItem {
  question: string;
  answer: string;
}

const FEATURE_ROWS: FeatureRow[] = [
  {
    domain: 'LinkedIn Automation',
    feature: 'Safety & Execution Architecture',
    outtricks: '100% Safe Official Versioned API + Cloud Proxies',
    lemlist: 'Chrome Extension Browser Scraping (Ban Risk)',
    winner: 'outtricks'
  },
  {
    domain: 'AI SDR & Voice AI',
    feature: 'Autonomous Conversational Voice SDR',
    outtricks: 'Sub-400ms WebRTC Voice SDR + Calendar Booking',
    lemlist: 'Manual Aircall Integration Only',
    winner: 'outtricks'
  },
  {
    domain: 'Lead Discovery',
    feature: '480M+ Verified B2B Lead Directory',
    outtricks: 'Built-in 8-Dimension ICP Search Engine',
    lemlist: 'Lemlist Database (Add-on Credits Required)',
    winner: 'outtricks'
  },
  {
    domain: 'Lead Search',
    feature: '15-Source contact search',
    outtricks: 'Real-Time SMTP & Telco Carrier multiAttribute',
    lemlist: 'Basic Email Finder (No Mobile multiAttribute)',
    winner: 'outtricks'
  },
  {
    domain: 'Cold Email Sending',
    feature: 'Multi-Inbox Rotation & Warmup Pool',
    outtricks: 'Unlimited Inboxes + AI Dynamic Spintax',
    lemlist: 'Lemwarm Warmup Pool Included',
    winner: 'tie'
  },
  {
    domain: 'Seat Pricing & Scale',
    feature: 'Team Member Pricing Model',
    outtricks: 'Flat Monthly Pricing (Unlimited Seats)',
    lemlist: 'Steep Per-Seat Pricing ($129/seat/mo for Multichannel)',
    winner: 'outtricks'
  },
  {
    domain: 'Freelance Marketplace',
    feature: 'Upwork & Freelancer AI Bidding',
    outtricks: '24/7 AI Proposal Dispatch (< 3 Mins)',
    lemlist: 'Not Supported',
    winner: 'outtricks'
  },
  {
    domain: 'Deals CRM',
    feature: 'Native Zero-Sync Deals Pipeline',
    outtricks: 'Single PostgreSQL Core (0ms Sync Lag)',
    lemlist: 'Basic Lead Inbox (Requires CRM Sync)',
    winner: 'outtricks'
  },
  {
    domain: 'Revenue Attribution',
    feature: 'Closed-Loop Revenue Tracking',
    outtricks: '100% Attribution from Lead Discovery to Won ARR',
    lemlist: 'Open, Click & Reply Metrics Only',
    winner: 'outtricks'
  }
];

const LEMLIST_FAQS: FaqItem[] = [
  {
    question: 'How is Outtricks different from Lemlist?',
    answer: 'Lemlist is a per-seat cold outreach tool known for email personalization and Chrome extension LinkedIn tasks. Outtricks is a unified AI Revenue Operating System that provides 100% cloud-safe official LinkedIn API execution, autonomous sub-400ms Voice AI SDRs, multiAttribute search Contact Search, 24/7 freelance bidding, and a native CRM with flat unlimited-seat pricing.'
  },
  {
    question: 'Why is Outtricks LinkedIn automation safer than Lemlist?',
    answer: 'Lemlist uses local Chrome extensions to automate LinkedIn, which injects scripts into your active browser session and frequently triggers LinkedIn account checkpoints and restrictions. Outtricks uses dedicated residential cloud proxies and official versioned API endpoints with humanized action throttling, ensuring 100% account safety.'
  },
  {
    question: 'Does Lemlist offer autonomous Voice AI phone agents?',
    answer: 'No. Lemlist only provides a webhook integration with manual phone dialers like Aircall. Outtricks includes native sub-400ms WebRTC Voice AI SDRs that qualify inbound leads within 45 seconds and book meetings directly into rep calendars.'
  },
  {
    question: 'How does Outtricks pricing compare to Lemlist for scaling teams?',
    answer: 'Lemlist charges $129/seat/month for its Multichannel Expert tier. For a team of 5 reps, Lemlist costs $645/month. Outtricks offers flat pricing starting at $79/mo with unlimited team seats and shared credit ledgers, saving teams over 70% in monthly software costs.'
  },
  {
    question: 'Can Outtricks match Lemlist dynamic personalization?',
    answer: 'Yes! Outtricks includes dynamic AI spintax generation, variable customizers (e.g. {{first_name}}, {{company}}, {{funding_round}}), and automated opening lines synthesized from verified prospect intent signals.'
  },
  {
    question: 'What is the Freelance Bidding Engine in Outtricks?',
    answer: 'Outtricks scans Upwork and Freelancer project feeds 24/7 and automatically submits tailored AI proposals within 3 minutes of a client posting a high-ticket RFP. Lemlist has zero marketplace bidding features.'
  },
  {
    question: 'How does Outtricks eliminate sync drift compared to Lemlist?',
    answer: 'Lemlist requires Zapier or native integrations to sync with external CRMs like Salesforce or HubSpot, which introduces latency and lost context. Outtricks runs entirely on 1 native PostgreSQL core with 0ms sync delay.'
  },
  {
    question: 'Does Outtricks provide a free trial to test against Lemlist?',
    answer: 'Yes! Outtricks offers a 7-Day Free Trial with instant sandbox access to all 6 revenue engines, 480M+ lead search, contact search, and Deals CRM.'
  }
];

export const VsLemlistPage: React.FC = () => {
  const [repsCount, setRepsCount] = useState<number>(5);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Cost Calculations: Lemlist Multichannel ($129/seat) vs Outtricks flat
  const lemlistMonthlyCost = repsCount * 129 + 150; // $129/seat + third-party dialer
  const outtricksMonthlyCost = 199; // Agency Pro flat
  const annualSavings = (lemlistMonthlyCost - outtricksMonthlyCost) * 12;

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks vs Lemlist: Cold Outreach & Multichannel Comparison"
        description="Compare Outtricks vs Lemlist. Outtricks provides a 480M+ global database, lower latency Voice AI, and modular pricing from $20/mo."
        canonical="https://outtricks.com/comparisons/outtricks-vs-lemlist"
        keywords={["Outtricks vs Lemlist","Lemlist alternative","Lemlist competitor","cold outreach software comparison"]}
        breadcrumbs={[{"name":"Comparisons","url":"/comparisons"},{"name":"Outtricks vs Lemlist","url":"/comparisons/outtricks-vs-lemlist"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: Outtricks vs Lemlist
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
          Outtricks vs Lemlist
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Why outbound teams are switching from Lemlist's per-seat taxes and Chrome extensions to Outtricks' cloud-safe multi-channel revenue operating system.
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
          EXECUTIVE SUMMARY: Extension Tools vs Cloud Revenue OS
          ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            EXECUTIVE COMPARISON SUMMARY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Cloud-Safe Multi-Channel OS vs Per-Seat Extension Tool
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-4xl">
            Lemlist has built a strong brand around cold email personalization, but its $129/seat pricing becomes cost-prohibitive at scale, and its LinkedIn automation relies on risky Chrome extensions. Outtricks combines 100% cloud-safe LinkedIn automation, autonomous Voice AI SDRs, multiAttribute search Contact Search, and CRM with flat unlimited-seat pricing.
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
                <span><strong>100% Safe LinkedIn Automation:</strong> Cloud proxies & official versioned API without Chrome extension ban risks.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Sub-400ms Voice AI SDR:</strong> Autonomous conversational voice caller that books meetings on autopilot.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>24/7 Upwork Bidding:</strong> AI proposal dispatcher submits proposals in under 3 minutes of job posts.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Unlimited Team Seats:</strong> Add all SDRs and agency reps without paying $129/seat software taxes.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200 dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Lemlist Limitations</span>
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Expensive Seat Pricing:</strong> Multi-channel tier costs $129/seat/month ($645/mo for 5 reps).</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Browser Extension Ban Risk:</strong> Local Chrome extension triggers LinkedIn security checkpoints.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Voice AI Automation:</strong> Manual dialer integrations only without conversational AI agents.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>No Marketplace Bidding:</strong> Zero support for scanning Upwork/Freelancer project feeds.</span>
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
                    Lemlist
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
                        <span>{row.lemlist}</span>
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
            Per-Seat Elimination Savings
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Lemlist seat pricing ($129/seat/mo) vs Outtricks flat pricing
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
              <span className="text-xs text-slate-500 font-sans block">Lemlist Multichannel</span>
              <strong className="text-2xl font-black text-rose-600 block">${lemlistMonthlyCost}/mo</strong>
              <span className="text-[10px] text-slate-400 font-sans block">$129/seat + dialer</span>
            </div>

            <div className="p-5 bg-blue-50/80 dark:bg-white/[0.04] rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-sans block">Outtricks All-in-One</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block">${outtricksMonthlyCost}/mo</strong>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans block">Unlimited team seats included</span>
            </div>

            <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-sans block">Your Annual Savings</span>
              <strong className="text-2xl font-black text-emerald-600 block">${Math.max(0, annualSavings).toLocaleString()}/yr</strong>
              <span className="text-[10px] text-emerald-600 font-sans block">Zero seat taxes</span>
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
                <span>100% cloud-safe LinkedIn automation via official versioned APIs and dedicated residential proxies.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Autonomous sub-400ms Voice AI SDRs that qualify inbound leads and book meetings directly.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>24/7 freelance marketplace proposal automation on Upwork and Freelancer project feeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Flat predictable monthly pricing with unlimited team seats and shared credit pools.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-4">
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-sans font-bold uppercase text-[10px]">
              SEAT-BASED USE CASE
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Choose Lemlist If You:
            </h3>
            <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Are a solo rep looking for personalized image templates and don't mind running Chrome extensions.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Do not require autonomous Voice AI calling, freelance bidding, or a native PostgreSQL Deals CRM.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Have a small team where per-seat software pricing ($129/seat/mo) fits within your budget.</span>
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
            Why Modern Revenue Teams Switch to Outtricks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 01</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Cloud-Safe LinkedIn</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Official versioned API & dedicated residential cloud proxies ensure zero browser extension checkpoints or bans.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 02</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Sub-400ms Voice SDR</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Autonomous WebRTC conversational voice caller that turns warm inbound leads and email opens into booked meetings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-indigo-600 font-bold uppercase text-[10px]">PILLAR 03</span>
            <strong className="text-slate-900 dark:text-white text-sm block">24/7 AI Proposal Bidding</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Scans Upwork & Freelancer feeds and dispatches tailored AI bids in under 3 minutes of jobs going live.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2.5">
            <span className="text-emerald-600 font-bold uppercase text-[10px]">PILLAR 04</span>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block">Unlimited Seats</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Invite all SDRs, account executives, and agency managers without paying expensive per-seat software taxes.
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
            <span>CLOUD-SAFE REVENUE SCALING</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Upgrade from Lemlist to Outtricks?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Consolidate your outreach stack, eliminate seat taxes, and start generating predictable pipeline on 1 platform.
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
          7-Day Free Trial • Unlimited Team Seats • 100% Cloud-Safe LinkedIn
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
            Outtricks vs Lemlist FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {LEMLIST_FAQS.map((faq, fIdx) => {
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
