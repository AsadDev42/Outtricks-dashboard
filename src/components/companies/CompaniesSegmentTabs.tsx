import React from 'react';
import { useCompanies } from '../../context/CompaniesContext';
import { Plus } from 'lucide-react';

export interface CompaniesSegmentTabsProps {
  onOpenCreateListModal: () => void;
}

export const CompaniesSegmentTabs: React.FC<CompaniesSegmentTabsProps> = ({
  onOpenCreateListModal,
}) => {
  const {
    companies,
    activeSegment,
    setActiveSegment,
    customLists,
    selectedListId,
    setSelectedListId,
    setPage,
  } = useCompanies();

  const SEGMENTS = [
    { id: 'all', label: 'All Accounts', count: companies.filter((c) => c.status !== 'Archived').length },
    { id: 'target', label: 'Target Accounts', count: companies.filter((c) => c.status === 'Target').length },
    { id: 'prospecting', label: 'Prospecting', count: companies.filter((c) => c.status === 'Prospecting').length },
    { id: 'outreach', label: 'In Outreach', count: companies.filter((c) => c.status === 'In Outreach').length },
    { id: 'customer', label: 'Customers', count: companies.filter((c) => c.status === 'Customer').length },
    { id: 'unassigned', label: 'Unassigned', count: companies.filter((c) => c.owner === 'Unassigned').length },
    { id: 'archived', label: 'Archived', count: companies.filter((c) => c.status === 'Archived').length },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 font-sans border-b border-slate-200 dark:border-[#2A2A2A] pb-1 box-border">
      
      {/* Segments */}
      <div className="w-full sm:w-auto max-w-full overflow-x-auto min-w-0 no-scrollbar py-1">
        <div className="inline-flex items-center gap-1">
          {SEGMENTS.map((seg) => {
            const isActive = activeSegment === seg.id && selectedListId === 'all';
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => {
                  setActiveSegment(seg.id);
                  setSelectedListId('all');
                  setPage(1);
                }}
                className={`inline-flex items-center justify-center gap-2 min-h-[34px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap box-border leading-tight shrink-0 select-none ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <span className="inline-flex items-center leading-tight">{seg.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md inline-flex items-center justify-center leading-none ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                  }`}
                >
                  {seg.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lists Dropdown / Action */}
      <div className="flex items-center gap-2 shrink-0 py-1">
        {customLists.length > 0 && (
          <select
            value={selectedListId}
            onChange={(e) => {
              setSelectedListId(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[34px] box-border leading-tight"
          >
            <option value="all">Custom Target Lists (All)</option>
            {customLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name} ({list.count})
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={onOpenCreateListModal}
          className="inline-flex items-center justify-center gap-1.5 min-h-[34px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer box-border leading-tight shrink-0 select-none"
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          <span>New List</span>
        </button>
      </div>

    </div>
  );
};
