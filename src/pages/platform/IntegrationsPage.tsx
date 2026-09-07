import { SEOHead } from '../../components/seo/SEOHead';
﻿import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const INTEGRATIONS = [
    { name: "Google Workspace", category: "Email / OAuth", desc: "Native rotation & Gmail API sending" },
    { name: "Microsoft 365", category: "Email / Exchange", desc: "Outlook & Azure AD enterprise sync" },
    { name: "LinkedIn Official API", category: "Social API", desc: "Versioned OAuth with dedicated IP" },
    { name: "HubSpot CRM", category: "CRM Sync", desc: "Bi-directional deal & contact sync" },
    { name: "Salesforce", category: "CRM Sync", desc: "Enterprise object & pipeline mapping" },
    { name: "Upwork & Freelancer", category: "Marketplaces", desc: "24/7 Feed scraping & proposal bidding" },
    { name: "Slack & Discord", category: "Alerts", desc: "Real-time deal won & call notifications" },
    { name: "Stripe & Paddle", category: "Billing", desc: "Automated billing ledger sync" },
    { name: "Webhooks & REST API", category: "Developer", desc: "Zero-latency developer API endpoints" }
  ];

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Integrations & Native CRM Webhooks | Outtricks"
        description="Connect Outtricks with Salesforce, HubSpot, Zapier, Webhooks, and your entire modern revenue tech stack."
        canonical="https://outtricks.com/platform/integrations"
        keywords={["Outtricks integrations","CRM webhooks","Salesforce sync","HubSpot connector"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Integrations","url":"/platform/integrations"}]}
      />
      <PageHeader 
        category="Platform" categoryHref="/platform"
        badge="Ecosystem"
        title="50+ Native Integrations"
        description="Connect your email providers, CRMs, notification channels, and custom workflows seamlessly."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INTEGRATIONS.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-[#141414] p-6 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
              <span className="text-[10px] font-sans bg-blue-50 dark:bg-[#1A1A1A]/70 text-blue-700 px-2 py-0.5 rounded font-bold">{item.category}</span>
            </div>
            <p className="text-slate-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      <CtaBanner />
    </div>
  );
};

