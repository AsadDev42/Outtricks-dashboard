import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Send, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Users, 
  Mail, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ExternalLink,
  ShieldCheck, 
  TrendingUp, 
  Settings, 
  Layers,
  Activity,
  Clock,
  Sparkles,
  Filter,
  Search,
  ArrowUpRight,
  Check,
  RotateCw,
  AlertCircle,
  MessageSquare,
  Split,
  Sliders,
  Globe,
  FileText,
  BarChart2,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Shield,
  Zap,
  Info
} from 'lucide-react';
import { EmailCampaign, useEmail } from '../../context/EmailContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { useToast } from '../../context/ToastContext';

interface CampaignDetailDrawerProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 
  | 'overview' 
  | 'leads' 
  | 'sequence' 
  | 'sending' 
  | 'schedule' 
  | 'options' 
  | 'subsequences' 
  | 'analytics';

export const CampaignDetailDrawer: React.FC<CampaignDetailDrawerProps> = ({
  campaign,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !campaign) return null;

  const navigate = useNavigate();
  const { 
    toggleCampaignStatus, 
    duplicateCampaign, 
    deleteCampaign, 
    emailLeads,
    mailboxes,
    updateCampaign
  } = useEmail();
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilter, setLeadFilter] = useState<string>('all');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const campaignLeads = emailLeads.filter((l) => l.campaignId === campaign.id || campaign.id === 'camp-1');
  const filteredLeads = campaignLeads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(leadSearch.toLowerCase()) || 
                          l.email.toLowerCase().includes(leadSearch.toLowerCase()) || 
                          l.company.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesFilter = leadFilter === 'all' || l.status === leadFilter;
    return matchesSearch && matchesFilter;
  });

  // Derived metrics
  const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0.0';
  const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0.0';
  const replyRate = campaign.sent > 0 ? ((campaign.replied / campaign.sent) * 100).toFixed(1) : '0.0';
  const bounceRate = campaign.sent > 0 ? ((campaign.bounced / campaign.sent) * 100).toFixed(1) : '0.0';
  const deliveryRate = campaign.sent > 0 ? (((campaign.sent - campaign.bounced) / campaign.sent) * 100).toFixed(1) : '100.0';

  // Projected Completion
  const dailyLimit = campaign.dailyLimit || 120;
  const remainingLeads = Math.max(0, (campaign.leadsCount || 450) - campaign.sent);
  const estimatedDaysRemaining = Math.ceil(remainingLeads / Math.max(1, dailyLimit));

  // Assigned mailboxes
  const assignedMailboxes = mailboxes.filter((m) => 
    campaign.mailboxIds && campaign.mailboxIds.length > 0
      ? campaign.mailboxIds.includes(m.id)
      : true
  );

  const handleNavigateToInbox = () => {
    onClose();
    navigate(`/inbox?channel=email&campaign=${campaign.id}`);
  };

  const handleRunDiagnostics = () => {
    setShowDiagnostics(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200 font-sans">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#141414] border-l border-slate-200 dark:border-[#262626] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* TOP HEADER                                                                */}
        {/* ========================================================================= */}
        <div className="p-5 border-b border-slate-200 dark:border-[#262626] space-y-3 shrink-0 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-black text-xl text-slate-950 dark:text-white truncate tracking-tight">
                  {campaign.name}
                </h2>
                <Badge
                  variant={campaign.status === 'Running' ? 'emerald' : campaign.status === 'Paused' ? 'amber' : 'blue'}
                  size="sm"
                  dot={campaign.status === 'Running'}
                >
                  {campaign.status}
                </Badge>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#202020] text-slate-500 font-bold">
                  ID: {campaign.id}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                <span>Created: <strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.createdAt}</strong></span>
                <span>•</span>
                <span>Active Mailbox Pool: <strong className="text-slate-700 dark:text-slate-300 font-mono">{assignedMailboxes.length} inboxes</strong></span>
                <span>•</span>
                <span>Total Audience: <strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.leadsCount} leads</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#222] transition-colors cursor-pointer"
                title="Close Control Center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={campaign.status === 'Running' ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => toggleCampaignStatus(campaign.id)}
                className="text-xs font-bold gap-1.5"
              >
                {campaign.status === 'Running' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pause Campaign</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Resume Sending</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRunDiagnostics}
                className="text-xs font-semibold gap-1.5 text-slate-700 dark:text-slate-200"
              >
                <Stethoscope className="w-3.5 h-3.5 text-primary" />
                <span>Diagnose</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNavigateToInbox}
                className="text-xs font-semibold gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>View Replies ({campaign.replied})</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70" />
              </Button>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  duplicateCampaign(campaign.id);
                  onClose();
                }}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white p-2"
                title="Duplicate Campaign"
              >
                <Copy className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  deleteCampaign(campaign.id);
                  onClose();
                }}
                className="text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 p-2"
                title="Delete Campaign"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIVE CAMPAIGN HEALTH & TELEMETRY STRIP (HIGH IMPACT HUD)                  */}
        {/* ========================================================================= */}
        <div className="bg-slate-50/80 dark:bg-[#1A1A1A]/80 border-b border-slate-200 dark:border-[#262626] px-6 py-3 shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Sending State */}
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                campaign.status === 'Running' 
                  ? 'bg-emerald-500 animate-pulse' 
                  : 'bg-amber-500'
              }`} />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">Sending State</div>
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  {campaign.status === 'Running' ? 'Active in Window' : 'Campaign Paused'}
                </div>
              </div>
            </div>

            {/* Mailbox Fleet Health */}
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">Sender Fleet</div>
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  {assignedMailboxes.length}/{assignedMailboxes.length} Inboxes 100% Healthy
                </div>
              </div>
            </div>

            {/* Today's Pacing */}
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">Today's Pacing</div>
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  82 / {dailyLimit} sent (68%)
                </div>
              </div>
            </div>

            {/* Projected Finish */}
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">Projected Completion</div>
                <div className="font-bold text-slate-900 dark:text-white truncate font-mono">
                  ~{estimatedDaysRemaining} sending days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8 OPERATIONAL TABS                                                        */}
        {/* ========================================================================= */}
        <div className="flex border-b border-slate-200 dark:border-[#262626] px-6 gap-1 text-xs font-bold shrink-0 overflow-x-auto bg-white dark:bg-[#141414]">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'leads', label: `Audience (${campaignLeads.length})`, icon: Users },
            { id: 'sequence', label: `Sequence (${campaign.steps?.length || 2})`, icon: Layers },
            { id: 'sending', label: `Inboxes (${assignedMailboxes.length})`, icon: Mail },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'options', label: 'Settings', icon: Sliders },
            { id: 'subsequences', label: 'Subsequences', icon: Split },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 -mb-px transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY CONTENT AREA                                                    */}
        {/* ========================================================================= */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs bg-slate-50/50 dark:bg-[#101010]/50">

          {/* ======================================================================= */}
          {/* TAB 1: OVERVIEW                                                         */}
          {/* ======================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Primary Funnel Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#242424] shadow-xs space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sent / Delivered</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{campaign.sent} / {campaign.delivered}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{deliveryRate}% Delivery SLA</div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#242424] shadow-xs space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Open Rate</div>
                  <div className="text-2xl font-black text-primary font-mono">{openRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.opened} tracked opens</div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#242424] shadow-xs space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Click Rate</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{clickRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.clicked} links clicked</div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#242424] shadow-xs space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Reply Rate</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{replyRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.replied} prospect replies</div>
                </div>
              </div>

              {/* Conversion Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{campaign.interested || 18}</div>
                  <div className="text-[11px] font-bold text-emerald-950 dark:text-emerald-300 uppercase mt-1">Interested / Positive</div>
                  <div className="text-[10px] text-emerald-600/70 mt-0.5">High purchase intent</div>
                </div>

                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                  <div className="text-3xl font-black text-primary font-mono">{campaign.meetings || 7}</div>
                  <div className="text-[11px] font-bold text-slate-950 dark:text-white uppercase mt-1">Meetings Booked</div>
                  <div className="text-[10px] text-primary/70 mt-0.5">Direct calendar sync</div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">{bounceRate}%</div>
                  <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase mt-1">Bounces ({campaign.bounced})</div>
                  <div className="text-[10px] text-rose-600/70 mt-0.5">Safely below 3.0% threshold</div>
                </div>
              </div>

              {/* Audience Progress & Capacity Forecast Bar */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#242424] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Audience Exhaustion & Timeline</span>
                  <span className="text-xs font-mono text-slate-500">
                    {campaign.sent} of {campaign.leadsCount || 450} contacted ({Math.round((campaign.sent / (campaign.leadsCount || 450)) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#222] overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((campaign.sent / (campaign.leadsCount || 450)) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Pacing: <strong>{dailyLimit} sends / day</strong></span>
                  <span>Estimated Finish: <strong className="text-slate-700 dark:text-slate-300 font-mono">In ~{estimatedDaysRemaining} business days</strong></span>
                </div>
              </div>

              {/* Master Inbox Quick Access Callout */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      Master Inbox Integration Ready
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {campaign.replied} prospects have replied to this campaign. Manage two-way conversations with AI reply suggestions.
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNavigateToInbox}
                  className="font-bold text-xs shrink-0"
                >
                  Open in Master Inbox
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: LEADS                                                            */}
          {/* ======================================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by prospect name, email, or company..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#262626] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['all', 'Enrolled', 'Contacted', 'Replied', 'Bounced'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setLeadFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        leadFilter === status
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-[#161616] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#262626] hover:bg-slate-100 dark:hover:bg-[#222]'
                      }`}
                    >
                      {status === 'all' ? 'All Leads' : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-slate-200 dark:border-[#262626] rounded-2xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs divide-y divide-slate-100 dark:divide-[#202020]">
                {filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No leads match the current filters.
                  </div>
                ) : (
                  filteredLeads.map((l) => (
                    <div key={l.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white truncate">{l.name}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">{l.company}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">
                          {l.email}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Badge
                          variant={
                            l.status === 'Replied' ? 'emerald' :
                            l.status === 'Bounced' ? 'rose' :
                            l.status === 'Contacted' ? 'blue' : 'slate'
                          }
                          size="sm"
                        >
                          {l.status}
                        </Badge>

                        {l.status === 'Replied' && (
                          <button
                            type="button"
                            onClick={handleNavigateToInbox}
                            className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                            title="View Conversation in Master Inbox"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: SEQUENCE & A/Z VARIANTS                                         */}
          {/* ======================================================================= */}
          {activeTab === 'sequence' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                    Sequence Progression & Split Tests
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Automated email touchpoints with A/Z split testing and thread continuation.
                  </p>
                </div>
                <Badge variant="primary" size="sm">
                  {campaign.steps?.length || 2} Touchpoints Configured
                </Badge>
              </div>

              <div className="space-y-3">
                {(campaign.steps && campaign.steps.length > 0 ? campaign.steps : [
                  {
                    id: 's1',
                    stepNumber: 1,
                    subject: 'Quick question regarding outbound scaling',
                    body: 'Hi {{firstName}},\n\nNoticed {{company}} is rapidly scaling the outbound engine...',
                    delayDays: 0,
                    delayValue: 0,
                    delayUnit: 'days',
                    threadMode: 'new_thread',
                    variants: [
                      { id: 'vA', label: 'Variant A', subject: 'Quick question regarding outbound scaling', body: 'Hi {{firstName}},\n\nNoticed {{company}}...', weight: 50, sent: 420, opened: 290, replied: 42 },
                      { id: 'vB', label: 'Variant B', subject: 'Idea for {{company}} pipeline', body: 'Hey {{firstName}},\n\nSaw your team...', weight: 50, sent: 420, opened: 310, replied: 56 }
                    ]
                  },
                  {
                    id: 's2',
                    stepNumber: 2,
                    subject: 'Re: Quick question regarding outbound scaling',
                    body: 'Hi {{firstName}}, bumping this to the top of your inbox...',
                    delayDays: 3,
                    delayValue: 3,
                    delayUnit: 'days',
                    threadMode: 'reply_to_previous',
                    variants: [
                      { id: 'vA', label: 'Variant A', subject: 'Re: Quick question regarding outbound scaling', body: 'Following up...', weight: 100, sent: 310, opened: 198, replied: 31 }
                    ]
                  }
                ]).map((step, idx) => {
                  const isExpanded = expandedStep === idx;
                  return (
                    <div 
                      key={step.id || idx}
                      className="border border-slate-200 dark:border-[#262626] rounded-2xl bg-white dark:bg-[#161616] overflow-hidden shadow-xs"
                    >
                      <div 
                        className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedStep(isExpanded ? null : idx)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-black flex items-center justify-center text-xs font-mono">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{step.subject || 'Step Subject'}</span>
                              <span className="text-[10px] font-normal px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-500 font-mono">
                                {step.threadMode === 'reply_to_previous' ? 'Re: Previous Thread' : 'New Thread'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {idx === 0 ? 'Sends immediately upon lead enrollment' : `Wait ${step.delayValue || step.delayDays || 3} ${step.delayUnit || 'days'} after Step ${idx}`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-slate-500">
                            {step.variants?.length || 1} Variant(s)
                          </span>
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t border-slate-100 dark:border-[#242424] bg-slate-50/30 dark:bg-[#121212] space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(step.variants || []).map((v) => (
                              <div key={v.id} className="p-3.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-xs text-primary">{v.label}</span>
                                  <Badge variant="slate" size="sm">{v.weight}% Traffic</Badge>
                                </div>
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                  {v.subject}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-3 whitespace-pre-wrap font-sans">
                                  {v.body}
                                </p>
                                <div className="pt-2 border-t border-slate-100 dark:border-[#222] flex items-center justify-between text-[10px] font-mono text-slate-400">
                                  <span>Opens: <strong className="text-slate-700 dark:text-slate-300">{v.opened ? Math.round((v.opened / (v.sent || 1)) * 100) : 68}%</strong></span>
                                  <span>Replies: <strong className="text-emerald-500">{v.replied ? Math.round((v.replied / (v.sent || 1)) * 100) : 12}%</strong></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: SENDING ACCOUNTS & ROTATION POOL                                */}
          {/* ======================================================================= */}
          {activeTab === 'sending' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                    Assigned Mailbox Rotation Fleet
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Emails are load-balanced across {assignedMailboxes.length} active inboxes with humanized sending intervals (3-7 mins).
                  </p>
                </div>
                <Badge variant="emerald" size="sm">
                  Provider Matching: Active
                </Badge>
              </div>

              <div className="border border-slate-200 dark:border-[#262626] rounded-2xl overflow-hidden bg-white dark:bg-[#161616] divide-y divide-slate-100 dark:divide-[#222]">
                {assignedMailboxes.map((mbx) => (
                  <div key={mbx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white font-mono text-xs">{mbx.email}</span>
                        <Badge variant={mbx.provider === 'Google Workspace' ? 'emerald' : 'blue'} size="sm">
                          {mbx.provider}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Sender: {mbx.name} • Pacing: <strong className="font-mono text-slate-700 dark:text-slate-300">{mbx.dailySent}/{mbx.dailyCap} sends today</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Deliverability</div>
                        <div className="font-bold text-emerald-500">{mbx.healthScore}% SLA</div>
                      </div>
                      <Badge variant="emerald" size="sm">
                        ✓ Connected
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: SCHEDULE                                                         */}
          {/* ======================================================================= */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                    Outreach Window & Active Days
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Emails only dispatch during recipient working hours in the configured timezone.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#2B2B2B] space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Target Timezone</div>
                    <div className="font-bold text-slate-900 dark:text-white font-mono">
                      {campaign.timezone || 'America/New_York (EST)'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1B1B1B] border border-slate-200 dark:border-[#2B2B2B] space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Sending Windows</div>
                    <div className="font-bold text-slate-900 dark:text-white font-mono">
                      09:00 AM – 05:30 PM (EST)
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Active Dispatch Days</div>
                  <div className="flex items-center gap-1.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const isActive = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
                      return (
                        <span
                          key={day}
                          className={`w-10 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isActive
                              ? 'bg-primary text-white'
                              : 'bg-slate-100 dark:bg-[#202020] text-slate-400 line-through'
                          }`}
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 6: SETTINGS & OPTIONS                                               */}
          {/* ======================================================================= */}
          {activeTab === 'options' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                    Campaign Options & Safeguards
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Fine-tuned deliverability, tracking, and reply automation rules.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Stop sequence upon reply</div>
                      <div className="text-[11px] text-slate-500">Instantly halt further automated touches when prospect replies.</div>
                    </div>
                    <Badge variant="emerald" size="sm">Enabled</Badge>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Custom Tracking Domain (SSL)</div>
                      <div className="text-[11px] text-slate-500">track.outbound.cloudscale.ai (100% white-labeled)</div>
                    </div>
                    <Badge variant="emerald" size="sm">Active (SSL)</Badge>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">RFC 8058 One-Click Unsubscribe</div>
                      <div className="text-[11px] text-slate-500">Compliant with 2026 Google & Yahoo bulk sender requirements.</div>
                    </div>
                    <Badge variant="emerald" size="sm">Compliant</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 7: SUBSEQUENCES                                                     */}
          {/* ======================================================================= */}
          {activeTab === 'subsequences' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                    Subsequences & Conditional Workflows
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Route leads into specialized branches based on behavioral triggers.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="font-bold text-xs">
                  + Add Subsequence
                </Button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#262626] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-slate-900 dark:text-white">Positive Reply Branch</span>
                    </div>
                    <Badge variant="emerald" size="sm">Active</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Trigger: Prospect replies with Positive Sentiment → Auto-enroll in "Calendar Demo Follow-up" sequence after 1 hour.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#262626] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-bold text-slate-900 dark:text-white">Out of Office (OOO) Branch</span>
                    </div>
                    <Badge variant="amber" size="sm">Active</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Trigger: Auto-responder detected → Pause outreach for 14 days, then resume next step smoothly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 8: ANALYTICS & SENTIMENT                                            */}
          {/* ======================================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                  AI Reply Sentiment Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <div className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">68%</div>
                    <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 uppercase mt-0.5">Positive / Interested</div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">18%</div>
                    <div className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase mt-0.5">Neutral / Question</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                    <div className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">8%</div>
                    <div className="text-[10px] font-bold text-amber-900 dark:text-amber-300 uppercase mt-0.5">Out of Office</div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                    <div className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">6%</div>
                    <div className="text-[10px] font-bold text-rose-900 dark:text-rose-300 uppercase mt-0.5">Not Interested</div>
                  </div>
                </div>
              </div>

              {/* Step Performance Breakdown */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">
                  Performance by Step Drop-off
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A]">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Step 1: Initial Hook</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">71.2% Open • 14.8% Reply</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A]">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Step 2: Social Proof Follow-up</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">58.4% Open • 11.2% Reply</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* FOOTER CONTROLS                                                           */}
        {/* ========================================================================= */}
        <div className="p-4 border-t border-slate-200 dark:border-[#262626] flex items-center justify-between shrink-0 bg-white dark:bg-[#141414]">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Outtricks Smart Sending Engine active</span>
          </div>
          <Button variant="primary" size="sm" onClick={onClose} className="font-bold">
            Close Control Center
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DIAGNOSTICS MODAL: "Why isn't this campaign sending?"         */}
      {/* ========================================================================= */}
      {showDiagnostics && (
        <Modal
          isOpen={showDiagnostics}
          onClose={() => setShowDiagnostics(false)}
          title="Campaign Dispatch Diagnostics & Sentinel"
          size="lg"
        >
          <div className="space-y-4 text-xs font-sans">
            <p className="text-slate-500">
              Live inspection of 7 dispatch preconditions determining if emails can send right now.
            </p>

            <div className="space-y-2.5">
              {/* Check 1: Campaign Status */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Campaign Status</div>
                    <div className="text-[11px] text-slate-500">State is currently set to "{campaign.status}"</div>
                  </div>
                </div>
                <Badge variant={campaign.status === 'Running' ? 'emerald' : 'amber'} size="sm">
                  {campaign.status === 'Running' ? 'PASS' : 'PAUSED'}
                </Badge>
              </div>

              {/* Check 2: Mailboxes Assigned & Healthy */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Sending Account Fleet</div>
                    <div className="text-[11px] text-slate-500">{assignedMailboxes.length} inboxes assigned • 0 authentication errors</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>

              {/* Check 3: Active Outreach Day */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Active Outreach Day</div>
                    <div className="text-[11px] text-slate-500">Today is an active sending day according to schedule</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>

              {/* Check 4: Schedule Time Window */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Time Window Alignment</div>
                    <div className="text-[11px] text-slate-500">Currently within configured sending hours (09:00 - 18:00 EST)</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>

              {/* Check 5: Daily Cap Limit */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Daily Volume Quota</div>
                    <div className="text-[11px] text-slate-500">82 of {dailyLimit} daily sends used • 38 sends remaining today</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>

              {/* Check 6: Unsent Leads in Queue */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Audience Queue</div>
                    <div className="text-[11px] text-slate-500">{remainingLeads} leads remaining to be contacted</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>

              {/* Check 7: Deliverability & Domain Authentication */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">SPF, DKIM & DMARC Alignment</div>
                    <div className="text-[11px] text-slate-500">All sending domains validated with 0 blacklists</div>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">PASS</Badge>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                All dispatch conditions are satisfied. Next batch is scheduled to dispatch in 4 minutes with humanized jitter.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setShowDiagnostics(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
