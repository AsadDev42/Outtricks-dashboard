import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { LeadOwnerType } from './LeadsManagementContext';

export type UpworkTabType = 
  | 'overview'
  // Prospecting
  | 'jobs' 
  | 'saved-jobs' 
  | 'job-alerts'
  // Applications
  | 'applications' 
  | 'interviews' 
  | 'proposals' 
  | 'proposal-drafts' 
  | 'submitted' 
  | 'follow-ups'
  // Work & Earnings
  | 'contracts' 
  | 'earnings' 
  | 'profile'
  // Messaging
  | 'messages' 
  | 'replies' 
  | 'conversations' 
  | 'labels'
  // Intelligence
  | 'job-intel' 
  | 'proposal-intel' 
  | 'client-intel' 
  | 'match-score'
  // Automation
  | 'sequences' 
  | 'automation-rules' 
  | 'templates' 
  | 'logs'
  // Analytics
  | 'analytics' 
  | 'performance' 
  | 'revenue'
  // Settings
  | 'accounts';

export type UpworkRssInterval = '1m' | '5m' | '15m' | '30m' | 'manual';

export type UpworkAutomationMode = 
  | 'assisted'       // Mode B (Assisted - Review Required, DEFAULT)
  | 'automated'      // Mode A (Automated - Auto-Dispatch with strict criteria)
  | 'monitor_only';  // Mode C (Monitor Only - Intelligence & alerts)

export type QualityTier = 'recommended' | 'review' | 'low_fit' | 'risky';

export interface MatchBreakdown {
  overallScore: number;
  skills: number;
  experience: number;
  budget: number;
  clientQuality: number;
  competition: number;
  profileRelevance: number;
  location: number;
}

export interface RiskSignals {
  isPaymentVerified: boolean;
  clientHireRate: number; // e.g. 75 (%)
  unrealisticBudgetWarning: boolean;
  vagueScopeWarning: boolean;
  highCompetitionWarning: boolean;
  suspiciousSignals: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface TrixieInsights {
  whyMatches: string[];
  yourAdvantage: string;
  potentialRisks: string[];
  recommendedAction: string;
  suggestedHourlyRate?: { min: number; max: number; recommended: number };
  suggestedFixedPrice?: { min: number; max: number; recommended: number };
}

export interface ScreeningQuestion {
  id: string;
  question: string;
  suggestedAnswer: string;
  groundedFrom: string;
  missingInfoWarning?: string;
}

export interface ClientStats {
  totalHires: number;
  activeHires: number;
  avgHourlyPaid: number;
  hireRate: number; // percentage (e.g. 78)
  memberSince: string;
  industry?: string;
}

export interface UpworkJob {
  id: string;
  title: string;
  clientCountry: string;
  clientSpent: string;
  clientRating: number;
  clientReviewsCount: number;
  paymentVerified: boolean;
  budgetType: 'Fixed Price' | 'Hourly';
  budgetAmount?: number;
  hourlyRateRange?: string;
  description: string;
  skills: string[];
  proposalsCount: string;
  matchScore: number;
  postedTime: string;
  isSaved: boolean;
  applicationStatus?: 'Draft' | 'Submitted' | 'Interview' | 'Hired' | 'None';
  
  // Advanced Opportunity Intelligence
  opportunityType?: 'marketplace' | 'invitation';
  qualityTier?: QualityTier;
  matchBreakdown?: MatchBreakdown;
  riskSignals?: RiskSignals;
  trixieInsights?: TrixieInsights;
  screeningQuestions?: ScreeningQuestion[];
  clientStats?: ClientStats;
  connectsCost?: number;
  isSkipped?: boolean;
  skipReason?: string;
  crmLeadId?: string;
  radarId?: string;
}

export interface UpworkRadar {
  id: string;
  name: string;
  description?: string;
  status: 'Active' | 'Paused';
  mode: UpworkAutomationMode;
  targetProfileId: string;
  searchQuery: string;
  negativeKeywords: string[];
  category: string;
  skillsRequired: string[];
  budgetType: 'all' | 'fixed' | 'hourly';
  minBudgetFixed?: number;
  minHourlyRate?: number;
  clientFilter: {
    minHireRate: number; // e.g. 50%
    minSpent: number;    // e.g. $1000
    paymentVerifiedOnly: boolean;
    minClientRating: number; // e.g. 4.5
    excludeCountries?: string[];
  };
  competitionFilter: {
    maxProposals: number; // e.g. 15
  };
  minMatchScore: number; // e.g. 80
  aiDraftTone: 'consultative' | 'direct' | 'technical' | 'concise';
  boostStrategy: {
    enabled: boolean;
    maxBoostConnects: number;
    targetPosition: 'top_3' | 'first' | 'none';
  };
  limits: {
    dailyProposalLimit: number;
    maxConnectsPerDay: number;
    stopOnLowResponseRate: boolean;
  };
  telemetry: {
    lastScanTime: string;
    nextScanTime: string;
    jobsDiscovered: number;
    qualifiedCount: number;
    skippedCount: number;
    appliedCount: number;
    errorCount: number;
  };
}

// Backward compatibility interface
export interface UpworkJobAlert {
  id: string;
  name: string;
  keywords: string;
  minBudget: number;
  maxProposals: number;
  notificationState: 'Instant Alert' | 'Daily Digest';
  status: 'Active' | 'Paused';
}

export interface UpworkApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  clientName: string;
  submittedDate: string;
  rateProposed: string;
  status: 'Draft' | 'Submitted' | 'Viewed' | 'Shortlisted' | 'Interview' | 'Hired' | 'Declined';
  proposalText: string;
  earnings?: number;
  radarSource?: string;
  boostedConnects?: number;
}

export interface UpworkInterview {
  id: string;
  jobTitle: string;
  clientName: string;
  clientAvatar: string;
  scheduledTime: string;
  status: 'Scheduled' | 'Completed' | 'Pending Response';
  nextAction: string;
}

export interface UpworkProposal {
  id: string;
  jobTitle: string;
  clientName: string;
  coverLetter: string;
  bidAmount: string;
  duration: string;
  status: 'Submitted' | 'Viewed' | 'Interview' | 'Declined';
  matchScore: number;
  submittedDate: string;
  screeningAnswers?: { question: string; answer: string }[];
  boostedConnects?: number;
}

export interface UpworkProposalDraft {
  id: string;
  jobId: string;
  jobTitle: string;
  clientName: string;
  draftText: string;
  lastUpdated: string;
  screeningAnswers?: { question: string; answer: string }[];
  profileId?: string;
  bidAmount?: string;
  duration?: string;
}

