import React, { useState } from 'react';
import { MapPin, Building2, User, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { IncludeExcludeFilterGroup } from '../ui/IncludeExcludeFilterGroup';
import { leadFilterOptions } from '../../data/leadFilterOptions';

export interface ZipPostalRadiusState {
  enabled: boolean;
  zip: string;
  radius: number;
  unit: 'miles' | 'km';
}

export interface LeadFinderLocationFilterProps {
  // Contact Location
  contactInclude: string[];
  contactExclude: string[];
  onContactIncludeChange: (val: string[]) => void;
  onContactExcludeChange: (val: string[]) => void;

  // Account HQ Location
  accountInclude: string[];
  accountExclude: string[];
  onAccountIncludeChange: (val: string[]) => void;
  onAccountExcludeChange: (val: string[]) => void;

  // Optional ZIP Radius
  zipPostalRadius?: ZipPostalRadiusState;
  onZipPostalRadiusChange?: (val: ZipPostalRadiusState) => void;

  className?: string;
  showRadiusControl?: boolean;
}

export const LeadFinderLocationFilter: React.FC<LeadFinderLocationFilterProps> = ({
  contactInclude,
  contactExclude,
  onContactIncludeChange,
  onContactExcludeChange,
  accountInclude,
  accountExclude,
  onAccountIncludeChange,
  onAccountExcludeChange,
  zipPostalRadius = { enabled: false, zip: '', radius: 25, unit: 'miles' },
  onZipPostalRadiusChange,
  className = '',
  showRadiusControl = true,
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'account'>('contact');

  const contactCount = contactInclude.length + contactExclude.length;
  const accountCount = accountInclude.length + accountExclude.length;

  const handleZipChange = (partial: Partial<ZipPostalRadiusState>) => {
    if (onZipPostalRadiusChange) {
      onZipPostalRadiusChange({
        ...zipPostalRadius,
        ...partial,
      });
    }
  };

  return (
    <div className={`space-y-3 font-sans text-xs ${className}`}>
      {/* 1. Contact vs Account HQ Compact Tabs */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-white/[0.04] p-1 border border-slate-200/80 dark:border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-white dark:bg-[#202020] text-primary shadow-xs border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5 shrink-0" />
          <span>Contact</span>
          {contactCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              {contactCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'account'
              ? 'bg-white dark:bg-[#202020] text-primary shadow-xs border border-slate-200/60 dark:border-white/10'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span>Account HQ</span>
          {accountCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              {accountCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Context Helper Note */}
      <div className="text-[10.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1 px-0.5">
        <span>Filtering by:</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {activeTab === 'contact' ? "Person / Lead's Location" : "Company / Account Headquarters"}
        </span>
      </div>

      {/* 2. Active Tab Searchable Include/Exclude Fields */}
      {activeTab === 'contact' ? (
        <IncludeExcludeFilterGroup
          key="contact_location"
          options={leadFilterOptions.comprehensiveLocations || leadFilterOptions.countries}
          include={contactInclude}
          exclude={contactExclude}
          onIncludeChange={onContactIncludeChange}
          onExcludeChange={onContactExcludeChange}
          includePlaceholder="Search City / State / Country / ZIP..."
          excludePlaceholder="Search locations to exclude..."
          searchPlaceholder="Search city, state, country, or ZIP (e.g. Pakistan, California, London, 90210)..."
          allowCustom={true}
          countNoun="locations"
        />
      ) : (
        <IncludeExcludeFilterGroup
          key="account_location"
          options={leadFilterOptions.comprehensiveLocations || leadFilterOptions.countries}
          include={accountInclude}
          exclude={accountExclude}
          onIncludeChange={onAccountIncludeChange}
          onExcludeChange={onAccountExcludeChange}
          includePlaceholder="Search HQ City / State / Country / ZIP..."
          excludePlaceholder="Search HQ locations to exclude..."
          searchPlaceholder="Search company HQ city, state, country (e.g. United States, New York)..."
          allowCustom={true}
          countNoun="locations"
        />
      )}

      {/* 3. Optional ZIP / Postal Code Radius Control */}
      {showRadiusControl && (
        <div className="pt-2.5 border-t border-slate-100 dark:border-[#222] space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none hover:text-slate-900 dark:hover:text-white">
            <input
              type="checkbox"
              checked={zipPostalRadius.enabled}
              onChange={(e) => handleZipChange({ enabled: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-white/20 text-primary focus:ring-primary"
            />
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span>Filter by ZIP / Postal Code Radius</span>
          </label>

          {zipPostalRadius.enabled && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#2A2A2A] grid grid-cols-2 gap-2 animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  value={zipPostalRadius.zip}
                  onChange={(e) => handleZipChange({ zip: e.target.value })}
                  placeholder="e.g. 90210, SW1A..."
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Radius
                </label>
                <select
                  value={zipPostalRadius.radius}
                  onChange={(e) => handleZipChange({ radius: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={10}>10 miles</option>
                  <option value={25}>25 miles</option>
                  <option value={50}>50 miles</option>
                  <option value={100}>100 miles</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
