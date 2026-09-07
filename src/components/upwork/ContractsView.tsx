import React from 'react';
import { Layers, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useUpwork } from '../../context/UpworkContext';

export const ContractsView: React.FC = () => {
  const { contracts } = useUpwork();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Active & Completed Upwork Contracts ({contracts.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Escrow milestone progress, weekly hourly timesheet limits, and contract earnings ledger.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {contracts.map((con) => (
          <div key={con.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{con.title}</span>
                <Badge variant="emerald" size="sm">{con.status}</Badge>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Client: {con.clientName} • Type: {con.contractType} • Started {con.startDate}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase">Earned on Contract</div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                ${con.totalEarned.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
