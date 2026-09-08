import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bookmark, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  Clock, 
  FileText, 
  Paperclip, 
  Check, 
  User, 
  ChevronRight,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { useUpwork, UpworkJob } from '../../context/UpworkContext';
import { useToast } from '../../context/ToastContext';
import { cleanAiSlop } from '../../utils/noAiSlop';

export interface ProposalWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: UpworkJob | null;
}

export const ProposalWorkspaceModal: React.FC<ProposalWorkspaceModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  const { 
    submitProposal, 
    saveProposalDraft, 
    accounts, 
    todayConnectsUsed, 
    todayConnectsBudget, 
    isEmergencyPaused 
  } = useUpwork();
  const { success, warning } = useToast();

  const primaryAccount = accounts[0];
  const specializedProfiles = primaryAccount?.specializedProfiles || [
    { id: 'sp_1', name: 'Revenue Architecture & Cold Email Deliverability', hourlyRate: '$125.00/hr' },
    { id: 'sp_2', name: 'Conversational Voice AI & Real-Time SDR Systems', hourlyRate: '$145.00/hr' },
    { id: 'sp_3', name: 'Full-Stack React, TypeScript & Data Dashboards', hourlyRate: '$110.00/hr' },
  ];

  const [selectedProfileId, setSelectedProfileId] = useState(specializedProfiles[0]?.id || 'sp_1');
  const [tone, setTone] = useState<'consultative' | 'direct' | 'technical' | 'concise'>('consultative');
  const [lengthMode, setLengthMode] = useState<'punchy' | 'architectural' | 'case_study'>('punchy');
  const [bidAmount, setBidAmount] = useState(job?.budgetType === 'Hourly' ? '$125.00/hr' : '$9,500');
  const [duration, setDuration] = useState('1 to 3 months');
  const [coverLetter, setCoverLetter] = useState('');
  
  // Boost controls
  const [isBoostEnabled, setIsBoostEnabled] = useState(false);
  const [boostConnects, setBoostConnects] = useState<number>(6);

  // Screening questions answers
  const [screeningAnswers, setScreeningAnswers] = useState<{ [qId: string]: string }>({});

  // Reset/sync when job changes
  useEffect(() => {
    if (!job) return;

    const defaultBid = job.budgetType === 'Hourly' 
      ? (job.trixieInsights?.suggestedHourlyRate ? `$${job.trixieInsights.suggestedHourlyRate.recommended}.00/hr` : '$125.00/hr')
      : (job.budgetAmount ? `$${job.budgetAmount.toLocaleString()}` : '$9,500');

    setBidAmount(defaultBid);

    // Initial answers from job screening questions if available
    const initialAnswers: { [qId: string]: string } = {};
    if (job.screeningQuestions) {
      job.screeningQuestions.forEach(sq => {
        initialAnswers[sq.id] = sq.suggestedAnswer;
      });
    }
    setScreeningAnswers(initialAnswers);

    // Draft cover letter grounded in job
    const initialDraft = `Hi,

I reviewed your requirements for "${job.title}".

Our agency focuses specifically on production-grade systems with verifiable track records:
• Scaled multi-tenant infrastructures delivering 99.4% inbox placement and sub-400ms latency.
• Full end-to-end architecture with TypeScript, WebRTC, and automated CRM integrations.
• Demonstrable case studies with verified client results.

Would you be open to a 5-minute technical demo or reviewing our verified architecture blueprints?`;

    setCoverLetter(initialDraft);
    setIsBoostEnabled(false);
    setBoostConnects(6);
  }, [job]);

  if (!isOpen || !job) return null;

  const baseConnects = job.opportunityType === 'invitation' ? 0 : (job.connectsCost ?? 16);
  const totalConnectsNeeded = baseConnects + (isBoostEnabled ? boostConnects : 0);
  const remainingConnectsToday = Math.max(0, todayConnectsBudget - todayConnectsUsed);
  const isBudgetExceeded = totalConnectsNeeded > remainingConnectsToday;

  const handleGenerateVariant = (selectedTone: 'consultative' | 'direct' | 'technical' | 'concise') => {
    setTone(selectedTone);
    let updatedText = '';

    if (selectedTone === 'direct') {
      updatedText = `Hi,

Directly addressing your need for "${job.title}":

1. Scope: We deploy production-ready systems without unnecessary onboarding overhead.
2. Experience: Demonstrable live implementations handling high-volume outbound with 99.4% deliverability.
3. Delivery: Can begin immediately with full milestone transparency.

Let's schedule a brief 10-minute call to discuss your exact timeline.`;
    } else if (selectedTone === 'technical') {
      updatedText = `Hi,

Reviewed your technical specifications for "${job.title}".

Key Architectural Highlights:
• Clean decoupling of services with TypeScript and strict type safety.
• Sub-400ms streaming audio and WebRTC data channel transport.
• Zero-leakage DKIM/DMARC routing and custom tracking proxies.

Happy to walk through our GitHub repositories or architectural diagrams during a discovery chat.`;
    } else if (selectedTone === 'concise') {
      updatedText = `Hi,

We built identical solutions to what you need for "${job.title}".

• 99.4% verified deliverability across 24+ Google Workspace tenants.
• Ready to start immediately.

Open to seeing our live client walkthrough?`;
    } else {
      updatedText = `Hi,

I noticed your project "${job.title}". Having reviewed your specifications, your primary objective is reliable, scalable execution without deliverability or latency degradation.

In our recent deployment, we solved this exact bottleneck:
• Implemented automated rotating mailbox infrastructure.
• Achieved a 98% positive inbox placement across enterprise campaigns.

I would welcome the opportunity to learn more about your current architecture and see if our solutions align with your vision.`;
    }

    setCoverLetter(cleanAiSlop(updatedText));
    success(`Generated proposal variant with ${selectedTone} tone.`, 'Variant Updated');
  };

  const handlePolish = () => {
    const cleaned = cleanAiSlop(coverLetter);
    setCoverLetter(cleaned);
    success('Applied No AI Slop rules: eliminated buzzwords, throat-clearing, and robotic cliches.', 'Proposal Polished');
  };

  const handleSaveDraft = () => {
    const answersArray = Object.entries(screeningAnswers).map(([qId, ans]) => {
      const qObj = job.screeningQuestions?.find(q => q.id === qId);
      return { question: qObj?.question || qId, answer: ans };
    });

    saveProposalDraft(
      job.id, 
      coverLetter, 
      answersArray, 
      bidAmount, 
      duration, 
      selectedProfileId
    );
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEmergencyPaused) {
      warning('Cannot submit proposal: Emergency Kill Switch is currently engaged.', 'Execution Halted');
      return;
    }

    if (isBudgetExceeded) {
      warning(
        `This submission requires ${totalConnectsNeeded} Connects, but only ${remainingConnectsToday} remain in today's safety budget.`,
        'Connects Limit Reached'
      );
      return;
    }

    const answersArray = Object.entries(screeningAnswers).map(([qId, ans]) => {
      const qObj = job.screeningQuestions?.find(q => q.id === qId);
      return { question: qObj?.question || qId, answer: ans };
    });

    submitProposal(
      job.id, 
      coverLetter, 
      bidAmount, 
      duration, 
      answersArray, 
      isBoostEnabled ? boostConnects : 0
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Outtricks Proposal Workspace Studio"
      description={`Crafting proposal for: ${job.title.slice(0, 70)}...`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
        
        {/* Top Intelligence Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">
              {job.matchScore}%
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <span>{job.clientCountry} Client</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400">{job.clientSpent}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Avg Rate Paid: ${job.clientStats?.avgHourlyPaid || 118}/hr • Hire Rate: {job.riskSignals?.clientHireRate || 80}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {job.opportunityType === 'invitation' ? (
              <span className="px-3 py-1 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono font-bold text-[11px]">
                Direct Invite (0 Connects)
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px]">
                Base Cost: {baseConnects} Connects
              </span>
            )}
          </div>
        </div>

        {/* Profile & Pricing Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Profile Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Sender Upwork Profile
            </label>
            <select
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
            >
              {specializedProfiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.hourlyRate})
                </option>
              ))}
            </select>
          </div>

          {/* Rate / Bid Amount */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Your Proposed Rate / Bid
            </label>
            <div className="relative">
              <input
                type="text"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono font-bold focus:outline-none"
                required
              />
              {job.trixieInsights?.suggestedHourlyRate && (
                <span className="absolute right-2.5 top-2.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  Recommended: ${job.trixieInsights.suggestedHourlyRate.recommended}/hr
                </span>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Estimated Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Less than 1 month">Less than 1 month</option>
              <option value="1 to 3 months">1 to 3 months</option>
              <option value="3 to 6 months">3 to 6 months</option>
              <option value="More than 6 months">More than 6 months</option>
            </select>
          </div>
        </div>

        {/* AI Cover Letter Studio */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Custom Cover Letter Studio</span>
              </label>

              {/* Tone Switcher Pills */}
              <div className="inline-flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-[#202020] border border-slate-200/60 dark:border-[#282828]">
                {(['consultative', 'direct', 'technical', 'concise'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleGenerateVariant(t)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all capitalize cursor-pointer ${
                      tone === t 
                        ? 'bg-primary text-white shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePolish}
                className="flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer"
                title="Surgically polish draft with No AI Slop rules"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Polish (No Slop)</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                {coverLetter.length} chars
              </span>
            </div>
          </div>

          <textarea
            rows={7}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-sans leading-relaxed text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Type or customize your proposal cover letter..."
            required
          />
        </div>

        {/* Screening Question Assistant */}
        {job.screeningQuestions && job.screeningQuestions.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                  Client Screening Questions ({job.screeningQuestions.length})
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                ✓ Truthful Grounded Generation
              </span>
            </div>

            <div className="space-y-3">
              {job.screeningQuestions.map((sq, idx) => (
                <div key={sq.id} className="space-y-1.5">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-start gap-1.5 text-[11px]">
                    <span className="text-primary font-mono font-bold">Q{idx + 1}:</span>
                    <span>{sq.question}</span>
                  </div>
                  
                  <textarea
                    rows={2}
                    value={screeningAnswers[sq.id] || ''}
                    onChange={(e) => setScreeningAnswers({ ...screeningAnswers, [sq.id]: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#2E2E2E] text-slate-900 dark:text-slate-100 outline-none focus:border-primary"
                    placeholder="Provide truthful, grounded response..."
                    required
                  />

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="italic">{sq.groundedFrom}</span>
                    {sq.missingInfoWarning && (
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {sq.missingInfoWarning}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connects & Smart Boosting Controls Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                Smart Proposal Boosting
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                (Upwork Bid Position)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Boost your proposal to the top 3 spots to increase client open rates by 3.2x.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBoostEnabled(!isBoostEnabled)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isBoostEnabled 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400' 
                  : 'border-slate-200 dark:border-[#2E2E2E] text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isBoostEnabled ? '✓ Boosting Active' : '+ Add Boost'}
            </button>

            {isBoostEnabled && (
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-slate-400 text-xs">Bid:</span>
                {[4, 6, 8, 12].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setBoostConnects(cnt)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      boostConnects === cnt 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-slate-100 dark:bg-[#252525] text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    +{cnt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Safety & Connects Verification Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono">
            <span className="text-slate-500">Total Connects Required: </span>
            <span className="font-extrabold text-slate-900 dark:text-white">{totalConnectsNeeded}</span>
            <span className="text-slate-400"> (Budget Remaining: {remainingConnectsToday})</span>
            {isBudgetExceeded && (
              <div className="text-rose-500 font-bold text-[11px] mt-0.5">
                ⚠️ Daily safety budget exceeded. Adjust boost or reset budget.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2E2E2E] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Save Draft
            </button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isBudgetExceeded || isEmergencyPaused}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              {isEmergencyPaused ? 'Emergency Paused' : 'Submit Proposal'}
            </Button>
          </div>
        </div>

      </form>
    </Modal>
  );
};
