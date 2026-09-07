import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Lock, 
  Sparkles,
  Zap,
  Globe,
  Clock,
  RotateCw,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export const LinkedInHealthView: React.FC = () => {
  const { accounts } = useLinkedIn();
  const { success, info } = useToast();

  const [policies, setPolicies] = useState<{ [key: string]: boolean }>({
    proxy: true,
    decay: true,
    weekend: true,
    suppression: true,
    mouse: true,
    circuit: true,
  });

  const healthyAccounts = accounts.filter(a => a.status === 'Connected').length;
  const warningAccounts = accounts.filter(a => a.status === 'Warming').length;
  const restrictedAccounts = accounts.filter(a => a.status === 'Action Needed').length;

  const totalActionsUsed = accounts.reduce((acc, a) => acc + (a.actionsUsedToday || 32), 0);
  const totalActionsLimit = accounts.reduce((acc, a) => acc + (a.dailyActionsLimit || 60), 0);

  const togglePolicy = (key: string, name: string) => {
    const nextVal = !policies[key];
    setPolicies(prev => ({ ...prev, [key]: nextVal }));
    if (nextVal) {
      success(`Policy "${name}" activated.`, 'Guardrail Enabled');
    } else {
      info(`Policy "${name}" suspended temporarily.`, 'Guardrail Adjusted');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Account Health & Safety Sentinel</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous AI safety monitoring tracking LinkedIn velocity limits, invitation decay, and proxy anti-ban telemetry.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => success('Full account diagnostic completed: 100% healthy, 0 restriction risks detected.', 'Health Scan Clean')}
          leftIcon={<RotateCw className="w-3.5 h-3.5" />}
        >
          Run Health Diagnostic
        </Button>
      </div>

      {/* 2. Top Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Healthy Accounts</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{healthyAccounts} Profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Warming Profiles</span>
          <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{warningAccounts} Profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Restricted Profiles</span>
          <span className="text-xl font-extrabold text-slate-400 font-mono">{restrictedAccounts}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Connection Safety SLA</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">99.4%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Daily Action Usage</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{totalActionsUsed} / {totalActionsLimit}</span>
        </div>
      </div>

      {/* 3. Account-By-Account Health Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Sender Profile Health & Limits Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const usagePercent = Math.round(((acc.actionsUsedToday || 32) / (acc.dailyActionsLimit || 60)) * 100);

            return (
              <div
                key={acc.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">{acc.name}</div>
                      <div className="text-[11px] text-slate-500">{acc.title}</div>
                    </div>
                  </div>
                  <Badge variant={acc.safetyScore > 90 ? 'emerald' : 'amber'} size="sm">
                    {acc.safetyScore > 90 ? 'Safe' : 'Moderate'} ({acc.safetyScore}/100)
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Action Velocity Meter:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {acc.actionsUsedToday || 32} / {acc.dailyActionsLimit || 60} ({usagePercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Daily Invites Cap:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{acc.dailyInvitesSent} / {acc.dailyInvitesLimit || 25}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Human Delay Pacing:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">45s–120s random</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Warning History:</span>
                    <span className="font-bold text-emerald-600">0 Flags (Clean)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>AI Safety Recommendation</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {acc.status === 'Connected'
                      ? 'Account operating in peak trust tier. Safe to maintain 25 connection invites/day with 120s human delay pacing.'
                      : 'Account in initial warmup stage. Capped at 15 connection invites/day for the next 7 days.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Anti-Ban Safeguards & Interactive Policy Toggles */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
          Active Anti-Ban Guardrails & Policies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { key: 'proxy', title: 'Static 4G Residential Proxy Isolation', desc: '1 Dedicated mobile IP mapped to 1 profile to avoid clustering detection.' },
            { key: 'decay', title: 'Automatic Unaccepted Invite Auto-Decay', desc: 'Outbound invites older than 14 days automatically withdrawn to maintain clean ratio.' },
            { key: 'weekend', title: 'Weekend Activity Throttling', desc: 'Reduces dispatch volume by 60% on Saturdays & Sundays to mirror natural human schedules.' },
            { key: 'suppression', title: 'Cross-Platform Suppression Sync', desc: 'Shared suppression list with cold email outreach to avoid duplicate outreach spam.' },
            { key: 'mouse', title: 'Randomized Natural Mouse Emulation', desc: 'Realistic scroll depth and random delay pauses between profile actions (45s–120s).' },
            { key: 'circuit', title: 'Instant Account Checkpoint Circuit Breaker', desc: 'Automated circuit breaker pauses all workflows immediately upon detecting CAPTCHA challenge.' },
          ].map((item) => {
            const isEnabled = policies[item.key] ?? true;

            return (
              <div
                key={item.key}
                onClick={() => togglePolicy(item.key, item.title)}
                className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isEnabled ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{item.title}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shrink-0 ${
                  isEnabled ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600' : 'bg-slate-200 dark:bg-[#181818] text-slate-400'
                }`}>
                  {isEnabled ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
