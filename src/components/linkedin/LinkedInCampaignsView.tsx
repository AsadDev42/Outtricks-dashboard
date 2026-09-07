import React, { useState, useMemo } from 'react';
import { 
  Send, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Edit3, 
  Eye, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Users, 
  Calendar,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Flame,
  X,
  AlertTriangle,
  Workflow, 
  List,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { useLinkedIn, LinkedInCampaign } from '../../context/LinkedInContext';
import { LinkedInCampaignWorkspace } from './LinkedInCampaignWorkspace';

export interface LinkedInCampaignsViewProps {
  onOpenCreateCampaign: () => void;
}

export const LinkedInCampaignsView: React.FC<LinkedInCampaignsViewProps> = ({
  onOpenCreateCampaign,
}) => {
  const { 
    campaigns, 
    toggleCampaignStatus, 
    duplicateCampaign, 
    deleteCampaign, 
    updateCampaign, 
    accounts,
    selectedCampaignId,
    setSelectedCampaignId,
    selectedCampaign
  } = useLinkedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Running' | 'Paused' | 'Completed' | 'Draft'>('All');
  const [editingCampaign, setEditingCampaign] = useState<LinkedInCampaign | null>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<LinkedInCampaign | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editAudience, setEditAudience] = useState('');
  const [editAccount, setEditAccount] = useState('');
  const [editTargetCount, setEditTargetCount] = useState(300);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((camp) => {
      const matchesSearch = 
        camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.accountName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || camp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchQuery, statusFilter]);

  // Aggregate Metrics
  const totalInvites = campaigns.reduce((acc, c) => acc + c.invitesSent, 0);
  const totalConnected = campaigns.reduce((acc, c) => acc + c.connected, 0);
  const totalMessages = campaigns.reduce((acc, c) => acc + c.messagesSent, 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.meetings, 0);
  const avgAcceptance = totalInvites > 0 ? ((totalConnected / totalInvites) * 100).toFixed(1) : '38.4';
  const avgReplyRate = totalMessages > 0 ? ((totalReplied / totalMessages) * 100).toFixed(1) : '31.2';

  const handleStartEdit = (camp: LinkedInCampaign) => {
    setEditingCampaign(camp);
    setEditName(camp.name);
    setEditAudience(camp.targetAudience);
    setEditAccount(camp.accountName);
    setEditTargetCount(camp.targetCount);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign || !editName.trim()) return;
    updateCampaign(editingCampaign.id, {
      name: editName.trim(),
      targetAudience: editAudience.trim(),
      accountName: editAccount,
      targetCount: Number(editTargetCount) || 300,
    });
    setEditingCampaign(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingCampaign) return;
    deleteCampaign(deletingCampaign.id);
    if (selectedCampaignId === deletingCampaign.id) {
      setSelectedCampaignId(null);
    }
    setDeletingCampaign(null);
  };

  // If a campaign is selected, render the full multi-tab Campaign Workspace (Sequence, Leads, Launch, Performance, Settings)
  if (selectedCampaign) {
    return (
      <LinkedInCampaignWorkspace
        campaign={selectedCampaign}
        onBack={() => setSelectedCampaignId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>LinkedIn Campaigns</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage multi-channel automated LinkedIn sequences with human delay emulation. Click any campaign to open its workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateCampaign}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-md shadow-emerald-600/20"
          >
            Create Campaign
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Campaigns</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{campaigns.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Running</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {campaigns.filter((c) => c.status === 'Running').length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Invites Sent</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{totalInvites}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{avgAcceptance}%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reply Rate</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{avgReplyRate}%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Meetings Booked</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{totalMeetings}</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, audience, senders..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {(['All', 'Running', 'Paused', 'Completed', 'Draft'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {st === 'Running' ? 'Active' : st}
            </button>
          ))}
        </div>

      </div>

      {/* 4. Campaigns Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Campaign Name</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Target Audience</th>
                <th className="py-3.5 px-3 text-center">Invites</th>
                <th className="py-3.5 px-3 text-center">Connected</th>
                <th className="py-3.5 px-3 text-center">Replies</th>
                <th className="py-3.5 px-3 text-center">Meetings</th>
                <th className="py-3.5 px-3">Reply Rate</th>
                <th className="py-3.5 px-3">Created</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <Send className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">No Campaigns Found</span>
                    <p className="text-xs text-slate-400">Try adjusting your search query or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => {
                  const acceptRate = camp.invitesSent > 0 ? Math.round((camp.connected / camp.invitesSent) * 100) : 0;
                  const replyRate = camp.messagesSent > 0 ? Math.round((camp.replied / camp.messagesSent) * 100) : 0;

                  return (
                    <tr
                      key={camp.id}
                      onClick={() => setSelectedCampaignId(camp.id)}
                      className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="font-extrabold text-slate-900 dark:text-white max-w-xs truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {camp.name}
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Sender: {camp.accountName} • {camp.leadsList?.length || camp.targetCount} leads
                        </div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <Badge
                          variant={camp.status === 'Running' ? 'emerald' : camp.status === 'Paused' ? 'amber' : 'slate'}
                          size="sm"
                          dot={camp.status === 'Running'}
                        >
                          {camp.status === 'Running' ? 'Active' : camp.status}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-3 max-w-[160px] truncate text-slate-600 dark:text-slate-300 font-medium">
                        {camp.targetAudience}
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                        {camp.invitesSent}
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600">
                        {camp.connected} <span className="text-[10px] text-slate-400 font-normal">({acceptRate}%)</span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {camp.replied}
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {camp.meetings}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-slate-100 dark:bg-[#181818] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${replyRate}%` }} />
                          </div>
                          <span className="font-mono font-bold text-[11px] text-slate-700 dark:text-slate-300">{replyRate}%</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {camp.createdAt}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedCampaignId(camp.id)}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                            title="Open Workspace"
                          >
                            <Workflow className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleCampaignStatus(camp.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            title={camp.status === 'Running' ? 'Pause Campaign' : 'Resume Campaign'}
                          >
                            {camp.status === 'Running' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(camp)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            title="Edit Campaign"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => duplicateCampaign(camp.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                            title="Duplicate Campaign"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingCampaign(camp)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 cursor-pointer"
                            title="Delete Campaign"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Edit Campaign Settings</h3>
              <button 
                type="button" 
                onClick={() => setEditingCampaign(null)} 
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Target Audience</label>
                <input
                  type="text"
                  required
                  value={editAudience}
                  onChange={(e) => setEditAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Sender Account</label>
                  <select
                    value={editAccount}
                    onChange={(e) => setEditAccount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Target Count</label>
                  <input
                    type="number"
                    value={editTargetCount}
                    onChange={(e) => setEditTargetCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setEditingCampaign(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {deletingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Delete Campaign?</h3>
                <p className="text-[11px] text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to delete <strong className="text-slate-900 dark:text-white">{deletingCampaign.name}</strong>? All pending sequence steps for enrolled targets will be halted.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeletingCampaign(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDelete} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Delete Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
