import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  UpworkProvider, 
  useUpwork, 
  UpworkJob,
  UpworkTabType 
} from '../../context/UpworkContext';
import { 
  UpworkHeader,
  UpworkOverview,
  UpworkJobsFeed,
  SavedJobsView,
  JobAlertsView,
  ApplicationsView,
  InterviewsView,
  ContractsView,
  EarningsView,
  UpworkProfileView,
  UpworkMessagesView,
  JobIntelligenceView,
  UpworkSequencesView,
  UpworkAutomationRulesView,
  UpworkTemplatesView,
  UpworkExecutionLogsView,
  UpworkAnalyticsView,
  UpworkAccountsView,
  CreateProposalModal,
  CreateJobAlertModal,
  CreateUpworkRuleModal,
  CreateUpworkTemplateModal
} from '../../components/upwork';

export const resolveUpworkTab = (pathname: string): UpworkTabType => {
  const p = pathname.toLowerCase();
  if (p.includes('/saved-jobs')) return 'saved-jobs';
  if (p.includes('/job-alerts') || p.includes('/alerts')) return 'job-alerts';
  if (p.includes('/interviews')) return 'interviews';
  if (p.includes('/proposal-drafts') || p.includes('/drafts')) return 'proposal-drafts';
  if (p.includes('/proposals')) return 'proposals';
  if (p.includes('/submitted')) return 'submitted';
  if (p.includes('/follow-ups')) return 'follow-ups';
  if (p.includes('/applications')) return 'applications';
  if (p.includes('/contracts')) return 'contracts';
  if (p.includes('/earnings')) return 'earnings';
  if (p.includes('/profile')) return 'profile';
  if (p.includes('/messages')) return 'messages';
  if (p.includes('/replies')) return 'replies';
  if (p.includes('/conversations')) return 'conversations';
  if (p.includes('/labels')) return 'labels';
  if (p.includes('/intelligence') || p.includes('/job-intel') || p.includes('/job-intelligence')) return 'job-intel';
  if (p.includes('/proposal-intel') || p.includes('/proposal-intelligence')) return 'proposal-intel';
  if (p.includes('/client-intel') || p.includes('/client-intelligence')) return 'client-intel';
  if (p.includes('/match-score')) return 'match-score';
  if (p.includes('/sequences')) return 'sequences';
  if (p.includes('/automation-rules') || p.includes('/automation')) return 'automation-rules';
  if (p.includes('/templates')) return 'templates';
  if (p.includes('/execution-logs') || p.includes('/logs')) return 'logs';
  if (p.includes('/performance')) return 'performance';
  if (p.includes('/revenue')) return 'revenue';
  if (p.includes('/analytics')) return 'analytics';
  if (p.includes('/accounts')) return 'accounts';
  if (p.includes('/overview')) return 'overview';
  if (p.includes('/jobs') || p === '/upwork' || p === '/app/upwork') return 'jobs';
  return 'jobs';
};

const AppUpworkPageContent: React.FC = () => {
  const location = useLocation();
  const { activeTab, setActiveTab } = useUpwork();

  const [selectedJob, setSelectedJob] = useState<UpworkJob | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);

  // Sync activeTab with location.pathname
  useEffect(() => {
    const resolved = resolveUpworkTab(location.pathname);
    if (resolved && resolved !== activeTab) {
      setActiveTab(resolved);
    }
  }, [location.pathname, activeTab, setActiveTab]);

  const handleOpenApply = (job: UpworkJob) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Upwork Autonomous Bidding & Freelance Studio | Outtricks Platform"
        description="Real-time RSS job feed monitoring, AI cover letter generation, auto-bid triggers, and contract escrow management."
        noindex={true}
      />

      {/* Header & Sub-Tabs Navigation */}
      <UpworkHeader
        onOpenCreateAlert={() => setIsCreateAlertOpen(true)}
        onOpenCreateRule={() => setIsCreateRuleOpen(true)}
        onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
      />

      {/* Dynamic Sub-Tab View Content */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'overview' && (
          <UpworkOverview
            onOpenApply={handleOpenApply}
            onOpenCreateAlert={() => setIsCreateAlertOpen(true)}
            onOpenCreateRule={() => setIsCreateRuleOpen(true)}
            onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
          />
        )}

        {activeTab === 'jobs' && (
          <UpworkJobsFeed onOpenApply={handleOpenApply} />
        )}

        {activeTab === 'saved-jobs' && (
          <SavedJobsView onOpenApply={handleOpenApply} />
        )}

        {activeTab === 'job-alerts' && (
          <JobAlertsView onOpenCreateAlert={() => setIsCreateAlertOpen(true)} />
        )}

        {(activeTab === 'applications' || activeTab === 'submitted' || activeTab === 'proposals' || activeTab === 'proposal-drafts' || activeTab === 'follow-ups') && (
          <ApplicationsView 
            initialFilter={
              activeTab === 'submitted' ? 'submitted' :
              activeTab === 'proposals' ? 'all' :
              activeTab === 'proposal-drafts' ? 'drafts' :
              activeTab === 'follow-ups' ? 'follow-ups' :
              'all'
            }
            mode={activeTab === 'proposals' || activeTab === 'proposal-drafts' ? 'proposals' : 'applications'}
          />
        )}

        {activeTab === 'interviews' && (
          <InterviewsView />
        )}

        {activeTab === 'contracts' && (
          <ContractsView />
        )}

        {activeTab === 'earnings' && (
          <EarningsView />
        )}

        {activeTab === 'profile' && (
          <UpworkProfileView />
        )}

        {(activeTab === 'messages' || activeTab === 'replies' || activeTab === 'conversations' || activeTab === 'labels') && (
          <UpworkMessagesView />
        )}

        {(activeTab === 'job-intel' || activeTab === 'proposal-intel' || activeTab === 'client-intel' || activeTab === 'match-score') && (
          <JobIntelligenceView 
            initialSection={
              activeTab === 'proposal-intel' ? 'proposal-intel' :
              activeTab === 'client-intel' ? 'client-intel' :
              activeTab === 'match-score' ? 'match-score' :
              'job-intel'
            }
          />
        )}

        {activeTab === 'sequences' && (
          <UpworkSequencesView />
        )}

        {(activeTab === 'automation-rules' || activeTab === 'logs') && (
          <UpworkAutomationRulesView 
            onOpenCreateRule={() => setIsCreateRuleOpen(true)} 
            initialTab={activeTab === 'logs' ? 'logs' : 'rules'}
          />
        )}

        {activeTab === 'templates' && (
          <UpworkTemplatesView onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)} />
        )}

        {(activeTab === 'analytics' || activeTab === 'performance' || activeTab === 'revenue') && (
          <UpworkAnalyticsView 
            initialSection={
              activeTab === 'performance' ? 'performance' : 
              activeTab === 'revenue' ? 'revenue' : 
              'overview'
            } 
          />
        )}

        {activeTab === 'accounts' && (
          <UpworkAccountsView />
        )}
      </div>

      {/* Modals */}
      <CreateProposalModal
        isOpen={isApplyOpen}
        onClose={() => {
          setIsApplyOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />

      <CreateJobAlertModal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
      />

      <CreateUpworkRuleModal
        isOpen={isCreateRuleOpen}
        onClose={() => setIsCreateRuleOpen(false)}
      />

      <CreateUpworkTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => setIsCreateTemplateOpen(false)}
      />

    </div>
  );
};

export const AppUpworkPage: React.FC = () => {
  return <AppUpworkPageContent />;
};

export default AppUpworkPage;
