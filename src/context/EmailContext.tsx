import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';

export type CampaignStatus = 'Draft' | 'Scheduled' | 'Running' | 'Paused' | 'Completed';
export type MailboxStatus = 'Ready' | 'Warming' | 'Paused' | 'Action Needed' | 'Disconnected' | 'Optimal';

export type EmailSubTab = 
  | 'overview'
  | 'campaigns' 
  | 'sequences' 
  | 'templates' 
  | 'leads' 
  | 'ab-testing' 
  | 'mailboxes' 
  | 'inboxes' 
  | 'domains' 
  | 'warmup' 
  | 'suppression' 
  | 'analytics';

export interface SequenceVariantItem {
  id: string;
  label: string; // 'A', 'B', 'C', ... 'Z'
  subject: string;
  body: string;
  weight?: number; // 0-100 distribution
  status?: 'active' | 'paused';
  sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  replied?: number;
  positiveReplies?: number;
  meetings?: number;
  bounces?: number;
  unsubscribes?: number;
}

export interface SequenceStep {
  id: string;
  stepNumber: number;
  type: 'email' | 'delay';
  delayDays?: number;
  delayValue?: number;
  delayUnit?: 'minutes' | 'hours' | 'days';
  threadMode?: 'continue' | 'new';
  subject?: string;
  body?: string;
  variants?: SequenceVariantItem[];
  activeVariantId?: string;
}

export interface CampaignSubsequence {
  id: string;
  name: string;
  trigger: 'Positive Reply' | 'Meeting Booked' | 'Out of Office' | 'Wrong Person' | 'Not Interested' | 'Keyword Reply' | 'Lead Status Changed' | 'Manual';
  triggerDetail?: string;
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  inheritSettings: boolean;
  delayHours: number;
  steps: SequenceStep[];
  enrolledCount: number;
  repliedCount: number;
}

export interface ScheduleWindow {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  status: CampaignStatus;
  audienceCount: number;
  mailboxesCount: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  interested: number;
  meetings: number;
  createdAt: string;
  lastActivity: string;
  tags: string[];

  // Professional cold email properties
  targetPersona?: string;
  description?: string;
  selectedMailboxIds?: string[];
  mailboxIds?: string[];
  rotationMode?: 'balanced' | 'health-aware' | 'randomized';
  providerMatching?: 'prefer' | 'enforce' | 'disabled';
  espRoutingMatrix?: {
    google: 'prefer' | 'allow' | 'avoid';
    microsoft: 'prefer' | 'allow' | 'avoid';
    custom: 'prefer' | 'allow' | 'avoid';
  };
  stickySender?: boolean;
  companyDailyLimit?: number;
  companySendLimit?: number;
  campaignDailyLimit?: number;
  dailyLimit?: number;
  leadsCount?: number;
  maxNewLeadsPerDay?: number;
  maxLeadsPerDay?: number;
  prioritizeNewLeads?: boolean;
  minSendIntervalSeconds?: number;
  slowRampEnabled?: boolean;
  timezone?: string;
  stopOnReply?: boolean;
  stopOnMeeting?: boolean;
  stopOnAutoReply?: boolean;
  trackOpens?: boolean;
  trackClicks?: boolean;
  customTrackingDomain?: string | boolean;
  scheduleWindows?: ScheduleWindow[];
  sequence?: SequenceStep[];
  steps?: SequenceStep[];
  subsequences?: CampaignSubsequence[];
  replyHandling?: {
    stopOnReply: boolean;
    stopOnPositiveReply: boolean;
    stopOnAutoReply: boolean;
    stopCompanyOnReply: boolean;
    stopOnMeeting: boolean;
  };
  tracking?: {
    openTracking: boolean;
    clickTracking: boolean;
    textOnlyMode: boolean;
  };
  safety?: {
    bounceProtection: boolean;
    allowRiskyEmails: boolean;
    suppressionEnforced: boolean;
    slowRamp: boolean;
  };
  compliance?: {
    oneClickUnsubscribeHeader: boolean;
    unsubscribeFooterText?: string;
    ccBccEmail?: string;
  };
}

export interface EmailSequence {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  enrolledCount: number;
  openRate: number;
  replyRate: number;
  meetingsCount: number;
  steps: SequenceStep[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  usageCount: number;
}

export interface AbTestItem {
  id: string;
  name: string;
  campaignName: string;
  variantA: { subject: string; sent: number; opens: number; replies: number; positiveReplies?: number };
  variantB: { subject: string; sent: number; opens: number; replies: number; positiveReplies?: number };
  variants?: SequenceVariantItem[];
  autoOptimizeMetric?: 'positive_reply_rate' | 'reply_rate' | 'click_rate' | 'open_rate';
  winner?: string;
  status: 'Active' | 'Concluded';
}

export interface ConnectedMailbox {
  id: string;
  email: string;
  senderName?: string;
  name?: string;
  signature?: string;
  replyTo?: string;
  provider: 'Google Workspace' | 'Microsoft 365' | 'Custom SMTP';
  status: MailboxStatus;
  healthScore: number;
  dailySent: number;
  dailyCap: number;
  minSendIntervalSeconds?: number;
  slowRampEnabled?: boolean;
  warmupStatus?: 'Active' | 'Paused' | 'Graduated' | 'Disabled';
  warmupState?: string;
  tags?: string[];
  assignedCampaignIds?: string[];
  
