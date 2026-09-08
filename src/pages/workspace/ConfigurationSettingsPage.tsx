import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminConfigurationView } from '../../components/admin/AdminConfigurationView';

export const ConfigurationSettingsPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Configuration & Settings | Workspace - Outtricks Platform"
        description="Global system settings, email notification triggers, white-label branding, and maintenance mode controls."
        noindex={true}
      />
      <AdminConfigurationView initialTab="global-settings" />
    </GsapPageTransition>
  );
};

export default ConfigurationSettingsPage;
