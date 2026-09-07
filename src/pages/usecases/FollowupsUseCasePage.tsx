import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';

export const FollowupsUseCasePage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Multi-Touch Automated Follow-Up Sequences | Outtricks"
        description="Maintain persistent follow-ups across email, phone, and LinkedIn without manual SDR intervention."
        canonical="https://outtricks.com/use-cases/automated-followups"
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Automated Follow-ups","url":"/use-cases/automated-followups"}]}
      />
      <PageHeader 
        category="Use Cases" categoryHref="/use-cases"
        badge="Smart Follow-ups"
        title="Automated Multi-Touch Follow-Ups Across Channels"
        description="Never let a lead go cold. Orchestrate synchronized follow-ups via email, LinkedIn, and phone based on prospect engagement signals."
      />
      <CtaBanner />
    </div>
  );
};
