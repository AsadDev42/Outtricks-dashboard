import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { LeadOwnerType } from './LeadsManagementContext';

export type InboxChannelType = 'email' | 'linkedin' | 'upwork' | 'voice';
export type InboxReplyMode = 'message' | 'voice-action' | 'read-only';

export interface InboxMessage {
  id: string;
  sender: 'prospect' | 'user' | 'voice_sdr' | 'system';
  senderName: string;
  senderAvatar: string;
  channel: InboxChannelType;
  content: string;
  timestamp: string;
  attachments?: { name: string; size: string; url?: string }[];
  details?: string;
  isRead?: boolean;
}

export interface MasterInboxThread {
  id: string;
  contactName: string;
  contactTitle: string;
  companyName: string;
  companyDomain: string;
  companyLogo: string;
  avatar: string;
  email: string;
  phone: string;
  channel: InboxChannelType;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  interested: boolean;
  isMeeting: boolean;
  archived: boolean;
  labels: string[];
  assignedTo: LeadOwnerType;
  dealValue: number;
  dealStage: string;
  sentiment: 'positive' | 'meeting' | 'objection' | 'neutral';
  messages: InboxMessage[];
  accountId?: string;
  accountEmail?: string;
  accountName?: string;
  accountProvider?: string;
  providerThreadId?: string;
  replyCapable?: boolean;
  replyMode?: InboxReplyMode;
}

export interface InboxLabelItem {
  id: string;
  name: string;
  color: string;
}

interface MasterInboxContextType {
  conversations: MasterInboxThread[];
  allFilteredConversations: MasterInboxThread[];
  activeConversationId: string | null;
  activeConversation: MasterInboxThread | null;
  activeFolder: string;
  searchQuery: string;
  filterChannel: string;
  filterAssignee: string;
  filterLabel: string;
  selectedAccountIds: string[];
  labelsList: InboxLabelItem[];
  unreadTotal: number;
  interestedTotal: number;
  meetingsTotal: number;

