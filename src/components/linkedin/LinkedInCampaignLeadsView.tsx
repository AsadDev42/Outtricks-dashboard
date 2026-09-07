import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Flame, 
  ExternalLink, 
  MoreHorizontal, 
  Trash2, 
  Pause, 
  Play, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Bot, 
  FileText, 
  UploadCloud,
  Layers
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { 
  useLinkedIn, 
  LinkedInCampaign, 
  LinkedInCampaignLead 
} from '../../context/LinkedInContext';
import { useCrm } from '../../context/CrmContext';

export interface LinkedInCampaignLeadsViewProps {
  campaign: LinkedInCampaign;
}

export const LinkedInCampaignLeadsView: React.FC<LinkedInCampaignLeadsViewProps> = ({ campaign }) => {
  const { 
    removeLeadFromCampaign, 
    updateLeadInCampaign, 
    enrichCampaignLeads,
    addLeadsToCampaign 
  } = useLinkedIn();
  const { contacts } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [activeLeadDetail, setActiveLeadDetail] = useState<LinkedInCampaignLead | null>(null);
  const [isAddLeadsOpen, setIsAddLeadsOpen] = useState(false);
  const [isEnrichOpen, setIsEnrichOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter leads
  const filteredLeads = useMemo(() => {
    return (campaign.leadsList || []).filter((l) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaign.leadsList, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  const toggleSelectAll = () => {
    if (selectedLeadIds.size === paginatedLeads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(paginatedLeads.map((l) => l.id)));
    }
  };

  const toggleSelectLead = (id: string) => {
    const next = new Set(selectedLeadIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedLeadIds(next);
  };

  const handleEnrich = (type: 'emails' | 'phones' | 'profiles' | 'verify') => {
    enrichCampaignLeads(campaign.id, type);
    setIsEnrichOpen(false);
  };

  const handleImportCrmContacts = () => {
    const crmLeads = contacts.slice(0, 10).map((c) => ({
      name: c.name,
      firstName: c.name.split(' ')[0],
      lastName: c.name.split(' ').slice(1).join(' '),
      title: c.title,
      company: c.companyName,
      email: c.email,
      phone: c.phone,
      linkedinUrl: c.linkedinUrl || 'https://linkedin.com/in/prospect',
      leadScore: c.score || 2,
    }));
    addLeadsToCampaign(campaign.id, crmLeads);
    setIsAddLeadsOpen(false);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      
      {/* 1. Top AI Enrichment Promo Banner (matches benchmark screenshot 2) */}
      <div className="p-3.5 rounded-2xl bg-primary/10 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Use AI to clean and research your leads, and personalize copywriting at scale.
            </span>
            <span className="ml-2 text-primary font-bold">50 AI runs for free.</span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-slate-500 shrink-0">
          0/50 runs
        </div>
      </div>

      {/* 2. Search, Filter & Bulk Enrichment Bar */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Search & Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email, last name, first name, phone number..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <Dropdown
            trigger={
              <Button variant="secondary" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
                {statusFilter === 'All' ? 'Filters' : `Status: ${statusFilter}`}
              </Button>
            }
            items={['All', 'In progress', 'Completed', 'Connected', 'Replied', 'Stopped'].map((st) => ({
              label: (
                <div className="flex items-center justify-between w-full">
                  <span>{st}</span>
                  {statusFilter === st && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
              ),
              onClick: () => setStatusFilter(st as any),
            }))}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          
          <Button variant="secondary" size="sm" leftIcon={<Bot className="w-3.5 h-3.5 text-purple-500" />}>
            Create AI Columns
          </Button>

          {/* Add Leads Dropdown */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsAddLeadsOpen(!isAddLeadsOpen)}
            >
              Add leads <ChevronDown className="w-3 h-3 ml-1" />
            </Button>

            {isAddLeadsOpen && (
              <div className="absolute right-0 mt-1 w-52 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] shadow-xl z-30 p-1.5 space-y-1">
                <button
                  type="button"
                  onClick={handleImportCrmContacts}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-500" /> Select from CRM
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleEnrich('verify');
                    setIsAddLeadsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-blue-500" /> Import CSV
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddLeadsOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-purple-500" /> Manually add lead
                </button>
              </div>
            )}
          </div>

          {/* Enrich 210 Leads Button (matches screenshot 2) */}
          <div className="relative">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => setIsEnrichOpen(!isEnrichOpen)}
            >
              Enrich {campaign.targetCount || 210} leads <ChevronDown className="w-3 h-3 ml-1" />
            </Button>

            {isEnrichOpen && (
              <div className="absolute right-0 mt-1 w-64 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] shadow-xl z-30 p-1.5 space-y-1">
                <button
                  type="button"
                  onClick={() => handleEnrich('phones')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Find phone numbers
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#252525] text-slate-500">20</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEnrich('emails')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Find verified emails
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#252525] text-slate-500">5</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEnrich('profiles')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> Find LinkedIn profiles
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#252525] text-slate-500">1</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEnrich('verify')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Verify primary emails
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#252525] text-slate-500">1</span>
                </button>

                <div className="border-t border-slate-100 dark:border-[#2A2A2A] my-1" />

                <button
                  type="button"
                  onClick={() => setIsEnrichOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-[#252525] flex items-center gap-2 cursor-pointer text-blue-600 dark:text-blue-400"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Use AI
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 3. Leads Table (matches benchmark screenshot 2) */}
      <div className="rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/75 dark:bg-[#1A1A1A] text-[11px] font-bold text-slate-500 dark:text-slate-400 select-none">
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.size === paginatedLeads.length && paginatedLeads.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="p-3 font-semibold">Full name</th>
                <th className="p-3 font-semibold">First name</th>
                <th className="p-3 font-semibold">Last name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Owner</th>
                <th className="p-3 font-semibold text-center">Lead score</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#222222]">
              {paginatedLeads.map((lead) => {
                const isSelected = selectedLeadIds.has(lead.id);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setActiveLeadDetail(lead)}
                    className={`hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C] transition-colors cursor-pointer ${
                      isSelected ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>

                    {/* Full Name & LinkedIn Icon */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {lead.name}
                        </span>
                        <a
                          href={lead.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#0A66C2] hover:opacity-80"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        </a>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {lead.title} • {lead.company}
                      </div>
                    </td>

                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      {lead.firstName}
                    </td>

                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      {lead.lastName}
                    </td>

                    {/* Email / Find Email Button */}
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      {lead.email ? (
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {lead.email}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => enrichCampaignLeads(campaign.id, 'emails')}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/30 hover:bg-primary/20 cursor-pointer uppercase font-mono"
                        >
                          Find Email
                        </button>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td className="p-3">
                      {lead.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : campaign.status === 'Paused' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Pause className="w-3 h-3" /> Campaign paused
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/30">
                          <Clock className="w-3 h-3" /> In progress
                        </span>
                      )}
                    </td>

                    {/* Owner Badge */}
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[9px] flex items-center justify-center">
                          AF
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {lead.owner}
                        </span>
                      </div>
                    </td>

                    {/* Lead Score */}
                    <td className="p-3 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500/20" /> {lead.leadScore}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setActiveLeadDetail(lead)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 border-t border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-[#1A1A1A] flex items-center justify-between text-xs text-slate-500">
          <div>
            1 - {Math.min(paginatedLeads.length, filteredLeads.length)} of {filteredLeads.length} leads
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-1 font-mono font-bold text-slate-900 dark:text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-[#2A2A2A] hover:bg-white dark:hover:bg-[#252525] disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Interactive Lead Touchpoint Timeline Drawer */}
      {activeLeadDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md h-full bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto font-sans">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                      {activeLeadDetail.name}
                    </h3>
                    <a
                      href={activeLeadDetail.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0A66C2]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeLeadDetail.title} • {activeLeadDetail.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLeadDetail(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2A2A2A] text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lead Properties */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="font-mono text-slate-900 dark:text-white">{activeLeadDetail.email || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone</span>
                  <span className="font-mono text-slate-900 dark:text-white">{activeLeadDetail.phone || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Step</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeLeadDetail.currentStepTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Score</span>
                  <span className="font-mono font-bold text-amber-500">🔥 {activeLeadDetail.leadScore}</span>
                </div>
              </div>

              {/* Chronological Touchpoint Timeline (Section 20 benchmark) */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Touchpoint Timeline
                </h4>

                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-[#2A2A2A]">
                  {(activeLeadDetail.timeline && activeLeadDetail.timeline.length > 0 ? activeLeadDetail.timeline : [
                    { id: '1', date: 'Jul 5', timestamp: '10:00 AM', stepTitle: 'Visit profile', action: 'Profile viewed via London residential proxy', status: 'Success' },
                    { id: '2', date: 'Jul 6', timestamp: '11:15 AM', stepTitle: 'Invitation', action: 'Connection request sent with personalized note', status: 'Success' },
                    { id: '3', date: 'Jul 8', timestamp: '02:30 PM', stepTitle: 'Acceptance', action: 'Connection accepted (1st degree)', status: 'Success' },
                    { id: '4', date: 'Jul 9', timestamp: '09:05 AM', stepTitle: 'Chat message', action: 'Welcome touchpoint delivered', status: 'Success' },
                  ]).map((t, idx) => (
                    <div key={t.id || idx} className="flex items-start gap-3 relative pl-6">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#161616] absolute left-2 top-1 -translate-x-1/2" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{t.stepTitle}</span>
                          <span className="text-[10px] text-slate-400">{t.date} • {t.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {t.action}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between gap-3">
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  removeLeadFromCampaign(campaign.id, activeLeadDetail.id);
                  setActiveLeadDetail(null);
                }}
              >
                Remove from Campaign
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveLeadDetail(null)}
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
