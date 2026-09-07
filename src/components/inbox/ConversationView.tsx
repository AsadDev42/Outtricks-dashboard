import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Send, 
  Sparkles, 
  Paperclip, 
  Flame, 
  Calendar, 
  Archive, 
  User, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  MoreHorizontal,
  ChevronDown,
  Layers,
  Clock,
  Trash2,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useMasterInbox, InboxChannelType } from '../../context/MasterInboxContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { useToast } from '../../context/ToastContext';

export interface ConversationViewProps {
  onOpenScheduleMeetingModal: () => void;
  onToggleContactSidebar: () => void;
  onBackMobile?: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  onOpenScheduleMeetingModal,
  onToggleContactSidebar,
  onBackMobile,
}) => {
  const {
    activeConversation,
    sendMessage,
    markAsUnread,
    toggleInterested,
    toggleArchived,
    assignConversation,
    deleteConversation,
  } = useMasterInbox();

  const [replyText, setReplyText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<InboxChannelType>('email');
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([]);
  const { success } = useToast();

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs font-sans bg-slate-50/50 dark:bg-[#080d1a]">
        <div className="text-center space-y-2">
          <Mail className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Select a Conversation</div>
          <p className="text-xs text-slate-400">Choose a thread from the inbox to inspect messages and reply.</p>
        </div>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendMessage(activeConversation.id, replyText.trim(), selectedChannel, attachments);
    setReplyText('');
    setAttachments([]);
  };

  const handleTemplateSelect = (type: string) => {
    const firstName = activeConversation.contactName.split(' ')[0];
    if (type === 'demo') {
      setReplyText(`Hi ${firstName},\n\nGreat connecting! Let's get an executive walkthrough scheduled. You can grab any 15-minute slot that works best for your team here:\n\nhttps://cal.com/outtricks-growth/15min\n\nLooking forward to speaking!`);
    } else if (type === 'pricing') {
      setReplyText(`Hi ${firstName},\n\nOur multi-inbox rotation is priced at a flat tier with unlimited rotating Google Workspace & Microsoft 365 mailboxes included. Unlike per-inbox platforms, you never pay incremental seats for adding sender domains.\n\nLet me know if Thursday 2 PM works for a quick demo!`);
    } else if (type === 'whitepaper') {
      setReplyText(`Hi ${firstName},\n\nAttached is our SOC2 Type II compliance summary and European GDPR data protection architecture documentation.\n\nHappy to answer any specific InfoSec questions for your team.`);
      setAttachments([{ name: 'Outtricks_SOC2_Compliance_Overview.pdf', size: '2.4 MB' }]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-[#080d1a] font-sans min-w-0">
      
      {/* Top Thread Header */}
      <div className="p-3 sm:p-4 bg-white dark:bg-[#161616] border-b border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 shrink-0 shadow-2xs">
        
        {/* Contact Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {onBackMobile && (
            <button
              type="button"
              onClick={onBackMobile}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] md:hidden cursor-pointer shrink-0"
              title="Back to conversation list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <img
            src={activeConversation.avatar}
            alt={activeConversation.contactName}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                {activeConversation.contactName}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold uppercase shrink-0">
                {activeConversation.channel}
              </span>
            </div>
            <div className="text-xs text-slate-500 truncate">
              {activeConversation.contactTitle} @ {activeConversation.companyName}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          <button
            type="button"
            onClick={() => toggleInterested(activeConversation.id)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeConversation.interested
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-600'
                : 'bg-white dark:bg-[#1C1C1C] border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300'
            }`}
            title="Toggle Interested status"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Interested</span>
          </button>

          <button
            type="button"
            onClick={onOpenScheduleMeetingModal}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-blue-600 dark:text-blue-400 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Book demo meeting"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Schedule Demo</span>
          </button>

          <button
            type="button"
            onClick={() => toggleArchived(activeConversation.id)}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
            title="Archive conversation"
          >
            <Archive className="w-3.5 h-3.5" />
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleContactSidebar}
            leftIcon={<Building2 className="w-3.5 h-3.5" />}
          >
            <span className="hidden sm:inline">Account Details</span>
          </Button>

        </div>

      </div>

      {/* Message Stream with Independent Scrolling */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">
        {activeConversation.messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isVoiceSdr = msg.sender === 'voice_sdr';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#181818] text-[11px] text-slate-500 border border-slate-200/80 dark:border-[#202020] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>{msg.content}</span>
                  {msg.details && <span className="font-mono text-[10px] text-slate-400">• {msg.details}</span>}
                </div>
              </div>
            );
          }

          if (isVoiceSdr) {
            return (
              <div key={msg.id} className="p-4 rounded-3xl bg-blue-50/80 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-blue-950 dark:text-blue-200">
                      Autonomous Voice SDR Qualification Call
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed pl-9">
                  {msg.content}
                </p>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={msg.senderAvatar || activeConversation.avatar}
                alt={msg.senderName}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
              />

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Bubble Header */}
                <div className={`flex items-center gap-2 text-[10px] font-mono text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="font-bold text-slate-600 dark:text-slate-300">{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                  <span className="text-emerald-500 font-bold">✓ SPF/DKIM</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 shadow-2xs'
                  }`}
                >
                  {msg.content}

                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/20 dark:border-white/10 space-y-1">
                      {msg.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-black/10 dark:bg-white/5 text-[11px] font-mono"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="truncate">{att.name}</span>
                          <span className="text-[10px] opacity-70">({att.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Channel Reply Composer Fixed at Bottom */}
      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 bg-white dark:bg-[#161616] border-t border-slate-200/80 dark:border-[#2A2A2A] space-y-3 shrink-0"
      >
        {/* Channel Selector & Templates Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          
          {/* Channel Tabs */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A]">
            <button
              type="button"
              onClick={() => setSelectedChannel('email')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                selectedChannel === 'email'
                  ? 'bg-white dark:bg-[#161616] text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('linkedin')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                selectedChannel === 'linkedin'
                  ? 'bg-white dark:bg-[#161616] text-sky-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              LinkedIn
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannel('voice')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                selectedChannel === 'voice'
                  ? 'bg-white dark:bg-[#161616] text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Voice Call / SMS
            </button>
          </div>

          {/* Quick Reply Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">AI Snippets:</span>
            <button
              type="button"
              onClick={() => handleTemplateSelect('demo')}
              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              Schedule Demo
            </button>
            <button
              type="button"
              onClick={() => handleTemplateSelect('pricing')}
              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => handleTemplateSelect('whitepaper')}
              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              SOC2 Doc
            </button>
          </div>

        </div>

        {/* Textarea */}
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder={`Write a reply to ${activeConversation.contactName} via ${selectedChannel.toUpperCase()}...`}
          rows={3}
          className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Attachment preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {attachments.map((att, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-300 text-[11px] font-mono"
              >
                <Paperclip className="w-3 h-3" />
                <span>{att.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachments([])}
                  className="hover:text-rose-500 cursor-pointer ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Rotating Google Workspace sender pool with humanized pacing.
          </span>

          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={!replyText.trim()}
            leftIcon={<Send className="w-3.5 h-3.5" />}
            className="ml-auto"
          >
            Dispatch Reply
          </Button>
        </div>

      </form>

    </div>
  );
};
