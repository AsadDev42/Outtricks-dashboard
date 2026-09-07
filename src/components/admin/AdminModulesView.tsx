import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Briefcase, 
  Bot, 
  Workflow, 
  BarChart3, 
  Inbox, 
  Settings, 
  ShieldCheck, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Lock,
  Eye,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin, AdminModuleConfig } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminModulesView: React.FC = () => {
  const { 
    modules, 
    plans, 
    bundles, 
    toggleModuleEnabled, 
    toggleModuleMaintenance, 
    updateModuleConfig 
  } = useAdmin();

  const [moduleToToggle, setModuleToToggle] = useState<{ id: string; name: string; currentEnabled: boolean } | null>(null);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Bot': return Bot;
      case 'Layers': return Layers;
      case 'Search': return Search;
      case 'Inbox': return Inbox;
      case 'Mail': return Mail;
      case 'Linkedin': return Linkedin;
      case 'PhoneCall': return PhoneCall;
      case 'Briefcase': return Briefcase;
      case 'Workflow': return Workflow;
      case 'BarChart3': return BarChart3;
      case 'ShieldCheck': return ShieldCheck;
      default: return Settings;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Modules & Functional Availability
            </h2>
            <Badge variant="emerald" size="sm">{modules.length} Core Modules</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Globally enable or disable modules, set maintenance status, and attach prerequisite subscription plans or product bundles.
          </p>
        </div>
      </div>

      {/* 2. Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const Icon = getModuleIcon(mod.icon);
          const isSystemProtected = mod.id === 'admin' || mod.id === 'settings';

          return (
            <div
              key={mod.id}
              className={`p-6 rounded-3xl border shadow-xs space-y-4 flex flex-col justify-between transition-all text-xs ${
                mod.enabled 
                  ? 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A]' 
                  : 'bg-slate-50/70 dark:bg-[#0D0D0D]/40 border-slate-200 dark:border-[#2A2A2A] opacity-80'
              }`}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      mod.enabled 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-slate-100 dark:bg-[#181818] text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                        {mod.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">Module ID: {mod.id}</span>
                    </div>
                  </div>

                  <Badge variant={mod.enabled ? 'emerald' : 'slate'} size="sm">
                    {mod.enabled ? 'Live' : 'Disabled'}
                  </Badge>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {mod.description}
                </p>

                {/* Maintenance Mode Flag */}
                {mod.maintenanceMode && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Maintenance Mode Active for this module</span>
                  </div>
                )}

                {/* Visibility Controls */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Access Visibility</span>
                    <select
                      value={mod.visibility}
                      disabled={isSystemProtected}
                      onChange={(e) => updateModuleConfig(mod.id, { visibility: e.target.value as any })}
                      className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-[11px] focus:outline-none"
                    >
                      <option value="all">Universal (All Users)</option>
                      <option value="plan-required">Plan Gated</option>
                      <option value="bundle-required">Bundle Gated</option>
                      <option value="admin-only">Admin Only</option>
                    </select>
                  </div>

                  {mod.visibility === 'bundle-required' && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">Required Bundle</span>
                      <select
                        value={mod.requiredBundleId || ''}
                        onChange={(e) => updateModuleConfig(mod.id, { requiredBundleId: e.target.value })}
                        className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-[11px] focus:outline-none"
                      >
                        <option value="">Select Bundle...</option>
                        {bundles.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#202020] gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Module Status</span>
                  <Switch
                    checked={mod.enabled}
                    disabled={isSystemProtected}
                    onChange={() => {
                      if (!isSystemProtected) {
                        setModuleToToggle({ id: mod.id, name: mod.name, currentEnabled: mod.enabled });
                      }
                    }}
                  />
                </div>

                <Button
                  variant={mod.maintenanceMode ? 'primary' : 'secondary'}
                  size="sm"
                  disabled={isSystemProtected}
                  onClick={() => toggleModuleMaintenance(mod.id)}
                  className="text-[11px]"
                >
                  {mod.maintenanceMode ? 'Clear Maintenance' : 'Set Maintenance'}
                </Button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {moduleToToggle && (
        <AdminConfirmModal
          isOpen={Boolean(moduleToToggle)}
          onClose={() => setModuleToToggle(null)}
          onConfirm={() => {
            if (moduleToToggle) toggleModuleEnabled(moduleToToggle.id);
            setModuleToToggle(null);
          }}
          title={`${moduleToToggle.currentEnabled ? 'Disable' : 'Enable'} Module: ${moduleToToggle.name}`}
          description={`Are you sure you want to ${moduleToToggle.currentEnabled ? 'disable' : 'enable'} ${moduleToToggle.name}? When disabled, this module immediately disappears from the main sidebar for non-admin users.`}
          confirmText={moduleToToggle.currentEnabled ? 'Disable Module' : 'Enable Module'}
          variant={moduleToToggle.currentEnabled ? 'danger' : 'primary'}
        />
      )}

    </div>
  );
};
