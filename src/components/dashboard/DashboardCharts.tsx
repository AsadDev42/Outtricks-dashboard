import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Layers, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DashboardCharts: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly'>('daily');

  const dailyPerformance = [
    { day: 'Mon', emailSent: 580, replies: 64, voiceCalls: 12, meetings: 4 },
    { day: 'Tue', emailSent: 620, replies: 78, voiceCalls: 18, meetings: 6 },
    { day: 'Wed', emailSent: 640, replies: 86, voiceCalls: 22, meetings: 8 },
    { day: 'Thu', emailSent: 610, replies: 72, voiceCalls: 16, meetings: 5 },
    { day: 'Fri', emailSent: 590, replies: 68, voiceCalls: 14, meetings: 5 },
    { day: 'Sat', emailSent: 280, replies: 28, voiceCalls: 4, meetings: 1 },
    { day: 'Sun', emailSent: 240, replies: 22, voiceCalls: 2, meetings: 1 },
  ];

  const funnelSteps = [
    { stage: '1. Sourced Contacts', count: '14,280', pct: '100%', color: 'bg-emerald-700', sub: '8D Targeting Filters' },
    { stage: '2. Contacts Verified', count: '13,050', pct: '91.4%', color: 'bg-emerald-600', sub: 'Verified Work Emails' },
    { stage: '3. Outbound Dispatched', count: '12,840', pct: '89.9%', color: 'bg-emerald-500', sub: '24 Multi-Inboxes' },
    { stage: '4. Positive Replies', count: '1,515', pct: '11.8%', color: 'bg-emerald-400', sub: 'Spintax & AI Voice' },
    { stage: '5. Pipeline Created', count: '38 Deals', pct: '2.5%', color: 'bg-emerald-300', sub: '$573,000 Pipeline Value' },
  ];

  const inboxes = [
    { name: 'sarah.j@outbound.cloudscale.ai', provider: 'Google Workspace', status: 'Warm', score: 100, sent: 25, max: 30 },
    { name: 'sdr.lead1@outbound.cloudscale.ai', provider: 'Google Workspace', status: 'Warm', score: 100, sent: 28, max: 30 },
    { name: 'growth@send.cloudscale.ai', provider: 'Microsoft 365', status: 'Warm', score: 99, sent: 22, max: 30 },
    { name: 'outreach.mkt@cloudscalerev.io', provider: 'Microsoft 365', status: 'Warming (Day 11)', score: 98, sent: 15, max: 20 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">
      
      {/* LEFT: Multi-Channel Outbound Velocity Chart (7 Cols) */}
      <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
                Multi-Channel Outbound Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#A0A0A0]">
              Synchronized dispatch volume, replies, and Voice AI qualified meetings.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#141414] text-xs font-bold border border-transparent dark:border-[#262626]">
            <button
              type="button"
              onClick={() => setChartPeriod('daily')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                chartPeriod === 'daily'
                  ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-[#777777] dark:hover:text-white'
              }`}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setChartPeriod('weekly')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                chartPeriod === 'weekly'
                  ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-[#777777] dark:hover:text-white'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-44 sm:h-52 pt-4 px-2 border-b border-slate-100 dark:border-[#262626]">
            {dailyPerformance.map((item, idx) => {
              const maxSent = 700;
              const heightPct = Math.min((item.emailSent / maxSent) * 100, 100);
              const replyPct = (item.replies / item.emailSent) * 100;

              return (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] p-1.5 rounded-lg text-center absolute -translate-y-28 pointer-events-none shadow-xl border border-[#2A2A2A] z-10 whitespace-nowrap">
                    <div>{item.emailSent} Sent</div>
                    <div className="text-emerald-400 font-bold">{item.replies} Replies ({replyPct.toFixed(1)}%)</div>
                    <div className="text-emerald-300">{item.meetings} Meetings</div>
                  </div>

                  {/* Dual Bar (Sent + Reply ratio) */}
                  <div className="w-full max-w-[36px] bg-slate-100 dark:bg-[#202020] rounded-t-xl overflow-hidden flex flex-col justify-end transition-all group-hover:bg-slate-200 dark:group-hover:bg-[#282828]" style={{ height: `${heightPct}%` }}>
                    <div
                      className="w-full bg-gradient-to-t from-[var(--primary,#10B981)] to-[var(--primary-hover,#059669)] rounded-t-lg transition-all"
                      style={{ height: '100%' }}
                    />
                  </div>

                  {/* Day Label */}
                  <span className="text-[11px] font-bold text-slate-500 dark:text-[#A0A0A0] group-hover:text-white transition-colors">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px] text-slate-500 dark:text-[#A0A0A0] font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary,#10B981)]" />
                <span>Cold Emails Dispatched (3,560 total)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Positive Intent Replies (418 total)</span>
              </span>
            </div>
            <Badge variant="emerald" size="sm">
              Average 11.8% Reply Rate
            </Badge>
          </div>
        </div>

      </div>

      {/* RIGHT: Lead-to-Revenue Conversion Funnel (5 Cols) */}
      <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between">
        
        {/* Header */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
              End-to-End Revenue Funnel
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#A0A0A0]">
            Conversion cascade from 8D lead match to Closed-Won ARR.
          </p>
        </div>

        {/* Funnel Rows */}
        <div className="space-y-2.5">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-[#B5B5B5] font-sans">{step.stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-950 dark:text-white font-mono">{step.count}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({step.pct})</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
                <div
                  className={`h-full ${step.color} rounded-full transition-all duration-500`}
                  style={{ width: step.pct }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121212] border border-slate-100 dark:border-[#202020] text-[11px] text-slate-500 dark:text-[#A0A0A0] flex items-center justify-between">
          <span>Target Attainment: <strong>$573,000 / $600,000</strong></span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">95.5% on track</span>
        </div>

      </div>

    </div>
  );
};
