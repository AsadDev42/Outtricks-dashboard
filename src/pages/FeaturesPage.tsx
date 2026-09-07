import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Sparkles, 
  Database, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Bot,
  Activity,
  Layers,
  Clock,
  Radio
} from 'lucide-react';
import { FlowSimulator } from '../components/FlowSimulator';
import { VoiceSimulator } from '../components/VoiceSimulator';
import { LeadDatabaseSearch } from '../components/LeadDatabaseSearch';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A]/70 border border-blue-200 text-blue-700 text-xs font-bold font-sans uppercase tracking-wider">
          Platform Architecture & 6 Channels
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Run High-Converting Outbound
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Explore all six autonomous outreach channels operating on a single, shared PostgreSQL database.
        </p>
      </div>

      {/* Feature 1: Multi-Inbox Email */}
      <section id="email" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-clean-md">
        <div className="lg:col-span-6 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A]/70 text-blue-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-sans font-bold text-blue-600 uppercase tracking-widest">Channel 01 • Multi-Inbox</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Multi-Inbox Cold Email with Automated Warmup Ramp
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Distribute email send volume across unlimited Google Workspace, Microsoft 365, and AWS SES inboxes. Automated ramp-up algorithms protect deliverability scores while AI personalization tokens make every email unique.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>SPF, DKIM, DMARC automated health validation per inbox</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Pre-send suppression list checks before every single dispatch</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Automatic inbox rotation if spam complaint thresholds trigger</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 text-white space-y-4 font-sans text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-slate-400">INBOX POOL MANAGER</span>
            <span className="text-emerald-400 font-bold">12/12 Inboxes Healthy</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">alex@cloudscale.io</div>
                <div className="text-[10px] text-slate-400">Google Workspace • Warmup Day 24</div>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">99.8%</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">alex.r@cloudscale.net</div>
                <div className="text-[10px] text-slate-400">Microsoft Office 365 • Active Sending</div>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">99.2%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Voice AI */}
      <section id="voice" className="space-y-8">
        <VoiceSimulator />
      </section>

      {/* Feature 3: LinkedIn */}
      <section id="linkedin" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-clean-md">
        <div className="lg:col-span-6 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Linkedin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-widest">Channel 03 • LinkedIn Official</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              100% Account Safety via Official Versioned API
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Unlike chrome extensions that hijack your browser session and trigger LinkedIn security restrictions, Outtricks operates exclusively through LinkedIn's official versioned API with dedicated IP proxies.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Smart capability matrix shows allowed daily actions up front</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Automated connection requests, direct InMails, and skill endorsements</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Shared suppression list: never InMail leads who opted out of email</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 bg-slate-50 dark:bg-[#141414] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] space-y-3 text-xs">
          <div className="flex justify-between items-center font-bold text-slate-700 dark:text-slate-300">
            <span>LinkedIn Proxy Safety Status</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-sans">DEDICATED IP</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#2A2A2A] space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">Account: Sarah Connor (Founder)</div>
            <div className="text-slate-500 text-[11px]">API Connection: v202410 (Official OAuth)</div>
            <div className="flex gap-2 text-[10px] pt-1">
              <span className="bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">25 DMs / day cap</span>
              <span className="bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">40 Invites / day cap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Lead Database Search */}
      <section id="database" className="space-y-8">
        <LeadDatabaseSearch />
      </section>

      {/* Feature 5: Flow Simulator */}
      <section id="flow" className="space-y-8">
        <FlowSimulator />
      </section>

    </div>
  );
};

