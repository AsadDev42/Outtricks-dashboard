import React, { useState } from 'react';
import { 
  Building2, 
  Save, 
  Copy, 
  Check, 
  Upload, 
  RotateCcw, 
  Globe, 
  ShieldCheck, 
  Calendar,
  CreditCard
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsOrganizationView: React.FC = () => {
  const { orgData, updateOrg } = useSettings();
  const { success } = useToast();
  
  const [formData, setFormData] = useState({ ...orgData });
  const [copiedId, setCopiedId] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrg(formData);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(formData.workspaceId);
    setCopiedId(true);
    success('Workspace ID copied to clipboard.', 'Copied');
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Organization Profile & Workspace Governance
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Legal business entity details, corporate domains, default workspace currencies, and compliance data retention rules.
        </p>
      </div>

      {/* 2. Workspace ID Banner */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <div className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 font-mono">
            Unique Workspace Identifier
          </div>
          <div className="font-mono text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
            <span>{formData.workspaceId}</span>
            <Badge variant="emerald" size="sm">Active Production</Badge>
          </div>
          <p className="text-slate-500 text-[11px]">
            Use this identifier for API integrations, SSO configuration, and support requests.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyId}
          leftIcon={copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        >
          {copiedId ? 'Copied ID' : 'Copy Workspace ID'}
        </Button>
      </div>

      {/* 3. Organization Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl text-xs">
          
          {/* Organization Logo */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-emerald-600/20 shrink-0">
              {formData.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <strong className="text-sm text-slate-900 dark:text-white block font-sans">
                Organization Logo
              </strong>
              <span className="text-[11px] text-slate-400 block font-mono">
                PNG, SVG, or JPEG (Max 2MB, 512x512 recommended)
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => success('Logo upload dialog triggered.', 'Upload Logo')}
                leftIcon={<Upload className="w-3.5 h-3.5" />}
              >
                Upload New Logo
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Legal Organization Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Primary Corporate Domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              required
            />

            <Input
              label="Tax ID / EIN Number"
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
            />

            <Select
              label="Default Workspace Currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              options={[
                { value: 'USD ($)', label: 'USD ($) - US Dollar' },
                { value: 'EUR (€)', label: 'EUR (€) - Euro' },
                { value: 'GBP (£)', label: 'GBP (£) - British Pound' },
                { value: 'CAD ($)', label: 'CAD ($) - Canadian Dollar' },
                { value: 'AUD ($)', label: 'AUD ($) - Australian Dollar' },
              ]}
            />

            <Select
              label="Default System Timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              options={[
                { value: 'America/Los_Angeles (PST)', label: 'America/Los_Angeles (PST, UTC-8)' },
                { value: 'America/New_York (EST)', label: 'America/New_York (EST, UTC-5)' },
                { value: 'Europe/London (GMT)', label: 'Europe/London (GMT, UTC+0)' },
                { value: 'Europe/Berlin (CET)', label: 'Europe/Berlin (CET, UTC+1)' },
                { value: 'Asia/Singapore (SGT)', label: 'Asia/Singapore (SGT, UTC+8)' },
              ]}
            />

            <Select
              label="Compliance Data Retention"
              value={formData.dataRetentionDays.toString()}
              onChange={(e) => setFormData({ ...formData, dataRetentionDays: parseInt(e.target.value, 10) })}
              options={[
                { value: '90', label: '90 Days (GDPR Lean)' },
                { value: '180', label: '180 Days (6 Months)' },
                { value: '365', label: '365 Days (1 Year Standard)' },
                { value: '730', label: '730 Days (2 Years Enterprise)' },
                { value: '0', label: 'Indefinite / Permanent' },
              ]}
            />
          </div>

          <Input
            label="Corporate Headquarters Address"
            value={formData.headquarters}
            onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setFormData({ ...orgData })}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save Organization Changes
            </Button>
          </div>

        </form>
      </div>

    </div>
  );
};
