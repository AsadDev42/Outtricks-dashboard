import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { LeadOwnerType } from './LeadsManagementContext';

export type VoiceAiTabType = 
  | 'overview'
  | 'call-center' 
  | 'ai-agents' 
  | 'campaigns' 
  | 'flows' 
  | 'intent' 
  | 'objections' 
  | 'history' 
  | 'analytics' 
  | 'phone-numbers' 
  | 'knowledge' 
  | 'crm-sync'
  | 'queue'
  | 'contacts';

export interface ActiveCallState {
  id: string;
  prospectName: string;
  company: string;
  phone: string;
  status: 'Connecting' | 'Live' | 'Ended';
  durationSeconds: number;
  isMuted: boolean;
  isRecording: boolean;
  liveTranscript: { speaker: 'AI SDR' | 'Prospect'; text: string; time: string }[];
  detectedIntent: string;
  qualificationScore: number;
}

export interface VoiceAiAgent {
  id: string;
  name: string;
  title: string;
  voiceModel: string;
  status: 'Active' | 'Paused';
  purpose: string;
  assignedNumber: string;
  knowledgeBaseDoc: string;
  totalCalls: number;
  conversionRate: number;
}

export interface VoiceCampaign {
  id: string;
  name: string;
  agentName: string;
  audienceCount: number;
  callsPlaced: number;
  answeredCount: number;
  qualifiedCount: number;
  meetingsBooked: number;
  status: 'Running' | 'Paused' | 'Completed';
  concurrency: number;
  createdAt: string;
}

export interface CallFlowAutomation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  delayMinutes: number;
  status: 'Active' | 'Paused';
}

export interface IntentRecord {
  id: string;
  callId: string;
  prospectName: string;
  company: string;
  intentType: 'High Buying Intent' | 'Moderate Discovery' | 'Budget Objection' | 'Wrong Decision Maker';
  confidence: number;
  resultingAction: string;
  timestamp: string;
}

export interface ObjectionRecord {
  id: string;
  objectionName: string;
  frequency: number;
  counterScript: string;
  aiAgent: string;
  outcomeRate: number;
}

export interface HistoricalCall {
  id: string;
  prospectName: string;
  company: string;
  phone: string;
  duration: string;
  direction: 'Outbound AI' | 'Inbound Routed';
  status: 'Completed' | 'Missed' | 'Voicemail';
  outcome: 'Meeting Booked' | 'Qualified' | 'Follow-Up' | 'Not Interested';
  recordingUrl: string;
  transcript: string;
  timestamp: string;
  dealAttributed: number;
}

export interface VoicePhoneNumber {
  id: string;
  number: string;
  country: string;
  assignedAgent: string;
  campaign: string;
  status: 'Active' | 'Warming';
  latency: string;
}

export interface VoiceKnowledgeDoc {
  id: string;
  title: string;
  category: string;
  size: string;
  lastIndexed: string;
  assignedAgents: string[];
}

export interface VoiceCrmSyncEvent {
  id: string;
  timestamp: string;
  event: string;
  dealId: string;
  dealValue: number;
  stage: string;
}

interface VoiceAiContextType {
  activeTab: VoiceAiTabType;
  setActiveTab: (tab: VoiceAiTabType) => void;
  activeCall: ActiveCallState | null;
  aiAgents: VoiceAiAgent[];
  voiceCampaigns: VoiceCampaign[];
  callFlows: CallFlowAutomation[];
  intentDetections: IntentRecord[];
  objections: ObjectionRecord[];
  callHistory: HistoricalCall[];
  phoneNumbers: VoicePhoneNumber[];
  knowledgeDocs: VoiceKnowledgeDoc[];
  crmSyncEvents: VoiceCrmSyncEvent[];

  // Call Center Actions
  startOutboundCall: (prospectName: string, company: string, phone: string) => void;
  endActiveCall: () => void;
  toggleMuteActiveCall: () => void;
  setCallDisposition: (disposition: string) => void;