export interface UpworkFollowUp {
  id: string;
  applicationId: string;
  jobTitle: string;
  clientName: string;
  scheduledDate: string;
  message: string;
  status: 'Pending' | 'Sent';
}

export interface UpworkContract {
  id: string;
  title: string;
  clientName: string;
  contractType: 'Hourly ($125/hr)' | 'Fixed Milestone';
  totalEarned: number;
  weeklyHoursLimit?: number;
  startDate: string;
  status: 'Active' | 'Completed';
}

export interface UpworkTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  usageCount: number;
  successRate?: string;
}

export interface UpworkAutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  condition: string;
  status: 'Active' | 'Paused';
}

export interface UpworkExecutionLog {
  id: string;
  timestamp: string;
  jobTitle: string;
  clientName: string;
  action: string;
  status: 'Success' | 'Queued' | 'Failed' | 'Skipped';
  details: string;
  radarName?: string;
  skipReason?: string;
}

export interface UpworkAccount {
  id: string;
  name: string;
  title: string;
  avatar: string;
  status: 'Connected' | 'Token Expired';
  topRatedBadge: string;
  jss: number;
  totalEarnings: string;
  hourlyRate: string;
  specializedProfiles?: { id: string; name: string; hourlyRate: string }[];
}

interface UpworkContextType {
  activeTab: UpworkTabType;
  setActiveTab: (tab: UpworkTabType) => void;
  jobs: UpworkJob[];
  jobAlerts: UpworkJobAlert[];
  radars: UpworkRadar[];
  applications: UpworkApplication[];
  interviews: UpworkInterview[];
  proposals: UpworkProposal[];
  proposalDrafts: UpworkProposalDraft[];
  followUps: UpworkFollowUp[];
  contracts: UpworkContract[];
  templates: UpworkTemplate[];
  automationRules: UpworkAutomationRule[];
  executionLogs: UpworkExecutionLog[];
  accounts: UpworkAccount[];

  // Safety & Guardrails
  isEmergencyPaused: boolean;
  emergencyPauseReason?: string;
  todayConnectsUsed: number;
  todayConnectsBudget: number;
  toggleEmergencyPause: (reason?: string) => void;
  resetTodayConnects: () => void;

  // Actions
  toggleSaveJob: (id: string) => void;
  submitProposal: (
    jobId: string, 
    coverLetter: string, 
    bidAmount: string, 
    duration: string,
    screeningAnswers?: { question: string; answer: string }[],
    boostedConnects?: number
  ) => void;
  saveProposalDraft: (
    jobId: string, 
    draftText: string,
    screeningAnswers?: { question: string; answer: string }[],
    bidAmount?: string,
    duration?: string,
    profileId?: string
  ) => void;
  skipJob: (jobId: string, reason: string) => void;
  linkJobToCrm: (jobId: string) => void;

  // Radars (Smart Alerts)
  createRadar: (radar: Partial<UpworkRadar>) => void;
  updateRadar: (id: string, updates: Partial<UpworkRadar>) => void;
  deleteRadar: (id: string) => void;
  toggleRadarStatus: (id: string) => void;
  triggerRadarScan: (id: string) => void;

  // Backward compatibility actions
  createJobAlert: (alert: Partial<UpworkJobAlert>) => void;
  deleteJobAlert: (id: string) => void;

  createAutomationRule: (rule: Partial<UpworkAutomationRule>) => void;
  toggleAutomationRule: (id: string) => void;
  createTemplate: (template: Partial<UpworkTemplate>) => void;
  deleteTemplate: (id: string) => void;
  rssPollInterval: UpworkRssInterval;
  setRssPollInterval: (interval: UpworkRssInterval) => void;
}

const INITIAL_RADARS: UpworkRadar[] = [
  {
    id: 'radar_1',
    name: 'Deliverability & Cold Email Architect',
    description: 'Monitors enterprise revenue teams scaling multi-inbox sender infrastructure and DNS.',
    status: 'Active',
    mode: 'assisted', // Mode B (Default - Review Required)
    targetProfileId: 'acc_1',
    searchQuery: 'Deliverability OR "Cold Email" OR "Google Workspace" OR "Multi-inbox" OR DMARC',
    negativeKeywords: ['data entry', 'virtual assistant', 'scam', 'unpaid', 'scrape bulk'],
    category: 'Sales & Lead Generation Architecture',
    skillsRequired: ['Cold Email', 'Deliverability', 'DNS / DMARC'],
    budgetType: 'hourly',
    minHourlyRate: 90,
    clientFilter: {
      minHireRate: 50,
      minSpent: 10000,
      paymentVerifiedOnly: true,
      minClientRating: 4.8,
      excludeCountries: ['India', 'Pakistan', 'Bangladesh', 'Nigeria'],
    },
    competitionFilter: {
      maxProposals: 15,
    },
    minMatchScore: 85,
    aiDraftTone: 'consultative',
    boostStrategy: {
      enabled: true,
      maxBoostConnects: 8,
      targetPosition: 'top_3',
    },
    limits: {
      dailyProposalLimit: 6,
      maxConnectsPerDay: 50,
      stopOnLowResponseRate: true,
    },
    telemetry: {
      lastScanTime: '2m ago',
      nextScanTime: 'in 3m',
      jobsDiscovered: 42,
      qualifiedCount: 18,
      skippedCount: 21,
      appliedCount: 3,
      errorCount: 0,
    }
  },
  {
    id: 'radar_2',
    name: 'Voice AI & Real-Time SDR Engineers',
    description: 'Scans for sub-400ms WebRTC conversational callers, ElevenLabs, and Twilio integrations.',
    status: 'Active',
    mode: 'assisted', // Mode B (Review Required)
    targetProfileId: 'acc_1',
    searchQuery: '"Voice AI" OR WebRTC OR ElevenLabs OR "Realtime API" OR Twilio',
    negativeKeywords: ['voiceover', 'actor', 'audio editing', 'podcast editor'],
    category: 'AI / Machine Learning Engineering',
    skillsRequired: ['Voice AI', 'WebRTC', 'Python'],
    budgetType: 'all',
    minHourlyRate: 100,
    minBudgetFixed: 5000,
    clientFilter: {
      minHireRate: 60,
      minSpent: 25000,
      paymentVerifiedOnly: true,
      minClientRating: 4.9,
    },
    competitionFilter: {
      maxProposals: 10,
    },
    minMatchScore: 90,
    aiDraftTone: 'technical',
    boostStrategy: {
      enabled: true,
      maxBoostConnects: 12,
      targetPosition: 'first',
    },
    limits: {
      dailyProposalLimit: 4,
      maxConnectsPerDay: 60,
      stopOnLowResponseRate: true,
    },
    telemetry: {
      lastScanTime: '5m ago',
      nextScanTime: 'in 5m',
      jobsDiscovered: 29,
      qualifiedCount: 9,
      skippedCount: 18,
      appliedCount: 2,
      errorCount: 0,
    }
  },
  {
    id: 'radar_3',
    name: 'High-Density React / Next.js SaaS Architect',
    description: 'Targets fast-growing SaaS startups needing performance data dashboards and master inboxes.',
    status: 'Paused',
    mode: 'monitor_only',
    targetProfileId: 'acc_1',
    searchQuery: 'React AND TypeScript AND ("Tailwind" OR "Next.js") AND (SaaS OR Dashboard)',
    negativeKeywords: ['WordPress', 'Shopify', 'HTML theme', 'fix css bug'],
    category: 'Web Development & Frontend Architecture',
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS'],
    budgetType: 'fixed',
    minBudgetFixed: 8000,
    clientFilter: {
      minHireRate: 70,
      minSpent: 50000,
      paymentVerifiedOnly: true,
      minClientRating: 4.95,
    },
    competitionFilter: {
      maxProposals: 5,
    },
    minMatchScore: 92,
    aiDraftTone: 'direct',
    boostStrategy: {
      enabled: false,
      maxBoostConnects: 0,
      targetPosition: 'none',
    },
    limits: {
      dailyProposalLimit: 3,
      maxConnectsPerDay: 30,
      stopOnLowResponseRate: true,
    },
    telemetry: {
      lastScanTime: '1h ago',
      nextScanTime: 'Paused',
      jobsDiscovered: 55,
      qualifiedCount: 14,
      skippedCount: 40,
      appliedCount: 1,
      errorCount: 0,
    }
  }
];

