import React, { createContext, useContext, useState } from 'react';

export type AgentStatus = 'Active' | 'Paused' | 'Draft' | 'Running' | 'Error';
export type AgentType = 'sdr' | 'research' | 'personalization' | 'qualification' | 'followup' | 'crm' | 'inmail' | 'bidding' | 'custom';
export type AutonomyLevel = 'Autonomous' | 'Approval-Required' | 'Manual';
export type ExecutionStatus = 'Success' | 'Running' | 'Pending Approval' | 'Failed';
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';

export interface AgentToolPermission {
  id: string;
  name: string;
  module: 'crm' | 'lead-finder' | 'email' | 'linkedin' | 'voice' | 'inbox' | 'workflows' | 'analytics';
  description: string;
  enabled: boolean;
  requiresApproval: boolean;
}

export interface AgentTrigger {
  id: string;
  type: 'schedule' | 'crm_event' | 'inbound_message' | 'lead_discovered' | 'manual';
  label: string;
  config: string;
  enabled: boolean;
}

export interface AgentRecord {
  id: string;
  name: string;
  role: string;
  type: AgentType;
  description: string;
  avatarBg: string;
  status: AgentStatus;
  autonomyLevel: AutonomyLevel;
  assignedWorkspace: string;
  assignedOwner: string;
  createdAt: string;
  lastActive: string;
  systemInstructions: string;
  objective: string;
  constraints: string;
  tools: AgentToolPermission[];
  triggers: AgentTrigger[];
  metrics: {
    completedTasks: number;
    successRate: number;
    avgLatencyMs: number;
    totalActions: number;
    creditsUsed: number;
  };
  version: string;
  maxDailyActions: number;
  stopOnError: boolean;
}

export interface AgentExecution {
  id: string;
  agentId: string;
  agentName: string;
  taskTitle: string;
  triggerSource: string;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  status: ExecutionStatus;
  targetRecord?: {
    type: 'Lead' | 'Company' | 'Deal' | 'Campaign';
    id: string;
    name: string;
  };
  toolCalls: {
    toolName: string;
    module: string;
    params: Record<string, any>;
    result?: Record<string, any>;
    status: 'Success' | 'Failed' | 'Requires Approval';
    timestamp: string;
  }[];
  outputSummary: string;
  errorMessage?: string;
  approvalDetails?: {
    actionType: string;
    riskScore: 'Low' | 'Medium' | 'High';
    previewPayload: string;
    approvedBy?: string;
    approvedAt?: string;
  };
}

