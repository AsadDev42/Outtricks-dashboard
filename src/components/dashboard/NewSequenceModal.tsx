import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useToast } from '../../context/ToastContext';
import { 
  Zap, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Sparkles, 
  ShieldCheck, 
  Users,
  CheckCircle2,
  Layers
} from 'lucide-react';

export interface NewSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewSequenceModal: React.FC<NewSequenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [sequenceName, setSequenceName] = useState('Q3 Enterprise RevOps Outbound');
  const [targetAudience, setTargetAudience] = useState('VP of Sales & CRO (B2B SaaS $10M-$50M)');
  const [enableEmail, setEnableEmail] = useState(true);
  const [enableLinkedIn, setEnableLinkedIn] = useState(true);
  const [enableVoiceAi, setEnableVoiceAi] = useState(true);
  const [spintaxTemplate, setSpintaxTemplate] = useState('{{Hey|Hi|Hello}} {{firstName}}, noticed {{companyName}} recently scaled RevOps...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success } = useToast();

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      success(`Sequence "${sequenceName}" launched across 24 warmed inboxes & Voice SDR!`, 'Sequence Active');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Multi-Channel Outbound Sequence"
      description="Configure synchronized touchpoints across Cold Email rotation, LinkedIn Safe Cloud APIs, and Sub-400ms Voice SDR."
      size="md"
    >
      <form onSubmit={handleLaunch} className="space-y-4 font-sans">
        
        <Input
          label="Sequence Name"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
          required
        />

        <Select
          label="Target Decision Maker Pool"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          options={[
            { value: 'VP of Sales & CRO (B2B SaaS $10M-$50M)', label: 'VP of Sales & CRO (B2B SaaS $10M-$50M) • 8,940 Leads' },
            { value: 'Chief Financial Officers (Enterprise Tech)', label: 'CFOs & VP Finance • 4,280 Leads' },
            { value: 'Founders & Managing Directors', label: 'Founders & CEOs (Seed to Series B) • 12,400 Leads' },
            { value: 'Head of Demand Generation', label: 'Demand Gen & Growth Directors • 6,150 Leads' },
          ]}
        />

        {/* Channel Toggles */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Synchronized Outreach Channels
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className={`p-3 rounded-2xl border transition-all ${enableEmail ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500' : 'bg-slate-50 dark:bg-[#1C1C1C] border-slate-200 dark:border-[#2A2A2A]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Switch checked={enableEmail} onChange={setEnableEmail} size="sm" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Multi-Inbox Email</div>
              <div className="text-[10px] text-slate-500">24 Mailboxes Active</div>
            </div>

            <div className={`p-3 rounded-2xl border transition-all ${enableLinkedIn ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500' : 'bg-slate-50 dark:bg-[#1C1C1C] border-slate-200 dark:border-[#2A2A2A]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Switch checked={enableLinkedIn} onChange={setEnableLinkedIn} size="sm" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn Safe</div>
              <div className="text-[10px] text-slate-500">Cloud Proxy APIs</div>
            </div>

            <div className={`p-3 rounded-2xl border transition-all ${enableVoiceAi ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500' : 'bg-slate-50 dark:bg-[#1C1C1C] border-slate-200 dark:border-[#2A2A2A]'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Switch checked={enableVoiceAi} onChange={setEnableVoiceAi} size="sm" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Voice AI SDR</div>
              <div className="text-[10px] text-slate-500">Sub-400ms Dialer</div>
            </div>
          </div>
        </div>

        {/* Dynamic Spintax Template */}
        <Textarea
          label="Email Step 1 (Dynamic Spintax Enabled)"
          value={spintaxTemplate}
          onChange={(e) => setSpintaxTemplate(e.target.value)}
          rows={3}
          helperText="Use {{option1|option2}} for random spintax variations. Delivers 0% inbox pattern repetition."
        />

        {/* Data Layer Badge */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>Zero sync lag: Leads, CRM pipeline, and un-subscription triggers are coordinated directly in PostgreSQL.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} leftIcon={<Zap className="w-3.5 h-3.5" />}>
            Launch Sequence
          </Button>
        </div>

      </form>
    </Modal>
  );
};