const INITIAL_JOBS: UpworkJob[] = [
  {
    id: 'job_1',
    title: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead',
    opportunityType: 'marketplace',
    qualityTier: 'recommended',
    clientCountry: 'United States',
    clientSpent: '$240k+ spent',
    clientRating: 4.98,
    clientReviewsCount: 64,
    paymentVerified: true,
    budgetType: 'Hourly',
    hourlyRateRange: '$90.00 - $140.00 / hr',
    description: 'We need an experienced revenue systems architect to set up 20+ rotating Google Workspace and Microsoft 365 sender mailboxes, configure 2048-bit DKIM/DMARC with custom tracking domains, and integrate with our HubSpot CRM. Candidate must have demonstrable proof of keeping inbox placement above 98% across high-volume outbound campaigns.',
    skills: ['Cold Email', 'Deliverability', 'Google Workspace', 'DNS / DMARC', 'HubSpot / Deals CRM'],
    proposalsCount: '5 to 10',
    matchScore: 98,
    postedTime: '12m ago',
    isSaved: true,
    applicationStatus: 'None',
    connectsCost: 16,
    radarId: 'radar_1',
    matchBreakdown: {
      overallScore: 98,
      skills: 100,
      experience: 98,
      budget: 96,
      clientQuality: 99,
      competition: 95,
      profileRelevance: 100,
      location: 98,
    },
    riskSignals: {
      isPaymentVerified: true,
      clientHireRate: 84,
      unrealisticBudgetWarning: false,
      vagueScopeWarning: false,
      highCompetitionWarning: false,
      suspiciousSignals: [],
      riskLevel: 'low',
    },
    trixieInsights: {
      whyMatches: [
        'Direct 1:1 match with your 24+ Google Workspace verified deliverability case study.',
        'Client has a verified $240k+ spend history with 84% hire rate, paying top tier ($120/hr avg).',
        'Low competition window: only 5-10 proposals submitted within first 12 minutes.'
      ],
      yourAdvantage: 'Top 1% specialized agency track record with 2048-bit DKIM/DMARC automated warmup rotation.',
      potentialRisks: ['Client expects immediate onboarding within 48 hours.'],
      recommendedAction: 'Apply immediately with Consultative tone and propose $125.00/hr.',
      suggestedHourlyRate: { min: 110, max: 135, recommended: 125 }
    },
    screeningQuestions: [
      {
        id: 'q_1_1',
        question: 'How do you isolate domain reputations when managing 20+ rotating sender accounts simultaneously?',
        suggestedAnswer: 'We isolate domains using unique secondary root TLDs (.co, .io, .run) mapped to dedicated Google Workspace tenants. Each secondary domain is configured with isolated 2048-bit DKIM selectors, strict DMARC p=reject policies, and individual custom tracking CNAMEs to prevent any cross-domain reputation leakage.',
        groundedFrom: 'Grounded in your verified Cold Email Infrastructure blueprint.'
      },
      {
        id: 'q_1_2',
        question: 'What is your typical warmup schedule and daily send cap per mailbox to maintain 99%+ deliverability?',
        suggestedAnswer: 'We enforce a 21-day ramp: 5 emails/day in week 1, 15 in week 2, and 25-30 in week 3 with a 40% peer warmup ratio. Once ramped, we cap live outbound sends at 30-35 emails per mailbox per day across rotating schedules.',
        groundedFrom: 'Grounded in Outtricks deliverability benchmark standard.'
      }
    ],
    clientStats: {
      totalHires: 54,
      activeHires: 6,
      avgHourlyPaid: 118,
      hireRate: 84,
      memberSince: 'Mar 2021',
      industry: 'B2B Sales Acceleration SaaS'
    }
  },
  {
    id: 'job_inv_1',
    title: 'DIRECT CLIENT INVITATION: Senior Conversational Voice AI Architect',
    opportunityType: 'invitation',
    qualityTier: 'recommended',
    clientCountry: 'United States',
    clientSpent: '$520k+ spent',
    clientRating: 5.0,
    clientReviewsCount: 89,
    paymentVerified: true,
    budgetType: 'Hourly',
    hourlyRateRange: '$120.00 - $160.00 / hr',
    description: 'Hi Sarah, our team came across your Top Rated Plus profile and stellar track record in real-time WebRTC and conversational AI. We are looking for an architect to build sub-350ms streaming voice qualification agents with human interruption handling and CRM handoff.',
    skills: ['Voice AI', 'WebRTC', 'ElevenLabs', 'Python', 'FastAPI', 'Cal.com API'],
    proposalsCount: 'Less than 5',
    matchScore: 99,
    postedTime: '25m ago',
    isSaved: true,
    applicationStatus: 'None',
    connectsCost: 0, // Direct invitations cost 0 connects!
    matchBreakdown: {
      overallScore: 99,
      skills: 100,
      experience: 100,
      budget: 98,
      clientQuality: 100,
      competition: 100,
      profileRelevance: 100,
      location: 97,
    },
    riskSignals: {
      isPaymentVerified: true,
      clientHireRate: 92,
      unrealisticBudgetWarning: false,
      vagueScopeWarning: false,
      highCompetitionWarning: false,
      suspiciousSignals: [],
      riskLevel: 'low',
    },
    trixieInsights: {
      whyMatches: [
        'Direct client invitation - zero competition and zero Connects required!',
        'Top-tier client with $520k+ verified spend and 92% hire rate.',
        'Budget exceeds standard rate ($120 - $160/hr).'
      ],
      yourAdvantage: 'Direct invitee status gives priority interview placement in client inbox.',
      potentialRisks: ['High-visibility project with stringent latency SLA (<350ms).'],
      recommendedAction: 'Accept invitation immediately with technical demo references.',
      suggestedHourlyRate: { min: 135, max: 155, recommended: 145 }
    },
    screeningQuestions: [
      {
        id: 'q_inv_1',
        question: 'Can you provide a link or explanation of a sub-400ms voice pipeline you architected?',
        suggestedAnswer: 'Yes, our production architecture uses WebSocket streaming with OpenAI Realtime API / ElevenLabs ultra-low latency models combined with WebRTC audio transport, keeping total roundtrip latency to 320-360ms with client-side VAD barge-in support.',
        groundedFrom: 'Grounded in Voice AI portfolio case study.'
      }
    ],
    clientStats: {
      totalHires: 112,
      activeHires: 14,
      avgHourlyPaid: 142,
      hireRate: 92,
      memberSince: 'Jan 2019',
      industry: 'Enterprise AI & Automation Labs'
    }
  },
  {
    id: 'job_2',
    title: 'Full Stack React & Next.js SaaS Platform Developer for B2B AI Tool',
    opportunityType: 'marketplace',
    qualityTier: 'recommended',
    clientCountry: 'United Kingdom',
    clientSpent: '$85k+ spent',
    clientRating: 5.0,
    clientReviewsCount: 32,
    paymentVerified: true,
    budgetType: 'Fixed Price',
    budgetAmount: 12000,
    description: 'Looking for a senior frontend developer to build high-performance data dashboards, live WebRTC voice calling dialers, and multi-channel master inbox views. Must have deep Tailwind and TypeScript expertise.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'WebRTC', 'Vite', 'Next.js'],
    proposalsCount: 'Less than 5',
    matchScore: 96,
    postedTime: '28m ago',
    isSaved: false,
    applicationStatus: 'None',
    connectsCost: 16,
    radarId: 'radar_3',
    matchBreakdown: {
      overallScore: 96,
      skills: 98,
      experience: 95,
      budget: 94,
      clientQuality: 98,
      competition: 97,
      profileRelevance: 96,
      location: 95,
    },
    riskSignals: {
      isPaymentVerified: true,
      clientHireRate: 75,
      unrealisticBudgetWarning: false,
      vagueScopeWarning: false,
      highCompetitionWarning: false,
      suspiciousSignals: [],
      riskLevel: 'low',
    },
    trixieInsights: {
      whyMatches: [
        'Matches your exact Next.js 15, Tailwind, and WebRTC stack.',
        'Healthy fixed budget ($12,000) with milestone escrow structure.',
        'Less than 5 proposals submitted.'
      ],
      yourAdvantage: 'Pre-built high-density SaaS layout components that can cut time-to-market by 50%.',
      potentialRisks: ['Fixed price requires strict milestone scope boundaries.'],
      recommendedAction: 'Submit structured proposal with 3 milestone breakdowns.',
      suggestedFixedPrice: { min: 10000, max: 13000, recommended: 12000 }
    },
    screeningQuestions: [
      {
        id: 'q_2_1',
        question: 'Share 2-3 live examples of high-density data dashboards you built with 60FPS performance.',
        suggestedAnswer: 'We built a high-density multi-channel analytics pipeline rendering 10,000+ items with virtual scrolling, real-time WebSockets, and zero frame drops.',
        groundedFrom: 'Grounded in ScaleStack SaaS Dashboard case study.'
      }
    ],
    clientStats: {
      totalHires: 28,
      activeHires: 3,
      avgHourlyPaid: 95,
      hireRate: 75,
      memberSince: 'Jun 2022',
      industry: 'B2B Fintech Solutions'
    }
  },
  {
    id: 'job_3',
    title: 'AI Agent & Real-Time Voice SDR Integration Specialist',
    opportunityType: 'marketplace',
    qualityTier: 'recommended',
    clientCountry: 'Canada',
    clientSpent: '$110k+ spent',
    clientRating: 4.92,
    clientReviewsCount: 45,
    paymentVerified: true,
    budgetType: 'Hourly',
    hourlyRateRange: '$100.00 - $150.00 / hr',
    description: 'Seeking a voice AI engineer to deploy sub-400ms ElevenLabs / OpenAI Realtime voice qualification callers with automatic objection handling and Google Meet / Cal.com booking sync.',
    skills: ['Voice AI', 'WebRTC', 'ElevenLabs', 'Python', 'FastAPI', 'Cal.com API'],
    proposalsCount: '10 to 15',
    matchScore: 94,
    postedTime: '1h ago',
    isSaved: false,
    applicationStatus: 'None',
    connectsCost: 16,
    radarId: 'radar_2',
    matchBreakdown: {
      overallScore: 94,
      skills: 95,
      experience: 94,
      budget: 96,
      clientQuality: 92,
      competition: 88,
      profileRelevance: 95,
      location: 98,
    },
    riskSignals: {
      isPaymentVerified: true,
      clientHireRate: 78,
      unrealisticBudgetWarning: false,
      vagueScopeWarning: false,
      highCompetitionWarning: false,
      suspiciousSignals: [],
      riskLevel: 'low',
    },
    trixieInsights: {
      whyMatches: [
        'Exact match with your Voice AI SDR caller infrastructure.',
        'High hourly range ($100 - $150/hr) with long-term retainer potential.'
      ],
      yourAdvantage: 'Real-time interruption handling and calendar scheduling already perfected.',
      potentialRisks: ['Moderate competition (10-15 proposals). Boosting recommended.'],
      recommendedAction: 'Draft proposal with 8 Connects boost for 1st-page visibility.',
      suggestedHourlyRate: { min: 120, max: 140, recommended: 130 }
    },
    screeningQuestions: [
      {
        id: 'q_3_1',
        question: 'How do you handle audio barge-in and latency jitter across mobile connections?',
        suggestedAnswer: 'We implement client-side Voice Activity Detection (Silero VAD) to instantly truncate AI playback buffer when human speech energy exceeds threshold, avoiding awkward cross-talk.',
        groundedFrom: 'Grounded in Conversational WebRTC specifications.'
      }
    ],
    clientStats: {
      totalHires: 39,
      activeHires: 5,
      avgHourlyPaid: 112,
      hireRate: 78,
      memberSince: 'Sep 2021',
      industry: 'Enterprise CRM Consulting'
    }
  },
  {
    id: 'job_4',
    title: 'Urgent: Build Multi-Tenant Email Warmup Engine with Unrealistic Scope',
    opportunityType: 'marketplace',
    qualityTier: 'risky',
    clientCountry: 'Unknown',
    clientSpent: '$0 spent',
    clientRating: 0,
    clientReviewsCount: 0,
    paymentVerified: false,
    budgetType: 'Fixed Price',
    budgetAmount: 150,
    description: 'Need full clone of Lemlist, Instantly, and Smartlead in 3 days. Must include unlimited email accounts, warmup pool, and API scraping. Please bid $150.',
    skills: ['Cold Email', 'Web Scraping', 'PHP', 'Python'],
    proposalsCount: '20 to 50',
    matchScore: 38,
    postedTime: '3h ago',
    isSaved: false,
    applicationStatus: 'None',
    connectsCost: 16,
    matchBreakdown: {
      overallScore: 38,
      skills: 45,
      experience: 50,
      budget: 10,
      clientQuality: 15,
      competition: 20,
      profileRelevance: 40,
      location: 50,
    },
    riskSignals: {
      isPaymentVerified: false,
      clientHireRate: 0,
      unrealisticBudgetWarning: true,
      vagueScopeWarning: true,
      highCompetitionWarning: true,
      suspiciousSignals: [
        'Unverified payment method',
        'Zero hire history & $0 spend',
        'Severely unrealistic budget ($150 for enterprise multi-tenant platform)',
        'Impossible 3-day turnaround timeline'
      ],
      riskLevel: 'high',
    },
    trixieInsights: {
      whyMatches: ['Contains keyword "Cold Email".'],
      yourAdvantage: 'None - extreme risk profile.',
      potentialRisks: [
        'High probability of non-payment or milestone dispute.',
        'Wasted Connects expenditure.',
        'Exploitative project scope.'
      ],
      recommendedAction: 'SKIP THIS OPPORTUNITY. Do not spend Connects.',
    },
    screeningQuestions: [],
    clientStats: {
      totalHires: 0,
      activeHires: 0,
      avgHourlyPaid: 0,
      hireRate: 0,
      memberSince: 'Just joined',
    }
  }
];

