import React, { useRef, useEffect } from 'react';
import { 
  Search, 
  LayoutDashboard, 
  Bookmark, 
  Clock, 
  Users, 
  ListFilter, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export type LeadFinderNavTab = 
  | 'find-people'
  | 'overview'
  | 'saved-searches'
  | 'search-history'
  | 'my-leads'
  | 'prospect-lists'
  | 'imports';

interface TabMeta {
  id: LeadFinderNavTab;
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

export const LEAD_FINDER_TABS: Record<LeadFinderNavTab, TabMeta> = {
  'find-people': { id: 'find-people', title: 'Find People', icon: Search, path: '/lead-finder/find-people' },
  'overview': { id: 'overview', title: 'Lead Overview', icon: LayoutDashboard, path: '/lead-finder/overview' },
  'saved-searches': { id: 'saved-searches', title: 'Saved Searches', icon: Bookmark, path: '/lead-finder/saved-searches' },
  'search-history': { id: 'search-history', title: 'Search History', icon: Clock, path: '/lead-finder/search-history' },
  'my-leads': { id: 'my-leads', title: 'My Leads', icon: Users, path: '/lead-finder/my-leads' },
  'prospect-lists': { id: 'prospect-lists', title: 'Prospect Lists', icon: ListFilter, path: '/lead-finder/prospect-lists' },
  'imports': { id: 'imports', title: 'Imports', icon: Upload, path: '/lead-finder/imports' },
};

interface LeadFinderTabBarProps {
  openTabs: LeadFinderNavTab[];
  activeTab: LeadFinderNavTab;
  onSelectTab: (tab: LeadFinderNavTab) => void;
  onCloseTab: (tab: LeadFinderNavTab) => void;
}

export const LeadFinderTabBar: React.FC<LeadFinderTabBarProps> = ({
  openTabs,
  activeTab,
  onSelectTab,
  onCloseTab,
}) => {
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
    <div className="relative flex items-center bg-slate-100/80 dark:bg-[#080808] border-b border-slate-200 dark:border-[#2A2A2A] px-2 pt-1.5 select-none overflow-hidden font-sans">
      
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
          const tab: TabMeta = LEAD_FINDER_TABS[tabId] || {
            id: tabId,
            title: tabId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            icon: Search,
            path: `/lead-finder/${tabId}`
          };
          const Icon = tab.icon;
          const isActive = activeTab === tabId;

          return (
            <div
              key={tabId}
              data-tab-id={tabId}
              onClick={() => onSelectTab(tabId)}
              className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-[#161616] text-blue-600 dark:text-blue-400 font-bold border-t-2 border-t-blue-600 border-x border-slate-200/80 dark:border-[#2A2A2A] shadow-xs z-10'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-t-2 border-t-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
              <span>{tab.title}</span>

              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white leading-none">
                  {tab.badge}
                </span>
              )}

              {/* Close Tab X Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tabId);
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
