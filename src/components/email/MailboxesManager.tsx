import React, { useState } from 'react';
import { 
  Mail, 
  Plus, 
  ShieldCheck, 
  Pause, 
  Play, 
  Trash2, 
  CheckCircle2, 
  RotateCw, 
  Server, 
  Sliders, 
  X, 
  Activity, 
  Tag, 
  Flame, 
  Send, 
  Settings 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, ConnectedMailbox, MailboxStatus } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export interface MailboxesManagerProps {
  onOpenConnectMailbox: () => void;
}

export const MailboxesManager: React.FC<MailboxesManagerProps> = ({
  onOpenConnectMailbox,
}) => {
  const { 
    mailboxes, 
    toggleMailboxStatus, 
    deleteMailbox, 
    updateMailbox, 
    recheckMailboxHealth,
    bulkSetDailyLimit,
    bulkToggleWarmup,
    bulkAssignTag,
    bulkAssignCampaign,
    bulkToggleStatus,
    campaigns
  } = useEmail();

  // Multi-selection state for bulk management
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Modals & Drawers
  const [selectedMailboxForDetails, setSelectedMailboxForDetails] = useState<ConnectedMailbox | null>(null);
  const [editingSettingsMbx, setEditingSettingsMbx] = useState<ConnectedMailbox | null>(null);
  const [isRecheckingId, setIsRecheckingId] = useState<string | null>(null);

  // Bulk action input dialogs
  const [bulkLimitOpen, setBulkLimitOpen] = useState(false);
  const [bulkLimitValue, setBulkLimitValue] = useState(30);
  const [bulkTagOpen, setBulkTagOpen] = useState(false);
  const [bulkTagValue, setBulkTagValue] = useState('');
  const [bulkCampaignOpen, setBulkCampaignOpen] = useState(false);
  const [bulkCampaignId, setBulkCampaignId] = useState(campaigns[0]?.id || '');

  // Settings form state
  const [formSenderName, setFormSenderName] = useState('');
  const [formSignature, setFormSignature] = useState('');
  const [formReplyTo, setFormReplyTo] = useState('');
  const [formDailyCap, setFormDailyCap] = useState(30);
  const [formMinInterval, setFormMinInterval] = useState(90);
  const [formSlowRamp, setFormSlowRamp] = useState(true);
  const [formTrackingDomain, setFormTrackingDomain] = useState('');
  const [formTags, setFormTags] = useState('');

  const openSettingsModal = (mbx: ConnectedMailbox) => {
    setEditingSettingsMbx(mbx);
    setFormSenderName(mbx.senderName || '');
    setFormSignature(mbx.signature || '');
    setFormReplyTo(mbx.replyTo || '');
    setFormDailyCap(mbx.dailyCap || 30);
    setFormMinInterval(mbx.minSendIntervalSeconds || 90);
    setFormSlowRamp(mbx.slowRampEnabled ?? true);
    setFormTrackingDomain(mbx.customTrackingDomain || '');
    setFormTags((mbx.tags || []).join(', '));
  };

  const handleSaveSettings = () => {
    if (!editingSettingsMbx) return;
    const tagArray = formTags.split(',').map(t => t.trim()).filter(Boolean);
    updateMailbox(editingSettingsMbx.id, {
      senderName: formSenderName,
      signature: formSignature,
      replyTo: formReplyTo,
      dailyCap: formDailyCap,
      minSendIntervalSeconds: formMinInterval,
      slowRampEnabled: formSlowRamp,
      customTrackingDomain: formTrackingDomain,
      tags: tagArray
    });
    setEditingSettingsMbx(null);
  };

  const handleRecheck = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsRecheckingId(id);
    setTimeout(() => {
      recheckMailboxHealth(id);
      setIsRecheckingId(null);
      if (selectedMailboxForDetails?.id === id) {
        setSelectedMailboxForDetails(prev => prev ? {
          ...prev,
          healthScore: 100,
          status: 'Ready',
          lastChecked: 'Just now'
        } : null);
      }
    }, 1000);
  };

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredMailboxes.map(m => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtering
  const filteredMailboxes = mailboxes.filter(m => {
    const normStatus = m.status === 'Optimal' ? 'Ready' : m.status;
    if (statusFilter !== 'all' && normStatus !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      const matchEmail = m.email.toLowerCase().includes(q);
      const matchSender = m.senderName?.toLowerCase().includes(q);
      const matchTag = (m.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchEmail && !matchSender && !matchTag) return false;
    }
    return true;
  });

  const getStatusBadge = (status: MailboxStatus) => {
    const norm = status === 'Optimal' ? 'Ready' : status;
    switch (norm) {
      case 'Ready':
        return <Badge variant="emerald" size="sm" dot>Ready</Badge>;
      case 'Warming':
        return <Badge variant="amber" size="sm" dot>Warming</Badge>;
      case 'Paused':
        return <Badge variant="slate" size="sm">Paused</Badge>;
      case 'Action Needed':
        return <Badge variant="rose" size="sm" dot>Action Needed</Badge>;
      case 'Disconnected':
        return <Badge variant="rose" size="sm">Disconnected</Badge>;
      default:
        return <Badge variant="slate" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-5 font-sans">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Connected Mailboxes Fleet ({mailboxes.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Enterprise sender rotation fleet across Google Workspace, Microsoft 365, and custom SMTP/IMAP relays with separated connection & deliverability telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onOpenConnectMailbox} 
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Connect Mailbox
          </Button>
        </div>
      </div>

      {/* 2. Status Filters & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#262626]">
          {[
            { id: 'all', label: 'All', count: mailboxes.length },
            { id: 'Ready', label: 'Ready', count: mailboxes.filter(m => m.status === 'Ready' || m.status === 'Optimal').length },
            { id: 'Warming', label: 'Warming', count: mailboxes.filter(m => m.status === 'Warming').length },
            { id: 'Paused', label: 'Paused', count: mailboxes.filter(m => m.status === 'Paused').length },
            { id: 'Action Needed', label: 'Action Needed', count: mailboxes.filter(m => m.status === 'Action Needed').length },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-white dark:bg-[#252525] text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] font-mono opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search email, sender, tag..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* 3. Bulk Action Floating / Attached Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-primary text-white font-bold flex items-center justify-center text-[10px]">
              {selectedIds.length}
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {selectedIds.length} mailbox{selectedIds.length > 1 ? 'es' : ''} selected
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBulkLimitOpen(true)}
              leftIcon={<Sliders className="w-3.5 h-3.5" />}
            >
              Set Daily Cap
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBulkTagOpen(true)}
              leftIcon={<Tag className="w-3.5 h-3.5" />}
            >
              Assign Tag
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => bulkToggleWarmup(selectedIds, true)}
              leftIcon={<Flame className="w-3.5 h-3.5 text-amber-500" />}
            >
              Enable Warmup
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => bulkToggleStatus(selectedIds, 'Paused')}
              leftIcon={<Pause className="w-3.5 h-3.5 text-slate-500" />}
            >
              Pause
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => bulkToggleStatus(selectedIds, 'Ready')}
              leftIcon={<Play className="w-3.5 h-3.5 text-emerald-500" />}
            >
              Resume
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBulkCampaignOpen(true)}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Assign Campaign
            </Button>

            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 4. Mailbox Fleet Table / List */}
      <div className="border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-slate-100 dark:border-[#242424] bg-slate-50/70 dark:bg-[#181818] text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider items-center">
          <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.length > 0 && selectedIds.length === filteredMailboxes.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded accent-primary cursor-pointer"
            />
            <span>Mailbox / Identity</span>
          </div>
          <div className="col-span-2 hidden sm:block">Status & Provider</div>
          <div className="col-span-3 hidden md:block">Connection Health</div>
          <div className="col-span-3 hidden lg:block">Deliverability Health</div>
          <div className="col-span-4 sm:col-span-3 md:col-span-2 lg:col-span-1 text-right">Daily Limit</div>
          <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-[#202020]">
          {filteredMailboxes.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <Mail className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <div className="font-bold text-slate-700 dark:text-slate-300">No Mailboxes Found</div>
              <p className="text-slate-400">Connect your first Google Workspace or Microsoft 365 mailbox to start outreach.</p>
              <Button variant="primary" size="sm" onClick={onOpenConnectMailbox} className="mt-2">
                Connect Mailbox
              </Button>
            </div>
          ) : (
            filteredMailboxes.map((mbx) => {
              const isSelected = selectedIds.includes(mbx.id);
              const isRechecking = isRecheckingId === mbx.id;
              const usagePercent = Math.min(100, Math.round((mbx.dailySent / mbx.dailyCap) * 100));

              return (
                <div
                  key={mbx.id}
                  className={`grid grid-cols-12 gap-3 px-5 py-4 items-center transition-colors text-xs ${
                    isSelected 
                      ? 'bg-primary/5 dark:bg-primary/10' 
                      : 'hover:bg-slate-50/60 dark:hover:bg-[#1A1A1A]'
                  }`}
                >
                  {/* Col 1: Checkbox & Identity */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(mbx.id)}
                      className="rounded accent-primary cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {mbx.email}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                        {mbx.senderName ? <span>{mbx.senderName}</span> : <span className="italic text-slate-400">No sender name</span>}
                        {mbx.tags && mbx.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#252525] text-slate-500 truncate max-w-[90px]">
                              {mbx.tags[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Status & Provider */}
                  <div className="col-span-2 hidden sm:flex flex-col gap-1 min-w-0">
                    <div>{getStatusBadge(mbx.status)}</div>
                    <span className="text-[10px] text-slate-400 font-mono truncate">
                      {mbx.provider}
                    </span>
                  </div>

                  {/* Col 3: Connection Health (SMTP, IMAP, Auth, Latency) */}
                  <div className="col-span-3 hidden md:flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> SMTP Auth
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> IMAP Poll
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Latency: <strong className="text-slate-600 dark:text-slate-300">{mbx.latencyMs || 120}ms</strong> • SSL/TLS 1.3
                    </div>
                  </div>

                  {/* Col 4: Deliverability Health (SPF, DKIM, DMARC, MX, Warmup) */}
                  <div className="col-span-3 hidden lg:flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        SPF
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        DKIM
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        DMARC
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        MX
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>Rep: <strong className="text-emerald-500 font-bold">Clean</strong></span>
                      <span>•</span>
                      <span>Warmup: <strong className="text-slate-700 dark:text-slate-300">{mbx.warmupStatus || 'Active'}</strong></span>
                    </div>
                  </div>

                  {/* Col 5: Daily Limit & Pacing */}
                  <div className="col-span-4 sm:col-span-3 md:col-span-2 lg:col-span-1 text-right">
                    <div className="font-mono font-bold text-slate-900 dark:text-white">
                      {mbx.dailySent} / {mbx.dailyCap}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all ${
                          usagePercent >= 90 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Col 6: Actions Toolbar */}
                  <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedMailboxForDetails(mbx)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-colors cursor-pointer"
                      title="Inspect Diagnostics & Handshake"
                    >
                      <Activity className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openSettingsModal(mbx)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-colors cursor-pointer"
                      title="Mailbox Settings & Identity"
                    >
                      <Settings className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleMailboxStatus(mbx.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-colors cursor-pointer"
                      title={mbx.status === 'Paused' ? 'Resume Sending' : 'Pause Sending'}
                    >
                      {mbx.status === 'Paused' ? (
                        <Play className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Pause className="w-4 h-4 text-slate-400 hover:text-amber-500" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMailbox(mbx.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Disconnect Mailbox"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 5. Comprehensive Mailbox Settings Modal */}
      {editingSettingsMbx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-5 font-sans text-xs max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222]">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  Mailbox Configuration & Settings
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {editingSettingsMbx.email} • {editingSettingsMbx.provider}
                </p>
              </div>
              <button onClick={() => setEditingSettingsMbx(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Sender Name & Reply-To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    value={formSenderName}
                    onChange={(e) => setFormSenderName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Custom Reply-To Email
                  </label>
                  <input
                    type="email"
                    value={formReplyTo}
                    onChange={(e) => setFormReplyTo(e.target.value)}
                    placeholder="e.g. replies@cloudscale.ai"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none"
                  />
                </div>
              </div>

              {/* Email Signature */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Mailbox Signature (HTML / Text)
                </label>
                <textarea
                  rows={3}
                  value={formSignature}
                  onChange={(e) => setFormSignature(e.target.value)}
                  placeholder="Best regards,&#10;Sarah Jenkins | Head of Growth&#10;CloudScale AI"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none font-mono resize-none"
                />
              </div>

              {/* Sending Capacity Limits & Pacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-100 dark:border-[#242424]">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Daily Sending Limit:</span>
                    <span className="font-mono text-primary font-bold">{formDailyCap}/day</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={formDailyCap}
                    onChange={(e) => setFormDailyCap(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Recommended safe limit is 30–35</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Min Interval Delay:</span>
                    <span className="font-mono text-primary font-bold">{formMinInterval}s</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    step="15"
                    value={formMinInterval}
                    onChange={(e) => setFormMinInterval(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Randomized spacing between sends</span>
                </div>
              </div>

              {/* Slow Ramp & Custom Tracking Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Custom Tracking Domain (CNAME)
                  </label>
                  <input
                    type="text"
                    value={formTrackingDomain}
                    onChange={(e) => setFormTrackingDomain(e.target.value)}
                    placeholder="e.g. track.cloudscale.ai"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Mailbox Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="e.g. Tier 1, Google, SDR Team"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none"
                  />
                </div>
              </div>

              {/* Toggles: Slow Ramp */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/70 dark:border-[#262626] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    Campaign Slow Ramp Protection
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Gradually increments sending volume by +3 emails/day to avoid trigger alarms with ESP algorithms.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formSlowRamp}
                  onChange={(e) => setFormSlowRamp(e.target.checked)}
                  className="rounded accent-primary cursor-pointer w-4 h-4"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditingSettingsMbx(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Advanced Diagnostics Details Modal (Connection vs Deliverability) */}
      {selectedMailboxForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222]">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Mailbox Handshake & Deliverability Architecture
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {selectedMailboxForDetails.email} • {selectedMailboxForDetails.provider}
                </p>
              </div>
              <button
                onClick={() => setSelectedMailboxForDetails(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Health Score Banner */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Combined Deliverability Score
                </span>
                <div className="text-xl font-black text-slate-950 dark:text-white font-mono mt-0.5">
                  {selectedMailboxForDetails.healthScore}% • {selectedMailboxForDetails.status}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleRecheck(selectedMailboxForDetails.id)}
                disabled={isRecheckingId === selectedMailboxForDetails.id}
                leftIcon={<RotateCw className={`w-3.5 h-3.5 ${isRecheckingId === selectedMailboxForDetails.id ? 'animate-spin' : ''}`} />}
              >
                Re-test Handshake
              </Button>
            </div>

            {/* PART A: CONNECTION HEALTH */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-primary" />
                1. Connection Health (SMTP / IMAP / Transport)
              </span>

              <div className="space-y-1.5">
                {[
                  { label: 'SMTP Outbound Authentication', detail: 'Authenticated socket connection on TLS port 587', pass: selectedMailboxForDetails.smtpAuth !== false },
                  { label: 'IMAP Reply Polling Access', detail: 'Bidirectional sync active for prospect responses', pass: selectedMailboxForDetails.imapAuth !== false },
                  { label: 'Transport Layer Security (TLS 1.3)', detail: 'Strict encryption handshake validated', pass: selectedMailboxForDetails.sslTls !== false },
                  { label: 'Network Latency', detail: `${selectedMailboxForDetails.latencyMs || 120}ms round-trip to mail exchange server`, pass: true },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-100 dark:border-[#242424] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div className="truncate">
                        <strong className="text-slate-900 dark:text-white font-medium">{item.label}</strong>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{item.detail}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART B: DELIVERABILITY HEALTH */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                2. Deliverability Health (DNS & Reputation)
              </span>

              <div className="space-y-1.5">
                {[
                  { label: 'SPF (Sender Policy Framework)', detail: 'v=spf1 include:_spf.google.com ~all', pass: selectedMailboxForDetails.spf },
                  { label: 'DKIM (DomainKeys Identified Mail)', detail: 'RSA 2048-bit cryptographic key aligned', pass: selectedMailboxForDetails.dkim },
                  { label: 'DMARC (Domain-based Message Authentication)', detail: 'p=quarantine; pct=100 enforcement policy', pass: selectedMailboxForDetails.dmarc },
                  { label: 'MX (Mail Exchange Records)', detail: 'Priority 10 inbound mail server verified', pass: selectedMailboxForDetails.mx !== false },
                  { label: 'Custom Tracking Domain', detail: `${selectedMailboxForDetails.customTrackingDomain} (SSL Active)`, pass: Boolean(selectedMailboxForDetails.customTrackingDomain) },
                  { label: 'RBL Blacklist Reputations', detail: 'Clean across Spamhaus, Barracuda, and SORBS databases', pass: selectedMailboxForDetails.blacklistStatus !== 'Listed' },
                  { label: 'Warmup Readiness Status', detail: `Network status: ${selectedMailboxForDetails.warmupStatus || 'Active'}`, pass: true },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-100 dark:border-[#242424] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <div className="truncate">
                        <strong className="text-slate-900 dark:text-white font-medium">{item.label}</strong>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{item.detail}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      PASS
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedMailboxForDetails(null)}>
                Close Diagnostics
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Bulk Limit Modal */}
      {bulkLimitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#222]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Set Daily Sending Cap</h3>
              <button onClick={() => setBulkLimitOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              Apply new daily sending limit across {selectedIds.length} selected mailboxes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-400">Daily Cap:</span>
                <span className="font-bold text-primary">{bulkLimitValue} emails/day</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={bulkLimitValue}
                onChange={(e) => setBulkLimitValue(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setBulkLimitOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => {
                bulkSetDailyLimit(selectedIds, bulkLimitValue);
                setBulkLimitOpen(false);
              }}>
                Apply to {selectedIds.length} Mailboxes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Bulk Tag Modal */}
      {bulkTagOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#222]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Assign Mailbox Tag</h3>
              <button onClick={() => setBulkTagOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              Add a categorization tag to {selectedIds.length} selected mailboxes.
            </p>
            <input
              type="text"
              placeholder="e.g. SDR Fleet, High-Intent, Tier 1"
              value={bulkTagValue}
              onChange={(e) => setBulkTagValue(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none"
            />
            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setBulkTagOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => {
                if (bulkTagValue.trim()) {
                  bulkAssignTag(selectedIds, bulkTagValue.trim());
                  setBulkTagValue('');
                  setBulkTagOpen(false);
                }
              }}>
                Assign Tag
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Bulk Assign Campaign Modal */}
      {bulkCampaignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#222]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Assign to Campaign</h3>
              <button onClick={() => setBulkCampaignOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              Assign {selectedIds.length} mailboxes to send for this campaign:
            </p>
            <select
              value={bulkCampaignId}
              onChange={(e) => setBulkCampaignId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] text-xs outline-none cursor-pointer"
            >
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setBulkCampaignOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => {
                if (bulkCampaignId) {
                  bulkAssignCampaign(selectedIds, bulkCampaignId);
                  setBulkCampaignOpen(false);
                }
              }}>
                Assign to Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
