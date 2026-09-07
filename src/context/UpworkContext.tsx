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
}

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
}

export interface UpworkProposalDraft {
  id: string;
  jobId: string;
  jobTitle: string;
  clientName: string;
  draftText: string;
  lastUpdated: string;
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
  status: 'Success' | 'Queued' | 'Failed';
  details: string;
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
}

interface UpworkContextType {
  activeTab: UpworkTabType;
  setActiveTab: (tab: UpworkTabType) => void;
  jobs: UpworkJob[];
  jobAlerts: UpworkJobAlert[];
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

  // Actions
  toggleSaveJob: (id: string) => void;
  submitProposal: (jobId: string, coverLetter: string, bidAmount: string, duration: string) => void;
  saveProposalDraft: (jobId: string, draftText: string) => void;
  createJobAlert: (alert: Partial<UpworkJobAlert>) => void;
  deleteJobAlert: (id: string) => void;
  createAutomationRule: (rule: Partial<UpworkAutomationRule>) => void;
  toggleAutomationRule: (id: string) => void;
  createTemplate: (template: Partial<UpworkTemplate>) => void;
  deleteTemplate: (id: string) => void;
}

const INITIAL_JOBS: UpworkJob[] = [
  {
    id: 'job_1',
    title: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead',
    clientCountry: 'United States',
    clientSpent: '$240k+ spent',
    clientRating: 4.98,
    clientReviewsCount: 64,
    paymentVerified: true,
    budgetType: 'Hourly',
    hourlyRateRange: '$90.00 - $140.00 / hr',
    description: 'We need an experienced revenue systems architect to set up 20+ rotating Google Workspace and Microsoft 365 sender mailboxes, configure 2048-bit DKIM/DMARC with custom tracking domains, and integrate with CRM.',
    skills: ['Cold Email', 'Deliverability', 'Google Workspace', 'DNS / DMARC', 'HubSpot / Deals CRM'],
    proposalsCount: '5 to 10',
    matchScore: 98,
    postedTime: '12m ago',
    isSaved: true,
    applicationStatus: 'None',
  },
  {
    id: 'job_2',
    title: 'Full Stack React & Next.js SaaS Platform Developer for B2B AI Tool',
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
  },
  {
    id: 'job_3',
    title: 'AI Agent & Real-Time Voice SDR Integration Specialist',
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
  }
];

const INITIAL_ALERTS: UpworkJobAlert[] = [
  { id: 'al_1', name: 'Cold Email & Deliverability Architect ($90+/hr)', keywords: 'Deliverability, Cold Email, Multi-inbox, DNS', minBudget: 90, maxProposals: 10, notificationState: 'Instant Alert', status: 'Active' },
  { id: 'al_2', name: 'Voice AI SDR & Conversational WebRTC', keywords: 'Voice AI, WebRTC, ElevenLabs, Twilio', minBudget: 100, maxProposals: 15, notificationState: 'Instant Alert', status: 'Active' },
];

