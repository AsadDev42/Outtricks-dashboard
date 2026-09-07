import React, { useState } from 'react';
import { 
  Share2, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Trash2, 
  X, 
  AlertTriangle,
  Globe,
  Briefcase
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSettings, ConnectedAccountItem } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsConnectedAccountsView: React.FC = () => {
  const { connectedAccounts, connectAccount, disconnectAccount, reconnectAccount } = useSettings();
  const { success, info } = useToast();

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'LinkedIn' | 'Google' | 'Microsoft' | 'Twilio' | 'Upwork'>('Google');
  const [accountName, setAccountName] = useState('');
  const [accountToDisconnect, setAccountToDisconnect] = useState<ConnectedAccountItem | null>(null);

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectAccount({
      name: accountName || `${selectedChannel} Workspace Account`,
      channel: selectedChannel,
      detail: selectedChannel === 'LinkedIn' ? 'Residential 4G Proxy Node Attached' : 'OAuth 2.0 Token Initialized',
      status: 'Connected',
      type: selectedChannel === 'LinkedIn' ? 'Residential Proxy' : selectedChannel === 'Twilio' ? 'SIP Trunk' : 'OAuth 2.0'
    });
    setAccountName('');
    setIsConnectModalOpen(false);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'LinkedIn': return Linkedin;
      case 'Google': return Mail;
      case 'Microsoft': return Mail;
      case 'Twilio': return PhoneCall;
      case 'Upwork': return Briefcase;
      default: return Share2;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Connected Channels & Third-Party Integrations ({connectedAccounts.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Native OAuth channel tokens, cloud residential proxies, voice WebRTC gateways, and external API connections.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsConnectModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Connect Channel Account
        </Button>
      </div>

      {/* 2. Connected Accounts List */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {connectedAccounts.map((conn) => {
          const Icon = getChannelIcon(conn.channel);

          return (
            <div key={conn.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {conn.name}
                    </span>
                    <Badge variant={conn.status === 'Connected' ? 'emerald' : 'amber'} size="sm" dot>
                      {conn.status}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {conn.detail} • Type: <span className="font-bold text-slate-700 dark:text-slate-300">{conn.type}</span> • Last Sync: {conn.lastSync}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => reconnectAccount(conn.id)}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Verify Session
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAccountToDisconnect(conn)}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Account Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Share2 className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Connect Channel Account</h3>
              </div>
              <button onClick={() => setIsConnectModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConnectSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Select Channel Provider
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'LinkedIn', label: 'LinkedIn Account', icon: Linkedin },
                    { id: 'Google', label: 'Google Workspace', icon: Mail },
                    { id: 'Microsoft', label: 'Microsoft 365', icon: Mail },
                    { id: 'Twilio', label: 'Twilio Voice AI', icon: PhoneCall },
                    { id: 'Upwork', label: 'Upwork API', icon: Briefcase },
                  ].map((chan) => {
                    const Icon = chan.icon;
                    return (
                      <button
                        key={chan.id}
                        type="button"
                        onClick={() => setSelectedChannel(chan.id as any)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          selectedChannel === chan.id
                            ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                            : 'border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-bold">{chan.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Account Display Label / Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sales Team LinkedIn / outreach@company.com"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsConnectModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Authorize & Connect
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disconnect Confirmation Modal */}
      {accountToDisconnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-rose-600">Disconnect Account</h3>
              <button onClick={() => setAccountToDisconnect(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to disconnect <strong className="text-slate-900 dark:text-white">{accountToDisconnect.name}</strong>? Active campaigns utilizing this channel will be paused.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setAccountToDisconnect(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  disconnectAccount(accountToDisconnect.id);
                  setAccountToDisconnect(null);
                }}
              >
                Confirm Disconnect
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
