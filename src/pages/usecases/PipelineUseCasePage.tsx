import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { DealPipelineKanban } from '../../components/DealPipelineKanban';

export const PipelineUseCasePage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Pipeline Management & Revenue Velocity Workflows | Outtricks"
        description="Track deal stages, revenue attribution, and close velocity on a unified PostgreSQL CRM data layer."
        canonical="https://outtricks.com/use-cases/pipeline-management"
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Pipeline Management","url":"/use-cases/pipeline-management"}]}
      />
      <PageHeader 
        category="Use Cases" categoryHref="/use-cases"
        badge="Deals Pipeline"
        title="Zero-Latency Deal Progression & Forecasting"
        description="Watch pipeline velocity live as emails, connected calls, and accepted invites move deals across your Kanban board."
      />
      <DealPipelineKanban />
      <CtaBanner />
    </div>
  );
};
