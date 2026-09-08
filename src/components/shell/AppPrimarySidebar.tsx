import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Inbox, 
  Linkedin, 
  Briefcase, 
  Mail, 
  Workflow, 
  BarChart3, 
  Layers,
  Shield, 
  Settings
} from 'lucide-react';
import { UserProfileMenu } from './UserProfileMenu';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';

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
  { id: 'email', title: 'Email', label: 'Email', href: '/email', path: '/email', icon: Mail, matchPrefixes: ['/email', '/cold-email', '/deliverability', '/app/email', '/app/cold-email', '/app/deliverability'], badge: null },
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
}) => {
  const { hasModuleAccess } = useAdmin();
  const location = useLocation();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [, setTick] = useState(0);

  const updatePosition = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);

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

  // Resolve current item for the floating badge/label
  const currentFloatingItem = hoveredId 
    ? visibleNavItems.find((i) => i.id === hoveredId) 
    : activeItem;

  const targetElement = currentFloatingItem ? itemRefs.current[currentFloatingItem.id] : null;
  const targetRect = targetElement ? targetElement.getBoundingClientRect() : null;

  return (
    <aside 
      className="h-screen w-16 bg-white dark:bg-[#0B0B0C] border-r border-slate-200 dark:border-[#1F1F23] flex flex-col justify-between items-center z-40 select-none font-sans shrink-0 py-3 px-2 overflow-visible"
      aria-label="Primary Navigation Rail"
    >
      {/* 1. Header / Logo (Permanent icon rail header) */}
      <div className="shrink-0 flex flex-col items-center pb-3">
        <Link
          to="/"
          onClick={() => onSelectPrimary('trixie')}
          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center overflow-hidden shadow-xs dark:shadow-lg dark:shadow-black/40 hover:scale-105 transition-transform cursor-pointer"
          title="Outtricks Platform"
          aria-label="Outtricks Platform"
        >
          <img 
            src={`${import.meta.env.BASE_URL}outtricks-icon.png`} 
            alt="Outtricks Logo" 
            className="w-full h-full object-contain p-1 rounded-xl" 
          />
        </Link>
      </div>

      {/* 2. Navigation Rail (Centered Icon Stack with Exact Geometry) */}
      <nav 
        onScroll={updatePosition}
        className="flex-1 w-full flex flex-col items-center space-y-1.5 py-1 overflow-y-auto no-scrollbar"
      >
        {visibleNavItems.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;
          const targetHref = item.path || item.href;
          const displayLabel = item.label || item.title;

          return (
            <Link
              key={item.id}
              to={targetHref}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => onSelectPrimary(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 relative group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0B0C] ${
                active
                  ? 'bg-primary text-white shadow-md shadow-primary/25 font-bold'
                  : 'text-slate-400 dark:text-[#8E8E93] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
              aria-label={displayLabel}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform ${active ? 'text-white' : 'group-hover:scale-105'}`} />
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer: User Profile Menu */}
      <div className="shrink-0 pt-2 border-t border-slate-200 dark:border-[#1F1F23] w-full flex flex-col items-center">
        <UserProfileMenu variant="sidebar" isCollapsed={true} />
      </div>

      {/* 4. Floating Module Label Portal (Never clipped by sidebar overflow) */}
      {targetRect && currentFloatingItem && createPortal(
        <div
          role="tooltip"
          className="fixed z-[9999] pointer-events-none px-3 py-1.5 text-xs font-semibold text-white bg-[#0A0C14] border border-white/15 rounded-lg shadow-xl shadow-black/50 whitespace-nowrap transition-all duration-150 animate-in fade-in"
          style={{
            left: `${targetRect.right + 10}px`,
            top: `${targetRect.top + targetRect.height / 2}px`,
            transform: 'translateY(-50%)',
          }}
        >
          {currentFloatingItem.label || currentFloatingItem.title}
        </div>,
        document.body
      )}
    </aside>
  );
};

