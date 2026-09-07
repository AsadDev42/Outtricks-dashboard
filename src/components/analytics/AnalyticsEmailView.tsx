import React, { useState } from 'react';
import { 
  Mail, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Inbox, 
  RotateCcw, 
  MousePointer, 
  MessageSquare,
  ShieldCheck,
  Server
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

export const AnalyticsEmailView: React.FC = () => {
  const { exportReport } = useAnalytics();
  const [activeChartMetric, setActiveChartMetric] = useState<'sent' | 'opened' | 'clicked' | 'replied'>('sent');

  // Email KPIs (Part 10)
  const emailsSent = 24800;
  const emailsDelivered = 24650;
  const emailsBounced = 150;
  const emailsOpened = 15890;
  const emailsClicked = 6420;
  const emailsReplied = 1840;
  const emailsUnsubscribed = 42;
  const spamComplaints = 2;

  // Key Rates
  const deliveryRate = 99.4;
  const openRate = 64.5;
  const clickRate = 25.9;
  const replyRate = 7.4;
  const bounceRate = 0.6;
  const unsubscribeRate = 0.17;

  // Mailbox performance
  const mailboxes = [
    { email: 'alex@outtricks.tech', provider: 'Google Workspace', sent: 6200, delivered: 6180, openPct: 68.2, replyPct: 8.5, bouncePct: 0.3, status: 'Warm & Optimal' },
    { email: 'sarah@outtricks.tech', provider: 'Google Workspace', sent: 5800, delivered: 5770, openPct: 65.4, replyPct: 7.8, bouncePct: 0.5, status: 'Warm & Optimal' },
    { email: 'growth@outtricks.io', provider: 'Microsoft 365', sent: 6800, delivered: 6740, openPct: 62.1, replyPct: 6.9, bouncePct: 0.8, status: 'Warm & Optimal' },
    { email: 'outreach@scaleouttricks.com', provider: 'Private SMTP Relay', sent: 6000, delivered: 5960, openPct: 63.8, replyPct: 7.2, bouncePct: 0.6, status: 'Warm & Optimal' },
  ];

  // Daily Trend
  const dailyEmailActivity = [
    { day: 'Mon', sent: 4800, opened: 3100, clicked: 1200, replied: 350 },
    { day: 'Tue', sent: 5400, opened: 3600, clicked: 1450, replied: 420 },
    { day: 'Wed', sent: 5200, opened: 3450, clicked: 1380, replied: 390 },
    { day: 'Thu', sent: 4900, opened: 3200, clicked: 1290, replied: 370 },
    { day: 'Fri', sent: 4500, opened: 2540, clicked: 1100, replied: 310 },
  ];

  const maxDailyVal = Math.max(...dailyEmailActivity.map(d => d[activeChartMetric]), 100);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Cold Email Deliverability & Engagement Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time mailbox health, domain reputation, warmup tracking, and response conversion rates.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Deliverability CSV
        </Button>
      </div>

      {/* 2. Top 10 Cold Email KPIs (Part 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Emails Sent"
          value={emailsSent}
          type="number"
          change="+14.2%"
          isPositive={true}
          supportingLabel="Across 4 active domains"
        />
        <MetricCard
          title="Delivered Rate"
          value={deliveryRate}
          type="percentage"
          change="+0.8%"
          isPositive={true}
          supportingLabel="Inbox placement score"
        />
        <MetricCard
          title="Unique Opens"
          value={openRate}
          type="percentage"
          change="+4.1%"
          isPositive={true}
          supportingLabel="Subject line efficacy"
        />
        <MetricCard
          title="Reply Rate"
          value={replyRate}
          type="percentage"
          change="+1.6%"
          isPositive={true}
          supportingLabel="Value proposition resonance"
        />
        <MetricCard
          title="Positive Sentiments"
          value={84.2}
          type="percentage"
          change="+8.2%"
          isPositive={true}
          supportingLabel="Meeting intent detected"
        />
        <MetricCard
          title="Spam / Bounce"
          value={bounceRate}
          type="percentage"
          change="0.0% Clean"
          isPositive={true}
          supportingLabel="SPF / DKIM / DMARC valid"
        />
      </div>

      {/* 3. Daily Email Activity Progression Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-[#202020] gap-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              7-Day Dispatch & Engagement Progression
            </h3>
            <p className="text-xs text-slate-500">
              Daily volume breakdown across send, open, click, and reply events.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#1C1C1C] p-1 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-xs">
            {(['sent', 'opened', 'clicked', 'replied'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setActiveChartMetric(m)}
                className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                  activeChartMetric === m
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
          {dailyEmailActivity.map((d) => {
            const val = d[activeChartMetric];
            const heightPct = Math.round((val / maxDailyVal) * 100);

            return (
              <div key={d.day} className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer">
                <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-emerald-500">
                  {formatNumber(val)}
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600/70 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-200"
                  style={{ height: `${Math.max(15, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Mailbox Performance Table (Part 10) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Connected Mailbox Health & Delivery Performance
            </h3>
            <p className="text-xs text-slate-500">
              Individual sender account throughput, open rates, and bounce monitoring.
            </p>
          </div>
          <Badge variant="emerald" size="sm">4 Mailboxes Connected</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[720px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Mailbox Account</th>
                <th className="pb-3">Infrastructure</th>
                <th className="pb-3">Sent Volume</th>
                <th className="pb-3">Delivered</th>
                <th className="pb-3">Open %</th>
                <th className="pb-3">Reply %</th>
                <th className="pb-3">Bounce %</th>
                <th className="pb-3">Warmup Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {mailboxes.map((mb) => (
                <tr key={mb.email} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{mb.email}</td>
                  <td className="py-3.5 text-slate-500 font-sans">{mb.provider}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{formatNumber(mb.sent)}</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{formatNumber(mb.delivered)}</td>
                  <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{formatPercentage(mb.openPct)}</td>
                  <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{formatPercentage(mb.replyPct)}</td>
                  <td className="py-3.5 text-slate-500">{formatPercentage(mb.bouncePct)}</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{mb.status}</Badge>
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
