import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Activity, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Edit3, 
  Calendar,
  Send,
  Building2,
  RefreshCw,
  Terminal,
  Lock,
  ArrowRight
} from 'lucide-react';
import { AgentRecord, useAgents } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

interface SingleAgentWorkforceViewProps {
  agent: AgentRecord;
  onOpenTestModal: (agent: AgentRecord) => void;
  onOpenEditModal: (agent: AgentRecord) => void;
}

export const SingleAgentWorkforceView: React.FC<SingleAgentWorkforceViewProps> = ({
  agent,
  onOpenTestModal,
  onOpenEditModal,
}) => {
  const { toggleAgentStatus, executions } = useAgents();
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'triggers' | 'executions'>('overview');

  const agentExecutions = executions.filter((e) => e.agentId === agent.id);

  const handleTriggerRun = () => {
    success(`Triggered manual execution run for ${agent.name}.`, 'Agent Dispatched');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Agent Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl ${agent.avatarBg} text-white flex items-center justify-center font-black text-xl shadow-md shrink-0`}>
            {agent.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                {agent.name}
              </h1>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                agent.status === 'Active'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
              }`}>
                {agent.status}
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {agent.autonomyLevel}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {agent.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span>Assigned: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{agent.assignedOwner}</strong></span>
              <span>•</span>
              <span>Version: <strong className="text-slate-600 dark:text-slate-300 font-mono">{agent.version}</strong></span>
              <span>•</span>
              <span>Last Active: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{agent.lastActive}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenTestModal(agent)}
            className="text-xs font-semibold gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Test Simulation</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleAgentStatus(agent.id)}
            className="text-xs font-semibold gap-1.5"
          >
            {agent.status === 'Active' ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-500" />
                <span>Pause Agent</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Activate Agent</span>
              </>
            )}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleTriggerRun}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Trigger Run</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenEditModal(agent)}
            className="text-xs p-2"
            title="Edit Agent Config"
          >
            <Edit3 className="w-4 h-4 text-slate-500 hover:text-slate-900 dark:hover:text-white" />
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Tasks</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{agent.metrics.completedTasks.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Autonomous SLA</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{agent.metrics.successRate}%</div>
          <div className="text-[11px] text-slate-500">Zero unhandled exception drops</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Latency</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{agent.metrics.avgLatencyMs} ms</div>
          <div className="text-[11px] text-slate-500">Sub-second execution cycle</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Credits Consumed</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{agent.metrics.creditsUsed}</div>
          <div className="text-[11px] text-slate-500">{agent.metrics.totalActions.toLocaleString()} actions executed</div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex border-b border-slate-200/80 dark:border-[#2A2A2A] gap-6 text-xs font-bold">
        {[
          { id: 'overview', label: 'Operational Overview' },
          { id: 'tools', label: `Connected Tools (${agent.tools.filter((t) => t.enabled).length})` },
          { id: 'triggers', label: `Active Triggers (${agent.triggers.filter((t) => t.enabled).length})` },
          { id: 'executions', label: `Execution History (${agentExecutions.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Instructions & Objective */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">System Prompt & Objective</h3>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Objective</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3 rounded-2xl border border-slate-200/60 dark:border-[#202020] leading-relaxed">
                {agent.objective}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Instructions</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-white/[0.03] p-3 rounded-2xl border border-slate-200/60 dark:border-[#202020] leading-relaxed whitespace-pre-line">
                {agent.systemInstructions}
              </p>
            </div>
          </div>

          {/* Safety Constraints & Autonomy */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Safety Constraints & Policy</h3>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operational Constraints</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3 rounded-2xl border border-slate-200/60 dark:border-[#202020] leading-relaxed">
                {agent.constraints}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-emerald-200 flex items-center justify-between">
                <span>Daily Velocity Limits</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{agent.maxDailyActions} actions / day</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-emerald-300/80 leading-relaxed">
                Autonomous throttling prevents API rate limiting and safeguards outreach deliverability.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tools View */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agent.tools.map((tool) => (
            <div
              key={tool.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                tool.enabled
                  ? 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A] shadow-xs'
                  : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/40 dark:border-[#202020] opacity-60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{tool.name}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] uppercase font-mono font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300">
                    {tool.module}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{tool.description}</p>
              </div>

              <div className="shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  tool.enabled
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-slate-100 dark:bg-white/[0.06] text-slate-400'
                }`}>
                  {tool.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Triggers View */}
      {activeTab === 'triggers' && (
        <div className="space-y-3">
          {agent.triggers.map((trig) => (
            <div
              key={trig.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{trig.label}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {trig.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">{trig.config}</p>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800/40">
                Active Trigger
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Executions View */}
      {activeTab === 'executions' && (
        <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Task & Trigger</th>
                  <th className="py-3 px-4">Target Record</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {agentExecutions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No execution logs recorded yet. Click "Trigger Run" to test.
                    </td>
                  </tr>
                ) : (
                  agentExecutions.map((exec) => (
                    <tr key={exec.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        <div>{exec.taskTitle}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{exec.triggerSource}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {exec.targetRecord ? `${exec.targetRecord.name} (${exec.targetRecord.type})` : 'System Batch'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {exec.durationMs}ms
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          exec.status === 'Success'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800/40'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800/40'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{exec.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {exec.startedAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
