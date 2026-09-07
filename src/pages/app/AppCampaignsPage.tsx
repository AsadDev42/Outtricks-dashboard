import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useEmail } from '../../context/EmailContext';
import { useLinkedIn } from '../../context/LinkedInContext';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { useToast } from '../../context/ToastContext';
import { formatNumber } from '../../utils/formatters';
import { 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Layers, 
  Users, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight,
  BarChart3,
  TrendingUp,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { CreateCampaignModal } from '../../components/email';
import { CreateLinkedInCampaignModal } from '../../components/linkedin';
import { CreateVoiceCampaignModal } from '../../components/voice';

type ChannelFilter = 'all' | 'email' | 'linkedin' | 'voice';
type StatusFilter = 'all' | 'running' | 'paused' | 'completed';

interface UnifiedCampaignItem {
  id: string;
  name: string;
  channel: 'email' | 'linkedin' | 'voice';
  audienceCount: number;
  contactedCount: number;
  repliedCount: number;
  meetingsBooked: number;
  status: 'Running' | 'Paused' | 'Completed';
  createdAt: string;
  channelStudioHref: string;
}

export const AppCampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns: emailCampaigns, toggleCampaignStatus: toggleEmailStatus } = useEmail();
  const { campaigns: linkedInCampaigns, toggleCampaignStatus: toggleLinkedInStatus } = useLinkedIn();
  const { voiceCampaigns, toggleVoiceCampaignStatus: toggleVoiceStatus } = useVoiceAi();
  const { success, info } = useToast();

  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Normalize all campaigns into a unified list
  const unifiedCampaigns: UnifiedCampaignItem[] = useMemo(() => {
    const list: UnifiedCampaignItem[] = [];

    // 1. Email campaigns
    emailCampaigns.forEach((c) => {
      list.push({
        id: `email-${c.id}`,
        name: c.name,
        channel: 'email',
        audienceCount: c.audienceCount,
        contactedCount: c.sent,
        repliedCount: c.replied,
        meetingsBooked: c.meetings,
        status: (c.status === 'Completed' ? 'Completed' : c.status === 'Draft' ? 'Paused' : c.status) as any,
        createdAt: c.createdAt || 'Recently',
        channelStudioHref: '/email/campaigns',
      });
    });

    // 2. LinkedIn campaigns
    linkedInCampaigns.forEach((c) => {
      list.push({
        id: `li-${c.id}`,
        name: c.name,
        channel: 'linkedin',
        audienceCount: c.targetCount || 0,
        contactedCount: (c.invitesSent || 0) + (c.messagesSent || 0),
        repliedCount: c.replied,
        meetingsBooked: c.meetings,
        status: (c.status === 'Completed' ? 'Completed' : c.status === 'Draft' ? 'Paused' : c.status) as any,
        createdAt: c.createdAt || 'Recently',
        channelStudioHref: '/linkedin/campaigns',
      });
    });

    // 3. Voice AI campaigns
    voiceCampaigns.forEach((c) => {
      list.push({
        id: `voice-${c.id}`,
        name: c.name,
        channel: 'voice',
        audienceCount: c.audienceCount,
        contactedCount: c.callsPlaced,
        repliedCount: c.answeredCount,
        meetingsBooked: c.meetingsBooked,
        status: (c.status === 'Completed' ? 'Completed' : c.status) as any,
        createdAt: c.createdAt || 'Recently',
        channelStudioHref: '/voice-ai/campaigns',
      });
    });

    return list;
  }, [emailCampaigns, linkedInCampaigns, voiceCampaigns]);

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return unifiedCampaigns.filter((c) => {
      if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
      if (statusFilter !== 'all' && c.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [unifiedCampaigns, channelFilter, statusFilter, searchQuery]);

  // Aggregate Metrics
  const totalActive = unifiedCampaigns.filter((c) => c.status === 'Running').length;
  const totalContacted = unifiedCampaigns.reduce((acc, c) => acc + c.contactedCount, 0);
  const totalReplied = unifiedCampaigns.reduce((acc, c) => acc + c.repliedCount, 0);
  const totalMeetings = unifiedCampaigns.reduce((acc, c) => acc + c.meetingsBooked, 0);
  const avgReplyRate = totalContacted > 0 ? ((totalReplied / totalContacted) * 100).toFixed(1) : '12.4';

  const handleToggleStatus = (c: UnifiedCampaignItem) => {
    const rawId = c.id.replace(/^(email|li|voice)-/, '');
    if (c.channel === 'email') {
      toggleEmailStatus(rawId);
    } else if (c.channel === 'linkedin') {
      toggleLinkedInStatus(rawId);
    } else if (c.channel === 'voice') {
      toggleVoiceStatus(rawId);
    }
    success(`Campaign status updated for "${c.name}".`);
  };

  return (
    <GsapPageTransition className="space-y-6 font-sans">
      <SEOHead
        title="Multi-Channel Outbound Campaigns | Outtricks Platform"
        description="Unified outbound campaign portfolio orchestrating Cold Email, LinkedIn Automations, and Voice AI SDR in one synchronized cockpit."
        noindex={true}
      />

      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Multi-Channel Campaigns Studio
            </h1>
            <Badge variant="emerald" size="sm">
              {totalActive} Active Sequences
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            Orchestrate and monitor your multi-channel sales pipeline across Email sequences, LinkedIn automations, and conversational Voice AI callers.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEmailModalOpen(true)}
            leftIcon={<Mail className="w-3.5 h-3.5 text-emerald-500" />}
          >
            New Email Campaign
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsLinkedInModalOpen(true)}
            leftIcon={<Linkedin className="w-3.5 h-3.5 text-blue-500" />}
          >
            New LinkedIn Flow
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsVoiceModalOpen(true)}
            leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
          >
            New Voice AI SDR
          </Button>
        </div>
      </div>

      {/* 2. Global Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Active Campaigns</span>
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalActive}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Across 3 outbound channels
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Leads Reached</span>
            <Users className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {formatNumber(totalContacted)}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            98.7% verified delivery
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Response Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {avgReplyRate}%
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {formatNumber(totalReplied)} positive replies
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Meetings Booked</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalMeetings}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
            Direct CRM sync
          </div>
        </div>
      </div>

      {/* 3. Filter Controls & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {(['all', 'email', 'linkedin', 'voice'] as const).map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer capitalize shrink-0 flex items-center gap-1.5 ${
                channelFilter === ch
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A2A2A]'
              }`}
            >
              {ch === 'email' && <Mail className="w-3 h-3" />}
              {ch === 'linkedin' && <Linkedin className="w-3 h-3" />}
              {ch === 'voice' && <PhoneCall className="w-3 h-3" />}
              <span>{ch === 'all' ? 'All Channels' : ch === 'voice' ? 'Voice AI' : ch}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#282828] text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-colors w-48 sm:w-60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#282828] text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* 4. Campaigns Unified Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#242424] bg-slate-50/75 dark:bg-[#1A1A1A]/80 text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4 font-bold">Campaign & Channel</th>
                <th className="py-3 px-4 font-bold">Target Audience</th>
                <th className="py-3 px-4 font-bold">Volume Contacted</th>
                <th className="py-3 px-4 font-bold">Reply / Qualified</th>
                <th className="py-3 px-4 font-bold">Meetings Booked</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
              {filteredCampaigns.map((c) => {
                const responseRate = c.contactedCount > 0 ? ((c.repliedCount / c.contactedCount) * 100).toFixed(1) : '0.0';
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C] transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            c.channel === 'email'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : c.channel === 'linkedin'
                              ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              : 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                          }`}
                        >
                          {c.channel === 'email' && <Mail className="w-4 h-4" />}
                          {c.channel === 'linkedin' && <Linkedin className="w-4 h-4" />}
                          {c.channel === 'voice' && <PhoneCall className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 dark:text-white text-xs truncate">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-slate-400 capitalize flex items-center gap-1.5">
                            <span>{c.channel === 'voice' ? 'Voice AI SDR' : `${c.channel} Sequence`}</span>
                            <span>•</span>
                            <span>{c.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-900 dark:text-white font-bold text-xs">
                        {formatNumber(c.audienceCount)} leads
                      </div>
                      <div className="text-[10px] text-slate-400">Enrolled Audience</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                          {formatNumber(c.contactedCount)}
                        </div>
                        <div className="w-20 bg-slate-100 dark:bg-[#222] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{
                              width: `${Math.min(100, c.audienceCount > 0 ? (c.contactedCount / c.audienceCount) * 100 : 0)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                          {responseRate}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({c.repliedCount})
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
                        <Sparkles className="w-3 h-3" />
                        <span>{c.meetingsBooked} Booked</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={c.status === 'Running' ? 'emerald' : c.status === 'Paused' ? 'amber' : 'slate'}
                        size="sm"
                      >
                        {c.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(c)}
                          title={c.status === 'Running' ? 'Pause Campaign' : 'Resume Campaign'}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors cursor-pointer"
                        >
                          {c.status === 'Running' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                        </button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(c.channelStudioHref)}
                          rightIcon={<ChevronRight className="w-3 h-3" />}
                        >
                          Studio
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateCampaignModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      <CreateLinkedInCampaignModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
      />

      <CreateVoiceCampaignModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </GsapPageTransition>
  );
};

export default AppCampaignsPage;
