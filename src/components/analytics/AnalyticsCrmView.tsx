import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Download, 
  Layers, 
  Users, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  MapPin, 
  Clock,
  Sparkles,
  PieChart
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

export const AnalyticsCrmView: React.FC = () => {
  const { exportReport } = useAnalytics();
  const [funnelStageHover, setFunnelStageHover] = useState<string | null>(null);

  // CRM KPIs (Part 9)
  const totalLeads = 1240;
  const newLeads = 326;
  const qualifiedLeads = 482;
  const opportunities = 118;
  const dealsWon = 42;
  const dealsLost = 14;
  const pipelineValue = 485000;
  const winRate = 38.5;
  const avgDealSize = 4400;
  const avgSalesCycleDays = 21;

  // 5-Stage CRM Funnel (Part 9)
  const crmFunnel = [
    { stage: 'Lead Discovery', count: 1240, val: '$1.4M', conv: '100%', drop: '0%' },
    { stage: 'ICP Qualified', count: 482, val: '$890K', conv: '38.8%', drop: '61.2%' },
    { stage: 'CRM Opportunity', count: 118, val: '$485K', conv: '24.4%', drop: '75.6%' },
    { stage: 'Proposal Sent', count: 68, val: '$290K', conv: '57.6%', drop: '42.4%' },
    { stage: 'Closed Won ARR', count: 42, val: '$184K', conv: '61.7%', drop: '38.3%' },
  ];

  // Top Sources & Industries
  const topSources = [
    { source: 'Cold Email Outreach', leads: 540, deals: 18, rev: '$78,000' },
    { source: 'Voice AI SDR Inbound/Outbound', leads: 320, deals: 14, rev: '$62,000' },
    { source: 'LinkedIn Safe Automations', leads: 240, deals: 7, rev: '$31,000' },
    { source: 'Upwork Studio High-Ticket', leads: 140, deals: 3, rev: '$13,000' },
  ];

  const topIndustries = [
    { industry: 'Fintech & Payments', share: '38%', deals: 16, rev: '$72,000' },
    { industry: 'AI & Developer SaaS', share: '32%', deals: 14, rev: '$64,000' },
    { industry: 'HealthTech Enterprise', share: '18%', deals: 8, rev: '$34,000' },
    { industry: 'E-commerce & Logistics', share: '12%', deals: 4, rev: '$14,000' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Deals CRM & Pipeline Velocity Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Pipeline stage progression, sales cycle velocity, win rate analysis, and deal attribution.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export CRM CSV
        </Button>
      </div>

      {/* 2. Top 10 CRM KPI Cards (Part 9) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <MetricCard
          title="Active Pipeline"
          value={pipelineValue}
          type="currency"
          change="+24.2%"
          isPositive={true}
          supportingLabel="118 Open deals"
        />
        <MetricCard
          title="Total Leads"
          value={totalLeads}
          type="number"
          change="+18.5%"
          isPositive={true}
          supportingLabel="All CRM contacts"
        />
        <MetricCard
          title="Qualified (BANT)"
          value={qualifiedLeads}
          type="number"
          change="+28.0%"
          isPositive={true}
          supportingLabel="Ready for demo"
        />
        <MetricCard
          title="Opportunities"
          value={opportunities}
          type="number"
          change="+14.2%"
          isPositive={true}
          supportingLabel="Active negotiations"
        />
        <MetricCard
          title="Deals Won"
          value={dealsWon}
          type="number"
          change="+32.0%"
          isPositive={true}
          supportingLabel="Closed revenue"
        />
        <MetricCard
          title="Win Rate %"
          value={`${winRate}%`}
          change="+4.2%"
          isPositive={true}
          supportingLabel="Opportunity to won"
        />
        <MetricCard
          title="Average Deal Size"
          value={avgDealSize}
          type="currency"
          change="+$350"
          isPositive={true}
          supportingLabel="ARR per closed deal"
        />
        <MetricCard
          title="Sales Cycle"
          value={`${avgSalesCycleDays} Days`}
          change="-4 Days"
          isPositive={true}
          supportingLabel="First touch to close"
        />
        <MetricCard
          title="New Leads Added"
          value={newLeads}
          type="number"
          change="+21.4%"
          isPositive={true}
          supportingLabel="This period"
        />
        <MetricCard
          title="Deals Lost"
          value={dealsLost}
          type="number"
          change="-2"
          isPositive={true}
          supportingLabel="11.8% Lost rate"
        />
      </div>

      {/* 3. 5-Stage CRM Conversion Funnel (Part 9) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              CRM Conversion Funnel (Lead → Won)
            </h3>
            <p className="text-xs text-slate-500">
              Progression from discovery through qualification, opportunity, proposal, and closed ARR.
            </p>
          </div>
          <Badge variant="emerald" size="sm">5 Core Stages</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {crmFunnel.map((stg, i) => (
            <div
              key={stg.stage}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Stage 0{i + 1}</span>
                <div className="font-extrabold text-slate-900 dark:text-white">{stg.stage}</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{formatNumber(stg.count)}</div>
                <div className="text-xs text-slate-500 font-mono">{stg.val} Volume</div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A] text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {stg.conv} Pass Rate
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Top Sources & Industries Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Top Lead Sources */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">Top Lead Sources</h3>
            <Badge variant="blue" size="sm">Multi-Channel</Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {topSources.map((s) => (
              <div
                key={s.source}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold font-sans text-slate-900 dark:text-white">{s.source}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{formatNumber(s.leads)} leads • {s.deals} deals closed</div>
                </div>
                <strong className="text-emerald-600 dark:text-emerald-400">{s.rev}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Top Industries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">Top Target Industries</h3>
            <Badge variant="purple" size="sm">B2B Verticals</Badge>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {topIndustries.map((ind) => (
              <div
                key={ind.industry}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold font-sans text-slate-900 dark:text-white">{ind.industry}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{ind.share} of total pipeline • {ind.deals} won</div>
                </div>
                <strong className="text-emerald-600 dark:text-emerald-400">{ind.rev}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
