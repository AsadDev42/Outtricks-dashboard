import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const DeliverabilityPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Email Deliverability Suite & DNS Health Monitor | Outtricks"
        description="Monitor SPF, DKIM, DMARC, and domain reputation to guarantee 99.4% primary inbox delivery."
        canonical="https://outtricks.com/platform/deliverability"
        keywords={["email deliverability","SPF DKIM checker","domain warmup","spam filter prevention"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Deliverability","url":"/platform/deliverability"}]}
      />
      <PageHeader 
        category="Platform" categoryHref="/platform"
        badge="99.4% Inbox Delivery"
        title="Deliverability Guard & Health Monitoring"
        description="Continuous automated monitoring of SPF, DKIM, DMARC, custom tracking domains, and sender reputation with auto-rotation."
        highlights={["Pre-Send Suppression Engine", "Automated Peer-to-Peer Warmup", "0% Spam Trap Ingestion"]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#141414] p-6 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-2">
          <div className="font-bold text-slate-900 dark:text-white text-base">DNS Health Checks</div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Automated hourly checks for SPF, DKIM, and DMARC alignments across all inboxes.</p>
        </div>
        <div className="bg-white dark:bg-[#141414] p-6 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-2">
          <div className="font-bold text-slate-900 dark:text-white text-base">Spam Trap Filtering</div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">Cleans disposable and risky emails before campaign dispatch through multi-provider verification.</p>
        </div>
        <div className="bg-white dark:bg-[#141414] p-6 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean space-y-2">
          <div className="font-bold text-slate-900 dark:text-white text-base">Automatic Inbox Gating</div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">If an inbox drops below 96% deliverability, Outtricks auto-rests the mailbox and re-warms it.</p>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
};
