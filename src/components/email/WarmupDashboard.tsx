import React, { useState } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  RotateCw,
  Clock,
  Inbox,
  Play,
  Pause,
  Sliders,
  Check,
  BarChart2,
  Mail
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, WarmupAccount } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export const WarmupDashboard: React.FC = () => {
  const { warmupAccounts, mailboxes } = useEmail();
  const { success, info } = useToast();

  const [isWarmupGlobalActive, setIsWarmupGlobalActive] = useState(true);
  const [targetVolumePerInbox, setTargetVolumePerInbox] = useState(35);

  const totalDailyWarmupSent = warmupAccounts.reduce((acc, w) => acc + w.dailyWarmupSent, 0);
  const totalTargetVolume = warmupAccounts.length * targetVolumePerInbox;
  const totalSpamRescued = warmupAccounts.reduce((acc, w) => acc + w.spamSavedCount, 0);
  const avgReplyRate = (
    warmupAccounts.reduce((acc, w) => acc + w.replyRate, 0) / (warmupAccounts.length || 1)
  ).toFixed(1);

  const handleToggleGlobalWarmup = () => {
    setIsWarmupGlobalActive(!isWarmupGlobalActive);
    if (!isWarmupGlobalActive) {
      success('Warmup network resumed across all connected mailboxes.', 'Warmup Active');
    } else {
      info('Warmup network paused. Cold campaigns will continue unaffected.', 'Warmup Paused');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Global Warmup Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Automated Email Warmup Network
            </h2>
            <Badge variant={isWarmupGlobalActive ? 'emerald' : 'amber'} size="sm">
              {isWarmupGlobalActive ? 'Active Pool' : 'Paused'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Automated peer-to-peer AI warmup across 14,200+ real Google Workspace and Microsoft 365 inboxes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isWarmupGlobalActive ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleToggleGlobalWarmup}
            leftIcon={isWarmupGlobalActive ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
          >
            {isWarmupGlobalActive ? 'Pause Warmup Fleet' : 'Resume Warmup Fleet'}
          </Button>
        </div>
      </div>

      {/* 2. Unified Warmup Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        
        {/* Daily Volume vs Target */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Current / Target Volume</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalDailyWarmupSent} <span className="text-sm font-normal text-slate-400">/ {totalTargetVolume} sends/day</span>
          </div>
          <div className="text-emerald-500 font-bold text-[11px] font-sans">
            {warmupAccounts.length} Connected Mailboxes in Ramp
          </div>
        </div>

        {/* Deliverability / Inbox Placement */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Primary Inbox Placement</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">99.4%</div>
          <div className="text-slate-400 text-[11px] font-sans">
            0% landed in spam across test pools
          </div>
        </div>

        {/* Positive Peer Replies */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Peer Reply Rate</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgReplyRate}%</div>
          <div className="text-slate-400 text-[11px] font-sans">
            Natural threaded contextual replies
          </div>
        </div>

        {/* Positive Interactions / Spam Rescues */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Spam Rescues & Important Flags</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{totalSpamRescued}</div>
          <div className="text-emerald-500 text-[11px] font-sans font-bold">
            Auto-marked as Important & Starred
          </div>
        </div>

      </div>

      {/* 3. Warmup Ramp Schedule & Trajectory Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              14-Day Automated Warmup & Deliverability Trajectory
            </h3>
            <p className="text-[11px] text-slate-500">
              Safe humanized ramp curve (+2 sends per day) protecting domain reputation.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Phase: Production Stabilization
          </div>
        </div>

        {/* Ramp Bars Visualization */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 pt-2 items-end h-28">
          {[
            { day: 'D1', val: 5, rate: '94%' },
            { day: 'D2', val: 8, rate: '95%' },
            { day: 'D3', val: 10, rate: '96%' },
            { day: 'D4', val: 12, rate: '97%' },
            { day: 'D5', val: 15, rate: '98%' },
            { day: 'D6', val: 18, rate: '98%' },
            { day: 'D7', val: 20, rate: '99%' },
            { day: 'D8', val: 22, rate: '99%' },
            { day: 'D9', val: 25, rate: '99%' },
            { day: 'D10', val: 28, rate: '99%' },
            { day: 'D11', val: 30, rate: '99.4%' },
            { day: 'D12', val: 32, rate: '99.4%' },
            { day: 'D13', val: 35, rate: '99.4%' },
            { day: 'D14', val: 35, rate: '99.4%' },
          ].map((bar, idx) => {
            const heightPercent = Math.round((bar.val / 35) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
                <div className="text-[9px] font-mono text-slate-400 group-hover:text-emerald-500 transition-colors">
                  {bar.val}
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#202020] rounded-md h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-emerald-500 group-hover:bg-emerald-400 transition-all rounded-md"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-500">{bar.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Connected Mailboxes Warmup Status List */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          Mailbox Warmup Progress & Peer Deliverability:
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
          {warmupAccounts.map((w) => {
            const progressPercent = Math.min(100, Math.round((w.day / 21) * 100));

            return (
              <div
                key={w.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white font-mono truncate">
                      {w.email}
                    </span>
                    <Badge variant="emerald" size="sm">
                      Day {w.day} of 21 ({w.status})
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 w-full max-w-md">
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{progressPercent}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono shrink-0">
                  <div>
                    <div className="text-[10px] text-slate-400">Daily Warm Volume</div>
                    <div className="font-bold text-slate-900 dark:text-white">{w.dailyWarmupSent} sends/day</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">Peer Reply</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{w.replyRate}%</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">Saved from Spam</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{w.spamSavedCount} rescues</div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 text-[11px] font-bold">
                    ✓ 99.4% Inbox
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
