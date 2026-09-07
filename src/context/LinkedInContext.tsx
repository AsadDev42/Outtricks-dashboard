import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';

export type LinkedInTabType = 
  | 'overview'
  | 'campaigns' 
  | 'automation' 
  | 'queue'
  | 'logs' 
  | 'accounts' 
  | 'proxies' 
  | 'health' 
  | 'prospects' 
  | 'connections' 
  | 'visits' 
  | 'messages' 
  | 'inmails' 
  | 'leads' 
  | 'analytics' 
  | 'activity'
  | 'settings';

export type LinkedInWorkspaceTab = 'sequence' | 'leads' | 'launch' | 'performance' | 'settings';

export type LinkedInStepType = 
  | 'visit' 
  | 'connect' 
  | 'check_connect' 
  | 'withdraw' 
  | 'message' 
  | 'followup' 
  | 'voice_note' 
  | 'follow' 
  | 'like_post' 
  | 'comment' 
  | 'endorse' 
  | 'delay' 
  | 'condition' 
  | 'stop';

export interface LinkedInStepConfig {
  note?: string;
  body?: string;
  spintax?: boolean;
  variables?: string[];
  characterLimit?: number;
  conditionType?: 'invite_accepted' | 'replied' | 'connected' | 'has_profile' | 'score_threshold';
  conditionTargetDays?: number;
  postReactionType?: 'Like' | 'Celebrate' | 'Support' | 'Insightful';
  skillsToProfile?: string[];
  stopReason?: 'replied' | 'connected' | 'manual' | 'failure';
}

export interface LinkedInStepStats {
  reached: number;
  completed: number;
  pending: number;
  toCome: number;
  failed: number;
  skipped: number;
  successRate?: number;
  failureReasons?: { reason: string; count: number }[];
}

export interface LinkedInStep {
  id: string;
  type: LinkedInStepType;
  title: string;
  subtitle: string;
  timingLabel?: string; // e.g. "Send immediately", "Wait for 2 days"
  waitDurationDays?: number;
  waitDurationHours?: number;
  businessDaysOnly?: boolean;
  config?: LinkedInStepConfig;
  stats?: LinkedInStepStats;
  branch?: 'main' | 'yes' | 'no';
  yesBranch?: LinkedInStep[];
  noBranch?: LinkedInStep[];
}

export interface LinkedInLeadTimelineEvent {
  id: string;
  timestamp: string;
  date: string;
  stepTitle: string;
  action: string;
  status: 'Success' | 'Queued' | 'Failed' | 'Skipped';
  note?: string;
}

export interface LinkedInCampaignLead {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  linkedinUrl: string;
  status: 'Not started' | 'In progress' | 'Waiting' | 'Connected' | 'Replied' | 'Interested' | 'Completed' | 'Stopped' | 'Failed';
  currentStepId?: string;
  currentStepTitle?: string;
  owner: string;
  leadScore: number;
  addedAt: string;
  lastActivity: string;
  nextActivity?: string;
  hasVerifiedEmail?: boolean;
  hasPhone?: boolean;
  timeline: LinkedInLeadTimelineEvent[];
}

export interface LinkedInQueueItem {
  id: string;
  campaignId: string;
  campaignName: string;
  leadId: string;
  leadName: string;
  leadTitle: string;
  leadCompany: string;
  leadAvatar?: string;
  actionType: 'visit' | 'connect' | 'message' | 'endorse' | 'delay';
  actionTitle: string;
  scheduledAt: string;
  status: 'Pending' | 'Scheduled' | 'In progress' | 'Completed' | 'Failed' | 'Skipped' | 'Rate limited';
  reason?: string;
  retryCount: number;
  errorReason?: string;
}

export interface LinkedInCampaignSchedule {
  days: string[];
  startHour: string;
  endHour: string;
  timezone: string;
}

export interface LinkedInCampaignLimits {
  dailyInvites: number;
  dailyMessages: number;
  dailyVisits: number;
}

export interface LinkedInCampaignSafety {
  randomDelayMinSeconds: number;
  randomDelayMaxSeconds: number;
  warmupMode: boolean;
  proxyLocation: string;
}

export interface LinkedInCampaignStopConditions {
  stopOnReply: boolean;
  stopOnConnection: boolean;
  stopOnManualContact: boolean;
  stopOnRemoved: boolean;
}

export interface LinkedInFunnelStats {
  contacted: number;
  contactedPct: number;
  opened: number;
  openedPct: number;
  interaction: number;
  interactionPct: number;
  answered: number;
  answeredPct: number;
  interested: number;
  interestedPct: number;
  interrupted: number;
  interruptedPct: number;
  total: number;
}

export interface LinkedInCampaign {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  owner?: string;
  status: 'Running' | 'Paused' | 'Completed' | 'Draft';
  targetAudience: string;
  accountName: string;
  accountId?: string;
  targetCount: number;
  invitesSent: number;
  connected: number;
  messagesSent: number;
  replied: number;
  meetings: number;
  interested: number;
  createdAt: string;
  lastActivity: string;
  sequence: LinkedInStep[];
  leadsList: LinkedInCampaignLead[];
  schedule: LinkedInCampaignSchedule;
  limits: LinkedInCampaignLimits;
  safety: LinkedInCampaignSafety;
  stopConditions: LinkedInCampaignStopConditions;
  queue: LinkedInQueueItem[];
  performanceFunnel: LinkedInFunnelStats;
}

export interface LinkedInAutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  stepsCount: number;
  steps: string[];
  delayHours: number;
  condition: string;
  status: 'Active' | 'Paused';
  runsCount: number;
  successRate: number;
  lastRun: string;
}

export interface LinkedInLog {
  id: string;
  timestamp: string;
  account: string;
  prospectName: string;
  company: string;
  action: 'Profile Visit' | 'Connection Invite' | 'Connection Accepted' | 'Message Sent' | 'InMail Sent' | 'Follow Up Sent';
  status: 'Success' | 'Queued' | 'Failed' | 'Skipped' | 'Running';
  duration: string;
  details: string;
  error?: string;
}

export interface LinkedInAccount {
  id: string;
  name: string;
  title: string;
  avatar: string;
  profileUrl: string;
  status: 'Connected' | 'Warming' | 'Action Needed' | 'Paused';
  safetyScore: number;
  dailyInvitesSent: number;
  dailyInvitesLimit: number;
  dailyVisitsSent: number;
  dailyVisitsLimit: number;
  dailyMessagesSent: number;
  dailyMessagesLimit: number;
  actionsUsedToday: number;
  dailyActionsLimit: number;
  proxyIp: string;
  proxyLocation: string;
  connectionCount: number;
  lastSync: string;
}

export interface LinkedInProxy {
  id: string;
  name: string;
  ip: string;
  port: number;
  location: string;
  type: 'Residential 4G' | 'Static Residential' | 'Datacenter';
  latency: string;
  assignedAccount: string;
  status: 'Healthy' | 'Warning' | 'Offline';
  lastChecked: string;
}

export interface LinkedInProspect {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  profileUrl: string;
  connectionStatus: '1st Degree' | 'Pending' | 'Not Connected';
  campaignName: string;
  status: 'New' | 'In Outreach' | 'Replied' | 'Converted';
  leadScore: number;
  lastActivity: string;
}

export interface LinkedInConnection {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  connectedAt: string;
  messagesCount: number;
  status: '1st Degree' | 'Pending Accept' | 'Declined';
  sourceCampaign: string;
}

export interface LinkedInVisit {
  id: string;
  prospectName: string;
  title: string;
  company: string;
  avatar: string;
  timestamp: string;
  status: 'Viewed' | 'Queued';
  source: string;
  intent: 'High Intent' | 'Reciprocal View' | 'Warm Touch';
}

export interface LinkedInChatMessage {
  id: string;
  sender: 'user' | 'prospect';
  text: string;
  timestamp: string;
}

