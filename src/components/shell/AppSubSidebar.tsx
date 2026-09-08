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
  BookOpen,
  CheckCircle2,
  Key
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { formatWorkspaceName } from '../../lib/workspaceUtils';
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
  people: {
    sectionTitle: 'CRM',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Dashboard', href: '/crm', icon: LayoutDashboard },
          { title: 'Deals & Pipeline', href: '/crm/pipeline', icon: Briefcase },
          { title: 'Companies', href: '/crm/companies', icon: Building2 },
          { title: 'Leads', href: '/crm/leads', icon: UserCheck },
          { title: 'Contacts', href: '/crm/contacts', icon: Users },
          { title: 'Activities', href: '/crm/activities', icon: Activity },
          { title: 'Tasks & Reminders', href: '/crm/reminders', icon: CheckSquare },
        ],
      },
    ],
  },
  crm: {
    sectionTitle: 'CRM',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Dashboard', href: '/crm', icon: LayoutDashboard },
          { title: 'Deals & Pipeline', href: '/crm/pipeline', icon: Briefcase },
          { title: 'Companies', href: '/crm/companies', icon: Building2 },
          { title: 'Leads', href: '/crm/leads', icon: UserCheck },
          { title: 'Contacts', href: '/crm/contacts', icon: Users },
          { title: 'Activities', href: '/crm/activities', icon: Activity },
          { title: 'Tasks & Reminders', href: '/crm/reminders', icon: CheckSquare },
        ],
      },
    ],
  },
  'lead-finder': {
    sectionTitle: 'Lead Finder',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Find Leads', href: '/lead-finder/find-people', icon: Search },
          { title: 'Saved Searches', href: '/lead-finder/saved-searches', icon: Bookmark },
          { title: 'Prospect Lists', href: '/lead-finder/prospect-lists', icon: List },
          { title: 'Imports & History', href: '/lead-finder/imports', icon: UploadCloud },
        ],
      },
    ],
  },
  campaigns: {
    sectionTitle: 'Master Box',
    groups: [
      {
        heading: '',
        items: [
          { title: 'All Campaigns', href: '/campaigns', icon: Zap },
          { title: 'Email Sequences', href: '/campaigns/email', icon: Mail },
          { title: 'LinkedIn Automations', href: '/campaigns/linkedin', icon: Linkedin },
          { title: 'Voice AI Calling', href: '/campaigns/voice', icon: PhoneCall },
        ],
      },
    ],
  },
  inbox: {
    sectionTitle: 'Master Inbox',
    groups: [
      {
        heading: '',
        items: [
          { title: 'All Messages', href: '/inbox/all', icon: Mail },
          { title: 'Unread', href: '/inbox/unread', icon: Inbox },
          { title: 'Interested', href: '/inbox/interested', icon: Flame },
          { title: 'Meetings', href: '/inbox/meetings', icon: Calendar },
        ],
      },
      {
        heading: '',
        items: [
          { title: 'Archived', href: '/inbox/archived', icon: Clock },
          { title: 'Labels', href: '/inbox/labels', icon: Hash },
        ],
      },
    ],
  },
  email: {
    sectionTitle: 'Email',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Mailboxes', href: '/email/mailboxes', icon: Mail },
          { title: 'Campaigns', href: '/email/campaigns', icon: Send },
          { title: 'Sequences', href: '/email/sequences', icon: ListOrdered },
          { title: 'Warmup', href: '/email/warmup', icon: Flame },
          { title: 'Analytics', href: '/email/analytics', icon: BarChart3 },
          { title: 'Deliverability', href: '/email/deliverability', icon: ShieldCheck },
        ],
      },
    ],
  },
  linkedin: {
    sectionTitle: 'LinkedIn',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Overview', href: '/linkedin/overview', icon: BarChart3 },
          { title: 'Campaigns', href: '/linkedin/campaigns', icon: Send },
          { title: 'Accounts', href: '/linkedin/accounts', icon: Users },
          { title: 'Prospects / Leads', href: '/linkedin/prospects', icon: UserCheck },
          { title: 'Analytics', href: '/linkedin/analytics', icon: Activity },
          { title: 'Settings', href: '/linkedin/settings', icon: Settings },
        ],
      },
    ],
  },
  calls: {
    sectionTitle: 'Calls',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Overview', href: '/voice-ai/overview', icon: BarChart3 },
          { title: 'Call Console & Live Center', href: '/voice-ai/call-center', icon: Headphones },
          { title: 'Voice Agents & Prompts', href: '/voice-ai/ai-agents', icon: Bot },
          { title: 'Voice Campaigns', href: '/voice-ai/campaigns', icon: PhoneForwarded },
          { title: 'Call History & Recordings', href: '/voice-ai/history', icon: History },
          { title: 'Phone Numbers', href: '/voice-ai/phone-numbers', icon: Hash },
          { title: 'Analytics & Transcripts', href: '/voice-ai/analytics', icon: Activity },
          { title: 'CRM Sync & Knowledge', href: '/voice-ai/crm-sync', icon: Database },
        ],
      },
    ],
  },
  work: {
    sectionTitle: 'Upwork',
    groups: [
      {
        heading: '',
        items: [
          { title: 'All Jobs', href: '/upwork/jobs', icon: Briefcase },
          { title: 'Work Pipeline', href: '/upwork/applications', icon: Send },
          { title: 'Automation Rules', href: '/upwork/automation-rules', icon: SlidersHorizontal },
          { title: 'Profile', href: '/upwork/profile', icon: User },
        ],
      },
    ],
  },
  upwork: {
    sectionTitle: 'Upwork',
    groups: [
      {
        heading: '',
        items: [
          { title: 'All Jobs', href: '/upwork/jobs', icon: Briefcase },
          { title: 'Work Pipeline', href: '/upwork/applications', icon: Send },
          { title: 'Automation Rules', href: '/upwork/automation-rules', icon: SlidersHorizontal },
          { title: 'Profile', href: '/upwork/profile', icon: User },
        ],
      },
    ],
  },
  intelligence: {
    sectionTitle: 'Upwork',
    groups: [
      {
        heading: '',
        items: [
          { title: 'All Jobs', href: '/upwork/jobs', icon: Briefcase },
          { title: 'Work Pipeline', href: '/upwork/applications', icon: Send },
          { title: 'Automation Rules', href: '/upwork/automation-rules', icon: SlidersHorizontal },
          { title: 'Profile', href: '/upwork/profile', icon: User },
        ],
      },
    ],
  },
  automation: {
    sectionTitle: 'Automation',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Visual Flows', href: '/flow-builder', icon: Workflow },
          { title: 'Automation Rules', href: '/flow-builder/rules', icon: SlidersHorizontal },
          { title: 'Sequences', href: '/flow-builder/sequences', icon: ListOrdered },
          { title: 'Templates', href: '/flow-builder/templates', icon: LayoutTemplate },
          { title: 'Runs & Schedules', href: '/flow-builder/runs', icon: Play },
        ],
      },
    ],
  },
  workflows: {
    sectionTitle: 'Automation',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Visual Flows', href: '/flow-builder', icon: Workflow },
          { title: 'Automation Rules', href: '/flow-builder/rules', icon: SlidersHorizontal },
          { title: 'Sequences', href: '/flow-builder/sequences', icon: ListOrdered },
          { title: 'Templates', href: '/flow-builder/templates', icon: LayoutTemplate },
          { title: 'Runs & Schedules', href: '/flow-builder/runs', icon: Play },
        ],
      },
    ],
  },
  analytics: {
    sectionTitle: 'Analytics',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Overview', href: '/analytics', icon: BarChart3 },
          { title: 'Campaigns', href: '/analytics/campaigns', icon: Send },
          { title: 'Email', href: '/analytics/email', icon: Mail },
          { title: 'LinkedIn', href: '/analytics/linkedin', icon: Linkedin },
          { title: 'Calling', href: '/analytics/voice', icon: PhoneCall },
          { title: 'CRM', href: '/analytics/crm', icon: Layers },
          { title: 'Revenue', href: '/analytics/revenue', icon: DollarSign },
        ],
      },
    ],
  },
  workspace: {
    sectionTitle: 'Workspace',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Dashboard', href: '/workspace/dashboard', icon: LayoutDashboard },
          { title: 'People & Roles', href: '/workspace/people-roles', icon: Users },
          { title: 'Products & Plans', href: '/workspace/products-plans', icon: Package },
          { title: 'User & Team Assignment', href: '/workspace/assignments', icon: UserCheck },
          { title: 'Subscriptions & Billing', href: '/workspace/billing', icon: CreditCard },
          { title: 'Usage & Quotas', href: '/workspace/quotas', icon: BarChart2 },
          { title: 'Platform & AI', href: '/workspace/platform-ai', icon: Cpu },
          { title: 'Security & Audit', href: '/workspace/security', icon: Lock },
          { title: 'Configuration & Settings', href: '/workspace/configuration', icon: Sliders },
        ],
      },
    ],
  },
  admin: {
    sectionTitle: 'Workspace',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Dashboard', href: '/workspace/dashboard', icon: LayoutDashboard },
          { title: 'People & Roles', href: '/workspace/people-roles', icon: Users },
          { title: 'Products & Plans', href: '/workspace/products-plans', icon: Package },
          { title: 'User & Team Assignment', href: '/workspace/assignments', icon: UserCheck },
          { title: 'Subscriptions & Billing', href: '/workspace/billing', icon: CreditCard },
          { title: 'Usage & Quotas', href: '/workspace/quotas', icon: BarChart2 },
          { title: 'Platform & AI', href: '/workspace/platform-ai', icon: Cpu },
          { title: 'Security & Audit', href: '/workspace/security', icon: Lock },
          { title: 'Configuration & Settings', href: '/workspace/configuration', icon: Sliders },
        ],
      },
    ],
  },
  settings: {
    sectionTitle: 'Settings',
    groups: [
      {
        heading: '',
        items: [
          { title: 'Profile', href: '/settings/profile', icon: User },
          { title: 'Workspace', href: '/settings/workspace', icon: Building2 },
          { title: 'Security', href: '/settings/security', icon: Shield },
          { title: 'Appearance & Theme', href: '/settings/appearance', icon: Palette },
          { title: 'Integrations & Accounts', href: '/settings/connected-accounts', icon: LinkIcon },
          { title: 'Notifications', href: '/settings/notifications', icon: Bell },
          { title: 'Billing & Plans', href: '/settings/billing-credits', icon: CreditCard },
          { title: 'API & Developer', href: '/settings/developer-api', icon: Key },
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
    p === '/upwork/interviews' || p === '/upwork/proposals' || p === '/upwork/proposal-drafts' || p === '/upwork/drafts' ||
    p === '/upwork/contracts' || p === '/upwork/earnings' || p === '/upwork/sequences' ||
    p === '/app/upwork/applications' || p === '/app/upwork/submitted' || p === '/app/upwork/follow-ups' ||
    p === '/app/upwork/interviews' || p === '/app/upwork/proposals' || p === '/app/upwork/contracts' || p === '/app/upwork/earnings' ||
    p === '/app/upwork/sequences'
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
    p === '/intelligence' || p === '/app/intelligence'
  )) return true;
  if (h === '/upwork/proposal-intel' && (
    p === '/upwork/proposal-intel' || p === '/upwork/proposal-intelligence' || p === '/app/upwork/proposal-intel' ||
    p === '/intelligence/proposals' || p === '/intelligence/proposal-intel'
  )) return true;
  if (h === '/upwork/client-intel' && (
    p === '/upwork/client-intel' || p === '/upwork/client-intelligence' || p === '/upwork/clients' || p === '/app/upwork/client-intel' ||
    p === '/intelligence/clients' || p === '/intelligence/client-intel'
  )) return true;
  if (h === '/upwork/match-score' && (
    p === '/upwork/match-score' || p === '/app/upwork/match-score' ||
    p === '/intelligence/match-score' || p === '/intelligence/match'
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
    p === '/upwork/profile' || p === '/upwork/accounts' || p === '/app/upwork/profile' ||
    p === '/upwork/intelligence' || p === '/app/upwork/intelligence' ||
    p === '/upwork/job-intel' || p === '/upwork/job-intelligence' || p === '/app/upwork/job-intel' ||
    p === '/upwork/proposal-intel' || p === '/upwork/proposal-intelligence' || p === '/app/upwork/proposal-intel' ||
    p === '/upwork/client-intel' || p === '/upwork/client-intelligence' || p === '/app/upwork/client-intel' ||
    p === '/upwork/match-score' || p === '/app/upwork/match-score' ||
    p === '/intelligence' || p === '/app/intelligence' ||
    p.startsWith('/upwork/profile')
  )) return true;

  // 4. Workflows / Flow Builder Navigation Matching
  if ((h === '/flow-builder/visual-flows' || h === '/flow-builder') && (
    p === '/flow-builder' || p === '/workflows' || p === '/flow-builder/visual-flows' || 
    p === '/flow-builder/triggers' || p === '/flow-builder/actions' || p === '/flow-builder/conditions' || 
    p === '/flow-builder/builder' || p === '/flow-builder/overview' ||
    p === '/app/flow-builder' || p === '/app/workflows' || p === '/app/flow-builder/visual-flows' || 
    p === '/workflows/visual-flows' || p === '/app/workflows/visual-flows'
  )) return true;
  if (h === '/flow-builder/rules' && (
    p === '/flow-builder/rules' || p === '/flow-builder/triggers' || p === '/flow-builder/conditions' || p === '/flow-builder/actions' || p === '/app/flow-builder/rules'
  )) return true;
  if (h === '/flow-builder/sequences' && (
    p === '/flow-builder/sequences' || p === '/app/flow-builder/sequences'
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

  // 4.5 Campaigns
  if (h === '/campaigns' && (p === '/campaigns' || p === '/app/campaigns')) return true;
  if (h === '/campaigns/email' && (p === '/campaigns/email' || p === '/app/campaigns/email')) return true;
  if (h === '/campaigns/linkedin' && (p === '/campaigns/linkedin' || p === '/app/campaigns/linkedin')) return true;
  if (h === '/campaigns/voice' && (p === '/campaigns/voice' || p === '/app/campaigns/voice' || p === '/campaigns/calls' || p === '/app/campaigns/calls')) return true;

  // 5. CRM
  if ((h === '/crm' || h === '/crm/overview' || h === '/crm/dashboard') && (p === '/crm' || p === '/crm/dashboard' || p === '/crm/overview' || p === '/app/crm' || p === '/app/crm/overview' || p === '/people')) return true;
  if (h === '/crm/pipeline' && (p.startsWith('/crm/pipeline') || p.startsWith('/crm/deals') || p === '/app/crm/pipeline')) return true;
  if (h === '/crm/companies' && (p.startsWith('/crm/companies') || p.startsWith('/companies') || p.startsWith('/accounts') || p === '/app/crm/companies')) return true;
  if (h === '/crm/leads' && (p === '/crm/leads' || p.startsWith('/crm/leads/') || p === '/app/crm/leads')) return true;
  if (h === '/crm/contacts' && (p.startsWith('/crm/contacts') || p === '/app/crm/contacts' || p === '/contacts')) return true;
  if (h === '/crm/activities' && (p === '/crm/activities' || p.startsWith('/crm/activities/') || p === '/app/crm/activities')) return true;
  if (h === '/crm/reminders' && (p === '/crm/reminders' || p.startsWith('/crm/reminders/') || p === '/crm/tasks' || p.startsWith('/crm/tasks/') || p === '/app/crm/reminders')) return true;
  if (h === '/crm/reports' && (p === '/crm/reports' || p.startsWith('/crm/reports/') || p === '/crm/contracts' || p === '/app/crm/reports')) return true;

  // 6. Lead Finder
  if (h === '/lead-finder/find-people' && (p === '/lead-finder' || p === '/lead-finder/find-people' || p === '/app/lead-finder' || p === '/app/lead-finder/find-people' || p === '/lead-finder/overview')) return true;
  if (h === '/lead-finder/saved-searches' && (p === '/lead-finder/saved-searches' || p.startsWith('/lead-finder/saved-searches/') || p === '/app/lead-finder/saved-searches')) return true;
  if (h === '/lead-finder/prospect-lists' && (p === '/lead-finder/prospect-lists' || p.startsWith('/lead-finder/prospect-lists/') || p === '/app/lead-finder/prospect-lists' || p === '/lead-finder/my-leads' || p === '/app/lead-finder/my-leads' || p === '/leads' || p === '/prospects' || p === '/app/leads')) return true;
  if (h === '/lead-finder/imports' && (p === '/lead-finder/imports' || p.startsWith('/lead-finder/imports/') || p === '/app/lead-finder/imports' || p === '/lead-finder/search-history' || p.startsWith('/lead-finder/search-history/'))) return true;

  // 7. Email
  if (h === '/email/mailboxes' && (p === '/email/mailboxes' || p.startsWith('/email/mailboxes/') || p === '/email/inboxes' || p.startsWith('/email/inboxes/'))) return true;
  if (h === '/email/campaigns' && (p === '/email' || p === '/cold-email' || p === '/email/campaigns' || p === '/app/email' || p === '/app/cold-email' || p === '/email/overview')) return true;
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
  if (h === '/linkedin/overview' && (p === '/linkedin' || p === '/linkedin/overview' || p === '/app/linkedin' || p === '/app/linkedin/overview')) return true;
  if (h === '/linkedin/accounts' && (p === '/linkedin/accounts' || p.startsWith('/linkedin/accounts/') || p === '/linkedin/proxies')) return true;
  if (h === '/linkedin/campaigns' && (p === '/linkedin/campaigns' || p === '/app/linkedin/campaigns' || p === '/linkedin/automation' || p === '/linkedin/sequences')) return true;
  if (h === '/linkedin/messages' && (p === '/linkedin/messages' || p.startsWith('/linkedin/messages/') || p === '/linkedin/inbox')) return true;
  if (h === '/linkedin/activity' && (p === '/linkedin/activity' || p === '/linkedin/execution-logs' || p === '/linkedin/logs')) return true;
  if (h === '/linkedin/analytics' && (p === '/linkedin/analytics' || p.startsWith('/linkedin/analytics/'))) return true;
  if (h === '/linkedin/settings' && (p === '/linkedin/settings' || p.startsWith('/linkedin/settings/'))) return true;

  // 11. Calls / Voice AI
  if (h === '/voice-ai/overview' && (
    p === '/voice-ai' || p === '/calls' || p === '/voice-ai/overview' || p === '/calls/overview' ||
    p === '/app/voice-ai' || p === '/app/calls' || p === '/app/voice-ai/overview' || p === '/app/calls/overview'
  )) return true;
  if (h === '/voice-ai/call-center' && (
    p === '/voice-ai/call-center' || p === '/calls/call-center' ||
    p === '/app/voice-ai/call-center' || p === '/app/calls/call-center'
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

  // 13. Workspace / Admin
  if ((h === '/workspace/dashboard' || h === '/workspace/overview' || h === '/admin/overview') && (p === '/workspace' || p === '/workspace/dashboard' || p === '/workspace/overview' || p === '/app/workspace' || p === '/app/workspace/overview' || p === '/admin' || p === '/admin/overview' || p === '/app/admin' || p === '/app/admin/overview')) return true;
  if ((h === '/workspace/people-roles' || h === '/workspace/users' || h === '/admin/users') && (p.startsWith('/workspace/people-roles') || p.startsWith('/workspace/users') || p.startsWith('/workspace/people') || p.startsWith('/workspace/teams') || p.startsWith('/workspace/roles') || p.startsWith('/admin/users') || p.startsWith('/admin/people') || p.startsWith('/admin/teams') || p.startsWith('/admin/roles') || p.startsWith('/app/workspace/users') || p.startsWith('/app/admin/users'))) return true;
  if ((h === '/workspace/products-plans' || h === '/workspace/plans' || h === '/admin/plans') && (p.startsWith('/workspace/products-plans') || p.startsWith('/workspace/plans') || p.startsWith('/workspace/product') || p.startsWith('/workspace/modules') || p.startsWith('/workspace/bundles') || p.startsWith('/workspace/feature-access') || p.startsWith('/admin/plans') || p.startsWith('/admin/product') || p.startsWith('/admin/modules') || p.startsWith('/admin/bundles') || p.startsWith('/admin/feature-access'))) return true;
  if ((h === '/workspace/assignments' || h === '/workspace/user-assignments' || h === '/admin/user-assignments') && (p.startsWith('/workspace/assignments') || p.startsWith('/workspace/user-assignments') || p.startsWith('/workspace/team-assignments') || p.startsWith('/workspace/access-overrides') || p.startsWith('/admin/user-assignments') || p.startsWith('/admin/assignments') || p.startsWith('/admin/team-assignments') || p.startsWith('/admin/access-overrides'))) return true;
  if ((h === '/workspace/billing' || h === '/workspace/subscriptions' || h === '/admin/subscriptions') && (p.startsWith('/workspace/billing') || p.startsWith('/workspace/subscriptions') || p.startsWith('/workspace/payments') || p.startsWith('/workspace/invoices') || p.startsWith('/workspace/credits') || p.startsWith('/workspace/coupons') || p.startsWith('/admin/subscriptions') || p.startsWith('/admin/billing') || p.startsWith('/admin/payments') || p.startsWith('/admin/invoices') || p.startsWith('/admin/credits') || p.startsWith('/admin/coupons'))) return true;
  if ((h === '/workspace/quotas' || h === '/workspace/usage-overview' || h === '/admin/usage-overview') && (p.startsWith('/workspace/quotas') || p.startsWith('/workspace/usage-overview') || p.startsWith('/workspace/usage') || p.startsWith('/workspace/resource-limits') || p.startsWith('/workspace/credit-usage') || p.startsWith('/admin/usage-overview') || p.startsWith('/admin/usage') || p.startsWith('/admin/resource-limits') || p.startsWith('/admin/credit-usage'))) return true;
  if ((h === '/workspace/platform-ai' || h === '/workspace/integrations' || h === '/admin/integrations') && (p.startsWith('/workspace/platform-ai') || p.startsWith('/workspace/integrations') || p.startsWith('/workspace/platform') || p.startsWith('/workspace/navigation') || p.startsWith('/workspace/tricksy-ai') || p.startsWith('/workspace/trixie') || p.startsWith('/admin/integrations') || p.startsWith('/admin/platform') || p.startsWith('/admin/navigation') || p.startsWith('/admin/tricksy-ai') || p.startsWith('/admin/trixie'))) return true;
  if ((h === '/workspace/security' || h === '/workspace/audit-center' || h === '/admin/audit-center') && (p.startsWith('/workspace/security') || p.startsWith('/workspace/audit-center') || p.startsWith('/workspace/sessions') || p.startsWith('/admin/audit-center') || p.startsWith('/admin/security') || p.startsWith('/admin/sessions'))) return true;
  if ((h === '/workspace/configuration' || h === '/workspace/global-settings' || h === '/admin/global-settings') && (p.startsWith('/workspace/configuration') || p.startsWith('/workspace/global-settings') || p.startsWith('/workspace/notifications') || p.startsWith('/workspace/branding') || p.startsWith('/workspace/settings') || p.startsWith('/admin/global-settings') || p.startsWith('/admin/configuration') || p.startsWith('/admin/notifications') || p.startsWith('/admin/branding') || p.startsWith('/admin/settings'))) return true;

  // 14. Settings
  if (h === '/settings/profile' && (p === '/settings/profile' || p === '/settings/overview' || p === '/settings' || p === '/app/settings')) return true;
  if (h === '/settings/workspace' && (
    p === '/settings/workspace' || p === '/app/settings/workspace' ||
    p === '/settings/organization' || p === '/app/settings/organization' ||
    p === '/settings/team' || p === '/app/settings/team' ||
    p === '/settings/members' || p === '/app/settings/members'
  )) return true;
  if (h === '/settings/organization' && (p === '/settings/organization' || p === '/app/settings/organization')) return true;
  if (h === '/settings/team' && (p === '/settings/team' || p === '/app/settings/team')) return true;
  if (h === '/settings/security' && (p === '/settings/security' || p === '/settings/account' || p === '/app/settings/security' || p === '/app/settings/account')) return true;
  if (h === '/settings/billing-credits' && (p === '/settings/billing-credits' || p === '/settings/billing' || p === '/app/settings/billing-credits')) return true;
  if (h === '/settings/connected-accounts' && (p === '/settings/connected-accounts' || p === '/settings/channels' || p === '/settings/sending-inboxes' || p === '/app/settings/connected-accounts')) return true;
  if (h === '/settings/autonomous-agents' && (p === '/settings/autonomous-agents' || p === '/settings/agents' || p === '/settings/ai-assistant' || p === '/app/settings/autonomous-agents')) return true;
  if (h === '/settings/developer-api' && (p === '/settings/developer-api' || p === '/settings/api' || p === '/app/settings/developer-api')) return true;
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
  const { orgData } = useSettings();

  const storageKey = 'outtricks_subsidebar_collapsed';
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

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

  const p = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const isMasterBoxPath = 
    activePrimaryId === 'trixie' ||
    activePrimaryId === 'copilot' ||
    activePrimaryId === 'master-box' ||
    p === '/' ||
    p === '/trixie' ||
    p.startsWith('/trixie/') ||
    p === '/master-box' ||
    p.startsWith('/master-box/') ||
    p === '/copilot' ||
    p.startsWith('/copilot/') ||
    p === '/chat' ||
    p.startsWith('/chat/') ||
    p === '/ai-chat' ||
    p.startsWith('/ai-chat/') ||
    p === '/dashboard' ||
    p === '/command-center' ||
    p === '/app' ||
    p === '/app/copilot' ||
    p === '/app/dashboard';

  const isInboxOrMailPath =
    activePrimaryId === 'master-inbox' ||
    activePrimaryId === 'inbox' ||
    activePrimaryId === 'mail' ||
    p === '/inbox' ||
    p.startsWith('/inbox/') ||
    p === '/master-box' ||
    p.startsWith('/master-box/') ||
    p === '/mail' ||
    p.startsWith('/mail/') ||
    p === '/messages' ||
    p.startsWith('/messages/') ||
    p === '/app/inbox' ||
    p.startsWith('/app/inbox/') ||
    p === '/app/mail' ||
    p.startsWith('/app/mail/');

  if (isMasterBoxPath || isInboxOrMailPath) {
    return null;
  }

  const config = React.useMemo(() => {
    const baseConfig = SUB_SIDEBAR_CONFIGS[activePrimaryId];
    if (!baseConfig) return null;

    const companyName = orgData?.name || currentWorkspace?.name || 'Redlumb';
    const workspaceName = formatWorkspaceName(companyName);

    if (activePrimaryId === 'workspace') {
      return {
        ...baseConfig,
        sectionTitle: workspaceName,
      };
    }

    if (activePrimaryId === 'settings') {
      return {
        ...baseConfig,
        groups: baseConfig.groups.map((group) => ({
          ...group,
          items: group.items.map((item) => {
            if (item.href === '/settings/workspace') {
              return {
                ...item,
                title: workspaceName,
              };
            }
            return item;
          }),
        })),
      };
    }

    return baseConfig;
  }, [activePrimaryId, currentWorkspace?.name, orgData?.name]);
  const credits = currentWorkspace?.credits ?? 1840;
  const maxCredits = 2500;
  const creditPercent = Math.min(100, Math.round((credits / maxCredits) * 100));

  return (
    <aside
      className={`relative shrink-0 h-screen bg-slate-50 dark:bg-[#0F0F0F] flex flex-col justify-between font-sans select-none z-30 transition-all duration-200 ease-in-out ${
        isCollapsed 
          ? 'w-0 p-0 border-r-0 overflow-visible' 
          : 'w-56 p-3 border-r border-slate-200 dark:border-[#242424] overflow-visible'
      }`}
    >
      {/* Small Clean Collapse/Expand Button Centered on the Right Border */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-40">
        <Tooltip
          content={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          placement="right"
          delay={150}
        >
          <button
            type="button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="w-6 h-6 rounded-full bg-white dark:bg-[#161616] border border-slate-300 dark:border-[#2E2E2E] hover:border-primary text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-[#222222] shadow-md flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 transition-transform" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 transition-transform" />
            )}
          </button>
        </Tooltip>
      </div>

      {!isCollapsed && (
        <div className="flex-1 flex flex-col justify-between h-full overflow-hidden animate-in fade-in duration-150">
          {/* Top Header & Navigation Items */}
          <div className="flex-1 overflow-y-auto pr-0.5 no-scrollbar">
            {/* Section Title */}
            <div className="pt-2 px-2.5 flex items-center justify-between pb-1">
              <span className="text-[13px] font-black text-slate-950 dark:text-white uppercase tracking-wider">
                {config.sectionTitle}
              </span>
            </div>

            {/* Groups and Navigation Items */}
            <div className="space-y-3 pt-1">
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
                    {/* Group Heading */}
                    {group.heading ? (
                      <div className="px-2.5 pt-2 pb-0.5 text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {group.heading}
                      </div>
                    ) : null}

                    {/* Items in this group */}
                    <div className="space-y-[3px]">
                      {group.items.map((item, itemIdx) => (
                        <SubSidebarItem
                          key={itemIdx}
                          title={item.title}
                          href={item.href}
                          badge={item.badge}
                          icon={item.icon}
                          indented={item.indented}
                          isCollapsed={false}
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
          <div className="pt-3 border-t border-slate-200 dark:border-[#242424]">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#2A2A2A] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-slate-950 dark:text-white font-mono tracking-tight">
                  {credits.toLocaleString()}
                </span>
                <span className="text-[9px] font-extrabold text-slate-500 dark:text-[#B5B5B5] uppercase tracking-wider font-mono">
                  CREDITS LEFT
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-[#222222] overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${creditPercent}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
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
        </div>
      )}
    </aside>
  );
};
