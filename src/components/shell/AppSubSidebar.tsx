import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Coins,
  Headphones, 
  Bot, 
  PhoneForwarded, 
  History, 
  Hash, 
  BarChart3, 
  Database,
  Layers,
  Users,
  UserCheck,
  Building2,
  Briefcase,
  GitPullRequest,
  Calendar,
  CheckSquare,
  Inbox,
  Send,
  ListOrdered,
  Flame,
  ShieldCheck,
  Linkedin,
  Clock,
  MessageSquare,
  Activity,
  Settings,
  Search,
  Bookmark,
  List,
  UploadCloud,
  Zap,
  Mail,
  PhoneCall,
  Workflow,
  GitBranch,
  LayoutTemplate,
  Play,
  Sliders,
  DollarSign,
  User,
  Building,
  CreditCard,
  Link as LinkIcon,
  Palette,
  Bell,
  Shield,
  LayoutDashboard,
  Package,
  BarChart2,
  Cpu,
  Lock,
  SlidersHorizontal,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { useAuth } from '../../context/AuthContext';
import { SubSidebarSection, SubSidebarItemConfig } from './SubSidebarSection';
import { SubSidebarItem } from './SubSidebarItem';

export interface SubSidebarGroup {
  heading: string;
  items: SubSidebarItemConfig[];
}

export interface SubSidebarConfig {
  sectionTitle: string;
  groups: SubSidebarGroup[];
}

