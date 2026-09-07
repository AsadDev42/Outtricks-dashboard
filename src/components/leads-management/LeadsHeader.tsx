import React from 'react';
import { 
  Users, 
  Plus, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  Send, 
  Calendar,
  Sparkles,
  Layers,
  Building2,
  Mail
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { useAuth } from '../../context/AuthContext';

export interface LeadsHeaderProps {
  onOpenCreateLeadModal: () => void;
  onOpenImportModal: () => void;
}

export const LeadsHeader: React.FC<LeadsHeaderProps> = ({
  onOpenCreateLeadModal,
  onOpenImportModal,
}) => {
  const { 
    leads, 
    allFilteredLeads, 
    searchQuery, 
    setSearchQuery, 
    filterOwner, 
    setFilterOwner, 
    filterSource, 
    setFilterSource,
    resetAllFilters,
    exportLeadsToCsv 
  } = useLeadsManagement();
  
  const { currentWorkspace } = useAuth();

  const totalLeads = allFilteredLeads.length;
  const inSequenceCount = allFilteredLeads.filter((l) => l.status === 'In Sequence').length;
  const repliedCount = allFilteredLeads.filter((l) => l.status === 'Replied').length;
  const bookedCount = allFilteredLeads.filter((l) => l.status === 'Meeting Booked').length;

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner & Metric Strip */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Leads & Prospect Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage, segment, assign, and track all enrolled prospects across your outbound pipeline.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[100px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Leads</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{totalLeads}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[100px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">In Sequences</div>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">{inSequenceCount}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[100px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Replied</div>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{repliedCount}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[100px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Meetings Booked</div>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">{bookedCount}</div>
          </div>
        </div>

      </div>

      {/* Control Action Toolbar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Search Query */}
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, company, title, email, phone, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Middle: Owner & Source Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Owners</option>
            <option value="Sarah Jenkins">Sarah Jenkins</option>
            <option value="Marcus Vance">Marcus Vance</option>
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Unassigned">Unassigned</option>
          </select>

          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Sources</option>
            <option value="8D Lead Finder">8D Lead Finder</option>
            <option value="CSV Import">CSV Import</option>
            <option value="LinkedIn Sync">LinkedIn Sync</option>
          </select>

          {(searchQuery || filterOwner !== 'all' || filterSource !== 'all') && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

        {/* Right: Primary Action CTAs */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenImportModal}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
          >
            Import CSV
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={exportLeadsToCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateLeadModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Lead
          </Button>
        </div>

      </div>

    </div>
  );
};
