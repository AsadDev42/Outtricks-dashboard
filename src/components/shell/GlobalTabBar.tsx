import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
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
  Bot,
  LayoutDashboard
} from 'lucide-react';
import { useGlobalTabs, GlobalTab } from '../../context/GlobalTabsContext';
import { useAppearance } from '../../context/ThemeContext';

function getModuleIcon(module: string) {
  switch (module) {
    case 'copilot': return Sparkles;
    case 'crm': return Layers;
    case 'lead-finder': return Search;
    case 'inbox': return Inbox;
    case 'email': return Mail;
    case 'linkedin': return Linkedin;
    case 'calls': return PhoneCall;
    case 'upwork': return Briefcase;
    case 'workflows': return Workflow;
    case 'analytics': return BarChart3;
    case 'admin': return ShieldCheck;
    case 'settings': return Settings;
    case 'agents': return Bot;
    default: return LayoutDashboard;
  }
}

export const GlobalTabBar: React.FC = () => {
  const { tabs, activeTabId, closeTab } = useGlobalTabs();
  const { tabStyle } = useAppearance();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-tab-id="${activeTabId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  }, [activeTabId]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Enable mouse wheel horizontal scrolling on the tabs container
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      if (e.deltaY !== 0) {
        scrollRef.current.scrollLeft += e.deltaY;
      } else if (e.deltaX !== 0) {
        scrollRef.current.scrollLeft += e.deltaX;
      }
    }
  };

  const handleTabClick = (tab: GlobalTab) => {
    navigate(tab.path);
  };

  const handleAuxClick = (e: React.MouseEvent<HTMLDivElement>, tab: GlobalTab) => {
    // Middle click closes tab
    if (e.button === 1 && tab.closable) {
      e.preventDefault();
      closeTab(tab.id);
    }
  };

  // Determine Tab Height & Padding based on tabStyle
  const tabClasses = {
    standard: 'min-h-[34px] px-3.5 py-1.5 rounded-t-xl text-xs font-semibold leading-tight',
    compact: 'min-h-[30px] px-2.5 py-1 rounded-t-lg text-[11px] font-semibold leading-tight',
    minimal: 'min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-none border-b-2 leading-tight',
  };

  return (
    <div
      role="tablist"
      aria-label="Application Tabs"
      className={`relative flex items-center bg-slate-100/90 dark:bg-[#080808]/90 border-b border-slate-200 dark:border-[#242424] px-3 select-none overflow-hidden font-sans z-10 shrink-0 box-border ${tabStyle === 'compact' ? 'pt-1' : 'pt-1.5'}`}
    >
      
      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        className="hidden md:inline-flex items-center justify-center p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors shrink-0 mr-1 cursor-pointer"
        title="Scroll tabs left"
        aria-label="Scroll tabs left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Chrome-Style Global Tabs Container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-end gap-1 overflow-x-auto no-scrollbar scroll-smooth flex-1 min-w-0"
      >
        {tabs.map((tab, index) => {
          const Icon = getModuleIcon(tab.module);
          const isActive = activeTabId === tab.id;

          let styleClass = '';
          if (tabStyle === 'minimal') {
            styleClass = isActive
              ? 'border-b-2 border-b-primary text-primary font-bold bg-white/40 dark:bg-white/[0.03]'
              : 'border-b-2 border-b-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/[0.02]';
          } else {
            styleClass = isActive
              ? 'bg-white dark:bg-[#141414] text-primary font-bold border-t-2 border-t-primary border-x border-slate-200/80 dark:border-[#242424] shadow-xs z-10'
              : 'bg-transparent text-slate-600 dark:text-slate-400 border-t-2 border-t-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]';
          }

          return (
            <div
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              data-tab-id={tab.id}
              title={tab.title}
              onClick={() => handleTabClick(tab)}
              onAuxClick={(e) => handleAuxClick(e, tab)}
              className={`group relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all shrink-0 box-border leading-tight ${tabClasses[tabStyle] || tabClasses.standard} ${styleClass}`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
              <span className="max-w-[140px] truncate inline-flex items-center leading-tight">{tab.title}</span>

              {/* Close Tab X Button */}
              {tab.closable && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className={`p-0.5 rounded-full inline-flex items-center justify-center transition-all ml-0.5 cursor-pointer ${
                    isActive
                      ? 'text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/15'
                      : 'text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-white/20 opacity-60 group-hover:opacity-100'
                  }`}
                  title={`Close ${tab.title} tab`}
                  aria-label={`Close ${tab.title} tab`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Inactive Tab Separator Line */}
              {tabStyle !== 'minimal' && !isActive && index < tabs.length - 1 && tabs[index + 1].id !== activeTabId && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-px bg-slate-300 dark:bg-white/10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        className="hidden md:inline-flex items-center justify-center p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] transition-colors shrink-0 ml-1 cursor-pointer"
        title="Scroll tabs right"
        aria-label="Scroll tabs right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
