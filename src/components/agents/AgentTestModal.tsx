import React, { useState } from 'react';
import { 
  Play, 
  X, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Code, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { useAgents, AgentRecord, AgentExecution } from '../../context/AgentsContext';

interface AgentTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAgent?: AgentRecord | null;
}

export const AgentTestModal: React.FC<AgentTestModalProps> = ({
  isOpen,
  onClose,
  initialAgent
}) => {
  if (!isOpen) return null;

  const { agents, testAgentRun, isTestingRunning } = useAgents();
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    initialAgent?.id || agents[0]?.id || ''
  );
  const [prompt, setPrompt] = useState<string>(
    'Find Series B FinTech companies in North America with active SDR job openings and compose a personalized 3-sentence value proposition.'
  );
  const [testResult, setTestResult] = useState<AgentExecution | null>(null);

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleRunTest = async () => {
    if (!prompt.trim() || isTestingRunning) return;
    const res = await testAgentRun(selectedAgentId, prompt);
    setTestResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shadow-emerald-500/20">
              <Play className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Agent Sandbox Simulator
              </h2>
              <p className="text-xs text-slate-500">
                Safely test agent reasoning, tool selection, and outputs without touching production channels.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Agent Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
              Target Agent for Simulation
            </label>
            <select
              value={selectedAgentId}
              onChange={(e) => {
                setSelectedAgentId(e.target.value);
                setTestResult(null);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none"
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} ({agent.role}) - {agent.autonomyLevel}
                </option>
              ))}
            </select>
          </div>

          {/* Test Prompt / Mock Trigger */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900 dark:text-white">
                Input Prompt / Trigger Context
              </label>
              <button
                onClick={() => setPrompt('Find VP Sales at CloudScale AI and draft an outreach message referencing their Snowflake tech stack.')}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Insert Example
              </button>
            </div>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 leading-relaxed font-sans"
              placeholder="Describe the test task or scenario..."
            />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunTest}
            disabled={isTestingRunning || !prompt.trim()}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isTestingRunning ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <span>Simulating Multi-Step Agent Execution...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Execute Sandbox Test</span>
              </>
            )}
          </button>

          {/* Simulation Output Area */}
          {testResult && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 font-mono text-xs animate-in fade-in">
              <div className="flex items-center justify-between text-emerald-400 font-bold font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Test Run Succeeded ({testResult.durationMs}ms)</span>
                </span>
                <span className="text-[10px] text-slate-400">{testResult.completedAt}</span>
              </div>

              <div className="text-slate-300 font-sans text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                {testResult.outputSummary}
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">
                  SIMULATED TOOL TRACES:
                </span>
                {testResult.toolCalls.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] space-y-1">
                    <div className="text-emerald-400 font-bold">
                      {step.timestamp}: {step.toolName} ({step.module})
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      INPUT: {JSON.stringify(step.params)}
                    </div>
                    <div className="text-emerald-400 text-[10px]">
                      RETURN: {JSON.stringify(step.result)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-end bg-slate-50 dark:bg-[#141414]/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
