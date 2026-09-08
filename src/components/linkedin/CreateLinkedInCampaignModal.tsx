import React, { useState, useMemo } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Users, 
  ShieldCheck, 
  Clock, 
  Workflow, 
  Upload, 
  FileSpreadsheet, 
  Sparkles, 
  Linkedin, 
  Check, 
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Database,
  Sliders,
  Eye,
  HelpCircle,
  CheckSquare,
  FileText,
  Filter,
  Zap,
  Target,
  UserCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  useLinkedIn, 
  LinkedInStep, 
  LinkedInCampaignLead 
} from '../../context/LinkedInContext';
import { LinkedInEmbeddedCanvasStep } from './LinkedInEmbeddedCanvasStep';
import { validateSequenceGraph } from './workflowValidation';

export interface CreateLinkedInCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_DEFAULT_SEQUENCE: LinkedInStep[] = [
  {
    id: 'step_visit_1',
    type: 'visit',
    title: 'Visit Profile',
    subtitle: 'Stealth profile viewing via residential proxy',
    timingLabel: 'Send immediately',
    waitDurationHours: 0,
  },
  {
    id: 'step_connect_2',
    type: 'connect',
    title: 'Connection Request',
    subtitle: 'Send personalized invite note (max 300 chars)',
    timingLabel: 'Wait 1 hour',
    waitDurationHours: 1,
    config: {
      note: 'Hi {{firstName}}, noticed your leadership at {{companyName}}. Would love to connect and share notes on {{industry}} outbound strategies!',
      spintax: true,
      variables: ['firstName', 'companyName', 'industry'],
      characterLimit: 300,
    },
  },
  {
    id: 'step_cond_3',
    type: 'condition',
    title: 'If Invitation Accepted',
    subtitle: 'Checks 1st-degree connection status for up to 30 days',
    config: {
      conditionType: 'invite_accepted',
      conditionTargetDays: 30,
    },
    yesBranch: [
      {
        id: 'step_msg_yes_1',
        type: 'message',
        title: 'Welcome Follow-up Message',
        subtitle: 'Direct LinkedIn chat message once connected',
        timingLabel: 'Wait 1 day',
        waitDurationDays: 1,
        config: {
          body: 'Thanks for connecting, {{firstName}}! Saw your recent initiatives at {{companyName}}. We recently helped similar growth teams 3x outbound reply rates.\n\nOpen to comparing playbooks sometime this week?',
          variables: ['firstName', 'companyName'],
        },
      },
      {
        id: 'step_delay_yes_2',
        type: 'delay',
        title: 'Wait 2 Days',
        subtitle: 'Pacing delay before soft engagement',
        timingLabel: 'Wait 2 days',
        waitDurationDays: 2,
      },
      {
        id: 'step_like_yes_3',
        type: 'like_post',
        title: 'Like Recent Post',
        subtitle: 'Engage with prospect latest article or update',
        timingLabel: 'Send immediately',
      },
    ],
    noBranch: [
      {
        id: 'step_end_no_1',
        type: 'stop',
        title: 'End Sequence',
        subtitle: 'Conclude outreach for unaccepted or timed-out leads',
        timingLabel: 'Send immediately',
        branch: 'no',
        parentConditionId: 'step_cond_3',
        config: {
          stopReason: 'timeout_or_rejected',
        },
      },
    ],
  },
];

