import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  DollarSign, 
  FileEdit, 
  Workflow, 
  Search, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export type ApplicationFilterStatus = 
  | 'all'
  | 'submitted'
  | 'interviewing'
  | 'proposals'
  | 'drafts'
  | 'follow-ups'
  | 'won';

export interface ApplicationsViewProps {
  initialFilter?: ApplicationFilterStatus;
  mode?: 'applications' | 'proposals';
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  initialFilter = 'all',
  mode = 'applications',
}) => {
  const { 
    applications, 
    interviews, 
    proposals, 
    proposalDrafts, 
    followUps 
  } = useUpwork();

  const [activeFilter, setActiveFilter] = useState<ApplicationFilterStatus>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  // Counts for each tab
  const counts = {
    all: mode === 'proposals' 
      ? proposalDrafts.length + applications.filter(a => a.status === 'Submitted' || a.status === 'Viewed' || a.status === 'Shortlisted').length
      : applications.length + proposalDrafts.length + followUps.length,
    submitted: applications.filter(a => a.status === 'Submitted' || a.status === 'Viewed' || a.status === 'Shortlisted').length,
    interviewing: interviews.length + applications.filter(a => a.status === 'Interview').length,
    proposals: proposals.length,
    drafts: proposalDrafts.length,
    'follow-ups': followUps.length,
    won: applications.filter(a => a.status === 'Hired').length,
    archived: 0,
  };

  const appFilterTabs: { id: ApplicationFilterStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All Items', count: counts.all },
    { id: 'submitted', label: 'Submitted', count: counts.submitted },
    { id: 'interviewing', label: 'Interviewing', count: counts.interviewing },
    { id: 'proposals', label: 'Proposals', count: counts.proposals },
    { id: 'drafts', label: 'Drafts', count: counts.drafts },
    { id: 'follow-ups', label: 'Follow-ups', count: counts['follow-ups'] },
    { id: 'won', label: 'Won / Hired', count: counts.won },
  ];

  const proposalTabs: { id: ApplicationFilterStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'drafts', label: 'Drafts', count: counts.drafts },
    { id: 'submitted', label: 'Sent', count: counts.submitted },
    { id: 'won', label: 'Archived', count: counts.archived },
  ];

  const currentTabs = mode === 'proposals' ? proposalTabs : appFilterTabs;

  // Filter applications based on activeFilter & searchQuery
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'submitted') return app.status === 'Submitted' || app.status === 'Viewed' || app.status === 'Shortlisted';
    if (activeFilter === 'interviewing') return app.status === 'Interview';
    if (activeFilter === 'proposals') return true;
    if (activeFilter === 'won') return app.status === 'Hired';
    return false;
  });

  const filteredDrafts = proposalDrafts.filter(d => 
    d.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowUps = followUps.filter(f => 
    f.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInterviews = interviews.filter(i => 
    i.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-primary-muted flex items-center justify-center text-primary">
                {mode === 'proposals' ? <FileEdit className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                {mode === 'proposals' ? 'Proposals & AI Drafts Workspace' : 'Applications, Proposals & Deal Stages'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              {mode === 'proposals'
                ? 'Generate, edit, and dispatch high-converting AI cover letters and track live submission status.'
                : 'Unified outbound deal pipeline tracking proposals from initial AI draft to client response, interview, and contract award.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by job or client..."
              className="w-full pl-3 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Compact Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-[#222222] pt-4">
          {currentTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-black/25 text-white font-bold'
                      : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        
        {/* 1. DRAFTS VIEW (When 'drafts' or 'all' filter selected) */}
        {(activeFilter === 'drafts' || (activeFilter === 'all' && filteredDrafts.length > 0)) && (
          <div className="space-y-3">
            {activeFilter === 'all' && (
              <div className="flex items-center gap-2 px-1">
                <FileEdit className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Unfinished Proposal Drafts ({filteredDrafts.length})
                </h3>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                        {draft.jobTitle}
                      </span>
                      <Badge variant="amber" size="sm">Draft</Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Client: {draft.clientName} • Last updated {draft.lastUpdated}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {draft.draftText}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-[#222222] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Saved locally in session</span>
                    <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                      Resume Draft
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. INTERVIEWS VIEW (When 'interviewing' filter selected) */}
        {activeFilter === 'interviewing' && (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
            {filteredInterviews.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No active client interviews matching criteria.</div>
            ) : (
              filteredInterviews.map((int) => (
                <div key={int.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={int.clientAvatar} alt={int.clientName} className="w-10 h-10 rounded-2xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{int.jobTitle}</div>
                      <div className="text-[11px] text-slate-500">{int.clientName} • Time: <span className="font-bold text-primary">{int.scheduledTime}</span></div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Next Step: {int.nextAction}</div>
                    </div>
                  </div>

                  <Button variant="primary" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                    Open Chat Room
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. FOLLOW-UPS VIEW (When 'follow-ups' filter selected) */}
        {activeFilter === 'follow-ups' && (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
            {filteredFollowUps.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No scheduled follow-ups pending.</div>
            ) : (
              filteredFollowUps.map((f) => (
                <div key={f.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">{f.jobTitle}</span>
                      <Badge variant={f.status === 'Sent' ? 'emerald' : 'amber'} size="sm">{f.status}</Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 font-sans">
                      Client: {f.clientName} • Target Schedule: <span className="font-bold text-slate-800 dark:text-slate-200">{f.scheduledDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans italic line-clamp-1">"{f.message}"</div>
                  </div>

                  <Button variant="outline" size="sm">
                    Trigger Nurture Touch
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 4. DISPATCHED PROPOSALS & APPLICATIONS LIST */}
        {activeFilter !== 'drafts' && activeFilter !== 'interviewing' && activeFilter !== 'follow-ups' && (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
            {filteredApplications.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                No applications matching filter <span className="font-mono text-primary font-bold">"{activeFilter}"</span>.
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]/40 transition-colors">
                  <div className="space-y-1.5 min-w-0 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {app.jobTitle}
                      </span>
                      <Badge
                        variant={
                          app.status === 'Hired' || app.status === 'Interview'
                            ? 'emerald'
                            : app.status === 'Shortlisted'
                            ? 'blue'
                            : app.status === 'Declined'
                            ? 'rose'
                            : 'purple'
                        }
                        size="sm"
                      >
                        {app.status}
                      </Badge>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 flex-wrap">
                      <span>Client: <strong className="text-slate-700 dark:text-slate-300">{app.clientName}</strong></span>
                      <span>•</span>
                      <span>Submitted: {app.submittedDate}</span>
                      <span>•</span>
                      <span>Rate: <strong className="text-primary font-bold">{app.rateProposed}</strong></span>
                    </div>

                    {app.proposalText && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 font-sans">
                        "{app.proposalText}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                    {app.earnings ? (
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase">Gross Revenue</div>
                        <span className="font-extrabold text-primary text-sm">
                          +${app.earnings.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        View Proposal
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  );
};
