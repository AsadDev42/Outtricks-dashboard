import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Download, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  BarChart2,
  Users,
  Target,
  Coins
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

export const AnalyticsForecastView: React.FC = () => {
  const { forecastOpportunities, exportReport } = useAnalytics();
  const [forecastModel, setForecastModel] = useState<'Expected' | 'Best Case' | 'Conservative'>('Expected');

  // Forecasted Metrics
  const forecastMetrics = [
    { title: 'Projected Q4 ARR', current: '$184,000', projected: '$285,000', bestCase: '$340,000', worstCase: '$240,000', growth: '+54.8%' },
    { title: 'Projected Qualified Leads', current: '326 Leads', projected: '540 Leads', bestCase: '680 Leads', worstCase: '420 Leads', growth: '+65.6%' },
    { title: 'Projected Active Customers', current: '116 Orgs', projected: '185 Orgs', bestCase: '220 Orgs', worstCase: '150 Orgs', growth: '+59.4%' },
    { title: 'Projected Credit Usage', current: '21,350', projected: '38,500', bestCase: '44,000', worstCase: '32,000', growth: '+80.3%' },
  ];

  const projectionMonths = [
    { month: 'Sep 2026', current: 184000, expected: 210000, best: 230000, worst: 195000 },
    { month: 'Oct 2026', current: 184000, expected: 240000, best: 275000, worst: 215000 },
    { month: 'Nov 2026', current: 184000, expected: 265000, best: 310000, worst: 230000 },
    { month: 'Dec 2026', current: 184000, expected: 285000, best: 340000, worst: 240000 },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Revenue & Pipeline Forecast Models
            </h2>
            <Badge variant="emerald" size="sm">Predictive ML</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Historical conversion velocity projected forward using Monte Carlo simulation & linear pipeline weights.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Forecast CSV
        </Button>
      </div>

      {/* 2. Top Forecast KPI Cards (Part 8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastMetrics.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{f.title}</span>
              <Badge variant="emerald" size="sm">{f.growth}</Badge>
            </div>

            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
                {forecastModel === 'Expected' ? f.projected : forecastModel === 'Best Case' ? f.bestCase : f.worstCase}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                Forecasted {forecastModel} • Current: {f.current}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
              <div>Best: <strong className="text-emerald-500">{f.bestCase}</strong></div>
              <div>Worst: <strong className="text-rose-500">{f.worstCase}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Projection Trajectory Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Q4 Revenue Forecast Trajectory (Confidence Bands)
            </h3>
            <p className="text-xs text-slate-500">
              Clear visual distinction between actual closed baseline and future projected revenue bounds.
            </p>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#202020] text-xs font-mono">
            {(['Expected', 'Best Case', 'Conservative'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForecastModel(m)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  forecastModel === m
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Forecast Columns */}
        <div className="h-48 w-full flex items-end gap-6 pt-4">
          {projectionMonths.map((p) => {
            const targetVal = forecastModel === 'Expected' ? p.expected : forecastModel === 'Best Case' ? p.best : p.worst;
            const heightPct = Math.round((targetVal / 360000) * 100);

            return (
              <div key={p.month} className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer">
                <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform">
                  {formatCurrency(targetVal, '$0', true)}
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600/60 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-200 border-t-2 border-emerald-400"
                  style={{ height: `${Math.max(20, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{p.month}</span>
                <span className="text-[10px] font-mono text-emerald-500 uppercase">Forecasted</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Weighted Deal Pipeline Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Opportunity Forecast & Weighted Probability
            </h3>
            <p className="text-xs text-slate-500">
              High-value pipeline opportunities weighted by deal stage probability.
            </p>
          </div>
          <Badge variant="emerald" size="sm">{(forecastOpportunities || []).length} Major Deals</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[750px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Target Enterprise</th>
                <th className="pb-3">Deal Size</th>
                <th className="pb-3">Current CRM Stage</th>
                <th className="pb-3">Probability</th>
                <th className="pb-3">Weighted Value</th>
                <th className="pb-3">Estimated Close</th>
                <th className="pb-3">Deal Owner</th>
                <th className="pb-3">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {(forecastOpportunities || []).map((fc) => {
                const rawSize = Number((fc.dealSize || '0').replace(/[\$,]/g, ''));
                const weighted = Math.round(rawSize * ((fc.probability || 50) / 100));

                return (
                  <tr key={fc.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                    <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{fc.company}</td>
                    <td className="py-3.5 text-slate-900 dark:text-white font-bold">{fc.dealSize}</td>
                    <td className="py-3.5 text-slate-500 font-sans">{fc.stage}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                        {fc.probability}%
                      </span>
                    </td>
                    <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(weighted)}</td>
                    <td className="py-3.5 text-slate-500">{fc.closeDate}</td>
                    <td className="py-3.5 text-slate-700 dark:text-slate-300 font-sans">{fc.owner}</td>
                    <td className="py-3.5">
                      <Badge variant={fc.category === 'Commit' ? 'emerald' : fc.category === 'Best Case' ? 'emerald' : 'amber'} size="sm">
                        {fc.category}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
