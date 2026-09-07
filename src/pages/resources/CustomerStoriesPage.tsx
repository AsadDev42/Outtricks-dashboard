import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';

export const CustomerStoriesPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Customer Stories & Revenue Growth Milestones | Outtricks"
        description="Read how high-growth B2B companies scale their outbound revenue pipeline with Outtricks."
        canonical="https://outtricks.com/resources/customer-stories"
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Customer Stories","url":"/resources/customer-stories"}]}
      />
      <PageHeader 
        category="Resources" categoryHref="/resources"
        badge="Real Founders"
        title="Customer Stories & Video Breakdowns"
        description="Interviews with B2B founders and agency owners who consolidated 6 tools into 1 single database."
      />
      <CtaBanner />
    </div>
  );
};