  // Management Actions
  createAiAgent: (agent: Partial<VoiceAiAgent>) => void;
  toggleAgentStatus: (id: string) => void;
  deleteAiAgent: (id: string) => void;
  createVoiceCampaign: (campaign: Partial<VoiceCampaign>) => void;
  toggleVoiceCampaignStatus: (id: string) => void;
  deleteVoiceCampaign: (id: string) => void;
  createCallFlow: (flow: Partial<CallFlowAutomation>) => void;
  toggleCallFlowStatus: (id: string) => void;
  purchasePhoneNumber: (country: string, areaCode: string) => void;
  releasePhoneNumber: (id: string) => void;
  uploadKnowledgeDoc: (title: string, category: string) => void;
  deleteKnowledgeDoc: (id: string) => void;
}

const INITIAL_AGENTS: VoiceAiAgent[] = [
  {
    id: 'agent_1',
    name: 'Maya',
    title: 'Inbound SDR & Discovery Specialist',
    voiceModel: 'Ultra-Realistic Neural (US Female - ElevenLabs Turbo v2.5)',
    status: 'Active',
    purpose: 'Qualify inbound leads, answer pricing FAQs, and book AE calendar slots.',
    assignedNumber: '+1 (415) 892-4910',
    knowledgeBaseDoc: 'Outtricks_Platform_Overview_2026.pdf',
    totalCalls: 642,
    conversionRate: 34.8,
  },
  {
    id: 'agent_2',
    name: 'Liam',
    title: 'Cold Outbound Enterprise Qualifier',
    voiceModel: 'Conversational Executive (US Male - OpenAI Realtime)',
    status: 'Active',
    purpose: 'Cold outreach to VP Sales and CROs, overcoming deliverability objections.',
    assignedNumber: '+1 (212) 555-0182',
    knowledgeBaseDoc: 'Deliverability_Whitepaper_SOC2.pdf',
    totalCalls: 890,
    conversionRate: 28.4,
  },
  {
    id: 'agent_3',
    name: 'Sophia',
    title: 'Post-Demo Follow-Up & Contract Briefing',
    voiceModel: 'British Executive (UK Female - Cartesia Sonic)',
    status: 'Paused',
    purpose: 'Follow up after proposal dispatch to address security review questions.',
    assignedNumber: '+44 20 7946 0912',
    knowledgeBaseDoc: 'Enterprise_Security_Architecture.pdf',
    totalCalls: 312,
    conversionRate: 42.1,
  }
];

const INITIAL_CAMPAIGNS: VoiceCampaign[] = [
  {
    id: 'vcamp_1',
    name: 'Q3 Enterprise Outbound Qualification Dial Pool',
    agentName: 'Liam (Cold Outbound)',
    audienceCount: 650,
    callsPlaced: 420,
    answeredCount: 284,
    qualifiedCount: 96,
    meetingsBooked: 28,
    status: 'Running',
    concurrency: 5,
    createdAt: '2026-08-14',
  },
  {
    id: 'vcamp_2',
    name: 'Inbound Demo Request Speed-to-Lead (<60s)',
    agentName: 'Maya (Inbound SDR)',
    audienceCount: 180,
    callsPlaced: 172,
    answeredCount: 148,
    qualifiedCount: 88,
    meetingsBooked: 42,
    status: 'Running',
    concurrency: 2,
    createdAt: '2026-08-18',
  }
];

