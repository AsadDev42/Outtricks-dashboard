import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Layers, 
  Search, 
  Inbox, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Briefcase, 
  Workflow, 
  BarChart3, 
  ShieldCheck, 
  Settings,
  Zap
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { UserProfileMenu } from './UserProfileMenu';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { useAppearance } from '../../context/ThemeContext';
import { useGlobalTabs } from '../../context/GlobalTabsContext';

export interface PrimaryNavItem {
  id: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matchPrefixes: string[];
  requiresAdmin?: boolean;
}

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: 'copilot', title: 'Home', href: '/', icon: Sparkles, matchPrefixes: ['/copilot', '/dashboard', '/command-center'] },
  { id: 'lead-finder', title: 'Leads', href: '/lead-finder', icon: Search, matchPrefixes: ['/lead-finder', '/leads', '/prospects'] },
  { id: 'crm', title: 'CRM', href: '/crm', icon: Layers, matchPrefixes: ['/crm', '/companies'] },
  { id: 'campaigns', title: 'Campaigns', href: '/campaigns', icon: Zap, matchPrefixes: ['/campaigns', '/app/campaigns'] },
  { id: 'linkedin', title: 'LinkedIn', href: '/linkedin', icon: Linkedin, matchPrefixes: ['/linkedin'] },
  { id: 'email', title: 'Email', href: '/email/campaigns', icon: Mail, matchPrefixes: ['/email', '/cold-email', '/deliverability'] },
  { id: 'calls', title: 'Calling', href: '/voice-ai', icon: PhoneCall, matchPrefixes: ['/voice-ai', '/calls'] },
  { id: 'upwork', title: 'Upwork', href: '/upwork', icon: Briefcase, matchPrefixes: ['/upwork'] },
  { id: 'workflows', title: 'Workflows', href: '/flow-builder', icon: Workflow, matchPrefixes: ['/flow-builder', '/workflows', '/integrations', '/api'] },
  { id: 'analytics', title: 'Analytics', href: '/analytics', icon: BarChart3, matchPrefixes: ['/analytics', '/platform/analytics'] },
  { id: 'settings', title: 'Settings', href: '/settings', icon: Settings, matchPrefixes: ['/settings'] },
  { id: 'admin', title: 'Admin Panel', href: '/admin', icon: ShieldCheck, matchPrefixes: ['/admin', '/app/admin'], requiresAdmin: true },
];

export interface AppPrimarySidebarProps {
  activePrimaryId: string;
  onSelectPrimary: (id: string) => void;
}

export const AppPrimarySidebar: React.FC<AppPrimarySidebarProps> = ({
  activePrimaryId,
  onSelectPrimary,
}) => {
  const { user } = useAuth();
  const { hasModuleAccess, currentAdminRole, isAdmin, hasPermission } = useAdmin();
  const { sidebarDensity } = useAppearance();
  const { tabs } = useGlobalTabs();
  const location = useLocation();

  const isUserAdmin = isAdmin || 
    hasPermission('adminPanel') || 
    currentAdminRole === 'super-admin' || 
    currentAdminRole === 'admin' || 
    currentAdminRole === 'billing-admin';

  // Filter items based on active module config and admin role
  const visibleNavItems = PRIMARY_NAV_ITEMS.filter((item) => {
    if (item.requiresAdmin) {
      return isUserAdmin;
    }
    // Check if module is enabled in admin engine
    return hasModuleAccess(item.id);
  });

  // Determine strictly ONE active item based on current URL path
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  const activeItem = React.useMemo(() => {
    if (
      currentPath === '/' || 
      currentPath === '/dashboard' || 
      currentPath === '/copilot' || 
      currentPath === '/command-center' || 
      currentPath === '/app' || 
      currentPath === '/app/dashboard' || 
      currentPath === '/app/copilot'
    ) {
      return visibleNavItems.find((i) => i.id === 'copilot') || visibleNavItems[0];
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

  const densitySpacing = {
    compact: 'space-y-1 py-2',
    default: 'space-y-1.5 py-3',
    comfortable: 'space-y-2.5 py-4',
  };

  return (
    <aside className={`w-16 shrink-0 h-screen bg-[#090909] border-r border-[#242424] flex flex-col justify-between items-center z-40 select-none font-sans ${densitySpacing[sidebarDensity] || densitySpacing.default}`}>
      
      {/* Brand Logo */}
      <div className="space-y-3.5 flex flex-col items-center">
        <Link
          to="/"
          className="w-10 h-10 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center overflow-hidden shadow-lg shadow-black/40 hover:scale-105 transition-transform"
          title="Outtricks Platform"
        >
          <img src="/logo.png" alt="Outtricks Logo" className="w-full h-full object-cover rounded-2xl" />
        </Link>

        {/* Primary Navigation Rail */}
        <div className={`flex flex-col items-center ${sidebarDensity === 'compact' ? 'space-y-1' : sidebarDensity === 'comfortable' ? 'space-y-2.5' : 'space-y-1.5'}`}>
          {visibleNavItems.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;
            const existingTab = tabs.find((t) => t.id === item.id || t.module === item.id);
            const targetHref = existingTab ? existingTab.path : item.href;

            return (
              <Tooltip key={item.id} content={item.title} placement="right" delay={400}>
                <Link
                  to={targetHref}
                  onClick={() => onSelectPrimary(item.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group cursor-pointer ${
                    active
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'text-[#8A8A8A] hover:text-white hover:bg-white/[0.06]'
                  }`}
                  aria-label={item.title}
                >
                  {/* Left Active Indicator Line */}
                  {active && (
                    <span className="absolute -left-3 top-1.5 bottom-1.5 w-1 rounded-r-full bg-primary shadow-sm shadow-primary/40" />
                  )}

                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </Link>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* User Profile Menu (Bottom-Left) */}
      <div className="pt-2 border-t border-[#242424] flex flex-col items-center">
        <UserProfileMenu variant="sidebar" />
      </div>

    </aside>
  );
};
