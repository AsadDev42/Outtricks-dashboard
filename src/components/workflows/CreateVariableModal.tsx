import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useWorkflows } from '../../context/WorkflowsContext';
import { FileCode } from 'lucide-react';

export interface CreateVariableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateVariableModal: React.FC<CreateVariableModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createCustomVariable } = useWorkflows();
  const [name, setName] = useState('');
  const [key, setKey] = useState('{{custom.variable_name}}');
  const [sampleValue, setSampleValue] = useState('Demo Value');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !key.trim()) return;

    createCustomVariable(
      key.trim(),
      name.trim(),
      sampleValue.trim(),
      description.trim() || 'Custom workflow token'
    );
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Custom Workflow Variable"
      description="Define a reusable variable tag for templates, spintax, and API calls."
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Variable Name"
          placeholder="e.g. Account Executive Calendly Link"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Token Key Format"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />

        <Input
          label="Sample Fallback Value"
          value={sampleValue}
          onChange={(e) => setSampleValue(e.target.value)}
          required
        />

        <Input
          label="Description"
          placeholder="What does this variable resolve to?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={!name.trim()}
            leftIcon={<FileCode className="w-3.5 h-3.5" />}
          >
            Save Variable
          </Button>
        </div>
      </form>
    </Modal>
  );
};
