import React, { useState } from 'react';
import { 
  Inbox, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Search, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  Building2, 
  Calendar, 
  ArrowRight,
  Filter,
  CheckCheck,
  ChevronRight,
  Phone,
  Bot
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

interface InboxThread {
  id: string;
  contactName: string;
  title: string;
  company: string;
  avatar: string;
  channel: 'email' | 'linkedin' | 'voice';
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  intentScore: number;
  dealValue: string;
  sentiment: 'positive' | 'meeting' | 'objection' | 'neutral';
  conversation: {
    sender: 'prospect' | 'outtricks' | 'voice_sdr';
    text: string;
    time: string;
    details?: string;
  }[];
}

const INBOX_THREADS: InboxThread[] = [
  {
    id: 'thread_1',
    contactName: 'Sarah Jenkins',
    title: 'VP of Growth & Revenue',
    company: 'CloudScale AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    channel: 'voice',
    lastMessage: 'Demo confirmed for Thursday 2:00 PM PST. Calendar invite accepted.',
    timestamp: '8m ago',
    unread: true,
    intentScore: 98,
    dealValue: '$48,000 ARR',
    sentiment: 'meeting',
    conversation: [
      {
        sender: 'outtricks',
        text: 'Hi Sarah, saw you recently expanded the RevOps team at CloudScale AI. Are you exploring consolidating outbound tools?',
        time: 'Day 1 • 10:30 AM'
      },
      {
        sender: 'prospect',
        text: 'Opened email twice via Google Workspace Mailbox #4.',
        time: 'Day 2 • 02:15 PM',
        details: 'Behavioral Trigger: 2 Opens detected without reply'
      },
      {
        sender: 'voice_sdr',
        text: 'Autonomous Voice SDR placed qualification call (02m 44s duration). Prospect qualified $40K+ budget and agreed to executive architecture demo.',
        time: 'Today • 11:20 AM'
      },
      {
        sender: 'prospect',
        text: 'Looking forward to the walkthrough with your AE on Thursday.',
        time: 'Today • 11:24 AM'
      }
    ]
  },
  {
    id: 'thread_2',
    contactName: 'David Chen',
    title: 'Head of Sales Operations',
    company: 'SaaSFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    channel: 'email',
    lastMessage: '"Sounds interesting. Let\'s chat Thursday. Send over your calendar link."',
    timestamp: '22m ago',
    unread: true,
    intentScore: 94,
    dealValue: '$32,000 ARR',
    sentiment: 'positive',
    conversation: [
      {
        sender: 'outtricks',
        text: 'Hi David, noticed SaaSFlow is running multi-inbox cold email. How are you handling DNS warmup and LinkedIn synchronization?',
        time: 'Yesterday • 09:00 AM'
      },
      {
        sender: 'prospect',
        text: 'Hey Alex, thanks for reaching out. We have massive sync lag between our email tool and Salesforce. Does Outtricks support native 2-way syncing without Zapier?',
        time: 'Today • 10:15 AM'
      },
      {
        sender: 'prospect',
        text: 'Sounds interesting. Let\'s chat Thursday. Send over your calendar link.',
        time: 'Today • 10:45 AM'
      }
    ]
  },
  {
    id: 'thread_3',
    contactName: 'Elena Rostova',
    title: 'Chief Revenue Officer',
    company: 'FinTech Pulse',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    channel: 'linkedin',
    lastMessage: 'Accepted connection invite. Agreed to review security whitepaper.',
    timestamp: '1h ago',
    unread: false,
    intentScore: 89,
    dealValue: '$75,000 ARR',
    sentiment: 'positive',
    conversation: [
      {
        sender: 'outtricks',
        text: 'Hi Elena, admired FinTech Pulse\'s Series B expansion. Thought you might find our single-database revenue OS architecture interesting.',
        time: '2 days ago'
      },
      {
        sender: 'prospect',
        text: 'Thanks for connecting Alex. We are currently evaluating enterprise security compliance for our outbound tooling.',
        time: '1h ago'
      }
    ]
  }
];

export const UnifiedInboxView: React.FC = () => {
  const [threads, setThreads] = useState<InboxThread[]>(INBOX_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>(INBOX_THREADS[0].id);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { success } = useToast();

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedThreads = threads.map((t) => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          conversation: [
            ...t.conversation,
            {
              sender: 'outtricks' as const,
              text: replyText.trim(),
              time: 'Just now',
            }
          ],
          lastMessage: replyText.trim(),
          unread: false,
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setReplyText('');
    success(`Reply dispatched to ${activeThread.contactName} via ${activeThread.channel.toUpperCase()}`, 'Message Dispatched');
  };

  const handleUseAiSuggestion = (suggestion: string) => {
    setReplyText(suggestion);
  };

  const filteredThreads = threads.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.contactName.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.lastMessage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] shadow-xl overflow-hidden font-sans grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
      
      {/* LEFT LIST: Conversations (5 Cols) */}
      <div className="lg:col-span-5 border-r border-slate-100 dark:border-[#202020] flex flex-col justify-between">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 dark:border-[#202020] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                Unified Revenue Inbox
              </h3>
            </div>
            <Badge variant="emerald" size="sm">
              {threads.filter((t) => t.unread).length} Unread
            </Badge>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Thread List */}
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04] overflow-y-auto flex-1 max-h-[520px]">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThread.id;

            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-4 transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-emerald-50/70 dark:bg-white/[0.04] border-l-4 border-emerald-600'
                    : 'hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={thread.avatar}
                      alt={thread.contactName}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A]"
                    />
                    {thread.channel === 'voice' && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-600 text-white">
                        <PhoneCall className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {thread.channel === 'email' && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-600 text-white">
                        <Mail className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {thread.channel === 'linkedin' && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-600 text-white">
                        <Linkedin className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-xs font-bold text-slate-950 dark:text-white truncate">
                        {thread.contactName}
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {thread.timestamp}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {thread.company} • {thread.dealValue}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 leading-snug">
                      {thread.lastMessage}
                    </p>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                        {thread.intentScore}% Intent
                      </span>
                      {thread.sentiment === 'meeting' && (
                        <Badge variant="blue" size="sm">Demo Booked</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT PREVIEW: Active Conversation & Reply Composer (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50/40 dark:bg-[#080808]/50">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-[#202020] bg-white dark:bg-[#161616] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={activeThread.avatar}
              alt={activeThread.contactName}
              className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-extrabold text-slate-950 dark:text-white truncate">
                {activeThread.contactName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {activeThread.title} @ {activeThread.company}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="emerald" size="sm">
              {activeThread.dealValue}
            </Badge>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="p-5 overflow-y-auto max-h-[380px] space-y-4">
          {activeThread.conversation.map((msg, idx) => {
            const isProspect = msg.sender === 'prospect';
            const isVoice = msg.sender === 'voice_sdr';

            return (
              <div
                key={idx}
                className={`flex flex-col ${isProspect ? 'items-start' : 'items-end'} space-y-1`}
              >
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{isProspect ? activeThread.contactName : isVoice ? 'Voice AI SDR' : 'You (Outtricks)'}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>

                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                    isProspect
                      ? 'bg-white dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200'
                      : isVoice
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-600 text-white shadow-md'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.details && (
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-[#181818] px-2 py-0.5 rounded font-mono">
                    ℹ️ {msg.details}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Quick Reply Chips */}
        <div className="px-4 py-2 bg-slate-100/70 dark:bg-[#1C1C1C]/70 border-t border-slate-200/60 dark:border-[#202020] space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>AI Suggested Actions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Send 1-Click Calendar Link for Thursday 2:00 PM',
              'Attach Enterprise Security & Architecture Whitepaper',
              'Route Deal to AE in Deals CRM with High Intent Tag'
            ].map((chip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleUseAiSuggestion(chip)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-[#161616] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 border border-slate-200/80 dark:border-[#202020] transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Reply Box Composer */}
        <form onSubmit={handleSendReply} className="p-3 bg-white dark:bg-[#161616] border-t border-slate-100 dark:border-[#202020] flex items-center gap-2">
          <input
            type="text"
            placeholder={`Reply to ${activeThread.contactName} across ${activeThread.channel}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Send
          </Button>
        </form>

      </div>

    </div>
  );
};
