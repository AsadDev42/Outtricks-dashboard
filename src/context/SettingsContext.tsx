import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

export type SettingsSubTab = 
  | 'overview'
  | 'profile'
  | 'account'
  | 'workspace'
  | 'organization'
  | 'team'
  | 'billing-credits'
  | 'connected-accounts'
  | 'sending-inboxes'
  | 'autonomous-agents'
  | 'ai-assistant'
  | 'developer-api'
  | 'notifications'
  | 'appearance'
  | 'mouse-cursor'
  | 'compliance-legal'
  | 'suppression-list'
  | 'enterprise-governance'
  | 'audit-center';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'SDR Member' | 'Analyst';
  status: 'Active' | 'Pending';
  avatar: string;
  lastActive: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsed: string;
  scopes: string[];
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: 'Active' | 'Failing';
  createdAt: string;
}

export interface SuppressedRecord {
  id: string;
  type: 'Email' | 'Domain' | 'Phone';
  value: string;
  reason: 'Unsubscribed' | 'Spam Complaint' | 'Bounced 3x' | 'Manual Request';
  dateAdded: string;
  source: string;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  event: string;
  module: 'Auth' | 'Settings' | 'API' | 'Campaigns' | 'CRM' | 'Team' | 'Governance';
  resource: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Blocked';
  details?: Record<string, any>;
}

export interface SendingInboxSetting {
  id: string;
  email: string;
  provider: 'Google Workspace' | 'Microsoft 365' | 'Custom SMTP/IMAP';
  status: 'Active' | 'Paused' | 'Warmup';
  dailySent: number;
  dailyLimit: number;
  healthScore: number;
  warmupScore: number;
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
  mx: boolean;
}

export interface ConnectedAccountItem {
  id: string;
  name: string;
  channel: 'LinkedIn' | 'Google' | 'Microsoft' | 'Twilio' | 'WhatsApp' | 'Upwork';
  detail: string;
  status: 'Connected' | 'Warning' | 'Action Needed';
  lastSync: string;
  type: string;
}

export interface AgentSettingItem {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Paused' | 'Standby';
  workspace: string;
  tasksCount: number;
  lastRun: string;
  dailyLimit: number;
  approvalThreshold: string;
}

export interface IpAllowlistItem {
  id: string;
  cidr: string;
  label: string;
  status: 'Active' | 'Disabled';
  dateAdded: string;
}

interface SettingsContextType {
  activeTab: SettingsSubTab;
  setActiveTab: (tab: SettingsSubTab) => void;
  
  // Profile
  profileData: {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    timezone: string;
    language: string;
    avatar: string;
    bio: string;
  };
  updateProfile: (data: Partial<SettingsContextType['profileData']>) => void;

  // Organization
  orgData: {
    name: string;
    domain: string;
    taxId: string;
    timezone: string;
    currency: string;
    headquarters: string;
    dataRetentionDays: number;
    workspaceId: string;
  };
  updateOrg: (data: Partial<SettingsContextType['orgData']>) => void;

  // Team
  teamMembers: TeamMember[];
  pendingInvites: { id: string; email: string; role: TeamMember['role']; dateSent: string }[];
  inviteMember: (email: string, role: TeamMember['role']) => void;
  removeMember: (id: string) => void;
  updateMemberRole: (id: string, role: TeamMember['role']) => void;
  resendInvite: (id: string) => void;
  revokeInvite: (id: string) => void;

  // API & Webhooks
  apiKeys: ApiKeyItem[];
  webhooks: WebhookEndpoint[];
  createApiKey: (name: string, scopes: string[]) => string;
  revokeApiKey: (id: string) => void;
  addWebhook: (url: string, events: string[]) => void;
  deleteWebhook: (id: string) => void;
  testWebhook: (id: string) => void;

  // Suppression
  suppressionList: SuppressedRecord[];
  addSuppression: (type: SuppressedRecord['type'], value: string, reason: SuppressedRecord['reason']) => void;
  removeSuppression: (id: string) => void;

