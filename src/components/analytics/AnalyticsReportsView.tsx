import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  Calendar, 
  Printer, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Layers, 
  Sparkles,
  BarChart3,
  X,
  Send
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics, ReportItem } from '../../context/AnalyticsContext';
import { MetricCard } from './shared/MetricCard';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate 
} from '../../utils/formatters';

export const AnalyticsReportsView: React.FC = () => {
  const { reports, createReport, scheduleReport, deleteReport, exportReport } = useAnalytics();
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState<ReportItem['type']>('Attribution');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [scheduleFreq, setScheduleFreq] = useState<'Weekly' | 'Monthly' | 'Daily'>('Weekly');
  const [recipientEmail, setRecipientEmail] = useState('');

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Executive Reports & Data Export Center
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Generate on-demand board-ready reports, scheduled stakeholder digests, and raw telemetry CSVs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsScheduleModalOpen(true)}
            leftIcon={<Clock className="w-3.5 h-3.5" />}
          >
            Schedule Digest
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsGenerateModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* 2. Top Report Templates (Part 16) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Revenue Attribution Digest', type: 'Attribution' as const, desc: 'Multi-touch CAC and closed ARR by channel.' },
          { title: 'Campaign ROI Benchmark', type: 'Campaign ROI' as const, desc: 'Lead volume, reply rates, and meeting conversions.' },
          { title: 'Executive Board Summary', type: 'Executive Summary' as const, desc: 'High-level KPI scorecard, MRR, and platform health.' },
          { title: 'TRIXIE AI Inference Audit', type: 'AI Usage' as const, desc: 'Autonomous tasks, token usage, and latency SLA.' },
        ].map((t) => (
          <div
            key={t.title}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase">{t.type}</span>
              <div className="font-extrabold text-slate-950 dark:text-white text-sm">{t.title}</div>
              <p className="text-xs text-slate-500">{t.desc}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                createReport({
                  title: t.title,
                  type: t.type,
                  dateRange: 'Past 30 Days',
                });
              }}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Generate Template
            </Button>
          </div>
        ))}
      </div>

      {/* 3. Generated Reports & Exports Archive */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Generated Reports & Exports Archive
            </h3>
            <p className="text-xs text-slate-500">
              Download historical exports or trigger automated recalculations.
            </p>
          </div>
          <Badge variant="emerald" size="sm">{reports?.length || 0} Total Archives</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Report Document</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Date Range</th>
                <th className="pb-3">Generated Date</th>
                <th className="pb-3">File Size</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {(reports || []).map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>{rep.title}</span>
                  </td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{rep.type}</Badge>
                  </td>
                  <td className="py-3.5 text-slate-500">{rep.dateRange}</td>
                  <td className="py-3.5 text-slate-500">{rep.generatedDate}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300 font-bold">{rep.fileSize}</td>
                  <td className="py-3.5 font-sans">
                    <Badge variant="emerald" size="sm">{rep.status}</Badge>
                  </td>
                  <td className="py-3.5 text-right font-sans space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportReport('CSV')}
                      leftIcon={<Download className="w-3 h-3" />}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportReport('PDF')}
                      leftIcon={<Printer className="w-3 h-3" />}
                    >
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Generate Report Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Custom Report
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-white">Report Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Pipeline & Conversion Review"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-white">Category</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Attribution">Attribution</option>
                  <option value="Campaign ROI">Campaign ROI</option>
                  <option value="Executive Summary">Executive Summary</option>
                  <option value="Channel Breakdown">Channel Breakdown</option>
                  <option value="AI Usage">AI Usage</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-white">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 90 Days">Last 90 Days</option>
                  <option value="Year to Date (YTD)">Year to Date (YTD)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsGenerateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  createReport({
                    title: reportTitle || 'Custom Revenue Report',
                    type: reportType,
                    dateRange
                  });
                  setIsGenerateModalOpen(false);
                }}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Schedule Report Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Schedule Recurring Digest
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-white">Frequency</label>
                <select
                  value={scheduleFreq}
                  onChange={(e) => setScheduleFreq(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Daily">Daily (Every morning at 8:00 AM)</option>
                  <option value="Weekly">Weekly (Every Monday morning)</option>
                  <option value="Monthly">Monthly (1st of every month)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-white">Recipient Email</label>
                <input
                  type="email"
                  placeholder="executive@company.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  scheduleReport({
                    title: `Automated ${scheduleFreq} Executive Digest`,
                    type: 'Executive Summary',
                    dateRange: 'Rolling Window',
                    frequency: scheduleFreq,
                    recipients: recipientEmail ? [recipientEmail] : ['workspace-owner@outtricks.com']
                  });
                  setIsScheduleModalOpen(false);
                }}
              >
                Save Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
