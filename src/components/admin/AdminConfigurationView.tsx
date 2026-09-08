import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Settings, Bell, Palette, Globe, Building2 } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminNotificationsView } from './AdminNotificationsView';
import { AdminBrandingView } from './AdminBrandingView';
import { AdminGlobalSettingsView } from './AdminGlobalSettingsView';
import { SettingsOrganizationView } from '../settings/SettingsOrganizationView';

export type ConfigurationTabType = 'organization' | 'global-settings' | 'branding' | 'notifications';

export const AdminConfigurationView: React.FC<{ initialTab?: ConfigurationTabType }> = ({ initialTab = 'organization' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): ConfigurationTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/organization') || p.includes('/workspace/org') || p.includes('/admin/organization')) return 'organization';
    if (p.includes('/workspace/branding') || p.includes('/admin/branding')) return 'branding';
    if (p.includes('/workspace/global-settings') || p.includes('/workspace/settings') || p.includes('/admin/global-settings') || p.includes('/admin/settings')) return 'global-settings';
    if (p.includes('/workspace/notifications') || p.includes('/admin/notifications')) return 'notifications';

    const tabParam = searchParams.get('tab') as ConfigurationTabType | null;
    if (tabParam && ['organization', 'global-settings', 'branding', 'notifications'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<ConfigurationTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: ConfigurationTabType = 'organization';
    if (p.includes('/workspace/organization') || p.includes('/workspace/org') || p.includes('/admin/organization')) nextTab = 'organization';
    else if (p.includes('/workspace/branding') || p.includes('/admin/branding')) nextTab = 'branding';
    else if (p.includes('/workspace/global-settings') || p.includes('/workspace/settings') || p.includes('/admin/global-settings') || p.includes('/admin/settings')) nextTab = 'global-settings';
    else if (p.includes('/workspace/notifications') || p.includes('/admin/notifications')) nextTab = 'notifications';
    else {
      const tabParam = searchParams.get('tab') as ConfigurationTabType | null;
      if (tabParam && ['organization', 'global-settings', 'branding', 'notifications'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as ConfigurationTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'organization', title: 'Organization Profile', icon: Building2 },
    { id: 'global-settings', title: 'Global Settings', icon: Globe },
    { id: 'branding', title: 'Branding', icon: Palette },
    { id: 'notifications', title: 'Notifications', icon: Bell },
  ];

  return (
    <AdminParentSectionLayout
      title="System Configuration & Customization"
      description="Configure workspace organization identity, legal business profile, global platform flags, and white-label branding."
      icon={Settings}
      badges={[
        { label: 'Workspace Identity', variant: 'blue' },
        { label: 'White-Label Engine', variant: 'purple' },
        { label: 'Global Presets', variant: 'slate' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'organization' && <SettingsOrganizationView hideHeader={true} />}
      {activeTab === 'global-settings' && <AdminGlobalSettingsView />}
      {activeTab === 'branding' && <AdminBrandingView />}
      {activeTab === 'notifications' && <AdminNotificationsView />}
    </AdminParentSectionLayout>
  );
};