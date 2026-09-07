import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink, 
  Search, 
  Download, 
  Filter, 
  Users, 
  Calendar,
  Send,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLinkedIn } from '../../context/LinkedInContext';
import { useNavigate } from 'react-router-dom';

export const LinkedInConnectionsView: React.FC = () => {
  const { connections } = useLinkedIn();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredConnections = useMemo(() => {
    return connections.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [connections, searchQuery, statusFilter]);

  const handleExportCSV = () => {
    const headers = 'Name,Company,Title,ConnectedDate,Status,Source\n';
    const rows = filteredConnections
      .map(
        (c) =>
          `"${c.name}","${c.company}","${c.title}","${c.connectedAt}","${c.status || '1st Degree'}","${c.sourceCampaign || 'LinkedIn Campaign'}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkedin-connections-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>LinkedIn Connections ({connections.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Decision makers who accepted your automated or manual LinkedIn connection requests.
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

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Network</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">5,240</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">New This Week</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+48 Accepted</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Pending Requests</span>
          <span className="text-xl font-extrabold text-amber-500 font-mono">18</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">38.4%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Hot Inbound Replies</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">32 DMs</span>
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
            placeholder="Search connections by name, company, title..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1">
          {(['All', '1st Degree', 'Pending Accept', 'Declined'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Connections Table */}
      <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Contact Name & Title</th>
                <th className="py-3.5 px-3">Company</th>
                <th className="py-3.5 px-3">Connection Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Source Campaign</th>
                <th className="py-3.5 px-4 text-right">Direct Messaging</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredConnections.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.title}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {c.company}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                    {c.connectedAt}
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge variant={c.status === '1st Degree' ? 'emerald' : 'slate'} size="sm">
                      {c.status || '1st Degree'}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium max-w-xs truncate">
                    {c.sourceCampaign || 'VP Sales Outreach'}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/linkedin/messages')}
                      leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                    >
                      Message ({c.messagesCount || 2})
                    </Button>
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
