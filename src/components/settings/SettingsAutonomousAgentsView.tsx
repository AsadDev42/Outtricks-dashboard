import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Sliders, 
  Pause, 
  Play, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Activity,
  History
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSettings, AgentSettingItem } from '../../context/SettingsContext';

export const SettingsAutonomousAgentsView: React.FC = () => {
  const { agentSettings, toggleAgentStatus, updateAgentSettings } = useSettings();

  const [configAgent, setConfigAgent] = useState<AgentSettingItem | null>(null);
  const [tempDailyLimit, setTempDailyLimit] = useState(250);
  const [tempApproval, setTempApproval] = useState('Hot Leads Only');

  const handleSaveConfig = () => {
    if (configAgent) {
      updateAgentSettings(configAgent.id, {
        dailyLimit: tempDailyLimit,
        approvalThreshold: tempApproval
      });
      setConfigAgent(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Autonomous Workforce & AI Agent Execution Settings ({agentSettings.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Configure global guardrails, auto-dispatch approvals, daily action quotas, and workspace assignments for autonomous agents.
        </p>
      </div>

      {/* 2. Global Safety Sentinel */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white text-xs">
              Autonomous Safety Ceilings Active
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Human-in-the-loop triggers prevent unexpected actions when prospect sentiment or spend exceeds safety thresholds.
            </p>
          </div>
        </div>

        <Badge variant="emerald" size="sm">Zero Unverified Actions</Badge>
      </div>

      {/* 3. Agents List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {agentSettings.map((agent) => (
          <div
            key={agent.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {agent.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">{agent.role}</span>
                  </div>
                </div>

                <Badge variant={agent.status === 'Active' ? 'emerald' : 'amber'} size="sm" dot>
                  {agent.status}
                </Badge>
              </div>

              {/* Specs & Metrics */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#141414]/50 border border-slate-200/60 dark:border-[#202020] font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Workspace</span>
                  <strong className="text-slate-800 dark:text-slate-200 truncate block">{agent.workspace}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Tasks Dispatched</span>
                  <strong className="text-slate-800 dark:text-slate-200">{agent.tasksCount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Daily Velocity Cap</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{agent.dailyLimit} actions/day</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[10px]">Approval Gate</span>
                  <strong className="text-slate-800 dark:text-slate-200">{agent.approvalThreshold}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Last run: {agent.lastRun}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setConfigAgent(agent);
                    setTempDailyLimit(agent.dailyLimit);
                    setTempApproval(agent.approvalThreshold);
                  }}
                  leftIcon={<Sliders className="w-3.5 h-3.5" />}
                >
                  Configure
                </Button>

                <Button
                  variant={agent.status === 'Active' ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => toggleAgentStatus(agent.id)}
                  leftIcon={agent.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                >
                  {agent.status === 'Active' ? 'Pause' : 'Activate'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configure Agent Modal */}
      {configAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Sliders className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Configure {configAgent.name}</h3>
              </div>
              <button onClick={() => setConfigAgent(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Daily Execution Cap (Max Actions / Day)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={tempDailyLimit}
                    onChange={(e) => setTempDailyLimit(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 w-16 text-right">{tempDailyLimit}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Human-in-the-Loop Gate Policy
                </label>
                <select
                  value={tempApproval}
                  onChange={(e) => setTempApproval(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Auto-Dispatch">Auto-Dispatch (Fully Autonomous)</option>
                  <option value="Hot Leads Only">Hot Leads Only (Review high-intent replies)</option>
                  <option value="Require Review">Require Review (Manual approve before send)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setConfigAgent(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveConfig}>
                Save Guardrails
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
