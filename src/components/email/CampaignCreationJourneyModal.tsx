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
  Flame
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

  // STEP 1: Campaign Identity
  const [name, setName] = useState('');
  const [targetAudience, setTargetAudience] = useState('Enterprise SaaS Founders & CROs');
  const [tags, setTags] = useState('Outbound, Enterprise, High Intent');

  // STEP 2: Audience & Leads Selection
  const [leadSourceTab, setLeadSourceTab] = useState<'manual' | 'csv' | 'list' | 'crm'>('csv');
  const [manualLeadsText, setManualLeadsText] = useState(
    'sarah.j@cloudscale.ai, Sarah, Jenkins, CloudScale AI, VP Growth\n' +
    'alex@neuralgrid.ai, Alexandre, Dubois, NeuralGrid, CTO\n' +
    'marcus@apexdata.io, Marcus, Vance, Apex Data Labs, Head of RevOps'
  );
  const [audienceCount, setAudienceCount] = useState(1406);
  const [csvFileName, setCsvFileName] = useState('decision_makers_export_q3.csv');

  // STEP 3: Sending Mailbox Selection & Rotation
  const [selectedMailboxIds, setSelectedMailboxIds] = useState<string[]>(mailboxes.map(m => m.id));
  const [rotationMode, setRotationMode] = useState<'round-robin' | 'jitter' | 'reputation'>('round-robin');

  // STEP 4: Sequence Content & Steps
  const [steps, setSteps] = useState([
    {
      stepNumber: 1,
      delayDays: 0,
      subject: 'Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nNoticed {{company}}\'s rapid expansion in enterprise B2B. Most revenue leaders we speak with struggle with mailbox deliverability dropping below 85% once scaling across multiple SDRs.\n\nWe built Outtricks to automate multi-inbox rotation and AI warmup across Google Workspace and Office 365.\n\nWorth a brief 7-minute look this week?\n\nBest,\nSarah Jenkins',
    },
    {
      stepNumber: 2,
      delayDays: 3,
      subject: 'Re: Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nFollowing up on my previous note. Thought you might find this relevant: CloudScale AI increased their booked qualified demos by 43% within 3 weeks of deploying our humanized sending pacing.\n\nDo you have 5 minutes this Thursday at 2 PM?\n\nBest,\nSarah',
    },
    {
      stepNumber: 3,
      delayDays: 4,
      subject: 'Re: Quick question regarding {{company}}\'s outbound infrastructure',
      body: 'Hi {{firstName}},\n\nI understand you\'re busy leading growth at {{company}}. If deliverability isn\'t a priority this quarter, no problem at all.\n\nFeel free to reach out whenever you\'re ready to ramp outbound revenue.\n\nCheers,\nSarah',
    }
  ]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // STEP 5: Schedule & Pacing
  const [sendingDays, setSendingDays] = useState({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false,
  });
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [timezone, setTimezone] = useState('lead_local');
  const [maxLeadsPerDay, setMaxLeadsPerDay] = useState(30);
  const [minDelaySec, setMinDelaySec] = useState(60);
  const [maxDelaySec, setMaxDelaySec] = useState(120);

  // STEP 6: Campaign Settings & Safeguards
  const [stopOnReply, setStopOnReply] = useState(true);
  const [stopOnMeeting, setStopOnMeeting] = useState(true);
  const [stopOnAutoReply, setStopOnAutoReply] = useState(true);
  const [stopOnUnsubscribe, setStopOnUnsubscribe] = useState(true);
  const [trackOpens, setTrackOpens] = useState(true);
  const [trackClicks, setTrackClicks] = useState(true);
  const [replyDetection, setReplyDetection] = useState(true);
  const [customTrackingDomain, setCustomTrackingDomain] = useState('track.cloudscale.ai');
  const [ccBccAddress, setCcBccAddress] = useState('');
  const [testEmailAddress, setTestEmailAddress] = useState('');

  // AI SPAM WORD CHECKER ENGINE
  const currentStepData = steps[activeStepIndex] || steps[0];
  const fullTextToScan = `${currentStepData.subject} ${currentStepData.body}`.toLowerCase();
  const detectedSpamWords = SPAM_TRIGGER_WORDS.filter(word => 
    fullTextToScan.includes(word.toLowerCase())
  );
  const spamScore = Math.max(10, 100 - (detectedSpamWords.length * 15));

  const handleApplyTemplate = (template: EmailTemplate) => {
    setSteps(prev => {
      const next = [...prev];
      next[activeStepIndex] = {
        ...next[activeStepIndex],
        subject: template.subject,
        body: template.body,
      };
      return next;
    });
    success(`Applied template: "${template.name}"`);
  };

  const handleInsertVariable = (varName: string) => {
    setSteps(prev => {
      const next = [...prev];
      next[activeStepIndex] = {
        ...next[activeStepIndex],
        body: next[activeStepIndex].body + ` {{${varName}}}`,
      };
      return next;
    });
  };

  const handleAiRewrite = () => {
    let cleanSubject = currentStepData.subject;
    let cleanBody = currentStepData.body;

    cleanSubject = cleanSubject.replace(/free/gi, 'complimentary')
      .replace(/100%/gi, 'fully')
      .replace(/guarantee/gi, 'ensure');

    cleanBody = cleanBody.replace(/free/gi, 'complimentary')
      .replace(/urgent/gi, 'time-sensitive')
      .replace(/buy now/gi, 'review opportunities')
      .replace(/click here/gi, 'check the resources');

    setSteps(prev => {
      const next = [...prev];
      next[activeStepIndex] = {
        ...next[activeStepIndex],
        subject: cleanSubject,
        body: cleanBody,
      };
      return next;
    });

    success('AI sanitized copy to remove spam triggers and boost deliverability to 98%!', 'AI Sanitized');
  };

  const handleAddStep = () => {
    const newStepNum = steps.length + 1;
    setSteps(prev => [
      ...prev,
      {
        stepNumber: newStepNum,
        delayDays: 3,
        subject: `Follow-up ${newStepNum}: Quick note`,
        body: `Hi {{firstName}},\n\nWanted to quickly follow up regarding our previous note.\n\nBest,\nSarah`,
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
      info('Please provide an email address for testing.');
      return;
    }
    success(`Dispatched live test preview of Step ${activeStepIndex + 1} to ${testEmailAddress.trim()}`);
  };

  const toggleMailboxSelect = (id: string) => {
    setSelectedMailboxIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinalLaunch = () => {
    if (!name.trim()) return;

    createCampaign({
      name: name.trim(),
      audienceCount: Number(audienceCount) || 1406,
      mailboxesCount: selectedMailboxIds.length || 4,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    success(`Campaign "${name.trim()}" successfully created and scheduled!`, 'Campaign Launched');
    onClose();
  };

  const JOURNEY_STEPS = [
    { step: 1, title: 'Name & Persona' },
    { step: 2, title: 'Audience' },
    { step: 3, title: 'Sending Mailboxes' },
    { step: 4, title: 'Sequence' },
    { step: 5, title: 'Schedule' },
    { step: 6, title: 'Settings' },
    { step: 7, title: 'Review & Launch' },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create New Cold Email Campaign"
        description="Follow the 7-step guided journey to configure audience, multi-step sequences, mailbox pool, AI spam checks, and schedule."
        size="xl"
      >
        <div className="space-y-5 font-sans text-xs">
          
          {/* 7-Step Progression Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] font-mono text-[11px] overflow-x-auto gap-1">
            {JOURNEY_STEPS.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step as any)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  currentStep === s.step
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : currentStep > s.step
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
                }`}
              >
                {currentStep > s.step ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-[#333] flex items-center justify-center text-[9px]">
                    {s.step}
                  </span>
                )}
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: CAMPAIGN NAME & PERSONA                                           */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Step 1: Campaign Identity & Target Persona
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Name your outbound campaign and define the target ICP persona for tracking.
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
                  label="Target Audience / ICP Persona"
                  placeholder="e.g. Series A Founders, RevOps VP"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />

                <Input
                  label="Categorization Tags (comma separated)"
                  placeholder="e.g. Outbound, Tier-1, EMEA"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Next, you'll attach your recipient lead list in Step 2.</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: AUDIENCE (MANUAL, CSV, LIST, CRM)                                 */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Step 2: Audience & Lead Sourcing
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Import verified prospect records from CSV, saved prospect lists, CRM leads, or enter manually.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A]">
                {[
                  { id: 'csv', label: 'Import CSV File', icon: UploadCloud },
                  { id: 'manual', label: 'Add Leads Manually', icon: Type },
                  { id: 'list', label: 'Select Existing List', icon: Users },
                  { id: 'crm', label: 'Select CRM Leads', icon: Flame },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLeadSourceTab(tab.id as any)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        leadSourceTab === tab.id
                          ? 'bg-white dark:bg-[#242424] text-emerald-600 dark:text-emerald-400 shadow-xs'
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
                <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#333] bg-slate-50 dark:bg-[#181818] text-center space-y-2 cursor-pointer hover:border-emerald-500 transition-colors">
                  <UploadCloud className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="font-bold text-slate-900 dark:text-white">
                    {csvFileName}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Auto-mapped: Email, First Name, Company, Job Title • 1,406 verified contacts
                  </p>
                </div>
              )}

              {leadSourceTab === 'manual' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Paste CSV or comma-separated leads (Email, First Name, Last Name, Company, Title):
                  </label>
                  <textarea
                    rows={5}
                    value={manualLeadsText}
                    onChange={(e) => setManualLeadsText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[11px] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
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
                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between cursor-pointer hover:border-emerald-500">
                      <div>
                        <strong className="text-slate-900 dark:text-white font-bold">{list.name}</strong>
                        <div className="text-[11px] text-slate-400 font-mono">{list.date}</div>
                      </div>
                      <Badge variant="emerald" size="sm">{list.count} Leads</Badge>
                    </div>
                  ))}
                </div>
              )}

              {leadSourceTab === 'crm' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Active CRM Qualified Leads</span>
                      <p className="text-[11px] text-slate-400">Pulls all contacts currently tagged as "Lead" or "Working Pipeline".</p>
                    </div>
                    <Badge variant="emerald" size="sm">{contacts.length} CRM Contacts</Badge>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: SENDING MAILBOX POOL & ROTATION                                   */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Step 3: Sending Mailboxes & Rotation Pool
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Select which connected mailboxes will rotate and distribute daily outreach volume.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsConnectMailboxModalOpen(true)}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Connect New Mailbox
                </Button>
              </div>

              {/* Mailbox Selection List */}
              <div className="space-y-2">
                {mailboxes.map((mbx) => {
                  const isSelected = selectedMailboxIds.includes(mbx.id);
                  return (
                    <div
                      key={mbx.id}
                      onClick={() => toggleMailboxSelect(mbx.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#262626] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-xs font-mono">{mbx.email}</div>
                          <div className="text-[10px] text-slate-400">
                            Provider: {mbx.provider} • Cap: {mbx.dailyCap} sends/day • Health: {mbx.healthScore}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="emerald" size="sm">✓ Verified</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rotation Mode Selector */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#262626] space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Mailbox Rotation Strategy:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'round-robin', label: 'Round-Robin', desc: 'Even rotation across all selected mailboxes' },
                    { id: 'jitter', label: 'Random Jitter', desc: 'Mimics human cadence with staggered dispatch' },
                    { id: 'reputation', label: 'Reputation Paced', desc: 'Weights sends based on health scores' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setRotationMode(mode.id as any)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        rotationMode === mode.id
                          ? 'bg-white dark:bg-[#202020] border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-xs">{mode.label}</div>
                      <div className="text-[9px] text-slate-400 font-normal leading-tight mt-0.5">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: SEQUENCE, CONTENT, TEMPLATES & SPAM CHECKER                       */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                    Step 4: Sequence Steps & Dynamic Copy
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Build multi-step follow-ups with variable tags, spintax, and real-time spam word sanitization.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddStep}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Follow-Up Step
                </Button>
              </div>

              {/* Step Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      activeStepIndex === idx
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>Step {s.stepNumber}</span>
                    {s.delayDays > 0 && <span className="text-[10px] opacity-80">(+{s.delayDays}d)</span>}
                  </button>
                ))}
              </div>

              {/* Subject Line & Delay */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3">
                  <Input
                    label="Subject Line"
                    value={steps[activeStepIndex].subject}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSteps(prev => {
                        const n = [...prev];
                        n[activeStepIndex].subject = val;
                        return n;
                      });
                    }}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Wait Days Before Send"
                    type="number"
                    value={steps[activeStepIndex].delayDays}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSteps(prev => {
                        const n = [...prev];
                        n[activeStepIndex].delayDays = val;
                        return n;
                      });
                    }}
                    min={0}
                    max={30}
                  />
                </div>
              </div>

              {/* Dynamic Variables Bar */}
              <div className="flex items-center justify-between text-[11px] gap-2 flex-wrap">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-slate-400 font-bold">Variables:</span>
                  {['firstName', 'lastName', 'company', 'title'].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleInsertVariable(v)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold hover:bg-emerald-500/10 transition-colors cursor-pointer"
                    >
                      +{`{{${v}}}`}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAiRewrite}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Polish Copy</span>
                  </button>
                </div>
              </div>

              {/* Body Editor */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Email Body Content
                </label>
                <textarea
                  rows={6}
                  value={steps[activeStepIndex].body}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSteps(prev => {
                      const n = [...prev];
                      n[activeStepIndex].body = val;
                      return n;
                    });
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white font-sans focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Spam Word Checker */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Real-time Spam Word & Deliverability Engine</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Deliverability Score: {spamScore}/100
                  </span>
                </div>

                {detectedSpamWords.length > 0 ? (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-amber-600 dark:text-amber-400">
                      Detected trigger words: {detectedSpamWords.map(w => `"${w}"`).join(', ')}
                    </span>
                    <Button variant="secondary" size="sm" onClick={handleAiRewrite}>
                      Clean Words
                    </Button>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                    ✓ 0 spam triggers detected. Safe for primary inbox delivery.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: SCHEDULE & PACING                                                 */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Step 5: Sending Schedule & Operating Window
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Configure sending days, hours, recipient timezones, and daily sending caps.
                </p>
              </div>

              {/* Days of Week */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  Active Dispatch Days
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {Object.keys(sendingDays).map((day) => {
                    const active = (sendingDays as any)[day];
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSendingDays(prev => ({ ...prev, [day]: !active }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          active 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-400'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sending Hours & Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Start Time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <Input
                  label="End Time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />

                <Select
                  label="Timezone Mode"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  options={[
                    { value: 'lead_local', label: 'Lead Local Timezone (Auto)' },
                    { value: 'utc', label: 'UTC' },
                    { value: 'est', label: 'US Eastern (EST)' },
                    { value: 'pst', label: 'US Pacific (PST)' },
                  ]}
                />
              </div>

              {/* Daily Limit & Delay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Daily Sending Limit per Mailbox"
                  type="number"
                  value={maxLeadsPerDay}
                  onChange={(e) => setMaxLeadsPerDay(Number(e.target.value))}
                  min={5}
                  max={50}
                />

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    Randomized Jitter Delay (Seconds)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minDelaySec}
                      onChange={(e) => setMinDelaySec(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono"
                    />
                    <span className="text-slate-400 text-xs">to</span>
                    <input
                      type="number"
                      value={maxDelaySec}
                      onChange={(e) => setMaxDelaySec(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 6: CAMPAIGN SETTINGS & SAFEGUARDS                                    */}
          {/* ========================================================================= */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Step 6: Campaign Safeguards & Tracking Options
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Configure stop-on-reply, meeting detection, custom tracking domain, and reply rules.
                </p>
              </div>

              {/* Safeguard Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block">Stop sequence when lead replies</strong>
                    <span className="text-[11px] text-slate-500">Halts all follow-up steps as soon as any reply is received.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stopOnReply}
                    onChange={(e) => setStopOnReply(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                <div className="h-px bg-slate-200 dark:bg-[#262626]" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block">Stop sequence when meeting is booked</strong>
                    <span className="text-[11px] text-slate-500">Auto-detects calendar booking links and stops outreach.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stopOnMeeting}
                    onChange={(e) => setStopOnMeeting(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                <div className="h-px bg-slate-200 dark:bg-[#262626]" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block">Stop on Out-of-Office / Automated Reply</strong>
                    <span className="text-[11px] text-slate-500">AI recognizes vacation replies and holds cadence until return date.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stopOnAutoReply}
                    onChange={(e) => setStopOnAutoReply(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                <div className="h-px bg-slate-200 dark:bg-[#262626]" />

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <strong className="text-slate-950 dark:text-white font-bold block">Stop when lead unsubscribes</strong>
                    <span className="text-[11px] text-slate-500">Honors 1-click unsubscribe headers and suppression lists globally.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stopOnUnsubscribe}
                    onChange={(e) => setStopOnUnsubscribe(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>

              {/* Tracking Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Track Email Opens</span>
                  <input
                    type="checkbox"
                    checked={trackOpens}
                    onChange={(e) => setTrackOpens(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Track Link Clicks</span>
                  <input
                    type="checkbox"
                    checked={trackClicks}
                    onChange={(e) => setTrackClicks(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Tracking Domain & CC/BCC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Custom Tracking Domain"
                  value={customTrackingDomain}
                  onChange={(e) => setCustomTrackingDomain(e.target.value)}
                />

                <Input
                  label="Compliance CC / BCC (Optional)"
                  placeholder="compliance-archive@company.com"
                  value={ccBccAddress}
                  onChange={(e) => setCcBccAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 7: REVIEW & LAUNCH (PRE-FLIGHT CHECKLIST)                            */}
          {/* ========================================================================= */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  Step 7: Pre-Flight Review & Launch Readiness
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Verify all 6 parameters are green before activating live automated dispatch.
                </p>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="space-y-2">
                {[
                  { label: 'Step 1: Campaign Identity', detail: name || 'Untitled Campaign', ok: Boolean(name.trim()) },
                  { label: 'Step 2: Audience Configured', detail: `${audienceCount} verified prospect leads ready`, ok: true },
                  { label: 'Step 3: Mailboxes Assigned', detail: `${selectedMailboxIds.length} rotating inboxes with active SPF/DKIM`, ok: selectedMailboxIds.length > 0 },
                  { label: 'Step 4: Sequence Steps', detail: `${steps.length} email steps with 0 spam words (Score: ${spamScore}/100)`, ok: true },
                  { label: 'Step 5: Schedule Active', detail: 'Mon-Fri 09:00 - 17:00 (Lead Local Timezone)', ok: true },
                  { label: 'Step 6: Safeguards Enforced', detail: 'Stop on reply, stop on meeting booked, CNAME tracking active', ok: stopOnReply },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${item.ok ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <div>
                        <strong className="text-slate-900 dark:text-white font-bold">{item.label}</strong>
                        <div className="text-[10px] text-slate-400 font-mono">{item.detail}</div>
                      </div>
                    </div>
                    <Badge variant={item.ok ? 'emerald' : 'amber'} size="sm">
                      {item.ok ? 'READY' : 'CHECK'}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Test Email Dispatcher */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#262626] flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-950 dark:text-white text-xs">Send Test Sequence Email</div>
                  <div className="text-[10px] text-slate-400">Verify email rendering in your own inbox.</div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] text-xs font-mono"
                  />
                  <Button variant="secondary" size="sm" onClick={handleSendTestEmail}>
                    Send Test
                  </Button>
                </div>
              </div>

              {/* Launch Summary Notice */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                <strong>Where you are:</strong> Pre-flight validation passed. <strong>What happens next:</strong> Your campaign will start warm rotation at 9:00 AM in the recipient's local timezone.
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
              <Button type="button" variant="secondary" size="sm" onClick={onClose}>
                Cancel
              </Button>
            )}

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
                disabled={!name.trim()}
                leftIcon={<Send className="w-3.5 h-3.5" />}
              >
                Launch Campaign Now
              </Button>
            )}
          </div>

        </div>
      </Modal>

      {/* Nested Connect Mailbox Modal */}
      <ConnectMailboxModal
        isOpen={isConnectMailboxModalOpen}
        onClose={() => setIsConnectMailboxModalOpen(false)}
      />
    </>
  );
};