export interface AgentApprovalItem {
  id: string;
  executionId: string;
  agentId: string;
  agentName: string;
  actionTitle: string;
  module: string;
  riskScore: 'Low' | 'Medium' | 'High';
  targetContact: string;
  targetCompany: string;
  proposedAction: string;
  payloadPreview: string;
  requestedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AgentTask {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  createdAt: string;
  associatedRecord: string;
  associatedType: 'Lead' | 'Account' | 'Deal' | 'Job Post';
  progress: number;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  module: string;
  action: string;
  targetRecord: string;
  result: string;
  status: 'Success' | 'Warning' | 'Error' | 'Info';
}

export interface AgentPerformanceStats {
  totalAgents: number;
  activeAgents: number;
  pausedAgents: number;
  totalTasksCompleted: number;
  overallSuccessRate: number;
  totalCreditsUsed: number;
  activeExecutions: number;
  pendingApprovalsCount: number;
}

interface AgentsContextType {
  agents: AgentRecord[];
  activeAgent: AgentRecord | null;
  setActiveAgent: (agent: AgentRecord | null) => void;
  executions: AgentExecution[];
  approvals: AgentApprovalItem[];
  tasks: AgentTask[];
  logs: AgentLog[];
  stats: AgentPerformanceStats;
  selectedTab: 'overview' | 'agents' | 'builder' | 'approvals' | 'executions' | 'tasks' | 'performance' | 'logs';
  setSelectedTab: (tab: 'overview' | 'agents' | 'builder' | 'approvals' | 'executions' | 'tasks' | 'performance' | 'logs') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  toggleAgentStatus: (agentId: string) => void;
  createAgent: (newAgent: Partial<AgentRecord>) => void;
  updateAgent: (agentId: string, updates: Partial<AgentRecord>) => void;
  deleteAgent: (agentId: string) => void;
  approveAction: (approvalId: string) => void;
  rejectAction: (approvalId: string) => void;
  testAgentRun: (agentId: string, inputPrompt: string) => Promise<AgentExecution>;
  isTestingRunning: boolean;
}

const INITIAL_TOOLS: AgentToolPermission[] = [
  { id: 'tool-crm-read', name: 'CRM Read Access', module: 'crm', description: 'Query leads, companies, and deals pipeline', enabled: true, requiresApproval: false },
  { id: 'tool-crm-write', name: 'CRM Stage & Note Updates', module: 'crm', description: 'Update deal stages, log activity notes, and sync status', enabled: true, requiresApproval: false },
  { id: 'tool-lead-search', name: '8D Lead Database Search', module: 'lead-finder', description: 'Search 480M+ verified global B2B profiles', enabled: true, requiresApproval: false },
  { id: 'tool-email-draft', name: 'Draft Cold Email Sequences', module: 'email', description: 'Generate personalized email variations with spintax', enabled: true, requiresApproval: false },
  { id: 'tool-email-send', name: 'Dispatch Cold Email', module: 'email', description: 'Send emails across rotated mailboxes', enabled: true, requiresApproval: true },
  { id: 'tool-linkedin-view', name: 'LinkedIn Profile View & Follow', module: 'linkedin', description: 'Cloud safe profile view and follow-up triggers', enabled: true, requiresApproval: false },
  { id: 'tool-linkedin-msg', name: 'LinkedIn Direct Message', module: 'linkedin', description: 'Send connection notes and InMail follow-ups', enabled: true, requiresApproval: true },
  { id: 'tool-voice-call', name: 'Voice AI SDR Phone Call', module: 'voice', description: 'Place sub-400ms WebRTC qualification calls', enabled: true, requiresApproval: true },
  { id: 'tool-workflow-trigger', name: 'Trigger DAG Visual Flows', module: 'workflows', description: 'Invoke downstream multi-channel automation workflows', enabled: true, requiresApproval: false },
];

const INITIAL_AGENTS: AgentRecord[] = [
  {
    id: 'agent-sdr-01',
    name: 'Apollo SDR Alpha',
    role: 'Autonomous Outbound SDR',
    type: 'sdr',
    description: 'Finds qualified B2B decision-makers, crafts hyper-relevant outreach hooks, and dispatches personalized emails across rotated inboxes.',
    avatarBg: 'bg-blue-600',
    status: 'Active',
    autonomyLevel: 'Autonomous',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Asad (Growth Lead)',
    createdAt: '2026-08-10',
    lastActive: '2 mins ago',
    systemInstructions: 'You are an elite B2B Sales Development Representative for Outtricks. Research target companies using firmographic indicators, verify corporate email validity, identify key challenges, and compose compelling 3-sentence value propositions.',
    objective: 'Generate 20 qualified discovery meetings per month with VP Sales and Revenue Operations leaders.',
    constraints: 'Never contact companies with under 50 employees. Maintain 100% CAN-SPAM and GDPR compliance. Limit sending to 45 emails per mailbox daily.',
    tools: INITIAL_TOOLS,
    triggers: [
      { id: 'trig-1', type: 'schedule', label: 'Daily Outbound Batch', config: 'Every weekday at 09:00 AM EST', enabled: true },
      { id: 'trig-2', type: 'lead_discovered', label: 'High Intent Account Detected', config: 'When new lead matches ICP score >= 90', enabled: true }
    ],
    metrics: {
      completedTasks: 1420,
      successRate: 98.4,
      avgLatencyMs: 340,
      totalActions: 3840,
      creditsUsed: 520
    },
    version: 'v2.4.1',
    maxDailyActions: 150,
    stopOnError: true
  },
  {
    id: 'agent-linkedin-02',
    name: 'Sentinel LinkedIn Bot',
    role: 'Safe LinkedIn Outreach Specialist',
    type: 'inmail',
    description: 'Monitors target prospect profiles, visits accounts with residential proxy rotation, and sends personalized connection notes with zero ban risk.',
    avatarBg: 'bg-indigo-600',
    status: 'Active',
    autonomyLevel: 'Approval-Required',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Sarah Miller (AE)',
    createdAt: '2026-08-14',
    lastActive: '14 mins ago',
    systemInstructions: 'Review prospect recent posts and activity on LinkedIn. Compose concise, value-focused connection requests under 250 characters referencing mutual relevance.',
    objective: 'Connect with 25 target buyers daily and bridge warm responses directly into Deals CRM.',
    constraints: 'Strict limit of 25 connection requests per 24 hours. Always use static residential IP rotation. Never message contacts tagged as existing customers.',
    tools: INITIAL_TOOLS.map(t => t.module === 'linkedin' ? { ...t, enabled: true } : t),
    triggers: [
      { id: 'trig-3', type: 'schedule', label: 'Staggered Daytime Cadence', config: 'Randomized intervals between 10:00 AM - 4:00 PM', enabled: true }
    ],
    metrics: {
      completedTasks: 680,
      successRate: 99.1,
      avgLatencyMs: 410,
      totalActions: 1240,
      creditsUsed: 180
    },
    version: 'v1.8.0',
    maxDailyActions: 50,
    stopOnError: true
  },
  {
    id: 'agent-upwork-03',
    name: 'BidCraft Upwork Agent',
    role: 'Freelance Marketplace Prospector',
    type: 'bidding',
    description: 'Scans live enterprise project postings, scores budget match & client hire rate, and generates bespoke technical proposals in under 90 seconds.',
    avatarBg: 'bg-sky-600',
    status: 'Active',
    autonomyLevel: 'Approval-Required',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Alex Rivera (Partner)',
    createdAt: '2026-08-18',
    lastActive: '1 hour ago',
    systemInstructions: 'Analyze client project scope, past review history, and budget feasibility. Generate high-conversion custom proposals highlighting relevant case studies and milestone breakdowns.',
    objective: 'Submit high-fit proposals within the first 5 minutes of job posting to maximize client viewing rank.',
    constraints: 'Only bid on jobs with verified payment methods, >= $1,000 budget, and client hire rate >= 70%. Never submit generic template proposals.',
    tools: INITIAL_TOOLS,
    triggers: [
      { id: 'trig-4', type: 'inbound_message', label: 'New Job Feed Match', config: 'Real-time WebSocket feed for tags: [SaaS, React, AI, Node]', enabled: true }
    ],
    metrics: {
      completedTasks: 310,
      successRate: 96.8,
      avgLatencyMs: 520,
      totalActions: 620,
      creditsUsed: 95
    },
    version: 'v2.1.0',
    maxDailyActions: 30,
    stopOnError: false
  },
  {
    id: 'agent-research-04',
    name: 'DeepContext Intelligence Agent',
    role: 'Account & Technographic Researcher',
    type: 'research',
    description: 'Performs deep reconnaissance across company funding, installed tech stacks, and active hiring surges before multi-channel outreach begins.',
    avatarBg: 'bg-teal-600',
    status: 'Active',
    autonomyLevel: 'Autonomous',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Asad (Growth Lead)',
    createdAt: '2026-08-20',
    lastActive: '5 mins ago',
    systemInstructions: 'Extract key company properties, installed cloud infrastructure, recent executive promotions, and strategic expansion signals. Structure all context into standardized CRM fields.',
    objective: 'Populate account cards with verified actionable intelligence prior to SDR call scheduling.',
    constraints: 'Store all data in normalized schema. Avoid speculative data. Flag high-intent buying signals (>85%).',
    tools: INITIAL_TOOLS,
    triggers: [
      { id: 'trig-5', type: 'crm_event', label: 'Account Added to Pipeline', config: 'When new company is saved to Target Accounts', enabled: true }
    ],
    metrics: {
      completedTasks: 1890,
      successRate: 99.7,
      avgLatencyMs: 280,
      totalActions: 4120,
      creditsUsed: 420
    },
    version: 'v3.0.2',
    maxDailyActions: 300,
    stopOnError: false
  },
  {
    id: 'agent-voice-05',
    name: 'Vocalis Voice SDR Caller',
    role: 'Sub-400ms Phone Qualification SDR',
    type: 'qualification',
    description: 'Places real-time WebRTC outbound calls to verified direct dials, conducts dynamic BANT qualification conversations, and logs audio transcripts.',
    avatarBg: 'bg-cyan-600',
    status: 'Paused',
    autonomyLevel: 'Autonomous',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Elena Rostova (Head of Sales)',
    createdAt: '2026-08-22',
    lastActive: '3 hours ago',
    systemInstructions: 'Conduct natural, professional 2-minute phone discovery. Introduce Outtricks value proposition, ask qualifying questions regarding outbound volume, and propose a brief 15-minute calendar demo.',
    objective: 'Qualify inbound leads and book calendar demo slots directly into Deals CRM with zero rep intervention.',
    constraints: 'Adhere strictly to local telecom calling hours (09:00 - 17:00 local prospect time). Hang up immediately on voicemail detection or explicit opt-out.',
    tools: INITIAL_TOOLS,
    triggers: [
      { id: 'trig-6', type: 'crm_event', label: 'Speed-to-Lead Inbound Form', config: 'Trigger call within 60s of demo request submission', enabled: false }
    ],
    metrics: {
      completedTasks: 420,
      successRate: 94.2,
      avgLatencyMs: 380,
      totalActions: 890,
      creditsUsed: 310
    },
    version: 'v1.4.0',
    maxDailyActions: 100,
    stopOnError: true
  },
  {
    id: 'agent-crm-06',
    name: 'Pipeline Sentinel CRM Sync',
    role: 'CRM Data Hygiene & Deal Progression',
    type: 'crm',
    description: 'Monitors inbound replies and channel events, updates deal stages, logs verified contact details, and prevents CRM data decay.',
    avatarBg: 'bg-slate-700',
    status: 'Active',
    autonomyLevel: 'Autonomous',
    assignedWorkspace: 'Primary Enterprise Workspace',
    assignedOwner: 'Asad (Growth Lead)',
    createdAt: '2026-08-24',
    lastActive: 'Just now',
    systemInstructions: 'Inspect all outbound activity events and prospect responses. Parse meeting booking confirmations, auto-advance pipeline deals, and alert account executives.',
    objective: 'Maintain zero-lag CRM hygiene with 100% automated deal stage progression and contact property updates.',
    constraints: 'Never delete existing customer deals. Maintain audit trail of all automated property updates.',
    tools: INITIAL_TOOLS,
    triggers: [
      { id: 'trig-7', type: 'inbound_message', label: 'Positive Reply Received', config: 'When prospect replies with positive sentiment', enabled: true }
    ],
    metrics: {
      completedTasks: 2150,
      successRate: 99.9,
      avgLatencyMs: 120,
      totalActions: 5400,
      creditsUsed: 110
    },
    version: 'v2.0.4',
    maxDailyActions: 500,
    stopOnError: false
  }
];

const INITIAL_EXECUTIONS: AgentExecution[] = [
  {
    id: 'exec-9821',
    agentId: 'agent-sdr-01',
    agentName: 'Apollo SDR Alpha',
    taskTitle: 'Execute Outbound Batch for Series B SaaS ICP',
    triggerSource: 'Daily Outbound Batch Schedule',
    startedAt: '12:42:10 PM',
    completedAt: '12:42:12 PM',
    durationMs: 2300,
    status: 'Success',
    targetRecord: { type: 'Lead', id: 'lead-01', name: 'Elena Rostova (VP Product @ FinTech Global)' },
    toolCalls: [
      { toolName: '8D Lead Database Search', module: 'lead-finder', params: { title: 'VP Product', headcount: '>50' }, result: { matched: 1, emailValid: true }, status: 'Success', timestamp: '12:42:10 PM' },
      { toolName: 'CRM Read Access', module: 'crm', params: { checkDuplicate: 'elena@fintechglobal.io' }, result: { isDuplicate: false }, status: 'Success', timestamp: '12:42:11 PM' },
      { toolName: 'Dispatch Cold Email', module: 'email', params: { mailbox: 'asad@outtricks.io', subject: 'Product scaling infrastructure at FinTech Global' }, result: { messageId: 'msg_84920' }, status: 'Success', timestamp: '12:42:12 PM' }
    ],
    outputSummary: 'Dispatched personalized cold email to Elena Rostova referencing FinTech scaleup expansion. Queued step 2 follow-up in 3 days.'
  },
  {
    id: 'exec-9820',
    agentId: 'agent-linkedin-02',
    agentName: 'Sentinel LinkedIn Bot',
    taskTitle: 'Send InMail Connection Note to Marcus Vance',
    triggerSource: 'Account Added to Target List',
    startedAt: '12:35:04 PM',
    durationMs: 850,
    status: 'Pending Approval',
    targetRecord: { type: 'Lead', id: 'lead-02', name: 'Marcus Vance (Head of Growth @ HyperGrowth Labs)' },
    toolCalls: [
      { toolName: 'LinkedIn Profile View & Follow', module: 'linkedin', params: { profileUrl: 'linkedin.com/in/marcus-vance' }, result: { viewed: true }, status: 'Success', timestamp: '12:35:04 PM' },
      { toolName: 'LinkedIn Direct Message', module: 'linkedin', params: { noteText: 'Hi Marcus, noticed your recent post on outbound deliverability. Thought our multi-inbox rotation setup might resonate.' }, status: 'Requires Approval', timestamp: '12:35:05 PM' }
    ],
    outputSummary: 'Drafted connection note referencing recent LinkedIn post. Awaiting human approval prior to dispatch.',
    approvalDetails: {
      actionType: 'LinkedIn Direct Message',
      riskScore: 'Low',
      previewPayload: 'Hi Marcus, noticed your recent post on outbound deliverability. Thought our multi-inbox rotation setup might resonate with what you are scaling at HyperGrowth Labs.'
    }
  },
  {
    id: 'exec-9819',
    agentId: 'agent-upwork-03',
    agentName: 'BidCraft Upwork Agent',
    taskTitle: 'Evaluate & Draft Proposal for $8,500 React/AI Project',
    triggerSource: 'WebSocket Job Stream Match',
    startedAt: '12:18:22 PM',
    durationMs: 1400,
    status: 'Pending Approval',
    targetRecord: { type: 'Campaign', id: 'job-994', name: 'Enterprise SaaS Dashboard & AI Agent Interop' },
    toolCalls: [
      { toolName: 'CRM Read Access', module: 'crm', params: { queryCaseStudies: 'AI Dashboards' }, result: { count: 3 }, status: 'Success', timestamp: '12:18:22 PM' }
    ],
    outputSummary: 'Evaluated job posting: 100% budget match ($8,500 fixed price), client 94% hire rate. Bespoke proposal drafted with milestone roadmap.',
    approvalDetails: {
      actionType: 'Submit Marketplace Proposal',
      riskScore: 'Medium',
      previewPayload: 'Proposal: Deliver enterprise React/TypeScript analytics dashboard with real-time WebSocket state management and autonomous agent tool calling within 3 weeks.'
    }
  },
  {
    id: 'exec-9818',
    agentId: 'agent-research-04',
    agentName: 'DeepContext Intelligence Agent',
    taskTitle: 'Technographic Reconnaissance for CloudScale AI',
    triggerSource: 'CRM Stage Update',
    startedAt: '11:55:01 AM',
    completedAt: '11:55:02 AM',
    durationMs: 980,
    status: 'Success',
    targetRecord: { type: 'Company', id: 'comp-10', name: 'CloudScale AI (180 Headcount)' },
    toolCalls: [
      { toolName: 'CRM Stage & Note Updates', module: 'crm', params: { companyId: 'comp-10', techStack: ['Salesforce', 'HubSpot', 'PostgreSQL', 'Snowflake'], hiringIntent: 'High' }, result: { updated: true }, status: 'Success', timestamp: '11:55:02 AM' }
    ],
    outputSummary: 'Identified Series B funding ($32M), 6 active SDR job openings, and installed Snowflake/PostgreSQL data stack. Synchronized to CRM.'
  },
  {
    id: 'exec-9817',
    agentId: 'agent-crm-06',
    agentName: 'Pipeline Sentinel CRM Sync',
    taskTitle: 'Advance Deal Stage on Positive Reply',
    triggerSource: 'Inbound Reply Webhook',
    startedAt: '11:20:44 AM',
    completedAt: '11:20:45 AM',
    durationMs: 420,
    status: 'Success',
    targetRecord: { type: 'Deal', id: 'deal-01', name: 'CloudScale AI Enterprise License ($36,000 ARR)' },
    toolCalls: [
      { toolName: 'CRM Stage & Note Updates', module: 'crm', params: { dealId: 'deal-01', newStage: 'Demo Scheduled', note: 'Prospect confirmed Google Meet demo for Thursday 2 PM EST.' }, result: { success: true }, status: 'Success', timestamp: '11:20:45 AM' }
    ],
    outputSummary: 'Parsed positive reply sentiment (98%). Auto-advanced deal stage to "Demo Scheduled" and notified assigned Account Executive.'
  }
];

const INITIAL_APPROVALS: AgentApprovalItem[] = [
  {
    id: 'appr-01',
    executionId: 'exec-9820',
    agentId: 'agent-linkedin-02',
    agentName: 'Sentinel LinkedIn Bot',
    actionTitle: 'Send LinkedIn Connection Request',
    module: 'LinkedIn',
    riskScore: 'Low',
    targetContact: 'Marcus Vance',
    targetCompany: 'HyperGrowth Labs',
    proposedAction: 'Send connection note referencing recent outbound deliverability post',
    payloadPreview: 'Hi Marcus, noticed your recent post on outbound deliverability. Thought our multi-inbox rotation setup might resonate with what you are scaling at HyperGrowth Labs.',
    requestedAt: '12:35 PM',
    status: 'Pending'
  },
  {
    id: 'appr-02',
    executionId: 'exec-9819',
    agentId: 'agent-upwork-03',
    agentName: 'BidCraft Upwork Agent',
    actionTitle: 'Submit Upwork Enterprise Proposal',
    module: 'Upwork',
    riskScore: 'Medium',
    targetContact: 'Enterprise Client (San Francisco, CA)',
    targetCompany: 'Job: SaaS Dashboard & AI Agent Interop ($8,500)',
    proposedAction: 'Submit customized 3-milestone proposal with architectural case studies',
    payloadPreview: 'Proposal: Deliver enterprise React/TypeScript analytics dashboard with real-time WebSocket state management and autonomous agent tool calling within 3 weeks.',
    requestedAt: '12:18 PM',
    status: 'Pending'
  }
];

const INITIAL_TASKS: AgentTask[] = [
  { id: 'task-01', title: 'Target 50 Series B VP Sales in North America', agentId: 'agent-sdr-01', agentName: 'Apollo SDR Alpha', priority: 'High', status: 'In Progress', deadline: 'Today, 5:00 PM', createdAt: '09:00 AM', associatedRecord: 'Elena Rostova, David Chen, +48 more', associatedType: 'Lead', progress: 68 },
  { id: 'task-02', title: 'LinkedIn Safe Cloud Warmup Batch', agentId: 'agent-linkedin-02', agentName: 'Sentinel LinkedIn Bot', priority: 'Medium', status: 'In Progress', deadline: 'Today, 4:00 PM', createdAt: '10:00 AM', associatedRecord: '25 Target Decision Makers', associatedType: 'Account', progress: 40 },
  { id: 'task-03', title: 'Marketplace Bidding: AI/SaaS Feed Scan', agentId: 'agent-upwork-03', agentName: 'BidCraft Upwork Agent', priority: 'Critical', status: 'Pending', deadline: 'Continuous WebSocket', createdAt: '11:00 AM', associatedRecord: 'Live Upwork Job Queue', associatedType: 'Job Post', progress: 100 },
  { id: 'task-04', title: 'Deep Tech Recon for 12 Enterprise Accounts', agentId: 'agent-research-04', agentName: 'DeepContext Intelligence Agent', priority: 'Medium', status: 'Completed', deadline: 'Today, 12:00 PM', createdAt: '08:30 AM', associatedRecord: 'CloudScale AI, SaaSFlow, +10 more', associatedType: 'Account', progress: 100 },
  { id: 'task-05', title: 'Pipeline Sync & Inbound Reply Parsing', agentId: 'agent-crm-06', agentName: 'Pipeline Sentinel CRM Sync', priority: 'Low', status: 'In Progress', deadline: '24/7 Real-Time', createdAt: '08:00 AM', associatedRecord: 'Deals CRM Pipeline', associatedType: 'Deal', progress: 92 }
];

const INITIAL_LOGS: AgentLog[] = [
  { id: 'log-01', timestamp: '12:42:12 PM', agentId: 'agent-sdr-01', agentName: 'Apollo SDR Alpha', module: 'Cold Email', action: 'Dispatched Personalized Touchpoint', targetRecord: 'elena@fintechglobal.io', result: 'Message ID msg_84920 queued for mailbox asad@outtricks.io', status: 'Success' },
  { id: 'log-02', timestamp: '12:35:05 PM', agentId: 'agent-linkedin-02', agentName: 'Sentinel LinkedIn Bot', module: 'LinkedIn', action: 'Generated InMail Connection Hook', targetRecord: 'Marcus Vance (HyperGrowth Labs)', result: 'Action requires approval (Autonomy setting: Approval-Required)', status: 'Warning' },
  { id: 'log-03', timestamp: '12:18:22 PM', agentId: 'agent-upwork-03', agentName: 'BidCraft Upwork Agent', module: 'Upwork', action: 'Drafted Marketplace Proposal', targetRecord: 'Job #994 ($8,500 fixed price)', result: 'Proposal drafted with 3 milestone breakdowns. Awaiting approval.', status: 'Info' },
  { id: 'log-04', timestamp: '11:55:02 AM', agentId: 'agent-research-04', agentName: 'DeepContext Intelligence Agent', module: 'CRM', action: 'Updated Firmographic & Tech Stack', targetRecord: 'CloudScale AI', result: 'Added [Salesforce, Snowflake, PostgreSQL] and flagged high hiring surge (+6 SDRs)', status: 'Success' },
  { id: 'log-05', timestamp: '11:20:45 AM', agentId: 'agent-crm-06', agentName: 'Pipeline Sentinel CRM Sync', module: 'CRM', action: 'Advanced Deal Stage', targetRecord: 'Deal: CloudScale AI ($36K ARR)', result: 'Moved from "Discovery" to "Demo Scheduled". Assigned AE alerted.', status: 'Success' }
];

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export const AgentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<AgentRecord[]>(INITIAL_AGENTS);
  const [activeAgent, setActiveAgent] = useState<AgentRecord | null>(INITIAL_AGENTS[0]);
  const [executions, setExecutions] = useState<AgentExecution[]>(INITIAL_EXECUTIONS);
  const [approvals, setApprovals] = useState<AgentApprovalItem[]>(INITIAL_APPROVALS);
  const [tasks, setTasks] = useState<AgentTask[]>(INITIAL_TASKS);
  const [logs, setLogs] = useState<AgentLog[]>(INITIAL_LOGS);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'builder' | 'approvals' | 'executions' | 'tasks' | 'performance' | 'logs'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isTestingRunning, setIsTestingRunning] = useState(false);

  const stats: AgentPerformanceStats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'Active' || a.status === 'Running').length,
    pausedAgents: agents.filter(a => a.status === 'Paused').length,
    totalTasksCompleted: agents.reduce((acc, a) => acc + a.metrics.completedTasks, 0),
    overallSuccessRate: parseFloat((agents.reduce((acc, a) => acc + a.metrics.successRate, 0) / (agents.length || 1)).toFixed(1)),
    totalCreditsUsed: agents.reduce((acc, a) => acc + a.metrics.creditsUsed, 0),
    activeExecutions: executions.filter(e => e.status === 'Running').length,
    pendingApprovalsCount: approvals.filter(ap => ap.status === 'Pending').length
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const nextStatus: AgentStatus = a.status === 'Active' ? 'Paused' : 'Active';
        return { ...a, status: nextStatus, lastActive: 'Just now' };
      }
      return a;
    }));

    if (activeAgent && activeAgent.id === agentId) {
      setActiveAgent(prev => prev ? { ...prev, status: prev.status === 'Active' ? 'Paused' : 'Active' } : null);
    }

    const currentAgent = agents.find(a => a.id === agentId);
    if (currentAgent) {
      const newLog: AgentLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        agentId,
        agentName: currentAgent.name,
        module: 'Agents Governance',
        action: currentAgent.status === 'Active' ? 'Paused Agent Operations' : 'Resumed Agent Operations',
        targetRecord: currentAgent.name,
        result: currentAgent.status === 'Active' ? 'Scheduled queues halted safely' : 'Agent active and processing triggers',
        status: currentAgent.status === 'Active' ? 'Warning' : 'Success'
      };
      setLogs(prev => [newLog, ...prev]);
    }
  };

  const createAgent = (newAgentData: Partial<AgentRecord>) => {
    const newId = `agent-custom-${Date.now()}`;
    const newRecord: AgentRecord = {
      id: newId,
      name: newAgentData.name || 'Custom Outbound Agent',
      role: newAgentData.role || 'Autonomous Sales Operator',
      type: newAgentData.type || 'custom',
      description: newAgentData.description || 'Custom autonomous agent configured for workspace outreach.',
      avatarBg: newAgentData.avatarBg || 'bg-blue-600',
      status: 'Active',
      autonomyLevel: newAgentData.autonomyLevel || 'Approval-Required',
      assignedWorkspace: 'Primary Enterprise Workspace',
      assignedOwner: 'Asad (Growth Lead)',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      systemInstructions: newAgentData.systemInstructions || 'Analyze target accounts and perform authorized revenue operations.',
      objective: newAgentData.objective || 'Accelerate qualified pipeline creation.',
      constraints: newAgentData.constraints || 'Never contact records outside the target ICP.',
      tools: newAgentData.tools || INITIAL_TOOLS,
      triggers: newAgentData.triggers || [
        { id: `trig-${Date.now()}`, type: 'manual', label: 'Manual Trigger', config: 'Executed on demand via UI or TRIXIE AI', enabled: true }
      ],
      metrics: {
        completedTasks: 0,
        successRate: 100.0,
        avgLatencyMs: 250,
        totalActions: 0,
        creditsUsed: 0
      },
      version: 'v1.0.0',
      maxDailyActions: newAgentData.maxDailyActions || 100,
      stopOnError: newAgentData.stopOnError !== undefined ? newAgentData.stopOnError : true
    };

    setAgents(prev => [newRecord, ...prev]);
    setActiveAgent(newRecord);

    const newLog: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: newId,
      agentName: newRecord.name,
      module: 'Agent Builder',
      action: 'Created & Published New Agent',
      targetRecord: newRecord.name,
      result: `Agent published with ${newRecord.autonomyLevel} permissions`,
      status: 'Success'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const updateAgent = (agentId: string, updates: Partial<AgentRecord>) => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, ...updates, lastActive: 'Just now' } : a));
    if (activeAgent && activeAgent.id === agentId) {
      setActiveAgent(prev => prev ? { ...prev, ...updates, lastActive: 'Just now' } : null);
    }
  };

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(a => a.id !== agentId));
    if (activeAgent && activeAgent.id === agentId) {
      setActiveAgent(agents.find(a => a.id !== agentId) || null);
    }
  };

  const approveAction = (approvalId: string) => {
    const item = approvals.find(ap => ap.id === approvalId);
    if (!item) return;

    setApprovals(prev => prev.map(ap => ap.id === approvalId ? { ...ap, status: 'Approved' } : ap));
    setExecutions(prev => prev.map(ex => {
      if (ex.id === item.executionId) {
        return {
          ...ex,
          status: 'Success',
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          outputSummary: `Action approved by user. Dispatched payload to ${item.targetContact}.`
        };
      }
      return ex;
    }));

    const newLog: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: item.agentId,
      agentName: item.agentName,
      module: item.module,
      action: `Approved: ${item.actionTitle}`,
      targetRecord: item.targetContact,
      result: 'Human approval granted. Payload dispatched successfully.',
      status: 'Success'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const rejectAction = (approvalId: string) => {
    const item = approvals.find(ap => ap.id === approvalId);
    if (!item) return;

    setApprovals(prev => prev.map(ap => ap.id === approvalId ? { ...ap, status: 'Rejected' } : ap));
    setExecutions(prev => prev.map(ex => {
      if (ex.id === item.executionId) {
        return {
          ...ex,
          status: 'Failed',
          errorMessage: 'Action rejected by user during approval review.'
        };
      }
      return ex;
    }));

    const newLog: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agentId: item.agentId,
      agentName: item.agentName,
      module: item.module,
      action: `Rejected: ${item.actionTitle}`,
      targetRecord: item.targetContact,
      result: 'Action aborted by user. No outward communication sent.',
      status: 'Warning'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const testAgentRun = async (agentId: string, inputPrompt: string): Promise<AgentExecution> => {
    setIsTestingRunning(true);
    const targetAgent = agents.find(a => a.id === agentId) || agents[0];

    return new Promise((resolve) => {
      setTimeout(() => {
        const newExecution: AgentExecution = {
          id: `exec-test-${Date.now()}`,
          agentId: targetAgent.id,
          agentName: targetAgent.name,
          taskTitle: `Test Sandbox Execution: "${inputPrompt.slice(0, 45)}..."`,
          triggerSource: 'Manual Test Sandbox',
          startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          durationMs: 840,
          status: 'Success',
          toolCalls: [
            {
              toolName: '8D Lead Database Search',
              module: 'lead-finder',
              params: { query: inputPrompt, matchLimit: 5 },
              result: { matchedCount: 3, sampleContact: 'Sarah Jenkins (VP Growth @ CloudScale AI)' },
              status: 'Success',
              timestamp: 'Step 1'
            },
            {
              toolName: 'Draft Cold Email Sequences',
              module: 'email',
              params: { prompt: inputPrompt, tone: 'Professional & Direct' },
              result: { subject: 'Accelerating outbound pipeline at {{company}}', generatedVariant: 'Hi {{first_name}}, noticed your team is expanding SDR hiring...' },
              status: 'Success',
              timestamp: 'Step 2'
            }
          ],
          outputSummary: `Sandbox test completed in 840ms with 0 errors. Formatted response ready for campaign staging.`
        };

        setExecutions(prev => [newExecution, ...prev]);
        setIsTestingRunning(false);
        resolve(newExecution);
      }, 1200);
    });
  };

  return (
    <AgentsContext.Provider
      value={{
        agents,
        activeAgent,
        setActiveAgent,
        executions,
        approvals,
        tasks,
        logs,
        stats,
        selectedTab,
        setSelectedTab,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        toggleAgentStatus,
        createAgent,
        updateAgent,
        deleteAgent,
        approveAction,
        rejectAction,
        testAgentRun,
        isTestingRunning
      }}
    >
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentsProvider');
  }
  return context;
};
