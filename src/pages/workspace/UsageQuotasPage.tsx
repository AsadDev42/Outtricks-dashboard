import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminUsageView } from '../../components/admin/AdminUsageView';

export const UsageQuotasPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Usage & Quotas | Workspace - Outtricks Platform"
        description="Monitor system resource utilization, email and calling quotas, AI inference tokens, and unit credit burns."
        noindex={true}
      />
      <AdminUsageView initialTab="usage-overview" />
    </GsapPageTransition>
  );
};

export default UsageQuotasPage;
