import React, { useState } from 'react';
import { 
  Mail, 
  Plus, 
  Pause, 
  Play, 
  Sliders, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  RefreshCw,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSettings, SendingInboxSetting } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsSendingInboxesView: React.FC = () => {
  const { inboxes, toggleInboxStatus, addInbox, updateInboxLimit } = useSettings();
  const { success, info } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newProvider, setNewProvider] = useState<SendingInboxSetting['provider']>('Google Workspace');

  const [configInbox, setConfigInbox] = useState<SendingInboxSetting | null>(null);
  const [tempLimit, setTempLimit] = useState(50);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    addInbox({ email: newEmail, provider: newProvider });
    setNewEmail('');
    setIsAddModalOpen(false);
  };

  const handleSaveConfig = () => {
    if (configInbox) {
      updateInboxLimit(configInbox.id, tempLimit);
      setConfigInbox(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Sending Inboxes & Deliverability Pool ({inboxes.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Multi-inbox load balancing, automated warm-up engines, daily velocity caps, and real-time DNS deliverability health checks.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Sending Inbox
        </Button>
      </div>

      {/* 2. DNS Deliverability Sentinel Overview */}
      <div className="p-5 rounded-3xl bg-slate-50/80 dark:bg-[#141414]/60 border border-slate-200/80 dark:border-[#202020] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white text-xs">
              DNS Authentication Sentinel
            </div>
            <div className="text-[11px] text-slate-500">
              SPF, DKIM, DMARC, and MX records active on all configured domains
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <Badge variant="emerald" size="sm">SPF 100% Pass</Badge>
          <Badge variant="emerald" size="sm">DKIM 2048-bit Active</Badge>
          <Badge variant="emerald" size="sm">DMARC Reject Policy</Badge>
        </div>
      </div>

      {/* 3. Inboxes List Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Connected Mailboxes
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Aggregate Daily Capacity: {inboxes.reduce((acc, cur) => acc + cur.dailyLimit, 0)} emails / day
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <th className="py-3 px-4">Mailbox Email</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Daily Velocity Limit</th>
                <th className="py-3 px-4">Warm-up & Health</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {inboxes.map((ib) => (
                <tr key={ib.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {ib.email}
                  </td>

                  <td className="py-3 px-4 font-sans text-slate-600 dark:text-slate-400">
                    {ib.provider}
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={ib.status === 'Active' ? 'emerald' : ib.status === 'Warmup' ? 'primary' : 'amber'}
                      size="sm"
                      dot
                    >
                      {ib.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 font-mono">
                    <div className="space-y-1">
                      <span className="text-slate-800 dark:text-slate-200 text-xs">
                        {ib.dailySent} / {ib.dailyLimit} sent today
                      </span>
                      <div className="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-[#181818] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((ib.dailySent / ib.dailyLimit) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono">
                    <div className="flex items-center gap-2">
                      <Badge variant="emerald" size="sm">
                        Health {ib.healthScore}%
                      </Badge>
                      <span className="text-[11px] text-slate-400">
                        Warmup: {ib.warmupScore}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setConfigInbox(ib);
                          setTempLimit(ib.dailyLimit);
                        }}
                        className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Limits</span>
                      </button>

                      <button
                        onClick={() => toggleInboxStatus(ib.id)}
                        className={`text-[11px] font-bold hover:underline cursor-pointer ml-2 flex items-center gap-1 ${
                          ib.status === 'Active' ? 'text-amber-500' : 'text-emerald-500'
                        }`}
                      >
                        {ib.status === 'Active' ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>Resume</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Inbox Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Mail className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Add Sending Mailbox</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Mailbox Email Address
                </label>
                <input
                  type="email"
                  placeholder="outbound@yourdomain.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Provider / Protocol
                </label>
                <select
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Google Workspace">Google Workspace (OAuth)</option>
                  <option value="Microsoft 365">Microsoft 365 / Outlook (OAuth)</option>
                  <option value="Custom SMTP/IMAP">Custom SMTP / IMAP Gateway</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Connect & Authenticate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Configure Limits Drawer / Modal */}
      {configInbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Pacing & Daily Limits</h3>
              <button onClick={() => setConfigInbox(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-slate-400 block font-sans">Configuring:</span>
              <strong className="text-slate-900 dark:text-white">{configInbox.email}</strong>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Maximum Daily Sends:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{tempLimit} emails</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={tempLimit}
                onChange={(e) => setTempLimit(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Recommended limit for warmed-up custom domain inboxes is 40–50 sends/day.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setConfigInbox(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveConfig}>
                Save Limit
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
