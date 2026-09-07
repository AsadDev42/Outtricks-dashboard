import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

export type WorkflowStatus = 'Active' | 'Draft' | 'Paused';

export type NodeType = 'trigger' | 'action' | 'condition' | 'variable' | 'data' | 'integration' | 'delay';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  channel: string;
  iconName: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  status?: 'idle' | 'running' | 'success' | 'failed';
  nextNodes?: string[];
  falseNodes?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  category: 'Cold Outbound' | 'Speed-to-Lead' | 'Deal Nurture' | 'Re-Engagement' | 'Upwork Auto-Bid';
  triggerType: string;
  nodesCount: number;
  lastRun: string;
  nextRun: string;
  totalRuns: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
  nodes: WorkflowNode[];
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  stepsSummary: string;
  integrations: string[];
  usageCount: number;
  metric: string;
  badge?: string;
  defaultNodes: WorkflowNode[];
}

export interface WorkflowRun {
  id: string;
  runId: string;
  workflowId: string;
  workflowName: string;
  status: 'Success' | 'Running' | 'Failed';
  trigger: string;
  startedAt: string;
  completedAt?: string;
  duration: string;
  stepsCount: number;
  outputSummary: string;
  errorMessage?: string;
  failedStepId?: string;
}

export interface WorkflowSchedule {
  id: string;
  workflowId: string;
  workflowName: string;
  schedulePattern: string; // e.g. "Every 30 mins", "Daily at 09:00 EST"
  timezone: string;
  status: 'Active' | 'Paused';
  frequency: string;
  previousRun: string;
  nextRun: string;
}

export interface WorkflowTrigger {
  id: string;
  name: string;
  source: string;
  category: string;
  description: string;
  activeCount: number;
  conditionsCount: number;
  samplePayload: string;
}

export interface WorkflowAction {
  id: string;
  name: string;
  module: string;
  category: string;
  description: string;
  parameters: { key: string; label: string; type: string; defaultValue?: string }[];
}

export interface WorkflowCondition {
  id: string;
  name: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'is_true' | 'in_list';
  value: string;
  category: string;
}

export interface WorkflowVariable {
  id: string;
  name: string;
  key: string;
  type: 'system' | 'custom' | 'lead' | 'company' | 'deal';
  sampleValue: string;
  description: string;
}

export interface WorkflowIntegration {
  id: string;
  name: string;
  service: string;
  status: 'Connected' | 'Ready' | 'Config Required';
  account: string;
  triggersCount: number;
  actionsCount: number;
  authType: 'OAuth 2.0' | 'API Key' | 'WebRTC' | 'Residential 4G Proxy';
  lastPing: string;
}

export interface WorkflowHistoryEvent {
  id: string;
  workflowId: string;
  workflowName: string;
  event: string;
  actor: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Info';
  details: string;
}

export interface WorkflowLog {
  id: string;
  runId: string;
  workflowName: string;
  stepName: string;
  channel: string;
  timestamp: string;
  status: 'Success' | 'Running' | 'Failed';
  duration: string;
  inputData: string;
  outputData: string;
  error?: string;
}

export interface SavedComponent {
  id: string;
  name: string;
  type: NodeType;
  category: string;
  description: string;
  usageCount: number;
  nodeBlueprint: Partial<WorkflowNode>;
}

export type WorkflowsSubTab = 
  | 'overview'
  | 'visual-flows' 
  | 'templates' 
  | 'runs' 
  | 'schedules' 
  | 'triggers'
  | 'actions' 
  | 'conditions' 
  | 'variables' 
  | 'data' 
  | 'integrations'
  | 'history' 
  | 'logs' 
  | 'failed-runs' 
  | 'saved-components'
  | 'builder';

