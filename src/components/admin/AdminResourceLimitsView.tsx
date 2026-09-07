import React from 'react';
import { Sliders, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';

export const AdminResourceLimitsView: React.FC = () => {
  const { plans } = useAdmin();

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Global Resource Limits & Tier Envelopes
            </h2>
            <Badge variant="emerald" size="sm">Hard Quota Enforcement</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Compare ceiling limits applied to client workspaces across plans. Effective limits are enforced at the API gateway.
          </p>
        </div>
      </div>

      {/* 2. Limits Matrix Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Seat Seats</th>
                <th className="py-3.5 px-4">Emails / mo</th>
                <th className="py-3.5 px-4">Leads / mo</th>
                <th className="py-3.5 px-4">Calls / mo</th>
                <th className="py-3.5 px-4">LinkedIn / mo</th>
                <th className="py-3.5 px-4">AI Tokens / mo</th>
                <th className="py-3.5 px-4">Voice Agents</th>
                <th className="py-3.5 px-4">Mailboxes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {plans.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {p.userLimit} seats
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {p.emailLimitMonthly.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {p.leadFinderLimitMonthly.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {p.callLimitMonthly.toLocaleString()} mins
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {p.linkedInLimitMonthly.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {(p.aiUsageLimitMonthly / 1000000).toFixed(0)}M tokens
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {p.voiceAgentLimit}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {p.mailboxLimit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
