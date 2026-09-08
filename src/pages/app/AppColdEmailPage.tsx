import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  EmailProvider, 
  useEmail 
} from '../../context/EmailContext';
import { 
  EmailHeader,
  EmailOverview,
  CampaignsList,
  SequencesBuilder,
  TemplatesLibrary,
  AbTestingView,
  MailboxesManager,
  DomainsHealthView,
  WarmupDashboard,
  InboxPlacementView,
  SuppressionManager,
  EmailAnalyticsView,
  EmailLeadsView,
  EmailInboxesView,
  CreateCampaignModal,
  CreateSequenceModal,
  CreateTemplateModal,
  ConnectMailboxModal
} from '../../components/email';

const AppColdEmailPageContent: React.FC = () => {
  const location = useLocation();
  const { activeTab } = useEmail();

  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isCreateSequenceOpen, setIsCreateSequenceOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isConnectMailboxOpen, setIsConnectMailboxOpen] = useState(false);

  // Resolve active view from URL pathname
  const p = location.pathname.toLowerCase();

  const isSequences = p.includes('/sequences');
  const isTemplates = p.includes('/templates');
  const isLeads = p.includes('/leads');
  const isAbTesting = p.includes('/ab-testing');
  const isMailboxes = p.includes('/mailboxes');
  const isInboxes = p.includes('/inboxes');
  const isDomainsHealth = p.includes('/domains-health') || p.includes('/domains') || p.includes('/deliverability');
  const isWarmup = p.includes('/warmup');
  const isInboxPlacement = p.includes('/inbox-placement') || p.includes('/placement');
  const isSuppression = p.includes('/suppression');
  const isSettings = p.includes('/settings');
  const isAnalytics = p.includes('/analytics');
  const isOverview = p.includes('/overview');
  const isCampaigns = !isSequences && !isTemplates && !isLeads && !isAbTesting && !isMailboxes && !isInboxes && !isDomainsHealth && !isWarmup && !isInboxPlacement && !isSuppression && !isSettings && !isAnalytics && !isOverview;

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Cold Email Outreach & Multi-Inbox Engine | Outtricks Platform"
        description="Multi-inbox cold email rotation across 24+ Google Workspace & Microsoft 365 sender pools with deliverability health monitoring."
        noindex={true}
      />

      {/* Top Header & Sub-Tab Bar - Rendered strictly on Campaigns */}
      {isCampaigns && (
        <EmailHeader
          onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
          onOpenCreateSequence={() => setIsCreateSequenceOpen(true)}
          onOpenConnectMailbox={() => setIsConnectMailboxOpen(true)}
        />
      )}

      {/* Sub-Tab View Content */}
      <div className="animate-in fade-in duration-150">
        {isOverview && (
          <EmailOverview
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
            onOpenCreateSequence={() => setIsCreateSequenceOpen(true)}
            onOpenConnectMailbox={() => setIsConnectMailboxOpen(true)}
            onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
          />
        )}

        {isCampaigns && (
          <CampaignsList
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
          />
        )}

        {isSequences && (
          <SequencesBuilder
            onOpenCreateSequence={() => setIsCreateSequenceOpen(true)}
          />
        )}

        {isTemplates && (
          <TemplatesLibrary
            onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
          />
        )}

        {isLeads && (
          <EmailLeadsView />
        )}

        {isAbTesting && (
          <AbTestingView />
        )}

        {isMailboxes && (
          <MailboxesManager
            onOpenConnectMailbox={() => setIsConnectMailboxOpen(true)}
          />
        )}

        {isInboxes && (
          <EmailInboxesView />
        )}

        {isDomainsHealth && (
          <DomainsHealthView />
        )}

        {isWarmup && (
          <WarmupDashboard />
        )}

        {isInboxPlacement && (
          <InboxPlacementView />
        )}

        {(isSuppression || isSettings) && (
          <SuppressionManager />
        )}

        {isAnalytics && (
          <EmailAnalyticsView />
        )}
      </div>

      {/* Modals */}
      <CreateCampaignModal
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
      />

      <CreateSequenceModal
        isOpen={isCreateSequenceOpen}
        onClose={() => setIsCreateSequenceOpen(false)}
      />

      <CreateTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => setIsCreateTemplateOpen(false)}
      />

      <ConnectMailboxModal
        isOpen={isConnectMailboxOpen}
        onClose={() => setIsConnectMailboxOpen(false)}
      />

    </div>
  );
};

export const AppColdEmailPage: React.FC = () => {
  return <AppColdEmailPageContent />;
};

export default AppColdEmailPage;