interface WorkflowsContextType {
  activeTab: WorkflowsSubTab;
  setActiveTab: (tab: WorkflowsSubTab) => void;
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  setActiveWorkflow: (wf: Workflow | null) => void;
  templates: WorkflowTemplate[];
  runs: WorkflowRun[];
  schedules: WorkflowSchedule[];
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  conditions: WorkflowCondition[];
  variables: WorkflowVariable[];
  integrations: WorkflowIntegration[];
  history: WorkflowHistoryEvent[];
  logs: WorkflowLog[];
  savedComponents: SavedComponent[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  
  // Actions
  toggleWorkflowStatus: (id: string) => void;
  duplicateWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  runWorkflowNow: (id: string) => void;
  createWorkflowFromTemplate: (templateId: string) => void;
  retryFailedRun: (runId: string) => void;
  toggleSchedule: (id: string) => void;
  addWorkflowNode: (workflowId: string, node: WorkflowNode) => void;
  updateWorkflowNode: (workflowId: string, nodeId: string, updates: Partial<WorkflowNode>) => void;
  removeWorkflowNode: (workflowId: string, nodeId: string) => void;
  createCustomVariable: (key: string, name: string, sampleValue: string, description: string) => void;
  createCustomWorkflow: (name: string, description: string, category: any) => void;
}

const WorkflowsContext = createContext<WorkflowsContextType | undefined>(undefined);

const INITIAL_NODES_1: WorkflowNode[] = [
  {
    id: 'node-1',
    type: 'trigger',
    title: 'New Lead Discovered',
    subtitle: 'Lead Finder ICP Match (VP Product)',
    channel: 'Lead Finder',
    iconName: 'Search',
    config: { filter: 'VP of Product, FinTech $10M-$50M' },
    position: { x: 50, y: 120 },
    nextNodes: ['node-2']
  },
  {
    id: 'node-2',
    type: 'data',
    title: 'CRM Lead Sync',
    subtitle: '15-Provider Verification',
    channel: 'Lead Finder Data',
    iconName: 'Database',
    config: { providers: 15, directDial: true, verifyMx: true },
    position: { x: 320, y: 120 },
    nextNodes: ['node-3']
  },
  {
    id: 'node-3',
    type: 'action',
    title: 'Send Cold Email',
    subtitle: 'Rotate Mailbox Pool (3-touch spintax)',
    channel: 'Cold Email',
    iconName: 'Mail',
    config: { templateId: 'saas-pitch-v2', delaySeconds: 60 },
    position: { x: 590, y: 120 },
    nextNodes: ['node-4']
  },
  {
    id: 'node-4',
    type: 'condition',
    title: 'Email Replied in 48h?',
    subtitle: 'Check Sentiment (Interested)',
    channel: 'Logic',
    iconName: 'GitBranch',
    config: { timeoutHours: 48, condition: 'reply_received == true' },
    position: { x: 860, y: 120 },
    nextNodes: ['node-6'],
    falseNodes: ['node-5']
  },
  {
    id: 'node-5',
    type: 'action',
    title: 'LinkedIn Safe Touch',
    subtitle: 'Profile View & Connection Note',
    channel: 'LinkedIn API',
    iconName: 'Linkedin',
    config: { proxy: 'Residential 4G', customNote: true },
    position: { x: 860, y: 320 },
    nextNodes: ['node-6']
  },
  {
    id: 'node-6',
    type: 'action',
    title: 'Deals CRM Opportunity',
    subtitle: 'Create $48,000 Deal & Assign AE',
    channel: 'Deals CRM',
    iconName: 'Building2',
    config: { stage: 'Qualified', defaultArr: 48000 },
    position: { x: 1130, y: 120 },
  }
];

const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-01',
    name: '3-Channel Enterprise Outbound Engine',
    description: 'Autonomous orchestrator connecting Lead Finder, Cold Email, LinkedIn DMs, and CRM.',
    status: 'Active',
    category: 'Cold Outbound',
    triggerType: 'Lead Finder ICP Match (VP / Director)',
    nodesCount: 6,
    lastRun: '12 mins ago',
    nextRun: 'In 18 mins',
    totalRuns: 3420,
    successRate: 99.4,
    createdAt: '2026-08-10',
    updatedAt: '2026-08-27',
    nodes: INITIAL_NODES_1
  },
  {
    id: 'wf-02',
    name: 'Speed-to-Lead Inbound Lightning Call',
    description: 'Triggers sub-400ms Voice AI SDR qualifying call within 60s of website form demo submission.',
    status: 'Active',
    category: 'Speed-to-Lead',
    triggerType: 'Inbound Form Submit (Cal.com / Webhook)',
    nodesCount: 4,
    lastRun: '2 hours ago',
    nextRun: 'Event Triggered',
    totalRuns: 1180,
    successRate: 98.9,
    createdAt: '2026-08-14',
    updatedAt: '2026-08-26',
    nodes: INITIAL_NODES_1.slice(0, 4)
  },
  {
    id: 'wf-03',
    name: 'Upwork RSS High-Budget Auto-Bidder',
    description: 'Scrapes fresh >$10k Upwork postings, drafts custom AI proposals, and alerts AE in Master Inbox.',
    status: 'Active',
    category: 'Upwork Auto-Bid',
    triggerType: 'Upwork RSS Match (>95% Match Score)',
    nodesCount: 5,
    lastRun: '4 mins ago',
    nextRun: 'In 6 mins',
    totalRuns: 890,
    successRate: 100.0,
    createdAt: '2026-08-18',
    updatedAt: '2026-08-27',
    nodes: INITIAL_NODES_1.slice(0, 5)
  },
  {
    id: 'wf-04',
    name: 'Closed-Lost 60-Day Opportunity Winback',
    description: 'Monitors LinkedIn job changes on stalled CRM accounts and triggers re-engagement email sequence.',
    status: 'Paused',
    category: 'Re-Engagement',
    triggerType: 'Job Change Signal / 60-Day Inactive',
    nodesCount: 5,
    lastRun: 'Yesterday',
    nextRun: 'Paused',
    totalRuns: 450,
    successRate: 97.2,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-20',
    nodes: INITIAL_NODES_1.slice(0, 5)
  }
];