  // Audit
  auditLogs: AuditLogItem[];

  // Sending Inboxes
  inboxes: SendingInboxSetting[];
  toggleInboxStatus: (id: string) => void;
  addInbox: (inbox: Partial<SendingInboxSetting>) => void;
  updateInboxLimit: (id: string, limit: number) => void;

  // Connected Accounts
  connectedAccounts: ConnectedAccountItem[];
  connectAccount: (account: Partial<ConnectedAccountItem>) => void;
  disconnectAccount: (id: string) => void;
  reconnectAccount: (id: string) => void;

  // Autonomous Agents
  agentSettings: AgentSettingItem[];
  toggleAgentStatus: (id: string) => void;
  updateAgentSettings: (id: string, data: Partial<AgentSettingItem>) => void;

  // AI Assistant
  aiSettings: {
    model: string;
    tone: string;
    contextDepth: number;
    allowDealEdits: boolean;
    allowSequenceSends: boolean;
    sources: { crm: boolean; docs: boolean; pastEmails: boolean; kb: boolean };
    tokensUsedThisMonth: number;
  };
  updateAiSettings: (data: Partial<SettingsContextType['aiSettings']>) => void;

  // Notifications
  notificationSettings: {
    emailDailyDigest: boolean;
    emailWeeklyReport: boolean;
    emailHotLeads: boolean;
    inAppTaskComplete: boolean;
    inAppApprovals: boolean;
    agentGoalReached: boolean;
    agentPausedError: boolean;
    leadReplied: boolean;
    leadMeetingBooked: boolean;
    campaignCompleted: boolean;
    warmupAlerts: boolean;
    securityUnknownLogin: boolean;
    securityApiKeyCreated: boolean;
    slackWebhook: string;
    slackEnabled: boolean;
  };
  updateNotificationSettings: (data: Partial<SettingsContextType['notificationSettings']>) => void;

  // Appearance & Cursor
  appearanceTheme: 'light' | 'dark' | 'system';
  setAppearanceTheme: (theme: 'light' | 'dark' | 'system') => void;
  interfaceDensity: 'compact' | 'comfortable' | 'spacious';
  setInterfaceDensity: (density: 'compact' | 'comfortable' | 'spacious') => void;
  sidebarBehavior: 'expanded' | 'collapsed' | 'hover';
  setSidebarBehavior: (behavior: 'expanded' | 'collapsed' | 'hover') => void;
  accentColor: string;
  setAccentColor: (color: string) => void;

  cursorStyle: 'default' | 'precision' | 'glow' | 'minimal';
  setCursorStyle: (style: 'default' | 'precision' | 'glow' | 'minimal') => void;
  cursorSize: 'sm' | 'md' | 'lg';
  setCursorSize: (size: 'sm' | 'md' | 'lg') => void;
  clickFeedback: boolean;
  setClickFeedback: (enabled: boolean) => void;

