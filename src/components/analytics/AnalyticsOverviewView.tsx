import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  Target, 
  Calendar, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CalendarDays,
  Search,
  Filter,
  CheckCircle2,
  PhoneCall,
  Mail,
  Zap,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  useAnalytics, 
  RevenueDataPoint 
} from '../../context/AnalyticsContext';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate 
} from '../../utils/formatters';

// Catmull-Rom to Cubic Bézier spline converter for organic financial charts
function getSplinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export const AnalyticsOverviewView: React.FC = () => {
  const { 
    kpiMetrics, 
    overviewKpiCards,
    revenueData,
    campaigns, 
    activityTrends,
    setActiveTab,
    comparePriorPeriod
  } = useAnalytics();
  const navigate = useNavigate();

  // Chart view states
  const [chartMetric, setChartMetric] = useState<'pipeline' | 'revenue' | 'meetings' | 'qualifiedLeads'>('pipeline');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const svgContainerRef = useRef<SVGSVGElement>(null);

  // 12-Month dataset
  const safeData: RevenueDataPoint[] = useMemo(() => {
    if (revenueData && revenueData.length > 0) return revenueData;
    return [
      { date: 'Jan', pipeline: 28000, revenue: 11000, meetings: 5, qualifiedLeads: 22, conversion: 24.0 },
      { date: 'Feb', pipeline: 34000, revenue: 14500, meetings: 7, qualifiedLeads: 26, conversion: 24.4 },
      { date: 'Mar', pipeline: 48000, revenue: 19000, meetings: 9, qualifiedLeads: 31, conversion: 24.8 },
      { date: 'Apr', pipeline: 52000, revenue: 22000, meetings: 11, qualifiedLeads: 35, conversion: 25.1 },
      { date: 'May', pipeline: 78000, revenue: 31000, meetings: 14, qualifiedLeads: 44, conversion: 25.8 },
      { date: 'Jun', pipeline: 92000, revenue: 38000, meetings: 16, qualifiedLeads: 52, conversion: 26.2 },
      { date: 'Jul', pipeline: 125200, revenue: 49000, meetings: 19, qualifiedLeads: 63, conversion: 27.0 },
      { date: 'Aug', pipeline: 148000, revenue: 58000, meetings: 21, qualifiedLeads: 71, conversion: 27.5 },
      { date: 'Sep', pipeline: 132000, revenue: 53000, meetings: 18, qualifiedLeads: 68, conversion: 27.2 },
      { date: 'Oct', pipeline: 164000, revenue: 67000, meetings: 24, qualifiedLeads: 82, conversion: 28.0 },
      { date: 'Nov', pipeline: 182000, revenue: 74000, meetings: 27, qualifiedLeads: 91, conversion: 28.3 },
      { date: 'Dec', pipeline: 215000, revenue: 89000, meetings: 32, qualifiedLeads: 104, conversion: 28.8 },
    ];
  }, [revenueData]);

  // Comparative previous year dataset (approx 78% of current with natural variance)
  const previousYearData = useMemo(() => {
    return safeData.map((d, i) => {
      const factor = 0.72 + (Math.sin(i * 0.9) * 0.12);
      return {
        ...d,
        pipeline: Math.round(d.pipeline * factor),
        revenue: Math.round(d.revenue * factor),
      };
    });
  }, [safeData]);

  // Chart coordinates calculation
  const width = 800;
  const height = 300;
  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartInnerWidth = width - paddingLeft - paddingRight;
  const chartInnerHeight = height - paddingTop - paddingBottom;

  const currentValues = safeData.map(d => (d && d[chartMetric]) || 0);
  const prevValues = previousYearData.map(d => (d && d[chartMetric]) || 0);

  const rawMax = Math.max(...currentValues, ...prevValues, 100);
  // Round max value to nice interval
  const maxVal = Math.ceil(rawMax / 50000) * 50000 || 250000;

  const currentPoints = useMemo(() => {
    return safeData.map((d, i) => {
      const x = paddingLeft + (i / (safeData.length - 1)) * chartInnerWidth;
      const val = (d && d[chartMetric]) || 0;
      const y = paddingTop + chartInnerHeight - (val / maxVal) * chartInnerHeight;
      return { x, y, val, date: d.date };
    });
  }, [safeData, chartMetric, maxVal, chartInnerWidth, chartInnerHeight]);

  const prevPoints = useMemo(() => {
    return previousYearData.map((d, i) => {
      const x = paddingLeft + (i / (previousYearData.length - 1)) * chartInnerWidth;
      const val = (d && d[chartMetric]) || 0;
      const y = paddingTop + chartInnerHeight - (val / maxVal) * chartInnerHeight;
      return { x, y, val, date: d.date };
    });
  }, [previousYearData, chartMetric, maxVal, chartInnerWidth, chartInnerHeight]);

  const currentLinePath = useMemo(() => getSplinePath(currentPoints), [currentPoints]);
  const prevLinePath = useMemo(() => getSplinePath(prevPoints), [prevPoints]);

  const currentAreaPath = useMemo(() => {
    if (currentPoints.length === 0) return '';
    const last = currentPoints[currentPoints.length - 1];
    const first = currentPoints[0];
    const baselineY = paddingTop + chartInnerHeight;
    return `${currentLinePath} L ${last.x},${baselineY} L ${first.x},${baselineY} Z`;
  }, [currentLinePath, currentPoints, paddingTop, chartInnerHeight]);

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgContainerRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relativeX = (clientX / rect.width) * width;

    let closestIdx = 0;
    let minDiff = Infinity;
    currentPoints.forEach((p, idx) => {
      const diff = Math.abs(p.x - relativeX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoverIndex(closestIdx);
  };

  const handleSvgMouseLeave = () => {
    setHoverIndex(null);
  };

  const activeIdx = hoverIndex !== null ? hoverIndex : 6; // Default to Jul
  const activeCurrentPoint = currentPoints[activeIdx] || currentPoints[0];
  const activePrevPoint = prevPoints[activeIdx] || prevPoints[0];

  // Campaigns detailed data
  const filteredCampaigns = useMemo(() => {
    return (campaigns || []).filter(c => {
      const matchesSearch = tableSearch === '' || 
        c.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        c.channel.toLowerCase().includes(tableSearch.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status.toLowerCase().replace(/\s+/g, '-') === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, tableSearch, statusFilter]);

  // Primary KPI metrics from context or fallback
  const totalRev = overviewKpiCards?.find(k => k.id === 'rev' || k.name?.includes('Revenue'))?.rawValue ?? 124500;
  const pipelineVal = overviewKpiCards?.find(k => k.id === 'pipeline' || k.name?.includes('Pipeline'))?.rawValue ?? 285400;
  const qualLeads = overviewKpiCards?.find(k => k.id === 'leads' || k.name?.includes('Leads'))?.rawValue ?? 1248;
  const convRate = overviewKpiCards?.find(k => k.id === 'winrate' || k.name?.includes('Win Rate') || k.name?.includes('Conversion'))?.rawValue ?? 18.6;

  return (
    <div className="space-y-6 font-sans select-none text-slate-900 dark:text-white">
      
      {/* =========================================================================
          1. TOP KPI SUMMARY CARDS (Matching Reference InsightX Style)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        
        {/* Card 1: Total Revenue (Hero Card with Ambient Green Glow) */}
        <div className="relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col justify-between group transition-all">
          {/* Subtle Ambient Green Top-Left Glow */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="w-4 h-4" />
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-[#888888] font-medium">
                Total Revenue
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {formatCurrency(totalRev)}
                </span>
                {comparePriorPeriod ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+12.5%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400">
                    <span>Current</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-2 text-[11px] text-slate-500 dark:text-[#777777] font-medium">
            {comparePriorPeriod ? 'Driven mainly by Paid traffic (+18%)' : 'Gross ARR recorded in period'}
          </div>
        </div>

        {/* Card 2: Pipeline Value / Active Deals */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col justify-between group transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-[#888888] font-medium">
                Pipeline Value
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {formatCurrency(pipelineVal)}
                </span>
                {comparePriorPeriod ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+18.2%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400">
                    <span>Current</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-[#777777] font-medium">
            {comparePriorPeriod ? 'Enterprise deals up +24% vs last mo' : 'Weighted deal pipeline active in CRM'}
          </div>
        </div>

        {/* Card 3: Active Users / Accounts */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col justify-between group transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-[#888888] font-medium">
                Active Prospects
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  8,450
                </span>
                {comparePriorPeriod ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-rose-500">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    <span>-5.4%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400">
                    <span>Current</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-[#777777] font-medium">
            {comparePriorPeriod ? 'Decline driven by mobile users (-7%)' : 'Engaged prospects across active sequences'}
          </div>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col justify-between group transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-[#888888] font-medium">
                Conversion Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {formatPercentage(convRate)}
                </span>
                {comparePriorPeriod ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+1.2%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400">
                    <span>Current</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-[#777777] font-medium">
            {comparePriorPeriod ? 'Improved after checkout optimization (+1.2%)' : 'Average visitor to qualified opportunity rate'}
          </div>
        </div>

        {/* Card 5: Qualified Leads */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs flex flex-col justify-between group transition-all sm:col-span-2 lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 dark:text-[#888888] font-medium">
                Qualified Leads
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {formatNumber(qualLeads)}
                </span>
                {comparePriorPeriod ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+9.4%</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400">
                    <span>Current</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-[#777777] font-medium">
            {comparePriorPeriod ? 'Avg velocity 14.2 days to qualified' : 'Verified high-intent leads generated in period'}
          </div>
        </div>

      </div>

      {/* =========================================================================
          2. MAIN PERFORMANCE SPLIT: SPLINE CHART (LEFT) + SECONDARY BREAKDOWNS (RIGHT)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Main Interactive Spline Performance Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-6 flex flex-col justify-between">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Revenue & Pipeline Performance
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#888888]">
                Comparative volume velocity across multi-touch acquisition channels.
              </p>
            </div>

            {/* Metric Selector Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#262626] text-xs font-mono">
                {[
                  { id: 'pipeline', label: 'Pipeline' },
                  { id: 'revenue', label: 'Revenue' },
                  { id: 'meetings', label: 'Meetings' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setChartMetric(m.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      chartMetric === m.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive SVG Financial Spline Chart */}
          <div className="relative w-full overflow-hidden">
            <svg
              ref={svgContainerRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-[280px] sm:h-[320px] overflow-visible cursor-crosshair"
              onMouseMove={handleSvgMouseMove}
              onMouseLeave={handleSvgMouseLeave}
            >
              <defs>
                {/* Area Gradient Fill */}
                <linearGradient id="splineGreenFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines and Y-Axis Labels */}
              {[250000, 200000, 150000, 100000, 50000, 0].map((tick) => {
                const y = paddingTop + chartInnerHeight - (tick / maxVal) * chartInnerHeight;
                return (
                  <g key={tick}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-[#202020]"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="text-[10px] font-mono fill-slate-400 dark:fill-[#666666]"
                    >
                      {tick >= 1000 ? `${tick / 1000}K` : '0K'}
                    </text>
                  </g>
                );
              })}

              {/* Area Gradient Under Curve */}
              {currentAreaPath && (
                <path d={currentAreaPath} fill="url(#splineGreenFill)" />
              )}

              {/* Previous Year Line (Lime / Olive Muted Line) */}
              {prevLinePath && (
                <path
                  d={prevLinePath}
                  fill="none"
                  stroke="#84CC16"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
              )}

              {/* Current Year Line (Glowing Emerald Curve) */}
              {currentLinePath && (
                <path
                  d={currentLinePath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Interactive Vertical Crosshair Dashed Line */}
              {activeCurrentPoint && (
                <g>
                  <line
                    x1={activeCurrentPoint.x}
                    y1={paddingTop}
                    x2={activeCurrentPoint.x}
                    y2={paddingTop + chartInnerHeight}
                    stroke="white"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                  />

                  {/* Previous Period Point Dot */}
                  {activePrevPoint && (
                    <circle
                      cx={activePrevPoint.x}
                      cy={activePrevPoint.y}
                      r="4"
                      fill="#84CC16"
                      stroke="#141414"
                      strokeWidth="2"
                    />
                  )}

                  {/* Current Period Point Dot */}
                  <circle
                    cx={activeCurrentPoint.x}
                    cy={activeCurrentPoint.y}
                    r="5"
                    fill="#10B981"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* X-Axis Month Labels */}
              {currentPoints.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  className={`text-[11px] font-mono transition-all ${
                    idx === activeIdx
                      ? 'fill-white font-bold'
                      : 'fill-slate-400 dark:fill-[#666666]'
                  }`}
                >
                  {p.date}
                </text>
              ))}
            </svg>

            {/* Floating Precision Hover Tooltip Card (Matching Reference Screenshot) */}
            {activeCurrentPoint && (
              <div 
                className="absolute pointer-events-none transition-all duration-100 z-20"
                style={{
                  left: `${(activeCurrentPoint.x / width) * 100}%`,
                  top: '15%',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="px-4 py-2.5 rounded-2xl bg-[#1C1C1C] border border-[#2A2A2A] shadow-xl text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#888888] text-[10px]">
                      {activeCurrentPoint.date} 21, 2026:
                    </span>
                    <strong className="text-white font-bold">
                      {formatCurrency(activeCurrentPoint.val, '$0', true)}
                    </strong>
                  </div>
                  {activePrevPoint && (
                    <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#262626]">
                      <span className="text-[#888888] text-[10px]">
                        {activePrevPoint.date} 21, 2025:
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {formatCurrency(activePrevPoint.val, '$0', true)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chart Footer Legend */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#888888] pt-3 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Current Year (2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                <span>Previous Year (2025)</span>
              </div>
            </div>
            <span className="font-mono text-[11px]">Updated 2m ago</span>
          </div>

        </div>

        {/* RIGHT: Secondary Analytics & Circular Revenue Breakdown (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Top 2 Compact Metric Cards (Revenue + Churn) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-2">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#888888]">Revenue</span>
                <div className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                  $30,500
                </div>
                <div className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12.5% vs last week</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-2">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 dark:text-[#888888]">Churn Rate</span>
                <div className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white">
                  2.1%
                </div>
                <div className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-rose-500">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-0.6% vs last week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Circular / Bubble Revenue Breakdown (Matching Reference Image) */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                Revenue Breakdown
              </h3>
              <button type="button" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble Circular Visualization */}
            <div className="relative h-44 flex items-center justify-center select-none">
              {/* Central Main Bubble: Direct (50%) */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-emerald-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20 font-black">
                <span className="text-2xl">50%</span>
              </div>

              {/* Left Bubble: Partner (20%) */}
              <div className="absolute left-6 bottom-4 w-16 h-16 rounded-full bg-lime-400 text-slate-950 flex flex-col items-center justify-center font-bold shadow-md shadow-lime-400/20 text-xs">
                <span>20%</span>
              </div>

              {/* Right Bubble: Paid (30%) */}
              <div className="absolute right-6 bottom-3 w-20 h-20 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center font-bold shadow-md shadow-emerald-600/20 text-sm">
                <span>30%</span>
              </div>
            </div>

            {/* Breakdown Legend List */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020] text-xs font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400">Direct</span>
                </div>
                <span className="text-slate-950 dark:text-white font-bold">50% ($62,250)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-slate-400">Paid</span>
                </div>
                <span className="text-slate-950 dark:text-white font-bold">30% ($37,350)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                  <span className="text-slate-400">Partner</span>
                </div>
                <span className="text-slate-950 dark:text-white font-bold">20% ($24,900)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          3. ACTIVITY & GROWTH TRENDS SECTION
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono">
              Activity & Velocity Trends
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Real-time system telemetry</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Outreach Calls</span>
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-slate-950 dark:text-white font-sans">
              1,420
            </div>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              +8.4% vs last week
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Emails Sent</span>
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-slate-950 dark:text-white font-sans">
              48,200
            </div>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              +15.2% vs last week
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Deals Won</span>
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-slate-950 dark:text-white font-sans">
              28
            </div>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              +12.0% vs last week
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Tasks Completed</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl font-black text-slate-950 dark:text-white font-sans">
              194
            </div>
            <div className="text-[11px] font-mono text-emerald-500 font-bold">
              +5.6% vs last week
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. DETAILED CAMPAIGN & REVENUE ATTRIBUTION TABLE
          ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#222222] shadow-xs space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Campaign & Channel Performance Attribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#888888]">
              Granular closed-won pipeline and conversions mapped across growth initiatives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#262626] text-xs text-slate-900 dark:text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-colors w-48 sm:w-64 font-sans"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#262626] text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-colors font-sans"
            >
              <option value="all">All Status</option>
              <option value="top-performing">Top Performing</option>
              <option value="active">Active</option>
              <option value="needs-attention">Needs Attention</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#222222]">
          <table className="w-full text-left text-xs border-collapse font-sans min-w-[720px]">
            <thead className="bg-slate-50/90 dark:bg-[#111111] border-b border-slate-200/80 dark:border-[#222222] text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Campaign Name</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5 text-right">Leads</th>
                <th className="p-3.5 text-right">Qualified</th>
                <th className="p-3.5 text-right">Meetings</th>
                <th className="p-3.5 text-right">Pipeline</th>
                <th className="p-3.5 text-right">Revenue</th>
                <th className="p-3.5 text-right">Conv. %</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1C1C1C] text-slate-800 dark:text-white">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1A1A1A] transition-colors">
                    <td className="p-3.5 font-bold font-sans">
                      {c.name}
                    </td>
                    <td className="p-3.5">
                      <Badge variant="slate" size="sm">
                        {c.channel}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      {formatNumber(c.leads)}
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      {formatNumber(c.qualifiedLeads)}
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      {formatNumber(c.meetings)}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {formatCurrency(c.pipeline)}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(c.revenue)}
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      {formatPercentage(c.conversionRate)}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge
                        variant={
                          c.status === 'Top Performing'
                            ? 'emerald'
                            : c.status === 'Needs Attention'
                            ? 'rose'
                            : 'emerald'
                        }
                        size="sm"
                      >
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No matching campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
