import React, { useState } from 'react';
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
  X, 
  Search, 
  Check, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLeadSearch, LeadFilterState } from '../../context/LeadSearchContext';

export interface LeadFinderFilterPanelProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const LeadFinderFilterPanel: React.FC<LeadFinderFilterPanelProps> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const { filters, toggleFilterValue, updateFilters, resetFilters, setIsAdvancedFiltersDrawerOpen } = useLeadSearch();

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    technologies: false,
    intent: false,
  });

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeFiltersCount = 
    filters.roles.length +
    filters.seniority.length +
    filters.industries.length +
    filters.headcount.length +
    filters.revenue.length +
    filters.locations.length +
    filters.technologies.length +
    filters.intentSignals.length +
    (filters.deliverability !== 'all' ? 1 : 0) +
    (filters.hasPhone ? 1 : 0);

  const filterContent = (
    <div className="space-y-4 font-sans text-xs">
      
      {/* Header with Active Filter Count & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-extrabold text-sm text-slate-950 dark:text-white">
            8D Filter Matrix
          </span>
          {activeFiltersCount > 0 && (
            <Badge variant="blue" size="sm">
              {activeFiltersCount} Active
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Launch Advanced Filters Drawer Button */}
      <button
        type="button"
        onClick={() => setIsAdvancedFiltersDrawerOpen(true)}
        className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-between text-left hover:bg-emerald-500/15 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 text-left">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-500" />
          <span className="text-left">Advanced Filters (15 Dimensions)</span>
        </div>
        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono shrink-0">Open</span>
      </button>

      {/* 1. Job Titles & Decision Makers */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => toggleSection('roles')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <Users className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Decision Maker Roles</span>
          </div>
          {collapsedSections['roles'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['roles'] && (
          <div className="space-y-1.5 pl-6">
            {[
              'VP of Sales / CRO',
              'Founder / CEO / Co-Founder',
              'Head of Revenue Operations',
              'Head of Demand Generation',
              'VP of Marketing / CMO',
              'Director of Business Development',
              'Talent Acquisition Lead',
            ].map((role) => {
              const isChecked = filters.roles.includes(role);
              return (
                <label
                  key={role}
                  className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('roles', role)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="truncate text-left text-xs">{role}</span>
                </label>
              );
            })}
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
            <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Industry & Vertical</span>
          </div>
          {collapsedSections['industries'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['industries'] && (
          <div className="space-y-1.5 pl-6">
            {[
              'Enterprise B2B SaaS',
              'FinTech & B2B Payments',
              'Healthcare & MedTech',
              'Cybersecurity & DevOps',
              'E-Commerce & Supply Chain',
              'Marketing & Growth Agencies',
              'Artificial Intelligence & ML',
            ].map((ind) => {
              const isChecked = filters.industries.includes(ind);
              return (
                <label
                  key={ind}
                  className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('industries', ind)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="truncate text-left text-xs">{ind}</span>
                </label>
              );
            })}
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
            <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Company Headcount</span>
          </div>
          {collapsedSections['headcount'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['headcount'] && (
          <div className="grid grid-cols-2 gap-1.5 pl-6">
            {[
              '1-10',
              '11-50',
              '51-200',
              '201-500',
              '501-1000',
              '1000+',
            ].map((size) => {
              const isChecked = filters.headcount.includes(size);
              return (
                <label
                  key={size}
                  className="flex items-center justify-start text-left gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('headcount', size)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="text-left text-xs">{size}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Geography */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <button
          type="button"
          onClick={() => toggleSection('locations')}
          className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white cursor-pointer py-1"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Geography</span>
          </div>
          {collapsedSections['locations'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['locations'] && (
          <div className="space-y-1.5 pl-6">
            {[
              'United States',
              'San Francisco Bay Area',
              'New York Metro Area',
              'Austin, Texas',
              'Canada',
              'United Kingdom',
              'Europe (EU)',
            ].map((loc) => {
              const isChecked = filters.locations.includes(loc);
              return (
                <label
                  key={loc}
                  className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('locations', loc)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="truncate text-left text-xs">{loc}</span>
                </label>
              );
            })}
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
            <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Technographic Stack</span>
          </div>
          {collapsedSections['technologies'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['technologies'] && (
          <div className="grid grid-cols-2 gap-1.5 pl-6">
            {[
              'Salesforce',
              'HubSpot',
              'Stripe',
              'PostgreSQL',
              'React',
              'AWS',
              'Snowflake',
              'Datadog',
            ].map((tech) => {
              const isChecked = filters.technologies.includes(tech);
              return (
                <label
                  key={tech}
                  className="flex items-center justify-start text-left gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('technologies', tech)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="truncate text-left text-xs">{tech}</span>
                </label>
              );
            })}
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
            <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-left text-xs font-bold truncate">Buying Intent Signals</span>
          </div>
          {collapsedSections['intent'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />}
        </button>

        {!collapsedSections['intent'] && (
          <div className="space-y-1.5 pl-6">
            {[
              'Hiring +5 Sales Reps / SDRs',
              'Recent Venture Funding (Series B $32M)',
              'Tool Migration / Tech Shift',
              'Leadership Change / Promotion',
            ].map((sig) => {
              const isChecked = filters.intentSignals.includes(sig);
              return (
                <label
                  key={sig}
                  className="flex items-center justify-start text-left gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilterValue('intentSignals', sig)}
                    className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                  />
                  <span className="truncate text-left text-xs">{sig}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Contact Verification & Phone Status */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#202020]">
        <div className="font-bold text-slate-900 dark:text-white flex items-center justify-start text-left gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
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
              className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
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
              className="w-3.5 h-3.5 shrink-0 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
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
      <div className="hidden lg:block w-72 shrink-0 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
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
