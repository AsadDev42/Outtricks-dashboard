import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminAuditCenterView: React.FC = () => {
  const { auditLogs } = useAdmin();
  const { success } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleExportCsv = () => {
    const headers = 'ID,Admin Name,Admin Email,Action,Target,Old Value,New Value,Timestamp,IP Address,Device,Reason\n';
    const rows = filteredLogs.map(l => 
      `"${l.id}","${l.adminName}","${l.adminEmail}","${l.action}","${l.target}","${l.oldValue || ''}","${l.newValue || ''}","${l.timestamp}","${l.ipAddress}","${l.device}","${l.reason || ''}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outtricks_admin_audit_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    success('Audit logs downloaded as CSV file.', 'Export Complete');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Immutable Governance Audit Center
            </h2>
            <Badge variant="emerald" size="sm">{auditLogs.length} Events Logged</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Cryptographically sealed audit log records of all administrative actions, plan modifications, and permission shifts.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportCsv}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export CSV Audit
        </Button>
      </div>

      {/* 2. Search & Filters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail by actor, target, or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Action Types</option>
            <option value="ASSIGN_BUNDLE">ASSIGN_BUNDLE</option>
            <option value="UPDATE_LIMIT">UPDATE_LIMIT</option>
            <option value="SUSPEND_USER">SUSPEND_USER</option>
            <option value="CREATE_PLAN">CREATE_PLAN</option>
            <option value="CREATE_USER">CREATE_USER</option>
          </select>
        </div>
      </div>

      {/* 3. Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Admin Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Old → New Delta</th>
                <th className="py-3.5 px-4">Device & IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {l.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 dark:text-white">{l.adminName}</strong>
                    <span className="text-[10px] text-slate-400 font-mono block">{l.adminEmail}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <Badge variant="emerald" size="sm">{l.action}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    {l.target}
                    {l.reason && <span className="text-[10px] text-slate-400 font-normal block">{l.reason}</span>}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {l.oldValue && <span className="text-slate-400 line-through mr-1">{l.oldValue}</span>}
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{l.newValue || 'Recorded'}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                    {l.ipAddress} • {l.device}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
