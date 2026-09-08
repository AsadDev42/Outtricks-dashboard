import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// ============================================================================
// DATA MODELS & TYPES
// ============================================================================

export type AdminRole = 
  | 'super-admin'
  | 'admin'
  | 'billing-admin'
  | 'team-admin'
  | 'manager'
  | 'member'
  | 'viewer'
  | string;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  teamId?: string;
  teamName?: string;
  planId: string;
  planName: string;
  bundleIds: string[];
  status: 'active' | 'suspended' | 'pending';
  credits: number;
  lastActive: string;
  createdAt: string;
  featureOverrides?: Record<string, boolean>;
  limitOverrides?: Record<string, number>;
}

export interface AdminTeam {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  membersCount: number;
  memberIds: string[];
  planId: string;
  planName: string;
  bundleIds: string[];
  credits: number;
  status: 'active' | 'suspended';
  resourceLimits: {
    emailsMonthly: number;
    voiceAgents: number;
    leadFinderSearches: number;
    linkedInActions: number;
    aiTokensMonthly: number;
    mailboxes: number;
    workflows: number;
  };
  usage: {
    emailsSent: number;
    voiceMinutes: number;
    leadsSearched: number;
    linkedInActions: number;
    aiRequests: number;
  };
  createdAt: string;
}

export interface AdminRoleDefinition {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  userCount: number;
  permissions: {
    adminPanel: boolean;
    manageUsers: boolean;
    manageTeams: boolean;
    managePlans: boolean;
    manageBilling: boolean;
    manageCredits: boolean;
    manageIntegrations: boolean;
    manageSecurity: boolean;
    leadFinder: boolean;
    emailOutreach: boolean;
    linkedInSafe: boolean;
    voiceAi: boolean;
    dealsCrm: boolean;
    aiAgents: boolean;
    workflows: boolean;
    analytics: boolean;
  };
}

export interface AdminPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  trialDays: number;
  creditsMonthly: number;
  userLimit: number;
  emailLimitMonthly: number;
  callLimitMonthly: number;
  leadFinderLimitMonthly: number;
  linkedInLimitMonthly: number;
  aiUsageLimitMonthly: number;
  mailboxLimit: number;
  voiceAgentLimit: number;
  workflowLimit: number;
  status: 'active' | 'archived';
  isPopular?: boolean;
}

export interface AdminBundle {
  id: string;
  name: string;
  code: string;
  description: string;
  category: 'email' | 'lead-gen' | 'linkedin' | 'voice' | 'workforce' | 'custom';
  modules: string[];
  includedFeatures: string[];
  monthlyAddonPrice: number;
  includedCredits: number;
  status: 'active' | 'archived';
}

export interface AdminModuleConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  maintenanceMode: boolean;
  visibility: 'all' | 'plan-required' | 'bundle-required' | 'admin-only';
  requiredPlanId?: string;
  requiredBundleId?: string;
  order: number;
}

export interface AdminAssignment {
  id: string;
  targetType: 'user' | 'team';
  targetId: string;
  targetName: string;
  planId: string;
  planName: string;
  bundleIds: string[];
  startDate: string;
  expiryDate: string;
  autoRenew: boolean;
  creditsAllocated: number;
  overridePlanLimits: boolean;
  customLimits?: Record<string, number>;
  notes?: string;
}

export interface AdminSubscription {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  teamName?: string;
  planId: string;
  planName: string;
  bundleIds?: string[];
  bundleNames: string[];
  amount: number;
  billingInterval: 'monthly' | 'annual' | 'custom';
  status: 'active' | 'trial' | 'past_due' | 'payment_failed' | 'auto_renew_off' | 'scheduled_to_expire' | 'expired' | 'cancelled' | 'paused' | 'suspended';
  autoRenew: boolean;
  startDate?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  nextBillingDate: string;
  lastPaymentDate?: string;
  paymentMethod?: string;
  creditsAllocated?: number;
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  transactionId: string;
  customerName: string;
  customerEmail?: string;
  subscriptionId?: string;
  chargeId?: string;
  paymentIntentId?: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'refunded' | 'failed' | 'pending' | 'cancelled';
  paymentMethod: string;
  paymentMethodType?: string;
  cardBrand?: string;
  last4?: string;
  gateway?: string;
  date: string;
  settlementDate?: string;
  referenceNumber?: string;
  timeline?: {
    event: string;
    date: string;
    time: string;
    status: string;
    details?: string;
  }[];
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  dueDate: string;
  createdAt: string;
  items: { description: string; amount: number }[];
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
  durationMonths?: number;
  maxRedemptions?: number;
  redemptionCount: number;
  status: 'active' | 'expired' | 'disabled';
  expiryDate?: string;
}

export interface AdminIntegration {
  id: string;
  name: string;
  category: 'email' | 'voice' | 'ai' | 'linkedin' | 'crm' | 'payment' | 'webhook';
  provider: string;
  status: 'connected' | 'disconnected' | 'warning' | 'error';
  healthScore: number;
  lastChecked: string;
  config: Record<string, any>;
}

export interface AdminAuditLog {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  target: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  reason?: string;
}

export interface AdminSystemHealthService {
  id: string;
  name: string;
  category: 'core' | 'database' | 'ai' | 'telecom' | 'automation';
  status: 'healthy' | 'warning' | 'degraded' | 'offline';
  latencyMs: number;
  uptimePercentage: number;
  errorRatePercentage: number;
  lastCheckTime: string;
}

export interface TricksyAiConfig {
  defaultModel: string;
  availableModels: { id: string; name: string; provider: string; costPer1k: number; enabled: boolean }[];
  creditMultiplier: number;
  systemPromptPreset: string;
  maxTokensPerRequest: number;
  enableAutonomousExecution: boolean;
  rateLimitPerMinute: number;
  monthlySpendCapUsd: number;
  currentSpendUsd: number;
}

export interface GlobalBrandingSettings {
  platformName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  supportEmail: string;
  companyLegalName: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
}

export interface GlobalPlatformSettings {
  defaultCurrency: string;
  defaultTimezone: string;
  defaultLanguage: string;
  maintenanceMode: boolean;
  maintenanceNotice: string;
  allowPublicSignups: boolean;
  enforce2FA: boolean;
  sessionTimeoutHours: number;
  maxLoginAttempts: number;
}

// ============================================================================
// CONTEXT TYPE DEFINITION
// ============================================================================

interface AdminContextType {
  // Authorization & Impersonation
  isAdmin: boolean;
  currentAdminRole: AdminRole;
  impersonatedUser: AdminUser | null;
  impersonateUser: (userId: string) => void;
  stopImpersonation: () => void;
  hasPermission: (permissionKey: keyof AdminRoleDefinition['permissions']) => boolean;

  // Data Collections
  users: AdminUser[];
  teams: AdminTeam[];
  roles: AdminRoleDefinition[];
  plans: AdminPlan[];
  bundles: AdminBundle[];
  modules: AdminModuleConfig[];
  assignments: AdminAssignment[];
  subscriptions: AdminSubscription[];
  payments: AdminPayment[];
  invoices: AdminInvoice[];
  coupons: AdminCoupon[];
  integrations: AdminIntegration[];
  auditLogs: AdminAuditLog[];
  systemHealth: AdminSystemHealthService[];
  tricksyAi: TricksyAiConfig;
  branding: GlobalBrandingSettings;
  globalSettings: GlobalPlatformSettings;

  // Consumption Rules
  creditCosts: {
    leadSearch: number;
    emailSend: number;
    voiceMinute: number;
    aiRequest: number;
    enrichment: number;
  };
  setCreditCosts: (costs: Partial<AdminContextType['creditCosts']>) => void;

  // CRUD Operations - Users
  addUser: (data: Omit<AdminUser, 'id' | 'createdAt' | 'lastActive'>) => AdminUser;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  setUserPlanAndBundles: (id: string, planId: string, bundleIds: string[]) => void;
  addCreditsToUser: (id: string, amount: number) => void;

  // CRUD Operations - Teams
  addTeam: (data: Omit<AdminTeam, 'id' | 'createdAt' | 'usage'>) => AdminTeam;
  updateTeam: (id: string, data: Partial<AdminTeam>) => void;
  deleteTeam: (id: string) => void;
  addCreditsToTeam: (id: string, amount: number) => void;

  // CRUD Operations - Plans
  addPlan: (plan: Omit<AdminPlan, 'id'>) => AdminPlan;
  updatePlan: (id: string, data: Partial<AdminPlan>) => void;
  deletePlan: (id: string) => void;

  // CRUD Operations - Bundles
  addBundle: (bundle: Omit<AdminBundle, 'id'>) => AdminBundle;
  updateBundle: (id: string, data: Partial<AdminBundle>) => void;
  deleteBundle: (id: string) => void;

  // CRUD Operations - Roles
  addRole: (role: Omit<AdminRoleDefinition, 'id' | 'userCount'>) => AdminRoleDefinition;
  updateRole: (id: string, data: Partial<AdminRoleDefinition>) => void;
  deleteRole: (id: string) => void;

  // Modules & Navigation
  toggleModuleEnabled: (moduleId: string) => void;
  toggleModuleMaintenance: (moduleId: string) => void;
  updateModuleConfig: (moduleId: string, data: Partial<AdminModuleConfig>) => void;
  reorderModules: (newOrder: AdminModuleConfig[]) => void;

  // Assignments & Feature Access Overrides
  addAssignment: (assignment: Omit<AdminAssignment, 'id'>) => AdminAssignment;
  deleteAssignment: (id: string) => void;
  setUserFeatureOverride: (userId: string, featureKey: string, enabled: boolean) => void;
  setTeamLimitOverride: (teamId: string, limitKey: string, value: number) => void;

