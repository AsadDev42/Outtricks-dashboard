import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminPlatformView } from '../../components/admin/AdminPlatformView';

export const PlatformAiPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Platform & AI | Workspace - Outtricks Platform"
        description="Configure third-party service integrations, navigation rail visibility, and TRIXIE AI autonomous engine parameters."
        noindex={true}
      />
      <AdminPlatformView initialTab="integrations" />
    </GsapPageTransition>
  );
};

export default PlatformAiPage;
