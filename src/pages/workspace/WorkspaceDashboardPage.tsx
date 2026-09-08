import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminDashboardView } from '../../components/admin/AdminDashboardView';

export const WorkspaceDashboardPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Workspace Dashboard | Outtricks Platform"
        description="Comprehensive workspace control center, organization health, metrics, and administration governance."
        noindex={true}
      />
      <AdminDashboardView />
    </GsapPageTransition>
  );
};

export default WorkspaceDashboardPage;