export const SUB_SIDEBAR_CONFIGS: Record<string, SubSidebarConfig> = {
  copilot: {
    sectionTitle: 'Tricksy AI',
    groups: [
      {
        heading: 'AI ASSISTANT',
        items: [
          { title: 'Chat & Tricksy AI', href: '/' },
          { title: 'Actions', href: '/copilot/actions' },
          { title: 'Prompts Library', href: '/copilot/prompts' },
          { title: 'Knowledge Base', href: '/copilot/kb' },
        ],
      },
      {
        heading: 'AGENTS',
        items: [
          { title: 'Autonomous SDR', href: '/ai-agents/sdr-outreach' },
          { title: 'LinkedIn Agent', href: '/ai-agents/linkedin-safe-bot' },
          { title: 'Upwork Bidder', href: '/ai-agents/upwork-bidding' },
          { title: 'Research Agent', href: '/ai-agents/deepcontext-researcher' },
        ],
      },
      {
        heading: 'EXECUTION',
        items: [
          { title: 'Active Runs', href: '/ai-agents/execution-runs' },
          { title: 'Task Backlog', href: '/ai-agents/task-backlog' },
          { title: 'Telemetry', href: '/ai-agents/performance' },
        ],
      },
    ],
  },
  agents: {
    sectionTitle: 'Agents',
    groups: [
      {
        heading: 'OVERVIEW',
        items: [
          { title: 'Workforce Overview', href: '/ai-agents' },
          { title: 'Approvals Queue', href: '/ai-agents/approvals' },
        ],
      },
      {
        heading: 'AUTONOMOUS WORKFORCE',
        items: [
          { title: 'SDR Outreach Agent', href: '/ai-agents/sdr-outreach' },
          { title: 'LinkedIn Safe Bot', href: '/ai-agents/linkedin-safe-bot' },
          { title: 'Upwork Bidding Agent', href: '/ai-agents/upwork-bidding' },
          { title: 'DeepContext Researcher', href: '/ai-agents/deepcontext-researcher' },
        ],
      },
      {
        heading: 'MONITORING & LOGS',
        items: [
          { title: 'Execution Runs', href: '/ai-agents/execution-runs' },
          { title: 'Task Backlog', href: '/ai-agents/task-backlog' },
          { title: 'Performance Analytics', href: '/ai-agents/performance' },
          { title: 'Activity Audit Logs', href: '/ai-agents/audit-logs' },
        ],
      },
    ],
  },
  crm: {
    sectionTitle: 'CRM',
    groups: [
      {
        heading: 'SALES WORKFLOW',
        items: [
          { title: 'Overview', href: '/crm/overview' },
          { title: 'Leads', href: '/crm/leads' },
          { title: 'Contacts', href: '/crm/contacts' },
          { title: 'Companies', href: '/crm/companies' },
          { title: 'Deals', href: '/crm/deals' },
          { title: 'Pipeline', href: '/crm/pipeline' },
          { title: 'Activities', href: '/crm/activities' },
          { title: 'Tasks & Reminders', href: '/crm/reminders' },
          { title: 'Reports', href: '/crm/reports' },
        ],
      },
    ],
  },
  'lead-finder': {
    sectionTitle: 'Lead Finder',
    groups: [
      {
        heading: 'SEARCH & DISCOVERY',
        items: [
          { title: 'Find Leads', href: '/lead-finder/find-people' },
          { title: 'Saved Searches', href: '/lead-finder/saved-searches' },
          { title: 'Prospect Lists', href: '/lead-finder/prospect-lists' },
          { title: 'Imports & History', href: '/lead-finder/imports' },
        ],
      },
    ],
  },
  campaigns: {
    sectionTitle: 'Campaigns',
    groups: [
      {
        heading: 'MULTI-CHANNEL OUTBOUND',
        items: [
          { title: 'All Campaigns', href: '/campaigns' },
          { title: 'Email Sequences', href: '/email/campaigns' },
          { title: 'LinkedIn Automations', href: '/linkedin/campaigns' },
          { title: 'Voice AI Calling', href: '/voice-ai/campaigns' },
        ],
      },
    ],
  },
  inbox: {
    sectionTitle: 'Master Inbox',
    groups: [
      {
        heading: 'CHANNELS',
        items: [
          { title: 'All Messages', href: '/inbox/all' },
          { title: 'Unread', href: '/inbox/unread' },
          { title: 'Interested', href: '/inbox/interested' },
          { title: 'Meetings', href: '/inbox/meetings' },
        ],
      },
      {
        heading: 'SYSTEM',
        items: [
          { title: 'Archived', href: '/inbox/archived' },
          { title: 'Labels', href: '/inbox/labels' },
        ],
      },
    ],
  },
  email: {
    sectionTitle: 'Email',
    groups: [
      {
        heading: 'OUTREACH & CAMPAIGNS',
        items: [
          { title: 'Mailboxes', href: '/email/mailboxes' },
          { title: 'Campaigns', href: '/email/campaigns' },
          { title: 'Sequences', href: '/email/sequences' },
        ],
      },
      {
        heading: 'DELIVERABILITY & INTEL',
        items: [
          { title: 'Warmup', href: '/email/warmup' },
          { title: 'Analytics', href: '/email/analytics' },
          { title: 'Deliverability', href: '/email/deliverability' },
        ],
      },
    ],
  },
  linkedin: {
    sectionTitle: 'LinkedIn',
    groups: [
      {
        heading: 'OUTREACH & SEQUENCES',
        items: [
          { title: 'Overview', href: '/linkedin/overview' },
          { title: 'Accounts', href: '/linkedin/accounts' },
          { title: 'Sequences', href: '/linkedin/campaigns' },
          { title: 'Outreach Queue', href: '/linkedin/queue' },
          { title: 'Inbox', href: '/linkedin/messages' },
          { title: 'Activity', href: '/linkedin/activity' },
          { title: 'Analytics', href: '/linkedin/analytics' },
          { title: 'Settings', href: '/linkedin/settings' },
        ],
      },
    ],
  },
  calls: {
    sectionTitle: 'CALLS',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Call Console & Live Center', href: '/voice-ai/call-center', icon: Headphones },
          { title: 'Voice Agents & Prompts', href: '/voice-ai/ai-agents', icon: Bot },
          { title: 'Voice Campaigns', href: '/voice-ai/campaigns', icon: PhoneForwarded },
          { title: 'Call History & Recordings', href: '/voice-ai/history', icon: History },
          { title: 'Phone Numbers', href: '/voice-ai/phone-numbers', icon: Hash },
          { title: 'Analytics & Transcripts', href: '/voice-ai/analytics', icon: BarChart3 },
          { title: 'CRM Sync & Knowledge', href: '/voice-ai/crm-sync', icon: Database },
        ],
      },
    ],
  },
  upwork: {
    sectionTitle: 'UPWORK',
    groups: [
      {
        heading: 'JOBS',
        items: [
          { title: 'All Jobs', href: '/upwork/jobs', icon: Briefcase },
          { title: 'Job Alerts', href: '/upwork/job-alerts', icon: Bell },
        ],
      },
      {
        heading: 'WORK',
        items: [
          { title: 'Applications', href: '/upwork/applications', icon: Send },
          { title: 'Interviews', href: '/upwork/interviews', icon: Calendar },
          { title: 'Proposals', href: '/upwork/proposals', icon: BookOpen },
          { title: 'Contracts', href: '/upwork/contracts', icon: ShieldCheck },
          { title: 'Earnings', href: '/upwork/earnings', icon: DollarSign },
        ],
      },
      {
        heading: 'INBOX',
        items: [
          { title: 'Messages', href: '/upwork/messages', icon: MessageSquare },
        ],
      },
      {
        heading: 'INTELLIGENCE',
        items: [
          { title: 'Intelligence', href: '/upwork/intelligence', icon: Sparkles },
        ],
      },
      {
        heading: 'AUTOMATION',
        items: [
          { title: 'Sequences', href: '/upwork/sequences', icon: Workflow },
          { title: 'Automation Rules', href: '/upwork/automation-rules', icon: SlidersHorizontal },
          { title: 'Templates', href: '/upwork/templates', icon: LayoutTemplate },
        ],
      },
      {
        heading: 'ANALYTICS',
        items: [
          { title: 'Analytics', href: '/upwork/analytics', icon: BarChart3 },
        ],
      },
      {
        heading: 'PROFILE',
        items: [
          { title: 'Profile', href: '/upwork/profile', icon: User },
        ],
      },
    ],
  },
  workflows: {
    sectionTitle: 'Workflows',
    groups: [
      {
        heading: 'AUTOMATION ENGINE',
        items: [
          { title: 'Overview', href: '/flow-builder/overview' },
          { title: 'Visual Flows', href: '/flow-builder/visual-flows' },
          { title: 'Templates', href: '/flow-builder/templates' },
          { title: 'Runs', href: '/flow-builder/runs' },
          { title: 'Schedules', href: '/flow-builder/schedules' },
          { title: 'Variables & Integrations', href: '/flow-builder/variables' },
        ],
      },
    ],
  },
  analytics: {
    sectionTitle: 'Analytics & Revenue',
    groups: [
      {
        heading: 'EXECUTIVE INTELLIGENCE',
        items: [
          { title: 'Overview', href: '/analytics' },
          { title: 'Campaigns', href: '/analytics/campaigns' },
          { title: 'Email', href: '/analytics/email' },
          { title: 'LinkedIn', href: '/analytics/linkedin' },
          { title: 'Calling', href: '/analytics/voice' },
          { title: 'CRM', href: '/analytics/crm' },
          { title: 'Revenue', href: '/analytics/revenue' },
        ],
      },
    ],
  },
  admin: {
    sectionTitle: 'Admin Panel',
    groups: [
      {
        heading: 'ENTERPRISE ADMINISTRATION',
        items: [
          { title: 'Dashboard', href: '/admin/overview' },
          { title: 'People & Roles', href: '/admin/users' },
          { title: 'Products & Plans', href: '/admin/plans' },
          { title: 'User & Team Assignments', href: '/admin/user-assignments' },
          { title: 'Subscriptions & Billing', href: '/admin/subscriptions' },
          { title: 'Usage & Quotas', href: '/admin/usage-overview' },
          { title: 'Platform & AI', href: '/admin/integrations' },
          { title: 'Security & Audit', href: '/admin/audit-center' },
          { title: 'Configuration & Settings', href: '/admin/global-settings' },
        ],
      },
    ],
  },
  settings: {
    sectionTitle: 'Settings',
    groups: [
      {
        heading: 'PERSONAL & WORKSPACE',
        items: [
          { title: 'Profile', href: '/settings/profile' },
          { title: 'Workspace', href: '/settings/organization' },
          { title: 'Team', href: '/settings/team' },
          { title: 'Security', href: '/settings/security' },
        ],
      },
      {
        heading: 'PLATFORM & SYSTEM',
        items: [
          { title: 'Appearance & Theme', href: '/settings/appearance' },
          { title: 'Integrations & Accounts', href: '/settings/connected-accounts' },
          { title: 'Notifications', href: '/settings/notifications' },
          { title: 'Billing & Plans', href: '/settings/billing-credits' },
          { title: 'API & Developer', href: '/settings/developer-api' },
        ],
      },
    ],
  },
};