  // Enterprise & Governance
  ipAllowlist: IpAllowlistItem[];
  addIpAllowlist: (cidr: string, label: string) => void;
  removeIpAllowlist: (id: string) => void;
  ssoSettings: {
    enabled: boolean;
    idpMetadataUrl: string;
    entityId: string;
    acsUrl: string;
    scimEnabled: boolean;
    scimBaseUrl: string;
    sessionTimeoutHours: number;
    enforceMfa: boolean;
    dataResidency: string;
  };
  updateSsoSettings: (data: Partial<SettingsContextType['ssoSettings']>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<SettingsSubTab>('overview');
  const { success, info } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 890-2411',
    jobTitle: 'VP of Growth & Revenue Operations',
    timezone: 'America/Los_Angeles (PST)',
    language: 'English (US)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Leading outbound revenue operations, autonomous AI sales workflows, and multi-channel expansion.'
  });

  const [orgData, setOrgData] = useState({
    name: 'Redlumb',
    domain: 'redlumb.com',
    taxId: 'US-EIN-88-2940192',
    timezone: 'America/Los_Angeles (PST)',
    currency: 'USD ($)',
    headquarters: '500 Howard St, Suite 400, San Francisco, CA 94105',
    dataRetentionDays: 365,
    workspaceId: 'ws_live_99824f8a0029b'
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'tm-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@cloudscale.ai',
      role: 'Owner',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      lastActive: 'Just now'
    },
    {
      id: 'tm-2',
      name: 'David Zhao',
      email: 'david.z@cloudscale.ai',
      role: 'Admin',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      lastActive: '12 mins ago'
    },
    {
      id: 'tm-3',
      name: 'Elena Rostova',
      email: 'elena.r@cloudscale.ai',
      role: 'SDR Member',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      lastActive: '1 hour ago'
    },
    {
      id: 'tm-4',
      name: 'Alex Rivera',
      email: 'alex.r@cloudscale.ai',
      role: 'Analyst',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      lastActive: '3 hours ago'
    }
  ]);

  const [pendingInvites, setPendingInvites] = useState<{ id: string; email: string; role: TeamMember['role']; dateSent: string }[]>([
    { id: 'inv-1', email: 'm.vance@scaleoutbound.com', role: 'SDR Member', dateSent: 'Yesterday' },
    { id: 'inv-2', email: 'j.miller@cloudscale.ai', role: 'Analyst', dateSent: '3 days ago' },
  ]);

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: 'key-1',
      name: 'Production Workflow Engine',
      keyPrefix: 'otk_live_99824f8a0029b3c4',
      createdAt: 'Aug 01, 2026',
      lastUsed: 'Just now',
      scopes: ['read:leads', 'write:campaigns', 'execute:workflows']
    },
    {
      id: 'key-2',
      name: 'Salesforce CRM Bi-Directional Sync',
      keyPrefix: 'otk_live_4110ac6998bc19d3',
      createdAt: 'Jul 15, 2026',
      lastUsed: '4 mins ago',
      scopes: ['read:deals', 'write:deals', 'read:contacts']
    }
  ]);

  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    { id: 'wh-1', url: 'https://api.cloudscale.ai/webhooks/outtricks-events', events: ['lead.replied', 'deal.won', 'meeting.booked'], status: 'Active', createdAt: 'Aug 10, 2026' },
    { id: 'wh-2', url: 'https://hooks.zapier.com/hooks/catch/9482910/bc892a', events: ['campaign.completed'], status: 'Active', createdAt: 'Aug 18, 2026' }
  ]);

  const [suppressionList, setSuppressionList] = useState<SuppressedRecord[]>([
    { id: 'sup-1', type: 'Domain', value: 'competitor.com', reason: 'Manual Request', dateAdded: 'Aug 10, 2026', source: 'Admin Console' },
    { id: 'sup-2', type: 'Email', value: 'do-not-contact@enterprise.com', reason: 'Unsubscribed', dateAdded: 'Aug 14, 2026', source: 'Email Footer Link' },
    { id: 'sup-3', type: 'Phone', value: '+1 (555) 019-2831', reason: 'Manual Request', dateAdded: 'Aug 18, 2026', source: 'Voice AI SDR' },
    { id: 'sup-4', type: 'Email', value: 'optout@venturepartner.org', reason: 'Spam Complaint', dateAdded: 'Aug 22, 2026', source: 'Spam Feedback Loop' },
  ]);

  const [auditLogs] = useState<AuditLogItem[]>([
    { id: 'aud-1', actor: 'Sarah Jenkins (Owner)', event: 'Updated Aggregate Sending Limit to 1,200/day', module: 'Settings', resource: 'Sending Inboxes', ipAddress: '192.168.1.104', timestamp: 'Today at 11:42 AM', status: 'Success' },
    { id: 'aud-2', actor: 'David Zhao (Admin)', event: 'Generated REST API Token: Salesforce Sync', module: 'API', resource: 'Developer API', ipAddress: '72.14.201.89', timestamp: 'Yesterday at 03:15 PM', status: 'Success' },
    { id: 'aud-3', actor: 'Elena Rostova (SDR)', event: 'Added competitor.com to Global DNC List', module: 'Governance', resource: 'Suppression List', ipAddress: '108.28.14.55', timestamp: 'Aug 24, 2026', status: 'Success' },
    { id: 'aud-4', actor: 'System Security Core', event: 'Blocked Unauthenticated API Request', module: 'Auth', resource: 'REST Gateway', ipAddress: '45.132.88.12', timestamp: 'Aug 22, 2026', status: 'Blocked' },
    { id: 'aud-5', actor: 'Sarah Jenkins (Owner)', event: 'Invited m.vance@scaleoutbound.com as SDR Member', module: 'Team', resource: 'Team Management', ipAddress: '192.168.1.104', timestamp: 'Aug 20, 2026', status: 'Success' }
  ]);

  const [inboxes, setInboxes] = useState<SendingInboxSetting[]>([
    { id: 'ib-1', email: 'sarah.j@cloudscaleoutbound.com', provider: 'Google Workspace', status: 'Active', dailySent: 42, dailyLimit: 50, healthScore: 99, warmupScore: 100, spf: true, dkim: true, dmarc: true, mx: true },
    { id: 'ib-2', email: 'outbound@getcloudscale.io', provider: 'Google Workspace', status: 'Active', dailySent: 38, dailyLimit: 50, healthScore: 98, warmupScore: 98, spf: true, dkim: true, dmarc: true, mx: true },
    { id: 'ib-3', email: 'growth@trycloudscale.com', provider: 'Microsoft 365', status: 'Active', dailySent: 32, dailyLimit: 45, healthScore: 96, warmupScore: 95, spf: true, dkim: true, dmarc: true, mx: true },
    { id: 'ib-4', email: 'partnerships@cloudscale-hq.com', provider: 'Microsoft 365', status: 'Warmup', dailySent: 15, dailyLimit: 30, healthScore: 94, warmupScore: 92, spf: true, dkim: true, dmarc: true, mx: true },
  ]);

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccountItem[]>([
    { id: 'ca-1', name: 'Sarah Jenkins (LinkedIn)', channel: 'LinkedIn', detail: 'Dedicated 4G Residential Proxy • New York, US', status: 'Connected', lastSync: '2m ago', type: 'Residential Proxy' },
    { id: 'ca-2', name: 'Google Workspace Pool', channel: 'Google', detail: '24 Sending Inboxes Connected & Warmup Active', status: 'Connected', lastSync: 'Just now', type: 'OAuth 2.0' },
    { id: 'ca-3', name: 'Microsoft 365 Exchange', channel: 'Microsoft', detail: 'Exchange SMTP/IMAP Relay Active', status: 'Connected', lastSync: '8m ago', type: 'OAuth 2.0' },
    { id: 'ca-4', name: 'WebRTC Voice AI Gateway (Twilio)', channel: 'Twilio', detail: 'Sub-400ms Ultra-Low Latency Audio Stream', status: 'Connected', lastSync: '14m ago', type: 'SIP Trunk' },
    { id: 'ca-5', name: 'Upwork Enterprise API', channel: 'Upwork', detail: 'Auto-bidding webhook stream connected', status: 'Connected', lastSync: '1h ago', type: 'REST API' }
  ]);

  const [agentSettings, setAgentSettings] = useState<AgentSettingItem[]>([
    { id: 'ag-1', name: 'Autonomous SDR Outreach', role: 'Multi-Channel Prospecting', status: 'Active', workspace: 'Enterprise Outbound', tasksCount: 1420, lastRun: '4m ago', dailyLimit: 250, approvalThreshold: 'Hot Leads Only' },
    { id: 'ag-2', name: 'LinkedIn Safe Bot', role: 'Social Touch & Connection Invites', status: 'Active', workspace: 'US-East FinTech', tasksCount: 890, lastRun: '18m ago', dailyLimit: 25, approvalThreshold: 'Auto-Dispatch' },
    { id: 'ag-3', name: 'Upwork Bidding Agent', role: 'AI Proposal Generation', status: 'Active', workspace: 'Global Agency', tasksCount: 320, lastRun: '1h ago', dailyLimit: 40, approvalThreshold: 'Require Review' },
    { id: 'ag-4', name: 'DeepContext Researcher', role: 'Company Signal Synthesis', status: 'Active', workspace: 'Strategy', tasksCount: 2400, lastRun: '12m ago', dailyLimit: 500, approvalThreshold: 'Auto-Dispatch' },
  ]);

  const [aiSettings, setAiSettings] = useState({
    model: 'Claude 3.5 Sonnet / GPT-4o Hybrid',
    tone: 'Authoritative & Data-Driven (B2B SaaS / Enterprise)',
    contextDepth: 12,
    allowDealEdits: true,
    allowSequenceSends: false,
    sources: { crm: true, docs: true, pastEmails: true, kb: true },
    tokensUsedThisMonth: 1420800
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailDailyDigest: true,
    emailWeeklyReport: true,
    emailHotLeads: true,
    inAppTaskComplete: true,
    inAppApprovals: true,
    agentGoalReached: true,
    agentPausedError: true,
    leadReplied: true,
    leadMeetingBooked: true,
    campaignCompleted: true,
    warmupAlerts: true,
    securityUnknownLogin: true,
    securityApiKeyCreated: true,
    slackWebhook: 'https://hooks.slack.com/services/T00/B00/X00',
    slackEnabled: true,
  });

  const [appearanceTheme, setAppearanceTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [interfaceDensity, setInterfaceDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [sidebarBehavior, setSidebarBehavior] = useState<'expanded' | 'collapsed' | 'hover'>('expanded');
  const [accentColor, setAccentColor] = useState('#2563eb');

  const [cursorStyle, setCursorStyle] = useState<'default' | 'precision' | 'glow' | 'minimal'>('default');
  const [cursorSize, setCursorSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [clickFeedback, setClickFeedback] = useState(true);

  const [ipAllowlist, setIpAllowlist] = useState<IpAllowlistItem[]>([
    { id: 'ip-1', cidr: '192.168.1.0/24', label: 'San Francisco HQ Office', status: 'Active', dateAdded: 'Aug 01, 2026' },
    { id: 'ip-2', cidr: '10.0.0.0/16', label: 'Corporate VPN Gateway', status: 'Active', dateAdded: 'Aug 05, 2026' }
  ]);

  const [ssoSettings, setSsoSettings] = useState({
    enabled: true,
    idpMetadataUrl: 'https://login.okta.com/app/exk9482910/sso/saml/metadata',
    entityId: 'https://app.outtricks.com/sso/saml',
    acsUrl: 'https://app.outtricks.com/api/v1/auth/saml/callback',
    scimEnabled: true,
    scimBaseUrl: 'https://api.outtricks.com/scim/v2',
    sessionTimeoutHours: 8,
    enforceMfa: true,
    dataResidency: 'US-East (Virginia)'
  });

  const updateProfile = (data: Partial<SettingsContextType['profileData']>) => {
    setProfileData(prev => ({ ...prev, ...data }));
    success('Personal profile settings updated.', 'Profile Saved');
  };

  const updateOrg = (data: Partial<SettingsContextType['orgData']>) => {
    setOrgData(prev => ({ ...prev, ...data }));
    success('Organization settings updated.', 'Workspace Saved');
  };

  const inviteMember = (email: string, role: TeamMember['role']) => {
    const newInv = {
      id: `inv-${Date.now()}`,
      email,
      role,
      dateSent: 'Just now'
    };
    setPendingInvites(prev => [newInv, ...prev]);
    success(`Invitation dispatched to ${email}.`, 'Invite Sent');
  };

  const removeMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    success('Member removed from workspace.', 'Member Removed');
  };

  const updateMemberRole = (id: string, role: TeamMember['role']) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
    success(`Member permissions updated to ${role}.`, 'Role Updated');
  };

  const resendInvite = (id: string) => {
    success('Invitation re-dispatched.', 'Invite Resent');
  };

  const revokeInvite = (id: string) => {
    setPendingInvites(prev => prev.filter(i => i.id !== id));
    info('Invitation revoked.', 'Invite Cancelled');
  };

  const createApiKey = (name: string, scopes: string[]) => {
    const rawKey = `otk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name,
      keyPrefix: rawKey.substring(0, 16) + '...',
      createdAt: 'Just now',
      lastUsed: 'Never',
      scopes
    };
    setApiKeys(prev => [newKey, ...prev]);
    success(`API Key "${name}" generated.`, 'Token Created');
    return rawKey;
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    info('API Key revoked immediately.', 'Key Revoked');
  };

  const addWebhook = (url: string, events: string[]) => {
    const newWh: WebhookEndpoint = {
      id: `wh-${Date.now()}`,
      url,
      events,
      status: 'Active',
      createdAt: 'Just now'
    };
    setWebhooks(prev => [newWh, ...prev]);
    success('Webhook endpoint created.', 'Webhook Added');
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id));
    info('Webhook endpoint removed.', 'Webhook Deleted');
  };

  const testWebhook = (id: string) => {
    success('Test ping payload dispatched: Status 200 OK (142ms)', 'Ping Verified');
  };

  const addSuppression = (type: SuppressedRecord['type'], value: string, reason: SuppressedRecord['reason']) => {
    const newRecord: SuppressedRecord = {
      id: `sup-${Date.now()}`,
      type,
      value,
      reason,
      dateAdded: 'Today',
      source: 'Manual Add'
    };
    setSuppressionList(prev => [newRecord, ...prev]);
    success(`Added ${value} to suppression registry.`, 'Record Suppressed');
  };

  const removeSuppression = (id: string) => {
    setSuppressionList(prev => prev.filter(s => s.id !== id));
    success('Record removed from suppression registry.', 'Suppression Lifted');
  };

  const toggleInboxStatus = (id: string) => {
    setInboxes(prev => prev.map(ib => {
      if (ib.id === id) {
        const nextStatus = ib.status === 'Active' ? 'Paused' : 'Active';
        info(`Inbox ${ib.email} is now ${nextStatus}.`, 'Status Toggled');
        return { ...ib, status: nextStatus };
      }
      return ib;
    }));
  };

  const addInbox = (data: Partial<SendingInboxSetting>) => {
    const newIb: SendingInboxSetting = {
      id: `ib-${Date.now()}`,
      email: data.email || 'outbound@domain.com',
      provider: data.provider || 'Google Workspace',
      status: 'Active',
      dailySent: 0,
      dailyLimit: 50,
      healthScore: 99,
      warmupScore: 100,
      spf: true,
      dkim: true,
      dmarc: true,
      mx: true,
    };
    setInboxes(prev => [newIb, ...prev]);
    success(`Connected sending inbox: ${newIb.email}`, 'Inbox Added');
  };

  const updateInboxLimit = (id: string, limit: number) => {
    setInboxes(prev => prev.map(ib => ib.id === id ? { ...ib, dailyLimit: limit } : ib));
    success('Sending limit updated.', 'Limit Saved');
  };

  const connectAccount = (acc: Partial<ConnectedAccountItem>) => {
    const newAcc: ConnectedAccountItem = {
      id: `ca-${Date.now()}`,
      name: acc.name || 'New Channel Integration',
      channel: acc.channel || 'Google',
      detail: acc.detail || 'Connected via OAuth 2.0',
      status: 'Connected',
      lastSync: 'Just now',
      type: acc.type || 'OAuth'
    };
    setConnectedAccounts(prev => [newAcc, ...prev]);
    success(`Connected account: ${newAcc.name}`, 'Account Connected');
  };

  const disconnectAccount = (id: string) => {
    setConnectedAccounts(prev => prev.filter(a => a.id !== id));
    info('Account disconnected.', 'Account Removed');
  };

  const reconnectAccount = (id: string) => {
    success('Account session re-authenticated successfully.', 'Reconnected');
  };

  const toggleAgentStatus = (id: string) => {
    setAgentSettings(prev => prev.map(ag => {
      if (ag.id === id) {
        const nextStatus = ag.status === 'Active' ? 'Paused' : 'Active';
        info(`Agent "${ag.name}" is now ${nextStatus}.`, 'Agent Status Changed');
        return { ...ag, status: nextStatus };
      }
      return ag;
    }));
  };

  const updateAgentSettings = (id: string, data: Partial<AgentSettingItem>) => {
    setAgentSettings(prev => prev.map(ag => ag.id === id ? { ...ag, ...data } : ag));
    success('Agent configurations saved.', 'Agent Updated');
  };

  const updateAiSettings = (data: Partial<SettingsContextType['aiSettings']>) => {
    setAiSettings(prev => ({ ...prev, ...data }));
    success('AI Assistant preferences saved.', 'AI Config Updated');
  };

  const updateNotificationSettings = (data: Partial<SettingsContextType['notificationSettings']>) => {
    setNotificationSettings(prev => ({ ...prev, ...data }));
    success('Notification delivery channels updated.', 'Preferences Saved');
  };

  const addIpAllowlist = (cidr: string, label: string) => {
    const newIp: IpAllowlistItem = {
      id: `ip-${Date.now()}`,
      cidr,
      label,
      status: 'Active',
      dateAdded: 'Today'
    };
    setIpAllowlist(prev => [newIp, ...prev]);
    success(`IP ${cidr} added to allowlist.`, 'IP Allowlisted');
  };

  const removeIpAllowlist = (id: string) => {
    setIpAllowlist(prev => prev.filter(i => i.id !== id));
    info('IP removed from allowlist.', 'IP Removed');
  };

  const updateSsoSettings = (data: Partial<SettingsContextType['ssoSettings']>) => {
    setSsoSettings(prev => ({ ...prev, ...data }));
    success('Enterprise SSO & SAML policies saved.', 'SSO Saved');
  };

  return (
    <SettingsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profileData,
        updateProfile,
        orgData,
        updateOrg,
        teamMembers,
        pendingInvites,
        inviteMember,
        removeMember,
        updateMemberRole,
        resendInvite,
        revokeInvite,
        apiKeys,
        webhooks,
        createApiKey,
        revokeApiKey,
        addWebhook,
        deleteWebhook,
        testWebhook,
        suppressionList,
        addSuppression,
        removeSuppression,
        auditLogs,
        inboxes,
        toggleInboxStatus,
        addInbox,
        updateInboxLimit,
        connectedAccounts,
        connectAccount,
        disconnectAccount,
        reconnectAccount,
        agentSettings,
        toggleAgentStatus,
        updateAgentSettings,
        aiSettings,
        updateAiSettings,
        notificationSettings,
        updateNotificationSettings,
        appearanceTheme,
        setAppearanceTheme,
        interfaceDensity,
        setInterfaceDensity,
        sidebarBehavior,
        setSidebarBehavior,
        accentColor,
        setAccentColor,
        cursorStyle,
        setCursorStyle,
        cursorSize,
        setCursorSize,
        clickFeedback,
        setClickFeedback,
        ipAllowlist,
        addIpAllowlist,
        removeIpAllowlist,
        ssoSettings,
        updateSsoSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
