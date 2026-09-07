import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Crosshair, 
  Share2, 
  ShieldCheck, 
  ArrowUp, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Plus, 
  Columns, 
  Send,
  Mail,
  PhoneCall,
  Linkedin,
  Database,
  Building2,
  Users,
  Check
} from 'lucide-react';

type AssistantTabId = 'ai-handle' | 'find-leads' | 'buying-intent' | 'multi-channel' | 'avoid-spam';

interface TargetIcpOption {
  title: string;
  role: string;
  industry: string;
  location: string;
  leadsCount: string;
  verifiedRate: string;
}

const TARGET_ICPS: TargetIcpOption[] = [
  {
    title: 'CFO in the Technology Industry in the United States',
    role: 'Chief Financial Officer (CFO)',
    industry: 'Technology & Enterprise SaaS',
    location: 'United States',
    leadsCount: '4,280 Verified Contacts',
    verifiedRate: '99.6% Deliverable'
  },
  {
    title: 'VP of Sales & RevOps at B2B SaaS (50-250 Headcount)',
    role: 'VP Sales, Head of Revenue, RevOps Director',
    industry: 'B2B Software & Cloud Services',
    location: 'North America & UK',
    leadsCount: '8,940 Verified Contacts',
    verifiedRate: '99.4% Deliverable'
  },
  {
    title: 'Head of Growth & Marketing in High-Scale E-Commerce',
    role: 'VP Growth, Head of Performance Marketing',
    industry: 'Consumer Tech & E-Commerce',
    location: 'United States & Canada',
    leadsCount: '480 verified leads',
    verifiedRate: '99.4%'
  },
  {
    title: 'VPs of Engineering at FinTech Scaleups',
    role: 'VP Engineering / CTO',
    industry: 'Financial Technology',
    location: 'San Francisco, NY, London',
    leadsCount: '360 verified leads',
    verifiedRate: '99.1%'
  },
  {
    title: 'Heads of Revenue Operations in Healthcare Tech',
    role: 'Head of RevOps / VP Sales Ops',
    industry: 'Digital Health & Biotech',
    location: 'Remote / Global',
    leadsCount: '290 verified leads',
    verifiedRate: '99.6%'
  }
];

