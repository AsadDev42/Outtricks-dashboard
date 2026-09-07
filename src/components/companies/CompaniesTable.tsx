import React from 'react';
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
import { useCompanies, WorkspaceCompany, CompanyStatusType } from '../../context/CompaniesContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Download, 
  MoreHorizontal,
  ExternalLink,
  Plus,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export interface CompaniesTableProps {
  onOpenCompanyDetail: (company: WorkspaceCompany) => void;
  onOpenBulkStatusModal: () => void;
  onOpenBulkAssignModal: () => void;
  onOpenBulkTagModal: () => void;
  onOpenAddToListModal: () => void;
}

export const CompaniesTable: React.FC<CompaniesTableProps> = ({
  onOpenCompanyDetail,
  onOpenBulkStatusModal,
  onOpenBulkAssignModal,
  onOpenBulkTagModal,
  onOpenAddToListModal,
}) => {
  const {
    companies,
    allFilteredCompanies,
    sorting,
    setSorting,
    pagination,
    setPage,
    setPageSize,
    selection,
    toggleSelectCompany,
    toggleSelectAllOnPage,
    selectAllMatches,
    clearSelection,
    updateCompanyStatus,
    updateCompanyOwner,
    archiveCompany,
    deleteCompany,
    exportCompaniesToCsv
  } = useCompanies();

  const { selectedIds, isAllSelectedOnPage, isAllMatchesSelected } = selection;

  if (companies.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl space-y-3 font-sans">
        <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
          No Target Accounts Found
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No company records matched your active segment and filters. Try changing or clearing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      
      {/* Sticky Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 dark:border-emerald-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in slide-in-from-top duration-150 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
              {selectedIds.length}
            </span>
            <span className="font-extrabold text-emerald-950 dark:text-emerald-200">
              Selected Target Accounts
            </span>

            {allFilteredCompanies.length > companies.length && !isAllMatchesSelected && (
              <button
                type="button"
                onClick={selectAllMatches}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-2 cursor-pointer"
              >
                Select all {allFilteredCompanies.length} accounts
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
            <Button variant="outline" size="sm" onClick={exportCompaniesToCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Main High-Density Table */}
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
              Target Company
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'headcount' ? sorting.order : null}
              onSort={() => setSorting('headcount')}
            >
              Size & Revenue
            </TableHead>
            <TableHead>Location & Funding</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'contactsCount' ? sorting.order : null}
              onSort={() => setSorting('contactsCount')}
            >
              Verified Contacts
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'openDealsValue' ? sorting.order : null}
              onSort={() => setSorting('openDealsValue')}
            >
              Pipeline ARR
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'status' ? sorting.order : null}
              onSort={() => setSorting('status')}
            >
              Account Status
            </TableHead>
            <TableHead>Owner</TableHead>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </TableHeader>

        <TableBody>
          {companies.map((comp) => {
            const isSelected = selectedIds.includes(comp.id);

            return (
              <TableRow key={comp.id} selected={isSelected}>
                {/* Checkbox */}
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectCompany(comp.id)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </TableCell>

                {/* Company Name & Domain */}
                <TableCell>
                  <div
                    onClick={() => onOpenCompanyDetail(comp)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {comp.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 font-mono">
                        <span>{comp.domain}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Size & Revenue */}
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {comp.headcount} employees
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {comp.revenue} ARR
                    </div>
                  </div>
                </TableCell>

                {/* Location & Funding */}
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {comp.location}
                    </div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold font-mono">
                      {comp.funding}
                    </div>
                  </div>
                </TableCell>

                {/* Technologies */}
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[140px]">
                    {comp.techStack.slice(0, 2).map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-[10px] font-mono text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                    {comp.techStack.length > 2 && (
                      <span className="text-[10px] text-slate-400 font-mono">+{comp.techStack.length - 2}</span>
                    )}
                  </div>
                </TableCell>

                {/* Contacts Count Badge */}
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onOpenCompanyDetail(comp)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 cursor-pointer"
                  >
                    <Users className="w-3 h-3" />
                    <span>{comp.contactsCount} Contacts</span>
                  </button>
                </TableCell>

                {/* Pipeline ARR */}
                <TableCell>
                  <div className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                    ${(comp.openDealsValue / 1000).toFixed(0)}k ARR
                  </div>
                </TableCell>

                {/* Status Selector Pill */}
                <TableCell>
                  <select
                    value={comp.status}
                    onChange={(e) => updateCompanyStatus(comp.id, e.target.value as CompanyStatusType)}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer outline-none"
                  >
                    <option value="Target">Target</option>
                    <option value="Prospecting">Prospecting</option>
                    <option value="In Outreach">In Outreach</option>
                    <option value="Customer">Customer</option>
                    <option value="Churned">Churned</option>
                    <option value="Archived">Archived</option>
                  </select>
                </TableCell>

                {/* Owner */}
                <TableCell>
                  <select
                    value={comp.owner}
                    onChange={(e) => updateCompanyOwner(comp.id, e.target.value as LeadOwnerType)}
                    className="px-2 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer outline-none"
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Marcus Vance">Marcus Vance</option>
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Unassigned">Unassigned</option>
                  </select>
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
                      { label: 'View 360° Profile', onClick: () => onOpenCompanyDetail(comp) },
                      { label: 'Visit Website', onClick: () => window.open(comp.website, '_blank') },
                      { label: 'Archive Account', onClick: () => archiveCompany(comp.id) },
                      { label: 'Delete Record', onClick: () => deleteCompany(comp.id) },
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