  // Billing Actions
  createSubscriptionManually: (data: { 
    customerId: string; 
    customerName: string; 
    customerEmail: string; 
    planId: string; 
    bundleIds: string[]; 
    credits: number;
    billingInterval?: 'monthly' | 'annual' | 'custom';
    autoRenew?: boolean;
    startDate?: string;
    nextBillingDate?: string;
  }) => void;
  cancelSubscription: (id: string) => void;
  setAutoRenew: (id: string, autoRenew: boolean, reason?: string) => void;
  renewSubscriptionNow: (id: string) => void;
  changeSubscriptionPlan: (id: string, planId: string, timing?: 'immediate' | 'next_renewal') => void;
  updateSubscriptionBundles: (id: string, bundleIds: string[]) => void;
  suspendSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  terminateSubscription: (id: string, reason?: string) => void;
  refundPayment: (paymentId: string) => void;
  addCoupon: (coupon: Omit<AdminCoupon, 'id' | 'redemptionCount'>) => AdminCoupon;
  deleteCoupon: (id: string) => void;

  // Integrations & AI
  updateIntegration: (id: string, data: Partial<AdminIntegration>) => void;
  testIntegration: (id: string) => Promise<boolean>;
  updateTricksyAiConfig: (data: Partial<TricksyAiConfig>) => void;

  // Global Config & Branding
  updateBranding: (data: Partial<GlobalBrandingSettings>) => void;
  updateGlobalSettings: (data: Partial<GlobalPlatformSettings>) => void;

  // Access Control Helper Methods
  hasModuleAccess: (moduleId: string) => boolean;
  hasBundleAccess: (bundleId: string) => boolean;
  hasFeatureAccess: (featureKey: string) => boolean;
  getEffectiveLimits: () => Record<string, number>;
  logAdminAction: (action: string, target: string, oldValue?: string, newValue?: string, reason?: string) => void;
  resetAllAdminDemoData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ============================================================================
// INITIAL DEMO DATA
// ============================================================================

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'super-admin',
    teamId: 'team-1',
    teamName: 'CloudScale Revenue Ops',
    planId: 'plan-scale',
    planName: 'Scale Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen', 'bnd-linkedin', 'bnd-voice', 'bnd-workforce'],
    status: 'active',
    credits: 148500,
    lastActive: 'Just now',
    createdAt: '2025-01-15'
  },
  {
    id: 'usr-2',
    name: 'David Zhao',
    email: 'david.z@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    teamId: 'team-1',
    teamName: 'CloudScale Revenue Ops',
    planId: 'plan-scale',
    planName: 'Scale Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen', 'bnd-linkedin'],
    status: 'active',
    credits: 92000,
    lastActive: '12m ago',
    createdAt: '2025-02-01'
  },
  {
    id: 'usr-3',
    name: 'Alex Rivera',
    email: 'alex.r@apexventures.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'team-admin',
    teamId: 'team-2',
    teamName: 'Apex Outbound Growth',
    planId: 'plan-growth',
    planName: 'Growth Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen'],
    status: 'active',
    credits: 45000,
    lastActive: '1 hour ago',
    createdAt: '2025-03-10'
  },
  {
    id: 'usr-4',
    name: 'Marcus Vance',
    email: 'm.vance@solarisdynamics.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'manager',
    teamId: 'team-3',
    teamName: 'Solaris Sales',
    planId: 'plan-starter',
    planName: 'Starter Plan',
    bundleIds: ['bnd-leadgen'],
    status: 'active',
    credits: 12000,
    lastActive: '3 hours ago',
    createdAt: '2025-04-20'
  },
  {
    id: 'usr-5',
    name: 'Elena Rostova',
    email: 'elena@novapipeline.tech',
    role: 'member',
    teamId: 'team-2',
    teamName: 'Apex Outbound Growth',
    planId: 'plan-growth',
    planName: 'Growth Plan',
    bundleIds: ['bnd-email'],
    status: 'suspended',
    credits: 1500,
    lastActive: '4 days ago',
    createdAt: '2025-05-12'
  }
];

const INITIAL_TEAMS: AdminTeam[] = [
  {
    id: 'team-1',
    name: 'CloudScale Revenue Ops',
    ownerId: 'usr-1',
    ownerName: 'Sarah Jenkins',
    membersCount: 8,
    memberIds: ['usr-1', 'usr-2'],
    planId: 'plan-scale',
    planName: 'Scale Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen', 'bnd-linkedin', 'bnd-voice', 'bnd-workforce'],
    credits: 148500,
    status: 'active',
    resourceLimits: {
      emailsMonthly: 250000,
      voiceAgents: 20,
      leadFinderSearches: 100000,
      linkedInActions: 50000,
      aiTokensMonthly: 50000000,
      mailboxes: 100,
      workflows: 50,
    },
    usage: {
      emailsSent: 84200,
      voiceMinutes: 1420,
      leadsSearched: 38400,
      linkedInActions: 18900,
      aiRequests: 42100,
    },
    createdAt: '2025-01-15'
  },
  {
    id: 'team-2',
    name: 'Apex Outbound Growth',
    ownerId: 'usr-3',
    ownerName: 'Alex Rivera',
    membersCount: 4,
    memberIds: ['usr-3', 'usr-5'],
    planId: 'plan-growth',
    planName: 'Growth Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen'],
    credits: 45000,
    status: 'active',
    resourceLimits: {
      emailsMonthly: 50000,
      voiceAgents: 5,
      leadFinderSearches: 25000,
      linkedInActions: 10000,
      aiTokensMonthly: 10000000,
      mailboxes: 20,
      workflows: 15,
    },
    usage: {
      emailsSent: 22100,
      voiceMinutes: 0,
      leadsSearched: 11400,
      linkedInActions: 0,
      aiRequests: 8900,
    },
    createdAt: '2025-03-10'
  },
  {
    id: 'team-3',
    name: 'Solaris Sales',
    ownerId: 'usr-4',
    ownerName: 'Marcus Vance',
    membersCount: 2,
    memberIds: ['usr-4'],
    planId: 'plan-starter',
    planName: 'Starter Plan',
    bundleIds: ['bnd-leadgen'],
    credits: 12000,
    status: 'active',
    resourceLimits: {
      emailsMonthly: 10000,
      voiceAgents: 1,
      leadFinderSearches: 5000,
      linkedInActions: 2000,
      aiTokensMonthly: 2000000,
      mailboxes: 5,
      workflows: 3,
    },
    usage: {
      emailsSent: 3400,
      voiceMinutes: 0,
      leadsSearched: 2100,
      linkedInActions: 400,
      aiRequests: 1800,
    },
    createdAt: '2025-04-20'
  }
];

const INITIAL_ROLES: AdminRoleDefinition[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Full unrestricted governance across platform, users, billing, and system infrastructure.',
    isSystem: true,
    userCount: 1,
    permissions: {
      adminPanel: true,
      manageUsers: true,
      manageTeams: true,
      managePlans: true,
      manageBilling: true,
      manageCredits: true,
      manageIntegrations: true,
      manageSecurity: true,
      leadFinder: true,
      emailOutreach: true,
      linkedInSafe: true,
      voiceAi: true,
      dealsCrm: true,
      aiAgents: true,
      workflows: true,
      analytics: true,
    }
  },
  {
    id: 'admin',
    name: 'Platform Admin',
    description: 'Manages users, workspaces, products, and support operations without core security destruction.',
    isSystem: true,
    userCount: 1,
    permissions: {
      adminPanel: true,
      manageUsers: true,
      manageTeams: true,
      managePlans: true,
      manageBilling: true,
      manageCredits: true,
      manageIntegrations: true,
      manageSecurity: false,
      leadFinder: true,
      emailOutreach: true,
      linkedInSafe: true,
      voiceAi: true,
      dealsCrm: true,
      aiAgents: true,
      workflows: true,
      analytics: true,
    }
  },
  {
    id: 'billing-admin',
    name: 'Billing Admin',
    description: 'Dedicated financial administrator managing subscriptions, invoices, coupons, and credit lines.',
    isSystem: true,
    userCount: 0,
    permissions: {
      adminPanel: true,
      manageUsers: false,
      manageTeams: false,
      managePlans: true,
      manageBilling: true,
      manageCredits: true,
      manageIntegrations: false,
      manageSecurity: false,
      leadFinder: false,
      emailOutreach: false,
      linkedInSafe: false,
      voiceAi: false,
      dealsCrm: false,
      aiAgents: false,
      workflows: false,
      analytics: true,
    }
  },
  {
    id: 'team-admin',
    name: 'Team Admin',
    description: 'Manages workspace members, assigned campaigns, team limits, and local team settings.',
    isSystem: true,
    userCount: 1,
    permissions: {
      adminPanel: false,
      manageUsers: false,
      manageTeams: false,
      managePlans: false,
      manageBilling: false,
      manageCredits: false,
      manageIntegrations: false,
      manageSecurity: false,
      leadFinder: true,
      emailOutreach: true,
      linkedInSafe: true,
      voiceAi: true,
      dealsCrm: true,
      aiAgents: true,
      workflows: true,
      analytics: true,
    }
  },
  {
    id: 'manager',
    name: 'Revenue Manager',
    description: 'Leads prospecting sequences, oversees AI agent approvals, and tracks pipeline deal metrics.',
    isSystem: true,
    userCount: 1,
    permissions: {
      adminPanel: false,
      manageUsers: false,
      manageTeams: false,
      managePlans: false,
      manageBilling: false,
      manageCredits: false,
      manageIntegrations: false,
      manageSecurity: false,
      leadFinder: true,
      emailOutreach: true,
      linkedInSafe: true,
      voiceAi: false,
      dealsCrm: true,
      aiAgents: true,
      workflows: false,
      analytics: true,
    }
  },
  {
    id: 'member',
    name: 'Standard Member',
    description: 'Operational team member executing authorized outreach, finding prospects, and closing deals.',
    isSystem: true,
    userCount: 1,
    permissions: {
      adminPanel: false,
      manageUsers: false,
      manageTeams: false,
      managePlans: false,
      manageBilling: false,
      manageCredits: false,
      manageIntegrations: false,
      manageSecurity: false,
      leadFinder: true,
      emailOutreach: true,
      linkedInSafe: false,
      voiceAi: false,
      dealsCrm: true,
      aiAgents: false,
      workflows: false,
      analytics: false,
    }
  }
];

