import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminGlobalSettingsView: React.FC = () => {
  const { globalSettings, updateGlobalSettings } = useAdmin();

  const [currency, setCurrency] = useState(globalSettings.defaultCurrency);
  const [timezone, setTimezone] = useState(globalSettings.defaultTimezone);
  const [language, setLanguage] = useState(globalSettings.defaultLanguage);
  const [maintenanceNotice, setMaintenanceNotice] = useState(globalSettings.maintenanceNotice);
  const [allowPublicSignups, setAllowPublicSignups] = useState(globalSettings.allowPublicSignups);

  const [isMaintenanceConfirmOpen, setIsMaintenanceConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalSettings({
      defaultCurrency: currency,
      defaultTimezone: timezone,
      defaultLanguage: language,
      maintenanceNotice,
      allowPublicSignups,
    });
  };

  const handleToggleMaintenance = () => {
    updateGlobalSettings({
      maintenanceMode: !globalSettings.maintenanceMode,
    });
    setIsMaintenanceConfirmOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Global Platform Engine & Environment Configuration
            </h2>
            <Badge variant="emerald" size="sm">System Level</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Universal localization defaults, maintenance mode gating, and global customer access controls.
          </p>
        </div>
      </div>

      {/* 2. Global Maintenance Mode Banner */}
      <div className={`p-6 rounded-3xl border shadow-xs flex items-center justify-between gap-4 text-xs ${
        globalSettings.maintenanceMode 
          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/60' 
          : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A]'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-extrabold text-sm text-slate-950 dark:text-white">
            <AlertTriangle className={`w-4 h-4 ${globalSettings.maintenanceMode ? 'text-rose-600' : 'text-amber-500'}`} />
            <span>Platform-Wide Maintenance Mode</span>
          </div>
          <p className="text-[11px] text-slate-500">
            When enabled, all non-admin customer traffic is redirected to the maintenance notice page.
          </p>
        </div>

        <Button
          variant={globalSettings.maintenanceMode ? 'primary' : 'danger'}
          size="sm"
          onClick={() => setIsMaintenanceConfirmOpen(true)}
        >
          {globalSettings.maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
        </Button>
      </div>

      {/* 3. Global Settings Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Localization & Public Gateway
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CAD ($)">CAD ($)</option>
                <option value="AUD ($)">AUD ($)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Default Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="America/Los_Angeles (PST)">America/Los Angeles (PST)</option>
                <option value="America/New_York (EST)">America/New York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300">Default Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="German (DE)">German (DE)</option>
                <option value="French (FR)">French (FR)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Allow Public Organization Signups</div>
              <p className="text-[11px] text-slate-500">When disabled, new workspaces require manual admin invite approval.</p>
            </div>
            <Switch checked={allowPublicSignups} onChange={setAllowPublicSignups} />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">Maintenance Mode Customer Notice</label>
            <input
              type="text"
              value={maintenanceNotice}
              onChange={(e) => setMaintenanceNotice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" type="submit">
              Save Global Settings
            </Button>
          </div>
        </form>
      </div>

      {/* Maintenance Confirmation Modal */}
      {isMaintenanceConfirmOpen && (
        <AdminConfirmModal
          isOpen={isMaintenanceConfirmOpen}
          onClose={() => setIsMaintenanceConfirmOpen(false)}
          onConfirm={handleToggleMaintenance}
          title={globalSettings.maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
          description={globalSettings.maintenanceMode 
            ? 'Are you ready to restore live traffic to all customer workspaces?' 
            : 'Enabling maintenance mode will temporarily lock out non-admin users across the platform. Confirm activation?'}
          confirmText={globalSettings.maintenanceMode ? 'Restore Normal Traffic' : 'Activate Maintenance Mode'}
          variant={globalSettings.maintenanceMode ? 'primary' : 'danger'}
        />
      )}

    </div>
  );
};
