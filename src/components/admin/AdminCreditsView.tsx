import React, { useState } from 'react';
import { 
  Coins, 
  Plus, 
  Sliders, 
  Search, 
  Mail, 
  PhoneCall, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';

export const AdminCreditsView: React.FC = () => {
  const { users, teams, creditCosts, setCreditCosts, addCreditsToUser } = useAdmin();

  const [leadCost, setLeadCost] = useState(creditCosts.leadSearch.toString());
  const [emailCost, setEmailCost] = useState(creditCosts.emailSend.toString());
  const [voiceCost, setVoiceCost] = useState(creditCosts.voiceMinute.toString());
  const [aiCost, setAiCost] = useState(creditCosts.aiRequest.toString());
  const [enrichCost, setEnrichCost] = useState(creditCosts.enrichment.toString());

  const totalUserCredits = users.reduce((acc, u) => acc + u.credits, 0);
  const totalTeamCredits = teams.reduce((acc, t) => acc + t.credits, 0);

  const handleSaveConsumptionRules = (e: React.FormEvent) => {
    e.preventDefault();
    setCreditCosts({
      leadSearch: parseInt(leadCost) || 1,
      emailSend: parseInt(emailCost) || 1,
      voiceMinute: parseInt(voiceCost) || 5,
      aiRequest: parseInt(aiCost) || 2,
      enrichment: parseInt(enrichCost) || 3,
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Credit Ledger & Consumption Rules
            </h2>
            <Badge variant="amber" size="sm">Central Ledger</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Define universal credit debit rates per action, inspect customer balances, and issue direct credit line adjustments.
          </p>
        </div>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Total User Credits Issued</span>
          <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
            {totalUserCredits.toLocaleString()}
          </div>
          <div className="text-[11px] text-primary font-bold">Live in active user balances</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Team Workspace Shared Pools</span>
          <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
            {totalTeamCredits.toLocaleString()}
          </div>
          <div className="text-[11px] text-primary font-bold">Allocated across organization pools</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Total Aggregate Supply</span>
          <div className="text-2xl font-black text-slate-950 dark:text-white font-mono text-amber-500">
            {(totalUserCredits + totalTeamCredits).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Zero inflationary drift</div>
        </div>
      </div>

      {/* 3. Module Consumption Rules Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Module Debit Consumption Matrix (Cost per Action)
          </h3>
          <p className="text-xs text-slate-500">
            Adjusting these values instantly modifies live credit debiting across all platform endpoints.
          </p>
        </div>

        <form onSubmit={handleSaveConsumptionRules} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Search className="w-4 h-4 text-primary" />
              <span>Lead Search</span>
            </div>
            <div className="space-y-1">
              <input
                type="number"
                value={leadCost}
                onChange={(e) => setLeadCost(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">credits / verified lead</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Mail className="w-4 h-4 text-primary" />
              <span>Email Send</span>
            </div>
            <div className="space-y-1">
              <input
                type="number"
                value={emailCost}
                onChange={(e) => setEmailCost(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">credits / outbound email</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <PhoneCall className="w-4 h-4 text-primary" />
              <span>Voice Minute</span>
            </div>
            <div className="space-y-1">
              <input
                type="number"
                value={voiceCost}
                onChange={(e) => setVoiceCost(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">credits / AI phone call min</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI Request</span>
            </div>
            <div className="space-y-1">
              <input
                type="number"
                value={aiCost}
                onChange={(e) => setAiCost(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">credits / prompt execution</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Enrichment</span>
            </div>
            <div className="space-y-1">
              <input
                type="number"
                value={enrichCost}
                onChange={(e) => setEnrichCost(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400">credits / phone lookup</span>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-5 flex justify-end">
            <Button variant="primary" size="sm" type="submit">
              Save Consumption Matrix
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};
