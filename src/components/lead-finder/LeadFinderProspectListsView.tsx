import React, { useState } from 'react';
import { 
  ListFilter, 
  Plus, 
  Search, 
  Users, 
  Trash2, 
  Edit2, 
  ArrowRight, 
  Calendar, 
  ExternalLink,
  CheckCircle2,
  Share2,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { Button } from '../ui/Button';
import { CreateListModal } from '../leads-management/CreateListModal';
import { useToast } from '../../context/ToastContext';

interface LeadFinderProspectListsViewProps {
  onOpenListDetail?: (listId: string) => void;
}

export const LeadFinderProspectListsView: React.FC<LeadFinderProspectListsViewProps> = ({
  onOpenListDetail
}) => {
  const navigate = useNavigate();
  const { customLists, selectedListId, setSelectedListId, deleteCustomList, leads } = useLeadsManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { success, info } = useToast();

  const filteredLists = customLists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProspectsInLists = customLists.reduce((acc, l) => acc + l.count, 0);

  const handleDeleteList = (id: string, name: string) => {
    deleteCustomList(id);
    success(`Prospect list "${name}" deleted.`);
  };

  const handleExportList = (listName: string) => {
    success(`Exporting "${listName}" to CSV...`);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <ListFilter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Target Prospect Lists</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Segmented audiences, ICP lead cohorts, and custom export batches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Prospect List</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Lists</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{customLists.length}</div>
          <div className="text-[11px] text-slate-500">Active segmentation cohorts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enrolled Prospects</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">{totalProspectsInLists}</div>
          <div className="text-[11px] text-blue-600 font-bold">100% addressable outbound leads</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Workspace Leads</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{leads.length}</div>
          <div className="text-[11px] text-slate-500">Verified contacts in CRM & Finder</div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lists by title or description..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Lists Grid Cards */}
      {filteredLists.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <ListFilter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No Prospect Lists Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create a custom prospect list or save search results from Find People to organize your outbound accounts.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs font-bold"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create First List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLists.map((list) => {
            const isSelected = selectedListId === list.id;

            return (
              <div
                key={list.id}
                className={`p-5 rounded-3xl bg-white dark:bg-[#161616] border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 ${
                  isSelected 
                    ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 dark:border-[#2A2A2A]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {list.name}
                      </h3>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 shrink-0">
                      {list.count} leads
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {list.description || 'Target ICP prospect cohort with verified contact information.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>Created {list.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedListId(list.id);
                        if (onOpenListDetail) onOpenListDetail(list.id);
                        else navigate('/lead-finder/find-people');
                      }}
                      className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Leads</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportList(list.name)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Export List to CSV"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteList(list.id, list.name)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete List"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create List Modal */}
      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

    </div>
  );
};
