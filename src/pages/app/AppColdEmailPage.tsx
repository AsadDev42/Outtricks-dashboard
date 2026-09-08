import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { useEmail } from '../../context/EmailContext';
import {
  EmailHeader,
  EmailOverview,
  CampaignsList,
  EmailCampaignOperationsHub,
  EmailDeliverabilityHub,
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
  ConnectMailboxModal,
} from '../../components/email';

const AppColdEmailPageContent: React.FC = () => {
  const location = useLocation();
  useEmail();

  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isCreateSequenceOpen, setIsCreateSequenceOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isConnectMailboxOpen, setIsConnectMailboxOpen] = useState(false);

  const p = location.pathname.toLowerCase();

  // Canonical six-destination Email IA.
  const isMailboxes = p.includes('/mailboxes');
  const isSequences = p.includes('/sequences');
  const isWarmup = p.includes('/warmup');
  const isAnalytics = p.includes('/analytics');
  const isDeliverabilityHub = p.endsWith('/deliverability');

  // Legacy/deep routes remain supported so existing tabs and links do not break.
  const isTemplates = p.includes('/templates');
  const isLeads = p.includes('/leads');
  const isAbTesting = p.includes('/ab-testing');
  const isInboxes = p.includes('/inboxes');
  const isDomainsHealth = !isDeliverabilityHub && (p.includes('/domains-health') || p.includes('/domains'));
  const isInboxPlacement = p.includes('/inbox-placement') || p.includes('/placement');
  const isSuppression = p.includes('/suppression');
  const isSettings = p.includes('/settings');
  const isOverview = p.includes('/overview');

  const isCampaigns =
    p.endsWith('/campaigns') ||
    p === '/email' ||
    p === '/app/email' ||
    (!isSequences && !isTemplates && !isLeads && !isAbTesting && !isMailboxes && !isInboxes && !isDomainsHealth && !isDeliverabilityHub && !isWarmup && !isInboxPlacement && !isSuppression && !isSettings && !isAnalytics && !isOverview);

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Cold Email Outreach & Multi-Inbox Engine | Outtricks Platform"
        description="Multi-inbox cold email rotation, sequences, A/B tests, warmup, analytics and deliverability operations."
        noindex={true}
      />

      {/* Keep the Cold Email summary/header strictly on the Campaigns destination. */}
      {isCampaigns && (
        <EmailHeader
          onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
          onOpenCreateSequence={() => setIsCreateSequenceOpen(true)}
          onOpenConnectMailbox={() => setIsConnectMailboxOpen(true)}
        />
      )}

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

        {isSequences && <SequencesBuilder onOpenCreateSequence={() => setIsCreateSequenceOpen(true)} />}
        {isTemplates && <TemplatesLibrary onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)} />}
        {isLeads && <EmailLeadsView />}
        {isAbTesting && <AbTestingView />}
        {isMailboxes && <MailboxesManager onOpenConnectMailbox={() => setIsConnectMailboxOpen(true)} />}
        {isInboxes && <EmailInboxesView />}
        {isDeliverabilityHub && <EmailDeliverabilityHub />}
        {isDomainsHealth && <DomainsHealthView />}
        {isWarmup && <WarmupDashboard />}
        {isInboxPlacement && <InboxPlacementView />}
        {(isSuppression || isSettings) && <SuppressionManager />}
        {isAnalytics && <EmailAnalyticsView />}
      </div>

      <CreateCampaignModal isOpen={isCreateCampaignOpen} onClose={() => setIsCreateCampaignOpen(false)} />
      <CreateSequenceModal isOpen={isCreateSequenceOpen} onClose={() => setIsCreateSequenceOpen(false)} />
      <CreateTemplateModal isOpen={isCreateTemplateOpen} onClose={() => setIsCreateTemplateOpen(false)} />
      <ConnectMailboxModal isOpen={isConnectMailboxOpen} onClose={() => setIsConnectMailboxOpen(false)} />
    </div>
  );
};

export const AppColdEmailPage: React.FC = () => <AppColdEmailPageContent />;

export default AppColdEmailPage;
