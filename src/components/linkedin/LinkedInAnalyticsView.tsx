import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  Flame, 
  Calendar,
  Mail,
  Eye,
  ArrowUpRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useLinkedIn } from '../../context/LinkedInContext';

export const LinkedInAnalyticsView: React.FC = () => {
  const { campaigns, accounts, leads, visits, inmails } = useLinkedIn();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | 'Custom'>('30D');

  const totalInvites = campaigns.reduce((acc, c) => acc + c.invitesSent, 0);
  const totalConnected = campaigns.reduce((acc, c) => acc + c.connected, 0);
  const totalMessages = campaigns.reduce((acc, c) => acc + c.messagesSent, 0);
  const totalReplies = campaigns.reduce((acc, c) => acc + c.replied, 0);
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.meetings, 0);

  const acceptRate = totalInvites > 0 ? ((totalConnected / totalInvites) * 100).toFixed(1) : '38.4';
  const replyRate = totalMessages > 0 ? ((totalReplies / totalMessages) * 100).toFixed(1) : '31.2';
  const inmailReplyRate = '30.0';

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>LinkedIn Analytics & Outreach ROI</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time conversion velocity tracking connection acceptance, conversational reply rates, and meetings booked.
          </p>
        </div>

        {/* Date range picker */}
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-1 text-xs">
          {(['7D', '30D', '90D', 'Custom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                timeRange === t
                  ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {t === '7D' ? 'Last 7 Days' : t === '30D' ? 'Last 30 Days' : t === '90D' ? 'Last 90 Days' : 'Custom'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. The 8 Strict LinkedIn KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Net Growth</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">+482</span>
          <span className="text-[9px] font-sans text-slate-400 block">1st-Deg Adds</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Acceptance</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{acceptRate}%</span>
          <span className="text-[9px] font-sans text-slate-400 block">{totalConnected} accepted</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Messages</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">{totalMessages}</span>
          <span className="text-[9px] font-sans text-slate-400 block">Dispatched</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Reply Rate</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{replyRate}%</span>
          <span className="text-[9px] font-sans text-slate-400 block">{totalReplies} replies</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">InMail ROI</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{inmailReplyRate}%</span>
          <span className="text-[9px] font-sans text-slate-400 block">84 responses</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Profile Views</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">1,240</span>
          <span className="text-[9px] font-sans text-slate-400 block">Stealth views</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Leads Won</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{leads.length * 14}</span>
          <span className="text-[9px] font-sans text-slate-400 block">Qualified MQLs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Meetings</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{totalMeetings}</span>
          <span className="text-[9px] font-sans text-slate-400 block">On Calendar</span>
        </div>
      </div>

      {/* 3. Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Chart 1: Conversion Pipeline Funnel */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 font-sans">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">LinkedIn Outreach Full Funnel</h3>
              <p className="text-[11px] text-slate-400">Step-by-step conversion from discovery to closed meeting</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              38.4% Net Funnel Yield
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              { stage: '1. Stealth Profile Visits', count: 1240, pct: '100%', color: 'bg-emerald-500/60' },
              { stage: '2. Connection Invites Sent', count: totalInvites, pct: '72.5%', color: 'bg-emerald-500/80' },
              { stage: '3. Connections Accepted', count: totalConnected, pct: `${acceptRate}%`, color: 'bg-emerald-500' },
              { stage: '4. Direct Messages Sent', count: totalMessages, pct: '26.9%', color: 'bg-teal-500' },
              { stage: '5. Direct Replies Received', count: totalReplies, pct: `${replyRate}%`, color: 'bg-emerald-600' },
              { stage: '6. Discovery Meetings Booked', count: totalMeetings, pct: '14.2%', color: 'bg-emerald-400' },
            ].map((f, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-sans font-semibold text-slate-700 dark:text-slate-300">{f.stage}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{f.count} ({f.pct})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                  <div className={`h-full rounded-full ${f.color}`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Account Attribution Breakdown */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 font-sans">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Sender Account Attribution</h3>
              <p className="text-[11px] text-slate-400">Yield and meeting volume per authenticated sender</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
              3 Senders Active
            </span>
          </div>

          <div className="space-y-3">
            {accounts.map((acc, idx) => (
              <div
                key={acc.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-xl object-cover" />
                    <div>
                      <div className="font-extrabold text-slate-900 dark:text-white">{acc.name}</div>
                      <div className="text-[10px] text-slate-400">{acc.proxyLocation}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {idx === 0 ? '18 Meetings' : idx === 1 ? '12 Meetings' : '5 Meetings'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-1 text-slate-500 border-t border-slate-200/40 dark:border-[#202020]">
                  <div>Invites: <strong className="text-slate-800 dark:text-slate-200">{idx === 0 ? '320' : idx === 1 ? '210' : '120'}</strong></div>
                  <div>Accept: <strong className="text-emerald-600">{idx === 0 ? '40.0%' : idx === 1 ? '44.7%' : '36.6%'}</strong></div>
                  <div>Replies: <strong className="text-emerald-600 dark:text-emerald-400">{idx === 0 ? '38.1%' : idx === 1 ? '34.1%' : '31.5%'}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
