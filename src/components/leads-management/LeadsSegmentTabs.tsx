import React from 'react';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { Plus } from 'lucide-react';

export interface LeadsSegmentTabsProps {
  onOpenCreateListModal: () => void;
}

export const LeadsSegmentTabs: React.FC<LeadsSegmentTabsProps> = ({
  onOpenCreateListModal,
}) => {
  const { 
    leads, 
    activeSegment, 
    setActiveSegment, 
    customLists, 
    selectedListId, 
    setSelectedListId,
    setPage 
  } = useLeadsManagement();

  const SEGMENTS = [
    { id: 'all', label: 'All Leads', count: leads.filter((l) => l.status !== 'Archived').length },
    { id: 'in_sequence', label: 'In Sequence', count: leads.filter((l) => l.status === 'In Sequence').length },
    { id: 'replied', label: 'Replied (Hot)', count: leads.filter((l) => l.status === 'Replied').length },
    { id: 'booked', label: 'Meetings Booked', count: leads.filter((l) => l.status === 'Meeting Booked').length },
    { id: 'verified', label: 'Verified Email', count: leads.filter((l) => l.status === 'Verified' || l.deliverabilityScore >= 98).length },
    { id: 'unassigned', label: 'Unassigned', count: leads.filter((l) => l.owner === 'Unassigned').length },
    { id: 'archived', label: 'Archived', count: leads.filter((l) => l.status === 'Archived').length },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 font-sans border-b border-slate-200 dark:border-[#2A2A2A] pb-1 box-border">
      
      {/* Segment Tabs */}
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

      {/* Target Lists Dropdown & Create List Button */}
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
