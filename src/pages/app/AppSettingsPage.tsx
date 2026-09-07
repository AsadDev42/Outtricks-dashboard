import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  SettingsProvider, 
  SettingsSubTab 
} from '../../context/SettingsContext';
import { 
  SettingsOverview,
  SettingsProfileView,
  SettingsAccountView,
  SettingsOrganizationView,
  SettingsTeamView,
  SettingsBillingView,
  SettingsConnectedAccountsView,
  SettingsSendingInboxesView,
  SettingsAutonomousAgentsView,
  SettingsAiAssistantView,
  SettingsDeveloperApiView,
  SettingsNotificationsView,
  SettingsAppearanceView,
  SettingsMouseCursorView,
  SettingsComplianceLegalView,
  SettingsSuppressionListView,
  SettingsEnterpriseGovernanceView,
  SettingsAuditCenterView
} from '../../components/settings';

export const resolveSettingsSection = (pathname: string): SettingsSubTab => {
  const p = pathname.toLowerCase();
  if (p.includes('/profile')) return 'profile';
  if (p.includes('/account') && !p.includes('/connected-accounts')) return 'account';
  if (p.includes('/organization') || p.includes('/org')) return 'organization';
  if (p.includes('/team') || p.includes('/members')) return 'team';
  if (p.includes('/billing') || p.includes('/credits') || p.includes('/billing-credits')) return 'billing-credits';
  if (p.includes('/connected-accounts') || p.includes('/channels')) return 'connected-accounts';
  if (p.includes('/sending-inboxes') || p.includes('/inboxes')) return 'sending-inboxes';
  if (p.includes('/autonomous-agents') || p.includes('/agents')) return 'autonomous-agents';
  if (p.includes('/ai-assistant')) return 'ai-assistant';
  if (p.includes('/developer-api') || p.includes('/api') || p.includes('/keys')) return 'developer-api';
  if (p.includes('/notifications')) return 'notifications';
  if (p.includes('/appearance') || p.includes('/theme')) return 'appearance';
  if (p.includes('/mouse-cursor') || p.includes('/cursor')) return 'mouse-cursor';
  if (p.includes('/compliance-legal') || p.includes('/compliance') || p.includes('/legal')) return 'compliance-legal';
  if (p.includes('/suppression-list') || p.includes('/suppression')) return 'suppression-list';
  if (p.includes('/enterprise-governance') || p.includes('/enterprise') || p.includes('/governance')) return 'enterprise-governance';
  if (p.includes('/audit-center') || p.includes('/audit-logs') || p.includes('/audit')) return 'audit-center';
  if (p === '/settings' || p === '/app/settings' || p.includes('/overview')) return 'overview';
  return 'overview';
};

const AppSettingsContent: React.FC = () => {
  const location = useLocation();
  const currentSection = useMemo(() => resolveSettingsSection(location.pathname), [location.pathname]);

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Workspace Settings & Governance | Outtricks Platform"
        description="Manage your profile, team members, sending infrastructure, API tokens, compliance policies, and subscription billing."
        noindex={true}
      />

      {/* Dynamic Route-Driven View Content */}
      <div className="animate-in fade-in duration-150">
        {currentSection === 'overview' && (
          <SettingsOverview />
        )}

        {currentSection === 'profile' && (
          <SettingsProfileView />
        )}

        {currentSection === 'account' && (
          <SettingsAccountView />
        )}

        {currentSection === 'organization' && (
          <SettingsOrganizationView />
        )}

        {currentSection === 'team' && (
          <SettingsTeamView />
        )}

        {currentSection === 'billing-credits' && (
          <SettingsBillingView />
        )}

        {currentSection === 'connected-accounts' && (
          <SettingsConnectedAccountsView />
        )}

        {currentSection === 'sending-inboxes' && (
          <SettingsSendingInboxesView />
        )}

        {currentSection === 'autonomous-agents' && (
          <SettingsAutonomousAgentsView />
        )}

        {currentSection === 'ai-assistant' && (
          <SettingsAiAssistantView />
        )}

        {currentSection === 'developer-api' && (
          <SettingsDeveloperApiView />
        )}

        {currentSection === 'notifications' && (
          <SettingsNotificationsView />
        )}

        {currentSection === 'appearance' && (
          <SettingsAppearanceView />
        )}

        {currentSection === 'mouse-cursor' && (
          <SettingsMouseCursorView />
        )}

        {currentSection === 'compliance-legal' && (
          <SettingsComplianceLegalView />
        )}

        {currentSection === 'suppression-list' && (
          <SettingsSuppressionListView />
        )}

        {currentSection === 'enterprise-governance' && (
          <SettingsEnterpriseGovernanceView />
        )}

        {currentSection === 'audit-center' && (
          <SettingsAuditCenterView />
        )}
      </div>

    </div>
  );
};

export const AppSettingsPage: React.FC = () => {
  return <AppSettingsContent />;
};

export default AppSettingsPage;
