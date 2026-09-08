import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  Workflow, 
  Play, 
  SlidersHorizontal, 
  LayoutTemplate, 
  Clock, 
  Database, 
  Zap, 
  GitBranch, 
  ListOrdered,
  Layers,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { 
  WorkflowsProvider, 
  useWorkflows,
  WorkflowsSubTab 
} from '../../context/WorkflowsContext';
import { 
  WorkflowsHeader,
  WorkflowsOverview,
  VisualFlowsList,
  InteractiveFlowBuilder,
  WorkflowTemplatesView,
  WorkflowRunsView,
  WorkflowSchedulesView,
  WorkflowTriggersView,
  WorkflowActionsView,
  WorkflowConditionsView,
  WorkflowVariablesView,
  WorkflowDataView,
  WorkflowIntegrationsView,
  WorkflowHistoryView,
  WorkflowLogsView,
  WorkflowFailedRunsView,
  SavedComponentsView,
  CreateWorkflowModal,
  CreateVariableModal,
  AddNodeModal
} from '../../components/workflows';

export const resolveWorkflowsTab = (pathname: string): WorkflowsSubTab => {
  const p = pathname.toLowerCase();
  if (p.includes('/templates') || p.includes('/sequences')) return 'templates';
  if (p.includes('/runs')) return 'runs';
  if (p.includes('/schedules')) return 'schedules';
  if (p.includes('/triggers') || p.includes('/rules') || p.includes('/automation-rules')) return 'triggers';
  if (p.includes('/actions')) return 'actions';
  if (p.includes('/conditions')) return 'conditions';
  if (p.includes('/variables')) return 'variables';
  if (p.includes('/data')) return 'data';
  if (p.includes('/integrations')) return 'integrations';
  if (p.includes('/history')) return 'history';
  if (p.includes('/logs')) return 'logs';
  if (p.includes('/failed-runs')) return 'failed-runs';
  if (p.includes('/saved-components')) return 'saved-components';
  if (p.includes('/builder')) return 'builder';
  if (p.includes('/overview')) return 'overview';
  if (p.includes('/visual-flows') || p === '/flow-builder' || p === '/workflows' || p === '/app/flow-builder') return 'visual-flows';
  return 'visual-flows';
};

const AppFlowBuilderContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useWorkflows();

  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [isCreateVariableOpen, setIsCreateVariableOpen] = useState(false);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);

  // Sync activeTab with location.pathname
  useEffect(() => {
    const resolved = resolveWorkflowsTab(location.pathname);
    if (resolved && resolved !== activeTab) {
      setActiveTab(resolved);
    }
  }, [location.pathname, activeTab, setActiveTab]);

  const handleTabClick = (tab: WorkflowsSubTab, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const isRulesGroup = activeTab === 'triggers' || activeTab === 'conditions' || activeTab === 'actions';
  const isRunsGroup = activeTab === 'runs' || activeTab === 'schedules' || activeTab === 'logs' || activeTab === 'failed-runs';
  const isVariablesGroup = activeTab === 'variables' || activeTab === 'integrations' || activeTab === 'history';

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Visual Flow Builder & Workflows Engine | Outtricks Platform"
        description="Multi-channel DAG workflow canvas connecting Lead Finder, Cold Email, LinkedIn, Voice AI, and Deals CRM with intent-based execution branching."
        noindex={true}
      />

      {/* Header & Metrics */}
      <WorkflowsHeader
        onOpenCreateWorkflow={() => setIsCreateWorkflowOpen(true)}
        onOpenCreateVariable={() => setIsCreateVariableOpen(true)}
      />

      {/* Top Primary Sub-Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          type="button"
          onClick={() => handleTabClick('visual-flows', '/flow-builder')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'visual-flows'
              ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Workflow className="w-3.5 h-3.5 text-blue-500" />
          <span>Visual Flows</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('builder', '/flow-builder/builder')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'builder'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Lemlist-Style Canvas</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('triggers', '/flow-builder/rules')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            isRulesGroup
              ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
          <span>Automation Rules</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('templates', '/flow-builder/templates')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'templates'
              ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-indigo-500" />
          <span>Templates & Sequences</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('runs', '/flow-builder/runs')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            isRunsGroup
              ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 text-emerald-500" />
          <span>Runs & Schedules</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('variables', '/flow-builder/variables')}
          className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            isVariablesGroup
              ? 'bg-white dark:bg-[#222222] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-purple-500" />
          <span>Variables & Integrations</span>
        </button>
      </div>

      {/* Secondary Inner Tab Bar for Rules Group */}
      {isRulesGroup && (
        <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#2A2A2A] pb-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => handleTabClick('triggers', '/flow-builder/rules')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'triggers'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Event Triggers
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('conditions', '/flow-builder/conditions')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'conditions'
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Filter Conditions
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('actions', '/flow-builder/actions')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'actions'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Action Catalog
          </button>
        </div>
      )}

      {/* Secondary Inner Tab Bar for Runs Group */}
      {isRunsGroup && (
        <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#2A2A2A] pb-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => handleTabClick('runs', '/flow-builder/runs')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'runs'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Execution Runs
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('schedules', '/flow-builder/schedules')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'schedules'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Automated Schedules
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('logs', '/flow-builder/logs')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'logs'
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live Logs
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('failed-runs', '/flow-builder/failed-runs')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'failed-runs'
                ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Failed Runs & Retries
          </button>
        </div>
      )}

      {/* Secondary Inner Tab Bar for Variables Group */}
      {isVariablesGroup && (
        <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#2A2A2A] pb-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => handleTabClick('variables', '/flow-builder/variables')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'variables'
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Global Variables
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('integrations', '/flow-builder/integrations')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'integrations'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Integrations & Webhooks
          </button>
          <button
            type="button"
            onClick={() => handleTabClick('history', '/flow-builder/history')}
            className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
              activeTab === 'history'
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Version History
          </button>
        </div>
      )}

      {/* Dynamic Sub-Tab Content */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'overview' && (
          <WorkflowsOverview
            onOpenCreateWorkflow={() => setIsCreateWorkflowOpen(true)}
            onOpenCreateVariable={() => setIsCreateVariableOpen(true)}
          />
        )}

        {activeTab === 'visual-flows' && (
          <VisualFlowsList onOpenCreateWorkflow={() => setIsCreateWorkflowOpen(true)} />
        )}

        {activeTab === 'builder' && (
          <InteractiveFlowBuilder onOpenAddNodeModal={() => setIsAddNodeOpen(true)} />
        )}

        {activeTab === 'templates' && (
          <WorkflowTemplatesView />
        )}

        {activeTab === 'runs' && (
          <WorkflowRunsView />
        )}

        {activeTab === 'schedules' && (
          <WorkflowSchedulesView />
        )}

        {activeTab === 'triggers' && (
          <WorkflowTriggersView />
        )}

        {activeTab === 'actions' && (
          <WorkflowActionsView />
        )}

        {activeTab === 'conditions' && (
          <WorkflowConditionsView />
        )}

        {activeTab === 'variables' && (
          <WorkflowVariablesView onOpenCreateVariable={() => setIsCreateVariableOpen(true)} />
        )}

        {activeTab === 'data' && (
          <WorkflowDataView />
        )}

        {activeTab === 'integrations' && (
          <WorkflowIntegrationsView />
        )}

        {activeTab === 'history' && (
          <WorkflowHistoryView />
        )}

        {activeTab === 'logs' && (
          <WorkflowLogsView />
        )}

        {activeTab === 'failed-runs' && (
          <WorkflowFailedRunsView />
        )}

        {activeTab === 'saved-components' && (
          <SavedComponentsView />
        )}
      </div>

      {/* Modals */}
      <CreateWorkflowModal
        isOpen={isCreateWorkflowOpen}
        onClose={() => setIsCreateWorkflowOpen(false)}
      />

      <CreateVariableModal
        isOpen={isCreateVariableOpen}
        onClose={() => setIsCreateVariableOpen(false)}
      />

      <AddNodeModal
        isOpen={isAddNodeOpen}
        onClose={() => setIsAddNodeOpen(false)}
      />

    </div>
  );
};

export const AppFlowBuilderPage: React.FC = () => {
  return <AppFlowBuilderContent />;
};

export default AppFlowBuilderPage;
