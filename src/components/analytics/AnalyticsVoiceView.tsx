import React, { useState } from 'react';
import { 
  PhoneCall, 
  TrendingUp, 
  Download, 
  Clock, 
  Mic, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  Sparkles,
  PhoneForwarded,
  ShieldCheck
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
  formatDuration 
} from '../../utils/formatters';

export const AnalyticsVoiceView: React.FC = () => {
  const { exportReport } = useAnalytics();
  const [activeChartMetric, setActiveChartMetric] = useState<'calls' | 'connected' | 'minutes' | 'conversions'>('calls');

  // Voice KPIs (Part 12)
  const totalCalls = 1420;
  const connectedCalls = 965;
  const missedCalls = 410;
  const completedCalls = 945;
  const failedCalls = 20;
  const totalMinutes = 4820;
  const avgDurationSeconds = 195; // 3m 15s
  const answerRate = 68.0;
  const conversionRate = 38.2;

  // AI Voice SDR Agents (Part 12)
  const voiceAgents = [
    { name: 'Chloe (Enterprise SDR)', voiceModel: 'ElevenLabs Turbo v2', calls: 620, connected: 440, avgDuration: '3m 42s', conversions: 28, successRate: 96.4, credits: 1840 },
    { name: 'Marcus (Inbound Qualification)', voiceModel: 'Cartesia Sonic Sub-400ms', calls: 480, connected: 340, avgDuration: '2m 58s', conversions: 22, successRate: 98.2, credits: 1420 },
    { name: 'Victoria (Executive Outbound)', voiceModel: 'ElevenLabs Turbo v2', calls: 320, connected: 185, avgDuration: '3m 10s', conversions: 12, successRate: 94.8, credits: 980 },
  ];

  // Daily Trend
  const dailyVoiceData = [
    { day: 'Mon', calls: 280, connected: 190, minutes: 980, conversions: 8 },
    { day: 'Tue', calls: 340, connected: 235, minutes: 1180, conversions: 11 },
    { day: 'Wed', calls: 310, connected: 215, minutes: 1050, conversions: 9 },
    { day: 'Thu', calls: 290, connected: 198, minutes: 990, conversions: 8 },
    { day: 'Fri', calls: 200, connected: 127, minutes: 620, conversions: 5 },
  ];

  const maxVal = Math.max(...dailyVoiceData.map(d => d[activeChartMetric]), 10);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Voice AI SDR Telephony & Speech Intelligence
            </h2>
            <Badge variant="emerald" size="sm">Sub-400ms Audio Latency</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Real-time call completion rates, conversation durations, qualification conversion, and agent leaderboard.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Voice CSV
        </Button>
      </div>

      {/* 2. Top 10 Voice KPIs (Part 12) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Total Calls"
          value={totalCalls}
          type="number"
          change="+38.2%"
          isPositive={true}
          supportingLabel="AI dialed calls"
        />
        <MetricCard
          title="Connected (68.0%)"
          value={connectedCalls}
          type="number"
          change="+4.5% vs avg"
          isPositive={true}
          supportingLabel="Live humans answered"
        />
        <MetricCard
          title="Total Call Minutes"
          value={`${formatNumber(totalMinutes)}m`}
          change="+42.0%"
          isPositive={true}
          supportingLabel="80.3 Total hours"
        />
        <MetricCard
          title="Avg Call Duration"
          value={formatDuration(avgDurationSeconds)}
          change="+24s"
          isPositive={true}
          supportingLabel="Deep qualification"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change="+6.4%"
          isPositive={true}
          supportingLabel="Call-to-meeting rate"
        />
        <MetricCard
          title="Failed Calls"
          value={failedCalls}
          type="number"
          change="1.4% Rate"
          isPositive={true}
          supportingLabel="98.6% Success SLA"
        />
      </div>

      {/* 3. Voice Call Activity Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Daily Voice AI Call Telemetry
            </h3>
            <p className="text-xs text-slate-500">
              Call volume, connected conversations, total minutes, and booked meetings.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#202020] text-xs font-mono">
            {(['calls', 'connected', 'minutes', 'conversions'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setActiveChartMetric(m)}
                className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                  activeChartMetric === m
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="h-48 w-full flex items-end gap-6 pt-4">
          {dailyVoiceData.map((d) => {
            const val = d[activeChartMetric];
            const heightPct = Math.round((val / maxVal) * 100);

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

      {/* 4. AI Voice SDR Agent Performance Table (Part 12) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              AI Voice SDR Agent Performance Leaderboard
            </h3>
            <p className="text-xs text-slate-500">
              Autonomous speech engine latency, qualification duration, conversions, and credit usage.
            </p>
          </div>
          <Badge variant="emerald" size="sm">3 Voice Agents Deployed</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[720px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Voice Agent</th>
                <th className="pb-3">TTS / Speech Engine</th>
                <th className="pb-3">Total Calls</th>
                <th className="pb-3">Connected</th>
                <th className="pb-3">Avg Duration</th>
                <th className="pb-3">Meetings Booked</th>
                <th className="pb-3">Success Rate</th>
                <th className="pb-3">Credits Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {voiceAgents.map((ag) => (
                <tr key={ag.name} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-500" />
                    <span>{ag.name}</span>
                  </td>
                  <td className="py-3.5 text-slate-500 font-sans">{ag.voiceModel}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{formatNumber(ag.calls)}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatNumber(ag.connected)}</td>
                  <td className="py-3.5 text-slate-800 dark:text-slate-200 font-bold">{ag.avgDuration}</td>
                  <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{ag.conversions} Demos</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                      {formatPercentage(ag.successRate)}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500">{formatNumber(ag.credits)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
