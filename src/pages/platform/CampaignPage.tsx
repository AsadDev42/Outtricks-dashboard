import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Workflow, Layers, CheckCircle2 } from 'lucide-react';

export const CampaignPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Multi-Channel Outbound Campaign Management Studio | Outtricks"
        description="Orchestrate synchronized outbound campaigns across email, social, phone, and bidding channels in one unified interface."
        canonical="https://outtricks.com/platform/campaign-management"
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Campaign Management","url":"/platform/campaign-management"}]}
      />
      <PageHeader 
        category="Platform" categoryHref="/platform"
        badge="Multi-Channel Studio"
        title="Campaign & Sequence Management"
        description="Build, test, and launch complex multi-step outreach sequences combining Email, LinkedIn, Voice AI, and Upwork proposals in minutes."
        highlights={["A/B/C Variant Testing", "Smart Sending Windows", "Auto-Pause on Reply"]}
      />

      <div className="bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Adaptive Outreach Sequences</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Campaigns automatically branch based on prospect behavior. If a prospect opens an email twice without replying, Outtricks triggers a LinkedIn connection touch followed by an autonomous Voice AI SDR call.
        </p>
      </div>

      <CtaBanner />
    </div>
  );
};
