import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { useNavigate } from 'react-router-dom';
import { cleanAiSlop } from '../utils/noAiSlop';

export type CoPilotSubTab = 'chat' | 'actions' | 'prompts' | 'kb';

export interface CoPilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  toolCall?: {
    name: string;
    status: 'executing' | 'completed' | 'failed';
    summary: string;
    details?: string;
    actionRoute?: string;
    actionLabel?: string;
  };
  actionConfirmation?: {
    actionId: string;
    title: string;
    description: string;
    status: 'pending' | 'approved' | 'cancelled';
  };
}

export interface CoPilotConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  isPinned?: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Cold Outbound' | 'Speed-to-Lead' | 'Objection Handling' | 'Upwork Proposal' | 'CRM Intelligence';
  description: string;
  promptText: string;
  usageCount: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'ICP Definition' | 'Product Value' | 'Competitor Battlecard' | 'Email Guidelines';
  content: string;
  lastUpdated: string;
}

export interface ExecutableAction {
  id: string;
  name: string;
  module: string;
  description: string;
  sampleInput: string;
  executionCount: number;
}

interface CoPilotContextType {
  activeTab: CoPilotSubTab;
  setActiveTab: (tab: CoPilotSubTab) => void;
  
  // Conversations
  conversations: CoPilotConversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  createNewConversation: () => void;
  deleteConversation: (id: string) => void;
  
  // Chat
  messages: CoPilotMessage[];
  sendMessage: (text: string) => void;
  isThinking: boolean;
  approveAction: (actionId: string) => void;
  cancelAction: (actionId: string) => void;
  
  // Prompts & KB
  prompts: PromptTemplate[];
  usePromptInChat: (promptText: string) => void;
  createCustomPrompt: (title: string, category: PromptTemplate['category'], text: string) => void;
  knowledgeDocs: KnowledgeDocument[];
  
  // Actions
  executableActions: ExecutableAction[];
  runAction: (actionId: string) => void;
}

const CoPilotContext = createContext<CoPilotContextType | undefined>(undefined);

