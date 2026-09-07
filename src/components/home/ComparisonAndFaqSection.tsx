import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  Users
} from 'lucide-react';
import { RoiCalculator } from '../RoiCalculator';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ComparisonAndFaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: "What is Outtricks?",
      a: "Outtricks is a unified AI Revenue Operating System combining B2B lead generation, contact search, multi-inbox cold email, LinkedIn automation, Voice AI SDRs, CRM, and revenue workflow automation on a single connected PostgreSQL database."
    },
    {
      q: "What channels does Outtricks support?",
      a: "Outtricks natively supports 6 revenue channels: Cold Email (multi-inbox Google/Microsoft), LinkedIn (official versioned API + dedicated residential proxy), Voice AI SDR (sub-400ms WebRTC calling), B2B Database Search (480M+ contacts), Freelance Bidding AI (Upwork/Freelancer), and Unified Deals CRM."
    },
    {
      q: "How does AI lead generation work?",
      a: "You query our 480M+ verified global database using 8-dimensional filters (Seniority, Industry, Tech Stack, Funding rounds, Hiring signals). Outtricks verifies work emails and phone numbers via MultiDimensional Lead Search before any outreach is sent."
    },
    {
      q: "Can Outtricks automate cold email?",
      a: "Yes. Connect unlimited Google Workspace and Microsoft 365 inboxes. Outtricks automatically rotates sending across inboxes, manages peer-to-peer warmup, optimizes daily deliverability caps, and generates dynamic spintax variants."
    },
    {
      q: "Does it support LinkedIn outreach?",
      a: "Yes. Outtricks connects directly to LinkedIn via official versioned OAuth APIs with dedicated static residential IP proxies allocated to each account�ensuring 100% account safety with zero risky Chrome extension scraping."
    },
    {
      q: "What is Voice AI SDR?",
      a: "Our Voice AI SDR is an autonomous WebRTC voice agent with sub-400ms conversational latency. It dials qualified leads, engages in natural two-way conversations, overcomes objections using your battlecards, and books demo slots into your calendar live."
    },
    {
      q: "Does Outtricks include a CRM?",
      a: "Yes. Outtricks includes a native Kanban Deals CRM. Because it shares the same database as your outreach channels, every email reply, phone call recording, and LinkedIn interaction writes directly to the contact's timeline with 0ms sync drift."
    },
    {
      q: "How does the unified revenue workflow work?",
      a: "Our visual drag-and-drop workflow engine lets you build multi-channel sequences: e.g. 'Find verified lead ? Send cold email ? If opened but no reply in 2 days, send LinkedIn connection ? If accepted, trigger Voice AI SDR call ? If qualified, create CRM deal'."
    },
    {
      q: "Is Outtricks suitable for agencies?",
      a: "Yes. Agencies can manage unlimited client workspaces with custom subdomains (e.g. app.youragency.com), custom white-label branding, pooled credit wallets, and row-level multi-tenant database isolation."
    },
    {
      q: "How does the free trial work?",
      a: "We offer a 7-day free trial with full platform access, included search credits, and sandbox access. No credit card required, and you can cancel anytime with 1 click."
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* =========================================================================
          1. WHY OUTTRICKS VS FRAGMENTED STACK (Comparison Table)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            WHY OUTTRICKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Replace a Fragmented Stack With One Revenue Engine
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            See how Outtricks replaces $1,400/mo in disconnected SaaS subscriptions with one native operating system.
          </p>
        </div>

        <div className="liquid-glass rounded-3xl shadow-clean overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-[#181818]/80 border-b border-slate-200/80 dark:border-[#2A2A2A]">
                <th className="py-4 px-6 text-slate-500 dark:text-slate-400 font-sans uppercase text-xs">Traditional 6-Tool Stack</th>
                <th className="py-4 px-6 bg-blue-50/70 dark:bg-white/[0.04] text-slate-900 dark:text-blue-200 font-extrabold border-x border-blue-100 dark:border-blue-900">Outtricks AI Revenue OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {[
                { old: "6 separate disconnected subscriptions ($1,400+/mo)", new: "1 unified all-inclusive platform ($79/mo)" },
                { old: "Separate isolated databases with duplicate records", new: "Single PostgreSQL core with unified 360� timelines" },
                { old: "Fragile third-party Zapier/Make webhooks that break", new: "Native 0ms sync drift between all 6 channels" },
                { old: "Chrome extensions risking LinkedIn account bans", new: "Official versioned OAuth API & dedicated static proxy" },
                { old: "Manual SDR dials or third-party phone integrations", new: "Autonomous sub-400ms conversational Voice AI SDR" },
                { old: "Conflicting channel dashboards & broken attribution", new: "End-to-end attribution from first touch to closed ARR" }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400 flex items-center gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0">?</span>
                    <span>{row.old}</span>
                  </td>
                  <td className="py-4 px-6 bg-blue-50/30 dark:bg-white/[0.04] text-slate-900 dark:text-white font-bold border-x border-blue-100/60 dark:border-blue-900/60">
                    <div className="flex items-center gap-2.5 text-slate-900 dark:text-blue-200">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{row.new}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          2. ROI & REVENUE CALCULATOR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            INTERACTIVE FORECASTING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Calculate Your Outbound Revenue Potential
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Adjust sending volume and deal size to see how much pipeline Outtricks can unlock for your team.
          </p>
        </div>

        <RoiCalculator />
      </section>

      {/* =========================================================================
          3. COMPREHENSIVE FAQ ACCORDION (10 Buyer Questions)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Common questions about Outtricks channels, CRM architecture, pricing, and deliverability.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="liquid-glass-card rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-[#2A2A2A] pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. FINAL HIGH-CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass rounded-3xl p-8 sm:p-14 shadow-clean text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold uppercase tracking-wider">
            GET STARTED TODAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Turn Outbound Into a Predictable Revenue Channel?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Join thousands of modern sales teams, founders, and agencies scaling multi-channel outbound on a single unified database.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Start Free 7-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book a Live Demo</span>
            </Link>
          </div>

          <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 pt-2">
            Instant Setup � 7-Day Free Trial � No Credit Card Required
          </div>
        </div>
      </section>

    </div>
  );
};