  // Connection Health
  smtpAuth?: boolean;
  imapAuth?: boolean;
  sendingAccess?: boolean;
  inboxAccess?: boolean;
  sslTls?: boolean;
  latencyMs?: number;

  // Deliverability Health
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
  mx?: boolean;
  blacklistStatus?: 'Clean' | 'Warning' | 'Listed';
  customTrackingDomain: string;

  advancedConfig?: {
    smtpHost?: string;
    smtpPort?: string;
    smtpEncryption?: 'SSL/TLS' | 'STARTTLS';
    imapHost?: string;
    imapPort?: string;
    imapEncryption?: 'SSL/TLS' | 'STARTTLS';
    username?: string;
  };
  lastChecked?: string;
}

export interface DomainHealth {
  id: string;
  domain: string;
  spfStatus: boolean;
  dkimStatus: boolean;
  dmarcStatus: boolean;
  mxStatus: boolean;
  reputationScore: number;
  blacklistStatus: 'Clean' | 'Listed';
}

export interface WarmupAccount {
  id: string;
  email: string;
  day: number;
  dailyWarmupSent: number;
  replyRate: number;
  spamSavedCount: number;
  status: 'Ramping' | 'Maintained' | 'Paused';
}

export interface SuppressedContact {
  id: string;
  email: string;
  domain: string;
  reason: 'Hard Bounce' | 'Unsubscribe' | 'Manual' | 'Spam Complaint';
  dateAdded: string;
}

export interface EmailLead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  campaignId: string;
  campaignName: string;
  sequenceId: string;
  sequenceName: string;
  currentStep: number;
  status: 'Enrolled' | 'Contacted' | 'Opened' | 'Clicked' | 'Replied' | 'Bounced' | 'Unsubscribed';
  verificationStatus: 'Deliverable' | 'Risky' | 'Invalid';
  opensCount: number;
  clicksCount: number;
  repliesCount: number;
  lastActivity: string;
  history: {
    step: number;
    action: string;
    timestamp: string;
    detail?: string;
  }[];
}

export interface EmailInboxMessage {
  id: string;
  sender: 'prospect' | 'user';
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  timestamp: string;
}

export interface EmailInboxThread {
  id: string;
  contactName: string;
  contactEmail: string;
  companyName: string;
  campaignName: string;
  mailboxUsed: string;
  subject: string;
  lastMessageSnippet: string;
  timestamp: string;
  unread: boolean;
  replied: boolean;
  sentiment: 'positive' | 'meeting' | 'objection' | 'unsubscribe' | 'neutral';
  messages: EmailInboxMessage[];
}

