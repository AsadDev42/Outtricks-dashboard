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
import { Dropdown } from '../ui/Dropdown';
import { useLeadsManagement, WorkspaceLead, LeadStatusType, LeadOwnerType } from '../../context/LeadsManagementContext';
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
  User,
  Trash2,
  Archive,
  Tag,
  MoreHorizontal
} from 'lucide-react';

export interface LeadsTableProps {
  onOpenLeadDetail: (lead: WorkspaceLead) => void;
  onOpenQuickEmail: (lead: WorkspaceLead) => void;
  onOpenLogCall: (lead: WorkspaceLead) => void;
  onOpenBulkStatusModal: () => void;
  onOpenBulkAssignModal: () => void;
  onOpenBulkTagModal: () => void;
  onOpenAddToListModal: () => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  onOpenLeadDetail,
  onOpenQuickEmail,
  onOpenLogCall,
  onOpenBulkStatusModal,
  onOpenBulkAssignModal,
  onOpenBulkTagModal,
  onOpenAddToListModal,
}) => {
  const {
    leads,
    allFilteredLeads,
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
    updateLeadStatus,
    updateLeadOwner,
    archiveLead,
    deleteLead,
    exportLeadsToCsv
  } = useLeadsManagement();

  const { selectedIds, isAllSelectedOnPage, isAllMatchesSelected } = selection;

  const getStatusBadgeVariant = (status: LeadStatusType) => {
    switch (status) {
      case 'Meeting Booked': return 'blue';
      case 'Replied': return 'emerald';
      case 'In Sequence': return 'blue';
      case 'Verified': return 'emerald';
      case 'New': return 'slate';
      case 'Unresponsive': return 'amber';
      case 'Archived': return 'slate';
      default: return 'slate';
    }
  };

  if (leads.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl space-y-3 font-sans">
        <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
          No Leads Found in this View
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No prospect records matched your active segment and filters. Try changing or clearing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      
      {/* Sticky Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in slide-in-from-top duration-150 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
              {selectedIds.length}
            </span>
            <span className="font-extrabold text-emerald-950 dark:text-emerald-200">
              Selected Leads
            </span>

            {allFilteredLeads.length > leads.length && !isAllMatchesSelected && (
              <button
                type="button"
                onClick={selectAllMatches}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-2 cursor-pointer"
              >
                Select all {allFilteredLeads.length} leads
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onOpenBulkStatusModal}>
              Change Status
            </Button>
            <Button variant="secondary" size="sm" onClick={onOpenBulkAssignModal}>
              Assign Owner
            </Button>
            <Button variant="outline" size="sm" onClick={onOpenBulkTagModal}>
              Add Tags
            </Button>
            <Button variant="outline" size="sm" onClick={onOpenAddToListModal}>
              Add to List
            </Button>
            <Button variant="outline" size="sm" onClick={exportLeadsToCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <Table>
        <TableHeader>
          <tr>
            <th className="p-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelectedOnPage}
                onChange={toggleSelectAllOnPage}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
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
            <TableHead>Verified Contact Channels</TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'status' ? sorting.order : null}
              onSort={() => setSorting('status')}
            >
              Lead Status
            </TableHead>
            <TableHead>Assigned Owner</TableHead>
            <TableHead>Tags</TableHead>
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
          {leads.map((lead) => {
            const isSelected = selectedIds.includes(lead.id);

            return (
              <TableRow key={lead.id} selected={isSelected}>
                {/* Checkbox */}
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </TableCell>

                {/* Prospect Details */}
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
                      <div className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
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
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Status Dropdown Pill */}
                <TableCell>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatusType)}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Verified">Verified</option>
                    <option value="In Sequence">In Sequence</option>
                    <option value="Meeting Booked">Meeting Booked</option>
                    <option value="Replied">Replied</option>
                    <option value="Unresponsive">Unresponsive</option>
                    <option value="Archived">Archived</option>
                  </select>
                </TableCell>

                {/* Owner Dropdown */}
                <TableCell>
                  <select
                    value={lead.owner}
                    onChange={(e) => updateLeadOwner(lead.id, e.target.value as LeadOwnerType)}
                    className="px-2 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer outline-none"
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Marcus Vance">Marcus Vance</option>
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Unassigned">Unassigned</option>
                  </select>
                </TableCell>

                {/* Tags */}
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {lead.tags.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-[10px] font-medium text-slate-600 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                    {lead.tags.length > 2 && (
                      <span className="text-[10px] text-slate-400">+{lead.tags.length - 2}</span>
                    )}
                  </div>
                </TableCell>

                {/* ICP Score */}
                <TableCell>
                  <div className="flex items-center gap-1.5 font-mono font-black text-xs text-blue-600 dark:text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{lead.icpScore}%</span>
                  </div>
                </TableCell>

                {/* Action Menu */}
                <TableCell className="text-right">
                  <Dropdown
                    trigger={
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    }
                    items={[
                      { label: 'View 360° Profile', onClick: () => onOpenLeadDetail(lead) },
                      { label: 'Send Cold Email', onClick: () => onOpenQuickEmail(lead) },
                      { label: 'Log Voice Call', onClick: () => onOpenLogCall(lead) },
                      { label: 'Archive Lead', onClick: () => archiveLead(lead.id) },
                      { label: 'Delete Record', onClick: () => deleteLead(lead.id) },
                    ]}
                    placement="bottom-right"
                  />
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
