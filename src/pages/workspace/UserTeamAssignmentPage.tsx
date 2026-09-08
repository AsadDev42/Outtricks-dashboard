import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminAssignmentsView } from '../../components/admin/AdminAssignmentsView';

export const UserTeamAssignmentPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="User & Team Assignments | Workspace - Outtricks Platform"
        description="Assign subscription plans, bundle packages, and custom quota overrides to individual users and teams."
        noindex={true}
      />
      <AdminAssignmentsView initialTab="user-assignments" />
    </GsapPageTransition>
  );
};

export default UserTeamAssignmentPage;