const INITIAL_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'tmpl-sprint',
    title: 'The Omnichannel Outbound Sprint',
    category: 'Cold Outbound',
    description: 'Synchronized cold email, LinkedIn safe profile engagement, and sub-400ms Voice AI SDR qualification.',
    stepsSummary: 'Lead Finder → Cold Email → LinkedIn → Voice AI → Deals CRM',
    integrations: ['Google Workspace', 'LinkedIn API', 'WebRTC Voice', 'Deals CRM'],
    usageCount: 1420,
    metric: '18.4% Reply Rate',
    badge: 'Recommended',
    defaultNodes: INITIAL_NODES_1
  },
  {
    id: 'tmpl-inbound',
    title: 'Sub-60s Inbound Demo Responder',
    category: 'Speed-to-Lead',
    description: 'Instant lead routing on form submissions followed by sub-400ms Voice AI SDR phone outreach.',
    stepsSummary: 'Webhook → Lead Ingestion → Voice AI Call → Google Meet Booking',
    integrations: ['Webhooks', 'Lead Finder', 'Voice AI Engine', 'Calendar'],
    usageCount: 980,
    metric: '< 60s Speed to Lead',
    badge: 'High Conversion',
    defaultNodes: INITIAL_NODES_1.slice(0, 4)
  },
  {
    id: 'tmpl-upwork',
    title: 'Upwork Autonomous RSS Bidding Engine',
    category: 'Freelance & Agency',
    description: 'Real-time RSS job monitoring with AI cover letter generation and automated proposal dispatch.',
    stepsSummary: 'RSS Stream → Semantic Match → AI Cover Letter → Proposal Submit → Master Inbox',
    integrations: ['Upwork GraphQL', 'AI Logic', 'Master Inbox'],
    usageCount: 650,
    metric: '66.7% Interview Rate',
    badge: 'Agency Favorite',
    defaultNodes: INITIAL_NODES_1.slice(0, 5)
  },
  {
    id: 'tmpl-nurture',
    title: 'High-Value Account Executive Escalation',
    category: 'Deal Nurture',
    description: 'When prospect opens email 3+ times or visits pricing page, alerts assigned AE via Slack and triggers call.',
    stepsSummary: 'Email Open 3x → Web Visit → Slack Alert → Voice SDR Warm Transfer',
    integrations: ['Email Tracking', 'Slack', 'Voice AI Engine'],
    usageCount: 820,
    metric: '3.2x Meeting Velocity',
    defaultNodes: INITIAL_NODES_1.slice(0, 4)
  }
];

const INITIAL_RUNS: WorkflowRun[] = [
  {
    id: 'run-101',
    runId: 'RUN-94821',
    workflowId: 'wf-01',
    workflowName: '3-Channel Enterprise Outbound Engine',
    status: 'Success',
    trigger: 'New ICP Lead: Elena Rostova (VP Product @ FinTech)',
    startedAt: '12:20:10 PM',
    completedAt: '12:20:14 PM',
    duration: '4.2s',
    stepsCount: 6,
    outputSummary: 'Dispatched Cold Email Step 1 from mailbox-04 (SPF/DKIM 100% verified).'
  },
  {
    id: 'run-102',
    runId: 'RUN-94820',
    workflowId: 'wf-03',
    workflowName: 'Upwork RSS High-Budget Auto-Bidder',
    status: 'Success',
    trigger: 'RSS Post: Next.js + Voice AI Architecture ($140/hr)',
    startedAt: '12:16:02 PM',
    completedAt: '12:16:05 PM',
    duration: '3.1s',
    stepsCount: 5,
    outputSummary: 'Generated 98% match proposal & alerted sales team in Master Inbox.'
  },
  {
    id: 'run-103',
    runId: 'RUN-94819',
    workflowId: 'wf-02',
    workflowName: 'Speed-to-Lead Inbound Lightning Call',
    status: 'Success',
    trigger: 'Website Demo Request: Thomas Sterling (ScaleOps)',
    startedAt: '11:45:00 AM',
    completedAt: '11:46:15 AM',
    duration: '75.0s',
    stepsCount: 4,
    outputSummary: 'Voice AI SDR Sophia completed 1m 15s qualifying call. Demo confirmed.'
  },
  {
    id: 'run-104',
    runId: 'RUN-94818',
    workflowId: 'wf-01',
    workflowName: '3-Channel Enterprise Outbound Engine',
    status: 'Failed',
    trigger: 'New ICP Lead: David Kim (CloudTech)',
    startedAt: '10:30:15 AM',
    completedAt: '10:30:17 AM',
    duration: '2.1s',
    stepsCount: 2,
    outputSummary: 'Delivery skipped on catch-all domain mail exchanger.',
    errorMessage: 'Domain catch-all MX failed strict deliverability threshold (score < 90%).',
    failedStepId: 'node-2'
  }
];

