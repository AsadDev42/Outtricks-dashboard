import { SEOHead } from '../components/seo/SEOHead';
import React from 'react';
import { Link } from 'react-router-dom';
import { Database, ShieldCheck, Lock, CheckCircle2, ArrowRight, Zap, RefreshCw, Cpu, Server } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead 
        title="System Architecture & Enterprise Security | Outtricks"
        description="Learn about Outtricks low-latency WebRTC infrastructure, PostgreSQL unified data layer, and enterprise-grade security."
        canonical="https://outtricks.com/architecture"
        keywords={["Outtricks architecture","WebRTC voice infrastructure","PostgreSQL revenue CRM","sales platform security"]}
        breadcrumbs={[{"name":"Architecture","url":"/architecture"}]}
      />
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A]/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-sans uppercase tracking-wider">
          Technical Manifesto & Governance
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Why We Built Outtricks Around One Single Database
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Most sales teams lose up to 30% of their pipeline simply because their tools don't talk to each other. Here is how our zero-sync architecture solves it.
        </p>
      </div>

      {/* 4 Pillars of Outtricks Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-clean space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">01. Single PostgreSQL Schema</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            CRM, contact pool, email inboxes, LinkedIn automation, Voice AI, billing ledgers, and analytics all write to one PostgreSQL instance under one unified schema design. Every row is scoped to your organization with row-level security (RLS).
          </p>
          <div className="text-xs font-sans text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-white/[0.04] p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40">
            Result: 0 Sync Jobs to maintain • Dashboards load in &lt; 200ms
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-clean space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">02. Pre-Send Suppression Engine</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            In a traditional stack, when a prospect unsubscribes from an email, your LinkedIn bot or Voice dialer might not know for 24 hours. In Outtricks, suppression is checked in the write-path before every action executes on any channel.
          </p>
          <div className="text-xs font-sans text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
            Result: 100% CAN-SPAM, GDPR, and TCPA Do-Not-Call Compliance
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-clean space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">03. Append-Only Credit Ledger</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Credits are never overwritten. Every unlock, verification, send, and AI call is an immutable line item. Balance checks are transactional and strongly consistent, preventing race conditions or ghost charges.
          </p>
          <div className="text-xs font-sans text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-white/[0.04] p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40">
            Result: Transparent client billing allocations for agencies
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-clean space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">04. Model-Agnostic AI Layer</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            AI generation, voice synthesis, speech-to-text, and proposal drafting sit behind one internal interface. The platform can seamlessly leverage Claude 3.5, GPT-4o, Deepgram, and ElevenLabs without breaking your workflows.
          </p>
          <div className="text-xs font-sans text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-white/[0.04] p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40">
            Result: Future-proof AI engine that gets faster and cheaper over time
          </div>
        </div>

      </div>

      {/* Security & Compliance Certifications */}
      <div className="bg-slate-900 dark:bg-[#0D0D0D] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-sans font-bold text-blue-400 uppercase tracking-widest">
            Enterprise Security
          </span>
          <h2 className="text-3xl font-extrabold text-white">Enterprise Grade Security & Data Governance</h2>
          <p className="text-slate-300 text-sm">
            TLS 1.3 in transit, AES-256 at rest, strict tenant row isolation, and immutable audit logging.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 bg-slate-800/80 dark:bg-[#141414] rounded-2xl border border-slate-700 dark:border-[#2A2A2A] space-y-1">
            <div className="text-emerald-400 font-bold">GDPR & CCPA</div>
            <div className="text-slate-400">First-class DSR Flow</div>
          </div>
          <div className="p-4 bg-slate-800/80 dark:bg-[#141414] rounded-2xl border border-slate-700 dark:border-[#2A2A2A] space-y-1">
            <div className="text-emerald-400 font-bold">TCPA & DNC</div>
            <div className="text-slate-400">Pre-call verification</div>
          </div>
          <div className="p-4 bg-slate-800/80 dark:bg-[#141414] rounded-2xl border border-slate-700 dark:border-[#2A2A2A] space-y-1">
            <div className="text-emerald-400 font-bold">AES-256</div>
            <div className="text-slate-400">Encrypted at rest</div>
          </div>
          <div className="p-4 bg-slate-800/80 dark:bg-[#141414] rounded-2xl border border-slate-700 dark:border-[#2A2A2A] space-y-1">
            <div className="text-emerald-400 font-bold">Row-Level RLS</div>
            <div className="text-slate-400">Isolated per tenant</div>
          </div>
        </div>
      </div>

    </div>
  );
};