export interface LinkedInMessageThread {
  id: string;
  prospectName: string;
  title: string;
  company: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  needsFollowUp?: boolean;
  messages: LinkedInChatMessage[];
}

export interface LinkedInInMail {
  id: string;
  prospectName: string;
  title: string;
  company: string;
  subject: string;
  status: 'Delivered' | 'Replied' | 'Opened' | 'Bounced';
  replyStatus: string;
  campaignName: string;
  creditsUsed: number;
  sentDate: string;
}

export interface LinkedInLead {
  id: string;
  name: string;
  title: string;
  company: string;
  source: string;
  status: 'New Leads' | 'Contacted' | 'Interested' | 'Qualified' | 'Meeting' | 'Converted';
  stage?: string;
  owner: string;
  lastActivity: string;
  nextAction: string;
  dealValue: number;
}

export interface LinkedInActivityEvent {
  id: string;
  timestamp: string;
  type: string;
  account: string;
  description: string;
  prospectName: string;
  company: string;
  result: 'Success' | 'Delivered' | 'Accepted' | 'Pending';
}

interface LinkedInContextType {
  activeTab: LinkedInTabType;
  setActiveTab: (tab: LinkedInTabType) => void;
  campaigns: LinkedInCampaign[];
  selectedCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
  selectedCampaign: LinkedInCampaign | null;
  activeWorkspaceTab: LinkedInWorkspaceTab;
  setActiveWorkspaceTab: (tab: LinkedInWorkspaceTab) => void;
  
  automationRules: LinkedInAutomationRule[];
  executionLogs: LinkedInLog[];
  accounts: LinkedInAccount[];
  proxies: LinkedInProxy[];
  prospects: LinkedInProspect[];
  connections: LinkedInConnection[];
  visits: LinkedInVisit[];
  messages: LinkedInMessageThread[];
  inmails: LinkedInInMail[];
  leads: LinkedInLead[];
  activities: LinkedInActivityEvent[];
  allQueueItems: LinkedInQueueItem[];

  // Campaign Actions
  createCampaign: (campaign: Partial<LinkedInCampaign>) => void;
  updateCampaign: (id: string, data: Partial<LinkedInCampaign>) => void;
  toggleCampaignStatus: (id: string) => void;
  duplicateCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  archiveCampaign: (id: string) => void;
  updateCampaignSequence: (campaignId: string, sequence: LinkedInStep[]) => void;
  addLeadsToCampaign: (campaignId: string, leads: Partial<LinkedInCampaignLead>[]) => void;
  removeLeadFromCampaign: (campaignId: string, leadId: string) => void;
  updateLeadInCampaign: (campaignId: string, leadId: string, updates: Partial<LinkedInCampaignLead>) => void;
  enrichCampaignLeads: (campaignId: string, type: 'emails' | 'phones' | 'profiles' | 'verify') => void;

  // Queue Actions
  executeQueueAction: (itemId: string) => void;
  retryQueueAction: (itemId: string) => void;
  skipQueueAction: (itemId: string) => void;
  pauseQueueAction: (itemId: string) => void;

