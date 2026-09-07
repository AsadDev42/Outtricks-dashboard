import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Workflow, 
  Building2, 
  BarChart3, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { LeadDatabaseSearch } from '../LeadDatabaseSearch';
import { VoiceSimulator } from '../VoiceSimulator';
import { FlowSimulator } from '../FlowSimulator';
import { DealPipelineKanban } from '../DealPipelineKanban';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ChannelsDeepDiveSection: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* =========================================================================
          1. B2B LEAD GENERATION & PROSPECT SEARCH (Interactive Search Sandbox)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PROSPECT INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find and Target High-Fit Leads in Seconds
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Target decision makers using 8D filters across 480M+ global contacts with direct work emails and phone lines.
          </p>
        </div>

        {/* Live Search Sandbox */}
        <LeadDatabaseSearch />
        
        <div className="text-center pt-2">
          <Link to="/platform/lead-finder" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <span>Explore Full 480M+ Lead Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          2. MULTI-INBOX COLD EMAIL OUTREACH
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                COLD EMAIL INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Scale Cold Email With 99.4% Inbox Deliverability
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Distribute sending volume across unlimited connected Google and Microsoft inboxes with automated peer-to-peer warmup, custom spintax, and real-time deliverability protection.
              </p>
            </div>

            <Link
              to="/platform/email-outreach"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 self-start lg:self-auto shadow-md shadow-blue-600/25 transition-all"
            >
              <span>Explore Email Outreach</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
              <div className="text-2xl font-black font-sans text-blue-600 dark:text-blue-400">Unlimited</div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Multi-Inbox Rotation</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Connect Google Workspace & Microsoft 365 inboxes with automated sending ramp-up.
              </p>
            </div>

            <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
              <div className="text-2xl font-black font-sans text-emerald-600">99.4%</div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Inbox Placement</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Continuous deliverability monitoring with DNS SPF, DKIM, and DMARC verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
              <div className="text-2xl font-black font-sans text-blue-600">Spintax</div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">AI Personalization</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate dynamic icebreakers and value propositions adapted to prospect seniority.
              </p>
            </div>

            <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
              <div className="text-2xl font-black font-sans text-amber-600">Auto</div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Follow-Up Cadences</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Trigger context-aware follow-up sequences automatically until prospects reply.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. REAL-TIME CONVERSATIONAL VOICE AI SDR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CONVERSATIONAL VOICE SDR
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let AI Have the Conversation in Sub-400ms
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Engage prospects with natural sub-second voice calls. Qualify buying intent, answer technical questions, overcome objections, and book meetings into your sales calendar live.
          </p>
        </div>

        {/* Live Voice AI Simulator Component */}
        <VoiceSimulator />
      </section>

      {/* =========================================================================
          4. UNIFIED DEALS CRM & PIPELINE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            NATIVE REVENUE PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Every Touchpoint Writes to One Contact Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            No messy Zapier webhooks. Every cold email reply, LinkedIn connection, Voice AI call transcript, and demo booking updates your CRM with 0ms sync drift.
          </p>
        </div>

        <DealPipelineKanban />
      </section>

      {/* =========================================================================
          5. INTELLIGENT REVENUE WORKFLOWS (Redesigned Flow Simulator Canvas)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            INTELLIGENT REVENUE WORKFLOWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Build Workflows That Run Your Revenue for You
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Connect every step of your outbound process in one intelligent workflow. Outtricks detects what happens next and automatically takes the right action across every channel.
          </p>
        </div>

        {/* Live Interactive Flow Simulator */}
        <FlowSimulator />
      </section>

    </div>
  );
};

