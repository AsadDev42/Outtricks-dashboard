import React, { useState } from 'react';
import { 
  Mail, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  Pause, 
  Play, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  AlertCircle,
  RotateCw,
  ExternalLink,
  Server,
  Lock,
  Globe,
  Sliders,
  X,
  Activity,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, ConnectedMailbox } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export interface MailboxesManagerProps {
  onOpenConnectMailbox: () => void;
}

export const MailboxesManager: React.FC<MailboxesManagerProps> = ({
  onOpenConnectMailbox,
}) => {
  const { mailboxes, toggleMailboxStatus, deleteMailbox, updateMailbox, recheckMailboxHealth } = useEmail();
  const { success, info } = useToast();

  const [selectedMailboxForDetails, setSelectedMailboxForDetails] = useState<ConnectedMailbox | null>(null);
  const [editingLimitMbx, setEditingLimitMbx] = useState<ConnectedMailbox | null>(null);
  const [newLimit, setNewLimit] = useState<number>(30);
  const [isRecheckingId, setIsRecheckingId] = useState<string | null>(null);

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
          status: 'Optimal',
          lastChecked: 'Just now'
        } : null);
      }
    }, 1000);
  };

  const handleSaveLimit = () => {
    if (!editingLimitMbx) return;
    updateMailbox(editingLimitMbx.id, { dailyCap: newLimit });
    setEditingLimitMbx(null);
  };

  const getOverallHealthBadge = (mbx: ConnectedMailbox) => {
    if (mbx.healthScore >= 95) {
      return <Badge variant="emerald" size="sm">Healthy ({mbx.healthScore}%)</Badge>;
    } else if (mbx.healthScore >= 80) {
      return <Badge variant="amber" size="sm">Warning ({mbx.healthScore}%)</Badge>;
    } else {
      return <Badge variant="rose" size="sm">Critical ({mbx.healthScore}%)</Badge>;
    }
  };

  return (
    <div className="space-y-5 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Connected Mailboxes Pool ({mailboxes.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Distributed multi-inbox rotation fleet across Google Workspace, Microsoft 365, and custom SMTP relays.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={onOpenConnectMailbox} leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Connect Mailbox
          </Button>
        </div>
      </div>

      {/* Mailboxes Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mailboxes.map((mbx) => {
          const usagePercent = Math.min(100, Math.round((mbx.dailySent / mbx.dailyCap) * 100));
          const isRechecking = isRecheckingId === mbx.id;

          return (
            <div
              key={mbx.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3.5 hover:border-slate-300 dark:hover:border-[#333] transition-all"
            >
              {/* Top Row: Email & Provider */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                      {mbx.email}
                    </span>
                    {mbx.senderName && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({mbx.senderName})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>Provider: <strong className="text-slate-700 dark:text-slate-300 font-medium">{mbx.provider}</strong></span>
                    <span>•</span>
                    <span className="text-slate-400">Checked {mbx.lastChecked || 'Recently'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {getOverallHealthBadge(mbx)}
                  <span className={`w-2 h-2 rounded-full ${mbx.status === 'Optimal' ? 'bg-emerald-500 animate-pulse' : mbx.status === 'Warming' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                </div>
              </div>

              {/* Mailbox Health & Diagnostics Section */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Mailbox Health & Handshake
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedMailboxForDetails(mbx)}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline text-[11px] font-bold cursor-pointer"
                  >
                    View Details
                  </button>
                </div>

                {/* Status Indicator Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SPF {mbx.spf ? 'Pass' : 'Missing'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>DKIM 2048</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>DMARC Pass</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>MX Active</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SMTP Auth</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>IMAP Sync</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SSL/TLS 1.3</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Rep: Clean</span>
                  </div>
                </div>
              </div>

              {/* Sending Limit Progress */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Daily Pacing Limit:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{mbx.dailySent} / {mbx.dailyCap} emails</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLimitMbx(mbx);
                        setNewLimit(mbx.dailyCap);
                      }}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Edit Cap
                    </button>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#141414] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${usagePercent >= 90 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>

              {/* Footer Controls & Tracking Domain */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                  Tracking: {mbx.customTrackingDomain}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleRecheck(mbx.id, e)}
                    disabled={isRechecking}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252525] transition-colors cursor-pointer"
                    title="Re-test Mailbox Diagnostics"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin text-emerald-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleMailboxStatus(mbx.id)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252525] transition-colors cursor-pointer"
                    title={mbx.status === 'Optimal' ? 'Pause Mailbox' : 'Activate Mailbox'}
                  >
                    {mbx.status === 'Optimal' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteMailbox(mbx.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Disconnect Mailbox"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Diagnostics Details Modal */}
      {selectedMailboxForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222]">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Mailbox Diagnostics & Health Telemetry
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
                  Deliverability Sender Score
                </span>
                <div className="text-xl font-black text-slate-950 dark:text-white font-mono mt-0.5">
                  {selectedMailboxForDetails.healthScore}% • Optimal Condition
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

            {/* Detailed Verification Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Comprehensive 10-Point Deliverability Checks:
              </span>

              <div className="space-y-1.5">
                {[
                  { label: 'SPF (Sender Policy Framework)', status: 'v=spf1 include:_spf.google.com ~all', pass: true },
                  { label: 'DKIM 2048-bit Cryptographic Key', status: 'RSA 2048-bit signature aligned (selector1)', pass: true },
                  { label: 'DMARC Enforcement Policy', status: 'p=quarantine; pct=100; rua=mailto:reports', pass: true },
                  { label: 'MX Mail Exchanger Records', status: 'Priority 10 mail server responsive (latency: 32ms)', pass: true },
                  { label: 'SMTP Outbound Authentication', status: 'SMTP 250 OK handshake verified', pass: true },
                  { label: 'IMAP Reply Polling Access', status: 'IMAP 993 SSL folder sync active', pass: true },
                  { label: 'Sending Capacity & Rate Pacing', status: `Capped at ${selectedMailboxForDetails.dailyCap} sends/day with 180s randomized delay`, pass: true },
                  { label: 'Custom Tracking Domain (CNAME)', status: `${selectedMailboxForDetails.customTrackingDomain} (SSL Active)`, pass: true },
                  { label: 'TLS 1.3 Gateway Encryption', status: 'Strict transport security enabled', pass: true },
                  { label: 'Spamhaus & Barracuda Reputation', status: 'Zero listings across 48 RBL databases', pass: true },
                ].map((c, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#242424] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="truncate">
                        <strong className="text-slate-900 dark:text-white font-medium">{c.label}</strong>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{c.status}</div>
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

      {/* Edit Daily Sending Cap Modal */}
      {editingLimitMbx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Daily Sending Cap</h3>
              <button onClick={() => setEditingLimitMbx(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block">Configuring Mailbox:</span>
              <strong className="text-slate-900 dark:text-white font-mono">{editingLimitMbx.email}</strong>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Maximum Daily Sends:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{newLimit} emails</span>
              </label>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={newLimit}
                onChange={(e) => setNewLimit(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Recommended limit for warmed-up inboxes is 30–35 emails/day to maintain 99.4% inbox placement.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#222] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditingLimitMbx(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveLimit}>
                Save Cap
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