interface EmailContextType {
  activeTab: EmailSubTab;
  setActiveTab: (tab: EmailSubTab) => void;
  campaigns: EmailCampaign[];
  sequences: EmailSequence[];
  templates: EmailTemplate[];
  abTests: AbTestItem[];
  mailboxes: ConnectedMailbox[];
  domains: DomainHealth[];
  warmupAccounts: WarmupAccount[];
  suppressedContacts: SuppressedContact[];
  emailLeads: EmailLead[];
  emailThreads: EmailInboxThread[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;

  // Actions
  createCampaign: (data: Partial<EmailCampaign>) => void;
  updateCampaign: (id: string, updates: Partial<EmailCampaign>) => void;
  toggleCampaignStatus: (id: string) => void;
  deleteCampaign: (id: string) => void;
  duplicateCampaign: (id: string) => void;
  createSequence: (name: string, steps: SequenceStep[]) => void;
  toggleSequenceStatus: (id: string) => void;
  deleteSequence: (id: string) => void;
  createTemplate: (template: Omit<EmailTemplate, 'id' | 'usageCount'>) => void;
  deleteTemplate: (id: string) => void;
  createAbTest: (test: Omit<AbTestItem, 'id'>) => void;
  connectMailbox: (mailbox: Omit<ConnectedMailbox, 'id'>) => void;
  updateMailbox: (id: string, updates: Partial<ConnectedMailbox>) => void;
  recheckMailboxHealth: (id: string) => void;
  toggleMailboxStatus: (id: string) => void;
  deleteMailbox: (id: string) => void;
  bulkUpdateMailboxes: (ids: string[], updates: Partial<ConnectedMailbox>) => void;
  bulkSetDailyLimit: (ids: string[], limit: number) => void;
  bulkToggleWarmup: (ids: string[], enable: boolean) => void;
  bulkAssignTag: (ids: string[], tag: string) => void;
  bulkAssignCampaign: (ids: string[], campaignId: string) => void;
  bulkToggleStatus: (ids: string[], status: MailboxStatus) => void;
  addSuppression: (email: string, reason: SuppressedContact['reason']) => void;
  removeSuppression: (id: string) => void;
  replyToThread: (threadId: string, replyText: string) => void;
  markThreadRead: (threadId: string) => void;
  toggleThreadArchive: (threadId: string) => void;
}

const INITIAL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'camp_1',
    name: 'Q3 Enterprise SaaS RevOps Outbound',
    status: 'Running',
    audienceCount: 1420,
    mailboxesCount: 8,
    sent: 1240,
    delivered: 1232,
    opened: 928,
    clicked: 312,
    replied: 154,
    bounced: 8,
    interested: 86,
    meetings: 24,
    createdAt: '2026-08-12',
    lastActivity: '12m ago',
    tags: ['Enterprise', 'RevOps', 'Tier 1'],
    targetPersona: 'VP & Head of Revenue Operations at Series B-D SaaS',
    description: 'High-touch value metric cold sequence targeting RevOps leaders scaling SDR teams.',
    selectedMailboxIds: ['mbx_1', 'mbx_2', 'mbx_3', 'mbx_5'],
    rotationMode: 'balanced',
    providerMatching: 'prefer',
    espRoutingMatrix: { google: 'prefer', microsoft: 'prefer', custom: 'allow' },
    stickySender: true,
    companyDailyLimit: 2,
    campaignDailyLimit: 120,
    maxNewLeadsPerDay: 40,
    prioritizeNewLeads: false,
    minSendIntervalSeconds: 90,
    slowRampEnabled: true,
    scheduleWindows: [
      { id: 'w1', name: 'Weekday Prime Outreach', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '09:00', endTime: '17:00', timezone: 'America/New_York' }
    ],
    replyHandling: {
      stopOnReply: true,
      stopOnPositiveReply: true,
      stopOnAutoReply: false,
      stopCompanyOnReply: true,
      stopOnMeeting: true,
    },
    tracking: {
      openTracking: true,
      clickTracking: true,
      textOnlyMode: false,
    },
    safety: {
      bounceProtection: true,
      allowRiskyEmails: false,
      suppressionEnforced: true,
      slowRamp: true,
    },
    compliance: {
      oneClickUnsubscribeHeader: true,
      unsubscribeFooterText: 'Click here to opt out from future communications',
    },
    subsequences: [
      {
        id: 'subseq_1',
        name: 'Positive Reply → Demo Booking Acceleration',
        trigger: 'Positive Reply',
        status: 'Active',
        inheritSettings: true,
        delayHours: 2,
        enrolledCount: 86,
        repliedCount: 24,
        steps: [
          {
            id: 'sub_s1',
            stepNumber: 1,
            type: 'email',
            subject: 'Re: {{company}} outbound deliverability vs spam filters',
            body: 'Hi {{first_name}},\n\nExcited to connect. Here is our direct calendar booking link to pick a 15-minute slot that works best for you:\n\nhttps://cal.outtricks.ai/demo\n\nLooking forward to speaking!',
          }
        ]
      }
    ]
  },
  {
    id: 'camp_2',
    name: 'FinTech Founders & CROs Follow-Up',
    status: 'Running',
    audienceCount: 850,
    mailboxesCount: 6,
    sent: 680,
    delivered: 676,
    opened: 494,
    clicked: 142,
    replied: 68,
    bounced: 4,
    interested: 38,
    meetings: 11,
    createdAt: '2026-08-15',
    lastActivity: '45m ago',
    tags: ['FinTech', 'Founders'],
    targetPersona: 'FinTech Founders & CROs with 50-250 employees',
    selectedMailboxIds: ['mbx_3', 'mbx_4'],
    rotationMode: 'health-aware',
    providerMatching: 'prefer',
    companyDailyLimit: 1,
    campaignDailyLimit: 60,
    scheduleWindows: [
      { id: 'w1', name: 'FinTech Standard Hours', days: ['Mon', 'Tue', 'Wed', 'Thu'], startTime: '08:30', endTime: '16:30', timezone: 'America/New_York' }
    ]
  },
  {
    id: 'camp_3',
    name: 'Series A/B Fast-Growing Startups',
    status: 'Paused',
    audienceCount: 650,
    mailboxesCount: 4,
    sent: 410,
    delivered: 408,
    opened: 295,
    clicked: 88,
    replied: 42,
    bounced: 2,
    interested: 22,
    meetings: 8,
    createdAt: '2026-08-18',
    lastActivity: '1d ago',
    tags: ['Series A/B', 'Growth'],
    targetPersona: 'Series A/B Startup Technical Founders & VPs',
    selectedMailboxIds: ['mbx_1', 'mbx_5'],
    rotationMode: 'balanced',
    campaignDailyLimit: 50
  }
];

const INITIAL_SEQUENCES: EmailSequence[] = [
  {
    id: 'seq_1',
    name: '3-Touch Enterprise Problem & Solution Sequence',
    status: 'Active',
    enrolledCount: 1420,
    openRate: 74.8,
    replyRate: 12.4,
    meetingsCount: 24,
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        type: 'email',
        subject: '{{company}} outbound deliverability vs spam filters',
        body: 'Hi {{first_name}},\n\nSaw you recently scaled the growth team at {{company}}. Most leaders struggle with 30%+ bounce rates on stale B2B lists.\n\nWe built Outtricks to deliver 15-provider cascading verification with 99.4% deliverability on direct work emails and mobile lines.\n\nOpen to a brief look this Thursday?',
      },
      {
        id: 's2',
        stepNumber: 2,
        type: 'delay',
        delayDays: 2,
      },
      {
        id: 's3',
        stepNumber: 3,
        type: 'email',
        subject: 'Re: {{company}} outbound deliverability',
        body: 'Hi {{first_name}},\n\nFollowing up on my previous note. We recently helped a similar high-growth team reduce domain burn to 0% while doubling qualified meetings.\n\nWorth a 10-minute briefing?',
      },
      {
        id: 's4',
        stepNumber: 4,
        type: 'delay',
        delayDays: 3,
      },
      {
        id: 's5',
        stepNumber: 5,
        type: 'email',
        subject: 'Permission to close file for {{company}}?',
        body: 'Hi {{first_name}},\n\nAssuming this is not a current priority for {{company}} right now. If things change down the road, feel free to reach out anytime.',
      },
    ],
  }
];

