import React from 'react';
import { ChevronDown, ChevronUp, Pin, Lock, Sparkles, HelpCircle } from 'lucide-react';
import { FilterDefinition } from '../../../data/leadFilterRegistry';
import { LeadFilterState } from '../../../context/LeadSearchContext';
import { FilterIcon } from './FilterIcon';
import { JobTitlesFilterControl } from './JobTitlesFilterControl';
import { CompanyFilterControl } from './CompanyFilterControl';
import { EmployeesFilterControl } from './EmployeesFilterControl';
import { HeadcountGrowthControl } from './HeadcountGrowthControl';
import { EducationFilterControl } from './EducationFilterControl';
import { IndustryKeywordsControl } from './IndustryKeywordsControl';
import { BuyingIntentControl } from './BuyingIntentControl';
import { TechnologiesFilterControl } from './TechnologiesFilterControl';
import { RevenueFilterControl } from './RevenueFilterControl';
import { FundingFilterControl } from './FundingFilterControl';
import { EmailStatusControl } from './EmailStatusControl';
import { DuplicateProtectionControl } from './DuplicateProtectionControl';
import { WebsiteVisitorsControl } from './WebsiteVisitorsControl';
import { UnsupportedFeatureControl } from './UnsupportedFeatureControl';
import { GenericMultiSelectControl } from './GenericMultiSelectControl';
import { LeadFinderLocationFilter } from '../LeadFinderLocationFilter';
import { leadFilterOptions } from '../../../data/leadFilterOptions';

interface FilterRowItemProps {
  filter: FilterDefinition;
  isExpanded: boolean;
  isPinned: boolean;
  activeCount: number;
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
  onToggleExpand: () => void;
  onTogglePin: () => void;
}

