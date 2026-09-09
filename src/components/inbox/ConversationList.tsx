import React, { useState } from 'react';
import {
  Search,
  Mail,
  Linkedin,
  PhoneCall,
  BriefcaseBusiness,
  Flame,
  Calendar,
  Tag,
  Inbox,
  Archive,
  Filter,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMasterInbox, MasterInboxThread } from '../../context/MasterInboxContext';
import { InboxFilterPopover } from './InboxFilterPopover';

export interface ConversationListProps {
  onSelectThreadMobile?: () => void;
  onOpenAddLabelModal?: () => void;
  onOpenShortcutsModal?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  onSelectThreadMobile,
  onOpenAddLabelModal,
}) => {
  const navigate = useNavigate();
  const {
    allFilteredConversations,
    activeConversationId,
    setActiveConversationId,
    activeFolder,
    setActiveFolder,
    unreadTotal,
    interestedTotal,
    meetingsTotal,
    labelsList,
    searchQuery,
    setSearchQuery,
    filterChannel,
    setFilterChannel,
    filterAssignee,
    filterLabel,
    setFilterLabel,
    selectedAccountIds,
    markAsRead,
    resetFilters,
  } = useMasterInbox();

  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);

  const hasActiveFilters = selectedAccountIds.length > 0 || filterChannel !== 'all' || filterLabel !== 'all' || filterAssignee !== 'all';
  const activeFiltersCount = selectedAccountIds.length + (filterChannel !== 'all' ? 1 : 0) + (filterLabel !== 'all' ? 1 : 0) + (filterAssignee !== 'all' ? 1 : 0);

  const channelLabel = (channel: string) => {
    if (channel === 'email') return 'Email';
    if (channel === 'linkedin') return 'LinkedIn';
    if (channel === 'upwork') return 'Upwork';
    if (channel === 'voice') return 'Voice';
    return channel;
  };

  const filterSummaryParts: string[] = [];
  if (filterChannel !== 'all') filterSummaryParts.push(channelLabel(filterChannel));
  if (selectedAccountIds.length > 0) filterSummaryParts.push(`${selectedAccountIds.length} ${selectedAccountIds.length === 1 ? 'account' : 'accounts'}`);
  if (filterLabel !== 'all') filterSummaryParts.push(filterLabel);
  if (filterAssignee !== 'all') filterSummaryParts.push(filterAssignee);
  const filterSummaryText = filterSummaryParts.join(' · ');

  const handleSelect = (thread: MasterInboxThread) => {
    setActiveConversationId(thread.id);
    if (thread.unread) markAsRead(thread.id);
    onSelectThreadMobile?.();
  };

  const handleSelectFolder = (folderId: string) => {
    setActiveFolder(folderId);
    navigate(folderId.startsWith('label:') ? '/inbox/labels' : `/inbox/${folderId}`);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3 h-3 text-primary shrink-0" />;
      case 'linkedin': return <Linkedin className="w-3 h-3 text-primary shrink-0" />;
      case 'upwork': return <BriefcaseBusiness className="w-3 h-3 text-primary shrink-0" />;
      case 'voice': return <PhoneCall className="w-3 h-3 text-primary shrink-0" />;
      default: return <Inbox className="w-3 h-3 text-slate-400 shrink-0" />;
    }
  };

  const FOLDER_PILLS = [
    { id: 'all', label: 'All', icon: Inbox, badge: null },
    { id: 'unread', label: 'Unread', icon: Mail, badge: unreadTotal || null },
    { id: 'interested', label: 'Hot', icon: Flame, badge: interestedTotal || null },
    { id: 'meetings', label: 'Meetings', icon: Calendar, badge: meetingsTotal || null },
    { id: 'archived', label: 'Archived', icon: Archive, badge: null },
    { id: 'labels', label: 'Labels', icon: Tag, badge: null },
  ];

  return (
    <div className="w-full border-r border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] flex flex-col h-full font-sans">
      <div className="p-3 border-b border-slate-200/80 dark:border-[#2A2A2A] space-y-2.5 bg-white dark:bg-[#161616] shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {FOLDER_PILLS.map((pill) => {
            const active = activeFolder === pill.id;
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => handleSelectFolder(pill.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  active
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span>{pill.label}</span>
                {pill.badge !== null && (
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-white/20 text-white' : 'bg-primary-muted text-primary'}`}>{pill.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations, names, emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="flex-1 min-w-0 px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer truncate"
          >
            <option value="all">All Channels</option>
            <option value="email">Email</option>
            <option value="linkedin">LinkedIn</option>
            <option value="upwork">Upwork</option>
            <option value="voice">Voice & Calls</option>
          </select>

          <select
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="flex-1 min-w-0 px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer truncate"
          >
            <option value="all">All Labels</option>
            {labelsList.map((label) => <option key={label.id} value={label.name}>{label.name}</option>)}
          </select>

          {onOpenAddLabelModal && (
            <button
              type="button"
              onClick={onOpenAddLabelModal}
              className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] text-primary hover:bg-primary-muted cursor-pointer shrink-0 border border-slate-200/80 dark:border-[#202020]"
              aria-label="Add label"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsFilterPopoverOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                hasActiveFilters
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-slate-50 dark:bg-[#1C1C1C] border-slate-200/80 dark:border-[#202020] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
              }`}
              aria-label="Filter connected accounts and channels"
              aria-expanded={isFilterPopoverOpen}
            >
              <Filter className={`w-3.5 h-3.5 shrink-0 ${hasActiveFilters ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>Filters</span>
              {activeFiltersCount > 0 && <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/20 text-white">{activeFiltersCount}</span>}
            </button>

            <InboxFilterPopover isOpen={isFilterPopoverOpen} onClose={() => setIsFilterPopoverOpen(false)} />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-primary-muted border border-primary/20 text-[10px] text-primary animate-in fade-in duration-100">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="font-semibold truncate">{filterSummaryText || 'Active filters'}</span>
            </div>
            <button type="button" onClick={resetFilters} className="font-bold hover:underline cursor-pointer shrink-0 ml-2">Clear filters</button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.04]">
        {allFilteredConversations.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">No conversations found</p>
            <p className="text-[11px]">Try adjusting the channel, account or search filters.</p>
          </div>
        ) : (
          allFilteredConversations.map((thread) => {
            const isActive = activeConversationId === thread.id;

            // Resolve tertiary Owner / Connected Account display
            const ownerOrAccount =
              thread.assignedTo && thread.assignedTo !== 'Unassigned'
                ? thread.assignedTo
                : (thread.accountName || thread.accountEmail || 'Unassigned');

            const fullMetaTooltip = [
              thread.assignedTo && thread.assignedTo !== 'Unassigned' ? `Owner: ${thread.assignedTo}` : null,
              thread.accountName ? `Account: ${thread.accountName}` : null,
              thread.labels && thread.labels.length > 0 ? `Labels: ${thread.labels.join(', ')}` : null,
            ].filter(Boolean).join(' · ');

            return (
              <div
                key={thread.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Conversation with ${thread.contactName}`}
                onClick={() => handleSelect(thread)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(thread);
                  }
                }}
                className={`block w-full text-left py-3 px-3.5 transition-colors cursor-pointer relative select-none focus:outline-none ${
                  isActive
                    ? 'bg-primary-muted/50 dark:bg-primary-muted/30 border-l-[3px] border-l-primary'
                    : 'hover:bg-slate-50/80 dark:hover:bg-white/[0.025] border-l-[3px] border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {/* AVATAR */}
                  <img
                    src={thread.avatar}
                    alt={thread.contactName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200/80 dark:border-[#2A2A2A] mt-0.5"
                  />

                  {/* 3-LEVEL CLEAN HIERARCHY */}
                  <div className="flex-1 min-w-0">
                    
                    {/* ROW 1: IDENTITY — Contact Name, Unread Dot, Timestamp */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`text-[12.5px] truncate ${
                            thread.unread
                              ? 'font-bold text-slate-950 dark:text-white'
                              : 'font-semibold text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {thread.contactName}
                        </span>
                        {thread.unread && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                            title="Unread"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0 ml-1.5">
                        {thread.timestamp}
                      </span>
                    </div>

                    {/* ROW 2: CONTEXT — Company Name + Last Message Preview */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-tight">
                      {thread.companyName}
                    </div>

                    <p
                      className={`text-[11.5px] mt-1.5 line-clamp-2 leading-snug ${
                        thread.unread
                          ? 'font-medium text-slate-700 dark:text-slate-200'
                          : 'font-normal text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {thread.lastMessage}
                    </p>

                    {/* ROW 3: METADATA — Left: Channel + Hot + Meeting; Right: Owner / Connected Account */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-0.5">
                      {/* Left: Channel and Status Badges */}
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        {/* Compact Channel */}
                        <div className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 shrink-0">
                          {getChannelIcon(thread.channel)}
                          <span>{channelLabel(thread.channel)}</span>
                        </div>

                        {/* Quiet Hot Badge */}
                        {thread.interested && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold shrink-0">
                            <Flame className="w-2.5 h-2.5 text-emerald-500" />
                            <span>Hot</span>
                          </span>
                        )}

                        {/* Quiet Meeting Badge */}
                        {thread.isMeeting && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary-muted text-primary text-[9.5px] font-bold shrink-0">
                            <Calendar className="w-2.5 h-2.5 text-primary" />
                            <span>Meeting</span>
                          </span>
                        )}
                      </div>

                      {/* Right: Owner / Connected Account */}
                      <span
                        title={fullMetaTooltip || ownerOrAccount}
                        className="text-[9.5px] text-slate-400 dark:text-slate-500 truncate max-w-[110px] sm:max-w-[130px] shrink-0 text-right ml-auto"
                      >
                        {ownerOrAccount}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
