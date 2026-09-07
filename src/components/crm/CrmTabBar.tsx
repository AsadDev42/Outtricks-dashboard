import React, { useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  DollarSign, 
  Building2, 
  Users, 
  Kanban, 
  FileText, 
  Tag, 
  Zap, 
  HeartPulse, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  CheckSquare,
  Bell,
  BarChart3,
  UserCheck
} from 'lucide-react';
import { useCrm, CrmTabType } from '../../context/CrmContext';

interface TabMeta {
  id: CrmTabType;
  title: string;
  icon: React.ElementType;
  closable: boolean;
  badge?: string;
}

const TAB_DEFINITIONS: Record<CrmTabType, TabMeta> = {
  overview: { id: 'overview', title: 'Overview', icon: LayoutDashboard, closable: true },
  deals: { id: 'deals', title: 'Deals', icon: DollarSign, closable: true },
  companies: { id: 'companies', title: 'Companies', icon: Building2, closable: true },
  contacts: { id: 'contacts', title: 'Contacts', icon: Users, closable: true },
  pipeline: { id: 'pipeline', title: 'Pipeline', icon: Kanban, closable: true },
  contracts: { id: 'contracts', title: 'Contracts', icon: FileText, closable: true },
  labels: { id: 'labels', title: 'Labels', icon: Tag, closable: true },
  signals: { id: 'signals', title: 'Signals', icon: Zap, closable: true, badge: '4' },
  health: { id: 'health', title: 'Health', icon: HeartPulse, closable: true },
  activities: { id: 'activities', title: 'Activities', icon: Activity, closable: true },
  tasks: { id: 'tasks', title: 'Tasks', icon: CheckSquare, closable: true },
  leads: { id: 'leads', title: 'Leads', icon: UserCheck, closable: true },
  reports: { id: 'reports', title: 'Reports', icon: BarChart3, closable: true },
  reminders: { id: 'reminders', title: 'Reminders', icon: Bell, closable: true },
  'custom-fields': { id: 'custom-fields', title: 'Custom Fields', icon: Tag, closable: true },
};

export const CrmTabBar: React.FC = () => {
  const { openTabs, activeTab, setActiveTab, closeTab } = useCrm();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  }, [activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center bg-slate-100/80 dark:bg-[#080808] border-b border-slate-200 dark:border-[#2A2A2A] px-2 pt-1.5 select-none overflow-hidden">
      
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        className="hidden md:flex p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors shrink-0 mr-1"
        title="Scroll tabs left"
        aria-label="Scroll tabs left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Chrome-Style Tabs Container */}
      <div
        ref={scrollRef}
        className="flex items-end gap-1 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0"
      >
        {openTabs.map((tabId, index) => {
          const tab: TabMeta = TAB_DEFINITIONS[tabId] || {
            id: tabId,
            title: tabId.charAt(0).toUpperCase() + tabId.slice(1),
            icon: LayoutDashboard,
            closable: true,
          };
          const Icon = tab.icon;
          const isActive = activeTab === tabId;

          return (
            <div
              key={tabId}
              data-tab-id={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 font-bold border-t-2 border-t-emerald-500 border-x border-slate-200/80 dark:border-[#222222] shadow-xs z-10'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-t-2 border-t-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
              <span>{tab.title}</span>

              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white leading-none">
                  {tab.badge}
                </span>
              )}

              {/* Close Tab X Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tabId);
                }}
                className={`p-0.5 rounded-full transition-all ml-0.5 ${
                  isActive
                    ? 'text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/15'
                    : 'text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-white/20 opacity-60 group-hover:opacity-100'
                }`}
                title={`Close ${tab.title} tab`}
                aria-label={`Close ${tab.title} tab`}
              >
                <X className="w-3 h-3" />
              </button>

              {/* Inactive Tab Separator Line */}
              {!isActive && index < openTabs.length - 1 && openTabs[index + 1] !== activeTab && (
                <div className="absolute right-0 top-2 bottom-2 w-px bg-slate-300 dark:bg-white/10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        className="hidden md:flex p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors shrink-0 ml-1"
        title="Scroll tabs right"
        aria-label="Scroll tabs right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
