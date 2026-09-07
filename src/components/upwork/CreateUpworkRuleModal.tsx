import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpwork } from '../../context/UpworkContext';
import { Zap } from 'lucide-react';

export interface CreateUpworkRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUpworkRuleModal: React.FC<CreateUpworkRuleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createAutomationRule } = useUpwork();
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('New Job Matching Alert');
  const [action, setAction] = useState('Generate AI Custom Proposal → Send Instant Notification');
  const [condition, setCondition] = useState('Match Score > 95% & Payment Verified');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAutomationRule({
      name: name.trim(),
      trigger,
      action,
      condition,
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Autonomous Auto-Bid Rule"
      description="Define triggers for automated proposal drafting and dispatch."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Rule Name"
          placeholder="e.g. Instant Auto-Draft on >95% Match"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Select
          label="Trigger Event"
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          options={[
            { value: 'New Job Matching Alert', label: 'New Job Matching Alert' },
            { value: 'Proposal Unviewed After 48h', label: 'Proposal Unviewed After 48h' },
            { value: 'Client Views Proposal', label: 'Client Views Proposal' },
          ]}
        />

        <Input
          label="Workflow Action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        />

        <Input
          label="Condition Filter"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Zap className="w-3.5 h-3.5" />}>
            Activate Rule
          </Button>
        </div>
      </form>
    </Modal>
  );
};