const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tmpl_1',
    name: 'Executive Value Metric Hook',
    category: 'Cold Outreach',
    subject: 'Quick question regarding {{company}}\'s pipeline velocity',
    body: 'Hi {{first_name}},\n\nNoticed {{company}} is accelerating outbound sales. Are you currently seeing domain throttling on Google Workspace or Microsoft 365?\n\nOur platform automates multi-inbox rotation across 24+ sender domains with 0 manual DNS maintenance.\n\nOpen to a 10-minute look?',
    usageCount: 4120,
  },
  {
    id: 'tmpl_2',
    name: 'Social Proof & Case Study Proof',
    category: 'Follow-Up',
    subject: 'How CloudScale booked 37 demos in 3 weeks',
    body: 'Hi {{first_name}},\n\nThought you might find this relevant—CloudScale switched from single-domain cold email to multi-inbox rotation and generated $180k ARR in 3 weeks.\n\nHappy to send over their exact sequence setup if interested.',
    usageCount: 2850,
  },
  {
    id: 'tmpl_3',
    name: 'Breakup & Permission to Close',
    category: 'Breakup',
    subject: 'Closing file on {{company}} for now',
    body: 'Hi {{first_name}},\n\nI haven\'t heard back, so I assume you\'re all set for outbound tooling. If your deliverability ever drops below 95%, here\'s our live benchmark tool.\n\nWishing you and {{company}} great success!',
    usageCount: 1940,
  }
];

const INITIAL_MAILBOXES: ConnectedMailbox[] = [
  { 
    id: 'mbx_1', 
    email: 'sarah.j@outbound.cloudscale.ai', 
    senderName: 'Sarah Jenkins',
    signature: 'Best regards,\nSarah Jenkins | Outbound Growth Lead\nCloudScale AI',
    replyTo: 'sarah.j@cloudscale.ai',
    provider: 'Google Workspace', 
    status: 'Ready', 
    healthScore: 100, 
    dailySent: 26, 
    dailyCap: 30, 
    minSendIntervalSeconds: 90,
    slowRampEnabled: true,
    warmupStatus: 'Graduated',
    tags: ['Tier 1', 'Google Workspace', 'SDR Team'],
    assignedCampaignIds: ['camp_1', 'camp_3'],
    spf: true, 
    dkim: true, 
    dmarc: true, 
    mx: true,
    smtpAuth: true,
    imapAuth: true,
    sendingAccess: true,
    inboxAccess: true,
    sslTls: true,
    latencyMs: 142,
    blacklistStatus: 'Clean',
    customTrackingDomain: 'track.cloudscale.ai',
    lastChecked: '2m ago'
  },
  { 
    id: 'mbx_2', 
    email: 'sdr.lead1@outbound.cloudscale.ai', 
    senderName: 'Alex Rivera',
    signature: 'Cheers,\nAlex Rivera | SDR Specialist',
    provider: 'Google Workspace', 
    status: 'Ready', 
    healthScore: 100, 
    dailySent: 28, 
    dailyCap: 30, 
    minSendIntervalSeconds: 120,
    slowRampEnabled: true,
    warmupStatus: 'Graduated',
    tags: ['Google Workspace', 'SDR Team'],
    assignedCampaignIds: ['camp_1'],
    spf: true, 
    dkim: true, 
    dmarc: true, 
    mx: true,
    smtpAuth: true,
    imapAuth: true,
    sendingAccess: true,
    inboxAccess: true,
    sslTls: true,
    latencyMs: 118,
    blacklistStatus: 'Clean',
    customTrackingDomain: 'track.cloudscale.ai',
    lastChecked: '5m ago'
  },
  { 
    id: 'mbx_3', 
    email: 'growth@send.cloudscale.ai', 
    senderName: 'Marcus Vance',
    signature: 'Warmly,\nMarcus Vance | Revenue Operations',
    provider: 'Microsoft 365', 
    status: 'Ready', 
    healthScore: 99, 
    dailySent: 22, 
    dailyCap: 30, 
    minSendIntervalSeconds: 100,
    slowRampEnabled: false,
    warmupStatus: 'Active',
    tags: ['Microsoft 365', 'Exec Outreach'],
    assignedCampaignIds: ['camp_1', 'camp_2'],
    spf: true, 
    dkim: true, 
    dmarc: true, 
    mx: true,
    smtpAuth: true,
    imapAuth: true,
    sendingAccess: true,
    inboxAccess: true,
    sslTls: true,
    latencyMs: 165,
    blacklistStatus: 'Clean',
    customTrackingDomain: 'track.cloudscale.ai',
    lastChecked: '12m ago'
  },
  { 
    id: 'mbx_4', 
    email: 'outreach.mkt@cloudscalerev.io', 
    senderName: 'David Kim',
    signature: 'Best,\nDavid Kim | Growth Marketing',
    provider: 'Microsoft 365', 
    status: 'Warming', 
    healthScore: 98, 
    dailySent: 15, 
    dailyCap: 20, 
    minSendIntervalSeconds: 180,
    slowRampEnabled: true,
    warmupStatus: 'Active',
    tags: ['Microsoft 365', 'Ramp Pool'],
    assignedCampaignIds: ['camp_2'],
    spf: true, 
    dkim: true, 
    dmarc: true, 
    mx: true,
    smtpAuth: true,
    imapAuth: true,
    sendingAccess: true,
    inboxAccess: true,
    sslTls: true,
    latencyMs: 154,
    blacklistStatus: 'Clean',
    customTrackingDomain: 'track.cloudscalerev.io',
    lastChecked: '18m ago'
  },
  { 
    id: 'mbx_5', 
    email: 'deals@relay.scalemachine.co', 
    senderName: 'Elena Rostova',
    signature: 'Regards,\nElena Rostova | VP Partnerships',
    provider: 'Custom SMTP', 
    status: 'Ready', 
    healthScore: 96, 
    dailySent: 18, 
    dailyCap: 35, 
    minSendIntervalSeconds: 60,
    slowRampEnabled: false,
    warmupStatus: 'Active',
    tags: ['Custom SMTP', 'High Volume'],
    assignedCampaignIds: ['camp_1', 'camp_3'],
    spf: true, 
    dkim: true, 
    dmarc: true, 
    mx: true,
    smtpAuth: true,
    imapAuth: true,
    sendingAccess: true,
    inboxAccess: true,
    sslTls: true,
    latencyMs: 88,
    blacklistStatus: 'Clean',
    customTrackingDomain: 'track.scalemachine.co',
    advancedConfig: {
      smtpHost: 'mail.scalemachine.co',
      smtpPort: '587',
      smtpEncryption: 'STARTTLS',
      imapHost: 'mail.scalemachine.co',
      imapPort: '993',
      imapEncryption: 'SSL/TLS',
      username: 'deals@relay.scalemachine.co'
    },
    lastChecked: '8m ago'
  },
];

