import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  Check, 
  Calendar, 
  FileText,
  X,
  Plus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const SettingsBillingView: React.FC = () => {
  const { success, info } = useToast();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Invoices list
  const invoices = [
    { id: 'INV-2026-08', date: 'Aug 01, 2026', amount: '$499.00', status: 'Paid', plan: 'Enterprise Growth Tier (Monthly)', pdfUrl: '#' },
    { id: 'INV-2026-07', date: 'Jul 01, 2026', amount: '$499.00', status: 'Paid', plan: 'Enterprise Growth Tier (Monthly)', pdfUrl: '#' },
    { id: 'INV-2026-06', date: 'Jun 01, 2026', amount: '$499.00', status: 'Paid', plan: 'Enterprise Growth Tier (Monthly)', pdfUrl: '#' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Platform Plan, Credit Balances & Invoices
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Manage your enterprise subscription tier, search credits top-up, payment methods, and historical VAT receipts.
        </p>
      </div>

      {/* 2. Active Plan Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 font-mono">
              Current Plan Tier
            </span>
            <Badge variant="emerald" size="sm">Active Enterprise</Badge>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Enterprise Growth Tier
          </div>

          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            Includes unlimited AI email sequences, 10 team seats, 24 multi-inbox rotations, and dedicated 4G residential LinkedIn proxies.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono pt-1 text-slate-500">
            <span>Price: <strong className="text-slate-900 dark:text-white">$499 / month</strong></span>
            <span>•</span>
            <span>Next Renewal: <strong className="text-slate-900 dark:text-white">September 1, 2026</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => info('Contacting dedicated account executive for custom annual expansion.', 'Enterprise Support')}
          >
            Change Plan
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsTopupModalOpen(true)}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Top Up Credits
          </Button>
        </div>
      </div>

      {/* 3. Credits Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Search Credits */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase">
              B2B Search Credits
            </span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
              1,840 / 2,500
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '73.6%' }} />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            660 credits used this billing cycle. Renews automatically on Sep 1.
          </p>
        </div>

        {/* Verification Credits */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase">
              Email Verifications
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
              Unlimited Pass
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Real-time SMTP ping, Catch-All detection & MX verification included.
          </p>
        </div>

        {/* AI Tokens */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase">
              AI Generation Tokens
            </span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
              1.42M / 2.0M
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '71%' }} />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Claude 3.5 Sonnet & GPT-4o autonomous reasoning tokens.
          </p>
        </div>

      </div>

      {/* 4. Payment Method Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Primary Payment Method
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Update Payment Card
          </Button>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/40 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black">
              VISA
            </div>
            <div>
              <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                Visa Business ending in 4242
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Expires 12/2028 • Default Payment Method for CloudScale AI
              </div>
            </div>
          </div>

          <Badge variant="emerald" size="sm">Primary</Badge>
        </div>
      </div>

      {/* 5. Invoices & Billing History */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Billing History & VAT Invoices
        </h3>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Plan / Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right font-sans">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{inv.id}</td>
                  <td className="py-3 px-4 text-slate-500">{inv.date}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 dark:text-slate-300">{inv.plan}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                  <td className="py-3 px-4">
                    <Badge variant="emerald" size="sm">{inv.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => success(`Downloading PDF invoice ${inv.id}`, 'PDF Downloaded')}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Up Credits Modal */}
      {isTopupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-emerald-500">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Top Up Search Credits</h3>
              </div>
              <button onClick={() => setIsTopupModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-500">
              Select an instant credit refill pack charged to Visa ending in 4242:
            </p>

            <div className="space-y-2">
              {[
                { amount: '1,000 Credits', price: '$49', popular: false },
                { amount: '2,500 Credits', price: '$99', popular: true },
                { amount: '10,000 Credits', price: '$299', popular: false },
              ].map((pack, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    success(`Added ${pack.amount} to your balance.`, 'Credits Added');
                    setIsTopupModalOpen(false);
                  }}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    pack.popular
                      ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="font-black text-slate-900 dark:text-white">{pack.amount}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{pack.price} one-time charge</div>
                  </div>
                  {pack.popular && <Badge variant="emerald" size="sm">Most Popular</Badge>}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setIsTopupModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Update Payment Card</h3>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 •••• •••• 4242"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Expiration</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">CVC / CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  success('Payment card details updated in Stripe Vault.', 'Card Updated');
                }}
              >
                Save Payment Method
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
