import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Package, Layers, Sparkles, Shield, ToggleLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminModulesView } from './AdminModulesView';
import { AdminPlansView } from './AdminPlansView';
import { AdminBundlesView } from './AdminBundlesView';
import { AdminFeatureAccessView } from './AdminFeatureAccessView';

export type ProductTabType = 'modules' | 'plans' | 'bundles' | 'feature-access';

export const AdminProductView: React.FC<{ initialTab?: ProductTabType }> = ({ initialTab = 'modules' }) => {
  const { modules, plans, bundles } = useAdmin();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): ProductTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/plans') || p.includes('/admin/plans')) return 'plans';
    if (p.includes('/workspace/bundles') || p.includes('/admin/bundles')) return 'bundles';
    if (p.includes('/workspace/feature-access') || p.includes('/admin/feature-access')) return 'feature-access';
    if (p.includes('/workspace/modules') || p.includes('/admin/modules')) return 'modules';

    const tabParam = searchParams.get('tab') as ProductTabType | null;
    if (tabParam && ['modules', 'plans', 'bundles', 'feature-access'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<ProductTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: ProductTabType = 'modules';
    if (p.includes('/workspace/plans') || p.includes('/admin/plans')) nextTab = 'plans';
    else if (p.includes('/workspace/bundles') || p.includes('/admin/bundles')) nextTab = 'bundles';
    else if (p.includes('/workspace/feature-access') || p.includes('/admin/feature-access')) nextTab = 'feature-access';
    else if (p.includes('/workspace/modules') || p.includes('/admin/modules')) nextTab = 'modules';
    else {
      const tabParam = searchParams.get('tab') as ProductTabType | null;
      if (tabParam && ['modules', 'plans', 'bundles', 'feature-access'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as ProductTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'modules', title: 'Modules', icon: Layers, count: modules.length },
    { id: 'plans', title: 'Plans', icon: Package, count: plans.length },
    { id: 'bundles', title: 'Bundles', icon: Sparkles, count: bundles.length },
    { id: 'feature-access', title: 'Feature Access', icon: Shield },
  ];

  return (
    <AdminParentSectionLayout
      title="Product Catalog & Tier Governance"
      description="Manage core platform capability modules, subscription tiers, multi-channel bundles, and granular feature access matrix."
      icon={Package}
      badges={[
        { label: `${modules.length} Modules`, variant: 'blue' },
        { label: `${plans.length} Plans`, variant: 'purple' },
        { label: `${bundles.length} Bundles`, variant: 'emerald' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'modules' && <AdminModulesView />}
      {activeTab === 'plans' && <AdminPlansView />}
      {activeTab === 'bundles' && <AdminBundlesView />}
      {activeTab === 'feature-access' && <AdminFeatureAccessView />}
    </AdminParentSectionLayout>
  );
};