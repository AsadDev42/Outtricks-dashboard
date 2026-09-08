import React from 'react';
import { Coins, Search, Mail, PhoneCall, Sparkles, TrendingDown, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';

export const AdminCreditUsageView: React.FC = () => {
  const { creditCosts } = useAdmin();

  const MOCK_CREDIT_EVENTS = [
    { id: 'ev-1', user: 'Sarah Jenkins', action: 'Lead Search Verification (25 leads)', credits: -25, module: 'Lead Finder', timestamp: '2m ago' },
    { id: 'ev-2', user: 'David Zhao', action: 'Multi-Channel AI Sequence Dispatch', credits: -50, module: 'Cold Email', timestamp: '14m ago' },
    { id: 'ev-3', user: 'Alex Rivera', action: 'Voice AI SDR Interactive Call (4.2 mins)', credits: -25, module: 'Voice AI', timestamp: '32m ago' },
    { id: 'ev-4', user: 'Sarah Jenkins', action: 'TRIXIE AI Account Research Run', credits: -10, module: 'TRIXIE AI', timestamp: '1h ago' },
    { id: 'ev-5', user: 'Marcus Vance', action: 'Direct Phone Number Enrichment (10 leads)', credits: -30, module: 'Enrichment', timestamp: '2h ago' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Credit Burn Velocity & Module Consumption Stream
            </h2>
            <Badge variant="amber" size="sm">Live Consumption</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Real-time audit stream of credit deductions across all active client accounts.
          </p>
        </div>
      </div>

      {/* 2. Events Stream Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] font-bold text-sm text-slate-950 dark:text-white">
          Recent Debit Stream
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#202020] text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3.5 px-4">User Account</th>
                <th className="py-3.5 px-4">Action Detail</th>
                <th className="py-3.5 px-4">Module</th>
                <th className="py-3.5 px-4">Credit Delta</th>
                <th className="py-3.5 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {MOCK_CREDIT_EVENTS.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {ev.user}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {ev.action}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="slate" size="sm">{ev.module}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-500">
                    {ev.credits} credits
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {ev.timestamp}
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
