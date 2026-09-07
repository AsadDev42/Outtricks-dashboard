import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { LeadOwnerType } from './LeadsManagementContext';

export type InboxChannelType = 'email' | 'linkedin' | 'voice';

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
  labelsList: InboxLabelItem[];
  unreadTotal: number;
  interestedTotal: number;
  meetingsTotal: number;

  // Setters
  setActiveConversationId: (id: string | null) => void;
  setActiveFolder: (folder: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterChannel: (channel: string) => void;
  setFilterAssignee: (assignee: string) => void;
  setFilterLabel: (label: string) => void;
  resetFilters: () => void;

  // Conversation Actions
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  toggleInterested: (id: string) => void;
  toggleArchived: (id: string) => void;
  toggleMeeting: (id: string) => void;
  assignConversation: (id: string, assignee: LeadOwnerType) => void;
  addLabelToConversation: (id: string, label: string) => void;
  removeLabelFromConversation: (id: string, label: string) => void;
  deleteConversation: (id: string) => void;

  // Messaging Actions
  sendMessage: (conversationId: string, content: string, channel: InboxChannelType, attachments?: { name: string; size: string }[]) => void;
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

const INITIAL_CONVERSATIONS: MasterInboxThread[] = [
  {
    id: 'inbox_1',
    contactName: 'Sarah Jenkins',
    contactTitle: 'VP of Growth & Revenue',
    companyName: 'CloudScale AI',
    companyDomain: 'cloudscale.ai',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
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
    messages: [
      {
        id: 'msg_1_1',
        sender: 'user',
        senderName: 'You',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Hi Sarah, saw that CloudScale is actively scaling your SDR and RevOps team. Most growth leaders we speak with struggle with 30%+ bounce rates on outdated B2B databases.\n\nWe built Outtricks to deliver 15-provider cascading verification with 99.4% deliverability on direct work emails and verified mobile lines.\n\nOpen to a brief look this Thursday?',
        timestamp: 'Aug 24, 10:30 AM',
      },
      {
        id: 'msg_1_2',
        sender: 'system',
        senderName: 'System Trigger',
        senderAvatar: '',
        channel: 'email',
        content: 'Behavioral Trigger: Recipient opened email twice via rotating Google Workspace mailbox #3.',
        timestamp: 'Aug 25, 02:15 PM',
        details: 'Deliverability Score: 100% • Read duration: 42s',
      },
      {
        id: 'msg_1_3',
        sender: 'voice_sdr',
        senderName: 'Autonomous Voice SDR',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        channel: 'voice',
        content: 'Sub-400ms WebRTC Call placed to direct line (+1 415-892-4910). Duration: 02m 44s.\n\nProspect confirmed hiring 6 SDRs, qualified $45k ARR budget, and accepted executive architecture briefing.',
        timestamp: 'Today, 11:20 AM',
      },
      {
        id: 'msg_1_4',
        sender: 'prospect',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Demo confirmed for Thursday 2:00 PM EST. Looking forward to the walkthrough with your AE team.',
        timestamp: 'Today, 11:24 AM',
      },
    ],
  },
  {
    id: 'inbox_2',
    contactName: 'David Chen',
    contactTitle: 'Head of Demand Generation',
    companyName: 'SaaSFlow Global',
    companyDomain: 'saasflow.co',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    email: 'david@saasflow.co',
    phone: '+1 (212) 555-0182',
    channel: 'email',
    lastMessage: 'Sounds interesting. Let\'s chat Thursday. Send over your calendar link.',
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
    messages: [
      {
        id: 'msg_2_1',
        sender: 'user',
        senderName: 'Alex Rivera',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Hi David, noticed SaaSFlow is evaluating multi-inbox cold email infrastructure. Are you currently experiencing Gmail/Outlook spam folder throttling?',
        timestamp: 'Yesterday, 04:10 PM',
      },
      {
        id: 'msg_2_2',
        sender: 'prospect',
        senderName: 'David Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Sounds interesting. We just lost deliverability on 4 secondary domains last week. Let\'s chat Thursday. Send over your calendar link.',
        timestamp: 'Today, 11:05 AM',
      },
    ],
  },
  {
    id: 'inbox_3',
    contactName: 'Elena Rostova',
    contactTitle: 'Chief Revenue Officer',
    companyName: 'FinTech Stack Systems',
    companyDomain: 'fintechstack.com',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
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
    messages: [
      {
        id: 'msg_3_1',
        sender: 'user',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        channel: 'linkedin',
        content: 'Hi Elena, impressed with FinTech Stack\'s cross-border payment expansion across the UK and Europe. Would love to connect and share notes on enterprise RevOps tooling.',
        timestamp: 'Aug 22, 09:00 AM',
      },
      {
        id: 'msg_3_2',
        sender: 'prospect',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        channel: 'linkedin',
        content: 'Accepted your connection request Sarah. Can you share your SOC2 Type II compliance whitepaper and European GDPR data sovereignty specs?',
        timestamp: 'Today, 10:30 AM',
      },
    ],
  },
  {
    id: 'inbox_4',
    contactName: 'Marcus Vance',
    contactTitle: 'Head of Revenue Operations',
    companyName: 'Apex Data Labs',
    companyDomain: 'apexdata.io',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=120&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
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
    messages: [
      {
        id: 'msg_4_1',
        sender: 'user',
        senderName: 'Marcus Vance',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Hi Marcus, attached is the revised commercial MSA incorporating the 5 additional SDR seats and dedicated IP pool.',
        timestamp: 'Yesterday, 03:00 PM',
      },
      {
        id: 'msg_4_2',
        sender: 'prospect',
        senderName: 'Marcus Vance',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        channel: 'email',
        content: 'Commercial agreement looks solid. Forwarding to our CFO for final electronic signature this afternoon.',
        timestamp: 'Today, 09:30 AM',
      },
    ],
  },
  {
    id: 'inbox_5',
    contactName: 'Amira Patel',
    contactTitle: 'Founder & CEO',
    companyName: 'ScaleWave Media',
    companyDomain: 'scalewave.agency',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    email: 'amira@scalewave.agency',
    phone: '+1 (416) 555-0199',
    channel: 'linkedin',
    lastMessage: 'How does your multi-inbox pricing compare to Instantly and Smartlead?',
    timestamp: '4h ago',
    unread: false,
    interested: true,
    isMeeting: false,
    archived: false,
    labels: ['Objection Handled'],
    assignedTo: 'Alex Rivera',
    dealValue: 18000,
    dealStage: 'Lead Qualified / Discovery',
    sentiment: 'objection',
    messages: [
      {
        id: 'msg_5_1',
        sender: 'prospect',
        senderName: 'Amira Patel',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        channel: 'linkedin',
        content: 'How does your multi-inbox pricing compare to Instantly and Smartlead for an agency with 40 client mailboxes?',
        timestamp: 'Today, 08:15 AM',
      },
    ],
  }
];

const MasterInboxContext = createContext<MasterInboxContextType | undefined>(undefined);

export const MasterInboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [conversations, setConversations] = useState<MasterInboxThread[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_master_inbox_threads');
      return stored ? JSON.parse(stored) : INITIAL_CONVERSATIONS;
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
    return INITIAL_CONVERSATIONS[0]?.id || null;
  });

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterLabel, setFilterLabel] = useState<string>('all');

  // Persist
  useEffect(() => {
    localStorage.setItem('outtricks_master_inbox_threads', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('outtricks_inbox_labels', JSON.stringify(labelsList));
  }, [labelsList]);

  // Counts
  const unreadTotal = useMemo(() => conversations.filter((c) => c.unread && !c.archived).length, [conversations]);
  const interestedTotal = useMemo(() => conversations.filter((c) => c.interested && !c.archived).length, [conversations]);
  const meetingsTotal = useMemo(() => conversations.filter((c) => c.isMeeting && !c.archived).length, [conversations]);

  // Filtering Engine
  const allFilteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // 1. Folder Navigation
      if (activeFolder === 'unread') {
        if (!c.unread || c.archived) return false;
      } else if (activeFolder === 'interested') {
        if (!c.interested || c.archived) return false;
      } else if (activeFolder === 'meetings') {
        if (!c.isMeeting || c.archived) return false;
      } else if (activeFolder === 'archived') {
        if (!c.archived) return false;
      } else if (activeFolder === 'email') {
        if (c.channel !== 'email' || c.archived) return false;
      } else if (activeFolder === 'linkedin') {
        if (c.channel !== 'linkedin' || c.archived) return false;
      } else if (activeFolder === 'voice') {
        if (c.channel !== 'voice' || c.archived) return false;
      } else if (activeFolder === 'labels') {
        if (c.labels.length === 0 || c.archived) return false;
      } else if (activeFolder.startsWith('label:')) {
        const lblName = activeFolder.replace('label:', '');
        if (!c.labels.includes(lblName) || c.archived) return false;
      } else {
        // 'all' messages
        if (c.archived) return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesContact = c.contactName.toLowerCase().includes(q);
        const matchesCompany = c.companyName.toLowerCase().includes(q);
        const matchesEmail = c.email.toLowerCase().includes(q);
        const matchesLast = c.lastMessage.toLowerCase().includes(q);
        const matchesAnyMsg = c.messages.some((m) => m.content.toLowerCase().includes(q));

        if (!matchesContact && !matchesCompany && !matchesEmail && !matchesLast && !matchesAnyMsg) {
          return false;
        }
      }

      // 3. Dropdown Filters
      if (filterChannel !== 'all' && c.channel !== filterChannel) return false;
      if (filterAssignee !== 'all' && c.assignedTo !== filterAssignee) return false;
      if (filterLabel !== 'all' && !c.labels.includes(filterLabel)) return false;

      return true;
    });
  }, [conversations, activeFolder, searchQuery, filterChannel, filterAssignee, filterLabel]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || allFilteredConversations[0] || null;
  }, [conversations, activeConversationId, allFilteredConversations]);

  const resetFilters = useCallback(() => {
    setActiveFolder('all');
    setSearchQuery('');
    setFilterChannel('all');
    setFilterAssignee('all');
    setFilterLabel('all');
  }, []);

  // Actions
  const markAsRead = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: true } : c))
    );
    info('Conversation marked as unread.', 'Unread');
  }, [info]);

  const toggleInterested = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              interested: !c.interested,
              sentiment: !c.interested ? 'positive' : 'neutral',
            }
          : c
      )
    );
  }, []);

  const toggleArchived = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c))
    );
    info('Conversation archived / moved.', 'Updated');
  }, [info]);

  const toggleMeeting = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isMeeting: !c.isMeeting,
              sentiment: !c.isMeeting ? 'meeting' : 'positive',
            }
          : c
      )
    );
    success('Updated meeting demo status.', 'Meeting Scheduled');
  }, [success]);

  const assignConversation = useCallback((id: string, assignee: LeadOwnerType) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, assignedTo: assignee } : c))
    );
    success(`Assigned thread to ${assignee}.`, 'Owner Assigned');
  }, [success]);

  const addLabelToConversation = useCallback((id: string, label: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id && !c.labels.includes(label)
          ? { ...c, labels: [...c.labels, label] }
          : c
      )
    );
  }, []);

  const removeLabelFromConversation = useCallback((id: string, label: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, labels: c.labels.filter((l) => l !== label) } : c
      )
    );
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
    info('Conversation deleted.', 'Deleted');
  }, [activeConversationId, info]);

  const sendMessage = useCallback((
    conversationId: string,
    content: string,
    channel: InboxChannelType,
    attachments?: { name: string; size: string }[]
  ) => {
    const newMsg: InboxMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      channel,
      content,
      timestamp: 'Just now',
      attachments,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              unread: false,
              lastMessage: content,
              timestamp: 'Just now',
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
    success(`Message dispatched via ${channel.toUpperCase()} channel.`, 'Reply Sent');
  }, [success]);

  const createLabel = useCallback((name: string, color: string) => {
    const newLbl: InboxLabelItem = {
      id: `lbl_${Date.now()}`,
      name,
      color,
    };
    setLabelsList((prev) => [...prev, newLbl]);
    success(`Created custom label "${name}".`, 'Label Created');
  }, [success]);

  const deleteLabel = useCallback((name: string) => {
    setLabelsList((prev) => prev.filter((l) => l.name !== name));
    info(`Label "${name}" removed.`, 'Removed');
  }, [info]);

  const seedDemoConversations = useCallback(() => {
    setConversations(INITIAL_CONVERSATIONS);
    success('Reset and seeded live multi-channel prospect conversations.', 'Demo Seeded');
  }, [success]);

  return (
    <MasterInboxContext.Provider
      value={{
        conversations,
        allFilteredConversations,
        activeConversationId,
        activeConversation,
        activeFolder,
        searchQuery,
        filterChannel,
        filterAssignee,
        filterLabel,
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
      }}
    >
      {children}
    </MasterInboxContext.Provider>
  );
};

export const useMasterInbox = () => {
  const context = useContext(MasterInboxContext);
  if (!context) {
    throw new Error('useMasterInbox must be used within a MasterInboxProvider');
  }
  return context;
};
