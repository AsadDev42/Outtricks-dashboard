import React, { useState } from 'react';
import { 
  Bell, 
  Save, 
  Mail, 
  Smartphone, 
  Bot, 
  Flame, 
  Send, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  Radio
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useSettings } from '../../context/SettingsContext';

export const SettingsNotificationsView: React.FC = () => {
  const { notificationSettings, updateNotificationSettings } = useSettings();
  const [formData, setFormData] = useState({ ...notificationSettings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotificationSettings(formData);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Notifications Center & Real-Time Alert Triggers
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Configure multi-channel alerting rules for hot lead detections, AI agent goal completions, campaign completions, and security events.
        </p>
      </div>

      {/* 2. Notification Preferences Form */}
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Email & Digest Notifications */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Email Notifications & Executive Reports
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'emailDailyDigest', title: 'Daily Morning Executive Briefing', desc: 'Summary of replies received, outbound sent, and scheduled meetings at 08:00 AM' },
              { id: 'emailWeeklyReport', title: 'Weekly Revenue Pipeline Rollup', desc: 'Comprehensive analytics report sent every Monday morning' },
              { id: 'emailHotLeads', title: 'Instant High-Intent Reply Alerts', desc: 'Immediate email when AI classifies a prospect reply as "Interested" or "Meeting Request"' },
            ].map((item) => (
              <label
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block text-xs">{item.title}</strong>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={(formData as any)[item.id]}
                  onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 accent-emerald-500 rounded-sm focus:ring-emerald-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* AI Agent & Pipeline Alerts */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Autonomous Agent & Workflow Triggers
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'agentGoalReached', title: 'Agent Milestone Reached', desc: 'Alert when an agent fulfills its weekly target (e.g. 50 calls booked)' },
              { id: 'agentPausedError', title: 'Safety Guardrail Triggered', desc: 'Instant push when an agent pauses due to anomalous spam signals or negative sentiment' },
              { id: 'inAppApprovals', title: 'Human-in-the-Loop Review Requests', desc: 'Notify when high-value outbound copy requires manual operator sign-off' },
            ].map((item) => (
              <label
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block text-xs">{item.title}</strong>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={(formData as any)[item.id]}
                  onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 accent-emerald-500 rounded-sm focus:ring-emerald-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Lead & Deliverability Warnings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              Lead Activity & Domain Health Alerts
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'leadReplied', title: 'Prospect Reply Received', desc: 'In-app notification on any incoming prospect message across email & LinkedIn' },
              { id: 'leadMeetingBooked', title: 'Calendar Booking Confirmed', desc: 'Alert when a prospect schedules through your integrated booking link' },
              { id: 'warmupAlerts', title: 'Mailbox Deliverability Drop Warning', desc: 'Urgent alert if inbox health score dips below 90% or SPF record fails' },
            ].map((item) => (
              <label
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block text-xs">{item.title}</strong>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={(formData as any)[item.id]}
                  onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 accent-emerald-500 rounded-sm focus:ring-emerald-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Slack Webhook Channel Integration */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                Slack Channel Notification Webhook
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-[11px] text-slate-500">Enable Slack Sync:</span>
              <input
                type="checkbox"
                checked={formData.slackEnabled}
                onChange={(e) => setFormData({ ...formData, slackEnabled: e.target.checked })}
                className="w-4 h-4 text-emerald-600 accent-emerald-500 rounded-sm"
              />
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Slack Incoming Webhook URL
            </label>
            <input
              type="url"
              value={formData.slackWebhook}
              onChange={(e) => setFormData({ ...formData, slackWebhook: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setFormData({ ...notificationSettings })}
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
            Save Notification Preferences
          </Button>
        </div>

      </form>

    </div>
  );
};
