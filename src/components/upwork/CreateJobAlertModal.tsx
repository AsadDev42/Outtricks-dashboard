import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useUpwork } from '../../context/UpworkContext';
import { Bell } from 'lucide-react';

export interface CreateJobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJobAlertModal: React.FC<CreateJobAlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createJobAlert } = useUpwork();
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('Deliverability, Cold Email, Next.js, React');
  const [minBudget, setMinBudget] = useState(80);
  const [maxProposals, setMaxProposals] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createJobAlert({
      name: name.trim(),
      keywords: keywords.trim(),
      minBudget: Number(minBudget) || 80,
      maxProposals: Number(maxProposals) || 10,
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Upwork RSS Job Alert"
      description="Monitor newly published jobs matching your keywords and target hourly rates."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Alert Name"
          placeholder="e.g. High-Budget Next.js & AI Opportunities"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Target Keywords (comma-separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Minimum Hourly Rate ($/hr)"
            type="number"
            value={minBudget}
            onChange={(e) => setMinBudget(Number(e.target.value))}
            required
          />

          <Input
            label="Maximum Proposals Filter"
            type="number"
            value={maxProposals}
            onChange={(e) => setMaxProposals(Number(e.target.value))}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Bell className="w-3.5 h-3.5" />}>
            Activate Alert
          </Button>
        </div>
      </form>
    </Modal>
  );
};
