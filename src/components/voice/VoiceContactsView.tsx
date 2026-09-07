import React, { useState } from 'react';
import {
  Users,
  Search,
  PhoneCall,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Building,
  Tag,
  PhoneForwarded,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { useToast } from '../../context/ToastContext';

interface CallingContact {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  timezone: string;
  callStatus: 'Not Called' | 'Connected' | 'Voicemail' | 'Qualified' | 'DNC';
  lastCallDate: string | null;
  assignedCampaign: string;
  intentScore: number;
}

const INITIAL_CALLING_CONTACTS: CallingContact[] = [
  {
    id: 'c-1',
    name: 'Marcus Vance',
    title: 'VP of Growth & Pipeline',
    company: 'HyperScale Systems',
    phone: '+1 (415) 890-2134',
    timezone: 'PST (UTC-8)',
    callStatus: 'Connected',
    lastCallDate: 'Today, 10:14 AM',
    assignedCampaign: 'Q4 Outbound Enterprise',
    intentScore: 94
  },
  {
    id: 'c-2',
    name: 'Sarah Lindqvist',
    title: 'Director of RevOps',
    company: 'Nordic Cloud Tech',
    phone: '+1 (212) 555-0199',
    timezone: 'EST (UTC-5)',
    callStatus: 'Qualified',
    lastCallDate: 'Yesterday, 3:45 PM',
    assignedCampaign: 'Inbound Fast Response',
    intentScore: 88
  },
  {
    id: 'c-3',
    name: 'David Kalu',
    title: 'Chief Operating Officer',
    company: 'FinLeap Global',
    phone: '+1 (312) 420-7711',
    timezone: 'CST (UTC-6)',
    callStatus: 'Not Called',
    lastCallDate: null,
    assignedCampaign: 'Fintech Scaleups',
    intentScore: 85
  },
  {
    id: 'c-4',
    name: 'Elena Rostova',
    title: 'Head of Sales Development',
    company: 'Vertex Analytics',
    phone: '+44 20 7946 0912',
    timezone: 'GMT (UTC+0)',
    callStatus: 'Voicemail',
    lastCallDate: 'Oct 14, 2:10 PM',
    assignedCampaign: 'EMEA Enterprise Outreach',
    intentScore: 76
  },
  {
    id: 'c-5',
    name: 'Jordan Miller',
    title: 'Co-Founder & CEO',
    company: 'OmniFlow AI',
    phone: '+1 (650) 314-8890',
    timezone: 'PST (UTC-8)',
    callStatus: 'Qualified',
    lastCallDate: 'Oct 15, 11:30 AM',
    assignedCampaign: 'AI Founders Series A',
    intentScore: 96
  },
  {
    id: 'c-6',
    name: 'Arthur Pendelton',
    title: 'VP Security Architecture',
    company: 'ShieldGrid Labs',
    phone: '+1 (206) 555-0144',
    timezone: 'PST (UTC-8)',
    callStatus: 'DNC',
    lastCallDate: 'Sep 28, 4:12 PM',
    assignedCampaign: 'Enterprise Security Tier 1',
    intentScore: 32
  }
];

export const VoiceContactsView: React.FC = () => {
  const { startOutboundCall } = useVoiceAi();
  const { success, info } = useToast();
  const [contacts, setContacts] = useState<CallingContact[]>(INITIAL_CALLING_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || c.callStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDial = (c: CallingContact) => {
    if (c.callStatus === 'DNC') {
      info('Cannot call: Contact is registered in Do-Not-Contact compliance list.');
      return;
    }
    startOutboundCall(c.name, c.company, c.phone);
    success(`Dialing ${c.name} via WebRTC line...`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Calling Contacts & Audiences
            </h1>
            <Badge variant="slate" size="sm">
              {contacts.length} Total Contacts
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Validated direct dial phone numbers mapped to outbound AI calling campaigns with DNC screening and timezone verification.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => info('CSV Import wizard initialized.')}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Import Phone List
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, company, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#282828] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['all', 'Not Called', 'Connected', 'Qualified', 'Voicemail', 'DNC'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer capitalize shrink-0 ${
                statusFilter === st
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A2A2A]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#242424] bg-slate-50/75 dark:bg-[#1A1A1A]/80 text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4 font-bold">Contact & Role</th>
                <th className="py-3 px-4 font-bold">Direct Phone</th>
                <th className="py-3 px-4 font-bold">Timezone</th>
                <th className="py-3 px-4 font-bold">Call Status</th>
                <th className="py-3 px-4 font-bold">Campaign</th>
                <th className="py-3 px-4 font-bold">Last Call</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {c.title} • <span className="font-medium text-slate-700 dark:text-slate-300">{c.company}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {c.phone}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {c.timezone}
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        c.callStatus === 'Qualified'
                          ? 'emerald'
                          : c.callStatus === 'Connected'
                          ? 'blue'
                          : c.callStatus === 'Voicemail'
                          ? 'amber'
                          : c.callStatus === 'DNC'
                          ? 'rose'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {c.callStatus}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 text-xs">
                    {c.assignedCampaign}
                  </td>

                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs font-mono">
                    {c.lastCallDate || '—'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant={c.callStatus === 'DNC' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleDial(c)}
                        disabled={c.callStatus === 'DNC'}
                        leftIcon={c.callStatus === 'DNC' ? <ShieldAlert className="w-3 h-3 text-rose-500" /> : <PhoneCall className="w-3 h-3" />}
                      >
                        {c.callStatus === 'DNC' ? 'Blocked' : 'Call AI SDR'}
                      </Button>
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

export default VoiceContactsView;