const INITIAL_APPLICATIONS: UpworkApplication[] = [
  { id: 'app_1', jobId: 'job_101', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', submittedDate: 'Aug 24, 2026', rateProposed: '$125.00/hr', status: 'Interview', proposalText: 'Hi, I have scaled cold outreach infrastructures across 24+ Google Workspace inboxes maintaining optimal deliverability health...', earnings: 8400, radarSource: 'Deliverability & Cold Email Architect', boostedConnects: 6 },
  { id: 'app_2', jobId: 'job_102', jobTitle: 'Next.js 15 Tailwind High-Density Dashboard', clientName: 'ScaleStack AI', submittedDate: 'Aug 22, 2026', rateProposed: '$9,500 Fixed', status: 'Hired', proposalText: 'Built multiple complex data engines with 60FPS fluid drag-and-drop Kanbans and WebSockets...', earnings: 9500, radarSource: 'High-Density React / Next.js SaaS Architect' },
  { id: 'app_3', jobId: 'job_103', jobTitle: 'Twilio & ElevenLabs Voice Caller Integration', clientName: 'Nexlify Inc', submittedDate: 'Aug 20, 2026', rateProposed: '$135.00/hr', status: 'Submitted', proposalText: 'Architected sub-400ms WebRTC conversational callers with real-time speaker diarization...', radarSource: 'Voice AI & Real-Time SDR Engineers', boostedConnects: 8 },
];

const INITIAL_INTERVIEWS: UpworkInterview[] = [
  { id: 'int_1', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', scheduledTime: 'Tomorrow at 3:00 PM EST', status: 'Scheduled', nextAction: 'Prepare deliverability architecture demo deck' },
];

const INITIAL_PROPOSALS: UpworkProposal[] = [
  { id: 'prop_1', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', coverLetter: 'Hi, I noticed you require 20+ rotating Google Workspace sender inboxes...', bidAmount: '$125.00/hr', duration: '1 to 3 months', status: 'Interview', matchScore: 98, submittedDate: 'Aug 24, 2026', boostedConnects: 6 },
  { id: 'prop_2', jobTitle: 'Next.js 15 Tailwind High-Density Dashboard', clientName: 'ScaleStack AI', coverLetter: 'Reviewed your technical specifications for high-density SaaS tables...', bidAmount: '$9,500', duration: 'Less than 1 month', status: 'Submitted', matchScore: 96, submittedDate: 'Aug 22, 2026' },
];

const INITIAL_DRAFTS: UpworkProposalDraft[] = [
  { id: 'draft_1', jobId: 'job_1', jobTitle: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead', clientName: 'Apex Revenue Systems', draftText: 'Hi, I saw your post regarding scaling multi-inbox sender rotation across 20+ accounts...', lastUpdated: '10m ago', bidAmount: '$125.00/hr', duration: '1 to 3 months' },
];

const INITIAL_FOLLOWUPS: UpworkFollowUp[] = [
  { id: 'fol_1', applicationId: 'app_3', jobTitle: 'Twilio & ElevenLabs Voice Caller Integration', clientName: 'Nexlify Inc', scheduledDate: 'Tomorrow at 10:00 AM', message: 'Hi! Just wanted to share our live WebRTC latency benchmark demo link.', status: 'Pending' },
];

const INITIAL_CONTRACTS: UpworkContract[] = [
  { id: 'con_1', title: 'Senior B2B SaaS Architecture & Outbound Platform', clientName: 'ScaleStack AI', contractType: 'Fixed Milestone', totalEarned: 9500, startDate: 'Aug 23, 2026', status: 'Active' },
  { id: 'con_2', title: 'Voice AI & Real-time WebSockets Pipeline', clientName: 'FinTech Stack', contractType: 'Hourly ($125/hr)', totalEarned: 24500, weeklyHoursLimit: 30, startDate: 'Jul 15, 2026', status: 'Active' },
];

const INITIAL_TEMPLATES: UpworkTemplate[] = [
  { id: 'tpl_1', name: 'Enterprise Outbound & Deliverability Hook', category: 'Deliverability', content: 'Hi {{client_name}},\n\nSaw you need {{job_scope}}.\n\nWe have scaled 24+ Google Workspace sending pools with 99.4% primary inbox rates.\n\nOpen to reviewing our 15-provider verification case study?', usageCount: 42, successRate: '41.2% reply rate' },
  { id: 'tpl_2', name: 'High-Performance React / TypeScript SaaS Hook', category: 'Frontend Architecture', content: 'Hi {{client_name}},\n\nReviewed your requirements for {{job_title}}.\n\nBuilt 60FPS high-density data tables, Kanban CRM pipelines, and multi-channel master inboxes.\n\nWould love to share our live demo.', usageCount: 68, successRate: '38.5% reply rate' },
  { id: 'tpl_3', name: 'Real-Time Voice AI SDR Architecture Hook', category: 'Voice AI', content: 'Hi {{client_name}},\n\nNoticed you are looking for sub-400ms conversational voice agents with interruption handling.\n\nWe have deployed production WebRTC + ElevenLabs callers with automated Cal.com booking sync.\n\nCan share a live 2-minute demo link.', usageCount: 29, successRate: '48.3% reply rate' },
];

const INITIAL_RULES: UpworkAutomationRule[] = [
  { id: 'rule_1', name: 'Auto-Bid on High-Match Deliverability Jobs (< 5m)', trigger: 'New Job Matching Alert', action: 'Generate AI Custom Proposal → Send Instant Notification', condition: 'Match Score > 95% & Payment Verified', status: 'Active' },
  { id: 'rule_2', name: 'Automated 48-Hour Proposal Follow-Up', trigger: 'Proposal Unviewed After 48h', action: 'Dispatch Case Study Follow-up Message', condition: 'If no reply received', status: 'Active' },
];

const INITIAL_LOGS: UpworkExecutionLog[] = [
  { id: 'log_1', timestamp: '2m ago', jobTitle: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead', clientName: 'Apex Growth Labs', action: 'Opportunity Evaluated', status: 'Success', details: '98% Outtricks Match Score. Low competition (<10 proposals). Draft proposal generated in Review Queue.', radarName: 'Deliverability & Cold Email Architect' },
  { id: 'log_2', timestamp: '18m ago', jobTitle: 'Urgent: Build Multi-Tenant Email Warmup Engine with Unrealistic Scope', clientName: 'Unverified Client', action: 'Opportunity Screened', status: 'Skipped', details: 'Skipped: Unverified payment, $0 spent, unrealistically low budget ($150), and impossible 3-day deadline.', radarName: 'Deliverability & Cold Email Architect', skipReason: 'Risk policy failure: Unverified payment + budget unrealistic' },
  { id: 'log_3', timestamp: '1h ago', jobTitle: 'Full Stack React & Next.js SaaS Platform Developer', clientName: 'ScaleStack AI', action: 'Proposal Submitted', status: 'Success', details: 'Dispatched proposal with $12,000 fixed bid and 3 milestone allocations.', radarName: 'High-Density React / Next.js SaaS Architect' },
];

const INITIAL_ACCOUNTS: UpworkAccount[] = [
  {
    id: 'acc_1',
    name: 'Sarah Jenkins (Agency Lead)',
    title: 'Top Rated Plus • Revenue Systems & Outbound Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Connected',
    topRatedBadge: 'Top Rated Plus (Top 1%)',
    jss: 100,
    totalEarnings: '$150k+ Total Earned',
    hourlyRate: '$125.00 / hr',
    specializedProfiles: [
      { id: 'sp_1', name: 'Revenue Architecture & Cold Email Deliverability', hourlyRate: '$125.00/hr' },
      { id: 'sp_2', name: 'Conversational Voice AI & Real-Time SDR Systems', hourlyRate: '$145.00/hr' },
      { id: 'sp_3', name: 'Full-Stack React, TypeScript & Data Dashboards', hourlyRate: '$110.00/hr' },
    ]
  }
];

const UpworkContext = createContext<UpworkContextType | undefined>(undefined);

export const UpworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info, warning, error: toastError } = useToast();

  const [activeTab, setActiveTab] = useState<UpworkTabType>('jobs');
  const [jobs, setJobs] = useState<UpworkJob[]>(INITIAL_JOBS);
  const [radars, setRadars] = useState<UpworkRadar[]>(INITIAL_RADARS);
  const [applications, setApplications] = useState<UpworkApplication[]>(INITIAL_APPLICATIONS);
  const [interviews, setInterviews] = useState<UpworkInterview[]>(INITIAL_INTERVIEWS);
  const [proposals, setProposals] = useState<UpworkProposal[]>(INITIAL_PROPOSALS);
  const [proposalDrafts, setProposalDrafts] = useState<UpworkProposalDraft[]>(INITIAL_DRAFTS);
  const [followUps, setFollowUps] = useState<UpworkFollowUp[]>(INITIAL_FOLLOWUPS);
  const [contracts, setContracts] = useState<UpworkContract[]>(INITIAL_CONTRACTS);
  const [templates, setTemplates] = useState<UpworkTemplate[]>(INITIAL_TEMPLATES);
  const [automationRules, setAutomationRules] = useState<UpworkAutomationRule[]>(INITIAL_RULES);
  const [executionLogs, setExecutionLogs] = useState<UpworkExecutionLog[]>(INITIAL_LOGS);
  const [accounts, setAccounts] = useState<UpworkAccount[]>(INITIAL_ACCOUNTS);

  // Safety & Guardrails State
  const [isEmergencyPaused, setIsEmergencyPaused] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outtricks_upwork_emergency_paused') === 'true';
    } catch {
      return false;
    }
  });
  const [emergencyPauseReason, setEmergencyPauseReason] = useState<string | undefined>(undefined);
  const [todayConnectsUsed, setTodayConnectsUsed] = useState<number>(24);
  const [todayConnectsBudget, setTodayConnectsBudget] = useState<number>(80);

  const [rssPollInterval, setRssPollIntervalState] = useState<UpworkRssInterval>(() => {
    try {
      const saved = localStorage.getItem('outtricks_upwork_rss_interval');
      return (saved as UpworkRssInterval) || '5m';
    } catch {
      return '5m';
    }
  });

  // Map radars to backward-compatible jobAlerts
  const jobAlerts = useMemo<UpworkJobAlert[]>(() => {
    return radars.map(r => ({
      id: r.id,
      name: r.name,
      keywords: r.searchQuery,
      minBudget: r.minHourlyRate || r.minBudgetFixed || 50,
      maxProposals: r.competitionFilter.maxProposals,
      notificationState: 'Instant Alert',
      status: r.status,
    }));
  }, [radars]);

  const setRssPollInterval = useCallback((interval: UpworkRssInterval) => {
    setRssPollIntervalState(interval);
    try {
      localStorage.setItem('outtricks_upwork_rss_interval', interval);
    } catch (e) {
      console.warn('Failed to save Upwork RSS interval', e);
    }
    const label = interval === 'manual' ? 'Manual refresh only' : `Every ${interval}`;
    success(`Upwork RSS stream monitor set to ${label}.`, 'Poller Updated');
  }, [success]);

  const toggleEmergencyPause = useCallback((reason?: string) => {
    setIsEmergencyPaused(prev => {
      const next = !prev;
      try {
        localStorage.setItem('outtricks_upwork_emergency_paused', String(next));
      } catch (e) {
        console.warn('Failed to persist emergency pause state', e);
      }
      if (next) {
        setEmergencyPauseReason(reason || 'Manual user kill switch activated.');
        warning(
          reason || 'All automated Upwork bidding and proposal dispatching have been immediately halted.',
          'Emergency Kill Switch Engaged'
        );
        setExecutionLogs(logs => [
          {
            id: `log_${Date.now()}`,
            timestamp: 'Just now',
            jobTitle: 'All Automated Pipelines',
            clientName: 'Safety Shield',
            action: 'Emergency Kill Switch Triggered',
            status: 'Failed',
            details: `Automated bidding stopped. Reason: ${reason || 'Manual kill switch invoked.'}`,
            skipReason: 'Safety Kill Switch Active'
          },
          ...logs
        ]);
      } else {
        setEmergencyPauseReason(undefined);
        success('Automated bidding safety pause lifted. Normal operation resumed.', 'Safety Resumed');
      }
      return next;
    });
  }, [success, warning]);

  const resetTodayConnects = useCallback(() => {
    setTodayConnectsUsed(0);
    info('Today Connects meter reset to 0.', 'Connects Reset');
  }, [info]);

  const toggleSaveJob = useCallback((id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isSaved: !j.isSaved } : j))
    );
  }, []);

  const skipJob = useCallback((jobId: string, reason: string) => {
    const job = jobs.find(j => j.id === jobId);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, isSkipped: true, skipReason: reason } : j));
    setExecutionLogs(logs => [
      {
        id: `log_${Date.now()}`,
        timestamp: 'Just now',
        jobTitle: job ? job.title : 'Target Job',
        clientName: job ? job.clientCountry : 'Client',
        action: 'Opportunity Skipped',
        status: 'Skipped',
        details: `Skipped: ${reason}`,
        skipReason: reason,
      },
      ...logs
    ]);
    info(`Skipped job with logged reason: ${reason}`, 'Opportunity Skipped');
  }, [jobs, info]);

  const linkJobToCrm = useCallback((jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    const crmId = `crm_lead_${Date.now()}`;
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, crmLeadId: crmId } : j));
    success(`Opportunity "${job.title.slice(0, 32)}..." synced to CRM Pipeline.`, 'CRM Linked');
  }, [jobs, success]);

  const submitProposal = useCallback((
    jobId: string, 
    coverLetter: string, 
    bidAmount: string, 
    duration: string,
    screeningAnswers?: { question: string; answer: string }[],
    boostedConnects?: number
  ) => {
    if (isEmergencyPaused) {
      toastError('Cannot submit proposal: Emergency Kill Switch is active.', 'Execution Blocked');
      return;
    }

    const job = jobs.find((j) => j.id === jobId);
    const cost = (job?.connectsCost || 16) + (boostedConnects || 0);

    if (todayConnectsUsed + cost > todayConnectsBudget) {
      toastError(
        `Connects budget exceeded! Needs ${cost} connects, but only ${todayConnectsBudget - todayConnectsUsed} left today.`,
        'Budget Guardrail Triggered'
      );
      return;
    }

    const newProp: UpworkProposal = {
      id: `prop_${Date.now()}`,
      jobTitle: job ? job.title : 'Custom Upwork Job',
      clientName: job ? job.clientCountry : 'Enterprise Client',
      coverLetter,
      bidAmount,
      duration,
      status: 'Submitted',
      matchScore: job ? job.matchScore : 95,
      submittedDate: 'Today',
      screeningAnswers,
      boostedConnects,
    };

    setProposals((prev) => [newProp, ...prev]);
    setApplications((prev) => [
      {
        id: `app_${Date.now()}`,
        jobId,
        jobTitle: newProp.jobTitle,
        clientName: newProp.clientName,
        submittedDate: 'Today',
        rateProposed: bidAmount,
        status: 'Submitted',
        proposalText: coverLetter,
        boostedConnects,
      },
      ...prev
    ]);

    // Update job status
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationStatus: 'Submitted' } : j));
    setTodayConnectsUsed(prev => prev + cost);

    // Remove from drafts if present
    setProposalDrafts(prev => prev.filter(d => d.jobId !== jobId));

    // Append execution log
    setExecutionLogs(logs => [
      {
        id: `log_${Date.now()}`,
        timestamp: 'Just now',
        jobTitle: newProp.jobTitle,
        clientName: newProp.clientName,
        action: 'Proposal Submitted',
        status: 'Success',
        details: `Proposal dispatched with rate ${bidAmount}. Consumed ${cost} Connects (${boostedConnects ? `${boostedConnects} boosted` : 'standard'}).`,
      },
      ...logs
    ]);

    success(
      `Proposal for "${newProp.jobTitle.slice(0, 32)}..." submitted successfully!`, 
      'Proposal Dispatched'
    );
  }, [jobs, isEmergencyPaused, todayConnectsUsed, todayConnectsBudget, toastError, success]);

  const saveProposalDraft = useCallback((
    jobId: string, 
    draftText: string,
    screeningAnswers?: { question: string; answer: string }[],
    bidAmount?: string,
    duration?: string,
    profileId?: string
  ) => {
    const job = jobs.find((j) => j.id === jobId);
    const existingIndex = proposalDrafts.findIndex(d => d.jobId === jobId);

    const updatedDraft: UpworkProposalDraft = {
      id: existingIndex >= 0 ? proposalDrafts[existingIndex].id : `draft_${Date.now()}`,
      jobId,
      jobTitle: job ? job.title : 'Custom Job',
      clientName: job ? job.clientCountry : 'Client',
      draftText,
      lastUpdated: 'Just now',
      screeningAnswers,
      bidAmount,
      duration,
      profileId,
    };

    if (existingIndex >= 0) {
      setProposalDrafts(prev => prev.map((d, i) => i === existingIndex ? updatedDraft : d));
    } else {
      setProposalDrafts(prev => [updatedDraft, ...prev]);
    }

    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationStatus: 'Draft' } : j));
    info('Proposal draft and screening answers saved.', 'Draft Autosaved');
  }, [jobs, proposalDrafts, info]);

  // Radars management
  const createRadar = useCallback((radar: Partial<UpworkRadar>) => {
    const newRadar: UpworkRadar = {
      id: `radar_${Date.now()}`,
      name: radar.name || 'New Smart Job Radar',
      description: radar.description || 'Continuous opportunity scanner with multi-factor match intelligence.',
      status: 'Active',
      mode: radar.mode || 'assisted', // Mode B (Review Required) default!
      targetProfileId: radar.targetProfileId || 'acc_1',
      searchQuery: radar.searchQuery || 'React OR TypeScript',
      negativeKeywords: radar.negativeKeywords || [],
      category: radar.category || 'Engineering & Architecture',
      skillsRequired: radar.skillsRequired || [],
      budgetType: radar.budgetType || 'all',
      minHourlyRate: radar.minHourlyRate || 80,
      minBudgetFixed: radar.minBudgetFixed || 2500,
      clientFilter: radar.clientFilter || {
        minHireRate: 50,
        minSpent: 1000,
        paymentVerifiedOnly: true,
        minClientRating: 4.7,
      },
      competitionFilter: radar.competitionFilter || {
        maxProposals: 15,
      },
      minMatchScore: radar.minMatchScore || 80,
      aiDraftTone: radar.aiDraftTone || 'consultative',
      boostStrategy: radar.boostStrategy || {
        enabled: false,
        maxBoostConnects: 8,
        targetPosition: 'top_3',
      },
      limits: radar.limits || {
        dailyProposalLimit: 5,
        maxConnectsPerDay: 50,
        stopOnLowResponseRate: true,
      },
      telemetry: {
        lastScanTime: 'Just now',
        nextScanTime: 'in 5m',
        jobsDiscovered: 0,
        qualifiedCount: 0,
        skippedCount: 0,
        appliedCount: 0,
        errorCount: 0,
      }
    };
    setRadars(prev => [newRadar, ...prev]);
    success(
      `Smart Radar "${newRadar.name}" configured in ${newRadar.mode === 'assisted' ? 'Assisted (Review Required)' : newRadar.mode === 'automated' ? 'Automated' : 'Monitor'} mode.`,
      'Radar Activated'
    );
  }, [success]);

  const updateRadar = useCallback((id: string, updates: Partial<UpworkRadar>) => {
    setRadars(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    success('Smart Radar configuration updated.', 'Radar Saved');
  }, [success]);

  const deleteRadar = useCallback((id: string) => {
    setRadars(prev => prev.filter(r => r.id !== id));
    info('Smart Radar removed.', 'Radar Deleted');
  }, [info]);

  const toggleRadarStatus = useCallback((id: string) => {
    setRadars(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'Active' ? 'Paused' : 'Active';
        return {
          ...r,
          status: nextStatus,
          telemetry: {
            ...r.telemetry,
            nextScanTime: nextStatus === 'Active' ? 'in 5m' : 'Paused'
          }
        };
      }
      return r;
    }));
  }, []);

  const triggerRadarScan = useCallback((id: string) => {
    const radar = radars.find(r => r.id === id);
    if (!radar) return;
    setRadars(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          telemetry: {
            ...r.telemetry,
            lastScanTime: 'Just now',
            jobsDiscovered: r.telemetry.jobsDiscovered + 3,
            qualifiedCount: r.telemetry.qualifiedCount + 1,
            skippedCount: r.telemetry.skippedCount + 2,
          }
        };
      }
      return r;
    }));
    success(`Smart Radar "${radar.name}" completed scan: 1 qualified match added to feed.`, 'Radar Scan Complete');
  }, [radars, success]);

  // Backward compatibility methods
  const createJobAlert = useCallback((alert: Partial<UpworkJobAlert>) => {
    createRadar({
      name: alert.name,
      searchQuery: alert.keywords,
      minHourlyRate: alert.minBudget,
      competitionFilter: { maxProposals: alert.maxProposals || 15 },
    });
  }, [createRadar]);

  const deleteJobAlert = useCallback((id: string) => {
    deleteRadar(id);
  }, [deleteRadar]);

  const createAutomationRule = useCallback((rule: Partial<UpworkAutomationRule>) => {
    const newRule: UpworkAutomationRule = {
      id: `rule_${Date.now()}`,
      name: rule.name || 'Custom Upwork Rule',
      trigger: rule.trigger || 'New Job Alert',
      action: rule.action || 'Auto Draft Proposal',
      condition: rule.condition || 'Match > 90%',
      status: 'Active',
    };
    setAutomationRules((prev) => [newRule, ...prev]);
    success(`Automation rule "${newRule.name}" active.`, 'Rule Created');
  }, [success]);

  const toggleAutomationRule = useCallback((id: string) => {
    setAutomationRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === 'Active' ? 'Paused' : 'Active' } : r))
    );
  }, []);

  const createTemplate = useCallback((template: Partial<UpworkTemplate>) => {
    const newTpl: UpworkTemplate = {
      id: `tpl_${Date.now()}`,
      name: template.name || 'New Proposal Template',
      category: template.category || 'General',
      content: template.content || 'Hi {{client_name}},\n\nI noticed you need assistance with...',
      usageCount: 0,
    };
    setTemplates((prev) => [newTpl, ...prev]);
    success(`Template "${newTpl.name}" saved.`, 'Template Created');
  }, [success]);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <UpworkContext.Provider
      value={{
        activeTab,
        setActiveTab,
        jobs,
        jobAlerts,
        radars,
        applications,
        interviews,
        proposals,
        proposalDrafts,
        followUps,
        contracts,
        templates,
        automationRules,
        executionLogs,
        accounts,
        isEmergencyPaused,
        emergencyPauseReason,
        todayConnectsUsed,
        todayConnectsBudget,
        toggleEmergencyPause,
        resetTodayConnects,
        toggleSaveJob,
        submitProposal,
        saveProposalDraft,
        skipJob,
        linkJobToCrm,
        createRadar,
        updateRadar,
        deleteRadar,
        toggleRadarStatus,
        triggerRadarScan,
        createJobAlert,
        deleteJobAlert,
        createAutomationRule,
        toggleAutomationRule,
        createTemplate,
        deleteTemplate,
        rssPollInterval,
        setRssPollInterval,
      }}
    >
      {children}
    </UpworkContext.Provider>
  );
};

export const useUpwork = () => {
  const context = useContext(UpworkContext);
  if (!context) {
    throw new Error('useUpwork must be used within an UpworkProvider');
  }
  return context;
};
