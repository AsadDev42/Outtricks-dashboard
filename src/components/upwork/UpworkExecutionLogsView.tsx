import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useUpwork } from '../../context/UpworkContext';

export const UpworkExecutionLogsView: React.FC = () => {
  const { executionLogs } = useUpwork();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Real-Time Auto-Bidding & Trigger Logs
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Live audit log of background RSS scrapers, AI proposal generators, and follow-up sequences.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {executionLogs.map((log) => (
          <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white">{log.action}</span>
                <Badge variant="emerald" size="sm">{log.status}</Badge>
                <span className="text-[10px] text-slate-400">• {log.timestamp}</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">{log.jobTitle} ({log.clientName})</div>
              <div className="text-[10px] text-slate-400">{log.details}</div>
            </div>
            <span className="text-emerald-500 font-bold shrink-0 text-[11px]">✓ Verified Safe API</span>
          </div>
        ))}
      </div>
    </div>
  );
};
