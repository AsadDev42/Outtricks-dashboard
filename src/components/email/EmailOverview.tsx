import React from 'react';
import { 
  Mail, 
  Send, 
  Layers, 
  FileText, 
  Flame, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  BarChart3,
  Globe,
  Split,
  Sparkles
} from 'lucide-react';
import { useEmail, EmailSubTab } from '../../context/EmailContext';

interface EmailOverviewProps {
  onOpenCreateCampaign: () => void;
  onOpenCreateSequence: () => void;
  onOpenConnectMailbox: () => void;
  onOpenCreateTemplate: () => void;
}

export const EmailOverview: React.FC<EmailOverviewProps> = ({
  onOpenCreateCampaign,
  onOpenCreateSequence,
  onOpenConnectMailbox,
  onOpenCreateTemplate,
}) => {
  const { campaigns, mailboxes, sequences, templates, setActiveTab } = useEmail();

  const activeCampaigns = campaigns.filter(c => c.status === 'Running');
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0);
  const totalDelivered = campaigns.reduce((acc, c) => acc + c.delivered, 0);
  const totalReplies = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.meetings, 0);
  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : '98.5';
  const replyRate = totalSent > 0 ? ((totalReplies / totalSent) * 100).toFixed(1) : '11.8';

  const optimalMailboxes = mailboxes.filter(m => m.status === 'Optimal');

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE CAMPAIGNS
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {activeCampaigns.length}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              of {campaigns.length} Total
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Rotating across {mailboxes.length} connected mailboxes
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              DELIVERY RATE
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {deliveryRate}%
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              Healthy
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {totalDelivered.toLocaleString()} delivered of {totalSent.toLocaleString()} sent
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              REPLY RATE
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {replyRate}%
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              {totalReplies} Replies
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Synchronized directly with Master Inbox
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              MEETINGS BOOKED
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalMeetings}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              Opportunities
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Attributed directly into Deals CRM Kanban
          </p>
        </div>

      </div>

      {/* 2. Quick Action Launchpad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
          <p className="text-[11px] text-slate-500">Configure audience & multi-inbox rotation</p>
        </button>

        <button
          onClick={onOpenCreateSequence}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Build Sequence</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Create multi-step conditional follow-up</p>
        </button>

        <button
          onClick={onOpenConnectMailbox}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Connect Mailbox</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Add Google Workspace or M365 sender</p>
        </button>

        <button
          onClick={onOpenCreateTemplate}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Draft Template</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Create personalized cold email copy</p>
        </button>
      </div>

      {/* 3. Active Campaigns Summary & Mailbox Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Campaigns Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Outreach Campaigns ({campaigns.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('campaigns')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            {campaigns.slice(0, 3).map((camp) => (
              <div
                key={camp.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 dark:text-white">
                    {camp.name}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    camp.status === 'Running' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' :
                    camp.status === 'Paused' ? 'bg-amber-50 dark:bg-amber-950 text-amber-600' :
                    'bg-slate-100 dark:bg-[#181818] text-slate-600'
                  }`}>
                    {camp.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1 border-t border-slate-200/40 dark:border-[#202020]">
                  <div>
                    <span className="text-slate-400 block">Sent</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{camp.sent.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Opens</span>
                    <span className="font-bold text-emerald-600">{camp.opened.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Replies</span>
                    <span className="font-bold text-emerald-600">{camp.replied.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Demos</span>
                    <span className="font-bold text-emerald-600 font-mono">{camp.meetings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mailboxes Health Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Sender Mailbox Pools ({optimalMailboxes.length}/{mailboxes.length} Optimal)</span>
            </h3>
            <button
              onClick={() => setActiveTab('mailboxes')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              Manage
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {mailboxes.slice(0, 4).map((mbx) => (
              <div
                key={mbx.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 dark:text-white truncate font-mono">
                    {mbx.email}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {mbx.provider} • Sent {mbx.dailySent}/{mbx.dailyCap} today
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-mono">
                  {mbx.healthScore}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
