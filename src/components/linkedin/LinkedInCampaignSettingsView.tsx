import React, { useState } from 'react';
import { 
  Sliders, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Calendar, 
  User, 
  Save, 
  RotateCw,
  Globe,
  Lock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LinkedInCampaign, useLinkedIn } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export interface LinkedInCampaignSettingsViewProps {
  campaign: LinkedInCampaign;
}

export const LinkedInCampaignSettingsView: React.FC<LinkedInCampaignSettingsViewProps> = ({ campaign }) => {
  const { updateCampaign, accounts } = useLinkedIn();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<'general' | 'schedule' | 'limits' | 'safety' | 'stop_conditions'>('general');

  // Form states
  const [name, setName] = useState(campaign.name);
  const [description, setDescription] = useState(campaign.description || '');
  const [accountName, setAccountName] = useState(campaign.accountName);
  const [timezone, setTimezone] = useState(campaign.schedule?.timezone || 'Europe/London (GMT+1)');
  const [startHour, setStartHour] = useState(campaign.schedule?.startHour || '09:00');
  const [endHour, setEndHour] = useState(campaign.schedule?.endHour || '17:00');
  const [days, setDays] = useState<string[]>(campaign.schedule?.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  // Limits
  const [dailyInvites, setDailyInvites] = useState(campaign.limits?.dailyInvites || 20);
  const [dailyMessages, setDailyMessages] = useState(campaign.limits?.dailyMessages || 30);
  const [dailyVisits, setDailyVisits] = useState(campaign.limits?.dailyVisits || 30);

  // Safety
  const [randomDelayMin, setRandomDelayMin] = useState(campaign.safety?.randomDelayMinSeconds || 180);
  const [randomDelayMax, setRandomDelayMax] = useState(campaign.safety?.randomDelayMaxSeconds || 420);
  const [warmupMode, setWarmupMode] = useState(campaign.safety?.warmupMode ?? true);

  // Stop conditions (Section 12)
  const [stopOnReply, setStopOnReply] = useState(campaign.stopConditions?.stopOnReply ?? true);
  const [stopOnConnection, setStopOnConnection] = useState(campaign.stopConditions?.stopOnConnection ?? false);
  const [stopOnManualContact, setStopOnManualContact] = useState(campaign.stopConditions?.stopOnManualContact ?? true);
  const [stopOnRemoved, setStopOnRemoved] = useState(campaign.stopConditions?.stopOnRemoved ?? true);

  const toggleDay = (day: string) => {
    if (days.includes(day)) {
      if (days.length > 1) setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCampaign(campaign.id, {
      name,
      description,
      accountName,
      schedule: {
        days,
        startHour,
        endHour,
        timezone,
      },
      limits: {
        dailyInvites: Number(dailyInvites),
        dailyMessages: Number(dailyMessages),
        dailyVisits: Number(dailyVisits),
      },
      safety: {
        randomDelayMinSeconds: Number(randomDelayMin),
        randomDelayMaxSeconds: Number(randomDelayMax),
        warmupMode,
        proxyLocation: campaign.safety?.proxyLocation || 'United Kingdom',
      },
      stopConditions: {
        stopOnReply,
        stopOnConnection,
        stopOnManualContact,
        stopOnRemoved,
      }
    });
    success('Campaign settings saved successfully.', 'Settings Saved');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-sans text-xs">
      
      {/* 1. Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] overflow-x-auto">
        {[
          { id: 'general', label: 'General & Account' },
          { id: 'schedule', label: 'Schedule & Timezone' },
          { id: 'limits', label: 'Daily Limits' },
          { id: 'safety', label: 'Safety & Pacing' },
          { id: 'stop_conditions', label: 'Stop Conditions' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#252525] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Tab Content Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
        
        {/* TAB 1: GENERAL & ACCOUNT */}
        {activeTab === 'general' && (
          <div className="space-y-4 max-w-xl">
            <Input
              label="Campaign Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Campaign Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Internal notes or campaign objective..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Sender LinkedIn Account</label>
              <select
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white cursor-pointer font-medium"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name} ({a.proxyLocation} • Proxy Active)
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEDULE & TIMEZONE */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white cursor-pointer font-medium"
              >
                <option value="Europe/London (GMT+1)">Europe/London (GMT+1)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="Europe/Paris (CET)">Europe/Paris (CET)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Time"
                type="time"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
              <Input
                label="End Time"
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Active Sending Days</label>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const isActive = days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'border-slate-200 dark:border-[#262626] text-slate-400'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY LIMITS */}
        {activeTab === 'limits' && (
          <div className="space-y-4 max-w-xl">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-[11px]">
              Daily limits protect your account reputation. When daily limits are hit, remaining actions are automatically deferred to the <strong>Outreach Queue</strong>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Daily Connection Requests"
                type="number"
                value={dailyInvites}
                onChange={(e) => setDailyInvites(Number(e.target.value))}
                min={5}
                max={40}
              />
              <Input
                label="Daily Direct Messages"
                type="number"
                value={dailyMessages}
                onChange={(e) => setDailyMessages(Number(e.target.value))}
                min={5}
                max={50}
              />
              <Input
                label="Daily Profile Visits"
                type="number"
                value={dailyVisits}
                onChange={(e) => setDailyVisits(Number(e.target.value))}
                min={10}
                max={60}
              />
            </div>
          </div>
        )}

        {/* TAB 4: SAFETY & PACING */}
        {activeTab === 'safety' && (
          <div className="space-y-4 max-w-xl">
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Randomized Human Delay (Seconds)</label>
              <p className="text-[11px] text-slate-400">
                Introduces human-like variance between consecutive actions to avoid pattern detection.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Input
                  label="Minimum Delay (s)"
                  type="number"
                  value={randomDelayMin}
                  onChange={(e) => setRandomDelayMin(Number(e.target.value))}
                />
                <Input
                  label="Maximum Delay (s)"
                  type="number"
                  value={randomDelayMax}
                  onChange={(e) => setRandomDelayMax(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626]">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Warmup Acceleration Mode</div>
                <div className="text-[11px] text-slate-400">Gradually ramp volume by +15% per week for new accounts</div>
              </div>
              <input
                type="checkbox"
                checked={warmupMode}
                onChange={(e) => setWarmupMode(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* TAB 5: STOP CONDITIONS (Section 12) */}
        {activeTab === 'stop_conditions' && (
          <div className="space-y-3 max-w-xl">
            <p className="text-[11px] text-slate-400">
              Configure automated safeguards to halt outreach sequences when prospects respond or reach conversion thresholds.
            </p>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] cursor-pointer">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Stop when lead replies (Recommended)</div>
                <div className="text-[11px] text-slate-400">Immediately halts future automated follow-ups upon genuine response</div>
              </div>
              <input
                type="checkbox"
                checked={stopOnReply}
                onChange={(e) => setStopOnReply(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] cursor-pointer">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Stop when connection accepted</div>
                <div className="text-[11px] text-slate-400">Ends campaign once 1st-degree connection is made without sending InMails/messages</div>
              </div>
              <input
                type="checkbox"
                checked={stopOnConnection}
                onChange={(e) => setStopOnConnection(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] cursor-pointer">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Stop when manually contacted in CRM</div>
                <div className="text-[11px] text-slate-400">Prevents double-outreach if a sales rep calls or emails the contact</div>
              </div>
              <input
                type="checkbox"
                checked={stopOnManualContact}
                onChange={(e) => setStopOnManualContact(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] cursor-pointer">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Stop when removed from audience list</div>
                <div className="text-[11px] text-slate-400">Cancels all scheduled actions if contact is unlisted</div>
              </div>
              <input
                type="checkbox"
                checked={stopOnRemoved}
                onChange={(e) => setStopOnRemoved(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-[#262626] flex items-center justify-end">
          <Button
            variant="primary"
            size="sm"
            type="submit"
            leftIcon={<Save className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Save Settings
          </Button>
        </div>

      </div>

    </form>
  );
};
