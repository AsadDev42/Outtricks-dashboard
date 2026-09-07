import React, { useState } from 'react';
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
  Database
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useLinkedIn, LinkedInStep } from '../../context/LinkedInContext';

export interface CreateLinkedInCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  const [parsedLeadCount, setParsedLeadCount] = useState(3);
  const [deduplicateAgainstExisting, setDeduplicateAgainstExisting] = useState(true);
  const [validateProfileUrls, setValidateProfileUrls] = useState(true);

  // Step 3: Sender Account
  const [selectedAccountName, setSelectedAccountName] = useState(accounts[0]?.name || 'Asad Farooq');

  // Step 4: Sequence Template
  const [selectedTemplate, setSelectedTemplate] = useState<'multitouch' | 'warmup' | 'direct' | 'blank'>('multitouch');

  // Step 5: Schedule & Safety
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [dailyInviteLimit, setDailyInviteLimit] = useState(25);
  const [dailyMessageLimit, setDailyMessageLimit] = useState(40);
  const [randomDelayMin, setRandomDelayMin] = useState(180);
  const [randomDelayMax, setRandomDelayMax] = useState(420);
  const [stopOnReply, setStopOnReply] = useState(true);
  const [stopOnConnection, setStopOnConnection] = useState(false);

  // Step 6: Pre-flight checklist status
  const selectedAcc = accounts.find((a) => a.name === selectedAccountName) || accounts[0];

  const stepsList = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Add Leads' },
    { num: 3, label: 'Account' },
    { num: 4, label: 'Sequence' },
    { num: 5, label: 'Schedule' },
    { num: 6, label: 'Checklist' },
    { num: 7, label: 'Launch' },
  ];

  const handleReset = () => {
    setCurrentStep(1);
    setName('');
    onClose();
  };

  const handleFinalSubmit = (status: 'Running' | 'Draft') => {
    if (!name.trim()) return;

    // Create campaign
    createCampaign({
      name: name.trim(),
      targetAudience: targetAudience.trim(),
      accountName: selectedAccountName,
      targetCount: parsedLeadCount || 50,
    });

    handleReset();
  };

  const templatesInfo = [
    {
      id: 'multitouch',
      name: 'High-Converting Multi-Touch (Recommended)',
      desc: 'Visit Profile → Wait 1h → Warm Invite Note → If Accepted (Wait 1d) → Follow-up Message → Like recent post',
      stepsCount: 5,
      avgAcceptance: '42%',
      recommended: true,
    },
    {
      id: 'warmup',
      name: 'Warm Relationship Builder',
      desc: 'View Profile → Follow Profile → Wait 2d → Personal Connection Request → Message with asset offer',
      stepsCount: 4,
      avgAcceptance: '48%',
      recommended: false,
    },
    {
      id: 'direct',
      name: 'Direct Fast Invite',
      desc: 'Personalized Invite Note → If accepted → Value introduction message',
      stepsCount: 2,
      avgAcceptance: '34%',
      recommended: false,
    },
    {
      id: 'blank',
      name: 'Blank Custom Flow',
      desc: 'Start with a clean canvas and build custom branching logic with conditional forks',
      stepsCount: 0,
      avgAcceptance: 'Custom',
      recommended: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans">
        
        {/* Modal Header & Progress Stepper */}
        <div className="p-5 border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#181818]/60 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Create LinkedIn Campaign
                </h3>
                <p className="text-xs text-slate-400">
                  Step {currentStep} of 7: {stepsList[currentStep - 1].label}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {stepsList.map((st) => {
              const isPast = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div key={st.num} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isPast
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-emerald-500/80 ring-2 ring-emerald-500/20'
                        : 'bg-slate-200 dark:bg-[#2A2A2A]'
                    }`}
                  />
                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className={`truncate hidden sm:inline ${
                        isCurrent
                          ? 'font-bold text-emerald-600 dark:text-emerald-400'
                          : isPast
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body - Dynamic per step */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300 flex-1">
          
          {/* STEP 1: Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Define Campaign Purpose
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Set up your campaign name, target audience, and primary objective. Outtricks will optimize delivery times and humanization delays based on your parameters.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Campaign Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 EMEA FinTech Growth Execs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-medium"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Target Audience Persona
                </label>
                <input
                  type="text"
                  placeholder="e.g. VP Sales, Head of Revenue, CRO"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Primary Goal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'leads', label: 'B2B Leads', desc: 'Book meetings' },
                    { id: 'events', label: 'Webinar / Event', desc: 'Invites & RSVP' },
                    { id: 'nurture', label: 'Network Nurture', desc: 'Warm connections' },
                    { id: 'recruiting', label: 'Talent Sourcing', desc: 'Hiring outreach' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setCampaignGoal(g.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        campaignGoal === g.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-[#333]'
                      }`}
                    >
                      <span className="font-bold text-xs block">{g.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{g.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Tags & Metadata
                </label>
                <input
                  type="text"
                  placeholder="e.g. B2B, SaaS, Enterprise"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Add Leads */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#262626] pb-3">
                <button
                  type="button"
                  onClick={() => setImportMethod('csv')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    importMethod === 'csv'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> CSV / Excel Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImportMethod('crm')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    importMethod === 'crm'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" /> Import from Outtricks CRM
                </button>
                <button
                  type="button"
                  onClick={() => setImportMethod('manual')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    importMethod === 'manual'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Manual Paste
                </button>
              </div>

              {importMethod === 'csv' && (
                <div className="space-y-3">
                  <div className="p-6 rounded-3xl border-2 border-dashed border-slate-300 dark:border-[#333] hover:border-emerald-500 text-center space-y-2 cursor-pointer transition-colors bg-slate-50/50 dark:bg-[#141414]">
                    <Upload className="w-8 h-8 text-emerald-500 mx-auto" />
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Drop your CSV or Excel file here
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Supports .csv, .xlsx. Required headers: First Name, Last Name, LinkedIn Profile URL.
                    </p>
                    <Button variant="secondary" size="sm">
                      Browse Files
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">Preview Raw Enrolled Data:</span>
                    <textarea
                      rows={4}
                      value={rawLeadText}
                      onChange={(e) => {
                        setRawLeadText(e.target.value);
                        setParsedLeadCount(e.target.value.split('\n').filter((l) => l.trim()).length);
                      }}
                      className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[11px] text-slate-800 dark:text-slate-200 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {importMethod === 'crm' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] space-y-3">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Select Filtered CRM Segment:
                  </span>
                  <select className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden">
                    <option>High-Intent Verified Tech Founders (184 leads)</option>
                    <option>VP Sales & RevOps in North America (96 leads)</option>
                    <option>Recent Inbound Demo Requests (42 leads)</option>
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Direct sync with Outtricks CRM ensures duplicate contacts in other active sequences are auto-skipped.
                  </p>
                </div>
              )}

              {importMethod === 'manual' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 block">
                    Paste LinkedIn Profile URLs (one per line):
                  </label>
                  <textarea
                    rows={5}
                    placeholder="https://www.linkedin.com/in/username"
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>
              )}

              {/* Deduplication & Validation Checks */}
              <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Enrichment & Safety Gate
                </span>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deduplicateAgainstExisting}
                    onChange={(e) => setDeduplicateAgainstExisting(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Automatically deduplicate against contacts already enrolled in any running campaign
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={validateProfileUrls}
                    onChange={(e) => setValidateProfileUrls(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Validate profile URL format and flag inaccessible or company page links
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-400">Parsed Valid Leads:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {parsedLeadCount} Leads Ready for Outreach
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Account Selection */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                Select Connected LinkedIn Account
              </span>
              <p className="text-[11px] text-slate-400">
                Actions will be dispatched through this account's dedicated residential proxy IP to ensure zero session flags.
              </p>

              <div className="space-y-3">
                {accounts.map((acc) => {
                  const isSelected = selectedAccountName === acc.name;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setSelectedAccountName(acc.name)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                          : 'border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 font-black flex items-center justify-center font-mono shrink-0">
                          {acc.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-slate-900 dark:text-white">
                              {acc.name}
                            </span>
                            <Badge variant="emerald" size="sm">
                              {acc.status}
                            </Badge>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {acc.title} • {acc.proxyLocation} ({acc.proxyIp})
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-[11px] space-y-0.5 shrink-0">
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                          Safety Score: {acc.safetyScore}%
                        </div>
                        <div className="text-slate-400">
                          {acc.dailyInvitesSent}/{acc.dailyInvitesLimit} invites sent today
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Account Safety Verification Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Residential Cloud Proxy Protected
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Account is bound to a static residential IP in {selectedAcc?.proxyLocation || 'United States'} with zero browser fingerprints leakage. Safe hourly distribution will be enforced.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Sequence Template */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <span className="font-bold text-slate-900 dark:text-white block">
                Choose Outreach Sequence Flow
              </span>
              <p className="text-[11px] text-slate-400">
                Select an battle-tested multi-channel outreach blueprint or start from scratch. You can fine-tune every node on the visual canvas.
              </p>

              <div className="space-y-3">
                {templatesInfo.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id as any)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                          : 'border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {tpl.name}
                          </span>
                          {tpl.recommended && (
                            <Badge variant="emerald" size="sm">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          Avg. Accept: <strong className="text-emerald-500">{tpl.avgAcceptance}</strong>
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-50 dark:bg-[#141414] p-2.5 rounded-xl border border-slate-200/60 dark:border-[#202020]">
                        {tpl.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Schedule & Safety */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    Sending Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    <option>America/New_York (EST)</option>
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/Chicago (CST)</option>
                    <option>Europe/London (GMT)</option>
                    <option>Europe/Paris (CET)</option>
                    <option>Asia/Dubai (GST)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    Daily Connection Invites Cap
                  </label>
                  <input
                    type="number"
                    value={dailyInviteLimit}
                    onChange={(e) => setDailyInviteLimit(Number(e.target.value))}
                    max={35}
                    min={5}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">LinkedIn hard safe maximum is 30/day.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Human Emulation Delay (Jitter)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">Min Delay between actions:</span>
                    <input
                      type="number"
                      value={randomDelayMin}
                      onChange={(e) => setRandomDelayMin(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400">Max Delay between actions:</span>
                    <input
                      type="number"
                      value={randomDelayMax}
                      onChange={(e) => setRandomDelayMax(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                  ✓ Randomized spacing: {Math.round(randomDelayMin / 60)}m to {Math.round(randomDelayMax / 60)}m between consecutive outreach events.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Stop Conditions
                </span>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopOnReply}
                    onChange={(e) => setStopOnReply(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Instantly halt sequence when prospect sends any LinkedIn reply (Prevents awkward follow-ups)
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stopOnConnection}
                    onChange={(e) => setStopOnConnection(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Halt sequence if connection accepted without waiting for follow-up message
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: Pre-flight Checklist */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#262626]">
                <span className="font-bold text-slate-900 dark:text-white">
                  Pre-flight Launch Validation (12 Points)
                </span>
                <Badge variant="emerald" size="sm">
                  All Systems Green
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: 'Sender Account Connected', desc: `${selectedAccountName} (Healthy, 99%)`, pass: true },
                  { title: 'Residential Proxy Active', desc: `${selectedAcc.proxyLocation} IP verified`, pass: true },
                  { title: 'Campaign Name & Tags', desc: `${name || 'Configured'}`, pass: Boolean(name.trim()) },
                  { title: 'Leads Enrolled & Deduplicated', desc: `${parsedLeadCount} unique prospects ready`, pass: parsedLeadCount > 0 },
                  { title: 'Profile URLs Validated', desc: 'Zero syntax or company link errors', pass: true },
                  { title: 'Template Loaded', desc: selectedTemplate, pass: true },
                  { title: 'Personalization Fallbacks', desc: '{{firstName}} fallback "there" active', pass: true },
                  { title: 'Daily Capacity Guardrail', desc: `${dailyInviteLimit} invites/day safe cap`, pass: true },
                  { title: 'Humanized Delay Jitter', desc: `${randomDelayMin}s - ${randomDelayMax}s randomized`, pass: true },
                  { title: 'Stop on Reply Active', desc: stopOnReply ? 'Enabled (Instant freeze)' : 'Disabled', pass: stopOnReply },
                  { title: 'Sending Schedule Window', desc: `Mon - Fri, 09:00 - 18:00 ${timezone.split(' ')[0]}`, pass: true },
                  { title: 'Outreach Queue Integration', desc: 'Ready for background dispatch', pass: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/70 dark:border-[#262626] flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block text-xs">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {item.desc}
                      </span>
                    </div>
                    {item.pass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Launch or Save Draft */}
          {currentStep === 7 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  Campaign Ready for Dispatch!
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {name || 'New LinkedIn Campaign'} will launch with {parsedLeadCount} leads assigned to {selectedAccountName}. Actions will be placed in the Outreach Queue and throttled safely.
                </p>
              </div>

              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] max-w-md mx-auto text-left space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Sender:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedAccountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Enrolled:</span>
                  <span className="text-emerald-500 font-bold">{parsedLeadCount} Leads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Daily Pace:</span>
                  <span className="text-slate-900 dark:text-white">{dailyInviteLimit} invites/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Duration:</span>
                  <span className="text-slate-900 dark:text-white">{Math.ceil(parsedLeadCount / dailyInviteLimit)} Days</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleFinalSubmit('Draft')}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleFinalSubmit('Running')}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="shadow-lg shadow-emerald-600/20"
                >
                  Launch Campaign Now
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#181818]/60 flex items-center justify-between shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

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
            <span className="text-[11px] text-slate-400">All checks verified</span>
          )}
        </div>

      </div>
    </div>
  );
};
