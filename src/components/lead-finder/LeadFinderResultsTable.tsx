import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell, 
  Pagination 
} from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Tooltip } from '../ui/Tooltip';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Sparkles, 
  Building2,
  Bookmark, 
  Eye, 
  Check, 
  Send, 
  PhoneCall, 
  Plus, 
  Download, 
  ListPlus,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  RotateCcw,
  RefreshCw,
  Lock,
  Sliders
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

/**
 * Formats lead location following clean B2B priority hierarchy:
 * 1. City / Metro + State/Region + Country (e.g. Boston, Massachusetts, United States)
 * 2. City + Country (e.g. Paris, France)
 * 3. Country (e.g. United States)
 * 4. Fallback if location unknown: —
 */
export function formatLeadLocation(lead: LeadDetailData): string {
  const cityOrMetro = lead.metro || lead.city;
  const stateOrRegion = lead.state || lead.region;
  const country = lead.country;

  // 1. City / Metro + State/Region + Country
  if (cityOrMetro && stateOrRegion && country) {
    return `${cityOrMetro}, ${stateOrRegion}, ${country}`;
  }

  // 2. City + Country
  if (cityOrMetro && country) {
    return `${cityOrMetro}, ${country}`;
  }

  // City / Metro + State/Region (if country not specified)
  if (cityOrMetro && stateOrRegion) {
    return `${cityOrMetro}, ${stateOrRegion}`;
  }

  // State/Region + Country
  if (stateOrRegion && country) {
    return `${stateOrRegion}, ${country}`;
  }

  // 3. Country
  if (country) {
    return country;
  }

  // City / Metro only
  if (cityOrMetro) {
    return cityOrMetro;
  }

  // If formatted directly in lead.location (e.g. "San Francisco Bay Area, United States", "Paris, France")
  if (lead.location && lead.location.trim()) {
    return lead.location.trim();
  }

  // 4. Fallback if location unknown
  return '—';
}

export interface LeadFinderResultsTableProps {
  onOpenLeadDetail: (lead: LeadDetailData) => void;
  onTriggerAddToListModal: () => void;
  onPushToSequence: () => void;
  onBatchAddToCrm: () => void;
  onTriggerEnrich?: (singleLead?: LeadDetailData | null) => void;
  onTriggerSaveSearch?: () => void;
  isFilterCollapsed?: boolean;
  onToggleFilters?: () => void;
}

