import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Search,
  RotateCcw,
  Sliders,
  ChevronDown,
  Pin,
  Check,
  Filter,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useLeadSearch, LeadFilterState, INITIAL_LEAD_FILTERS } from '../../context/LeadSearchContext';
import { Button } from '../ui/Button';
import {
  FILTER_DEFINITIONS,
  FILTER_CATEGORIES,
  FilterCategory,
  FilterDefinition,
  DEFAULT_PINNED_FILTER_IDS,
} from '../../data/leadFilterRegistry';
import { FilterRowItem } from './filter-controls/FilterRowItem';

export interface LeadFinderAdvancedFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PINNED_STORAGE_KEY = 'outtricks_pinned_lead_filters';

export const LeadFinderAdvancedFiltersDrawer: React.FC<LeadFinderAdvancedFiltersDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilters, resetFilters, allMatchingResults } = useLeadSearch();

  // Local Draft State for High Performance & Isolated Editing
  const [draft, setDraft] = useState<LeadFilterState>(filters);
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<FilterCategory[]>([
    'person',
    'company',
    'engagement',
    'conversation',
    'source',
    'misc',
  ]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  // Pinned Filter IDs State (persisted to localStorage)
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(PINNED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PINNED_FILTER_IDS;
    } catch {
      return DEFAULT_PINNED_FILTER_IDS;
    }
  });

  // Expanded Filter Rows Map
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Sync draft whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
      setFilterSearch('');
    }
  }, [isOpen, filters]);

  // Persist pinned filters
  useEffect(() => {
    try {
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch (e) {
      console.warn('Failed to save pinned filters', e);
    }
  }, [pinnedIds]);

  // Close type dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    if (isTypeDropdownOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [isTypeDropdownOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Toggle pin
  const togglePin = (id: string) => {
    setPinnedIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  // Toggle expand
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle category in Type selector
  const toggleCategory = (cat: FilterCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // don't deselect last
        return prev.filter((c) => c !== cat);
      }
      return [...prev, cat];
    });
  };

  const selectAllCategories = () => {
    setSelectedCategories(['person', 'company', 'engagement', 'conversation', 'source', 'misc']);
  };

  // Calculate Global Active Filter Count
  const activeCount = useMemo(() => {
    return FILTER_DEFINITIONS.reduce((acc, filter) => {
      return acc + filter.calculateActiveCount(draft);
    }, 0);
  }, [draft]);

  // Filter definitions by search query
  const filteredDefinitions = useMemo(() => {
    const query = filterSearch.toLowerCase().trim();
    if (!query) return FILTER_DEFINITIONS;

    return FILTER_DEFINITIONS.filter((f) => {
      const matchLabel = f.label.toLowerCase().includes(query);
      const matchId = f.id.toLowerCase().includes(query);
      const matchKeywords = f.searchKeywords.some((kw) => kw.toLowerCase().includes(query));
      return matchLabel || matchId || matchKeywords;
    });
  }, [filterSearch]);

  // Pinned definitions
  const pinnedDefinitions = useMemo(() => {
    return filteredDefinitions.filter((f) => pinnedIds.includes(f.id));
  }, [filteredDefinitions, pinnedIds]);

  // Definitions grouped by category
  const categorizedDefinitions = useMemo(() => {
    const groups: Record<FilterCategory, FilterDefinition[]> = {
      person: [],
      company: [],
      engagement: [],
      conversation: [],
      source: [],
      misc: [],
    };

    filteredDefinitions.forEach((def) => {
      if (groups[def.category]) {
        groups[def.category].push(def);
      }
    });

    return groups;
  }, [filteredDefinitions]);

  // Apply Changes to LeadFinder Engine
  const handleApply = () => {
    updateFilters(draft);
    onClose();
  };

  // Clear All Draft Criteria
  const handleClearAll = () => {
    setDraft(INITIAL_LEAD_FILTERS);
    resetFilters();
  };

  if (!isOpen) return null;

  const isAllCategoriesSelected = selectedCategories.length === FILTER_CATEGORIES.length;
  const categorySelectorLabel = isAllCategoriesSelected
    ? 'Type: All'
    : selectedCategories.length === 1
    ? `Type: ${FILTER_CATEGORIES.find((c) => c.id === selectedCategories[0])?.label}`
    : `Type: ${selectedCategories.length} selected`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* 1. Dark Backdrop with soft blur */}
      <div
        className="fixed inset-0 bg-slate-950/70 dark:bg-black/85 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 2. Main Large Modal Window */}
      <div className="relative z-10 w-[94vw] max-w-7xl h-[88vh] max-h-[920px] bg-slate-50 dark:bg-[#141414] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#262626] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* ========================================================
            TOP BAR
           ======================================================== */}
        <div className="h-16 px-4 sm:px-6 border-b border-slate-200/90 dark:border-[#262626] flex items-center justify-between gap-3 shrink-0 bg-white dark:bg-[#181818]">
          {/* Left: Title + Active Badge + Search Filters + Type Selector */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Title & Count */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-black text-sm sm:text-base text-slate-950 dark:text-white tracking-tight">
                Filters
              </span>
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={handleClearAll}
                  title="Click to clear all active filters"
                  className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>× {activeCount}</span>
                </button>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-[#262626]">
                  0
                </span>
              )}
            </div>

            {/* Global Search Filters Input */}
            <div className="relative max-w-xs w-full min-w-[140px] sm:min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Search filters..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              {filterSearch && (
                <button
                  type="button"
                  onClick={() => setFilterSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Type / Category Selector Dropdown */}
            <div className="relative shrink-0" ref={typeDropdownRef}>
              <button
                type="button"
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  !isAllCategoriesSelected
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/[0.08]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{categorySelectorLabel}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isTypeDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-64 p-2 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2E2E2E] shadow-xl z-50 animate-in fade-in duration-150 space-y-1">
                  <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-slate-100 dark:border-white/[0.06] px-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Filter Discovery
                    </span>
                    <button
                      type="button"
                      onClick={selectAllCategories}
                      className="text-[10px] font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                  </div>

                  {FILTER_CATEGORIES.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-slate-300 dark:border-white/20'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{cat.label}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Record Counter + Clear All + Apply Filters + Close */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Record Counter */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white">
                {(allMatchingResults?.length ? allMatchingResults.length * 1000 + 43200 : 81788937).toLocaleString()}
              </span>
              <span>records found</span>
            </div>

            {/* Clear All Button */}
            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer px-2 py-1 rounded-lg"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}

            {/* Primary Apply Filters Action */}
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="font-bold text-xs h-8 px-4 rounded-xl shadow-sm cursor-pointer"
            >
              Apply Filters
            </Button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            CONTENT AREA: MULTI-COLUMN FILTER LIBRARY
           ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filterSearch.trim() ? (
            /* ========================================================
               SEARCH RESULTS GRID
               ======================================================== */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-[#262626] pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Matching Filters ({filteredDefinitions.length})
                </span>
                <span className="text-xs text-slate-400">
                  Search query: &ldquo;{filterSearch}&rdquo;
                </span>
              </div>

              {filteredDefinitions.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    No filter definitions match &ldquo;{filterSearch}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try searching for common dimensions like &ldquo;revenue&rdquo;, &ldquo;technology&rdquo;, &ldquo;location&rdquo;, &ldquo;employees&rdquo;, or &ldquo;education&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredDefinitions.map((filter) => (
                    <FilterRowItem
                      key={filter.id}
                      filter={filter}
                      isExpanded={Boolean(expandedIds[filter.id])}
                      isPinned={pinnedIds.includes(filter.id)}
                      activeCount={filter.calculateActiveCount(draft)}
                      draft={draft}
                      setDraft={setDraft}
                      onToggleExpand={() => toggleExpand(filter.id)}
                      onTogglePin={() => togglePin(filter.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ========================================================
               STANDARD MULTI-COLUMN FILTER LIBRARY LAYOUT
               ======================================================== */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
              
              {/* COLUMN 1: PINNED FILTERS */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                  <Pin className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Pinned Filters
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                    {pinnedDefinitions.length}
                  </span>
                </div>

                {pinnedDefinitions.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-[#262626] text-center text-xs text-slate-400">
                    Pin filters from the library using the pin icon to access them here.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pinnedDefinitions.map((filter) => (
                      <FilterRowItem
                        key={`pinned_${filter.id}`}
                        filter={filter}
                        isExpanded={Boolean(expandedIds[filter.id])}
                        isPinned={true}
                        activeCount={filter.calculateActiveCount(draft)}
                        draft={draft}
                        setDraft={setDraft}
                        onToggleExpand={() => toggleExpand(filter.id)}
                        onTogglePin={() => togglePin(filter.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* COLUMN 2: PERSON INFO */}
              {selectedCategories.includes('person') && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Person Info
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                      {categorizedDefinitions.person.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {categorizedDefinitions.person.map((filter) => (
                      <FilterRowItem
                        key={filter.id}
                        filter={filter}
                        isExpanded={Boolean(expandedIds[filter.id])}
                        isPinned={pinnedIds.includes(filter.id)}
                        activeCount={filter.calculateActiveCount(draft)}
                        draft={draft}
                        setDraft={setDraft}
                        onToggleExpand={() => toggleExpand(filter.id)}
                        onTogglePin={() => togglePin(filter.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* COLUMN 3: COMPANY INFO */}
              {selectedCategories.includes('company') && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Company Info
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                      {categorizedDefinitions.company.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {categorizedDefinitions.company.map((filter) => (
                      <FilterRowItem
                        key={filter.id}
                        filter={filter}
                        isExpanded={Boolean(expandedIds[filter.id])}
                        isPinned={pinnedIds.includes(filter.id)}
                        activeCount={filter.calculateActiveCount(draft)}
                        draft={draft}
                        setDraft={setDraft}
                        onToggleExpand={() => toggleExpand(filter.id)}
                        onTogglePin={() => togglePin(filter.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* COLUMN 4: ENGAGEMENT, CONVERSATION, SOURCE, MISC */}
              {(selectedCategories.includes('engagement') ||
                selectedCategories.includes('conversation') ||
                selectedCategories.includes('source') ||
                selectedCategories.includes('misc')) && (
                <div className="space-y-6">
                  {/* ENGAGEMENT ACTIVITY */}
                  {selectedCategories.includes('engagement') && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          Engagement Activity
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                          {categorizedDefinitions.engagement.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {categorizedDefinitions.engagement.map((filter) => (
                          <FilterRowItem
                            key={filter.id}
                            filter={filter}
                            isExpanded={Boolean(expandedIds[filter.id])}
                            isPinned={pinnedIds.includes(filter.id)}
                            activeCount={filter.calculateActiveCount(draft)}
                            draft={draft}
                            setDraft={setDraft}
                            onToggleExpand={() => toggleExpand(filter.id)}
                            onTogglePin={() => togglePin(filter.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CONVERSATION */}
                  {selectedCategories.includes('conversation') && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          Conversation
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                          {categorizedDefinitions.conversation.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {categorizedDefinitions.conversation.map((filter) => (
                          <FilterRowItem
                            key={filter.id}
                            filter={filter}
                            isExpanded={Boolean(expandedIds[filter.id])}
                            isPinned={pinnedIds.includes(filter.id)}
                            activeCount={filter.calculateActiveCount(draft)}
                            draft={draft}
                            setDraft={setDraft}
                            onToggleExpand={() => toggleExpand(filter.id)}
                            onTogglePin={() => togglePin(filter.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CREATED SOURCE */}
                  {selectedCategories.includes('source') && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          Created Source
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                          {categorizedDefinitions.source.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {categorizedDefinitions.source.map((filter) => (
                          <FilterRowItem
                            key={filter.id}
                            filter={filter}
                            isExpanded={Boolean(expandedIds[filter.id])}
                            isPinned={pinnedIds.includes(filter.id)}
                            activeCount={filter.calculateActiveCount(draft)}
                            draft={draft}
                            setDraft={setDraft}
                            onToggleExpand={() => toggleExpand(filter.id)}
                            onTogglePin={() => togglePin(filter.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MISC */}
                  {selectedCategories.includes('misc') && (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-slate-200/80 dark:border-[#262626]">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          Misc.
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 ml-auto">
                          {categorizedDefinitions.misc.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {categorizedDefinitions.misc.map((filter) => (
                          <FilterRowItem
                            key={filter.id}
                            filter={filter}
                            isExpanded={Boolean(expandedIds[filter.id])}
                            isPinned={pinnedIds.includes(filter.id)}
                            activeCount={filter.calculateActiveCount(draft)}
                            draft={draft}
                            setDraft={setDraft}
                            onToggleExpand={() => toggleExpand(filter.id)}
                            onTogglePin={() => togglePin(filter.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================
            STICKY FOOTER ACTIONS (Mobile / Compact Viewports)
           ======================================================== */}
        <div className="sm:hidden p-3 border-t border-slate-200 dark:border-[#262626] bg-white dark:bg-[#181818] flex items-center justify-between gap-2">
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-bold text-red-600 dark:text-red-400 cursor-pointer"
            >
              Clear All ({activeCount})
            </button>
          ) : (
            <span className="text-xs text-slate-400">0 active filters</span>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs h-8">
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply} className="text-xs h-8 font-bold">
              Apply Filters
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
