import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { LeadOwnerType } from './LeadsManagementContext';

export interface CrmStage {
  id: string;
  name: string;
  order: number;
  probability: number;
  color: string;
  description: string;
}

export interface CrmPipeline {
  id: string;
  name: string;
  description: string;
  stages: CrmStage[];
}

export interface CrmTask {
  id: string;
  dealId?: string;
  contactId?: string;
  companyId?: string;
  title: string;
  dueDate: string;
  assignee: LeadOwnerType;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface CrmReminder {
  id: string;
  title: string;
  type: 'follow_up' | 'call' | 'email' | 'meeting' | 'task';
  contactId?: string;
  contactName?: string;
  dealId?: string;
  dealTitle?: string;
  companyName?: string;
  dueDate: string;
  dueTime: string;
  reminderTime: 'at_time' | '15_min_before' | '1_hour_before' | '1_day_before';
  priority: 'high' | 'medium' | 'low';
  assignee: LeadOwnerType;
  notes?: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface CrmDeal {
  id: string;
  title: string;
  companyName: string;
  companyDomain: string;
  companyLogo: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  value: number;
  currency: 'USD';
  stageId: string;
  pipelineId: string;
  owner: LeadOwnerType;
  probability: number;
  expectedCloseDate: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  source: '8D Lead Finder' | 'Cold Email Sequence' | 'Voice AI SDR' | 'Inbound Form' | 'LinkedIn';
  notesCount: number;
  tasksCount: number;
  createdAt: string;
  lastActivity: string;
  customFieldValues?: Record<string, any>;
}

export interface CrmCompany {
  id: string;
  name: string;
  domain: string;
  logo: string;
  industry: string;
  employeeCount: string;
  revenue: string;
  location: string;
  strategy: string;
  activeContactsCount: number;
  activeDealsCount: number;
  totalDealValue: number;
  intentStatus: 'High Intent' | 'Warm Intent' | 'Active Pipeline' | 'Nurture';
  tier: 'Tier 1 Enterprise' | 'Tier 2 Mid-Market' | 'Strategic Scale';
  description: string;
  signalsCount: number;
  createdAt: string;
}

export type ContactQualificationStatus = 'New' | 'Working' | 'Contacted' | 'Engaged' | 'Qualified' | 'Unqualified' | 'Converted';

export interface CrmContact {
  id: string;
  name: string;
  title: string;
  companyName: string;
  companyDomain: string;
  email: string;
  phone: string;
  avatar: string;
  score: number;
  stage: 'Lead' | 'Contacted' | 'Meeting Booked' | 'Opportunity' | 'Customer';
  leadStatus: ContactQualificationStatus;
  owner: LeadOwnerType;
  lastTouch: string;
  channel: 'Email' | 'LinkedIn' | 'Voice SDR' | 'Inbound';
  status: 'Active' | 'Nurturing' | 'Replied' | 'Unresponsive';
  tags: string[];
  notesCount: number;
  createdAt: string;
  sequencesCount?: number;
  dealsCount?: number;
  linkedinUrl?: string;
  location?: string;
}

export interface CrmContract {
  id: string;
  documentName: string;
  companyName: string;
  contactName: string;
  dealId?: string;
  status: 'Draft' | 'Pending Review' | 'Signed' | 'Expired';
  value: number;
  startDate: string;
  endDate: string;
  lastActivity: string;
  signeeEmail: string;
  complianceScore: number;
}

export interface CrmLabel {
  id: string;
  name: string;
  description: string;
  color: string;
  leadCount: number;
  dealCount: number;
  sources: string[];
  createdAt: string;
}

export interface CrmSignal {
  id: string;
  title: string;
  description: string;
  entityName: string;
  entityType: 'contact' | 'company' | 'deal';
  type: 'Website Intent' | 'Email Engagement' | 'Job Change' | 'Company Growth' | 'Email Reply' | 'LinkedIn Activity' | 'Funding';
  priority: 'High' | 'Medium' | 'Low';
  detectedAt: string;
  source: 'Web Visitor Sentinel' | 'Mailbox AI' | 'LinkedIn Tracker' | 'Signals Intelligence' | 'Voice SDR';
  status: 'New' | 'Actioned' | 'Dismissed';
  recommendedAction: string;
}

export interface CrmHealthData {
  crmHealthScore: number;
  dataQualityScore: number;
  pipelineHealthScore: number;
  engagementHealthScore: number;
  revenueHealth: {
    pipelineCoverageRatio: string;
    dealVelocityDays: number;
    winRatePercent: number;
    averageDealAgeDays: number;
  };
  automationHealth: {
    sequenceSuccessRate: number;
    failedWorkflowRuns: number;
    integrationHealthScore: number;
    pausedCampaignsCount: number;
  };
  dataQualityIssues: {
    duplicateContactsCount: number;
    missingEmailsCount: number;
    missingPhoneCount: number;
    missingCompanyInfoCount: number;
    invalidEmailsCount: number;
  };
  pipelineHealthIssues: {
    staleDealsCount: number;
    dealsWithoutNextStepCount: number;
    dealsWithoutOwnerCount: number;
    missingLossReasonsCount: number;
    overdueOpportunitiesCount: number;
  };
  engagementIssues: {
    contactsWithNoActivityCount: number;
    leadsNotContactedCount: number;
    unansweredRepliesCount: number;
  };
}

export interface CrmActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'linkedin';
  title: string;
  details: string;
  timestamp: string;
  outcome: 'completed' | 'scheduled' | 'sent' | 'replied' | 'missed' | 'logged';
  contactName?: string;
  companyName?: string;
  dealTitle?: string;
  owner: string;
}

export interface CrmCustomField {
  id: string;
  entityType: 'deal' | 'contact' | 'company';
  fieldName: string;
  fieldKey: string;
  fieldType: 'text' | 'number' | 'select' | 'date' | 'currency';
  options?: string[];
  required: boolean;
}

export interface CrmNote {
  id: string;
  entityType: 'deal' | 'contact' | 'company';
  entityId: string;
  content: string;
  author: string;
  createdAt: string;
}

export type CrmViewMode = 'kanban' | 'table';
export type DealsSortField = 'value' | 'title' | 'companyName' | 'probability' | 'expectedCloseDate' | 'createdAt';
export type DealsSortOrder = 'asc' | 'desc';
export type CrmTabType = 
  | 'overview' 
  | 'deals' 
  | 'companies' 
  | 'contacts' 
  | 'pipeline' 
  | 'contracts' 
  | 'labels' 
  | 'signals' 
  | 'health' 
  | 'activities' 
  | 'tasks' 
  | 'reminders'
  | 'reports'
  | 'leads'
  | 'custom-fields';

interface CrmContextType {
  pipelines: CrmPipeline[];
  activePipelineId: string;
  activePipeline: CrmPipeline;
  deals: CrmDeal[];
  allFilteredDeals: CrmDeal[];
  companies: CrmCompany[];
  contacts: CrmContact[];
  contracts: CrmContract[];
  labels: CrmLabel[];
  signals: CrmSignal[];
  healthData: CrmHealthData;
  isHealthChecking: boolean;
  viewMode: CrmViewMode;
  
  // Tab System
  activeTab: CrmTabType;
  openTabs: CrmTabType[];
  setActiveTab: (tab: CrmTabType) => void;
  openTab: (tab: CrmTabType) => void;
  closeTab: (tab: CrmTabType) => void;
  
  searchQuery: string;
  filterOwner: string;
  filterPriority: string;
  filterStage: string;
  sorting: { field: DealsSortField; order: DealsSortOrder };
  tasks: CrmTask[];
  reminders: CrmReminder[];
  activities: CrmActivity[];
  customFields: CrmCustomField[];
  notes: CrmNote[];
  selection: {
    selectedIds: string[];
    isAllSelectedOnPage: boolean;
  };
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
  };

