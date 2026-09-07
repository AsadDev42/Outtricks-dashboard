import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  Clock,
  Bot,
  Download,
  RotateCw,
  X,
  ExternalLink
} from 'lucide-react';
import { useAgents, AgentLog } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AgentLogsView: React.FC = () => {
  const { logs, searchQuery } = useAgents();
  const { success } = useToast();

  const [logStatusFilter, setLogStatusFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AgentLog | null>(null);

  const filteredLogs = logs.filter((log) => {
    const query = localSearch || searchQuery;
    const matchesSearch = 
      log.agentName.toLowerCase().includes(query.toLowerCase()) ||
      log.action.toLowerCase().includes(query.toLowerCase()) ||
      log.targetRecord.toLowerCase().includes(query.toLowerCase()) ||
      log.result.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = logStatusFilter === 'all' || log.status === logStatusFilter;
    const matchesAgent = agentFilter === 'all' || log.agentName.toLowerCase().includes(agentFilter.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesAgent && matchesAction;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Agent', 'Module', 'Action', 'Target', 'Result', 'Status'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.agentName}"`,
      `"${l.module}"`,
      `"${l.action}"`,
      `"${l.targetRecord}"`,
      `"${l.result}"`,
      `"${l.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agent_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Exported audit logs to CSV.', 'Download Complete');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-emerald-500" />
            <span>Activity Audit Logs</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Complete history of autonomous agent actions, tool invocations, and workspace mutations.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20 w-48 sm:w-56"
            />
          </div>

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Agents</option>
            <option value="sdr">SDR Outreach</option>
            <option value="linkedin">LinkedIn Safe Bot</option>
            <option value="upwork">Upwork Bidding</option>
            <option value="research">DeepContext Researcher</option>
          </select>

          <select
            value={logStatusFilter}
            onChange={(e) => setLogStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Log Levels</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
            <option value="Info">Info</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/80 dark:border-[#2A2A2A]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => success('Audit logs refreshed.', 'Refreshed')}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Logs Feed Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        <div className="w-full max-w-full overflow-x-auto min-w-0 no-scrollbar">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-28">TIMESTAMP</th>
                <th className="py-3 px-3">AGENT ACTOR</th>
                <th className="py-3 px-3">MODULE</th>
                <th className="py-3 px-3">ACTION TAKEN</th>
                <th className="py-3 px-3">TARGET RECORD</th>
                <th className="py-3 px-3">OUTCOME / RESULT</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{log.agentName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-sans">
                    {log.targetRecord}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-sans max-w-xs truncate">
                    {log.result}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Badge variant={log.status === 'Success' ? 'emerald' : log.status === 'Warning' ? 'amber' : log.status === 'Error' ? 'rose' : 'emerald'}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Log Entry Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Audit Record: {selectedLog.id}</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedLog.action}</h3>
                <span className="text-xs text-slate-400">Timestamp: {selectedLog.timestamp}</span>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Agent Actor</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedLog.agentName}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Module</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedLog.module}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Target Record Context</strong>
                <p className="text-slate-700 dark:text-slate-300">{selectedLog.targetRecord}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1 font-mono text-[11px]">
                <strong className="text-slate-900 dark:text-white block font-sans text-xs">Full Result Payload</strong>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{selectedLog.result}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