const INITIAL_PLANS: AdminPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    description: 'For solo SDRs and boutique agencies launching initial outbound revenue pipelines.',
    monthlyPrice: 99,
    annualPrice: 79,
    trialDays: 14,
    creditsMonthly: 10000,
    userLimit: 2,
    emailLimitMonthly: 15000,
    callLimitMonthly: 300,
    leadFinderLimitMonthly: 5000,
    linkedInLimitMonthly: 2500,
    aiUsageLimitMonthly: 2000000,
    mailboxLimit: 5,
    voiceAgentLimit: 1,
    workflowLimit: 5,
    status: 'active'
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    description: 'For accelerating sales teams scaling multi-channel cold email, voice AI, and LinkedIn outreach.',
    monthlyPrice: 299,
    annualPrice: 249,
    trialDays: 14,
    creditsMonthly: 50000,
    userLimit: 10,
    emailLimitMonthly: 75000,
    callLimitMonthly: 2500,
    leadFinderLimitMonthly: 25000,
    linkedInLimitMonthly: 15000,
    aiUsageLimitMonthly: 15000000,
    mailboxLimit: 25,
    voiceAgentLimit: 5,
    workflowLimit: 20,
    status: 'active',
    isPopular: true
  },
  {
    id: 'plan-scale',
    name: 'Scale',
    description: 'For mid-market enterprises deploying fleet-wide autonomous AI SDRs and unlimited workflows.',
    monthlyPrice: 799,
    annualPrice: 649,
    trialDays: 30,
    creditsMonthly: 200000,
    userLimit: 50,
    emailLimitMonthly: 300000,
    callLimitMonthly: 10000,
    leadFinderLimitMonthly: 100000,
    linkedInLimitMonthly: 50000,
    aiUsageLimitMonthly: 60000000,
    mailboxLimit: 100,
    voiceAgentLimit: 20,
    workflowLimit: 100,
    status: 'active'
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'Custom governance, dedicated IP proxies, tailored SLA, SOC2 Type II, and custom AI fine-tuning.',
    monthlyPrice: 1999,
    annualPrice: 1699,
    trialDays: 30,
    creditsMonthly: 1000000,
    userLimit: 999,
    emailLimitMonthly: 1500000,
    callLimitMonthly: 50000,
    leadFinderLimitMonthly: 500000,
    linkedInLimitMonthly: 250000,
    aiUsageLimitMonthly: 500000000,
    mailboxLimit: 500,
    voiceAgentLimit: 100,
    workflowLimit: 500,
    status: 'active'
  }
];

const INITIAL_BUNDLES: AdminBundle[] = [
  {
    id: 'bnd-email',
    name: 'Email Marketing Bundle',
    code: 'EMAIL_MARKETING',
    description: 'High-deliverability cold email sequences, multi-inbox rotation, and automated warmup engines.',
    category: 'email',
    modules: ['email'],
    includedFeatures: ['Campaigns', 'Sequences', 'Templates', 'Mailboxes', 'Warmup', 'Deliverability Guard', 'Email Analytics'],
    monthlyAddonPrice: 149,
    includedCredits: 25000,
    status: 'active'
  },
  {
    id: 'bnd-leadgen',
    name: 'Lead Generation Bundle',
    code: 'LEAD_GENERATION',
    description: '480M+ B2B decision makers, real-time verified work emails, phone enrichment, and CSV exports.',
    category: 'lead-gen',
    modules: ['lead-finder'],
    includedFeatures: ['8D Search', 'Saved Searches', 'Lead Lists', 'Enrichment', 'CSV Export', 'Target Companies ABM'],
    monthlyAddonPrice: 199,
    includedCredits: 35000,
    status: 'active'
  },
  {
    id: 'bnd-linkedin',
    name: 'LinkedIn Safe Cloud',
    code: 'LINKEDIN_SAFE',
    description: 'Cloud-isolated proxy automation, connection requests, profile intelligence, and smart messaging.',
    category: 'linkedin',
    modules: ['linkedin'],
    includedFeatures: ['Safe Campaigns', 'Connection Sequencer', 'InMail AI', 'Profile Visits', 'Proxy Rotation', 'Account Health'],
    monthlyAddonPrice: 129,
    includedCredits: 15000,
    status: 'active'
  },
  {
    id: 'bnd-voice',
    name: 'Voice AI SDR Studio',
    code: 'VOICE_AI',
    description: 'Sub-400ms conversational phone SDRs with dynamic knowledge bases, objection handling, and CRM sync.',
    category: 'voice',
    modules: ['calls'],
    includedFeatures: ['Voice SDR Agents', 'Phone Numbers', 'Call Recordings', 'Live Transcripts', 'Knowledge Base', 'Call Analytics'],
    monthlyAddonPrice: 249,
    includedCredits: 20000,
    status: 'active'
  },
  {
    id: 'bnd-workforce',
    name: 'Autonomous AI Workforce',
    code: 'AI_WORKFORCE',
    description: 'Fleet of 24/7 autonomous agents for Upwork proposals, deep account research, and CRM hygiene.',
    category: 'workforce',
    modules: ['agents', 'upwork', 'workflows'],
    includedFeatures: ['SDR Outreach Agent', 'LinkedIn Bot', 'Upwork Bidding Studio', 'DeepContext Researcher', 'DAG Workflows'],
    monthlyAddonPrice: 299,
    includedCredits: 50000,
    status: 'active'
  }
];

const INITIAL_MODULES: AdminModuleConfig[] = [
  { id: 'copilot', name: 'Master Box / AI Chat', description: 'Master Box autonomous AI chat and conversational orchestrator.', icon: 'Sparkles', enabled: true, maintenanceMode: false, visibility: 'all', order: 1 },
  { id: 'agents', name: 'AI Agents', description: 'Autonomous agent fleet executing multi-step outbound missions.', icon: 'Bot', enabled: true, maintenanceMode: false, visibility: 'all', order: 2 },
  { id: 'crm', name: 'Deals CRM', description: 'Pipeline stages, revenue forecasting, contracts, and deal stages.', icon: 'Layers', enabled: true, maintenanceMode: false, visibility: 'all', order: 3 },
  { id: 'lead-finder', name: '8D Lead Finder', description: 'Prospect search engine across 480M+ global profiles.', icon: 'Search', enabled: true, maintenanceMode: false, visibility: 'all', order: 4 },
  { id: 'inbox', name: 'Master Inbox', description: 'Unified multi-channel inbox across email, LinkedIn, and SMS.', icon: 'Inbox', enabled: true, maintenanceMode: false, visibility: 'all', order: 5 },
  { id: 'email', name: 'Cold Email Outreach', description: 'High-volume mailbox distribution and warmup analytics.', icon: 'Mail', enabled: true, maintenanceMode: false, visibility: 'all', order: 6 },
  { id: 'linkedin', name: 'LinkedIn Safe Cloud', description: 'Automated social touches and connection sequences.', icon: 'Linkedin', enabled: true, maintenanceMode: false, visibility: 'all', order: 7 },
  { id: 'calls', name: 'Voice AI SDR', description: 'Sub-400ms interactive AI phone agents.', icon: 'PhoneCall', enabled: true, maintenanceMode: false, visibility: 'all', order: 8 },
  { id: 'upwork', name: 'Upwork Studio', description: 'Freelance lead discovery and automated proposal drafting.', icon: 'Briefcase', enabled: true, maintenanceMode: false, visibility: 'all', order: 9 },
  { id: 'workflows', name: 'Visual Workflows', description: 'DAG event nodes and integration webhooks.', icon: 'Workflow', enabled: true, maintenanceMode: false, visibility: 'all', order: 10 },
  { id: 'analytics', name: 'Revenue Analytics', description: 'Multi-touch attribution, forecast charts, and billing metrics.', icon: 'BarChart3', enabled: true, maintenanceMode: false, visibility: 'all', order: 11 },
  { id: 'admin', name: 'Workspace', description: 'Master governance, access control, plans, and platform settings.', icon: 'ShieldCheck', enabled: true, maintenanceMode: false, visibility: 'admin-only', order: 12 },
  { id: 'settings', name: 'Settings', description: 'Personal profile, team workspaces, cursor, and appearance.', icon: 'Settings', enabled: true, maintenanceMode: false, visibility: 'all', order: 13 },
];

const INITIAL_ASSIGNMENTS: AdminAssignment[] = [
  {
    id: 'asg-1',
    targetType: 'team',
    targetId: 'team-1',
    targetName: 'CloudScale Revenue Ops',
    planId: 'plan-scale',
    planName: 'Scale Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen', 'bnd-linkedin', 'bnd-voice', 'bnd-workforce'],
    startDate: '2025-01-15',
    expiryDate: '2026-01-15',
    autoRenew: true,
    creditsAllocated: 200000,
    overridePlanLimits: true,
    notes: 'Enterprise pilot contract with custom SLA.'
  },
  {
    id: 'asg-2',
    targetType: 'team',
    targetId: 'team-2',
    targetName: 'Apex Outbound Growth',
    planId: 'plan-growth',
    planName: 'Growth Plan',
    bundleIds: ['bnd-email', 'bnd-leadgen'],
    startDate: '2025-03-10',
    expiryDate: '2026-03-10',
    autoRenew: true,
    creditsAllocated: 50000,
    overridePlanLimits: false,
  }
];