export const CoPilotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<CoPilotSubTab>('chat');
  const [activeConversationId, setActiveConversationId] = useState('conv-1');
  const [isThinking, setIsThinking] = useState(false);
  const { success, info } = useToast();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<CoPilotConversation[]>([
    {
      id: 'conv-1',
      title: 'US FinTech VP Engineering Outbound Sprint',
      lastMessage: 'Verified 1,450 profiles with 99.4% deliverability score.',
      timestamp: '10:45 AM',
      messageCount: 6,
      isPinned: true
    },
    {
      id: 'conv-2',
      title: 'Q3 Deals CRM Pipeline & ARR Forecast',
      lastMessage: 'Predicted $295,000 ARR closed-won in Q3 with 82% confidence.',
      timestamp: 'Yesterday',
      messageCount: 4
    },
    {
      id: 'conv-3',
      title: 'Mailbox Deliverability & Warmup Audit',
      lastMessage: 'All 24 mailboxes passed SPF/DKIM/DMARC alignment test.',
      timestamp: 'Aug 24',
      messageCount: 8
    }
  ]);

  const [messages, setMessages] = useState<CoPilotMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello Sarah! I'm TRIXIE AI, your Outtricks Revenue Assistant. I run lead searches across 480M+ profiles, draft email spintax, inspect CRM deals, and coordinate outbound workflows. What pipeline goal are we working on today?",
      timestamp: '10:40 AM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: "Find 1,450 VP of Engineering decision-makers at Series B FinTech companies in the US and check their verified work emails.",
      timestamp: '10:42 AM'
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: "I ran an 8-dimension query across the B2B Lead Database. Here are the search results matching your criteria:",
      timestamp: '10:43 AM',
      toolCall: {
        name: 'lead_finder.search_leads',
        status: 'completed',
        summary: '1,450 profiles discovered matching target criteria.',
        details: 'Filters: Title = "VP Engineering", Industry = "FinTech", Stage = "Series B", Location = "United States".',
        actionRoute: '/lead-finder',
        actionLabel: 'View 1,450 Leads in Lead Finder'
      },
      actionConfirmation: {
        actionId: 'act-1',
        title: 'Add 1,450 Leads to Multi-Inbox Cold Email Sequence?',
        description: 'Will rotate across 24 Google & Microsoft mailboxes with humanized sending delay and spintax variations.',
        status: 'pending'
      }
    }
  ]);

  const [prompts, setPrompts] = useState<PromptTemplate[]>([
    {
      id: 'p-1',
      title: 'High-Converting Cold Email Pitch',
      category: 'Cold Outbound',
      description: '3-sentence email focused on one clear pain point with dynamic spintax and a soft CTA.',
      promptText: 'Draft a 3-sentence cold email for {{prospect.title}} at {{company.name}}. Focus on pipeline attribution and sub-400ms Voice SDR calling with a low-friction question at the end.',
      usageCount: 142
    },
    {
      id: 'p-2',
      title: 'Sub-60s Inbound Demo Follow-Up',
      category: 'Speed-to-Lead',
      description: 'Quick follow-up for demo form submissions with a calendar link.',
      promptText: 'Draft a personalized follow-up for {{lead.first_name}} who just requested a live demo on our website.',
      usageCount: 98
    },
    {
      id: 'p-3',
      title: 'Enterprise Upwork AI Proposal',
      category: 'Upwork Proposal',
      description: 'Concrete proposal citing relevant client metrics and suggesting a 15-minute intro.',
      promptText: 'Review this Upwork job posting and write a tailored proposal highlighting our $48k ARR enterprise case study and concrete next steps.',
      usageCount: 65
    }
  ]);

  const [knowledgeDocs] = useState<KnowledgeDocument[]>([
    {
      id: 'kb-1',
      title: 'Outtricks Ideal Customer Profile (ICP)',
      category: 'ICP Definition',
      content: 'B2B SaaS companies ($1M-$50M ARR), Head of Sales, VP Growth, VP Revenue Operations, with 2+ SDRs seeking single-tenant outbound.',
      lastUpdated: 'Aug 20, 2026'
    },
    {
      id: 'kb-2',
      title: 'Core Value Pillars & Differentiators',
      category: 'Product Value',
      content: '1. Single PostgreSQL database with 0ms sync lag. 2. Sub-400ms WebRTC Voice AI SDR. 3. 24 flat unlimited multi-inbox rotation.',
      lastUpdated: 'Aug 22, 2026'
    },
    {
      id: 'kb-3',
      title: 'Competitor Battlecard: Apollo vs Outtricks',
      category: 'Competitor Battlecard',
      content: 'Apollo suffers from stale scraped databases and lack of native WebRTC Voice SDR. Outtricks provides single-tenant PostgreSQL database with native Voice AI SDR.',
      lastUpdated: 'Aug 24, 2026'
    }
  ]);

  const [executableActions] = useState<ExecutableAction[]>([
    { id: 'ea-1', name: 'Search B2B Leads', module: 'Lead Finder', description: 'Run 8D discovery matrix with real-time multiDimensional criteria.', sampleInput: 'Search Series B FinTech CEOs in California', executionCount: 384 },
    { id: 'ea-2', name: 'Draft Multi-Inbox Sequence', module: 'Cold Email', description: 'Write personalized email copy with spintax tokens.', sampleInput: 'Draft 3-step sequence for Head of Growth', executionCount: 290 },
    { id: 'ea-3', name: 'Audit Mailbox Health', module: 'Deliverability', description: 'Check SPF, DKIM, DMARC, and sender warmup status.', sampleInput: 'Inspect 24 mailboxes pool', executionCount: 142 },
    { id: 'ea-4', name: 'Forecast Pipeline ARR', module: 'Deals CRM', description: 'Run statistical win-rate prediction on CRM Kanban stages.', sampleInput: 'Analyze Q3 closed-won revenue', executionCount: 98 },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: CoPilotMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      let aiMsg: CoPilotMessage;
      const lower = text.toLowerCase();

      if (lower.includes('lead') || lower.includes('search') || lower.includes('find')) {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: cleanAiSlop("I checked the Lead Finder database: found 920 verified prospects matching your target criteria. Deliverability score is verified at 99.4%."),
          timestamp: 'Just now',
          toolCall: {
            name: 'lead_finder.discover',
            status: 'completed',
            summary: '920 verified decision-maker records retrieved.',
            actionRoute: '/lead-finder',
            actionLabel: 'View in Lead Finder'
          }
        };
      } else if (lower.includes('forecast') || lower.includes('crm') || lower.includes('revenue')) {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: cleanAiSlop("Based on historical conversion velocity and stage movement across 38 active deals, Q3 projected closed-won ARR is $295,000 (82% confidence)."),
          timestamp: 'Just now',
          toolCall: {
            name: 'crm.forecast_pipeline',
            status: 'completed',
            summary: '$485k total pipeline analyzed • 18 days average cycle time.',
            actionRoute: '/crm',
            actionLabel: 'Inspect Deals CRM'
          }
        };
      } else if (lower.includes('email') || lower.includes('spintax') || lower.includes('draft')) {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: cleanAiSlop("Here is a 3-step sequence drafted with spintax variations:\n\nStep 1: \"Hi {{first_name}}, noticed {{company_name}} is scaling outbound. Are you currently attributing closed revenue back to specific inboxes and Voice AI touches?\"\n\nStep 2: \"Most FinTech leaders we work with achieve 28.4% conversion velocity with our single-tenant database.\""),
          timestamp: 'Just now',
          toolCall: {
            name: 'email_studio.generate_spintax',
            status: 'completed',
            summary: '3-step sequence generated with 100% uniqueness score.',
            actionRoute: '/cold-email',
            actionLabel: 'Open in Cold Email Studio'
          }
        };
      } else {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: cleanAiSlop(`I reviewed your instruction. I'm connected directly to your PostgreSQL database with full read/write access across Leads, CRM, Mailboxes, and Workflows. Would you like me to execute this action?`),
          timestamp: 'Just now',
          toolCall: {
            name: 'agent_runner.coordinate',
            status: 'completed',
            summary: 'Action context validated against workspace policies.',
            actionRoute: '/flow-builder',
            actionLabel: 'View Workflow Canvas'
          }
        };
      }

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 600);
  };

  const createNewConversation = () => {
    const newConv: CoPilotConversation = {
      id: `conv-${Date.now()}`,
      title: 'New Revenue Intelligence Session',
      lastMessage: 'Ready to assist...',
      timestamp: 'Just now',
      messageCount: 1
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: "Started a fresh conversation session. What outbound or revenue task would you like to tackle?",
        timestamp: 'Just now'
      }
    ]);
    setActiveTab('chat');
    success('Started fresh TRIXIE AI conversation.', 'New Session');
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    info('Conversation session archived.', 'Session Removed');
  };

  const approveAction = (actionId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.actionConfirmation && m.actionConfirmation.actionId === actionId) {
        return {
          ...m,
          actionConfirmation: {
            ...m.actionConfirmation,
            status: 'approved'
          }
        };
      }
      return m;
    }));
    success('Action approved! Sequence queued across 24 mailboxes.', 'Action Executed');
  };

  const cancelAction = (actionId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.actionConfirmation && m.actionConfirmation.actionId === actionId) {
        return {
          ...m,
          actionConfirmation: {
            ...m.actionConfirmation,
            status: 'cancelled'
          }
        };
      }
      return m;
    }));
    info('Action cancelled by user.', 'Cancelled');
  };

  const usePromptInChat = (promptText: string) => {
    setActiveTab('chat');
    sendMessage(promptText);
  };

  const createCustomPrompt = (title: string, category: PromptTemplate['category'], text: string) => {
    const newPrompt: PromptTemplate = {
      id: `p-${Date.now()}`,
      title,
      category,
      description: 'Custom user prompt template.',
      promptText: text,
      usageCount: 1
    };
    setPrompts(prev => [newPrompt, ...prev]);
    success(`Prompt "${title}" saved to library.`, 'Prompt Saved');
  };

  const runAction = (actionId: string) => {
    const act = executableActions.find(a => a.id === actionId);
    if (act) {
      setActiveTab('chat');
      sendMessage(act.sampleInput);
    }
  };

  return (
    <CoPilotContext.Provider
      value={{
        activeTab,
        setActiveTab,
        conversations,
        activeConversationId,
        setActiveConversationId,
        createNewConversation,
        deleteConversation,
        messages,
        sendMessage,
        isThinking,
        approveAction,
        cancelAction,
        prompts,
        usePromptInChat,
        createCustomPrompt,
        knowledgeDocs,
        executableActions,
        runAction
      }}
    >
      {children}
    </CoPilotContext.Provider>
  );
};

export const useCoPilot = () => {
  const context = useContext(CoPilotContext);
  if (!context) {
    throw new Error('useCoPilot must be used within a CoPilotProvider');
  }
  return context;
};
