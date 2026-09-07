import React, { useState, useMemo } from 'react';
import { 
  Inbox, 
  Search, 
  Mail, 
  Flame, 
  Calendar, 
  Archive, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  User, 
  Clock, 
  RotateCcw, 
  Tag, 
  ArrowRight,
  Bell,
  Check,
  ChevronDown
} from 'lucide-react';
import { useEmail, EmailInboxThread } from '../../context/EmailContext';
import { useCrm } from '../../context/CrmContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export const EmailInboxesView: React.FC = () => {
  const { emailThreads, replyToThread, markThreadRead, toggleThreadArchive } = useEmail();
  const { createReminder, createDeal, contacts } = useCrm();
  const { success, info } = useToast();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'interested' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(emailThreads[0]?.id || '');
  const [replyText, setReplyText] = useState('');

  // Reminder Dropdown State
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [threadReminders, setThreadReminders] = useState<Record<string, string>>({});

  const filteredThreads = useMemo(() => {
    return emailThreads.filter((t) => {
      if (activeFilter === 'unread' && !t.unread) return false;
      if (activeFilter === 'interested' && t.sentiment !== 'positive' && t.sentiment !== 'meeting') return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = t.contactName.toLowerCase().includes(q);
        const matchesEmail = t.contactEmail.toLowerCase().includes(q);
        const matchesCompany = t.companyName.toLowerCase().includes(q);
        const matchesSubject = t.subject.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesCompany && !matchesSubject) return false;
      }
      return true;
    });
  }, [emailThreads, activeFilter, search]);

  const activeThread = useMemo(() => {
    return emailThreads.find((t) => t.id === selectedThreadId) || filteredThreads[0] || null;
  }, [emailThreads, selectedThreadId, filteredThreads]);

  const handleSendReply = () => {
    if (!activeThread || !replyText.trim()) return;
    replyToThread(activeThread.id, replyText);
    setReplyText('');
    success(`Reply dispatched to ${activeThread.contactEmail}.`, 'Email Sent');
  };

  const handlePushToCrm = () => {
    if (!activeThread) return;
    createDeal({
      title: `${activeThread.companyName} - Enterprise Outreach Opportunity`,
      companyName: activeThread.companyName,
      companyDomain: activeThread.contactEmail.split('@')[1] || 'company.com',
      companyLogo: '',
      contactName: activeThread.contactName,
      contactTitle: 'Decision Maker',
      contactEmail: activeThread.contactEmail,
      contactPhone: '+1 (555) 019-2831',
      value: 36000,
      stageId: 'demo_booked',
      pipelineId: 'pipe_1',
      owner: 'Sarah Jenkins',
      probability: 60,
      expectedCloseDate: '2026-09-30',
      tags: ['Email Reply', 'High Intent'],
      priority: 'high',
      source: 'Cold Email Sequence',
    });
    success(`Created Deals CRM opportunity for ${activeThread.contactName} (${activeThread.companyName}).`, 'Pushed to CRM');
  };

  const handleSetReminder = (timing: 'today' | 'tomorrow' | '3days' | '7days') => {
    if (!activeThread) return;

    let targetDate = new Date();
    let dueTime = '14:00';
    let label = 'Today';

    if (timing === 'today') {
      targetDate.setHours(targetDate.getHours() + 2);
      dueTime = `${String(targetDate.getHours()).padStart(2, '0')}:00`;
      label = `Today at ${dueTime}`;
    } else if (timing === 'tomorrow') {
      targetDate.setDate(targetDate.getDate() + 1);
      dueTime = '09:00';
      label = 'Tomorrow at 9:00 AM';
    } else if (timing === '3days') {
      targetDate.setDate(targetDate.getDate() + 3);
      dueTime = '10:00';
      label = `In 3 days (${targetDate.toISOString().split('T')[0]})`;
    } else if (timing === '7days') {
      targetDate.setDate(targetDate.getDate() + 7);
      dueTime = '10:00';
      label = `In 7 days (${targetDate.toISOString().split('T')[0]})`;
    }

    const dueDateStr = targetDate.toISOString().split('T')[0];

    createReminder({
      title: `Follow up with ${activeThread.contactName} (${activeThread.companyName})`,
      type: 'follow_up',
      contactName: activeThread.contactName,
      companyName: activeThread.companyName,
      dueDate: dueDateStr,
      dueTime,
      reminderTime: '15_min_before',
      priority: 'high',
      assignee: 'Sarah Jenkins',
      notes: `Lead responded on sequence: "${activeThread.subject}". Keep cold sequence stopped and maintain direct communication.`,
    });

    setThreadReminders(prev => ({
      ...prev,
      [activeThread.id]: label
    }));

    setIsReminderOpen(false);
    success(`Follow-up reminder set for ${label}. Synced with CRM Reminders.`, 'Reminder Scheduled');
  };

  return (
    <div className="h-[calc(100vh-14rem)] bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden flex flex-col md:flex-row font-sans">
      
      {/* Left Column: Email Replies Feed */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200/80 dark:border-[#2A2A2A] flex flex-col h-full bg-slate-50/40 dark:bg-[#090e1a]">
        
        {/* Filter Strip */}
        <div className="p-3 border-b border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>Email Reply Inboxes</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{filteredThreads.length} threads</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search replies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'interested', label: 'Hot / Leads' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.04]">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <Inbox className="w-6 h-6 mx-auto mb-1 text-slate-300 dark:text-slate-700" />
              <p>No email replies found in this view.</p>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const active = activeThread?.id === thread.id;
              const hasReminder = threadReminders[thread.id];

              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setSelectedThreadId(thread.id);
                    if (thread.unread) markThreadRead(thread.id);
                  }}
                  className={`p-3.5 cursor-pointer transition-all ${
                    active 
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/[0.08] border-l-4 border-l-emerald-500' 
                      : 'hover:bg-slate-100/60 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {thread.contactName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {thread.timestamp}
                    </span>
                  </div>

                  <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate mb-1">
                    {thread.subject}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate">{thread.companyName}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasReminder && (
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">
                          <Bell className="w-2.5 h-2.5" />
                          Remind
                        </span>
                      )}
                      <Badge
                        variant={thread.sentiment === 'positive' || thread.sentiment === 'meeting' ? 'emerald' : 'slate'}
                        size="sm"
                      >
                        {thread.sentiment}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Right Column: Active Thread Detail & Composer */}
      {activeThread ? (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#161616] overflow-hidden">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-100 dark:border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                  {activeThread.subject}
                </h2>
                <Badge variant={activeThread.sentiment === 'positive' || activeThread.sentiment === 'meeting' ? 'emerald' : 'slate'} size="sm">
                  {activeThread.sentiment.toUpperCase()}
                </Badge>
                {threadReminders[activeThread.id] && (
                  <Badge variant="amber" size="sm">
                    ⏰ {threadReminders[activeThread.id]}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{activeThread.contactName} &lt;{activeThread.contactEmail}&gt;</span>
                <span>•</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{activeThread.companyName}</span>
                <span>•</span>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">via {activeThread.mailboxUsed}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 relative">
              {/* Follow-up Reminder Dropdown */}
              <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsReminderOpen(!isReminderOpen)}
                  leftIcon={<Bell className="w-3.5 h-3.5 text-amber-500" />}
                  rightIcon={<ChevronDown className="w-3 h-3" />}
                  className="text-xs font-bold"
                >
                  Set Reminder
                </Button>

                {isReminderOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] p-2 shadow-xl z-50 space-y-1 font-sans text-xs">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Remind me to follow up:
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSetReminder('today')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                    >
                      Today (in 2 hours)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetReminder('tomorrow')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                    >
                      Tomorrow (9:00 AM)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetReminder('3days')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                    >
                      In 3 days
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetReminder('7days')}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                    >
                      In 7 days
                    </button>
                  </div>
                )}
              </div>

              {/* Push to CRM Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handlePushToCrm}
                className="text-xs font-bold gap-1.5 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Push to CRM</span>
              </Button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {activeThread.messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[11px] text-slate-400 font-mono mb-1">
                    {msg.senderName} • {msg.timestamp}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-[#202020] text-slate-800 dark:text-slate-200 rounded-tl-xs'
                  }`}>
                    <div className="whitespace-pre-line">{msg.body}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reply Composer */}
          <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02] space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Reply as <strong className="text-slate-700 dark:text-slate-300">{activeThread.mailboxUsed}</strong></span>
              <button
                type="button"
                onClick={() => setReplyText(`Hi ${activeThread.contactName.split(' ')[0]},\n\nThanks for getting back to me! Would Thursday at 2:00 PM EST work for a brief 15-minute intro demo?\n\nBest regards,\nSarah`)}
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer text-[11px]"
              >
                <Sparkles className="w-3 h-3" />
                <span>Insert AI Meeting Booking Response</span>
              </button>
            </div>

            <div className="flex items-end gap-2">
              <textarea
                rows={3}
                placeholder={`Write reply to ${activeThread.contactName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 p-3 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none resize-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
              />
              <Button
                variant="primary"
                size="md"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="h-10 px-4 font-bold gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </Button>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select an email thread from the left list to view conversation.
        </div>
      )}

    </div>
  );
};
