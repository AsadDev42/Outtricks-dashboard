import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { Radio, PhoneCall } from 'lucide-react';

export interface CreateVoiceCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateVoiceCampaignModal: React.FC<CreateVoiceCampaignModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createVoiceCampaign, aiAgents } = useVoiceAi();
  const [name, setName] = useState('');
  const [agentName, setAgentName] = useState(aiAgents[0]?.name || 'Liam');
  const [audienceCount, setAudienceCount] = useState(250);
  const [concurrency, setConcurrency] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createVoiceCampaign({
      name: name.trim(),
      agentName,
      audienceCount: Number(audienceCount) || 250,
      concurrency: Number(concurrency) || 3,
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Voice Calling Campaign"
      description="Launch multi-line automated outbound calling with sub-400ms AI SDR."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Campaign Name"
          placeholder="e.g. Q3 EMEA FinTech Outbound Dialing"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Select
          label="Assigned AI Voice SDR"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          options={aiAgents.map((a) => ({
            value: a.name,
            label: `${a.name} (${a.title})`,
          }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Prospect Target Count"
            type="number"
            value={audienceCount}
            onChange={(e) => setAudienceCount(Number(e.target.value))}
            required
          />

          <Input
            label="Concurrent Dialing Lines (1-10)"
            type="number"
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            required
          />
        </div>

        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-800 dark:text-emerald-300">
          ✓ Calls are automatically scheduled between 9:00 AM - 5:00 PM in the prospect's local timezone.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Radio className="w-3.5 h-3.5" />}>
            Launch Voice Campaign
          </Button>
        </div>
      </form>
    </Modal>
  );
};