const INITIAL_SCHEDULES: WorkflowSchedule[] = [
  {
    id: 'sch-01',
    workflowId: 'wf-01',
    workflowName: '3-Channel Enterprise Outbound Engine',
    schedulePattern: 'Every 30 Minutes',
    timezone: 'America/New_York (EST)',
    status: 'Active',
    frequency: '*/30 * * * *',
    previousRun: '12:00 PM EST',
    nextRun: '12:30 PM EST'
  },
  {
    id: 'sch-02',
    workflowId: 'wf-03',
    workflowName: 'Upwork RSS High-Budget Auto-Bidder',
    schedulePattern: 'Every 5 Minutes (Real-Time RSS)',
    timezone: 'America/New_York (EST)',
    status: 'Active',
    frequency: '*/5 * * * *',
    previousRun: '12:20 PM EST',
    nextRun: '12:25 PM EST'
  },
  {
    id: 'sch-03',
    workflowId: 'wf-04',
    workflowName: 'Closed-Lost 60-Day Opportunity Winback',
    schedulePattern: 'Daily at 08:00 AM',
    timezone: 'America/New_York (EST)',
    status: 'Paused',
    frequency: '0 8 * * *',
    previousRun: 'Yesterday 08:00 AM',
    nextRun: 'Paused'
  }
];

const INITIAL_TRIGGERS: WorkflowTrigger[] = [
  {
    id: 'trig-01',
    name: 'New Lead Discovered',
    source: 'Lead Finder / Database',
    category: 'Prospecting',
    description: 'Triggers when a prospect passes 15-provider email & direct dial verification with >99% deliverability.',
    activeCount: 14,
    conditionsCount: 5,
    samplePayload: '{"leadId": "lead_99", "email": "elena@fintech.io", "phone": "+14158924910", "score": 99.4}'
  },
  {
    id: 'trig-02',
    name: 'Email Opened 2x Without Reply',
    source: 'Cold Email Multi-Inbox',
    category: 'Engagement',
    description: 'Fires when recipient opens cold email twice within 48 hours without sending a reply.',
    activeCount: 9,
    conditionsCount: 3,
    samplePayload: '{"campaignId": "camp_01", "leadId": "lead_99", "openCount": 2, "hoursElapsed": 48}'
  },
  {
    id: 'trig-03',
    name: 'LinkedIn Connection Request Accepted',
    source: 'LinkedIn Safe Cloud',
    category: 'Social',
    description: 'Listens for profile connection confirmation via 4G residential proxy.',
    activeCount: 12,
    conditionsCount: 2,
    samplePayload: '{"profileUrl": "linkedin.com/in/elena-rostova", "status": "CONNECTED"}'
  },
  {
    id: 'trig-04',
    name: 'Voice AI Call Completed (Interested)',
    source: 'Voice AI Engine',
    category: 'Conversational',
    description: 'Triggers when autonomous Voice SDR scores call disposition as Interested or Meeting Booked.',
    activeCount: 8,
    conditionsCount: 4,
    samplePayload: '{"callId": "call_482", "duration": 82, "sentiment": "INTERESTED", "demoBooked": true}'
  },
  {
    id: 'trig-05',
    name: 'Upwork RSS Job Published',
    source: 'Upwork GraphQL Stream',
    category: 'Freelance',
    description: 'Real-time alert when new job matches keyword filters and hourly rate >= $80/hr.',
    activeCount: 6,
    conditionsCount: 3,
    samplePayload: '{"jobId": "upwork_88", "budget": 140, "matchScore": 98.4}'
  },
  {
    id: 'trig-06',
    name: 'Webhook Event Ingested',
    source: 'Custom REST API',
    category: 'System',
    description: 'Evaluates incoming JSON payloads dispatched to `/v1/workflows/trigger` endpoint.',
    activeCount: 18,
    conditionsCount: 6,
    samplePayload: '{"event": "signup_completed", "company": "Acme Inc", "tier": "Enterprise"}'
  }
];

