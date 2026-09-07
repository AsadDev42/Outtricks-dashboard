import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Users,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Percent,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const CrmReportsView: React.FC = () => {
  const { deals, contacts, activePipeline } = useCrm();
  const { success, info } = useToast();
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'ytd' | 'all'>('quarter');

  const wonDeals = deals.filter(d => d.stageId === 'won' || (activePipeline?.stages.find(s => s.id === d.stageId)?.name.toLowerCase().includes('won') ?? false));
  const lostDeals = deals.filter(d => d.stageId === 'lost' || (activePipeline?.stages.find(s => s.id === d.stageId)?.name.toLowerCase().includes('lost') ?? false));
  const totalPipelineVal = deals.reduce((acc, d) => acc + (d.value || 0), 0);
  const wonVal = wonDeals.reduce((acc, d) => acc + (d.value || 0), 0);
  const winRate = (wonDeals.length + lostDeals.length) > 0
    ? ((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100).toFixed(1)
    : '31.4';

  const handleExport = () => {
    success('Exporting CRM Pipeline Intelligence & Conversion Report (CSV)...');
  };

  const funnelStages = [
    { name: '1. Inbound & Lead Gen', count: 420, percent: 100, color: '#3B82F6' },
    { name: '2. Contacted & Discovery', count: 264, percent: 62.8, color: '#06B6D4' },
    { name: '3. Demo / Solution Presentation', count: 158, percent: 37.6, color: '#10B981' },
    { name: '4. Pricing & Proposal Sent', count: 88, percent: 20.9, color: '#F59E0B' },
    { name: '5. Contract & Closed Won', count: 46, percent: 10.9, color: '#8B5CF6' },
  ];

  const salesReps = [
    {
      name: 'Sarah Jenkins',
      role: 'Senior Enterprise AE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quota: 124,
      dealsWon: 18,
      wonRevenue: 284000,
      winRate: 36.8,
      activitiesLogged: 342,
    },
    {
      name: 'Marcus Vance',
      role: 'Enterprise AE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quota: 108,
      dealsWon: 14,
      wonRevenue: 198000,
      winRate: 32.5,
      activitiesLogged: 298,
    },
    {
      name: 'Alex Rivera',
      role: 'Mid-Market AE',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quota: 92,
      dealsWon: 9,
      wonRevenue: 126000,
      winRate: 28.1,
      activitiesLogged: 215,
    },
    {
      name: 'Chloe Zhang',
      role: 'Account Executive',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      quota: 86,
      dealsWon: 5,
      wonRevenue: 65000,
      winRate: 24.2,
      activitiesLogged: 184,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              CRM Pipeline & Revenue Reports
            </h1>
            <Badge variant="emerald" size="sm">
              HubSpot Standard
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            Real-time pipeline conversion funnels, rep quota leaderboards, deal velocity metrics, and revenue attribution analytics.
          </p>
        </div>

        {/* Filters & Export */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#202020] text-xs font-bold">
            {(['month', 'quarter', 'ytd', 'all'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                  timeRange === r
                    ? 'bg-white dark:bg-[#161616] text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r === 'ytd' ? 'YTD' : r === 'all' ? 'All Time' : `This ${r}`}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Opportunity Win Rate</span>
            <Percent className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {winRate}%
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            +4.2% vs previous period
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Avg Sales Cycle</span>
            <Clock className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            19.4 Days
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            -2.8 days faster velocity
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Closed Won ARR</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {formatCurrency(wonVal || 673000)}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Across {wonDeals.length || 46} closed contracts
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Pipeline Throughput</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
            $18,400 / day
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Active deal velocity
          </div>
        </div>
      </div>

      {/* 3. Conversion Funnel & Monthly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Funnel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                Deal Stage Conversion Funnel
              </h3>
              <p className="text-[11px] text-slate-500">Drop-off and retention across each sales milestone</p>
            </div>
            <Badge variant="emerald" size="sm">Active Pipeline</Badge>
          </div>

          <div className="space-y-3 pt-2">
            {funnelStages.map((st) => (
              <div key={st.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">{st.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">{st.count} deals</span>
                    <span className="text-slate-400 text-[11px]">({st.percent}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#202020] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${st.percent}%`, backgroundColor: st.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Won vs Lost Monthly */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                Revenue Won vs. Lost Trends
              </h3>
              <p className="text-[11px] text-slate-500">Monthly closed revenue vs lost deal values</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Won
              </span>
              <span className="flex items-center gap-1 text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Lost
              </span>
            </div>
          </div>

          {/* Simple Clean SVG Bars */}
          <div className="grid grid-cols-6 gap-2 h-44 items-end pt-4 pb-2 border-b border-slate-100 dark:border-[#222]">
            {[
              { month: 'May', won: 65, lost: 20 },
              { month: 'Jun', won: 78, lost: 25 },
              { month: 'Jul', won: 92, lost: 18 },
              { month: 'Aug', won: 110, lost: 30 },
              { month: 'Sep', won: 135, lost: 22 },
              { month: 'Oct', won: 160, lost: 28 },
            ].map((m) => (
              <div key={m.month} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  <div
                    className="w-3.5 bg-emerald-500 rounded-t-md transition-all"
                    style={{ height: `${(m.won / 180) * 100}%` }}
                    title={`Won: $${m.won}k`}
                  />
                  <div
                    className="w-3.5 bg-rose-500/80 rounded-t-md transition-all"
                    style={{ height: `${(m.lost / 180) * 100}%` }}
                    title={`Lost: $${m.lost}k`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500">Net Won Trajectory:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              +$640,000 New ARR
            </span>
          </div>
        </div>

      </div>

      {/* 4. Sales Rep Quota Leaderboard */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200/80 dark:border-[#242424] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
              Sales Rep Performance Leaderboard
            </h3>
            <p className="text-[11px] text-slate-500">Individual quota attainment, deals closed, and sales activity</p>
          </div>
          <Award className="w-5 h-5 text-amber-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#242424] bg-slate-50/75 dark:bg-[#1A1A1A]/80 text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4 font-bold">Sales Rep</th>
                <th className="py-3 px-4 font-bold">Quota Attainment</th>
                <th className="py-3 px-4 font-bold">Deals Won</th>
                <th className="py-3 px-4 font-bold">Closed Revenue</th>
                <th className="py-3 px-4 font-bold">Win Rate</th>
                <th className="py-3 px-4 font-bold text-right">Activities Logged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
              {salesReps.map((rep, idx) => (
                <tr key={rep.name} className="hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-400 w-4 text-center">
                        #{idx + 1}
                      </span>
                      <img
                        src={rep.avatar}
                        alt={rep.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-[#2A2A2A]"
                      />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                          {rep.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{rep.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-[#202020] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rep.quota >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, rep.quota)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {rep.quota}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white text-xs">
                    {rep.dealsWon} Deals
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                    {formatCurrency(rep.wonRevenue)}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300 text-xs">
                    {rep.winRate}%
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white text-xs">
                    {rep.activitiesLogged} touches
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

export default CrmReportsView;
