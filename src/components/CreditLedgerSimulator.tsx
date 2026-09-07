import React, { useState } from 'react';
import { Coins, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const CreditLedgerSimulator: React.FC = () => {
  const [emails, setEmails] = useState(15000);
  const [voiceMinutes, setVoiceMinutes] = useState(150);
  const [leadUnlocks, setLeadUnlocks] = useState(1000);
  const [upworkBids, setUpworkBids] = useState(80);

  // Credit calculation assumptions:
  // 1 email send = 1 credit
  // 1 verified lead unlock = 5 credits
  // 1 voice AI minute = 20 credits
  // 1 Upwork tailored proposal = 15 credits
  const totalCredits = (emails * 1) + (leadUnlocks * 5) + (voiceMinutes * 20) + (upworkBids * 15);
  const estimatedCost = Math.round(totalCredits * 0.0035);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 text-white space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-indigo-400/30 text-blue-300 text-xs font-bold font-sans uppercase tracking-wider">
            Transparent Append-Only Ledger
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            Simulate Your Monthly Credit Consumption
          </h3>
          <p className="text-slate-400 text-sm">
            No surprise billing, no hidden fees. Every verification, send, call, and proposal is an immutable line item.
          </p>
        </div>

        <div className="bg-blue-950/80 border border-blue-800/60 rounded-2xl p-4 text-right">
          <div className="text-xs text-blue-300 font-sans">Monthly Credits Needed</div>
          <div className="text-3xl font-black text-blue-400 font-sans">{totalCredits.toLocaleString()}</div>
          <div className="text-xs text-slate-400">• ${estimatedCost}/mo in value</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Email Sends (Multi-Inbox)</span>
            <span className="text-blue-400 font-sans">{emails.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="1000" max="100000" step="1000" 
            value={emails} onChange={(e) => setEmails(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="text-[10px] text-slate-400">1 Credit / email send</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>B2B Verified Leads</span>
            <span className="text-blue-400 font-sans">{leadUnlocks.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="100" max="10000" step="100" 
            value={leadUnlocks} onChange={(e) => setLeadUnlocks(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="text-[10px] text-slate-400">5 Credits / verified profile</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Voice AI SDR Minutes</span>
            <span className="text-blue-400 font-sans">{voiceMinutes} mins</span>
          </div>
          <input 
            type="range" min="10" max="2000" step="10" 
            value={voiceMinutes} onChange={(e) => setVoiceMinutes(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="text-[10px] text-slate-400">20 Credits / call minute</div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Upwork / Freelancer Bids</span>
            <span className="text-blue-400 font-sans">{upworkBids} bids</span>
          </div>
          <input 
            type="range" min="10" max="500" step="10" 
            value={upworkBids} onChange={(e) => setUpworkBids(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="text-[10px] text-slate-400">15 Credits / proposal</div>
        </div>
      </div>

      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Unused credits roll over monthly. Enterprise agencies get pooled wallet allocation across all client workspaces.</span>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white transition-colors cursor-pointer shrink-0">
          Included in Growth & Agency Plans
        </button>
      </div>
    </div>
  );
};

