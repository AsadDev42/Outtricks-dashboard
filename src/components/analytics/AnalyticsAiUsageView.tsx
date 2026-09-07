import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Download, 
  Cpu, 
  Bot, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Coins, 
  Layers, 
  BarChart2, 
  Zap,
  ShieldCheck,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage 
} from '../../utils/formatters';

// Catmull-Rom to Cubic Bézier spline helper for sleek curves
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

export const AnalyticsAiUsageView: React.FC = () => {
  const { exportReport } = useAnalytics();
  const [activeChartMetric, setActiveChartMetric] = useState<'requests' | 'tokens' | 'credits' | 'cost'>('requests');
  const [hoverDayIndex, setHoverDayIndex] = useState<number | null>(null);

  // Daily Trend Data
  const dailyAiTrend = [
    { day: 'Mon', requests: 3200, tokens: 2400000, credits: 6400, cost: 11.20, label: '3.2K' },
    { day: 'Tue', requests: 4100, tokens: 3100000, credits: 8200, cost: 14.10, label: '4.1K' },
    { day: 'Wed', requests: 3900, tokens: 2950000, credits: 7800, cost: 13.40, label: '3.9K' },
    { day: 'Thu', requests: 3800, tokens: 2800000, credits: 7600, cost: 12.90, label: '3.8K' },
    { day: 'Fri', requests: 3420, tokens: 2530000, credits: 6840, cost: 10.80, label: '3.4K' },
  ];

  // Agent Leaderboard Data
  const agentLeaderboard = [
    { agent: 'Tricksy Lead Researcher', model: 'Gemini 1.5 Flash', runs: 2840, successRate: 99.1, avgDuration: '1.2s', credits: 11360, cost: '$19.20', sparkline: [20, 45, 60, 80, 95] },
    { agent: 'Tricksy Email Copywriter', model: 'Gemini 1.5 Pro', runs: 1680, successRate: 98.4, avgDuration: '2.4s', credits: 13440, cost: '$24.50', sparkline: [30, 50, 40, 70, 85] },
    { agent: 'Tricksy Voice Conversation Engine', model: 'Cartesia Sub-400ms', runs: 1120, successRate: 97.5, avgDuration: '0.4s', credits: 8960, cost: '$14.20', sparkline: [40, 60, 75, 65, 90] },
    { agent: 'Tricksy CRM Auto-Enricher', model: 'Gemini 1.5 Flash', runs: 600, successRate: 99.5, avgDuration: '0.8s', credits: 3080, cost: '$4.50', sparkline: [25, 35, 55, 70, 80] },
  ];

  // Foundation Model Distribution (Donut Chart)
  const modelBreakdown = [
    { name: 'Gemini 1.5 Flash', percentage: 48, tokens: '6.85M', color: '#10B981', latency: '280ms' },
    { name: 'Gemini 1.5 Pro', percentage: 28, tokens: '4.00M', color: '#3B82F6', latency: '420ms' },
    { name: 'Cartesia Voice Engine', percentage: 16, tokens: '2.28M', color: '#8B5CF6', latency: '320ms' },
    { name: 'DeepContext 70B', percentage: 8, tokens: '1.15M', color: '#F59E0B', latency: '510ms' },
  ];

  // Chart SVG Coordinates Calculation
  const width = 680;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const currentValues = dailyAiTrend.map(d => d[activeChartMetric]);
  const minVal = Math.min(...currentValues) * 0.85;
  const maxVal = Math.max(...currentValues) * 1.1;

  const points = dailyAiTrend.map((d, i) => {
    const x = paddingX + (i / (dailyAiTrend.length - 1)) * chartW;
    const y = paddingY + chartH - ((d[activeChartMetric] - minVal) / (maxVal - minVal || 1)) * chartH;
    return { x, y };
  });

  const splineD = getSplinePath(points);
  const areaD = points.length > 0 ? `${splineD} L ${points[points.length - 1].x},${height - 10} L ${points[0].x},${height - 10} Z` : '';

  const activeHoverData = hoverDayIndex !== null ? dailyAiTrend[hoverDayIndex] : dailyAiTrend[1];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Integrated Hero KPI Strip (Reference 2: Hedging Overview style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total AI Requests */}
        <div className="p-5 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Total AI Requests
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </span>
          </div>

          <div className="my-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                18,420
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Inference completions
              </div>
            </div>

            {/* Micro Sparkline SVG */}
            <div className="w-24 h-10 shrink-0">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path
                  d="M 0 30 Q 25 10, 50 22 T 100 8"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 0 30 Q 25 10, 50 22 T 100 8 L 100 40 L 0 40 Z"
                  fill="url(#sparkline-grad-1)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="sparkline-grad-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-[#222222]/80 flex items-center justify-between">
            <span>Daily Average: 3.68K</span>
            <span className="text-slate-400">7D Active Window</span>
          </div>
        </div>

        {/* Card 2: Token Throughput */}
        <div className="p-5 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Tokens Processed
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono">
              <TrendingUp className="w-3 h-3" />
              +14.2%
            </span>
          </div>

          <div className="my-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                14.28M
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Prompt & Completion volume
              </div>
            </div>

            {/* Micro Sparkline SVG */}
            <div className="w-24 h-10 shrink-0">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path
                  d="M 0 35 Q 30 25, 60 12 T 100 5"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 0 35 Q 30 25, 60 12 T 100 5 L 100 40 L 0 40 Z"
                  fill="url(#sparkline-grad-2)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="sparkline-grad-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-[#222222]/80 flex items-center justify-between">
            <span>Tokens / Req: 775</span>
            <span className="text-slate-400">Context Density 99.4%</span>
          </div>
        </div>

        {/* Card 3: Success SLA % with Circular Ring */}
        <div className="p-5 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Success SLA Rate
            </span>
            <span className="text-[11px] font-bold text-emerald-400 font-mono">
              SLA Met
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                98.2%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                6,128 passed / 112 retried
              </div>
            </div>

            {/* Circular Gauge Meter (Reference 2 style) */}
            <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#222222]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray="98.2, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-white">98%</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-[#222222]/80 flex items-center justify-between">
            <span>Auto-Retry: &lt; 800ms</span>
            <span className="text-emerald-400 font-bold">Zero Data Loss</span>
          </div>
        </div>

        {/* Card 4: Compute Latency & Efficiency */}
        <div className="p-5 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Inference Latency
            </span>
            <span className="text-[11px] font-bold text-emerald-400 font-mono">
              Sub-400ms SLA
            </span>
          </div>

          <div className="my-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                380ms
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                $62.40 Total Compute Cost
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 font-mono text-xs font-bold text-center">
              <div>992x</div>
              <div className="text-[9px] text-slate-400">Assisted ROI</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-[#222222]/80 flex items-center justify-between">
            <span>$0.0034 / request</span>
            <span className="text-slate-300">$62K Revenue Linked</span>
          </div>
        </div>

      </div>

      {/* 2. Large Central Visual Workspace (2-Column Layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Daily Tricksy AI Utilization & Compute Curve (Reference 1 & 2) */}
        <div className="xl:col-span-2 p-6 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs space-y-5 flex flex-col justify-between">
          
          {/* Header Row with Title and Sleek Metric Switcher Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  Daily Tricksy AI Utilization & Compute Curve
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Autonomous execution volume, token throughput, and compute cost across active agent runs.
              </p>
            </div>

            {/* Sleek Pill Selectors */}
            <div className="flex items-center p-1 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-xs font-mono">
              {(['requests', 'tokens', 'credits', 'cost'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveChartMetric(m)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all cursor-pointer ${
                    activeChartMetric === m
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Hero Chart with Smooth Spline Curve & Hover Marker (Reference 2) */}
          <div className="relative w-full pt-2">
            
            {/* Live Hover Tooltip Indicator */}
            {activeHoverData && (
              <div className="absolute top-2 right-4 p-3 rounded-2xl bg-[#1E1E1E] border border-[#333333] shadow-lg text-xs font-mono space-y-1 z-10">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  {activeHoverData.day} AI Telemetry
                </div>
                <div className="text-base font-extrabold text-white">
                  {activeChartMetric === 'cost' ? `$${activeHoverData.cost.toFixed(2)}` : formatCompactNumber(activeHoverData[activeChartMetric])}
                  <span className="text-[10px] font-normal text-emerald-400 ml-1.5 font-sans">Peak Window</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeHoverData.requests} req • {(activeHoverData.tokens / 1000000).toFixed(2)}M tokens
                </div>
              </div>
            )}

            {/* SVG Spline Area Chart */}
            <div className="w-full h-56 relative overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="ai-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0.25, 0.5, 0.75].map((fraction, idx) => (
                  <line
                    key={idx}
                    x1={paddingX}
                    y1={paddingY + chartH * fraction}
                    x2={width - paddingX}
                    y2={paddingY + chartH * fraction}
                    stroke="#262626"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                ))}

                {/* Gradient Area Fill */}
                <path d={areaD} fill="url(#ai-chart-grad)" />

                {/* Spline Path */}
                <path
                  d={splineD}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Interactive Points on Spline */}
                {points.map((pt, i) => {
                  const isHovered = hoverDayIndex === i || (hoverDayIndex === null && i === 1);
                  return (
                    <g key={i} className="cursor-pointer" onMouseEnter={() => setHoverDayIndex(i)}>
                      {isHovered && (
                        <>
                          <line
                            x1={pt.x}
                            y1={paddingY}
                            x2={pt.x}
                            y2={height - 15}
                            stroke="#10B981"
                            strokeDasharray="3 3"
                            strokeWidth="1.5"
                            opacity="0.6"
                          />
                          <circle cx={pt.x} cy={pt.y} r="8" fill="#10B981" opacity="0.3" className="animate-ping" />
                          <circle cx={pt.x} cy={pt.y} r="5" fill="#10B981" stroke="#141414" strokeWidth="2" />
                        </>
                      )}
                      {!isHovered && (
                        <circle cx={pt.x} cy={pt.y} r="3.5" fill="#10B981" opacity="0.8" />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom X-Axis Days */}
            <div className="flex justify-between px-6 pt-2 border-t border-[#222222] text-xs font-mono text-slate-400">
              {dailyAiTrend.map((d, i) => (
                <button
                  key={d.day}
                  type="button"
                  onMouseEnter={() => setHoverDayIndex(i)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    (hoverDayIndex === i || (hoverDayIndex === null && i === 1))
                      ? 'text-emerald-400 font-bold bg-[#1C1C1C]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d.day} ({d.label})
                </button>
              ))}
            </div>

          </div>

          {/* Quick Summary Bar */}
          <div className="p-3 rounded-2xl bg-[#191919] border border-[#262626] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Weekly Compute Spend: <strong className="text-white font-mono">$62.40</strong></span>
            <span className="text-emerald-400 font-bold">Latency SLA: 99.8% within target</span>
          </div>

        </div>

        {/* Right 1 Column: Foundation Model Allocation & Donut Breakdown (Reference 3) */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs space-y-6 flex flex-col justify-between">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <div>
              <h3 className="font-extrabold text-base text-white tracking-tight">
                LLM Model Allocation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Token distribution by neural architecture.
              </p>
            </div>
            <Badge variant="blue" size="sm">4 Models</Badge>
          </div>

          {/* Donut Chart with Centered Total */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Donut Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="14"
                  strokeDasharray="48 100"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="14"
                  strokeDasharray="28 100"
                  strokeDashoffset="-48"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="14"
                  strokeDasharray="16 100"
                  strokeDashoffset="-76"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeDasharray="8 100"
                  strokeDashoffset="-92"
                />
              </svg>
              
              {/* Centered Total */}
              <div className="absolute text-center">
                <div className="text-lg font-black text-white font-mono">14.28M</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Tokens</div>
              </div>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-2.5 text-xs font-sans">
            {modelBreakdown.map((m) => (
              <div key={m.name} className="flex items-center justify-between p-2 rounded-xl bg-[#191919] border border-[#242424]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="font-semibold text-slate-200 truncate">{m.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-white">{m.percentage}%</span>
                  <span className="text-[10px] text-slate-400">({m.tokens})</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 3. Integrated Agent Leaderboard & Mission Telemetry (Seamless Table) */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222222]">
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Autonomous Agent Leaderboard & Execution Telemetry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live mission completion volume, success rates, latency, and compute consumption.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => exportReport('CSV')}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Clean Data-Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-[#242424]">
                <th className="pb-3 font-bold">Autonomous Agent</th>
                <th className="pb-3 font-bold">Foundation Model</th>
                <th className="pb-3 font-bold">Missions</th>
                <th className="pb-3 font-bold">Activity Velocity</th>
                <th className="pb-3 font-bold">Success SLA</th>
                <th className="pb-3 font-bold">Avg Latency</th>
                <th className="pb-3 font-bold">Credits</th>
                <th className="pb-3 font-bold text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020] font-mono">
              {agentLeaderboard.map((ag) => (
                <tr key={ag.agent} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 font-bold font-sans text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{ag.agent}</span>
                  </td>
                  
                  <td className="py-3.5 text-slate-400 font-sans">
                    <span className="px-2 py-0.5 rounded-md bg-[#1C1C1C] border border-[#282828] text-[11px] text-slate-300">
                      {ag.model}
                    </span>
                  </td>

                  <td className="py-3.5 text-slate-200 font-bold">{formatNumber(ag.runs)}</td>

                  {/* Inline Mini Sparkline */}
                  <td className="py-3.5">
                    <div className="w-20 h-5">
                      <svg viewBox="0 0 50 15" className="w-full h-full overflow-visible">
                        <path
                          d={`M 0 ${15 - (ag.sparkline[0] / 100) * 15} L 12 ${15 - (ag.sparkline[1] / 100) * 15} L 25 ${15 - (ag.sparkline[2] / 100) * 15} L 37 ${15 - (ag.sparkline[3] / 100) * 15} L 50 ${15 - (ag.sparkline[4] / 100) * 15}`}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </td>

                  {/* Success Rate with Progress Bar */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#222222] overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${ag.successRate}%` }} />
                      </div>
                      <span className="text-emerald-400 font-bold text-[11px]">
                        {formatPercentage(ag.successRate)}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 text-slate-300 font-bold">{ag.avgDuration}</td>
                  
                  <td className="py-3.5 text-slate-300">{formatNumber(ag.credits)}</td>

                  <td className="py-3.5 font-bold text-white text-right">{ag.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
