import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminSecurityHubView } from '../../components/admin/AdminSecurityHubView';

export const SecurityAuditPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Security & Audit | Workspace - Outtricks Platform"
        description="Review active user sessions, security policies, IP restrictions, and complete immutable governance audit logs."
        noindex={true}
      />
      <AdminSecurityHubView initialTab="security" />
    </GsapPageTransition>
  );
};

export default SecurityAuditPage;
