import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Eye, 
  Send, 
  Mail, 
  Flame, 
  Search, 
  Download, 
  Filter,
  User,
  Zap,
  Check,
  X
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInActivityEvent } from '../../context/LinkedInContext';

export const LinkedInActivityView: React.FC = () => {
  const { activities, accounts } = useLinkedIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [accountFilter, setAccountFilter] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<LinkedInActivityEvent | null>(null);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesSearch = 
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'All' || act.type === typeFilter;
      const matchesAccount = accountFilter === 'All' || act.account.includes(accountFilter);

      return matchesSearch && matchesType && matchesAccount;
    });
  }, [activities, searchQuery, typeFilter, accountFilter]);

  const handleExportCSV = () => {
    const headers = 'Timestamp,Type,Account,Prospect,Company,Result,Description\n';
    const rows = filteredActivities
      .map(
        (a) =>
          `"${a.timestamp}","${a.type}","${a.account}","${a.prospectName}","${a.company}","${a.result || 'Success'}","${a.description.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkedin-activity-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Connection Accepted':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Message Sent':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'Profile Viewed':
        return <Eye className="w-4 h-4 text-emerald-500" />;
      case 'InMail Sent':
        return <Mail className="w-4 h-4 text-emerald-500" />;
      case 'Campaign Started':
        return <Send className="w-4 h-4 text-emerald-500" />;
      case 'Lead Created':
        return <Flame className="w-4 h-4 text-amber-500" />;
      default:
        return <Zap className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Activity Audit Stream</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Chronological audit trail of outbound invites, accepted connections, profile touches, and sequence events.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportCSV}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export CSV
        </Button>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity description, prospect..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Account Filter */}
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Senders</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>

          {/* Activity Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Activity Types</option>
            <option value="Connection Accepted">Connection Accepted</option>
            <option value="Message Sent">Message Sent</option>
            <option value="Profile Viewed">Profile Viewed</option>
            <option value="InMail Sent">InMail Sent</option>
            <option value="Campaign Started">Campaign Started</option>
            <option value="Lead Created">Lead Created</option>
          </select>
        </div>
      </div>

      {/* 3. Chronological Timeline Stream */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-xs space-y-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => setSelectedActivity(act)}
              className="relative flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-[#1C1C1C]/40 border border-slate-200/60 dark:border-[#202020] hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              {/* Dot Icon on line */}
              <div className="absolute -left-6 top-5 w-5 h-5 rounded-full bg-white dark:bg-[#161616] border-2 border-emerald-500 flex items-center justify-center -translate-x-1/2 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center shrink-0">
                {getActivityIcon(act.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {act.type}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {act.account}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {act.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {act.description}
                </p>

                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 pt-1">
                  <span>Target: <strong className="text-slate-700 dark:text-slate-300">{act.prospectName}</strong></span>
                  <span>•</span>
                  <span>Company: {act.company}</span>
                </div>
              </div>

              {/* Result Pill */}
              <div className="shrink-0 hidden sm:block">
                <Badge variant={act.result === 'Accepted' || act.result === 'Success' ? 'emerald' : 'slate'} size="sm">
                  {act.result || 'Delivered'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Activity Inspector Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Activity Event</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedActivity.type}</h3>
                <span className="text-xs text-slate-400">Actor: {selectedActivity.account} • {selectedActivity.timestamp}</span>
              </div>
              <button onClick={() => setSelectedActivity(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">Target Contact</span>
                <strong className="text-slate-900 dark:text-white block">{selectedActivity.prospectName}</strong>
                <span className="text-slate-500">{selectedActivity.company}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <span className="text-[10px] text-slate-400 block font-bold">Event Log Description</span>
                <p className="text-slate-700 dark:text-slate-300">{selectedActivity.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] flex items-center justify-between">
                <span className="text-slate-400 font-mono">Verification Status</span>
                <span className="font-bold text-emerald-600 font-mono">✓ Dispatched via Static Residential Node</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedActivity(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