const INITIAL_FLOWS: CallFlowAutomation[] = [
  {
    id: 'flow_1',
    name: 'Meeting Booked on Call → Auto Cal.com Calendar Invite',
    trigger: 'Prospect Agrees to Demo Slot',
    action: 'Dispatch Google Meet Invite + Push Deal to CRM Stage: Demo Scheduled',
    delayMinutes: 0,
    status: 'Active',
  },
  {
    id: 'flow_2',
    name: 'Voicemail Detected → Drop Automated AI Voicemail',
    trigger: 'Answering Machine Beep Detected',
    action: 'Leave Humanized 22-Second Value Voicemail + Send Follow-Up SMS',
    delayMinutes: 0,
    status: 'Active',
  },
  {
    id: 'flow_3',
    name: 'Pricing Objection Overcome → Send Tier 2 Rate Card',
    trigger: 'Intent: Pricing Concern Handled',
    action: 'Send Instant Email with Interactive ROI Calculator Link',
    delayMinutes: 2,
    status: 'Active',
  }
];

const INITIAL_INTENTS: IntentRecord[] = [
  { id: 'int_1', callId: 'call_101', prospectName: 'David Chen', company: 'SaaSFlow Systems', intentType: 'High Buying Intent', confidence: 98, resultingAction: 'Scheduled Executive Demo for Thursday 2 PM', timestamp: '12m ago' },
  { id: 'int_2', callId: 'call_102', prospectName: 'Elena Rostova', company: 'FinTech Stack', intentType: 'Moderate Discovery', confidence: 92, resultingAction: 'Dispatched SOC2 Whitepaper to email', timestamp: '45m ago' },
  { id: 'int_3', callId: 'call_103', prospectName: 'Michael Torres', company: 'Nexlify Inc', intentType: 'Budget Objection', confidence: 88, resultingAction: 'Countered with Flat Multi-Inbox Tier vs Per-Seat Billing', timestamp: '1h ago' },
];

const INITIAL_OBJECTIONS: ObjectionRecord[] = [
  { id: 'obj_1', objectionName: 'Using Competitor (Apollo / Instantly)', frequency: 184, counterScript: 'Completely understand! Most teams use Apollo for basic data, but switch to Outtricks for our integrated multi-inbox rotation and sub-400ms Voice SDR calling.', aiAgent: 'Liam', outcomeRate: 46.2 },
  { id: 'obj_2', objectionName: 'Send me an email first', frequency: 242, counterScript: 'I will definitely send that over! Before I do, are you looking at multi-inbox rotation or direct mobile dials so I send the right case study?', aiAgent: 'Maya', outcomeRate: 58.4 },
  { id: 'obj_3', objectionName: 'Too busy / Bad timing', frequency: 120, counterScript: 'Totally get it. I can let you go in 10 seconds. Would Thursday at 2 PM work for a quick 10-minute briefing with our solutions lead?', aiAgent: 'Liam', outcomeRate: 34.1 },
];

const INITIAL_HISTORY: HistoricalCall[] = [
  {
    id: 'hcall_1',
    prospectName: 'Sarah Jenkins',
    company: 'CloudScale AI',
    phone: '+1 (415) 892-4910',
    duration: '02m 44s',
    direction: 'Outbound AI',
    status: 'Completed',
    outcome: 'Meeting Booked',
    recordingUrl: 'https://cdn.outtricks.ai/audio/rec_sarah_jenkins_call.mp3',
    transcript: "Maya: Hi Sarah, this is Maya from Outtricks. Saw CloudScale is actively expanding your SDR team. Do you have 60 seconds?\nSarah: Sure, what do you help with?\nMaya: We provide multi-inbox rotation across 24+ Google Workspace mailboxes with 99.4% deliverability.\nSarah: Sounds interesting, we lost 4 mailboxes last week. Let's do a demo Thursday at 2 PM.",
    timestamp: 'Today at 11:20 AM',
    dealAttributed: 48000,
  },
  {
    id: 'hcall_2',
    prospectName: 'David Chen',
    company: 'SaaSFlow Systems',
    phone: '+1 (212) 555-0182',
    duration: '01m 58s',
    direction: 'Outbound AI',
    status: 'Completed',
    outcome: 'Qualified',
    recordingUrl: 'https://cdn.outtricks.ai/audio/rec_david_chen.mp3',
    transcript: "Liam: Hi David, noticed SaaSFlow is evaluating outbound infrastructure. Do you have a quick moment?\nDavid: Yes, what's your deliverability guarantee?\nLiam: 99.4% primary inbox rate backed by automated DNS warmups and residential proxies.\nDavid: Send your calendar link over.",
    timestamp: 'Today at 10:45 AM',
    dealAttributed: 32000,
  },
];

