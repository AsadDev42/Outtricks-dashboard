import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useRef, useEffect } from 'react';
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
  Scale,
  Layers
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';
import { COMPARISONS_MENU } from '../../data/navigation';
import { useTheme } from '../../context/ThemeContext';

interface MatrixRow {
  capability: string;
  category: string;
  outtricks: string;
  apollo: string;
  clay: string;
  instantly: string;
  smartlead: string;
  lemlist: string;
  outreach: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const COMPARISON_MATRIX: MatrixRow[] = [
  {
    category: 'Data & Contact Search',
    capability: 'B2B Lead Database',
    outtricks: '480M+ Verified Contacts (8D Filters)',
    apollo: '275M Contacts (Static)',
    clay: 'Third-party APIs (Credit Drain)',
    instantly: 'Add-on Database ($47-$197/mo)',
    smartlead: 'Not Included (External CSVs)',
    lemlist: 'Add-on Lead Database ($)',
    outreach: 'Not Included (Requires ZoomInfo $25k+)'
  },
  {
    category: 'Data & Contact Search',
    capability: 'Lead Data Verification',
    outtricks: 'multiDimensional Real-Time Cascade',
    apollo: 'Single Internal Apollo DB',
    clay: 'Multi-Source (Burns Credits)',
    instantly: 'Basic Catch-All Filter',
    smartlead: 'Basic Validation Only',
    lemlist: 'Email Finder Only',
    outreach: 'Requires Separate Contact Search Tools'
  },
  {
    category: 'Outreach Execution',
    capability: 'Multi-Inbox Cold Email',
    outtricks: 'Unlimited Inboxes + P2P Warmup',
    apollo: 'Limited (Seat Tier Restricted)',
    clay: 'Not Supported (Contact Search Only)',
    instantly: 'Unlimited Inboxes + Warmup',
    smartlead: 'Unlimited Inboxes + Warmup',
    lemlist: 'Limited per Seat Tier',
    outreach: 'Single Primary Domain Mailbox'
  },
  {
    category: 'Outreach Execution',
    capability: 'Safe LinkedIn Cloud Automation',
    outtricks: 'Official Versioned API + Cloud Proxies',
    apollo: 'Chrome Extension Tasks',
    clay: 'Profile Scraping Only',
    instantly: 'Not Supported',
    smartlead: 'Not Supported',
    lemlist: 'Chrome Extension (Ban Risk)',
    outreach: 'Manual Task Reminders Only'
  },
  {
    category: 'AI Agents & Voice',
    capability: 'Conversational Voice AI SDR',
    outtricks: 'Sub-400ms WebRTC Voice SDR',
    apollo: 'Manual Click-to-Call Dialer',
    clay: 'Not Supported',
    instantly: 'Not Supported',
    smartlead: 'Not Supported',
    lemlist: 'Manual Aircall Integration',
    outreach: 'Manual Dialer + Kaia Recording'
  },
  {
    category: 'AI Agents & Voice',
    capability: 'Freelance AI Proposal Bidding',
    outtricks: '24/7 Upwork & Freelancer Bids (< 3 Mins)',
    apollo: 'Not Supported',
    clay: 'Not Supported',
    instantly: 'Not Supported',
    smartlead: 'Not Supported',
    lemlist: 'Not Supported',
    outreach: 'Not Supported'
  },
  {
    category: 'CRM & Infrastructure',
    capability: 'Native Deals CRM Pipeline',
    outtricks: 'Single PostgreSQL Core (0ms Sync)',
    apollo: 'Basic CRM (Syncs to Salesforce)',
    clay: 'Spreadsheet Grid (No Deals)',
    instantly: 'Email Unibox (External CRM)',
    smartlead: 'Master Inbox (External CRM)',
    lemlist: 'Lead Inbox (External CRM)',
    outreach: 'Salesforce API Bi-Directional Sync'
  },
  {
    category: 'CRM & Infrastructure',
    capability: 'Pricing & Team Seat Model',
    outtricks: 'Flat Monthly (Unlimited Seats)',
    apollo: '$99/user/mo + Add-ons',
    clay: '$149-$800+/mo (Credit Based)',
    instantly: '$97/mo (Email Only)',
    smartlead: '$94/mo (Email Only)',
    lemlist: '$129/user/mo (Multichannel)',
    outreach: '$150-$250/user/mo (Annual Lock)'
  }
];

const OVERVIEW_FAQS: FaqItem[] = [
  {
    question: 'What makes Outtricks different from point solutions like Apollo, Instantly, and Clay?',
    answer: 'Traditional sales stacks require buying 4-6 disjointed tools: Apollo for leads ($99/seat), Clay for Contact Search ($349+/mo), Smartlead or Instantly for email ($97/mo), a Voice dialer ($150/mo), and Zapier to sync them. Outtricks is a unified AI Revenue Operating System that combines all 6 engines on 1 native PostgreSQL schema with 0ms sync drift and flat pricing.'
  },
  {
    question: 'How does Outtricks achieve 99.4% cold email deliverability across multiple inboxes?',
    answer: 'Outtricks utilizes automated multi-inbox rotation across secondary domains, automated peer-to-peer warmup pools, custom tracking domain isolation, real-time SMTP handshakes, and AI-powered dynamic spintax personalization to ensure emails stay out of spam filters.'
  },
  {
    question: 'Why is Outtricks Voice AI SDR faster than traditional dialers?',
    answer: 'Outtricks Voice AI runs on a proprietary sub-400ms WebRTC low-latency audio pipeline. It engages leads in human-like natural conversation, answers questions, handles common objections dynamically, and directly books appointments to Google or Outlook calendars.'
  },
  {
    question: 'How safe is Outtricks LinkedIn automation compared to Chrome extensions?',
    answer: 'Unlike tools that run local Chrome browser extensions (which inject scripts and risk LinkedIn account bans), Outtricks operates 100% in the cloud via official versioned API endpoints and dedicated residential proxies with randomized human pacing.'
  },
  {
    question: 'Can Outtricks replace my external CRM like HubSpot or Salesforce?',
    answer: 'Yes! Outtricks includes a native 5-stage Deals CRM Kanban that tracks deals from lead discovery to closed-won revenue. For enterprise teams using Salesforce or HubSpot, Outtricks also provides zero-drift bidirectional sync.'
  },
  {
    question: 'How much money can a sales team save by consolidating on Outtricks?',
    answer: 'A typical 5-person sales team saves between $400 and $1,200 per month ($5,000 to $14,000+ annually) by eliminating separate subscriptions for lead scrapers, search credits, email senders, dialers, and Zapier connectors.'
  },
  {
    question: 'How long does it take to migrate an existing outbound stack to Outtricks?',
    answer: 'Migration takes under 15 minutes. You can import existing CSV prospect lists, connect your Google/Microsoft mailboxes with 1-click OAuth, and launch pre-built multi-channel sequences immediately.'
  },
  {
    question: 'Is there a free trial available to test all features?',
    answer: 'Yes! Outtricks offers a 7-Day Free Trial with full sandbox access to 480M+ lead search, 15-source contact search, cold email dispatch, Voice AI SDR, and Deals CRM.'
  }
];

export const ComparisonsOverviewPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);
  const { reducedMotion } = useTheme();

  // Scroll reveal observer for Full Market Feature Matrix
  const matrixSectionRef = useRef<HTMLElement>(null);
  const [isMatrixVisible, setIsMatrixVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setIsMatrixVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMatrixVisible(true);
          if (matrixSectionRef.current) {
            observer.unobserve(matrixSectionRef.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (matrixSectionRef.current) {
      observer.observe(matrixSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  // Total Cost of Fragmented Stack: Apollo ($99/seat) + Clay ($349) + Smartlead ($94) + Voice ($150) + Zapier ($49)
  const fragmentedMonthlyCost = teamSize * 99 + 349 + 94 + 150 + 49;
  const outtricksMonthlyCost = 199; // Flat Agency Pro
  const annualSavings = (fragmentedMonthlyCost - outtricksMonthlyCost) * 12;

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Outtricks Competitor Comparisons & Platform Matrix"
        description="Compare Outtricks with Apollo.io, Instantly, Smartlead, Clay, Lemlist, and Outreach. See features, pricing, and architecture differences."
        canonical="https://outtricks.com/comparisons"
        keywords={["Outtricks comparisons","Apollo vs Outtricks","Instantly vs Outtricks","Clay vs Outtricks","Smartlead vs Outtricks"]}
        breadcrumbs={[{"name":"Comparisons","url":"/comparisons"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: Compare All Outbound Platforms
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            COMPREHENSIVE MARKET BATTLECARDS
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Compare Outtricks vs The Market
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          See how Outtricks' unified AI Revenue Operating System compares directly against fragmented point solutions across data accuracy, multi-channel execution, and total cost of ownership.
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
          HEAD-TO-HEAD BATTLECARD DIRECTORY
          ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            HEAD-TO-HEAD BATTLECARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Select a Platform to Compare
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Click on any competitor below to read the comprehensive technical and strategic comparison breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISONS_MENU.map((comp, idx) => (
            <Card3DTilt key={idx} maxTilt={6}>
              <Link
                to={comp.href}
                className="bg-white dark:bg-[#141414] p-8 rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-clean hover:shadow-clean-lg transition-all space-y-4 group flex flex-col justify-between h-full block"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5" />
                    </div>
                    {comp.badge && (
                      <span className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {comp.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {comp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>View Head-to-Head Comparison</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FULL MARKET COMPARISON MATRIX TABLE
          ========================================================================= */}
      <section ref={matrixSectionRef} className="space-y-8">
        
        <div 
          className={`text-center max-w-3xl mx-auto space-y-3 transition-all duration-700 ease-out ${
            isMatrixVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-white/[0.04] border border-blue-200/60 dark:border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Full Market Feature Matrix
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            How Outtricks Compares Across the Entire Market
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Outtricks is built as the first unified AI revenue operating system, eliminating the need to buy and connect 6 separate tools.
          </p>
        </div>

        <div 
          className={`bg-white dark:bg-[#0b101f] rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl shadow-slate-900/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(37,99,235,0.04)] overflow-hidden transition-all duration-700 ease-out delay-150 ${
            isMatrixVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Mobile swipe indicator */}
          <div className="lg:hidden px-4 py-2 bg-slate-50/80 dark:bg-[#0e1526] border-b border-slate-200/60 dark:border-[#202020] text-center text-[10px] font-sans text-slate-400 flex items-center justify-center gap-1.5">
            <span>← Swipe horizontally to view full competitor matrix →</span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[960px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/90 dark:bg-[#0a0e1a] font-sans text-[11px]">
                  <th className="py-4.5 px-5 font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[240px] sticky left-0 z-20 bg-slate-50/95 dark:bg-[#0a0e1a]/95 backdrop-blur-sm border-r border-slate-200/60 dark:border-[#202020]">
                    Capability
                  </th>
                  <th className="py-4.5 px-5 bg-blue-500/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 font-black text-xs sm:text-sm tracking-tight border-x border-blue-200/80 dark:border-blue-500/25 w-[250px] relative">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                      <span>Outtricks</span>
                      <span className="ml-auto text-[9px] font-sans font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white dark:bg-blue-500 uppercase tracking-wider">
                        All-In-One
                      </span>
                    </div>
                  </th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Apollo</th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Clay</th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Instantly</th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Smartlead</th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Lemlist</th>
                  <th className="py-4.5 px-3 text-slate-600 dark:text-slate-400 font-bold text-center w-[110px]">Outreach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] font-sans text-xs">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-slate-50/80 dark:hover:bg-[#131d35]/50 transition-colors group even:bg-slate-50/25 dark:even:bg-white/[0.015]"
                  >
                    <td className="py-4 px-5 sticky left-0 z-10 bg-white dark:bg-[#0b101f] group-hover:bg-slate-50/90 dark:group-hover:bg-[#131d35]/90 border-r border-slate-200/60 dark:border-[#202020] transition-colors">
                      <span className="inline-block px-2 py-0.5 mb-1 rounded bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 text-[9px] font-sans font-extrabold uppercase tracking-wider border border-blue-100 dark:border-blue-900/40">
                        {row.category}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {row.capability}
                      </span>
                    </td>
                    <td className="py-4 px-5 bg-blue-50/50 dark:bg-white/[0.04] text-slate-950 dark:text-white font-bold border-x border-blue-100/80 dark:border-blue-500/15 group-hover:bg-blue-50/70 dark:group-hover:bg-blue-950/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-600/60 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                        </div>
                        <span className="font-extrabold text-slate-950 dark:text-white text-xs leading-snug">
                          {row.outtricks}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.apollo}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.clay}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.instantly}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.smartlead}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.lemlist}</td>
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-400 text-center leading-relaxed">{row.outreach}</td>
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
            Market Stack Savings Calculator
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Apollo ($99/seat) + Clay ($349) + Senders ($94) + Voice ($150) + Zapier ($49) vs Outtricks flat pricing
          </p>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-bold font-sans text-slate-700 dark:text-slate-300 mb-2">
              <span>Sales Team Size:</span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-extrabold">{teamSize} Reps</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-sans">
            <div className="p-5 bg-slate-50 dark:bg-[#181818] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-1">
              <span className="text-xs text-slate-500 font-sans block">Fragmented 5-Tool Stack</span>
              <strong className="text-2xl font-black text-rose-600 block">${fragmentedMonthlyCost.toLocaleString()}/mo</strong>
              <span className="text-[10px] text-slate-400 font-sans block">Multiple subscriptions + Zapier</span>
            </div>

            <div className="p-5 bg-blue-50/80 dark:bg-white/[0.04] rounded-2xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-sans block">Outtricks All-in-One</span>
              <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block">${outtricksMonthlyCost}/mo</strong>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans block">All 6 engines included flat</span>
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
          WHY CHOOSE OUTTRICKS: 4 Core Architectural Advantages
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ARCHITECTURAL ADVANTAGE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Why High-Growth Teams Choose Outtricks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 01</span>
            <strong className="text-slate-900 dark:text-white text-sm block">1 Unified Database</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              No webhook sync drift. Lead discovery, multi-inbox email, Voice SDR, LinkedIn, and Deals CRM on 1 PostgreSQL core.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-blue-600 font-bold uppercase text-[10px]">PILLAR 02</span>
            <strong className="text-slate-900 dark:text-white text-sm block">15-Source multiAttribute</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Cascading real-time queries guarantee 85%+ verified direct phones and valid emails before launching campaigns.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <span className="text-indigo-600 font-bold uppercase text-[10px]">PILLAR 03</span>
            <strong className="text-slate-900 dark:text-white text-sm block">Sub-400ms Voice SDR</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Autonomous WebRTC conversational voice caller that turns warm inbound leads and email opens into booked meetings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2.5">
            <span className="text-emerald-600 font-bold uppercase text-[10px]">PILLAR 04</span>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block">Zero Seat Taxes</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Invite your entire team, SDRs, and agency managers without paying expensive per-seat software taxes.
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
            <span>UNIFIED AI REVENUE OPERATING SYSTEM</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Cut Outbound Stack Costs by 70%?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Stop paying for Apollo + Clay + Smartlead + Dialers + Zapier. Consolidate onto Outtricks and scale predictable revenue.
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
            Market Comparison FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {OVERVIEW_FAQS.map((faq, fIdx) => {
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