const INITIAL_SUBSCRIPTIONS: AdminSubscription[] = [
  {
    id: 'sub-9901',
    customerId: 'usr-1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@cloudscale.ai',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    teamName: 'CloudScale Revenue Ops',
    planId: 'plan-scale',
    planName: 'Scale Plan ($799/mo)',
    bundleIds: ['bnd-email', 'bnd-leadgen', 'bnd-voice', 'bnd-workforce'],
    bundleNames: ['Email Marketing', 'Lead Generation', 'Voice AI', 'AI Workforce'],
    amount: 799,
    billingInterval: 'monthly',
    status: 'active',
    autoRenew: true,
    startDate: '2025-01-15',
    lastPaymentDate: '2026-08-15',
    paymentMethod: 'Visa •••• 4242',
    creditsAllocated: 100000,
    nextBillingDate: '2026-09-15',
    createdAt: '2025-01-15'
  },
  {
    id: 'sub-9902',
    customerId: 'usr-3',
    customerName: 'Alex Rivera',
    customerEmail: 'alex.r@apexventures.io',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    teamName: 'Apex Outbound Growth',
    planId: 'plan-growth',
    planName: 'Growth Plan ($299/mo)',
    bundleIds: ['bnd-email', 'bnd-leadgen'],
    bundleNames: ['Email Marketing', 'Lead Generation'],
    amount: 299,
    billingInterval: 'monthly',
    status: 'active',
    autoRenew: true,
    startDate: '2025-03-10',
    lastPaymentDate: '2026-08-10',
    paymentMethod: 'Mastercard •••• 8812',
    creditsAllocated: 50000,
    nextBillingDate: '2026-09-10',
    createdAt: '2025-03-10'
  },
  {
    id: 'sub-9903',
    customerId: 'usr-4',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@solarisdynamics.com',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    teamName: 'Solaris Sales',
    planId: 'plan-starter',
    planName: 'Starter Plan ($99/mo)',
    bundleIds: ['bnd-leadgen'],
    bundleNames: ['Lead Generation'],
    amount: 99,
    billingInterval: 'monthly',
    status: 'trial',
    autoRenew: true,
    startDate: '2025-08-20',
    lastPaymentDate: '2026-08-20',
    paymentMethod: 'Amex •••• 1004',
    creditsAllocated: 15000,
    nextBillingDate: '2026-09-04',
    createdAt: '2025-08-20'
  }
];

const INITIAL_PAYMENTS: AdminPayment[] = [
  { 
    id: 'pay-101', 
    transactionId: 'ch_3N82b9921a', 
    customerName: 'CloudScale Revenue Ops', 
    customerEmail: 'sarah.j@cloudscale.ai',
    subscriptionId: 'sub-9901',
    chargeId: 'ch_3N82b9921a',
    paymentIntentId: 'pi_3N82b9921a_secret_991',
    amount: 799, 
    currency: 'USD', 
    status: 'succeeded', 
    paymentMethod: 'Visa •••• 4242', 
    paymentMethodType: 'Credit Card',
    cardBrand: 'Visa',
    last4: '4242',
    gateway: 'Stripe Gateway',
    date: '2026-08-15',
    settlementDate: '2026-08-15',
    referenceNumber: 'REF-STRIPE-88219',
    timeline: [
      { event: 'Payment initiated', date: '2026-08-15', time: '10:42:01 UTC', status: 'completed', details: 'Checkout session completed via Stripe Hosted API' },
      { event: 'Payment authorized', date: '2026-08-15', time: '10:42:04 UTC', status: 'completed', details: '3D Secure passed. Bank authorization approved' },
      { event: 'Payment succeeded', date: '2026-08-15', time: '10:42:05 UTC', status: 'completed', details: '$799.00 USD captured successfully' },
      { event: 'Payment settled', date: '2026-08-15', time: '10:43:00 UTC', status: 'completed', details: 'Settlement ledger balance reconciled into corporate treasury' }
    ]
  },
  { 
    id: 'pay-102', 
    transactionId: 'ch_3N81x8812b', 
    customerName: 'Apex Outbound Growth', 
    customerEmail: 'alex.r@apexventures.io',
    subscriptionId: 'sub-9902',
    chargeId: 'ch_3N81x8812b',
    paymentIntentId: 'pi_3N81x8812b_secret_442',
    amount: 299, 
    currency: 'USD', 
    status: 'succeeded', 
    paymentMethod: 'Mastercard •••• 8812', 
    paymentMethodType: 'Credit Card',
    cardBrand: 'Mastercard',
    last4: '8812',
    gateway: 'Stripe Gateway',
    date: '2026-08-10',
    settlementDate: '2026-08-10',
    referenceNumber: 'REF-STRIPE-88214',
    timeline: [
      { event: 'Payment initiated', date: '2026-08-10', time: '09:15:10 UTC', status: 'completed', details: 'Subscription auto-renew triggered' },
      { event: 'Payment authorized', date: '2026-08-10', time: '09:15:12 UTC', status: 'completed', details: 'Mastercard token validated' },
      { event: 'Payment succeeded', date: '2026-08-10', time: '09:15:13 UTC', status: 'completed', details: '$299.00 USD captured' },
      { event: 'Payment settled', date: '2026-08-10', time: '09:16:00 UTC', status: 'completed', details: 'Ledger updated' }
    ]
  },
  { 
    id: 'pay-103', 
    transactionId: 'ch_3N79k7711c', 
    customerName: 'Solaris Sales', 
    customerEmail: 'm.vance@solarisdynamics.com',
    subscriptionId: 'sub-9903',
    chargeId: 'ch_3N79k7711c',
    paymentIntentId: 'pi_3N79k7711c_secret_112',
    amount: 99, 
    currency: 'USD', 
    status: 'succeeded', 
    paymentMethod: 'Amex •••• 1004', 
    paymentMethodType: 'Credit Card',
    cardBrand: 'American Express',
    last4: '1004',
    gateway: 'Stripe Gateway',
    date: '2026-08-01',
    settlementDate: '2026-08-01',
    referenceNumber: 'REF-STRIPE-88190',
    timeline: [
      { event: 'Payment initiated', date: '2026-08-01', time: '14:20:00 UTC', status: 'completed', details: 'Trial upgrade checkout' },
      { event: 'Payment authorized', date: '2026-08-01', time: '14:20:02 UTC', status: 'completed', details: 'Amex Direct Authorization' },
      { event: 'Payment succeeded', date: '2026-08-01', time: '14:20:03 UTC', status: 'completed', details: '$99.00 USD captured' },
      { event: 'Payment settled', date: '2026-08-01', time: '14:21:00 UTC', status: 'completed', details: 'Settlement confirmed' }
    ]
  },
];

const INITIAL_INVOICES: AdminInvoice[] = [
  { id: 'inv-2026-001', invoiceNumber: 'INV-2026-0881', customerName: 'CloudScale Revenue Ops', customerEmail: 'billing@cloudscale.ai', amount: 799, status: 'paid', dueDate: '2026-08-15', createdAt: '2026-08-01', items: [{ description: 'Scale Subscription (Aug 2026)', amount: 799 }] },
  { id: 'inv-2026-002', invoiceNumber: 'INV-2026-0882', customerName: 'Apex Outbound Growth', customerEmail: 'alex.r@apexventures.io', amount: 299, status: 'paid', dueDate: '2026-08-10', createdAt: '2026-08-01', items: [{ description: 'Growth Subscription (Aug 2026)', amount: 299 }] },
  { id: 'inv-2026-003', invoiceNumber: 'INV-2026-0883', customerName: 'Solaris Sales', customerEmail: 'm.vance@solarisdynamics.com', amount: 99, status: 'paid', dueDate: '2026-08-04', createdAt: '2026-08-01', items: [{ description: 'Starter Plan Trial', amount: 99 }] },
];

const INITIAL_COUPONS: AdminCoupon[] = [
  { id: 'cpn-1', code: 'GROWTH50', discountType: 'percentage', discountValue: 50, durationMonths: 3, maxRedemptions: 100, redemptionCount: 42, status: 'active', expiryDate: '2026-12-31' },
  { id: 'cpn-2', code: 'OUTTRICKS100', discountType: 'fixed_amount', discountValue: 100, durationMonths: 1, maxRedemptions: 50, redemptionCount: 18, status: 'active', expiryDate: '2026-11-30' },
];

const INITIAL_INTEGRATIONS: AdminIntegration[] = [
  { id: 'int-1', name: 'Google Workspace SMTP/OAuth', category: 'email', provider: 'Google', status: 'connected', healthScore: 99.4, lastChecked: 'Just now', config: { clientId: '48929-***.apps.google.com', activeInboxes: 42 } },
  { id: 'int-2', name: 'Microsoft 365 Exchange Cloud', category: 'email', provider: 'Microsoft', status: 'connected', healthScore: 98.8, lastChecked: '5m ago', config: { tenantId: '7829-***-ms', activeInboxes: 28 } },
  { id: 'int-3', name: 'Twilio Voice Telecom Trunk', category: 'voice', provider: 'Twilio', status: 'connected', healthScore: 99.9, lastChecked: '1m ago', config: { accountSid: 'AC982***', phoneNumbers: 12 } },
  { id: 'int-4', name: 'OpenAI Enterprise Gateway', category: 'ai', provider: 'OpenAI', status: 'connected', healthScore: 99.6, lastChecked: 'Just now', config: { models: ['gpt-4o', 'gpt-4o-mini', 'o1-mini'] } },
  { id: 'int-5', name: 'Anthropic Claude Engine', category: 'ai', provider: 'Anthropic', status: 'connected', healthScore: 99.2, lastChecked: 'Just now', config: { models: ['claude-3-5-sonnet-20241022'] } },
  { id: 'int-6', name: 'Stripe Billing & Subscriptions', category: 'payment', provider: 'Stripe', status: 'connected', healthScore: 100, lastChecked: 'Just now', config: { livemode: true, webhookStatus: 'Healthy' } },
];

