import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Cpu, 
  Sliders, 
  DollarSign, 
  CheckCircle2, 
  Zap, 
  Activity 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { ThreeOrbitalGlow } from '../3d/ThreeOrbitalGlow';
import { useAdmin } from '../../context/AdminContext';

export const AdminTricksyAiView: React.FC = () => {
  const { tricksyAi, updateTricksyAiConfig } = useAdmin();

  const [defaultModel, setDefaultModel] = useState(tricksyAi.defaultModel);
  const [creditMultiplier, setCreditMultiplier] = useState(tricksyAi.creditMultiplier.toString());
  const [maxTokens, setMaxTokens] = useState(tricksyAi.maxTokensPerRequest.toString());
  const [spendCap, setSpendCap] = useState(tricksyAi.monthlySpendCapUsd.toString());
  const [systemPrompt, setSystemPrompt] = useState(tricksyAi.systemPromptPreset);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTricksyAiConfig({
      defaultModel,
      creditMultiplier: parseFloat(creditMultiplier) || 1.0,
      maxTokensPerRequest: parseInt(maxTokens) || 4096,
      monthlySpendCapUsd: parseFloat(spendCap) || 5000,
      systemPromptPreset: systemPrompt,
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Tricksy AI Governance & LLM Fleet Management
            </h2>
            <Badge variant="primary" size="sm">Autonomous Intelligence</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Configure default foundational model routing, token rate limits, monthly USD spend caps, and core agent behavior system prompts.
          </p>
        </div>
      </div>

      {/* 2. Spend Cap & Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-slate-500 font-medium">Monthly AI LLM Spend</span>
          <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
            ${tricksyAi.currentSpendUsd.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400">
            Cap: <strong className="text-slate-700 dark:text-slate-300 font-mono">${tricksyAi.monthlySpendCapUsd.toLocaleString()} USD</strong>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-slate-500 font-medium">Active Default Model</span>
          <div className="text-xl font-extrabold text-primary font-mono uppercase">
            {tricksyAi.defaultModel}
          </div>
          <div className="text-[11px] text-primary font-bold">Fast low-latency inference</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-slate-500 font-medium">Autonomous Execution</span>
          <div className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Operational</span>
          </div>
          <div className="text-[11px] text-slate-400">Multi-step SDR & proposal agents</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between gap-2 overflow-hidden relative">
          <div className="space-y-1 z-10">
            <span className="text-slate-500 font-medium text-[11px]">3D AI Neural Core</span>
            <div className="text-sm font-black text-slate-950 dark:text-white">Live Orbital Core</div>
            <div className="text-[10px] text-primary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>WebGL Synced</span>
            </div>
          </div>
          <div className="w-20 h-20 shrink-0 relative flex items-center justify-center -mr-2">
            <ThreeOrbitalGlow className="w-24 h-24" particleColor="var(--primary)" ringColor="var(--primary-glow)" />
          </div>
        </div>
      </div>

      {/* 3. Configuration Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Tricksy AI Operational Parameters
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Default Foundational Model</label>
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
              >
                {tricksyAi.availableModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Credit Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={creditMultiplier}
                onChange={(e) => setCreditMultiplier(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Budget Cap ($)</label>
              <input
                type="number"
                value={spendCap}
                onChange={(e) => setSpendCap(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">System Behavior & Governance Prompt</label>
            <textarea
              rows={4}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="sm" type="submit">
              Save Tricksy AI Configuration
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};