export const CreateLinkedInCampaignModal: React.FC<CreateLinkedInCampaignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createCampaign, accounts, setSelectedCampaignId } = useLinkedIn();

  // Wizard Step (1 through 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Details
  const [name, setName] = useState('');
  const [targetAudience, setTargetAudience] = useState('Head of Growth, VP Sales, SDR Leads');
  const [campaignGoal, setCampaignGoal] = useState<'leads' | 'events' | 'nurture' | 'recruiting'>('leads');
  const [tags, setTags] = useState('B2B, SaaS, Enterprise');

  // Step 2: Leads Import
  const [importMethod, setImportMethod] = useState<'csv' | 'crm' | 'manual'>('csv');
  const [rawLeadText, setRawLeadText] = useState(
    `Sarah Jenkins,VP Sales,Acme Corp,https://linkedin.com/in/sarah-jenkins,sarah@acme.com\nMichael Chang,Head of Revenue,FinScale,https://linkedin.com/in/michael-chang,michael@finscale.io\nElena Rostova,Chief Commercial Officer,CyberGuard,https://linkedin.com/in/elena-rostova,elena@cyberguard.tech`
  );
  const [deduplicateAgainstExisting, setDeduplicateAgainstExisting] = useState(true);
  const [validateProfileUrls, setValidateProfileUrls] = useState(true);

  // Step 3: Sender Account
  const [selectedAccountName, setSelectedAccountName] = useState(accounts[0]?.name || 'Asad Farooq');

  // Step 4: Sequence State (Direct Flowchart Tree)
  const [sequence, setSequence] = useState<LinkedInStep[]>(INITIAL_DEFAULT_SEQUENCE);

  // Step 5: Schedule & Safety
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [dailyInviteLimit, setDailyInviteLimit] = useState(25);
  const [dailyMessageLimit, setDailyMessageLimit] = useState(40);
  const [randomDelayMin, setRandomDelayMin] = useState(180);
  const [randomDelayMax, setRandomDelayMax] = useState(420);
  const [stopOnReply, setStopOnReply] = useState(true);
  const [stopOnConnection, setStopOnConnection] = useState(false);
  const [sendingDays, setSendingDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  // Selected account record
  const selectedAcc = accounts.find((a) => a.name === selectedAccountName) || accounts[0] || {
    name: 'Asad Farooq',
    title: 'Lead Outbound Specialist',
    status: 'Connected',
    safetyScore: 99,
    dailyInvitesSent: 12,
    dailyInvitesLimit: 25,
    proxyLocation: 'United States',
    proxyIp: '198.51.100.44',
  };

  // Parsed structured leads from raw text
  const parsedLeadsList = useMemo(() => {
    return rawLeadText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((line, idx) => {
        const parts = line.split(',').map((p) => p.trim());
        const fullName = parts[0] || `Lead ${idx + 1}`;
        const title = parts[1] || 'Growth Executive';
        const company = parts[2] || 'Enterprise Corp';
        const linkedinUrl = parts[3] || 'https://linkedin.com';
        const email = parts[4] || '';
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || 'Lead';
        const lastName = nameParts.slice(1).join(' ') || '';

        return {
          id: `lead_enrolled_${Date.now()}_${idx}`,
          name: fullName,
          firstName,
          lastName,
          title,
          company,
          linkedinUrl,
          email,
          phone: '',
          status: 'In progress' as const,
          leadScore: 3,
          hasVerifiedEmail: Boolean(email),
          hasPhone: false,
        };
      });
  }, [rawLeadText]);

  const parsedLeadCount = parsedLeadsList.length;
  const sequenceValidation = useMemo(() => validateSequenceGraph(sequence), [sequence]);

  const stepsList = [
    { num: 1, label: 'Details', icon: Target },
    { num: 2, label: 'Add Leads', icon: Users },
    { num: 3, label: 'Account', icon: UserCheck },
    { num: 4, label: 'Sequence', icon: Workflow },
    { num: 5, label: 'Schedule', icon: Clock },
    { num: 6, label: 'Checklist', icon: CheckSquare },
    { num: 7, label: 'Launch', icon: Send },
  ];

  const handleReset = () => {
    setCurrentStep(1);
    setName('');
    onClose();
  };

  const handleFinalSubmit = (status: 'Running' | 'Draft') => {
    if (!name.trim()) return;

    createCampaign({
      name: name.trim(),
      targetAudience: targetAudience.trim(),
      accountName: selectedAccountName,
      status,
      targetCount: parsedLeadCount || 50,
      sequence,
      leadsList: parsedLeadsList as any,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      schedule: {
        days: sendingDays.map((d) => {
          switch (d) {
            case 'Mon': return 'Monday';
            case 'Tue': return 'Tuesday';
            case 'Wed': return 'Wednesday';
            case 'Thu': return 'Thursday';
            case 'Fri': return 'Friday';
            case 'Sat': return 'Saturday';
            case 'Sun': return 'Sunday';
            default: return 'Monday';
          }
        }),
        startHour: '09:00',
        endHour: '18:00',
        timezone,
      },
      limits: {
        dailyInvites: dailyInviteLimit,
        dailyMessages: dailyMessageLimit,
        dailyVisits: dailyInviteLimit + 10,
      },
      safety: {
        randomDelayMinSeconds: randomDelayMin,
        randomDelayMaxSeconds: randomDelayMax,
        warmupMode: true,
        proxyLocation: selectedAcc?.proxyLocation || 'United States',
      },
      stopConditions: {
        stopOnReply,
        stopOnConnection,
        stopOnManualContact: true,
        stopOnRemoved: true,
      },
    });

    handleReset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="w-[94vw] h-[92vh] max-w-[1760px] bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#282828] rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* 1. WIZARD HEADER & PROGRESS STEPPER */}
        <div className="px-5 sm:px-7 py-3.5 border-b border-slate-200/80 dark:border-[#262626] bg-slate-50/70 dark:bg-[#171717] space-y-2.5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Create LinkedIn Campaign
                  </h3>
                  <Badge variant="emerald" size="sm">
                    Studio Mode
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Step {currentStep} of 7: <span className="font-semibold text-slate-700 dark:text-slate-300">{stepsList[currentStep - 1].label}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[#252525] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Bar with Step Pills */}
          <div className="grid grid-cols-7 gap-2 pt-1">
            {stepsList.map((st) => {
              const isPast = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              const StepIcon = st.icon;

              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => {
                    // Allow jumping back to earlier steps or next if valid
                    if (isPast || (st.num === 2 && name.trim())) {
                      setCurrentStep(st.num);
                    }
                  }}
                  className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all ${
                    isCurrent
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : isPast
                      ? 'bg-slate-100/70 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-200/60'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-[#2A2A2A] text-slate-500'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <div className="hidden md:block truncate">
                    <span
                      className={`text-[11px] block truncate ${
                        isCurrent
                          ? 'font-bold text-emerald-600 dark:text-emerald-400'
                          : isPast
                          ? 'font-semibold text-slate-700 dark:text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. WIZARD BODY AREA */}
        <div className={`flex-1 min-h-0 flex flex-col ${currentStep === 4 ? 'p-2 sm:p-3 md:p-4 overflow-hidden' : 'overflow-y-auto p-6 sm:p-8 space-y-6'}`}>
          
          {/* STEP 1: Details */}
          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Configure Campaign Identity & Targeting Goal
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Set up your campaign name, target audience persona, and primary outreach objective. Outtricks will use these parameters to tune sequence cadence, daily pace limits, and human jitter.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>Campaign Name <span className="text-rose-500">*</span></span>
                    <span className="text-[10px] text-slate-400 font-normal">Internal identifier for reporting</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q3 EMEA FinTech Growth Leaders Outreach"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-semibold text-sm"
                    autoFocus
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Target Audience Persona
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VP of Sales, Head of Revenue, CRO, Growth Directors"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Primary Campaign Goal
                    </label>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Select campaign objective
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                    {[
                      { id: 'leads', label: 'B2B Leads', desc: 'Book qualified meetings', icon: Target },
                      { id: 'events', label: 'Webinar / Event', desc: 'Invites & attendee RSVPs', icon: Calendar },
                      { id: 'nurture', label: 'Network Nurture', desc: 'Build warm 1st-degree base', icon: Users },
                      { id: 'recruiting', label: 'Talent Sourcing', desc: 'Direct candidate outreach', icon: UserCheck },
                    ].map((g) => {
                      const Icon = g.icon;
                      const isSelected = campaignGoal === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setCampaignGoal(g.id as any)}
                          style={isSelected ? {
                            borderColor: 'var(--accent-primary)',
                            backgroundColor: 'var(--accent-primary-soft)',
                            boxShadow: '0 0 0 1px var(--accent-primary-border)'
                          } : undefined}
                          className={`group relative p-3.5 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-start h-full ${
                            isSelected
                              ? 'text-slate-900 dark:text-white'
                              : 'border-slate-200/90 dark:border-[#282828] bg-slate-50/50 dark:bg-[#181818]/60 hover:border-slate-300 dark:hover:border-[#383838] hover:bg-slate-100/60 dark:hover:bg-[#202020]/60 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div
                              style={isSelected ? {
                                backgroundColor: 'var(--accent-primary-soft)',
                                color: 'var(--accent-primary)'
                              } : undefined}
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? ''
                                  : 'bg-slate-100 dark:bg-[#222222] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div
                              style={isSelected ? {
                                backgroundColor: 'var(--accent-primary)',
                                borderColor: 'var(--accent-primary)'
                              } : undefined}
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? 'text-white shadow-xs'
                                  : 'border border-slate-300 dark:border-[#3A3A3A] group-hover:border-slate-400 dark:group-hover:border-[#4A4A4A]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
                            </div>
                          </div>
                          <div className="mt-2.5 space-y-0.5">
                            <span className="font-bold text-xs sm:text-[13px] block leading-tight text-slate-900 dark:text-white">
                              {g.label}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-snug">
                              {g.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Tags & Classification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B2B, SaaS, Enterprise, Tier-1"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400">Suggestions:</span>
                    {['SaaS', 'FinTech', 'Enterprise', 'Cold Outbound', 'Executive'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags((prev) => (prev ? `${prev}, ${tag}` : tag));
                          }
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-500 dark:text-slate-400 text-[10px] font-mono cursor-pointer transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Add Leads */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto space-y-5">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#262626] pb-3">
                {[
                  { id: 'csv', label: 'CSV / Excel Upload', icon: FileSpreadsheet },
                  { id: 'crm', label: 'Import from Outtricks CRM', icon: Database },
                  { id: 'manual', label: 'Manual Profile URLs', icon: Users },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = importMethod === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setImportMethod(tab.id as any)}
                      className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {importMethod === 'csv' && (
                <div className="space-y-4">
                  <div className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-[#333] hover:border-emerald-500 text-center space-y-2.5 cursor-pointer transition-colors bg-slate-50/50 dark:bg-[#161616]">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm block">
                        Drop your CSV or Excel lead list here
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Supports .csv, .tsv, .xlsx. Headers: Full Name, Job Title, Company Name, LinkedIn URL, Email
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Browse Local Files
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        Raw Lead Records (Editable CSV Rows):
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        Format: Name, Title, Company, LinkedInURL, Email
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={rawLeadText}
                      onChange={(e) => setRawLeadText(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-emerald-500 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {importMethod === 'crm' && (
                <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] space-y-4">
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      Select Filtered CRM Segment:
                    </h5>
                    <p className="text-xs text-slate-400">
                      Synchronizes directly with active prospects in your Outtricks CRM database.
                    </p>
                  </div>
                  <select className="w-full p-3 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium focus:outline-hidden text-xs cursor-pointer">
                    <option>High-Intent Verified Tech Founders (184 leads ready)</option>
                    <option>VP Sales & RevOps in North America (96 leads ready)</option>
                    <option>Recent Inbound Demo Requests (42 leads ready)</option>
                    <option>Product Managers in London / UK (67 leads ready)</option>
                  </select>
                </div>
              )}

              {importMethod === 'manual' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Paste LinkedIn Profile URLs (one per line):
                  </label>
                  <textarea
                    rows={6}
                    placeholder="https://www.linkedin.com/in/sarah-jenkins&#10;https://www.linkedin.com/in/michael-chang"
                    className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              )}

              {/* Deduplication & Validation Checks */}
              <div className="p-5 rounded-3xl bg-slate-50/50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Safety Gate & Hygiene Filters
                </span>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deduplicateAgainstExisting}
                    onChange={(e) => setDeduplicateAgainstExisting(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Automatically deduplicate against prospects currently enrolled in other active campaigns
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={validateProfileUrls}
                    onChange={(e) => setValidateProfileUrls(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Validate profile URL syntax and auto-flag broken or company page links
                  </span>
                </label>
              </div>

              {/* Live Parsed Count Banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {parsedLeadCount} Unique Prospects Ready for Sequence Enrollment
                  </span>
                </div>
                <Badge variant="emerald" size="sm">
                  Hygiene Verified
                </Badge>
              </div>

            </div>
          )}

          {/* STEP 3: Sender Account Selection */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Select Connected LinkedIn Sender Account
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Campaign actions will be dispatched through this account's dedicated residential cloud proxy IP. Fingerprint isolation ensures zero session disconnects or security flags.
                </p>
              </div>

              <div className="space-y-3">
                {accounts.map((acc) => {
                  const isSelected = selectedAccountName === acc.name;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setSelectedAccountName(acc.name)}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/5'
                          : 'border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 font-extrabold flex items-center justify-center font-mono text-sm shrink-0">
                          {acc.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {acc.name}
                            </span>
                            <Badge variant={acc.status === 'Connected' ? 'emerald' : 'amber'} size="sm">
                              {acc.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                            {acc.title} • {acc.proxyLocation} ({acc.proxyIp})
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs space-y-1 shrink-0">
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-end">
                          <ShieldCheck className="w-4 h-4" /> Safety Score: {acc.safetyScore}%
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          {acc.dailyInvitesSent} / {acc.dailyInvitesLimit} daily invites used
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security Shield Card */}
              <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs block">
                    Residential Cloud Proxy Protected
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Account is isolated on a static residential IP located in {selectedAcc.proxyLocation} with WebRTC leak prevention. Automated human jitter spacing will be enforced.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Direct Interactive Flowchart Canvas (MAIN REDESIGN) */}
          {currentStep === 4 && (
            <div className="flex-1 min-h-0 flex flex-col h-full">
              <LinkedInEmbeddedCanvasStep
                sequence={sequence}
                onChangeSequence={setSequence}
                leadCount={parsedLeadCount}
                accountName={selectedAccountName}
              />
            </div>
          )}

          {/* STEP 5: Schedule & Safety */}
          {currentStep === 5 && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Sending Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option>America/New_York (EST)</option>
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/Chicago (CST)</option>
                    <option>Europe/London (GMT)</option>
                    <option>Europe/Paris (CET)</option>
                    <option>Asia/Dubai (GST)</option>
                    <option>Asia/Singapore (SGT)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Active Outreach Days
                  </label>
                  <div className="grid grid-cols-7 gap-2 pt-0.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const isActive = sendingDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            if (isActive) {
                              setSendingDays((prev) => prev.filter((d) => d !== day));
                            } else {
                              setSendingDays((prev) => [...prev, day]);
                            }
                          }}
                          className={`h-9 rounded-xl inline-flex items-center justify-center text-center text-xs font-bold leading-none transition-all cursor-pointer select-none ${
                            isActive
                              ? 'bg-emerald-500 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-[#202020] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>Daily Connection Invites Cap</span>
                    <span className="font-mono text-emerald-500 font-bold">{dailyInviteLimit}/day</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    value={dailyInviteLimit}
                    onChange={(e) => setDailyInviteLimit(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Recommended safe ceiling: 20-25 invites/day for warmed accounts.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>Daily Direct Messages Cap</span>
                    <span className="font-mono text-emerald-500 font-bold">{dailyMessageLimit}/day</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    value={dailyMessageLimit}
                    onChange={(e) => setDailyMessageLimit(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Applies to follow-up and introduction chat messages.
                  </span>
                </div>
              </div>

              {/* Humanized Delay Jitter Card */}
              <div className="p-5 rounded-3xl bg-slate-50/70 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Human Emulation Delay (Jitter)
                  </span>
                  <p className="text-xs text-slate-400">
                    Randomizes intervals between consecutive outreach actions to mimic human browser activity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Minimum Delay:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={60}
                        max={600}
                        value={randomDelayMin}
                        onChange={(e) => setRandomDelayMin(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2E2E2E] font-mono text-xs text-slate-900 dark:text-white"
                      />
                      <span className="text-slate-400 text-xs font-mono">{Math.round(randomDelayMin / 60)}m</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Maximum Delay:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={120}
                        max={900}
                        value={randomDelayMax}
                        onChange={(e) => setRandomDelayMax(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2E2E2E] font-mono text-xs text-slate-900 dark:text-white"
                      />
                      <span className="text-slate-400 text-xs font-mono">{Math.round(randomDelayMax / 60)}m</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  ✓ Spacing randomized between {Math.round(randomDelayMin / 60)} min and {Math.round(randomDelayMax / 60)} min per outreach event.
                </div>
              </div>

              {/* Stop Conditions */}
              <div className="p-5 rounded-3xl bg-slate-50/70 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] space-y-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Automatic Stop Safeguards
                </span>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopOnReply}
                    onChange={(e) => setStopOnReply(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Instantly Freeze Sequence on Prospect Reply (Recommended)
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Halts future automated messages immediately when prospect responds, moving thread to Master Inbox.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopOnConnection}
                    onChange={(e) => setStopOnConnection(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Stop When Connection Is Accepted
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Conclude sequence upon invitation acceptance without sending follow-up messages.
                    </span>
                  </div>
                </label>
              </div>

            </div>
          )}

          {/* STEP 6: Pre-Flight Checklist */}
          {currentStep === 6 && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#262626]">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Pre-Flight Launch Readiness Audit (12 Quality Gates)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    System verification checks before campaign actions enter the dispatch queue.
                  </p>
                </div>
                <Badge variant={name.trim() && parsedLeadCount > 0 ? 'emerald' : 'amber'} size="md">
                  {name.trim() && parsedLeadCount > 0 ? 'All Systems Verified' : 'Action Required'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Sender Account Connected',
                    desc: `${selectedAccountName} (Healthy, Safety Score: ${selectedAcc.safetyScore}%)`,
                    pass: true,
                  },
                  {
                    title: 'Residential Proxy Active',
                    desc: `${selectedAcc.proxyLocation} static IP bound (${selectedAcc.proxyIp})`,
                    pass: true,
                  },
                  {
                    title: 'Campaign Name Configured',
                    desc: name.trim() || 'Missing campaign name',
                    pass: Boolean(name.trim()),
                  },
                  {
                    title: 'Audience Enrolled & Deduped',
                    desc: `${parsedLeadCount} prospects ready for enrollment`,
                    pass: parsedLeadCount > 0,
                  },
                  {
                    title: 'Sequence Graph Integrity',
                    desc: sequenceValidation.isValid && sequenceValidation.totalSteps > 0
                      ? `${sequenceValidation.totalSteps} steps validated · 0 critical graph errors`
                      : sequenceValidation.totalSteps === 0
                      ? 'No steps configured in sequence'
                      : `${sequenceValidation.errors[0]?.message || 'Sequence graph error detected'}`,
                    pass: sequenceValidation.isValid && sequenceValidation.totalSteps > 0,
                  },
                  {
                    title: 'Personalization Variables Ready',
                    desc: 'Fallback defaults active for {{firstName}} & {{companyName}}',
                    pass: true,
                  },
                  {
                    title: 'Daily Capacity Guardrail',
                    desc: `${dailyInviteLimit} invites/day (Under safe maximum)`,
                    pass: dailyInviteLimit <= 35,
                  },
                  {
                    title: 'Humanized Delay Jitter',
                    desc: `${Math.round(randomDelayMin / 60)}m - ${Math.round(randomDelayMax / 60)}m randomized intervals`,
                    pass: true,
                  },
                  {
                    title: 'Stop on Reply Active',
                    desc: stopOnReply ? 'Enabled (Auto-freeze on response)' : 'Disabled',
                    pass: stopOnReply,
                  },
                  {
                    title: 'Schedule Window Configured',
                    desc: `${sendingDays.join(', ')} · 09:00 - 18:00 ${timezone.split(' ')[0]}`,
                    pass: sendingDays.length > 0,
                  },
                  {
                    title: 'Profile URL Hygiene Verified',
                    desc: 'Zero broken links or company page formats',
                    pass: validateProfileUrls,
                  },
                  {
                    title: 'Master Outreach Queue Link',
                    desc: 'Connected to Outtricks background dispatcher',
                    pass: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#171717] border border-slate-200/80 dark:border-[#282828] flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                    {item.pass ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Launch or Save as Draft */}
          {currentStep === 7 && (
            <div className="max-w-xl mx-auto space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <Send className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  Campaign Ready for Dispatch!
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  "{name || 'New LinkedIn Campaign'}" will enroll {parsedLeadCount} leads under sender account {selectedAccountName}. Actions will be distributed safely across your configured window.
                </p>
              </div>

              {/* Campaign Metric Summary */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-left space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-[#242424]">
                  <span className="text-slate-400">Assigned Sender:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedAccountName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-[#242424]">
                  <span className="text-slate-400">Sequence Architecture:</span>
                  <span className="text-emerald-500 font-bold">{sequence.length} Root Steps (With Smart Branches)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-[#242424]">
                  <span className="text-slate-400">Enrolled Prospects:</span>
                  <span className="text-emerald-500 font-bold">{parsedLeadCount} Leads</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-[#242424]">
                  <span className="text-slate-400">Daily Invite Throttle:</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{dailyInviteLimit} invites / day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Estimated Duration:</span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    ~{Math.ceil(parsedLeadCount / dailyInviteLimit)} business days
                  </span>
                </div>
              </div>

              {!sequenceValidation.isValid && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Cannot launch: {sequenceValidation.errors[0]?.message || 'Please fix sequence errors before launching.'}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleFinalSubmit('Draft')}
                  className="w-full sm:w-auto"
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleFinalSubmit('Running')}
                  disabled={!name.trim() || parsedLeadCount === 0 || !sequenceValidation.canLaunch}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-xl shadow-emerald-600/25"
                >
                  Launch Campaign Now
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* 3. WIZARD FOOTER NAVIGATION */}
        <div className="px-6 py-4 border-t border-slate-200/80 dark:border-[#262626] bg-slate-50/70 dark:bg-[#171717] flex items-center justify-between shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Step {currentStep} of 7: {stepsList[currentStep - 1].label}
          </div>

          {currentStep < 7 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (currentStep === 1 && !name.trim()) return;
                setCurrentStep((prev) => Math.min(7, prev + 1));
              }}
              disabled={currentStep === 1 && !name.trim()}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              {currentStep === 6 ? 'Proceed to Launch' : 'Continue'}
            </Button>
          ) : (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Pre-flight validated
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
