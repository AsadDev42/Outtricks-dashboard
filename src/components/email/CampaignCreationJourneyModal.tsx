import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useEmail, EmailTemplate, ConnectedMailbox } from '../../context/EmailContext';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { ConnectMailboxModal } from './ConnectMailboxModal';
import { SequenceStepEditor, SequenceStepItem } from './SequenceStepEditor';
import { 
  Send, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Users, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Copy, 
  Code, 
  Type, 
  Bold, 
  Italic, 
  List, 
  Link2, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Zap, 
  Globe, 
  Mail, 
  CheckSquare,
  Sliders,
  Check,
  Calendar,
  AlertCircle,
  Flame,
  TrendingUp
} from 'lucide-react';

export interface CampaignCreationJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPAM_TRIGGER_WORDS = [
  'free', '100%', 'guarantee', 'guaranteed', 'risk-free', 'urgent', 'act now',
  'make money', 'cash', 'credit card', 'winner', 'no catch', 'click here',
  'buy now', 'cheap', 'unlimited', 'extra income', 'miracle', 'fast cash',
  'promise', 'lowest price', 'apply now', 'instant', 'earn $'
];

export const CampaignCreationJourneyModal: React.FC<CampaignCreationJourneyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createCampaign, mailboxes, templates } = useEmail();
  const { contacts } = useCrm();
  const { success, info } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [isConnectMailboxModalOpen, setIsConnectMailboxModalOpen] = useState(false);
  const [showDraftProtectionModal, setShowDraftProtectionModal] = useState(false);
  const [showTestSendModal, setShowTestSendModal] = useState(false);

  // STEP 1: Campaign Identity (Clean placeholders, no pre-filled fake user data)
  const [name, setName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  // STEP 2: Leads & Sourcing
  const [leadSourceTab, setLeadSourceTab] = useState<'csv' | 'sheets' | 'manual' | 'list' | 'crm'>('csv');
  const [csvFileName, setCsvFileName] = useState('verified_prospects_q3.csv');
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [manualLeadsText, setManualLeadsText] = useState('');
  const [audienceCount, setAudienceCount] = useState(1406);
  const [dedupeInFile, setDedupeInFile] = useState(true);
  const [dedupeInCampaign, setDedupeInCampaign] = useState(true);
  const [dedupeRecentContacted, setDedupeRecentContacted] = useState(true);
  const [enforceSuppression, setEnforceSuppression] = useState(true);

  // STEP 3: Sequence Builder & A/Z Testing
  const [steps, setSteps] = useState<SequenceStepItem[]>([
    {
      stepNumber: 1,
      delayDays: 0,
      delayValue: 0,
      delayUnit: 'days',
      threadMode: 'new',
      subject: 'Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nNoticed {{company}}\'s rapid expansion in enterprise B2B. Most revenue leaders we speak with struggle with mailbox deliverability dropping below 85% once scaling across multiple SDRs.\n\nWe built Outtricks to automate multi-inbox rotation and AI warmup across Google Workspace and Office 365.\n\nWorth a brief 7-minute look this week?\n\nBest,\nSarah Jenkins',
      attachments: [],
      threadReply: false,
      unsubscribeOption: 'standard',
      signatureType: 'default',
      trackOpens: true,
      trackClicks: true,
      variants: [
        {
          id: 'v_a_1',
          label: 'A',
          subject: 'Quick question regarding {{company}}\'s outbound infrastructure',
          body: 'Hi {{firstName}},\n\nNoticed {{company}}\'s rapid expansion in enterprise B2B. Most revenue leaders we speak with struggle with mailbox deliverability dropping below 85% once scaling across multiple SDRs.\n\nWe built Outtricks to automate multi-inbox rotation and AI warmup across Google Workspace and Office 365.\n\nWorth a brief 7-minute look this week?\n\nBest,\nSarah Jenkins',
          weight: 50,
          status: 'active'
        },
        {
          id: 'v_b_1',
          label: 'B',
          subject: 'Infrastructure scaling for {{company}}',
          body: 'Hi {{firstName}},\n\nSeeing great momentum at {{company}}! Reaching out because scaling SDR outbound often triggers spam filters if mailbox pools aren\'t actively rotated.\n\nWe keep your deliverability above 98% automatically across Google & Microsoft mailboxes.\n\nOpen to reviewing our 1-page benchmark?',
          weight: 50,
          status: 'active'
        }
      ],
      hasVariantB: true,
      autoOptimizeMetric: 'positive_replies'
    },
    {
      stepNumber: 2,
      delayDays: 3,
      delayValue: 3,
      delayUnit: 'days',
      threadMode: 'continue',
      subject: 'Re: Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nFollowing up on my previous note. Thought you might find this relevant: CloudScale AI increased their booked qualified demos by 43% within 3 weeks of deploying our humanized sending pacing.\n\nDo you have 5 minutes this Thursday at 2 PM?\n\nBest,\nSarah',
      attachments: [],
      threadReply: true,
      unsubscribeOption: 'standard',
      signatureType: 'default',
      trackOpens: true,
      trackClicks: true,
    },
    {
      stepNumber: 3,
      delayDays: 4,
      delayValue: 4,
      delayUnit: 'days',
      threadMode: 'continue',
      subject: 'Re: Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nI understand you\'re busy leading growth at {{company}}. If deliverability isn\'t a priority this quarter, no problem at all.\n\nFeel free to reach out whenever you\'re ready to ramp outbound revenue.\n\nCheers,\nSarah',
      attachments: [],
      threadReply: true,
      unsubscribeOption: 'standard',
      signatureType: 'default',
      trackOpens: true,
      trackClicks: true,
    }
  ]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // STEP 4: Sending Accounts & Routing
  const [selectedMailboxIds, setSelectedMailboxIds] = useState<string[]>(
    mailboxes.filter(m => m.healthScore >= 70).map(m => m.id)
  );
  const [rotationMode, setRotationMode] = useState<'balanced' | 'health-aware' | 'randomized'>('balanced');
  const [providerMatching, setProviderMatching] = useState<'prefer' | 'enforce' | 'disabled'>('prefer');
  const [espRoutingGoogle, setEspRoutingGoogle] = useState<'prefer' | 'allow' | 'avoid'>('prefer');
  const [espRoutingMicrosoft, setEspRoutingMicrosoft] = useState<'prefer' | 'allow' | 'avoid'>('prefer');
  const [stickySender, setStickySender] = useState(true);

  // STEP 5: Schedule & Sending Capacity Forecast
  const [sendingDays, setSendingDays] = useState({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false,
  });
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [timezone, setTimezone] = useState<'lead_local' | 'workspace' | 'est' | 'pst' | 'utc'>('lead_local');
  const [campaignDailyLimit, setCampaignDailyLimit] = useState(140);
  const [mailboxDailyCap, setMailboxDailyCap] = useState(35);
  const [maxNewLeadsPerDay, setMaxNewLeadsPerDay] = useState(45);
  const [companySendLimit, setCompanySendLimit] = useState(1);
  const [minDelaySec, setMinDelaySec] = useState(60);
  const [maxDelaySec, setMaxDelaySec] = useState(180);
  const [slowRamp, setSlowRamp] = useState(false);

  // STEP 6: Options & Safeguards
  const [stopOnReply, setStopOnReply] = useState(true);
  const [stopOnPositiveReply, setStopOnPositiveReply] = useState(true);
  const [stopOnMeeting, setStopOnMeeting] = useState(true);
  const [stopOnAutoReply, setStopOnAutoReply] = useState(true);
  const [stopCompanyOnReply, setStopCompanyOnReply] = useState(false);
  const [trackOpens, setTrackOpens] = useState(true);
  const [trackClicks, setTrackClicks] = useState(true);
  const [textOnlyMode, setTextOnlyMode] = useState(false);
  const [customTrackingDomain, setCustomTrackingDomain] = useState('track.cloudscale.ai');
  const [bounceProtection, setBounceProtection] = useState(true);
  const [ccBccAddress, setCcBccAddress] = useState('');
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testSendingState, setTestSendingState] = useState<'ready' | 'sending' | 'sent'>('ready');

  // Capacity Forecast Calculation
  const combinedMailboxCapacity = selectedMailboxIds.length * mailboxDailyCap;
  const effectiveDailyThroughput = Math.max(1, Math.min(campaignDailyLimit, combinedMailboxCapacity));
  const estimatedSendingDays = Math.ceil(audienceCount / effectiveDailyThroughput);

  // Check if draft has changes
  const hasChanges = Boolean(name.trim() || targetAudience.trim() || description.trim() || selectedMailboxIds.length > 0);

  const handleCloseAttempt = () => {
    if (hasChanges) {
      setShowDraftProtectionModal(true);
    } else {
      onClose();
    }
  };

  const handleAddStep = () => {
    const newStepNum = steps.length + 1;
    setSteps(prev => [
      ...prev,
      {
        stepNumber: newStepNum,
        delayDays: 3,
        delayValue: 3,
        delayUnit: 'days',
        threadMode: 'continue',
        subject: `Re: ${prev[0]?.subject || 'Quick question regarding outbound'}`,
        body: `Hi {{firstName}},\n\nWanted to quickly follow up regarding our previous note.\n\nBest,\nSarah`,
        attachments: [],
        threadReply: true,
        unsubscribeOption: 'standard',
        signatureType: 'default',
        trackOpens: true,
        trackClicks: true,
        hasVariantB: false,
      }
    ]);
    setActiveStepIndex(steps.length);
    success(`Added Step ${newStepNum} follow-up.`);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    setSteps(prev => prev.filter((_, i) => i !== index));
    if (activeStepIndex >= steps.length - 1) {
      setActiveStepIndex(Math.max(0, steps.length - 2));
    }
  };

  const handleSendTestEmail = () => {
    if (!testEmailAddress.trim()) {
      info('Please provide an email address for test preview.');
      return;
    }
    setTestSendingState('sending');
    setTimeout(() => {
      setTestSendingState('sent');
      success(`Dispatched live preview of Step ${activeStepIndex + 1} to ${testEmailAddress.trim()}`);
      setTimeout(() => setTestSendingState('ready'), 3000);
    }, 900);
  };

  const toggleMailboxSelect = (id: string) => {
    setSelectedMailboxIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinalLaunch = () => {
    if (!name.trim()) {
      info('Please provide a campaign name before launching.');
      setCurrentStep(1);
      return;
    }
    if (selectedMailboxIds.length === 0) {
      info('Please select at least one sending mailbox in Step 4.');
      setCurrentStep(4);
      return;
    }

    createCampaign({
      name: name.trim(),
      targetPersona: targetAudience.trim() || undefined,
      description: description.trim() || undefined,
      audienceCount: Number(audienceCount) || 1406,
      mailboxesCount: selectedMailboxIds.length,
      selectedMailboxIds: selectedMailboxIds,
      rotationMode: rotationMode,
      providerMatching: providerMatching,
      espRoutingMatrix: {
        google: espRoutingGoogle,
        microsoft: espRoutingMicrosoft,
        custom: 'allow',
      },
      stickySender: stickySender,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : ['Outbound', 'Q3'],
      maxLeadsPerDay: campaignDailyLimit,
      companySendLimit: companySendLimit,
      stopOnReply: stopOnReply,
      stopOnMeeting: stopOnMeeting,
      stopOnAutoReply: stopOnAutoReply,
      trackOpens: trackOpens,
      trackClicks: trackClicks,
      customTrackingDomain: customTrackingDomain,
    });

    success(`Campaign "${name.trim()}" successfully created and launched into Campaign Control Center!`, 'Campaign Active');
    onClose();
  };

  const handleSaveDraft = () => {
    if (!name.trim()) {
      info('Please provide a campaign name before saving a draft.');
      setCurrentStep(1);
      setShowDraftProtectionModal(false);
      return;
    }

    createCampaign({
      name: name.trim(),
      targetPersona: targetAudience.trim() || undefined,
      description: description.trim() || undefined,
      audienceCount: Number(audienceCount) || 0,
      mailboxesCount: selectedMailboxIds.length,
      selectedMailboxIds: selectedMailboxIds,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : ['Draft'],
    });

    success(`Saved "${name.trim()}" as draft.`);
    setShowDraftProtectionModal(false);
    onClose();
  };

  // Preflight validation engine
  const preflightChecks = [
    {
      id: 'name',
      stepTarget: 1 as const,
      label: 'Campaign Identity',
      detail: name.trim() ? `"${name.trim()}" configured` : 'Missing campaign name',
      status: name.trim() ? ('ready' as const) : ('blocking' as const),
      fixAction: 'Set Name',
    },
    {
      id: 'leads',
      stepTarget: 2 as const,
      label: 'Audience & Leads',
      detail: audienceCount > 0 ? `${audienceCount.toLocaleString()} leads mapped & deduplicated` : 'No leads imported',
      status: audienceCount > 0 ? ('ready' as const) : ('blocking' as const),
      fixAction: 'Add Leads',
    },
    {
      id: 'sequence',
      stepTarget: 3 as const,
      label: 'Sequence Steps',
      detail: `${steps.length} email touches configured with A/Z split testing`,
      status: steps.length > 0 ? ('ready' as const) : ('blocking' as const),
      fixAction: 'Configure Sequence',
    },
    {
      id: 'sending',
      stepTarget: 4 as const,
      label: 'Sending Accounts Pool',
      detail: selectedMailboxIds.length > 0
        ? `${selectedMailboxIds.length} rotating mailboxes (${combinedMailboxCapacity}/day cap)`
        : 'No sending mailboxes selected',
      status: selectedMailboxIds.length > 0 ? ('ready' as const) : ('blocking' as const),
      fixAction: 'Select Accounts',
    },
    {
      id: 'schedule',
      stepTarget: 5 as const,
      label: 'Operating Schedule',
      detail: `${Object.entries(sendingDays).filter(([_, a]) => a).map(([d]) => d).join(', ')} • ${startTime}-${endTime} (${timezone})`,
      status: Object.values(sendingDays).some(Boolean) ? ('ready' as const) : ('warning' as const),
      fixAction: 'Adjust Hours',
    },
    {
      id: 'options',
      stepTarget: 6 as const,
      label: 'Safeguards & Compliance',
      detail: 'Stop-on-reply, meeting detection, and 1-click unsubscribe enabled',
      status: stopOnReply ? ('ready' as const) : ('warning' as const),
      fixAction: 'Verify Safeguards',
    },
  ];

  const JOURNEY_STEPS = [
    { step: 1, title: 'Campaign' },
    { step: 2, title: 'Leads' },
    { step: 3, title: 'Sequence' },
    { step: 4, title: 'Sending Accounts' },
    { step: 5, title: 'Schedule' },
    { step: 6, title: 'Options' },
    { step: 7, title: 'Preflight & Launch' },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create New Cold Email Campaign"
        description="Follow the 7-step guided journey to configure audience, multi-step sequences, mailbox pool, AI spam checks, and schedule."
        size="full"
      >
        <div className="space-y-5 font-sans text-xs">
          
          {/* 7-Step Progression Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] font-mono text-[11px] overflow-x-auto gap-1">
            {JOURNEY_STEPS.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  currentStep === s.step
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : currentStep > s.step
                    ? 'text-primary font-semibold hover:bg-primary/10'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
                }`}
              >
                {currentStep > s.step ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    currentStep === s.step ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-[#333]'
                  }`}>
                    {s.step}
                  </span>
                )}
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: CAMPAIGN IDENTITY & TARGET PERSONA                                */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Step 1: Campaign Identity & Target Persona</span>
                  <Badge variant="primary" size="sm">Basics</Badge>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Define the name, ICP audience target, and categorization tags for this cold email campaign.
                </p>
              </div>

              <Input
                label="Campaign Name *"
                placeholder="e.g. Q3 EMEA FinTech Founders & CTOs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Target ICP Persona / Audience"
                  placeholder="e.g. Series A Founders, VP of Revenue Operations"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />

                <Input
                  label="Categorization Tags (comma-separated)"
                  placeholder="e.g. Outbound, Tier-1, EMEA, High-Intent"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Campaign Strategic Notes / Objective (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Outbound initiative targeting scaleup CTOs to introduce humanized sending pacing."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2C2C2C] bg-white dark:bg-[#141414] text-xs text-slate-900 dark:text-white focus:border-primary outline-none"
                />
              </div>

              <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span>Next, you'll attach your recipient prospects and configure deduplication in Step 2.</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: LEADS & SOURCING                                                  */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Step 2: Audience & Lead Sourcing</span>
                  <Badge variant="primary" size="sm">Leads Hub</Badge>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Import verified prospect contacts from CSV, Google Sheets, Lead Finder lists, or active CRM leads.
                </p>
              </div>

              {/* Source Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] overflow-x-auto">
                {[
                  { id: 'csv', label: 'CSV Upload', icon: UploadCloud },
                  { id: 'sheets', label: 'Google Sheets', icon: Globe },
                  { id: 'manual', label: 'Manual Paste', icon: Type },
                  { id: 'list', label: 'Lead Finder Lists', icon: Users },
                  { id: 'crm', label: 'CRM Contacts', icon: Flame },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLeadSourceTab(tab.id as any)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                        leadSourceTab === tab.id
                          ? 'bg-white dark:bg-[#242424] text-primary shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {leadSourceTab === 'csv' && (
                <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#333] bg-slate-50 dark:bg-[#181818] text-center space-y-2 cursor-pointer hover:border-primary transition-colors">
                  <UploadCloud className="w-8 h-8 text-primary mx-auto" />
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {csvFileName}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Auto-mapped: Email, First Name, Last Name, Company, Title, LinkedIn • 1,406 records detected
                  </p>
                </div>
              )}

              {leadSourceTab === 'sheets' && (
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A]">
                  <Input
                    label="Google Sheets Shareable URL"
                    placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                  />
                  <span className="text-[10px] text-slate-400">
                    Sheet must have viewer permission. Header row will be automatically parsed into dynamic variables.
                  </span>
                </div>
              )}

              {leadSourceTab === 'manual' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Paste comma-separated leads (Email, First Name, Last Name, Company, Title):
                  </label>
                  <textarea
                    rows={4}
                    value={manualLeadsText}
                    onChange={(e) => setManualLeadsText(e.target.value)}
                    placeholder="sarah.j@cloudscale.ai, Sarah, Jenkins, CloudScale AI, VP Growth"
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[11px] text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              {leadSourceTab === 'list' && (
                <div className="space-y-2">
                  {[
                    { name: 'Q3 Enterprise CTOs (Verified 99%)', count: 1406, date: 'Imported 2 days ago' },
                    { name: 'FinTech Seed/Series A Decision Makers', count: 850, date: 'Imported 5 days ago' },
                    { name: 'US RevOps Directors - High Intent', count: 620, date: 'Imported last week' },
                  ].map((list, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between cursor-pointer hover:border-primary">
                      <div>
                        <strong className="text-slate-900 dark:text-white font-bold">{list.name}</strong>
                        <div className="text-[11px] text-slate-400 font-mono">{list.date}</div>
                      </div>
                      <Badge variant="primary" size="sm">{list.count} Leads</Badge>
                    </div>
                  ))}
                </div>
              )}

              {leadSourceTab === 'crm' && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Active CRM Qualified Leads</span>
                    <p className="text-[11px] text-slate-400">Pulls contacts currently tagged as "Lead" or "Working Pipeline".</p>
                  </div>
                  <Badge variant="primary" size="sm">{contacts.length} CRM Contacts</Badge>
                </div>
              )}

              {/* Lead Validation Summary Card */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#2A2A2A] space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                    Lead Verification & Hygiene Summary
                  </span>
                  <Badge variant="emerald" size="sm">✓ Ready for Outbound</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#242424]">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Total</div>
                    <div className="font-black text-slate-900 dark:text-white font-mono mt-0.5">1,406</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <div className="text-[10px] uppercase font-bold">Valid</div>
                    <div className="font-black font-mono mt-0.5">1,382</div>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                    <div className="text-[10px] uppercase font-bold">Duplicates</div>
                    <div className="font-black font-mono mt-0.5">18 skipped</div>
                  </div>
                  <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                    <div className="text-[10px] uppercase font-bold">Missing Email</div>
                    <div className="font-black font-mono mt-0.5">6 skipped</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#242424]">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Suppressed</div>
                    <div className="font-black text-slate-900 dark:text-white font-mono mt-0.5">0</div>
                  </div>
                </div>

                {/* Deduplication & Suppression Options */}
                <div className="pt-2 border-t border-slate-100 dark:border-[#222222] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dedupeInCampaign}
                      onChange={(e) => setDedupeInCampaign(e.target.checked)}
                      className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
                    />
                    <span>Skip leads already active in this campaign</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dedupeRecentContacted}
                      onChange={(e) => setDedupeRecentContacted(e.target.checked)}
                      className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
                    />
                    <span>Skip leads contacted in last 30 days</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enforceSuppression}
                      onChange={(e) => setEnforceSuppression(e.target.checked)}
                      className="w-3.5 h-3.5 accent-primary rounded cursor-pointer"
                    />
                    <span>Enforce suppression list (bounces, opt-outs)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: SEQUENCE BUILDER & A/Z VARIANTS                                   */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                    <span>Step 3: Multi-Touch Sequence & A/Z Testing</span>
                    <Badge variant="primary" size="sm">A/Z Testing Active</Badge>
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Create follow-up touches with delay in minutes/hours/days, thread continuation, dynamic spintax, and TRIXIE AI assistance.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddStep}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Follow-Up Touch
                </Button>
              </div>

              {/* Step Navigation Pill Strip */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-[#222222] pb-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {steps.map((s, idx) => (
                    <button
                      key={s.stepNumber}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>Touch #{s.stepNumber}</span>
                      {s.delayDays > 0 && <span className="text-[10px] opacity-80">(+{s.delayDays}d)</span>}
                      {s.variants && s.variants.length > 1 && (
                        <span className="px-1 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-400 font-mono">
                          {s.variants.length} vars
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(activeStepIndex)}
                    className="text-[11px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                    title="Delete current step"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Touch</span>
                  </button>
                )}
              </div>

              {/* Embedded Sequence Step Editor */}
              {steps[activeStepIndex] && (
                <SequenceStepEditor
                  step={steps[activeStepIndex]}
                  stepIndex={activeStepIndex}
                  totalSteps={steps.length}
                  onChange={(updatedStep) => {
                    setSteps(prev => {
                      const n = [...prev];
                      n[activeStepIndex] = updatedStep;
                      return n;
                    });
                  }}
                />
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: SENDING ACCOUNTS & ROUTING                                        */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                    <span>Step 4: Sending Accounts & Routing Strategy</span>
                    <Badge variant="primary" size="sm">{selectedMailboxIds.length} Selected</Badge>
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Select rotating mailboxes from your fleet. Distribute dispatch load and match sender ESP to recipient domain.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMailboxIds(mailboxes.filter(m => m.healthScore >= 70).map(m => m.id))}
                  >
                    Select All Healthy ({mailboxes.filter(m => m.healthScore >= 70).length})
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsConnectMailboxModalOpen(true)}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Connect Mailbox
                  </Button>
                </div>
              </div>

              {/* Mailbox Selection Pool */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {mailboxes.map((mbx) => {
                  const isSelected = selectedMailboxIds.includes(mbx.id);
                  const isEligible = mbx.healthScore >= 70;
                  return (
                    <div
                      key={mbx.id}
                      onClick={() => toggleMailboxSelect(mbx.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-primary/10 border-primary/40 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#262626] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-xs font-mono">{mbx.email}</div>
                          <div className="text-[10px] text-slate-400">
                            {mbx.provider} • Daily Cap: {mbx.dailyCap} sends • Warmup: {mbx.warmupStatus || 'Active'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={isEligible ? 'emerald' : 'amber'} size="sm">
                          Health {mbx.healthScore}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Provider Matching & ESP Routing Matrix */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#262626] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block text-xs">
                      Smart Provider Matching (Google $\to$ Google, Microsoft $\to$ Microsoft)
                    </strong>
                    <span className="text-[11px] text-slate-400">
                      Routes emails through matching ESPs for higher primary inbox landing rates.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={providerMatching !== 'disabled'}
                    onChange={(e) => setProviderMatching(e.target.checked ? 'prefer' : 'disabled')}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                </div>

                {providerMatching !== 'disabled' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/70 dark:border-[#242424] text-[11px]">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#121212] border border-slate-200/60 dark:border-[#282828] flex items-center justify-between">
                      <span>Google Recipient:</span>
                      <select
                        value={espRoutingGoogle}
                        onChange={(e) => setEspRoutingGoogle(e.target.value as any)}
                        className="bg-transparent font-bold text-primary outline-none"
                      >
                        <option value="prefer">Prefer Google Sender</option>
                        <option value="allow">Allow Any Sender</option>
                        <option value="avoid">Avoid Google</option>
                      </select>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-[#121212] border border-slate-200/60 dark:border-[#282828] flex items-center justify-between">
                      <span>Microsoft Recipient:</span>
                      <select
                        value={espRoutingMicrosoft}
                        onChange={(e) => setEspRoutingMicrosoft(e.target.value as any)}
                        className="bg-transparent font-bold text-primary outline-none"
                      >
                        <option value="prefer">Prefer Microsoft Sender</option>
                        <option value="allow">Allow Any Sender</option>
                        <option value="avoid">Avoid Microsoft</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-[#242424]">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block text-xs">Sticky Sender</strong>
                    <span className="text-[11px] text-slate-400">Maintains conversation continuity with the same sender address.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stickySender}
                    onChange={(e) => setStickySender(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: SCHEDULE & SENDING CAPACITY FORECAST                              */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Step 5: Sending Schedule & Capacity Forecast</span>
                  <Badge variant="primary" size="sm">Pacing Engine</Badge>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Configure sending windows, daily caps, company limits, and inspect live throughput forecasts.
                </p>
              </div>

              {/* Active Dispatch Days (Centered layout) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Active Dispatch Weekdays
                </label>
                <div className="grid grid-cols-7 gap-1.5">
                  {Object.keys(sendingDays).map((day) => {
                    const active = (sendingDays as any)[day];
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSendingDays(prev => ({ ...prev, [day]: !active }))}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                          active 
                            ? 'bg-primary text-primary-foreground shadow-xs' 
                            : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Window & Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Daily Start Time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <Input
                  label="Daily End Time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />

                <Select
                  label="Timezone Strategy"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value as any)}
                  options={[
                    { value: 'lead_local', label: 'Lead Local Timezone (Auto)' },
                    { value: 'workspace', label: 'Workspace Timezone (PST)' },
                    { value: 'est', label: 'US Eastern (EST)' },
                    { value: 'utc', label: 'UTC' },
                  ]}
                />
              </div>

              {/* Campaign Limits & Company Send Cap */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Campaign Daily Limit"
                  type="number"
                  value={campaignDailyLimit}
                  onChange={(e) => setCampaignDailyLimit(Number(e.target.value))}
                  min={10}
                  max={1000}
                />

                <Input
                  label="Mailbox Daily Cap"
                  type="number"
                  value={mailboxDailyCap}
                  onChange={(e) => setMailboxDailyCap(Number(e.target.value))}
                  min={5}
                  max={100}
                />

                <Input
                  label="Max Leads / Company / Day"
                  type="number"
                  value={companySendLimit}
                  onChange={(e) => setCompanySendLimit(Number(e.target.value))}
                  min={1}
                  max={10}
                />
              </div>

              {/* Sending Capacity Forecast Panel */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span>Outtricks Sending Capacity Forecast</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Live calculation</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#121212] border border-slate-200/70 dark:border-[#242424]">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Mailboxes</div>
                    <div className="font-black text-slate-900 dark:text-white font-mono mt-0.5">
                      {selectedMailboxIds.length} accounts
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#121212] border border-slate-200/70 dark:border-[#242424]">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Max Combined Cap</div>
                    <div className="font-black text-primary font-mono mt-0.5">
                      {combinedMailboxCapacity} / day
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#121212] border border-slate-200/70 dark:border-[#242424]">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Audience</div>
                    <div className="font-black text-slate-900 dark:text-white font-mono mt-0.5">
                      {audienceCount.toLocaleString()} leads
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <div className="text-[10px] uppercase font-bold">Est. Duration</div>
                    <div className="font-black font-mono mt-0.5">
                      ≈ {estimatedSendingDays} sending days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 6: OPTIONS & SAFEGUARDS (GROUPED)                                    */}
          {/* ========================================================================= */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Step 6: Campaign Options & Safeguards</span>
                  <Badge variant="primary" size="sm">Safeguards</Badge>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Grouped controls for reply handling, open/click tracking, bounce safeguards, and compliance.
                </p>
              </div>

              {/* Group 1: Reply Handling */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#282828] space-y-2.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Group 1: Reply & Intent Handling
                </span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Stop cadence when lead replies</strong>
                      <span className="text-[11px] text-slate-500">Halts all further touches upon receipt of any reply.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={stopOnReply}
                      onChange={(e) => setStopOnReply(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Stop cadence when meeting is booked</strong>
                      <span className="text-[11px] text-slate-500">Auto-detects booking link confirmations (Cal.com / Calendly).</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={stopOnMeeting}
                      onChange={(e) => setStopOnMeeting(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Hold cadence on Out-of-Office / Vacation reply</strong>
                      <span className="text-[11px] text-slate-500">Holds sequence automatically until prospect return date.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={stopOnAutoReply}
                      onChange={(e) => setStopOnAutoReply(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Group 2: Tracking & Deliverability */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#282828] space-y-2.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Group 2: Tracking & Delivery Format
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#242424] flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Track Email Opens</strong>
                      <span className="text-[10px] text-slate-400">1x1 tracking pixel</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={trackOpens}
                      onChange={(e) => setTrackOpens(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/70 dark:border-[#242424] flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Track Link Clicks</strong>
                      <span className="text-[10px] text-slate-400">Custom tracking domain</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={trackClicks}
                      onChange={(e) => setTrackClicks(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </div>
                </div>

                <Input
                  label="Custom Tracking Domain"
                  value={customTrackingDomain}
                  onChange={(e) => setCustomTrackingDomain(e.target.value)}
                />
              </div>

              {/* Group 3: Compliance & Protection */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#282828] space-y-2.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Group 3: Safety & Compliance
                </span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-bold">Bounce Protection Guard</strong>
                      <span className="text-[11px] text-slate-500">Auto-pauses campaign if bounce rate surpasses 4%.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={bounceProtection}
                      onChange={(e) => setBounceProtection(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                  </label>
                  <Input
                    label="Compliance CC / BCC Archive (Optional)"
                    placeholder="compliance-archive@company.com"
                    value={ccBccAddress}
                    onChange={(e) => setCcBccAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 7: PREFLIGHT & LAUNCH READINESS                                      */}
          {/* ========================================================================= */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <span>Step 7: Pre-Flight Review & Launch Readiness</span>
                  <Badge variant="emerald" size="sm">Preflight Inspection</Badge>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Review campaign verification checks. One-click "Fix" buttons jump directly to any item requiring adjustment.
                </p>
              </div>

              {/* Preflight Checks with One-Click Fix Navigation */}
              <div className="space-y-2">
                {preflightChecks.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${
                        item.status === 'ready' ? 'text-emerald-500' : item.status === 'warning' ? 'text-amber-500' : 'text-rose-500'
                      }`} />
                      <div>
                        <strong className="text-slate-900 dark:text-white font-bold">{item.label}</strong>
                        <div className="text-[10px] text-slate-400 font-mono">{item.detail}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={item.status === 'ready' ? 'emerald' : item.status === 'warning' ? 'amber' : 'rose'} size="sm">
                        {item.status.toUpperCase()}
                      </Badge>
                      {item.status !== 'ready' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setCurrentStep(item.stepTarget)}
                          className="text-[10px] font-bold h-7"
                        >
                          Fix Issue
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Test Send Preview Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-950 dark:text-white text-xs">Send Real Test Email</div>
                  <div className="text-[10px] text-slate-400">Preview Touch #1 with dynamic variables populated in your inbox.</div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] text-xs font-mono outline-none"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSendTestEmail}
                    disabled={testSendingState === 'sending'}
                  >
                    {testSendingState === 'sending' ? 'Sending...' : testSendingState === 'sent' ? '✓ Sent' : 'Send Test'}
                  </Button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                <strong>Where you are:</strong> Preflight verification is complete. <strong>What happens next:</strong> Launching will schedule dispatch across {selectedMailboxIds.length} rotating mailboxes and open the Campaign Control Center.
              </div>
            </div>
          )}

          {/* Modal Navigation Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-[#262626]">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setCurrentStep((currentStep - 1) as any)}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back
              </Button>
            ) : (
              <Button type="button" variant="secondary" size="sm" onClick={handleCloseAttempt}>
                Cancel
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={handleSaveDraft}>
                Save as Draft
              </Button>

              {currentStep < 7 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (currentStep === 1 && !name.trim()) {
                      info('Please give your campaign a name before continuing.');
                      return;
                    }
                    setCurrentStep((currentStep + 1) as any);
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleFinalLaunch}
                  disabled={!name.trim() || selectedMailboxIds.length === 0}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Launch Campaign
                </Button>
              )}
            </div>
          </div>

        </div>
      </Modal>

      {/* Draft Protection Confirmation Dialog */}
      {showDraftProtectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Save Unfinished Campaign?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You have unsaved campaign parameters. Would you like to save this campaign as a draft before leaving?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowDraftProtectionModal(false)}>
                Continue Editing
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setShowDraftProtectionModal(false);
                  onClose();
                }}
              >
                Discard
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Nested Connect Mailbox Modal */}
      <ConnectMailboxModal
        isOpen={isConnectMailboxModalOpen}
        onClose={() => setIsConnectMailboxModalOpen(false)}
      />
    </>
  );
};
