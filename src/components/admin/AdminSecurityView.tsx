import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin } from '../../context/AdminContext';

export const AdminSecurityView: React.FC = () => {
  const { globalSettings, updateGlobalSettings } = useAdmin();

  const [enforce2FA, setEnforce2FA] = useState(globalSettings.enforce2FA);
  const [sessionTimeout, setSessionTimeout] = useState(globalSettings.sessionTimeoutHours.toString());
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(globalSettings.maxLoginAttempts.toString());
  const [ipAllowlist, setIpAllowlist] = useState('192.168.0.0/24, 10.0.0.0/16');

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalSettings({
      enforce2FA,
      sessionTimeoutHours: parseInt(sessionTimeout) || 24,
      maxLoginAttempts: parseInt(maxLoginAttempts) || 5,
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Security Governance & Authentication Policies
            </h2>
            <Badge variant="emerald" size="sm">SOC2 Type II</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Configure universal multi-factor authentication requirements, session expiry timeouts, and IP CIDR allowlists.
          </p>
        </div>
      </div>

      {/* 2. Security Policies Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Authentication & Access Restrictions
        </h3>

        <form onSubmit={handleSaveSecurity} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 2FA Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 dark:text-white">Mandatory Two-Factor Authentication (2FA)</div>
                <p className="text-[11px] text-slate-500">Enforces TOTP authenticator app verification on all admin logins.</p>
              </div>
              <Switch checked={enforce2FA} onChange={setEnforce2FA} />
            </div>

            {/* Max Login Attempts */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <label className="font-bold text-slate-900 dark:text-white block">Max Login Attempts (Brute-Force Lockout)</label>
              <input
                type="number"
                value={maxLoginAttempts}
                onChange={(e) => setMaxLoginAttempts(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
            </div>

            {/* Session Timeout */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <label className="font-bold text-slate-900 dark:text-white block">Session Idle Timeout (Hours)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
            </div>

            {/* IP Allowlist */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <label className="font-bold text-slate-900 dark:text-white block">Admin IP Range Allowlist (CIDRs)</label>
              <input
                type="text"
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
              />
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" type="submit">
              Save Security Policies
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};
