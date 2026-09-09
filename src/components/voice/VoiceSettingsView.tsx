import React, { useState } from 'react';
import { 
  Settings, 
  Phone, 
  ShieldCheck, 
  Radio, 
  Sliders, 
  Webhook, 
  CheckCircle2, 
  Save, 
  Server,
  PhoneForwarded,
  FileCheck
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { useToast } from '../../context/ToastContext';

export interface VoiceSettingsViewProps {
  onOpenBuyNumber?: () => void;
}

export const VoiceSettingsView: React.FC<VoiceSettingsViewProps> = ({
  onOpenBuyNumber,
}) => {
  const { phoneNumbers, aiAgents } = useVoiceAi();
  const { success } = useToast();

  const [localPresence, setLocalPresence] = useState(true);
  const [recordCalls, setRecordCalls] = useState(true);
  const [consentDisclosure, setConsentDisclosure] = useState(true);
  const [pciRedaction, setPciRedaction] = useState(true);
  const [crmAutoSync, setCrmAutoSync] = useState(true);
  const [retentionDays, setRetentionDays] = useState('90');
  const [defaultCallerId, setDefaultCallerId] = useState(phoneNumbers[0]?.number || '+1 (415) 890-2341');
  const [webhookUrl, setWebhookUrl] = useState('https://api.outtricks.internal/v1/voice/webhooks/call-events');
  const [maxRingSeconds, setMaxRingSeconds] = useState('25');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      success('Calls and telecom configuration updated successfully.', 'Settings Saved');
    }, 400);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight">
              Calls & Telephony Configuration
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure carrier SIP trunks, local presence dialing, call recording compliance, and CRM sync rules.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Section 1: Carrier & SIP Trunk Infrastructure */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Telecom & Media Infrastructure</h3>
            </div>
            <Badge variant="emerald" size="sm">Active Trunk</Badge>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Primary Trunk Carrier</span>
              <span className="font-semibold text-slate-900 dark:text-white">Twilio / Telnyx Multi-Cloud SIP</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">WebRTC Media Gateway</span>
              <span className="font-semibold text-slate-900 dark:text-white">US-East (Virginia, Latency: ~180ms)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Caller ID Verification</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> STIR/SHAKEN Level A
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Default Outbound Caller ID
              </label>
              <select
                value={defaultCallerId}
                onChange={(e) => setDefaultCallerId(e.target.value)}
                className="w-full p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-primary"
              >
                {phoneNumbers.map((num) => (
                  <option key={num.id} value={num.number}>
                    {num.number} ({num.country} - {num.assignedAgent})
                  </option>
                ))}
                <option value="+1 (415) 890-2341">+1 (415) 890-2341 (Main Outbound Pool)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Max Ring Duration (Seconds)
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={maxRingSeconds}
                onChange={(e) => setMaxRingSeconds(e.target.value)}
                className="w-full p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-primary"
              />
              <p className="text-[11px] text-slate-400">
                Time before call is marked as unanswered or sent to voicemail detection.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Local Presence & Dialing Rules */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneForwarded className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dialing & Local Presence</h3>
            </div>
            {onOpenBuyNumber && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpenBuyNumber}
                leftIcon={<Phone className="w-3.5 h-3.5" />}
              >
                + Add Numbers
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div className="space-y-0.5 pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Automated Local Presence Dialing
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Matches caller ID to prospect area code to increase answer rates up to 48%.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLocalPresence(!localPresence)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  localPresence ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    localPresence ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div className="space-y-0.5 pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Real-Time Deals CRM Sync
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Automatically create deals, advance pipeline stages, and add demo calendar links.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCrmAutoSync(!crmAutoSync)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  crmAutoSync ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    crmAutoSync ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Active SDR Capacity</span>
              <p className="text-[11px] text-slate-500">
                {aiAgents.length} AI SDRs currently active with {phoneNumbers.length} dedicated phone lines.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Recording & Regulatory Compliance */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recording & Legal Compliance</h3>
            </div>
            <Badge variant="outline" size="sm">FCC / TCPA Compliant</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div className="space-y-0.5 pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Automatic High-Fidelity Call Recording
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Record both inbound and outbound calls for AI transcription, sentiment analysis, and coaching.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRecordCalls(!recordCalls)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  recordCalls ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    recordCalls ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div className="space-y-0.5 pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Two-Party Consent Audio Announcement
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Automatically plays legal recording disclosure for two-party consent jurisdictions (CA, FL, PA, etc.).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConsentDisclosure(!consentDisclosure)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  consentDisclosure ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    consentDisclosure ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div className="space-y-0.5 pr-4">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  PCI-DSS Sensitive Data Redaction
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Mute audio and redact credit cards, SSNs, and passwords from live transcripts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPciRedaction(!pciRedaction)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  pciRedaction ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    pciRedaction ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Recording Storage Retention
              </label>
              <select
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="w-full p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white outline-none focus:border-primary"
              >
                <option value="30">30 Days</option>
                <option value="90">90 Days (Recommended)</option>
                <option value="180">180 Days</option>
                <option value="365">1 Year</option>
                <option value="forever">Indefinite (Enterprise Vault)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Webhooks & Event Streaming */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Webhooks & Event Stream</h3>
            </div>
            <Badge variant="purple" size="sm">REST Hooks</Badge>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Call Completion Webhook URL
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-domain.com/webhooks/calls"
                className="w-full p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-primary"
              />
              <p className="text-[11px] text-slate-400">
                Sends JSON payload with duration, outcome, full transcript, and recording URL upon call completion.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">Subscribed Events</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> call.initiated</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> call.connected</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> call.completed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> call.transcribed</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> demo.scheduled</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> deal.created</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
};