  setActiveConversationId: (id: string | null) => void;
  setActiveFolder: (folder: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterChannel: (channel: string) => void;
  setFilterAssignee: (assignee: string) => void;
  setFilterLabel: (label: string) => void;
  setSelectedAccountIds: (ids: string[]) => void;
  toggleAccountId: (id: string) => void;
  clearAccountIds: () => void;
  resetFilters: () => void;

  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  toggleInterested: (id: string) => void;
  toggleArchived: (id: string) => void;
  toggleMeeting: (id: string) => void;
  assignConversation: (id: string, assignee: LeadOwnerType) => void;
  addLabelToConversation: (id: string, label: string) => void;
  removeLabelFromConversation: (id: string, label: string) => void;
  deleteConversation: (id: string) => void;

  sendMessage: (
    conversationId: string,
    content: string,
    channel: InboxChannelType,
    attachments?: { name: string; size: string }[]
  ) => boolean;
  createLabel: (name: string, color: string) => void;
  deleteLabel: (name: string) => void;
  seedDemoConversations: () => void;
}

const INITIAL_LABELS: InboxLabelItem[] = [
  { id: 'lbl_1', name: 'High Priority', color: '#ef4444' },
  { id: 'lbl_2', name: 'Enterprise Deal', color: '#3b82f6' },
  { id: 'lbl_3', name: 'Follow-Up Required', color: '#f59e0b' },
  { id: 'lbl_4', name: 'Objection Handled', color: '#0284c7' },
];

const avatar = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=200&q=80`;
const companyLogo = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80';

const INITIAL_CONVERSATIONS: MasterInboxThread[] = [
  {
    id: 'inbox_email_david',
    contactName: 'David Chen',
    contactTitle: 'Head of Demand Generation',
    companyName: 'SaaSFlow Global',
    companyDomain: 'saasflow.co',
    companyLogo,
    avatar: avatar('photo-1507003211169-0a1dd7228f2d'),
    email: 'david@saasflow.co',
    phone: '+1 (212) 555-0182',
    channel: 'email',
    lastMessage: "Sounds interesting. Let's chat Thursday. Send over your calendar link.",
    timestamp: '25m ago',
    unread: true,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['High Priority', 'Follow-Up Required'],
    assignedTo: 'Alex Rivera',
    dealValue: 32000,
    dealStage: 'Lead Qualified / Discovery',
    sentiment: 'positive',
    accountId: 'mbx_2',
    accountEmail: 'sdr.lead1@outbound.cloudscale.ai',
    accountName: 'Alex Rivera',
    accountProvider: 'Google Workspace',
    providerThreadId: 'ethread_david',
    replyCapable: true,
    replyMode: 'message',
    messages: [
      {
        id: 'david_1',
        sender: 'user',
        senderName: 'Alex Rivera',
        senderAvatar: avatar('photo-1507003211169-0a1dd7228f2d'),
        channel: 'email',
        content: 'Hi David, noticed SaaSFlow is evaluating multi-inbox cold email infrastructure. Are you currently experiencing Gmail/Outlook spam folder throttling?',
        timestamp: 'Yesterday, 04:10 PM',
      },
      {
        id: 'david_2',
        sender: 'prospect',
        senderName: 'David Chen',
        senderAvatar: avatar('photo-1507003211169-0a1dd7228f2d'),
        channel: 'email',
        content: "Sounds interesting. We just lost deliverability on 4 secondary domains last week. Let's chat Thursday. Send over your calendar link.",
        timestamp: 'Today, 11:05 AM',
      },
    ],
  },
  {
    id: 'inbox_linkedin_elena',
    contactName: 'Elena Rostova',
    contactTitle: 'Chief Revenue Officer',
    companyName: 'FinTech Stack Systems',
    companyDomain: 'fintechstack.com',
    companyLogo,
    avatar: avatar('photo-1573496359142-b8d87734a5a2'),
    email: 'elena@fintechstack.com',
    phone: '+44 20 7946 0912',
    channel: 'linkedin',
    lastMessage: 'Accepted your LinkedIn invitation. Can you share your SOC2 compliance whitepaper?',
    timestamp: '1h ago',
    unread: false,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['Enterprise Deal'],
    assignedTo: 'Sarah Jenkins',
    dealValue: 72000,
    dealStage: 'Security & Legal Review',
    sentiment: 'positive',
    accountId: 'acc_1',
    accountEmail: 'sarah.jenkins@outbound.cloudscale.ai',
    accountName: 'Sarah Jenkins',
    accountProvider: 'LinkedIn Profile',
    providerThreadId: 'li_thread_elena',
    replyCapable: true,
    replyMode: 'message',
    messages: [
      {
        id: 'elena_li_1',
        sender: 'user',
        senderName: 'Sarah Jenkins',
        senderAvatar: avatar('photo-1534528741775-53994a69daeb'),
        channel: 'linkedin',
        content: "Hi Elena, impressed with FinTech Stack's cross-border payment expansion. Would love to connect and compare enterprise RevOps playbooks.",
        timestamp: 'Aug 22, 09:00 AM',
      },
      {
        id: 'elena_li_2',
        sender: 'prospect',
        senderName: 'Elena Rostova',
        senderAvatar: avatar('photo-1573496359142-b8d87734a5a2'),
        channel: 'linkedin',
        content: 'Accepted your connection request. Can you share your SOC2 Type II compliance whitepaper and European GDPR data sovereignty specs?',
        timestamp: 'Today, 10:30 AM',
      },
    ],
  },
  {
    id: 'inbox_upwork_elena',
    contactName: 'Elena Rostova',
    contactTitle: 'Hiring Manager / Client',
    companyName: 'FinTech Stack Systems',
    companyDomain: 'upwork.com',
    companyLogo,
    avatar: avatar('photo-1573496359142-b8d87734a5a2'),
    email: '',
    phone: '',
    channel: 'upwork',
    lastMessage: 'Your proposal caught our attention. Can we schedule an intro call tomorrow?',
    timestamp: '15m ago',
    unread: true,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['High Priority'],
    assignedTo: 'Alex Rivera',
    dealValue: 15000,
    dealStage: 'Proposal / Interview',
    sentiment: 'positive',
    accountId: 'acc_1',
    accountName: 'Primary Upwork Profile',
    accountProvider: 'Upwork',
    providerThreadId: 'msg-1',
    replyCapable: true,
    replyMode: 'message',
    messages: [
      {
        id: 'upwork_1',
        sender: 'user',
        senderName: 'You',
        senderAvatar: '',
        channel: 'upwork',
        content: 'I reviewed your financial core architecture requirements and shared the relevant low-latency implementation approach in my proposal.',
        timestamp: 'Yesterday, 4:20 PM',
      },
      {
        id: 'upwork_2',
        sender: 'prospect',
        senderName: 'Elena Rostova',
        senderAvatar: avatar('photo-1573496359142-b8d87734a5a2'),
        channel: 'upwork',
        content: 'Your proposal caught our attention, particularly the sub-second latency optimizations. Can we schedule an intro call tomorrow?',
        timestamp: 'Today, 10:15 AM',
      },
    ],
  },
  {
    id: 'inbox_voice_sarah',
    contactName: 'Sarah Jenkins',
    contactTitle: 'VP of Growth & Revenue',
    companyName: 'CloudScale AI',
    companyDomain: 'cloudscale.ai',
    companyLogo,
    avatar: avatar('photo-1534528741775-53994a69daeb'),
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    channel: 'voice',
    lastMessage: 'Demo confirmed for Thursday 2:00 PM EST. Calendar invite accepted.',
    timestamp: '10m ago',
    unread: true,
    interested: true,
    isMeeting: true,
    archived: false,
    labels: ['High Priority', 'Enterprise Deal'],
    assignedTo: 'Sarah Jenkins',
    dealValue: 48000,
    dealStage: 'Demo Scheduled / Briefing',
    sentiment: 'meeting',
    accountId: 'phone_1',
    accountEmail: '+1 (415) 892-4910',
    accountName: 'Voice SDR Telephony Trunk',
    accountProvider: 'Voice',
    providerThreadId: 'hcall_1',
    replyCapable: true,
    replyMode: 'voice-action',
    messages: [
      {
        id: 'voice_1',
        sender: 'voice_sdr',
        senderName: 'Voice SDR',
        senderAvatar: '',
        channel: 'voice',
        content: 'Call completed. Prospect qualified budget and accepted an executive architecture briefing.',
        timestamp: 'Today, 11:20 AM',
      },
      {
        id: 'voice_2',
        sender: 'system',
        senderName: 'System',
        senderAvatar: '',
        channel: 'voice',
        content: 'Meeting outcome synced to the conversation timeline.',
        timestamp: 'Today, 11:24 AM',
      },
    ],
  },
  {
    id: 'inbox_email_marcus',
    contactName: 'Marcus Vance',
    contactTitle: 'Head of Revenue Operations',
    companyName: 'Apex Data Labs',
    companyDomain: 'apexdata.io',
    companyLogo,
    avatar: avatar('photo-1500648767791-00dcc994a43e'),
    email: 'marcus@apexdata.io',
    phone: '+1 (212) 749-1120',
    channel: 'email',
    lastMessage: 'Commercial agreement looks solid. Forwarding to our CFO for signature.',
    timestamp: '2h ago',
    unread: false,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['Enterprise Deal'],
    assignedTo: 'Marcus Vance',
    dealValue: 36000,
    dealStage: 'Proposal / Contract Sent',
    sentiment: 'positive',
    accountId: 'mbx_3',
    accountEmail: 'growth@send.cloudscale.ai',
    accountName: 'Marcus Vance',
    accountProvider: 'Microsoft 365',
    replyCapable: true,
    replyMode: 'message',
    messages: [
      {
        id: 'marcus_1',
        sender: 'prospect',
        senderName: 'Marcus Vance',
        senderAvatar: avatar('photo-1500648767791-00dcc994a43e'),
        channel: 'email',
        content: 'Commercial agreement looks solid. Forwarding to our CFO for final electronic signature this afternoon.',
        timestamp: 'Today, 09:30 AM',
      },
    ],
  },
  {
    id: 'inbox_linkedin_tariq',
    contactName: 'Tariq Mansoor',
    contactTitle: 'Managing Partner',
    companyName: 'Horizon Ventures',
    companyDomain: 'horizonvc.com',
    companyLogo,
    avatar: avatar('photo-1472099645785-5658abf4ff4e'),
    email: 'tariq@horizonvc.com',
    phone: '+1 (415) 998-1144',
    channel: 'linkedin',
    lastMessage: 'Enjoyed your latest post on AI SDR agents. Would love to connect over coffee next week.',
    timestamp: '2h ago',
    unread: false,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['High Priority'],
    assignedTo: 'Alex Rivera',
    dealValue: 65000,
    dealStage: 'Lead Qualified / Discovery',
    sentiment: 'positive',
    accountId: 'acc_1',
    accountName: 'Primary LinkedIn Profile',
    accountProvider: 'LinkedIn Profile',
    replyCapable: true,
    replyMode: 'message',
    messages: [
      {
        id: 'tariq_1',
        sender: 'prospect',
        senderName: 'Tariq Mansoor',
        senderAvatar: avatar('photo-1472099645785-5658abf4ff4e'),
        channel: 'linkedin',
        content: "Really enjoyed your breakdown on autonomous AI agents replacing SDR grunt work. Let's sync up next week.",
        timestamp: 'Today, 10:10 AM',
      },
    ],
  },
];

const normalizeThread = (thread: MasterInboxThread): MasterInboxThread => ({
  ...thread,
  replyCapable: thread.replyCapable ?? Boolean(thread.accountId),
  replyMode: thread.replyMode ?? (thread.channel === 'voice' ? 'voice-action' : 'message'),
});

const MasterInboxContext = createContext<MasterInboxContextType | undefined>(undefined);

export const MasterInboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [conversations, setConversations] = useState<MasterInboxThread[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_master_inbox_threads');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeThread);
        }
      }
      return INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [labelsList, setLabelsList] = useState<InboxLabelItem[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_inbox_labels');
      return stored ? JSON.parse(stored) : INITIAL_LABELS;
    } catch {
      return INITIAL_LABELS;
    }
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('outtricks_master_inbox_threads');
      const parsed = stored ? JSON.parse(stored) : null;
      return Array.isArray(parsed) && parsed[0]?.id ? parsed[0].id : INITIAL_CONVERSATIONS[0]?.id || null;
    } catch {
      return INITIAL_CONVERSATIONS[0]?.id || null;
    }
  });

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const accParam = sp.get('accounts');
      if (accParam) return accParam.split(',').filter(Boolean);
      const stored = localStorage.getItem('outtricks_master_inbox_accounts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('outtricks_master_inbox_threads', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('outtricks_inbox_labels', JSON.stringify(labelsList));
  }, [labelsList]);

  useEffect(() => {
    localStorage.setItem('outtricks_master_inbox_accounts', JSON.stringify(selectedAccountIds));
  }, [selectedAccountIds]);

  const toggleAccountId = useCallback((id: string) => {
    setSelectedAccountIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const clearAccountIds = useCallback(() => setSelectedAccountIds([]), []);

  const unreadTotal = useMemo(() => conversations.filter((c) => c.unread && !c.archived).length, [conversations]);
  const interestedTotal = useMemo(() => conversations.filter((c) => c.interested && !c.archived).length, [conversations]);
  const meetingsTotal = useMemo(() => conversations.filter((c) => c.isMeeting && !c.archived).length, [conversations]);

  const allFilteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (activeFolder === 'unread' && (!c.unread || c.archived)) return false;
      if (activeFolder === 'interested' && (!c.interested || c.archived)) return false;
      if (activeFolder === 'meetings' && (!c.isMeeting || c.archived)) return false;
      if (activeFolder === 'archived' && !c.archived) return false;
      if (['email', 'linkedin', 'upwork', 'voice'].includes(activeFolder) && (c.channel !== activeFolder || c.archived)) return false;
      if (activeFolder === 'labels' && (c.labels.length === 0 || c.archived)) return false;
      if (activeFolder.startsWith('label:') && (!c.labels.includes(activeFolder.replace('label:', '')) || c.archived)) return false;
      if (activeFolder === 'all' && c.archived) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = [c.contactName, c.companyName, c.email, c.lastMessage, c.accountName || '', c.accountProvider || '']
          .some((value) => value.toLowerCase().includes(q)) || c.messages.some((m) => m.content.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (filterChannel !== 'all' && c.channel !== filterChannel) return false;
      if (filterAssignee !== 'all' && c.assignedTo !== filterAssignee) return false;
      if (filterLabel !== 'all' && !c.labels.includes(filterLabel)) return false;
      if (selectedAccountIds.length > 0 && (!c.accountId || !selectedAccountIds.includes(c.accountId))) return false;

      return true;
    });
  }, [conversations, activeFolder, searchQuery, filterChannel, filterAssignee, filterLabel, selectedAccountIds]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || allFilteredConversations[0] || null;
  }, [conversations, activeConversationId, allFilteredConversations]);

  const resetFilters = useCallback(() => {
    setActiveFolder('all');
    setSearchQuery('');
    setFilterChannel('all');
    setFilterAssignee('all');
    setFilterLabel('all');
    setSelectedAccountIds([]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unread: false } : c));
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unread: true } : c));
    info('Conversation marked as unread.', 'Unread');
  }, [info]);

  const toggleInterested = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? {
      ...c,
      interested: !c.interested,
      sentiment: !c.interested ? 'positive' : 'neutral',
    } : c));
  }, []);

  const toggleArchived = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, archived: !c.archived } : c));
    info('Conversation archive state updated.', 'Updated');
  }, [info]);

  const toggleMeeting = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? {
      ...c,
      isMeeting: !c.isMeeting,
      sentiment: !c.isMeeting ? 'meeting' : 'positive',
    } : c));
    success('Meeting status updated.', 'Meeting');
  }, [success]);

  const assignConversation = useCallback((id: string, assignee: LeadOwnerType) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, assignedTo: assignee } : c));
    success(`Assigned thread to ${assignee}.`, 'Owner Assigned');
  }, [success]);

  const addLabelToConversation = useCallback((id: string, label: string) => {
    setConversations((prev) => prev.map((c) => c.id === id && !c.labels.includes(label) ? { ...c, labels: [...c.labels, label] } : c));
  }, []);

  const removeLabelFromConversation = useCallback((id: string, label: string) => {
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, labels: c.labels.filter((l) => l !== label) } : c));
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) setActiveConversationId(null);
    info('Conversation deleted.', 'Deleted');
  }, [activeConversationId, info]);

  const sendMessage = useCallback((
    conversationId: string,
    content: string,
    channel: InboxChannelType,
    attachments?: { name: string; size: string }[]
  ): boolean => {
    const thread = conversations.find((c) => c.id === conversationId);
    if (!thread) return false;

    if (!thread.accountId || thread.replyCapable === false || thread.replyMode === 'read-only') {
      info('This conversation has no connected reply account. Connect the channel account before replying.', 'Connection Required');
      return false;
    }

    if (channel === 'voice' || thread.replyMode === 'voice-action') {
      info('Voice conversations use the call action instead of a text reply. Open Voice AI to call this contact.', 'Voice Action Required');
      return false;
    }

    if (channel !== thread.channel) {
      info(`Reply from the connected ${thread.channel.toUpperCase()} identity for this thread. Cross-channel outreach should start from the contact profile.`, 'Channel Mismatch');
      return false;
    }

    const newMsg: InboxMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      senderName: thread.accountName || 'You',
      senderAvatar: '',
      channel,
      content,
      timestamp: 'Just now',
      attachments,
    };

    setConversations((prev) => prev.map((c) => c.id === conversationId ? {
      ...c,
      unread: false,
      lastMessage: content,
      timestamp: 'Just now',
      messages: [...c.messages, newMsg],
    } : c));

    success(`Reply added to the connected ${thread.accountProvider || channel} conversation.`, 'Reply Sent');
    return true;
  }, [conversations, info, success]);

  const createLabel = useCallback((name: string, color: string) => {
    const trimmed = name.trim();
    if (!trimmed || labelsList.some((l) => l.name.toLowerCase() === trimmed.toLowerCase())) return;
    setLabelsList((prev) => [...prev, { id: `lbl_${Date.now()}`, name: trimmed, color }]);
    success(`Created custom label "${trimmed}".`, 'Label Created');
  }, [labelsList, success]);

  const deleteLabel = useCallback((name: string) => {
    setLabelsList((prev) => prev.filter((l) => l.name !== name));
    setConversations((prev) => prev.map((c) => ({ ...c, labels: c.labels.filter((l) => l !== name) })));
    info(`Label "${name}" removed.`, 'Removed');
  }, [info]);

  const seedDemoConversations = useCallback(() => {
    setConversations(INITIAL_CONVERSATIONS);
    setActiveConversationId(INITIAL_CONVERSATIONS[0]?.id || null);
    success('Reset unified Email, LinkedIn, Upwork and Voice demo conversations.', 'Demo Seeded');
  }, [success]);

  return (
    <MasterInboxContext.Provider value={{
      conversations,
      allFilteredConversations,
      activeConversationId,
      activeConversation,
      activeFolder,
      searchQuery,
      filterChannel,
      filterAssignee,
      filterLabel,
      selectedAccountIds,
      labelsList,
      unreadTotal,
      interestedTotal,
      meetingsTotal,
      setActiveConversationId,
      setActiveFolder,
      setSearchQuery,
      setFilterChannel,
      setFilterAssignee,
      setFilterLabel,
      setSelectedAccountIds,
      toggleAccountId,
      clearAccountIds,
      resetFilters,
      markAsRead,
      markAsUnread,
      toggleInterested,
      toggleArchived,
      toggleMeeting,
      assignConversation,
      addLabelToConversation,
      removeLabelFromConversation,
      deleteConversation,
      sendMessage,
      createLabel,
      deleteLabel,
      seedDemoConversations,
    }}>
      {children}
    </MasterInboxContext.Provider>
  );
};

export const useMasterInbox = () => {
  const context = useContext(MasterInboxContext);
  if (!context) throw new Error('useMasterInbox must be used within a MasterInboxProvider');
  return context;
};
