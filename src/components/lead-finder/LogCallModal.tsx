import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useToast } from '../../context/ToastContext';
import { LeadDetailData } from '../../context/LeadSearchContext';
import { PhoneCall, CheckCircle2, Clock } from 'lucide-react';

export interface LogCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadDetailData | null;
}

export const LogCallModal: React.FC<LogCallModalProps> = ({
  isOpen,
  onClose,
  lead,
}) => {
  const [outcome, setOutcome] = useState('demo_booked');
  const [duration, setDuration] = useState('4m 32s');
  const [notes, setNotes] = useState('Expressed strong interest in multi-channel outbound. Requested a live product demo this Thursday at 2 PM EST.');
  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  if (!lead) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      success(`Logged call outcome "${outcome}" for ${lead.name}.`, 'Call Logged');
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Log Voice Call with ${lead.name}`}
      description={`Direct Line: ${lead.phone} (${lead.company})`}
      size="sm"
    >
      <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
        
        <Select
          label="Call Outcome"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          options={[
            { value: 'demo_booked', label: 'Connected • Meeting / Demo Booked' },
            { value: 'interested_followup', label: 'Connected • Interested (Follow Up Needed)' },
            { value: 'left_voicemail', label: 'No Answer • Left AI Voicemail' },
            { value: 'gatekeeper', label: 'Gatekeeper Rejection' },
            { value: 'not_interested', label: 'Not Interested / Bad Fit' },
          ]}
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Call Duration
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-mono text-slate-900 dark:text-white"
          />
        </div>

        <Textarea
          label="Call Notes & Transcript Summary"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          required
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSaving} leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
            Save Call Log
          </Button>
        </div>

      </form>
    </Modal>
  );
};
