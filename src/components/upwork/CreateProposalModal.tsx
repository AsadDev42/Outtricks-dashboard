import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUpwork, UpworkJob } from '../../context/UpworkContext';
import { Sparkles, Send } from 'lucide-react';

export interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: UpworkJob | null;
}

export const CreateProposalModal: React.FC<CreateProposalModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  const { submitProposal } = useUpwork();
  const [bidAmount, setBidAmount] = useState(job?.budgetType === 'Hourly' ? '$125.00/hr' : '$9,500');
  const [duration, setDuration] = useState('1 to 3 months');
  const [coverLetter, setCoverLetter] = useState(
    `Hi,\n\nI reviewed your project specifications for "${job?.title || 'this project'}".\n\nWe have built scalable enterprise architectures with 99.4% deliverability, 60FPS fluid React dashboards, and sub-400ms WebRTC voice integrations.\n\nOpen to reviewing our live case study deck?`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    submitProposal(job.id, coverLetter, bidAmount, duration);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit AI-Powered Upwork Proposal"
      description={job ? `Targeting: ${job.title.slice(0, 60)}... (${job.clientCountry})` : 'Craft a proposal'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Bid Rate / Price"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Estimated Project Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            options={[
              { value: 'Less than 1 month', label: 'Less than 1 month' },
              { value: '1 to 3 months', label: '1 to 3 months' },
              { value: '3 to 6 months', label: '3 to 6 months' },
              { value: 'More than 6 months', label: 'More than 6 months' },
            ]}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              AI-Generated Cover Letter
            </label>
            <span className="text-[10px] text-emerald-600 font-bold font-mono">
              98% Win Probability
            </span>
          </div>
          <textarea
            rows={6}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
            Submit Proposal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