export const AiLeadAssistantWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssistantTabId>('ai-handle');
  const [icpIndex, setIcpIndex] = useState(0);
  const [inputQuery, setInputQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionFinished, setExecutionFinished] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentIcp = TARGET_ICPS[icpIndex];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNextSuggestion = () => {
    setIcpIndex((prev) => (prev + 1) % TARGET_ICPS.length);
    setExecutionFinished(false);
    setExecutionStep(0);
  };

  const handleRunLetsGo = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setExecutionFinished(false);
    setExecutionStep(1);
    showToast('🚀 AI Engine initialized: Searching target database...');

    setTimeout(() => setExecutionStep(2), 600);
    setTimeout(() => setExecutionStep(3), 1200);
    setTimeout(() => {
      setExecutionStep(4);
      setIsExecuting(false);
      setExecutionFinished(true);
      showToast(`✓ Found ${currentIcp.leadsCount} with verified emails and direct numbers.`);
    }, 1800);
  };

  const handleCustomSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;
    showToast(`Processing: "${inputQuery.slice(0, 35)}..."`);
    setInputQuery('');
    handleRunLetsGo();
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-sans py-2 px-4 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          1. TOP HORIZONTAL FEATURE NAVIGATION BAR (Matching Reference Image)
          ========================================================================= */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800 text-xs font-bold">
          
          {/* Tab 1: Let AI handle it */}
          <button
            onClick={() => {
              setActiveTab('ai-handle');
              setExecutionFinished(false);
            }}
            className={`px-4 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'ai-handle'
                ? 'bg-blue-50/90 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold border-b-2 sm:border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Let AI handle it</span>
          </button>

          {/* Tab 2: Find target leads */}
          <button
            onClick={() => {
              setActiveTab('find-leads');
              setExecutionFinished(false);
            }}
            className={`px-4 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'find-leads'
                ? 'bg-blue-50/90 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span>Find target leads</span>
          </button>

          {/* Tab 3: Spot buying intent */}
          <button
            onClick={() => {
              setActiveTab('buying-intent');
              setExecutionFinished(false);
            }}
            className={`px-4 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'buying-intent'
                ? 'bg-blue-50/90 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Crosshair className="w-4 h-4 text-slate-500" />
            <span>Spot buying intent</span>
          </button>

          {/* Tab 4: Engage on multi-channels */}
          <button
            onClick={() => {
              setActiveTab('multi-channel');
              setExecutionFinished(false);
            }}
            className={`px-4 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'multi-channel'
                ? 'bg-blue-50/90 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Engage on multi-channels</span>
          </button>

          {/* Tab 5: Avoid spam */}
          <button
            onClick={() => {
              setActiveTab('avoid-spam');
              setExecutionFinished(false);
            }}
            className={`px-4 py-3.5 col-span-2 sm:col-span-1 flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'avoid-spam'
                ? 'bg-blue-50/90 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Avoid spam</span>
          </button>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN AI WORKSPACE WINDOW (Matching Reference Image Layout)
          ========================================================================= */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#0b101f] shadow-sm p-6 sm:p-8 min-h-[520px] flex flex-col justify-between space-y-6">
        
        {/* Top Mini Bar: Assistant Name | Task | Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.07] pb-4">
          <div className="flex items-center gap-2.5">
            {/* Blue Outtricks Brand Logo Mark */}
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight">
              Outtricks AI
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {activeTab === 'ai-handle' && 'Find Target Leads'}
              {activeTab === 'find-leads' && '8-Dimension B2B Lead Search'}
              {activeTab === 'buying-intent' && 'Spotting Hiring & Intent Signals'}
              {activeTab === 'multi-channel' && 'Email, LinkedIn & Voice AI Cadence'}
              {activeTab === 'avoid-spam' && 'Deliverability & Domain Health'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[#131d35] transition-colors" title="Split view">
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[#131d35] transition-colors" title="New task">
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[#131d35] transition-colors" title="Terminal">
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Content: Conversational Recommendation Flow */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto w-full py-4">
          
          {/* TAB 1: LET AI HANDLE IT */}
          {activeTab === 'ai-handle' && (
            <div className="space-y-5 w-full animate-in fade-in duration-150">
              
              {/* Task Tag Pill */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#131d35] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-[#202020] text-xs font-semibold">
                  Find Target Leads
                </span>
              </div>

              {/* AI Understanding Copy */}
              <div className="space-y-1 text-slate-800 dark:text-slate-200">
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  Based on your company profile, I suggest we focus on:
                </p>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {currentIcp.title}
                </h3>
              </div>

              {/* Interactive Options Cards */}
              <div className="space-y-2.5 text-left w-full max-w-md mx-auto pt-1">
                
                {/* Option 1: Let's go */}
                <button
                  onClick={handleRunLetsGo}
                  disabled={isExecuting}
                  className="w-full p-3.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-[#131d35] dark:hover:bg-[#18223d] border border-transparent hover:border-blue-200 dark:border-[#202020] dark:hover:border-blue-500/30 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span>Let's go</span>
                    {isExecuting && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />}
                  </div>
                  
                  <span className="text-base group-hover:scale-110 transition-transform">
                    👆
                  </span>
                </button>

                {/* Option 2: Suggest something else */}
                <button
                  onClick={handleNextSuggestion}
                  disabled={isExecuting}
                  className="w-full p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-[#2A2A2A] hover:border-slate-400 dark:hover:border-white/20 bg-transparent text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer text-left"
                >
                  Suggest something else
                </button>

              </div>

              {/* Real-time Execution Output preview */}
              {(isExecuting || executionFinished) && (
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800/80 text-left space-y-2 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between font-sans font-bold text-blue-950 dark:text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Autonomous Pipeline Live</span>
                    </span>
                    <span>{executionStep === 4 ? '100% Ready' : 'Processing...'}</span>
                  </div>

                  <div className="space-y-1 font-sans text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sourced <strong>{currentIcp.leadsCount}</strong> in {currentIcp.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Multi-dimensional query completed (Direct mobile + verified work emails)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{currentIcp.verifiedRate} deliverability rate guaranteed</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: FIND TARGET LEADS */}
          {activeTab === 'find-leads' && (
            <div className="space-y-4 w-full animate-in fade-in duration-150 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-[#202020] text-xs font-semibold">
                480M+ B2B Contacts • 8-Dimension Filters
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                MultiDimensional Lead Search Engine
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Outtricks enables instant search across 480M+ global B2B profiles using 8-dimension filters for job title, industry, company headcount, revenue, and direct contact details.
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={handleRunLetsGo} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 cursor-pointer">
                  Source Sample Leads
                </button>
                <Link to="/platform/8-dimension-b2b-pool" className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A] font-bold text-xs hover:bg-slate-200 dark:hover:bg-[#18223d]">
                  Explore Database Pool →
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: SPOT BUYING INTENT */}
          {activeTab === 'buying-intent' && (
            <div className="space-y-4 w-full animate-in fade-in duration-150 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-[#202020] text-xs font-semibold">
                8 Intent Dimensions Monitored
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Real-Time Buying Signal Detection
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Identify accounts undergoing executive leadership turnover, tech-stack replacements, new capital rounds, or aggressive headcount expansions.
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={handleRunLetsGo} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 cursor-pointer">
                  Scan Intent Signals
                </button>
                <Link to="/use-cases/growth-teams" className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A] font-bold text-xs hover:bg-slate-200 dark:hover:bg-[#18223d]">
                  Intent Playbook →
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: ENGAGE ON MULTI-CHANNELS */}
          {activeTab === 'multi-channel' && (
            <div className="space-y-4 w-full animate-in fade-in duration-150 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-[#202020] text-xs font-semibold">
                Email • LinkedIn • Voice AI SDR
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Synchronized Multi-Channel Outbound
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Combine rotated multi-inbox cold emails, cloud-safe LinkedIn engagement, and sub-400ms WebRTC Voice AI calls in 1 visual builder.
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={handleRunLetsGo} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 cursor-pointer">
                  Launch Cadence Test
                </button>
                <Link to="/platform/visual-flow-builder" className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A] font-bold text-xs hover:bg-slate-200 dark:hover:bg-[#18223d]">
                  Workflow Builder →
                </Link>
              </div>
            </div>
          )}

          {/* TAB 5: AVOID SPAM */}
          {activeTab === 'avoid-spam' && (
            <div className="space-y-4 w-full animate-in fade-in duration-150 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-[#202020] text-xs font-semibold">
                99.4% Inbox Placement Guarantee
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Real-Time Deliverability & Suppression
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Automated SPF, DKIM, DMARC validation, custom tracking domains, ramp-up schedules, and real-time suppression checks in the write-path.
              </p>
              <div className="pt-2 flex gap-3">
                <button onClick={handleRunLetsGo} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 cursor-pointer">
                  Audit Domain Health
                </button>
                <Link to="/resources/free-tools" className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131d35] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2A2A2A] font-bold text-xs hover:bg-slate-200 dark:hover:bg-[#18223d]">
                  Free DNS Checker →
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* =========================================================================
            3. BOTTOM MESSAGE / INPUT AREA (Matching Reference Image)
            ========================================================================= */}
        <form
          onSubmit={handleCustomSend}
          className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#131d35] p-3 sm:p-4 min-h-[95px] flex flex-col justify-between shadow-2xs relative"
        >
          <textarea
            rows={2}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCustomSend();
              }
            }}
            placeholder="Describe what you want to do..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none resize-none font-sans"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-sans text-slate-400">
              Press Enter to send instruction to AI Assistant
            </span>

            {/* Blue Send Button with ArrowUp Icon (Matching Reference Image) */}
            <button
              type="submit"
              disabled={isExecuting}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-40 shrink-0"
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};
