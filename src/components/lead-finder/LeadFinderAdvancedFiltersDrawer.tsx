import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Search, 
  RotateCcw, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Users, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Globe, 
  Database, 
  Clock, 
  UserX, 
  MessageSquare, 
  Plus, 
  Trash2,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { useLeadSearch, LeadFilterState, CustomFilterRule, INITIAL_LEAD_FILTERS } from '../../context/LeadSearchContext';
import { Button } from '../ui/Button';
import { LeadFinderCompanyDomainFilter } from './LeadFinderCompanyDomainFilter';

export interface LeadFinderAdvancedFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadFinderAdvancedFiltersDrawer: React.FC<LeadFinderAdvancedFiltersDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilters, resetFilters } = useLeadSearch();
  
  // Local Draft State for High Performance
  const [draft, setDraft] = useState<LeadFilterState>(filters);
  const [filterSearch, setFilterSearch] = useState<string>('');
  
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    companyDomains: false,
    company: false,
    person: false,
    contact: false,
    location: true,
    intent: true,
    activity: true,
    quality: true,
    tech: true,
    company_signals: true,
    buying_signals: true,
    sources: true,
    freshness: true,
    duplicates: true,
    engagement: true,
    custom: true,
  });

  // Sync draft with current filters whenever drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper for multi-select arrays in draft
  const toggleDraftArray = (category: keyof LeadFilterState, value: string) => {
    setDraft((prev) => {
      const arr = (prev[category] as string[]) || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [category]: next };
    });
  };

  // Calculate Active Filter Count
  const activeCount = useMemo(() => {
    let count = 0;
    if (draft.companyDomains && draft.companyDomains.length > 0) count += draft.companyDomains.length;
    if (draft.contactTypes.length > 0) count += draft.contactTypes.length;
    if (draft.headcount.length > 0) count += draft.headcount.length;
    if (draft.revenue.length > 0) count += draft.revenue.length;
    if (draft.industries.length > 0) count += draft.industries.length;
    if (draft.companyTypes.length > 0) count += draft.companyTypes.length;
    if (draft.fundingStage.length > 0) count += draft.fundingStage.length;
    if (draft.totalFunding.length > 0) count += draft.totalFunding.length;
    if (draft.roles.length > 0) count += draft.roles.length;
    if (draft.departments.length > 0) count += draft.departments.length;
    if (draft.seniority.length > 0) count += draft.seniority.length;
    if (draft.locations.length > 0) count += draft.locations.length;
    if (draft.workplaceType.length > 0) count += draft.workplaceType.length;
    if (draft.timeZones.length > 0) count += draft.timeZones.length;
    if (draft.intentSignals.length > 0) count += draft.intentSignals.length;
    if (draft.intentTopics.length > 0) count += draft.intentTopics.length;
    if (draft.activityRecency.length > 0) count += draft.activityRecency.length;
    if (draft.contactQuality.length > 0) count += draft.contactQuality.length;
    if (draft.qualityScoreMin > 0 || draft.qualityScoreMax < 100) count += 1;
    if (draft.technologies.length > 0) count += draft.technologies.length;
    if (draft.techCategories.length > 0) count += draft.techCategories.length;
    if (draft.companySignals.length > 0) count += draft.companySignals.length;
    if (draft.buyingSignals.length > 0) count += draft.buyingSignals.length;
    if (draft.leadSources.length > 0) count += draft.leadSources.length;
    if (draft.dataFreshness.length > 0) count += draft.dataFreshness.length;
    if (draft.excludeCurrentCustomers) count += 1;
    if (draft.excludeOpenOpportunities) count += 1;
    if (draft.engagementStatus.length > 0) count += draft.engagementStatus.length;
    if (draft.customRules.length > 0) count += draft.customRules.length;
    return count;
  }, [draft]);

  const handleApply = () => {
    updateFilters(draft);
    onClose();
  };

  const handleClearAll = () => {
    setDraft(INITIAL_LEAD_FILTERS);
    resetFilters();
  };

  // Custom Filter Rule Handlers
  const addCustomRule = () => {
    const newRule: CustomFilterRule = {
      id: `rule_${Date.now()}`,
      field: 'headcount',
      operator: 'equals',
      value: '',
      logic: 'AND',
    };
    setDraft((prev) => ({ ...prev, customRules: [...prev.customRules, newRule] }));
  };

  const removeCustomRule = (id: string) => {
    setDraft((prev) => ({ ...prev, customRules: prev.customRules.filter((r) => r.id !== id) }));
  };

  const updateCustomRule = (id: string, updates: Partial<CustomFilterRule>) => {
    setDraft((prev) => ({
      ...prev,
      customRules: prev.customRules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  };

  // Search Match Helper
  const matchesSearch = (text: string) => {
    if (!filterSearch.trim()) return true;
    return text.toLowerCase().includes(filterSearch.toLowerCase());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slideout Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-[540px]">
        <div className="w-full h-full bg-white dark:bg-[#161616] shadow-2xl flex flex-col border-l border-slate-200/80 dark:border-[#2A2A2A] animate-in slide-in-from-right duration-200">
          
          {/* 1. Header Toolbar */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight uppercase">
                Advanced Filters
              </h2>
              {activeCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                  {activeCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Search All Filters Input */}
          <div className="p-3.5 border-b border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Search all filters (e.g. revenue, email, tech, intent)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 3. Scrollable Filter Sections Accordion */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs divide-y divide-slate-100 dark:divide-white/[0.04]">
            
            {/* SECTION: COMPANY / DOMAIN */}
            {(matchesSearch('company') || matchesSearch('domain') || matchesSearch('website') || matchesSearch('target') || matchesSearch('single') || matchesSearch('batch') || matchesSearch('csv') || matchesSearch('sheet')) && (
              <div className="space-y-3 pt-2 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggleSection('companyDomains')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Company / Domain</span>
                    {draft.companyDomains && draft.companyDomains.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-primary text-white">
                        {draft.companyDomains.length}
                      </span>
                    )}
                  </div>
                  {collapsed['companyDomains'] ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {!collapsed['companyDomains'] && (
                  <div className="pt-1">
                    <LeadFinderCompanyDomainFilter
                      selectedDomains={draft.companyDomains || []}
                      onChange={(newDomains) => setDraft((prev) => ({ ...prev, companyDomains: newDomains }))}
                      onClearAll={() => setDraft((prev) => ({ ...prev, companyDomains: [] }))}
                    />
                  </div>
                )}
              </div>
            )}

            {/* SECTION 1: CONTACT */}
            {(matchesSearch('contact') || matchesSearch('email') || matchesSearch('phone') || matchesSearch('mobile')) && (
              <div className="space-y-3 pt-2 first:pt-0">
                <button
                  type="button"
                  onClick={() => toggleSection('contact')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>1. Contact Availability & Quality</span>
                  </div>
                  {collapsed['contact'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['contact'] && (
                  <div className="space-y-2 pl-6">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'email_available', label: 'Email Available' },
                        { id: 'mobile_available', label: 'Mobile Available' },
                        { id: 'both_available', label: 'Both Available' },
                        { id: 'direct_email', label: 'Direct Work Email' },
                        { id: 'verified_email', label: 'Verified Email' },
                        { id: 'verified_phone', label: 'Verified Mobile' },
                        { id: 'landline', label: 'Direct Dial / Landline' },
                        { id: 'no_contact', label: 'No Contact Data' },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={draft.contactTypes.includes(item.id)}
                            onChange={() => toggleDraftArray('contactTypes', item.id)}
                            className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-[11px] font-medium">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 2: COMPANY */}
            {(matchesSearch('company') || matchesSearch('headcount') || matchesSearch('revenue') || matchesSearch('size') || matchesSearch('industry')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('company')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span>2. Company & Firmographics</span>
                  </div>
                  {collapsed['company'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['company'] && (
                  <div className="space-y-3.5 pl-6">
                    {/* Headcount */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company Size</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001-5,000', '5,001-10,000', '10,001+'].map((size) => {
                          const isSel = draft.headcount.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleDraftArray('headcount', size)}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Revenue Range */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annual Revenue Range</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['$0-$1M', '$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M-$500M', '$500M+'].map((rev) => {
                          const isSel = draft.revenue.includes(rev);
                          return (
                            <button
                              key={rev}
                              type="button"
                              onClick={() => toggleDraftArray('revenue', rev)}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300'
                              }`}
                            >
                              {rev}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Industry Sector</label>
                      <div className="space-y-1">
                        {[
                          'Enterprise B2B SaaS',
                          'Cybersecurity & DevOps',
                          'FinTech & B2B Payments',
                          'Healthcare & Life Sciences',
                          'E-Commerce & Supply Chain',
                          'Marketing & Growth Agencies',
                        ].map((ind) => (
                          <label
                            key={ind}
                            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={draft.industries.includes(ind)}
                              onChange={() => toggleDraftArray('industries', ind)}
                              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[11px] font-medium">{ind}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Funding Stage */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Funding Stage</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Pre-IPO'].map((stage) => {
                          const isSel = draft.fundingStage.includes(stage);
                          return (
                            <button
                              key={stage}
                              type="button"
                              onClick={() => toggleDraftArray('fundingStage', stage)}
                              className={`px-2 py-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A]'
                              }`}
                            >
                              {stage}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 3: PERSON */}
            {(matchesSearch('person') || matchesSearch('title') || matchesSearch('role') || matchesSearch('seniority') || matchesSearch('department')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('person')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>3. Person, Title & Seniority</span>
                  </div>
                  {collapsed['person'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['person'] && (
                  <div className="space-y-3.5 pl-6">
                    {/* Seniority */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Seniority Level</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['Owner', 'Founder', 'C-Level', 'VP', 'Director', 'Head', 'Manager', 'Senior', 'Mid-Level', 'Entry-Level'].map((sen) => {
                          const isSel = draft.seniority.includes(sen);
                          return (
                            <button
                              key={sen}
                              type="button"
                              onClick={() => toggleDraftArray('seniority', sen)}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A]'
                              }`}
                            >
                              {sen}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Department */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department / Function</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          'Sales', 'Marketing', 'Engineering', 'Product', 'Finance', 
                          'HR', 'Operations', 'IT', 'Procurement', 'Legal', 'Customer Success'
                        ].map((dept) => (
                          <label
                            key={dept}
                            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={draft.departments.includes(dept)}
                              onChange={() => toggleDraftArray('departments', dept)}
                              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[11px] font-medium">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 4: LOCATION */}
            {(matchesSearch('location') || matchesSearch('country') || matchesSearch('remote') || matchesSearch('city') || matchesSearch('timezone')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('location')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>4. Geography & Location</span>
                  </div>
                  {collapsed['location'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['location'] && (
                  <div className="space-y-3.5 pl-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Country & Region</label>
                      <div className="space-y-1">
                        {[
                          'United States',
                          'United Kingdom',
                          'Canada',
                          'France',
                          'Germany',
                          'Australia',
                          'European Union',
                        ].map((loc) => (
                          <label
                            key={loc}
                            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={draft.locations.includes(loc)}
                              onChange={() => toggleDraftArray('locations', loc)}
                              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-[11px] font-medium">{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Workplace Type */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Workplace Model</label>
                      <div className="flex gap-2">
                        {['Remote', 'Hybrid', 'On-Site'].map((type) => {
                          const isSel = draft.workplaceType.includes(type);
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => toggleDraftArray('workplaceType', type)}
                              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A]'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 5: INTENT & BUYING SIGNALS */}
            {(matchesSearch('intent') || matchesSearch('signal') || matchesSearch('buying') || matchesSearch('pricing')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('intent')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>5. Intent Topics & Buying Signals</span>
                  </div>
                  {collapsed['intent'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['intent'] && (
                  <div className="space-y-3.5 pl-6">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Product Interest',
                        'Category Interest',
                        'Website Visit',
                        'Pricing Page Visit',
                        'Competitor Research',
                        'Hiring Intent',
                        'Expansion Intent',
                        'Technology Change',
                        'Funding Event',
                        'Leadership Change',
                      ].map((topic) => (
                        <label
                          key={topic}
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={draft.intentTopics.includes(topic)}
                            onChange={() => toggleDraftArray('intentTopics', topic)}
                            className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-[11px] font-medium">{topic}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 6: TECHNOLOGY STACK */}
            {(matchesSearch('tech') || matchesSearch('software') || matchesSearch('crm') || matchesSearch('cloud') || matchesSearch('stack')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('tech')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span>6. Installed Tech Stack</span>
                  </div>
                  {collapsed['tech'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['tech'] && (
                  <div className="space-y-3.5 pl-6">
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Salesforce', 'HubSpot', 'Stripe', 'AWS', 'PostgreSQL', 
                        'React', 'Snowflake', 'Segment', 'Datadog', 'GCP'
                      ].map((t) => {
                        const isSel = draft.technologies.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleDraftArray('technologies', t)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                              isSel
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A]'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 7: CONTACT QUALITY & ICP SCORE */}
            {(matchesSearch('quality') || matchesSearch('score') || matchesSearch('confidence')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('quality')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>7. Contact Quality & Match Score</span>
                  </div>
                  {collapsed['quality'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['quality'] && (
                  <div className="space-y-3.5 pl-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase">
                        <span>ICP Score Range</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{draft.qualityScoreMin} - {draft.qualityScoreMax}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={draft.qualityScoreMin}
                        onChange={(e) => setDraft((p) => ({ ...p, qualityScoreMin: parseInt(e.target.value) }))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 8: DUPLICATE / CRM EXCLUSIONS */}
            {(matchesSearch('exclude') || matchesSearch('existing') || matchesSearch('customer') || matchesSearch('duplicate')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('duplicates')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-blue-500" />
                    <span>8. Exclusions & Duplicate Protection</span>
                  </div>
                  {collapsed['duplicates'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['duplicates'] && (
                  <div className="space-y-2 pl-6">
                    {[
                      { key: 'excludeCurrentCustomers', label: 'Exclude Current Customers' },
                      { key: 'excludeOpenOpportunities', label: 'Exclude Active CRM Opportunities' },
                      { key: 'excludePreviouslyContacted', label: 'Exclude Previously Contacted' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean((draft as any)[item.key])}
                          onChange={(e) => setDraft((p) => ({ ...p, [item.key]: e.target.checked }))}
                          className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[11px] font-medium">{item.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECTION 9: CUSTOM FILTER RULES */}
            {(matchesSearch('custom') || matchesSearch('rule') || matchesSearch('logic') || matchesSearch('field')) && (
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={() => toggleSection('custom')}
                  className="w-full flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>9. Custom Query Rules (AND / OR)</span>
                  </div>
                  {collapsed['custom'] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </button>

                {!collapsed['custom'] && (
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Group Evaluation Logic:</span>
                      <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setDraft((p) => ({ ...p, customLogic: 'AND' }))}
                          className={`px-2.5 py-1 ${draft.customLogic === 'AND' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}
                        >
                          AND
                        </button>
                        <button
                          type="button"
                          onClick={() => setDraft((p) => ({ ...p, customLogic: 'OR' }))}
                          className={`px-2.5 py-1 ${draft.customLogic === 'OR' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}
                        >
                          OR
                        </button>
                      </div>
                    </div>

                    {draft.customRules.map((rule) => (
                      <div key={rule.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <select
                            value={rule.field}
                            onChange={(e) => updateCustomRule(rule.id, { field: e.target.value })}
                            className="px-2 py-1 rounded-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 text-[11px] text-slate-900 dark:text-white"
                          >
                            <option value="headcount">Headcount</option>
                            <option value="revenue">Revenue</option>
                            <option value="industry">Industry</option>
                            <option value="title">Job Title</option>
                            <option value="location">Location</option>
                          </select>

                          <select
                            value={rule.operator}
                            onChange={(e) => updateCustomRule(rule.id, { operator: e.target.value as any })}
                            className="px-2 py-1 rounded-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 text-[11px] text-slate-900 dark:text-white"
                          >
                            <option value="equals">Equals (=)</option>
                            <option value="contains">Contains</option>
                            <option value="not_equals">Not Equals (!=)</option>
                          </select>

                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={rule.value}
                              onChange={(e) => updateCustomRule(rule.id, { value: e.target.value })}
                              placeholder="Value..."
                              className="w-full px-2 py-1 rounded-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 text-[11px] text-slate-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomRule(rule.id)}
                              className="p-1 text-slate-400 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCustomRule}
                      className="w-full text-xs font-bold gap-1 py-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom Rule</span>
                    </Button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* 4. Footer CTA Buttons */}
          <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs font-semibold px-4"
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="text-xs font-bold px-6 shadow-sm shadow-blue-500/20"
            >
              Apply Filters ({activeCount})
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
