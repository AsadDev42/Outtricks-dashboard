import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminBillingView } from '../../components/admin/AdminBillingView';

export const SubscriptionsBillingPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Subscriptions & Billing | Workspace - Outtricks Platform"
        description="Manage workspace recurring subscriptions, invoices, payment history, credits balance, and promo coupons."
        noindex={true}
      />
      <AdminBillingView initialTab="subscriptions" />
    </GsapPageTransition>
  );
};

export default SubscriptionsBillingPage;
