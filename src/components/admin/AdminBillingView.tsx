import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CreditCard, DollarSign, FileText, Coins, Tag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminSubscriptionsView } from './AdminSubscriptionsView';
import { AdminPaymentsView } from './AdminPaymentsView';
import { AdminInvoicesView } from './AdminInvoicesView';
import { AdminCreditsView } from './AdminCreditsView';
import { AdminCouponsView } from './AdminCouponsView';

export type BillingTabType = 'subscriptions' | 'payments' | 'invoices' | 'credits' | 'coupons';

export const AdminBillingView: React.FC<{ initialTab?: BillingTabType }> = ({ initialTab = 'subscriptions' }) => {
  const { subscriptions } = useAdmin();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): BillingTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/payments') || p.includes('/admin/payments')) return 'payments';
    if (p.includes('/workspace/invoices') || p.includes('/admin/invoices')) return 'invoices';
    if (p.includes('/workspace/credits') || p.includes('/admin/credits')) return 'credits';
    if (p.includes('/workspace/coupons') || p.includes('/admin/coupons')) return 'coupons';
    if (p.includes('/workspace/subscriptions') || p.includes('/admin/subscriptions')) return 'subscriptions';

    const tabParam = searchParams.get('tab') as BillingTabType | null;
    if (tabParam && ['subscriptions', 'payments', 'invoices', 'credits', 'coupons'].includes(tabParam)) return tabParam;
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<BillingTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: BillingTabType = 'subscriptions';
    if (p.includes('/workspace/payments') || p.includes('/admin/payments')) nextTab = 'payments';
    else if (p.includes('/workspace/invoices') || p.includes('/admin/invoices')) nextTab = 'invoices';
    else if (p.includes('/workspace/credits') || p.includes('/admin/credits')) nextTab = 'credits';
    else if (p.includes('/workspace/coupons') || p.includes('/admin/coupons')) nextTab = 'coupons';
    else if (p.includes('/workspace/subscriptions') || p.includes('/admin/subscriptions')) nextTab = 'subscriptions';
    else {
      const tabParam = searchParams.get('tab') as BillingTabType | null;
      if (tabParam && ['subscriptions', 'payments', 'invoices', 'credits', 'coupons'].includes(tabParam)) nextTab = tabParam;
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as BillingTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'subscriptions', title: 'Subscriptions', icon: CreditCard, count: subscriptions.length },
    { id: 'payments', title: 'Payments', icon: DollarSign },
    { id: 'invoices', title: 'Invoices', icon: FileText },
    { id: 'credits', title: 'Credits', icon: Coins },
    { id: 'coupons', title: 'Coupons', icon: Tag },
  ];

  return (
    <AdminParentSectionLayout
      title="Multi-Tenant Billing & Revenue Operations"
      description="Manage customer subscriptions, inspect transaction ledgers, generate tax invoices, allocate credit pools, and configure promo coupons."
      icon={CreditCard}
      badges={[
        { label: `${subscriptions.length} Subscriptions`, variant: 'blue' },
        { label: 'Demo Billing Ledger', variant: 'slate' },
        { label: 'Provider Connection Pending', variant: 'slate' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'subscriptions' && <AdminSubscriptionsView />}
      {activeTab === 'payments' && <AdminPaymentsView />}
      {activeTab === 'invoices' && <AdminInvoicesView />}
      {activeTab === 'credits' && <AdminCreditsView />}
      {activeTab === 'coupons' && <AdminCouponsView />}
    </AdminParentSectionLayout>
  );
};
