import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  X, 
  Calendar, 
  DollarSign, 
  Package, 
  User, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  Clock, 
  RefreshCw, 
  Layers, 
  ArrowRight, 
  Coins, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Edit2,
  Trash2,
  Play,
  Pause,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminSubscription, AdminPlan, AdminBundle } from '../../context/AdminContext';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

export const AdminSubscriptionsView: React.FC = () => {
  const { 
    subscriptions, 
    users, 
    teams, 
    plans, 
    bundles, 
    createSubscriptionManually, 
    setAutoRenew, 
    renewSubscriptionNow, 
    changeSubscriptionPlan, 
    updateSubscriptionBundles, 
    suspendSubscription, 
    resumeSubscription, 
    terminateSubscription,
    addCreditsToUser
  } = useAdmin();

  // Modals & Drawers State
  const [selectedSubForDetail, setSelectedSubForDetail] = useState<AdminSubscription | null>(null);
  const [subForAutoRenewModal, setSubForAutoRenewModal] = useState<AdminSubscription | null>(null);
  const [autoRenewTargetState, setAutoRenewTargetState] = useState<boolean>(false);
  
  const [isManualAssignOpen, setIsManualAssignOpen] = useState(false);
  const [manualAssignStep, setManualAssignStep] = useState(1);

  const [subForPlanChange, setSubForPlanChange] = useState<AdminSubscription | null>(null);
  const [newPlanId, setNewPlanId] = useState('');
  const [planChangeTiming, setPlanChangeTiming] = useState<'immediate' | 'next_renewal'>('immediate');

  const [subForBundleManage, setSubForBundleManage] = useState<AdminSubscription | null>(null);
  const [selectedBundlesForSub, setSelectedBundlesForSub] = useState<string[]>([]);

  const [subForCreditsModal, setSubForCreditsModal] = useState<AdminSubscription | null>(null);
  const [creditsToAdd, setCreditsToAdd] = useState('25000');

  const [subToTerminate, setSubToTerminate] = useState<AdminSubscription | null>(null);
  const [terminationReason, setTerminationReason] = useState('Customer requested termination');

  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Manual Assign Multi-Step Form State
  const [assignTargetType, setAssignTargetType] = useState<'user' | 'team'>('user');
  const [assignTargetId, setAssignTargetId] = useState(users[0]?.id || '');
  const [assignPlanId, setAssignPlanId] = useState(plans[1]?.id || 'plan-growth');
  const [assignBillingCycle, setAssignBillingCycle] = useState<'monthly' | 'annual' | 'custom'>('monthly');
  const [assignBundleIds, setAssignBundleIds] = useState<string[]>(['bnd-email', 'bnd-leadgen']);
  const [assignCredits, setAssignCredits] = useState('50000');
  const [assignStartDate, setAssignStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignRenewalDate, setAssignRenewalDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split('T')[0];
  });
  const [assignAutoRenew, setAssignAutoRenew] = useState(true);

  // Status Badge Helper
  const getStatusBadge = (sub: AdminSubscription) => {
    if (sub.status === 'cancelled') {
      return <Badge variant="slate" size="sm">Cancelled</Badge>;
    }
    if (sub.status === 'suspended') {
      return <Badge variant="amber" size="sm">Suspended</Badge>;
    }
    if (sub.status === 'payment_failed') {
      return <Badge variant="rose" size="sm">Payment Failed</Badge>;
    }
    if (sub.status === 'past_due') {
      return <Badge variant="amber" size="sm">Past Due</Badge>;
    }
    if (sub.status === 'trial') {
      return <Badge variant="blue" size="sm">Trial</Badge>;
    }
    if (!sub.autoRenew || sub.status === 'auto_renew_off' || sub.status === 'scheduled_to_expire') {
      return <Badge variant="amber" size="sm">Auto-Renew Off</Badge>;
    }
    return <Badge variant="emerald" size="sm">Active</Badge>;
  };

  // Auto-Renew Toggle Click Handler
  const handleToggleAutoRenewClick = (sub: AdminSubscription) => {
    setSubForAutoRenewModal(sub);
    setAutoRenewTargetState(!sub.autoRenew);
  };

  // Confirm Auto-Renew Change
  const handleConfirmAutoRenewChange = () => {
    if (!subForAutoRenewModal) return;
    setAutoRenew(subForAutoRenewModal.id, autoRenewTargetState);
    setSubForAutoRenewModal(null);
  };

  // Handle Manual Assignment Submission
  const handleCompleteManualAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const targetObj = assignTargetType === 'user' 
      ? users.find(u => u.id === assignTargetId) || users[0]
      : teams.find(t => t.id === assignTargetId) || teams[0];

    createSubscriptionManually({
      customerId: targetObj.id,
      customerName: (targetObj as any).name || 'Enterprise Customer',
      customerEmail: (targetObj as any).email || 'billing@customer.com',
      planId: assignPlanId,
      bundleIds: assignBundleIds,
      credits: parseInt(assignCredits) || 50000,
      billingInterval: assignBillingCycle,
      autoRenew: assignAutoRenew,
      startDate: assignStartDate,
      nextBillingDate: assignRenewalDate,
    });

    setIsManualAssignOpen(false);
    setManualAssignStep(1);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Customer Subscriptions & Contracts
            </h2>
            <Badge variant="emerald" size="sm">
              {subscriptions.filter(s => s.status === 'active' || s.status === 'trial').length} Active Accounts
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Monitor recurring subscription billings, configure automatic renewals, manage add-on bundles, and override customer lifecycle states.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setIsManualAssignOpen(true);
              setManualAssignStep(1);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            + Assign Plan Manually
          </Button>
        </div>
      </div>

      {/* 2. Subscriptions Table (Section 14) */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Subscriber</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Attached Bundles</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Auto-Renew</th>
                <th className="py-3.5 px-4">Next Renewal</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {subscriptions.map((sub) => {
                const isAutoRenewOn = sub.autoRenew && sub.status !== 'cancelled' && sub.status !== 'suspended';

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors">
                    {/* Subscriber */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                          {sub.customerName.charAt(0)}
                        </div>
                        <div>
                          <div 
                            onClick={() => setSelectedSubForDetail(sub)}
                            className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                          >
                            {sub.customerName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{sub.customerEmail}</div>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {sub.planName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono capitalize">
                        {sub.billingInterval} billing
                      </div>
                    </td>

                    {/* Bundles */}
                    <td className="py-3.5 px-4">
                      <div className="flex gap-1 flex-wrap max-w-xs">
                        {sub.bundleNames.map((bName, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#202020]"
                          >
                            {bName}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(sub.amount)}/{sub.billingInterval === 'annual' ? 'yr' : 'mo'}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(sub)}
                    </td>

                    {/* Auto-Renew Compact Toggle (Section 1) */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.status !== 'cancelled' ? (
                        <button
                          type="button"
                          onClick={() => handleToggleAutoRenewClick(sub)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-extrabold transition-all cursor-pointer select-none border ${
                            isAutoRenewOn
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/60 hover:bg-emerald-100'
                              : 'bg-slate-100 dark:bg-[#181818] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-[#2A2A2A] hover:bg-slate-200'
                          }`}
                          title={`Click to ${isAutoRenewOn ? 'Turn Off' : 'Turn On'} Automatic Renewal`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isAutoRenewOn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                          <span>{isAutoRenewOn ? 'ON' : 'OFF'}</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 font-mono text-[10px]">—</span>
                      )}
                    </td>

                    {/* Next Renewal */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {sub.nextBillingDate}
                    </td>

                    {/* Actions Menu (Three-dot menu - Section 6) */}
                    <td className="py-3.5 px-4 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setOpenActionMenuId(openActionMenuId === sub.id ? null : sub.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1C1C1C] transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {openActionMenuId === sub.id && (
                          <div 
                            className="absolute right-0 mt-1 w-56 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl z-50 py-1.5 text-xs text-left"
                            onMouseLeave={() => setOpenActionMenuId(null)}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSubForDetail(sub);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                              <span>View Subscription Detail</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSubForPlanChange(sub);
                                setNewPlanId(sub.planId);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                              <span>Change Plan</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSubForBundleManage(sub);
                                setSelectedBundlesForSub(sub.bundleIds || ['bnd-email', 'bnd-leadgen']);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                            >
                              <Package className="w-3.5 h-3.5 text-slate-400" />
                              <span>Manage Bundles</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSubForCreditsModal(sub);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                            >
                              <Coins className="w-3.5 h-3.5 text-amber-500" />
                              <span>Add Credits</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                renewSubscriptionNow(sub.id);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Renew Now (Override)</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                handleToggleAutoRenewClick(sub);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
                              <span>Turn Auto-Renew {sub.autoRenew ? 'Off' : 'On'}</span>
                            </button>

                            {sub.status === 'active' ? (
                              <button
                                type="button"
                                onClick={() => {
                                  suspendSubscription(sub.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-2"
                              >
                                <Pause className="w-3.5 h-3.5" />
                                <span>Suspend Subscription</span>
                              </button>
                            ) : sub.status === 'suspended' ? (
                              <button
                                type="button"
                                onClick={() => {
                                  resumeSubscription(sub.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/[0.04] text-emerald-600 font-medium flex items-center gap-2"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>Resume Subscription</span>
                              </button>
                            ) : null}

                            <div className="border-t border-slate-100 dark:border-[#202020] my-1" />

                            <button
                              type="button"
                              onClick={() => {
                                setSubToTerminate(sub);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Terminate Subscription</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Auto-Renew Confirmation Modal (Sections 3 & 4) */}
      {subForAutoRenewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  autoRenewTargetState ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950 text-amber-600'
                }`}>
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h3 className="font-black text-lg text-slate-950 dark:text-white">
                  {autoRenewTargetState ? 'Turn Auto-Renew Back On?' : 'Turn Off Auto-Renew?'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSubForAutoRenewModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">{subForAutoRenewModal.customerName}</div>
                <div className="text-[11px] text-slate-400">{subForAutoRenewModal.planName} ({formatCurrency(subForAutoRenewModal.amount)}/mo)</div>
              </div>

              {autoRenewTargetState ? (
                <p className="leading-relaxed">
                  The subscription will continue renewing automatically on the next renewal date ({subForAutoRenewModal.nextBillingDate}). Customer retains full access to all attached bundles and features.
                </p>
              ) : (
                <p className="leading-relaxed">
                  This subscription will remain active until <strong className="text-slate-900 dark:text-white">{subForAutoRenewModal.nextBillingDate}</strong>. After that date, it will expire instead of renewing automatically.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSubForAutoRenewModal(null)}
              >
                {autoRenewTargetState ? 'Keep Off' : 'Keep Auto-Renew'}
              </Button>
              <Button
                variant={autoRenewTargetState ? 'primary' : 'danger'}
                size="sm"
                onClick={handleConfirmAutoRenewChange}
              >
                {autoRenewTargetState ? 'Enable Auto-Renew' : 'Turn Off Auto-Renew'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Multi-Step Manual Subscription Assignment Modal (Section 7) */}
      {isManualAssignOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div>
                <h3 className="font-black text-lg text-slate-950 dark:text-white">
                  Assign Subscription Manually
                </h3>
                <p className="text-xs text-slate-400">Step {manualAssignStep} of 3 • Custom plan & bundle provisioning</p>
              </div>
              <button
                type="button"
                onClick={() => setIsManualAssignOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCompleteManualAssign} className="space-y-4 text-xs">
              {manualAssignStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Target Account</label>
                    <select
                      value={assignTargetId}
                      onChange={(e) => setAssignTargetId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-bold"
                    >
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Base Plan</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {plans.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setAssignPlanId(p.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            assignPlanId === p.id
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-900 dark:text-blue-100 font-bold'
                              : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{p.name}</span>
                            <span className="font-mono text-blue-600 font-extrabold">${p.monthlyPrice}/mo</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Billing Cycle</label>
                    <div className="flex items-center gap-2">
                      {(['monthly', 'annual', 'custom'] as const).map((cycle) => (
                        <button
                          key={cycle}
                          type="button"
                          onClick={() => setAssignBillingCycle(cycle)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                            assignBillingCycle === cycle
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {cycle}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {manualAssignStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2">Attach Add-On Bundles</label>
                    <div className="space-y-2">
                      {bundles.map((b) => {
                        const isChecked = assignBundleIds.includes(b.id);
                        return (
                          <div
                            key={b.id}
                            onClick={() => {
                              setAssignBundleIds(prev => 
                                prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                              );
                            }}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              isChecked
                                ? 'border-blue-600 bg-blue-50/40 dark:bg-white/[0.04]'
                                : 'border-slate-200 dark:border-[#202020]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="rounded text-blue-600"
                              />
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">{b.name}</div>
                                <div className="text-[10px] text-slate-400">{b.description}</div>
                              </div>
                            </div>
                            <span className="font-mono font-bold text-blue-600">+${b.monthlyAddonPrice}/mo</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Monthly Credits Allocation</label>
                    <input
                      type="number"
                      value={assignCredits}
                      onChange={(e) => setAssignCredits(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {manualAssignStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={assignStartDate}
                        onChange={(e) => setAssignStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Next Renewal Date</label>
                      <input
                        type="date"
                        value={assignRenewalDate}
                        onChange={(e) => setAssignRenewalDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Enable Auto-Renewal</div>
                      <div className="text-[10px] text-slate-400">Automatically renew subscription at period end</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAssignAutoRenew(!assignAutoRenew)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        assignAutoRenew ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {assignAutoRenew ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase text-blue-600 font-mono">Provisioning Review</div>
                    <div className="text-slate-900 dark:text-white font-bold">
                      {plans.find(p => p.id === assignPlanId)?.name} ({assignBillingCycle}) + {assignBundleIds.length} Add-on Bundles
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Credits: {parseInt(assignCredits || '0').toLocaleString()} • Auto-Renew: {assignAutoRenew ? 'ON' : 'OFF'}
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#202020]">
                {manualAssignStep > 1 ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setManualAssignStep(s => s - 1)}
                  >
                    Back
                  </Button>
                ) : <div />}

                {manualAssignStep < 3 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={() => setManualAssignStep(s => s + 1)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                  >
                    Assign Subscription
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Subscription Detail Drawer (Section 8) */}
      {selectedSubForDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] shadow-2xl h-full overflow-y-auto p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-extrabold flex items-center justify-center text-lg">
                  {selectedSubForDetail.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedSubForDetail.customerName}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">{selectedSubForDetail.customerEmail}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubForDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview Attributes Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Current Plan</div>
                <div className="font-bold text-blue-600 dark:text-blue-400">{selectedSubForDetail.planName}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Billing Cycle</div>
                <div className="font-bold text-slate-900 dark:text-white capitalize font-mono">
                  {formatCurrency(selectedSubForDetail.amount)}/{selectedSubForDetail.billingInterval === 'annual' ? 'yr' : 'mo'}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Auto-Renew Status</div>
                <div className="font-bold font-mono">
                  {selectedSubForDetail.autoRenew ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>ON (Automatic)</span>
                    </span>
                  ) : (
                    <span className="text-amber-500">OFF (Expires at period end)</span>
                  )}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Next Renewal Date</div>
                <div className="font-bold text-slate-900 dark:text-white font-mono">{selectedSubForDetail.nextBillingDate}</div>
              </div>
            </div>

            {/* Attached Bundles (Section 10) */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Attached Solution Bundles ({selectedSubForDetail.bundleNames.length})</span>
                <button
                  type="button"
                  onClick={() => {
                    setSubForBundleManage(selectedSubForDetail);
                    setSelectedBundlesForSub(selectedSubForDetail.bundleIds || ['bnd-email', 'bnd-leadgen']);
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Manage Bundles
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {selectedSubForDetail.bundleNames.map((bName, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-slate-900 dark:text-white">{bName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#202020]">
              <div className="font-bold text-slate-900 dark:text-white text-xs">Administrative Actions</div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubForPlanChange(selectedSubForDetail);
                    setNewPlanId(selectedSubForDetail.planId);
                  }}
                >
                  Change Plan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => renewSubscriptionNow(selectedSubForDetail.id)}
                >
                  Renew Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. Plan Change Modal (Section 9) */}
      {subForPlanChange && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Change Subscription Plan</h3>
              <button
                type="button"
                onClick={() => setSubForPlanChange(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Select New Plan</label>
                <select
                  value={newPlanId}
                  onChange={(e) => setNewPlanId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.monthlyPrice}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Effective Timing</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlanChangeTiming('immediate')}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      planChangeTiming === 'immediate'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                        : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Immediate Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanChangeTiming('next_renewal')}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      planChangeTiming === 'next_renewal'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                        : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    At Next Renewal
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setSubForPlanChange(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    changeSubscriptionPlan(subForPlanChange.id, newPlanId, planChangeTiming);
                    setSubForPlanChange(null);
                  }}
                >
                  Confirm Plan Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Manage Bundles Modal (Section 10) */}
      {subForBundleManage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Manage Add-On Bundles</h3>
              <button
                type="button"
                onClick={() => setSubForBundleManage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {bundles.map((b) => {
                const isChecked = selectedBundlesForSub.includes(b.id);
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      setSelectedBundlesForSub(prev => 
                        prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                      );
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-white/[0.04]'
                        : 'border-slate-200 dark:border-[#202020]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-blue-600"
                      />
                      <span className="font-bold text-slate-900 dark:text-white">{b.name}</span>
                    </div>
                    <span className="font-mono text-blue-600 font-bold">+${b.monthlyAddonPrice}/mo</span>
                  </div>
                );
              })}

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button variant="secondary" size="sm" onClick={() => setSubForBundleManage(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    updateSubscriptionBundles(subForBundleManage.id, selectedBundlesForSub);
                    setSubForBundleManage(null);
                  }}
                >
                  Save Bundles
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Add Credits Modal */}
      {subForCreditsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Grant Account Credits</h3>
              <button
                type="button"
                onClick={() => setSubForCreditsModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Credits Amount</label>
                <input
                  type="number"
                  value={creditsToAdd}
                  onChange={(e) => setCreditsToAdd(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setSubForCreditsModal(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    addCreditsToUser(subForCreditsModal.customerId, parseInt(creditsToAdd) || 25000);
                    setSubForCreditsModal(null);
                  }}
                >
                  Grant Credits
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Destructive Terminate Subscription Modal */}
      {subToTerminate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-rose-200 dark:border-rose-900/50 rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-black text-lg text-slate-950 dark:text-white">Terminate Subscription</h3>
              </div>
              <button
                type="button"
                onClick={() => setSubToTerminate(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                Are you sure you want to permanently terminate the subscription for <strong className="text-slate-900 dark:text-white">{subToTerminate.customerName}</strong>?
              </p>
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 font-medium">
                This is a destructive administrative action that immediately revokes plan access and disables all recurring billing cycles.
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Termination Reason</label>
                <input
                  type="text"
                  value={terminationReason}
                  onChange={(e) => setTerminationReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSubToTerminate(null)}>
                Keep Active
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  terminateSubscription(subToTerminate.id, terminationReason);
                  setSubToTerminate(null);
                }}
              >
                Confirm Termination
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
