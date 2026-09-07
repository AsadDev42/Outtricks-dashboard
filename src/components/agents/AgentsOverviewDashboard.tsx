import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  Activity, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Search,
  Check,
  RotateCw,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export interface AgentsOverviewDashboardProps {
  onOpenCreateModal?: () => void;
}

export const AgentsOverviewDashboard: React.FC<AgentsOverviewDashboardProps> = ({ onOpenCreateModal }) => {
  const navigate = useNavigate();
  const { agents, stats, executions, approvals, toggleAgentStatus } = useAgents();
  const { success, info } = useToast();

  const [selectedRun, setSelectedRun] = useState<any | null>(null);

  const getAgentRoute = (agent: AgentRecord) => {
    if (agent.type === 'sdr' || agent.id.includes('sdr')) return '/ai-agents/sdr-outreach';
    if (agent.type === 'inmail' || agent.id.includes('linkedin')) return '/ai-agents/linkedin-safe-bot';
    if (agent.type === 'bidding' || agent.id.includes('upwork')) return '/ai-agents/upwork-bidding';
    if (agent.type === 'research' || agent.id.includes('research')) return '/ai-agents/deepcontext-researcher';
    return '/ai-agents';
  };

  const LIVE_EXECUTIONS = [
    { id: 'run-101', agent: 'SDR Outreach Agent', task: 'Synthesizing 10-K Pain Points for FinTech VP Leads', started: '2 mins ago', duration: '1m 45s', progress: 78, status: 'Running' },
    { id: 'run-102', agent: 'LinkedIn Safe Bot', task: 'Pacing Personalized Connection Requests', started: '4 mins ago', duration: '3m 12s', progress: 60, status: 'Running' },
    { id: 'run-103', agent: 'Upwork Bidding Agent', task: 'Evaluating Enterprise AI MVP Job Match Score', started: '8 mins ago', duration: '7m 40s', progress: 92, status: 'Running' },
    { id: 'run-104', agent: 'DeepContext Researcher', task: 'Extracting Org Chart Signals for 50 Target Accounts', started: '14 mins ago', duration: '12m 10s', progress: 45, status: 'Running' },
  ];

  const RECENT_TIMELINE = [
    { time: '1 min ago', agent: 'SDR Outreach Agent', action: 'Delivered Step 1 cold email with dynamic spintax variation to CTO at QuantCore.', status: 'Success' },
    { time: '6 mins ago', agent: 'LinkedIn Safe Bot', action: 'Safely dispatched warm-up profile visit and verified 0-flag latency.', status: 'Success' },
    { time: '12 mins ago', agent: 'Upwork Bidding Agent', action: 'Drafted tailored proposal for $8,000 MVP contract and queued for review.', status: 'Approval Requested' },
    { time: '22 mins ago', agent: 'DeepContext Researcher', action: 'Synthesized 10-K SEC annual filing for Snowflake Inc.', status: 'Success' },
    { time: '35 mins ago', agent: 'SDR Outreach Agent', action: 'Classified positive inbound reply as High Intent Meeting Opportunity.', status: 'Meeting Qualified' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. 6 SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Card 1: Total Agents */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Agents</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.totalAgents}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">4 Specialized Roles</span>
        </div>

        {/* Card 2: Active Agents */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Agents</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {stats.activeAgents}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">100% capacity</span>
        </div>

        {/* Card 3: Running Tasks */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Running Tasks</span>
          <div className="text-2xl font-black text-emerald-500 font-mono">
            {LIVE_EXECUTIONS.length}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">In active execution</span>
        </div>

        {/* Card 4: Pending Approvals */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Approvals</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {approvals.filter(a => a.status === 'Pending').length}
          </div>
          <span className="text-[10px] text-amber-600 font-bold">Human-in-the-loop</span>
        </div>

        {/* Card 5: Completed Tasks */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Tasks</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {stats.totalTasksCompleted.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">+18.4% this week</span>
        </div>

        {/* Card 6: Success Rate */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Success Rate</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {stats.overallSuccessRate}%
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Zero fatal errors</span>
        </div>
      </div>

      {/* 2. SECTION A: AGENT WORKFORCE */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-500" />
              <span>Autonomous Workforce Operators</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Click any agent row to enter its dedicated autonomous operations workspace.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">4 Agents Deployed</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {agents.map((agent) => {
            const targetRoute = getAgentRoute(agent);
            return (
              <div
                key={agent.id}
                onClick={() => navigate(targetRoute)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 px-3 rounded-xl cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${agent.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
                    {agent.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                      <span>{agent.name}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-md font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {agent.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md">
                      Current Task: <strong className="text-slate-600 dark:text-slate-300 font-medium">{agent.objective}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Status</span>
                    <span className={`font-bold font-mono text-[11px] ${
                      agent.status === 'Active' ? 'text-emerald-600' : 'text-amber-500'
                    }`}>
                      ● {agent.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Tasks Today</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{agent.metrics.completedTasks.toLocaleString()}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Success SLA</span>
                    <strong className="text-emerald-600 font-mono">{agent.metrics.successRate}%</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block">Last Active</span>
                    <span className="text-slate-500 font-medium">{agent.lastActive}</span>
                  </div>

                  <div className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SECTION B: LIVE EXECUTIONS */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Live In-Flight Executions</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Autonomous tasks actively being computed by LLM tool pipelines.
            </p>
          </div>
          <button
            onClick={() => navigate('/ai-agents/execution-runs')}
            className="text-xs text-emerald-500 hover:text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View All Runs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {LIVE_EXECUTIONS.map((run) => (
            <div key={run.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1 max-w-md">
                <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{run.agent}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 line-clamp-1">{run.task}</p>
                <div className="text-[10px] text-slate-400 font-mono">
                  Started {run.started} • Duration: {run.duration}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="w-28 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Progress</span>
                    <span className="text-emerald-500 font-bold">{run.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${run.progress}%` }} />
                  </div>
                </div>

                <Badge variant="emerald">{run.status}</Badge>

                <button
                  onClick={() => navigate('/ai-agents/execution-runs')}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  View Run
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SECTIONS C & D: RECENT ACTIVITY TIMELINE & PERFORMANCE SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Section C: Recent Activity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Recent Autonomous Actions</span>
            </h3>
            <button
              onClick={() => navigate('/ai-agents/audit-logs')}
              className="text-xs text-emerald-500 hover:text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Audit Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/[0.05] text-xs">
            {RECENT_TIMELINE.map((item, idx) => (
              <div key={idx} className="py-2.5 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{item.agent}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section D: Performance Snapshot */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Workforce Velocity & Success Benchmarks</span>
            </h3>
            <button
              onClick={() => navigate('/ai-agents/performance')}
              className="text-xs text-emerald-500 hover:text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            {agents.map((agent) => (
              <div key={agent.id} className="space-y-1">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span className="text-slate-900 dark:text-white font-bold">{agent.name}</span>
                  <span className="font-mono text-emerald-600">{agent.metrics.successRate}% Success ({agent.metrics.completedTasks} tasks)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${agent.metrics.successRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
