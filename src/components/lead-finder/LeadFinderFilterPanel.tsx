import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  MapPin, 
  Cpu, 
  TrendingUp, 
  Mail, 
  Phone, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  X, 
  Search, 
  Check, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Globe,
  Plus
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SearchableMultiSelect } from '../ui/SearchableMultiSelect';
import { IncludeExcludeFilterGroup } from '../ui/IncludeExcludeFilterGroup';
import { LeadFinderLocationFilter } from './LeadFinderLocationFilter';
import { leadFilterOptions } from '../../data/leadFilterOptions';
import { useLeadSearch, LeadFilterState } from '../../context/LeadSearchContext';

export interface LeadFinderFilterPanelProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onCollapse?: () => void;
}

export const LeadFinderFilterPanel: React.FC<LeadFinderFilterPanelProps> = ({
  isOpenMobile,
  onCloseMobile,
  onCollapse,
}) => {
  const { filters, toggleFilterValue, updateFilters, resetFilters, setIsAdvancedFiltersDrawerOpen } = useLeadSearch();

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    roles: false,
    industries: false,
    headcount: false,
    locations: false,
    technologies: false,
    intent: false,
  });

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeFiltersCount = 
    (filters.companyDomains?.length || 0) +
    (filters.excludeCompanyDomains?.length || 0) +
    (filters.companies?.length || 0) +
    (filters.excludeCompanies?.length || 0) +
    filters.roles.length +
    (filters.excludeRoles?.length || 0) +
    filters.seniority.length +
    (filters.excludeSeniority?.length || 0) +
    filters.industries.length +
    (filters.excludeIndustries?.length || 0) +
    filters.headcount.length +
    (filters.excludeHeadcount?.length || 0) +
    filters.revenue.length +
    (filters.excludeRevenue?.length || 0) +
    ((filters.contactLocations && filters.contactLocations.length > 0) ? filters.contactLocations.length : filters.locations.length) +
    ((filters.excludeContactLocations && filters.excludeContactLocations.length > 0) ? filters.excludeContactLocations.length : (filters.excludeLocations?.length || 0)) +
    (filters.accountLocations?.length || 0) +
    (filters.excludeAccountLocations?.length || 0) +
    (filters.zipPostalRadius?.enabled && filters.zipPostalRadius.zip.trim() ? 1 : 0) +
    filters.technologies.length +
    (filters.excludeTechnologies?.length || 0) +
    filters.intentSignals.length +
    (filters.excludeIntentSignals?.length || 0) +
    filters.intentTopics.length +
    (filters.excludeIntentTopics?.length || 0) +
    (filters.deliverability !== 'all' ? 1 : 0) +
    (filters.hasPhone ? 1 : 0);

  const filterContent = (
    <div className="space-y-4 font-sans text-xs">
      
      {/* Header with Active Filter Count & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <span className="font-extrabold text-sm text-slate-950 dark:text-white">
            8D Filter Matrix
          </span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {onCollapse && (
            <button
              type="button"
              onClick={onCollapse}
              className="hidden lg:flex items-center justify-center p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors cursor-pointer"
              title="Collapse filters"
              aria-label="Collapse filters"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Launch Advanced Filters Drawer Button */}
      <button
        type="button"
        onClick={() => setIsAdvancedFiltersDrawerOpen(true)}
        className="w-full py-2.5 px-3 rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-xs flex items-center justify-between text-left hover:bg-primary/15 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-2 text-left min-w-0">
          <Sparkles className="w-4 h-4 shrink-0 text-primary" />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-left truncate font-bold">Advanced Filters (15 Dimensions)</span>
            {filters.companyDomains && filters.companyDomains.length > 0 && (
              <span className="text-[10px] text-primary/80 font-medium truncate">
                {filters.companyDomains.length} target {filters.companyDomains.length === 1 ? 'domain/company' : 'domains/companies'} active
              </span>
            )}
          </div>
        </div>
        <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-mono shrink-0 ml-1">Open</span>
      </button>
      {/* 1. Job Titles & Decision Makers */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('roles')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <Users className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Decision Maker Roles</span>
            {(filters.roles.length > 0 || (filters.excludeRoles?.length || 0) > 0) && (
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {filters.roles.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                    +{filters.roles.length}
                  </span>
                )}
                {(filters.excludeRoles?.length || 0) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-500">
                    -{filters.excludeRoles.length}
                  </span>
                )}
              </div>
            )}
          </div>
          {collapsedSections['roles'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['roles'] && (
          <div className="pt-1">
            <IncludeExcludeFilterGroup
              options={leadFilterOptions.jobTitles}
              include={filters.roles}
              exclude={filters.excludeRoles || []}
              onIncludeChange={(newRoles) => updateFilters({ roles: newRoles })}
              onExcludeChange={(newExclude) => updateFilters({ excludeRoles: newExclude })}
              includePlaceholder="Search job titles to include..."
              excludePlaceholder="Search job titles to exclude..."
              searchPlaceholder="Type role (e.g. VP Sales, CRO, Founder)..."
              allowCustom={true}
              extraControls={
                <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-100 dark:border-[#222]">
                  <label className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={Boolean(filters.includeSimilarTitles)}
                      onChange={(e) => updateFilters({ includeSimilarTitles: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-slate-300 dark:border-white/20"
                    />
                    <span>Include similar titles</span>
                  </label>
                  <label className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={Boolean(filters.includePastTitles)}
                      onChange={(e) => updateFilters({ includePastTitles: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-slate-300 dark:border-white/20"
                    />
                    <span>Include past titles</span>
                  </label>
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* 2. Industry & Verticals */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('industries')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <Briefcase className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Industry & Vertical</span>
            {(filters.industries.length > 0 || (filters.excludeIndustries?.length || 0) > 0) && (
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {filters.industries.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                    +{filters.industries.length}
                  </span>
                )}
                {(filters.excludeIndustries?.length || 0) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-500">
                    -{filters.excludeIndustries.length}
                  </span>
                )}
              </div>
            )}
          </div>
          {collapsedSections['industries'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['industries'] && (
          <div className="pt-1">
            <IncludeExcludeFilterGroup
              options={leadFilterOptions.industries}
              include={filters.industries}
              exclude={filters.excludeIndustries || []}
              onIncludeChange={(newInds) => updateFilters({ industries: newInds })}
              onExcludeChange={(newExclude) => updateFilters({ excludeIndustries: newExclude })}
              includePlaceholder="Search industries to include..."
              excludePlaceholder="Search industries to exclude..."
              searchPlaceholder="Type industry (e.g. SaaS, FinTech, AI)..."
              allowCustom={true}
            />
          </div>
        )}
      </div>

      {/* 3. Company Headcount */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('headcount')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Company Headcount</span>
            {filters.headcount.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary">
                {filters.headcount.length}
              </span>
            )}
          </div>
          {collapsedSections['headcount'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['headcount'] && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {leadFilterOptions.headcountRanges.map((size) => {
              const isChecked = filters.headcount.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleFilterValue('headcount', size)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all text-left truncate cursor-pointer ${
                    isChecked
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Geography / Location */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('locations')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Location</span>
            {(() => {
              const cInc = (filters.contactLocations && filters.contactLocations.length > 0) ? filters.contactLocations : filters.locations;
              const cExc = (filters.excludeContactLocations && filters.excludeContactLocations.length > 0) ? filters.excludeContactLocations : (filters.excludeLocations || []);
              const aInc = filters.accountLocations || [];
              const aExc = filters.excludeAccountLocations || [];
              const totalInc = cInc.length + aInc.length;
              const totalExc = cExc.length + aExc.length;
              if (totalInc === 0 && totalExc === 0) return null;
              return (
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  {totalInc > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                      +{totalInc}
                    </span>
                  )}
                  {totalExc > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-500">
                      -{totalExc}
                    </span>
                  )}
                </div>
              );
            })()}
          </div>
          {collapsedSections['locations'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['locations'] && (
          <div className="pt-1">
            <LeadFinderLocationFilter
              contactInclude={(filters.contactLocations && filters.contactLocations.length > 0) ? filters.contactLocations : filters.locations}
              contactExclude={(filters.excludeContactLocations && filters.excludeContactLocations.length > 0) ? filters.excludeContactLocations : (filters.excludeLocations || [])}
              onContactIncludeChange={(val) => updateFilters({ contactLocations: val, locations: val })}
              onContactExcludeChange={(val) => updateFilters({ excludeContactLocations: val, excludeLocations: val })}
              accountInclude={filters.accountLocations || []}
              accountExclude={filters.excludeAccountLocations || []}
              onAccountIncludeChange={(val) => updateFilters({ accountLocations: val })}
              onAccountExcludeChange={(val) => updateFilters({ excludeAccountLocations: val })}
              zipPostalRadius={filters.zipPostalRadius}
              onZipPostalRadiusChange={(val) => updateFilters({ zipPostalRadius: val })}
            />
          </div>
        )}
      </div>

      {/* 5. Technographics */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('technologies')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <Cpu className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Technographic Stack</span>
            {(filters.technologies.length > 0 || (filters.excludeTechnologies?.length || 0) > 0) && (
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {filters.technologies.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                    +{filters.technologies.length}
                  </span>
                )}
                {(filters.excludeTechnologies?.length || 0) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-500">
                    -{filters.excludeTechnologies.length}
                  </span>
                )}
              </div>
            )}
          </div>
          {collapsedSections['technologies'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['technologies'] && (
          <div className="pt-1">
            <IncludeExcludeFilterGroup
              options={leadFilterOptions.technologies}
              include={filters.technologies}
              exclude={filters.excludeTechnologies || []}
              onIncludeChange={(newTechs) => updateFilters({ technologies: newTechs })}
              onExcludeChange={(newExclude) => updateFilters({ excludeTechnologies: newExclude })}
              includePlaceholder="Search technology to include..."
              excludePlaceholder="Search technology to exclude..."
              searchPlaceholder="Type tech (e.g. Salesforce, AWS)..."
              allowCustom={true}
            />
          </div>
        )}
      </div>

      {/* 6. Real-Time Buying Intent Signals */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('intent')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <TrendingUp className="w-4 h-4 text-primary shrink-0" />
            <span className="text-left text-xs font-bold truncate">Buying Intent Signals</span>
            {(filters.intentSignals.length + filters.intentTopics.length + (filters.excludeIntentSignals?.length || 0) + (filters.excludeIntentTopics?.length || 0)) > 0 && (
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {(filters.intentSignals.length + filters.intentTopics.length) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-primary/10 text-primary">
                    +{filters.intentSignals.length + filters.intentTopics.length}
                  </span>
                )}
                {((filters.excludeIntentSignals?.length || 0) + (filters.excludeIntentTopics?.length || 0)) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full font-bold bg-rose-500/10 text-rose-500">
                    -{(filters.excludeIntentSignals?.length || 0) + (filters.excludeIntentTopics?.length || 0)}
                  </span>
                )}
              </div>
            )}
          </div>
          {collapsedSections['intent'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['intent'] && (
          <div className="pt-1">
            <IncludeExcludeFilterGroup
              options={leadFilterOptions.intentTopics}
              include={filters.intentSignals.length > 0 ? filters.intentSignals : filters.intentTopics}
              exclude={filters.excludeIntentSignals?.length ? filters.excludeIntentSignals : (filters.excludeIntentTopics || [])}
              onIncludeChange={(newSignals) => updateFilters({ intentSignals: newSignals, intentTopics: newSignals })}
              onExcludeChange={(newExclude) => updateFilters({ excludeIntentSignals: newExclude, excludeIntentTopics: newExclude })}
              includePlaceholder="Search intent signals to include..."
              excludePlaceholder="Search intent signals to exclude..."
              searchPlaceholder="Type intent (e.g. Hiring, Funding, Stack Shift)..."
              allowCustom={true}
            />
          </div>
        )}
      </div>

      {/* 7. Contact Verification & Phone Status */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <div className="font-bold text-slate-900 dark:text-white flex items-center justify-start text-left gap-2">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span className="text-left text-xs font-bold">Contact Verification</span>
        </div>

        <div className="space-y-1.5 pl-6">
          <label className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white">
            <input
              type="checkbox"
              checked={filters.deliverability === 'verified_only'}
              onChange={(e) =>
                updateFilters({
                  deliverability: e.target.checked ? 'verified_only' : 'all',
                })
              }
              className="w-3.5 h-3.5 shrink-0 rounded text-primary border-slate-300 dark:border-[#2A2A2A] focus:ring-primary"
            />
            <span className="text-left text-xs">100% Deliverable Work Emails Only</span>
          </label>

          <label className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white">
            <input
              type="checkbox"
              checked={filters.hasPhone}
              onChange={(e) =>
                updateFilters({
                  hasPhone: e.target.checked,
                })
              }
              className="w-3.5 h-3.5 shrink-0 rounded text-primary border-slate-300 dark:border-[#2A2A2A] focus:ring-primary"
            />
            <span className="text-left text-xs">Direct Mobile Phone Available</span>
          </label>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-64 xl:w-72 2xl:w-80 shrink-0 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        {filterContent}
      </div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[90vw] h-full bg-white dark:bg-[#161616] shadow-2xl p-5 overflow-y-auto border-r border-slate-200 dark:border-[#2A2A2A] z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#202020]">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Filter Matrix</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};