const INITIAL_ACTIONS: WorkflowAction[] = [
  {
    id: 'act-01',
    name: 'Dispatch Cold Email',
    module: 'Cold Email',
    category: 'Outbound',
    description: 'Sends personalized email step from rotating pool with custom AI spintax.',
    parameters: [
      { key: 'templateId', label: 'Email Template', type: 'select', defaultValue: 'saas-pitch-v2' },
      { key: 'delayMinutes', label: 'Humanized Jitter Delay', type: 'number', defaultValue: '45' }
    ]
  },
  {
    id: 'act-02',
    name: 'Send LinkedIn Safe InMail / Invite',
    module: 'LinkedIn API',
    category: 'Social',
    description: 'Dispatches connection note or Direct Message using assigned residential IP.',
    parameters: [
      { key: 'message', label: 'Connection Note Copy', type: 'textarea', defaultValue: 'Hi {{firstName}}, saw your work at {{company}}!' }
    ]
  },
  {
    id: 'act-03',
    name: 'Initiate Voice AI SDR Call',
    module: 'Voice AI',
    category: 'Calling',
    description: 'Triggers conversational sub-400ms WebRTC voice dialer using selected AI agent.',
    parameters: [
      { key: 'agentId', label: 'Voice SDR Persona', type: 'select', defaultValue: 'sophia-enterprise' },
      { key: 'maxDuration', label: 'Max Call Duration (s)', type: 'number', defaultValue: '300' }
    ]
  },
  {
    id: 'act-04',
    name: 'Create / Advance CRM Deal',
    module: 'Deals CRM',
    category: 'CRM',
    description: 'Creates opportunity in Deals CRM pipeline and synchronizes stage to PostgreSQL.',
    parameters: [
      { key: 'pipelineStage', label: 'Stage', type: 'select', defaultValue: 'Discovery' },
      { key: 'dealValue', label: 'ARR Value ($)', type: 'number', defaultValue: '48000' }
    ]
  },
  {
    id: 'act-05',
    name: 'Submit Upwork AI Proposal',
    module: 'Upwork Studio',
    category: 'Freelance',
    description: 'Generates tailored cover letter and submits proposal with configured rate.',
    parameters: [
      { key: 'bidRate', label: 'Bid Price ($)', type: 'text', defaultValue: '$125.00/hr' }
    ]
  },
  {
    id: 'act-06',
    name: 'Dispatch Master Inbox Alert',
    module: 'Master Inbox',
    category: 'Team Ops',
    description: 'Pins message to Master Inbox with priority flame badge and Slack ping.',
    parameters: [
      { key: 'label', label: 'Inbox Label', type: 'text', defaultValue: 'Hot Lead' }
    ]
  }
];

const INITIAL_CONDITIONS: WorkflowCondition[] = [
  { id: 'cond-01', name: 'Email Sentiment Is Interested', field: 'email.sentiment', operator: 'equals', value: 'Interested', category: 'Email' },
  { id: 'cond-02', name: 'Opportunity Value >= $25,000', field: 'deal.arr', operator: 'greater_than', value: '25000', category: 'Deals CRM' },
  { id: 'cond-03', name: 'Company Headcount > 50', field: 'company.employees', operator: 'greater_than', value: '50', category: 'Firmographics' },
  { id: 'cond-04', name: 'Tech Stack Contains React/Next.js', field: 'company.technologies', operator: 'contains', value: 'Next.js', category: 'Technographics' },
  { id: 'cond-05', name: 'Upwork Match Score >= 95%', field: 'job.match_score', operator: 'greater_than', value: '95', category: 'Upwork' }
];

const INITIAL_VARIABLES: WorkflowVariable[] = [
  { id: 'var-01', name: 'Lead Email', key: '{{lead.email}}', type: 'lead', sampleValue: 'elena@fintech.io', description: 'Primary verified work email' },
  { id: 'var-02', name: 'Lead First Name', key: '{{lead.first_name}}', type: 'lead', sampleValue: 'Elena', description: 'Contact given name' },
  { id: 'var-03', name: 'Company Name', key: '{{company.name}}', type: 'company', sampleValue: 'ScaleOps FinTech', description: 'Normalized legal entity' },
  { id: 'var-04', name: 'Company Domain', key: '{{company.domain}}', type: 'company', sampleValue: 'scaleops.io', description: 'Root corporate web domain' },
  { id: 'var-05', name: 'Deal Opportunity ARR', key: '{{deal.arr}}', type: 'deal', sampleValue: '$48,000', description: 'Calculated CRM annual contract' },
  { id: 'var-06', name: 'Workflow Run ID', key: '{{system.run_id}}', type: 'system', sampleValue: 'RUN-94821', description: 'Unique execution identifier' }
];

