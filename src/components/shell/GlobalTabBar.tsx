import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ChevronDown,
  Search,
  Sparkles, 
  Layers, 
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
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { useGlobalTabs, GlobalTab } from '../../context/GlobalTabsContext';
import { useAppearance } from '../../context/ThemeContext';

function getModuleIcon(module: string) {
  switch (module) {
    case 'copilot': return Sparkles;
    case 'crm': return Layers;
    case 'lead-finder': return Search;
    case 'inbox': return Mail;
    case 'campaigns': return Zap;
    case 'email': return Mail;
    case 'linkedin': return Linkedin;
    case 'calls': return PhoneCall;
    case 'upwork': return Briefcase;
    case 'workflows': return Workflow;
    case 'analytics': return BarChart3;
    case 'admin':
    case 'workspace': return ShieldCheck;
    case 'settings': return Settings;
    case 'agents': return Bot;
    default: return LayoutDashboard;
  }
}

/**
 * Computes which tabs fit within the available width and which overflow.
 * Guarantees that the active tab is ALWAYS included in the visible tabs set.
 */
function computeVisibleTabs({
  tabs,
  activeTabId,
  availableWidth,
  tabWidthMap,
  overflowBtnWidth,
  gap = 4,
}: {
  tabs: GlobalTab[];
  activeTabId: string;
  availableWidth: number;
  tabWidthMap: Record<string, number>;
  overflowBtnWidth: number;
  gap?: number;
}): string[] {
  if (tabs.length === 0) return [];
  if (tabs.length === 1) return [tabs[0].id];

  const getTabWidth = (tab: GlobalTab) =>
    (tabWidthMap[tab.id] || Math.min(180, Math.max(90, tab.title.length * 8 + 50))) + gap;

  // 1. Check if all tabs fit naturally
  let totalAllWidth = -gap;
  for (const tab of tabs) {
    totalAllWidth += getTabWidth(tab);
  }

  if (totalAllWidth <= availableWidth) {
    return tabs.map((t) => t.id);
  }

  // 2. Tabs exceed available width: reserve room for "+ N ⌵" button
  const maxAllowedWidth = Math.max(80, availableWidth - overflowBtnWidth);
  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);
  const safeActiveIndex = activeIndex !== -1 ? activeIndex : 0;
  const activeTab = tabs[safeActiveIndex];

  // Active tab is ALWAYS visible
  const visibleIds = new Set<string>([activeTab.id]);
  let currentWidth = getTabWidth(activeTab) - gap;

  const canFit = (tab: GlobalTab) => {
    const additionalWidth = getTabWidth(tab);
    return currentWidth + additionalWidth <= maxAllowedWidth;
  };

  // Try to anchor tab 0 (e.g. Master Box / Home) if space permits
  if (safeActiveIndex !== 0) {
    const tab0 = tabs[0];
    if (canFit(tab0)) {
      visibleIds.add(tab0.id);
      currentWidth += getTabWidth(tab0);
    }
  }

  // Expand outwards from active tab (adjacent left & right neighbors)
  let left = safeActiveIndex - 1;
  let right = safeActiveIndex + 1;

  while (left > 0 || right < tabs.length) {
    let addedAny = false;

    if (left > 0) {
      const leftTab = tabs[left];
      if (!visibleIds.has(leftTab.id) && canFit(leftTab)) {
        visibleIds.add(leftTab.id);
        currentWidth += getTabWidth(leftTab);
        addedAny = true;
      }
      left--;
    }

    if (right < tabs.length) {
      const rightTab = tabs[right];
      if (!visibleIds.has(rightTab.id) && canFit(rightTab)) {
        visibleIds.add(rightTab.id);
        currentWidth += getTabWidth(rightTab);
        addedAny = true;
      }
      right++;
    }

    if (!addedAny) {
      // Fallback: Check any remaining unvisited tabs in order
      for (let i = 1; i < tabs.length; i++) {
        if (!visibleIds.has(tabs[i].id) && canFit(tabs[i])) {
          visibleIds.add(tabs[i].id);
          currentWidth += getTabWidth(tabs[i]);
          addedAny = true;
          break;
        }
      }
      if (!addedAny) break;
    }
  }

  // Return visible tab IDs in their natural original sequence
  const result = tabs.filter((t) => visibleIds.has(t.id)).map((t) => t.id);

  // Guarantee active tab is in the result
  if (!result.includes(activeTab.id)) {
    result.push(activeTab.id);
  }

  return result;
}

