import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { useCrm } from '../../context/CrmContext';
import { Layers } from 'lucide-react';

export interface CreatePipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePipelineModal: React.FC<CreatePipelineModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createPipeline } = useCrm();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createPipeline(name.trim(), description.trim());
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Sales Pipeline"
      description="Define a dedicated sales pipeline for specific customer segments, partners, or product tiers."
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Pipeline Name"
          placeholder="e.g. Channel & Agency Partners"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Textarea
          label="Description (Optional)"
          placeholder="Purpose and target audience of this pipeline..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Layers className="w-3.5 h-3.5" />}>
            Create Pipeline
          </Button>
        </div>
      </form>
    </Modal>
  );
};
