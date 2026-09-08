import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Inbox, 
  Linkedin, 
  Briefcase, 
  Mail, 
  Mails,
  Workflow, 
  BarChart3, 
  Layers,
  Users, 
  Shield, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { UserProfileMenu } from './UserProfileMenu';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { useAppearance } from '../../context/ThemeContext';

export interface PrimaryNavItem {
  id: string;
  title: string;
  label?: string;
  href: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  matchPrefixes: string[];
  badge?: string | null;
}

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: 'trixie', title: 'Trixie AI', label: 'Trixie AI', href: '/', path: '/', icon: Sparkles, matchPrefixes: ['/trixie', '/copilot', '/chat', '/ai-chat', '/dashboard', '/command-center'], badge: null },
  { id: 'lead-finder', title: 'Leads', label: 'Leads', href: '/lead-finder', path: '/lead-finder', icon: Search, matchPrefixes: ['/lead-finder', '/leads', '/prospects'], badge: null },
  { id: 'master-inbox', title: 'Master Inbox', label: 'Master Inbox', href: '/inbox', path: '/inbox', icon: Inbox, matchPrefixes: ['/inbox', '/master-box', '/mail', '/messages', '/app/inbox', '/app/mail'], badge: null },
  { id: 'linkedin', title: 'LinkedIn', label: 'LinkedIn', href: '/linkedin', path: '/linkedin', icon: Linkedin, matchPrefixes: ['/linkedin'], badge: null },
  { id: 'upwork', title: 'Upwork', label: 'Upwork', href: '/upwork/jobs', path: '/upwork/jobs', icon: Briefcase, matchPrefixes: ['/upwork', '/work', '/intelligence'], badge: null },
  { id: 'email', title: 'Email', label: 'Email Marketing', href: '/email', path: '/email', icon: Mails, matchPrefixes: ['/email', '/cold-email', '/deliverability', '/app/email', '/app/cold-email', '/app/deliverability'], badge: null },
  { id: 'automation', title: 'Automation', label: 'Automation', href: '/flow-builder', path: '/flow-builder', icon: Workflow, matchPrefixes: ['/flow-builder', '/workflows', '/automation', '/integrations', '/api'], badge: null },
  { id: 'analytics', title: 'Analytics', label: 'Analytics', href: '/analytics', path: '/analytics', icon: BarChart3, matchPrefixes: ['/analytics', '/platform/analytics'], badge: null },
  { id: 'crm', title: 'CRM', label: 'CRM', href: '/crm', path: '/crm', icon: Layers, matchPrefixes: ['/crm', '/contacts', '/people', '/companies', '/accounts', '/pipeline', '/deals', '/leads', '/activities', '/reminders'], badge: null },
  { 
    id: 'workspace', 
    title: 'Workspace',
    label: 'Workspace', 
    href: '/workspace', 
    path: '/workspace', 
    icon: Shield, 
    matchPrefixes: ['/workspace', '/app/workspace', '/admin', '/app/admin'],
    badge: null,
  },
  { id: 'settings', title: 'Settings', label: 'Settings', href: '/settings', path: '/settings', icon: Settings, matchPrefixes: ['/settings', '/app/settings'], badge: null },
];

