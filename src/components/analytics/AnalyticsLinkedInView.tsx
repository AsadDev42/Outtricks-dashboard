import React, { useState } from 'react';
import { 
  Linkedin, 
  TrendingUp, 
  Download, 
  UserPlus, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Send, 
  CheckCircle2,
  Users,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';
import { MetricCard } from './shared/MetricCard';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage 
} from '../../utils/formatters';

export const AnalyticsLinkedInView: React.FC = () => {
  const { exportReport } = useAnalytics();
  const [chartMetric, setChartMetric] = useState<'requests' | 'accepted' | 'messages' | 'replies'>('requests');

  // LinkedIn KPIs (Part 11)
  const profilesConnected = 4;
  const connectionRequests = 1420;
  const requestsAccepted = 568;
  const acceptanceRate = 40.0;
  const profileVisits = 3240;
  const messagesSent = 1840;
  const messageReplies = 442;
  const replyRate = 24.0;
  const inMailsSent = 120;
  const conversions = 38;

  // Account Health
  const linkedInAccounts = [
    { name: 'Sarah Jenkins (Growth)', proxy: 'US Residential 4G', status: 'Optimal', dailyActions: 48, acceptance: 42.5, replyRate: 26.2, healthScore: 98 },
    { name: 'David Zhao (Outbound)', proxy: 'US Residential 4G', status: 'Optimal', dailyActions: 45, acceptance: 39.8, replyRate: 23.4, healthScore: 96 },
    { name: 'Alex Rivera (AE)', proxy: 'EU Residential 4G', status: 'Optimal', dailyActions: 40, acceptance: 38.2, replyRate: 22.0, healthScore: 95 },
  ];

  // Weekly Trend
  const weeklyTrend = [
    { week: 'W1', requests: 280, accepted: 110, messages: 360, replies: 88 },
    { week: 'W2', requests: 340, accepted: 136, messages: 440, replies: 105 },
    { week: 'W3', requests: 380, accepted: 152, messages: 510, replies: 122 },
    { week: 'W4', requests: 420, accepted: 170, messages: 530, replies: 127 },
  ];

  const maxVal = Math.max(...weeklyTrend.map(w => w[chartMetric]), 50);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              LinkedIn Safe Automation & Social Selling Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Dedicated residential proxy health, acceptance rates, message response velocity, and pipeline attribution.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export LinkedIn CSV
        </Button>
      </div>

      {/* 2. Top 10 LinkedIn KPIs (Part 11) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Connected Senders"
          value={profilesConnected}
          type="number"
          supportingLabel="Safe residential proxies"
        />
        <MetricCard
          title="Connection Requests"
          value={connectionRequests}
          type="number"
          change="+14.2%"
          isPositive={true}
          supportingLabel="Personalized notes"
        />
        <MetricCard
          title="Accepted (40.0%)"
          value={requestsAccepted}
          type="number"
          change="+3.5% vs avg"
          isPositive={true}
          supportingLabel="New 1st connections"
        />
        <MetricCard
          title="Profile Views"
          value={profileVisits}
          type="number"
          change="+28.0%"
          isPositive={true}
          supportingLabel="Warm touchpoints"
        />
        <MetricCard
          title="Messages Sent"
          value={messagesSent}
          type="number"
          change="+18.4%"
          isPositive={true}
          supportingLabel="Sequenced touches"
        />
        <MetricCard
          title="Message Replies"
          value={messageReplies}
          type="number"
          change="24.0% Rate"
          isPositive={true}
          supportingLabel="Direct conversations"
        />
      </div>

      {/* 3. LinkedIn Connection & Message Activity Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Weekly LinkedIn Outreach Velocity
            </h3>
            <p className="text-xs text-slate-500">
              Connection requests, accepted connections, and message reply volume.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#1C1C1C] p-1 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-xs">
            {(['requests', 'accepted', 'messages', 'replies'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setChartMetric(m)}
                className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                  chartMetric === m
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="h-48 w-full flex items-end gap-6 pt-4">
          {weeklyTrend.map((w) => {
            const val = w[chartMetric as keyof typeof w] as number;
            const heightPct = Math.round((val / maxVal) * 100);

            return (
              <div key={w.week} className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer">
                <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-emerald-500">
                  {formatNumber(val)}
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600/70 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-200"
                  style={{ height: `${Math.max(15, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{w.week}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Connected Account Health Table (Part 11) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Connected Profile Safety & Health Monitoring
            </h3>
            <p className="text-xs text-slate-500">
              Proxy assignment, daily pacing limits, and acceptance health.
            </p>
          </div>
          <Badge variant="emerald" size="sm">100% Safe Operating Mode</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Sender Profile</th>
                <th className="pb-3">Proxy Node</th>
                <th className="pb-3">Daily Action Cap</th>
                <th className="pb-3">Acceptance %</th>
                <th className="pb-3">Reply %</th>
                <th className="pb-3">Health Score</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {linkedInAccounts.map((acc) => (
                <tr key={acc.name} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{acc.name}</td>
                  <td className="py-3.5 text-slate-500 font-sans">{acc.proxy}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{acc.dailyActions} / day</td>
                  <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{formatPercentage(acc.acceptance)}</td>
                  <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{formatPercentage(acc.replyRate)}</td>
                  <td className="py-3.5 font-black text-emerald-500">{acc.healthScore}/100</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{acc.status}</Badge>
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
