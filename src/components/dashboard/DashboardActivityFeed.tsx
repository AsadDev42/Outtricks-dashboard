import React, { useState } from 'react';
import { 
  Activity, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Users, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Filter 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export interface FeedEvent {
  id: string;
  type: 'email' | 'linkedin' | 'voice' | 'lead' | 'crm';
  title: string;
  prospectName: string;
  company: string;
  avatar: string;
  description: string;
  time: string;
  sentiment?: 'positive' | 'meeting' | 'neutral' | 'verified';
  value?: string;
  actionText?: string;
  targetTab?: string;
}

const INITIAL_EVENTS: FeedEvent[] = [
  {
    id: 'evt_1',
    type: 'voice',
    title: 'Voice AI SDR Call Completed',
    prospectName: 'Sarah Jenkins',
    company: 'CloudScale AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    description: 'Autonomous call completed in 2m 44s. Budget & timeline qualified. Demo confirmed for Thursday 2:00 PM PST.',
    time: '2m ago',
    sentiment: 'meeting',
    value: '$48,000 ARR',
    actionText: 'View Call Recording & Transcript',
    targetTab: 'voice'
  },
  {
    id: 'evt_2',
    type: 'email',
    title: 'Warm Reply Received (Inbox #4)',
    prospectName: 'David Chen',
    company: 'SaaSFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    description: '"Hey Alex, thanks for the note. We\'re actually looking to replace our fragmented stack this quarter. Send over pricing and calendar link."',
    time: '14m ago',
    sentiment: 'positive',
    actionText: 'Reply in Unified Inbox',
    targetTab: 'inbox'
  },
  {
    id: 'evt_3',
    type: 'crm',
    title: 'Deal Advanced to Proposal Stage',
    prospectName: 'Elena Rostova',
    company: 'FinTech Pulse',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    description: 'Security architecture approved. Deal value updated to $75,000 ARR with 85% close probability.',
    time: '42m ago',
    sentiment: 'positive',
    value: '$75,000 ARR',
    actionText: 'Open CRM Kanban Card',
    targetTab: 'pipeline'
  },
  {
    id: 'evt_4',
    type: 'lead',
    title: '500 ICP Leads Added to Workspace',
    prospectName: 'Lead Batch #108',
    company: 'US B2B SaaS Decision Makers',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    description: 'Target account profiles added with verified work emails and direct contact details.',
    time: '1h ago',
    sentiment: 'verified',
    actionText: 'Push to Cold Sequence',
    targetTab: 'leads'
  },
  {
    id: 'evt_5',
    type: 'linkedin',
    title: 'Connection Accepted & Sequence Triggered',
    prospectName: 'Marcus Vance',
    company: 'Apex HealthTech',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    description: 'Invite accepted via residential cloud proxy. Automated Sequence Step 2 personalized DM dispatched.',
    time: '2h ago',
    sentiment: 'neutral',
    actionText: 'View LinkedIn Thread',
    targetTab: 'flow'
  },
];

export const DashboardActivityFeed: React.FC<{ onNavigateTab: (tabId: string) => void }> = ({
  onNavigateTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'email' | 'voice' | 'linkedin' | 'crm'>('all');
  const [events, setEvents] = useState<FeedEvent[]>(INITIAL_EVENTS);
  const [followupsDismissed, setFollowupsDismissed] = useState(false);
  const { success } = useToast();

  const handleDispatchFollowups = () => {
    success('Dispatched 3 automated AI follow-ups across warmed mailboxes.', 'Sequence Activated');
    setFollowupsDismissed(true);
  };

  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.type === filter);

  const icons = {
    voice: <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    email: <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    crm: <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    lead: <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    linkedin: <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  };

  const sentimentBadges = {
    meeting: <Badge variant="emerald" size="sm">Demo Confirmed</Badge>,
    positive: <Badge variant="emerald" size="sm">Positive Intent</Badge>,
    verified: <Badge variant="emerald" size="sm">100% Deliverable</Badge>,
    neutral: <Badge variant="slate" size="sm">Touchpoint</Badge>,
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Overdue Follow-ups Alert Notice */}
      {!followupsDismissed && (
        <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-sm shrink-0">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-emerald-100">
                3 Overdue AI Follow-Ups Ready to Dispatch
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Prospects opened Step 2 emails over 24h ago without replying. AI Voice SDR has staged personalized objection-handling voicemails and calendar booking touchpoints.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <Button variant="secondary" size="sm" onClick={() => setFollowupsDismissed(true)}>
              Dismiss
            </Button>
            <Button variant="primary" size="sm" onClick={handleDispatchFollowups}>
              Dispatch All 3
            </Button>
          </div>
        </div>
      )}

      {/* Main Activity Feed Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
                Live Outbound Telemetry Stream
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time activity logs from email rotation, voice calls, LinkedIn DMs, and CRM updates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'voice', label: 'Voice AI' },
              { id: 'email', label: 'Email' },
              { id: 'crm', label: 'Deals CRM' },
              { id: 'linkedin', label: 'LinkedIn' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Event Rows */}
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04] space-y-1">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => evt.targetTab && onNavigateTab(evt.targetTab)}
              className="pt-3 pb-3 first:pt-1 last:pb-1 rounded-2xl hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C]/60 p-3 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={evt.avatar}
                    alt={evt.prospectName}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shadow-2xs"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-white dark:bg-[#161616] shadow-xs border border-slate-200 dark:border-[#2A2A2A]">
                    {icons[evt.type]}
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {evt.prospectName}
                    </h5>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      ({evt.company})
                    </span>
                    {evt.sentiment && sentimentBadges[evt.sentiment]}
                    {evt.value && (
                      <Badge variant="emerald" size="sm">
                        {evt.value}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    <span>{evt.actionText || 'View details'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 shrink-0 self-start sm:self-center">
                {evt.time}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