const INITIAL_NUMBERS: VoicePhoneNumber[] = [
  { id: 'num_1', number: '+1 (415) 892-4910', country: 'United States (San Francisco, CA)', assignedAgent: 'Maya (Inbound SDR)', campaign: 'Speed-to-Lead Inbound', status: 'Active', latency: '280ms' },
  { id: 'num_2', number: '+1 (212) 555-0182', country: 'United States (New York, NY)', assignedAgent: 'Liam (Cold Outbound)', campaign: 'Q3 Enterprise Outbound', status: 'Active', latency: '310ms' },
  { id: 'num_3', number: '+44 20 7946 0912', country: 'United Kingdom (London)', assignedAgent: 'Sophia (Post-Demo)', campaign: 'EMEA Enterprise Discovery', status: 'Active', latency: '340ms' },
];

const INITIAL_KNOWLEDGE: VoiceKnowledgeDoc[] = [
  { id: 'k_1', title: 'Outtricks_Platform_Overview_2026.pdf', category: 'Product Specs', size: '3.4 MB', lastIndexed: 'Today', assignedAgents: ['Maya', 'Liam'] },
  { id: 'k_2', title: 'Deliverability_Whitepaper_SOC2.pdf', category: 'Security & Compliance', size: '2.8 MB', lastIndexed: 'Yesterday', assignedAgents: ['Liam', 'Sophia'] },
  { id: 'k_3', title: 'Enterprise_Pricing_Rate_Card.pdf', category: 'Commercials', size: '1.2 MB', lastIndexed: 'Aug 20', assignedAgents: ['Maya', 'Sophia'] },
];

const INITIAL_SYNC_EVENTS: VoiceCrmSyncEvent[] = [
  { id: 'sync_1', timestamp: 'Today at 11:24 AM', event: 'Created Deal from Voice AI Call', dealId: 'deal_1', dealValue: 48000, stage: 'Demo Scheduled / Briefing' },
  { id: 'sync_2', timestamp: 'Today at 10:48 AM', event: 'Updated Lead Score to 94/100', dealId: 'deal_2', dealValue: 32000, stage: 'Lead Qualified / Discovery' },
];

const VoiceAiContext = createContext<VoiceAiContextType | undefined>(undefined);

