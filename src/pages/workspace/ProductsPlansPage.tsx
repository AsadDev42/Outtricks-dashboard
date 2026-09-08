import React from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { AdminProductView } from '../../components/admin/AdminProductView';

export const ProductsPlansPage: React.FC = () => {
  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title="Products & Plans | Workspace - Outtricks Platform"
        description="Configure platform modules, subscription plans, add-on bundles, and feature access tiers."
        noindex={true}
      />
      <AdminProductView initialTab="modules" />
    </GsapPageTransition>
  );
};

export default ProductsPlansPage;