const INITIAL_INTEGRATIONS: WorkflowIntegration[] = [
  { id: 'int-01', name: 'Google Workspace Mailbox Pool', service: 'Email', status: 'Connected', account: '12 Active Domains (100% SPF/DKIM)', triggersCount: 4, actionsCount: 2, authType: 'OAuth 2.0', lastPing: 'Just now' },
  { id: 'int-02', name: 'Microsoft 365 Exchange Relay', service: 'Email', status: 'Connected', account: '8 Active Sender Mailboxes', triggersCount: 4, actionsCount: 2, authType: 'OAuth 2.0', lastPing: '1 min ago' },
  { id: 'int-03', name: 'LinkedIn Safe Cloud Session', service: 'LinkedIn', status: 'Connected', account: '4G Residential Static Proxy #US-East-1', triggersCount: 3, actionsCount: 3, authType: 'Residential 4G Proxy', lastPing: 'Just now' },
  { id: 'int-04', name: 'WebRTC Conversational Voice Engine', service: 'Voice AI', status: 'Connected', account: 'Sophia / Maya / Liam Dialing Clusters', triggersCount: 3, actionsCount: 2, authType: 'WebRTC', lastPing: 'Just now' },
  { id: 'int-05', name: 'Upwork Official API Gateway', service: 'Upwork', status: 'Connected', account: 'Agency Profile (100% JSS Top Rated Plus)', triggersCount: 2, actionsCount: 2, authType: 'OAuth 2.0', lastPing: '2 mins ago' },
  { id: 'int-06', name: 'Enterprise PostgreSQL Core', service: 'Database', status: 'Connected', account: 'Single Source of Truth (0ms Sync Drift)', triggersCount: 6, actionsCount: 5, authType: 'API Key', lastPing: 'Just now' }
];

const INITIAL_HISTORY: WorkflowHistoryEvent[] = [
  { id: 'hist-01', workflowId: 'wf-01', workflowName: '3-Channel Enterprise Outbound Engine', event: 'Workflow Triggered by Lead Finder', actor: 'Automated ICP Scraper', timestamp: '12:20 PM', status: 'Success', details: 'Enrolled Elena Rostova into multi-inbox rotation.' },
  { id: 'hist-02', workflowId: 'wf-03', workflowName: 'Upwork RSS High-Budget Auto-Bidder', event: 'Auto-Bid Proposal Dispatched', actor: 'Upwork Bidder Agent', timestamp: '12:16 PM', status: 'Success', details: 'Applied to Next.js + Voice AI Architecture ($140/hr).' },
  { id: 'hist-03', workflowId: 'wf-02', workflowName: 'Speed-to-Lead Inbound Lightning Call', event: 'Voice AI Demo Booked', actor: 'Voice SDR Sophia', timestamp: '11:46 AM', status: 'Success', details: 'Confirmed Google Meet invite for Thursday 2 PM EST.' },
  { id: 'hist-04', workflowId: 'wf-01', workflowName: '3-Channel Enterprise Outbound Engine', event: 'Workflow Step Failed', actor: 'Lead Data Engine', timestamp: '10:30 AM', status: 'Warning', details: 'Catch-all MX deliverability score below 90% threshold.' }
];

const INITIAL_LOGS: WorkflowLog[] = [
  { id: 'log-01', runId: 'RUN-94821', workflowName: '3-Channel Enterprise Outbound Engine', stepName: '01. Lead Found', channel: 'Lead Finder', timestamp: '12:20:10 PM', status: 'Success', duration: '120ms', inputData: '{"title": "VP Product", "tech": "FinTech"}', outputData: '{"leadId": "lead_99", "name": "Elena Rostova"}' },
  { id: 'log-02', runId: 'RUN-94821', workflowName: '3-Channel Enterprise Outbound Engine', stepName: '02. Lead Ingestion', channel: 'Lead Finder Data', timestamp: '12:20:11 PM', status: 'Success', duration: '840ms', inputData: '{"domain": "fintech.io"}', outputData: '{"email": "elena@fintech.io", "deliverability": 99.4}' },
  { id: 'log-03', runId: 'RUN-94821', workflowName: '3-Channel Enterprise Outbound Engine', stepName: '03. Cold Email', channel: 'Cold Email', timestamp: '12:20:14 PM', status: 'Success', duration: '320ms', inputData: '{"mailbox": "mailbox-04", "spintax": true}', outputData: '{"messageId": "msg_9941", "status": "DISPATCHED"}' }
];

