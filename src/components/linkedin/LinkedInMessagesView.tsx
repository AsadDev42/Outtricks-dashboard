import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  Paperclip, 
  Smile, 
  User, 
  Building2, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ShieldCheck,
  Zap,
  Flame,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLinkedIn, LinkedInMessageThread } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export const LinkedInMessagesView: React.FC = () => {
  const { messages, sendMessage, addLead } = useLinkedIn();
  const { success } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'All' | 'Unread' | 'Active' | 'Needs Follow-up'>('All');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(messages[0]?.id || 'm_1');
  const [composerText, setComposerText] = useState('');
  const [notes, setNotes] = useState<{ [key: string]: string }>({
    m_1: 'Interested in AI outbound infrastructure with SOC2 compliance. Demo proposed for Thursday.',
    m_2: 'Requested technical whitepaper before scheduling security review.',
  });
  const [currentNote, setCurrentNote] = useState('');

  const filteredThreads = useMemo(() => {
    return messages.filter((t) => {
      const matchesSearch = 
        t.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterTab === 'Unread') return matchesSearch && t.unread;
      if (filterTab === 'Needs Follow-up') return matchesSearch && t.needsFollowUp;
      return matchesSearch;
    });
  }, [messages, searchQuery, filterTab]);

  const activeThread = useMemo(() => {
    return messages.find((t) => t.id === selectedThreadId) || messages[0];
  }, [messages, selectedThreadId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim() || !activeThread) return;
    sendMessage(activeThread.id, composerText.trim());
    setComposerText('');
  };

  const handleCreateLeadFromThread = () => {
    if (!activeThread) return;
    addLead({
      name: activeThread.prospectName,
      title: activeThread.title || 'Decision Maker',
      company: activeThread.company,
      source: 'LinkedIn Direct Message',
      status: 'Qualified',
      dealValue: 45000,
    });
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>LinkedIn Direct Messages</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time 1:1 conversation inbox routed through dedicated residential proxy sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Proxy WebSocket Connected
          </span>
        </div>
      </div>

      {/* 3-Column Inbox Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-3 shadow-xs overflow-hidden">
        
        {/* Column 1: Conversation List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-full border-r border-slate-100 dark:border-[#202020] pr-3 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            {(['All', 'Unread', 'Active', 'Needs Follow-up'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filterTab === tab
                    ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conversation Thread List */}
          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-slate-100 dark:divide-white/[0.04] space-y-1">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread?.id;

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.avatar}
                      alt={thread.prospectName}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    {thread.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -top-0.5 -right-0.5 ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {thread.prospectName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {thread.timestamp}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 truncate">
                      {thread.company}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5">
                      {thread.lastMessage}
                    </p>

                    {thread.needsFollowUp && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-[9px]">
                        Needs Follow-up
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Column 2: Message Thread & Composer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-full px-2">
          {activeThread ? (
            <>
              {/* Thread Header */}
              <div className="pb-3 border-b border-slate-100 dark:border-[#202020] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeThread.avatar}
                    alt={activeThread.prospectName}
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{activeThread.prospectName}</span>
                      <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-mono">
                        1st Degree
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {activeThread.title || 'Executive'} @ {activeThread.company}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCreateLeadFromThread}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                >
                  Convert Lead
                </Button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-3 text-xs">
                {activeThread.messages?.map((msg) => {
                  const isUser = msg.sender === 'user';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-2xs ${
                          isUser
                            ? 'bg-emerald-600 text-white rounded-br-xs'
                            : 'bg-slate-100 dark:bg-[#181818] text-slate-900 dark:text-slate-100 rounded-bl-xs'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer Form */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setComposerText("Let's schedule 15 minutes this Thursday: https://cal.com/team-outbound")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[10px] font-semibold cursor-pointer"
                  >
                    📅 Insert Cal Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setComposerText("Here is our latest SOC2 Type II compliance overview whitepaper.")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[10px] font-semibold cursor-pointer"
                  >
                    📄 Send Case Study
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder={`Reply to ${activeThread.prospectName}... (Shift+Enter for new line)`}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 resize-none"
                  />
                  <div className="absolute right-2.5 bottom-3 flex items-center gap-1.5">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-slate-400 text-xs">
              Select a conversation to view messages.
            </div>
          )}
        </div>

        {/* Column 3: Prospect Information & CRM Intelligence (3 cols) */}
        <div className="lg:col-span-3 h-full border-l border-slate-100 dark:border-[#202020] pl-3 space-y-4 overflow-y-auto no-scrollbar text-xs">
          {activeThread && (
            <>
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/80 dark:border-[#202020] text-center space-y-2">
                <img
                  src={activeThread.avatar}
                  alt={activeThread.prospectName}
                  className="w-16 h-16 rounded-2xl object-cover mx-auto shadow-sm"
                />
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {activeThread.prospectName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {activeThread.title || 'Head of Sales Operations'}
                  </div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {activeThread.company}
                  </div>
                </div>
              </div>

              {/* Prospect Details Matrix */}
              <div className="space-y-2 font-mono text-[11px]">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                  Lead Metadata
                </span>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/40 border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Network Degree:</span>
                    <span className="font-bold text-emerald-600">1st Degree Connection</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Campaign:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">VP Sales Outreach</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Sender:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Sarah Jenkins</span>
                  </div>
                </div>
              </div>

              {/* Notes & Internal Context */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Account Notes & CRM Memory
                </span>
                <textarea
                  rows={4}
                  value={notes[activeThread.id] || ''}
                  onChange={(e) => setNotes({ ...notes, [activeThread.id]: e.target.value })}
                  placeholder="Add private deal notes..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-[11px] text-slate-900 dark:text-white focus:outline-hidden resize-none"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => success('Lead notes synchronized to CRM pipeline.', 'Notes Saved')}
                >
                  Save Note
                </Button>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
