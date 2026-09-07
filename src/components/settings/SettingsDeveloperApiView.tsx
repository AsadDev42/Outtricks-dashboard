import React, { useState } from 'react';
import { 
  Key, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Activity, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  Radio, 
  Send,
  ExternalLink,
  Code
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { useSettings, ApiKeyItem, WebhookEndpoint } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsDeveloperApiView: React.FC = () => {
  const { 
    apiKeys, 
    webhooks, 
    createApiKey, 
    revokeApiKey, 
    addWebhook, 
    deleteWebhook, 
    testWebhook 
  } = useSettings();
  const { success, info } = useToast();

  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['read:leads', 'write:campaigns']);

  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const [isAddWebhookModalOpen, setIsAddWebhookModalOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState<string[]>(['lead.replied', 'meeting.booked']);

  const handleCreateKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;
    const rawKey = createApiKey(keyName, selectedScopes);
    setKeyName('');
    setIsCreateKeyModalOpen(false);
    setGeneratedSecret(rawKey);
  };

  const handleCopySecret = () => {
    if (generatedSecret) {
      navigator.clipboard.writeText(generatedSecret);
      setCopiedSecret(true);
      success('API Token copied to clipboard.', 'Token Copied');
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  const handleAddWebhookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl) return;
    addWebhook(webhookUrl, webhookEvents);
    setWebhookUrl('');
    setIsAddWebhookModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Developer REST API & Event Webhooks
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Generate programmatic bearer tokens, manage granular OAuth scopes, and configure real-time JSON webhook dispatchers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => info('Opening interactive OpenAPI / Swagger documentation.', 'API Docs')}
            leftIcon={<Code className="w-3.5 h-3.5" />}
          >
            API Reference
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateKeyModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create API Key
          </Button>
        </div>
      </div>

      {/* 2. Rate Limits & Gateway Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">Rate Limit Quota</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            1,200 Req / min
          </div>
          <span className="text-[10px] text-emerald-500 font-sans font-bold">100% Burst Allowance</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">Gateway Latency</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            42ms p99
          </div>
          <span className="text-[10px] text-slate-400 font-sans">Edge CDN Deployed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">Error Rate (24h)</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            0.00%
          </div>
          <span className="text-[10px] text-emerald-500 font-sans font-bold">Zero 5xx Invocations</span>
        </div>
      </div>

      {/* 3. API Keys Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Active API Tokens ({apiKeys.length})
        </h3>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-3 px-4">Key Name</th>
                <th className="py-3 px-4">Token Prefix</th>
                <th className="py-3 px-4">Assigned Scopes</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white">
                    {key.name}
                  </td>

                  <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                    {key.keyPrefix}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {key.scopes.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-500 font-sans">{key.createdAt}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{key.lastUsed}</td>

                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Revoke</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Webhook Endpoints Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Outbound Webhook Subscriptions ({webhooks.length})
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dispatches HMAC SHA-256 signed JSON payloads upon lead replies and meeting bookings.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAddWebhookModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Webhook
          </Button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] rounded-2xl border border-slate-200/80 dark:border-[#202020] overflow-hidden bg-slate-50/40 dark:bg-[#141414]/30">
          {webhooks.map((wh) => (
            <div key={wh.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <strong className="text-slate-900 dark:text-white text-xs truncate">{wh.url}</strong>
                  <Badge variant="emerald" size="sm">Active</Badge>
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  Subscribed Events: {wh.events.join(', ')} • Created {wh.createdAt}
                </div>
              </div>

              <div className="flex items-center gap-2 font-sans shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => testWebhook(wh.id)}
                  leftIcon={<Send className="w-3 h-3" />}
                >
                  Test Ping
                </Button>
                <button
                  onClick={() => deleteWebhook(wh.id)}
                  className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Key Modal */}
      {isCreateKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Key className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Generate API Token</h3>
              </div>
              <button onClick={() => setIsCreateKeyModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateKeySubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Key Description / Application Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. HubSpot CRM Sync Engine"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  OAuth Scopes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'read:leads',
                    'write:leads',
                    'read:campaigns',
                    'write:campaigns',
                    'execute:workflows',
                    'read:deals',
                  ].map((scope) => (
                    <label key={scope} className="p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-2 cursor-pointer font-mono text-[10px]">
                      <input
                        type="checkbox"
                        checked={selectedScopes.includes(scope)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedScopes([...selectedScopes, scope]);
                          } else {
                            setSelectedScopes(selectedScopes.filter(s => s !== scope));
                          }
                        }}
                        className="rounded-sm text-emerald-600 accent-emerald-500"
                      />
                      <span>{scope}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsCreateKeyModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Key className="w-3.5 h-3.5" />}>
                  Generate Key
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generated Key Secret Reveal Modal */}
      {generatedSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">API Token Generated</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Please copy this secret key now. For security purposes, you will not be able to view it again.
            </p>

            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="truncate pr-2">{generatedSecret}</span>
              <button
                onClick={handleCopySecret}
                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shrink-0"
              >
                {copiedSecret ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setGeneratedSecret(null)}>
                I Have Stored the Key
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Webhook Modal */}
      {isAddWebhookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Radio className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Add Webhook Endpoint</h3>
              </div>
              <button onClick={() => setIsAddWebhookModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWebhookSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  HTTPS Endpoint URL
                </label>
                <input
                  type="url"
                  placeholder="https://api.yourcompany.com/webhooks"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Trigger Events
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['lead.replied', 'meeting.booked', 'campaign.completed', 'deal.won'].map((ev) => (
                    <label key={ev} className="p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-2 cursor-pointer font-mono text-[10px]">
                      <input
                        type="checkbox"
                        checked={webhookEvents.includes(ev)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setWebhookEvents([...webhookEvents, ev]);
                          } else {
                            setWebhookEvents(webhookEvents.filter(x => x !== ev));
                          }
                        }}
                        className="rounded-sm text-emerald-600 accent-emerald-500"
                      />
                      <span>{ev}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddWebhookModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Radio className="w-3.5 h-3.5" />}>
                  Register Webhook
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