  // Account & Proxy Actions
  createAutomationRule: (rule: Partial<LinkedInAutomationRule>) => void;
  toggleAutomationRule: (id: string) => void;
  deleteAutomationRule: (id: string) => void;
  connectAccount: (account: Partial<LinkedInAccount>) => void;
  toggleAccountStatus: (id: string) => void;
  disconnectAccount: (id: string) => void;
  addProxy: (proxy: Partial<LinkedInProxy>) => void;
  removeProxy: (id: string) => void;
  testProxy: (id: string) => void;
  sendInvite: (prospectId: string) => void;
  addProspectToCampaign: (prospectId: string, campaignName: string) => void;
  removeProspect: (prospectId: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  sendInMail: (prospectId: string, subject: string, message: string) => void;
  composeInMail: (inmail: Partial<LinkedInInMail>) => void;
  updateLeadStage: (leadId: string, stage: LinkedInLead['status']) => void;
  addLead: (lead: Partial<LinkedInLead>) => void;
}

// -------------------------------------------------------------
// BENCHMARK SEED DATA: Exact match to user screenshots
// -------------------------------------------------------------

const BENCHMARK_LEADS: LinkedInCampaignLead[] = [
  {
    id: 'lead_1',
    name: 'Florence Famurewa',
    firstName: 'Florence',
    lastName: 'Famurewa',
    title: 'Senior Social Media Specialist',
    company: 'FinTech Velocity UK',
    email: 'florence.f@velocityfintech.co.uk',
    phone: '+44 20 7946 0912',
    linkedinUrl: 'https://linkedin.com/in/florence-famurewa',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 5, 2026',
    lastActivity: '2h ago',
    nextActivity: 'Send connection request',
    hasVerifiedEmail: true,
    hasPhone: true,
    timeline: [
      { id: 't_1', timestamp: '10:14 AM', date: 'Jul 5', stepTitle: 'Enrollment', action: 'Lead added to campaign', status: 'Success' },
      { id: 't_2', timestamp: '11:00 AM', date: 'Jul 5', stepTitle: 'Visit profile', action: 'Stealth profile view via London 4G proxy', status: 'Success' },
    ]
  },
  {
    id: 'lead_2',
    name: 'Whitney Olumese',
    firstName: 'Whitney',
    lastName: 'Olumese',
    title: 'Lead Brand Strategist',
    company: 'OmniBrand Growth',
    email: 'whitney@omnibrand.io',
    linkedinUrl: 'https://linkedin.com/in/whitney-olumese',
    status: 'Completed',
    currentStepId: 'step_4',
    currentStepTitle: 'Chat message',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 5, 2026',
    lastActivity: 'Jul 12, 2026',
    hasVerifiedEmail: true,
    hasPhone: false,
    timeline: [
      { id: 't_3', timestamp: '09:30 AM', date: 'Jul 5', stepTitle: 'Visit profile', action: 'Profile viewed', status: 'Success' },
      { id: 't_4', timestamp: '10:00 AM', date: 'Jul 6', stepTitle: 'Invitation', action: 'Invitation note sent', status: 'Success' },
      { id: 't_5', timestamp: '02:15 PM', date: 'Jul 8', stepTitle: 'If Accepted', action: 'Invitation accepted by lead', status: 'Success' },
      { id: 't_6', timestamp: '11:30 AM', date: 'Jul 9', stepTitle: 'Chat message', action: 'Welcome message delivered', status: 'Success' },
    ]
  },
  {
    id: 'lead_3',
    name: 'Nadia Turki',
    firstName: 'Nadia',
    lastName: 'Turki',
    title: 'Content & Social Lead',
    company: 'SaaS Pulse Labs',
    email: 'nadia@saaspulse.com',
    linkedinUrl: 'https://linkedin.com/in/nadia-turki',
    status: 'Completed',
    currentStepId: 'step_4',
    currentStepTitle: 'Chat message',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 5, 2026',
    lastActivity: 'Jul 14, 2026',
    hasVerifiedEmail: true,
    hasPhone: true,
    timeline: [
      { id: 't_7', timestamp: '09:45 AM', date: 'Jul 5', stepTitle: 'Visit profile', action: 'Profile viewed', status: 'Success' },
      { id: 't_8', timestamp: '10:15 AM', date: 'Jul 6', stepTitle: 'Invitation', action: 'Invitation note sent', status: 'Success' },
      { id: 't_9', timestamp: '04:00 PM', date: 'Jul 9', stepTitle: 'If Accepted', action: 'Invitation accepted', status: 'Success' },
    ]
  },
  {
    id: 'lead_4',
    name: 'Charlie Jordan',
    firstName: 'Charlie',
    lastName: 'Jordan',
    title: 'Head of Social Media & Community',
    company: 'Kite Growth Studio',
    email: '',
    linkedinUrl: 'https://linkedin.com/in/charlie-jordan',
    status: 'In progress',
    currentStepId: 'step_2',
    currentStepTitle: 'Invitation',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: 'Yesterday',
    nextActivity: 'Awaiting connection acceptance (Day 4/60)',
    hasVerifiedEmail: false,
    hasPhone: false,
    timeline: [
      { id: 't_10', timestamp: '10:20 AM', date: 'Jul 6', stepTitle: 'Visit profile', action: 'Profile visited', status: 'Success' },
      { id: 't_11', timestamp: '11:00 AM', date: 'Jul 7', stepTitle: 'Invitation', action: 'Connection request dispatched with personalized note', status: 'Success' },
    ]
  },
  {
    id: 'lead_5',
    name: 'Caterina Rose',
    firstName: 'Caterina',
    lastName: 'Rose',
    title: 'Social Marketing Specialist',
    company: 'Apex Digital Agency',
    email: '',
    linkedinUrl: 'https://linkedin.com/in/caterina-rose',
    status: 'In progress',
    currentStepId: 'step_2',
    currentStepTitle: 'Invitation',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: 'Yesterday',
    nextActivity: 'Check connection status',
    hasVerifiedEmail: false,
    hasPhone: true,
    timeline: [
      { id: 't_12', timestamp: '01:00 PM', date: 'Jul 6', stepTitle: 'Visit profile', action: 'Profile viewed', status: 'Success' },
      { id: 't_13', timestamp: '02:00 PM', date: 'Jul 7', stepTitle: 'Invitation', action: 'Invitation note sent', status: 'Success' },
    ]
  },
  {
    id: 'lead_6',
    name: 'Alice Kensington',
    firstName: 'Alice',
    lastName: 'Kensington',
    title: 'VP of Social & Paid Media',
    company: 'FinScale Capital UK',
    email: 'alice@finscale.co.uk',
    phone: '+44 20 8912 3456',
    linkedinUrl: 'https://linkedin.com/in/alice-kensington',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 3,
    addedAt: 'Jul 6, 2026',
    lastActivity: 'Today, 5:22 PM',
    nextActivity: 'Scheduled profile touch today 5:22 PM',
    hasVerifiedEmail: true,
    hasPhone: true,
    timeline: [
      { id: 't_14', timestamp: '05:00 PM', date: 'Today', stepTitle: 'Queue', action: 'Action queued: Connection request', status: 'Queued', note: 'Scheduled today 5:22 PM' }
    ]
  },
  {
    id: 'lead_7',
    name: 'Alisha Johnson',
    firstName: 'Alisha',
    lastName: 'Johnson',
    title: 'Growth Marketing & Social Lead',
    company: 'HyperScale Media',
    email: 'alisha@hyperscalemedia.com',
    linkedinUrl: 'https://linkedin.com/in/alisha-johnson',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: 'Yesterday',
    hasVerifiedEmail: true,
    hasPhone: false,
    timeline: []
  },
  {
    id: 'lead_8',
    name: 'Allison Ockerbloom',
    firstName: 'Allison',
    lastName: 'Ockerbloom',
    title: 'Head of Social Campaigns',
    company: 'BrandFlow Global',
    email: 'allison@brandflow.io',
    linkedinUrl: 'https://linkedin.com/in/allison-ockerbloom',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: '3d ago',
    hasVerifiedEmail: true,
    hasPhone: false,
    timeline: []
  },
  {
    id: 'lead_9',
    name: 'Alyssa Padilla',
    firstName: 'Alyssa',
    lastName: 'Padilla',
    title: 'Social & Organic Strategist',
    company: 'Nexus Creative',
    email: 'alyssa@nexuscreative.co',
    linkedinUrl: 'https://linkedin.com/in/alyssa-padilla',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: '3d ago',
    hasVerifiedEmail: true,
    hasPhone: false,
    timeline: []
  },
  {
    id: 'lead_10',
    name: 'Alyssa Parra',
    firstName: 'Alyssa',
    lastName: 'Parra',
    title: 'Senior Social Content Producer',
    company: 'Verve Studio UK',
    email: 'alyssa.p@vervestudio.co.uk',
    linkedinUrl: 'https://linkedin.com/in/alyssa-parra',
    status: 'In progress',
    currentStepId: 'step_1',
    currentStepTitle: 'Visit profile',
    owner: 'Asad Farooq',
    leadScore: 2,
    addedAt: 'Jul 6, 2026',
    lastActivity: '4d ago',
    hasVerifiedEmail: true,
    hasPhone: false,
    timeline: []
  }
];

const BENCHMARK_SEQUENCE: LinkedInStep[] = [
  {
    id: 'step_1',
    type: 'visit',
    title: 'Visit profile',
    subtitle: 'Stealth profile viewing with dedicated residential proxy',
    timingLabel: 'Send immediately',
    stats: {
      reached: 145,
      completed: 145,
      pending: 0,
      toCome: 65,
      failed: 0,
      skipped: 0,
      successRate: 100,
    }
  },
  {
    id: 'step_2',
    type: 'connect',
    title: 'Invitation',
    subtitle: 'Send personalized 1st-degree connection invitation note',
    timingLabel: 'Send immediately',
    config: {
      note: 'Hi {{firstName}}, loved what you\'re building at {{company}}! Would love to connect and follow your work in social marketing.',
      spintax: true,
      variables: ['firstName', 'company'],
      characterLimit: 300,
    },
    stats: {
      reached: 57,
      completed: 57,
      pending: 0,
      toCome: 87,
      failed: 0,
      skipped: 0,
      successRate: 100,
    }
  },
  {
    id: 'step_3',
    type: 'condition',
    title: 'If Accepted invite within 60 days',
    subtitle: 'Checks 1st-degree status for 60 days and branches execution',
    config: {
      conditionType: 'invite_accepted',
      conditionTargetDays: 60,
    },
    stats: {
      reached: 32,
      completed: 32,
      pending: 0,
      toCome: 25,
      failed: 0,
      skipped: 0,
    },
    yesBranch: [
      {
        id: 'step_4a',
        type: 'message',
        title: 'Chat message',
        subtitle: 'First value touchpoint in LinkedIn direct messaging',
        timingLabel: 'Send immediately',
        config: {
          body: 'Hi {{firstName}},\n\nThanks for connecting! Managing complex social workflows across multiple clients is never easy.\n\nAre you looking for reliable remote creative support for your client teams, or is your team already well-staffed?',
          spintax: true,
          variables: ['firstName'],
        },
        stats: {
          reached: 4,
          completed: 2,
          pending: 0,
          toCome: 2,
          failed: 0,
          skipped: 0,
          successRate: 50,
        }
      },
      {
        id: 'step_4b',
        type: 'delay',
        title: 'Wait for 2 days',
        subtitle: 'Wait 2 business days before sending follow-up message',
        timingLabel: 'Wait for 2 days',
        waitDurationDays: 2,
        businessDaysOnly: true,
      },
      {
        id: 'step_4c',
        type: 'message',
        title: 'Chat message',
        subtitle: 'Follow-up message with concrete case study',
        timingLabel: 'Wait for 2 days',
        config: {
          body: 'Hi {{firstName}},\n\nJust following up on my previous note! If you ever need creative support with video, motion design, or social media assets, let me know. Happy to share some portfolio examples.',
          variables: ['firstName'],
        },
        stats: {
          reached: 2,
          completed: 0,
          pending: 0,
          toCome: 2,
          failed: 0,
          skipped: 0,
          successRate: 0,
        }
      },
      {
        id: 'step_4d',
        type: 'delay',
        title: 'Wait for 2 days',
        subtitle: 'Wait 2 business days before final touchpoint',
        timingLabel: 'Wait for 2 days',
        waitDurationDays: 2,
        businessDaysOnly: true,
      },
      {
        id: 'step_4e',
        type: 'message',
        title: 'Chat message',
        subtitle: 'Final polite closing message',
        timingLabel: 'Wait for 2 days',
        config: {
          body: 'Hi {{firstName}},\n\nFinal check-in! If now is not a good time, no worries at all. Let\'s keep in touch here on LinkedIn. Wishing you all the best!',
          variables: ['firstName'],
        },
        stats: {
          reached: 2,
          completed: 0,
          pending: 0,
          toCome: 2,
          failed: 0,
          skipped: 0,
          successRate: 0,
        }
      }
    ],
    noBranch: [
      {
        id: 'step_no_end',
        type: 'stop',
        title: 'End',
        subtitle: 'Invitation unaccepted after 60 days — sequence concluded',
        stats: {
          reached: 28,
          completed: 28,
          pending: 0,
          toCome: 0,
          failed: 0,
          skipped: 0,
        }
      }
    ]
  }
];

const BENCHMARK_QUEUE: LinkedInQueueItem[] = [
  {
    id: 'q_1',
    campaignId: 'camp_uk_saas',
    campaignName: 'Social Media Manager UK US CA',
    leadId: 'lead_6',
    leadName: 'Alice Kensington',
    leadTitle: 'VP of Social & Paid Media',
    leadCompany: 'FinScale Capital UK',
    actionType: 'connect',
    actionTitle: 'Connection request',
    scheduledAt: 'Today 5:22 PM',
    status: 'Pending',
    reason: 'Scheduled today 5:22 PM (within business hours)',
    retryCount: 0,
  },
  {
    id: 'q_2',
    campaignId: 'camp_uk_saas',
    campaignName: 'Social Media Manager UK US CA',
    leadId: 'lead_7',
    leadName: 'Alisha Johnson',
    leadTitle: 'Growth Marketing & Social Lead',
    leadCompany: 'HyperScale Media',
    actionType: 'visit',
    actionTitle: 'Profile visit',
    scheduledAt: 'Tomorrow 9:15 AM',
    status: 'Scheduled',
    reason: 'Waiting for tomorrow\'s business hours window (9:00 AM - 5:00 PM GMT)',
    retryCount: 0,
  },
  {
    id: 'q_3',
    campaignId: 'camp_uk_saas',
    campaignName: 'Social Media Manager UK US CA',
    leadId: 'lead_8',
    leadName: 'Allison Ockerbloom',
    leadTitle: 'Head of Social Campaigns',
    leadCompany: 'BrandFlow Global',
    actionType: 'connect',
    actionTitle: 'Connection request',
    scheduledAt: 'Tomorrow 11:30 AM',
    status: 'Rate limited',
    reason: 'Waiting for available LinkedIn capacity: Account daily connection limit reached (20/20 used)',
    retryCount: 0,
  },
  {
    id: 'q_4',
    campaignId: 'camp_uk_saas',
    campaignName: 'Social Media Manager UK US CA',
    leadId: 'lead_9',
    leadName: 'Alyssa Padilla',
    leadTitle: 'Social & Organic Strategist',
    leadCompany: 'Nexus Creative',
    actionType: 'visit',
    actionTitle: 'Profile visit',
    scheduledAt: 'Yesterday 4:00 PM',
    status: 'Completed',
    reason: 'Dispatched successfully via London 4G proxy',
    retryCount: 0,
  },
  {
    id: 'q_5',
    campaignId: 'camp_uk_saas',
    campaignName: 'Social Media Manager UK US CA',
    leadId: 'lead_10',
    leadName: 'Alyssa Parra',
    leadTitle: 'Senior Social Content Producer',
    leadCompany: 'Verve Studio UK',
    actionType: 'connect',
    actionTitle: 'Connection request',
    scheduledAt: 'Yesterday 2:45 PM',
    status: 'Failed',
    reason: 'LinkedIn connection request was not sent because prospect profile requires email verification.',
    retryCount: 1,
    errorReason: 'Email required to connect',
  }
];

const INITIAL_CAMPAIGNS: LinkedInCampaign[] = [
  {
    id: 'camp_uk_saas',
    name: 'Social Media Manager UK US CA',
    description: 'Targeted outreach to heads of social, brand, and growth marketing across UK, US, and Canada.',
    tags: ['Social Media', 'UK & US', 'Growth Agencies'],
    owner: 'Asad Farooq',
    accountId: 'acc_asad',
    accountName: 'Asad Farooq',
    status: 'Paused',
    targetAudience: 'Social Media Managers, Growth Leads, Brand Directors',
    targetCount: 210,
    invitesSent: 57,
    connected: 6,
    messagesSent: 14,
    replied: 0,
    meetings: 0,
    interested: 0,
    createdAt: '2026-07-05',
    lastActivity: '2h ago',
    sequence: BENCHMARK_SEQUENCE,
    leadsList: BENCHMARK_LEADS,
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startHour: '09:00',
      endHour: '17:00',
      timezone: 'Europe/London (GMT+1)',
    },
    limits: {
      dailyInvites: 20,
      dailyMessages: 30,
      dailyVisits: 30,
    },
    safety: {
      randomDelayMinSeconds: 180,
      randomDelayMaxSeconds: 420,
      warmupMode: true,
      proxyLocation: 'London, United Kingdom (Residential 4G)',
    },
    stopConditions: {
      stopOnReply: true,
      stopOnConnection: false,
      stopOnManualContact: true,
      stopOnRemoved: true,
    },
    queue: BENCHMARK_QUEUE,
    performanceFunnel: {
      contacted: 144,
      contactedPct: 68.6,
      opened: 6,
      openedPct: 2.9,
      interaction: 6,
      interactionPct: 2.9,
      answered: 0,
      answeredPct: 0,
      interested: 0,
      interestedPct: 0,
      interrupted: 1,
      interruptedPct: 0.5,
      total: 210,
    }
  },
  {
    id: 'lcamp_1',
    name: 'VP Sales & RevOps Leaders Outreach (US-East)',
    description: 'Enterprise outreach to VP Sales and CROs across Series B+ B2B software companies.',
    tags: ['RevOps', 'VP Sales', 'US-East'],
    owner: 'Sarah Jenkins',
    accountId: 'acc_1',
    accountName: 'Sarah Jenkins',
    status: 'Running',
    targetAudience: 'VP Sales, Head of Revenue, CRO',
    targetCount: 450,
    invitesSent: 320,
    connected: 128,
    messagesSent: 110,
    replied: 42,
    meetings: 18,
    interested: 24,
    createdAt: '2026-08-14',
    lastActivity: '12m ago',
    sequence: BENCHMARK_SEQUENCE,
    leadsList: BENCHMARK_LEADS.slice(0, 5),
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startHour: '09:00',
      endHour: '17:00',
      timezone: 'America/New_York (EST)',
    },
    limits: { dailyInvites: 25, dailyMessages: 35, dailyVisits: 35 },
    safety: { randomDelayMinSeconds: 180, randomDelayMaxSeconds: 360, warmupMode: false, proxyLocation: 'New York, US' },
    stopConditions: { stopOnReply: true, stopOnConnection: false, stopOnManualContact: true, stopOnRemoved: true },
    queue: [],
    performanceFunnel: { contacted: 320, contactedPct: 71.1, opened: 128, openedPct: 28.4, interaction: 42, interactionPct: 9.3, answered: 42, answeredPct: 9.3, interested: 24, interestedPct: 5.3, interrupted: 4, interruptedPct: 0.8, total: 450 }
  },
  {
    id: 'lcamp_2',
    name: 'FinTech Founders & Seed Stage Execs',
    description: 'Early touchpoints with FinTech founders offering automated lead research and pipeline scaling.',
    tags: ['FinTech', 'Founders'],
    owner: 'Marcus Vance',
    accountId: 'acc_2',
    accountName: 'Marcus Vance',
    status: 'Running',
    targetAudience: 'Founder, Co-Founder, CEO',
    targetCount: 300,
    invitesSent: 210,
    connected: 94,
    messagesSent: 82,
    replied: 28,
    meetings: 12,
    interested: 16,
    createdAt: '2026-08-18',
    lastActivity: '28m ago',
    sequence: BENCHMARK_SEQUENCE,
    leadsList: BENCHMARK_LEADS.slice(0, 4),
    schedule: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], startHour: '09:00', endHour: '17:00', timezone: 'America/Los_Angeles (PST)' },
    limits: { dailyInvites: 25, dailyMessages: 35, dailyVisits: 35 },
    safety: { randomDelayMinSeconds: 180, randomDelayMaxSeconds: 420, warmupMode: true, proxyLocation: 'San Francisco, US' },
    stopConditions: { stopOnReply: true, stopOnConnection: false, stopOnManualContact: true, stopOnRemoved: true },
    queue: [],
    performanceFunnel: { contacted: 210, contactedPct: 70.0, opened: 94, openedPct: 31.3, interaction: 28, interactionPct: 9.3, answered: 28, answeredPct: 9.3, interested: 16, interestedPct: 5.3, interrupted: 2, interruptedPct: 0.6, total: 300 }
  }
];

