import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface GlobalTab {
  id: string; // Canonical module key e.g. 'copilot', 'crm', 'calls', 'analytics', 'upwork', 'workflows'
  title: string;
  path: string;
  module: string;
  closable: boolean;
}

interface GlobalTabsContextType {
  tabs: GlobalTab[];
  activeTabId: string;
  openTab: (tab: Omit<GlobalTab, 'closable'> & { closable?: boolean }) => void;
  closeTab: (tabId: string) => void;
  closeAllTabs: () => void;
  closeOtherTabs: (tabId: string) => void;
}

const TABS_STORAGE_KEY = 'outtricks_global_tabs_v3';
const ACTIVE_TAB_STORAGE_KEY = 'outtricks_global_active_tab_v3';

export const DEFAULT_HOME_TAB: GlobalTab = {
  id: 'copilot',
  title: 'Master Box',
  path: '/',
  module: 'copilot',
  closable: false,
};

// Route to Title/Module mapping dictionary
export function getRouteMetadata(pathname: string): { title: string; module: string } {
  const p = pathname.toLowerCase();

  // 1. Master Box / AI Chat / Dashboard
  if (
    p === '/' ||
    p === '/master-box' ||
    p.startsWith('/master-box') ||
    p === '/copilot' ||
    p.startsWith('/copilot') ||
    p === '/chat' ||
    p.startsWith('/chat') ||
    p === '/ai-chat' ||
    p.startsWith('/ai-chat') ||
    p === '/dashboard' ||
    p === '/command-center' ||
    p === '/app' ||
    p === '/app/copilot' ||
    p === '/app/dashboard'
  ) {
    return { title: 'Master Box', module: 'copilot' };
  }

  // 2. Agents / Autonomous Workforce
  if (
    p === '/agents' ||
    p === '/ai-agents' ||
    p === '/agents/workforce-overview' ||
    p === '/ai-agents/workforce-overview' ||
    p === '/app/ai-agents' ||
    p === '/app/agents'
  ) {
    return { title: 'Workforce Overview', module: 'agents' };
  }
  if (p.includes('/approvals')) return { title: 'Approvals Queue', module: 'agents' };
  if (p.includes('/sdr-outreach')) return { title: 'SDR Outreach Agent', module: 'agents' };
  if (p.includes('/linkedin-safe-bot')) return { title: 'LinkedIn Safe Bot', module: 'agents' };
  if (p.includes('/upwork-bidding')) return { title: 'Upwork Bidding Agent', module: 'agents' };
  if (p.includes('/deepcontext-researcher')) return { title: 'DeepContext Researcher', module: 'agents' };
  if (p.includes('/execution-runs') || p.includes('/executions')) return { title: 'Execution Runs', module: 'agents' };
  if (p.includes('/task-backlog') || p.includes('/tasks')) return { title: 'Task Backlog', module: 'agents' };
  if (p.includes('/performance')) return { title: 'Performance Analytics', module: 'agents' };
  if (
    p.includes('/audit-logs') ||
    p.includes('/activity-audit-logs') ||
    (p.startsWith('/agents') && p.includes('/logs'))
  ) {
    return { title: 'Activity Audit Logs', module: 'agents' };
  }
  if (
    p.startsWith('/ai-agents') ||
    p.startsWith('/agents') ||
    p.startsWith('/app/ai-agents') ||
    p.startsWith('/app/agents')
  ) {
    return { title: 'AI Agents', module: 'agents' };
  }

  // 3. CRM
  if (p === '/crm' || p === '/crm/overview' || p === '/crm/dashboard' || p === '/app/crm' || p === '/app/crm/overview' || p === '/people') {
    return { title: 'CRM Dashboard', module: 'crm' };
  }
  if (p.startsWith('/crm/pipeline') || p.startsWith('/crm/deals')) return { title: 'Deals & Pipeline', module: 'crm' };
  if (p.startsWith('/crm/companies') || p === '/companies' || p === '/accounts' || p === '/app/companies') {
    return { title: 'Companies', module: 'crm' };
  }
  if (p.startsWith('/crm/leads')) return { title: 'Leads', module: 'crm' };
  if (p.startsWith('/crm/contacts')) return { title: 'Contacts', module: 'crm' };
  if (p.startsWith('/crm/activities')) return { title: 'Activities', module: 'crm' };
  if (p.startsWith('/crm/reminders') || p.startsWith('/crm/tasks')) return { title: 'Tasks & Reminders', module: 'crm' };
  if (p.startsWith('/crm/contracts')) return { title: 'Revenue Contracts', module: 'crm' };
  if (p.startsWith('/crm/labels')) return { title: 'Label Intelligence', module: 'crm' };
  if (p.startsWith('/crm/signals')) return { title: 'Signals Sentinel', module: 'crm' };
  if (p.startsWith('/crm/health')) return { title: 'CRM Health', module: 'crm' };
  if (p.startsWith('/crm') || p.startsWith('/app/crm')) return { title: 'CRM', module: 'crm' };

  // 4. Lead Finder
  if (p === '/lead-finder' || p === '/lead-finder/find-people' || p === '/lead-finder/people' || p === '/app/lead-finder') {
    return { title: 'Find People', module: 'lead-finder' };
  }
  if (p.startsWith('/lead-finder/overview')) return { title: 'Lead Overview', module: 'lead-finder' };
  if (p.startsWith('/lead-finder/saved-searches') || p.startsWith('/lead-finder/saved')) return { title: 'Saved Searches', module: 'lead-finder' };
  if (p.startsWith('/lead-finder/search-history') || p.startsWith('/lead-finder/history')) return { title: 'Search History', module: 'lead-finder' };
  if (p.startsWith('/lead-finder/my-leads') || p === '/leads' || p === '/prospects' || p === '/app/leads') {
    return { title: 'My Leads', module: 'lead-finder' };
  }
  if (p.startsWith('/lead-finder/prospect-lists')) return { title: 'Prospect Lists', module: 'lead-finder' };
  if (p.startsWith('/lead-finder/imports')) return { title: 'Imports', module: 'lead-finder' };
  if (p.startsWith('/lead-finder') || p.startsWith('/app/lead-finder')) return { title: 'Lead Finder', module: 'lead-finder' };

  // 5. Master Inbox / Mail (All Messages)
  if (
    p === '/inbox' || 
    p === '/inbox/all' || 
    p === '/app/inbox' || 
    p === '/mail' || 
    p === '/mail/all' || 
    p === '/app/mail' || 
    p === '/messages' ||
    p === '/messages/all'
  ) {
    return { title: 'All Messages', module: 'inbox' };
  }
  if (p.startsWith('/inbox/unread') || p.startsWith('/mail/unread')) return { title: 'Unread', module: 'inbox' };
  if (p.startsWith('/inbox/interested') || p.startsWith('/mail/interested')) return { title: 'Interested', module: 'inbox' };
  if (p.startsWith('/inbox/meetings') || p.startsWith('/mail/meetings')) return { title: 'Meetings', module: 'inbox' };
  if (p.startsWith('/inbox/archived') || p.startsWith('/mail/archived')) return { title: 'Archived', module: 'inbox' };
  if (p.startsWith('/inbox/labels') || p.startsWith('/mail/labels')) return { title: 'Labels', module: 'inbox' };
  if (
    p.startsWith('/inbox') || 
    p.startsWith('/app/inbox') || 
    p.startsWith('/mail') || 
    p.startsWith('/app/mail') || 
    p.startsWith('/messages')
  ) {
    return { title: 'All Messages', module: 'inbox' };
  }

  // 6. Multi-Channel Campaigns
  if (p === '/campaigns/email' || p === '/app/campaigns/email') {
    return { title: 'Email Sequences', module: 'campaigns' };
  }
  if (p === '/campaigns/linkedin' || p === '/app/campaigns/linkedin') {
    return { title: 'LinkedIn Automations', module: 'campaigns' };
  }
  if (p === '/campaigns/voice' || p === '/app/campaigns/voice' || p === '/campaigns/calls' || p === '/app/campaigns/calls') {
    return { title: 'Voice AI Calling', module: 'campaigns' };
  }
  if (p === '/campaigns' || p === '/campaigns/' || p === '/app/campaigns' || p.startsWith('/campaigns/')) {
    return { title: 'All Campaigns', module: 'campaigns' };
  }

  // 7. Cold Email Outreach & Deliverability
  if (
    p === '/email' ||
    p === '/email/campaigns' ||
    p === '/cold-email' ||
    p === '/app/email' ||
    p === '/app/cold-email'
  ) {
    return { title: 'Email Sequences', module: 'email' };
  }
  if (p.startsWith('/email/sequences')) return { title: 'Sequences', module: 'email' };
  if (p.startsWith('/email/templates')) return { title: 'Templates', module: 'email' };
  if (p.startsWith('/email/leads')) return { title: 'Email Leads', module: 'email' };
  if (p.startsWith('/email/ab-testing')) return { title: 'A/B Testing', module: 'email' };
  if (p.startsWith('/email/mailboxes')) return { title: 'Mailboxes', module: 'email' };
  if (p.startsWith('/email/inboxes')) return { title: 'Email Inboxes', module: 'email' };
  if (p.startsWith('/email/domains') || p.startsWith('/deliverability') || p.startsWith('/app/deliverability')) {
    return { title: 'Domains & Health', module: 'email' };
  }
  if (p.startsWith('/email/warmup')) return { title: 'Warmup', module: 'email' };
  if (p.startsWith('/email/suppression')) return { title: 'Suppression', module: 'email' };
  if (p.startsWith('/email/analytics')) return { title: 'Email Analytics', module: 'email' };
  if (p.startsWith('/email') || p.startsWith('/cold-email') || p.startsWith('/deliverability')) {
    return { title: 'Cold Email', module: 'email' };
  }

  // 7. LinkedIn Safe Automation
  if (p === '/linkedin' || p === '/linkedin/campaigns' || p === '/app/linkedin') {
    return { title: 'LinkedIn Campaigns', module: 'linkedin' };
  }
  if (p.startsWith('/linkedin/automation')) return { title: 'LinkedIn Automation', module: 'linkedin' };
  if (p.startsWith('/linkedin/execution-logs') || p.startsWith('/linkedin/logs')) return { title: 'LinkedIn Logs', module: 'linkedin' };
  if (p.startsWith('/linkedin/accounts')) return { title: 'LinkedIn Accounts', module: 'linkedin' };
  if (p.startsWith('/linkedin/proxy-management') || p.startsWith('/linkedin/proxies')) return { title: 'Proxy Management', module: 'linkedin' };
  if (p.startsWith('/linkedin/account-health') || p.startsWith('/linkedin/health')) return { title: 'Account Health', module: 'linkedin' };
  if (p.startsWith('/linkedin/prospects')) return { title: 'LinkedIn Prospects', module: 'linkedin' };
  if (p.startsWith('/linkedin/connections')) return { title: 'LinkedIn Connections', module: 'linkedin' };
  if (p.startsWith('/linkedin/profile-visits') || p.startsWith('/linkedin/visits')) return { title: 'Profile Visits', module: 'linkedin' };
  if (p.startsWith('/linkedin/messages')) return { title: 'LinkedIn Messages', module: 'linkedin' };
  if (p.startsWith('/linkedin/inmails')) return { title: 'LinkedIn InMails', module: 'linkedin' };
  if (p.startsWith('/linkedin/leads')) return { title: 'LinkedIn Leads', module: 'linkedin' };
  if (p.startsWith('/linkedin/analytics')) return { title: 'LinkedIn Analytics', module: 'linkedin' };
  if (p.startsWith('/linkedin/activity')) return { title: 'LinkedIn Activity', module: 'linkedin' };
  if (p.startsWith('/linkedin') || p.startsWith('/app/linkedin')) return { title: 'LinkedIn', module: 'linkedin' };

  // 8. Calls / Voice SDR
  if (
    p === '/voice-ai' ||
    p === '/voice-ai/call-center' ||
    p === '/calls' ||
    p === '/calls/call-center' ||
    p === '/app/voice-ai' ||
    p === '/app/calls'
  ) {
    return { title: 'Voice SDR', module: 'calls' };
  }
  if (p.includes('/ai-agents')) return { title: 'Voice AI Agents', module: 'calls' };
  if (p.includes('/campaigns')) return { title: 'Voice Campaigns', module: 'calls' };
  if (p.includes('/intent')) return { title: 'Intent Detection', module: 'calls' };
  if (p.includes('/objections')) return { title: 'Objection Handling', module: 'calls' };
  if (p.includes('/history')) return { title: 'Call History', module: 'calls' };
  if (p.includes('/analytics')) return { title: 'Voice Analytics', module: 'calls' };
  if (p.includes('/phone-numbers')) return { title: 'Phone Numbers', module: 'calls' };
  if (p.includes('/knowledge')) return { title: 'Voice Knowledge', module: 'calls' };
  if (p.includes('/crm-sync')) return { title: 'CRM Sync', module: 'calls' };
  if (p.startsWith('/voice-ai') || p.startsWith('/calls') || p.startsWith('/app/voice-ai') || p.startsWith('/app/calls')) {
    return { title: 'Voice SDR', module: 'calls' };
  }

  // 9. Upwork Studio
  if (p === '/upwork/jobs' || p === '/upwork' || p === '/app/upwork') return { title: 'All Jobs', module: 'upwork' };
  if (p.startsWith('/upwork/applications') || p.startsWith('/upwork/interviews') || p.startsWith('/upwork/proposals') || p.startsWith('/upwork/contracts') || p.startsWith('/upwork/earnings')) return { title: 'Work Pipeline', module: 'upwork' };
  if (p.startsWith('/upwork/intelligence') || p.startsWith('/upwork/proposal-intel') || p.startsWith('/upwork/client-intel') || p.startsWith('/upwork/match-score') || p.startsWith('/intelligence')) return { title: 'Profile', module: 'upwork' };
  if (p.startsWith('/upwork/profile')) return { title: 'Profile', module: 'upwork' };
  if (p.startsWith('/upwork') || p.startsWith('/app/upwork') || p.startsWith('/work')) return { title: 'Upwork', module: 'upwork' };

  // 10. Workflows / Flow Builder
  if (p.startsWith('/flow-builder') || p.startsWith('/workflows') || p.startsWith('/app/flow-builder')) return { title: 'Workflows', module: 'workflows' };
  if (p.startsWith('/integrations') || p.startsWith('/app/integrations')) return { title: 'Integrations', module: 'workflows' };
  if (p.startsWith('/api') || p.startsWith('/app/api')) return { title: 'Developer API', module: 'workflows' };

  // 11. Analytics Hub
  if (
    p === '/analytics' ||
    p === '/analytics/overview' ||
    p === '/app/analytics' ||
    p === '/app/analytics/overview' ||
    p === '/platform/analytics'
  ) {
    return { title: 'Analytics', module: 'analytics' };
  }
  if (p.startsWith('/analytics/campaigns') || p.startsWith('/app/analytics/campaigns')) return { title: 'Campaigns Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/revenue') || p.startsWith('/app/analytics/revenue')) return { title: 'Revenue Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/forecast') || p.startsWith('/app/analytics/forecast')) return { title: 'Forecast Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/crm') || p.startsWith('/app/analytics/crm')) return { title: 'CRM Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/email') || p.startsWith('/app/analytics/email')) return { title: 'Email Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/linkedin') || p.startsWith('/app/analytics/linkedin')) return { title: 'LinkedIn Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/voice') || p.startsWith('/app/analytics/voice')) return { title: 'Voice Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/billing') || p.startsWith('/app/analytics/billing')) return { title: 'Billing Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/ai-usage') || p.startsWith('/app/analytics/ai-usage')) return { title: 'AI Usage', module: 'analytics' };
  if (p.startsWith('/analytics/credits') || p.startsWith('/app/analytics/credits')) return { title: 'Credits Analytics', module: 'analytics' };
  if (p.startsWith('/analytics/reports') || p.startsWith('/app/analytics/reports')) return { title: 'Reports', module: 'analytics' };
  if (p.startsWith('/analytics/vip-intelligence') || p.startsWith('/app/analytics/vip-intelligence')) return { title: 'VIP Intelligence', module: 'analytics' };
  if (p.startsWith('/analytics') || p.startsWith('/app/analytics')) return { title: 'Analytics', module: 'analytics' };

  // 12. Workspace
  if (p === '/workspace' || p === '/workspace/overview' || p === '/app/workspace' || p === '/app/workspace/overview' || p === '/admin' || p === '/admin/overview' || p === '/app/admin' || p === '/app/admin/overview') return { title: 'Workspace Dashboard', module: 'workspace' };
  if (p.startsWith('/workspace/people') || p.startsWith('/workspace/users') || p.startsWith('/workspace/teams') || p.startsWith('/workspace/roles') || p.startsWith('/admin/people') || p.startsWith('/admin/users') || p.startsWith('/admin/teams') || p.startsWith('/admin/roles') || p.startsWith('/app/workspace/people') || p.startsWith('/app/admin/people')) return { title: 'People & Roles', module: 'workspace' };
  if (p.startsWith('/workspace/product') || p.startsWith('/workspace/modules') || p.startsWith('/workspace/plans') || p.startsWith('/workspace/bundles') || p.startsWith('/workspace/feature-access') || p.startsWith('/admin/product') || p.startsWith('/admin/modules') || p.startsWith('/admin/plans') || p.startsWith('/app/workspace/product') || p.startsWith('/app/admin/product')) return { title: 'Products & Plans', module: 'workspace' };
  if (p.startsWith('/workspace/assignments') || p.startsWith('/workspace/user-assignments') || p.startsWith('/workspace/team-assignments') || p.startsWith('/workspace/access-overrides') || p.startsWith('/admin/assignments') || p.startsWith('/admin/user-assignments') || p.startsWith('/app/workspace/assignments') || p.startsWith('/app/admin/assignments')) return { title: 'User & Team Assignments', module: 'workspace' };
  if (p.startsWith('/workspace/billing') || p.startsWith('/workspace/subscriptions') || p.startsWith('/workspace/payments') || p.startsWith('/workspace/invoices') || p.startsWith('/workspace/credits') || p.startsWith('/workspace/coupons') || p.startsWith('/admin/billing') || p.startsWith('/admin/subscriptions') || p.startsWith('/app/workspace/billing') || p.startsWith('/app/admin/billing')) return { title: 'Subscriptions & Billing', module: 'workspace' };
  if (p.startsWith('/workspace/usage') || p.startsWith('/workspace/usage-overview') || p.startsWith('/workspace/resource-limits') || p.startsWith('/workspace/credit-usage') || p.startsWith('/admin/usage') || p.startsWith('/app/workspace/usage') || p.startsWith('/app/admin/usage')) return { title: 'Usage & Quotas', module: 'workspace' };
  if (p.startsWith('/workspace/platform') || p.startsWith('/workspace/integrations') || p.startsWith('/workspace/navigation') || p.startsWith('/workspace/tricksy') || p.startsWith('/workspace/trixie') || p.startsWith('/admin/platform') || p.startsWith('/app/workspace/platform') || p.startsWith('/app/admin/platform')) return { title: 'Platform & AI', module: 'workspace' };
  if (p.startsWith('/workspace/security') || p.startsWith('/workspace/sessions') || p.startsWith('/workspace/audit') || p.startsWith('/admin/security') || p.startsWith('/app/workspace/security') || p.startsWith('/app/admin/security')) return { title: 'Security & Audit', module: 'workspace' };
  if (p.startsWith('/workspace/configuration') || p.startsWith('/workspace/notifications') || p.startsWith('/workspace/branding') || p.startsWith('/workspace/settings') || p.startsWith('/workspace/global-settings') || p.startsWith('/admin/configuration') || p.startsWith('/app/workspace/configuration') || p.startsWith('/app/admin/configuration')) return { title: 'Configuration & Settings', module: 'workspace' };
  if (p.startsWith('/workspace') || p.startsWith('/app/workspace') || p.startsWith('/admin') || p.startsWith('/app/admin')) return { title: 'Workspace', module: 'workspace' };

  // 13. Settings
  if (p === '/settings' || p === '/settings/overview' || p === '/app/settings' || p === '/app/settings/overview') return { title: 'Settings', module: 'settings' };
  if (p.startsWith('/settings/profile') || p.startsWith('/app/settings/profile')) return { title: 'Profile', module: 'settings' };
  if (p.startsWith('/settings/account') || p.startsWith('/app/settings/account')) return { title: 'Account', module: 'settings' };
  if (p.startsWith('/settings/security') || p.startsWith('/app/settings/security')) return { title: 'Security', module: 'settings' };
  if (p.startsWith('/settings/workspace') || p.startsWith('/app/settings/workspace') || p.startsWith('/settings/organization') || p.startsWith('/app/settings/organization') || p.startsWith('/settings/team') || p.startsWith('/app/settings/team')) return { title: 'Workspace', module: 'settings' };
  if (p.startsWith('/settings/billing') || p.startsWith('/app/settings/billing')) return { title: 'Billing & Credits', module: 'settings' };
  if (p.startsWith('/settings/connected-accounts') || p.startsWith('/settings/channels') || p.startsWith('/app/settings/connected-accounts')) return { title: 'Connected Accounts', module: 'settings' };
  if (p.startsWith('/settings/sending-inboxes') || p.startsWith('/settings/inboxes') || p.startsWith('/app/settings/sending-inboxes')) return { title: 'Sending Inboxes', module: 'settings' };
  if (p.startsWith('/settings/autonomous-agents') || p.startsWith('/settings/agents') || p.startsWith('/app/settings/autonomous-agents')) return { title: 'Autonomous Agents', module: 'settings' };
  if (p.startsWith('/settings/ai-assistant') || p.startsWith('/app/settings/ai-assistant')) return { title: 'AI Assistant', module: 'settings' };
  if (p.startsWith('/settings/developer-api') || p.startsWith('/settings/api') || p.startsWith('/app/settings/developer-api')) return { title: 'Developer API', module: 'settings' };
  if (p.startsWith('/settings/notifications') || p.startsWith('/app/settings/notifications')) return { title: 'Notifications', module: 'settings' };
  if (p.startsWith('/settings/appearance') || p.startsWith('/app/settings/appearance')) return { title: 'Appearance', module: 'settings' };
  if (p.startsWith('/settings/mouse-cursor') || p.startsWith('/settings/cursor') || p.startsWith('/app/settings/mouse-cursor')) return { title: 'Mouse Cursor', module: 'settings' };
  if (p.startsWith('/settings/compliance') || p.startsWith('/settings/legal') || p.startsWith('/app/settings/compliance')) return { title: 'Compliance & Legal', module: 'settings' };
  if (p.startsWith('/settings/suppression') || p.startsWith('/app/settings/suppression')) return { title: 'Suppression List', module: 'settings' };
  if (p.startsWith('/settings/enterprise') || p.startsWith('/app/settings/enterprise')) return { title: 'Enterprise & Governance', module: 'settings' };
  if (p.startsWith('/settings/audit') || p.startsWith('/app/settings/audit')) return { title: 'Audit Center', module: 'settings' };
  if (p.startsWith('/settings') || p.startsWith('/app/settings')) return { title: 'Settings', module: 'settings' };

  // Fallback
  const segment = pathname.replace(/^\//, '').split('/')[0] || 'copilot';
  const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  return { title: title || 'Tricksy AI', module: segment || 'copilot' };
}

