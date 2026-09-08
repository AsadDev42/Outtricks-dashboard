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
  CreateAutomationRuleModal,
  AiAutomationRuleModal
} from '../../components/linkedin';
import { LinkedInAutomationRule } from '../../context/LinkedInContext';
import { MultiChannelCanvasModal } from '../../components/workflows/MultiChannelCanvasModal';

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
  const [isAiRuleOpen, setIsAiRuleOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<LinkedInAutomationRule | null>(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  const handleOpenCreateRule = () => {
    setEditingRule(null);
    setIsCreateRuleOpen(true);
  };

  const handleEditRule = (rule: LinkedInAutomationRule) => {
    setEditingRule(rule);
    setIsCreateRuleOpen(true);
  };

  const handleOpenAiFromBuilder = (aiGeneratedRule: LinkedInAutomationRule) => {
    setEditingRule(aiGeneratedRule);
    setIsCreateRuleOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="LinkedIn Safe Cloud Automation & Outreach Suite | Outtricks Platform"
        description="Automate LinkedIn connection requests, InMails, and profile touches with dedicated static residential proxies and human pacing."
        noindex={true}
      />

      {/* Dynamic Route-Driven View Content */}
      <div className="animate-in fade-in duration-150">
        {currentSection === 'overview' && (
          <div className="space-y-6">
            {/* Overview Summary: Safe Cloud Automation Hero & Metrics */}
            <LinkedInHeader
              onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
              onOpenConnectAccount={() => setIsConnectAccountOpen(true)}
              onOpenCreateRule={handleOpenCreateRule}
              onOpenAiRuleBuilder={() => setIsAiRuleOpen(true)}
              onOpenVisualCanvas={() => setIsCanvasOpen(true)}
            />
            <LinkedInOverview
              onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
              onOpenConnectAccount={() => setIsConnectAccountOpen(true)}
              onOpenCreateRule={handleOpenCreateRule}
            />
          </div>
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
            onOpenCreateRule={handleOpenCreateRule}
            onOpenAiRuleBuilder={() => setIsAiRuleOpen(true)}
            onEditRule={handleEditRule}
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
        onClose={() => {
          setIsCreateRuleOpen(false);
          setEditingRule(null);
        }}
        initialRule={editingRule}
        onOpenCanvas={() => setIsCanvasOpen(true)}
      />

      <AiAutomationRuleModal
        isOpen={isAiRuleOpen}
        onClose={() => setIsAiRuleOpen(false)}
        onOpenRuleBuilder={(generatedRule) => {
          handleOpenAiFromBuilder(generatedRule);
        }}
      />

      <MultiChannelCanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        customChannelMode="linkedin"
        title="LinkedIn Visual Automation Canvas (Lemlist Style)"
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