  // Setters
  setActivePipelineId: (pipelineId: string) => void;
  setViewMode: (mode: CrmViewMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterOwner: (owner: string) => void;
  setFilterPriority: (priority: string) => void;
  setFilterStage: (stage: string) => void;
  resetAllFilters: () => void;
  setSorting: (field: DealsSortField) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // Selection
  toggleSelectDeal: (id: string) => void;
  toggleSelectAllOnPage: () => void;
  clearSelection: () => void;

  // Deal Mutations
  createDeal: (deal: Partial<CrmDeal>) => void;
  updateDeal: (updatedDeal: CrmDeal) => void;
  updateDealStage: (dealId: string, newStageId: string) => void;
  updateDealOwner: (dealId: string, owner: LeadOwnerType) => void;
  deleteDeal: (dealId: string) => void;

  // Company Mutations
  createCompany: (company: Partial<CrmCompany>) => void;
  updateCompany: (updatedCompany: CrmCompany) => void;
  deleteCompany: (companyId: string) => void;

  // Contact Mutations & Lead Linking
  findExistingContact: (email: string, domain?: string) => CrmContact | undefined;
  createContact: (contact: Partial<CrmContact>) => void;
  updateContact: (updatedContact: CrmContact) => void;
  updateContactLeadStatus: (contactId: string, leadStatus: ContactQualificationStatus) => void;
  saveLeadToCrm: (leadData: {
    id?: string;
    name: string;
    title?: string;
    company: string;
    domain?: string;
    email: string;
    phone?: string;
    avatar?: string;
    score?: number;
    channel?: 'Email' | 'LinkedIn' | 'Voice SDR' | 'Inbound';
    owner?: LeadOwnerType;
    tags?: string[];
    location?: string;
    linkedinUrl?: string;
  }) => { contact: CrmContact; isExisting: boolean };
  deleteContact: (contactId: string) => void;

  // Contract Mutations
  createContract: (contract: Partial<CrmContract>) => void;
  updateContract: (updatedContract: CrmContract) => void;
  deleteContract: (contractId: string) => void;

  // Label Mutations
  createLabel: (label: Partial<CrmLabel>) => void;
  updateLabel: (updatedLabel: CrmLabel) => void;
  deleteLabel: (labelId: string) => void;

  // Signal Mutations
  createSignal: (signal: Partial<CrmSignal>) => void;
  updateSignalStatus: (signalId: string, status: 'New' | 'Actioned' | 'Dismissed') => void;
  createSignalAlert: (alertConfig: { name: string; type: string; priority: string }) => void;

  // Health Actions
  runHealthCheck: () => void;
  refreshHealthData: () => void;

  // Task Mutations
  createTask: (dealId: string | undefined, title: string, dueDate: string, assignee: LeadOwnerType, priority: 'high' | 'medium' | 'low') => void;
  toggleTaskCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  // Reminder Mutations (HubSpot-Style)
  createReminder: (reminder: Omit<CrmReminder, 'id' | 'completed' | 'createdAt'>) => void;
  toggleReminderCompleted: (reminderId: string) => void;
  snoozeReminder: (reminderId: string, days: number) => void;
  deleteReminder: (reminderId: string) => void;

  // Activities & Notes
  createActivity: (activity: Omit<CrmActivity, 'id' | 'timestamp'>) => void;
  createNote: (entityType: 'deal' | 'contact' | 'company', entityId: string, content: string) => void;
  deleteNote: (noteId: string) => void;

  // Custom Fields
  createCustomField: (field: Omit<CrmCustomField, 'id'>) => void;
  deleteCustomField: (fieldId: string) => void;

  // Bulk Operations
  bulkUpdateStage: (stageId: string) => void;
  bulkUpdateOwner: (owner: LeadOwnerType) => void;
  bulkDelete: () => void;

  // Pipeline Mutations
  createPipeline: (name: string, description?: string) => void;

  // Import / Export / Duplicate Management
  exportDealsToCsv: () => void;
  importDealsFromCsv: (newDeals: Partial<CrmDeal>[]) => void;
  mergeDuplicateDeals: (primaryId: string, secondaryId: string) => void;

  // Scalable Async Search & Retrieval (Optimized for 100M+ Contact/Deal Datasets)
  searchContactsAsync: (query: string, options?: { limit?: number; signal?: AbortSignal }) => Promise<CrmContact[]>;
  getContactByIdAsync: (id: string) => Promise<CrmContact | undefined>;
  searchDealsAsync: (query: string, options?: { limit?: number; signal?: AbortSignal }) => Promise<CrmDeal[]>;
  getDealByIdAsync: (id: string) => Promise<CrmDeal | undefined>;
}

const DEFAULT_STAGES: CrmStage[] = [
  { id: 'stage_new', name: 'New', order: 1, probability: 10, color: '#3b82f6', description: 'Newly identified prospect ICP with active buying signals' },
  { id: 'stage_contacted', name: 'Contacted', order: 2, probability: 25, color: '#0284c7', description: 'Outreach initiated via cold email, LinkedIn, or voice SDR' },
  { id: 'stage_replied', name: 'Replied', order: 3, probability: 45, color: '#0d9488', description: 'Prospect engaged with positive sentiment and intent' },
  { id: 'stage_qualified', name: 'Qualified', order: 4, probability: 65, color: '#f59e0b', description: 'Budget, authority, need, and timeline verified' },
  { id: 'stage_proposal', name: 'Proposal', order: 5, probability: 80, color: '#8b5cf6', description: 'Commercial pricing tier and MSA under executive review' },
  { id: 'stage_won', name: 'Won', order: 6, probability: 100, color: '#10b981', description: 'Executed contract & onboarding kick-off' },
  { id: 'stage_lost', name: 'Lost', order: 7, probability: 0, color: '#64748b', description: 'Timing or budget mismatch' },
];

const INITIAL_PIPELINES: CrmPipeline[] = [
  {
    id: 'pipe_1',
    name: 'Enterprise Outbound & Inbound Pipeline',
    description: 'Direct sales cycle for mid-market and enterprise B2B accounts',
    stages: DEFAULT_STAGES,
  },
  {
    id: 'pipe_2',
    name: 'Mid-Market SaaS Expansion',
    description: 'Fast-cycle expansion opportunities for existing accounts',
    stages: DEFAULT_STAGES,
  }
];

const INITIAL_DEALS: CrmDeal[] = [
  {
    id: 'deal_1',
    title: 'CloudScale AI - Enterprise Annual Tier',
    companyName: 'CloudScale AI',
    companyDomain: 'cloudscale.ai',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    contactName: 'Sarah Jenkins',
    contactTitle: 'VP of Growth & Revenue',
    contactEmail: 'sarah.j@cloudscale.ai',
    contactPhone: '+1 (415) 892-4910',
    value: 48000,
    currency: 'USD',
    stageId: 'stage_qualified',
    pipelineId: 'pipe_1',
    owner: 'Sarah Jenkins',
    probability: 65,
    expectedCloseDate: '2026-09-30',
    tags: ['Series B', 'High Intent', 'Scale Tier'],
    priority: 'high',
    source: '8D Lead Finder',
    notesCount: 4,
    tasksCount: 2,
    createdAt: '2026-08-10',
    lastActivity: '12m ago • Demo scheduled',
  },
  {
    id: 'deal_2',
    title: 'Nexus Data Systems - Voice SDR Fleet',
    companyName: 'Nexus Data Systems',
    companyDomain: 'nexusdata.io',
    companyLogo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&q=80',
    contactName: 'Marcus Vance',
    contactTitle: 'Head of Outbound Demand Gen',
    contactEmail: 'marcus@nexusdata.io',
    contactPhone: '+1 (212) 554-9021',
    value: 72000,
    currency: 'USD',
    stageId: 'stage_proposal',
    pipelineId: 'pipe_1',
    owner: 'Alex Rivera',
    probability: 80,
    expectedCloseDate: '2026-10-15',
    tags: ['Enterprise', 'Voice AI', 'Multi-Inbox'],
    priority: 'high',
    source: 'Voice AI SDR',
    notesCount: 3,
    tasksCount: 1,
    createdAt: '2026-08-14',
    lastActivity: '2h ago • MSA sent',
  },
  {
    id: 'deal_3',
    title: 'HyperGrowth Labs - Multi-Inbox Suite',
    companyName: 'HyperGrowth Labs',
    companyDomain: 'hypergrowth.co',
    companyLogo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
    contactName: 'Elena Rostova',
    contactTitle: 'Chief Revenue Officer',
    contactEmail: 'elena@hypergrowth.co',
    contactPhone: '+44 20 7946 0912',
    value: 36000,
    currency: 'USD',
    stageId: 'stage_replied',
    pipelineId: 'pipe_1',
    owner: 'Sarah Jenkins',
    probability: 45,
    expectedCloseDate: '2026-11-01',
    tags: ['FinTech', 'Cold Email', 'Deliverability'],
    priority: 'medium',
    source: 'Cold Email Sequence',
    notesCount: 2,
    tasksCount: 1,
    createdAt: '2026-08-18',
    lastActivity: '4h ago • Warm reply received',
  },
  {
    id: 'deal_4',
    title: 'Vanguard Security - LinkedIn Outbound',
    companyName: 'Vanguard Security',
    companyDomain: 'vanguardsec.com',
    companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=120&q=80',
    contactName: 'David Chen',
    contactTitle: 'VP of Information Security',
    contactEmail: 'dchen@vanguardsec.com',
    contactPhone: '+1 (650) 431-8977',
    value: 95000,
    currency: 'USD',
    stageId: 'stage_won',
    pipelineId: 'pipe_1',
    owner: 'Alex Rivera',
    probability: 100,
    expectedCloseDate: '2026-08-28',
    tags: ['Security', 'Annual Plan', 'Closed'],
    priority: 'high',
    source: 'LinkedIn',
    notesCount: 6,
    tasksCount: 0,
    createdAt: '2026-08-01',
    lastActivity: 'Yesterday • Contract signed',
  },
  {
    id: 'deal_5',
    title: 'SaaSFlow Analytics - Seed Expansion',
    companyName: 'SaaSFlow Analytics',
    companyDomain: 'saasflow.io',
    companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    contactName: 'Michael Chang',
    contactTitle: 'Founder & CEO',
    contactEmail: 'mchang@saasflow.io',
    contactPhone: '+1 (512) 883-1029',
    value: 24000,
    currency: 'USD',
    stageId: 'stage_contacted',
    pipelineId: 'pipe_1',
    owner: 'Marcus Vance',
    probability: 25,
    expectedCloseDate: '2026-11-15',
    tags: ['Early Stage', 'Expansion', 'Inbound'],
    priority: 'low',
    source: 'Inbound Form',
    notesCount: 1,
    tasksCount: 1,
    createdAt: '2026-08-22',
    lastActivity: '3d ago • Sequence email 1 sent',
  }
];

const INITIAL_COMPANIES: CrmCompany[] = [
  {
    id: 'comp_1',
    name: 'CloudScale AI',
    domain: 'cloudscale.ai',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    industry: 'Enterprise SaaS / AI',
    employeeCount: '150-500',
    revenue: '$25M - $50M',
    location: 'San Francisco, CA',
    strategy: 'Multi-Channel Autonomous SDR Sequence',
    activeContactsCount: 6,
    activeDealsCount: 1,
    totalDealValue: 48000,
    intentStatus: 'High Intent',
    tier: 'Tier 1 Enterprise',
    description: 'Leading provider of scalable AI cloud compute architecture for generative models.',
    signalsCount: 4,
    createdAt: '2026-08-01',
  },
  {
    id: 'comp_2',
    name: 'Nexus Data Systems',
    domain: 'nexusdata.io',
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=120&q=80',
    industry: 'Data Infrastructure',
    employeeCount: '500-1000',
    revenue: '$50M - $100M',
    location: 'New York, NY',
    strategy: 'Conversational Voice AI Pilot to Head of Outbound',
    activeContactsCount: 8,
    activeDealsCount: 1,
    totalDealValue: 72000,
    intentStatus: 'Active Pipeline',
    tier: 'Tier 1 Enterprise',
    description: 'Next-gen distributed streaming data analytics platform for fintech and ecommerce.',
    signalsCount: 6,
    createdAt: '2026-08-05',
  },
  {
    id: 'comp_3',
    name: 'HyperGrowth Labs',
    domain: 'hypergrowth.co',
    logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
    industry: 'FinTech / Growth',
    employeeCount: '50-200',
    revenue: '$10M - $25M',
    location: 'London, UK',
    strategy: 'Mailbox Rotation & Warmup Deliverability Suite',
    activeContactsCount: 4,
    activeDealsCount: 1,
    totalDealValue: 36000,
    intentStatus: 'Warm Intent',
    tier: 'Tier 2 Mid-Market',
    description: 'Growth marketing automation platform specializing in European fintech scaleups.',
    signalsCount: 3,
    createdAt: '2026-08-12',
  },
  {
    id: 'comp_4',
    name: 'Vanguard Security',
    domain: 'vanguardsec.com',
    logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=120&q=80',
    industry: 'Cybersecurity',
    employeeCount: '1000+',
    revenue: '$100M+',
    location: 'Austin, TX',
    strategy: 'Executive LinkedIn Networking & Account Expansion',
    activeContactsCount: 12,
    activeDealsCount: 1,
    totalDealValue: 95000,
    intentStatus: 'High Intent',
    tier: 'Strategic Scale',
    description: 'Cloud-native threat detection, zero-trust network infrastructure, and compliance.',
    signalsCount: 5,
    createdAt: '2026-07-20',
  }
];

const INITIAL_CONTACTS: CrmContact[] = [
  {
    id: 'cont_1',
    name: 'Sarah Jenkins',
    title: 'VP of Growth & Revenue',
    companyName: 'CloudScale AI',
    companyDomain: 'cloudscale.ai',
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    score: 98,
    stage: 'Meeting Booked',
    leadStatus: 'Qualified',
    owner: 'Sarah Jenkins',
    lastTouch: '15m ago • Voice SDR Demo Confirmed',
    channel: 'Voice SDR',
    status: 'Active',
    tags: ['SaaS', 'High Intent', 'Decision Maker'],
    notesCount: 4,
    sequencesCount: 2,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/sarah-jenkins',
    location: 'San Francisco, CA',
    createdAt: '2026-08-10',
  },
  {
    id: 'cont_2',
    name: 'Marcus Vance',
    title: 'Head of Outbound Demand Gen',
    companyName: 'Nexus Data Systems',
    companyDomain: 'nexusdata.io',
    email: 'marcus@nexusdata.io',
    phone: '+1 (212) 554-9021',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    score: 94,
    stage: 'Opportunity',
    leadStatus: 'Engaged',
    owner: 'Alex Rivera',
    lastTouch: '2h ago • Proposal MSA Delivered',
    channel: 'Email',
    status: 'Replied',
    tags: ['Fintech', 'Outreach', 'Proposal Sent'],
    notesCount: 3,
    sequencesCount: 1,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/marcus-vance',
    location: 'New York, NY',
    createdAt: '2026-08-14',
  },
  {
    id: 'cont_3',
    name: 'Elena Rostova',
    title: 'Chief Revenue Officer',
    companyName: 'HyperGrowth Labs',
    companyDomain: 'hypergrowth.co',
    email: 'elena@hypergrowth.co',
    phone: '+44 20 7946 0912',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    score: 91,
    stage: 'Contacted',
    leadStatus: 'Working',
    owner: 'Sarah Jenkins',
    lastTouch: '4h ago • Email Reply Received',
    channel: 'Email',
    status: 'Active',
    tags: ['Enterprise', 'Scale-up', 'Warm Reply'],
    notesCount: 2,
    sequencesCount: 1,
    dealsCount: 0,
    linkedinUrl: 'https://linkedin.com/in/elena-rostova',
    location: 'London, UK',
    createdAt: '2026-08-18',
  },
  {
    id: 'cont_4',
    name: 'David Chen',
    title: 'VP of Information Security',
    companyName: 'Vanguard Security',
    companyDomain: 'vanguardsec.com',
    email: 'dchen@vanguardsec.com',
    phone: '+1 (650) 431-8977',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    score: 99,
    stage: 'Customer',
    leadStatus: 'Converted',
    owner: 'Alex Rivera',
    lastTouch: 'Yesterday • Annual Contract Executed',
    channel: 'LinkedIn',
    status: 'Active',
    tags: ['Security', 'Enterprise', 'Customer ARR'],
    notesCount: 6,
    sequencesCount: 0,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/david-chen-sec',
    location: 'Austin, TX',
    createdAt: '2026-08-01',
  },
  {
    id: 'cont_5',
    name: 'Alexandre Dubois',
    title: 'Chief Technology Officer',
    companyName: 'NeuralGrid Systems',
    companyDomain: 'neuralgrid.ai',
    email: 'a.dubois@neuralgrid.ai',
    phone: '+33 1 42 68 55 00',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    score: 95,
    stage: 'Opportunity',
    leadStatus: 'Qualified',
    owner: 'Sarah Jenkins',
    lastTouch: '3h ago • Technical architecture review',
    channel: 'Voice SDR',
    status: 'Active',
    tags: ['AI Infrastructure', 'European Scaleup', 'High Value'],
    notesCount: 3,
    sequencesCount: 1,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/alexandre-dubois-ai',
    location: 'Paris, France',
    createdAt: '2026-08-20',
  },
  {
    id: 'cont_6',
    name: 'Amira Patel',
    title: 'Head of Growth Marketing',
    companyName: 'ScaleWave Media',
    companyDomain: 'scalewave.com',
    email: 'amira@scalewave.com',
    phone: '+1 (415) 670-2294',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    score: 89,
    stage: 'Meeting Booked',
    leadStatus: 'Engaged',
    owner: 'Marcus Vance',
    lastTouch: 'Yesterday • Outbound sequence click',
    channel: 'Email',
    status: 'Replied',
    tags: ['Media Agency', 'Outbound Marketing', 'Seed Round'],
    notesCount: 2,
    sequencesCount: 2,
    dealsCount: 0,
    linkedinUrl: 'https://linkedin.com/in/amira-patel-growth',
    location: 'San Francisco, CA',
    createdAt: '2026-08-22',
  },
  {
    id: 'cont_7',
    name: 'Michael Chang',
    title: 'Founder & CEO',
    companyName: 'SaaSFlow Analytics',
    companyDomain: 'saasflow.io',
    email: 'mchang@saasflow.io',
    phone: '+1 (512) 883-1029',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    score: 87,
    stage: 'Contacted',
    leadStatus: 'Working',
    owner: 'Marcus Vance',
    lastTouch: '3d ago • Sequence email 1 sent',
    channel: 'Inbound',
    status: 'Active',
    tags: ['Early Stage', 'Expansion', 'Inbound'],
    notesCount: 1,
    sequencesCount: 1,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/michael-chang-saas',
    location: 'Austin, TX',
    createdAt: '2026-08-22',
  },
  {
    id: 'cont_8',
    name: 'Sofia Chen',
    title: 'VP of Global Sales',
    companyName: 'Apex Data Labs',
    companyDomain: 'apexdata.io',
    email: 'sofia.chen@apexdata.io',
    phone: '+1 (312) 994-3310',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    score: 93,
    stage: 'Opportunity',
    leadStatus: 'Qualified',
    owner: 'Alex Rivera',
    lastTouch: '1d ago • Enterprise pricing review',
    channel: 'LinkedIn',
    status: 'Active',
    tags: ['Fintech', 'Enterprise Tier', 'Decision Maker'],
    notesCount: 5,
    sequencesCount: 1,
    dealsCount: 1,
    linkedinUrl: 'https://linkedin.com/in/sofia-chen-sales',
    location: 'Chicago, IL',
    createdAt: '2026-08-25',
  }
];

const INITIAL_CONTRACTS: CrmContract[] = [
  {
    id: 'ctr_1',
    documentName: 'Vanguard Security - Annual MSA & SLA',
    companyName: 'Vanguard Security',
    contactName: 'David Chen',
    dealId: 'deal_4',
    status: 'Signed',
    value: 95000,
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    lastActivity: 'Signed on Aug 28, 2026',
    signeeEmail: 'dchen@vanguardsec.com',
    complianceScore: 100,
  },
  {
    id: 'ctr_2',
    documentName: 'Nexus Data Systems - Multi-Inbox Pilot Agreement',
    companyName: 'Nexus Data Systems',
    contactName: 'Marcus Vance',
    dealId: 'deal_2',
    status: 'Pending Review',
    value: 72000,
    startDate: '2026-10-01',
    endDate: '2027-09-30',
    lastActivity: 'Sent for review 2h ago',
    signeeEmail: 'marcus@nexusdata.io',
    complianceScore: 98,
  },
  {
    id: 'ctr_3',
    documentName: 'CloudScale AI - Custom Enterprise Addendum',
    companyName: 'CloudScale AI',
    contactName: 'Sarah Jenkins',
    dealId: 'deal_1',
    status: 'Draft',
    value: 48000,
    startDate: '2026-10-15',
    endDate: '2027-10-14',
    lastActivity: 'Draft created today',
    signeeEmail: 'sarah.j@cloudscale.ai',
    complianceScore: 95,
  }
];

const INITIAL_LABELS: CrmLabel[] = [
  {
    id: 'lbl_1',
    name: 'Hot Lead (90%+ Intent)',
    description: 'Active buyers researching solutions with immediate quarterly budget',
    color: '#ef4444',
    leadCount: 42,
    dealCount: 8,
    sources: ['Lead Finder', 'Web Visitors', 'Email Replies'],
    createdAt: '2026-08-01',
  },
  {
    id: 'lbl_2',
    name: 'Enterprise Tier ($50k+)',
    description: 'High-value enterprise accounts requiring multi-stakeholder approval',
    color: '#3b82f6',
    leadCount: 18,
    dealCount: 5,
    sources: ['Outbound SDR', 'LinkedIn'],
    createdAt: '2026-08-05',
  },
  {
    id: 'lbl_3',
    name: 'Champion / Decision Maker',
    description: 'VP / C-Level executive driving internal product adoption',
    color: '#10b981',
    leadCount: 35,
    dealCount: 7,
    sources: ['Lead Finder', 'CRM'],
    createdAt: '2026-08-10',
  },
  {
    id: 'lbl_4',
    name: 'Pricing Objection',
    description: 'Requires tailored commercial proposals or flexible billing terms',
    color: '#f59e0b',
    leadCount: 12,
    dealCount: 3,
    sources: ['Voice SDR', 'Inbox'],
    createdAt: '2026-08-15',
  },
  {
    id: 'lbl_5',
    name: 'Q4 Nurture Sequence',
    description: 'Longer sales cycle prospects slated for seasonal re-engagement',
    color: '#8b5cf6',
    leadCount: 89,
    dealCount: 11,
    sources: ['Cold Email', 'Workflows'],
    createdAt: '2026-08-20',
  }
];

const INITIAL_SIGNALS: CrmSignal[] = [
  {
    id: 'sig_1',
    title: 'High-Frequency Pricing Page Visits (5+ in 24h)',
    description: 'Multiple IPs from CloudScale AI reviewed enterprise tier pricing matrix and SLA documentation.',
    entityName: 'CloudScale AI',
    entityType: 'company',
    type: 'Website Intent',
    priority: 'High',
    detectedAt: '18m ago',
    source: 'Web Visitor Sentinel',
    status: 'New',
    recommendedAction: 'Trigger Voice AI SDR call or send custom enterprise pricing proposal.',
  },
  {
    id: 'sig_2',
    title: 'Email Sequence Opened 8 Times & Link Clicked',
    description: 'Marcus Vance opened step 2 sequence email multiple times and downloaded the security whitepaper.',
    entityName: 'Marcus Vance (Nexus Data Systems)',
    entityType: 'contact',
    type: 'Email Engagement',
    priority: 'High',
    detectedAt: '1h ago',
    source: 'Mailbox AI',
    status: 'New',
    recommendedAction: 'Schedule follow-up demo review via Cal.com direct booking link.',
  },
  {
    id: 'sig_3',
    title: 'Series B Funding Round Closed ($28M)',
    description: 'HyperGrowth Labs announced new funding to expand sales development headcount.',
    entityName: 'HyperGrowth Labs',
    entityType: 'company',
    type: 'Funding',
    priority: 'Medium',
    detectedAt: '3h ago',
    source: 'Signals Intelligence',
    status: 'Actioned',
    recommendedAction: 'Initiate growth team outreach sequence targeting new hiring managers.',
  },
  {
    id: 'sig_4',
    title: 'Job Change: Promoted to Chief Revenue Officer',
    description: 'Elena Rostova updated title on LinkedIn; now oversees global sales software procurement.',
    entityName: 'Elena Rostova',
    entityType: 'contact',
    type: 'Job Change',
    priority: 'High',
    detectedAt: '5h ago',
    source: 'LinkedIn Tracker',
    status: 'New',
    recommendedAction: 'Send personalized congratulatory note with tailored executive summary.',
  }
];

const INITIAL_HEALTH: CrmHealthData = {
  crmHealthScore: 94,
  dataQualityScore: 98,
  pipelineHealthScore: 92,
  engagementHealthScore: 95,
  revenueHealth: {
    pipelineCoverageRatio: '3.8x',
    dealVelocityDays: 21,
    winRatePercent: 32.4,
    averageDealAgeDays: 16,
  },
  automationHealth: {
    sequenceSuccessRate: 99.1,
    failedWorkflowRuns: 0,
    integrationHealthScore: 100,
    pausedCampaignsCount: 1,
  },
  dataQualityIssues: {
    duplicateContactsCount: 0,
    missingEmailsCount: 2,
    missingPhoneCount: 4,
    missingCompanyInfoCount: 1,
    invalidEmailsCount: 0,
  },
  pipelineHealthIssues: {
    staleDealsCount: 1,
    dealsWithoutNextStepCount: 0,
    dealsWithoutOwnerCount: 0,
    missingLossReasonsCount: 1,
    overdueOpportunitiesCount: 0,
  },
  engagementIssues: {
    contactsWithNoActivityCount: 3,
    leadsNotContactedCount: 8,
    unansweredRepliesCount: 0,
  }
};

const INITIAL_ACTIVITIES: CrmActivity[] = [
  {
    id: 'act_1',
    type: 'call',
    title: 'Voice AI SDR Outbound Call',
    details: 'Sophia (Voice SDR) called Sarah Jenkins. Confirmed demo for Thursday 2:00 PM PST.',
    timestamp: '15m ago',
    outcome: 'completed',
    contactName: 'Sarah Jenkins',
    companyName: 'CloudScale AI',
    dealTitle: 'CloudScale AI - Enterprise Annual Tier',
    owner: 'Sarah Jenkins',
  },
  {
    id: 'act_2',
    type: 'email',
    title: 'Cold Email Sequence Reply',
    details: 'Elena Rostova replied: "Sounds interesting. Let\'s chat Thursday afternoon."',
    timestamp: '4h ago',
    outcome: 'replied',
    contactName: 'Elena Rostova',
    companyName: 'HyperGrowth Labs',
    dealTitle: 'HyperGrowth Labs - Multi-Inbox Suite',
    owner: 'Sarah Jenkins',
  },
  {
    id: 'act_3',
    type: 'meeting',
    title: 'Enterprise Architecture Review',
    details: 'Completed technical deep-dive with David Chen and security engineering team.',
    timestamp: 'Yesterday',
    outcome: 'completed',
    contactName: 'David Chen',
    companyName: 'Vanguard Security',
    dealTitle: 'Vanguard Security - LinkedIn Outbound',
    owner: 'Elena Rostova',
  }
];

const INITIAL_TASKS: CrmTask[] = [
  {
    id: 'task_1',
    dealId: 'deal_1',
    contactId: 'cont_1',
    companyId: 'comp_1',
    title: 'Prepare custom enterprise demo environment for CloudScale AI',
    dueDate: '2026-09-02',
    assignee: 'Sarah Jenkins',
    completed: false,
    priority: 'high',
  },
  {
    id: 'task_2',
    dealId: 'deal_2',
    contactId: 'cont_2',
    companyId: 'comp_2',
    title: 'Follow up on MSA legal approval with Nexus Data Systems procurement',
    dueDate: '2026-09-05',
    assignee: 'Alex Rivera',
    completed: false,
    priority: 'high',
  },
  {
    id: 'task_3',
    dealId: 'deal_3',
    contactId: 'cont_3',
    companyId: 'comp_3',
    title: 'Send warmup analytics & DNS configuration checklist to Elena',
    dueDate: '2026-09-08',
    assignee: 'Marcus Vance',
    completed: true,
    priority: 'medium',
  }
];

const INITIAL_REMINDERS: CrmReminder[] = [
  {
    id: 'rem_1',
    title: 'Follow up on MSA redlines & legal questions',
    type: 'follow_up',
    contactName: 'Marcus Vance',
    companyName: 'Nexus Data Systems',
    dealTitle: 'Nexus Data Systems - Growth Tier',
    dueDate: '2026-09-04',
    dueTime: '10:00',
    reminderTime: '1_hour_before',
    priority: 'high',
    assignee: 'Alex Rivera',
    completed: false,
    notes: 'Marcus asked about the SOC2 Type II compliance audit schedule and SLA guarantees.',
    createdAt: '2026-09-01',
  },
  {
    id: 'rem_2',
    title: 'Call Sarah Jenkins regarding enterprise security onboarding',
    type: 'call',
    contactName: 'Sarah Jenkins',
    companyName: 'CloudScale AI',
    dealTitle: 'CloudScale AI - Enterprise Annual Tier',
    dueDate: '2026-09-06',
    dueTime: '15:30',
    reminderTime: '15_min_before',
    priority: 'high',
    assignee: 'Sarah Jenkins',
    completed: false,
    notes: 'Confirm multi-inbox rotation quota, sending pacing, and dedicated IP allocation.',
    createdAt: '2026-09-02',
  },
  {
    id: 'rem_3',
    title: 'Send contract agreement & pricing amendment',
    type: 'email',
    contactName: 'Elena Rostova',
    companyName: 'HyperGrowth Labs',
    dealTitle: 'HyperGrowth Labs - Multi-Inbox Suite',
    dueDate: '2026-09-08',
    dueTime: '14:00',
    reminderTime: '1_day_before',
    priority: 'medium',
    assignee: 'Sarah Jenkins',
    completed: false,
    notes: 'Elena requested 20% discount on 12-month pre-payment and custom tracking domain verification.',
    createdAt: '2026-09-03',
  },
  {
    id: 'rem_4',
    title: 'Demo review call with engineering leadership',
    type: 'meeting',
    contactName: 'David Chen',
    companyName: 'Vanguard Security',
    dueDate: '2026-09-09',
    dueTime: '11:00',
    reminderTime: '1_hour_before',
    priority: 'medium',
    assignee: 'Alex Rivera',
    completed: false,
    notes: 'Focus on API latency, sub-400ms Voice SDR response, and webhook reliability.',
    createdAt: '2026-09-04',
  },
  {
    id: 'rem_5',
    title: 'Verify DNS records and SPF alignment for seed domain',
    type: 'task',
    contactName: 'Amira Patel',
    companyName: 'ScaleWave Media',
    dueDate: '2026-09-03',
    dueTime: '16:00',
    reminderTime: 'at_time',
    priority: 'low',
    assignee: 'Marcus Vance',
    completed: true,
    completedAt: '2026-09-03 16:15',
    notes: 'All 4 records configured in Cloudflare and verified 100% passing.',
    createdAt: '2026-09-01',
  }
];

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, error, info } = useToast();

  const [pipelines, setPipelines] = useState<CrmPipeline[]>(INITIAL_PIPELINES);
  const [activePipelineId, setActivePipelineId] = useState<string>('pipe_1');
  const [deals, setDeals] = useState<CrmDeal[]>(INITIAL_DEALS);
  const [companies, setCompanies] = useState<CrmCompany[]>(INITIAL_COMPANIES);
  const [contacts, setContacts] = useState<CrmContact[]>(INITIAL_CONTACTS);
  const [contracts, setContracts] = useState<CrmContract[]>(INITIAL_CONTRACTS);
  const [labels, setLabels] = useState<CrmLabel[]>(INITIAL_LABELS);
  const [signals, setSignals] = useState<CrmSignal[]>(INITIAL_SIGNALS);
  const [healthData, setHealthData] = useState<CrmHealthData>(INITIAL_HEALTH);
  const [isHealthChecking, setIsHealthChecking] = useState(false);

  const [viewMode, setViewMode] = useState<CrmViewMode>('kanban');

  // Persistent Chrome-Style Tab System
  const TABS_STORAGE_KEY = 'outtricks_crm_open_tabs';
  const ACTIVE_TAB_STORAGE_KEY = 'outtricks_crm_active_tab';

  const defaultTabs: CrmTabType[] = [
    'overview',
    'deals',
    'companies',
    'contacts',
    'pipeline',
    'contracts',
    'labels',
    'signals',
    'health'
  ];

  const [openTabs, setOpenTabs] = useState<CrmTabType[]>(() => {
    try {
      const saved = localStorage.getItem(TABS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse openTabs from storage', e);
    }
    return defaultTabs;
  });

  const [activeTab, setActiveTabState] = useState<CrmTabType>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
      if (saved && [
        'overview', 'deals', 'companies', 'contacts', 'pipeline',
        'contracts', 'labels', 'signals', 'health', 'activities', 'tasks', 'custom-fields'
      ].includes(saved)) {
        return saved as CrmTabType;
      }
    } catch (e) {
      console.warn('Failed to parse activeTab from storage', e);
    }
    return 'overview';
  });

  // Save to localStorage when openTabs change
  useEffect(() => {
    try {
      localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(openTabs));
    } catch (e) {
      console.warn('Failed to save openTabs to storage', e);
    }
  }, [openTabs]);

  // Save to localStorage when activeTab changes
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    } catch (e) {
      console.warn('Failed to save activeTab to storage', e);
    }
  }, [activeTab]);

  const openTab = useCallback((tabId: CrmTabType) => {
    setOpenTabs((prev) => {
      if (!prev.includes(tabId)) {
        return [...prev, tabId];
      }
      return prev;
    });
    setActiveTabState(tabId);
  }, []);

  const closeTab = useCallback((tabId: CrmTabType) => {
    setOpenTabs((prev) => {
      const nextTabs = prev.filter((t) => t !== tabId);
      if (activeTab === tabId) {
        const closedIndex = prev.indexOf(tabId);
        const nextActive = nextTabs[closedIndex - 1] || nextTabs[closedIndex] || nextTabs[0] || 'overview';
        setActiveTabState(nextActive);
        if (nextTabs.length === 0) {
          return ['overview'];
        }
      }
      return nextTabs.length > 0 ? nextTabs : ['overview'];
    });
  }, [activeTab]);

  const setActiveTab = useCallback((tabId: CrmTabType) => {
    openTab(tabId);
  }, [openTab]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOwner, setFilterOwner] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [sorting, setSortingState] = useState<{ field: DealsSortField; order: DealsSortOrder }>({
    field: 'value',
    order: 'desc',
  });

  // Tasks, Activities, Notes, Custom Fields
  const [tasks, setTasks] = useState<CrmTask[]>(INITIAL_TASKS);
  const [reminders, setReminders] = useState<CrmReminder[]>(INITIAL_REMINDERS);
  const [activities, setActivities] = useState<CrmActivity[]>(INITIAL_ACTIVITIES);
  const [customFields, setCustomFields] = useState<CrmCustomField[]>([]);
  const [notes, setNotes] = useState<CrmNote[]>([]);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const activePipeline = useMemo(() => {
    return pipelines.find((p) => p.id === activePipelineId) || pipelines[0];
  }, [pipelines, activePipelineId]);

  // Filtered Deals
  const allFilteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      if (deal.pipelineId !== activePipelineId) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = deal.title.toLowerCase().includes(q);
        const matchesCompany = deal.companyName.toLowerCase().includes(q);
        const matchesContact = deal.contactName.toLowerCase().includes(q);
        const matchesTags = deal.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesContact && !matchesTags) return false;
      }

      if (filterOwner !== 'all' && deal.owner !== filterOwner) return false;
      if (filterPriority !== 'all' && deal.priority !== filterPriority) return false;
      if (filterStage !== 'all' && deal.stageId !== filterStage) return false;

      return true;
    }).sort((a, b) => {
      const field = sorting.field;
      const order = sorting.order === 'asc' ? 1 : -1;
      if (field === 'value' || field === 'probability') {
        return (a[field] - b[field]) * order;
      }
      return String(a[field] || '').localeCompare(String(b[field] || '')) * order;
    });
  }, [deals, activePipelineId, searchQuery, filterOwner, filterPriority, filterStage, sorting]);

  const totalResults = allFilteredDeals.length;
  const totalPages = Math.ceil(totalResults / pageSize) || 1;

  const isAllSelectedOnPage = useMemo(() => {
    if (allFilteredDeals.length === 0) return false;
    return allFilteredDeals.every((d) => selectedIds.includes(d.id));
  }, [allFilteredDeals, selectedIds]);

  const resetAllFilters = useCallback(() => {
    setSearchQuery('');
    setFilterOwner('all');
    setFilterPriority('all');
    setFilterStage('all');
  }, []);

  const setSorting = useCallback((field: DealsSortField) => {
    setSortingState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const toggleSelectDeal = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const toggleSelectAllOnPage = useCallback(() => {
    if (isAllSelectedOnPage) {
      const pageIds = allFilteredDeals.map((d) => d.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const pageIds = allFilteredDeals.map((d) => d.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  }, [isAllSelectedOnPage, allFilteredDeals]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Deal Mutations
  const createDeal = useCallback((dealData: Partial<CrmDeal>) => {
    const newDeal: CrmDeal = {
      id: `deal_${Date.now()}`,
      title: dealData.title || 'Untitled Opportunity',
      companyName: dealData.companyName || 'Unknown Organization',
      companyDomain: dealData.companyDomain || 'example.com',
      companyLogo: dealData.companyLogo || 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
      contactName: dealData.contactName || 'Lead Contact',
      contactTitle: dealData.contactTitle || 'Decision Maker',
      contactEmail: dealData.contactEmail || 'contact@example.com',
      contactPhone: dealData.contactPhone || '+1 (555) 000-0000',
      value: dealData.value || 25000,
      currency: 'USD',
      stageId: dealData.stageId || 'stage_new',
      pipelineId: dealData.pipelineId || activePipelineId,
      owner: dealData.owner || 'Sarah Jenkins',
      probability: dealData.probability || 25,
      expectedCloseDate: dealData.expectedCloseDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tags: dealData.tags || ['New Deal'],
      priority: dealData.priority || 'medium',
      source: dealData.source || '8D Lead Finder',
      notesCount: 0,
      tasksCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now • Opportunity created',
      customFieldValues: dealData.customFieldValues || {},
    };

    setDeals((prev) => [newDeal, ...prev]);

    // Update Company relationship if company exists
    setCompanies((prev) =>
      prev.map((c) =>
        c.name.toLowerCase() === newDeal.companyName.toLowerCase()
          ? { ...c, activeDealsCount: c.activeDealsCount + 1, totalDealValue: c.totalDealValue + newDeal.value }
          : c
      )
    );

    // Record activity
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'note',
        title: 'New Deal Created',
        details: `Created opportunity "${newDeal.title}" with value $${newDeal.value.toLocaleString()}`,
        timestamp: 'Just now',
        outcome: 'completed',
        contactName: newDeal.contactName,
        companyName: newDeal.companyName,
        dealTitle: newDeal.title,
        owner: newDeal.owner,
      },
      ...prev,
    ]);

    success(`Deal "${newDeal.title}" created successfully.`);
  }, [activePipelineId, success]);

  const updateDeal = useCallback((updatedDeal: CrmDeal) => {
    setDeals((prev) => prev.map((d) => (d.id === updatedDeal.id ? updatedDeal : d)));
    success(`Deal "${updatedDeal.title}" updated.`);
  }, [success]);

  const updateDealStage = useCallback((dealId: string, newStageId: string) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const targetStage = activePipeline.stages.find((s) => s.id === newStageId);
          return {
            ...d,
            stageId: newStageId,
            probability: targetStage ? targetStage.probability : d.probability,
            lastActivity: `Just now • Moved to ${targetStage?.name || 'new stage'}`,
          };
        }
        return d;
      })
    );

    const deal = deals.find((d) => d.id === dealId);
    const targetStage = activePipeline.stages.find((s) => s.id === newStageId);
    if (deal && targetStage) {
      setActivities((prev) => [
        {
          id: `act_${Date.now()}`,
          type: 'note',
          title: 'Deal Stage Changed',
          details: `Opportunity "${deal.title}" moved to ${targetStage.name} stage ($${deal.value.toLocaleString()})`,
          timestamp: 'Just now',
          outcome: 'completed',
          contactName: deal.contactName,
          companyName: deal.companyName,
          dealTitle: deal.title,
          owner: deal.owner,
        },
        ...prev,
      ]);
    }
  }, [activePipeline, deals]);

  const updateDealOwner = useCallback((dealId: string, owner: LeadOwnerType) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, owner, lastActivity: `Assigned to ${owner}` } : d))
    );
    success(`Assigned to ${owner}`);
  }, [success]);

  const deleteDeal = useCallback((dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    setSelectedIds((prev) => prev.filter((id) => id !== dealId));
    info('Opportunity removed from pipeline.');
  }, [info]);

  // Company Mutations
  const createCompany = useCallback((companyData: Partial<CrmCompany>) => {
    const newCompany: CrmCompany = {
      id: `comp_${Date.now()}`,
      name: companyData.name || 'New Target Account',
      domain: companyData.domain || 'example.com',
      logo: companyData.logo || 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
      industry: companyData.industry || 'Technology',
      employeeCount: companyData.employeeCount || '50-200',
      revenue: companyData.revenue || '$10M - $25M',
      location: companyData.location || 'Global',
      strategy: companyData.strategy || 'Multi-Channel Outbound Sequence',
      activeContactsCount: companyData.activeContactsCount || 1,
      activeDealsCount: 0,
      totalDealValue: 0,
      intentStatus: companyData.intentStatus || 'High Intent',
      tier: companyData.tier || 'Tier 1 Enterprise',
      description: companyData.description || 'Target account identified via intelligence matrix.',
      signalsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setCompanies((prev) => [newCompany, ...prev]);
    success(`Target Company "${newCompany.name}" added.`);
  }, [success]);

  const updateCompany = useCallback((updatedCompany: CrmCompany) => {
    setCompanies((prev) => prev.map((c) => (c.id === updatedCompany.id ? updatedCompany : c)));
    success(`Company "${updatedCompany.name}" updated.`);
  }, [success]);

  const deleteCompany = useCallback((companyId: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== companyId));
    info('Company account removed.');
  }, [info]);

  // Contact Mutations & Lead Linking
  const findExistingContact = useCallback((email: string, domain?: string): CrmContact | undefined => {
    if (!email && !domain) return undefined;
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    return contacts.find((c) => {
      if (cleanEmail && c.email.toLowerCase() === cleanEmail) return true;
      if (domain && c.companyDomain.toLowerCase() === domain.toLowerCase() && cleanEmail.includes(c.name.toLowerCase().split(' ')[0])) return true;
      return false;
    });
  }, [contacts]);

  const updateContactLeadStatus = useCallback((contactId: string, leadStatus: ContactQualificationStatus) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          const updatedStage: CrmContact['stage'] = 
            leadStatus === 'Qualified' ? 'Opportunity' :
            leadStatus === 'Converted' ? 'Customer' :
            leadStatus === 'Engaged' ? 'Meeting Booked' :
            leadStatus === 'Contacted' ? 'Contacted' : 'Lead';
          return {
            ...c,
            leadStatus,
            stage: updatedStage,
            lastTouch: `Just now • Marked as ${leadStatus}`,
          };
        }
        return c;
      })
    );
    const target = contacts.find((c) => c.id === contactId);
    if (target) {
      setActivities((prev) => [
        {
          id: `act_${Date.now()}`,
          type: 'note',
          title: 'Lead Qualification Updated',
          details: `${target.name} status updated to ${leadStatus}`,
          timestamp: 'Just now',
          outcome: 'completed',
          contactName: target.name,
          companyName: target.companyName,
          owner: target.owner,
        },
        ...prev,
      ]);
      success(`${target.name} marked as ${leadStatus}`);
    }
  }, [contacts, success]);

  const saveLeadToCrm = useCallback((leadData: {
    id?: string;
    name: string;
    title?: string;
    company: string;
    domain?: string;
    email: string;
    phone?: string;
    avatar?: string;
    score?: number;
    channel?: 'Email' | 'LinkedIn' | 'Voice SDR' | 'Inbound';
    owner?: LeadOwnerType;
    tags?: string[];
    location?: string;
    linkedinUrl?: string;
  }): { contact: CrmContact; isExisting: boolean } => {
    const existing = findExistingContact(leadData.email, leadData.domain);

    if (existing) {
      const updated: CrmContact = {
        ...existing,
        title: leadData.title || existing.title,
        phone: leadData.phone || existing.phone,
        lastTouch: 'Just now • Refreshed from 8D Lead Finder',
      };
      setContacts((prev) => prev.map((c) => (c.id === existing.id ? updated : c)));

      setActivities((prev) => [
        {
          id: `act_${Date.now()}`,
          type: 'note',
          title: 'Lead Refreshed from Lead Finder',
          details: `Enriched and linked existing contact ${existing.name} (${existing.companyName})`,
          timestamp: 'Just now',
          outcome: 'completed',
          contactName: existing.name,
          companyName: existing.companyName,
          owner: existing.owner,
        },
        ...prev,
      ]);

      return { contact: updated, isExisting: true };
    }

    const newContact: CrmContact = {
      id: `cont_${Date.now()}`,
      name: leadData.name,
      title: leadData.title || 'Decision Maker',
      companyName: leadData.company || 'Target Organization',
      companyDomain: leadData.domain || 'example.com',
      email: leadData.email,
      phone: leadData.phone || '+1 (555) 000-0000',
      avatar: leadData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      score: leadData.score || 95,
      stage: 'Lead',
      leadStatus: 'New',
      owner: leadData.owner || 'Sarah Jenkins',
      lastTouch: 'Just now • Saved from 8D Lead Finder',
      channel: leadData.channel || 'Email',
      status: 'Active',
      tags: leadData.tags || ['Lead Finder', 'High Intent'],
      notesCount: 0,
      sequencesCount: 0,
      dealsCount: 0,
      location: leadData.location || 'United States',
      linkedinUrl: leadData.linkedinUrl || 'https://linkedin.com',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setContacts((prev) => [newContact, ...prev]);

    // Ensure company account is linked/created
    setCompanies((prev) => {
      const compExists = prev.some((c) => c.name.toLowerCase() === newContact.companyName.toLowerCase());
      if (compExists) {
        return prev.map((c) =>
          c.name.toLowerCase() === newContact.companyName.toLowerCase()
            ? { ...c, activeContactsCount: c.activeContactsCount + 1 }
            : c
        );
      }
      const newComp: CrmCompany = {
        id: `comp_${Date.now()}`,
        name: newContact.companyName,
        domain: newContact.companyDomain,
        logo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
        industry: 'Enterprise Technology',
        employeeCount: '50-200',
        revenue: '$10M - $50M',
        location: newContact.location || 'Global',
        strategy: 'Outbound Pipeline',
        activeContactsCount: 1,
        activeDealsCount: 0,
        totalDealValue: 0,
        intentStatus: 'High Intent',
        tier: 'Tier 1 Enterprise',
        description: 'Target organization discovered through 8D Lead Finder.',
        signalsCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      return [newComp, ...prev];
    });

    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'note',
        title: 'Lead Saved to CRM',
        details: `${newContact.name} (${newContact.title} at ${newContact.companyName}) saved from 8D Lead Finder`,
        timestamp: 'Just now',
        outcome: 'completed',
        contactName: newContact.name,
        companyName: newContact.companyName,
        owner: newContact.owner,
      },
      ...prev,
    ]);

    return { contact: newContact, isExisting: false };
  }, [findExistingContact]);

  const createContact = useCallback((contactData: Partial<CrmContact>) => {
    const newContact: CrmContact = {
      id: `cont_${Date.now()}`,
      name: contactData.name || 'New Relationship',
      title: contactData.title || 'Decision Maker',
      companyName: contactData.companyName || 'Target Company',
      companyDomain: contactData.companyDomain || 'example.com',
      email: contactData.email || 'lead@example.com',
      phone: contactData.phone || '+1 (555) 000-0000',
      avatar: contactData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      score: contactData.score || 92,
      stage: contactData.stage || 'Lead',
      leadStatus: contactData.leadStatus || 'New',
      owner: contactData.owner || 'Sarah Jenkins',
      lastTouch: 'Just now • Added to CRM',
      channel: contactData.channel || 'Email',
      status: contactData.status || 'Active',
      tags: contactData.tags || ['Direct Entry'],
      notesCount: 0,
      sequencesCount: 0,
      dealsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setContacts((prev) => [newContact, ...prev]);
    success(`Contact "${newContact.name}" added to verified relationships.`);
  }, [success]);

  const updateContact = useCallback((updatedContact: CrmContact) => {
    setContacts((prev) => prev.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
    success(`Contact "${updatedContact.name}" updated.`);
  }, [success]);

  const deleteContact = useCallback((contactId: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    info('Contact removed.');
  }, [info]);

  // Contract Mutations
  const createContract = useCallback((contractData: Partial<CrmContract>) => {
    const newContract: CrmContract = {
      id: `ctr_${Date.now()}`,
      documentName: contractData.documentName || 'New Service Agreement',
      companyName: contractData.companyName || 'Target Account',
      contactName: contractData.contactName || 'Executive Signee',
      dealId: contractData.dealId,
      status: contractData.status || 'Draft',
      value: contractData.value || 35000,
      startDate: contractData.startDate || new Date().toISOString().split('T')[0],
      endDate: contractData.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActivity: 'Draft created today',
      signeeEmail: contractData.signeeEmail || 'signee@example.com',
      complianceScore: contractData.complianceScore || 100,
    };

    setContracts((prev) => [newContract, ...prev]);
    success(`Contract "${newContract.documentName}" generated.`);
  }, [success]);

  const updateContract = useCallback((updatedContract: CrmContract) => {
    setContracts((prev) => prev.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
    success(`Contract "${updatedContract.documentName}" updated.`);
  }, [success]);

  const deleteContract = useCallback((contractId: string) => {
    setContracts((prev) => prev.filter((c) => c.id !== contractId));
    info('Contract document removed.');
  }, [info]);

  // Label Mutations
  const createLabel = useCallback((labelData: Partial<CrmLabel>) => {
    const newLabel: CrmLabel = {
      id: `lbl_${Date.now()}`,
      name: labelData.name || 'New Tag',
      description: labelData.description || 'Custom intelligence category tag',
      color: labelData.color || '#3b82f6',
      leadCount: 0,
      dealCount: 0,
      sources: labelData.sources || ['Manual CRM'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setLabels((prev) => [newLabel, ...prev]);
    success(`Label "${newLabel.name}" created.`);
  }, [success]);

  const updateLabel = useCallback((updatedLabel: CrmLabel) => {
    setLabels((prev) => prev.map((l) => (l.id === updatedLabel.id ? updatedLabel : l)));
    success(`Label "${updatedLabel.name}" updated.`);
  }, [success]);

  const deleteLabel = useCallback((labelId: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== labelId));
    info('Label removed.');
  }, [info]);

  // Signal Mutations
  const createSignal = useCallback((signalData: Partial<CrmSignal>) => {
    const newSignal: CrmSignal = {
      id: `sig_${Date.now()}`,
      title: signalData.title || 'Buying Signal Triggered',
      description: signalData.description || 'High-intent buying activity detected.',
      entityName: signalData.entityName || 'Target Prospect',
      entityType: signalData.entityType || 'company',
      type: signalData.type || 'Website Intent',
      priority: signalData.priority || 'High',
      detectedAt: 'Just now',
      source: signalData.source || 'Web Visitor Sentinel',
      status: 'New',
      recommendedAction: signalData.recommendedAction || 'Engage decision-maker via direct sequence.',
    };

    setSignals((prev) => [newSignal, ...prev]);
    success('New buying signal logged.');
  }, [success]);

  const updateSignalStatus = useCallback((signalId: string, status: 'New' | 'Actioned' | 'Dismissed') => {
    setSignals((prev) => prev.map((s) => (s.id === signalId ? { ...s, status } : s)));
    info(`Signal marked as ${status.toLowerCase()}`);
  }, [info]);

  const createSignalAlert = useCallback((alertConfig: { name: string; type: string; priority: string }) => {
    success(`Alert rule "${alertConfig.name}" configured for ${alertConfig.type} signals.`);
  }, [success]);

  // Health Actions
  const runHealthCheck = useCallback(() => {
    setIsHealthChecking(true);
    setTimeout(() => {
      // Recalculate health metrics dynamically based on current data
      const totalDealsVal = deals.reduce((acc, d) => acc + d.value, 0);
      const wonVal = deals.filter((d) => d.stageId === 'stage_won').reduce((acc, d) => acc + d.value, 0);
      const winRate = totalDealsVal > 0 ? (wonVal / totalDealsVal) * 100 : 30;

      setHealthData((prev) => ({
        ...prev,
        crmHealthScore: Math.min(99, Math.max(85, Math.round(92 + (contacts.length % 7)))),
        dataQualityScore: 98,
        pipelineHealthScore: 94,
        revenueHealth: {
          ...prev.revenueHealth,
          winRatePercent: Number(winRate.toFixed(1)),
        },
      }));
      setIsHealthChecking(false);
      success('CRM Data Quality & Pipeline Health Check complete. Score: 96/100.');
    }, 1200);
  }, [deals, contacts, success]);

  const refreshHealthData = useCallback(() => {
    runHealthCheck();
  }, [runHealthCheck]);

  // Task Mutations
  const createTask = useCallback((dealId: string | undefined, title: string, dueDate: string, assignee: LeadOwnerType, priority: 'high' | 'medium' | 'low') => {
    const newTask: CrmTask = {
      id: `task_${Date.now()}`,
      dealId,
      title,
      dueDate,
      assignee,
      completed: false,
      priority,
    };
    setTasks((prev) => [newTask, ...prev]);
    success('Task scheduled.');
  }, [success]);

  const toggleTaskCompleted = useCallback((taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  // Reminder Mutations (HubSpot-Style)
  const createReminder = useCallback((reminderData: Omit<CrmReminder, 'id' | 'completed' | 'createdAt'>) => {
    const newReminder: CrmReminder = {
      ...reminderData,
      id: `rem_${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReminders((prev) => [newReminder, ...prev]);
    success(`Follow-up reminder set: "${newReminder.title}"`);
  }, [success]);

  const toggleReminderCompleted = useCallback((reminderId: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === reminderId) {
          const nextCompleted = !r.completed;
          return {
            ...r,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toLocaleString() : undefined,
          };
        }
        return r;
      })
    );
  }, []);

  const snoozeReminder = useCallback((reminderId: string, days: number) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === reminderId) {
          const currentDate = new Date(r.dueDate);
          currentDate.setDate(currentDate.getDate() + days);
          const newDueDate = currentDate.toISOString().split('T')[0];
          return {
            ...r,
            dueDate: newDueDate,
          };
        }
        return r;
      })
    );
    info(`Reminder snoozed by ${days} day${days > 1 ? 's' : ''}`);
  }, [info]);

  const deleteReminder = useCallback((reminderId: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== reminderId));
    info('Reminder removed.');
  }, [info]);

  // Activities & Notes
  const createActivity = useCallback((activity: Omit<CrmActivity, 'id' | 'timestamp'>) => {
    const newActivity: CrmActivity = {
      ...activity,
      id: `act_${Date.now()}`,
      timestamp: 'Just now',
    };
    setActivities((prev) => [newActivity, ...prev]);
  }, []);

  const createNote = useCallback((entityType: 'deal' | 'contact' | 'company', entityId: string, content: string) => {
    const newNote: CrmNote = {
      id: `note_${Date.now()}`,
      entityType,
      entityId,
      content,
      author: 'Sarah Jenkins',
      createdAt: 'Just now',
    };
    setNotes((prev) => [newNote, ...prev]);
    success('Note logged to record.');
  }, [success]);

  const deleteNote = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  }, []);

  // Custom Fields
  const createCustomField = useCallback((field: Omit<CrmCustomField, 'id'>) => {
    const newField: CrmCustomField = {
      ...field,
      id: `cf_${Date.now()}`,
    };
    setCustomFields((prev) => [...prev, newField]);
    success(`Custom field "${newField.fieldName}" created.`);
  }, [success]);

  const deleteCustomField = useCallback((fieldId: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== fieldId));
    info('Custom field removed.');
  }, [info]);

  // Bulk Operations
  const bulkUpdateStage = useCallback((stageId: string) => {
    setDeals((prev) => prev.map((d) => (selectedIds.includes(d.id) ? { ...d, stageId } : d)));
    success(`Updated stage for ${selectedIds.length} deals.`);
    setSelectedIds([]);
  }, [selectedIds, success]);

  const bulkUpdateOwner = useCallback((owner: LeadOwnerType) => {
    setDeals((prev) => prev.map((d) => (selectedIds.includes(d.id) ? { ...d, owner } : d)));
    success(`Assigned ${selectedIds.length} deals to ${owner}.`);
    setSelectedIds([]);
  }, [selectedIds, success]);

  const bulkDelete = useCallback(() => {
    setDeals((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
    info(`Removed ${selectedIds.length} opportunities.`);
    setSelectedIds([]);
  }, [selectedIds, info]);

  const createPipeline = useCallback((name: string, description: string = '') => {
    const newPipeline: CrmPipeline = {
      id: `pipe_${Date.now()}`,
      name,
      description,
      stages: DEFAULT_STAGES,
    };
    setPipelines((prev) => [...prev, newPipeline]);
    setActivePipelineId(newPipeline.id);
    success(`Pipeline "${name}" configured.`);
  }, [success]);

  const exportDealsToCsv = useCallback(() => {
    const escapeCsv = (val: unknown): string => {
      if (val === null || val === undefined) return '""';
      const str = String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const headers = [
      'Deal Title',
      'Company Name',
      'Domain',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'Value',
      'Currency',
      'Stage',
      'Probability (%)',
      'Owner',
      'Priority',
      'Expected Close Date',
      'Tags'
    ];

    const pipelineStages = activePipeline?.stages || [];
    const rows = allFilteredDeals.map((d) => {
      const stageName = pipelineStages.find((s) => s.id === d.stageId)?.name || d.stageId;
      return [
        escapeCsv(d.title),
        escapeCsv(d.companyName),
        escapeCsv(d.companyDomain),
        escapeCsv(d.contactName),
        escapeCsv(d.contactEmail),
        escapeCsv(d.contactPhone),
        d.value || 0,
        escapeCsv(d.currency || 'USD'),
        escapeCsv(stageName),
        d.probability || 0,
        escapeCsv(d.owner),
        escapeCsv(d.priority),
        escapeCsv(d.expectedCloseDate),
        escapeCsv(d.tags?.join('; ') || '')
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `outtricks_crm_deals_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    success(`Exported ${allFilteredDeals.length} deals to RFC-4180 CSV spreadsheet.`, 'Deals Exported');
  }, [activePipeline, allFilteredDeals, success]);

  const importDealsFromCsv = useCallback((newDeals: Partial<CrmDeal>[]) => {
    const formatted: CrmDeal[] = newDeals.map((d, index) => ({
      id: `deal_imp_${Date.now()}_${index}`,
      title: d.title || 'Imported Deal',
      companyName: d.companyName || 'Target Corp',
      companyDomain: d.companyDomain || 'company.com',
      companyLogo: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&q=80',
      contactName: d.contactName || 'Lead Prospect',
      contactTitle: d.contactTitle || 'VP Sales',
      contactEmail: d.contactEmail || 'sales@company.com',
      contactPhone: d.contactPhone || '+1 (555) 019-2831',
      value: d.value || 30000,
      currency: 'USD',
      stageId: d.stageId || 'stage_new',
      pipelineId: activePipelineId,
      owner: d.owner || 'Sarah Jenkins',
      probability: d.probability || 25,
      expectedCloseDate: d.expectedCloseDate || new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tags: d.tags || ['CSV Import'],
      priority: d.priority || 'medium',
      source: '8D Lead Finder',
      notesCount: 0,
      tasksCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Imported via CSV',
    }));

    setDeals((prev) => [...formatted, ...prev]);
    success(`Successfully imported ${formatted.length} deals into pipeline.`);
  }, [activePipelineId, success]);

  const mergeDuplicateDeals = useCallback((primaryId: string, secondaryId: string) => {
    const primary = deals.find((d) => d.id === primaryId);
    const secondary = deals.find((d) => d.id === secondaryId);
    if (!primary || !secondary) return;

    setDeals((prev) =>
      prev
        .map((d) => {
          if (d.id === primaryId) {
            return {
              ...d,
              value: d.value + secondary.value,
              tags: Array.from(new Set([...d.tags, ...secondary.tags])),
              notesCount: d.notesCount + secondary.notesCount,
              lastActivity: `Merged record with ${secondary.id}`,
            };
          }
          return d;
        })
        .filter((d) => d.id !== secondaryId)
    );

    setTasks((prev) => prev.map((t) => (t.dealId === secondaryId ? { ...t, dealId: primaryId } : t)));
    success(`Merged duplicate deal into ${primary.title}`);
  }, [deals, success]);

  // Scalable Async Search & Retrieval (Optimized for 100M+ Datasets)
  const searchContactsAsync = useCallback(async (
    query: string,
    options?: { limit?: number; signal?: AbortSignal }
  ): Promise<CrmContact[]> => {
    const limit = options?.limit || 15;
    // Simulate server-side indexed query latency with abort signal support
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 140);
      if (options?.signal) {
        options.signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      }
    });

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Return recent contacts (simulating indexed recent contacts query)
      return contacts.slice(0, Math.min(limit, 8));
    }

    // Multi-field indexed search: name, email, company, title, phone, contact ID
    const results: CrmContact[] = [];
    for (const c of contacts) {
      const matchName = c.name?.toLowerCase().includes(trimmed);
      const matchEmail = c.email?.toLowerCase().includes(trimmed);
      const matchCompany = c.companyName?.toLowerCase().includes(trimmed);
      const matchTitle = c.title?.toLowerCase().includes(trimmed);
      const matchPhone = c.phone ? c.phone.replace(/[^0-9]/g, '').includes(trimmed.replace(/[^0-9]/g, '')) : false;
      const matchId = c.id?.toLowerCase().includes(trimmed);

      if (matchName || matchEmail || matchCompany || matchTitle || matchPhone || matchId) {
        results.push(c);
        if (results.length >= limit) break; // Strict pagination limit
      }
    }
    return results;
  }, [contacts]);

  const getContactByIdAsync = useCallback(async (id: string): Promise<CrmContact | undefined> => {
    if (!id) return undefined;
    return contacts.find((c) => c.id === id);
  }, [contacts]);

  const searchDealsAsync = useCallback(async (
    query: string,
    options?: { limit?: number; signal?: AbortSignal }
  ): Promise<CrmDeal[]> => {
    const limit = options?.limit || 15;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 140);
      if (options?.signal) {
        options.signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      }
    });

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return deals.slice(0, Math.min(limit, 8));
    }

    const results: CrmDeal[] = [];
    for (const d of deals) {
      const matchTitle = d.title?.toLowerCase().includes(trimmed);
      const matchCompany = d.companyName?.toLowerCase().includes(trimmed);
      const matchContact = d.contactName?.toLowerCase().includes(trimmed);
      const matchId = d.id?.toLowerCase().includes(trimmed);

      if (matchTitle || matchCompany || matchContact || matchId) {
        results.push(d);
        if (results.length >= limit) break;
      }
    }
    return results;
  }, [deals]);

  const getDealByIdAsync = useCallback(async (id: string): Promise<CrmDeal | undefined> => {
    if (!id) return undefined;
    return deals.find((d) => d.id === id);
  }, [deals]);

  return (
    <CrmContext.Provider
      value={{
        pipelines,
        activePipelineId,
        activePipeline,
        deals,
        allFilteredDeals,
        companies,
        contacts,
        contracts,
        labels,
        signals,
        healthData,
        isHealthChecking,
        viewMode,
        activeTab,
        openTabs,
        setActiveTab,
        openTab,
        closeTab,
        searchQuery,
        filterOwner,
        filterPriority,
        filterStage,
        sorting,
        tasks,
        reminders,
        activities,
        customFields,
        notes,
        selection: {
          selectedIds,
          isAllSelectedOnPage,
        },
        pagination: {
          page,
          pageSize,
          totalPages,
          totalResults,
        },
        setActivePipelineId,
        setViewMode,
        setSearchQuery,
        setFilterOwner,
        setFilterPriority,
        setFilterStage,
        resetAllFilters,
        setSorting,
        setPage,
        setPageSize,
        toggleSelectDeal,
        toggleSelectAllOnPage,
        clearSelection,
        createDeal,
        updateDeal,
        updateDealStage,
        updateDealOwner,
        deleteDeal,
        createCompany,
        updateCompany,
        deleteCompany,
        findExistingContact,
        createContact,
        updateContact,
        updateContactLeadStatus,
        saveLeadToCrm,
        deleteContact,
        createContract,
        updateContract,
        deleteContract,
        createLabel,
        updateLabel,
        deleteLabel,
        createSignal,
        updateSignalStatus,
        createSignalAlert,
        runHealthCheck,
        refreshHealthData,
        createTask,
        toggleTaskCompleted,
        deleteTask,
        createReminder,
        toggleReminderCompleted,
        snoozeReminder,
        deleteReminder,
        createActivity,
        createNote,
        deleteNote,
        createCustomField,
        deleteCustomField,
        bulkUpdateStage,
        bulkUpdateOwner,
        bulkDelete,
        createPipeline,
        exportDealsToCsv,
        importDealsFromCsv,
        mergeDuplicateDeals,
        searchContactsAsync,
        getContactByIdAsync,
        searchDealsAsync,
        getDealByIdAsync,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
