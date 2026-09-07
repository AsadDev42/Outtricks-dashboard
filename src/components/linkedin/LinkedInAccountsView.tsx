import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Globe,
  Pause,
  Play,
  RotateCw,
  Trash2,
  Sliders,
  X,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInAccount } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export interface LinkedInAccountsViewProps {
  onOpenConnectAccount: () => void;
}

export const LinkedInAccountsView: React.FC<LinkedInAccountsViewProps> = ({
  onOpenConnectAccount,
}) => {
  const { accounts, toggleAccountStatus, disconnectAccount } = useLinkedIn();
  const { success } = useToast();

  const [selectedAccount, setSelectedAccount] = useState<LinkedInAccount | null>(null);
  const [editingLimitsAccount, setEditingLimitsAccount] = useState<LinkedInAccount | null>(null);
  const [disconnectingAccount, setDisconnectingAccount] = useState<LinkedInAccount | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Limit edit form state
  const [invitesLimit, setInvitesLimit] = useState(25);
  const [actionsLimit, setActionsLimit] = useState(60);

  const handleStartEditLimits = (acc: LinkedInAccount) => {
    setEditingLimitsAccount(acc);
    setInvitesLimit(acc.dailyInvitesLimit || 25);
    setActionsLimit(acc.dailyActionsLimit || 60);
  };

  const handleSaveLimits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLimitsAccount) return;
    editingLimitsAccount.dailyInvitesLimit = Number(invitesLimit) || 25;
    editingLimitsAccount.dailyActionsLimit = Number(actionsLimit) || 60;
    success(`Limits for ${editingLimitsAccount.name} updated: ${invitesLimit} invites/day.`, 'Limits Saved');
    setEditingLimitsAccount(null);
  };

  const handleConfirmDisconnect = () => {
    if (!disconnectingAccount) return;
    disconnectAccount(disconnectingAccount.id);
    if (selectedAccount?.id === disconnectingAccount.id) {
      setSelectedAccount(null);
    }
    setDisconnectingAccount(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>LinkedIn Accounts ({accounts.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage authenticated sender profiles with dedicated residential IP proxy isolation and automated warmup pacing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              Table
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenConnectAccount}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-md shadow-emerald-600/20"
          >
            Add Account
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Connected Profiles</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{accounts.length} Profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Average Safety Score</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">98.4 / 100</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Network Reach</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {accounts.reduce((acc, a) => acc + a.connectionCount, 0).toLocaleString()} 1st-Deg
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Residential Proxy Isolation</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">100% Dedicated</span>
        </div>
      </div>

      {/* 3. Accounts View (Cards Mode) */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const usagePercent = Math.round(((acc.actionsUsedToday || 30) / (acc.dailyActionsLimit || 60)) * 100);

            return (
              <div
                key={acc.id}
                onClick={() => setSelectedAccount(acc)}
                className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shadow-2xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                        {acc.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {acc.title}
                      </div>
                      <a
                        href={acc.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>View Profile</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  <Badge
                    variant={acc.status === 'Connected' ? 'emerald' : acc.status === 'Warming' ? 'amber' : 'slate'}
                    size="sm"
                    dot={acc.status === 'Connected'}
                  >
                    {acc.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Daily Actions Budget:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {acc.actionsUsedToday || 32} / {acc.dailyActionsLimit || 60} ({usagePercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Proxy Specs Card */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="truncate">{acc.proxyIp}</span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold">Safety: {acc.safetyScore}/100</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{acc.proxyLocation}</span>
                    <span>{acc.connectionCount?.toLocaleString()} 1st-Deg</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#202020] text-xs" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleAccountStatus(acc.id)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                  >
                    {acc.status === 'Connected' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                    <span>{acc.status === 'Connected' ? 'Pause Sync' : 'Resume Sync'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEditLimits(acc)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                      title="Configure Limits & Pacing"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedAccount(acc)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setDisconnectingAccount(acc)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                      title="Disconnect Account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Account Name</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Safety Score</th>
                <th className="py-3.5 px-3">Network Size</th>
                <th className="py-3.5 px-3">Daily Actions Usage</th>
                <th className="py-3.5 px-3">Dedicated Residential IP</th>
                <th className="py-3.5 px-3">Last Sync</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {accounts.map((acc) => (
                <tr
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc)}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{acc.name}</div>
                        <div className="text-[10px] text-slate-400">{acc.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge variant={acc.status === 'Connected' ? 'emerald' : 'slate'} size="sm">
                      {acc.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                    {acc.safetyScore}%
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {acc.connectionCount?.toLocaleString()} Connections
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    {acc.actionsUsedToday || 32} / {acc.dailyActionsLimit || 60}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300">
                    {acc.proxyIp}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                    {acc.lastSync || '2m ago'}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedAccount(acc)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Edit Limits Modal */}
      {editingLimitsAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Safety Limits & Human Pacing</h3>
              <button onClick={() => setEditingLimitsAccount(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLimits} className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">{editingLimitsAccount.name}</strong>
                <span className="text-slate-500">{editingLimitsAccount.proxyIp}</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Daily Invites Cap</label>
                <input
                  type="number"
                  max={40}
                  min={5}
                  value={invitesLimit}
                  onChange={(e) => setInvitesLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                />
                <span className="text-[10px] text-slate-400">Recommended safe cap: 25 invites/day</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Daily Actions Limit (Total)</label>
                <input
                  type="number"
                  max={100}
                  min={10}
                  value={actionsLimit}
                  onChange={(e) => setActionsLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                />
                <span className="text-[10px] text-slate-400">Includes profile visits, invites, and message dispatches</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setEditingLimitsAccount(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Pacing Limits
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <img src={selectedAccount.avatar} alt={selectedAccount.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0" />
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedAccount.name}</h3>
                  <span className="text-xs text-slate-400">{selectedAccount.title}</span>
                </div>
              </div>
              <button onClick={() => setSelectedAccount(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <strong className="text-emerald-600 font-mono">{selectedAccount.status}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Safety Score</span>
                  <strong className="text-emerald-600 font-mono">{selectedAccount.safetyScore} / 100</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Network Size</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedAccount.connectionCount?.toLocaleString()}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Dedicated Residential Proxy Allocation</strong>
                <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">{selectedAccount.proxyIp}</p>
                <p className="text-[10px] text-slate-400">Node Location: {selectedAccount.proxyLocation} • Protocol: SOCKS5 Residential 4G</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Anti-Ban Limits & Pacing</strong>
                <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                  <span>Daily Invite Cap: {selectedAccount.dailyInvitesLimit || 25} Invites/Day</span>
                  <span>Human Delay Pacing: 45s-120s</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  toggleAccountStatus(selectedAccount.id);
                  setSelectedAccount(null);
                }}
              >
                {selectedAccount.status === 'Connected' ? 'Pause Account' : 'Resume Account'}
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedAccount(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Disconnect Account Confirmation Modal */}
      {disconnectingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Disconnect Account?</h3>
                <p className="text-[11px] text-slate-400">Dedicated proxy will be released.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to disconnect <strong className="text-slate-900 dark:text-white">{disconnectingAccount.name}</strong>? Active campaigns mapped to this account will be paused.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDisconnectingAccount(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDisconnect} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Disconnect Profile
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