const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  { id: 'aud-1', adminName: 'Sarah Jenkins', adminEmail: 'sarah.j@cloudscale.ai', action: 'ASSIGN_BUNDLE', target: 'Apex Outbound Growth (team-2)', oldValue: 'None', newValue: 'Email Marketing + Lead Generation', timestamp: '2026-08-30 04:12:00', ipAddress: '192.168.0.114', device: 'Chrome on Windows 11', reason: 'Upgraded team subscription package.' },
  { id: 'aud-2', adminName: 'Sarah Jenkins', adminEmail: 'sarah.j@cloudscale.ai', action: 'UPDATE_LIMIT', target: 'CloudScale Revenue Ops (team-1)', oldValue: 'Emails: 100,000/mo', newValue: 'Emails: 250,000/mo', timestamp: '2026-08-30 03:45:12', ipAddress: '192.168.0.114', device: 'Chrome on Windows 11', reason: 'High-volume quarterly outreach burst.' },
  { id: 'aud-3', adminName: 'David Zhao', adminEmail: 'david.z@cloudscale.ai', action: 'SUSPEND_USER', target: 'Elena Rostova (usr-5)', oldValue: 'Active', newValue: 'Suspended', timestamp: '2026-08-29 18:20:00', ipAddress: '10.0.4.12', device: 'Safari on macOS', reason: 'Seat re-assignment pending HR review.' },
  { id: 'aud-4', adminName: 'Sarah Jenkins', adminEmail: 'sarah.j@cloudscale.ai', action: 'UPDATE_PLAN_PRICING', target: 'Growth Plan', oldValue: '$249/mo', newValue: '$299/mo', timestamp: '2026-08-28 11:30:00', ipAddress: '192.168.0.114', device: 'Chrome on Windows 11', reason: 'Added Voice AI and warmup engine to tier.' },
];

const INITIAL_SYSTEM_HEALTH: AdminSystemHealthService[] = [
  { id: 'srv-api', name: 'Edge API Gateway', category: 'core', status: 'healthy', latencyMs: 24, uptimePercentage: 99.98, errorRatePercentage: 0.01, lastCheckTime: 'Just now' },
  { id: 'srv-db', name: 'Distributed PostgreSQL & Redis', category: 'database', status: 'healthy', latencyMs: 12, uptimePercentage: 99.99, errorRatePercentage: 0.00, lastCheckTime: 'Just now' },
  { id: 'srv-email', name: 'Cold Email SMTP Delivery Queue', category: 'telecom', status: 'healthy', latencyMs: 65, uptimePercentage: 99.94, errorRatePercentage: 0.05, lastCheckTime: 'Just now' },
  { id: 'srv-voice', name: 'Sub-400ms Voice SDR Media Engine', category: 'telecom', status: 'healthy', latencyMs: 180, uptimePercentage: 99.91, errorRatePercentage: 0.08, lastCheckTime: 'Just now' },
  { id: 'srv-linkedin', name: 'LinkedIn Safe Cloud Proxies', category: 'automation', status: 'healthy', latencyMs: 110, uptimePercentage: 99.85, errorRatePercentage: 0.12, lastCheckTime: 'Just now' },
  { id: 'srv-ai', name: 'TRIXIE AI Inference Workers', category: 'ai', status: 'healthy', latencyMs: 340, uptimePercentage: 99.95, errorRatePercentage: 0.02, lastCheckTime: 'Just now' },
  { id: 'srv-workflows', name: 'DAG Workflow Execution Engine', category: 'automation', status: 'healthy', latencyMs: 45, uptimePercentage: 99.99, errorRatePercentage: 0.00, lastCheckTime: 'Just now' },
];

