import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  Search, 
  Users,
  Building2,
  Mail, 
  Linkedin, 
  PhoneCall, 
  Workflow, 
  BarChart3, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  X,
  Bot,
  Inbox
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export interface AppSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'blue' | 'emerald' | 'amber' | 'slate';
}

const PRIMARY_APP_NAV: NavItem[] = [
  { title: 'Command Center', href: '/', icon: BarChart3, badge: 'Live' },
  { title: '8D Lead Finder', href: '/lead-finder', icon: Search, badge: '480M+' },
  { title: 'Leads Management', href: '/leads', icon: Users, badge: 'Workspace' },
  { title: 'Target Companies', href: '/companies', icon: Building2, badge: 'ABM' },
  { title: 'Cold Email Outreach', href: '/cold-email', icon: Mail, badge: '99.4%' },
  { title: 'Unified Inbox', href: '/inbox', icon: Inbox, badge: '3 New' },
  { title: 'LinkedIn Safe', href: '/linkedin', icon: Linkedin },
  { title: 'Voice AI SDR', href: '/voice-ai', icon: PhoneCall, badge: 'Sub-400ms', badgeVariant: 'blue' },
  { title: 'Deals CRM Pipeline', href: '/crm', icon: Layers },
  { title: 'Visual Flow Builder', href: '/flow-builder', icon: Workflow },
  { title: 'Freelance AI Bidding', href: '/ai-agents', icon: Bot, badge: 'AI' },
  { title: 'Revenue Attribution', href: '/analytics', icon: BarChart3 },
  { title: 'Deliverability Guard', href: '/deliverability', icon: ShieldCheck },
  { title: 'Campaign Sequences', href: '/campaigns', icon: Zap },
  { title: 'Integrations Hub', href: '/integrations', icon: Cpu },
  { title: 'Official REST API', href: '/api', icon: Code2 },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const location = useLocation();

  const isNavActive = (href: string) => {
    if (href === '/' && (location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/command-center')) return true;
    return location.pathname === href || location.pathname === `/app${href}`;
  };

  const navContent = (
    <div className="h-full flex flex-col justify-between p-3 font-sans">
      
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 pt-2">
          <Link
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <img src="/logo.png" alt="Outtricks Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="font-extrabold text-base text-slate-950 dark:text-white tracking-tight block">
                  Outtricks
                </span>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-mono">
                  Revenue OS Platform
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden cursor-pointer rounded-lg"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core SaaS Platform Engines */}
        <div className="space-y-0.5">
          {PRIMARY_APP_NAV.map((item) => {
            const active = isNavActive(item.href);
            const Icon = item.icon;

            const linkItem = (
              <Link
                key={item.href}
                to={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all select-none ${
                  active
                    ? 'bg-primary text-white shadow-sm shadow-primary/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : 'justify-between'}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-primary-muted text-primary'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.href} content={item.title} placement="right">
                  {linkItem}
                </Tooltip>
              );
            }

            return linkItem;
          })}
        </div>

      </div>

      {/* Footer Collapse Toggle (Desktop only) */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#202020] hidden lg:block">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] transition-colors cursor-pointer"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 z-30 h-screen bg-white dark:bg-[#161616] border-r border-slate-200/80 dark:border-[#2A2A2A] transition-all duration-200 overflow-y-auto ${
          isCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-[#161616] shadow-2xl border-r border-slate-200 dark:border-[#2A2A2A] z-10 overflow-y-auto">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};
