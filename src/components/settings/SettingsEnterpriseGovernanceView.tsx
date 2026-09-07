import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Globe, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  Server,
  FileCode,
  Users
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsEnterpriseGovernanceView: React.FC = () => {
  const { 
    ipAllowlist, 
    addIpAllowlist, 
    removeIpAllowlist, 
    ssoSettings, 
    updateSsoSettings 
  } = useSettings();
  const { success } = useToast();

  const [formData, setFormData] = useState({ ...ssoSettings });
  const [isAddIpModalOpen, setIsAddIpModalOpen] = useState(false);
  const [newCidr, setNewCidr] = useState('');
  const [newIpLabel, setNewIpLabel] = useState('');

  const handleSaveSso = (e: React.FormEvent) => {
    e.preventDefault();
    updateSsoSettings(formData);
  };

  const handleAddIpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCidr) return;
    addIpAllowlist(newCidr, newIpLabel || 'Corporate Range');
    setNewCidr('');
    setNewIpLabel('');
    setIsAddIpModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Enterprise Security Governance, SAML 2.0 SSO & IP Access Controls
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Configure corporate Okta/Entra SAML identity federations, SCIM v2 user provisioning, IP CIDR boundaries, and regional data residency.
        </p>
      </div>

      {/* 2. SAML 2.0 Single Sign-On Configuration */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                SAML 2.0 Single Sign-On (SSO)
              </h3>
              <p className="text-[11px] text-slate-500">
                Federate authentication with Okta, Microsoft Entra ID (Azure AD), Google Workspace, or PingFederate.
              </p>
            </div>
          </div>

          <Badge variant={formData.enabled ? 'emerald' : 'slate'} size="sm">
            {formData.enabled ? 'SAML Active' : 'Disabled'}
          </Badge>
        </div>

        <form onSubmit={handleSaveSso} className="space-y-4 max-w-2xl text-xs font-mono">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1 font-sans">
                Identity Provider (IdP) Metadata XML URL
              </label>
              <input
                type="url"
                value={formData.idpMetadataUrl}
                onChange={(e) => setFormData({ ...formData, idpMetadataUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1 font-sans">
                Service Provider Entity ID (Audience URI)
              </label>
              <input
                type="text"
                value={formData.entityId}
                readOnly
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1 font-sans">
                Assertion Consumer Service (ACS) Callback URL
              </label>
              <input
                type="text"
                value={formData.acsUrl}
                readOnly
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" type="submit" leftIcon={<Save className="w-3.5 h-3.5" />}>
              Save SSO Configuration
            </Button>
          </div>
        </form>
      </div>

      {/* 3. SCIM v2 User Provisioning */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              SCIM v2 Automated User Provisioning
            </h3>
            <p className="text-slate-500 text-[11px]">
              Automatically provision and de-provision team seats when employees join or leave your company directory.
            </p>
          </div>

          <Badge variant="emerald" size="sm">SCIM Enabled</Badge>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-[#141414]/40 border border-slate-200/80 dark:border-[#202020] space-y-2 font-mono">
          <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">SCIM Base Endpoint</span>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">{formData.scimBaseUrl}</div>
        </div>
      </div>

      {/* 4. IP Access Whitelisting */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Corporate IP Allowlist ({ipAllowlist.length})
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Restrict workspace access strictly to designated corporate VPNs and office CIDR blocks.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAddIpModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add IP Range
          </Button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.04] rounded-2xl border border-slate-200/80 dark:border-[#202020] overflow-hidden bg-slate-50/40 dark:bg-[#141414]/30">
          {ipAllowlist.map((ip) => (
            <div key={ip.id} className="p-4 flex items-center justify-between font-mono">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 dark:text-white text-xs">{ip.cidr}</strong>
                  <Badge variant="emerald" size="sm">Active</Badge>
                </div>
                <div className="text-[11px] text-slate-500 font-sans">{ip.label} • Added {ip.dateAdded}</div>
              </div>

              <button
                onClick={() => removeIpAllowlist(ip.id)}
                className="text-rose-500 font-bold hover:underline cursor-pointer text-[11px] font-sans"
              >
                Delete Range
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Data Residency Region */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Data Residency & Primary Cloud Region
        </h3>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-emerald-500" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-mono">{formData.dataResidency}</strong>
              <span className="text-[11px] text-slate-500 font-sans">All PostgreSQL tables, vectors, and audio recordings stored in this region</span>
            </div>
          </div>

          <Badge variant="emerald" size="sm">Primary Node</Badge>
        </div>
      </div>

      {/* Add IP Modal */}
      {isAddIpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Allowlist IP / CIDR Block</h3>
              <button onClick={() => setIsAddIpModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddIpSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  CIDR Block / Single IP
                </label>
                <input
                  type="text"
                  placeholder="e.g. 192.168.1.0/24 or 72.14.201.89/32"
                  value={newCidr}
                  onChange={(e) => setNewCidr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Location / Office Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. London Office Network"
                  value={newIpLabel}
                  onChange={(e) => setNewIpLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddIpModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Save IP Rule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
