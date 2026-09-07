import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Workflow, 
  Layers, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card3DTilt } from './Card3DTilt';

// 6 Disconnected Tools (Before State)
const DISCONNECTED_TOOLS = [
  {
    id: 1,
    title: "Lead Generation",
    problem: "Exporting data manually",
    status: "Isolated CSV",
    icon: Database,
    iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900"
  },
  {
    id: 2,
    title: "Email Outreach",
    problem: "Separate campaigns",
    status: "Webhook Lag (15m)",
    icon: Mail,
    iconColor: "text-blue-500 bg-blue-50 dark:bg-white/[0.04] border-blue-200 dark:border-blue-900"
  },
  {
    id: 3,
    title: "LinkedIn",
    problem: "Disconnected workflow",
    status: "Account Ban Risk",
    icon: Linkedin,
    iconColor: "text-sky-500 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-900"
  },
  {
    id: 4,
    title: "Voice AI",
    problem: "Separate call logs",
    status: "Disconnected Audio",
    icon: PhoneCall,
    iconColor: "text-blue-500 bg-blue-50 dark:bg-white/[0.04] border-blue-200 dark:border-blue-900"
  },
  {
    id: 5,
    title: "CRM",
    problem: "Data sync issues",
    status: "Sync Conflicts",
    icon: Building2,
    iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900"
  },
  {
    id: 6,
    title: "Spreadsheets",
    problem: "Manual reporting",
    status: "Stale Formulas",
    icon: BarChart3,
    iconColor: "text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900"
  }
];

// 6 Unified Modules (After State)
const UNIFIED_MODULES = [
  { title: "Lead Database", spec: "480M+ verified profiles with 8D targeting filters", icon: Database, color: "text-blue-600 dark:text-blue-400" },
  { title: "Email Outreach", spec: "Multi-inbox rotation & automated P2P warmup", icon: Mail, color: "text-blue-600 dark:text-blue-400" },
  { title: "LinkedIn Safe", spec: "Official versioned OAuth API & static proxy", icon: Linkedin, color: "text-sky-600 dark:text-sky-400" },
  { title: "Voice AI SDR", spec: "Sub-400ms WebRTC conversational calling", icon: PhoneCall, color: "text-blue-600 dark:text-blue-400" },
  { title: "Unified Deals CRM", spec: "Zero-drift 360° prospect activity timeline", icon: Building2, color: "text-emerald-600 dark:text-emerald-400" },
  { title: "Workflow Automation", spec: "Visual multi-channel trigger & action graph", icon: Workflow, color: "text-amber-600 dark:text-amber-400" }
];

export const FragmentedStackConvergence: React.FC = () => {
  // Mode: 'fragmented' vs 'unified'
  const [viewState, setViewState] = useState<'fragmented' | 'unified'>('unified');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* =========================================================================
          INTERACTIVE STATE SWITCHER BAR (Clean Liquid Glass)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl liquid-glass border border-slate-200/90 dark:border-[#2A2A2A]/90 shadow-clean">
        
        {/* State Label */}
        <div className="flex items-center gap-2 px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-indigo-400 animate-pulse" />
          <span className="text-xs font-sans font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {viewState === 'fragmented' ? "Before: 6 Disconnected Sales Tools" : "After: One Unified Outtricks Revenue OS"}
          </span>
        </div>

        {/* Toggle Segmented Buttons */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#181818]/90 border border-slate-200/60 dark:border-[#2A2A2A]/60 text-xs font-bold">
          <button
            onClick={() => setViewState('fragmented')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              viewState === 'fragmented'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Before Outtricks</span>
          </button>

          <button
            onClick={() => setViewState('unified')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              viewState === 'unified'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>After Outtricks (Unified)</span>
          </button>
        </div>

      </div>

      {/* =========================================================================
          MAIN TRANSFORMATION CANVAS (Animated Transition Area)
          ========================================================================= */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-clean border border-slate-200/90 dark:border-[#2A2A2A]/90 relative overflow-hidden min-h-[440px] flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          
          {/* ---------------------------------------------------------------------
              STATE 1: BEFORE OUTTRICKS (6 Fragmented Cards with Disconnected Lines)
              --------------------------------------------------------------------- */}
          {viewState === 'fragmented' ? (
            <motion.div
              key="fragmented"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-[#2A2A2A] pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[11px] font-sans font-bold border border-rose-200 dark:border-rose-900">
                    ✕ 6 Disconnected Subscriptions ($1,400+/mo)
                  </span>
                </div>
                <span className="text-xs font-sans text-slate-400">
                  Data siloed across multiple logins
                </span>
              </div>

              {/* 6 Disconnected Tool Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DISCONNECTED_TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card3DTilt key={tool.id} maxTilt={6} scale={1.02}>
                      <div className="p-5 rounded-2xl liquid-glass-card border border-rose-200/50 dark:border-rose-900/40 shadow-xs space-y-3 relative group">
                        
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl border ${tool.iconColor} group-hover:scale-105 transition-transform`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60">
                            {tool.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {tool.title}
                          </h4>
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                            "{tool.problem}"
                          </p>
                        </div>

                      </div>
                    </Card3DTilt>
                  );
                })}
              </div>

              {/* Disconnected Warning Footnote */}
              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/50 flex items-center justify-between text-xs text-rose-900 dark:text-rose-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Manual CSV exports, delayed webhooks, and duplicate contact entries waste 12+ sales hours every week.</span>
                </div>
                <button
                  onClick={() => setViewState('unified')}
                  className="font-bold underline text-blue-600 dark:text-blue-400 shrink-0 ml-3 cursor-pointer"
                >
                  Unify Stack →
                </button>
              </div>

            </motion.div>
          ) : (
            
            /* ---------------------------------------------------------------------
               STATE 2: AFTER OUTTRICKS (One Connected Revenue Operating System)
               --------------------------------------------------------------------- */
            <motion.div
              key="unified"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-[#2A2A2A] pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[11px] font-sans font-bold border border-emerald-200 dark:border-emerald-900">
                    ✓ One Native Architecture ($79/mo)
                  </span>
                </div>
                <span className="text-xs font-sans text-blue-600 dark:text-blue-400 font-bold">
                  ● 0ms Webhook Sync Lag
                </span>
              </div>

              {/* Central Outtricks Revenue Core Hub */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-indigo-50/80 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      The Outtricks Autonomous Revenue Core
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Single PostgreSQL schema running all prospecting, engagement, and deal workflows live.
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-sans font-bold shrink-0">
                  100% Real-Time Sync
                </span>
              </div>

              {/* 6 Connected Modules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {UNIFIED_MODULES.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <Card3DTilt key={idx} maxTilt={6} scale={1.02}>
                      <div className="p-5 rounded-2xl liquid-glass-card border border-blue-100 dark:border-blue-900/50 shadow-xs space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl bg-blue-50 dark:bg-[#1A1A1A]/80 ${mod.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Connected
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {mod.spec}
                        </p>
                      </div>
                    </Card3DTilt>
                  );
                })}
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* =========================================================================
          BOTTOM OUTCOME MESSAGE & CTA
          ========================================================================= */}
      <div className="text-center space-y-3 pt-2">
        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Less switching. Less syncing. More selling.
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Replace disconnected sales tools with one connected revenue operating system.
        </p>
        <div className="pt-2">
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore the Revenue Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};

