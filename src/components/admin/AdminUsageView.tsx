import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Activity, BarChart3, Sliders, Coins } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminUsageOverviewView } from './AdminUsageOverviewView';
import { AdminResourceLimitsView } from './AdminResourceLimitsView';
import { AdminCreditUsageView } from './AdminCreditUsageView';

export type UsageTabType = 'usage-overview' | 'resource-limits' | 'credit-usage';

export const AdminUsageView: React.FC<{ initialTab?: UsageTabType }> = ({ initialTab = 'usage-overview' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): UsageTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/admin/resource-limits')) return 'resource-limits';
    if (p.includes('/admin/credit-usage')) return 'credit-usage';
    if (p.includes('/admin/usage-overview') || p.includes('/admin/usage')) return 'usage-overview';

    const tabParam = searchParams.get('tab') as UsageTabType | null;
    if (tabParam && ['usage-overview', 'resource-limits', 'credit-usage'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<UsageTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: UsageTabType = 'usage-overview';
    if (p.includes('/admin/resource-limits')) nextTab = 'resource-limits';
    else if (p.includes('/admin/credit-usage')) nextTab = 'credit-usage';
    else if (p.includes('/admin/usage-overview')) nextTab = 'usage-overview';
    else {
      const tabParam = searchParams.get('tab') as UsageTabType | null;
      if (tabParam && ['usage-overview', 'resource-limits', 'credit-usage'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as UsageTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'usage-overview', title: 'Usage Overview', icon: BarChart3 },
    { id: 'resource-limits', title: 'Resource Limits', icon: Sliders },
    { id: 'credit-usage', title: 'Credit Usage', icon: Coins },
  ];

  return (
    <AdminParentSectionLayout
      title="Platform Consumption & Quota Telemetry"
      description="Monitor global outbound API volume, voice minutes, token usage, enforce strict tenant quotas, and audit credit consumption."
      icon={Activity}
      badges={[
        { label: 'Real-Time Telemetry', variant: 'blue' },
        { label: 'Quota Caps Enforced', variant: 'purple' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'usage-overview' && <AdminUsageOverviewView />}
      {activeTab === 'resource-limits' && <AdminResourceLimitsView />}
      {activeTab === 'credit-usage' && <AdminCreditUsageView />}
    </AdminParentSectionLayout>
  );
};