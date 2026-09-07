import React from 'react';
import { Database, CheckCircle2, ShieldCheck, HardDrive } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WorkflowDataView: React.FC = () => {
  const TABLES = [
    { name: 'leads', records: '480,240,119', size: '24.8 GB', latency: '< 2ms', description: 'Normalized global decision-makers with structured contact attributes.' },
    { name: 'companies', records: '38,190,440', size: '12.4 GB', latency: '< 2ms', description: 'Firmographics, technographics, employee growth, and active job postings.' },
    { name: 'deals', records: '14,820', size: '180 MB', latency: '< 1ms', description: 'CRM opportunities, Kanban stages, close probabilities, and ARR values.' },
    { name: 'mailbox_pool', records: '24', size: '1.2 MB', latency: '< 1ms', description: 'Rotating Google Workspace & Microsoft 365 sender reputations.' },
    { name: 'voice_call_logs', records: '8,490', size: '420 MB', latency: '< 2ms', description: 'Full WebRTC audio transcripts, objection tags, and Cal.com bookings.' },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Native PostgreSQL Data Core & Schemas
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Single source of truth with database-level idempotency and zero synchronization drift across modules.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {TABLES.map((t, idx) => (
          <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-blue-600 dark:text-blue-400">table: {t.name}</span>
                <span className="text-[10px] text-slate-400 font-sans">• {t.records} records ({t.size})</span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans">{t.description}</div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-emerald-500 font-bold">Query Latency: {t.latency}</span>
              <div className="text-[10px] text-slate-400">Indexed Primary Key</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
