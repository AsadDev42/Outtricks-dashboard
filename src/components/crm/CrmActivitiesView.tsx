import React, { useState } from 'react';
import { 
  Activity, 
  PhoneCall, 
  Mail, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  Search, 
  Calendar, 
  Building2, 
  User,
  Filter,
  X
} from 'lucide-react';
import { useCrm, CrmActivity } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatNumber } from '../../utils/formatters';

export const CrmActivitiesView: React.FC = () => {
  const { activities, createActivity } = useCrm();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Form states for manual activity logging
  const [logType, setLogType] = useState<CrmActivity['type']>('call');
  const [logTitle, setLogTitle] = useState('');
  const [logDetails, setLogDetails] = useState('');
  const [logContact, setLogContact] = useState('');
  const [logCompany, setLogCompany] = useState('');

  const filteredActivities = activities.filter((act) => {
    const matchesType = typeFilter === 'all' || act.type === typeFilter;
    const matchesSearch = 
      act.title.toLowerCase().includes(search.toLowerCase()) ||
      act.details.toLowerCase().includes(search.toLowerCase()) ||
      (act.contactName && act.contactName.toLowerCase().includes(search.toLowerCase())) ||
      (act.companyName && act.companyName.toLowerCase().includes(search.toLowerCase()));

    return matchesType && matchesSearch;
  });

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logTitle.trim()) return;

    createActivity({
      type: logType,
      title: logTitle,
      details: logDetails || 'Logged manual sales activity.',
      outcome: 'completed',
      contactName: logContact || 'Direct Contact',
      companyName: logCompany || 'Target Account',
      owner: 'Sarah Jenkins'
    });

    setIsLogModalOpen(false);
    setLogTitle('');
    setLogDetails('');
    setLogContact('');
    setLogCompany('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Unified Activity Center
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time multi-channel audit timeline across Voice SDR calls, Cold Emails, LinkedIn touches, and Meetings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsLogModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Log Activity
          </Button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities by title, notes, contact, or company..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px]"
          >
            <option value="all">All Activity Types</option>
            <option value="call">Voice SDR Calls</option>
            <option value="email">Cold Emails</option>
            <option value="meeting">Meetings & Demos</option>
            <option value="linkedin">LinkedIn Touches</option>
            <option value="task">Tasks</option>
            <option value="note">Internal Strategy Note</option>
          </select>

          <Badge variant="emerald" size="md">
            {formatNumber(filteredActivities.length)} Logged Events
          </Badge>
        </div>
      </div>

      {/* 3. Chronological Activity Stream */}
      <div className="space-y-3">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  {act.type === 'call' && <PhoneCall className="w-5 h-5" />}
                  {act.type === 'email' && <Mail className="w-5 h-5" />}
                  {act.type === 'meeting' && <Users className="w-5 h-5" />}
                  {act.type === 'linkedin' && <MessageSquare className="w-5 h-5" />}
                  {act.type === 'task' && <CheckCircle2 className="w-5 h-5" />}
                  {act.type === 'note' && <Activity className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {act.title}
                    </h3>
                    <Badge variant="emerald" size="sm">
                      {act.type}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {act.details}
                  </p>
                  {(act.contactName || act.companyName) && (
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Target: <strong className="text-slate-700 dark:text-slate-300">{act.contactName}</strong> @ <strong className="text-emerald-600 dark:text-emerald-400">{act.companyName}</strong> ({act.owner})
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {act.timestamp}
                </span>
                <Badge variant="emerald" size="sm">
                  {act.outcome}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Log Activity Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Log Sales Activity</h3>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Activity Type</label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="call">Voice Call</option>
                  <option value="email">Email Sent / Replied</option>
                  <option value="meeting">Discovery Meeting / Demo</option>
                  <option value="linkedin">LinkedIn Message</option>
                  <option value="task">Action Task</option>
                  <option value="note">Internal Strategy Note</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  placeholder="e.g. Discovery call with VP of Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={logContact}
                    onChange={(e) => setLogContact(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={logCompany}
                    onChange={(e) => setLogCompany(e.target.value)}
                    placeholder="e.g. Stripe Inc."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Details & Outcomes</label>
                <textarea
                  rows={3}
                  value={logDetails}
                  onChange={(e) => setLogDetails(e.target.value)}
                  placeholder="Key discussion points, objections, and next action items..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsLogModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Log Activity
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
