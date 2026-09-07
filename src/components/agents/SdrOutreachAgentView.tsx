import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Sparkles, 
  Send, 
  Mail, 
  Flame, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Activity, 
  TrendingUp, 
  ArrowRight,
  Sliders,
  ShieldCheck,
  RotateCw,
  Eye,
  Check
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export interface SdrOutreachAgentViewProps {
  onOpenTestModal?: (agent: AgentRecord) => void;
  onOpenEditModal?: (agent: AgentRecord) => void;
}

export const SdrOutreachAgentView: React.FC<SdrOutreachAgentViewProps> = ({
  onOpenTestModal,
  onOpenEditModal,
}) => {
  const { agents, toggleAgentStatus } = useAgents();
  const { success, info } = useToast();

  const agent = agents.find((a) => a.type === 'sdr' || a.id.includes('sdr')) || agents[0];
  const [activeSubTab, setActiveSubTab] = useState<'pipeline' | 'activity' | 'performance' | 'config'>('pipeline');
  const [dailyLimit, setDailyLimit] = useState(150);
  const [workingHours, setWorkingHours] = useState('09:00 - 18:00 EST');
  const [requireApproval, setRequireApproval] = useState(true);

  const PIPELINE_STAGES = [
    { id: 'queued', label: 'Queued', count: 48, color: 'text-slate-500 bg-slate-100 dark:bg-[#181818]' },
    { id: 'researching', label: 'Researching', count: 12, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'personalizing', label: 'Personalizing', count: 18, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'ready', label: 'Ready', count: 24, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'sent', label: 'Sent', count: 1290, color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1A1A1A]' },
    { id: 'replied', label: 'Replied', count: 248, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'meeting', label: 'Meeting Booked', count: 38, color: 'text-emerald-500 bg-emerald-500/20' },
  ];

  const RECENT_ACTIONS = [
    { time: '2 mins ago', lead: 'Sarah Lin', company: 'CloudScale AI', action: 'Synthesized 10-K pain point and dispatched Step 1 cold email.', status: 'Success' },
    { time: '14 mins ago', lead: 'David Miller', company: 'FinTech Stack', action: 'Personalized intro hook with recent funding news signal.', status: 'Success' },
    { time: '28 mins ago', lead: 'Elena Rostova', company: 'NextGen Sec', action: 'Classified positive inbound reply & prepared calendar scheduling link.', status: 'Meeting Request' },
    { time: '45 mins ago', lead: 'Marcus Vance', company: 'Vance Logix', action: 'Enrolled prospect into Multi-Inbox Sequence A/B test.', status: 'Success' },
    { time: '1 hour ago', lead: 'Chloe Dupont', company: 'EuroFin BV', action: 'Verified deliverability status (Zero Bounce) before sending.', status: 'Success' },
  ];

  const handleStart = () => {
    if (agent.status !== 'Active') toggleAgentStatus(agent.id);
    success('SDR Outreach Agent started and autonomous queue activated.', 'Agent Running');
  };

  const handlePause = () => {
    if (agent.status === 'Active') toggleAgentStatus(agent.id);
    info('SDR Outreach Agent paused. In-flight tasks will complete safely.', 'Agent Paused');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
            SDR
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                SDR Outreach Agent
              </h1>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                agent.status === 'Active'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              }`}>
                {agent.status}
              </span>

              <span className="text-xs font-mono text-slate-400">ID: agt_sdr_01</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Researches decision makers, drafts highly tailored spintax emails, and autonomously operates your rotating sender pools.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
              <span>Current Task: <strong className="text-emerald-500 font-semibold">Personalizing 18 B2B Leads for FinTech Campaign</strong></span>
              <span>•</span>
              <span>Last Active: <strong className="text-slate-700 dark:text-slate-300 font-semibold">2 mins ago</strong></span>
            </div>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleStart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              agent.status === 'Active'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-500'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start</span>
          </button>

          <button
            onClick={handlePause}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              agent.status === 'Paused'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 hover:text-amber-500'
            }`}
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>

          <button
            onClick={() => setActiveSubTab('config')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/80 dark:border-[#2A2A2A]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configure</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Leads Processed</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,840</div>
          <span className="text-[10px] text-emerald-500 font-bold">+14.2%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Messages Sent</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,290</div>
          <span className="text-[10px] text-slate-400">across 12 inboxes</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Replies Received</span>
          <div className="text-xl font-black text-emerald-500 font-mono">248</div>
          <span className="text-[10px] text-emerald-500 font-bold">19.2% rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Meetings Booked</span>
          <div className="text-xl font-black text-emerald-500 font-mono">38</div>
          <span className="text-[10px] text-emerald-500 font-bold">Qualified Demos</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Positive Reply %</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">82.4%</div>
          <span className="text-[10px] text-emerald-500 font-bold">High intent</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks Completed</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">1,420</div>
          <span className="text-[10px] text-emerald-500 font-bold">98.1% success</span>
        </div>
      </div>

      {/* 3. Current Live Execution Card */}
      <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Current Live Execution
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-500 font-bold">
            Step 3 of 4: Deep Research & Draft
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Target Prospect</span>
            <strong className="text-slate-900 dark:text-white">Alex Rivera (CTO at QuantCore)</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Assigned Action</span>
            <strong className="text-slate-900 dark:text-white">Craft Personalized Inbound Spintax</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Started</span>
            <strong className="text-slate-900 dark:text-white font-mono">2 mins ago (14:38:12)</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Est. Completion</span>
            <strong className="text-emerald-500 font-mono">In ~45 seconds</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
        </div>
      </div>

      {/* 4. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-[#2A2A2A] pb-1 text-xs font-bold">
        {[
          { id: 'pipeline', label: 'Outreach Pipeline' },
          { id: 'activity', label: 'Recent Activity' },
          { id: 'performance', label: 'Performance Analytics' },
          { id: 'config', label: 'Agent Configuration' },
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

      {/* 5. Section A: Outreach Pipeline */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {PIPELINE_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{stage.label}</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md font-mono ${stage.color}`}>
                    {stage.count}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, stage.count * 2)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Active Outreach Batch in Progress
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 dark:text-white">FinTech VP Engineering Outbound (Tier 1)</strong>
                  <div className="text-[11px] text-slate-400">120 prospects • Multi-Inbox Sender Pool 02</div>
                </div>
                <Badge variant="emerald">Active Sequencing</Badge>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 dark:text-white">Healthcare SaaS Decision Makers</strong>
                  <div className="text-[11px] text-slate-400">85 prospects • Spintax Dynamic Tone Check</div>
                </div>
                <Badge variant="emerald">Delivering</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Section B: Recent Activity */}
      {activeSubTab === 'activity' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Live SDR Execution Log
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
            {RECENT_ACTIONS.map((action, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{action.lead}</span>
                    <span className="text-slate-400 font-normal">({action.company})</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{action.action}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">{action.time}</span>
                  <Badge variant="emerald">
                    {action.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Section C: Performance */}
      {activeSubTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Outreach Volume & Velocity (Last 7 Days)
            </h4>
            <div className="h-36 flex items-end justify-between gap-2 pt-4">
              {[180, 220, 240, 290, 310, 190, 210].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full bg-emerald-500 rounded-t-lg transition-all" style={{ height: `${(v / 350) * 100}%` }} />
                  <span className="text-[10px] font-mono text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Conversion Quality Funnel
            </h4>
            <div className="space-y-2.5 text-xs pt-1">
              <div>
                <div className="flex justify-between text-slate-500 pb-1">
                  <span>Open Rate</span>
                  <strong className="text-slate-900 dark:text-white font-mono">72.4%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72.4%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-500 pb-1">
                  <span>Reply Rate</span>
                  <strong className="text-emerald-500 font-mono">19.2%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '19.2%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-500 pb-1">
                  <span>Meeting Conversion</span>
                  <strong className="text-emerald-500 font-mono">2.9%</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '29%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Section D: Configuration */}
      {activeSubTab === 'config' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 max-w-2xl">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            SDR Agent Automation Parameters
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Daily Outbound Dispatch Cap (Leads / Day)
              </label>
              <input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Recommended maximum: 200 leads/day to maintain 99%+ deliverability.</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Active Sending Window
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020]">
              <div>
                <strong className="text-slate-900 dark:text-white block">Require Human Approval for Enterprise Deals</strong>
                <span className="text-[11px] text-slate-400">Routes Tier-1 enterprise emails to Approvals Queue before sending.</span>
              </div>
              <input
                type="checkbox"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => success('SDR Agent parameters saved successfully.', 'Settings Updated')}
              className="mt-2"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
