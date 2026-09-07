import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Trash2, 
  Users, 
  Building2, 
  CheckCircle2, 
  X,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin } from '../../context/AdminContext';

export const AdminAccessOverridesView: React.FC = () => {
  const { users, teams, setUserFeatureOverride, setTeamLimitOverride } = useAdmin();

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const [activeTab, setActiveTab] = useState<'user' | 'team'>('user');

  const OVERRIDABLE_FEATURES = [
    { key: 'feat_warmup', label: 'Automated Inbox Warmup Engine', desc: 'Allows access to domain warmup and inbox health monitors.' },
    { key: 'feat_intent', label: 'Real-Time Buying Intent Triggers', desc: 'Surfaces hiring and executive change signals in 8D Lead Finder.' },
    { key: 'feat_voice_recording', label: 'Voice SDR Call Recording & Live Audio Transcripts', desc: 'Saves dual-channel MP3s and AI transcripts to CRM.' },
    { key: 'feat_upwork_bot', label: 'Upwork Autonomous Bidding Studio', desc: 'Allows AI bot to submit proposals on Upwork feeds.' },
    { key: 'feat_dedicated_ip', label: 'Dedicated Mailbox IP Proxies', desc: 'Rotates sending through isolated enterprise IP pools.' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Granular Access & Quota Overrides
            </h2>
            <Badge variant="emerald" size="sm">Top Priority</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Apply explicit capability flags or quota ceilings that override default Plan and Bundle boundaries.
          </p>
        </div>

        {/* Segmented Switch */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-[#1C1C1C] rounded-2xl border border-slate-200/60 dark:border-[#202020] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'user' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            User Overrides
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'team' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Team Overrides
          </button>
        </div>
      </div>

      {/* 2. User Level Overrides */}
      {activeTab === 'user' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          
          {/* User Picker (1 Col) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              Select User Target
            </span>

            <div className="space-y-1.5">
              {users.map((u) => {
                const isSelected = selectedUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setSelectedUser(u)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold' 
                        : 'border-slate-200/80 dark:border-[#202020] hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold truncate">{u.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{u.email}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Override Toggles (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div>
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                  Explicit Feature Flags for {selectedUser?.name}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Plan: {selectedUser?.planName} • Team: {selectedUser?.teamName || 'Solo'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {OVERRIDABLE_FEATURES.map((feat) => {
                const currentOverride = selectedUser?.featureOverrides?.[feat.key];
                const isExplicitlyOn = currentOverride === true;
                const isExplicitlyOff = currentOverride === false;

                return (
                  <div
                    key={feat.key}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white">{feat.label}</div>
                      <p className="text-[11px] text-slate-500">{feat.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant={isExplicitlyOn ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setUserFeatureOverride(selectedUser.id, feat.key, true)}
                        className="text-[10px] px-2.5 py-1"
                      >
                        Force ON
                      </Button>
                      <Button
                        variant={isExplicitlyOff ? 'danger' : 'secondary'}
                        size="sm"
                        onClick={() => setUserFeatureOverride(selectedUser.id, feat.key, false)}
                        className="text-[10px] px-2.5 py-1"
                      >
                        Force OFF
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Team Level Overrides */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          
          {/* Team Picker (1 Col) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
              Select Workspace
            </span>

            <div className="space-y-1.5">
              {teams.map((t) => {
                const isSelected = selectedTeam?.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTeam(t)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold' 
                        : 'border-slate-200/80 dark:border-[#202020] hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold truncate">{t.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{t.membersCount} members</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team Quota Overrides (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div>
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                  Quota Ceilings for {selectedTeam?.name}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Custom resource caps enforce hard ceilings across the workspace.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Monthly Email Cap</label>
                <input
                  type="number"
                  defaultValue={selectedTeam?.resourceLimits.emailsMonthly}
                  onBlur={(e) => setTeamLimitOverride(selectedTeam.id, 'emailsMonthly', parseInt(e.target.value) || 50000)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Lead Searches Cap</label>
                <input
                  type="number"
                  defaultValue={selectedTeam?.resourceLimits.leadFinderSearches}
                  onBlur={(e) => setTeamLimitOverride(selectedTeam.id, 'leadFinderSearches', parseInt(e.target.value) || 25000)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Voice AI Agents</label>
                <input
                  type="number"
                  defaultValue={selectedTeam?.resourceLimits.voiceAgents}
                  onBlur={(e) => setTeamLimitOverride(selectedTeam.id, 'voiceAgents', parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Connected Mailboxes</label>
                <input
                  type="number"
                  defaultValue={selectedTeam?.resourceLimits.mailboxes}
                  onBlur={(e) => setTeamLimitOverride(selectedTeam.id, 'mailboxes', parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