const STORAGE_KEY = 'outtricks_admin_state_v2';

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, error: toastError, info } = useToast();
  const { user: authUser, currentWorkspace } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [teams, setTeams] = useState<AdminTeam[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_teams`);
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch {
      return INITIAL_TEAMS;
    }
  });

  const [roles, setRoles] = useState<AdminRoleDefinition[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_roles`);
      return saved ? JSON.parse(saved) : INITIAL_ROLES;
    } catch {
      return INITIAL_ROLES;
    }
  });

  const [plans, setPlans] = useState<AdminPlan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_plans`);
      return saved ? JSON.parse(saved) : INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  });

  const [bundles, setBundles] = useState<AdminBundle[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bundles`);
      return saved ? JSON.parse(saved) : INITIAL_BUNDLES;
    } catch {
      return INITIAL_BUNDLES;
    }
  });

  const [modules, setModules] = useState<AdminModuleConfig[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_modules`);
      return saved ? JSON.parse(saved) : INITIAL_MODULES;
    } catch {
      return INITIAL_MODULES;
    }
  });

  const [assignments, setAssignments] = useState<AdminAssignment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_assignments`);
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_subscriptions`);
      return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
    } catch {
      return INITIAL_SUBSCRIPTIONS;
    }
  });

  const [payments, setPayments] = useState<AdminPayment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_payments`);
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  const [invoices, setInvoices] = useState<AdminInvoice[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [coupons, setCoupons] = useState<AdminCoupon[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_coupons`);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [integrations, setIntegrations] = useState<AdminIntegration[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_integrations`);
      return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
    } catch {
      return INITIAL_INTEGRATIONS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [systemHealth, setSystemHealth] = useState<AdminSystemHealthService[]>(INITIAL_SYSTEM_HEALTH);

  const [creditCosts, setCreditCostsState] = useState({
    leadSearch: 1,
    emailSend: 1,
    voiceMinute: 5,
    aiRequest: 2,
    enrichment: 3,
  });

  const [tricksyAi, setTricksyAi] = useState<TricksyAiConfig>({
    defaultModel: 'gpt-4o',
    availableModels: [
      { id: 'gpt-4o', name: 'GPT-4o Omnichannel', provider: 'OpenAI', costPer1k: 0.005, enabled: true },
      { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', costPer1k: 0.003, enabled: true },
      { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', costPer1k: 0.002, enabled: true },
      { id: 'llama-3-3-70b', name: 'Llama 3.3 70B Fast', provider: 'Groq', costPer1k: 0.0008, enabled: true },
    ],
    creditMultiplier: 1.0,
    systemPromptPreset: 'You are TRIXIE AI, the autonomous AI revenue operating engine for Outtricks.',
    maxTokensPerRequest: 4096,
    enableAutonomousExecution: true,
    rateLimitPerMinute: 120,
    monthlySpendCapUsd: 5000,
    currentSpendUsd: 1842.50,
  });

  const [branding, setBranding] = useState<GlobalBrandingSettings>({
    platformName: 'Outtricks',
    tagline: 'Autonomous AI Revenue Operating System',
    logoUrl: '/favicon.ico',
    faviconUrl: '/favicon.ico',
    primaryColor: '#2563EB',
    supportEmail: 'support@outtricks.ai',
    companyLegalName: 'Outtricks Technologies Inc.',
    privacyPolicyUrl: 'https://outtricks.ai/privacy',
    termsOfServiceUrl: 'https://outtricks.ai/terms',
  });

  const [globalSettings, setGlobalSettings] = useState<GlobalPlatformSettings>({
    defaultCurrency: 'USD ($)',
    defaultTimezone: 'America/Los_Angeles (PST)',
    defaultLanguage: 'English (US)',
    maintenanceMode: false,
    maintenanceNotice: 'Scheduled platform maintenance in progress. System will resume shortly.',
    allowPublicSignups: true,
    enforce2FA: false,
    sessionTimeoutHours: 24,
    maxLoginAttempts: 5,
  });

  const [impersonatedUser, setImpersonatedUser] = useState<AdminUser | null>(null);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_teams`, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_roles`, JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_plans`, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bundles`, JSON.stringify(bundles));
  }, [bundles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_assignments`, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_subscriptions`, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_payments`, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_coupons`, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_integrations`, JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Current active admin role & workspace governance
  const isWorkspaceOwner = currentWorkspace?.role === 'owner';
  const isWorkspaceAdmin = currentWorkspace?.role === 'admin' || isWorkspaceOwner;

  const activeUser = 
    impersonatedUser || 
    users.find(u => u.email === authUser?.email) || 
    (authUser?.email === 'sarah@cloudscale.ai' ? users.find(u => u.email === 'sarah.j@cloudscale.ai') : undefined) ||
    users[0];

  const currentAdminRole: AdminRole = 
    isWorkspaceOwner ? 'super-admin' : 
    (isWorkspaceAdmin && activeUser?.role !== 'super-admin' ? 'admin' : (activeUser?.role || 'super-admin'));

  const isAdmin = 
    isWorkspaceAdmin || 
    currentAdminRole === 'super-admin' || 
    currentAdminRole === 'admin' || 
    currentAdminRole === 'billing-admin';

  // Audit Logger Helper
  const logAdminAction = useCallback((action: string, target: string, oldValue?: string, newValue?: string, reason?: string) => {
    const newLog: AdminAuditLog = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      adminName: activeUser?.name || 'Sarah Jenkins',
      adminEmail: activeUser?.email || 'sarah.j@cloudscale.ai',
      action,
      target,
      oldValue,
      newValue,
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
      ipAddress: '192.168.0.114',
      device: navigator.userAgent.includes('Windows') ? 'Windows 11 PC' : 'MacOS Workstation',
      reason,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [activeUser]);

  // Check Role Permission
  const hasPermission = useCallback((permissionKey: keyof AdminRoleDefinition['permissions']): boolean => {
    if (isWorkspaceOwner || currentAdminRole === 'super-admin') return true;
    if (isWorkspaceAdmin && (
      permissionKey === 'adminPanel' || 
      permissionKey === 'manageUsers' || 
      permissionKey === 'manageTeams' || 
      permissionKey === 'managePlans' || 
      permissionKey === 'manageBilling' || 
      permissionKey === 'manageCredits' || 
      permissionKey === 'manageIntegrations' ||
      permissionKey === 'analytics' ||
      permissionKey === 'workflows'
    )) return true;
    const roleDef = roles.find(r => r.id === currentAdminRole);
    return roleDef ? Boolean(roleDef.permissions[permissionKey]) : false;
  }, [currentAdminRole, roles, isWorkspaceOwner, isWorkspaceAdmin]);

  // Impersonate
  const impersonateUser = useCallback((userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setImpersonatedUser(found);
      logAdminAction('IMPERSONATE_USER', `${found.name} (${found.email})`, undefined, undefined, 'Admin testing user permission profile');
      info(`Now impersonating ${found.name}. Viewing platform through their permissions.`, 'User Impersonation Active');
    }
  }, [users, logAdminAction, info]);

  const stopImpersonation = useCallback(() => {
    setImpersonatedUser(null);
    info('Exited user impersonation mode. Returned to Super Admin.', 'Impersonation Ended');
  }, [info]);

  // CRUD - Users
  const addUser = useCallback((data: Omit<AdminUser, 'id' | 'createdAt' | 'lastActive'>): AdminUser => {
    const newUser: AdminUser = {
      ...data,
      id: `usr-${Date.now()}`,
      lastActive: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [newUser, ...prev]);
    logAdminAction('CREATE_USER', `${newUser.name} (${newUser.email})`, undefined, `Role: ${newUser.role}, Plan: ${newUser.planName}`);
    success(`User ${newUser.name} created successfully.`, 'User Created');
    return newUser;
  }, [logAdminAction, success]);

  const updateUser = useCallback((id: string, data: Partial<AdminUser>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const updated = { ...u, ...data };
        logAdminAction('UPDATE_USER', `${updated.name} (${updated.email})`, JSON.stringify(u), JSON.stringify(updated));
        return updated;
      }
      return u;
    }));
    success('User details updated successfully.', 'User Updated');
  }, [logAdminAction, success]);

  const deleteUser = useCallback((id: string) => {
    const target = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    if (target) {
      logAdminAction('DELETE_USER', `${target.name} (${target.email})`, JSON.stringify(target), 'DELETED');
    }
    success('User deleted from platform.', 'User Deleted');
  }, [users, logAdminAction, success]);

  const toggleUserStatus = useCallback((id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'suspended' : 'active';
        logAdminAction('TOGGLE_USER_STATUS', `${u.name} (${u.email})`, u.status, newStatus);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  }, [logAdminAction]);

  const setUserPlanAndBundles = useCallback((id: string, planId: string, bundleIds: string[]) => {
    const planObj = plans.find(p => p.id === planId);
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        logAdminAction('CHANGE_USER_PLAN_BUNDLES', `${u.name}`, `Plan: ${u.planId}`, `Plan: ${planId}, Bundles: ${bundleIds.join(', ')}`);
        return {
          ...u,
          planId,
          planName: planObj?.name || 'Custom Plan',
          bundleIds,
        };
      }
      return u;
    }));
    success('Assigned plan and bundles updated.', 'Assignments Saved');
  }, [plans, logAdminAction, success]);

  const addCreditsToUser = useCallback((id: string, amount: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newTotal = Math.max(0, u.credits + amount);
        logAdminAction('ADJUST_USER_CREDITS', `${u.name}`, `${u.credits}`, `${newTotal}`, `Adjusted by ${amount > 0 ? '+' : ''}${amount}`);
        return { ...u, credits: newTotal };
      }
      return u;
    }));
    success(`Updated credits balance by ${amount > 0 ? '+' : ''}${amount.toLocaleString()}.`, 'Credits Updated');
  }, [logAdminAction, success]);

  // CRUD - Teams
  const addTeam = useCallback((data: Omit<AdminTeam, 'id' | 'createdAt' | 'usage'>): AdminTeam => {
    const newTeam: AdminTeam = {
      ...data,
      id: `team-${Date.now()}`,
      usage: { emailsSent: 0, voiceMinutes: 0, leadsSearched: 0, linkedInActions: 0, aiRequests: 0 },
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTeams(prev => [newTeam, ...prev]);
    logAdminAction('CREATE_TEAM', newTeam.name, undefined, `Owner: ${newTeam.ownerName}`);
    success(`Team workspace ${newTeam.name} created.`, 'Team Created');
    return newTeam;
  }, [logAdminAction, success]);

  const updateTeam = useCallback((id: string, data: Partial<AdminTeam>) => {
    setTeams(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, ...data };
        logAdminAction('UPDATE_TEAM', updated.name, JSON.stringify(t), JSON.stringify(updated));
        return updated;
      }
      return t;
    }));
    success('Team settings updated.', 'Team Saved');
  }, [logAdminAction, success]);

  const deleteTeam = useCallback((id: string) => {
    const target = teams.find(t => t.id === id);
    setTeams(prev => prev.filter(t => t.id !== id));
    if (target) {
      logAdminAction('DELETE_TEAM', target.name, JSON.stringify(target), 'DELETED');
    }
    success('Team workspace removed.', 'Team Deleted');
  }, [teams, logAdminAction, success]);

  const addCreditsToTeam = useCallback((id: string, amount: number) => {
    setTeams(prev => prev.map(t => {
      if (t.id === id) {
        const newTotal = Math.max(0, t.credits + amount);
        logAdminAction('ADJUST_TEAM_CREDITS', t.name, `${t.credits}`, `${newTotal}`, `Adjusted by ${amount > 0 ? '+' : ''}${amount}`);
        return { ...t, credits: newTotal };
      }
      return t;
    }));
    success(`Allocated ${amount > 0 ? '+' : ''}${amount.toLocaleString()} credits to workspace.`, 'Team Credits Updated');
  }, [logAdminAction, success]);

  // CRUD - Plans
  const addPlan = useCallback((planData: Omit<AdminPlan, 'id'>): AdminPlan => {
    const newPlan: AdminPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
    };
    setPlans(prev => [...prev, newPlan]);
    logAdminAction('CREATE_PLAN', newPlan.name, undefined, `$${newPlan.monthlyPrice}/mo`);
    success(`Subscription plan ${newPlan.name} created.`, 'Plan Created');
    return newPlan;
  }, [logAdminAction, success]);

  const updatePlan = useCallback((id: string, data: Partial<AdminPlan>) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...data };
        logAdminAction('UPDATE_PLAN', updated.name, JSON.stringify(p), JSON.stringify(updated));
        return updated;
      }
      return p;
    }));
    success('Plan configuration updated.', 'Plan Saved');
  }, [logAdminAction, success]);

  const deletePlan = useCallback((id: string) => {
    const target = plans.find(p => p.id === id);
    setPlans(prev => prev.filter(p => p.id !== id));
    if (target) {
      logAdminAction('DELETE_PLAN', target.name, JSON.stringify(target), 'DELETED');
    }
    success('Plan archived.', 'Plan Deleted');
  }, [plans, logAdminAction, success]);

  // CRUD - Bundles
  const addBundle = useCallback((bundleData: Omit<AdminBundle, 'id'>): AdminBundle => {
    const newBundle: AdminBundle = {
      ...bundleData,
      id: `bnd-${Date.now()}`,
    };
    setBundles(prev => [...prev, newBundle]);
    logAdminAction('CREATE_BUNDLE', newBundle.name, undefined, `$${newBundle.monthlyAddonPrice}/mo`);
    success(`Product bundle ${newBundle.name} created.`, 'Bundle Created');
    return newBundle;
  }, [logAdminAction, success]);

  const updateBundle = useCallback((id: string, data: Partial<AdminBundle>) => {
    setBundles(prev => prev.map(b => {
      if (b.id === id) {
        const updated = { ...b, ...data };
        logAdminAction('UPDATE_BUNDLE', updated.name, JSON.stringify(b), JSON.stringify(updated));
        return updated;
      }
      return b;
    }));
    success('Product bundle updated.', 'Bundle Saved');
  }, [logAdminAction, success]);

  const deleteBundle = useCallback((id: string) => {
    const target = bundles.find(b => b.id === id);
    setBundles(prev => prev.filter(b => b.id !== id));
    if (target) {
      logAdminAction('DELETE_BUNDLE', target.name, JSON.stringify(target), 'DELETED');
    }
    success('Product bundle deleted.', 'Bundle Deleted');
  }, [bundles, logAdminAction, success]);

  // CRUD - Roles
  const addRole = useCallback((roleData: Omit<AdminRoleDefinition, 'id' | 'userCount'>): AdminRoleDefinition => {
    const newRole: AdminRoleDefinition = {
      ...roleData,
      id: `role-${Date.now()}`,
      userCount: 0,
    };
    setRoles(prev => [...prev, newRole]);
    logAdminAction('CREATE_ROLE', newRole.name, undefined, newRole.description);
    success(`Role ${newRole.name} created.`, 'Role Created');
    return newRole;
  }, [logAdminAction, success]);

  const updateRole = useCallback((id: string, data: Partial<AdminRoleDefinition>) => {
    setRoles(prev => prev.map(r => {
      if (r.id === id) {
        const updated = { ...r, ...data };
        logAdminAction('UPDATE_ROLE', updated.name, JSON.stringify(r), JSON.stringify(updated));
        return updated;
      }
      return r;
    }));
    success('Role permissions updated.', 'Role Saved');
  }, [logAdminAction, success]);

  const deleteRole = useCallback((id: string) => {
    const target = roles.find(r => r.id === id);
    if (target?.isSystem) {
      toastError('System default roles cannot be deleted.', 'Action Blocked');
      return;
    }
    setRoles(prev => prev.filter(r => r.id !== id));
    if (target) {
      logAdminAction('DELETE_ROLE', target.name, JSON.stringify(target), 'DELETED');
    }
    success('Role removed.', 'Role Deleted');
  }, [roles, logAdminAction, toastError, success]);

  // Modules & Navigation Controls
  const toggleModuleEnabled = useCallback((moduleId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        const nextState = !m.enabled;
        logAdminAction('TOGGLE_MODULE', m.name, `${m.enabled}`, `${nextState}`);
        return { ...m, enabled: nextState };
      }
      return m;
    }));
  }, [logAdminAction]);

  const toggleModuleMaintenance = useCallback((moduleId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        const nextState = !m.maintenanceMode;
        logAdminAction('TOGGLE_MODULE_MAINTENANCE', m.name, `${m.maintenanceMode}`, `${nextState}`);
        return { ...m, maintenanceMode: nextState };
      }
      return m;
    }));
  }, [logAdminAction]);

  const updateModuleConfig = useCallback((moduleId: string, data: Partial<AdminModuleConfig>) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return { ...m, ...data };
      }
      return m;
    }));
    success('Module settings updated.', 'Module Saved');
  }, [success]);

  const reorderModules = useCallback((newOrder: AdminModuleConfig[]) => {
    setModules(newOrder.map((item, idx) => ({ ...item, order: idx + 1 })));
    logAdminAction('REORDER_NAVIGATION', 'Main Sidebar', undefined, 'Custom navigation ordering applied');
    success('Navigation order updated.', 'Navigation Saved');
  }, [logAdminAction, success]);

  // Assignments
  const addAssignment = useCallback((assignmentData: Omit<AdminAssignment, 'id'>): AdminAssignment => {
    const newAsg: AdminAssignment = {
      ...assignmentData,
      id: `asg-${Date.now()}`,
    };
    setAssignments(prev => [newAsg, ...prev]);
    logAdminAction('CREATE_ASSIGNMENT', newAsg.targetName, undefined, `Plan: ${newAsg.planName}, Bundles: ${newAsg.bundleIds.join(', ')}`);
    success(`Assignment granted to ${newAsg.targetName}.`, 'Assignment Created');
    return newAsg;
  }, [logAdminAction, success]);

  const deleteAssignment = useCallback((id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    logAdminAction('DELETE_ASSIGNMENT', id, undefined, 'Revoked');
    success('Assignment revoked.', 'Assignment Removed');
  }, [logAdminAction, success]);

  const setUserFeatureOverride = useCallback((userId: string, featureKey: string, enabled: boolean) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const currentOverrides = u.featureOverrides || {};
        return {
          ...u,
          featureOverrides: {
            ...currentOverrides,
            [featureKey]: enabled,
          }
        };
      }
      return u;
    }));
    logAdminAction('FEATURE_OVERRIDE_USER', userId, undefined, `${featureKey} = ${enabled}`);
    success(`Feature override updated for user.`, 'Override Saved');
  }, [logAdminAction, success]);

  const setTeamLimitOverride = useCallback((teamId: string, limitKey: string, value: number) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          resourceLimits: {
            ...t.resourceLimits,
            [limitKey]: value,
          }
        };
      }
      return t;
    }));
    logAdminAction('LIMIT_OVERRIDE_TEAM', teamId, undefined, `${limitKey} = ${value}`);
    success(`Resource limit override saved.`, 'Limits Saved');
  }, [logAdminAction, success]);

  // Billing Actions
  const createSubscriptionManually = useCallback((data: { 
    customerId: string; 
    customerName: string; 
    customerEmail: string; 
    planId: string; 
    bundleIds: string[]; 
    credits: number;
    billingInterval?: 'monthly' | 'annual' | 'custom';
    autoRenew?: boolean;
    startDate?: string;
    nextBillingDate?: string;
  }) => {
    const planObj = plans.find(p => p.id === data.planId);
    const bundleObjs = bundles.filter(b => data.bundleIds.includes(b.id));
    const isAnnual = data.billingInterval === 'annual';
    const basePrice = isAnnual ? (planObj?.annualPrice || (planObj?.monthlyPrice || 0) * 10) : (planObj?.monthlyPrice || 0);
    const bundlePrice = bundleObjs.reduce((acc, b) => acc + b.monthlyAddonPrice * (isAnnual ? 10 : 1), 0);
    const totalAmount = basePrice + bundlePrice;

    const startDateStr = data.startDate || new Date().toISOString().split('T')[0];
    let nextRenewalStr = data.nextBillingDate;
    if (!nextRenewalStr) {
      const d = new Date(startDateStr);
      if (isAnnual) {
        d.setFullYear(d.getFullYear() + 1);
      } else {
        d.setMonth(d.getMonth() + 1);
      }
      nextRenewalStr = d.toISOString().split('T')[0];
    }

    const newSub: AdminSubscription = {
      id: `sub-${Date.now()}`,
      customerId: data.customerId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      teamName: `${data.customerName}'s Team`,
      planId: data.planId,
      planName: `${planObj?.name || 'Custom'} (${isAnnual ? `$${totalAmount}/yr` : `$${totalAmount}/mo`})`,
      bundleIds: data.bundleIds,
      bundleNames: bundleObjs.map(b => b.name),
      amount: totalAmount,
      billingInterval: data.billingInterval || 'monthly',
      status: 'active',
      autoRenew: data.autoRenew !== undefined ? data.autoRenew : true,
      startDate: startDateStr,
      nextBillingDate: nextRenewalStr,
      lastPaymentDate: startDateStr,
      paymentMethod: 'Corporate Credit Card',
      creditsAllocated: data.credits || 50000,
      createdAt: startDateStr,
    };
    setSubscriptions(prev => [newSub, ...prev]);

    // Also update target user/team
    setUserPlanAndBundles(data.customerId, data.planId, data.bundleIds);
    if (data.credits > 0) {
      addCreditsToUser(data.customerId, data.credits);
    }
    logAdminAction('MANUAL_SUBSCRIPTION_ASSIGN', data.customerName, undefined, `Plan: ${newSub.planName}, Amount: $${newSub.amount}, AutoRenew: ${newSub.autoRenew ? 'ON' : 'OFF'}`);
    success(`Assigned subscription and ${data.credits.toLocaleString()} credits to ${data.customerName}.`, 'Subscription Assigned');
  }, [plans, bundles, setUserPlanAndBundles, addCreditsToUser, logAdminAction, success]);

  const setAutoRenew = useCallback((id: string, autoRenew: boolean, reason?: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = autoRenew 
          ? (s.status === 'auto_renew_off' || s.status === 'scheduled_to_expire' ? 'active' : s.status)
          : (s.status === 'active' ? 'auto_renew_off' : s.status);

        logAdminAction(
          autoRenew ? 'ENABLE_AUTO_RENEW' : 'DISABLE_AUTO_RENEW',
          s.customerName,
          s.autoRenew ? 'Auto-Renew ON' : 'Auto-Renew OFF',
          autoRenew ? 'Auto-Renew ON' : 'Auto-Renew OFF',
          reason || (autoRenew ? 'Admin re-enabled auto-renewal' : 'Admin turned off automatic renewal')
        );
        return {
          ...s,
          autoRenew,
          status: newStatus as any
        };
      }
      return s;
    }));
    success(
      autoRenew ? 'Automatic renewal has been enabled.' : 'Auto-renew turned off. Subscription will expire at period end.',
      'Auto-Renew Updated'
    );
  }, [logAdminAction, success]);

  const renewSubscriptionNow = useCallback((id: string) => {
    const sub = subscriptions.find(s => s.id === id);
    if (!sub) return;

    const currentRenewal = new Date(sub.nextBillingDate || new Date());
    const isAnnual = sub.billingInterval === 'annual';
    if (isAnnual) {
      currentRenewal.setFullYear(currentRenewal.getFullYear() + 1);
    } else {
      currentRenewal.setMonth(currentRenewal.getMonth() + 1);
    }
    const nextRenewalStr = currentRenewal.toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    // Create payment & invoice
    const newPayment: AdminPayment = {
      id: `pay-${Date.now()}`,
      transactionId: `ch_${Math.random().toString(36).substring(2, 11)}`,
      customerName: sub.customerName,
      amount: sub.amount,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod: sub.paymentMethod || 'Visa •••• 4242',
      date: todayStr
    };
    setPayments(prev => [newPayment, ...prev]);

    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          nextBillingDate: nextRenewalStr,
          lastPaymentDate: todayStr,
          status: 'active'
        };
      }
      return s;
    }));

    logAdminAction('RENEW_SUBSCRIPTION_NOW', sub.customerName, sub.nextBillingDate, nextRenewalStr, 'Manual Admin Renewal');
    success(`Subscription for ${sub.customerName} renewed successfully. Next billing: ${nextRenewalStr}.`, 'Subscription Renewed');
  }, [subscriptions, logAdminAction, success]);

  const changeSubscriptionPlan = useCallback((id: string, planId: string, timing: 'immediate' | 'next_renewal' = 'immediate') => {
    const planObj = plans.find(p => p.id === planId);
    if (!planObj) return;

    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        const isAnnual = s.billingInterval === 'annual';
        const bundleObjs = bundles.filter(b => (s.bundleIds || []).includes(b.id));
        const basePrice = isAnnual ? planObj.annualPrice : planObj.monthlyPrice;
        const bundlePrice = bundleObjs.reduce((acc, b) => acc + b.monthlyAddonPrice * (isAnnual ? 10 : 1), 0);
        const newAmount = basePrice + bundlePrice;

        logAdminAction('CHANGE_SUBSCRIPTION_PLAN', s.customerName, s.planName, `${planObj.name} (${timing})`, `Timing: ${timing}`);
        
        if (timing === 'immediate') {
          setUserPlanAndBundles(s.customerId, planId, s.bundleIds || []);
        }

        return {
          ...s,
          planId,
          planName: `${planObj.name} ($${newAmount}/${isAnnual ? 'yr' : 'mo'})`,
          amount: newAmount
        };
      }
      return s;
    }));
    success(`Plan updated to ${planObj.name} (${timing === 'immediate' ? 'effective immediately' : 'effective at next renewal'}).`, 'Plan Changed');
  }, [plans, bundles, setUserPlanAndBundles, logAdminAction, success]);

  const updateSubscriptionBundles = useCallback((id: string, bundleIds: string[]) => {
    const bundleObjs = bundles.filter(b => bundleIds.includes(b.id));
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        const planObj = plans.find(p => p.id === s.planId);
        const isAnnual = s.billingInterval === 'annual';
        const basePrice = isAnnual ? (planObj?.annualPrice || (planObj?.monthlyPrice || 0) * 10) : (planObj?.monthlyPrice || 0);
        const bundlePrice = bundleObjs.reduce((acc, b) => acc + b.monthlyAddonPrice * (isAnnual ? 10 : 1), 0);
        const newAmount = basePrice + bundlePrice;

        setUserPlanAndBundles(s.customerId, s.planId, bundleIds);
        logAdminAction('UPDATE_SUBSCRIPTION_BUNDLES', s.customerName, s.bundleNames.join(', '), bundleObjs.map(b => b.name).join(', '));

        return {
          ...s,
          bundleIds,
          bundleNames: bundleObjs.map(b => b.name),
          amount: newAmount
        };
      }
      return s;
    }));
    success('Attached subscription bundles updated.', 'Bundles Updated');
  }, [bundles, plans, setUserPlanAndBundles, logAdminAction, success]);

  const suspendSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        logAdminAction('SUSPEND_SUBSCRIPTION', s.customerName, s.status, 'suspended', 'Admin suspended account');
        return { ...s, status: 'suspended' };
      }
      return s;
    }));
    success('Subscription suspended.', 'Subscription Suspended');
  }, [logAdminAction, success]);

  const resumeSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        logAdminAction('RESUME_SUBSCRIPTION', s.customerName, 'suspended', 'active', 'Admin resumed account');
        return { ...s, status: 'active' };
      }
      return s;
    }));
    success('Subscription resumed and active.', 'Subscription Resumed');
  }, [logAdminAction, success]);

  const terminateSubscription = useCallback((id: string, reason?: string) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        logAdminAction('TERMINATE_SUBSCRIPTION', s.customerName, s.status, 'cancelled', reason || 'Admin terminated subscription');
        return { ...s, status: 'cancelled', autoRenew: false };
      }
      return s;
    }));
    success('Subscription has been permanently terminated.', 'Subscription Terminated');
  }, [logAdminAction, success]);

  const cancelSubscription = useCallback((id: string) => {
    terminateSubscription(id, 'Standard admin cancellation');
  }, [terminateSubscription]);

  const refundPayment = useCallback((paymentId: string) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: 'refunded' } : p));
    logAdminAction('REFUND_PAYMENT', paymentId, 'Succeeded', 'Refunded');
    success('Payment refund issued.', 'Refund Complete');
  }, [logAdminAction, success]);

  const addCoupon = useCallback((couponData: Omit<AdminCoupon, 'id' | 'redemptionCount'>): AdminCoupon => {
    const newCoupon: AdminCoupon = {
      ...couponData,
      id: `cpn-${Date.now()}`,
      redemptionCount: 0,
    };
    setCoupons(prev => [newCoupon, ...prev]);
    logAdminAction('CREATE_COUPON', newCoupon.code, undefined, `${newCoupon.discountValue}${newCoupon.discountType === 'percentage' ? '%' : '$'} off`);
    success(`Coupon code ${newCoupon.code} generated.`, 'Coupon Created');
    return newCoupon;
  }, [logAdminAction, success]);

  const deleteCoupon = useCallback((id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    logAdminAction('DELETE_COUPON', id, undefined, 'Deleted');
    success('Coupon removed.', 'Coupon Deleted');
  }, [logAdminAction, success]);

  // Integrations & AI
  const updateIntegration = useCallback((id: string, data: Partial<AdminIntegration>) => {
    setIntegrations(prev => prev.map(int => int.id === id ? { ...int, ...data } : int));
    success('Integration configuration updated.', 'Integration Saved');
  }, [success]);

  const testIntegration = useCallback(async (id: string): Promise<boolean> => {
    info('Testing service ping and credential handshake...', 'Testing Connection');
    await new Promise(r => setTimeout(r, 800));
    setIntegrations(prev => prev.map(int => int.id === id ? { ...int, lastChecked: 'Just now', healthScore: 99.8, status: 'connected' } : int));
    success('Connection verification succeeded! Service is healthy.', 'Ping 200 OK');
    return true;
  }, [info, success]);

  const updateTricksyAiConfig = useCallback((data: Partial<TricksyAiConfig>) => {
    setTricksyAi(prev => ({ ...prev, ...data }));
    logAdminAction('UPDATE_TRICKSY_AI_CONFIG', 'TRIXIE AI Governance', undefined, JSON.stringify(data));
    success('TRIXIE AI parameters updated.', 'AI Config Saved');
  }, [logAdminAction, success]);

  const setCreditCosts = useCallback((costs: Partial<AdminContextType['creditCosts']>) => {
    setCreditCostsState(prev => ({ ...prev, ...costs }));
    logAdminAction('UPDATE_CREDIT_COSTS', 'Consumption Rules', undefined, JSON.stringify(costs));
    success('Module credit consumption rules updated.', 'Rules Saved');
  }, [logAdminAction, success]);

  // Branding & Global
  const updateBranding = useCallback((data: Partial<GlobalBrandingSettings>) => {
    setBranding(prev => ({ ...prev, ...data }));
    logAdminAction('UPDATE_BRANDING', 'Platform Branding', undefined, JSON.stringify(data));
    success('Platform branding updated.', 'Branding Saved');
  }, [logAdminAction, success]);

  const updateGlobalSettings = useCallback((data: Partial<GlobalPlatformSettings>) => {
    setGlobalSettings(prev => ({ ...prev, ...data }));
    logAdminAction('UPDATE_GLOBAL_SETTINGS', 'Platform Settings', undefined, JSON.stringify(data));
    success('Global platform settings applied.', 'Settings Saved');
  }, [logAdminAction, success]);

  // Access Control Query Helpers
  const hasModuleAccess = useCallback((moduleId: string): boolean => {
    const canonicalId = 
      moduleId === 'mail' ? 'inbox' :
      moduleId === 'trixie' ? 'copilot' :
      moduleId === 'master-box' ? 'campaigns' :
      moduleId === 'work' ? 'upwork' :
      moduleId === 'people' ? 'crm' :
      moduleId === 'automation' ? 'workflows' :
      moduleId;
    // 1. Is module globally disabled?
    const modConfig = modules.find(m => m.id === canonicalId);
    if (modConfig && !modConfig.enabled) {
      return false;
    }

    // 2. Admin users always have access if enabled
    if (isAdmin) return true;

    // 3. Check active user bundle/plan access
    if (modConfig?.visibility === 'admin-only') return false;

    if (modConfig?.requiredBundleId) {
      return (activeUser?.bundleIds || []).includes(modConfig.requiredBundleId);
    }

    return true;
  }, [modules, isAdmin, activeUser]);

  const hasBundleAccess = useCallback((bundleId: string): boolean => {
    if (isAdmin) return true;
    return (activeUser?.bundleIds || []).includes(bundleId);
  }, [isAdmin, activeUser]);

  const hasFeatureAccess = useCallback((featureKey: string): boolean => {
    // Priority: User Override -> Team Override -> Bundle -> Plan
    if (activeUser?.featureOverrides && activeUser.featureOverrides[featureKey] !== undefined) {
      return activeUser.featureOverrides[featureKey];
    }
    if (isAdmin) return true;
    return true;
  }, [activeUser, isAdmin]);

  const getEffectiveLimits = useCallback((): Record<string, number> => {
    const userPlan = plans.find(p => p.id === activeUser?.planId) || plans[0] || {
      emailLimitMonthly: 100000,
      voiceAgentLimit: 5,
      leadFinderLimitMonthly: 5000,
      linkedInLimitMonthly: 3000,
      aiUsageLimitMonthly: 2000000,
      mailboxLimit: 25,
      workflowLimit: 50,
    };
    return {
      emailsMonthly: userPlan.emailLimitMonthly ?? 100000,
      voiceAgents: userPlan.voiceAgentLimit ?? 5,
      leadFinderSearches: userPlan.leadFinderLimitMonthly ?? 5000,
      linkedInActions: userPlan.linkedInLimitMonthly ?? 3000,
      aiTokens: userPlan.aiUsageLimitMonthly ?? 2000000,
      mailboxes: userPlan.mailboxLimit ?? 25,
      workflows: userPlan.workflowLimit ?? 50,
    };
  }, [activeUser, plans]);

  const resetAllAdminDemoData = useCallback(() => {
    setUsers(INITIAL_USERS);
    setTeams(INITIAL_TEAMS);
    setRoles(INITIAL_ROLES);
    setPlans(INITIAL_PLANS);
    setBundles(INITIAL_BUNDLES);
    setModules(INITIAL_MODULES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setPayments(INITIAL_PAYMENTS);
    setInvoices(INITIAL_INVOICES);
    setCoupons(INITIAL_COUPONS);
    setIntegrations(INITIAL_INTEGRATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSystemHealth(INITIAL_SYSTEM_HEALTH);
    info('All admin demo records reset to factory defaults.', 'Admin State Reset');
  }, [info]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        currentAdminRole,
        impersonatedUser,
        impersonateUser,
        stopImpersonation,
        hasPermission,

        users,
        teams,
        roles,
        plans,
        bundles,
        modules,
        assignments,
        subscriptions,
        payments,
        invoices,
        coupons,
        integrations,
        auditLogs,
        systemHealth,
        tricksyAi,
        branding,
        globalSettings,
        creditCosts,
        setCreditCosts,

        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        setUserPlanAndBundles,
        addCreditsToUser,

        addTeam,
        updateTeam,
        deleteTeam,
        addCreditsToTeam,

        addPlan,
        updatePlan,
        deletePlan,

        addBundle,
        updateBundle,
        deleteBundle,

        addRole,
        updateRole,
        deleteRole,

        toggleModuleEnabled,
        toggleModuleMaintenance,
        updateModuleConfig,
        reorderModules,

        addAssignment,
        deleteAssignment,
        setUserFeatureOverride,
        setTeamLimitOverride,

        createSubscriptionManually,
        cancelSubscription,
        setAutoRenew,
        renewSubscriptionNow,
        changeSubscriptionPlan,
        updateSubscriptionBundles,
        suspendSubscription,
        resumeSubscription,
        terminateSubscription,
        refundPayment,
        addCoupon,
        deleteCoupon,

        updateIntegration,
        testIntegration,
        updateTricksyAiConfig,

        updateBranding,
        updateGlobalSettings,

        hasModuleAccess,
        hasBundleAccess,
        hasFeatureAccess,
        getEffectiveLimits,
        logAdminAction,
        resetAllAdminDemoData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