export const LeadFinderResultsTable: React.FC<LeadFinderResultsTableProps> = ({
  onOpenLeadDetail,
  onTriggerAddToListModal,
  onPushToSequence,
  onBatchAddToCrm,
  onTriggerEnrich,
  onTriggerSaveSearch,
  isFilterCollapsed,
  onToggleFilters,
}) => {
  const {
    results,
    allMatchingResults,
    sorting,
    setSorting,
    pagination,
    setPage,
    setPageSize,
    selection,
    toggleSelectLead,
    toggleSelectAllOnPage,
    selectAllMatches,
    clearSelection,
    searchStatus,
    resetFilters,
    exportToCsv
  } = useLeadSearch();

  const { saveLeadToCrm } = useCrm();
  const { currentWorkspace, updateWorkspace } = useAuth();
  const { success, info } = useToast();

  const [unlockedEmails, setUnlockedEmails] = useState<Set<string>>(() => new Set());
  const [unlockedPhones, setUnlockedPhones] = useState<Set<string>>(() => new Set());

  const { selectedIds, isAllSelectedOnPage, isAllMatchesSelected } = selection;

  const handleEnrichEmail = (lead: LeadDetailData) => {
    if (unlockedEmails.has(lead.id)) return;
    if (currentWorkspace && currentWorkspace.credits < 1) {
      info('Insufficient credits to enrich email. Please add credits in Settings > Billing.');
      return;
    }
    if (currentWorkspace) {
      updateWorkspace(currentWorkspace.id, { credits: Math.max(0, currentWorkspace.credits - 1) });
    }
    setUnlockedEmails((prev) => new Set(prev).add(lead.id));
    success(`Enriched email for ${lead.name} · 1 Credit consumed.`);
  };

  const handleEnrichPhone = (lead: LeadDetailData) => {
    if (unlockedPhones.has(lead.id)) return;
    if (currentWorkspace && currentWorkspace.credits < 1) {
      info('Insufficient credits to enrich phone number. Please add credits in Settings > Billing.');
      return;
    }
    if (currentWorkspace) {
      updateWorkspace(currentWorkspace.id, { credits: Math.max(0, currentWorkspace.credits - 1) });
    }
    setUnlockedPhones((prev) => new Set(prev).add(lead.id));
    success(`Enriched phone number for ${lead.name} · 1 Credit consumed.`);
  };

  const handleFullEnrichLead = (lead: LeadDetailData) => {
    const needEmail = !unlockedEmails.has(lead.id);
    const needPhone = !unlockedPhones.has(lead.id) && !!lead.phone;
    const creditsToUse = (needEmail ? 1 : 0) + (needPhone ? 1 : 0);

    if (creditsToUse > 0 && currentWorkspace && currentWorkspace.credits < creditsToUse) {
      info(`Insufficient credits. Need ${creditsToUse} credits for Full Enrich.`);
      return;
    }

    if (creditsToUse > 0 && currentWorkspace) {
      updateWorkspace(currentWorkspace.id, { credits: Math.max(0, currentWorkspace.credits - creditsToUse) });
    }

    setUnlockedEmails((prev) => new Set(prev).add(lead.id));
    if (lead.phone) {
      setUnlockedPhones((prev) => new Set(prev).add(lead.id));
    }
    success(`Full Enrich complete for ${lead.name}: Email & Phone unlocked (${creditsToUse} credit${creditsToUse === 1 ? '' : 's'} used).`);
  };

  const handleSaveSingleLeadToCrm = (lead: LeadDetailData) => {
    const result = saveLeadToCrm({
      name: lead.name,
      title: lead.title,
      company: lead.company,
      domain: lead.domain,
      email: lead.email,
      phone: lead.phone,
      avatar: lead.avatar,
      score: lead.icpScore,
      location: lead.location,
      tags: ['8D Lead Finder', 'High Intent'],
    });

    if (result.isExisting) {
      info(`Existing contact updated: ${result.contact.name} at ${result.contact.companyName}. Linked without duplicate records.`);
    } else {
      success(`Lead saved to CRM: ${result.contact.name} was added to ${result.contact.companyName}.`);
    }
  };

  const handleBulkSaveToCrm = () => {
    const selectedLeads = results.filter((l) => selectedIds.includes(l.id));
    let newCount = 0;
    let existingCount = 0;

    selectedLeads.forEach((lead) => {
      const res = saveLeadToCrm({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        domain: lead.domain,
        email: lead.email,
        phone: lead.phone,
        avatar: lead.avatar,
        score: lead.icpScore,
        location: lead.location,
        tags: ['8D Lead Finder', 'Bulk Saved'],
      });
      if (res.isExisting) existingCount++;
      else newCount++;
    });

    success(`Processed ${selectedLeads.length} leads: ${newCount} new contacts created, ${existingCount} existing records updated with zero duplicates.`);
    clearSelection();
  };

  const handleBulkEnrich = () => {
    success(`Real-time intelligence enrichment completed for ${selectedIds.length} leads. Verified 100% email deliverability.`);
  };

  const handleEnrichSingleLead = (lead: LeadDetailData) => {
    success(`Enriched ${lead.name} (${lead.company}): Direct phone and deliverability verified at 100%.`);
  };

  // Empty State Fallback
  if (results.length === 0 && searchStatus !== 'loading') {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#222222] rounded-3xl space-y-4 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-xs">
          <Search className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
            No Matching Decision Makers Found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your 8D filter criteria, removing specific keywords, or resetting to browse the 480M+ global index.
          </p>
        </div>
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={resetFilters} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset All Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      
      {/* Bulk Action Sticky Bar (Appears when >= 1 item selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-slate-950 dark:bg-[#141414] border border-emerald-500/30 dark:border-[#282828] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-top duration-150 sticky top-2 z-30">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs">
              {selectedIds.length}
            </span>
            <span className="text-xs font-black text-white">
              Leads Selected
            </span>

            {/* Select All Matching Banner Toggle */}
            {allMatchingResults.length > results.length && !isAllMatchesSelected && (
              <button
                type="button"
                onClick={selectAllMatches}
                className="text-xs font-bold text-emerald-400 hover:underline ml-2 cursor-pointer"
              >
                Select all {allMatchingResults.length} matches across all pages
              </button>
            )}

            {isAllMatchesSelected && (
              <Badge variant="emerald" size="sm">
                All {allMatchingResults.length} Matches Selected
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onTriggerEnrich ? onTriggerEnrich() : handleBulkEnrich()}
              leftIcon={<Zap className="w-3.5 h-3.5 text-amber-400" />}
            >
              Enrich
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleBulkSaveToCrm}
              leftIcon={<Building2 className="w-3.5 h-3.5" />}
            >
              Save to CRM
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onTriggerAddToListModal}
              leftIcon={<ListPlus className="w-3.5 h-3.5" />}
            >
              Add to List
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onPushToSequence}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Enroll in Campaign
            </Button>
          </div>
        </div>
      )}

      {/* Top Results Action & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs">
        <div className="flex items-center gap-3 text-xs text-slate-500 min-w-0">
          {onToggleFilters && (
            <Button
              variant={isFilterCollapsed ? "primary" : "outline"}
              size="sm"
              onClick={onToggleFilters}
              className="text-xs font-semibold gap-1.5 shrink-0"
              title={isFilterCollapsed ? "Expand 8D Filter Matrix" : "Collapse 8D Filter Matrix"}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isFilterCollapsed ? 'Show Filters' : 'Hide Filters'}</span>
            </Button>
          )}

          <div className="flex items-center gap-1.5 truncate">
            <span className="font-extrabold text-slate-900 dark:text-white font-mono text-sm">
              {allMatchingResults.length.toLocaleString()}
            </span>
            <span className="text-slate-500 dark:text-slate-400 truncate">decision makers match your active criteria</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onTriggerSaveSearch && (
            <Button
              variant="outline"
              size="sm"
              onClick={onTriggerSaveSearch}
              className="text-xs font-semibold gap-1.5 hover:border-slate-300 dark:hover:border-[#383838]"
              title="Save current search criteria snapshot"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-500" />
              <span>Save Search</span>
            </Button>
          )}

          {onTriggerEnrich && selectedIds.length === 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onTriggerEnrich()}
              className="text-xs font-semibold gap-1.5"
              title="Enrich results with verified emails and mobile phones"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Enrich</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={exportToCsv}
            className="text-xs font-semibold gap-2 hover:border-slate-300 dark:hover:border-[#383838]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Main Results Table */}
      <Table className="min-w-[860px]">
        <TableHeader>
          <tr>
            <th className="p-3 sm:p-4 w-10 text-center">
              <input
                type="checkbox"
                checked={isAllSelectedOnPage}
                onChange={toggleSelectAllOnPage}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
              />
            </th>
            <TableHead
              className="min-w-[170px]"
              sortable
              sortDirection={sorting.field === 'name' ? sorting.order : null}
              onSort={() => setSorting('name')}
            >
              Decision Maker
            </TableHead>
            <TableHead
              className="min-w-[130px]"
              sortable
              sortDirection={sorting.field === 'company' ? sorting.order : null}
              onSort={() => setSorting('company')}
            >
              Company & Headcount
            </TableHead>
            <TableHead
              className="min-w-[150px]"
              sortable
              sortDirection={sorting.field === 'deliverability' ? sorting.order : null}
              onSort={() => setSorting('deliverability')}
            >
              Verified Contact Channels
            </TableHead>
            <TableHead
              className="min-w-[130px] max-w-[180px]"
              sortable
              sortDirection={sorting.field === 'location' ? sorting.order : null}
              onSort={() => setSorting('location')}
            >
              LOCATION
            </TableHead>
            <th className="p-3 sm:p-4 w-[185px] min-w-[185px] text-right sticky right-0 bg-slate-50 dark:bg-[#111111] z-20 border-l border-slate-200/80 dark:border-[#222222] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)] dark:shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.6)]">
              Actions
            </th>
          </tr>
        </TableHeader>

        <TableBody>
          {results.map((lead) => {
            const isSelected = selectedIds.includes(lead.id);
            const isEmailUnlocked = unlockedEmails.has(lead.id);
            const isPhoneUnlocked = unlockedPhones.has(lead.id);
            const displayLocation = formatLeadLocation(lead);

            return (
              <TableRow key={lead.id} selected={isSelected}>
                {/* Checkbox */}
                <TableCell className="w-10 text-center p-3 sm:p-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </TableCell>

                {/* Prospect Name & Title */}
                <TableCell className="min-w-[170px] p-3 sm:p-4">
                  <div
                    onClick={() => onOpenLeadDetail(lead)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={lead.avatar}
                      alt={lead.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {lead.title}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Company & Headcount */}
                <TableCell className="min-w-[130px] p-3 sm:p-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {lead.company}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {lead.headcount} • {lead.location}
                    </div>
                  </div>
                </TableCell>

                {/* Contact Channels */}
                <TableCell className="min-w-[150px] p-3 sm:p-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    {/* Email Contact State */}
                    {isEmailUnlocked ? (
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate max-w-[130px]">{lead.email}</span>
                        <span className="text-emerald-500 text-[10px] font-bold shrink-0">✓ {lead.deliverabilityScore}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEnrichEmail(lead)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer whitespace-nowrap"
                          title="Reveal verified work email (1 credit)"
                        >
                          <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                          <span>Email · 1 credit</span>
                        </button>
                      </div>
                    )}

                    {/* Phone Contact State */}
                    {lead.phone && (
                      isPhoneUnlocked ? (
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                          <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{lead.phone}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">({lead.phoneStatus})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEnrichPhone(lead)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer whitespace-nowrap"
                            title="Reveal direct mobile phone (1 credit)"
                          >
                            <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span>Phone · 1 credit</span>
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell className="min-w-[130px] max-w-[180px] p-3 sm:p-4 align-middle">
                  <div
                    className="text-xs text-slate-600 dark:text-slate-400 truncate leading-snug font-normal"
                    title={displayLocation !== '—' ? displayLocation : undefined}
                  >
                    {displayLocation}
                  </div>
                </TableCell>

                {/* Inline Actions (Sticky Column) */}
                <TableCell className="w-[185px] min-w-[185px] p-3 sm:p-4 text-right sticky right-0 bg-white dark:bg-[#161616] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] z-20 border-l border-slate-200/80 dark:border-[#222222] shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.15)] dark:shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenLeadDetail(lead)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer shrink-0"
                      title="View Lead 360 Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSaveSingleLeadToCrm(lead)}
                      className="h-7 px-2.5 sm:px-3 text-[11px] font-bold gap-1.5 sm:gap-2 shrink-0"
                      title="Save to CRM Deals"
                    >
                      <Bookmark className="w-3.5 h-3.5 shrink-0 text-slate-600 dark:text-slate-300" />
                      <span>Save</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTriggerEnrich ? onTriggerEnrich(lead) : handleFullEnrichLead(lead)}
                      className="h-7 px-2.5 text-[11px] font-bold text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 gap-1.5 shrink-0"
                      title="Enrich Work Email & Direct Mobile"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Enrich</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalResults}
        pageSize={pagination.pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

    </div>
  );
};
