import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminPeopleView } from '../../components/admin/AdminPeopleView';

export const PeopleRolesPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="People & Roles | Workspace - Outtricks Platform"
        description="Manage workspace users, team divisions, and custom granular role-based permissions."
        noindex={true}
      />
      <AdminPeopleView initialTab="users" />
    </GsapPageTransition>
  );
};

export default PeopleRolesPage;
