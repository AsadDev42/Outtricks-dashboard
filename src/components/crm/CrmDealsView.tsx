import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Calendar, 
  User, 
  Building2, 
  Download, 
  Upload, 
  Layers, 
  Edit2, 
  Trash2, 
  SlidersHorizontal, 
  ExternalLink,
  Kanban,
  Table as TableIcon
} from 'lucide-react';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CrmKanbanBoard } from './CrmKanbanBoard';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

interface CrmDealsViewProps {
  onOpenDealDetail: (deal: CrmDeal) => void;
  onOpenCreateDealModal: () => void;
  onOpenEditModal: (deal: CrmDeal) => void;
}

export const CrmDealsView: React.FC<CrmDealsViewProps> = ({
  onOpenDealDetail,
  onOpenCreateDealModal,
  onOpenEditModal
}) => {
  const { 
    deals, 
    allFilteredDeals, 
    searchQuery, 
    setSearchQuery, 
    filterOwner, 
    setFilterOwner, 
    filterStage, 
    setFilterStage,
    deleteDeal,
    updateDealStage,
    exportDealsToCsv,
    activePipeline,
    viewMode,
    setViewMode
  } = useCrm();

  const totalPipelineVal = deals.reduce((acc, d) => acc + (d.value || 0), 0);
  const weightedVal = deals.reduce((acc, d) => acc + ((d.value || 0) * ((d.probability || 0) / 100)), 0);
  const wonDealsVal = deals.filter(d => d.stageId === 'stage_won').reduce((acc, d) => acc + (d.value || 0), 0);

  return (
    <div className="space-y-6 font-sans w-full max-w-full min-w-0">
      
      {/* 1. Header with Page Title & Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Deals & Revenue Opportunities
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Active sales opportunities, weighted ARR pipeline forecasting, and deal execution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#080808] text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#080808] text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Pipeline Kanban View"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={exportDealsToCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
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

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Pipeline ARR</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {formatCurrency(totalPipelineVal)}
          </div>
          <div className="text-[11px] text-slate-500">{deals.length} active opportunities</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weighted Forecast</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {formatCurrency(weightedVal)}
          </div>
          <div className="text-[11px] text-slate-500">Probability adjusted ARR</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Closed Won ARR</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {formatCurrency(wonDealsVal)}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">100% committed revenue</div>
        </div>
      </div>

      {/* 3. Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals by title, company, or contact..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="all">Stage (All)</option>
            {activePipeline.stages.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="all">Owner (All)</option>
            <option value="Sarah Jenkins">Sarah Jenkins</option>
            <option value="David Zhao">David Zhao</option>
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Elena Rostova">Elena Rostova</option>
          </select>

          <Badge variant="primary" size="md">
            {formatNumber(allFilteredDeals.length)} Deals
          </Badge>
        </div>
      </div>

      {/* 4. Active View Rendering (Kanban vs Table) */}
      {viewMode === 'kanban' ? (
        <CrmKanbanBoard
          onOpenDealDetail={onOpenDealDetail}
          onOpenCreateDealModal={onOpenCreateDealModal}
        />
      ) : (
        <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#1C1C1C]/80 border-b border-slate-200/80 dark:border-[#202020] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Deal</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Primary Contact</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">ARR Value</th>
                  <th className="py-3.5 px-4">Win Prob</th>
                  <th className="py-3.5 px-4">Target Close</th>
                  <th className="py-3.5 px-4">Owner</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {allFilteredDeals.map((deal) => {
                  const stage = activePipeline.stages.find(s => s.id === deal.stageId);

                  return (
                    <tr
                      key={deal.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div
                          onClick={() => onOpenDealDetail(deal)}
                          className="font-extrabold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                        >
                          {deal.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {deal.source}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{deal.companyName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{deal.contactName}</div>
                        <div className="text-[11px] text-slate-400">{deal.contactTitle}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="primary" size="sm">
                          {stage?.name || deal.stageId}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(deal.value)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {deal.probability}%
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {deal.expectedCloseDate}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        {deal.owner}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onOpenEditModal(deal)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1C1C1C] text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            title="Edit Deal"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDeal(deal.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Deal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