const INITIAL_ACCOUNTS: LinkedInAccount[] = [
  {
    id: 'acc_asad',
    name: 'Asad Farooq',
    title: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://linkedin.com/in/asad-farooq',
    status: 'Connected',
    safetyScore: 99,
    dailyInvitesSent: 12,
    dailyInvitesLimit: 20,
    dailyVisitsSent: 18,
    dailyVisitsLimit: 30,
    dailyMessagesSent: 8,
    dailyMessagesLimit: 30,
    actionsUsedToday: 38,
    dailyActionsLimit: 80,
    proxyIp: '198.51.100.42 (Residential 4G)',
    proxyLocation: 'London, United Kingdom',
    connectionCount: 3120,
    lastSync: 'Just now',
  },
  {
    id: 'acc_1',
    name: 'Sarah Jenkins',
    title: 'VP of Growth & Enterprise Outbound',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://linkedin.com/in/sarah-jenkins',
    status: 'Connected',
    safetyScore: 98,
    dailyInvitesSent: 22,
    dailyInvitesLimit: 25,
    dailyVisitsSent: 20,
    dailyVisitsLimit: 35,
    dailyMessagesSent: 16,
    dailyMessagesLimit: 35,
    actionsUsedToday: 58,
    dailyActionsLimit: 95,
    proxyIp: '198.51.100.89 (Residential 4G)',
    proxyLocation: 'New York, US',
    connectionCount: 2480,
    lastSync: '4m ago',
  },
  {
    id: 'acc_2',
    name: 'Marcus Vance',
    title: 'Head of RevOps & Pipeline Architecture',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    profileUrl: 'https://linkedin.com/in/marcus-vance',
    status: 'Connected',
    safetyScore: 97,
    dailyInvitesSent: 14,
    dailyInvitesLimit: 25,
    dailyVisitsSent: 18,
    dailyVisitsLimit: 30,
    dailyMessagesSent: 12,
    dailyMessagesLimit: 30,
    actionsUsedToday: 44,
    dailyActionsLimit: 85,
    proxyIp: '198.51.100.114 (Residential 4G)',
    proxyLocation: 'San Francisco, US',
    connectionCount: 1920,
    lastSync: '8m ago',
  }
];

