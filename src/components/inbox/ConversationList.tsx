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
      case 'email': return <Mail className="w-3.5 h-3.5 text-primary" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5 text-primary" />;
      case 'upwork': return <BriefcaseBusiness className="w-3.5 h-3.5 text-primary" />;
      case 'voice': return <PhoneCall className="w-3.5 h-3.5 text-primary" />;
      default: return <Inbox className="w-3.5 h-3.5 text-slate-400" />;
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
      <div className="p-3 border-b border-slate-200/80 dark:border-[#2A2A2A] space-y-2.5">
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
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => handleSelect(thread)}
                className={`w-full text-left p-3.5 transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-primary-muted/60 border-l-4 border-l-primary'
                    : 'hover:bg-slate-50/60 dark:hover:bg-white/[0.02] border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={thread.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-[#2A2A2A]" />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs truncate ${thread.unread ? 'font-black text-slate-950 dark:text-white' : 'font-bold text-slate-800 dark:text-slate-200'}`}>{thread.contactName}</span>
                        {thread.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{thread.companyName}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{thread.timestamp}</span>
                </div>

                <p className={`text-xs mt-1.5 line-clamp-1 ${thread.unread ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{thread.lastMessage}</p>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {getChannelIcon(thread.channel)}
                    <span className="text-[10px] text-slate-500 font-semibold">{channelLabel(thread.channel)}</span>
                    {thread.interested && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                        <Flame className="w-2.5 h-2.5" /> Hot
                      </span>
                    )}
                    {thread.isMeeting && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary-muted text-primary text-[10px] font-bold">
                        <Calendar className="w-2.5 h-2.5" /> Meeting
                      </span>
                    )}
                  </div>

                  {thread.accountName && <span className="text-[9px] font-mono text-slate-400 truncate max-w-[95px]">{thread.accountName}</span>}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
