import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useEmail } from '../../context/EmailContext';
import { Layers } from 'lucide-react';

export interface CreateSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSequenceModal: React.FC<CreateSequenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createSequence } = useEmail();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('{{company}} outbound deliverability vs spam filters');
  const [body, setBody] = useState('Hi {{first_name}},\n\nSaw you recently scaled the growth team at {{company}}.\n\nWe built Outtricks to deliver multiDimensional cascading verification with 99.4% deliverability on direct work emails and mobile lines.\n\nOpen to a brief look this Thursday?');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createSequence(name.trim(), [
      { id: 's1', stepNumber: 1, type: 'email', subject, body },
      { id: 's2', stepNumber: 2, type: 'delay', delayDays: 2 },
      { id: 's3', stepNumber: 3, type: 'email', subject: `Re: ${subject}`, body: 'Hi {{first_name}},\n\nWanted to quickly follow up on my previous note. Would love to share our architecture overview with your team.\n\nBest,' },
    ]);
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Multi-Step Sequence"
      description="Define step-by-step cold email touches with delays and personalization."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Sequence Name"
          placeholder="e.g. 3-Touch Enterprise Value Sequence"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Step 1 Subject Line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Step 1 Body Copy
          </label>
          <textarea
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Layers className="w-3.5 h-3.5" />}>
            Create Sequence
          </Button>
        </div>
      </form>
    </Modal>
  );
};
