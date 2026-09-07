import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';

export const AiSdrUseCasePage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Autonomous AI SDR Agent Deployment Playbook | Outtricks"
        description="Deploy 24/7 autonomous AI SDRs that research accounts, personalize emails, and qualify leads on phone calls."
        canonical="https://outtricks.com/use-cases/ai-sdr"
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"AI SDR","url":"/use-cases/ai-sdr"}]}
      />
      <PageHeader 
        category="Use Cases" categoryHref="/use-cases"
        badge="Autonomous SDR"
        title="24/7 AI Sales Development Representative"
        description="Deploy autonomous agents that research accounts, write personalized emails, call prospects, and respond to objections around the clock."
      />
      <CtaBanner />
    </div>
  );
};
