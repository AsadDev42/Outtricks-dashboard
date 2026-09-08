import React from 'react';
import { 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Flame, 
  Calendar, 
  Tag, 
  RotateCcw,
  CheckCircle2,
  Inbox,
  Archive,
  Filter,
  Plus,
  Keyboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMasterInbox, MasterInboxThread } from '../../context/MasterInboxContext';

export interface ConversationListProps {
  onSelectThreadMobile?: () => void;
  onOpenAddLabelModal?: () => void;
  onOpenShortcutsModal?: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  onSelectThreadMobile,
  onOpenAddLabelModal,
  onOpenShortcutsModal,
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
    setFilterAssignee,
    filterLabel,
    setFilterLabel,
    markAsRead,
    resetFilters
  } = useMasterInbox();

  const handleSelect = (thread: MasterInboxThread) => {
    setActiveConversationId(thread.id);
    if (thread.unread) {
      markAsRead(thread.id);
    }
    if (onSelectThreadMobile) {
      onSelectThreadMobile();
    }
  };

  const handleSelectFolder = (folderId: string) => {
    setActiveFolder(folderId);
    if (folderId.startsWith('label:')) {
      navigate('/inbox/labels');
    } else {
      navigate(`/inbox/${folderId}`);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5 text-blue-500" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5 text-sky-500" />;
      case 'voice': return <PhoneCall className="w-3.5 h-3.5 text-blue-600" />;
      default: return <Mail className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const FOLDER_PILLS = [
    { id: 'all', label: 'All', icon: Inbox, badge: null },
    { id: 'unread', label: 'Unread', icon: Mail, badge: unreadTotal > 0 ? unreadTotal : null, badgeColor: 'bg-blue-600 text-white' },
    { id: 'interested', label: 'Hot', icon: Flame, badge: interestedTotal > 0 ? interestedTotal : null, badgeColor: 'bg-emerald-600 text-white' },
    { id: 'meetings', label: 'Meetings', icon: Calendar, badge: meetingsTotal > 0 ? meetingsTotal : null, badgeColor: 'bg-blue-700 text-white' },
    { id: 'archived', label: 'Archived', icon: Archive, badge: null },
    { id: 'labels', label: 'Labels', icon: Tag, badge: null },
  ];

  return (
    <div className="w-full border-r border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] flex flex-col h-full font-sans">
      
      {/* 1. Master Inbox Integrated Channel & Folder Filter Pills */}
      <div className="p-3 border-b border-slate-200/80 dark:border-[#2A2A2A] space-y-2.5">
        
        {/* Horizontal Quick Filter Pills */}
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
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span>{pill.label}</span>
                {pill.badge !== null && (
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                    active ? 'bg-white/20 text-white' : pill.badgeColor || 'bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300'
                  }`}>
                    {pill.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations, names, emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Channel & Dropdown Filters Strip */}
        <div className="flex items-center gap-1.5">
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="flex-1 px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">All Channels</option>
            <option value="email">Cold Email</option>
            <option value="linkedin">LinkedIn Safe DMs</option>
            <option value="voice">Voice AI Calls</option>
          </select>

          <select
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="flex-1 px-2 py-1 rounded-lg bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">All Labels</option>
            {labelsList.map((lbl) => (
              <option key={lbl.id} value={lbl.name}>{lbl.name}</option>
            ))}
          </select>

          {(searchQuery || filterChannel !== 'all' || filterAssignee !== 'all' || filterLabel !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer shrink-0"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenAddLabelModal && (
            <button
              type="button"
              onClick={onOpenAddLabelModal}
              className="p-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 hover:bg-blue-50 cursor-pointer shrink-0"
              title="Add Label"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenShortcutsModal && (
            <button
              type="button"
              onClick={onOpenShortcutsModal}
              className="p-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Conversation Items Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.04]">
        {allFilteredConversations.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">No conversations found</p>
            <p className="text-[11px] text-slate-400">Try adjusting your channel filter or search term.</p>
          </div>
        ) : (
          allFilteredConversations.map((thread) => {
            const isActive = activeConversationId === thread.id;

            return (
              <div
                key={thread.id}
                onClick={() => handleSelect(thread)}
                className={`p-3.5 transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-blue-50/70 dark:bg-[#131d35] border-l-4 border-l-blue-600'
                    : 'hover:bg-slate-50/60 dark:hover:bg-white/[0.02]'
                }`}
              >
                {/* Header: Contact & Timestamp */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={thread.avatar}
                      alt={thread.contactName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-[#2A2A2A]"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs truncate ${thread.unread ? 'font-black text-slate-950 dark:text-white' : 'font-bold text-slate-800 dark:text-slate-200'}`}>
                          {thread.contactName}
                        </span>
                        {thread.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {thread.companyName}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {thread.timestamp}
                  </span>
                </div>

                {/* Last Message Snippet */}
                <p className={`text-xs mt-1.5 line-clamp-1 ${thread.unread ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {thread.lastMessage}
                </p>

                {/* Metadata Badges Strip */}
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-1.5">
                    {getChannelIcon(thread.channel)}
                    {thread.interested && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                        <Flame className="w-2.5 h-2.5" />
                        <span>Hot</span>
                      </span>
                    )}
                    {thread.isMeeting && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>Demo</span>
                      </span>
                    )}
                  </div>

                  {thread.labels.length > 0 && (
                    <span className="text-[10px] font-mono font-semibold text-slate-400 truncate max-w-[110px]">
                      {thread.labels[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