const INITIAL_PROXIES: LinkedInProxy[] = [
  { id: 'prx_1', name: 'UK-London Residential Node 01', ip: '198.51.100.42', port: 8443, location: 'London, United Kingdom', type: 'Residential 4G', latency: '34ms', assignedAccount: 'Asad Farooq', status: 'Healthy', lastChecked: 'Just now' },
  { id: 'prx_2', name: 'US-East Residential Node 02', ip: '198.51.100.89', port: 8443, location: 'New York, United States', type: 'Residential 4G', latency: '42ms', assignedAccount: 'Sarah Jenkins', status: 'Healthy', lastChecked: '2m ago' },
  { id: 'prx_3', name: 'US-West Residential Node 03', ip: '198.51.100.114', port: 8443, location: 'San Francisco, United States', type: 'Residential 4G', latency: '38ms', assignedAccount: 'Marcus Vance', status: 'Healthy', lastChecked: '5m ago' },
];

const INITIAL_AUTOMATION: LinkedInAutomationRule[] = [
  {
    id: 'rule_1',
    name: 'Auto Profile Visit + Warm Connection Invite',
    trigger: 'Prospect added to Campaign',
    action: 'Visit Profile → Wait 2 Hours → Send Connection Note',
    stepsCount: 4,
    steps: ['Visit Profile', 'Wait 2 Hours', 'Send Connection Request', 'Check Acceptance'],
    delayHours: 2,
    condition: 'If 2nd or 3rd degree connection',
    status: 'Active',
    runsCount: 1420,
    successRate: 98.4,
    lastRun: '4m ago',
  },
  {
    id: 'rule_2',
    name: 'First Follow-Up After Connection Accepted',
    trigger: 'Connection Accepted',
    action: 'Wait 24 Hours → Send Value-Add Case Study Message',
    stepsCount: 3,
    steps: ['Detect Connection', 'Wait 24 Hours', 'Send Welcome Message'],
    delayHours: 24,
    condition: 'If no reply received in 24h',
    status: 'Active',
    runsCount: 890,
    successRate: 96.2,
    lastRun: '18m ago',
  }
];

const INITIAL_LOGS: LinkedInLog[] = [
  { id: 'log_1', timestamp: '2m ago', account: 'Asad Farooq (UK-London)', prospectName: 'Florence Famurewa', company: 'FinTech Velocity UK', action: 'Profile Visit', status: 'Success', duration: '420ms', details: 'Profile viewed via London 4G proxy' },
  { id: 'log_2', timestamp: '14m ago', account: 'Sarah Jenkins (US-East)', prospectName: 'David Chen', company: 'SaaSFlow Systems', action: 'Connection Accepted', status: 'Success', duration: '240ms', details: 'Prospect accepted 1st degree invitation' },
  { id: 'log_3', timestamp: '25m ago', account: 'Marcus Vance (US-West)', prospectName: 'Elena Rostova', company: 'FinTech Stack', action: 'Message Sent', status: 'Success', duration: '520ms', details: 'Dispatched Touch #2 value proposition' },
];

