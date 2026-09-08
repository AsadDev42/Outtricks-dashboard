import React from 'react';
import { 
  Kanban, 
  Search, 
  Filter, 
  Plus, 
  DollarSign, 
  Layers, 
  TrendingUp, 
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { CrmKanbanBoard } from './CrmKanbanBoard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface CrmPipelineViewProps {
  onOpenDealDetail: (deal: CrmDeal) => void;
  onOpenCreateDealModal: () => void;
}

export const CrmPipelineView: React.FC<CrmPipelineViewProps> = ({
  onOpenDealDetail,
  onOpenCreateDealModal,
}) => {
  const { 
    deals, 
    allFilteredDeals, 
    searchQuery, 
    setSearchQuery, 
    filterOwner, 
    setFilterOwner, 
    filterPriority, 
    setFilterPriority, 
    exportDealsToCsv 
  } = useCrm();

  const totalVal = allFilteredDeals.reduce((acc, d) => acc + (d.value || 0), 0);

  return (
    <div className="space-y-6 font-sans w-full max-w-full min-w-0">
      
      {/* 1. Header with Page Title & Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Kanban className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Sales Pipeline & Deal Flow
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Interactive multi-stage Kanban pipeline with real-time probability weighting and drag-and-drop movement.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={exportDealsToCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV ({allFilteredDeals.length})
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateDealModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Deal
          </Button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pipeline cards by opportunity, company, or contact..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-700 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 min-h-[36px]"
          >
            <option value="all">Owner (All)</option>
            <option value="Sarah Jenkins">Sarah Jenkins</option>
            <option value="David Zhao">David Zhao</option>
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Elena Rostova">Elena Rostova</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-700 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 min-h-[36px]"
          >
            <option value="all">Priority (All)</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <Badge variant="primary" size="md">
            {formatCurrency(totalVal)} Active Pipeline
          </Badge>
        </div>
      </div>

      {/* 3. Drag-and-Drop Pipeline Kanban Board */}
      <CrmKanbanBoard
        onOpenDealDetail={onOpenDealDetail}
        onOpenCreateDealModal={onOpenCreateDealModal}
      />

    </div>
  );
};
