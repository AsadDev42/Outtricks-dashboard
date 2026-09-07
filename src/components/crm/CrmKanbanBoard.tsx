import React, { useState } from 'react';
import { useCrm, CrmDeal, CrmStage } from '../../context/CrmContext';
import { Badge } from '../ui/Badge';
import { 
  Building2, 
  DollarSign, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
  Bell
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export interface CrmKanbanBoardProps {
  onOpenDealDetail: (deal: CrmDeal) => void;
  onOpenCreateDealModal?: () => void;
}

export const CrmKanbanBoard: React.FC<CrmKanbanBoardProps> = ({
  onOpenDealDetail,
}) => {
  const { activePipeline, allFilteredDeals, updateDealStage, reminders } = useCrm();
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  const stages = activePipeline.stages;

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('text/plain', dealId);
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStageId(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStageId(null);
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (dealId) {
      updateDealStage(dealId, targetStageId);
    }
    setDraggedDealId(null);
    setDragOverStageId(null);
  };

  const moveStage = (deal: CrmDeal, direction: 'prev' | 'next') => {
    const currentIndex = stages.findIndex((s) => s.id === deal.stageId);
    if (direction === 'prev' && currentIndex > 0) {
      updateDealStage(deal.id, stages[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < stages.length - 1) {
      updateDealStage(deal.id, stages[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-auto min-w-0 pb-4 font-sans select-none min-h-[650px] kanban-scrollbar">
      <div className="inline-flex gap-4 min-w-full pb-2 pr-8">
        {stages.map((stage, sIdx) => {
          const stageDeals = allFilteredDeals.filter((d) => d.stageId === stage.id);
          const stageTotalVal = stageDeals.reduce((acc, d) => acc + (d.value || 0), 0);
          const isDragOver = dragOverStageId === stage.id;

          return (
            <div
              key={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`w-72 shrink-0 flex flex-col rounded-3xl p-3.5 bg-slate-50/80 dark:bg-[#161616] border transition-all ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-white/[0.04] ring-2 ring-emerald-500/20'
                  : 'border-slate-200/80 dark:border-[#2A2A2A]'
              }`}
            >
              {/* Column Header (Section 4) */}
              <div className="p-2 space-y-1.5 border-b border-slate-200/60 dark:border-[#202020] pb-3 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                      {stage.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-[#181818] text-slate-600 dark:text-slate-300">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 font-semibold">{stage.probability}% win prob</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(stageTotalVal)}
                  </span>
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-2.5 overflow-y-auto pr-0.5">
                {stageDeals.length === 0 ? (
                  <div className="h-28 rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#2A2A2A]/80 flex items-center justify-center text-slate-400 text-xs text-center p-3">
                    Drag deals here
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all cursor-grab active:cursor-grabbing space-y-2.5 group"
                    >
                      {/* Top: Company Logo & Deal Value */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {deal.companyLogo ? (
                            <img
                              src={deal.companyLogo}
                              alt={deal.companyName}
                              className="w-6 h-6 rounded-lg object-cover border border-slate-200 dark:border-[#2A2A2A] shrink-0"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                              {deal.companyName.charAt(0)}
                            </div>
                          )}
                          <span className="font-bold text-xs text-slate-700 dark:text-slate-300 truncate">
                            {deal.companyName}
                          </span>
                        </div>
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono shrink-0">
                          {formatCurrency(deal.value)}
                        </span>
                      </div>

                      {/* Deal Title */}
                      <div
                        onClick={() => onOpenDealDetail(deal)}
                        className="font-extrabold text-xs text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {deal.title}
                      </div>

                      {/* Contact Info */}
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                        <User className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{deal.contactName} ({deal.contactTitle})</span>
                      </div>

                      {/* Reminder / Follow-up Alert */}
                      {(() => {
                        const dealReminders = reminders.filter(
                          (r) => !r.completed && (r.dealId === deal.id || r.dealTitle === deal.title)
                        );
                        if (dealReminders.length === 0) return null;
                        return (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-[10px] font-bold">
                            <Bell className="w-3 h-3 text-amber-500 shrink-0 animate-pulse" />
                            <span className="truncate">{dealReminders[0].title}</span>
                            <span className="text-slate-400 font-mono shrink-0">({dealReminders.length})</span>
                          </div>
                        );
                      })()}

                      {/* Footer Strip */}
                      <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-1 font-mono">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            deal.priority === 'high' ? 'bg-rose-500' : deal.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          <span className="uppercase font-bold">{deal.priority}</span>
                        </div>

                        {/* Stage Advancement Quick Controls */}
                        <div className="flex items-center gap-1">
                          {sIdx > 0 && (
                            <button
                              type="button"
                              onClick={() => moveStage(deal, 'prev')}
                              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
                              title="Move back a stage"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {sIdx < stages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveStage(deal, 'next')}
                              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                              title="Advance stage"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
