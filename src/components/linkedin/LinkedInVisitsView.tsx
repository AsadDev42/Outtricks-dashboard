import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Clock, 
  UserPlus, 
  Send, 
  ExternalLink, 
  Search, 
  Flame, 
  Plus, 
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const LinkedInVisitsView: React.FC = () => {
  const { visits, sendInvite } = useLinkedIn();
  const { success } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');

  const filteredVisits = useMemo(() => {
    return visits.filter((v) => {
      const matchesSearch = 
        v.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIntent = intentFilter === 'All' || v.intent === intentFilter;
      return matchesSearch && matchesIntent;
    });
  }, [visits, searchQuery, intentFilter]);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Profile Visits & Touch Radar ({visits.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track people who visited or interacted with your managed LinkedIn profiles to trigger warm follow-ups.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => success('Stealth profile touch queue running: 18 visits scheduled for today.', 'Auto-Touch Active')}
          leftIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
        >
          Auto-Touch Queue
        </Button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Profile Views</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">1,240</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Reciprocal Views</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">348 (28%)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Inbound Follows</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+112 Profiles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">High Intent Signals</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">42 Warm Leads</span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search visitor name, company, title..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1">
          {(['All', 'High Intent', 'Reciprocal View', 'Warm Touch'] as const).map((it) => (
            <button
              key={it}
              onClick={() => setIntentFilter(it)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                intentFilter === it
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {it}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Visits Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Visitor & Title</th>
                <th className="py-3.5 px-3">Company</th>
                <th className="py-3.5 px-3">Visit Timestamp</th>
                <th className="py-3.5 px-3">Source Channel</th>
                <th className="py-3.5 px-3">Intent Signal</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredVisits.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={v.avatar} alt={v.prospectName} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{v.prospectName}</div>
                        <div className="text-[10px] text-slate-400">{v.title}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {v.company}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                    {v.timestamp}
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium max-w-xs truncate">
                    {v.source || 'Outreach Touch Radar'}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      v.intent === 'High Intent' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                      v.intent === 'Reciprocal View' ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#2A2A2A]'
                    }`}>
                      {v.intent || 'Warm Touch'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          success(`${v.prospectName} added to Prospects.`, 'Prospect Saved');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Add Prospect</span>
                      </button>

                      <button
                        onClick={() => navigate('/linkedin/campaigns')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 dark:hover:bg-[#242424] text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer transition-colors"
                      >
                        Enroll
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
