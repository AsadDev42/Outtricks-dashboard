import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Plus, 
  PhoneCall, 
  Mail, 
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Sparkles,
  Calendar,
  Download,
  Filter,
  CheckSquare,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GsapStagger } from '../ui/GsapStagger';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate 
} from '../../utils/formatters';

interface CrmOverviewDashboardProps {
  onOpenDealDetail: (deal: CrmDeal) => void;
  onOpenCreateDealModal: () => void;
}

export const CrmOverviewDashboard: React.FC<CrmOverviewDashboardProps> = ({
  onOpenDealDetail,
  onOpenCreateDealModal
}) => {
  const { deals, companies, contacts, signals, tasks, activities, setActiveTab } = useCrm();

  const [dateRange, setDateRange] = useState<'7D' | '30D' | '90D' | 'YTD' | '12M'>('30D');
  const [chartMetric, setChartMetric] = useState<'pipeline' | 'deals' | 'won' | 'conversion'>('pipeline');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Safe KPI calculations
  const totalContactsCount = contacts.length || 24850;
  const totalLeadsCount = 1240;
  const activeDealsCount = deals.length || 118;
  const totalPipelineVal = deals.reduce((acc, d) => acc + (d.value || 0), 0) || 485000;
  const wonDeals = deals.filter(d => d.stageId === 'stage_won');
  const wonDealsVal = wonDeals.reduce((acc, d) => acc + (d.value || 0), 0) || 184000;
  const conversionRate = 28.4;
  const tasksDueCount = tasks.filter(t => !t.completed).length || 14;
  const totalActivitiesCount = activities.length || 326;

  // 8 Main KPI Cards (Section 2) with Clickable Module Navigation
  const kpiCards = [
    { title: 'Total Contacts', value: formatNumber(totalContactsCount), change: '+12.5%', isPos: true, period: 'vs last month', sparkline: [18, 22, 24, 25, 28, 32, 36, 40], tab: 'contacts' as const },
    { title: 'Total Leads', value: formatNumber(totalLeadsCount), change: '+18.5%', isPos: true, period: 'vs last month', sparkline: [12, 16, 20, 24, 28, 30, 34, 38], tab: 'contacts' as const },
    { title: 'Active Deals', value: formatNumber(activeDealsCount), change: '+14.2%', isPos: true, period: 'vs last month', sparkline: [10, 14, 18, 22, 26, 28, 32, 36], tab: 'pipeline' as const },
    { title: 'Pipeline Value', value: formatCurrency(totalPipelineVal), change: '+24.2%', isPos: true, period: 'vs last month', sparkline: [20, 30, 45, 60, 80, 100, 120, 140], tab: 'pipeline' as const },
    { title: 'Won Revenue', value: formatCurrency(wonDealsVal), change: '+32.0%', isPos: true, period: 'vs last month', sparkline: [12, 18, 24, 35, 48, 62, 78, 95], tab: 'pipeline' as const },
    { title: 'Conversion Rate', value: `${conversionRate}%`, change: '+4.1%', isPos: true, period: 'vs last month', sparkline: [22, 23, 24, 25, 26, 27, 28, 28.4], tab: 'deals' as const },
    { title: 'Tasks Due', value: formatNumber(tasksDueCount), change: 'Due Today', isPos: true, period: 'Active queue', sparkline: [6, 8, 12, 10, 14, 16, 12, 14], tab: 'tasks' as const },
    { title: 'Sales Activities', value: formatNumber(totalActivitiesCount), change: '+16.8%', isPos: true, period: 'vs last month', sparkline: [140, 180, 210, 250, 280, 300, 326], tab: 'activities' as const },
  ];

  // Pipeline Performance Monthly Time Series (Section 3)
  const monthlyPerformance = [
    { month: 'Jan', pipeline: 280000, deals: 42, won: 95000, conversion: 24.0 },
    { month: 'Feb', pipeline: 320000, deals: 54, won: 112000, conversion: 25.2 },
    { month: 'Mar', pipeline: 365000, deals: 68, won: 130000, conversion: 26.0 },
    { month: 'Apr', pipeline: 395000, deals: 78, won: 145000, conversion: 26.8 },
    { month: 'May', pipeline: 440000, deals: 92, won: 162000, conversion: 27.5 },
    { month: 'Jun', pipeline: 485000, deals: 118, won: 184000, conversion: 28.4 },
  ];

  const maxChartVal = Math.max(...monthlyPerformance.map(m => m[chartMetric]), 100);
  const activeHover = monthlyPerformance.find(m => m.month === hoveredMonth) || monthlyPerformance[monthlyPerformance.length - 1];

  // 6-Stage Conversion Funnel (Section 15)
  const conversionFunnel = [
    { stage: 'Leads Ingested', count: 1240, pass: '100%', drop: '0%' },
    { stage: 'ICP Qualified', count: 482, pass: '38.8%', drop: '61.2%' },
    { stage: 'Contacted', count: 326, pass: '67.6%', drop: '32.4%' },
    { stage: 'Demo / Meeting', count: 118, pass: '36.2%', drop: '63.8%' },
    { stage: 'Proposal / SLA', count: 68, pass: '57.6%', drop: '42.4%' },
    { stage: 'Closed Won ARR', count: 42, pass: '61.7%', drop: '38.3%' },
  ];

  // Recent Activity Stream (Section 16)
  const recentActivities = [
    { id: 'act-1', user: 'Sarah Jenkins', action: 'completed discovery demo with', target: 'Stripe Inc.', time: '10:42 AM', type: 'meeting' },
    { id: 'act-2', user: 'David Zhao', action: 'moved deal to Proposal stage for', target: 'Databricks', time: '9:15 AM', type: 'deal' },
    { id: 'act-3', user: 'Alex Rivera', action: 'sent contract review sequence to', target: 'Ramp Financial', time: 'Yesterday', type: 'email' },
    { id: 'act-4', user: 'Elena Rostova', action: 'logged Voice SDR qualification call with', target: 'Retool', time: 'Yesterday', type: 'call' },
  ];

  // Upcoming Tasks (Section 17)
  const upcomingTasks = [
    { id: 'tsk-1', title: 'Send revised enterprise SLA to Stripe CFO', target: 'Stripe Inc.', due: 'Today, 2:00 PM', priority: 'Urgent', owner: 'Sarah Jenkins' },
    { id: 'tsk-2', title: 'Schedule security architecture review call', target: 'Databricks', due: 'Today, 4:30 PM', priority: 'High', owner: 'David Zhao' },
    { id: 'tsk-3', title: 'Follow-up on product pilot feedback', target: 'Ramp Financial', due: 'Tomorrow', priority: 'Medium', owner: 'Alex Rivera' },
    { id: 'tsk-4', title: 'Prepare custom contract pricing matrix', target: 'Retool', due: 'This Week', priority: 'Low', owner: 'Elena Rostova' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            CRM Overview & Sales Activity
          </h2>
          <p className="text-xs text-slate-500">
            Track your contacts, target companies, open deals, and multi-touch pipeline activity.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#181818] border border-slate-200/80 dark:border-[#222222] text-xs font-mono">
            {(['7D', '30D', '90D', 'YTD', '12M'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  dateRange === r
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveTab('pipeline')}
            leftIcon={<Layers className="w-3.5 h-3.5" />}
          >
            Pipeline View
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateDealModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Deal
          </Button>
        </div>
      </div>

      {/* 2. 8 Clickable KPI Metric Cards */}
      <GsapStagger className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5" stagger={0.04} duration={0.4}>
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(kpi.tab)}
            className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs space-y-3 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 group-hover:text-emerald-500 font-mono font-bold uppercase tracking-wider transition-colors">
                {kpi.title}
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{kpi.change}</span>
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 dark:text-white font-sans tracking-tight group-hover:text-emerald-400 transition-colors">
                {kpi.value}
              </div>
              <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>{kpi.period}</span>
                <span className="text-[10px] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Micro Sparkline */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#202020]">
              <div className="h-5 w-full flex items-end gap-1">
                {kpi.sparkline.map((val, i) => {
                  const maxS = Math.max(...kpi.sparkline, 1);
                  const hPct = Math.round((val / maxS) * 100);
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-xs bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"
                      style={{ height: `${Math.max(20, hPct)}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </GsapStagger>

      {/* 3. Pipeline Performance Card (Section 3 - Large Interactive Area) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white">
                Pipeline Performance & Revenue Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Monthly pipeline progression, won deals ARR, and stage conversion trajectory.
            </p>
          </div>

          {/* Metric Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono">
            {[
              { id: 'pipeline', label: 'Pipeline Value' },
              { id: 'deals', label: 'Deals Created' },
              { id: 'won', label: 'Won Revenue' },
              { id: 'conversion', label: 'Conversion %' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setChartMetric(m.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  chartMetric === m.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Indicator */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Selected Month:</span>
            <strong className="text-slate-900 dark:text-white">{activeHover.month} 2026</strong>
          </div>
          <div className="flex items-center gap-4">
            <div>Pipeline: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(activeHover.pipeline)}</strong></div>
            <div>Deals: <strong className="text-slate-900 dark:text-white">{formatNumber(activeHover.deals)}</strong></div>
            <div>Won ARR: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(activeHover.won)}</strong></div>
            <div>Win Rate: <strong className="text-amber-500">{formatPercentage(activeHover.conversion)}</strong></div>
          </div>
        </div>

        {/* Interactive Chart Graphic */}
        <div className="h-52 w-full flex items-end gap-6 pt-4">
          {monthlyPerformance.map((m) => {
            const val = m[chartMetric];
            const heightPct = Math.round((val / maxChartVal) * 100);
            const isHovered = hoveredMonth === m.month;

            return (
              <div
                key={m.month}
                onMouseEnter={() => setHoveredMonth(m.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
              >
                <div className={`text-[10px] font-mono font-bold mb-1 transition-all ${
                  isHovered ? 'text-emerald-600 dark:text-emerald-400 scale-110' : 'text-slate-500'
                }`}>
                  {chartMetric === 'pipeline' || chartMetric === 'won' ? formatCurrency(val, '$0', true) : formatNumber(val)}
                </div>
                <div
                  className={`w-full rounded-t-xl transition-all duration-200 ${
                    isHovered
                      ? 'bg-emerald-600 shadow-md shadow-emerald-500/30'
                      : 'bg-gradient-to-t from-emerald-600/70 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400'
                  }`}
                  style={{ height: `${Math.max(18, heightPct)}%` }}
                />
                <span className="text-xs font-mono text-slate-500 mt-2 font-semibold">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 6-Stage CRM Conversion Funnel (Section 15) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              6-Stage Sales Conversion Funnel
            </h3>
            <p className="text-xs text-slate-500">
              Stage progression efficiency, pass rates, and drop-off analysis from lead ingestion to closed won ARR.
            </p>
          </div>
          <Badge variant="primary" size="sm">6 Funnel Stages</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {conversionFunnel.map((f, i) => (
            <div
              key={f.stage}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Stage 0{i + 1}</span>
                <div className="font-extrabold text-slate-900 dark:text-white">{f.stage}</div>
              </div>

              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {formatNumber(f.count)}
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A] text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {f.pass} Pass ({f.drop} Drop)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Activity Stream & Upcoming Tasks Grid (Sections 16 & 17) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Recent Activity Stream (Section 16) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Recent Sales Activity
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('activities')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 font-mono">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-sans">
                    {act.user.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white font-sans">
                      {act.user} <span className="font-normal text-slate-500">{act.action}</span> <strong className="text-emerald-600 dark:text-emerald-400">{act.target}</strong>
                    </div>
                    <div className="text-[10px] text-slate-400">{act.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks (Section 17) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Upcoming Tasks & Follow-ups
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {upcomingTasks.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">{t.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {t.target} • <strong className="text-emerald-600 dark:text-emerald-400">{t.due}</strong> ({t.owner})
                  </div>
                </div>

                <Badge variant={t.priority === 'Urgent' ? 'rose' : t.priority === 'High' ? 'amber' : 'primary'} size="sm">
                  {t.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. Quick Actions Bar (Section 18) */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span>Quick CRM Actions:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab('contacts')}>
            Add Contact
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('companies')}>
            Add Company
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenCreateDealModal}>
            Create Deal
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('tasks')}>
            Create Task
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('activities')}>
            Log Call / Email
          </Button>
        </div>
      </div>

    </div>
  );
};
