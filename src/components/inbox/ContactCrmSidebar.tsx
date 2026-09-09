import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  DollarSign, 
  Layers, 
  ExternalLink, 
  Check, 
  Plus,
  Tag,
  Flame,
  Calendar,
  User,
  Search,
  X,
  PhoneCall,
  BriefcaseBusiness,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useMasterInbox } from '../../context/MasterInboxContext';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export interface ContactCrmSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddLabelModal?: () => void;
}

export const ContactCrmSidebar: React.FC<ContactCrmSidebarProps> = ({
  isOpen,
  onClose,
  onOpenAddLabelModal,
}) => {
  const { 
    activeConversation, 
    labelsList, 
    addLabelToConversation, 
    removeLabelFromConversation,
    createLabel 
  } = useMasterInbox();
  const { companies, contacts, deals, pipelines } = useCrm();
  const { success, info } = useToast();
  const navigate = useNavigate();

  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);
  const [labelSearch, setLabelSearch] = useState('');
  const labelDropdownRef = useRef<HTMLDivElement>(null);

  // Close label dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (labelDropdownRef.current && !labelDropdownRef.current.contains(e.target as Node)) {
        setIsAddLabelOpen(false);
      }
    };
    if (isAddLabelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddLabelOpen]);

  if (!isOpen || !activeConversation) return null;

  // Correlate with existing CRM data
  const matchedCompany = companies.find(
    (c) =>
      (activeConversation.companyName && c.name.toLowerCase() === activeConversation.companyName.toLowerCase()) ||
      (activeConversation.companyDomain && c.domain.toLowerCase() === activeConversation.companyDomain.toLowerCase())
  );

  const matchedContact = contacts.find(
    (c) =>
      (activeConversation.email && c.email.toLowerCase() === activeConversation.email.toLowerCase()) ||
      (activeConversation.contactName && c.name.toLowerCase() === activeConversation.contactName.toLowerCase())
  );

  const matchedDeal = deals.find(
    (d) =>
      (activeConversation.companyName && d.companyName.toLowerCase() === activeConversation.companyName.toLowerCase()) ||
      (activeConversation.contactName && d.contactName.toLowerCase() === activeConversation.contactName.toLowerCase())
  );

  const matchedPipeline = pipelines.find((p) => p.id === matchedDeal?.pipelineId) || pipelines[0];

  // Derived values from current data model
  const assignedOwner = activeConversation.assignedTo && activeConversation.assignedTo !== 'Unassigned'
    ? activeConversation.assignedTo
    : (matchedContact?.owner || matchedDeal?.owner || 'Alex Rivera');

  const contactLocation = matchedCompany?.location || (matchedContact as any)?.location;
  const contactStatus = matchedContact?.leadStatus || (activeConversation.interested ? 'Qualified' : 'Engaged');
  const sourceChannel = matchedDeal?.source || (
    activeConversation.channel === 'voice' ? 'Voice AI SDR' :
    activeConversation.channel === 'email' ? 'Cold Email Sequence' :
    activeConversation.channel === 'linkedin' ? 'LinkedIn' : 'Upwork'
  );

  // Filtered labels for Add Label dropdown
  const filteredLabels = labelsList.filter((l) =>
    l.name.toLowerCase().includes(labelSearch.toLowerCase().trim())
  );
  const isExactLabelMatch = labelsList.some(
    (l) => l.name.toLowerCase() === labelSearch.toLowerCase().trim()
  );

  const handleAddLabel = (labelName: string) => {
    addLabelToConversation(activeConversation.id, labelName);
    setIsAddLabelOpen(false);
    setLabelSearch('');
    success(`Added label "${labelName}" to conversation.`, 'Label Added');
  };

  const handleCreateAndAddLabel = () => {
    if (!labelSearch.trim()) return;
    const newName = labelSearch.trim();
    createLabel(newName, '#10b981');
    addLabelToConversation(activeConversation.id, newName);
    setIsAddLabelOpen(false);
    setLabelSearch('');
    success(`Created and added label "${newName}".`, 'Label Created');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5 text-primary shrink-0" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5 text-primary shrink-0" />;
      case 'upwork': return <BriefcaseBusiness className="w-3.5 h-3.5 text-primary shrink-0" />;
      case 'voice': return <PhoneCall className="w-3.5 h-3.5 text-primary shrink-0" />;
      default: return <Inbox className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  const channelTitle = (channel: string) => {
    if (channel === 'email') return 'Email';
    if (channel === 'linkedin') return 'LinkedIn';
    if (channel === 'upwork') return 'Upwork';
    if (channel === 'voice') return 'Voice AI Telecom';
    return channel;
  };

  return (
    <div className="w-80 shrink-0 bg-white dark:bg-[#141414] border-l border-slate-200/80 dark:border-[#222222] flex flex-col h-full font-sans text-xs">
      
      {/* 1. Header */}
      <div className="p-3.5 border-b border-slate-100 dark:border-[#202020] flex items-center justify-between shrink-0 bg-white dark:bg-[#141414]">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10.5px]">
            Prospect & CRM Record
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
          aria-label="Close side panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        
        {/* SECTION 1: CONTACT DETAILS */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Contact Details
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#181818] border border-slate-200/70 dark:border-[#222222] space-y-2.5">
            {/* Identity line */}
            <div className="flex items-center gap-2.5">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.contactName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200/80 dark:border-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-900 dark:text-white text-[12.5px] truncate">
                  {activeConversation.contactName}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                  {activeConversation.contactTitle}
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200/50 dark:border-white/[0.06] space-y-2">
              {/* Email */}
              {activeConversation.email && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                    <Mail className="w-3 h-3 text-primary shrink-0" />
                    <span>Email</span>
                  </span>
                  <a
                    href={`mailto:${activeConversation.email}`}
                    className="font-mono text-[11px] text-slate-700 dark:text-slate-200 truncate hover:text-primary transition-colors text-right"
                    title={activeConversation.email}
                  >
                    {activeConversation.email}
                  </a>
                </div>
              )}

              {/* Phone */}
              {activeConversation.phone && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                    <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>Phone</span>
                  </span>
                  <a
                    href={`tel:${activeConversation.phone}`}
                    className="font-mono text-[11px] text-slate-700 dark:text-slate-200 truncate hover:text-emerald-500 transition-colors text-right"
                  >
                    {activeConversation.phone}
                  </a>
                </div>
              )}

              {/* LinkedIn */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                  <Linkedin className="w-3 h-3 text-sky-500 shrink-0" />
                  <span>LinkedIn</span>
                </span>
                <a
                  href={`https://linkedin.com/in/${activeConversation.contactName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open Profile</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Location (if available) */}
              {contactLocation && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Location</span>
                  </span>
                  <span className="text-[11px] text-slate-700 dark:text-slate-200 truncate text-right font-medium">
                    {contactLocation}
                  </span>
                </div>
              )}

              {/* Owner */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Owner</span>
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-200 truncate text-right font-medium">
                  {assignedOwner}
                </span>
              </div>

              {/* Lifecycle Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">
                  Status
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary-muted text-primary text-[10px] font-bold">
                  {contactStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: LABEL MANAGEMENT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Labels
            </span>
            <div className="relative" ref={labelDropdownRef}>
              <button
                type="button"
                onClick={() => setIsAddLabelOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold text-primary hover:bg-primary-muted cursor-pointer transition-colors border border-primary/20"
                aria-label="Add label to thread"
                aria-expanded={isAddLabelOpen}
              >
                <Plus className="w-3 h-3" />
                <span>Add Label</span>
              </button>

              {/* Add Label Dropdown / Popover */}
              {isAddLabelOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-56 p-2 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2C2C2C] shadow-lg z-30 space-y-2 animate-in fade-in duration-100">
                  <div className="relative">
                    <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search labels..."
                      value={labelSearch}
                      onChange={(e) => setLabelSearch(e.target.value)}
                      className="w-full pl-6 pr-2 py-1 text-[11px] rounded-lg bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-primary"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-1 divide-y divide-slate-100 dark:divide-white/[0.04]">
                    {filteredLabels.length === 0 && !labelSearch.trim() ? (
                      <div className="py-2 text-center text-slate-400 text-[10.5px]">No labels created yet</div>
                    ) : (
                      filteredLabels.map((l) => {
                        const isAssigned = (activeConversation.labels || []).includes(l.name);
                        return (
                          <button
                            key={l.id}
                            type="button"
                            disabled={isAssigned}
                            onClick={() => handleAddLabel(l.name)}
                            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-[11px] font-medium transition-colors ${
                              isAssigned
                                ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/[0.02]'
                                : 'hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                              <span className="truncate">{l.name}</span>
                            </div>
                            {isAssigned && <Check className="w-3 h-3 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })
                    )}

                    {/* Quick-create label from search text if no exact match */}
                    {labelSearch.trim() && !isExactLabelMatch && (
                      <button
                        type="button"
                        onClick={handleCreateAndAddLabel}
                        className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-[11px] font-bold text-primary hover:bg-primary-muted cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 shrink-0" />
                        <span className="truncate">Create "{labelSearch.trim()}"</span>
                      </button>
                    )}
                  </div>

                  {/* Create New Label with custom color */}
                  {onOpenAddLabelModal && (
                    <div className="pt-1 border-t border-slate-100 dark:border-[#2A2A2A]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddLabelOpen(false);
                          onOpenAddLabelModal();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1 text-[10.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer"
                      >
                        <Tag className="w-3 h-3" />
                        <span>Open Label Manager</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Assigned Labels Chips */}
          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#181818] border border-slate-200/70 dark:border-[#222222]">
            {activeConversation.labels && activeConversation.labels.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {activeConversation.labels.map((labelName) => {
                  const meta = labelsList.find((l) => l.name === labelName);
                  return (
                    <span
                      key={labelName}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white dark:bg-[#202020] border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-200 shadow-2xs"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: meta?.color || '#6366f1' }}
                      />
                      <span>{labelName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          removeLabelFromConversation(activeConversation.id, labelName);
                          info(`Removed label "${labelName}".`, 'Label Removed');
                        }}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer transition-colors p-0.5 leading-none"
                        title={`Remove ${labelName}`}
                        aria-label={`Remove label ${labelName}`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 italic">No labels assigned to this thread</div>
            )}
          </div>
        </div>

        {/* SECTION 3: TARGET ACCOUNT */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Target Account
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#181818] border border-slate-200/70 dark:border-[#222222] space-y-2.5">
            <div className="flex items-center gap-2.5">
              <img
                src={activeConversation.companyLogo}
                alt={activeConversation.companyName}
                className="w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-900 dark:text-white text-[12px] truncate">
                  {activeConversation.companyName}
                </div>
                <a
                  href={`https://${activeConversation.companyDomain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 dark:text-slate-400 font-mono text-[10.5px] truncate hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>{activeConversation.companyDomain}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Firmographic fields if available */}
            <div className="pt-1.5 border-t border-slate-200/50 dark:border-white/[0.06] space-y-1.5">
              {matchedCompany?.industry && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">Industry</span>
                  <span className="text-[11px] text-slate-700 dark:text-slate-200 truncate font-medium text-right">
                    {matchedCompany.industry}
                  </span>
                </div>
              )}

              {matchedCompany?.employeeCount && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">Employees</span>
                  <span className="text-[11px] font-mono text-slate-700 dark:text-slate-200 truncate font-medium text-right">
                    {matchedCompany.employeeCount}
                  </span>
                </div>
              )}

              {matchedCompany?.location && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">HQ</span>
                  <span className="text-[11px] text-slate-700 dark:text-slate-200 truncate font-medium text-right">
                    {matchedCompany.location}
                  </span>
                </div>
              )}

              {matchedCompany?.tier && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">Tier</span>
                  <span className="text-[10.5px] font-bold text-primary truncate text-right">
                    {matchedCompany.tier}
                  </span>
                </div>
              )}

              {matchedCompany?.revenue && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">Revenue</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate text-right">
                    {matchedCompany.revenue}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: CRM / DEAL ATTRIBUTION */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Deals CRM Attribution
          </div>

          <div className="p-3.5 rounded-xl bg-primary-muted/30 border border-primary/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Opportunity Value</span>
              <span className="font-extrabold text-primary font-mono text-xs">
                ${activeConversation.dealValue.toLocaleString()} ARR
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Stage</span>
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px] text-right">
                {activeConversation.dealStage}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Pipeline</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px] text-right">
                {matchedPipeline?.name || 'Enterprise Sales Pipeline'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Deal Owner</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate text-right">
                {assignedOwner}
              </span>
            </div>

            {matchedDeal?.probability ? (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Probability</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {matchedDeal.probability}%
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* SECTION 5: CONVERSATION CONTEXT */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Conversation Context
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#181818] border border-slate-200/70 dark:border-[#222222] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                {getChannelIcon(activeConversation.channel)}
                <span>Channel</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                {channelTitle(activeConversation.channel)}
              </span>
            </div>

            {/* Reply Identity */}
            {(activeConversation.accountEmail || activeConversation.accountName) && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">
                  Reply Identity
                </span>
                <span
                  className="font-mono text-[10.5px] text-slate-700 dark:text-slate-300 truncate text-right max-w-[150px]"
                  title={activeConversation.accountEmail || activeConversation.accountName}
                >
                  {activeConversation.accountEmail || activeConversation.accountName}
                </span>
              </div>
            )}

            {activeConversation.accountProvider && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">
                  Provider
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  {activeConversation.accountProvider}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0">
                Last Activity
              </span>
              <span className="font-mono text-[10.5px] text-slate-600 dark:text-slate-400">
                {activeConversation.timestamp}
              </span>
            </div>

            {/* Status Badges */}
            <div className="pt-1.5 border-t border-slate-200/50 dark:border-white/[0.06] flex items-center gap-1.5 flex-wrap">
              {activeConversation.interested && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold">
                  <Flame className="w-2.5 h-2.5 text-emerald-500" />
                  <span>Hot Interest</span>
                </span>
              )}

              {activeConversation.isMeeting && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary-muted text-primary text-[9.5px] font-bold">
                  <Calendar className="w-2.5 h-2.5 text-primary" />
                  <span>Meeting Booked</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 text-[9.5px] font-medium capitalize">
                {activeConversation.sentiment} Sentiment
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Sticky Bottom Action */}
      <div className="p-3 border-t border-slate-100 dark:border-[#202020] bg-white dark:bg-[#141414] shrink-0">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => {
            success(`Navigating to CRM Contact & Deal context for ${activeConversation.contactName}.`, 'Opening CRM');
            navigate('/crm');
          }}
          leftIcon={<User className="w-3.5 h-3.5" />}
        >
          View Full CRM Profile
        </Button>
      </div>

    </div>
  );
};

