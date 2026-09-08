import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Sparkles, Download, CheckCircle2, ExternalLink, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { billingGateway } from '../../services/billingGateway';

const DEMO_PLAN = {
  name: 'Scale Bundle',
  monthlyPrice: 499,
  annualPrice: 399,
  leadCredits: 50000,
  emailVolume: 75000,
  linkedInRequests: 8000,
  voiceMinutes: 2000,
  autoProposals: 500,
};

const DEMO_INVOICES = [
  { id: 'DEMO-2026-08', date: 'Aug 01, 2026', amount: '$499.00', status: 'Demo', plan: 'Scale Bundle (Monthly)' },
  { id: 'DEMO-2026-07', date: 'Jul 01, 2026', amount: '$499.00', status: 'Demo', plan: 'Scale Bundle (Monthly)' },
];

export const SettingsBillingView: React.FC = () => {
  const { info } = useToast();
  const portalReady = billingGateway.isPortalConfigured();
  const checkoutReady = billingGateway.isCheckoutConfigured();

  const openPortal = () => {
    const result = billingGateway.openPortal();
    if (!result.ok) {
      info('Billing portal is not connected yet. Configure VITE_BILLING_PORTAL_URL when the billing backend/provider is ready.', 'Billing Not Connected');
    }
  };

  const openCheckout = () => {
    const result = billingGateway.openCheckout();
    if (!result.ok) {
      info('Checkout is not connected yet. Configure VITE_BILLING_CHECKOUT_URL when the billing backend/provider is ready.', 'Checkout Not Connected');
    }
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">Billing & Usage</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">Subscription, usage and payment controls. Demo billing data remains clearly labeled until the billing provider is connected.</p>
        </div>
        <Link to="/pricing" className="shrink-0">
          <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>View Pricing</Button>
        </Link>
      </div>

      {!portalReady && !checkoutReady && (
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 flex items-start gap-2 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong className="block">Billing provider not connected</strong>
            <span className="text-[11px] opacity-90">Payment actions no longer claim success until checkout/customer-portal URLs are configured.</span>
          </div>
        </div>
      )}

      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-primary font-mono">Current Demo Plan</span>
            <Badge variant="slate" size="sm">Demo Data</Badge>
          </div>
          <div className="text-2xl font-black text-slate-950 dark:text-white">{DEMO_PLAN.name}</div>
          <p className="text-xs text-slate-500 max-w-2xl">The in-app demo plan now uses the same Scale Bundle name and limits defined by the repository Pricing page instead of a separate Enterprise Growth Tier.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500">
            <span>Monthly <strong className="text-slate-900 dark:text-white">${DEMO_PLAN.monthlyPrice}</strong></span>
            <span>Annual <strong className="text-slate-900 dark:text-white">${DEMO_PLAN.annualPrice}/mo</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" onClick={openPortal} leftIcon={<CreditCard className="w-3.5 h-3.5" />}>Manage Billing</Button>
          <Button variant="primary" size="sm" onClick={openCheckout} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>Add / Change Plan</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 text-xs">
        {[
          { label: 'Lead Credits / mo', value: DEMO_PLAN.leadCredits.toLocaleString(), icon: Sparkles },
          { label: 'Cold Emails / mo', value: DEMO_PLAN.emailVolume.toLocaleString(), icon: CheckCircle2 },
          { label: 'LinkedIn Requests', value: DEMO_PLAN.linkedInRequests.toLocaleString(), icon: CheckCircle2 },
          { label: 'Voice Minutes', value: DEMO_PLAN.voiceMinutes.toLocaleString(), icon: Zap },
          { label: 'Auto-Proposals', value: DEMO_PLAN.autoProposals.toLocaleString(), icon: Zap },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">{item.label}</span>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-black text-slate-950 dark:text-white font-mono">{item.value}</div>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">Payment Method</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Payment details come from the configured billing provider; the UI no longer displays a fake Visa card.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={openPortal}>Open Billing Portal</Button>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-500 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>{portalReady ? 'Billing portal configured — open it to view or update the real payment method.' : 'No live payment method is shown until the billing portal is connected.'}</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">Billing History</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Demo rows are intentionally non-downloadable. Real invoices should be supplied by the billing provider/backend.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-3 px-4">Invoice</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {DEMO_INVOICES.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{invoice.id}</td>
                  <td className="py-3 px-4 text-slate-500">{invoice.date}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 dark:text-slate-300">{invoice.plan}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{invoice.amount}</td>
                  <td className="py-3 px-4"><Badge variant="slate" size="sm">{invoice.status}</Badge></td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" disabled className="inline-flex items-center gap-1 text-[11px] text-slate-400 cursor-not-allowed" aria-label="Demo invoice has no receipt">
                      <Download className="w-3.5 h-3.5" /> PDF unavailable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
