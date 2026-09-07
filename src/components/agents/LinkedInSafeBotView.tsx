import React, { useState } from 'react';
import { 
  Linkedin, 
  ShieldCheck, 
  Play, 
  Pause, 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  MessageSquare, 
  Eye, 
  Activity, 
  Sliders,
  TrendingUp,
  Lock,
  RotateCw
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export interface LinkedInSafeBotViewProps {
  onOpenTestModal?: (agent: AgentRecord) => void;
  onOpenEditModal?: (agent: AgentRecord) => void;
}

export const LinkedInSafeBotView: React.FC<LinkedInSafeBotViewProps> = () => {
  const { agents, toggleAgentStatus } = useAgents();
  const { success, info } = useToast();

  const agent = agents.find((a) => a.type === 'inmail' || a.id.includes('linkedin')) || agents[1];
  const [activeSubTab, setActiveSubTab] = useState<'safety' | 'queue' | 'actions' | 'settings'>('safety');
  const [dailyConnectCap, setDailyConnectCap] = useState(20);
  const [dailyMessageCap, setDailyMessageCap] = useState(40);
  const [randomDelayMin, setRandomDelayMin] = useState(45);
  const [randomDelayMax, setRandomDelayMax] = useState(120);

  const QUEUED_ACTIONS = [
    { target: 'Emily Watson', role: 'Head of Growth at Datastack', action: 'Personalized Connection Request', delay: 'In 4 mins', status: 'Queued' },
    { target: 'James Kim', role: 'VP Sales at CloudVibe', action: 'Value-Add InMail Follow-up', delay: 'In 12 mins', status: 'Queued' },
    { target: 'Rajiv Patel', role: 'Director of RevOps at SyncIO', action: 'Profile Warmup Visit', delay: 'In 19 mins', status: 'Queued' },
    { target: 'Sophie Martin', role: 'CMO at ScaleGrid', action: 'Personalized Connection Request', delay: 'In 28 mins', status: 'Queued' },
  ];

  const RECENT_ACTIONS = [
    { time: '5 mins ago', action: 'Dispatched Personalized Connection Request', target: 'Marcus Chen (VP Eng @ FlowAI)', status: 'Delivered', safetyCheck: 'Verified Safe' },
    { time: '18 mins ago', action: 'Automated Profile Warmup & Skill Endorsement', target: 'Jessica Alba (Head of RevOps @ FinTech Corp)', status: 'Success', safetyCheck: 'Verified Safe' },
    { time: '34 mins ago', action: 'Dispatched InMail Sequence Step 2', target: 'Thomas Wright (CRO @ HealthTech)', status: 'Delivered', safetyCheck: 'Verified Safe' },
    { time: '52 mins ago', action: 'Logged Positive Connection Acceptance', target: 'David Becker (Founder @ SaaS Pilot)', status: 'Accepted', safetyCheck: 'Verified Safe' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
            <Linkedin className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                LinkedIn Safe Bot
              </h1>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Safe Mode Active
              </span>

              <span className="text-xs font-mono text-slate-400">ID: agt_linkedin_safe</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Automates multi-touch connection requests, profile visits, and hyper-personalized InMail sequences while strictly observing daily safety caps.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
              <span>Today: <strong className="text-emerald-500 font-semibold">14 / 20 Connections Used</strong></span>
              <span>•</span>
              <span>Proxy Status: <strong className="text-slate-700 dark:text-slate-300 font-mono">Dedicated US Residential IP (Optimal)</strong></span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => success('LinkedIn Safe Bot started.', 'Bot Active')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Active Run</span>
          </button>
          <button
            onClick={() => info('LinkedIn Safe Bot paused.', 'Bot Paused')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/10 hover:text-amber-500 transition-colors cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Connections Sent</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">482</div>
          <span className="text-[10px] text-emerald-500 font-bold">42.8% accept rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Messages Sent</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">612</div>
          <span className="text-[10px] text-slate-400">InMail & DMs</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Profile Visits</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,140</div>
          <span className="text-[10px] text-slate-400">Warmup touches</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks Completed</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">924</div>
          <span className="text-[10px] text-emerald-500 font-bold">99.4% SLA</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Activity</span>
          <div className="text-xl font-black text-emerald-500 font-mono">38 Actions</div>
          <span className="text-[10px] text-emerald-500 font-bold">Within safe zone</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Safety Score</span>
          <div className="text-xl font-black text-emerald-500 font-mono">98 / 100</div>
          <span className="text-[10px] text-emerald-500 font-bold">Zero flags</span>
        </div>
      </div>

      {/* 3. Section A: Safety Status & Rate Limit Pacing */}
      <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Safety Guardrails & Velocity Limits (Anti-Ban Architecture)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-500">
            Safety Score: 98% (Optimal)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#161616]/80 border border-emerald-500/20 space-y-1">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Connection Requests</span>
              <span className="text-emerald-500 font-mono">14 / 20 cap</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#161616]/80 border border-emerald-500/20 space-y-1">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Direct Messages / InMail</span>
              <span className="text-emerald-500 font-mono">22 / 40 cap</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '55%' }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#161616]/80 border border-emerald-500/20 space-y-1">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Random Action Delay</span>
              <span className="text-slate-900 dark:text-white font-mono">45s - 120s dynamic</span>
            </div>
            <p className="text-[10px] text-slate-400">Emulates human typing and scroll velocity</p>
          </div>
        </div>
      </div>

      {/* 4. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-[#2A2A2A] pb-1 text-xs font-bold">
        {[
          { id: 'safety', label: 'Safety & Limits' },
          { id: 'queue', label: 'Automation Queue' },
          { id: 'actions', label: 'Recent Actions' },
          { id: 'settings', label: 'Safety Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 5. Section: Automation Queue */}
      {activeSubTab === 'queue' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Pending LinkedIn Actions Queue
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
            {QUEUED_ACTIONS.map((item, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {item.target} <span className="text-slate-400 font-normal">({item.role})</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{item.action}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono text-emerald-500 font-bold">{item.delay}</span>
                  <Badge variant="emerald">{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Section: Recent Actions */}
      {activeSubTab === 'actions' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Recent LinkedIn Activity Logs
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
            {RECENT_ACTIONS.map((act, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">{act.action}</div>
                  <p className="text-slate-500 dark:text-slate-400">Target: {act.target}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">{act.time}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                    {act.safetyCheck}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Section: Settings */}
      {activeSubTab === 'settings' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 max-w-2xl">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            LinkedIn Safety Constraints Configuration
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Max Daily Connection Requests (Recommended: 20-25)
              </label>
              <input
                type="number"
                value={dailyConnectCap}
                onChange={(e) => setDailyConnectCap(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Max Daily InMail / Messages (Recommended: 40-50)
              </label>
              <input
                type="number"
                value={dailyMessageCap}
                onChange={(e) => setDailyMessageCap(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => success('LinkedIn safety parameters updated.', 'Settings Saved')}
              className="mt-2"
            >
              Update Safety Limits
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
