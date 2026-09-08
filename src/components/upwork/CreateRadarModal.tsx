import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Building2, 
  AlertTriangle,
  Clock,
  Briefcase
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useUpwork, UpworkRadar, UpworkAutomationMode } from '../../context/UpworkContext';

export interface CreateRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  radarToEdit?: UpworkRadar | null;
}

export const CreateRadarModal: React.FC<CreateRadarModalProps> = ({
  isOpen,
  onClose,
  radarToEdit,
}) => {
  const { createRadar, updateRadar, accounts } = useUpwork();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [name, setName] = useState(radarToEdit?.name || '');
  const [mode, setMode] = useState<UpworkAutomationMode>(radarToEdit?.mode || 'assisted'); // DEFAULT: Assisted
  const [category, setCategory] = useState(radarToEdit?.category || 'Engineering & Architecture');
  const [searchQuery, setSearchQuery] = useState(radarToEdit?.searchQuery || '');
  const [negativeKeywordsInput, setNegativeKeywordsInput] = useState(radarToEdit?.negativeKeywords?.join(', ') || 'unpaid, data entry, virtual assistant, scrape');
  const [minMatchScore, setMinMatchScore] = useState(radarToEdit?.minMatchScore || 85);
  const [minHourlyRate, setMinHourlyRate] = useState(radarToEdit?.minHourlyRate || 90);
  const [minBudgetFixed, setMinBudgetFixed] = useState(radarToEdit?.minBudgetFixed || 5000);
  const [minHireRate, setMinHireRate] = useState(radarToEdit?.clientFilter?.minHireRate || 50);
  const [minSpent, setMinSpent] = useState(radarToEdit?.clientFilter?.minSpent || 10000);
  const [paymentVerifiedOnly, setPaymentVerifiedOnly] = useState(radarToEdit?.clientFilter?.paymentVerifiedOnly ?? true);
  const [maxProposals, setMaxProposals] = useState(radarToEdit?.competitionFilter?.maxProposals || 15);
  const [aiDraftTone, setAiDraftTone] = useState<'consultative' | 'direct' | 'technical' | 'concise'>(radarToEdit?.aiDraftTone || 'consultative');
  const [isBoostEnabled, setIsBoostEnabled] = useState(radarToEdit?.boostStrategy?.enabled || false);
  const [maxBoostConnects, setMaxBoostConnects] = useState(radarToEdit?.boostStrategy?.maxBoostConnects || 8);
  const [dailyProposalLimit, setDailyProposalLimit] = useState(radarToEdit?.limits?.dailyProposalLimit || 5);
  const [maxConnectsPerDay, setMaxConnectsPerDay] = useState(radarToEdit?.limits?.maxConnectsPerDay || 50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      return;
    }

    const negativeKeywords = negativeKeywordsInput
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    const radarPayload: Partial<UpworkRadar> = {
      name: name || 'Custom Opportunity Radar',
      mode,
      category,
      searchQuery: searchQuery || 'React OR TypeScript',
      negativeKeywords,
      minMatchScore,
      minHourlyRate,
      minBudgetFixed,
      clientFilter: {
        minHireRate,
        minSpent,
        paymentVerifiedOnly,
        minClientRating: 4.8,
      },
      competitionFilter: {
        maxProposals,
      },
      aiDraftTone,
      boostStrategy: {
        enabled: isBoostEnabled,
        maxBoostConnects,
        targetPosition: 'top_3',
      },
      limits: {
        dailyProposalLimit,
        maxConnectsPerDay,
        stopOnLowResponseRate: true,
      }
    };

    if (radarToEdit) {
      updateRadar(radarToEdit.id, radarPayload);
    } else {
      createRadar(radarPayload);
    }

    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={radarToEdit ? 'Edit Smart Job Radar' : 'Configure Smart Job Radar'}
      description="Continuous background scanner with multi-factor match intelligence and safety controls."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
        
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
          {[
            { s: 1, title: 'Identity & Mode' },
            { s: 2, title: 'Search & Keywords' },
            { s: 3, title: 'Quality & Risk Screen' },
            { s: 4, title: 'Safety & Limits' },
          ].map(({ s, title }) => (
            <div 
              key={s} 
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                step === s 
                  ? 'bg-primary text-white shadow-xs' 
                  : step > s 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-400'
              }`}
            >
              <span className="font-mono">{s}</span>
              <span className="hidden sm:inline">{title}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: IDENTITY & MODE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Radar Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Deliverability & Cold Email Architect ($90+/hr)"
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                required
                autoFocus
              />
            </div>

            {/* Automation Mode Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Operational Automation Mode
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Mode B: Assisted (DEFAULT) */}
                <div 
                  onClick={() => setMode('assisted')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    mode === 'assisted'
                      ? 'bg-primary-muted/20 border-primary shadow-xs ring-1 ring-primary/40'
                      : 'border-slate-200 dark:border-[#262626] hover:bg-slate-50 dark:hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                        Mode B: Assisted (Review Required)
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                    {mode === 'assisted' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Continuously discovers jobs, checks multi-factor fit, and generates custom drafts into your review queue. No proposals are dispatched without your 1-click confirmation.
                  </p>
                </div>

                {/* Mode A: Automated */}
                <div 
                  onClick={() => setMode('automated')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    mode === 'automated'
                      ? 'bg-primary-muted/20 border-primary shadow-xs ring-1 ring-primary/40'
                      : 'border-slate-200 dark:border-[#262626] hover:bg-slate-50 dark:hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                        Mode A: Automated (Autonomous Auto-Dispatch)
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold">
                        FASTEST
                      </span>
                    </div>
                    {mode === 'automated' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Auto-dispatches proposals within 3 minutes of posting if the match score exceeds your strict threshold and client payment is verified.
                  </p>
                </div>

                {/* Mode C: Monitor Only */}
                <div 
                  onClick={() => setMode('monitor_only')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    mode === 'monitor_only'
                      ? 'bg-primary-muted/20 border-primary shadow-xs ring-1 ring-primary/40'
                      : 'border-slate-200 dark:border-[#262626] hover:bg-slate-50 dark:hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                      Mode C: Monitor & Alerts Only
                    </span>
                    {mode === 'monitor_only' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Monitors feed and provides instant push notifications and match intelligence without generating drafts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SEARCH & KEYWORDS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Boolean Search Query (Keywords)
              </label>
              <textarea
                rows={3}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='e.g. ("Cold Email" OR Deliverability OR DMARC) AND ("Google Workspace" OR Outlook)'
                className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                required
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Supports boolean operators: AND, OR, NOT, and quotes for exact phrases.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Negative Keywords Filter (Excluded terms)
              </label>
              <input
                type="text"
                value={negativeKeywordsInput}
                onChange={(e) => setNegativeKeywordsInput(e.target.value)}
                placeholder="unpaid, virtual assistant, data entry, scrape bulk"
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Comma-separated terms that immediately disqualify jobs from being processed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Min Hourly Rate ($/hr)
                </label>
                <input
                  type="number"
                  value={minHourlyRate}
                  onChange={(e) => setMinHourlyRate(Number(e.target.value))}
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Min Fixed Price ($)
                </label>
                <input
                  type="number"
                  value={minBudgetFixed}
                  onChange={(e) => setMinBudgetFixed(Number(e.target.value))}
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: QUALITY & RISK SCREEN */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Payment Verified Only
                </span>
                <button
                  type="button"
                  onClick={() => setPaymentVerifiedOnly(!paymentVerifiedOnly)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    paymentVerifiedOnly ? 'bg-primary' : 'bg-slate-300 dark:bg-[#2A2A2A]'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    paymentVerifiedOnly ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Minimum Client Hire Rate
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Filters out tire-kickers who rarely hire freelancers.
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-primary">
                  {minHireRate}%
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={minHireRate}
                onChange={(e) => setMinHireRate(Number(e.target.value))}
                className="w-full accent-primary"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-[#262626]">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Max Allowed Proposals
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Disqualifies saturated posts where competition is too crowded.
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-primary">
                  &lt; {maxProposals}
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={maxProposals}
                onChange={(e) => setMaxProposals(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Minimum Outtricks Match Score Required to Qualify
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="1"
                  value={minMatchScore}
                  onChange={(e) => setMinMatchScore(Number(e.target.value))}
                  className="flex-1 accent-emerald-500"
                />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10">
                  {minMatchScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SAFETY & LIMITS */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                AI Cover Letter Drafting Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['consultative', 'direct', 'technical', 'concise'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAiDraftTone(t)}
                    className={`p-2.5 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                      aiDraftTone === t
                        ? 'bg-primary text-white shadow-xs border-primary'
                        : 'border-slate-200 dark:border-[#262626] text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Boosting */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Automatic Proposal Boosting
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBoostEnabled(!isBoostEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    isBoostEnabled ? 'bg-amber-500' : 'bg-slate-300 dark:bg-[#2A2A2A]'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isBoostEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {isBoostEnabled && (
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Max Connects per proposal:</span>
                  <input
                    type="number"
                    value={maxBoostConnects}
                    onChange={(e) => setMaxBoostConnects(Number(e.target.value))}
                    className="w-20 p-1.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#2E2E2E] text-center font-bold"
                  />
                </div>
              )}
            </div>

            {/* Guardrails */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Daily Proposal Cap
                </label>
                <input
                  type="number"
                  value={dailyProposalLimit}
                  onChange={(e) => setDailyProposalLimit(Number(e.target.value))}
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Daily Connects Limit
                </label>
                <input
                  type="number"
                  value={maxConnectsPerDay}
                  onChange={(e) => setMaxConnectsPerDay(Number(e.target.value))}
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-500" />
              <span>Outtricks Safety Guardrail: Automatic pause if client response rate drops below 20%.</span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#242424] flex items-center justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            rightIcon={step < 4 ? <ArrowRight className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
          >
            {step < 4 ? 'Next Step' : radarToEdit ? 'Save Radar' : 'Activate Smart Radar'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};
