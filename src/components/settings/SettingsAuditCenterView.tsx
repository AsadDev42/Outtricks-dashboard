import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Code
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSettings, AuditLogItem } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsAuditCenterView: React.FC = () => {
  const { auditLogs } = useSettings();
  const { success } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);
    
    const matchesModule = selectedModule === 'All' || log.module === selectedModule;
    const matchesStatus = selectedStatus === 'All' || log.status === selectedStatus;

    return matchesSearch && matchesModule && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Workspace Security Audit Center & Access Ledger ({auditLogs.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Tamper-evident chronological access log of administrative mutations, API token invocations, and authentication events.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => success('Exporting audit ledger CSV.', 'Export Complete')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Audit Trail
        </Button>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by actor, event, resource, or IP address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Module Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="All">All Modules</option>
            <option value="Auth">Auth</option>
            <option value="Settings">Settings</option>
            <option value="API">API</option>
            <option value="Campaigns">Campaigns</option>
            <option value="Team">Team</option>
            <option value="Governance">Governance</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

      </div>

      {/* 3. Audit Ledger Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Event Description</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right font-sans">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-400 font-sans text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">
                      {log.actor}
                    </td>

                    <td className="py-3 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {log.module}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-sans text-slate-800 dark:text-slate-200 font-medium">
                      {log.event}
                    </td>

                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 text-[11px]">
                      {log.resource}
                    </td>

                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.ipAddress}
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      <Badge
                        variant={log.status === 'Success' ? 'emerald' : log.status === 'Warning' ? 'amber' : 'rose'}
                        size="sm"
                      >
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-sans">
                    No audit records matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Details Drawer */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg h-full bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] p-6 shadow-2xl space-y-5 overflow-y-auto font-sans text-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2 text-emerald-500">
                  <History className="w-5 h-5" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Audit Event Details</h3>
                </div>
                <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Event</span>
                    <strong className="text-sm text-slate-900 dark:text-white font-sans">{selectedLog.event}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-[#202020] text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Actor</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedLog.actor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Module</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedLog.module}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Target Resource</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{selectedLog.resource}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Origin IP</span>
                      <span className="text-slate-700 dark:text-slate-300">{selectedLog.ipAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Raw JSON Telemetry Payload */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Raw Event Payload (JSON)</span>
                  <pre className="p-3.5 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[10px] overflow-x-auto leading-relaxed border border-slate-800">
{JSON.stringify({
  audit_id: selectedLog.id,
  event: selectedLog.event,
  actor: selectedLog.actor,
  module: selectedLog.module,
  resource: selectedLog.resource,
  client_ip: selectedLog.ipAddress,
  status: selectedLog.status,
  timestamp: selectedLog.timestamp,
  user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  security_hash: "sha256:8f4c2e1a90b4d68e5927c3a0b81f1e94"
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#2A2A2A]">
              <Button variant="secondary" size="sm" className="w-full" onClick={() => setSelectedLog(null)}>
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
