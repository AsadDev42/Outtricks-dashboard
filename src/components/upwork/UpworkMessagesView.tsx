import React, { useState } from 'react';
import { 
  MessageSquare, 
  ArrowRight, 
  Send, 
  Sparkles, 
  Search, 
  User, 
  Clock, 
  Briefcase, 
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export type UpworkMessagesTab = 'all' | 'replies' | 'conversations';

interface MessageThread {
  id: string;
  type: 'reply' | 'conversation';
  clientName: string;
  clientCompany: string;
  clientRating: number;
  jobTitle: string;
  budget: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatarBg: string;
  messages: {
    id: string;
    sender: 'client' | 'you';
    senderName: string;
    text: string;
    time: string;
  }[];
}

const INITIAL_THREADS: MessageThread[] = [
  {
    id: 'msg-1',
    type: 'reply',
    clientName: 'Elena Rostova',
    clientCompany: 'FinTech Stack Systems',
    clientRating: 4.95,
    jobTitle: 'Senior React / TypeScript Architect for Cloud Financial Core',
    budget: '$120/hr',
    lastMessage: 'Hi! Your proposal caught our attention, particularly the sub-second latency optimizations. Can we schedule an intro call tomorrow?',
    timestamp: '15m ago',
    unread: true,
    avatarBg: 'bg-emerald-500',
    messages: [
      {
        id: 'm1-1',
        sender: 'you',
        senderName: 'You (via TRIXIE AI)',
        text: 'Hi Elena, I reviewed your financial core architecture requirements. Having built similar WebRTC and low-latency trading interfaces handling 10k+ events/sec, I can help your team ship this milestone ahead of schedule.',
        time: 'Yesterday, 4:20 PM'
      },
      {
        id: 'm1-2',
        sender: 'client',
        senderName: 'Elena Rostova',
        text: 'Hi! Your proposal caught our attention, particularly the sub-second latency optimizations. Can we schedule an intro call tomorrow?',
        time: 'Today, 10:15 AM'
      }
    ]
  },
  {
    id: 'msg-2',
    type: 'conversation',
    clientName: 'David Chen',
    clientCompany: 'SaaSFlow Global',
    clientRating: 5.0,
    jobTitle: 'Full-Stack Next.js & Supabase Enterprise Portal',
    budget: '$15,000 Fixed',
    lastMessage: 'The Milestone 2 code review looks clean. I have approved the $4,500 escrow release.',
    timestamp: '2h ago',
    unread: false,
    avatarBg: 'bg-indigo-500',
    messages: [
      {
        id: 'm2-1',
        sender: 'you',
        senderName: 'You',
        text: 'Hi David, Milestone 2 has been submitted with full test coverage and schema migration scripts ready for your review.',
        time: 'Yesterday, 11:30 AM'
      },
      {
        id: 'm2-2',
        sender: 'client',
        senderName: 'David Chen',
        text: 'The Milestone 2 code review looks clean. I have approved the $4,500 escrow release.',
        time: 'Today, 8:40 AM'
      }
    ]
  },
  {
    id: 'msg-3',
    type: 'reply',
    clientName: 'Sarah Jenkins',
    clientCompany: 'CloudScale AI',
    clientRating: 4.9,
    jobTitle: 'AI Workflow Integration Engineer (LangChain / Gemini)',
    budget: '$95/hr',
    lastMessage: 'Loved the prompt pipeline architecture sample you shared. When would you be available to start?',
    timestamp: '3h ago',
    unread: true,
    avatarBg: 'bg-amber-500',
    messages: [
      {
        id: 'm3-1',
        sender: 'you',
        senderName: 'You (via TRIXIE AI)',
        text: 'Hello Sarah! I noticed your multi-agent architecture setup. Here is our live reference implementation running automated function calling pipelines with robust validation.',
        time: 'Yesterday, 2:15 PM'
      },
      {
        id: 'm3-2',
        sender: 'client',
        senderName: 'Sarah Jenkins',
        text: 'Loved the prompt pipeline architecture sample you shared. When would you be available to start?',
        time: 'Today, 7:50 AM'
      }
    ]
  },
  {
    id: 'msg-4',
    type: 'conversation',
    clientName: 'Marcus Vance',
    clientCompany: 'Apex Data Labs',
    clientRating: 4.88,
    jobTitle: 'PostgreSQL Query Optimization & Database Sharding',
    budget: '$6,000 Fixed',
    lastMessage: 'All query execution benchmarks dropped under 25ms. Thanks for the quick turnaround!',
    timestamp: '1d ago',
    unread: false,
    avatarBg: 'bg-emerald-600',
    messages: [
      {
        id: 'm4-1',
        sender: 'client',
        senderName: 'Marcus Vance',
        text: 'Can we check the partition prune execution plan for the orders table?',
        time: 'Aug 24, 2:00 PM'
      },
      {
        id: 'm4-2',
        sender: 'you',
        senderName: 'You',
        text: 'Attached the EXPLAIN ANALYZE report. Added composite indexing on (tenant_id, created_at) which eliminated all sequential scans.',
        time: 'Aug 24, 4:30 PM'
      },
      {
        id: 'm4-3',
        sender: 'client',
        senderName: 'Marcus Vance',
        text: 'All query execution benchmarks dropped under 25ms. Thanks for the quick turnaround!',
        time: 'Aug 25, 9:15 AM'
      }
    ]
  }
];

export interface UpworkMessagesViewProps {
  initialTab?: UpworkMessagesTab;
}

export const UpworkMessagesView: React.FC<UpworkMessagesViewProps> = ({
  initialTab = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<UpworkMessagesTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(INITIAL_THREADS[0].id);
  const [replyText, setReplyText] = useState('');
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);

  const counts = {
    all: threads.length,
    replies: threads.filter(t => t.type === 'reply').length,
    conversations: threads.filter(t => t.type === 'conversation').length,
  };

  const tabs: { id: UpworkMessagesTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Messages', count: counts.all },
    { id: 'replies', label: 'Replies', count: counts.replies },
    { id: 'conversations', label: 'Conversations', count: counts.conversations },
  ];

  const filteredThreads = threads.filter(t => {
    if (activeTab === 'replies' && t.type !== 'reply') return false;
    if (activeTab === 'conversations' && t.type !== 'conversation') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.clientName.toLowerCase().includes(q) ||
        t.clientCompany.toLowerCase().includes(q) ||
        t.jobTitle.toLowerCase().includes(q) ||
        t.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedThread = threads.find(t => t.id === selectedThreadId) || filteredThreads[0] || threads[0];

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedThread) return;
    const newMessage = {
      id: `m-new-${Date.now()}`,
      sender: 'you' as const,
      senderName: 'You',
      text: replyText.trim(),
      time: 'Just now'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === selectedThread.id) {
        return {
          ...t,
          lastMessage: replyText.trim(),
          timestamp: 'Just now',
          unread: false,
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    setReplyText('');
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header Banner & Sub-Tabs Navigation */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-primary-muted flex items-center justify-center text-primary">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                Upwork Messaging & Client Direct Chats
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Synchronized proposal replies, active contract negotiations, and interview discussions.
            </p>
          </div>

          <Link to="/inbox">
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open in Master Inbox
            </Button>
          </Link>
        </div>

        {/* Sub-Tabs: [ All Messages ] [ Replies ] [ Conversations ] */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-[#222222] pt-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-black/25 text-white font-bold'
                      : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Message Threads List (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col overflow-hidden max-h-[640px]">
          
          {/* Quick Search */}
          <div className="p-3 border-b border-slate-100 dark:border-[#222222]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations, clients, jobs..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Threads Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.04]">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === selectedThread?.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 transition-colors cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-primary-muted/40 dark:bg-white/[0.04] border-l-3 border-primary'
                      : 'hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-xl ${thread.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {thread.clientName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-slate-950 dark:text-white truncate">
                            {thread.clientName}
                          </span>
                          {thread.unread && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {thread.clientCompany}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {thread.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {thread.lastMessage}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
                    <span className="truncate max-w-[200px] text-slate-500 dark:text-slate-400">
                      {thread.jobTitle}
                    </span>
                    <Badge variant={thread.type === 'reply' ? 'amber' : 'emerald'} size="sm">
                      {thread.type === 'reply' ? 'Proposal Reply' : 'Active Chat'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Selected Active Conversation (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col overflow-hidden max-h-[640px]">
          {selectedThread ? (
            <>
              {/* Thread Top Bar */}
              <div className="p-4 border-b border-slate-100 dark:border-[#222222] flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#1A1A1A]/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl ${selectedThread.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                    {selectedThread.clientName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                        {selectedThread.clientName}
                      </h3>
                      <span className="flex items-center gap-0.5 text-[10px] font-mono text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{selectedThread.clientRating}</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {selectedThread.jobTitle} • <span className="text-slate-800 dark:text-slate-200 font-bold">{selectedThread.budget}</span>
                    </div>
                  </div>
                </div>

                <Badge variant={selectedThread.type === 'reply' ? 'amber' : 'emerald'} size="sm">
                  {selectedThread.type === 'reply' ? 'Proposal Reply' : 'Active Contract'}
                </Badge>
              </div>

              {/* Messages Stream View */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {selectedThread.messages.map((m) => {
                  const isYou = m.sender === 'you';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isYou ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono px-1">
                        <span>{m.senderName}</span>
                        <span>•</span>
                        <span>{m.time}</span>
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                          isYou
                            ? 'bg-primary text-white rounded-br-xs shadow-xs font-medium'
                            : 'bg-slate-100 dark:bg-[#202020] text-slate-900 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-[#2A2A2A]'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Box */}
              <div className="p-3.5 border-t border-slate-100 dark:border-[#222222] bg-slate-50/50 dark:bg-[#181818]/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TRIXIE AI Quick Assistant</span>
                  </div>
                  <span className="font-mono text-[10px]">Enter to send, Shift+Enter for new line</span>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    placeholder={`Reply directly to ${selectedThread.clientName}...`}
                    className="w-full p-3 text-xs rounded-2xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setReplyText("Sounds great! I would be delighted to jump on a quick 15-minute intro call to align on technical specs and timeline.")}
                      className="text-[10px] font-medium px-2 py-1 rounded-lg bg-slate-200/70 dark:bg-[#262626] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-[#303030] transition-colors cursor-pointer"
                    >
                      Schedule Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyText("I have reviewed the scope and can kick off development immediately upon milestone funding.")}
                      className="text-[10px] font-medium px-2 py-1 rounded-lg bg-slate-200/70 dark:bg-[#262626] text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-[#303030] transition-colors cursor-pointer"
                    >
                      Accept Scope
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs my-auto">
              Select a message thread to view details and reply.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