const INITIAL_DOMAINS: DomainHealth[] = [
  { id: 'dom_1', domain: 'outbound.cloudscale.ai', spfStatus: true, dkimStatus: true, dmarcStatus: true, mxStatus: true, reputationScore: 100, blacklistStatus: 'Clean' },
  { id: 'dom_2', domain: 'send.cloudscale.ai', spfStatus: true, dkimStatus: true, dmarcStatus: true, mxStatus: true, reputationScore: 99, blacklistStatus: 'Clean' },
  { id: 'dom_3', domain: 'cloudscalerev.io', spfStatus: true, dkimStatus: true, dmarcStatus: true, mxStatus: true, reputationScore: 98, blacklistStatus: 'Clean' },
];

const INITIAL_WARMUP: WarmupAccount[] = [
  { id: 'w_1', email: 'sarah.j@outbound.cloudscale.ai', day: 45, dailyWarmupSent: 25, replyRate: 42, spamSavedCount: 18, status: 'Maintained' },
  { id: 'w_2', email: 'growth@send.cloudscale.ai', day: 30, dailyWarmupSent: 20, replyRate: 38, spamSavedCount: 12, status: 'Maintained' },
  { id: 'w_3', email: 'outreach.mkt@cloudscalerev.io', day: 12, dailyWarmupSent: 12, replyRate: 35, spamSavedCount: 8, status: 'Ramping' },
];

const INITIAL_SUPPRESSIONS: SuppressedContact[] = [
  { id: 'sup_1', email: 'alex@unsubscribed-user.com', domain: 'unsubscribed-user.com', reason: 'Unsubscribe', dateAdded: '2026-08-20' },
  { id: 'sup_2', email: 'bounced@invalid-domain-xyz.com', domain: 'invalid-domain-xyz.com', reason: 'Hard Bounce', dateAdded: '2026-08-22' },
];

