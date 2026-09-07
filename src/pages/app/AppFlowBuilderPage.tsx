import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
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
  if (p.includes('/templates')) return 'templates';
  if (p.includes('/runs')) return 'runs';
  if (p.includes('/schedules')) return 'schedules';
  if (p.includes('/triggers')) return 'triggers';
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

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Visual Flow Builder & Workflows Engine | Outtricks Platform"
        description="Multi-channel DAG workflow canvas connecting Lead Finder, Cold Email, LinkedIn, Voice AI, and Deals CRM with intent-based execution branching."
        noindex={true}
      />

      {/* Header & Sub-Tabs Navigation */}
      <WorkflowsHeader
        onOpenCreateWorkflow={() => setIsCreateWorkflowOpen(true)}
        onOpenCreateVariable={() => setIsCreateVariableOpen(true)}
      />

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
