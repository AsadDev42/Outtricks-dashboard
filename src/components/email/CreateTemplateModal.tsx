import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useEmail } from '../../context/EmailContext';
import { FileText } from 'lucide-react';

export interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createTemplate } = useEmail();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cold Outreach');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim()) return;

    createTemplate({
      name: name.trim(),
      category,
      subject: subject.trim(),
      body: body.trim(),
    });
    setName('');
    setSubject('');
    setBody('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Email Template"
      description="Save a high-converting cold email template for your team."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Template Name"
            placeholder="e.g. Executive Pain-Point Hook"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'Cold Outreach', label: 'Cold Outreach' },
              { value: 'Follow-Up', label: 'Follow-Up' },
              { value: 'Breakup', label: 'Breakup' },
            ]}
          />
        </div>

        <Input
          label="Subject Line"
          placeholder="e.g. Quick question regarding {{company}}'s outbound deliverability"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Email Body
          </label>
          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email copy with {{first_name}}, {{company}}..."
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<FileText className="w-3.5 h-3.5" />}>
            Save Template
          </Button>
        </div>
      </form>
    </Modal>
  );
};
