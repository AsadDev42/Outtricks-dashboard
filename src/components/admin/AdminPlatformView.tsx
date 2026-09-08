import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Plug, Navigation, Sparkles } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminIntegrationsView } from './AdminIntegrationsView';
import { AdminNavigationView } from './AdminNavigationView';
import { AdminTricksyAiView } from './AdminTricksyAiView';

export type PlatformTabType = 'integrations' | 'navigation' | 'tricksy-ai';

export const AdminPlatformView: React.FC<{ initialTab?: PlatformTabType }> = ({ initialTab = 'integrations' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): PlatformTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/navigation') || p.includes('/admin/navigation')) return 'navigation';
    if (p.includes('/workspace/tricksy-ai') || p.includes('/workspace/trixie') || p.includes('/admin/tricksy-ai') || p.includes('/admin/tricksy') || p.includes('/admin/ai')) return 'tricksy-ai';
    if (p.includes('/workspace/integrations') || p.includes('/admin/integrations')) return 'integrations';

    const tabParam = searchParams.get('tab') as PlatformTabType | null;
    if (tabParam && ['integrations', 'navigation', 'tricksy-ai'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<PlatformTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: PlatformTabType = 'integrations';
    if (p.includes('/workspace/navigation') || p.includes('/admin/navigation')) nextTab = 'navigation';
    else if (p.includes('/workspace/tricksy-ai') || p.includes('/workspace/trixie') || p.includes('/admin/tricksy-ai') || p.includes('/admin/tricksy') || p.includes('/admin/ai')) nextTab = 'tricksy-ai';
    else if (p.includes('/workspace/integrations') || p.includes('/admin/integrations')) nextTab = 'integrations';
    else {
      const tabParam = searchParams.get('tab') as PlatformTabType | null;
      if (tabParam && ['integrations', 'navigation', 'tricksy-ai'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as PlatformTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'integrations', title: 'Integrations', icon: Plug },
    { id: 'navigation', title: 'Navigation', icon: Navigation },
    { id: 'tricksy-ai', title: 'TRIXIE AI', icon: Sparkles },
  ];

  return (
    <AdminParentSectionLayout
      title="Platform Core & AI Infrastructure"
      description="Manage third-party OAuth providers, app-wide sidebar routing schemas, and default LLM provider configurations for TRIXIE AI Copilot."
      icon={SlidersHorizontal}
      badges={[
        { label: 'Omni-Channel Connectors', variant: 'blue' },
        { label: 'LLM Orchestrator Live', variant: 'purple' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'integrations' && <AdminIntegrationsView />}
      {activeTab === 'navigation' && <AdminNavigationView />}
      {activeTab === 'tricksy-ai' && <AdminTricksyAiView />}
    </AdminParentSectionLayout>
  );
};