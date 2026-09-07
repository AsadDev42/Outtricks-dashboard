import React from 'react';
import { 
  Workflow, 
  Play, 
  Search, 
  MoreHorizontal, 
  Copy, 
  Trash2, 
  Edit3, 
  Clock, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Sparkles,
  ArrowRight,
  Pause,
  Plus
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useWorkflows, Workflow as WorkflowType } from '../../context/WorkflowsContext';

export interface VisualFlowsListProps {
  onOpenCreateWorkflow: () => void;
}

export const VisualFlowsList: React.FC<VisualFlowsListProps> = ({
  onOpenCreateWorkflow,
}) => {
  const {
    workflows,
    setActiveWorkflow,
    setActiveTab,
    toggleWorkflowStatus,
    duplicateWorkflow,
    deleteWorkflow,
    runWorkflowNow,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
  } = useWorkflows();

  const filteredWorkflows = workflows.filter(wf => {
    const matchesSearch = 
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || wf.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleEditWorkflow = (wf: WorkflowType) => {
    setActiveWorkflow(wf);
    setActiveTab('builder');
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search visual flows, triggers, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="paused">Paused</option>
            <option value="draft">Drafts</option>
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateWorkflow}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Flow
          </Button>
        </div>
      </div>

      {/* Workflow Cards Grid */}
      {filteredWorkflows.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] text-slate-400 text-xs space-y-2">
          <Workflow className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">No Visual Flows Found</div>
          <p className="text-xs text-slate-400">Try adjusting your search query or status filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorkflows.map((wf) => (
            <div
              key={wf.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 text-xs"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                        {wf.name}
                      </span>
                      <Badge
                        variant={wf.status === 'Active' ? 'emerald' : wf.status === 'Paused' ? 'amber' : 'slate'}
                        size="sm"
                      >
                        {wf.status}
                      </Badge>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      {wf.category}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold shrink-0">
                    {wf.nodesCount} DAG Nodes
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {wf.description}
                </p>

                {/* Trigger Info */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] text-[11px] font-mono space-y-1">
                  <div className="text-slate-400">Trigger Event:</div>
                  <div className="font-bold text-slate-900 dark:text-slate-200 truncate">
                    {wf.triggerType}
                  </div>
                </div>

                {/* Metrics Stats */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">LAST RUN</span>
                    <span className="font-bold text-slate-900 dark:text-white">{wf.lastRun}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TOTAL RUNS</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{wf.totalRuns.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SUCCESS RATE</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{wf.successRate}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditWorkflow(wf)}
                    leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                  >
                    Open Canvas
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runWorkflowNow(wf.id)}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Run Now
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleWorkflowStatus(wf.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] cursor-pointer"
                    title={wf.status === 'Active' ? 'Pause workflow' : 'Activate workflow'}
                  >
                    {wf.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => duplicateWorkflow(wf.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C1C1C] cursor-pointer"
                    title="Duplicate workflow"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteWorkflow(wf.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                    title="Delete workflow"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
