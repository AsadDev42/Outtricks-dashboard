import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { AgentsProvider, useAgents, AgentRecord } from '../../context/AgentsContext';
import { 
  AgentsHeader, 
  AgentsOverviewDashboard, 
  AgentApprovalsQueue, 
  SdrOutreachAgentView,
  LinkedInSafeBotView,
  UpworkBiddingAgentView,
  DeepContextResearcherView,
  AgentExecutionsView, 
  AgentTasksView, 
  AgentPerformanceView, 
  AgentLogsView, 
  AgentDetailDrawer, 
  CreateAgentModal, 
  AgentTestModal 
} from '../../components/agents';

const AgentsPageInner: React.FC = () => {
  const location = useLocation();
  const { activeAgent, setActiveAgent } = useAgents();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testTargetAgent, setTestTargetAgent] = useState<AgentRecord | null>(null);

  const handleOpenDetail = (agent: AgentRecord) => {
    setActiveAgent(agent);
    setIsDetailOpen(true);
  };

  const handleOpenTest = (agent: AgentRecord) => {
    setTestTargetAgent(agent);
    setIsTestModalOpen(true);
  };

  const handleOpenEdit = (agent: AgentRecord) => {
    setActiveAgent(agent);
    setIsDetailOpen(true);
  };

  // Resolve current route section
  const currentPath = location.pathname.toLowerCase();

  const isApprovalsRoute = currentPath.includes('/approvals');
  const isSdrRoute = currentPath.includes('/sdr-outreach');
  const isLinkedinRoute = currentPath.includes('/linkedin-safe-bot');
  const isUpworkRoute = currentPath.includes('/upwork-bidding');
  const isResearcherRoute = currentPath.includes('/deepcontext-researcher');
  const isExecutionsRoute = currentPath.includes('/execution-runs') || currentPath.includes('/executions');
  const isTaskBacklogRoute = currentPath.includes('/task-backlog') || currentPath.includes('/tasks');
  const isPerformanceRoute = currentPath.includes('/performance') || currentPath.includes('/performance-analytics');
  const isLogsRoute = currentPath.includes('/audit-logs') || currentPath.includes('/activity-audit-logs') || currentPath.includes('/logs');
  const isOverview = !isApprovalsRoute && !isSdrRoute && !isLinkedinRoute && !isUpworkRoute && !isResearcherRoute && !isExecutionsRoute && !isTaskBacklogRoute && !isPerformanceRoute && !isLogsRoute;

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Autonomous AI Agents & Sales Workforce | Outtricks Platform"
        description="Deploy and manage autonomous digital SDRs, LinkedIn networkers, Upwork bidders, and CRM operators with native platform execution."
        noindex={true}
      />

      {/* Main Header with Actions */}
      <AgentsHeader
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenTestModal={() => {
          setTestTargetAgent(null);
          setIsTestModalOpen(true);
        }}
      />

      {/* Route-driven Active Workspace View */}
      <div className="space-y-6">
        {/* 1. Approvals Queue */}
        {isApprovalsRoute && <AgentApprovalsQueue />}

        {/* 2. SDR Outreach Agent */}
        {isSdrRoute && (
          <SdrOutreachAgentView
            onOpenTestModal={handleOpenTest}
            onOpenEditModal={handleOpenEdit}
          />
        )}

        {/* 3. LinkedIn Safe Bot */}
        {isLinkedinRoute && (
          <LinkedInSafeBotView
            onOpenTestModal={handleOpenTest}
            onOpenEditModal={handleOpenEdit}
          />
        )}

        {/* 4. Upwork Bidding Agent */}
        {isUpworkRoute && <UpworkBiddingAgentView />}

        {/* 5. DeepContext Researcher */}
        {isResearcherRoute && <DeepContextResearcherView />}

        {/* 6. Execution Runs */}
        {isExecutionsRoute && <AgentExecutionsView />}

        {/* 7. Task Backlog */}
        {isTaskBacklogRoute && <AgentTasksView />}

        {/* 8. Performance Analytics */}
        {isPerformanceRoute && <AgentPerformanceView />}

        {/* 9. Activity Audit Logs */}
        {isLogsRoute && <AgentLogsView />}

        {/* 10. Default / Workforce Overview */}
        {isOverview && <AgentsOverviewDashboard onOpenCreateModal={() => setIsCreateModalOpen(true)} />}
      </div>

      {/* Modals and Detail Drawers */}
      <AgentDetailDrawer
        agent={activeAgent}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenTest={handleOpenTest}
      />

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <AgentTestModal
        isOpen={isTestModalOpen}
        initialAgent={testTargetAgent}
        onClose={() => {
          setIsTestModalOpen(false);
          setTestTargetAgent(null);
        }}
      />
    </div>
  );
};

export const AppAiAgentsPage: React.FC = () => {
  return <AgentsPageInner />;
};

export default AppAiAgentsPage;
