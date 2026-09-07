import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Play, 
  Pause, 
  Save, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Sparkles, 
  Activity, 
  Settings, 
  Sliders, 
  FileText, 
  Layers, 
  Building2, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  Calendar
} from 'lucide-react';
import { AgentRecord, useAgents, AutonomyLevel } from '../../context/AgentsContext';

interface AgentDetailDrawerProps {
  agent: AgentRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTest: (agent: AgentRecord) => void;
}

export const AgentDetailDrawer: React.FC<AgentDetailDrawerProps> = ({
  agent,
  isOpen,
  onClose,
  onOpenTest
}) => {
  if (!isOpen || !agent) return null;

  const { updateAgent, toggleAgentStatus, deleteAgent, executions } = useAgents();
  const [activeTab, setActiveTab] = useState<'overview' | 'instructions' | 'tools' | 'autonomy' | 'triggers' | 'history'>('overview');

  // Form states
  const [name, setName] = useState(agent.name);
  const [role, setRole] = useState(agent.role);
  const [description, setDescription] = useState(agent.description);
  const [systemInstructions, setSystemInstructions] = useState(agent.systemInstructions);
  const [objective, setObjective] = useState(agent.objective);
  const [constraints, setConstraints] = useState(agent.constraints);
  const [autonomyLevel, setAutonomyLevel] = useState<AutonomyLevel>(agent.autonomyLevel);
  const [maxDailyActions, setMaxDailyActions] = useState(agent.maxDailyActions);
  const [stopOnError, setStopOnError] = useState(agent.stopOnError);
  const [tools, setTools] = useState(agent.tools);
  const [isSavedToast, setIsSavedToast] = useState(false);

  const agentExecutions = executions.filter(e => e.agentId === agent.id);

  const handleSave = () => {
    updateAgent(agent.id, {
      name,
      role,
      description,
      systemInstructions,
      objective,
      constraints,
      autonomyLevel,
      maxDailyActions,
      stopOnError,
      tools
    });
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const handleToggleTool = (toolId: string) => {
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, enabled: !t.enabled } : t));
  };

  const handleToggleToolApproval = (toolId: string) => {
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, requiresApproval: !t.requiresApproval } : t));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-5 border-b border-slate-100 dark:border-[#2A2A2A] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${agent.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                {agent.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    {name}
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300">
                    {agent.version}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {role} • Workspace: {agent.assignedWorkspace}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAgentStatus(agent.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  agent.status === 'Active'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 hover:bg-rose-50 hover:text-rose-600'
                    : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {agent.status === 'Active' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Paused</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Tab Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200/60 dark:border-white/[0.05]">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'instructions', label: 'Instructions & Prompt' },
              { id: 'tools', label: `Tools & Access (${tools.filter(t => t.enabled).length})` },
              { id: 'autonomy', label: 'Autonomy & Safety' },
              { id: 'triggers', label: 'Triggers' },
              { id: 'history', label: `Runs (${agentExecutions.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Tasks Run</span>
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {agent.metrics.completedTasks.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Success Rate</span>
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {agent.metrics.successRate}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Avg Latency</span>
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {agent.metrics.avgLatencyMs}ms
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Credits Used</span>
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    {agent.metrics.creditsUsed}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                  Agent Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                  Role Title / Specialization
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                  Agent Mission & Summary
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-white/[0.02] border border-emerald-500/20 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Test Agent in Sandbox
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Run test prompts and simulate tool execution safely without sending live messages.
                  </p>
                </div>
                <button
                  onClick={() => onOpenTest(agent)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Launch Sandbox
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>System Instructions (Persona & Core Logic)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-sans">
                    {"Supports context variables {{first_name}}, {{company}}, {{tech_stack}}"}
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={systemInstructions}
                  onChange={(e) => setSystemInstructions(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="You are an autonomous SDR for Outtricks..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Primary Objective
                </label>
                <textarea
                  rows={2}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Safety Constraints & Exclusions
                </label>
                <textarea
                  rows={3}
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TOOLS & ACCESS */}
          {activeTab === 'tools' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Platform Tool Permissions
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Control which native modules this agent can read from or dispatch actions to.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 divide-y divide-slate-100 dark:divide-white/[0.05]">
                {tools.map((tool) => (
                  <div key={tool.id} className="pt-2.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tool.enabled}
                          onChange={() => handleToggleTool(tool.id)}
                          className="rounded border-slate-300 dark:border-[#2A2A2A] text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {tool.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 uppercase">
                          {tool.module}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5">
                        {tool.description}
                      </p>
                    </div>

                    {tool.enabled && (
                      <button
                        onClick={() => handleToggleToolApproval(tool.id)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                          tool.requiresApproval
                            ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            : 'bg-slate-100 dark:bg-[#181818] text-slate-500 dark:text-slate-400'
                        }`}
                        title="Require human approval before execution"
                      >
                        {tool.requiresApproval ? 'Approval Required' : 'Auto-Execute'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUTONOMY & SAFETY */}
          {activeTab === 'autonomy' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                  Autonomy Operating Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Autonomous', label: 'Autonomous', desc: 'Dispatches actions automatically within safety limits' },
                    { id: 'Approval-Required', label: 'Human Review', desc: 'Queues proposed actions for rep approval' },
                    { id: 'Manual', label: 'Manual Assist', desc: 'Prepares drafts only, no autonomous triggers' }
                  ].map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setAutonomyLevel(lvl.id as AutonomyLevel)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1 ${
                        autonomyLevel === lvl.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                          : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{lvl.label}</div>
                      <div className="text-[10px] text-slate-500 leading-normal">{lvl.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Daily Action Threshold</span>
                  <span className="text-emerald-500">{maxDailyActions} Actions / Day</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={maxDailyActions}
                  onChange={(e) => setMaxDailyActions(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-[#181818] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#202020] text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Halt Operations on Error
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Automatically pause the agent if 3 consecutive tool failures occur.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={stopOnError}
                  onChange={(e) => setStopOnError(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* TAB 5: TRIGGERS */}
          {activeTab === 'triggers' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Configured Agent Triggers
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Automated schedules and event webhooks that start agent workflows.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {agent.triggers.map((trigger) => (
                  <div key={trigger.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{trigger.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-sans">
                        {trigger.config}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      Active Trigger
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3 animate-in fade-in text-xs">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                Recent Execution Runs ({agentExecutions.length})
              </h3>
              <div className="space-y-2.5">
                {agentExecutions.map((exec) => (
                  <div key={exec.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#202020] space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-slate-100">{exec.taskTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        exec.status === 'Success' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {exec.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{exec.outputSummary}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-sans">
                      <span>Started: {exec.startedAt}</span>
                      <span>Duration: {exec.durationMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between bg-slate-50/50 dark:bg-[#141414]/40">
          <button
            onClick={() => {
              if (confirm(`Delete agent "${agent.name}"?`)) {
                deleteAgent(agent.id);
                onClose();
              }
            }}
            className="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
          >
            Delete Agent
          </button>

          <div className="flex items-center gap-2">
            {isSavedToast && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