export const FilterRowItem: React.FC<FilterRowItemProps> = ({
  filter,
  isExpanded,
  isPinned,
  activeCount,
  draft,
  setDraft,
  onToggleExpand,
  onTogglePin,
}) => {
  // Render the expanded control body based on controlType
  const renderControlBody = () => {
    switch (filter.controlType) {
      case 'jobTitles':
        return <JobTitlesFilterControl draft={draft} setDraft={setDraft} />;
      case 'location': {
        const contactInclude = draft.contactLocations?.length ? draft.contactLocations : draft.locations || [];
        const contactExclude = draft.excludeContactLocations?.length
          ? draft.excludeContactLocations
          : draft.excludeLocations || [];

        return (
          <LeadFinderLocationFilter
            contactInclude={contactInclude}
            contactExclude={contactExclude}
            onContactIncludeChange={(val) => setDraft((p) => ({ ...p, contactLocations: val, locations: val }))}
            onContactExcludeChange={(val) => setDraft((p) => ({ ...p, excludeContactLocations: val, excludeLocations: val }))}
            accountInclude={draft.accountLocations || []}
            accountExclude={draft.excludeAccountLocations || []}
            onAccountIncludeChange={(val) => setDraft((p) => ({ ...p, accountLocations: val }))}
            onAccountExcludeChange={(val) => setDraft((p) => ({ ...p, excludeAccountLocations: val }))}
            zipPostalRadius={draft.zipPostalRadius}
            onZipPostalRadiusChange={(val) => setDraft((p) => ({ ...p, zipPostalRadius: val }))}
            showRadiusControl={true}
          />
        );
      }
      case 'company':
        return <CompanyFilterControl draft={draft} setDraft={setDraft} />;
      case 'employees':
        return <EmployeesFilterControl draft={draft} setDraft={setDraft} />;
      case 'headcountGrowth':
        return <HeadcountGrowthControl draft={draft} setDraft={setDraft} />;
      case 'education':
        return <EducationFilterControl draft={draft} setDraft={setDraft} />;
      case 'industryKeywords':
        return <IndustryKeywordsControl draft={draft} setDraft={setDraft} />;
      case 'buyingIntent':
        return <BuyingIntentControl draft={draft} setDraft={setDraft} />;
      case 'technologies':
        return <TechnologiesFilterControl draft={draft} setDraft={setDraft} />;
      case 'revenue':
        return <RevenueFilterControl draft={draft} setDraft={setDraft} />;
      case 'funding':
        return <FundingFilterControl draft={draft} setDraft={setDraft} />;
      case 'emailStatus':
        return <EmailStatusControl draft={draft} setDraft={setDraft} />;
      case 'duplicateProtection':
        return <DuplicateProtectionControl draft={draft} setDraft={setDraft} />;
      case 'websiteVisitors':
        return <WebsiteVisitorsControl draft={draft} setDraft={setDraft} />;
      case 'timeZone': {
        const tzOptions = (draft.timeZones || []).map((tz) => ({ value: tz, label: tz }));
        const standardTz = [
          'US / Eastern (UTC-5)',
          'US / Central (UTC-6)',
          'US / Mountain (UTC-7)',
          'US / Pacific (UTC-8)',
          'Europe / London (GMT)',
          'Europe / Paris (CET)',
          'Asia / Dubai (GST)',
          'Asia / Karachi (PKT)',
          'Asia / Singapore (SGT)',
          'Australia / Sydney (AEST)',
        ].map((tz) => ({ value: tz, label: tz }));

        return (
          <GenericMultiSelectControl
            options={standardTz}
            selected={draft.timeZones || []}
            onChange={(next) => setDraft((p) => ({ ...p, timeZones: next }))}
            placeholder="Select time zones..."
            allowCustom={true}
          />
        );
      }
      case 'marketSegments': {
        const segOptions = leadFilterOptions.marketSegments.map((s) => ({ value: s, label: s }));
        return (
          <GenericMultiSelectControl
            options={segOptions}
            selected={draft.companyTypes || []}
            onChange={(next) => setDraft((p) => ({ ...p, companyTypes: next }))}
            placeholder="Select market segments..."
            allowCustom={true}
          />
        );
      }
      case 'sicNaics': {
        const codeOptions = leadFilterOptions.sicNaicsCodes.map((c) => ({ value: c, label: c }));
        return (
          <GenericMultiSelectControl
            options={codeOptions}
            selected={[]}
            onChange={() => {}}
            placeholder="Search SIC / NAICS codes..."
            allowCustom={true}
          />
        );
      }
      case 'languages': {
        const langOptions = ['English', 'Spanish', 'French', 'German', 'Urdu', 'Arabic', 'Mandarin', 'Japanese'].map(
          (l) => ({ value: l, label: l })
        );
        return (
          <GenericMultiSelectControl
            options={langOptions}
            selected={draft.languages || []}
            onChange={(next) => setDraft((p) => ({ ...p, languages: next }))}
            placeholder="Select languages..."
            allowCustom={true}
          />
        );
      }
      case 'source': {
        const sourceOptions = [
          'Outtricks Real-Time B2B Crawler',
          'Apollo.io Database Sync',
          'ZoomInfo Verified Contact Sync',
          'LinkedIn Sales Navigator Export',
          'CSV / Spreadsheet Bulk Import',
        ].map((s) => ({ value: s, label: s }));

        return (
          <GenericMultiSelectControl
            options={sourceOptions}
            selected={draft.leadSources || []}
            onChange={(next) => setDraft((p) => ({ ...p, leadSources: next }))}
            placeholder="Filter by data source..."
            allowCustom={false}
          />
        );
      }
      default:
        return (
          <UnsupportedFeatureControl
            label={filter.label}
            isLocked={filter.locked}
            isBeta={filter.beta}
          />
        );
    }
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-150 ${
        isExpanded
          ? 'border-primary/50 bg-white dark:bg-[#1A1A1A] shadow-md ring-1 ring-primary/20'
          : activeCount > 0
          ? 'border-primary/40 bg-primary/[0.02] dark:bg-white/[0.02]'
          : 'border-slate-200/80 dark:border-[#262626] bg-white dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#333333]'
      }`}
    >
      {/* Header Row */}
      <div
        data-filter-id={filter.id}
        onClick={onToggleExpand}
        className="flex items-center justify-between p-2.5 sm:px-3 sm:py-2.5 gap-2 select-none cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/[0.02] rounded-t-xl transition-colors group"
      >
        {/* Title & Icon Area */}
        <div className="flex-1 flex items-center gap-2.5 text-left min-w-0">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              activeCount > 0
                ? 'bg-primary/10 text-primary'
                : 'bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
            }`}
          >
            <FilterIcon name={filter.iconName} className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span
              className={`text-xs font-semibold truncate ${
                activeCount > 0
                  ? 'text-slate-950 dark:text-white font-bold'
                  : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white'
              }`}
            >
              {filter.label}
            </span>

            {filter.locked && (
              <span title="Enterprise capability">
                <Lock className="w-3 h-3 text-amber-500/80 shrink-0" />
              </span>
            )}

            {filter.beta && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Beta
              </span>
            )}

            {filter.hasHelpTooltip && (
              <span title={filter.hasHelpTooltip}>
                <HelpCircle className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Active Count Pill, Pin Button, Chevron */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Active Count Badge */}
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/20">
              × {activeCount}
            </span>
          )}

          {/* Pin Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            title={isPinned ? 'Unpin filter' : 'Pin filter to top'}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isPinned
                ? 'text-primary bg-primary/10 hover:bg-primary/20'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
            }`}
          >
            <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-primary' : ''}`} />
          </button>

          {/* Chevron Expand / Collapse */}
          <div className="p-1 rounded-lg text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Inline Expanded Controls */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-[#262626] animate-in fade-in duration-150">
          {renderControlBody()}
        </div>
      )}
    </div>
  );
};