export function checkSubItemActive(itemHref: string, currentPath: string): boolean {
  const p = currentPath.toLowerCase().replace(/\/$/, '') || '/';
  const h = itemHref.toLowerCase().replace(/\/$/, '') || '/';

  // 1. Exact match
  if (p === h) return true;

  // 2. Co-Pilot / Root
  if (h === '/' && (p === '' || p === '/' || p === '/copilot' || p === '/dashboard' || p === '/command-center' || p === '/app/copilot' || p === '/app/dashboard')) return true;

  // 3. Upwork Navigation Matching (Clean Single-Active Matching across Restructured Items)
  if (h === '/upwork/jobs' && (
    p === '/upwork' || p === '/upwork/jobs' || p === '/app/upwork' || p === '/app/upwork/jobs' ||
    p === '/upwork/saved-jobs' || p === '/app/upwork/saved-jobs'
  )) return true;
  if (h === '/upwork/job-alerts' && (
    p === '/upwork/job-alerts' || p === '/upwork/alerts' || p === '/app/upwork/job-alerts' || p === '/app/upwork/alerts'
  )) return true;
  if (h === '/upwork/applications' && (
    p === '/upwork/applications' || p === '/upwork/submitted' || p === '/upwork/follow-ups' ||
    p === '/app/upwork/applications' || p === '/app/upwork/submitted' || p === '/app/upwork/follow-ups'
  )) return true;
  if (h === '/upwork/interviews' && (
    p === '/upwork/interviews' || p === '/app/upwork/interviews'
  )) return true;
  if (h === '/upwork/proposals' && (
    p === '/upwork/proposals' || p === '/app/upwork/proposals' ||
    p === '/upwork/proposal-drafts' || p === '/upwork/drafts' || p === '/app/upwork/proposal-drafts'
  )) return true;
  if (h === '/upwork/contracts' && (
    p === '/upwork/contracts' || p === '/app/upwork/contracts'
  )) return true;
  if (h === '/upwork/earnings' && (
    p === '/upwork/earnings' || p === '/app/upwork/earnings'
  )) return true;
  if (h === '/upwork/messages' && (
    p === '/upwork/messages' || p === '/app/upwork/messages' ||
    p === '/upwork/replies' || p === '/app/upwork/replies' ||
    p === '/upwork/conversations' || p === '/upwork/labels' || p === '/app/upwork/conversations'
  )) return true;
  if (h === '/upwork/intelligence' && (
    p === '/upwork/intelligence' || p === '/app/upwork/intelligence' ||
    p === '/upwork/job-intel' || p === '/upwork/job-intelligence' || p === '/app/upwork/job-intel' ||
    p === '/upwork/proposal-intel' || p === '/upwork/proposal-intelligence' || p === '/app/upwork/proposal-intel' ||
    p === '/upwork/client-intel' || p === '/upwork/client-intelligence' || p === '/upwork/clients' || p === '/app/upwork/client-intel' ||
    p === '/upwork/match-score' || p === '/app/upwork/match-score'
  )) return true;
  if (h === '/upwork/sequences' && (
    p === '/upwork/sequences' || p === '/app/upwork/sequences'
  )) return true;
  if (h === '/upwork/automation-rules' && (
    p === '/upwork/automation-rules' || p === '/upwork/automation' || p === '/upwork/rules' || p === '/app/upwork/automation-rules' ||
    p === '/upwork/logs' || p === '/upwork/execution-logs' || p === '/app/upwork/logs'
  )) return true;
  if (h === '/upwork/templates' && (
    p === '/upwork/templates' || p === '/app/upwork/templates'
  )) return true;
  if (h === '/upwork/analytics' && (
    p === '/upwork/analytics' || p === '/upwork/performance' || p === '/upwork/revenue' || p === '/upwork/analytics-revenue' || p === '/app/upwork/analytics'
  )) return true;
  if (h === '/upwork/profile' && (
    p === '/upwork/profile' || p === '/upwork/accounts' || p === '/app/upwork/profile'
  )) return true;

  // 4. Workflows / Flow Builder Navigation Matching
  if ((h === '/flow-builder/visual-flows' || h === '/flow-builder') && (
    p === '/flow-builder' || p === '/workflows' || p === '/flow-builder/visual-flows' || 
    p === '/flow-builder/triggers' || p === '/flow-builder/actions' || p === '/flow-builder/conditions' || 
    p === '/flow-builder/builder' || p === '/flow-builder/overview' ||
    p === '/app/flow-builder' || p === '/app/workflows' || p === '/app/flow-builder/visual-flows' || 
    p === '/workflows/visual-flows' || p === '/app/workflows/visual-flows'
  )) return true;
  if (h === '/flow-builder/templates' && (p === '/flow-builder/templates' || p === '/app/flow-builder/templates' || p === '/workflows/templates' || p === '/app/workflows/templates')) return true;
  if (h === '/flow-builder/runs' && (
    p === '/flow-builder/runs' || p === '/flow-builder/history' || p === '/flow-builder/logs' || p === '/flow-builder/failed-runs' ||
    p === '/app/flow-builder/runs' || p === '/app/flow-builder/history' || p === '/app/flow-builder/logs' || p === '/app/flow-builder/failed-runs' ||
    p === '/workflows/runs' || p === '/workflows/history' || p === '/workflows/logs' || p === '/workflows/failed-runs' ||
    p === '/app/workflows/runs' || p === '/app/workflows/history' || p === '/app/workflows/logs' || p === '/app/workflows/failed-runs'
  )) return true;
  if (h === '/flow-builder/schedules' && (p === '/flow-builder/schedules' || p === '/app/flow-builder/schedules' || p === '/workflows/schedules' || p === '/app/workflows/schedules')) return true;
  if (h === '/flow-builder/variables' && (
    p === '/flow-builder/variables' || p === '/flow-builder/data' || p === '/flow-builder/integrations' || p === '/integrations' ||
    p === '/app/flow-builder/variables' || p === '/app/flow-builder/data' || p === '/app/flow-builder/integrations' || p === '/app/integrations' ||
    p === '/workflows/variables' || p === '/workflows/data' || p === '/workflows/integrations' ||
    p === '/app/workflows/variables' || p === '/app/workflows/data' || p === '/app/workflows/integrations'
  )) return true;
  if (h === '/flow-builder/saved-components' && (p === '/flow-builder/saved-components' || p === '/app/flow-builder/saved-components' || p === '/workflows/saved-components' || p === '/app/workflows/saved-components')) return true;

  // 5. CRM
  if (h === '/crm/overview' && (p === '/crm' || p === '/crm/overview' || p === '/app/crm' || p === '/app/crm/overview')) return true;
  if (h === '/crm/leads' && (p === '/crm/leads' || p === '/leads' || p === '/prospects' || p === '/app/crm/leads')) return true;
  if (h === '/crm/contacts' && (p === '/crm/contacts' || p.startsWith('/crm/contacts/') || p === '/app/crm/contacts')) return true;
  if (h === '/crm/companies' && (p === '/crm/companies' || p === '/companies' || p === '/accounts' || p === '/app/companies' || p === '/app/crm/companies')) return true;
  if (h === '/crm/deals' && (p === '/crm/deals' || p.startsWith('/crm/deals/') || p === '/app/crm/deals')) return true;
  if (h === '/crm/pipeline' && (p === '/crm/pipeline' || p.startsWith('/crm/pipeline/') || p === '/app/crm/pipeline')) return true;
  if (h === '/crm/activities' && (p === '/crm/activities' || p.startsWith('/crm/activities/') || p === '/app/crm/activities')) return true;
  if (h === '/crm/reminders' && (p === '/crm/reminders' || p.startsWith('/crm/reminders/') || p === '/crm/tasks' || p === '/app/crm/reminders')) return true;
  if (h === '/crm/reports' && (p === '/crm/reports' || p.startsWith('/crm/reports/') || p === '/crm/contracts' || p === '/app/crm/reports')) return true;

  // 6. Lead Finder
  if (h === '/lead-finder/find-people' && (p === '/lead-finder' || p === '/lead-finder/find-people' || p === '/app/lead-finder' || p === '/app/lead-finder/find-people' || p === '/lead-finder/overview')) return true;
  if (h === '/lead-finder/saved-searches' && (p === '/lead-finder/saved-searches' || p.startsWith('/lead-finder/saved-searches/') || p === '/app/lead-finder/saved-searches')) return true;
  if (h === '/lead-finder/prospect-lists' && (p === '/lead-finder/prospect-lists' || p.startsWith('/lead-finder/prospect-lists/') || p === '/app/lead-finder/prospect-lists' || p === '/lead-finder/my-leads' || p === '/app/lead-finder/my-leads')) return true;
  if (h === '/lead-finder/imports' && (p === '/lead-finder/imports' || p.startsWith('/lead-finder/imports/') || p === '/app/lead-finder/imports' || p === '/lead-finder/search-history' || p.startsWith('/lead-finder/search-history/'))) return true;

  // 7. Email
  if (h === '/email/mailboxes' && (p === '/email/mailboxes' || p.startsWith('/email/mailboxes/') || p === '/email/inboxes' || p.startsWith('/email/inboxes/'))) return true;
  if (h === '/email/campaigns' && (p === '/email' || p === '/cold-email' || p === '/campaigns' || p === '/email/campaigns' || p === '/app/email' || p === '/app/cold-email' || p === '/app/campaigns' || p === '/email/overview')) return true;
  if (h === '/email/sequences' && (p === '/email/sequences' || p.startsWith('/email/sequences/') || p === '/email/templates')) return true;
  if (h === '/email/warmup' && (p === '/email/warmup' || p === '/email/suppression' || p.startsWith('/email/warmup/'))) return true;
  if (h === '/email/analytics' && (p === '/email/analytics' || p.startsWith('/email/analytics/'))) return true;
  if (h === '/email/deliverability' && (p === '/email/deliverability' || p === '/email/domains' || p === '/email/domains-health' || p === '/email/inbox-placement' || p === '/email/placement' || p === '/deliverability' || p === '/app/deliverability')) return true;

  // 8. AI Agents
  if (h === '/ai-agents' && (p === '/ai-agents' || p === '/agents' || p === '/ai-agents/workforce-overview' || p === '/agents/workforce-overview' || p === '/app/ai-agents' || p === '/app/agents')) return true;
  if (h === '/ai-agents/approvals' && (p === '/ai-agents/approvals' || p === '/agents/approvals' || p === '/app/ai-agents/approvals')) return true;
  if (h === '/ai-agents/sdr-outreach' && (p === '/ai-agents/sdr-outreach' || p === '/agents/sdr-outreach' || p === '/app/ai-agents/sdr-outreach')) return true;
  if (h === '/ai-agents/linkedin-safe-bot' && (p === '/ai-agents/linkedin-safe-bot' || p === '/agents/linkedin-safe-bot' || p === '/app/ai-agents/linkedin-safe-bot')) return true;
  if (h === '/ai-agents/upwork-bidding' && (p === '/ai-agents/upwork-bidding' || p === '/agents/upwork-bidding' || p === '/app/ai-agents/upwork-bidding')) return true;
  if (h === '/ai-agents/deepcontext-researcher' && (p === '/ai-agents/deepcontext-researcher' || p === '/agents/deepcontext-researcher' || p === '/app/ai-agents/deepcontext-researcher')) return true;
  if (h === '/ai-agents/execution-runs' && (p === '/ai-agents/execution-runs' || p === '/agents/execution-runs' || p === '/ai-agents/executions' || p === '/app/ai-agents/execution-runs')) return true;
  if (h === '/ai-agents/task-backlog' && (p === '/ai-agents/task-backlog' || p === '/agents/task-backlog' || p === '/ai-agents/tasks' || p === '/app/ai-agents/task-backlog')) return true;
  if (h === '/ai-agents/performance' && (p === '/ai-agents/performance' || p === '/agents/performance' || p === '/ai-agents/performance-analytics' || p === '/app/ai-agents/performance')) return true;
  if (h === '/ai-agents/audit-logs' && (p === '/ai-agents/audit-logs' || p === '/agents/audit-logs' || p === '/ai-agents/logs' || p === '/app/ai-agents/audit-logs')) return true;

  // 9. Master Inbox
  if (h === '/inbox/all' && (p === '/inbox' || p === '/inbox/all' || p === '/app/inbox')) return true;
  if (h === '/inbox/unread' && (p === '/inbox/unread' || p === '/app/inbox/unread')) return true;
  if (h === '/inbox/interested' && (p === '/inbox/interested' || p === '/app/inbox/interested')) return true;
  if (h === '/inbox/meetings' && (p === '/inbox/meetings' || p === '/app/inbox/meetings')) return true;
  if (h === '/inbox/archived' && (p === '/inbox/archived' || p === '/app/inbox/archived')) return true;
  if (h === '/inbox/labels' && (p === '/inbox/labels' || p === '/app/inbox/labels')) return true;

  // 10. LinkedIn
  if (h === '/linkedin/overview' && (p === '/linkedin/overview' || p === '/app/linkedin/overview')) return true;
  if (h === '/linkedin/accounts' && (p === '/linkedin/accounts' || p.startsWith('/linkedin/accounts/') || p === '/linkedin/proxies')) return true;
  if (h === '/linkedin/campaigns' && (p === '/linkedin' || p === '/linkedin/campaigns' || p === '/app/linkedin' || p === '/linkedin/automation' || p === '/linkedin/sequences')) return true;
  if (h === '/linkedin/messages' && (p === '/linkedin/messages' || p.startsWith('/linkedin/messages/') || p === '/linkedin/inbox')) return true;
  if (h === '/linkedin/activity' && (p === '/linkedin/activity' || p === '/linkedin/execution-logs' || p === '/linkedin/logs')) return true;
  if (h === '/linkedin/analytics' && (p === '/linkedin/analytics' || p.startsWith('/linkedin/analytics/'))) return true;
  if (h === '/linkedin/settings' && (p === '/linkedin/settings' || p.startsWith('/linkedin/settings/'))) return true;

  // 11. Calls / Voice AI
  if (h === '/voice-ai/call-center' && (
    p === '/voice-ai/call-center' || p === '/calls/call-center' ||
    p === '/voice-ai' || p === '/calls' || p === '/voice-ai/overview' || p === '/calls/overview' ||
    p === '/app/voice-ai' || p === '/app/calls'
  )) return true;
  if (h === '/voice-ai/ai-agents' && (p === '/voice-ai/ai-agents' || p === '/calls/ai-agents')) return true;
  if (h === '/voice-ai/campaigns' && (p === '/voice-ai/campaigns' || p === '/calls/campaigns' || p === '/voice-ai/queue' || p === '/calls/queue')) return true;
  if (h === '/voice-ai/history' && (p === '/voice-ai/history' || p === '/calls/history')) return true;
  if (h === '/voice-ai/phone-numbers' && (p === '/voice-ai/phone-numbers' || p === '/calls/phone-numbers')) return true;
  if (h === '/voice-ai/analytics' && (p === '/voice-ai/analytics' || p === '/calls/analytics')) return true;
  if (h === '/voice-ai/crm-sync' && (
    p === '/voice-ai/crm-sync' || p === '/calls/crm-sync' ||
    p === '/voice-ai/knowledge' || p === '/calls/knowledge' ||
    p === '/voice-ai/contacts' || p === '/calls/contacts'
  )) return true;

  // 12. Analytics Hub & Revenue
  if (h === '/analytics' && (p === '/analytics' || p === '/analytics/overview' || p === '/app/analytics' || p === '/app/analytics/overview' || p === '/platform/analytics')) return true;
  if (h === '/analytics/campaigns' && (p === '/analytics/campaigns' || p.startsWith('/analytics/campaigns/'))) return true;
  if (h === '/analytics/email' && (p === '/analytics/email' || p.startsWith('/analytics/email/'))) return true;
  if (h === '/analytics/linkedin' && (p === '/analytics/linkedin' || p.startsWith('/analytics/linkedin/'))) return true;
  if (h === '/analytics/voice' && (p === '/analytics/voice' || p === '/analytics/calling')) return true;
  if (h === '/analytics/crm' && (p === '/analytics/crm' || p.startsWith('/analytics/crm/'))) return true;
  if (h === '/analytics/revenue' && (p === '/analytics/revenue' || p === '/analytics/forecast' || p === '/analytics/billing')) return true;

  // 13. Admin Panel
  if (h === '/admin/overview' && (p === '/admin' || p === '/admin/overview' || p === '/app/admin' || p === '/app/admin/overview')) return true;
  if (h === '/admin/users' && (p === '/admin/users' || p === '/admin/people' || p === '/admin/teams' || p === '/admin/roles' || p === '/app/admin/users')) return true;
  if (h === '/admin/plans' && (p === '/admin/plans' || p === '/admin/product' || p === '/admin/modules' || p === '/admin/bundles' || p === '/admin/feature-access' || p === '/app/admin/plans')) return true;
  if (h === '/admin/user-assignments' && (p === '/admin/user-assignments' || p === '/admin/assignments' || p === '/admin/team-assignments' || p === '/admin/access-overrides' || p === '/app/admin/user-assignments')) return true;
  if (h === '/admin/subscriptions' && (p === '/admin/subscriptions' || p === '/admin/billing' || p === '/admin/payments' || p === '/admin/invoices' || p === '/admin/credits' || p === '/admin/coupons' || p === '/app/admin/subscriptions')) return true;
  if (h === '/admin/usage-overview' && (p === '/admin/usage-overview' || p === '/admin/usage' || p === '/admin/resource-limits' || p === '/admin/credit-usage' || p === '/app/admin/usage-overview')) return true;
  if (h === '/admin/integrations' && (p === '/admin/integrations' || p === '/admin/platform' || p === '/admin/navigation' || p === '/admin/tricksy-ai' || p === '/app/admin/integrations')) return true;
  if (h === '/admin/audit-center' && (p === '/admin/audit-center' || p === '/admin/security' || p === '/admin/sessions' || p === '/app/admin/audit-center')) return true;
  if (h === '/admin/global-settings' && (p === '/admin/global-settings' || p === '/admin/configuration' || p === '/admin/notifications' || p === '/admin/branding' || p === '/app/admin/global-settings')) return true;

  // 14. Settings
  if (h === '/settings/profile' && (p === '/settings/profile' || p === '/settings/account' || p === '/settings/overview' || p === '/settings' || p === '/app/settings')) return true;
  if (h === '/settings/organization' && (p === '/settings/organization' || p === '/app/settings/organization')) return true;
  if (h === '/settings/team' && (p === '/settings/team' || p === '/app/settings/team')) return true;
  if (h === '/settings/billing-credits' && (p === '/settings/billing-credits' || p === '/settings/billing' || p === '/app/settings/billing-credits')) return true;
  if (h === '/settings/connected-accounts' && (p === '/settings/connected-accounts' || p === '/settings/channels' || p === '/settings/sending-inboxes' || p === '/app/settings/connected-accounts')) return true;
  if (h === '/settings/autonomous-agents' && (p === '/settings/autonomous-agents' || p === '/settings/agents' || p === '/settings/ai-assistant' || p === '/settings/developer-api' || p === '/settings/api' || p === '/app/settings/autonomous-agents')) return true;
  if (h === '/settings/appearance' && (p === '/settings/appearance' || p === '/settings/mouse-cursor' || p === '/settings/cursor' || p === '/app/settings/appearance')) return true;
  if (h === '/settings/notifications' && (p === '/settings/notifications' || p === '/app/settings/notifications')) return true;
  if (h === '/settings/compliance-legal' && (p === '/settings/compliance-legal' || p === '/settings/compliance' || p === '/settings/suppression-list' || p === '/settings/enterprise-governance' || p === '/settings/audit-center' || p === '/app/settings/compliance-legal')) return true;


  return false;
}

