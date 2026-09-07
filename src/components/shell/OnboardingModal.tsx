import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Building2, 
  Target, 
  Mail, 
  Users, 
  ShieldCheck,
  Zap 
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboarding, completeOnboarding, currentWorkspace } = useAuth();
  const { success } = useToast();

  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace?.name || 'My Revenue Workspace');
  const [targetRole, setTargetRole] = useState('VP of Sales / CRO');
  const [industry, setIndustry] = useState('B2B SaaS / Enterprise Tech');
  const [inboxProvider, setInboxProvider] = useState<'google' | 'microsoft'>('google');

  if (!isOnboardingOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding({ workspaceName, targetRole, industry });
      success('Workspace configured successfully! Welcome to Outtricks.', 'Ready to Scale');
    }
  };

  return (
    <Modal
      isOpen={isOnboardingOpen}
      onClose={closeOnboarding}
      title="Welcome to Outtricks"
      description="Let's configure your AI revenue operating system in 3 quick steps."
      size="md"
      showCloseButton={false}
      closeOnBackdrop={false}
    >
      <div className="space-y-6 font-sans">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020]">
          {[
            { num: 1, label: 'Workspace' },
            { num: 2, label: 'Target ICP' },
            { num: 3, label: 'Outreach Channels' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-primary text-white shadow-xs'
                  : step > s.num
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {step > s.num ? '✓' : s.num}
              </span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: WORKSPACE NAME */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Name your Revenue Workspace
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can create additional client or team workspaces at any time.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Acme Hyper-Growth"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* STEP 2: TARGET ICP */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Define your Ideal Customer Profile (ICP)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Outtricks AI will pre-populate your lead filters and spintax variables.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. B2B SaaS, FinTech, Cybersecurity"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Job Titles
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. VP Sales, Head of Revenue, CMO"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: OUTREACH CHANNELS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Select Sending Mailbox Provider
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Outtricks automatically synchronizes multi-inbox rotation, Voice AI SDR, and LinkedIn.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInboxProvider('google')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  inboxProvider === 'google'
                    ? 'border-primary bg-primary/10 dark:bg-white/[0.04]'
                    : 'border-slate-200 dark:border-[#2A2A2A]'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Google Workspace
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  OAuth multi-inbox rotation & warmup
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInboxProvider('microsoft')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  inboxProvider === 'microsoft'
                    ? 'border-primary bg-primary/10 dark:bg-white/[0.04]'
                    : 'border-slate-200 dark:border-[#2A2A2A]'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Microsoft 365
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Exchange SMTP & high-volume pools
                </div>
              </button>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>10,000 complimentary verified lead credits activated for your workspace.</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#202020]">
          {step > 1 ? (
            <Button variant="secondary" size="sm" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button variant="primary" size="sm" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
            {step === 3 ? 'Launch Workspace' : 'Continue'}
          </Button>
        </div>

      </div>
    </Modal>
  );
};
