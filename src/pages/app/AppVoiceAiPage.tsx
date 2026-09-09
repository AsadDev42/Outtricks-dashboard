import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  VoiceAiProvider, 
  useVoiceAi,
  VoiceAiTabType 
} from '../../context/VoiceAiContext';
import { 
  VoiceHeader,
  VoiceAiOverview,
  CallCenterView,
  AiAgentsView,
  VoiceCampaignsView,
  CallFlowsView,
  IntentDetectionView,
  ObjectionHandlingView,
  CallHistoryView,
  VoiceAnalyticsView,
  PhoneNumbersView,
  VoiceKnowledgeBaseView,
  VoiceCrmSyncView,
  VoiceAiQueueView,
  VoiceContactsView,
  VoiceSettingsView,
  CreateAiAgentModal,
  CreateVoiceCampaignModal,
  BuyNumberModal
} from '../../components/voice';

const AppVoiceAiPageContent: React.FC = () => {
  const { activeTab, setActiveTab } = useVoiceAi();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isBuyNumberOpen, setIsBuyNumberOpen] = useState(false);

  // Sync activeTab from URL pathname or searchParams
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let resolvedTab: VoiceAiTabType | null = null;

    if (p.includes('/ai-agents') || p.includes('/agents')) resolvedTab = 'ai-agents';
    else if (p.includes('/campaigns')) resolvedTab = 'campaigns';
    else if (p.includes('/queue')) resolvedTab = 'queue';
    else if (p.includes('/contacts')) resolvedTab = 'contacts';
    else if (p.includes('/flows')) resolvedTab = 'flows';
    else if (p.includes('/intent')) resolvedTab = 'intent';
    else if (p.includes('/objections')) resolvedTab = 'objections';
    else if (p.includes('/history') || p.includes('/recordings')) resolvedTab = 'history';
    else if (p.includes('/analytics') || p.includes('/transcripts')) resolvedTab = 'analytics';
    else if (p.includes('/phone-numbers') || p.includes('/numbers')) resolvedTab = 'phone-numbers';
    else if (p.includes('/settings') || p.includes('/config')) resolvedTab = 'settings';
    else if (p.includes('/knowledge')) resolvedTab = 'knowledge';
    else if (p.includes('/crm-sync')) resolvedTab = 'crm-sync';
    else if (p.includes('/call-center') || p.includes('/live')) resolvedTab = 'call-center';
    else if (p.includes('/overview')) resolvedTab = 'overview';
    else if (
      p === '/voice-ai' || 
      p === '/calls' || 
      p === '/voice' || 
      p === '/app/voice-ai' || 
      p === '/app/calls' || 
      p === '/app/voice'
    ) {
      const tabParam = searchParams.get('tab') as VoiceAiTabType | null;
      if (tabParam) {
        resolvedTab = tabParam;
      } else {
        resolvedTab = 'overview';
      }
    }

    if (resolvedTab && resolvedTab !== activeTab) {
      setActiveTab(resolvedTab);
    }
  }, [location.pathname, searchParams, activeTab, setActiveTab]);

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Voice AI SDR Studio & Live Dialer | Outtricks Platform"
        description="Sub-400ms WebRTC conversational voice caller qualifying leads, handling objections, and booking meetings."
        noindex={true}
      />

      {/* Header & Sub-Tabs Navigation */}
      <VoiceHeader
        onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
        onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
        onOpenBuyNumber={() => setIsBuyNumberOpen(true)}
      />

      {/* Dynamic Sub-Tab View Content */}
      <div className="animate-in fade-in duration-150">
        {activeTab === 'overview' && (
          <VoiceAiOverview
            onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
            onOpenBuyNumber={() => setIsBuyNumberOpen(true)}
          />
        )}

        {activeTab === 'call-center' && (
          <CallCenterView />
        )}

        {activeTab === 'ai-agents' && (
          <AiAgentsView
            onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
          />
        )}

        {activeTab === 'campaigns' && (
          <VoiceCampaignsView
            onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
          />
        )}

        {activeTab === 'flows' && (
          <CallFlowsView />
        )}

        {activeTab === 'intent' && (
          <IntentDetectionView />
        )}

        {activeTab === 'objections' && (
          <ObjectionHandlingView />
        )}

        {activeTab === 'history' && (
          <CallHistoryView />
        )}

        {activeTab === 'analytics' && (
          <VoiceAnalyticsView />
        )}

        {activeTab === 'phone-numbers' && (
          <PhoneNumbersView
            onOpenBuyNumber={() => setIsBuyNumberOpen(true)}
          />
        )}

        {activeTab === 'knowledge' && (
          <VoiceKnowledgeBaseView />
        )}

        {activeTab === 'crm-sync' && (
          <VoiceCrmSyncView />
        )}

        {activeTab === 'queue' && (
          <VoiceAiQueueView />
        )}

        {activeTab === 'contacts' && (
          <VoiceContactsView />
        )}

        {activeTab === 'settings' && (
          <VoiceSettingsView
            onOpenBuyNumber={() => setIsBuyNumberOpen(true)}
          />
        )}
      </div>

      {/* Modals */}
      <CreateAiAgentModal
        isOpen={isCreateAgentOpen}
        onClose={() => setIsCreateAgentOpen(false)}
      />

      <CreateVoiceCampaignModal
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
      />

      <BuyNumberModal
        isOpen={isBuyNumberOpen}
        onClose={() => setIsBuyNumberOpen(false)}
      />

    </div>
  );
};

export const AppVoiceAiPage: React.FC = () => {
  return <AppVoiceAiPageContent />;
};

export default AppVoiceAiPage;