const INITIAL_EMAIL_LEADS: EmailLead[] = [
  {
    id: 'el_1',
    name: 'Elena Rostova',
    email: 'elena.rostova@datadynamics.io',
    company: 'DataDynamics',
    title: 'VP of Engineering',
    campaignId: 'camp_1',
    campaignName: 'Q3 Enterprise SaaS RevOps Outbound',
    sequenceId: 'seq_1',
    sequenceName: '3-Touch Enterprise Sequence',
    currentStep: 3,
    status: 'Replied',
    verificationStatus: 'Deliverable',
    opensCount: 4,
    clicksCount: 2,
    repliesCount: 1,
    lastActivity: '12m ago',
    history: [
      { step: 1, action: 'Email Delivered', timestamp: '2026-08-25 09:14 AM' },
      { step: 1, action: 'Email Opened', timestamp: '2026-08-25 10:02 AM' },
      { step: 2, action: 'Follow-Up Delivered', timestamp: '2026-08-27 09:30 AM' },
      { step: 2, action: 'Email Replied', timestamp: '2026-08-27 11:45 AM', detail: 'Interested in seeing a live multi-inbox demo.' }
    ]
  },
  {
    id: 'el_2',
    name: 'Marcus Vance',
    email: 'marcus@apexdata.io',
    company: 'Apex Data Labs',
    title: 'Head of Revenue Operations',
    campaignId: 'camp_1',
    campaignName: 'Q3 Enterprise SaaS RevOps Outbound',
    sequenceId: 'seq_1',
    sequenceName: '3-Touch Enterprise Sequence',
    currentStep: 2,
    status: 'Opened',
    verificationStatus: 'Deliverable',
    opensCount: 3,
    clicksCount: 1,
    repliesCount: 0,
    lastActivity: '45m ago',
    history: [
      { step: 1, action: 'Email Delivered', timestamp: '2026-08-26 10:00 AM' },
      { step: 1, action: 'Email Opened', timestamp: '2026-08-26 10:15 AM' }
    ]
  },
  {
    id: 'el_3',
    name: 'Amira Patel',
    email: 'amira@scalewave.agency',
    company: 'ScaleWave Media',
    title: 'Founder & CEO',
    campaignId: 'camp_2',
    campaignName: 'FinTech Founders & CROs Follow-Up',
    sequenceId: 'seq_1',
    sequenceName: '3-Touch Enterprise Sequence',
    currentStep: 1,
    status: 'Replied',
    verificationStatus: 'Deliverable',
    opensCount: 5,
    clicksCount: 3,
    repliesCount: 2,
    lastActivity: '2h ago',
    history: [
      { step: 1, action: 'Email Delivered', timestamp: '2026-08-28 08:45 AM' },
      { step: 1, action: 'Email Replied', timestamp: '2026-08-28 09:30 AM', detail: 'Inquired about pricing comparison against Smartlead.' }
    ]
  },
  {
    id: 'el_4',
    name: 'Julian Thorne',
    email: 'julian@vortexcloud.co',
    company: 'Vortex Cloud Solutions',
    title: 'Chief Technology Officer',
    campaignId: 'camp_3',
    campaignName: 'Series A/B Fast-Growing Startups',
    sequenceId: 'seq_1',
    sequenceName: '3-Touch Enterprise Sequence',
    currentStep: 1,
    status: 'Bounced',
    verificationStatus: 'Invalid',
    opensCount: 0,
    clicksCount: 0,
    repliesCount: 0,
    lastActivity: '1d ago',
    history: [
      { step: 1, action: 'Email Hard Bounced (550 Mailbox Not Found)', timestamp: '2026-08-28 14:00 PM' }
    ]
  }
];

