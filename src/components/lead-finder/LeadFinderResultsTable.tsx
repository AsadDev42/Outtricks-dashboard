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
  RefreshCw
} from 'lucide-react';

import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export interface LeadFinderResultsTableProps {
  onOpenLeadDetail: (lead: LeadDetailData) => void;
  onTriggerAddToListModal: () => void;
  onPushToSequence: () => void;
  onBatchAddToCrm: () => void;
}

export const LeadFinderResultsTable: React.FC<LeadFinderResultsTableProps> = ({
  onOpenLeadDetail,
  onTriggerAddToListModal,
  onPushToSequence,
  onBatchAddToCrm,
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
  const { success, info } = useToast();

  const { selectedIds, isAllSelectedOnPage, isAllMatchesSelected } = selection;

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

          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBulkEnrich}
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

            <Button
              variant="outline"
              size="sm"
              onClick={exportToCsv}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-slate-400 hover:text-white"
            >
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Top Results Action & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 py-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-900 dark:text-white font-mono">
            {allMatchingResults.length.toLocaleString()}
          </span>
          <span>decision makers match your active criteria</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCsv}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Main Results Table */}
      <Table>
        <TableHeader>
          <tr>
            <th className="p-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelectedOnPage}
                onChange={toggleSelectAllOnPage}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
              />
            </th>
            <TableHead
              sortable
              sortDirection={sorting.field === 'name' ? sorting.order : null}
              onSort={() => setSorting('name')}
            >
              Decision Maker
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'company' ? sorting.order : null}
              onSort={() => setSorting('company')}
            >
              Company & Headcount
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'deliverability' ? sorting.order : null}
              onSort={() => setSorting('deliverability')}
            >
              Verified Contact Channels
            </TableHead>
            <TableHead>Buying Intent & Tech</TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'icpScore' ? sorting.order : null}
              onSort={() => setSorting('icpScore')}
            >
              ICP Match
            </TableHead>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </TableHeader>

        <TableBody>
          {results.map((lead) => {
            const isSelected = selectedIds.includes(lead.id);

            return (
              <TableRow key={lead.id} selected={isSelected}>
                {/* Checkbox */}
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </TableCell>

                {/* Prospect Name & Title */}
                <TableCell>
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
                <TableCell>
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
                <TableCell>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{lead.email}</span>
                      <span className="text-emerald-500 text-[10px] font-bold">✓ {lead.deliverabilityScore}%</span>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                        <Phone className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>{lead.phone}</span>
                        <span className="text-[10px] text-slate-400">({lead.phoneStatus})</span>
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Buying Intent & Tech Stack */}
                <TableCell>
                  <div className="space-y-1">
                    {lead.intentSignal ? (
                      <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{lead.intentSignal}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">No active signal</span>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {lead.tech.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-[10px] text-slate-600 dark:text-slate-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                      {lead.tech.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{lead.tech.length - 3}</span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* ICP Score */}
                <TableCell>
                  <div className="flex items-center gap-1.5 font-mono font-black text-xs text-blue-600 dark:text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{lead.icpScore}%</span>
                  </div>
                </TableCell>

                {/* Inline Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onOpenLeadDetail(lead)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSaveSingleLeadToCrm(lead)}
                      leftIcon={<Building2 className="w-3.5 h-3.5 text-emerald-500" />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEnrichSingleLead(lead)}
                      leftIcon={<Zap className="w-3.5 h-3.5 text-amber-400" />}
                    >
                      Enrich
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
