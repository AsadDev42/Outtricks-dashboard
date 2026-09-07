import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useLinkedIn } from '../../context/LinkedInContext';
import { Zap } from 'lucide-react';

export interface CreateAutomationRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAutomationRuleModal: React.FC<CreateAutomationRuleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createAutomationRule } = useLinkedIn();
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('Prospect Added to Campaign');
  const [action, setAction] = useState('Visit Profile → Wait 2 Hours → Send Connection Note');
  const [delayHours, setDelayHours] = useState(2);
  const [condition, setCondition] = useState('If 2nd or 3rd degree connection');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAutomationRule({
      name: name.trim(),
      trigger,
      action,
      delayHours: Number(delayHours) || 2,
      condition,
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Automation Rule"
      description="Define conditional trigger-action workflows for LinkedIn outreach."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Rule Name"
          placeholder="e.g. Profile Visit + Warm Invite"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Trigger Event"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            options={[
              { value: 'Prospect Added to Campaign', label: 'Prospect Added to Campaign' },
              { value: 'Connection Request Accepted', label: 'Connection Request Accepted' },
              { value: 'No Reply After 3 Days', label: 'No Reply After 3 Days' },
              { value: 'Profile Viewed Back', label: 'Profile Viewed Back' },
            ]}
          />

          <Input
            label="Execution Delay (Hours)"
            type="number"
            value={delayHours}
            onChange={(e) => setDelayHours(Number(e.target.value))}
            required
          />
        </div>

        <Input
          label="Action Workflow"
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
