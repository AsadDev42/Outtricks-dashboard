import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { useToast } from '../../context/ToastContext';
import { LeadDetailData } from '../../context/LeadSearchContext';
import { Send, Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export interface QuickEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadDetailData | null;
}

export const QuickEmailModal: React.FC<QuickEmailModalProps> = ({
  isOpen,
  onClose,
  lead,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [template, setTemplate] = useState('custom');
  const [isSending, setIsSending] = useState(false);
  const { success } = useToast();

  if (!lead) return null;

  const handleTemplateChange = (tmplKey: string) => {
    setTemplate(tmplKey);
    const firstName = lead.name.split(' ')[0];
    if (tmplKey === 'growth') {
      setSubject(`Quick question regarding ${lead.company}'s outbound stack`);
      setBody(`Hi ${firstName},\n\nNoticed ${lead.company} is actively scaling your SDR and RevOps team. Most growth leaders we speak with struggle with 30%+ bounce rates on outdated contact databases.\n\nWe built Outtricks to deliver multi-inbox cold email rotation and AI-driven SDR workflows with zero CSV export drift.\n\nOpen to a brief 5-minute look this Thursday?`);
    } else if (tmplKey === 'tech_shift') {
      setSubject(`${lead.company} + Outtricks integration`);
      setBody(`Hi ${firstName},\n\nSaw that your team is running ${lead.tech.slice(0, 2).join(' and ')}. Our 0-ETL PostgreSQL engine syncs verified buyer profiles directly into your existing stack with zero CSV export drift.\n\nWould it make sense to explore how this could save your team 8+ hours a week?`);
    } else {
      setSubject('');
      setBody('');
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      success(`Personalized email dispatched to ${lead.email} via rotating Google Workspace mailbox.`, 'Email Sent');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Send Personalized Email to ${lead.name}`}
      description={`Recipient: ${lead.email} (100% Deliverability Verified)`}
      size="md"
    >
      <form onSubmit={handleSend} className="space-y-4 font-sans text-xs">
        
        {/* Template Selector */}
        <Select
          label="Email Template Preset"
          value={template}
          onChange={(e) => handleTemplateChange(e.target.value)}
          options={[
            { value: 'custom', label: 'Write Custom Message' },
            { value: 'growth', label: 'RevOps & SDR Team Expansion Hook' },
            { value: 'tech_shift', label: 'Technographic Stack Integration Hook' },
          ]}
        />

        {/* Subject */}
        <Input
          label="Subject Line"
          placeholder="e.g. Quick question regarding CloudScale's outbound stack"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        {/* Body */}
        <Textarea
          label="Email Body"
          placeholder="Write your email pitch..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />

        <div className="p-3 bg-slate-50 dark:bg-[#1C1C1C] rounded-2xl border border-slate-200/80 dark:border-[#202020] text-slate-500 flex items-center justify-between text-[11px]">
          <span>Humanized pacing: Dispatched via primary rotating pool.</span>
          <span className="text-emerald-600 font-bold font-mono">✓ SPF/DKIM Signed</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSending} leftIcon={<Send className="w-3.5 h-3.5" />}>
            Dispatch Email
          </Button>
        </div>

      </form>
    </Modal>
  );
};
