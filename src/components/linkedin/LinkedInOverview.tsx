import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Linkedin, 
  Send, 
  Users, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  Clock, 
  UserCheck, 
  Eye,
  Inbox,
  Pause,
  Play,
  Server,
  Activity
} from 'lucide-react';
import { useLinkedIn } from '../../context/LinkedInContext';

interface LinkedInOverviewProps {
  onOpenCreateCampaign: () => void;
  onOpenConnectAccount: () => void;
  onOpenCreateRule: () => void;
}

export const LinkedInOverview: React.FC<LinkedInOverviewProps> = ({
  onOpenCreateCampaign,
  onOpenConnectAccount,
  onOpenCreateRule,
}) => {
  const navigate = useNavigate();
  const { accounts, campaigns, executionLogs, proxies, toggleCampaignStatus } = useLinkedIn();

  const totalConnected = campaigns.reduce((acc, c) => acc + c.connected, 0);
  const totalInvites = campaigns.reduce((acc, c) => acc + c.invitesSent, 0);
  const totalReplied = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalInterested = campaigns.reduce((acc, c) => acc + c.interested, 0);
  const acceptanceRate = totalInvites > 0 ? ((totalConnected / totalInvites) * 100).toFixed(1) : '38.4';

  const healthyAccounts = accounts.filter(a => a.status === 'Connected');

  // Aggregated Daily Limits across all connected accounts
  const totalInvitesSentToday = accounts.reduce((acc, a) => acc + a.dailyInvitesSent, 0);
  const totalInvitesLimit = accounts.reduce((acc, a) => acc + a.dailyInvitesLimit, 0) || 60;
  const totalVisitsSentToday = accounts.reduce((acc, a) => acc + a.dailyVisitsSent, 0);
  const totalVisitsLimit = accounts.reduce((acc, a) => acc + a.dailyVisitsLimit, 0) || 90;
  const totalMessagesSentToday = accounts.reduce((acc, a) => acc + a.dailyMessagesSent, 0);
  const totalMessagesLimit = accounts.reduce((acc, a) => acc + a.dailyMessagesLimit, 0) || 90;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Grid: Sent, Connected, Replied, Booked/Hot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SENT (INVITATIONS)
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalInvites.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              {totalInvitesSentToday} Today
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Across {campaigns.length} active campaigns
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              CONNECTED (ACCEPTED)
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalConnected}
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              {acceptanceRate}% Rate
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Warm relationship introductions made
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              REPLIED (INBOUND DMS)
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalReplied}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Direct Messages
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Synchronized directly to Unified Inbox
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              BOOKED & HOT LEADS
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalInterested}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Meetings / Pipeline
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Converted into CRM Deals Pipeline
          </p>
        </div>

      </div>

      {/* 2. Quick Action Launchpad: New Campaign, Connect Account, View Inbox */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onOpenCreateCampaign}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>New Campaign</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Configure connection invites & multi-touch sequences</p>
        </button>

        <button
          onClick={onOpenConnectAccount}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Linkedin className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Connect Account</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Add profile via Session Cookie (li_at) or OAuth</p>
        </button>

        <button
          onClick={() => navigate('/inbox')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Inbox className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>View Inbox</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Manage replies, lead chats, and conversations</p>
        </button>
      </div>

      {/* 3. Daily Limits & Proxy Health Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Warmup & Sending Limits */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-slate-900 dark:text-white text-xs">
                Daily Safety Limits & Pacing
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Warmup Shield Active (99%)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200/60 dark:border-[#222]">
              <span className="text-[10px] text-slate-400 block">Invites Sent</span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                {totalInvitesSentToday} / {totalInvitesLimit}
              </span>
              <div className="w-full bg-slate-200 dark:bg-[#202020] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (totalInvitesSentToday / totalInvitesLimit) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200/60 dark:border-[#222]">
              <span className="text-[10px] text-slate-400 block">Profile Visits</span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                {totalVisitsSentToday} / {totalVisitsLimit}
              </span>
              <div className="w-full bg-slate-200 dark:bg-[#202020] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (totalVisitsSentToday / totalVisitsLimit) * 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200/60 dark:border-[#222]">
              <span className="text-[10px] text-slate-400 block">Messages</span>
              <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                {totalMessagesSentToday} / {totalMessagesLimit}
              </span>
              <div className="w-full bg-slate-200 dark:bg-[#202020] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (totalMessagesSentToday / totalMessagesLimit) * 100)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Residential Proxies Status */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-slate-900 dark:text-white text-xs">
                Dedicated Residential Proxy Health
              </span>
            </div>
            <button
              onClick={() => navigate('/linkedin/accounts')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              Manage ({healthyAccounts.length} Connected)
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {proxies.slice(0, 2).map((prx) => (
              <div
                key={prx.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200/60 dark:border-[#222]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px]">
                      {prx.location}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      IP: {prx.ip} • {prx.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-500 font-bold text-[10px] block">
                    ✓ {prx.status}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono">
                    {prx.latency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Active Campaigns & Live Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Campaigns Matrix with Quick Status Toggle (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Outreach Campaigns ({campaigns.length})</span>
            </h3>
            <button
              onClick={() => navigate('/linkedin/campaigns')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {camp.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Sender: {camp.accountName} • Target: {camp.targetAudience}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        camp.status === 'Running' 
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 hover:bg-emerald-100' 
                          : camp.status === 'Paused' 
                          ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 hover:bg-amber-100' 
                          : 'bg-slate-100 dark:bg-[#181818] text-slate-600'
                      }`}
                      title={camp.status === 'Running' ? 'Pause Campaign' : 'Resume Campaign'}
                    >
                      {camp.status === 'Running' ? (
                        <>
                          <Pause className="w-2.5 h-2.5" />
                          <span>Running</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-2.5 h-2.5" />
                          <span>Paused</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1 border-t border-slate-200/40 dark:border-[#202020]">
                  <div>
                    <span className="text-slate-400 block">Invites</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{camp.invitesSent}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Connected</span>
                    <span className="font-bold text-emerald-600">{camp.connected}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Replies</span>
                    <span className="font-bold text-emerald-600">{camp.replied}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Hot Leads</span>
                    <span className="font-bold text-emerald-600">{camp.interested}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Cloud Execution Logs (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Live Action Stream</span>
            </h3>
            <button
              onClick={() => navigate('/linkedin/execution-logs')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              All Logs
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {executionLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {log.action}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {log.timestamp}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                  {log.prospectName} • {log.company}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>via {log.account}</span>
                  <span className="text-emerald-500 font-bold">✓ {log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
