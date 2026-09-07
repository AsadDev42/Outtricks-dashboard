import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpwork } from '../../context/UpworkContext';
import { FileText } from 'lucide-react';

export interface CreateUpworkTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUpworkTemplateModal: React.FC<CreateUpworkTemplateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createTemplate } = useUpwork();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Deliverability');
  const [content, setContent] = useState('Hi {{client_name}},\n\nSaw you need {{job_scope}}.\n\nWe have built scalable enterprise architectures maintaining 99.4% primary inbox rates.\n\nOpen to a brief look?');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createTemplate({
      name: name.trim(),
      category,
      content: content.trim(),
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Proposal Template"
      description="Save a high-converting cover letter hook with dynamic tags."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Template Name"
          placeholder="e.g. Enterprise Deliverability Hook"
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
            { value: 'Deliverability', label: 'Deliverability & DNS' },
            { value: 'Frontend Architecture', label: 'Frontend & SaaS' },
            { value: 'Voice AI', label: 'Voice AI & WebRTC' },
            { value: 'General', label: 'General' },
          ]}
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Proposal Copy
          </label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
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
