import React from 'react';
import { 
  Workflow, 
  Sparkles, 
  Play, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Layers, 
  AlertCircle, 
  Database,
  TrendingUp
} from 'lucide-react';
import { useWorkflows, WorkflowsSubTab } from '../../context/WorkflowsContext';

interface WorkflowsOverviewProps {
  onOpenCreateWorkflow: () => void;
  onOpenCreateVariable: () => void;
}

export const WorkflowsOverview: React.FC<WorkflowsOverviewProps> = ({
  onOpenCreateWorkflow,
  onOpenCreateVariable,
}) => {
  const { workflows, runs, schedules, triggers, templates, setActiveTab, setActiveWorkflow } = useWorkflows();

  const handleOpenWorkflowInBuilder = (wf: any) => {
    setActiveWorkflow(wf);
    setActiveTab('builder');
  };

  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(w => w.status === 'Active').length;
  const totalRuns = runs.length;
  const successfulRuns = runs.filter(r => r.status === 'Success').length;
  const successRate = totalRuns > 0 ? ((successfulRuns / totalRuns) * 100).toFixed(1) : '97.8';

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE WORKFLOWS
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Workflow className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {activeWorkflows}
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              of {totalWorkflows} Total
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Real-time event-driven DAG execution
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SUCCESS RATE
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {successRate}%
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              {successfulRuns} Completed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Across {totalRuns.toLocaleString()} execution runs
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              AUTOMATION SCHEDULES
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {schedules.length}
            </span>
            <span className="text-xs text-sky-600 font-bold">
              Active Crons
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Scheduled recurring automation routines
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              BLUEPRINT TEMPLATES
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {templates.length}
            </span>
            <span className="text-xs text-indigo-600 font-bold">
              Pre-built
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            One-click revenue orchestration flows
          </p>
        </div>

      </div>

      {/* 2. Quick Action Launchpad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('builder')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Workflow className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Open Visual DAG Canvas</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Interactive drag-and-drop workflow designer</p>
        </button>

        <button
          onClick={onOpenCreateWorkflow}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Create New Workflow</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Configure trigger events, conditional rules & actions</p>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all text-left space-y-1.5 group cursor-pointer shadow-xs"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="font-extrabold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 transition-colors flex items-center justify-between">
            <span>Explore Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-slate-500">Ready-to-use prospecting & nurturing sequences</p>
        </button>
      </div>

      {/* 3. Active Workflows Matrix & Recent Execution Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Workflows Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Orchestrated Workflows ({workflows.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('visual-flows')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {wf.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Trigger: {wf.triggerType} • Category: {wf.category}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    wf.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' :
                    wf.status === 'Paused' ? 'bg-amber-50 dark:bg-amber-950 text-amber-600' :
                    'bg-slate-100 dark:bg-[#181818] text-slate-600'
                  }`}>
                    {wf.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1 border-t border-slate-200/40 dark:border-[#202020]">
                  <div>
                    <span className="text-slate-400 block">Nodes</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{wf.nodesCount} Steps</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Runs</span>
                    <span className="font-bold text-emerald-600">{wf.totalRuns}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Success Rate</span>
                    <span className="font-bold text-emerald-600">{wf.successRate}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Action</span>
                    <button
                      onClick={() => handleOpenWorkflowInBuilder(wf)}
                      className="font-bold text-emerald-600 hover:underline"
                    >
                      Open Canvas →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Execution Runs (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Live Execution Runs</span>
            </h3>
            <button
              onClick={() => setActiveTab('runs')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              All Runs
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5 text-xs">
            {runs.slice(0, 4).map((run) => (
              <div
                key={run.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/60 dark:border-[#202020] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {run.workflowName}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    run.status === 'Success' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' :
                    run.status === 'Running' ? 'bg-blue-50 dark:bg-[#1A1A1A] text-blue-600' :
                    'bg-rose-50 dark:bg-rose-950 text-rose-600'
                  }`}>
                    {run.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  {run.trigger}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>{run.stepsCount} steps • {run.duration}</span>
                  <span className="font-mono">{run.startedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
