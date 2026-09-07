import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  X, 
  Coins, 
  Mail, 
  PhoneCall, 
  Search, 
  Linkedin, 
  Sparkles,
  Bot,
  Workflow
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminPlan } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminPlansView: React.FC = () => {
  const { plans, addPlan, updatePlan, deletePlan } = useAdmin();

  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<AdminPlan | null>(null);

  // Form State
  const [planName, setPlanName] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('299');
  const [annualPrice, setAnnualPrice] = useState('249');
  const [trialDays, setTrialDays] = useState('14');
  const [creditsMonthly, setCreditsMonthly] = useState('50000');
  const [userLimit, setUserLimit] = useState('10');
  const [emailLimit, setEmailLimit] = useState('75000');
  const [callLimit, setCallLimit] = useState('2500');
  const [leadLimit, setLeadLimit] = useState('25000');
  const [linkedInLimit, setLinkedInLimit] = useState('15000');
  const [aiTokensLimit, setAiTokensLimit] = useState('15000000');
  const [mailboxLimit, setMailboxLimit] = useState('25');
  const [voiceAgentLimit, setVoiceAgentLimit] = useState('5');
  const [workflowLimit, setWorkflowLimit] = useState('20');

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName.trim()) return;

    addPlan({
      name: planName.trim(),
      description: planDesc.trim(),
      monthlyPrice: parseFloat(monthlyPrice) || 99,
      annualPrice: parseFloat(annualPrice) || 79,
      trialDays: parseInt(trialDays) || 14,
      creditsMonthly: parseInt(creditsMonthly) || 25000,
      userLimit: parseInt(userLimit) || 5,
      emailLimitMonthly: parseInt(emailLimit) || 50000,
      callLimitMonthly: parseInt(callLimit) || 1000,
      leadFinderLimitMonthly: parseInt(leadLimit) || 10000,
      linkedInLimitMonthly: parseInt(linkedInLimit) || 5000,
      aiUsageLimitMonthly: parseInt(aiTokensLimit) || 5000000,
      mailboxLimit: parseInt(mailboxLimit) || 10,
      voiceAgentLimit: parseInt(voiceAgentLimit) || 2,
      workflowLimit: parseInt(workflowLimit) || 10,
      status: 'active',
    });

    setPlanName('');
    setPlanDesc('');
    setIsAddPlanOpen(false);
  };

  const handleDuplicatePlan = (p: AdminPlan) => {
    addPlan({
      ...p,
      name: `${p.name} (Copy)`,
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Subscription Plans & Limit Envelopes
            </h2>
            <Badge variant="emerald" size="sm">{plans.length} Active Plans</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Define commercial pricing tiers, monthly credit allocations, and strict quota envelopes across all platform engines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddPlanOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Pricing Plan
        </Button>
      </div>

      {/* 2. Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-3xl bg-white dark:bg-[#161616] border shadow-xs space-y-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all text-xs ${
              plan.isPopular ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200/80 dark:border-[#2A2A2A]'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {plan.description}
                  </p>
                </div>
                {plan.isPopular && (
                  <Badge variant="primary" size="sm">Most Popular</Badge>
                )}
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-center space-y-0.5">
                <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
                  ${plan.monthlyPrice}
                  <span className="text-xs text-slate-400 font-sans font-normal"> /mo</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  ${plan.annualPrice}/mo billed annually • {plan.trialDays}d trial
                </div>
              </div>

              {/* Limit Envelope Metrics */}
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Monthly Credits</span>
                  </span>
                  <strong className="font-mono text-slate-900 dark:text-white">{plan.creditsMonthly.toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Monthly Emails</span>
                  </span>
                  <strong className="font-mono text-slate-900 dark:text-white">{plan.emailLimitMonthly.toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Search className="w-3.5 h-3.5 text-primary" />
                    <span>Lead Searches</span>
                  </span>
                  <strong className="font-mono text-slate-900 dark:text-white">{plan.leadFinderLimitMonthly.toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <PhoneCall className="w-3.5 h-3.5 text-primary" />
                    <span>Voice SDR Agents</span>
                  </span>
                  <strong className="font-mono text-slate-900 dark:text-white">{plan.voiceAgentLimit} agents</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>AI Tokens / mo</span>
                  </span>
                  <strong className="font-mono text-slate-900 dark:text-white">{(plan.aiUsageLimitMonthly / 1000000).toFixed(0)}M tokens</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#202020]">
              <span className="text-[10px] text-slate-400 font-mono">Max Seats: {plan.userLimit}</span>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDuplicatePlan(plan)}
                  title="Duplicate Plan"
                  className="p-1.5 h-7 w-7 text-slate-500"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPlanToDelete(plan)}
                  title="Archive Plan"
                  className="p-1.5 h-7 w-7 text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 3. Add Plan Modal */}
      {isAddPlanOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddPlanOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Subscription Pricing Plan
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddPlanOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Elite"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <input
                  type="text"
                  placeholder="Target audience and feature summary..."
                  value={planDesc}
                  onChange={(e) => setPlanDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly ($)</label>
                  <input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Annual ($/mo)</label>
                  <input
                    type="number"
                    value={annualPrice}
                    onChange={(e) => setAnnualPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Trial (Days)</label>
                  <input
                    type="number"
                    value={trialDays}
                    onChange={(e) => setTrialDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Credits</label>
                  <input
                    type="number"
                    value={creditsMonthly}
                    onChange={(e) => setCreditsMonthly(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Max User Seats</label>
                  <input
                    type="number"
                    value={userLimit}
                    onChange={(e) => setUserLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Email Limit</label>
                  <input
                    type="number"
                    value={emailLimit}
                    onChange={(e) => setEmailLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Lead Searches Limit</label>
                  <input
                    type="number"
                    value={leadLimit}
                    onChange={(e) => setLeadLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddPlanOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Create Plan</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Plan Confirmation */}
      {planToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(planToDelete)}
          onClose={() => setPlanToDelete(null)}
          onConfirm={() => {
            if (planToDelete) deletePlan(planToDelete.id);
            setPlanToDelete(null);
          }}
          title={`Archive Plan: ${planToDelete.name}`}
          description={`Are you sure you want to archive ${planToDelete.name}? Existing subscriptions on this plan will remain active until renewal.`}
          confirmText="Archive Plan"
          variant="danger"
        />
      )}

    </div>
  );
};
