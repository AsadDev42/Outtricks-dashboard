export interface ChannelFeature {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string }[];
  keyHighlights: string[];
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  result: string;
  quote: string;
  channels: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  limits: {
    emailsPerDay: string;
    leadsMonthly: string;
    voiceMinutes: string;
    connectedInboxes: string;
    linkedInAccounts: string;
    workspaces: string;
  };
  cta: string;
}

export interface Deal {
  id: string;
  company: string;
  name?: string;
  contact?: string;
  contactName?: string;
  value: number;
  stage: 'Qualified' | 'Discovery' | 'Demo' | 'Proposal' | 'Won' | 'qualified' | 'discovery' | 'demo' | 'proposal' | 'won';
  channel?: 'Email' | 'LinkedIn' | 'Voice AI' | 'Proposal' | string;
  age?: string;
  statusText?: string;
  lastTouch?: string;
  probability?: number;
}

export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  size?: string;
  employees?: string;
  industry?: string;
  tech?: string[];
  status: 'Verified' | 'Risky' | 'Unverified' | 'verified' | 'catch-all';
  email: string;
  phone?: string;
}

export interface WorkflowNode {
  id: string;
  title: string;
  channel: 'email' | 'linkedin' | 'voice' | 'data' | 'upwork' | 'crm';
  status: 'idle' | 'running' | 'completed';
  latency: string;
  details: string;
}
