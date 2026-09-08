import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  Send, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  DollarSign,
  Workflow
} from 'lucide-react';
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
import { MultiChannelCanvasModal } from '../../components/workflows/MultiChannelCanvasModal';

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
  if (p.includes('/proposal-intel') || p.includes('/proposal-intelligence')) return 'profile';
  if (p.includes('/client-intel') || p.includes('/client-intelligence')) return 'profile';
  if (p.includes('/match-score')) return 'profile';
  if (p.includes('/intelligence') || p.includes('/job-intel') || p.includes('/job-intelligence')) return 'profile';
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
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useUpwork();

  const [selectedJob, setSelectedJob] = useState<UpworkJob | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  // Sync activeTab with location.pathname
  useEffect(() => {
    const resolved = resolveUpworkTab(location.pathname);
    if (resolved && resolved !== activeTab) {
      setActiveTab(resolved);
    }
  }, [location.pathname]);

  const handleOpenApply = (job: UpworkJob) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const handleTabChange = (tab: UpworkTabType, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Upwork Studio | Outtricks Platform"
        description="Real-time RSS job feed monitoring, AI cover letter generation, auto-bid triggers, and contract escrow management."
        noindex={true}
      />

      {/* Header & KPIs Banner - Scoped strictly to Work Pipeline */}
      {['applications', 'submitted', 'proposals', 'proposal-drafts', 'follow-ups', 'interviews', 'contracts', 'earnings', 'sequences'].includes(activeTab) && (
        <UpworkHeader
          onOpenCreateAlert={() => setIsCreateAlertOpen(true)}
          onOpenCreateRule={() => setIsCreateRuleOpen(true)}
          onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
        />
      )}

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

        {/* Work Pipeline Single Primary Horizontal Navigation */}
        {['applications', 'submitted', 'proposals', 'proposal-drafts', 'follow-ups', 'interviews', 'contracts', 'earnings', 'sequences'].includes(activeTab) && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs mb-5 overflow-x-auto">
            <button
              type="button"
              onClick={() => handleTabChange('applications', '/upwork/applications')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                (activeTab === 'applications' || activeTab === 'submitted' || activeTab === 'follow-ups')
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Applications</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('interviews', '/upwork/interviews')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'interviews'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Interviews</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('proposals', '/upwork/proposals')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                (activeTab === 'proposals' || activeTab === 'proposal-drafts')
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Proposals</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('contracts', '/upwork/contracts')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'contracts'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Contracts</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('earnings', '/upwork/earnings')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'earnings'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Earnings</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('sequences', '/upwork/sequences')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'sequences'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#222222]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Auto-Bid Sequences</span>
            </button>
          </div>
        )}

        {/* 1. Applications View */}
        {(activeTab === 'applications' || activeTab === 'submitted' || activeTab === 'follow-ups') && (
          <ApplicationsView 
            initialFilter={
              activeTab === 'submitted' ? 'submitted' :
              activeTab === 'follow-ups' ? 'follow-ups' :
              'all'
            }
            mode="applications"
          />
        )}

        {/* 2. Interviews View */}
        {activeTab === 'interviews' && (
          <InterviewsView />
        )}

        {/* 3. Proposals View */}
        {(activeTab === 'proposals' || activeTab === 'proposal-drafts') && (
          <ApplicationsView 
            initialFilter={activeTab === 'proposal-drafts' ? 'drafts' : 'all'}
            mode="proposals"
          />
        )}

        {/* 4. Contracts View */}
        {activeTab === 'contracts' && (
          <ContractsView />
        )}

        {/* 5. Earnings View */}
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
        onOpenCanvas={() => setIsCanvasOpen(true)}
      />

      <CreateUpworkTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => setIsCreateTemplateOpen(false)}
      />

      <MultiChannelCanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        customChannelMode="upwork"
        title="Upwork Visual Automation Canvas (Lemlist Style)"
      />

    </div>
  );
};

export const AppUpworkPage: React.FC = () => {
  return <AppUpworkPageContent />;
};

export default AppUpworkPage;
