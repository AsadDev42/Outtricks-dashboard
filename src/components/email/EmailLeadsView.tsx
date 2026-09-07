import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  ExternalLink, 
  Building2, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Download,
  Flame,
  MessageSquare
} from 'lucide-react';
import { useEmail, EmailLead } from '../../context/EmailContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export const EmailLeadsView: React.FC = () => {
  const { emailLeads, campaigns, sequences } = useEmail();
  const { success, info } = useToast();

  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<EmailLead | null>(null);

  const filteredLeads = useMemo(() => {
    return emailLeads.filter((lead) => {
      if (campaignFilter !== 'all' && lead.campaignId !== campaignFilter) return false;
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = lead.name.toLowerCase().includes(q);
        const matchesEmail = lead.email.toLowerCase().includes(q);
        const matchesCompany = lead.company.toLowerCase().includes(q);
        const matchesTitle = lead.title.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesCompany && !matchesTitle) return false;
      }
      return true;
    });
  }, [emailLeads, search, campaignFilter, statusFilter]);

  const handleExportCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      ['Name,Email,Company,Title,Campaign,Status,Opens,Clicks,Replies,Last Activity']
      .concat(filteredLeads.map(l => `"${l.name}","${l.email}","${l.company}","${l.title}","${l.campaignName}","${l.status}",${l.opensCount},${l.clicksCount},${l.repliesCount},"${l.lastActivity}"`))
      .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `email_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success(`Exported ${filteredLeads.length} email leads to CSV.`, 'CSV Exported');
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Header & Search Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search email leads by name, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            />
          </div>

          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Campaigns ({campaigns.length})</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Lead Statuses</option>
            <option value="Replied">Replied (Hot)</option>
            <option value="Opened">Opened</option>
            <option value="Clicked">Clicked</option>
            <option value="Contacted">Contacted</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Bounced">Bounced</option>
            <option value="Unsubscribed">Unsubscribed</option>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({filteredLeads.length})</span>
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Lead Contact</th>
                <th className="py-3.5 px-4">Campaign & Sequence</th>
                <th className="py-3.5 px-4">Deliverability</th>
                <th className="py-3.5 px-4">Engagement</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    <Users className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                    <p className="font-bold text-slate-600 dark:text-slate-300">No Email Leads Match Your Filter</p>
                    <p className="text-slate-400 text-[11px]">Adjust your search query or campaign selection above.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{lead.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{lead.email}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{lead.title} • {lead.company}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {lead.campaignName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Step {lead.currentStep}: {lead.sequenceName}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
                          lead.verificationStatus === 'Deliverable'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800/40'
                            : lead.verificationStatus === 'Risky'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800/40'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800/40'
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          <span>{lead.verificationStatus}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                          <span title="Opens" className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-slate-400" />
                            <strong>{lead.opensCount}</strong>
                          </span>
                          <span title="Clicks" className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                            <strong>{lead.clicksCount}</strong>
                          </span>
                          <span title="Replies" className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-emerald-500" />
                            <strong>{lead.repliesCount}</strong>
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'Replied'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800/40'
                            : lead.status === 'Opened' || lead.status === 'Clicked'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : lead.status === 'Bounced' || lead.status === 'Unsubscribed'
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800/40'
                            : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400'
                        }`}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {lead.lastActivity}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold"
                        >
                          View Activity
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Slideover Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white">{selectedLead.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedLead.email}</p>
                <p className="text-xs text-slate-500 font-medium">{selectedLead.title} at {selectedLead.company}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              
              {/* Campaign Enrollment Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Active Campaign Details</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <div>Campaign: <strong>{selectedLead.campaignName}</strong></div>
                  <div>Sequence: <strong>{selectedLead.sequenceName}</strong></div>
                  <div>Current Step: <strong>Step {selectedLead.currentStep}</strong></div>
                  <div>Status: <strong className="text-emerald-600 dark:text-emerald-400">{selectedLead.status}</strong></div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{selectedLead.opensCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Opens</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{selectedLead.clicksCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Clicks</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{selectedLead.repliesCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Replies</div>
                </div>
              </div>

              {/* Timeline Feed */}
              <div className="space-y-3">
                <div className="font-bold text-slate-900 dark:text-white">Email Outreach Timeline</div>
                <div className="space-y-2">
                  {selectedLead.history.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-[#202020] flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{h.action} (Step {h.step})</div>
                        {h.detail && <p className="text-[11px] text-slate-500 mt-0.5">{h.detail}</p>}
                        <div className="text-[10px] text-slate-400 font-mono mt-1">{h.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  info(`${selectedLead.email} added to suppression list.`, 'Suppressed');
                  setSelectedLead(null);
                }}
                className="text-xs text-rose-600 border-rose-200 dark:border-rose-800/40"
              >
                Unsubscribe & Suppress
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedLead(null)}
                className="text-xs font-bold"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
