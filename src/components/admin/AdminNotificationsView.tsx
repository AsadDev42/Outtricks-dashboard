import React, { useState } from 'react';
import { Bell, ShieldAlert, Mail, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useToast } from '../../context/ToastContext';

export const AdminNotificationsView: React.FC = () => {
  const { success } = useToast();

  const [systemAlerts, setSystemAlerts] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [usageThresholdAlerts, setUsageThresholdAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [failedAutomationAlerts, setFailedAutomationAlerts] = useState(true);
  const [adminSlackWebhook, setAdminSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Administrative alert preferences saved.', 'Notifications Updated');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Incident Alerts & System Notifications
            </h2>
            <Badge variant="emerald" size="sm">Real-Time Dispatch</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Configure automated Slack webhook webhooks, operational anomaly alerts, and billing threshold notifications.
          </p>
        </div>
      </div>

      {/* 2. Notification Preferences Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 text-xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">System Infrastructure Alerts</div>
                <p className="text-[11px] text-slate-500">Alerts when API gateway latency exceeds 500ms or node degrades.</p>
              </div>
              <Switch checked={systemAlerts} onChange={setSystemAlerts} />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Billing & Payment Failures</div>
                <p className="text-[11px] text-slate-500">Instant notification when a customer charge fails or dispute occurs.</p>
              </div>
              <Switch checked={billingAlerts} onChange={setBillingAlerts} />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">80% / 95% Quota Usage Thresholds</div>
                <p className="text-[11px] text-slate-500">Alerts when a client approaches their monthly sending limits.</p>
              </div>
              <Switch checked={usageThresholdAlerts} onChange={setUsageThresholdAlerts} />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Security & 2FA Anomaly Alerts</div>
                <p className="text-[11px] text-slate-500">High-priority alert for brute-force lockouts or foreign IP logins.</p>
              </div>
              <Switch checked={securityAlerts} onChange={setSecurityAlerts} />
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
            <label className="font-bold text-slate-900 dark:text-white block">Central Administrative Slack Webhook URL</label>
            <input
              type="text"
              value={adminSlackWebhook}
              onChange={(e) => setAdminSlackWebhook(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" type="submit">
              Save Notification Rules
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};
