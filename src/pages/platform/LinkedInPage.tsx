import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { LinkedInProvider } from '../../context/LinkedInContext';
import { 
  LinkedInHeader,
  LinkedInOverview,
  LinkedInCampaignsView,
  LinkedInOutreachQueueView,
  LinkedInAutomationView,
  LinkedInExecutionLogsView,
  LinkedInAccountsView,
  LinkedInProxyView,
  LinkedInHealthView,
  LinkedInProspectsView,
  LinkedInConnectionsView,
  LinkedInVisitsView,
  LinkedInMessagesView,
  LinkedInInMailsView,
  LinkedInLeadsView,
  LinkedInAnalyticsView,
  LinkedInActivityView,
  CreateLinkedInCampaignModal,
  ConnectLinkedInAccountModal,
  CreateAutomationRuleModal
} from '../../components/linkedin';

type LinkedInSection = 
  | 'campaigns'
  | 'queue'
  | 'automation'
  | 'execution-logs'
  | 'accounts'
  | 'proxy-management'
  | 'account-health'
  | 'prospects'
  | 'connections'
  | 'profile-visits'
  | 'messages'
  | 'inmails'
  | 'leads'
  | 'analytics'
  | 'activity'
  | 'overview';

const resolveLinkedInSection = (pathname: string): LinkedInSection => {
  const p = pathname.toLowerCase();
  if (p.includes('/queue')) return 'queue';
  if (p.includes('/execution-logs') || p.endsWith('/logs')) return 'execution-logs';
  if (p.includes('/automation') || p.includes('/rules')) return 'automation';
  if (p.includes('/proxy-management') || p.includes('/proxies')) return 'proxy-management';
  if (p.includes('/account-health') || p.includes('/health')) return 'account-health';
  if (p.includes('/accounts')) return 'accounts';
  if (p.includes('/profile-visits') || p.includes('/visits')) return 'profile-visits';
  if (p.includes('/connections')) return 'connections';
  if (p.includes('/prospects')) return 'prospects';
  if (p.includes('/messages')) return 'messages';
  if (p.includes('/inmails')) return 'inmails';
  if (p.includes('/leads')) return 'leads';
  if (p.includes('/analytics')) return 'analytics';
  if (p.includes('/activity')) return 'activity';
  if (p.includes('/campaigns') || p.includes('/sequences')) return 'campaigns';
  if (p.includes('/settings')) return 'account-health';
  if (p === '/linkedin' || p === '/app/linkedin' || p.includes('/overview')) return 'overview';
  return 'overview';
};

const LinkedInPageContent: React.FC = () => {
  const location = useLocation();
  const currentSection = useMemo(() => resolveLinkedInSection(location.pathname), [location.pathname]);

  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isConnectAccountOpen, setIsConnectAccountOpen] = useState(false);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="LinkedIn Safe Cloud Automation & Outreach Suite | Outtricks Platform"
        description="Automate LinkedIn connection requests, InMails, and profile touches with dedicated static residential proxies and human pacing."
        noindex={true}
      />

      {/* Header Banner with Metrics & Actions */}
      <LinkedInHeader
        onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
        onOpenConnectAccount={() => setIsConnectAccountOpen(true)}
        onOpenCreateRule={() => setIsCreateRuleOpen(true)}
      />

      {/* Dynamic Route-Driven View Content */}
      <div className="animate-in fade-in duration-150">
        {currentSection === 'overview' && (
          <LinkedInOverview
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
            onOpenConnectAccount={() => setIsConnectAccountOpen(true)}
            onOpenCreateRule={() => setIsCreateRuleOpen(true)}
          />
        )}

        {currentSection === 'campaigns' && (
          <LinkedInCampaignsView
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
          />
        )}

        {currentSection === 'queue' && (
          <LinkedInOutreachQueueView />
        )}

        {currentSection === 'automation' && (
          <LinkedInAutomationView
            onOpenCreateRule={() => setIsCreateRuleOpen(true)}
          />
        )}

        {currentSection === 'execution-logs' && (
          <LinkedInExecutionLogsView />
        )}

        {currentSection === 'accounts' && (
          <LinkedInAccountsView
            onOpenConnectAccount={() => setIsConnectAccountOpen(true)}
          />
        )}

        {currentSection === 'proxy-management' && (
          <LinkedInProxyView />
        )}

        {currentSection === 'account-health' && (
          <LinkedInHealthView />
        )}

        {currentSection === 'prospects' && (
          <LinkedInProspectsView />
        )}

        {currentSection === 'connections' && (
          <LinkedInConnectionsView />
        )}

        {currentSection === 'profile-visits' && (
          <LinkedInVisitsView />
        )}

        {currentSection === 'messages' && (
          <LinkedInMessagesView />
        )}

        {currentSection === 'inmails' && (
          <LinkedInInMailsView />
        )}

        {currentSection === 'leads' && (
          <LinkedInLeadsView />
        )}

        {currentSection === 'analytics' && (
          <LinkedInAnalyticsView />
        )}

        {currentSection === 'activity' && (
          <LinkedInActivityView />
        )}
      </div>

      {/* Modals */}
      <CreateLinkedInCampaignModal
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
      />

      <ConnectLinkedInAccountModal
        isOpen={isConnectAccountOpen}
        onClose={() => setIsConnectAccountOpen(false)}
      />

      <CreateAutomationRuleModal
        isOpen={isCreateRuleOpen}
        onClose={() => setIsCreateRuleOpen(false)}
      />

    </div>
  );
};

export const LinkedInPage: React.FC = () => {
  return (
    <LinkedInProvider>
      <LinkedInPageContent />
    </LinkedInProvider>
  );
};
