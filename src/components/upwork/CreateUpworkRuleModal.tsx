import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpwork } from '../../context/UpworkContext';
import { Zap, Workflow } from 'lucide-react';

export interface CreateUpworkRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCanvas?: () => void;
}

export const CreateUpworkRuleModal: React.FC<CreateUpworkRuleModalProps> = ({
  isOpen,
  onClose,
  onOpenCanvas,
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
        {/* Lemlist-style Visual Canvas Callout */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Prefer Lemlist-Style Drag & Drop?</div>
              <div className="text-[10px] text-slate-500">Design multi-step auto-bid cadences with delays and condition branching.</div>
            </div>
          </div>
          {onOpenCanvas && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                onClose();
                onOpenCanvas();
              }}
              className="shrink-0 border-orange-500/30 hover:border-orange-500 text-orange-600 dark:text-orange-400 text-xs font-bold bg-white dark:bg-[#1C1C1C]"
            >
              Open Canvas ➔
            </Button>
          )}
        </div>

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
