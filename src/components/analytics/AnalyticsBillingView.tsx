import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Receipt,
  FileText,
  Building2,
  Users,
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
  formatDate 
} from '../../utils/formatters';

export const AnalyticsBillingView: React.FC = () => {
  const { invoices, exportReport } = useAnalytics();

  // Billing KPIs (Part 13)
  const activeSubscriptions = 116;
  const trialAccounts = 24;
  const upgradesThisPeriod = 14;
  const downgradesThisPeriod = 2;
  const cancellations = 1;
  const pastDueAccounts = 0;
  const currentMrr = 15330;
  const currentArr = 184000;
  const refundAmount = 1200;

  // Customer billing records (Part 13)
  const customerBilling = [
    { customer: 'Stripe Inc.', plan: 'Enterprise Custom', mrr: 2400, status: 'Active', renewal: '2026-09-01', ltv: 48000 },
    { customer: 'Databricks', plan: 'Enterprise Custom', mrr: 2400, status: 'Active', renewal: '2026-09-15', ltv: 42000 },
    { customer: 'Ramp Financial', plan: 'Scale Plus', mrr: 799, status: 'Active', renewal: '2026-09-10', ltv: 18400 },
    { customer: 'Retool', plan: 'Scale Plus', mrr: 799, status: 'Active', renewal: '2026-09-22', ltv: 16200 },
    { customer: 'Linear App', plan: 'Scale Plus', mrr: 799, status: 'Active', renewal: '2026-09-05', ltv: 14800 },
    { customer: 'Vercel Partner Team', plan: 'Growth Tier', mrr: 399, status: 'Active', renewal: '2026-09-18', ltv: 8200 },
  ];

  // Subscription Growth
  const subGrowth = [
    { month: 'Apr', subs: 74, mrr: 9800 },
    { month: 'May', subs: 86, mrr: 11400 },
    { month: 'Jun', subs: 98, mrr: 12900 },
    { month: 'Jul', subs: 108, mrr: 14200 },
    { month: 'Aug', subs: 116, mrr: 15330 },
  ];

  const maxMrr = Math.max(...subGrowth.map(s => s.mrr), 1000);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Billing, Subscriptions & Ledger Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Subscription lifecycle management, upgrade momentum, churn health, and customer lifetime value.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Billing CSV
        </Button>
      </div>

      {/* 2. Top Billing KPIs (Part 13) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Active Subscriptions"
          value={activeSubscriptions}
          type="number"
          change="+12.5%"
          isPositive={true}
          supportingLabel="116 Paid workspaces"
        />
        <MetricCard
          title="Monthly Recurring"
          value={currentMrr}
          type="currency"
          change="+18.4%"
          isPositive={true}
          supportingLabel="$184K recognized ARR"
        />
        <MetricCard
          title="Trial Accounts"
          value={trialAccounts}
          type="number"
          change="+8 This week"
          isPositive={true}
          supportingLabel="High conversion intent"
        />
        <MetricCard
          title="Plan Upgrades"
          value={upgradesThisPeriod}
          type="number"
          change="+4 vs last period"
          isPositive={true}
          supportingLabel="Expansion velocity"
        />
        <MetricCard
          title="Cancellations"
          value={cancellations}
          type="number"
          change="< 0.9% Churn"
          isPositive={true}
          supportingLabel="High retention cohort"
        />
        <MetricCard
          title="Past Due Accounts"
          value={pastDueAccounts}
          type="number"
          change="0% Delinquency"
          isPositive={true}
          supportingLabel="Clean billing health"
        />
      </div>

      {/* 3. Subscription & MRR Growth Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Subscription MRR Growth Progression
            </h3>
            <p className="text-xs text-slate-500">
              Month-over-month MRR expansion from new logos and tier upgrades.
            </p>
          </div>
          <Badge variant="emerald" size="sm">+56.4% 5-Month Growth</Badge>
        </div>

        <div className="h-48 w-full flex items-end gap-6 pt-4">
          {subGrowth.map((s) => {
            const heightPct = Math.round((s.mrr / maxMrr) * 100);

            return (
              <div key={s.month} className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer">
                <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-emerald-500">
                  {formatCurrency(s.mrr)}
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600/70 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-200"
                  style={{ height: `${Math.max(20, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{s.month} ({s.subs} subs)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Billing & LTV Table (Part 13) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Customer Subscription & Lifetime Value (LTV) Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Active subscriptions, monthly commitment, renewal dates, and cumulative value.
            </p>
          </div>
          <Badge variant="emerald" size="sm">{customerBilling.length} Key Accounts</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[650px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Organization</th>
                <th className="pb-3">Subscribed Plan</th>
                <th className="pb-3">Monthly Commitment</th>
                <th className="pb-3">Billing Status</th>
                <th className="pb-3">Next Renewal</th>
                <th className="pb-3">Cumulative LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {customerBilling.map((cb) => (
                <tr key={cb.customer} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{cb.customer}</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{cb.plan}</Badge>
                  </td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatCurrency(cb.mrr)} / mo</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{cb.status}</Badge>
                  </td>
                  <td className="py-3.5 text-slate-500">{cb.renewal}</td>
                  <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(cb.ltv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
