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
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { 
  Building2, 
  DollarSign, 
  User, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  Calendar,
  Layers
} from 'lucide-react';

export interface CrmTableViewProps {
  onOpenDealDetail: (deal: CrmDeal) => void;
  onOpenBulkStageModal: () => void;
  onOpenBulkAssignModal: () => void;
}

export const CrmTableView: React.FC<CrmTableViewProps> = ({
  onOpenDealDetail,
  onOpenBulkStageModal,
  onOpenBulkAssignModal,
}) => {
  const {
    deals,
    allFilteredDeals,
    activePipeline,
    sorting,
    setSorting,
    pagination,
    setPage,
    setPageSize,
    selection,
    toggleSelectDeal,
    toggleSelectAllOnPage,
    clearSelection,
    updateDealStage,
    updateDealOwner,
    deleteDeal,
    exportDealsToCsv
  } = useCrm();

  const { selectedIds, isAllSelectedOnPage } = selection;

  if (deals.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl space-y-3 font-sans">
        <Layers className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
          No Deals in Current View
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No opportunities matched your active pipeline filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      
      {/* Sticky Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-emerald-500/10 dark:bg-[#1A1A1A]/80 border border-emerald-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in slide-in-from-top duration-150 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
              {selectedIds.length}
            </span>
            <span className="font-extrabold text-emerald-950 dark:text-emerald-200">
              Selected Deals
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onOpenBulkStageModal}>
              Change Stage
            </Button>
            <Button variant="secondary" size="sm" onClick={onOpenBulkAssignModal}>
              Assign Owner
            </Button>
            <Button variant="outline" size="sm" onClick={exportDealsToCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
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
              sortDirection={sorting.field === 'title' ? sorting.order : null}
              onSort={() => setSorting('title')}
            >
              Deal Opportunity
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'companyName' ? sorting.order : null}
              onSort={() => setSorting('companyName')}
            >
              Account
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'value' ? sorting.order : null}
              onSort={() => setSorting('value')}
            >
              ARR Value
            </TableHead>
            <TableHead>Pipeline Stage</TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'probability' ? sorting.order : null}
              onSort={() => setSorting('probability')}
            >
              Win Prob
            </TableHead>
            <TableHead
              sortable
              sortDirection={sorting.field === 'expectedCloseDate' ? sorting.order : null}
              onSort={() => setSorting('expectedCloseDate')}
            >
              Target Close
            </TableHead>
            <TableHead>Owner</TableHead>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </TableHeader>

        <TableBody>
          {deals.map((deal) => {
            const isSelected = selectedIds.includes(deal.id);

            return (
              <TableRow key={deal.id} selected={isSelected}>
                {/* Checkbox */}
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectDeal(deal.id)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </TableCell>

                {/* Deal Title */}
                <TableCell>
                  <div
                    onClick={() => onOpenDealDetail(deal)}
                    className="cursor-pointer group"
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {deal.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-mono">
                      Contact: {deal.contactName} ({deal.contactEmail})
                    </div>
                  </div>
                </TableCell>

                {/* Company Name */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={deal.companyLogo}
                      alt={deal.companyName}
                      className="w-6 h-6 rounded-md object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
                    />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {deal.companyName}
                    </span>
                  </div>
                </TableCell>

                {/* Value */}
                <TableCell>
                  <div className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatCurrency(deal.value)} ARR
                  </div>
                </TableCell>

                {/* Stage Dropdown */}
                <TableCell>
                  <select
                    value={deal.stageId}
                    onChange={(e) => updateDealStage(deal.id, e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer outline-none"
                  >
                    {activePipeline.stages.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </TableCell>

                {/* Probability */}
                <TableCell>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {deal.probability}%
                  </span>
                </TableCell>

                {/* Target Close */}
                <TableCell>
                  <span className="text-xs font-mono text-slate-500">
                    {deal.expectedCloseDate}
                  </span>
                </TableCell>

                {/* Owner */}
                <TableCell>
                  <select
                    value={deal.owner}
                    onChange={(e) => updateDealOwner(deal.id, e.target.value as LeadOwnerType)}
                    className="px-2 py-1 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-[11px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer outline-none"
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Marcus Vance">Marcus Vance</option>
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Unassigned">Unassigned</option>
                  </select>
                </TableCell>

                {/* Actions */}
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
                      { label: 'View 360° Opportunity', onClick: () => onOpenDealDetail(deal) },
                      { label: 'Delete Deal', onClick: () => deleteDeal(deal.id) },
                    ]}
                    placement="bottom-right"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
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