export interface AppPrimarySidebarProps {
  activePrimaryId: string;
  onSelectPrimary: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AppPrimarySidebar: React.FC<AppPrimarySidebarProps> = ({
  activePrimaryId,
  onSelectPrimary,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse,
}) => {
  const { user } = useAuth();
  const { hasModuleAccess } = useAdmin();
  const location = useLocation();

  // Internal collapse state persisted in localStorage
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('outtricks_primary_sidebar_collapsed');
      return saved !== null ? saved === 'true' : false;
    } catch {
      return false;
    }
  });

  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('outtricks_primary_sidebar_collapsed', String(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  };

  // Guarantee all items are visible, preserving Workspace and Settings
  const visibleNavItems = PRIMARY_NAV_ITEMS.filter((item) => {
    if (item.id === 'workspace' || item.id === 'admin' || item.id === 'settings') {
      return true;
    }
    if (item.id === 'master-inbox' || item.id === 'master-box') {
      return hasModuleAccess('inbox') || hasModuleAccess('master-box') || true;
    }
    return hasModuleAccess(item.id);
  });

  // Determine strictly ONE active item based on current URL path
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  const activeItem = React.useMemo(() => {
    if (
      currentPath === '/' || 
      currentPath === '/trixie' ||
      currentPath.startsWith('/trixie/') ||
      currentPath === '/copilot' ||
      currentPath.startsWith('/copilot/') ||
      currentPath === '/chat' ||
      currentPath.startsWith('/chat/') ||
      currentPath === '/ai-chat' ||
      currentPath.startsWith('/ai-chat/') ||
      currentPath === '/dashboard' || 
      currentPath === '/command-center' || 
      currentPath === '/app' || 
      currentPath === '/app/dashboard' || 
      currentPath === '/app/copilot'
    ) {
      return visibleNavItems.find((i) => i.id === 'trixie' || i.id === 'copilot') || visibleNavItems[0];
    }
    
    // Sort by prefix length descending to match most specific route first
    const sorted = [...visibleNavItems].sort((a, b) => {
      const maxA = Math.max(...a.matchPrefixes.map((p) => p.length));
      const maxB = Math.max(...b.matchPrefixes.map((p) => p.length));
      return maxB - maxA;
    });

    const match = sorted.find((item) =>
      item.matchPrefixes.some((prefix) => currentPath === prefix || currentPath.startsWith(`${prefix}/`))
    );

    if (match) return match;

    return visibleNavItems.find((i) => i.id === activePrimaryId) || visibleNavItems[0];
  }, [currentPath, visibleNavItems, activePrimaryId]);

  const isItemActive = (item: PrimaryNavItem) => {
    return activeItem?.id === item.id;
  };

  return (
    <aside 
      className={`h-screen bg-white dark:bg-[#090909] border-r border-slate-200 dark:border-[#242424] flex flex-col justify-between z-40 select-none font-sans shrink-0 transition-all duration-200 ease-in-out overflow-x-hidden ${
        isCollapsed ? 'w-16 py-3 px-2 items-center' : 'w-60 p-3'
      }`}
    >
      
      {/* 1. Header / Logo / Collapse Control */}
      <div className="shrink-0">
        {isCollapsed ? (
          <div className="flex flex-col items-center pb-3">
            <Link
              to="/"
              onClick={() => onSelectPrimary('trixie')}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center overflow-hidden shadow-xs dark:shadow-lg dark:shadow-black/40 hover:scale-105 transition-transform cursor-pointer"
              title="Outtricks Platform"
            >
              <img src="/logo.png" alt="Outtricks Logo" className="w-full h-full object-cover rounded-2xl" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between px-1 pb-3">
            <Link
              to="/"
              onClick={() => onSelectPrimary('trixie')}
              className="flex items-center gap-2.5 group cursor-pointer min-w-0"
              title="Outtricks Revenue OS"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center overflow-hidden shadow-xs dark:shadow-md group-hover:scale-105 transition-transform shrink-0">
                <img src="/logo.png" alt="Outtricks Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-primary transition-colors font-sans truncate">
                  Outtricks
                </div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono leading-none mt-0.5 truncate">
                  Revenue OS
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleCollapse}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Navigation Rail (12 Canonical Items) */}
      <nav 
        className={`flex-1 overflow-y-auto no-scrollbar py-1 ${
          isCollapsed 
            ? 'flex flex-col items-center space-y-1.5 w-full' 
            : 'space-y-1 w-full'
        }`}
      >
        {visibleNavItems.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;
          const targetHref = item.path || item.href;
          const displayLabel = item.label || item.title;

          if (isCollapsed) {
            return (
              <Tooltip key={item.id} content={displayLabel} placement="right" delay={200}>
                <Link
                  to={targetHref}
                  onClick={() => onSelectPrimary(item.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group cursor-pointer shrink-0 ${
                    active
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'text-slate-600 dark:text-[#8A8A8A] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                  }`}
                  aria-label={displayLabel}
                >
                  {/* Active Indicator Bar */}
                  {active && (
                    <span className="absolute -left-2 top-1.5 bottom-1.5 w-1 rounded-r-full bg-primary shadow-sm shadow-primary/40" />
                  )}

                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </Link>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.id}
              to={targetHref}
              onClick={() => onSelectPrimary(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all relative group cursor-pointer text-xs font-semibold select-none ${
                active
                  ? 'bg-primary text-white shadow-md shadow-primary/25 font-bold'
                  : 'text-slate-600 dark:text-[#9A9A9A] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
              aria-label={displayLabel}
            >
              {/* Active Indicator Bar */}
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-white shadow-sm" />
              )}

              <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-500 dark:text-[#8A8A8A] group-hover:text-slate-950 dark:group-hover:text-white'}`} />
              <span className="truncate leading-none">{displayLabel}</span>
              {item.badge && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-white leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer: User Profile Menu & Collapse / Expand Toggle */}
      <div className="shrink-0 pt-2 border-t border-slate-200 dark:border-[#242424] w-full">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-2 w-full">
            <UserProfileMenu variant="sidebar" isCollapsed={true} />
            <Tooltip content="Expand sidebar" placement="right" delay={200}>
              <button
                type="button"
                onClick={toggleCollapse}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#8A8A8A] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer group"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <div className="space-y-1.5 w-full">
            <UserProfileMenu variant="sidebar" isCollapsed={false} />
            <button
              type="button"
              onClick={toggleCollapse}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-[#8A8A8A] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer group select-none"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
              <span>Collapse</span>
            </button>
          </div>
        )}
      </div>

    </aside>
  );
};