const INITIAL_SAVED_COMPONENTS: SavedComponent[] = [
  { id: 'comp-01', name: 'Lead Data Formatting Block', type: 'data', category: 'Data Ingestion', description: 'Contact property mapping and formatting block with fail-safe error handling.', usageCount: 8, nodeBlueprint: { title: 'Lead Formatting Block', channel: 'Lead Finder Data', iconName: 'Database' } },
  { id: 'comp-02', name: 'Voice AI SDR Qualification Step', type: 'action', category: 'Voice AI', description: 'Sub-400ms conversational phone call block with CRM booking handler.', usageCount: 5, nodeBlueprint: { title: 'Voice AI SDR Call', channel: 'Voice AI', iconName: 'PhoneCall' } },
  { id: 'comp-03', name: '48-Hour Email Sentiment Splitter', type: 'condition', category: 'Logic', description: 'Branches execution based on prospect reply sentiment (Interested vs Unsubscribe vs No-Reply).', usageCount: 12, nodeBlueprint: { title: 'Sentiment Branch', channel: 'Logic', iconName: 'GitBranch' } }
];

export const WorkflowsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<WorkflowsSubTab>('visual-flows');
  const [workflows, setWorkflows] = useState<Workflow[]>(INITIAL_WORKFLOWS);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(INITIAL_WORKFLOWS[0]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>(INITIAL_TEMPLATES);
  const [runs, setRuns] = useState<WorkflowRun[]>(INITIAL_RUNS);
  const [schedules, setSchedules] = useState<WorkflowSchedule[]>(INITIAL_SCHEDULES);
  const [triggers, setTriggers] = useState<WorkflowTrigger[]>(INITIAL_TRIGGERS);
  const [actions, setActions] = useState<WorkflowAction[]>(INITIAL_ACTIONS);
  const [conditions, setConditions] = useState<WorkflowCondition[]>(INITIAL_CONDITIONS);
  const [variables, setVariables] = useState<WorkflowVariable[]>(INITIAL_VARIABLES);
  const [integrations, setIntegrations] = useState<WorkflowIntegration[]>(INITIAL_INTEGRATIONS);
  const [history, setHistory] = useState<WorkflowHistoryEvent[]>(INITIAL_HISTORY);
  const [logs, setLogs] = useState<WorkflowLog[]>(INITIAL_LOGS);
  const [savedComponents, setSavedComponents] = useState<SavedComponent[]>(INITIAL_SAVED_COMPONENTS);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { success, error, info } = useToast();

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === id) {
        const nextStatus: WorkflowStatus = wf.status === 'Active' ? 'Paused' : 'Active';
        success(`Workflow "${wf.name}" is now ${nextStatus}`, 'Status Updated');
        return { ...wf, status: nextStatus };
      }
      return wf;
    }));
  };

  const duplicateWorkflow = (id: string) => {
    const target = workflows.find(w => w.id === id);
    if (!target) return;

    const newWf: Workflow = {
      ...target,
      id: `wf-${Date.now()}`,
      name: `${target.name} (Copy)`,
      status: 'Draft',
      totalRuns: 0,
      lastRun: 'Never',
      nextRun: 'Not Scheduled',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setWorkflows(prev => [newWf, ...prev]);
    success(`Workflow cloned as "${newWf.name}"`, 'Cloned');
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
    if (activeWorkflow?.id === id) {
      setActiveWorkflow(workflows.find(w => w.id !== id) || null);
    }
    info('Workflow removed from canvas', 'Deleted');
  };

  const runWorkflowNow = (id: string) => {
    const wf = workflows.find(w => w.id === id);
    if (!wf) return;

    const newRun: WorkflowRun = {
      id: `run-${Date.now()}`,
      runId: `RUN-${Math.floor(10000 + Math.random() * 90000)}`,
      workflowId: wf.id,
      workflowName: wf.name,
      status: 'Success',
      trigger: 'Manual Immediate Execution',
      startedAt: new Date().toLocaleTimeString(),
      completedAt: new Date().toLocaleTimeString(),
      duration: '3.8s',
      stepsCount: wf.nodesCount,
      outputSummary: `All ${wf.nodesCount} DAG nodes executed with 0 errors across active integrations.`
    };

    setRuns(prev => [newRun, ...prev]);
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, lastRun: 'Just now', totalRuns: w.totalRuns + 1 } : w));
    success(`Workflow "${wf.name}" executed successfully (${newRun.runId})!`, 'Execution Succeeded');
  };

  const createWorkflowFromTemplate = (templateId: string) => {
    const tmpl = templates.find(t => t.id === templateId);
    if (!tmpl) return;

    const newWf: Workflow = {
      id: `wf-${Date.now()}`,
      name: tmpl.title,
      description: tmpl.description,
      status: 'Active',
      category: tmpl.category as any || 'Cold Outbound',
      triggerType: 'Template Default Trigger',
      nodesCount: tmpl.defaultNodes.length,
      lastRun: 'Never',
      nextRun: 'Scheduled',
      totalRuns: 0,
      successRate: 100.0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      nodes: tmpl.defaultNodes
    };

    setWorkflows(prev => [newWf, ...prev]);
    setActiveWorkflow(newWf);
    setActiveTab('builder');
    success(`Created visual workflow from template "${tmpl.title}"!`, 'Template Cloned');
  };

  const retryFailedRun = (runId: string) => {
    setRuns(prev => prev.map(r => {
      if (r.runId === runId) {
        success(`Retrying run ${runId}... Step executed successfully!`, 'Run Resolved');
        return {
          ...r,
          status: 'Success',
          errorMessage: undefined,
          failedStepId: undefined,
          completedAt: new Date().toLocaleTimeString(),
          outputSummary: 'Step re-executed with strict deliverability override. 100% Passed.'
        };
      }
      return r;
    }));
  };

  const toggleSchedule = (id: string) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
        success(`Schedule "${s.workflowName}" is now ${nextStatus}`, 'Schedule Updated');
        return { ...s, status: nextStatus, nextRun: nextStatus === 'Active' ? 'In 30 mins' : 'Paused' };
      }
      return s;
    }));
  };

  const addWorkflowNode = (workflowId: string, node: WorkflowNode) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === workflowId) {
        const updatedNodes = [...wf.nodes, node];
        return { ...wf, nodes: updatedNodes, nodesCount: updatedNodes.length, updatedAt: 'Just now' };
      }
      return wf;
    }));
    if (activeWorkflow?.id === workflowId) {
      setActiveWorkflow(prev => prev ? { ...prev, nodes: [...prev.nodes, node], nodesCount: prev.nodes.length + 1 } : null);
    }
    success(`Added node "${node.title}" to DAG flow canvas`, 'Node Added');
  };

  const updateWorkflowNode = (workflowId: string, nodeId: string, updates: Partial<WorkflowNode>) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === workflowId) {
        const updatedNodes = wf.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n);
        return { ...wf, nodes: updatedNodes, updatedAt: 'Just now' };
      }
      return wf;
    }));
    if (activeWorkflow?.id === workflowId) {
      setActiveWorkflow(prev => prev ? { ...prev, nodes: prev.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n) } : null);
    }
  };

  const removeWorkflowNode = (workflowId: string, nodeId: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === workflowId) {
        const updatedNodes = wf.nodes.filter(n => n.id !== nodeId);
        return { ...wf, nodes: updatedNodes, nodesCount: updatedNodes.length, updatedAt: 'Just now' };
      }
      return wf;
    }));
    if (activeWorkflow?.id === workflowId) {
      setActiveWorkflow(prev => prev ? { ...prev, nodes: prev.nodes.filter(n => n.id !== nodeId), nodesCount: prev.nodes.length - 1 } : null);
    }
    info('Node removed from DAG sequence', 'Node Removed');
  };

  const createCustomVariable = (key: string, name: string, sampleValue: string, description: string) => {
    const newVar: WorkflowVariable = {
      id: `var-${Date.now()}`,
      name,
      key,
      type: 'custom',
      sampleValue,
      description
    };
    setVariables(prev => [...prev, newVar]);
    success(`Variable ${key} created and available across all flows`, 'Variable Created');
  };

  const createCustomWorkflow = (name: string, description: string, category: any) => {
    const newWf: Workflow = {
      id: `wf-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      status: 'Active',
      category: category || 'Cold Outbound',
      triggerType: 'Manual Trigger',
      nodesCount: 3,
      lastRun: 'Never',
      nextRun: 'Ready',
      totalRuns: 0,
      successRate: 100.0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      nodes: INITIAL_NODES_1.slice(0, 3)
    };
    setWorkflows(prev => [newWf, ...prev]);
    setActiveWorkflow(newWf);
    setActiveTab('builder');
    success(`Workflow "${newWf.name}" created! Ready to customize in canvas.`, 'Workflow Created');
  };

  return (
    <WorkflowsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        workflows,
        activeWorkflow,
        setActiveWorkflow,
        templates,
        runs,
        schedules,
        triggers,
        actions,
        conditions,
        variables,
        integrations,
        history,
        logs,
        savedComponents,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        toggleWorkflowStatus,
        duplicateWorkflow,
        deleteWorkflow,
        runWorkflowNow,
        createWorkflowFromTemplate,
        retryFailedRun,
        toggleSchedule,
        addWorkflowNode,
        updateWorkflowNode,
        removeWorkflowNode,
        createCustomVariable,
        createCustomWorkflow
      }}
    >
      {children}
    </WorkflowsContext.Provider>
  );
};

export const useWorkflows = () => {
  const context = useContext(WorkflowsContext);
  if (!context) {
    throw new Error('useWorkflows must be used within a WorkflowsProvider');
  }
  return context;
};
