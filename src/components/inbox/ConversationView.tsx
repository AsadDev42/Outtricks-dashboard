import React, { useEffect, useMemo, useState } from 'react';
import {
  Mail,
  Linkedin,
  PhoneCall,
  BriefcaseBusiness,
  Send,
  Paperclip,
  Flame,
  Calendar,
  Archive,
  Building2,
  ShieldCheck,
  Trash2,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useMasterInbox, InboxChannelType } from '../../context/MasterInboxContext';

export interface ConversationViewProps {
  onOpenScheduleMeetingModal: () => void;
  onToggleContactSidebar: () => void;
  onBackMobile?: () => void;
}

const CHANNEL_META: Record<InboxChannelType, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  email: { label: 'Email', Icon: Mail },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  upwork: { label: 'Upwork', Icon: BriefcaseBusiness },
  voice: { label: 'Voice', Icon: PhoneCall },
};

export const ConversationView: React.FC<ConversationViewProps> = ({
  onOpenScheduleMeetingModal,
  onToggleContactSidebar,
  onBackMobile,
}) => {
  const navigate = useNavigate();
  const {
    activeConversation,
    sendMessage,
    markAsUnread,
    toggleInterested,
    toggleArchived,
    deleteConversation,
  } = useMasterInbox();

  const [replyText, setReplyText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<InboxChannelType>('email');
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([]);

  useEffect(() => {
    if (!activeConversation) return;
    setSelectedChannel(activeConversation.channel);
    setReplyText('');
    setAttachments([]);
  }, [activeConversation?.id, activeConversation?.channel]);

  const channelMeta = activeConversation ? CHANNEL_META[activeConversation.channel] : CHANNEL_META.email;
  const ChannelIcon = channelMeta.Icon;

  const canTextReply = Boolean(
    activeConversation?.accountId &&
    activeConversation.replyCapable !== false &&
    activeConversation.replyMode !== 'read-only' &&
    activeConversation.replyMode !== 'voice-action' &&
    activeConversation.channel !== 'voice'
  );

  const connectionLabel = useMemo(() => {
    if (!activeConversation) return '';
    if (!activeConversation.accountId) return 'No connected account';
    const identity = activeConversation.accountEmail || activeConversation.accountName || 'Connected account';
    const provider = activeConversation.accountProvider ? ` • ${activeConversation.accountProvider}` : '';
    return `${identity}${provider}`;
  }, [activeConversation]);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs font-sans bg-slate-50/50 dark:bg-[#080d1a]">
        <div className="text-center space-y-2">
          <Mail className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Select a Conversation</div>
          <p>Choose a thread from Master Inbox to inspect its timeline and reply from the connected channel.</p>
        </div>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !canTextReply) return;

    const sent = sendMessage(activeConversation.id, replyText.trim(), selectedChannel, attachments);
    if (sent) {
      setReplyText('');
      setAttachments([]);
    }
  };

  const handleTemplateSelect = (type: string) => {
    const firstName = activeConversation.contactName.split(' ')[0];
    if (type === 'demo') {
      setReplyText(`Hi ${firstName},\n\nGreat connecting. You can choose a 15-minute slot that works for your team here:\n\nhttps://cal.com/outtricks-growth/15min\n\nLooking forward to speaking.`);
    } else if (type === 'pricing') {
      setReplyText(`Hi ${firstName},\n\nHappy to share the relevant Outtricks plan and usage breakdown for your team. If you tell me your expected monthly volume, I can point you to the best-fit option.`);
    } else if (type === 'whitepaper') {
      setReplyText(`Hi ${firstName},\n\nAttached is our SOC2 Type II compliance overview. Happy to answer any specific InfoSec or data-protection questions from your team.`);
      setAttachments([{ name: 'Outtricks_SOC2_Compliance_Overview.pdf', size: '2.4 MB' }]);
    }
  };

  const renderChannelDeliveryMeta = (channel: InboxChannelType) => {
    if (channel === 'email') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
          <ShieldCheck className="w-3 h-3" /> Email security
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
        <CheckCircle2 className="w-3 h-3" /> {CHANNEL_META[channel].label}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-[#080d1a] font-sans min-w-0">
      <div className="p-3 sm:p-4 bg-white dark:bg-[#161616] border-b border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          {onBackMobile && (
            <button
              type="button"
              onClick={onBackMobile}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] md:hidden cursor-pointer shrink-0"
              aria-label="Back to conversation list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <img
            src={activeConversation.avatar}
            alt=""
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">{activeConversation.contactName}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-muted text-primary shrink-0">
                <ChannelIcon className="w-3 h-3" />
                {channelMeta.label}
              </span>
            </div>
            <div className="text-xs text-slate-500 truncate">{activeConversation.contactTitle} @ {activeConversation.companyName}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => toggleInterested(activeConversation.id)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeConversation.interested
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-600'
                : 'bg-white dark:bg-[#1C1C1C] border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300'
            }`}
            aria-label="Toggle interested status"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Interested</span>
          </button>

          <button
            type="button"
            onClick={onOpenScheduleMeetingModal}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-primary text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Schedule Demo</span>
          </button>

          <button
            type="button"
            onClick={() => toggleArchived(activeConversation.id)}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Archive conversation"
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

      <div className="px-4 sm:px-6 py-2 bg-white/70 dark:bg-[#111111] border-b border-slate-200/70 dark:border-[#222] flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 min-w-0">
          <ChannelIcon className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Reply identity:</span>
          <span className="text-slate-500 dark:text-slate-400 truncate">{connectionLabel}</span>
        </div>
        {activeConversation.accountId ? (
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
            <AlertCircle className="w-3.5 h-3.5" /> Connection required
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">
        {activeConversation.messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSystem = msg.sender === 'system';
          const isVoiceSdr = msg.sender === 'voice_sdr';

          if (isSystem || isVoiceSdr) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="max-w-3xl px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#202020] flex items-start gap-2">
                  {isVoiceSdr ? <PhoneCall className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />}
                  <span className="whitespace-pre-line">{msg.content}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex gap-3 text-xs ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <img
                src={msg.senderAvatar || activeConversation.avatar}
                alt=""
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
              />
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 text-[10px] font-mono text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="font-bold text-slate-600 dark:text-slate-300">{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                  {renderChannelDeliveryMeta(msg.channel)}
                </div>

                <div className={`p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                  isUser
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 shadow-2xs'
                }`}>
                  {msg.content}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-current/15 space-y-1">
                      {msg.attachments.map((att, idx) => (
                        <div key={`${att.name}-${idx}`} className="flex items-center gap-2 text-[11px] font-mono">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="truncate">{att.name}</span>
                          <span className="opacity-70">({att.size})</span>
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

      {activeConversation.channel === 'voice' || activeConversation.replyMode === 'voice-action' ? (
        <div className="p-3 sm:p-4 bg-white dark:bg-[#161616] border-t border-slate-200/80 dark:border-[#2A2A2A] shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626]">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">Voice conversation</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Continue this thread with a call action. Master Inbox does not fake a text reply for voice-only conversations.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/voice-ai/call-center')} leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
              Open Voice AI
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white dark:bg-[#161616] border-t border-slate-200/80 dark:border-[#2A2A2A] space-y-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A]">
              <ChannelIcon className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold text-slate-700 dark:text-slate-300">Reply via {channelMeta.label}</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Quick replies:</span>
              <button type="button" onClick={() => handleTemplateSelect('demo')} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 dark:hover:bg-[#222] cursor-pointer whitespace-nowrap">Schedule Demo</button>
              <button type="button" onClick={() => handleTemplateSelect('pricing')} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 dark:hover:bg-[#222] cursor-pointer whitespace-nowrap">Pricing</button>
              <button type="button" onClick={() => handleTemplateSelect('whitepaper')} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-[10px] font-semibold hover:bg-slate-200 dark:hover:bg-[#222] cursor-pointer whitespace-nowrap">SOC2 Doc</button>
            </div>
          </div>

          {!canTextReply && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 text-[11px]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Connect the matching {channelMeta.label} account before replying from Master Inbox.</span>
            </div>
          )}

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={canTextReply ? `Write a ${channelMeta.label} reply to ${activeConversation.contactName}...` : `${channelMeta.label} reply unavailable until the account is connected`}
            rows={3}
            disabled={!canTextReply}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {attachments.map((att, i) => (
                <span key={`${att.name}-${i}`} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-primary-muted text-primary text-[11px] font-mono">
                  <Paperclip className="w-3 h-3" />
                  <span>{att.name}</span>
                  <button type="button" onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="hover:text-rose-500 cursor-pointer ml-1" aria-label={`Remove ${att.name}`}>×</button>
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 text-xs pt-1">
            <span className="text-[11px] text-slate-400 font-mono truncate hidden sm:inline">Sending identity: {connectionLabel}</span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => markAsUnread(activeConversation.id)}
                className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Mark unread
              </button>
              <Button variant="primary" size="sm" type="submit" disabled={!canTextReply || !replyText.trim()} leftIcon={<Send className="w-3.5 h-3.5" />}>
                Send Reply
              </Button>
            </div>
          </div>
        </form>
      )}

      <button
        type="button"
        onClick={() => deleteConversation(activeConversation.id)}
        className="sr-only"
        aria-label="Delete conversation"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