export const GlobalTabBar: React.FC = () => {
  const { tabs, activeTabId, closeTab } = useGlobalTabs();
  const { tabStyle } = useAppearance();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const measureOverflowRef = useRef<HTMLDivElement>(null);
  const overflowBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [visibleTabIds, setVisibleTabIds] = useState<string[]>(() => tabs.map((t) => t.id));
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');

  // Tab Height & Padding based on appearance tabStyle
  const tabClasses = {
    standard: 'min-h-[34px] px-3.5 py-1.5 rounded-t-xl text-xs font-semibold leading-tight',
    compact: 'min-h-[30px] px-2.5 py-1 rounded-t-lg text-[11px] font-semibold leading-tight',
    minimal: 'min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-none border-b-2 leading-tight',
  };

  // Recalculate visible & hidden tabs dynamically based on container width & tab measurements
  const updateVisibleTabs = useCallback(() => {
    if (!containerRef.current || !measureContainerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    // Account for padding px-3 on both sides = 24px
    const availableWidth = Math.max(0, containerWidth - 24);

    const tabWidthMap: Record<string, number> = {};
    const measureEls = measureContainerRef.current.querySelectorAll<HTMLElement>('[data-measure-tab-id]');
    measureEls.forEach((el) => {
      const id = el.getAttribute('data-measure-tab-id');
      if (id) {
        tabWidthMap[id] = el.getBoundingClientRect().width;
      }
    });

    const overflowBtnWidth = measureOverflowRef.current
      ? measureOverflowRef.current.getBoundingClientRect().width + 12
      : 74;

    const nextVisibleIds = computeVisibleTabs({
      tabs,
      activeTabId,
      availableWidth,
      tabWidthMap,
      overflowBtnWidth,
      gap: 4,
    });

    setVisibleTabIds((prev) => {
      if (
        prev.length === nextVisibleIds.length &&
        prev.every((id, idx) => id === nextVisibleIds[idx])
      ) {
        return prev;
      }
      return nextVisibleIds;
    });
  }, [tabs, activeTabId, tabStyle]);

  // Synchronous layout calculation on mount & update
  useLayoutEffect(() => {
    updateVisibleTabs();
  }, [updateVisibleTabs]);

  // ResizeObserver to track container width changes (e.g. sidebar collapse, browser resize)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updateVisibleTabs();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', updateVisibleTabs);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateVisibleTabs);
    };
  }, [updateVisibleTabs]);

  // Derive visible and hidden tab lists
  const visibleTabs = useMemo(() => {
    const set = new Set(visibleTabIds);
    return tabs.filter((t) => set.has(t.id));
  }, [tabs, visibleTabIds]);

  const hiddenTabs = useMemo(() => {
    const set = new Set(visibleTabIds);
    return tabs.filter((t) => !set.has(t.id));
  }, [tabs, visibleTabIds]);

  // Filtered hidden tabs for quick search
  const filteredHiddenTabs = useMemo(() => {
    if (!filterTerm.trim()) return hiddenTabs;
    const q = filterTerm.toLowerCase().trim();
    return hiddenTabs.filter((t) => t.title.toLowerCase().includes(q));
  }, [hiddenTabs, filterTerm]);

  // Auto-close overflow popover if all hidden tabs are closed
  useEffect(() => {
    if (hiddenTabs.length === 0 && isOverflowOpen) {
      setIsOverflowOpen(false);
      setFilterTerm('');
    }
  }, [hiddenTabs.length, isOverflowOpen]);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isOverflowOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        overflowBtnRef.current &&
        !overflowBtnRef.current.contains(e.target as Node)
      ) {
        setIsOverflowOpen(false);
        setFilterTerm('');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOverflowOpen(false);
        setFilterTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOverflowOpen]);

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

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Application Tabs"
      className={`relative flex items-center bg-slate-100/90 dark:bg-[#080808]/90 border-b border-slate-200 dark:border-[#242424] px-3 select-none font-sans z-20 shrink-0 box-border ${
        tabStyle === 'compact' ? 'pt-1' : 'pt-1.5'
      }`}
    >
      {/* 1. Visible Tabs Container (constrained without horizontal scroll overflow) */}
      <div className="flex items-end gap-1 flex-1 min-w-0 overflow-hidden">
        {visibleTabs.map((tab, index) => {
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
              className={`group relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all shrink-0 box-border leading-tight ${
                tabClasses[tabStyle] || tabClasses.standard
              } ${styleClass}`}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center ${
                  isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`}
              />
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
              {tabStyle !== 'minimal' && !isActive && index < visibleTabs.length - 1 && visibleTabs[index + 1].id !== activeTabId && (
                <div className="absolute right-0 top-1.5 bottom-1.5 w-px bg-slate-300 dark:bg-white/10 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Compact "+ N ⌵" Overflow Indicator & Popover */}
      {hiddenTabs.length > 0 && (
        <div className="relative shrink-0 flex items-center self-center my-auto ml-1 mr-0.5">
          {/* Subtle Vertical Divider */}
          <div className="w-px h-4 bg-slate-300 dark:bg-[#303030] mx-1.5 shrink-0" />

          {/* +N Trigger Button */}
          <button
            ref={overflowBtnRef}
            type="button"
            onClick={() => setIsOverflowOpen((prev) => !prev)}
            className={`group inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer select-none ${
              isOverflowOpen
                ? 'bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
            }`}
            title={`${hiddenTabs.length} hidden tabs. Click to view.`}
            aria-label={`${hiddenTabs.length} hidden tabs`}
            aria-expanded={isOverflowOpen}
          >
            <span className="font-normal text-slate-400 dark:text-slate-400">+</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{hiddenTabs.length}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-400 transition-transform duration-150 ${
                isOverflowOpen ? 'rotate-180 text-primary' : 'group-hover:text-slate-600 dark:group-hover:text-slate-200'
              }`}
            />
          </button>

          {/* Hidden Tabs Dropdown Popover */}
          {isOverflowOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full mt-1.5 w-72 max-h-[380px] flex flex-col bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#282828] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
              role="menu"
              aria-label="Hidden tabs menu"
            >
              {/* Header with count and bulk close action */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-[#222222] bg-slate-50/70 dark:bg-[#181818]/70 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Hidden Tabs
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                    {hiddenTabs.length}
                  </span>
                </div>
                {hiddenTabs.some((t) => t.closable) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      hiddenTabs.forEach((t) => {
                        if (t.closable) closeTab(t.id);
                      });
                    }}
                    className="text-[11px] font-medium text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    title="Close all hidden tabs"
                  >
                    Close all
                  </button>
                )}
              </div>

              {/* Quick Search Filter if more than 5 tabs */}
              {hiddenTabs.length > 5 && (
                <div className="px-2 pt-2 pb-1 border-b border-slate-100 dark:border-[#202020] shrink-0">
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 absolute left-2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filter tabs..."
                      value={filterTerm}
                      onChange={(e) => setFilterTerm(e.target.value)}
                      className="w-full pl-7 pr-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-[#1a1a1a] border border-transparent focus:border-primary/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* Scrollable Tab Items List */}
              <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-[280px] custom-scrollbar">
                {filteredHiddenTabs.map((tab) => {
                  const Icon = getModuleIcon(tab.module);
                  const isActive = tab.id === activeTabId;

                  return (
                    <div
                      key={tab.id}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => {
                        handleTabClick(tab);
                        setIsOverflowOpen(false);
                        setFilterTerm('');
                      }}
                      onAuxClick={(e) => {
                        if (e.button === 1 && tab.closable) {
                          e.preventDefault();
                          closeTab(tab.id);
                        }
                      }}
                      className={`group flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary dark:bg-primary/15 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{tab.title}</span>
                      </div>

                      {/* Close Tab X button */}
                      {tab.closable && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeTab(tab.id);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shrink-0 cursor-pointer"
                          title={`Close ${tab.title} tab`}
                          aria-label={`Close ${tab.title} tab`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {filteredHiddenTabs.length === 0 && (
                  <div className="px-3 py-4 text-center text-xs text-slate-400">
                    No matching tabs found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Hidden Off-Screen Container to Measure True Tab Rendered Widths */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="fixed -top-[9999px] left-0 pointer-events-none opacity-0 flex items-center gap-1 invisible select-none"
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {tabs.map((tab) => {
          const Icon = getModuleIcon(tab.module);
          return (
            <div
              key={`measure-${tab.id}`}
              data-measure-tab-id={tab.id}
              className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                tabClasses[tabStyle] || tabClasses.standard
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="max-w-[140px] truncate">{tab.title}</span>
              {tab.closable && (
                <span className="p-0.5 ml-0.5 inline-flex items-center">
                  <X className="w-3 h-3" />
                </span>
              )}
            </div>
          );
        })}
        {/* Measure overflow indicator element */}
        <div
          ref={measureOverflowRef}
          className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold shrink-0"
        >
          <span className="w-px h-4 mx-1.5" />
          <span>+ 99</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