const INITIAL_PROSPECTS: LinkedInProspect[] = [
  { id: 'p_1', name: 'David Chen', title: 'Head of Sales Operations', company: 'SaaSFlow Systems', location: 'New York, NY', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', profileUrl: 'https://linkedin.com/in/davidchen', connectionStatus: '1st Degree', campaignName: 'VP Sales & RevOps Leaders Outreach', status: 'Replied', leadScore: 96, lastActivity: '2m ago' },
  { id: 'p_2', name: 'Elena Rostova', title: 'Chief Revenue Officer', company: 'FinTech Stack', location: 'San Francisco, CA', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', profileUrl: 'https://linkedin.com/in/elenarostova', connectionStatus: '1st Degree', campaignName: 'FinTech Founders & Seed Stage Execs', status: 'Converted', leadScore: 94, lastActivity: '8m ago' },
];

const INITIAL_CONNECTIONS: LinkedInConnection[] = [
  { id: 'c_1', name: 'David Chen', title: 'Head of Sales Operations', company: 'SaaSFlow Systems', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', connectedAt: 'Today', messagesCount: 4, status: '1st Degree', sourceCampaign: 'VP Sales & RevOps Leaders Outreach' },
  { id: 'c_2', name: 'Elena Rostova', title: 'Chief Revenue Officer', company: 'FinTech Stack', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', connectedAt: 'Yesterday', messagesCount: 2, status: '1st Degree', sourceCampaign: 'FinTech Founders & Seed Stage Execs' },
];

const INITIAL_VISITS: LinkedInVisit[] = [
  { id: 'v_1', prospectName: 'Florence Famurewa', title: 'Senior Social Media Specialist', company: 'FinTech Velocity UK', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', timestamp: '2h ago', status: 'Viewed', source: 'Social Media Manager UK US CA', intent: 'High Intent' },
];

const INITIAL_MESSAGES: LinkedInMessageThread[] = [
  {
    id: 'm_1',
    prospectName: 'David Chen',
    title: 'Head of Sales Operations',
    company: 'SaaSFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Let\'s chat Thursday. Send over your calendar link.',
    timestamp: '25m ago',
    unread: true,
    needsFollowUp: true,
    messages: [
      { id: 'msg_1', sender: 'user', text: 'Hi David, noticed your team expanded the sales engineering wing at SaaSFlow. Are you evaluating multi-channel AI outbound tools this quarter?', timestamp: 'Yesterday, 10:14 AM' },
      { id: 'msg_2', sender: 'prospect', text: 'Hey Sarah, good timing. We are actually auditing our cold email and LinkedIn touchpoints right now.', timestamp: 'Yesterday, 2:30 PM' },
      { id: 'msg_3', sender: 'user', text: 'Awesome! We guarantee 99.4% deliverability with dedicated residential IP pacing. Would 15 mins this Thursday work?', timestamp: 'Today, 9:05 AM' },
      { id: 'msg_4', sender: 'prospect', text: 'Let\'s chat Thursday. Send over your calendar link.', timestamp: 'Today, 11:20 AM' },
    ]
  }
];

const INITIAL_INMAILS: LinkedInInMail[] = [
  { id: 'in_1', prospectName: 'Amira Patel', title: 'Founder & CEO', company: 'ScaleWave Media', subject: 'Multi-channel outbound infrastructure for ScaleWave', status: 'Replied', replyStatus: 'Requested Call', campaignName: 'FinTech Founders & Seed Stage Execs', creditsUsed: 1, sentDate: 'Today' },
];

const INITIAL_LEADS: LinkedInLead[] = [
  { id: 'ld_1', name: 'David Chen', title: 'Head of Sales Ops', company: 'SaaSFlow Systems', source: 'VP Sales Outreach', status: 'Meeting', owner: 'Sarah Jenkins', lastActivity: '2m ago', nextAction: 'Send Demo Calendar Link', dealValue: 32000 },
];

const INITIAL_ACTIVITIES: LinkedInActivityEvent[] = [
  { id: 'act_1', timestamp: '2m ago', type: 'Connection Accepted', account: 'Asad Farooq', description: 'David Chen accepted 1st-degree connection request.', prospectName: 'David Chen', company: 'SaaSFlow Systems', result: 'Accepted' },
];

// -------------------------------------------------------------
// CONTEXT IMPLEMENTATION
// -------------------------------------------------------------

const LinkedInContext = createContext<LinkedInContextType | undefined>(undefined);

export const LinkedInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<LinkedInTabType>('campaigns');
  const [campaigns, setCampaigns] = useState<LinkedInCampaign[]>(INITIAL_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<LinkedInWorkspaceTab>('sequence');

  const [automationRules, setAutomationRules] = useState<LinkedInAutomationRule[]>(INITIAL_AUTOMATION);
  const [executionLogs, setExecutionLogs] = useState<LinkedInLog[]>(INITIAL_LOGS);
  const [accounts, setAccounts] = useState<LinkedInAccount[]>(INITIAL_ACCOUNTS);
  const [proxies, setProxies] = useState<LinkedInProxy[]>(INITIAL_PROXIES);
  const [prospects, setProspects] = useState<LinkedInProspect[]>(INITIAL_PROSPECTS);
  const [connections, setConnections] = useState<LinkedInConnection[]>(INITIAL_CONNECTIONS);
  const [visits, setVisits] = useState<LinkedInVisit[]>(INITIAL_VISITS);
  const [messages, setMessages] = useState<LinkedInMessageThread[]>(INITIAL_MESSAGES);
  const [inmails, setInmails] = useState<LinkedInInMail[]>(INITIAL_INMAILS);
  const [leads, setLeads] = useState<LinkedInLead[]>(INITIAL_LEADS);
  const [activities, setActivities] = useState<LinkedInActivityEvent[]>(INITIAL_ACTIVITIES);

  // Derive active selected campaign
  const selectedCampaign = useMemo(() => {
    if (!selectedCampaignId) return null;
    return campaigns.find((c) => c.id === selectedCampaignId) || null;
  }, [campaigns, selectedCampaignId]);

  // Aggregate all queue items across all campaigns
  const allQueueItems = useMemo(() => {
    return campaigns.flatMap((c) => c.queue || []);
  }, [campaigns]);

  // Campaign Actions
  const createCampaign = useCallback((data: Partial<LinkedInCampaign>) => {
    const newCamp: LinkedInCampaign = {
      id: `camp_${Date.now()}`,
      name: data.name || 'Untitled LinkedIn Campaign',
      description: data.description || '',
      tags: data.tags || ['LinkedIn'],
      owner: data.owner || 'Asad Farooq',
      accountId: data.accountId || accounts[0]?.id || 'acc_asad',
      accountName: data.accountName || accounts[0]?.name || 'Asad Farooq',
      status: (data.status as any) || 'Running',
      targetAudience: data.targetAudience || 'Decision Makers',
      targetCount: data.targetCount || data.leadsList?.length || 200,
      invitesSent: 0,
      connected: 0,
      messagesSent: 0,
      replied: 0,
      meetings: 0,
      interested: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      sequence: data.sequence || BENCHMARK_SEQUENCE,
      leadsList: data.leadsList || BENCHMARK_LEADS,
      schedule: data.schedule || {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startHour: '09:00',
        endHour: '17:00',
        timezone: 'America/New_York (EST)',
      },
      limits: data.limits || { dailyInvites: 20, dailyMessages: 30, dailyVisits: 30 },
      safety: data.safety || { randomDelayMinSeconds: 180, randomDelayMaxSeconds: 420, warmupMode: true, proxyLocation: 'United States' },
      stopConditions: data.stopConditions || { stopOnReply: true, stopOnConnection: false, stopOnManualContact: true, stopOnRemoved: true },
      queue: data.queue || [],
      performanceFunnel: { contacted: 0, contactedPct: 0, opened: 0, openedPct: 0, interaction: 0, interactionPct: 0, answered: 0, answeredPct: 0, interested: 0, interestedPct: 0, interrupted: 0, interruptedPct: 0, total: data.targetCount || 200 }
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    setSelectedCampaignId(newCamp.id);
    success(`Campaign "${newCamp.name}" successfully created!`, 'Campaign Ready');
  }, [accounts, success]);

  const updateCampaign = useCallback((id: string, data: Partial<LinkedInCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data, lastActivity: 'Just now' } : c))
    );
    success('Campaign parameters updated successfully.', 'Campaign Updated');
  }, [success]);

  const toggleCampaignStatus = useCallback((id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Running' ? 'Paused' : 'Running';
          // If pausing, mark queue actions as paused/held
          const updatedQueue = (c.queue || []).map((q) => {
            if (nextStatus === 'Paused' && (q.status === 'Pending' || q.status === 'Scheduled')) {
              return { ...q, reason: 'Paused: campaign is currently on hold' };
            } else if (nextStatus === 'Running' && q.reason?.includes('Paused')) {
              return { ...q, reason: 'Scheduled according to campaign window and account limits' };
            }
            return q;
          });
          success(`Campaign status changed to ${nextStatus}.`, 'Status Updated');
          return { ...c, status: nextStatus, queue: updatedQueue, lastActivity: 'Just now' };
        }
        return c;
      })
    );
  }, [success]);

  const duplicateCampaign = useCallback((id: string) => {
    const source = campaigns.find((c) => c.id === id);
    if (!source) return;
    const duplicated: LinkedInCampaign = {
      ...source,
      id: `camp_${Date.now()}`,
      name: `${source.name} (Copy)`,
      status: 'Draft',
      invitesSent: 0,
      connected: 0,
      messagesSent: 0,
      replied: 0,
      meetings: 0,
      interested: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Draft created',
      leadsList: [], // Fresh leads needed
      queue: [],
      performanceFunnel: { contacted: 0, contactedPct: 0, opened: 0, openedPct: 0, interaction: 0, interactionPct: 0, answered: 0, answeredPct: 0, interested: 0, interestedPct: 0, interrupted: 0, interruptedPct: 0, total: 0 }
    };
    setCampaigns((prev) => [duplicated, ...prev]);
    setSelectedCampaignId(duplicated.id);
    success(`Campaign duplicated as "${duplicated.name}". Please add leads before launch.`, 'Campaign Duplicated');
  }, [campaigns, success]);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    if (selectedCampaignId === id) {
      setSelectedCampaignId(null);
    }
    success('Campaign deleted successfully.', 'Campaign Removed');
  }, [selectedCampaignId, success]);

  const archiveCampaign = useCallback((id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Completed', lastActivity: 'Archived' } : c))
    );
    success('Campaign archived.', 'Campaign Archived');
  }, [success]);

  const updateCampaignSequence = useCallback((campaignId: string, sequence: LinkedInStep[]) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, sequence, lastActivity: 'Just now' } : c))
    );
    success('Sequence updated.', 'Sequence Saved');
  }, [success]);

  const addLeadsToCampaign = useCallback((campaignId: string, newLeads: Partial<LinkedInCampaignLead>[]) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        const mappedLeads: LinkedInCampaignLead[] = newLeads.map((l, idx) => ({
          id: l.id || `lead_${Date.now()}_${idx}`,
          name: l.name || `${l.firstName || 'Lead'} ${l.lastName || ''}`.trim(),
          firstName: l.firstName || l.name?.split(' ')[0] || 'Prospect',
          lastName: l.lastName || l.name?.split(' ').slice(1).join(' ') || '',
          title: l.title || 'Growth Executive',
          company: l.company || 'ScaleUp Labs',
          email: l.email || '',
          phone: l.phone || '',
          linkedinUrl: l.linkedinUrl || 'https://linkedin.com',
          status: 'In progress',
          currentStepId: c.sequence[0]?.id || 'step_1',
          currentStepTitle: c.sequence[0]?.title || 'Visit profile',
          owner: c.owner || 'Asad Farooq',
          leadScore: l.leadScore || 2,
          addedAt: 'Just now',
          lastActivity: 'Enrolled in campaign',
          hasVerifiedEmail: Boolean(l.email),
          hasPhone: Boolean(l.phone),
          timeline: [
            {
              id: `t_${Date.now()}_${idx}`,
              timestamp: 'Just now',
              date: 'Today',
              stepTitle: 'Enrollment',
              action: `Enrolled in "${c.name}"`,
              status: 'Success',
            }
          ]
        }));
        return {
          ...c,
          leadsList: [...c.leadsList, ...mappedLeads],
          targetCount: c.targetCount + mappedLeads.length,
          lastActivity: 'Just now'
        };
      })
    );
    success(`${newLeads.length} leads successfully added to campaign.`, 'Leads Added');
  }, [success]);

  const removeLeadFromCampaign = useCallback((campaignId: string, leadId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        return {
          ...c,
          leadsList: c.leadsList.filter((l) => l.id !== leadId),
          queue: c.queue.filter((q) => q.leadId !== leadId),
        };
      })
    );
    success('Lead removed from campaign.', 'Lead Removed');
  }, [success]);

  const updateLeadInCampaign = useCallback((campaignId: string, leadId: string, updates: Partial<LinkedInCampaignLead>) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        return {
          ...c,
          leadsList: c.leadsList.map((l) => (l.id === leadId ? { ...l, ...updates, lastActivity: 'Just now' } : l))
        };
      })
    );
  }, []);

  const enrichCampaignLeads = useCallback((campaignId: string, type: 'emails' | 'phones' | 'profiles' | 'verify') => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        const enriched = c.leadsList.map((l) => {
          if (type === 'emails' && !l.email) {
            const cleanDomain = l.company.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company';
            return {
              ...l,
              email: `${l.firstName.toLowerCase()}.${l.lastName.toLowerCase() || 'contact'}@${cleanDomain}.com`,
              hasVerifiedEmail: true,
            };
          }
          if (type === 'phones' && !l.phone) {
            return {
              ...l,
              phone: `+44 20 ${Math.floor(Math.random() * 8999 + 1000)} ${Math.floor(Math.random() * 8999 + 1000)}`,
              hasPhone: true,
            };
          }
          if (type === 'verify') {
            return { ...l, hasVerifiedEmail: true };
          }
          return l;
        });
        return { ...c, leadsList: enriched, lastActivity: 'Enrichment complete' };
      })
    );
    const label = type === 'emails' ? 'Emails found' : type === 'phones' ? 'Phone numbers enriched' : 'Data verified';
    success(`AI Enrichment complete: ${label} for campaign leads.`, 'Enrichment Success');
  }, [success]);

  // Queue Handlers
  const executeQueueAction = useCallback((itemId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        const item = c.queue.find((q) => q.id === itemId);
        if (!item) return c;

        // Simulate execution
        const updatedQueue = c.queue.map((q) =>
          q.id === itemId
            ? { ...q, status: 'Completed' as const, reason: 'Dispatched successfully via dedicated proxy' }
            : q
        );

        // Append to lead timeline
        const updatedLeads = c.leadsList.map((l) => {
          if (l.id === item.leadId) {
            return {
              ...l,
              status: (item.actionType === 'connect' ? 'In progress' : 'In progress') as any,
              lastActivity: 'Just now',
              timeline: [
                ...l.timeline,
                {
                  id: `t_${Date.now()}`,
                  timestamp: 'Just now',
                  date: 'Today',
                  stepTitle: item.actionTitle,
                  action: `${item.actionTitle} dispatched via ${c.safety.proxyLocation}`,
                  status: 'Success' as const,
                }
              ]
            };
          }
          return l;
        });

        return {
          ...c,
          queue: updatedQueue,
          leadsList: updatedLeads,
          invitesSent: item.actionType === 'connect' ? c.invitesSent + 1 : c.invitesSent,
          messagesSent: item.actionType === 'message' ? c.messagesSent + 1 : c.messagesSent,
        };
      })
    );
    success('Action executed and verified via dedicated residential proxy.', 'Action Completed');
  }, [success]);

  const retryQueueAction = useCallback((itemId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => ({
        ...c,
        queue: c.queue.map((q) =>
          q.id === itemId
            ? { ...q, status: 'Pending' as const, retryCount: q.retryCount + 1, reason: 'Retrying action now...' }
            : q
        )
      }))
    );
    info('Retrying queued action in next dispatch interval.', 'Retrying Action');
  }, [info]);

  const skipQueueAction = useCallback((itemId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => ({
        ...c,
        queue: c.queue.map((q) =>
          q.id === itemId
            ? { ...q, status: 'Skipped' as const, reason: 'Manually skipped by operator' }
            : q
        )
      }))
    );
    success('Action skipped.', 'Action Skipped');
  }, [success]);

  const pauseQueueAction = useCallback((itemId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => ({
        ...c,
        queue: c.queue.map((q) =>
          q.id === itemId
            ? { ...q, status: 'Pending' as const, reason: 'Paused: waiting for manual resumption' }
            : q
        )
      }))
    );
    info('Action postponed.', 'Paused');
  }, [info]);

  // Legacy & Auxiliary Actions (preserved for existing views)
  const createAutomationRule = useCallback((rule: Partial<LinkedInAutomationRule>) => {
    const newRule: LinkedInAutomationRule = {
      id: `rule_${Date.now()}`,
      name: rule.name || 'Custom LinkedIn Automation Rule',
      trigger: rule.trigger || 'Prospect Added to Campaign',
      action: rule.action || 'Visit Profile → Send Connection Request',
      stepsCount: rule.stepsCount || 3,
      steps: rule.steps || ['Visit Profile', 'Wait 2 Hours', 'Send Connection Request'],
      delayHours: rule.delayHours || 2,
      condition: rule.condition || 'If 2nd or 3rd degree connection',
      status: 'Active',
      runsCount: 0,
      successRate: 100,
      lastRun: 'Just now',
    };
    setAutomationRules((prev) => [newRule, ...prev]);
    success(`Automation rule "${newRule.name}" active.`, 'Rule Created');
  }, [success]);

  const toggleAutomationRule = useCallback((id: string) => {
    setAutomationRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = r.status === 'Active' ? 'Paused' : 'Active';
          return { ...r, status: next };
        }
        return r;
      })
    );
  }, []);

  const deleteAutomationRule = useCallback((id: string) => {
    setAutomationRules((prev) => prev.filter((r) => r.id !== id));
    success('Automation rule removed.', 'Rule Deleted');
  }, [success]);

  const connectAccount = useCallback((acc: Partial<LinkedInAccount>) => {
    const newAcc: LinkedInAccount = {
      id: `acc_${Date.now()}`,
      name: acc.name || 'Asad Farooq',
      title: acc.title || 'Enterprise Sales Leader',
      avatar: acc.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      profileUrl: acc.profileUrl || 'https://linkedin.com',
      status: 'Connected',
      safetyScore: 100,
      dailyInvitesSent: 0,
      dailyInvitesLimit: 20,
      dailyVisitsSent: 0,
      dailyVisitsLimit: 30,
      dailyMessagesSent: 0,
      dailyMessagesLimit: 30,
      actionsUsedToday: 0,
      dailyActionsLimit: 80,
      proxyIp: '198.51.100.99 (Residential 4G)',
      proxyLocation: 'London, UK',
      connectionCount: 500,
      lastSync: 'Just now',
    };
    setAccounts((prev) => [newAcc, ...prev]);
    success(`LinkedIn account "${newAcc.name}" safely connected via dedicated proxy.`, 'Account Connected');
  }, [success]);

  const toggleAccountStatus = useCallback((id: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'Connected' ? 'Paused' : 'Connected' } : a))
    );
  }, []);

  const disconnectAccount = useCallback((id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    success('LinkedIn profile disconnected.', 'Account Disconnected');
  }, [success]);

  const addProxy = useCallback((p: Partial<LinkedInProxy>) => {
    const newProxy: LinkedInProxy = {
      id: `prx_${Date.now()}`,
      name: p.name || 'Dedicated Residential Proxy',
      ip: p.ip || '198.51.100.150',
      port: p.port || 8443,
      location: p.location || 'United States',
      type: p.type || 'Residential 4G',
      latency: '45ms',
      assignedAccount: p.assignedAccount || 'Unassigned Pool',
      status: 'Healthy',
      lastChecked: 'Just now',
    };
    setProxies((prev) => [newProxy, ...prev]);
    success(`Proxy ${newProxy.ip} added and tested.`, 'Proxy Added');
  }, [success]);

  const removeProxy = useCallback((id: string) => {
    setProxies((prev) => prev.filter((p) => p.id !== id));
    success('Proxy removed from pool.', 'Proxy Deleted');
  }, [success]);

  const testProxy = useCallback((id: string) => {
    setProxies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, latency: `${Math.floor(Math.random() * 30 + 35)}ms`, lastChecked: 'Just now', status: 'Healthy' } : p))
    );
    success('Proxy latency verified: 0% packet loss.', 'Proxy Health OK');
  }, [success]);

  const sendInvite = useCallback((prospectId: string) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === prospectId ? { ...p, connectionStatus: 'Pending', status: 'In Outreach' } : p))
    );
    success('Connection request dispatched with personalized note.', 'Invite Dispatched');
  }, [success]);

  const addProspectToCampaign = useCallback((prospectId: string, campaignName: string) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === prospectId ? { ...p, campaignName, status: 'In Outreach' } : p))
    );
    success(`Prospect enrolled in "${campaignName}".`, 'Prospect Enrolled');
  }, [success]);

  const removeProspect = useCallback((prospectId: string) => {
    setProspects((prev) => prev.filter((p) => p.id !== prospectId));
    success('Prospect removed.', 'Removed');
  }, [success]);

  const sendMessage = useCallback((threadId: string, text: string) => {
    const newMsg: LinkedInChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };
    setMessages((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMessage: text,
              timestamp: 'Just now',
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );
    success('Message sent via dedicated residential proxy.', 'Message Delivered');
  }, [success]);

  const sendInMail = useCallback((prospectId: string, subject: string, message: string) => {
    success(`InMail "${subject}" dispatched. 1 InMail credit used.`, 'InMail Sent');
  }, [success]);

  const composeInMail = useCallback((data: Partial<LinkedInInMail>) => {
    const newInMail: LinkedInInMail = {
      id: `in_${Date.now()}`,
      prospectName: data.prospectName || 'Target Executive',
      title: data.title || 'Decision Maker',
      company: data.company || 'Enterprise Account',
      subject: data.subject || 'Strategic Introduction',
      status: 'Delivered',
      replyStatus: 'Pending Response',
      campaignName: data.campaignName || 'InMail Outreach Studio',
      creditsUsed: 1,
      sentDate: 'Today',
    };
    setInmails((prev) => [newInMail, ...prev]);
    success(`InMail dispatched to ${newInMail.prospectName}. 1 credit deducted.`, 'InMail Sent');
  }, [success]);

  const updateLeadStage = useCallback((leadId: string, stage: LinkedInLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage, status: stage, lastActivity: 'Just now' } : l))
    );
    success(`Lead moved to "${stage}".`, 'Pipeline Updated');
  }, [success]);

  const addLead = useCallback((leadData: Partial<LinkedInLead>) => {
    const newL: LinkedInLead = {
      id: `ld_${Date.now()}`,
      name: leadData.name || 'New Lead',
      title: leadData.title || 'VP of Technology',
      company: leadData.company || 'Growth Tech Inc',
      source: leadData.source || 'LinkedIn Safe Inbound',
      status: leadData.status || 'New Leads',
      owner: leadData.owner || 'Asad Farooq',
      lastActivity: 'Just now',
      nextAction: leadData.nextAction || 'Send Intro Message',
      dealValue: leadData.dealValue || 30000,
    };
    setLeads((prev) => [newL, ...prev]);
    success(`Lead "${newL.name}" created.`, 'Lead Added');
  }, [success]);

  return (
    <LinkedInContext.Provider
      value={{
        activeTab,
        setActiveTab,
        campaigns,
        selectedCampaignId,
        setSelectedCampaignId,
        selectedCampaign,
        activeWorkspaceTab,
        setActiveWorkspaceTab,
        automationRules,
        executionLogs,
        accounts,
        proxies,
        prospects,
        connections,
        visits,
        messages,
        inmails,
        leads,
        activities,
        allQueueItems,

        createCampaign,
        updateCampaign,
        toggleCampaignStatus,
        duplicateCampaign,
        deleteCampaign,
        archiveCampaign,
        updateCampaignSequence,
        addLeadsToCampaign,
        removeLeadFromCampaign,
        updateLeadInCampaign,
        enrichCampaignLeads,

        executeQueueAction,
        retryQueueAction,
        skipQueueAction,
        pauseQueueAction,

        createAutomationRule,
        toggleAutomationRule,
        deleteAutomationRule,
        connectAccount,
        toggleAccountStatus,
        disconnectAccount,
        addProxy,
        removeProxy,
        testProxy,
        sendInvite,
        addProspectToCampaign,
        removeProspect,
        sendMessage,
        sendInMail,
        composeInMail,
        updateLeadStage,
        addLead,
      }}
    >
      {children}
    </LinkedInContext.Provider>
  );
};

export const useLinkedIn = () => {
  const context = useContext(LinkedInContext);
  if (!context) {
    throw new Error('useLinkedIn must be used within a LinkedInProvider');
  }
  return context;
};
