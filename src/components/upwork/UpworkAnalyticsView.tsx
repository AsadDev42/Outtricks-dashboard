import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Send, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  Award, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Download, 
  Layers, 
  Users, 
  Sparkles, 
  PieChart, 
  Activity, 
  Briefcase, 
  FileText,
  Check,
  Radio
} from 'lucide-react';
import { useUpwork } from '../../context/UpworkContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export type AnalyticsRevenueSection = 'overview' | 'performance' | 'analytics' | 'revenue';

export interface UpworkAnalyticsViewProps {
  initialSection?: AnalyticsRevenueSection;
}

export const UpworkAnalyticsView: React.FC<UpworkAnalyticsViewProps> = ({ 
  initialSection = 'overview' 
}) => {
  const { applications, contracts } = useUpwork();
  const [activeSection, setActiveSection] = useState<AnalyticsRevenueSection>(initialSection);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const totalProposals = applications.length;
  const totalInterviews = applications.filter((a) => a.status === 'Interview' || a.status === 'Hired').length;
  const totalHired = applications.filter((a) => a.status === 'Hired').length;
  const totalEarned = contracts.reduce((acc, c) => acc + c.totalEarned, 0);

  const interviewRate = totalProposals > 0 ? ((totalInterviews / totalProposals) * 100).toFixed(1) : '66.7';
  const hireRate = totalInterviews > 0 ? ((totalHired / totalInterviews) * 100).toFixed(1) : '50.0';

  const exportAnalyticsReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      `Total Proposals Sent,${totalProposals}\n` +
      `Interviews Scheduled,${totalInterviews}\n` +
      `Contracts Won,${totalHired}\n` +
      `Gross Revenue,$${totalEarned}\n` +
      `Interview Conversion Rate,${interviewRate}%\n` +
      `Hire Rate,${hireRate}%\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `upwork-analytics-revenue-${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner with Consolidated Section Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Analytics & Revenue Intelligence
            </h1>
            <Badge variant="emerald" size="sm">100% Top Rated Plus</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unified bidding conversion velocity, proposal acceptance rates, skill telemetry, and milestone escrow revenue.
          </p>
        </div>

        {/* Section Switcher Pills & Export Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveSection('overview')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none ${
                activeSection === 'overview'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('performance')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none ${
                activeSection === 'performance'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Performance
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('analytics')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none ${
                activeSection === 'analytics'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('revenue')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer select-none ${
                activeSection === 'revenue'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Revenue
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={exportAnalyticsReport}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">1. Proposals Sent</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{totalProposals}</div>
          <div className="text-[10px] text-slate-400 font-sans">100% Dispatched via AI</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">2. Client Interviews</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{totalInterviews}</div>
          <div className="text-[10px] text-emerald-500 font-bold font-sans">{interviewRate}% Response Rate</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">3. Contracts Won</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{totalHired}</div>
          <div className="text-[10px] text-emerald-500 font-bold font-sans">{hireRate}% Win Velocity</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">4. Gross Revenue</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">${totalEarned.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-500 font-bold font-sans">100% Escrow Funded</div>
        </div>
      </div>

      {/* 3. Dynamic Section Content */}
      
      {/* SECTION 1: OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Conversion Funnel Breakdown */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Autonomous Bidding & Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time pipeline progression from live RSS scraping to funded milestone payouts.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                Overall Velocity: 4.8x ROI
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Scraped Jobs</div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">1,420</div>
                <div className="text-[11px] text-slate-500">Auto-Filtered</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Auto-Bid Queue</div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">240</div>
                <div className="text-[11px] text-emerald-500 font-bold">&gt;85% Match</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Proposals Sent</div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{totalProposals}</div>
                <div className="text-[11px] text-slate-500">100% Customized</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Interviews</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{totalInterviews}</div>
                <div className="text-[11px] text-emerald-500 font-bold">{interviewRate}% Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Contracts Won</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{totalHired}</div>
                <div className="text-[11px] text-emerald-500 font-bold">${totalEarned.toLocaleString()} ARR</div>
              </div>
            </div>
          </div>

          {/* Active Contracts Summary */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
              Top Active Revenue Contracts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#2A2A2A] text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Client / Company</th>
                    <th className="pb-3">Project Title</th>
                    <th className="pb-3">Rate / Type</th>
                    <th className="pb-3">Total Earned</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {contracts.slice(0, 4).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 font-bold text-slate-900 dark:text-white">{c.clientName}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">{c.title}</td>
                      <td className="py-3 font-mono text-slate-500">{c.contractType}</td>
                      <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">${c.totalEarned.toLocaleString()}</td>
                      <td className="py-3">
                        <Badge variant="emerald" size="sm">{c.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PERFORMANCE */}
      {activeSection === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AI Agent vs Manual Bidding */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Autonomous AI Bidder vs Manual Proposals
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Autonomous AI Proposal Response Rate</span>
                    <span className="text-emerald-500 font-mono">68.4%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[68.4%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Manual Proposal Response Rate</span>
                    <span className="text-slate-400 font-mono">38.2%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full w-[38.2%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Average Dispatch Time</span>
                    <span className="text-emerald-500 font-mono">&lt; 8 minutes from RSS post</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Match Score Correlation */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Win Velocity by Match Score
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">90% - 100% Match Score</div>
                    <div className="text-[10px] text-slate-400">High compatibility proposals</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-emerald-500 text-sm">74.2% Win Rate</div>
                    <div className="text-[10px] text-slate-400">Avg $9,200 Contract</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">80% - 89% Match Score</div>
                    <div className="text-[10px] text-slate-400">Moderate compatibility proposals</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-slate-600 dark:text-slate-300 text-sm">48.6% Win Rate</div>
                    <div className="text-[10px] text-slate-400">Avg $5,400 Contract</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Radar Performance & Proposal Template Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Job Radar Conversion Breakdown */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Smart Job Radar Telemetry & Wins
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                  Active Radars
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-900 dark:text-white">Deliverability & Cold Email Architect</span>
                    <span className="text-emerald-500 font-mono">66.7% Win Rate</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Discovered: 42 • Qualified: 18 • Applied: 3</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">$8,400 Won</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-900 dark:text-white">Voice AI & Real-Time SDR Engineers</span>
                    <span className="text-emerald-500 font-mono">50.0% Win Rate</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Discovered: 29 • Qualified: 9 • Applied: 2</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">$24,500 Won</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-900 dark:text-white">High-Density React / Next.js SaaS Architect</span>
                    <span className="text-emerald-500 font-mono">100% Win Rate</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Discovered: 55 • Qualified: 14 • Applied: 1</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">$9,500 Won</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Template Response Velocity */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Proposal Hook & Template Response
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">
                  AI Polish Powered
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Real-Time Voice AI SDR Architecture Hook</div>
                    <div className="text-[10px] text-slate-400">29 dispatches • Sub-400ms WebRTC angle</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-emerald-500 text-sm">48.3% Reply</div>
                    <div className="text-[10px] text-slate-400">Highest converter</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Enterprise Outbound & Deliverability Hook</div>
                    <div className="text-[10px] text-slate-400">42 dispatches • 2048-bit DKIM angle</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-emerald-500 text-sm">41.2% Reply</div>
                    <div className="text-[10px] text-slate-400">Enterprise tier</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">High-Performance React / TypeScript SaaS Hook</div>
                    <div className="text-[10px] text-slate-400">68 dispatches • 60FPS UI angle</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-emerald-500 text-sm">38.5% Reply</div>
                    <div className="text-[10px] text-slate-400">Consistent performer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ANALYTICS */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tech Stack Demand Breakdown */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                Skill & Technology Revenue Share
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Full-Stack & React / Next.js</span>
                    <span className="font-mono text-emerald-500">42% ($52.2k)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#202020] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>AI Agent & LLM Orchestration</span>
                    <span className="font-mono text-emerald-500">34% ($42.3k)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#202020] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[34%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Python, FastApi & Data Workflows</span>
                    <span className="font-mono text-slate-400">14% ($17.4k)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#202020] rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full w-[14%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Outbound Systems & Integrations</span>
                    <span className="font-mono text-slate-400">10% ($12.4k)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#202020] rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full w-[10%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                Client Geography & Budget Tiers
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">United States</div>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">62% Revenue</div>
                  <div className="text-[10px] text-emerald-500 font-bold">$125/hr Avg Rate</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">United Kingdom</div>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">18% Revenue</div>
                  <div className="text-[10px] text-emerald-500 font-bold">$115/hr Avg Rate</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Canada</div>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">12% Revenue</div>
                  <div className="text-[10px] text-emerald-500 font-bold">$110/hr Avg Rate</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Australia & EU</div>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">8% Revenue</div>
                  <div className="text-[10px] text-emerald-500 font-bold">$120/hr Avg Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: REVENUE */}
      {activeSection === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Active Escrow Funded</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$18,500</div>
              <div className="text-[11px] text-slate-500 font-sans">Across 3 active milestones</div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Pending Clearance</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">$6,200</div>
              <div className="text-[11px] text-slate-500 font-sans">Available in 5-day security hold</div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Available for Payout</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$14,800</div>
              <div className="text-[11px] text-emerald-500 font-sans font-bold">Ready for direct bank withdrawal</div>
            </div>
          </div>

          {/* Historical Revenue Ledger */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  12-Month Milestone Earnings Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Full financial record of hourly logs, fixed-price milestones, and client bonuses.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportAnalyticsReport}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Export Ledger
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#2A2A2A] text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Contract / Description</th>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Upwork Fee</th>
                    <th className="pb-3">Net Revenue</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
                  {contracts.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="py-3 font-sans font-bold text-slate-900 dark:text-white">{c.title}</td>
                      <td className="py-3 font-sans text-slate-600 dark:text-slate-300">{c.clientName}</td>
                      <td className="py-3 text-slate-500">{c.startDate}</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">${c.totalEarned.toLocaleString()}</td>
                      <td className="py-3 text-slate-400">-${(c.totalEarned * 0.1).toLocaleString()}</td>
                      <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">${(c.totalEarned * 0.9).toLocaleString()}</td>
                      <td className="py-3 font-sans">
                        <Badge variant="emerald" size="sm">Cleared</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
