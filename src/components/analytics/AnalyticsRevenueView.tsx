import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  PieChart, 
  BarChart3, 
  Users, 
  Layers, 
  Building2, 
  Sparkles,
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
  formatPercentage 
} from '../../utils/formatters';

export const AnalyticsRevenueView: React.FC = () => {
  const { exportReport, revenueData } = useAnalytics();
  const [revenueTimeframe, setRevenueTimeframe] = useState<'MRR' | 'ARR' | 'Cumulative'>('MRR');

  // Top KPIs (Part 7)
  const totalRevenue = 184000;
  const mrr = 15330;
  const arr = 184000;
  const newRevenue = 34500;
  const expansionRevenue = 18200;
  const recurringRevenue = 131300;
  const refunds = 1200;
  const netRevenue = 182800;
  const arpu = 799;
  const revenueGrowth = 32.0;

  // Plan Breakdown
  const plansBreakdown = [
    { plan: 'Scale Plus', customers: 48, mrr: 799 * 48, arr: 799 * 48 * 12, growth: 24.5, pct: 45 },
    { plan: 'Growth Tier', customers: 62, mrr: 399 * 62, arr: 399 * 62 * 12, growth: 18.2, pct: 32 },
    { plan: 'Enterprise Custom', customers: 6, mrr: 2400 * 6, arr: 2400 * 6 * 12, growth: 42.0, pct: 23 },
  ];

  // Top Customers
  const topCustomers = [
    { name: 'Stripe Inc.', plan: 'Enterprise Custom', mrr: 2400, ltv: 48000, status: 'Active', growth: '+18%' },
    { name: 'Databricks', plan: 'Enterprise Custom', mrr: 2400, ltv: 42000, status: 'Active', growth: '+25%' },
    { name: 'Ramp Financial', plan: 'Scale Plus', mrr: 799, ltv: 18400, status: 'Active', growth: '+12%' },
    { name: 'Retool', plan: 'Scale Plus', mrr: 799, ltv: 16200, status: 'Active', growth: '+8%' },
    { name: 'Linear App', plan: 'Scale Plus', mrr: 799, ltv: 14800, status: 'Active', growth: '+15%' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Revenue & Subscription Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            ARR velocity, MRR progression, expansion streams, customer LTV, and net revenue retention.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Revenue CSV
        </Button>
      </div>

      {/* 2. Top 10 Revenue KPI Cards (Part 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <MetricCard
          title="Total Recognized ARR"
          value={arr}
          type="currency"
          change="+32.0%"
          isPositive={true}
          supportingLabel="Annual run-rate"
        />
        <MetricCard
          title="Monthly Recurring (MRR)"
          value={mrr}
          type="currency"
          change="+18.4%"
          isPositive={true}
          supportingLabel="Active billed subscriptions"
        />
        <MetricCard
          title="New Revenue"
          value={newRevenue}
          type="currency"
          change="+24.0%"
          isPositive={true}
          supportingLabel="New logo acquisition"
        />
        <MetricCard
          title="Expansion Revenue"
          value={expansionRevenue}
          type="currency"
          change="+42.5%"
          isPositive={true}
          supportingLabel="Upsells & credit packs"
        />
        <MetricCard
          title="Net Revenue Retention"
          value="124.8%"
          change="+6.2%"
          isPositive={true}
          supportingLabel="Expansion > churn"
        />
        <MetricCard
          title="Recurring Revenue"
          value={recurringRevenue}
          type="currency"
          change="+19.2%"
          isPositive={true}
          supportingLabel="Predictable base"
        />
        <MetricCard
          title="Refunds & Credits"
          value={refunds}
          type="currency"
          change="-0.4%"
          isPositive={true}
          supportingLabel="< 0.7% refund rate"
        />
        <MetricCard
          title="Net Recognized Revenue"
          value={netRevenue}
          type="currency"
          change="+31.8%"
          isPositive={true}
          supportingLabel="Net after refunds"
        />
        <MetricCard
          title="Average ARPU"
          value={arpu}
          type="currency"
          change="+$48"
          isPositive={true}
          supportingLabel="Per active organization"
        />
        <MetricCard
          title="Quarterly Growth"
          value={`+${revenueGrowth}%`}
          change="+4.5%"
          isPositive={true}
          supportingLabel="QoQ velocity"
        />
      </div>

      {/* 3. Revenue Trend Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Revenue & MRR Progression Trend
            </h3>
            <p className="text-xs text-slate-500">
              Monthly recognized subscription ARR and expansion revenue streams.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#202020] text-xs font-mono">
            {(['MRR', 'ARR', 'Cumulative'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setRevenueTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  revenueTimeframe === t
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="h-48 w-full flex items-end gap-3 pt-4">
          {(revenueData || []).map((d) => {
            const mult = revenueTimeframe === 'ARR' ? 12 : revenueTimeframe === 'Cumulative' ? 1.5 : 1;
            const val = Math.round((d.revenue || 10000) * mult);
            const heightPct = Math.min(100, Math.round((val / (35000 * mult)) * 100));

            return (
              <div key={d.date} className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer">
                <div className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-emerald-500">
                  {formatCurrency(val, '$0', true)}
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600/70 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-200"
                  style={{ height: `${Math.max(15, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{d.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Revenue by Plan & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Revenue by Plan */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Revenue by Subscription Plan
            </h3>
            <Badge variant="blue" size="sm">3 Plans Active</Badge>
          </div>

          <div className="space-y-3 font-mono">
            {plansBreakdown.map((p) => (
              <div
                key={p.plan}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between font-sans">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{p.plan}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">+{p.growth}% YoY</span>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{formatNumber(p.customers)} Organizations</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(p.mrr)} / mo</span>
                </div>

                <div className="h-2 rounded-full bg-slate-200 dark:bg-[#181818] overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Revenue Customers */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Top Revenue Accounts (LTV)
            </h3>
            <Badge variant="emerald" size="sm">Enterprise Tier</Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {topCustomers.map((c) => (
              <div
                key={c.name}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold font-sans text-slate-900 dark:text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{c.plan}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(c.ltv)} LTV</div>
                  <div className="text-[10px] text-slate-400">{formatCurrency(c.mrr)} / mo ({c.growth})</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