export interface AppSubSidebarProps {
  activePrimaryId: string;
}

export const AppSubSidebar: React.FC<AppSubSidebarProps> = ({
  activePrimaryId,
}) => {
  const location = useLocation();
  const { currentWorkspace } = useAuth();

  const storageKey = `outtricks_subsidebar_collapsed_${activePrimaryId}`;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setIsCollapsed(saved === 'true');
    } catch {
      // ignore
    }
  }, [storageKey]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(storageKey, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  if (activePrimaryId === 'copilot') {
    return null;
  }

  const config = SUB_SIDEBAR_CONFIGS[activePrimaryId] || SUB_SIDEBAR_CONFIGS.crm;
  const credits = currentWorkspace?.credits ?? 1840;
  const maxCredits = 2500;
  const creditPercent = Math.min(100, Math.round((credits / maxCredits) * 100));

  return (
    <aside
      className={`relative shrink-0 h-screen bg-[#0F0F0F] border-r border-[#242424] flex flex-col justify-between font-sans select-none z-30 transition-all duration-200 ease-in-out ${
        isCollapsed ? 'w-16 p-2' : 'w-56 p-3'
      }`}
    >
      {/* Small Clean Collapse/Expand Button Centered on the Right Border */}
      <button
        type="button"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 w-6 h-6 rounded-full bg-[#161616] border border-[#2E2E2E] hover:border-primary text-slate-400 hover:text-primary hover:bg-[#222222] shadow-md flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 transition-transform" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 transition-transform" />
        )}
      </button>

      {/* Top Header & Navigation Items */}
      <div className="flex-1 overflow-y-auto pr-0.5 no-scrollbar">
        {/* Section Title (only when expanded) */}
        {!isCollapsed && (
          <div className="pt-2 px-2.5 flex items-center justify-between pb-1">
            <span className="text-[13px] font-black text-white uppercase tracking-wider">
              {config.sectionTitle}
            </span>
          </div>
        )}

        {/* Groups and Navigation Items */}
        <div className={isCollapsed ? 'space-y-2 pt-2' : 'space-y-3 pt-1'}>
          {(() => {
            const allItems = config.groups.flatMap((group) => group.items);
            const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';

            // Resolve strictly ONE active item
            const activeItem =
              allItems.find((item) => {
                const h = item.href.toLowerCase().replace(/\/$/, '') || '/';
                return currentPath === h;
              }) ||
              allItems.find((item) => checkSubItemActive(item.href, location.pathname)) ||
              allItems[0];

            return config.groups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {/* Group Heading (only when expanded and heading is non-empty) */}
                {!isCollapsed && group.heading ? (
                  <div className="px-2.5 pt-2 pb-0.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {group.heading}
                  </div>
                ) : null}

                {/* Items in this group */}
                <div className={isCollapsed ? 'space-y-1.5 flex flex-col items-center' : 'space-y-[3px]'}>
                  {group.items.map((item, itemIdx) => (
                    <SubSidebarItem
                      key={itemIdx}
                      title={item.title}
                      href={item.href}
                      badge={item.badge}
                      icon={item.icon}
                      isCollapsed={isCollapsed}
                      isActive={item === activeItem}
                    />
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Bottom Credits Component */}
      {isCollapsed ? (
        <div className="pt-3 border-t border-[#242424] flex justify-center">
          <Tooltip content={`${credits.toLocaleString()} credits left`} placement="right">
            <button
              type="button"
              onClick={() => {
                const event = new CustomEvent('open-credit-topup');
                window.dispatchEvent(event);
              }}
              className="w-10 h-10 rounded-xl bg-[#151515] border border-[#2A2A2A] hover:border-primary text-primary flex items-center justify-center transition-all cursor-pointer group shadow-xs"
              aria-label="Top up credits"
            >
              <Coins className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="pt-3 border-t border-[#242424]">
          <div className="p-3.5 rounded-2xl bg-[#151515] border border-[#2A2A2A] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-white font-mono tracking-tight">
                {credits.toLocaleString()}
              </span>
              <span className="text-[9px] font-extrabold text-[#B5B5B5] uppercase tracking-wider font-mono">
                CREDITS LEFT
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#222222] overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${creditPercent}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              1 credit = 1 contact search query
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  const event = new CustomEvent('open-credit-topup');
                  window.dispatchEvent(event);
                }}
                className="w-full py-1.5 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Top up</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
