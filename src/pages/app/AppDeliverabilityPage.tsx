import React from 'react';
import { CreditLedgerSimulator } from '../../components/CreditLedgerSimulator';
import { SEOHead } from '../../components/seo/SEOHead';
import { ShieldCheck } from 'lucide-react';

export const AppDeliverabilityPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <SEOHead 
        title="Deliverability Sentinel & Ledger | Outtricks Platform"
        description="Monitor SPF, DKIM, DMARC, mailbox warmup pools, and verified lead credit consumption."
        noindex={true}
      />
      <div className="p-6 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
              Deliverability Guard & Credit Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time DNS alignment (SPF, DKIM, DMARC Reject) and transparent credit consumption telemetry.
          </p>
        </div>
      </div>
      <CreditLedgerSimulator />
    </div>
  );
};
