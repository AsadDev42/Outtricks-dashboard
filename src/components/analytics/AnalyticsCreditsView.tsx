import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  Download, 
  Plus, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap,
  Filter,
  Search,
  X
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';
import { MetricCard } from './shared/MetricCard';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate 
} from '../../utils/formatters';

export const AnalyticsCreditsView: React.FC = () => {
  const { creditUsage, topUpCredits, exportReport } = useAnalytics();
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  // Credit KPIs (Part 15)
  const totalCredits = creditUsage?.totalCredits || 42850;
  const usedCredits = creditUsage?.usedCredits || 21350;
  const remainingCredits = creditUsage?.remainingCredits || 21500;
  const creditsAdded = 15000;
  const creditsExpired = 0;
  const creditsTransferred = 2500;
  const exhaustionDays = creditUsage?.projectedDepletionDays || 18;

  // Module breakdown (Part 15)
  const moduleBreakdown = [
    { module: '8D Lead Finder', pct: 32, credits: 6832, color: '#2563EB' },
    { module: 'Cold Email Outreach', pct: 28, credits: 5978, color: '#3B82F6' },
    { module: 'Voice AI SDR Telephony', pct: 18, credits: 3843, color: '#10B981' },
    { module: 'Tricksy Autonomous AI', pct: 14, credits: 2989, color: '#8B5CF6' },
    { module: 'LinkedIn Safe Automations', pct: 6, credits: 1281, color: '#0066FF' },
    { module: 'Workflows & CRM', pct: 2, credits: 427, color: '#64748B' },
  ];

  // Credit consumption ledger (Part 15)
  const consumptionLedger = [
    { date: '2026-08-30 14:22', user: 'Sarah Jenkins', team: 'CloudScale Revenue Ops', module: '8D Lead Finder', action: 'Bulk ICP Export (250 leads)', used: 250, remaining: 21500 },
    { date: '2026-08-30 13:45', user: 'David Zhao', team: 'Apex Outbound Growth', module: 'Voice AI SDR', action: 'Automated Call Campaign (18 calls)', used: 72, remaining: 21750 },
    { date: '2026-08-30 12:10', user: 'Alex Rivera', team: 'Solaris Strategic Deals', module: 'Tricksy AI', action: 'Personalized Email Generation', used: 45, remaining: 21822 },
    { date: '2026-08-30 11:30', user: 'Elena Rostova', team: 'CloudScale Revenue Ops', module: 'Cold Email', action: 'Email Dispatch (420 sends)', used: 420, remaining: 21867 },
    { date: '2026-08-30 10:15', user: 'Sarah Jenkins', team: 'CloudScale Revenue Ops', module: 'LinkedIn Safe', action: 'Connection Invites (35 invites)', used: 35, remaining: 22287 },
  ];

  // Top-Up Credit Packs
  const creditPacks = [
    { amount: 5000, price: '$49', discount: 'Standard Rate' },
    { amount: 15000, price: '$129', discount: 'Popular (14% Off)' },
    { amount: 50000, price: '$349', discount: 'Best Value (30% Off)' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Credit Consumption & Ledger Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time credit ledger balance, consumption velocity by engine module, and projected runway.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportReport('CSV')}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Ledger CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsTopUpModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Top-Up Credits
          </Button>
        </div>
      </div>

      {/* 2. Top 6 Credit KPIs (Part 15) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Total Ledger Balance"
          value={totalCredits}
          type="number"
          supportingLabel="All workspace pools"
        />
        <MetricCard
          title="Credits Used"
          value={usedCredits}
          type="number"
          change="49.8% Burn"
          isPositive={true}
          supportingLabel="This billing cycle"
        />
        <MetricCard
          title="Remaining Credits"
          value={remainingCredits}
          type="number"
          change={`${exhaustionDays} Days Left`}
          isPositive={true}
          supportingLabel="Projected exhaustion date"
        />
        <MetricCard
          title="Credits Added"
          value={creditsAdded}
          type="number"
          change="+15,000"
          isPositive={true}
          supportingLabel="Monthly plan allocation"
        />
        <MetricCard
          title="Credits Expired"
          value={creditsExpired}
          type="number"
          change="0 Expired"
          isPositive={true}
          supportingLabel="No credit expiration"
        />
        <MetricCard
          title="Transferred / Shared"
          value={creditsTransferred}
          type="number"
          change="3 Teams"
          isPositive={true}
          supportingLabel="Cross-workspace sharing"
        />
      </div>

      {/* 3. Module Breakdown & Burn Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module Burn Distribution */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Credit Burn by Outtricks Module
              </h3>
              <p className="text-xs text-slate-500">
                Segmented ledger consumption across lead finding, email, voice, and AI execution.
              </p>
            </div>
            <Badge variant="blue" size="sm">6 Engine Modules</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {moduleBreakdown.map((m) => (
              <div
                key={m.module}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between font-sans">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span>{m.module}</span>
                  </div>
                  <strong className="text-slate-900 dark:text-white font-mono">{formatNumber(m.credits)} ({m.pct}%)</strong>
                </div>

                <div className="h-2 rounded-full bg-slate-200 dark:bg-[#181818] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projected Exhaustion & Runway Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Runway Forecast
              </h3>
              <Badge variant="amber" size="sm">Predictive</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold uppercase">Estimated Depletion</span>
              <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
                {exhaustionDays} Days Remaining
              </div>
              <p className="text-[11px] text-slate-500">
                At the current burn rate of ~1,180 credits/day, your ledger will exhaust around September 18, 2026.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsTopUpModalOpen(true)}
            className="w-full"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Auto-Reload Settings
          </Button>
        </div>

      </div>

      {/* 4. Credit Consumption Ledger Table (Part 15) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Real-Time Credit Consumption Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Audit log of all actions, users, workspaces, and remaining credit balances.
            </p>
          </div>
          <Badge variant="emerald" size="sm">Live Ledger</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Workspace Team</th>
                <th className="pb-3">Module</th>
                <th className="pb-3">Action Description</th>
                <th className="pb-3">Credits Burned</th>
                <th className="pb-3 text-right">Balance Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {consumptionLedger.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 text-slate-500 text-[11px]">{c.date}</td>
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{c.user}</td>
                  <td className="py-3.5 text-slate-500 font-sans">{c.team}</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{c.module}</Badge>
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300 font-sans">{c.action}</td>
                  <td className="py-3.5 font-bold text-rose-500">-{formatNumber(c.used)}</td>
                  <td className="py-3.5 font-extrabold text-slate-900 dark:text-white text-right">{formatNumber(c.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Top-Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                  Add Credit Pack to Workspace Ledger
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTopUpModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {creditPacks.map((pack, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPack(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedPack === idx
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10'
                      : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C]'
                  }`}
                >
                  <div>
                    <div className="text-base font-extrabold text-slate-950 dark:text-white font-sans">
                      +{formatNumber(pack.amount)} Credits
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{pack.discount}</div>
                  </div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{pack.price}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsTopUpModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (selectedPack !== null) {
                    const pack = creditPacks[selectedPack];
                    topUpCredits(pack.amount, pack.price);
                  }
                  setIsTopUpModalOpen(false);
                }}
              >
                Confirm & Top-Up
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
