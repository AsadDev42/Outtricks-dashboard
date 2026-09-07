import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar, 
  ArrowRight, 
  ArrowUpRight,
  Download, 
  Search, 
  Filter, 
  Layers, 
  BarChart2, 
  CheckCircle2, 
  Eye, 
  SlidersHorizontal,
  X,
  Mail,
  Linkedin,
  PhoneCall,
  Sparkles,
  Trophy,
  AlertCircle,
  Activity,
  ShieldCheck,
  Target,
  Cpu,
  Clock,
  ChevronRight,
  PieChart,
  Repeat,
  Briefcase
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics, CampaignAnalyticsRecord } from '../../context/AnalyticsContext';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage 
} from '../../utils/formatters';

type ChartMetricKey = 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'converted';
type AttributionModel = 'w_shaped' | 'linear' | 'first_touch' | 'time_decay';
type SortField = 'revenue' | 'pipeline' | 'conversionRate' | 'meetings' | 'leads' | 'roi' | 'actions';

export const AnalyticsCampaignsView: React.FC = () => {
  const { campaigns, channelPerformance, conversionFunnel, exportReport } = useAnalytics();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignAnalyticsRecord | null>(null);
  const [chartMetric, setChartMetric] = useState<ChartMetricKey>('replied');
  const [attributionModel, setAttributionModel] = useState<AttributionModel>('w_shaped');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const safeCampaigns = campaigns || [];

  // Filter and Sort Campaigns
  const filteredCampaigns = useMemo(() => {
    let result = safeCampaigns.filter(c => {
      const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (c.targetIcp || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (c.audience || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesChannel = selectedChannel === 'All' || 
                             (c.channel || '').toLowerCase().includes(selectedChannel.toLowerCase()) || 
                             (c.module || '').toLowerCase().includes(selectedChannel.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
      return matchesSearch && matchesChannel && matchesStatus;
    });

    result.sort((a, b) => {
      let aVal: number = 0;
      let bVal: number = 0;

      if (sortField === 'revenue') {
        aVal = a.revenue || 0;
        bVal = b.revenue || 0;
      } else if (sortField === 'pipeline') {
        aVal = a.pipeline || 0;
        bVal = b.pipeline || 0;
      } else if (sortField === 'conversionRate') {
        aVal = a.conversionRate || 0;
        bVal = b.conversionRate || 0;
      } else if (sortField === 'meetings') {
        aVal = a.meetings || 0;
        bVal = b.meetings || 0;
      } else if (sortField === 'leads') {
        aVal = a.qualifiedLeads || a.leads || 0;
        bVal = b.qualifiedLeads || b.leads || 0;
      } else if (sortField === 'actions') {
        aVal = a.actions || 0;
        bVal = b.actions || 0;
      } else if (sortField === 'roi') {
        aVal = parseFloat((a.roi || '0').replace(/[^0-9.]/g, '')) || 0;
        bVal = parseFloat((b.roi || '0').replace(/[^0-9.]/g, '')) || 0;
      }

      return sortAsc ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [safeCampaigns, searchQuery, selectedChannel, selectedStatus, sortField, sortAsc]);

  // Aggregate Metrics
  const totalCampaigns = safeCampaigns.length;
  const activeCampaigns = safeCampaigns.filter(c => c.status === 'Active' || c.status === 'Top Performing').length;
  const totalLeads = safeCampaigns.reduce((acc, c) => acc + (c.qualifiedLeads || c.leads || 0), 0);
  const totalReplies = safeCampaigns.reduce((acc, c) => acc + (c.replies || 0), 0);
  const totalMeetings = safeCampaigns.reduce((acc, c) => acc + (c.meetings || 0), 0);
  const totalPipeline = safeCampaigns.reduce((acc, c) => acc + (c.pipeline || 0), 0);
  const totalRevenue = safeCampaigns.reduce((acc, c) => acc + (c.revenue || 0), 0);
  const totalActions = safeCampaigns.reduce((acc, c) => acc + (c.actions || 0), 0);
  const avgConversion = safeCampaigns.length > 0 
    ? +(safeCampaigns.reduce((acc, c) => acc + (c.conversionRate || 0), 0) / safeCampaigns.length).toFixed(1)
    : 28.4;

  // Time-Series Telemetry Data for Chart Visualizer
  const timeSeriesData = useMemo(() => [
    { label: 'Week 1', date: 'Aug 01 - Aug 07', sent: 4200, delivered: 4180, opened: 2890, clicked: 1120, replied: 340, converted: 92, prevReplied: 260 },
    { label: 'Week 2', date: 'Aug 08 - Aug 14', sent: 5800, delivered: 5760, opened: 3940, clicked: 1580, replied: 460, converted: 124, prevReplied: 380 },
    { label: 'Week 3', date: 'Aug 15 - Aug 21', sent: 7400, delivered: 7350, opened: 5120, clicked: 2180, replied: 620, converted: 168, prevReplied: 510 },
    { label: 'Week 4', date: 'Aug 22 - Aug 28', sent: 9600, delivered: 9540, opened: 6840, clicked: 2940, replied: 840, converted: 226, prevReplied: 690 },
    { label: 'Current', date: 'Aug 29 - Sep 04', sent: 11200, delivered: 11140, opened: 8120, clicked: 3520, replied: 1040, converted: 284, prevReplied: 820 },
  ], []);

  const chartMetricConfigs: Record<ChartMetricKey, { label: string; color: string; desc: string }> = {
    sent: { label: 'Dispatched', color: '#64748B', desc: 'Total outbound communications sent across all channels' },
    delivered: { label: 'Delivered', color: '#10B981', desc: 'Confirmed inbox & gateway deliveries (99.4% SLA)' },
    opened: { label: 'Opened', color: '#34D399', desc: 'Verified unique opens and social profile views' },
    clicked: { label: 'Clicked', color: '#6EE7B7', desc: 'Link engagements, demo deck views, and resource taps' },
    replied: { label: 'Replies & Touches', color: '#10B981', desc: 'High-intent prospect responses and inbound replies' },
    converted: { label: 'Converted Demos', color: '#059669', desc: 'Booked discovery calls, demos, and opportunities' },
  };

  // SVG Chart Geometry Calculations
  const chartWidth = 700;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const currentValues = timeSeriesData.map(d => d[chartMetric]);
  const prevValues = timeSeriesData.map(d => Math.round(d[chartMetric] * 0.82));
  const maxChartVal = Math.max(...currentValues, ...prevValues, 10);
  const minChartVal = 0;

  const getCoordinates = (values: number[]) => {
    return values.map((val, idx) => {
      const x = paddingX + (idx / (values.length - 1)) * (chartWidth - paddingX * 2);
      const y = chartHeight - paddingY - ((val - minChartVal) / (maxChartVal - minChartVal)) * (chartHeight - paddingY * 2);
      return { x, y, val };
    });
  };

  const currentPoints = getCoordinates(currentValues);
  const prevPoints = getCoordinates(prevValues);

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(currentPoints);
  const areaPath = currentPoints.length > 0
    ? `${linePath} L ${currentPoints[currentPoints.length - 1].x} ${chartHeight - paddingY} L ${currentPoints[0].x} ${chartHeight - paddingY} Z`
    : '';
  const prevLinePath = createSmoothPath(prevPoints);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const channelWeights = [
    { channel: 'Cold Email', weight: 42, icon: Mail, revenue: '$148,000', conv: '32.4%' },
    { channel: 'LinkedIn Safe', weight: 28, icon: Linkedin, revenue: '$98,000', conv: '24.1%' },
    { channel: 'Voice AI SDR', weight: 21, icon: PhoneCall, revenue: '$74,000', conv: '38.2%' },
    { channel: 'Upwork Studio', weight: 9, icon: Briefcase, revenue: '$38,400', conv: '42.0%' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. WORKSPACE CONTROL & ATTRIBUTION CONTEXT HEADER */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Campaign Intelligence & Revenue Attribution
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-Time Pipeline Sync
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Multi-touch conversion velocity, channel attribution weights, and granular unit economics across your active fleet.
          </p>
        </div>

        {/* Action Controls & Attribution Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Model:</span>
            <select
              value={attributionModel}
              onChange={(e) => setAttributionModel(e.target.value as AttributionModel)}
              className="bg-transparent text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="w_shaped" className="dark:bg-[#1C1C1C]">W-Shaped (40/40/20)</option>
              <option value="linear" className="dark:bg-[#1C1C1C]">Linear (Equal Weight)</option>
              <option value="first_touch" className="dark:bg-[#1C1C1C]">First-Touch (Sourcing)</option>
              <option value="time_decay" className="dark:bg-[#1C1C1C]">Time-Decay (Exponential)</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => exportReport('CSV')}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Attribution CSV
          </Button>
        </div>
      </div>

      {/* 2. HIERARCHICAL SCORECARD (HERO ATTRIBUTED ARR + 5 STRUCTURED METRICS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Primary Hero Anchor Card (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#141414] to-[#161616] border border-emerald-500/30 dark:border-emerald-500/25 shadow-lg shadow-emerald-950/10 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Primary Performance Anchor</span>
              </div>
              <Badge variant="emerald" size="sm">
                +32.0% vs Prev
              </Badge>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-medium">Total Attributed Closed ARR</div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mt-0.5">
                {formatCurrency(totalRevenue || 184000)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-slate-400 text-[10px]">Closed Accounts</div>
                <div className="font-bold text-white text-sm mt-0.5">42 Enterprise</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="text-slate-400 text-[10px]">Attribution Velocity</div>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">$6.1K / Day</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 relative z-10 font-mono">
            <span>Model: W-Shaped 30-Day</span>
            <span className="text-emerald-400 font-bold">99.8% Confidence SLA</span>
          </div>
        </div>

        {/* Secondary KPI Grid (8 cols on lg: 5 tiles across 2 rows) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Tile 1: Total Pipeline */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>Pipeline Influenced</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">+24.2%</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">
              {formatCurrency(totalPipeline || 485000, '$0', true)}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              Active CRM opportunity stages
            </div>
          </div>

          {/* Tile 2: Qualified Leads */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>ICP Qualified Leads</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">+21.4%</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">
              {formatNumber(totalLeads || 326)}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              BANT matched contacts
            </div>
          </div>

          {/* Tile 3: Direct Inbound Replies */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>Direct Replies & Touches</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">+18.2%</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">
              {formatNumber(totalReplies || 840)}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              From {formatCompactNumber(totalActions || 32480)} actions
            </div>
          </div>

          {/* Tile 4: Meetings & Demos */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>Executive Demos</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">+14.5%</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">
              {formatNumber(totalMeetings || 84)} Demos
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              {avgConversion}% meeting conversion
            </div>
          </div>

          {/* Tile 5: Active Fleet Status */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>Active Fleet Capacity</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">Optimal</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">
              {activeCampaigns} / {totalCampaigns} Active
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              Across 4 outreach channels
            </div>
          </div>

          {/* Tile 6: Blended Outbound ROI */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>Blended Outbound ROI</span>
              <span className="text-emerald-500 font-mono font-bold text-[11px]">Top: 31.1x</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-500 mt-2">
              20.4x Multiple
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
              CAC: $38 per qualified demo
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE MULTI-METRIC TIME-SERIES VISUALIZER */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Campaign Trajectory & Conversion Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {chartMetricConfigs[chartMetric].desc}
            </p>
          </div>

          {/* Multi-metric toggle pills */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono overflow-x-auto">
            {(Object.keys(chartMetricConfigs) as ChartMetricKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setChartMetric(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  chartMetric === key
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {chartMetricConfigs[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Time-Series Chart */}
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-56 sm:h-64 overflow-visible"
          >
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
              const y = chartHeight - paddingY - pct * (chartHeight - paddingY * 2);
              const val = Math.round(minChartVal + pct * (maxChartVal - minChartVal));
              return (
                <g key={pct}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-white/[0.06]"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] font-mono fill-slate-400"
                  >
                    {formatCompactNumber(val)}
                  </text>
                </g>
              );
            })}

            {/* Previous Period Baseline (Dashed) */}
            <path
              d={prevLinePath}
              fill="none"
              stroke="#64748B"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* Current Period Area Fill */}
            <path d={areaPath} fill="url(#emeraldGrad)" />

            {/* Current Period Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Interactive Data Points & Hover Crosshairs */}
            {currentPoints.map((pt, idx) => {
              const isHovered = hoveredPointIndex === idx;
              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  {/* Vertical Hover Guide */}
                  {isHovered && (
                    <line
                      x1={pt.x}
                      y1={paddingY}
                      x2={pt.x}
                      y2={chartHeight - paddingY}
                      stroke="#10B981"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.8"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 4}
                    fill="#10B981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />

                  {/* X-axis label */}
                  <text
                    x={pt.x}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    className="text-[10px] font-mono font-bold fill-slate-500 dark:fill-slate-400"
                  >
                    {timeSeriesData[idx].label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredPointIndex !== null && (
            <div
              className="absolute pointer-events-none p-3 rounded-xl bg-slate-900/95 dark:bg-[#1C1C1C]/95 border border-slate-700 dark:border-[#2A2A2A] shadow-xl text-white text-xs font-mono z-20 space-y-1"
              style={{
                left: `${(currentPoints[hoveredPointIndex].x / chartWidth) * 100}%`,
                top: '20px',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="text-[10px] text-slate-400">
                {timeSeriesData[hoveredPointIndex].date}
              </div>
              <div className="font-bold text-emerald-400 text-sm">
                {formatNumber(timeSeriesData[hoveredPointIndex][chartMetric])} {chartMetricConfigs[chartMetric].label}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between gap-3">
                <span>Baseline: {formatNumber(Math.round(timeSeriesData[hoveredPointIndex][chartMetric] * 0.82))}</span>
                <span className="text-emerald-400 font-bold">+22.0%</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom SLA & Performance Benchmarks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-[#202020] text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424]">
            <div className="text-slate-600 dark:text-slate-400 text-[10px]">Inbox Delivery SLA</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">99.4% Validated</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424]">
            <div className="text-slate-600 dark:text-slate-400 text-[10px]">Unique Open Velocity</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">71.3% Verified</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424]">
            <div className="text-slate-600 dark:text-slate-400 text-[10px]">Reply-to-Meeting Rate</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">26.9% High Intent</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424]">
            <div className="text-slate-600 dark:text-slate-400 text-[10px]">Meeting-to-Close ARR</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">$4,380 Avg Deal</div>
          </div>
        </div>
      </div>

      {/* 4. MULTI-TOUCH ATTRIBUTION JOURNEY & FUNNEL */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Multi-Touch Attribution Journey & Channel Weighting
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              End-to-end conversion progression from cold discovery to closed-won revenue recognition.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Avg Journey: <strong>18.4 Days</strong></span>
          </div>
        </div>

        {/* Funnel Stage Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { stage: '1. Sourced', count: '50,000', conv: '100%', sub: 'Target ICP database' },
            { stage: '2. Outreach', count: '18,420', conv: '36.8%', sub: 'Multi-channel sent' },
            { stage: '3. Engaged', count: '4,820', conv: '26.2%', sub: 'Opens & social views' },
            { stage: '4. Replied', count: '1,240', conv: '25.7%', sub: 'Inbound replies' },
            { stage: '5. Demos', count: '326', conv: '26.3%', sub: 'Meetings booked' },
            { stage: '6. Won ARR', count: '$184K', conv: '12.9%', sub: '42 deals closed' },
          ].map((stg, i) => (
            <div
              key={stg.stage}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#242424] space-y-1.5 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <span>{stg.stage}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{stg.conv}</span>
              </div>
              <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                {stg.count}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                {stg.sub}
              </div>
              {/* Progress Bar Indicator */}
              <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-[#2A2A2A] mt-2 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.max(15, 100 - i * 16)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Channel Weight Attribution Chips */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/70 dark:border-[#242424] space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center justify-between">
            <span>Channel Attribution Weights (W-Shaped Model)</span>
            <span className="text-slate-400 font-normal">Sourcing: 40% • Mid-Touch: 20% • Closing: 40%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {channelWeights.map((cw) => {
              const Icon = cw.icon;
              return (
                <div
                  key={cw.channel}
                  className="p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200/60 dark:border-[#222222] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{cw.channel}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{cw.revenue} ARR</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{cw.weight}% Weight</div>
                    <div className="text-[10px] text-slate-400 font-mono">{cw.conv} conv</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. CHANNEL PERFORMANCE COMPARISON MATRIX */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Channel Efficiency & Unit Economics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Comparative volume, conversion ratios, and return on investment across channels.
            </p>
          </div>
          <Badge variant="emerald" size="sm">
            4 Active Channels Monitored
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[720px]">
            <thead>
              <tr className="text-slate-600 dark:text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Outreach Channel</th>
                <th className="pb-3">Volume</th>
                <th className="pb-3">Qualified Leads</th>
                <th className="pb-3">Meetings Booked</th>
                <th className="pb-3">Pipeline Influenced</th>
                <th className="pb-3">Attributed ARR</th>
                <th className="pb-3">Conversion Rate</th>
                <th className="pb-3 text-right">Channel ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {(channelPerformance || []).slice(0, 4).map((cp) => (
                <tr key={cp.id} className="hover:bg-slate-50/60 dark:hover:bg-[#181818] transition-colors">
                  <td className="py-3.5 pr-4 font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {cp.channel}
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{formatNumber(cp.volume)}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatNumber(cp.leads)}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatNumber(cp.meetings)}</td>
                  <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{cp.pipelineLabel || formatCurrency(cp.pipeline)}</td>
                  <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{cp.closedWonLabel || formatCurrency(cp.closedWon)}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, cp.conversionRate * 2.2)}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{cp.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-sans">
                    <Badge variant="emerald" size="sm">
                      {cp.channel === 'Voice AI SDR' ? '21.1x' : cp.channel === 'Upwork Studio' ? '31.1x' : '20.0x'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. CAMPAIGN PERFORMANCE LEADERBOARD TABLE (DENSE, SORTABLE, SEARCHABLE) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Campaign Leaderboard & Telemetry Log
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Granular campaign-level dispatches, reply triggers, demos, pipeline, and attributed revenue.
            </p>
          </div>

          {/* Search, Channel Filter & Status Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search campaigns or ICP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 w-48 sm:w-56"
              />
            </div>

            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="Email">Cold Email</option>
              <option value="LinkedIn">LinkedIn Safe</option>
              <option value="Voice">Voice AI SDR</option>
              <option value="Upwork">Upwork Studio</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Top Performing">Top Performing</option>
              <option value="Active">Active</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[800px]">
            <thead>
              <tr className="text-slate-600 dark:text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Campaign & Target ICP</th>
                <th className="pb-3">Channel</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('actions')}>
                  <span className="flex items-center gap-1">Actions {sortField === 'actions' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('leads')}>
                  <span className="flex items-center gap-1">Leads {sortField === 'leads' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('meetings')}>
                  <span className="flex items-center gap-1">Demos {sortField === 'meetings' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('pipeline')}>
                  <span className="flex items-center gap-1">Pipeline {sortField === 'pipeline' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('revenue')}>
                  <span className="flex items-center gap-1">ARR {sortField === 'revenue' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('conversionRate')}>
                  <span className="flex items-center gap-1">Conv % {sortField === 'conversionRate' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 cursor-pointer select-none" onClick={() => toggleSort('roi')}>
                  <span className="flex items-center gap-1">ROI {sortField === 'roi' && (sortAsc ? '↑' : '↓')}</span>
                </th>
                <th className="pb-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {filteredCampaigns.map((c) => {
                const isNeedsAttention = c.status === 'Needs Attention';
                const isTop = c.status === 'Top Performing';

                return (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-[#181818] transition-colors">
                    <td className="py-3.5 pr-4 font-sans max-w-xs">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{c.targetIcp || c.audience}</div>
                    </td>
                    <td className="py-3.5 font-sans">
                      <Badge variant="emerald" size="sm">
                        {c.channel || c.module}
                      </Badge>
                    </td>
                    <td className="py-3.5">
                      <Badge variant={isTop ? 'emerald' : isNeedsAttention ? 'rose' : 'emerald'} size="sm">
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 text-slate-700 dark:text-slate-300">{formatNumber(c.actions)}</td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatNumber(c.qualifiedLeads || c.leads)}</td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatNumber(c.meetings)}</td>
                    <td className="py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{c.pipelineLabel || formatCurrency(c.pipeline)}</td>
                    <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{c.revenueLabel || formatCurrency(c.revenue)}</td>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{formatPercentage(c.conversionRate)}</td>
                    <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{c.roi || '20.0x'}</td>
                    <td className="py-3.5 text-right font-sans">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCampaign(c)}
                        leftIcon={<Eye className="w-3 h-3" />}
                      >
                        Telemetry
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. ANALYTICS INTELLIGENCE & OPTIMIZATION ENGINE (4 STRUCTURED WHAT -> WHY -> ACTION CARDS) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Revenue Intelligence & Strategy Recommendations
            </h3>
          </div>
          <Badge variant="emerald" size="sm">
            AI Optimization Engine Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Top Revenue Driver */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Top Revenue Driver
              </span>
              <Badge variant="emerald" size="sm">+$48.0K ARR</Badge>
            </div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">
              Enterprise Fintech CFOs Q3
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
              <p><strong>WHAT:</strong> Outperforming platform benchmark with 36.4% meeting booking rate and $48K ARR.</p>
              <p><strong>WHY:</strong> Hyper-targeted ICP pain points and verified CFO email deliverability (99.8%).</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>ACTION:</strong> Expand targeting criteria to Series B-D European fintechs in 8D Lead Finder.</p>
            </div>
          </div>

          {/* Card 2: Highest Velocity Channel */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Highest Velocity Channel
              </span>
              <Badge variant="emerald" size="sm">38.2% Conv</Badge>
            </div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">
              Voice AI SDR Engine
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
              <p><strong>WHAT:</strong> Voice SDR delivers 38.2% demo conversion, 1.34x higher than standard email outreach.</p>
              <p><strong>WHY:</strong> Sub-400ms conversational latency and real-time objection handling on pricing.</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>ACTION:</strong> Allocate +40% additional Voice SDR credits for US West Coast tech accounts.</p>
            </div>
          </div>

          {/* Card 3: Multi-Channel Synergy */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Multi-Channel Synergy
              </span>
              <Badge variant="emerald" size="sm">2.1x Lift</Badge>
            </div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">
              LinkedIn Touchpoint Pre-Warming
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
              <p><strong>WHAT:</strong> Prospects who received a LinkedIn profile visit 2 days before email showed 71% open rates.</p>
              <p><strong>WHY:</strong> Pre-brand awareness significantly reduces spam perception and cold resistance.</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold"><strong>ACTION:</strong> Activate automatic 48-hour LinkedIn pre-warming step in default DAG workflows.</p>
            </div>
          </div>

          {/* Card 4: Optimization Opportunity */}
          <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Optimization Required
              </span>
              <Badge variant="rose" size="sm">14.2% Conv</Badge>
            </div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">
              Mid-Market E-commerce Re-engagement
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
              <p><strong>WHAT:</strong> Conversion lag observed with 14.2% meeting rate and 36-hour reply response time.</p>
              <p><strong>WHY:</strong> Sequence step 3 follow-up delay is too wide, losing initial executive interest.</p>
              <p className="text-amber-600 dark:text-amber-400 font-bold"><strong>ACTION:</strong> Shorten step 2 to step 3 delay from 48 hours to 18 hours in Email Campaign Builder.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. CAMPAIGN TELEMETRY DEEP-DIVE MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">
                    {selectedCampaign.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Channel: {selectedCampaign.channel} • Status: {selectedCampaign.status}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCampaign(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#242424]">
                <div className="text-[10px] text-slate-400 uppercase">Spend</div>
                <div className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{selectedCampaign.spend || '$1,200'}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#242424]">
                <div className="text-[10px] text-slate-400 uppercase">ICP Leads</div>
                <div className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{formatNumber(selectedCampaign.qualifiedLeads || selectedCampaign.leads)}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#242424]">
                <div className="text-[10px] text-slate-400 uppercase">Attributed ARR</div>
                <div className="font-bold text-emerald-500 text-base mt-0.5">{selectedCampaign.revenueLabel || formatCurrency(selectedCampaign.revenue)}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#242424]">
                <div className="text-[10px] text-slate-400 uppercase">ROI Multiple</div>
                <div className="font-bold text-emerald-500 text-base mt-0.5">{selectedCampaign.roi || '20.0x'}</div>
              </div>
            </div>

            {/* Sequence Drop-Off Telemetry */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                Sequence Step Performance & Drop-off:
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424] flex items-center justify-between">
                  <span>Step 1: Executive Outreach Intro</span>
                  <span className="font-bold text-emerald-500">99.4% Delivered • 72.1% Open</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424] flex items-center justify-between">
                  <span>Step 2: Pain-Point & Case Study Bump</span>
                  <span className="font-bold text-emerald-500">64.8% Open • 14.2% Reply</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#242424] flex items-center justify-between">
                  <span>Step 3: Executive Calendar Invite Link</span>
                  <span className="font-bold text-emerald-500">42.0% Click • 28.4% Demo</span>
                </div>
              </div>
            </div>

            {/* Audience Targeting */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-900 dark:text-white font-mono">Target Audience & ICP:</div>
              <div className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#181818] p-3 rounded-xl border border-slate-200/60 dark:border-[#242424] font-mono">
                {selectedCampaign.targetIcp || selectedCampaign.audience}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#202020]">
              <span className="text-[11px] text-slate-400 font-mono">
                Lookback Window: 30 Days
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCampaign(null)}
              >
                Close Telemetry
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