const GlobalTabsContext = createContext<GlobalTabsContextType | undefined>(undefined);

export const GlobalTabsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<GlobalTab[]>(() => {
    try {
      const saved = localStorage.getItem(TABS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const tabMap = new Map<string, GlobalTab>();
          tabMap.set(DEFAULT_HOME_TAB.id, DEFAULT_HOME_TAB);
          parsed.forEach((t) => {
            if (t && t.id) {
              const meta = getRouteMetadata(t.path || t.id);
              const canonicalId = t.id.startsWith('/') ? meta.module : t.id;
              tabMap.set(canonicalId, {
                ...t,
                id: canonicalId,
                module: t.module || meta.module,
                closable: canonicalId !== DEFAULT_HOME_TAB.id,
              });
            }
          });
          return Array.from(tabMap.values());
        }
      }
    } catch (e) {
      console.warn('Failed to parse global tabs from storage', e);
    }
    return [DEFAULT_HOME_TAB];
  });

  const [activeTabId, setActiveTabId] = useState<string>(() => {
    const meta = getRouteMetadata(location.pathname);
    return meta.module || DEFAULT_HOME_TAB.id;
  });

  // Save tabs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs));
    } catch (e) {
      console.warn('Failed to save global tabs to storage', e);
    }
  }, [tabs]);

  // Save activeTab to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTabId);
    } catch (e) {
      console.warn('Failed to save active global tab to storage', e);
    }
  }, [activeTabId]);

  // Synchronize tabs with URL pathname
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/login' || pathname === '/signup') return;

    const meta = getRouteMetadata(pathname);
    const tabId = meta.module;

    setTabs((prev) => {
      const existingIndex = prev.findIndex((t) => t.id === tabId);
      if (existingIndex !== -1) {
        // Update existing tab path and title in-place without duplicating
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          path: pathname,
          title: meta.title,
        };
        return updated;
      }

      // New module tab
      const newTab: GlobalTab = {
        id: tabId,
        title: meta.title,
        path: pathname,
        module: meta.module,
        closable: tabId !== DEFAULT_HOME_TAB.id,
      };
      return [...prev, newTab];
    });

    setActiveTabId(tabId);
  }, [location.pathname]);

  const openTab = useCallback((tab: Omit<GlobalTab, 'closable'> & { closable?: boolean }) => {
    const meta = getRouteMetadata(tab.path);
    const targetId = tab.id || meta.module;

    setTabs((prev) => {
      const existingIndex = prev.findIndex((t) => t.id === targetId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          path: tab.path,
          title: tab.title || meta.title,
        };
        return updated;
      }

      const newTab: GlobalTab = {
        ...tab,
        id: targetId,
        title: tab.title || meta.title,
        module: tab.module || meta.module,
        closable: targetId !== DEFAULT_HOME_TAB.id,
      };
      return [...prev, newTab];
    });

    setActiveTabId(targetId);
    navigate(tab.path);
  }, [navigate]);

  const closeTab = useCallback((tabId: string) => {
    if (tabId === DEFAULT_HOME_TAB.id) return;

    setTabs((prev) => {
      const closedIndex = prev.findIndex((t) => t.id === tabId);
      if (closedIndex === -1) return prev;

      const nextTabs = prev.filter((t) => t.id !== tabId);
      const safeTabs = nextTabs.length > 0 ? nextTabs : [DEFAULT_HOME_TAB];

      // Chrome/Opera style: If active tab is closed, activate right neighbor or left neighbor
      if (activeTabId === tabId) {
        const nextActive =
          nextTabs[closedIndex] || // right neighbor sliding into closed position
          nextTabs[closedIndex - 1] || // left neighbor if closed the last tab
          safeTabs[0];

        setActiveTabId(nextActive.id);
        navigate(nextActive.path);
      }

      return safeTabs;
    });
  }, [activeTabId, navigate]);

  const closeAllTabs = useCallback(() => {
    setTabs([DEFAULT_HOME_TAB]);
    setActiveTabId(DEFAULT_HOME_TAB.id);
    navigate(DEFAULT_HOME_TAB.path);
  }, [navigate]);

  const closeOtherTabs = useCallback((targetTabId: string) => {
    setTabs((prev) => {
      const target = prev.find((t) => t.id === targetTabId) || DEFAULT_HOME_TAB;
      const homeTab = prev.find((t) => t.id === DEFAULT_HOME_TAB.id) || DEFAULT_HOME_TAB;
      const result = target.id === DEFAULT_HOME_TAB.id ? [DEFAULT_HOME_TAB] : [homeTab, target];
      setActiveTabId(target.id);
      navigate(target.path);
      return result;
    });
  }, [navigate]);

  return (
    <GlobalTabsContext.Provider
      value={{
        tabs,
        activeTabId,
        openTab,
        closeTab,
        closeAllTabs,
        closeOtherTabs,
      }}
    >
      {children}
    </GlobalTabsContext.Provider>
  );
};

export const useGlobalTabs = () => {
  const context = useContext(GlobalTabsContext);
  if (!context) {
    throw new Error('useGlobalTabs must be used within a GlobalTabsProvider');
  }
  return context;
};
