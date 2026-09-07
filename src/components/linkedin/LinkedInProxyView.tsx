import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  RotateCw, 
  Plus, 
  Server,
  Zap,
  Trash2,
  Activity,
  AlertTriangle,
  X,
  UserCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLinkedIn, LinkedInProxy } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export const LinkedInProxyView: React.FC = () => {
  const { proxies, addProxy, removeProxy, testProxy, accounts } = useLinkedIn();
  const { success } = useToast();

  const [isAddProxyOpen, setIsAddProxyOpen] = useState(false);
  const [newProxyIP, setNewProxyIP] = useState('');
  const [newProxyLocation, setNewProxyLocation] = useState('New York, US');
  const [newProxyAccount, setNewProxyAccount] = useState('Unassigned Pool');
  const [newProxyType, setNewProxyType] = useState<'Residential 4G' | 'Static Residential' | 'Datacenter'>('Residential 4G');
  const [deletingProxy, setDeletingProxy] = useState<LinkedInProxy | null>(null);

  const healthyCount = proxies.filter(p => p.status === 'Healthy').length;
  const warningCount = proxies.filter(p => p.status === 'Warning').length;
  const offlineCount = proxies.filter(p => p.status === 'Offline').length;

  const handleCreateProxy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProxyIP.trim()) return;
    addProxy({
      ip: newProxyIP.trim(),
      location: newProxyLocation,
      assignedAccount: newProxyAccount,
      type: newProxyType,
      port: 8443,
    });
    setNewProxyIP('');
    setIsAddProxyOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingProxy) return;
    removeProxy(deletingProxy.id);
    setDeletingProxy(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Proxy Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Static 4G mobile and residential IPs mapped 1:1 to LinkedIn accounts to prevent IP clustering and shadowbans.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              proxies.forEach(p => testProxy(p.id));
            }}
            leftIcon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Test All Nodes
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddProxyOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-md shadow-emerald-600/20"
          >
            Add Proxy
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Proxy Nodes</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{proxies.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Healthy Nodes</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{healthyCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Degraded / Warning</span>
          <span className="text-xl font-extrabold text-amber-500 font-mono">{warningCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Offline Nodes</span>
          <span className="text-xl font-extrabold text-rose-500 font-mono">{offlineCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Avg Pool Latency</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">44ms</span>
        </div>
      </div>

      {/* 3. Proxies Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider font-sans">
                <th className="py-3.5 px-4">Proxy Node Name & IP</th>
                <th className="py-3.5 px-3">Location</th>
                <th className="py-3.5 px-3">IP Type</th>
                <th className="py-3.5 px-3">Assigned Account</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Latency</th>
                <th className="py-3.5 px-3">Last Ping</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] font-mono">
              {proxies.map((prx) => (
                <tr
                  key={prx.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white font-sans text-xs">{prx.name || prx.ip}</div>
                        <div className="text-[10px] text-slate-400">{prx.ip}:{prx.port || 8443} (SOCKS5)</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-sans text-xs">
                    {prx.location}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px]">
                      {prx.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-sans text-xs font-semibold text-slate-900 dark:text-white">
                    {prx.assignedAccount}
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge
                      variant={prx.status === 'Healthy' ? 'emerald' : prx.status === 'Warning' ? 'amber' : 'rose'}
                      size="sm"
                    >
                      {prx.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 font-bold text-emerald-600">
                    {prx.latency}
                  </td>

                  <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                    {prx.lastChecked || 'Just now'}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 font-sans">
                      <button
                        onClick={() => testProxy(prx.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Test</span>
                      </button>

                      <button
                        onClick={() => setDeletingProxy(prx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Remove Proxy"
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

      {/* 4. Add Proxy Modal */}
      {isAddProxyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Add Residential Proxy Node</h3>
              <button onClick={() => setIsAddProxyOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProxy} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Proxy IP Address & Port</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 198.51.100.220"
                  value={newProxyIP}
                  onChange={(e) => setNewProxyIP(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Geo Location</label>
                <input
                  type="text"
                  placeholder="e.g. New York, United States"
                  value={newProxyLocation}
                  onChange={(e) => setNewProxyLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Assign To Account</label>
                <select
                  value={newProxyAccount}
                  onChange={(e) => setNewProxyAccount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  <option value="Unassigned Pool">Unassigned Pool</option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Node Type</label>
                <select
                  value={newProxyType}
                  onChange={(e) => setNewProxyType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  <option value="Residential 4G">Residential 4G (High Trust)</option>
                  <option value="Static Residential">Static Residential (Standard)</option>
                  <option value="Datacenter">Datacenter (Fast)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsAddProxyOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add & Test Proxy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Proxy Confirmation Modal */}
      {deletingProxy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Delete Proxy Node?</h3>
                <p className="text-[11px] text-slate-400">This proxy will be removed from pool.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong className="text-slate-900 dark:text-white">{deletingProxy.ip}</strong>?
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeletingProxy(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDelete} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Remove Proxy
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
