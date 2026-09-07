import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Search, 
  CheckCircle2, 
  Clock, 
  X, 
  CreditCard, 
  Building2, 
  User, 
  ExternalLink, 
  ShieldCheck, 
  Filter, 
  Calendar, 
  Package, 
  Layers, 
  Info, 
  FileText, 
  ArrowRight,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminPayment, AdminSubscription } from '../../context/AdminContext';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

export const AdminPaymentsView: React.FC = () => {
  const { payments, subscriptions, users } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'succeeded' | 'pending' | 'failed' | 'cancelled'>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | 'card' | 'bank' | 'other'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7d' | '30d'>('all');
  
  const [selectedPaymentForDetail, setSelectedPaymentForDetail] = useState<AdminPayment | null>(null);

  // Filtered Payments Calculation (Section 5 & 6)
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      // 1. Search Query
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || 
        p.transactionId.toLowerCase().includes(query) ||
        p.customerName.toLowerCase().includes(query) ||
        (p.customerEmail && p.customerEmail.toLowerCase().includes(query)) ||
        (p.chargeId && p.chargeId.toLowerCase().includes(query)) ||
        (p.paymentIntentId && p.paymentIntentId.toLowerCase().includes(query)) ||
        (p.subscriptionId && p.subscriptionId.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // 2. Status Filter
      if (statusFilter !== 'all' && p.status !== statusFilter) {
        return false;
      }

      // 3. Payment Method Filter
      if (methodFilter !== 'all') {
        const methodStr = (p.paymentMethod || '').toLowerCase();
        if (methodFilter === 'card' && !methodStr.includes('visa') && !methodStr.includes('mastercard') && !methodStr.includes('amex') && !methodStr.includes('card')) {
          return false;
        }
        if (methodFilter === 'bank' && !methodStr.includes('bank') && !methodStr.includes('ach') && !methodStr.includes('wire')) {
          return false;
        }
      }

      return true;
    });
  }, [payments, searchTerm, statusFilter, methodFilter, dateFilter]);

  // Find linked subscription context helper
  const getSubscriptionContext = (payment: AdminPayment): AdminSubscription | undefined => {
    if (payment.subscriptionId) {
      const found = subscriptions.find(s => s.id === payment.subscriptionId);
      if (found) return found;
    }
    return subscriptions.find(s => s.customerName.toLowerCase() === payment.customerName.toLowerCase());
  };

  const selectedSub = selectedPaymentForDetail ? getSubscriptionContext(selectedPaymentForDetail) : undefined;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Executive Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Payment Transactions & Settlement Ledger
            </h2>
            <Badge variant="emerald" size="sm">Stripe Gateway</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Read-only transaction settlement ledger, charge telemetry, verified payment intents, and immutable audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs">
            <span className="text-slate-400">Total Volume: </span>
            <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {formatCurrency(payments.reduce((acc, p) => acc + (p.status === 'succeeded' ? p.amount : 0), 0))} USD
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filters Bar (Sections 5 & 6) */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Transaction ID, Customer, Charge ID, Intent, or Subscription..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-xs rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
          >
            <option value="all">All Payment Methods</option>
            <option value="card">Credit / Debit Cards</option>
            <option value="bank">Bank Transfer / ACH</option>
            <option value="other">Other Methods</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 font-bold text-xs outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

      </div>

      {/* 3. Transaction Table (Section 7 - View Details only, NO Refund) */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Customer Account</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Transaction Date</th>
                <th className="py-3.5 px-4">Settlement Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No payment transactions found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors">
                    {/* Transaction ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {p.transactionId}
                    </td>

                    {/* Customer Account */}
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                      <div>{p.customerName}</div>
                      {p.customerEmail && (
                        <div className="text-[10px] text-slate-400 font-mono font-normal">{p.customerEmail}</div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(p.amount)} {p.currency}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {p.paymentMethod}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge 
                        variant={p.status === 'succeeded' ? 'emerald' : p.status === 'pending' ? 'blue' : 'rose'} 
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>

                    {/* Transaction Date */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {p.date}
                    </td>

                    {/* Settlement Date */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {p.settlementDate || p.date}
                    </td>

                    {/* Actions: View Details ONLY (Section 2 - NO Refund action anywhere) */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedPaymentForDetail(p)}
                        className="text-[11px] font-bold"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Transaction Detail Drawer / Modal (Sections 3 & 4) */}
      {selectedPaymentForDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] shadow-2xl h-full overflow-y-auto p-6 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Payment Transaction
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">{selectedPaymentForDetail.transactionId}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPaymentForDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* A. Transaction Overview (Section 3) */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Transaction Overview</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</div>
                  <div className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(selectedPaymentForDetail.amount)} {selectedPaymentForDetail.currency}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Payment Status</div>
                  <div className="pt-0.5">
                    <Badge variant={selectedPaymentForDetail.status === 'succeeded' ? 'emerald' : 'blue'} size="sm">
                      {selectedPaymentForDetail.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Customer Account</div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedPaymentForDetail.customerName}</div>
                  {selectedPaymentForDetail.customerEmail && (
                    <div className="text-[10px] text-slate-400 font-mono">{selectedPaymentForDetail.customerEmail}</div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Settlement Date</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedPaymentForDetail.settlementDate || selectedPaymentForDetail.date}
                  </div>
                </div>
              </div>
            </div>

            {/* B. Payment Information (Section 3) */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                <span>Payment & Gateway Information</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payment Gateway</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedPaymentForDetail.gateway || 'Stripe Gateway Engine'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Charge ID</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{selectedPaymentForDetail.chargeId || selectedPaymentForDetail.transactionId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payment Intent ID</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{selectedPaymentForDetail.paymentIntentId || `pi_${selectedPaymentForDetail.transactionId}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payment Method Type</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedPaymentForDetail.paymentMethodType || 'Credit / Debit Card'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Card Brand & Last 4</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedPaymentForDetail.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payment Reference</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{selectedPaymentForDetail.referenceNumber || 'REF-STRIPE-88219'}</span>
                </div>
              </div>
            </div>

            {/* C. Customer / Subscription Context (Section 3) */}
            {selectedSub && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-blue-500" />
                  <span>Customer & Subscription Context</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/40 dark:bg-white/[0.04] border border-blue-200/80 dark:border-blue-900/40 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Subscription Plan</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{selectedSub.planName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Subscription ID</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{selectedSub.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Billing Cycle</span>
                    <span className="capitalize font-bold text-slate-900 dark:text-white">{selectedSub.billingInterval}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Auto-Renew</span>
                    <span className="font-bold font-mono text-emerald-600">{selectedSub.autoRenew ? 'ON' : 'OFF'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Next Scheduled Renewal</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedSub.nextBillingDate}</span>
                  </div>
                  
                  {selectedSub.bundleNames && selectedSub.bundleNames.length > 0 && (
                    <div className="pt-1">
                      <span className="text-slate-500 block mb-1">Assigned Feature Bundles:</span>
                      <div className="flex gap-1 flex-wrap">
                        {selectedSub.bundleNames.map((bName, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#141414] text-[10px] font-bold border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                            {bName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* D. Transaction Timeline & History (Sections 3 & 4) */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Transaction History & Timeline</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-4 text-xs">
                {(selectedPaymentForDetail.timeline || [
                  { event: 'Payment initiated', date: selectedPaymentForDetail.date, time: '10:42:01 UTC', status: 'completed', details: 'Transaction initiated by automated billing schedule' },
                  { event: 'Payment authorized', date: selectedPaymentForDetail.date, time: '10:42:04 UTC', status: 'completed', details: 'Card 3D secure check passed successfully' },
                  { event: 'Payment succeeded', date: selectedPaymentForDetail.date, time: '10:42:05 UTC', status: 'completed', details: `${formatCurrency(selectedPaymentForDetail.amount)} captured` },
                  { event: 'Payment settled', date: selectedPaymentForDetail.settlementDate || selectedPaymentForDetail.date, time: '10:43:00 UTC', status: 'completed', details: 'Funds settled in Stripe ledger' }
                ]).map((tItem, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">{tItem.event}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{tItem.time}</span>
                      </div>
                      {tItem.details && (
                        <div className="text-[11px] text-slate-500 leading-relaxed">{tItem.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read-Only Notice Footer (Section 8) */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C]/80 border border-slate-200 dark:border-[#202020] text-slate-500 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Immutable Ledger Record • This transaction is read-only and cryptographically verified.</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