const INITIAL_APPLICATIONS: UpworkApplication[] = [
  { id: 'app_1', jobId: 'job_101', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', submittedDate: 'Aug 24, 2026', rateProposed: '$125.00/hr', status: 'Interview', proposalText: 'Hi, I have scaled cold outreach infrastructures across 24+ Google Workspace inboxes maintaining optimal deliverability health...', earnings: 8400 },
  { id: 'app_2', jobId: 'job_102', jobTitle: 'Next.js 15 Tailwind High-Density Dashboard', clientName: 'ScaleStack AI', submittedDate: 'Aug 22, 2026', rateProposed: '$9,500 Fixed', status: 'Hired', proposalText: 'Built multiple complex data engines with 60FPS fluid drag-and-drop Kanbans and WebSockets...', earnings: 9500 },
  { id: 'app_3', jobId: 'job_103', jobTitle: 'Twilio & ElevenLabs Voice Caller Integration', clientName: 'Nexlify Inc', submittedDate: 'Aug 20, 2026', rateProposed: '$135.00/hr', status: 'Submitted', proposalText: 'Architected sub-400ms WebRTC conversational callers with real-time speaker diarization...' },
];

const INITIAL_INTERVIEWS: UpworkInterview[] = [
  { id: 'int_1', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', scheduledTime: 'Tomorrow at 3:00 PM EST', status: 'Scheduled', nextAction: 'Prepare deliverability architecture demo deck' },
];

const INITIAL_PROPOSALS: UpworkProposal[] = [
  { id: 'prop_1', jobTitle: 'Enterprise Outbound Multi-Inbox System', clientName: 'Apex Growth Labs', coverLetter: 'Hi, I noticed you require 20+ rotating Google Workspace sender inboxes...', bidAmount: '$125.00/hr', duration: '1 to 3 months', status: 'Interview', matchScore: 98, submittedDate: 'Aug 24, 2026' },
  { id: 'prop_2', jobTitle: 'Next.js 15 Tailwind High-Density Dashboard', clientName: 'ScaleStack AI', coverLetter: 'Reviewed your technical specifications for high-density SaaS tables...', bidAmount: '$9,500', duration: 'Less than 1 month', status: 'Submitted', matchScore: 96, submittedDate: 'Aug 22, 2026' },
];

const INITIAL_DRAFTS: UpworkProposalDraft[] = [
  { id: 'draft_1', jobId: 'job_1', jobTitle: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead', clientName: 'Apex Revenue Systems', draftText: 'Hi, I saw your post regarding scaling multi-inbox sender rotation across 20+ accounts...', lastUpdated: '10m ago' },
];

const INITIAL_FOLLOWUPS: UpworkFollowUp[] = [
  { id: 'fol_1', applicationId: 'app_3', jobTitle: 'Twilio & ElevenLabs Voice Caller Integration', clientName: 'Nexlify Inc', scheduledDate: 'Tomorrow at 10:00 AM', message: 'Hi! Just wanted to share our live WebRTC latency benchmark demo link.', status: 'Pending' },
];

const INITIAL_CONTRACTS: UpworkContract[] = [
  { id: 'con_1', title: 'Senior B2B SaaS Architecture & Outbound Platform', clientName: 'ScaleStack AI', contractType: 'Fixed Milestone', totalEarned: 9500, startDate: 'Aug 23, 2026', status: 'Active' },
  { id: 'con_2', title: 'Voice AI & Real-time WebSockets Pipeline', clientName: 'FinTech Stack', contractType: 'Hourly ($125/hr)', totalEarned: 24500, weeklyHoursLimit: 30, startDate: 'Jul 15, 2026', status: 'Active' },
];

const INITIAL_TEMPLATES: UpworkTemplate[] = [
  { id: 'tpl_1', name: 'Enterprise Outbound & Deliverability Hook', category: 'Deliverability', content: 'Hi {{client_name}},\n\nSaw you need {{job_scope}}.\n\nWe have scaled 24+ Google Workspace sending pools with 99.4% primary inbox rates.\n\nOpen to reviewing our 15-provider verification case study?', usageCount: 42 },
  { id: 'tpl_2', name: 'High-Performance React / TypeScript SaaS Hook', category: 'Frontend Architecture', content: 'Hi {{client_name}},\n\nReviewed your requirements for {{job_title}}.\n\nBuilt 60FPS high-density data tables, Kanban CRM pipelines, and multi-channel master inboxes.\n\nWould love to share our live demo.', usageCount: 68 },
];

const INITIAL_RULES: UpworkAutomationRule[] = [
  { id: 'rule_1', name: 'Auto-Bid on High-Match Deliverability Jobs (< 5m)', trigger: 'New Job Matching Alert', action: 'Generate AI Custom Proposal → Send Instant Notification', condition: 'Match Score > 95% & Payment Verified', status: 'Active' },
  { id: 'rule_2', name: 'Automated 48-Hour Proposal Follow-Up', trigger: 'Proposal Unviewed After 48h', action: 'Dispatch Case Study Follow-up Message', condition: 'If no reply received', status: 'Active' },
];

const INITIAL_LOGS: UpworkExecutionLog[] = [
  { id: 'log_1', timestamp: '12m ago', jobTitle: 'Senior Outbound Architecture & Multi-Inbox Infrastructure Lead', clientName: 'Apex Revenue Systems', action: 'Matched Job Alert', status: 'Success', details: '98% Match Score detected. AI proposal draft generated.' },
  { id: 'log_2', timestamp: '1h ago', jobTitle: 'Full Stack React & Next.js SaaS Platform Developer', clientName: 'ScaleStack AI', action: 'Proposal Submitted', status: 'Success', details: 'Dispatched custom proposal ($125/hr rate proposed).' },
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
  }
];

const UpworkContext = createContext<UpworkContextType | undefined>(undefined);

export const UpworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<UpworkTabType>('jobs');
  const [jobs, setJobs] = useState<UpworkJob[]>(INITIAL_JOBS);
  const [jobAlerts, setJobAlerts] = useState<UpworkJobAlert[]>(INITIAL_ALERTS);
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

  const toggleSaveJob = useCallback((id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isSaved: !j.isSaved } : j))
    );
  }, []);

  const submitProposal = useCallback((jobId: string, coverLetter: string, bidAmount: string, duration: string) => {
    const job = jobs.find((j) => j.id === jobId);
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
      },
      ...prev
    ]);
    success(`Proposal for "${newProp.jobTitle.slice(0, 32)}..." submitted successfully!`, 'Proposal Dispatched');
  }, [jobs, success]);

  const saveProposalDraft = useCallback((jobId: string, draftText: string) => {
    const job = jobs.find((j) => j.id === jobId);
    const newDraft: UpworkProposalDraft = {
      id: `draft_${Date.now()}`,
      jobId,
      jobTitle: job ? job.title : 'Custom Job',
      clientName: job ? job.clientCountry : 'Client',
      draftText,
      lastUpdated: 'Just now',
    };
    setProposalDrafts((prev) => [newDraft, ...prev]);
    info('Proposal draft autosaved.', 'Draft Saved');
  }, [jobs, info]);

  const createJobAlert = useCallback((alert: Partial<UpworkJobAlert>) => {
    const newAlert: UpworkJobAlert = {
      id: `al_${Date.now()}`,
      name: alert.name || 'New Upwork Alert',
      keywords: alert.keywords || 'React, TypeScript',
      minBudget: alert.minBudget || 80,
      maxProposals: alert.maxProposals || 10,
      notificationState: 'Instant Alert',
      status: 'Active',
    };
    setJobAlerts((prev) => [newAlert, ...prev]);
    success(`Job alert "${newAlert.name}" is now monitoring the Upwork RSS stream.`, 'Alert Created');
  }, [success]);

  const deleteJobAlert = useCallback((id: string) => {
    setJobAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

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
        toggleSaveJob,
        submitProposal,
        saveProposalDraft,
        createJobAlert,
        deleteJobAlert,
        createAutomationRule,
        toggleAutomationRule,
        createTemplate,
        deleteTemplate,
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
