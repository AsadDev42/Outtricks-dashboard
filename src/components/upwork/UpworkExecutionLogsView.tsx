import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Radio, 
  Filter,
  ShieldCheck,
  Send,
  HelpCircle
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useUpwork, UpworkExecutionLog } from '../../context/UpworkContext';

export const UpworkExecutionLogsView: React.FC = () => {
  const { executionLogs } = useUpwork();
  const [filter, setFilter] = useState<'all' | 'success' | 'skipped' | 'failed'>('all');

  const filteredLogs = executionLogs.filter((log) => {
    if (filter === 'success') return log.status === 'Success';
    if (filter === 'skipped') return log.status === 'Skipped';
    if (filter === 'failed') return log.status === 'Failed';
    return true;
  });

  const getStatusBadge = (status: UpworkExecutionLog['status']) => {
    switch (status) {
      case 'Success':
        return <Badge variant="emerald" size="sm">DISPATCHED / QUALIFIED</Badge>;
      case 'Skipped':
        return <Badge variant="amber" size="sm">POLICY SKIPPED</Badge>;
      case 'Failed':
        return <Badge variant="rose" size="sm">SAFETY BLOCKED</Badge>;
      case 'Queued':
      default:
        return <Badge variant="blue" size="sm">QUEUED</Badge>;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header & Filter Controls */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Real-Time Radar & Auto-Bid Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Transparent audit log tracking all background scans, proposal creations, and explicit skip reasons.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#262626] text-xs">
          {(['all', 'success', 'skipped', 'failed'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
                filter === t
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Logs' : t === 'success' ? 'Dispatched' : t === 'skipped' ? 'Skipped' : 'Blocked'}
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No logs match the current filter.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]/40 transition-colors">
              <div className="space-y-1.5 min-w-0 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {log.action}
                  </span>
                  {getStatusBadge(log.status)}
                  {log.radarName && (
                    <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                      {log.radarName}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">• {log.timestamp}</span>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {log.jobTitle} <span className="text-slate-400">({log.clientName})</span>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {log.details}
                </div>

                {/* Explicit Skip Reason Box */}
                {log.skipReason && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-mono flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span><strong>Skip Reason:</strong> {log.skipReason}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                <span className="text-emerald-500 font-mono font-bold text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Safe API</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
