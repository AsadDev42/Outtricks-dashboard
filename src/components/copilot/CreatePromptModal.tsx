import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { PromptTemplate } from '../../context/CoPilotContext';

export interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, category: PromptTemplate['category'], text: string) => void;
}

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PromptTemplate['category']>('Cold Outbound');
  const [promptText, setPromptText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptText.trim()) return;
    onCreate(title.trim(), category, promptText.trim());
    onClose();
    setTitle('');
    setPromptText('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Prompt Template"
      description="Create reusable AI prompts with dynamic variables (e.g. {{prospect.title}}, {{company.name}})."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        <Input
          label="Prompt Title"
          placeholder="e.g. 3-Sentence C-Suite Spintax Hook"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          options={[
            { value: 'Cold Outbound', label: 'Cold Outbound' },
            { value: 'Speed-to-Lead', label: 'Speed-to-Lead' },
            { value: 'Objection Handling', label: 'Objection Handling' },
            { value: 'Upwork Proposal', label: 'Upwork Proposal' },
            { value: 'CRM Intelligence', label: 'CRM Intelligence' },
          ]}
        />

        <Textarea
          label="Prompt Template Body"
          placeholder="Write your prompt with optional {{variable}} tokens..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          rows={4}
          required
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Template
          </Button>
        </div>
      </form>
    </Modal>
  );
};
