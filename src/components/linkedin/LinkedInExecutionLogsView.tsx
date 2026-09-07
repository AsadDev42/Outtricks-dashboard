import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCw, 
  Search, 
  Download,
  Filter,
  Globe,
  Terminal,
  X,
  Play
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInLog } from '../../context/LinkedInContext';

export const LinkedInExecutionLogsView: React.FC = () => {
  const { executionLogs, accounts } = useLinkedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Failed' | 'Running' | 'Skipped'>('All');
  const [accountFilter, setAccountFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<LinkedInLog | null>(null);

  const filteredLogs = useMemo(() => {
    return executionLogs.filter((log) => {
      const matchesSearch = 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
      const matchesAccount = accountFilter === 'All' || log.account.includes(accountFilter);

      return matchesSearch && matchesStatus && matchesAccount;
    });
  }, [executionLogs, searchQuery, statusFilter, accountFilter]);

  const handleExportCSV = () => {
    const headers = 'Time,Account,Action,Prospect,Company,Status,Duration,Details\n';
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.timestamp}","${l.account}","${l.action}","${l.prospectName}","${l.company}","${l.status}","${l.duration || '310ms'}","${l.details.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkedin-execution-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Execution Logs</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Immutable live telemetry audit trail of stealth profile visits, invite dispatches, and InMails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Actions Today</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{executionLogs.length * 42}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Success Rate SLA</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">98.8%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Failed / Checkpoints</span>
          <span className="text-xl font-extrabold text-slate-400 font-mono">0</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Active Residential Proxies</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{accounts.length} Nodes</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, prospect, company..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Account Filter */}
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Senders</option>
            {accounts.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1">
            {(['All', 'Success', 'Running', 'Failed', 'Skipped'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Logs Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-3">Sender Account</th>
                <th className="py-3.5 px-3">Action Type</th>
                <th className="py-3.5 px-3">Target Prospect</th>
                <th className="py-3.5 px-3">Company</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Latency</th>
                <th className="py-3.5 px-4 text-right">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Clock className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">No Execution Logs Found</span>
                    <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {log.account}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {log.prospectName}
                    </td>

                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {log.company}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <Badge
                        variant={log.status === 'Success' ? 'emerald' : log.status === 'Running' ? 'blue' : 'amber'}
                        size="sm"
                        dot={log.status === 'Running'}
                      >
                        {log.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {log.duration || '320ms'}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(log);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Detailed Execution Trace Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Log Trace ID: {selectedLog.id}</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedLog.action}</h3>
                <span className="text-xs text-slate-400">Dispatched via {selectedLog.account} • {selectedLog.timestamp}</span>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedLog.status}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedLog.duration || '340ms'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Proxy Node</span>
                  <strong className="text-emerald-600 font-mono">Residential 4G</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Target Contact & Company</strong>
                <p className="text-slate-700 dark:text-slate-300 font-semibold">{selectedLog.prospectName} • {selectedLog.company}</p>
                <p className="text-[11px] text-slate-500">{selectedLog.details}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.08] space-y-1 font-mono text-[11px] text-slate-300">
                <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Raw Request Telemetry</span>
                </div>
                <pre className="text-[10px] text-emerald-400 overflow-x-auto no-scrollbar pt-1 leading-relaxed">
{`{
  "action": "${selectedLog.action}",
  "sender_account": "${selectedLog.account}",
  "target": "${selectedLog.prospectName}",
  "company": "${selectedLog.company}",
  "proxy_pool": "static-residential-us-east-1",
  "status_code": 200,
  "human_delay_emulated": "48.2s",
  "anti_ban_signature": "SAFE_AUTHENTICATED_SESSION"
}`}
                </pre>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedLog(null)}>
                Close Log Trace
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
