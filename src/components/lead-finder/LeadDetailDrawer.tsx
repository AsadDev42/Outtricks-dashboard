import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { LeadDetailData } from '../../context/LeadSearchContext';
import { EditLeadModal } from './EditLeadModal';
import { QuickEmailModal } from './QuickEmailModal';
import { LogCallModal } from './LogCallModal';
import { 
  Building2, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  PhoneCall, 
  Plus,
  DollarSign,
  Activity,
  Calendar,
  Sparkles,
  Zap,
  Star,
  Tag,
  Clock,
  Trash2,
  Edit,
  User,
  MessageSquare,
  Layers,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  Bell
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';

export interface LeadDetailDrawerProps {
  lead: LeadDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  onDispatchEmail?: (lead: LeadDetailData) => void;
  onQueueVoiceCall?: (lead: LeadDetailData) => void;
  onAddToCrm?: (lead: LeadDetailData) => void;
  onUpdateLead?: (updatedLead: LeadDetailData) => void;
  onDeleteLead?: (id: string) => void;
}

interface NoteItem {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onDispatchEmail,
  onQueueVoiceCall,
  onAddToCrm,
  onUpdateLead,
  onDeleteLead,
}) => {
  const navigate = useNavigate();
  const { saveLeadToCrm, reminders, createReminder, toggleReminderCompleted } = useCrm();
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [newReminderText, setNewReminderText] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [status, setStatus] = useState<'New' | 'In Sequence' | 'Meeting Booked' | 'Replied' | 'Unresponsive'>('New');
  const [assignee, setAssignee] = useState('Sarah Jenkins');
  
  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note_1',
      author: 'Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content: 'High buying intent detected. Company is currently hiring +6 SDRs and scaling their outbound tech stack for Q3.',
      timestamp: '2 hours ago',
    },
    {
      id: 'note_2',
      author: 'Marcus Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      content: 'Verified direct mobile dial via multiDimensional search. Verified no DNC flag.',
      timestamp: 'Yesterday at 4:15 PM',
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Tags state
  const [tags, setTags] = useState<string[]>(['High Priority', 'Q3 Target', 'SaaS Buyer']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  const { currentWorkspace, updateWorkspace } = useAuth();

  if (!lead) return null;

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      success('Email copied to clipboard.', 'Copied');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      success('Mobile phone copied to clipboard.', 'Copied');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: NoteItem = {
      id: `note_${Date.now()}`,
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content: newNoteText.trim(),
      timestamp: 'Just now',
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
    success('Note recorded to prospect timeline.', 'Note Saved');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId));
    info('Note deleted.', 'Removed');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags([...tags, newTagInput.trim()]);
      }
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div className="flex items-center justify-between gap-3 w-full pr-6 font-sans">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={lead.avatar}
                alt={lead.name}
                className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shadow-xs shrink-0"
              />
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-slate-950 dark:text-white truncate">
                    {lead.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsStarred(!isStarred)}
                    className="p-0.5 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                  {lead.title} @ {lead.company}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  success(`Enriched ${lead.name} (${lead.company}) with 100% verified deliverability and zero DNC flags.`, 'Enrichment Complete');
                }}
                leftIcon={<Zap className="w-3.5 h-3.5 text-amber-400" />}
              >
                Enrich
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const res = saveLeadToCrm({
                    name: lead.name,
                    title: lead.title,
                    company: lead.company,
                    domain: lead.domain,
                    email: lead.email,
                    phone: lead.phone,
                    avatar: lead.avatar,
                    score: lead.icpScore,
                    location: lead.location,
                    tags: ['8D Lead Finder', 'Drawer Saved'],
                  });
                  if (res.isExisting) {
                    info(`Existing contact updated: ${res.contact.name} at ${res.contact.companyName}. Linked without duplicate records.`);
                  } else {
                    success(`Lead saved to CRM: ${res.contact.name} was added to ${res.contact.companyName}.`);
                  }
                }}
                leftIcon={<Building2 className="w-3.5 h-3.5 text-emerald-500" />}
              >
                Save to CRM
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEmailModalOpen(true)}
                leftIcon={<Send className="w-3.5 h-3.5" />}
              >
                Email
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onQueueVoiceCall?.(lead)}
                leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
              >
                Voice Call
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-5 font-sans">
          
          {/* Top Status, Assignee & Tags Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Status:</span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as any);
                  success(`Updated status to "${e.target.value}".`, 'Status Updated');
                }}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-bold text-xs text-slate-900 dark:text-white cursor-pointer outline-none"
              >
                <option value="New">New Lead</option>
                <option value="In Sequence">In Active Sequence</option>
                <option value="Meeting Booked">Meeting / Demo Booked</option>
                <option value="Replied">Replied (Positive Intent)</option>
                <option value="Unresponsive">Unresponsive</option>
              </select>
            </div>

            {/* Assignee */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Owner:</span>
              <select
                value={assignee}
                onChange={(e) => {
                  setAssignee(e.target.value);
                  success(`Assigned prospect to ${e.target.value}.`, 'Owner Assigned');
                }}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-bold text-xs text-slate-900 dark:text-white cursor-pointer outline-none"
              >
                <option value="Sarah Jenkins">Sarah Jenkins (Growth Lead)</option>
                <option value="Marcus Vance">Marcus Vance (RevOps)</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>

            {/* ICP Score */}
            <div className="flex items-center gap-1.5 font-mono font-black text-xs text-blue-600 dark:text-blue-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>ICP Fit {lead.icpScore}/100</span>
            </div>

          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-rose-500 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}

            {isAddingTag ? (
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type & press Enter..."
                autoFocus
                className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#161616] border border-blue-500 text-[11px] text-slate-900 dark:text-white outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTag(true)}
                className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Tag</span>
              </button>
            )}
          </div>

          {/* 4 Tabs Navigation */}
          <Tabs
            tabs={[
              { id: 'overview', label: '360° Overview' },
              { id: 'activity', label: 'Engagement Activity' },
              { id: 'notes', label: `Team Notes (${notes.length})` },
              { id: 'crm', label: 'CRM & Pipeline' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Verified Contact Channels */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Verified Contact Channels</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold font-mono">
                    ✓ 99.4% Deliverable Work Email
                  </span>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 font-medium">Primary Work Email</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-mono">
                        {lead.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(lead.email, 'email')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEmailModalOpen(true)}
                      className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors cursor-pointer"
                      title="Compose email"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Phone */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 font-medium">Direct Mobile Dial ({lead.phoneStatus})</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate font-mono">
                        {lead.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(lead.phone, 'phone')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLogCallModalOpen(true)}
                      className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors cursor-pointer"
                      title="Log call"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 font-medium">LinkedIn Profile URL</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        linkedin.com/in/{lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://linkedin.com/in/${lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Firmographic Attributes */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>Firmographic Profile</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                    <div className="text-[10px] text-slate-400">Headcount</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{lead.headcount} employees</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                    <div className="text-[10px] text-slate-400">Annual Revenue Tier</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{lead.revenue} ARR</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                    <div className="text-[10px] text-slate-400">Industry Sub-Sector</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{lead.industry}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                    <div className="text-[10px] text-slate-400">Location</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{lead.location}</div>
                  </div>
                </div>
              </div>

              {/* Buying Intent Signal */}
              {lead.intentSignal && (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs">
                  <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    <span>Real-Time Buying Intent Signal</span>
                  </div>
                  <p className="text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
                    {lead.intentSignal}
                  </p>
                </div>
              )}

              {/* Technographic Stack */}
              {lead.tech && lead.tech.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span>Detected Technologies ({lead.tech.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.tech.map((t, i) => (
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

          {/* TAB 2: ACTIVITY FEED */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Multi-Channel Touchpoint History
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                
                {/* Event 1 */}
                <div className="relative space-y-1 text-xs">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                    <Mail className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Cold Email Opened (Step 1)</span>
                    <span className="text-[10px] text-slate-400">Today at 10:24 AM</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Subject: "Quick question regarding {lead.company}'s outbound stack" (Read time: 42s)
                  </p>
                </div>

                {/* Event 2 */}
                <div className="relative space-y-1 text-xs">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                    <PhoneCall className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Voice AI SDR Call Completed</span>
                    <span className="text-[10px] text-slate-400">Yesterday at 3:45 PM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] space-y-1">
                    <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sub-400ms WebRTC Call (Duration: 3m 18s)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      "Prospect confirmed hiring 6 SDRs. Scheduled 15-min product briefing with executive team."
                    </p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative space-y-1 text-xs">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                    <ShieldCheck className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Lead Added to Workspace</span>
                    <span className="text-[10px] text-slate-400">2 days ago</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Direct work email ({lead.email}) & contact phone ({lead.phone}) indexed.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add collaborative note or call takeaway..."
                  rows={3}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" type="submit" disabled={!newNoteText.trim()}>
                    Post Note
                  </Button>
                </div>
              </form>

              {/* Notes List */}
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
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(n.id)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: CRM & PIPELINE */}
          {activeTab === 'crm' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Deals CRM Stage</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Stage 2: Demo Scheduled / Briefing
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">
                    Est. Deal Value: $48,000 ARR
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddToCrm?.(lead)}
                  >
                    Open in Deals CRM Kanban
                  </Button>
                </div>
              </div>

              {/* HubSpot-Style Reminders & Follow-Ups */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Lead Reminders & Follow-Ups
                      </h4>
                      <p className="text-[10px] text-slate-400">HubSpot-style scheduled task alerts</p>
                    </div>
                  </div>
                  <Badge variant="amber" size="sm">
                    {reminders.filter(r => !r.completed && (r.contactName === lead.name || r.companyName === lead.company)).length} Active
                  </Badge>
                </div>

                {/* Quick Add Reminder Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newReminderText.trim()) return;
                    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                    createReminder({
                      title: newReminderText.trim(),
                      type: 'follow_up',
                      contactName: lead.name,
                      companyName: lead.company,
                      dueDate: tomorrow,
                      dueTime: '10:00',
                      reminderTime: '15_min_before',
                      priority: 'high',
                      assignee: 'Sarah Jenkins',
                    });
                    setNewReminderText('');
                    success(`Reminder set for ${lead.name}.`);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="e.g. Follow up on Q4 pricing proposal..."
                    value={newReminderText}
                    onChange={(e) => setNewReminderText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#282828] text-xs text-slate-900 dark:text-white outline-none focus:border-amber-500"
                  />
                  <Button variant="primary" size="sm" type="submit" disabled={!newReminderText.trim()}>
                    Set Reminder
                  </Button>
                </form>

                {/* Reminders List for this Lead */}
                <div className="space-y-1.5 pt-1">
                  {reminders
                    .filter((r) => r.contactName === lead.name || r.companyName === lead.company)
                    .map((rem) => (
                      <div
                        key={rem.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={rem.completed}
                            onChange={() => toggleReminderCompleted(rem.id)}
                            className="rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                          />
                          <span className={`truncate text-xs ${rem.completed ? 'line-through text-slate-400' : 'font-bold text-slate-800 dark:text-slate-200'}`}>
                            {rem.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {rem.dueDate} {rem.dueTime}
                        </span>
                      </div>
                    ))}
                  {reminders.filter((r) => r.contactName === lead.name || r.companyName === lead.company).length === 0 && (
                    <div className="text-center py-3 text-[11px] text-slate-400">
                      No follow-up reminders scheduled for this lead.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </Drawer>

      {/* Modals */}
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        lead={lead}
        onSaveLead={(updated) => onUpdateLead?.(updated)}
      />

      <QuickEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lead={lead}
      />

      <LogCallModal
        isOpen={isLogCallModalOpen}
        onClose={() => setIsLogCallModalOpen(false)}
        lead={lead}
      />
    </>
  );
};