export const VoiceAiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<VoiceAiTabType>('call-center');
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>({
    id: 'live_call_1',
    prospectName: 'Jessica Miller',
    company: 'Apex Revenue Tech',
    phone: '+1 (415) 782-9014',
    status: 'Live',
    durationSeconds: 38,
    isMuted: false,
    isRecording: true,
    liveTranscript: [
      { speaker: 'AI SDR', text: "Hi Jessica, this is Alex from Outtricks. I noticed your team is expanding its sales operation. Do you have 60 seconds?", time: "00:04" },
      { speaker: 'Prospect', text: "Sure. What exactly does Outtricks help with?", time: "00:09" },
      { speaker: 'AI SDR', text: "We help revenue teams find verified decision makers, automate multi-inbox cold email, and place sub-400ms voice qualification calls.", time: "00:18" },
      { speaker: 'Prospect', text: "That sounds interesting. How does the AI handle objection handling on pricing?", time: "00:26" },
      { speaker: 'AI SDR', text: "It responds in real time under 400ms, overcomes per-seat software fatigue, and books qualified opportunities directly to your calendar.", time: "00:35" }
    ],
    detectedIntent: 'High Buying Intent (Objection Handled)',
    qualificationScore: 89,
  });

  const [aiAgents, setAiAgents] = useState<VoiceAiAgent[]>(INITIAL_AGENTS);
  const [voiceCampaigns, setVoiceCampaigns] = useState<VoiceCampaign[]>(INITIAL_CAMPAIGNS);
  const [callFlows, setCallFlows] = useState<CallFlowAutomation[]>(INITIAL_FLOWS);
  const [intentDetections, setIntentDetections] = useState<IntentRecord[]>(INITIAL_INTENTS);
  const [objections, setObjections] = useState<ObjectionRecord[]>(INITIAL_OBJECTIONS);
  const [callHistory, setCallHistory] = useState<HistoricalCall[]>(INITIAL_HISTORY);
  const [phoneNumbers, setPhoneNumbers] = useState<VoicePhoneNumber[]>(INITIAL_NUMBERS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<VoiceKnowledgeDoc[]>(INITIAL_KNOWLEDGE);
  const [crmSyncEvents, setCrmSyncEvents] = useState<VoiceCrmSyncEvent[]>(INITIAL_SYNC_EVENTS);

  // Active call timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeCall && activeCall.status === 'Live') {
      interval = setInterval(() => {
        setActiveCall((prev) => prev ? { ...prev, durationSeconds: prev.durationSeconds + 1 } : null);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const startOutboundCall = useCallback((prospectName: string, company: string, phone: string) => {
    setActiveCall({
      id: `live_${Date.now()}`,
      prospectName,
      company,
      phone,
      status: 'Live',
      durationSeconds: 0,
      isMuted: false,
      isRecording: true,
      liveTranscript: [
        { speaker: 'AI SDR', text: `Hi ${prospectName.split(' ')[0]}, this is Maya from Outtricks. Calling regarding ${company}'s outbound infrastructure.`, time: '00:02' }
      ],
      detectedIntent: 'Live Discovery Call',
      qualificationScore: 65,
    });
    success(`Dialing ${prospectName} via sub-400ms WebRTC line.`, 'Call Placed');
  }, [success]);

  const endActiveCall = useCallback(() => {
    if (activeCall) {
      setActiveCall({ ...activeCall, status: 'Ended' });
      info('Call terminated. Recording and transcript archived.', 'Call Ended');
    }
  }, [activeCall, info]);

  const toggleMuteActiveCall = useCallback(() => {
    if (activeCall) {
      setActiveCall({ ...activeCall, isMuted: !activeCall.isMuted });
    }
  }, [activeCall]);

  const setCallDisposition = useCallback((disposition: string) => {
    success(`Call tagged as "${disposition}". Pushed to CRM.`, 'Disposition Saved');
    setActiveCall(null);
  }, [success]);

  const createAiAgent = useCallback((data: Partial<VoiceAiAgent>) => {
    const newAgent: VoiceAiAgent = {
      id: `agent_${Date.now()}`,
      name: data.name || 'New Voice SDR',
      title: data.title || 'Outbound Discovery Specialist',
      voiceModel: data.voiceModel || 'Ultra-Realistic Neural (US Female - ElevenLabs Turbo v2.5)',
      status: 'Active',
      purpose: data.purpose || 'Qualify leads and book executive demos.',
      assignedNumber: data.assignedNumber || '+1 (415) 892-4910',
      knowledgeBaseDoc: data.knowledgeBaseDoc || 'Outtricks_Platform_Overview_2026.pdf',
      totalCalls: 0,
      conversionRate: 0,
    };
    setAiAgents((prev) => [newAgent, ...prev]);
    success(`AI Voice Agent "${newAgent.name}" deployed.`, 'Agent Created');
  }, [success]);

  const toggleAgentStatus = useCallback((id: string) => {
    setAiAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a))
    );
  }, []);

  const deleteAiAgent = useCallback((id: string) => {
    setAiAgents((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const createVoiceCampaign = useCallback((data: Partial<VoiceCampaign>) => {
    const newCamp: VoiceCampaign = {
      id: `vcamp_${Date.now()}`,
      name: data.name || 'Untitled Voice Campaign',
      agentName: data.agentName || 'Liam (Cold Outbound)',
      audienceCount: data.audienceCount || 250,
      callsPlaced: 0,
      answeredCount: 0,
      qualifiedCount: 0,
      meetingsBooked: 0,
      status: 'Running',
      concurrency: data.concurrency || 3,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setVoiceCampaigns((prev) => [newCamp, ...prev]);
    success(`Voice Campaign "${newCamp.name}" launched.`, 'Campaign Launched');
  }, [success]);

  const toggleVoiceCampaignStatus = useCallback((id: string) => {
    setVoiceCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Running' ? 'Paused' : 'Running' } : c))
    );
  }, []);

  const deleteVoiceCampaign = useCallback((id: string) => {
    setVoiceCampaigns((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const createCallFlow = useCallback((flow: Partial<CallFlowAutomation>) => {
    const newFlow: CallFlowAutomation = {
      id: `flow_${Date.now()}`,
      name: flow.name || 'New Call Event Automation',
      trigger: flow.trigger || 'Call Completed',
      action: flow.action || 'Send Follow-up Email',
      delayMinutes: flow.delayMinutes || 0,
      status: 'Active',
    };
    setCallFlows((prev) => [newFlow, ...prev]);
    success(`Call flow automation "${newFlow.name}" created.`, 'Flow Created');
  }, [success]);

  const toggleCallFlowStatus = useCallback((id: string) => {
    setCallFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: f.status === 'Active' ? 'Paused' : 'Active' } : f))
    );
  }, []);

  const purchasePhoneNumber = useCallback((country: string, areaCode: string) => {
    const newNum: VoicePhoneNumber = {
      id: `num_${Date.now()}`,
      number: `+1 (${areaCode}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      country: `${country} (Area ${areaCode})`,
      assignedAgent: 'Maya (Inbound SDR)',
      campaign: 'Direct Inbound Line',
      status: 'Active',
      latency: '260ms',
    };
    setPhoneNumbers((prev) => [newNum, ...prev]);
    success(`Provisioned local presence number ${newNum.number}.`, 'Number Activated');
  }, [success]);

  const releasePhoneNumber = useCallback((id: string) => {
    setPhoneNumbers((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const uploadKnowledgeDoc = useCallback((title: string, category: string) => {
    const newDoc: VoiceKnowledgeDoc = {
      id: `k_${Date.now()}`,
      title,
      category,
      size: '2.1 MB',
      lastIndexed: 'Just now',
      assignedAgents: ['Maya', 'Liam'],
    };
    setKnowledgeDocs((prev) => [newDoc, ...prev]);
    success(`Document "${title}" indexed into vector memory.`, 'Knowledge Indexed');
  }, [success]);

  const deleteKnowledgeDoc = useCallback((id: string) => {
    setKnowledgeDocs((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return (
    <VoiceAiContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeCall,
        aiAgents,
        voiceCampaigns,
        callFlows,
        intentDetections,
        objections,
        callHistory,
        phoneNumbers,
        knowledgeDocs,
        crmSyncEvents,
        startOutboundCall,
        endActiveCall,
        toggleMuteActiveCall,
        setCallDisposition,
        createAiAgent,
        toggleAgentStatus,
        deleteAiAgent,
        createVoiceCampaign,
        toggleVoiceCampaignStatus,
        deleteVoiceCampaign,
        createCallFlow,
        toggleCallFlowStatus,
        purchasePhoneNumber,
        releasePhoneNumber,
        uploadKnowledgeDoc,
        deleteKnowledgeDoc,
      }}
    >
      {children}
    </VoiceAiContext.Provider>
  );
};

export const useVoiceAi = () => {
  const context = useContext(VoiceAiContext);
  if (!context) {
    throw new Error('useVoiceAi must be used within a VoiceAiProvider');
  }
  return context;
};
