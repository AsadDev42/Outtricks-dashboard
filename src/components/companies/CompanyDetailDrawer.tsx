import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useToast } from '../../context/ToastContext';
import { useCompanies, WorkspaceCompany, CompanyStatusType } from '../../context/CompaniesContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { 
  Building2, 
  Globe, 
  Linkedin, 
  MapPin, 
  Cpu, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Mail, 
  Phone, 
  ExternalLink, 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  PhoneCall, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export interface CompanyDetailDrawerProps {
  company: WorkspaceCompany | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEditModal?: (company: WorkspaceCompany) => void;
}

export const CompanyDetailDrawer: React.FC<CompanyDetailDrawerProps> = ({
  company,
  isOpen,
  onClose,
  onOpenEditModal,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState([
    {
      id: 'cnote_1',
      author: 'Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content: 'Account is actively scaling their outbound SDR tech stack. Decision maker opened email step 2.',
      timestamp: '2 hours ago',
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const { updateCompanyStatus, updateCompanyOwner } = useCompanies();
  const { success, info } = useToast();

  if (!company) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setNotes([
      {
        id: `cnote_${Date.now()}`,
        author: 'You',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: newNoteText.trim(),
        timestamp: 'Just now',
      },
      ...notes,
    ]);
    setNewNoteText('');
    success('Note saved to company account history.', 'Note Posted');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between gap-3 w-full pr-6 font-sans">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={company.logo}
              alt={company.name}
              className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shadow-xs shrink-0"
            />
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-950 dark:text-white truncate">
                  {company.name}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate font-mono">
                {company.domain} • {company.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenEditModal?.(company)}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit
            </Button>
          </div>
        </div>
      }
      size="lg"
      placement="right"
      footer={
        <div className="w-full flex items-center justify-between gap-3 font-sans">
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => success(`Target list updated for ${company.name}.`, 'Accounts Enrolled')}
            >
              Enroll in Cadence
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5 font-sans">
        
        {/* Account Status & Owner Strip */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Status:</span>
            <select
              value={company.status}
              onChange={(e) => updateCompanyStatus(company.id, e.target.value as CompanyStatusType)}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-bold text-xs text-slate-900 dark:text-white cursor-pointer outline-none"
            >
              <option value="Target">Target Account</option>
              <option value="Prospecting">Prospecting</option>
              <option value="In Outreach">In Outreach</option>
              <option value="Customer">Customer</option>
              <option value="Churned">Churned</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Owner */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Owner:</span>
            <select
              value={company.owner}
              onChange={(e) => updateCompanyOwner(company.id, e.target.value as LeadOwnerType)}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-bold text-xs text-slate-900 dark:text-white cursor-pointer outline-none"
            >
              <option value="Sarah Jenkins">Sarah Jenkins</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>

          {/* Pipeline Value */}
          <div className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
            ${(company.openDealsValue / 1000).toFixed(0)}k Pipeline ARR
          </div>

        </div>

        {/* 5 Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: '360° Overview' },
            { id: 'contacts', label: `People (${company.contactsCount || 2})` },
            { id: 'deals', label: 'Deals & Revenue' },
            { id: 'activity', label: 'Outreach History' },
            { id: 'notes', label: `Account Notes (${notes.length})` },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            
            {/* Description */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-1.5 text-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase">About {company.name}</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {company.description}
              </p>
            </div>

            {/* Firmographic Attributes Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Headcount Tier</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{company.headcount} employees</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Annual Revenue Tier</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{company.revenue} ARR</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Funding Round</div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">{company.funding}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Headquarters</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{company.location}</div>
              </div>
            </div>

            {/* Intent Signal */}
            {company.intentSignal && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs">
                <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Buying Intent Signal</span>
                </div>
                <p className="text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
                  {company.intentSignal}
                </p>
              </div>
            )}

            {/* Technographic Stack */}
            {company.techStack && company.techStack.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span>Detected Technographic Stack ({company.techStack.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {company.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-800 dark:text-slate-200 font-mono text-[11px] border border-slate-200/80 dark:border-[#2A2A2A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Enrolled Decision Makers & Contacts
            </div>

            <div className="divide-y divide-slate-100 dark:divide-white/[0.04] border border-slate-200/80 dark:border-[#202020] rounded-2xl bg-white dark:bg-[#161616] overflow-hidden text-xs">
              {[
                {
                  name: 'Sarah Jenkins',
                  title: 'VP of Growth & Revenue',
                  email: `sarah.j@${company.domain}`,
                  phone: '+1 (415) 892-4910',
                  status: 'In Sequence',
                  score: 98,
                },
                {
                  name: 'Marcus Vance',
                  title: 'Head of Revenue Operations',
                  email: `marcus@${company.domain}`,
                  phone: '+1 (212) 749-1120',
                  status: 'Meeting Booked',
                  score: 96,
                },
              ].map((contact, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-950 dark:text-white truncate">
                      {contact.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{contact.title}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-0.5 truncate">
                      {contact.email} • {contact.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="blue" size="sm">
                      {contact.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DEALS */}
        {activeTab === 'deals' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Active Deal Pipeline</div>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  ${(company.openDealsValue / 1000).toFixed(0)},000 ARR Contract
                </div>
              </div>
              <Badge variant="emerald" size="sm">
                Stage 2: Solution Briefing
              </Badge>
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVITY */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Account Touchpoint Timeline
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 text-xs">
              <div className="relative space-y-1">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                  <Mail className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Email Step 2 Opened</span>
                  <span className="text-[10px] text-slate-400">Today at 10:24 AM</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Recipient: Sarah Jenkins (VP Growth)
                </p>
              </div>

              <div className="relative space-y-1">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                  <PhoneCall className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Voice AI SDR Call Confirmed</span>
                  <span className="text-[10px] text-slate-400">Yesterday at 3:45 PM</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Recipient: Marcus Vance (RevOps) - Scheduled 15-minute briefing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add account takeaway or procurement notes..."
                rows={3}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" type="submit" disabled={!newNoteText.trim()}>
                  Save Account Note
                </Button>
              </div>
            </form>

            <div className="space-y-2.5">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={n.authorAvatar}
                        alt={n.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-bold text-slate-900 dark:text-white">{n.author}</span>
                      <span className="text-[10px] text-slate-400">• {n.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                    {n.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Drawer>
  );
};
