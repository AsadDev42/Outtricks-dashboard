import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  Send, 
  Mail, 
  ExternalLink, 
  Search, 
  Flame, 
  Filter,
  Plus,
  Trash2,
  Bookmark,
  Building2,
  MapPin,
  X,
  AlertTriangle,
  FolderPlus,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInProspect } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export const LinkedInProspectsView: React.FC = () => {
  const { prospects, sendInvite, removeProspect, addProspectToCampaign, campaigns } = useLinkedIn();
  const { success } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [connectionFilter, setConnectionFilter] = useState('All');
  const [selectedProspect, setSelectedProspect] = useState<LinkedInProspect | null>(null);
  const [enrollProspect, setEnrollProspect] = useState<LinkedInProspect | null>(null);
  const [selectedCampaignName, setSelectedCampaignName] = useState(campaigns[0]?.name || 'VP Sales & RevOps Leaders Outreach');
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [deletingProspect, setDeletingProspect] = useState<LinkedInProspect | null>(null);

  // Import Form State
  const [importNames, setImportNames] = useState('');
  const [importTargetAudience, setImportTargetAudience] = useState(campaigns[0]?.name || 'VP Sales Outreach');

  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesConnection = connectionFilter === 'All' || p.connectionStatus === connectionFilter;

      return matchesSearch && matchesStatus && matchesConnection;
    });
  }, [prospects, searchQuery, statusFilter, connectionFilter]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollProspect) return;
    addProspectToCampaign(enrollProspect.id, selectedCampaignName);
    setEnrollProspect(null);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importNames.trim()) return;
    const names = importNames.split('\n').filter(n => n.trim().length > 0);
    names.forEach((nameLine) => {
      // Simulate enrolled prospect
      success(`Imported and enriched prospect: ${nameLine}`, 'Prospect Imported');
    });
    setImportNames('');
    setIsImportOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingProspect) return;
    removeProspect(deletingProspect.id);
    if (selectedProspect?.id === deletingProspect.id) {
      setSelectedProspect(null);
    }
    setDeletingProspect(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Prospects ({prospects.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified decision makers sourced from LinkedIn Sales Navigator, company signals, and profile touch radar.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsImportOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-emerald-600/20"
        >
          Import Prospects
        </Button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Prospects</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{prospects.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">1st-Degree Connected</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {prospects.filter(p => p.connectionStatus === '1st Degree').length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">In Outreach Sequence</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {prospects.filter(p => p.status === 'In Outreach').length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Avg Lead Fit Score</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">92.5 / 100</span>
        </div>
      </div>

      {/* 3. Search & Filters Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prospect name, company, title..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Stages</option>
            <option value="New">New</option>
            <option value="In Outreach">In Outreach</option>
            <option value="Replied">Replied</option>
            <option value="Converted">Converted</option>
          </select>

          <select
            value={connectionFilter}
            onChange={(e) => setConnectionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Connection Degrees</option>
            <option value="1st Degree">1st Degree</option>
            <option value="Pending">Invite Pending</option>
            <option value="Not Connected">Not Connected (2nd/3rd)</option>
          </select>
        </div>
      </div>

      {/* 4. Prospects Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Prospect Name & Title</th>
                <th className="py-3.5 px-3">Company & Location</th>
                <th className="py-3.5 px-3">Connection Status</th>
                <th className="py-3.5 px-3">Active Campaign</th>
                <th className="py-3.5 px-3">Stage</th>
                <th className="py-3.5 px-3">Lead Score</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredProspects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProspect(p)}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.title}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{p.company}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{p.location || 'United States'}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <Badge
                      variant={p.connectionStatus === '1st Degree' ? 'emerald' : p.connectionStatus === 'Pending' ? 'amber' : 'slate'}
                      size="sm"
                    >
                      {p.connectionStatus}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium max-w-xs truncate">
                    {p.campaignName}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] font-bold text-[10px] text-slate-700 dark:text-slate-300">
                      {p.status || 'In Outreach'}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                    {p.leadScore}/100
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      {p.connectionStatus !== '1st Degree' && (
                        <button
                          onClick={() => sendInvite(p.id)}
                          disabled={p.connectionStatus === 'Pending'}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            p.connectionStatus === 'Pending'
                              ? 'bg-slate-100 dark:bg-[#181818] text-slate-400'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          <Send className="w-3 h-3" />
                          <span>{p.connectionStatus === 'Pending' ? 'Pending' : 'Connect'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => setEnrollProspect(p)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                        title="Add to Campaign"
                      >
                        <FolderPlus className="w-3 h-3" />
                        <span>Enroll</span>
                      </button>

                      <button
                        onClick={() => setSelectedProspect(p)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-[#242424] text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer transition-colors"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => setDeletingProspect(p)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Remove Prospect"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add to Campaign Modal */}
      {enrollProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Enroll in Campaign</h3>
              <button onClick={() => setEnrollProspect(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">Selected Target</span>
                <strong className="text-slate-900 dark:text-white block">{enrollProspect.name}</strong>
                <span className="text-slate-500">{enrollProspect.title} @ {enrollProspect.company}</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Choose Active Campaign</label>
                <select
                  value={selectedCampaignName}
                  onChange={(e) => setSelectedCampaignName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.name}>{c.name} ({c.accountName})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setEnrollProspect(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Enroll Target
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Import Prospects Modal */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Import LinkedIn Prospects</h3>
                <p className="text-[11px] text-slate-400">Paste names or LinkedIn URLs (one per line)</p>
              </div>
              <button onClick={() => setIsImportOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Prospect Entries</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Jonathan Taylor (VP Sales @ Acme Inc)&#10;Elena Vance (CTO @ FinTech Systems)"
                  value={importNames}
                  onChange={(e) => setImportNames(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Assign To Campaign</label>
                <select
                  value={importTargetAudience}
                  onChange={(e) => setImportTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsImportOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />} className="shadow-md shadow-emerald-600/20">
                  Import & Enrich
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Prospect Detail Modal */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <img src={selectedProspect.avatar} alt={selectedProspect.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0" />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedProspect.name}</h3>
                  <span className="text-xs text-slate-400">{selectedProspect.title} @ {selectedProspect.company}</span>
                </div>
              </div>
              <button onClick={() => setSelectedProspect(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Connection</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedProspect.connectionStatus}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Lead Fit Score</span>
                  <strong className="text-emerald-600 font-mono">{selectedProspect.leadScore}/100</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Current Stage</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{selectedProspect.status}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Active Enrolled Campaign</strong>
                <p className="text-slate-700 dark:text-slate-300">{selectedProspect.campaignName}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">LinkedIn Profile Link</strong>
                <a
                  href={selectedProspect.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>{selectedProspect.profileUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              {selectedProspect.connectionStatus !== '1st Degree' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    sendInvite(selectedProspect.id);
                    setSelectedProspect(null);
                  }}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Connection Request
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => setSelectedProspect(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Delete Prospect Confirmation Modal */}
      {deletingProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Remove Prospect?</h3>
                <p className="text-[11px] text-slate-400">This will disenroll the contact.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong className="text-slate-900 dark:text-white">{deletingProspect.name}</strong> from your prospects list?
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeletingProspect(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDelete} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Remove Prospect
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
