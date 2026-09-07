import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { Bot, Volume2 } from 'lucide-react';

export interface CreateAiAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAiAgentModal: React.FC<CreateAiAgentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createAiAgent } = useVoiceAi();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Outbound SDR & Account Executive');
  const [voiceModel, setVoiceModel] = useState('Ultra-Realistic Neural (US Female - ElevenLabs Turbo v2.5)');
  const [purpose, setPurpose] = useState('Qualify inbound leads, overcome pricing objections, and book AE demo slots.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAiAgent({
      name: name.trim(),
      title: title.trim(),
      voiceModel,
      purpose: purpose.trim(),
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deploy Autonomous Voice SDR Agent"
      description="Configure sub-400ms neural conversational caller with custom product knowledge."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Agent Name"
          placeholder="e.g. Maya or Liam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Agent Job Role / Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Select
          label="Neural Voice Engine"
          value={voiceModel}
          onChange={(e) => setVoiceModel(e.target.value)}
          options={[
            { value: 'Ultra-Realistic Neural (US Female - ElevenLabs Turbo v2.5)', label: 'Ultra-Realistic Neural (US Female - ElevenLabs Turbo v2.5)' },
            { value: 'Conversational Executive (US Male - OpenAI Realtime)', label: 'Conversational Executive (US Male - OpenAI Realtime)' },
            { value: 'British Executive (UK Female - Cartesia Sonic)', label: 'British Executive (UK Female - Cartesia Sonic)' },
          ]}
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Agent Goal & Qualification Instructions
          </label>
          <textarea
            rows={3}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Bot className="w-3.5 h-3.5" />}>
            Deploy SDR Agent
          </Button>
        </div>
      </form>
    </Modal>
  );
};
