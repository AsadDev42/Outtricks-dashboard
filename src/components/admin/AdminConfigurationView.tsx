import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Settings, Bell, Palette, Globe } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminNotificationsView } from './AdminNotificationsView';
import { AdminBrandingView } from './AdminBrandingView';
import { AdminGlobalSettingsView } from './AdminGlobalSettingsView';

export type ConfigurationTabType = 'notifications' | 'branding' | 'global-settings';

export const AdminConfigurationView: React.FC<{ initialTab?: ConfigurationTabType }> = ({ initialTab = 'notifications' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): ConfigurationTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/admin/branding')) return 'branding';
    if (p.includes('/admin/global-settings') || p.includes('/admin/settings')) return 'global-settings';
    if (p.includes('/admin/notifications')) return 'notifications';

    const tabParam = searchParams.get('tab') as ConfigurationTabType | null;
    if (tabParam && ['notifications', 'branding', 'global-settings'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<ConfigurationTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: ConfigurationTabType = 'notifications';
    if (p.includes('/admin/branding')) nextTab = 'branding';
    else if (p.includes('/admin/global-settings') || p.includes('/admin/settings')) nextTab = 'global-settings';
    else if (p.includes('/admin/notifications')) nextTab = 'notifications';
    else {
      const tabParam = searchParams.get('tab') as ConfigurationTabType | null;
      if (tabParam && ['notifications', 'branding', 'global-settings'].includes(tabParam)) {
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
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'branding', title: 'Branding', icon: Palette },
    { id: 'global-settings', title: 'Global Settings', icon: Globe },
  ];

  return (
    <AdminParentSectionLayout
      title="System Configuration & Customization"
      description="Configure real-time webhook & email notifications, multi-tenant workspace white-label branding, and global platform flags."
      icon={Settings}
      badges={[
        { label: 'White-Label Engine', variant: 'blue' },
        { label: 'Global Presets', variant: 'purple' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'notifications' && <AdminNotificationsView />}
      {activeTab === 'branding' && <AdminBrandingView />}
      {activeTab === 'global-settings' && <AdminGlobalSettingsView />}
    </AdminParentSectionLayout>
  );
};