import { SEOHead } from '../../components/seo/SEOHead';
﻿import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Card3DTilt } from '../../components/3d/Card3DTilt';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <SEOHead 
        title="About Outtricks | The Unified AI Revenue Operating System"
        description="Our mission is to help modern revenue teams eliminate tool sprawl and run predictable outbound engines on 1 synchronized database."
        canonical="https://outtricks.com/about"
        keywords={["about Outtricks","Outtricks company","revenue operating system team","sales AI platform mission"]}
        breadcrumbs={[{"name":"About","url":"/about"}]}
      />
      
      {/* 1. HERO */}
      <PageHeader 
        badge="About Outtricks"
        title="We're Building the Autonomous Revenue Operating System"
        description="Outtricks was founded on a simple conviction: modern revenue teams shouldn't need 6 disconnected subscriptions, fragile webhooks, and manual CSV exports to build a predictable outbound pipeline."
        highlights={["One Database Schema", "Autonomous 6-Channel OS", "100% Bootstrapped Mindset", "Global Remote Team"]}
      />

      {/* 2. OUR MISSION */}
      <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-14 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-6 max-w-4xl mx-auto text-center">
        <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">OUR MISSION</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          To turn every outbound revenue channel into one synchronized, unstoppable engine.
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We believe the future of B2B sales belongs to lean, highly-leveraged teams powered by autonomous AI. By uniting 480M+ prospect data, multi-inbox cold email, safe LinkedIn engagement, and sub-400ms Voice AI SDRs on one database, we give 1 sales rep the leverage of 10.
        </p>
      </section>

      {/* 3. WHY OUTTRICKS EXISTS (The Outbound Problem & Approach) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card3DTilt maxTilt={5}>
          <div className="bg-white dark:bg-[#141414] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-4 h-full">
            <span className="text-xs font-sans font-bold text-rose-500 uppercase">THE PROBLEM WE EXPERIENCED</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Fragmented 6-Tool Nightmare</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In 2024, our founders ran sales operations across multiple B2B startups. We were spending $1,400/month per rep on Apollo for leads, Clay for Contact Search, Smartlead for email, Chrome bots for LinkedIn, Orum for calls, and Zapier to glue them together.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Data was constantly out of sync. Webhooks failed silently. Prospects received contradictory emails and LinkedIn DMs. It was broken.
            </p>
          </div>
        </Card3DTilt>

        <Card3DTilt maxTilt={5}>
          <div className="bg-white dark:bg-[#141414] p-8 sm:p-10 rounded-3xl border border-blue-100 dark:border-blue-900 shadow-clean space-y-4 h-full">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">OUR APPROACH</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The 1-Database Revenue Architecture</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We started from first principles: what if prospecting, outreach, dialing, CRM, and analytics shared one single PostgreSQL schema?
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero webhooks. Zero sync delays. One universal suppression list. One credit ledger. When an email bounces or a prospect replies on LinkedIn, every other channel updates in sub-second latency.
            </p>
          </div>
        </Card3DTilt>
      </section>

      {/* 4. COMPANY CORE VALUES */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CORE PRINCIPLES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            How We Build & Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Product-Led Truth", desc: "No vaporware or fake metric claims. Every feature, simulator, and data point is backed by working code.", icon: Zap },
            { title: "Zero Sync Drift", desc: "We eliminate fragile third-party webhooks in favor of native, single-database event streams.", icon: Layers },
            { title: "Safe & Compliant", desc: "We protect customer domain reputation and LinkedIn profiles with official versioned APIs and static proxies.", icon: ShieldCheck },
            { title: "Customer ROI First", desc: "We only succeed when our users generate real, verifiable pipeline and closed revenue.", icon: Target },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-3">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FUTURE VISION */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs font-sans font-bold text-blue-400 uppercase">THE ROAD AHEAD</span>
        <h3 className="text-3xl font-extrabold">Autonomous Revenue for the Next Decade</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We are just getting started. As generative AI and multi-modal models evolve, Outtricks will continue to pioneer autonomous outbound workflows that empower sales teams to do the best work of their careers.
        </p>
        <div className="pt-2">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] text-slate-900 dark:text-white font-extrabold text-xs hover:bg-slate-100 shadow-xl transition-all"
          >
            <span>We're Hiring • View Open Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