const INITIAL_EMAIL_THREADS: EmailInboxThread[] = [
  {
    id: 'ethread_1',
    contactName: 'Elena Rostova',
    contactEmail: 'elena.rostova@datadynamics.io',
    companyName: 'DataDynamics',
    campaignName: 'Q3 Enterprise SaaS RevOps Outbound',
    mailboxUsed: 'sarah.j@outbound.cloudscale.ai',
    subject: 'Re: DataDynamics outbound deliverability vs spam filters',
    lastMessageSnippet: 'Yes, Thursday at 2:00 PM EST works great. Please send over the calendar invite.',
    timestamp: '12m ago',
    unread: true,
    replied: false,
    sentiment: 'meeting',
    messages: [
      {
        id: 'em_1_1',
        sender: 'user',
        senderName: 'Sarah Jenkins',
        senderEmail: 'sarah.j@outbound.cloudscale.ai',
        subject: 'DataDynamics outbound deliverability vs spam filters',
        body: 'Hi Elena,\n\nSaw you recently scaled the growth team at DataDynamics. Most leaders struggle with 30%+ bounce rates on stale B2B lists.\n\nWe built Outtricks to deliver automated multi-inbox rotation across 24+ sender domains with 0 manual DNS maintenance.\n\nOpen to a brief 15-minute look this Thursday?',
        timestamp: 'Aug 25, 09:14 AM'
      },
      {
        id: 'em_1_2',
        sender: 'prospect',
        senderName: 'Elena Rostova',
        senderEmail: 'elena.rostova@datadynamics.io',
        subject: 'Re: DataDynamics outbound deliverability vs spam filters',
        body: 'Hi Sarah,\n\nYes, Thursday at 2:00 PM EST works great. Please send over the calendar invite with your product team.',
        timestamp: 'Today, 11:45 AM'
      }
    ]
  },
  {
    id: 'ethread_2',
    contactName: 'Amira Patel',
    contactEmail: 'amira@scalewave.agency',
    companyName: 'ScaleWave Media',
    campaignName: 'FinTech Founders & CROs Follow-Up',
    mailboxUsed: 'growth@send.cloudscale.ai',
    subject: 'Re: Quick question regarding ScaleWave Media\'s pipeline velocity',
    lastMessageSnippet: 'How does your multi-inbox sender rotation compare to Instantly and Smartlead?',
    timestamp: '2h ago',
    unread: false,
    replied: true,
    sentiment: 'positive',
    messages: [
      {
        id: 'em_2_1',
        sender: 'user',
        senderName: 'Alex Rivera',
        senderEmail: 'growth@send.cloudscale.ai',
        subject: 'Quick question regarding ScaleWave Media\'s pipeline velocity',
        body: 'Hi Amira,\n\nNoticed ScaleWave Media is accelerating outbound sales. Are you currently seeing domain throttling on Google Workspace or Microsoft 365?\n\nOpen to a 10-minute look?',
        timestamp: 'Aug 28, 08:45 AM'
      },
      {
        id: 'em_2_2',
        sender: 'prospect',
        senderName: 'Amira Patel',
        senderEmail: 'amira@scalewave.agency',
        subject: 'Re: Quick question regarding ScaleWave Media\'s pipeline velocity',
        body: 'How does your multi-inbox sender rotation compare to Instantly and Smartlead? Do you provide residential proxy rotation for warmups as well?',
        timestamp: 'Today, 09:30 AM'
      }
    ]
  }
];

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<EmailSubTab>('campaigns');
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(INITIAL_CAMPAIGNS);
  const [sequences, setSequences] = useState<EmailSequence[]>(INITIAL_SEQUENCES);
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_TEMPLATES);
  const [abTests, setAbTests] = useState<AbTestItem[]>([
    {
      id: 'ab_1',
      name: 'Subject Line Hook Test (Pain vs Social Proof)',
      campaignName: 'Q3 Enterprise SaaS RevOps Outbound',
      variantA: { subject: '{{company}} outbound deliverability vs spam filters', sent: 620, opens: 478, replies: 82 },
      variantB: { subject: 'How CloudScale booked 37 demos in 3 weeks', sent: 620, opens: 450, replies: 72 },
      winner: 'A',
      status: 'Concluded',
    }
  ]);
  const [mailboxes, setMailboxes] = useState<ConnectedMailbox[]>(INITIAL_MAILBOXES);
  const [domains, setDomains] = useState<DomainHealth[]>(INITIAL_DOMAINS);
  const [warmupAccounts, setWarmupAccounts] = useState<WarmupAccount[]>(INITIAL_WARMUP);
  const [suppressedContacts, setSuppressedContacts] = useState<SuppressedContact[]>(INITIAL_SUPPRESSIONS);
  const [emailLeads, setEmailLeads] = useState<EmailLead[]>(INITIAL_EMAIL_LEADS);
  const [emailThreads, setEmailThreads] = useState<EmailInboxThread[]>(INITIAL_EMAIL_THREADS);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const createCampaign = useCallback((data: Partial<EmailCampaign>) => {
    const newCamp: EmailCampaign = {
      id: `camp_${Date.now()}`,
      name: data.name || 'Untitled Outreach Campaign',
      status: data.status || 'Scheduled',
      audienceCount: data.audienceCount || 500,
      mailboxesCount: data.selectedMailboxIds ? data.selectedMailboxIds.length : (data.mailboxesCount || 4),
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      bounced: 0,
      interested: 0,
      meetings: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      tags: data.tags || ['Outbound', 'New'],
      ...data,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    success(`Campaign "${newCamp.name}" launched and scheduled.`, 'Campaign Created');
  }, [success]);

  const updateCampaign = useCallback((id: string, updates: Partial<EmailCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    success('Campaign configuration updated.', 'Saved');
  }, [success]);

  const toggleCampaignStatus = useCallback((id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = c.status === 'Running' ? 'Paused' : 'Running';
          return { ...c, status: next };
        }
        return c;
      })
    );
    info('Campaign status updated.', 'Status Changed');
  }, [info]);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    info('Campaign removed.', 'Deleted');
  }, [info]);

  const duplicateCampaign = useCallback((id: string) => {
    const target = campaigns.find((c) => c.id === id);
    if (!target) return;
    const duplicated: EmailCampaign = {
      ...target,
      id: `camp_${Date.now()}`,
      name: `${target.name} (Copy)`,
      status: 'Draft',
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      bounced: 0,
      interested: 0,
      meetings: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
    };
    setCampaigns((prev) => [duplicated, ...prev]);
    success(`Duplicated "${target.name}".`, 'Duplicated');
  }, [campaigns, success]);

  const createSequence = useCallback((name: string, steps: SequenceStep[]) => {
    const newSeq: EmailSequence = {
      id: `seq_${Date.now()}`,
      name,
      status: 'Active',
      enrolledCount: 0,
      openRate: 0,
      replyRate: 0,
      meetingsCount: 0,
      steps,
    };
    setSequences((prev) => [newSeq, ...prev]);
    success(`Multi-step sequence "${name}" created.`, 'Sequence Created');
  }, [success]);

  const toggleSequenceStatus = useCallback((id: string) => {
    setSequences((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s))
    );
  }, []);

  const deleteSequence = useCallback((id: string) => {
    setSequences((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const createTemplate = useCallback((template: Omit<EmailTemplate, 'id' | 'usageCount'>) => {
    const newTmpl: EmailTemplate = {
      ...template,
      id: `tmpl_${Date.now()}`,
      usageCount: 0,
    };
    setTemplates((prev) => [newTmpl, ...prev]);
    success(`Template "${template.name}" saved.`, 'Template Saved');
  }, [success]);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const createAbTest = useCallback((test: Omit<AbTestItem, 'id'>) => {
    const newTest: AbTestItem = {
      ...test,
      id: `ab_${Date.now()}`,
    };
    setAbTests((prev) => [newTest, ...prev]);
    success('A/B Test configured and launched.', 'A/B Test Created');
  }, [success]);

  const connectMailbox = useCallback((mbx: Omit<ConnectedMailbox, 'id'>) => {
    const newMbx: ConnectedMailbox = {
      ...mbx,
      id: `mbx_${Date.now()}`,
    };
    setMailboxes((prev) => [newMbx, ...prev]);
    success(`Connected mailbox ${mbx.email} to sender pool.`, 'Mailbox Connected');
  }, [success]);

  const toggleMailboxStatus = useCallback((id: string) => {
    setMailboxes((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = m.status === 'Optimal' ? 'Paused' : 'Optimal';
          return { ...m, status: next };
        }
        return m;
      })
    );
  }, []);

  const updateMailbox = useCallback((id: string, updates: Partial<ConnectedMailbox>) => {
    setMailboxes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    success('Mailbox configuration updated.', 'Mailbox Updated');
  }, [success]);

  const recheckMailboxHealth = useCallback((id: string) => {
    setMailboxes((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            healthScore: 100,
            status: 'Optimal',
            spf: true,
            dkim: true,
            dmarc: true,
            mx: true,
            smtpAuth: true,
            imapAuth: true,
            sendingAccess: true,
            inboxAccess: true,
            sslTls: true,
            blacklistStatus: 'Clean',
            lastChecked: 'Just now',
          };
        }
        return m;
      })
    );
    success('Diagnostic handshake passed: SPF, DKIM, DMARC, MX, SMTP, IMAP verified 100%.', 'Health Verified');
  }, [success]);

  const deleteMailbox = useCallback((id: string) => {
    setMailboxes((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const bulkUpdateMailboxes = useCallback((ids: string[], updates: Partial<ConnectedMailbox>) => {
    setMailboxes((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { ...m, ...updates } : m))
    );
    success(`Updated ${ids.length} mailboxes.`, 'Bulk Update Complete');
  }, [success]);

  const bulkSetDailyLimit = useCallback((ids: string[], limit: number) => {
    setMailboxes((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { ...m, dailyCap: limit } : m))
    );
    success(`Set daily sending limit to ${limit} across ${ids.length} mailboxes.`, 'Limit Updated');
  }, [success]);

  const bulkToggleWarmup = useCallback((ids: string[], enable: boolean) => {
    setMailboxes((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { 
        ...m, 
        warmupStatus: enable ? 'Active' : 'Paused', 
        status: enable && m.status === 'Ready' ? 'Warming' : m.status 
      } : m))
    );
    success(`${enable ? 'Enabled' : 'Paused'} warmup across ${ids.length} mailboxes.`, 'Warmup Toggled');
  }, [success]);

  const bulkAssignTag = useCallback((ids: string[], tag: string) => {
    setMailboxes((prev) =>
      prev.map((m) => {
        if (!ids.includes(m.id)) return m;
        const currentTags = m.tags || [];
        if (currentTags.includes(tag)) return m;
        return { ...m, tags: [...currentTags, tag] };
      })
    );
    success(`Assigned tag "${tag}" to ${ids.length} mailboxes.`, 'Tags Assigned');
  }, [success]);

  const bulkAssignCampaign = useCallback((ids: string[], campaignId: string) => {
    setMailboxes((prev) =>
      prev.map((m) => {
        if (!ids.includes(m.id)) return m;
        const current = m.assignedCampaignIds || [];
        if (current.includes(campaignId)) return m;
        return { ...m, assignedCampaignIds: [...current, campaignId] };
      })
    );
    success(`Assigned ${ids.length} mailboxes to campaign.`, 'Mailboxes Assigned');
  }, [success]);

  const bulkToggleStatus = useCallback((ids: string[], newStatus: MailboxStatus) => {
    setMailboxes((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { ...m, status: newStatus } : m))
    );
    success(`Updated status of ${ids.length} mailboxes to ${newStatus}.`, 'Status Updated');
  }, [success]);

  const addSuppression = useCallback((email: string, reason: SuppressedContact['reason']) => {
    const domain = email.split('@')[1] || '';
    const newSup: SuppressedContact = {
      id: `sup_${Date.now()}`,
      email,
      domain,
      reason,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setSuppressedContacts((prev) => [newSup, ...prev]);
    success(`Added ${email} to Do-Not-Contact list.`, 'Suppressed');
  }, [success]);

  const removeSuppression = useCallback((id: string) => {
    setSuppressedContacts((prev) => prev.filter((s) => s.id !== id));
    info('Removed from suppression list.', 'Restored');
  }, [info]);

  const replyToThread = useCallback((threadId: string, replyText: string) => {
    setEmailThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const newMsg: EmailInboxMessage = {
            id: `em_${Date.now()}`,
            sender: 'user',
            senderName: 'You',
            senderEmail: t.mailboxUsed,
            subject: t.subject.startsWith('Re:') ? t.subject : `Re: ${t.subject}`,
            body: replyText,
            timestamp: 'Just now'
          };
          return {
            ...t,
            replied: true,
            unread: false,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
  }, []);

  const markThreadRead = useCallback((threadId: string) => {
    setEmailThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, unread: false } : t))
    );
  }, []);

  const toggleThreadArchive = useCallback((threadId: string) => {
    info('Thread archived.', 'Archived');
  }, [info]);

  return (
    <EmailContext.Provider
      value={{
        activeTab,
        setActiveTab,
        campaigns,
        sequences,
        templates,
        abTests,
        mailboxes,
        domains,
        warmupAccounts,
        suppressedContacts,
        emailLeads,
        emailThreads,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        createCampaign,
        updateCampaign,
        toggleCampaignStatus,
        deleteCampaign,
        duplicateCampaign,
        createSequence,
        toggleSequenceStatus,
        deleteSequence,
        createTemplate,
        deleteTemplate,
        createAbTest,
        connectMailbox,
        updateMailbox,
        recheckMailboxHealth,
        toggleMailboxStatus,
        deleteMailbox,
        bulkUpdateMailboxes,
        bulkSetDailyLimit,
        bulkToggleWarmup,
        bulkAssignTag,
        bulkAssignCampaign,
        bulkToggleStatus,
        addSuppression,
        removeSuppression,
        replyToThread,
        markThreadRead,
        toggleThreadArchive,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
