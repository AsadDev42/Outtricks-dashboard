import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Bot, 
  CheckCircle2, 
  AlertTriangle,
  Layers, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2,
  Calendar,
  Activity,
  Filter,
  X
} from 'lucide-react';
import { useAgents, AgentRecord } from '../../context/AgentsContext';
import { Button } from '../ui/Button';

export const AgentPerformanceView: React.FC = () => {
  const { agents } = useAgents();
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | '90d'>('7d');
  const [selectedAgentDetail, setSelectedAgentDetail] = useState<AgentRecord | null>(null);
  const [agentFilter, setAgentFilter] = useState('all');

  const totalTasks = agents.reduce((acc, a) => acc + a.metrics.completedTasks, 0);
  const totalExecutions = totalTasks + 380;
  const avgSuccessRate = (agents.reduce((acc, a) => acc + a.metrics.successRate, 0) / agents.length).toFixed(1);
  const totalFailed = Math.round(totalExecutions * (1 - parseFloat(avgSuccessRate) / 100));

  const DAILY_VOLUME = [
    { day: 'Mon', vol: 320, success: 314, failed: 6 },
    { day: 'Tue', vol: 480, success: 468, failed: 12 },
    { day: 'Wed', vol: 540, success: 524, failed: 16 },
    { day: 'Thu', vol: 620, success: 605, failed: 15 },
    { day: 'Fri', vol: 590, success: 578, failed: 12 },
    { day: 'Sat', vol: 240, success: 238, failed: 2 },
    { day: 'Sun', vol: 210, success: 208, failed: 2 },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
            <span>Agent Performance Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated execution telemetry, task success rates, latency benchmarks, and agent utilization metrics.
          </p>
        </div>

        {/* Date & Agent Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Agents</option>
            <option value="sdr">SDR Outreach Agent</option>
            <option value="linkedin">LinkedIn Safe Bot</option>
            <option value="upwork">Upwork Bidding Agent</option>
            <option value="research">DeepContext Researcher</option>
          </select>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#1C1C1C] rounded-xl border border-slate-200/80 dark:border-[#2A2A2A] text-xs">
            {(['today', '7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer uppercase ${
                  timeRange === r
                    ? 'bg-white dark:bg-[#161616] text-emerald-500 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 6 Core Agent KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Executions</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalExecutions.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">100% LLM trace</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Success Rate</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {avgSuccessRate}%
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">SLA: &gt;95%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Failed Runs</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
            {totalFailed}
          </div>
          <span className="text-[10px] text-slate-400">1.8% error rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Execution Time</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            310ms
          </div>
          <span className="text-[10px] text-slate-400">P90 tool latency</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks Completed</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalTasks.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Autonomous output</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Agent Utilization</span>
          <div className="text-2xl font-black text-emerald-500 font-mono">
            87.4%
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">4 active workers</span>
        </div>
      </div>

      {/* 3. CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Chart 1: Execution Volume Over Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Execution Volume Over Time
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-500">3,000 Total / 7d</span>
          </div>

          <div className="h-36 flex items-end justify-between gap-2 pt-2">
            {DAILY_VOLUME.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-400" style={{ height: `${(item.vol / 700) * 100}%` }} title={`${item.day}: ${item.vol} runs`} />
                <span className="text-[10px] font-mono text-slate-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Success vs Failure */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Success vs Failure Breakdown
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600">97.8% Resolution SLA</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-500 pb-1">
                <span>Autonomous Success</span>
                <strong className="text-emerald-600 font-mono">2,935 (97.8%)</strong>
              </div>
              <div className="w-full bg-slate-100 dark:bg-[#181818] h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '97.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-500 pb-1">
                <span>Recovered / Handled Errors</span>
                <strong className="text-amber-500 font-mono">50 (1.6%)</strong>
              </div>
              <div className="w-full bg-slate-100 dark:bg-[#181818] h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '1.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-500 pb-1">
                <span>Failed Tool Calls</span>
                <strong className="text-rose-500 font-mono">15 (0.6%)</strong>
              </div>
              <div className="w-full bg-slate-100 dark:bg-[#181818] h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '0.6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Tasks Completed By Agent */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            3. Tasks Completed By Agent
          </h3>
          <div className="space-y-2.5 pt-1 text-xs">
            {agents.map((agent) => (
              <div key={agent.id} className="space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span className="font-bold text-slate-900 dark:text-white">{agent.name}</span>
                  <span className="font-mono text-emerald-500 font-bold">{agent.metrics.completedTasks} Tasks</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(agent.metrics.completedTasks / 2000) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Agent Utilization & Uptime */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            4. Agent Capacity & Utilization
          </h3>
          <div className="space-y-2.5 pt-1 text-xs">
            {agents.map((agent, i) => {
              const util = [92, 85, 78, 94][i % 4];
              return (
                <div key={agent.id} className="space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span className="font-bold text-slate-900 dark:text-white">{agent.name}</span>
                    <span className="font-mono text-emerald-600 font-bold">{util}% Active</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${util}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. AGENT PERFORMANCE TABLE */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs space-y-3 p-5">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Individual Agent Attribution & Reliability Table
        </h3>

        <div className="w-full max-w-full overflow-x-auto min-w-0 no-scrollbar">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2A2A2A] text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3">AGENT</th>
                <th className="py-2.5 px-3">EXECUTIONS</th>
                <th className="py-2.5 px-3">SUCCESS RATE</th>
                <th className="py-2.5 px-3">AVG DURATION</th>
                <th className="py-2.5 px-3">TASKS COMPLETED</th>
                <th className="py-2.5 px-3">FAILURES</th>
                <th className="py-2.5 px-3 text-right">UTILIZATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {agents.map((agent, i) => (
                <tr
                  key={agent.id}
                  onClick={() => setSelectedAgentDetail(agent)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg ${agent.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                        {agent.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{agent.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">{(agent.metrics.completedTasks + 85).toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-600">{agent.metrics.successRate}%</td>
                  <td className="py-3 px-3 font-mono text-slate-900 dark:text-white">{agent.metrics.avgLatencyMs}ms</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{agent.metrics.completedTasks}</td>
                  <td className="py-3 px-3 font-mono text-rose-500">{Math.round(agent.metrics.completedTasks * 0.02)}</td>
                  <td className="py-3 px-3 font-mono text-right font-bold text-emerald-500">{[92, 85, 78, 94][i % 4]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Agent Performance Modal */}
      {selectedAgentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Performance Telemetry</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedAgentDetail.name}</h3>
                <span className="text-xs text-slate-400">{selectedAgentDetail.role}</span>
              </div>
              <button onClick={() => setSelectedAgentDetail(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                <span className="text-[10px] text-slate-400 block">Completed Tasks</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm">{selectedAgentDetail.metrics.completedTasks}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                <span className="text-[10px] text-slate-400 block">Success SLA</span>
                <strong className="text-emerald-600 font-mono text-sm">{selectedAgentDetail.metrics.successRate}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                <span className="text-[10px] text-slate-400 block">Average Latency</span>
                <strong className="text-emerald-500 font-mono text-sm">{selectedAgentDetail.metrics.avgLatencyMs}ms</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                <span className="text-[10px] text-slate-400 block">Autonomy Level</span>
                <strong className="text-slate-900 dark:text-white text-sm">{selectedAgentDetail.autonomyLevel}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedAgentDetail(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
