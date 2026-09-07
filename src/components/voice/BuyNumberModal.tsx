import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { Phone, ShieldCheck } from 'lucide-react';

export interface BuyNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyNumberModal: React.FC<BuyNumberModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { purchasePhoneNumber } = useVoiceAi();
  const [country, setCountry] = useState('United States');
  const [areaCode, setAreaCode] = useState('415');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaCode.trim()) return;

    purchasePhoneNumber(country, areaCode.trim());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Provision SIP Local Phone Number"
      description="Add a verified caller ID number with local area code presence."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={[
            { value: 'United States', label: 'United States (+1)' },
            { value: 'United Kingdom', label: 'United Kingdom (+44)' },
            { value: 'Canada', label: 'Canada (+1)' },
            { value: 'Australia', label: 'Australia (+61)' },
          ]}
        />

        <Input
          label="Desired Area Code (e.g. 415, 212, 650, 312)"
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
          required
          autoFocus
        />

        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-800 dark:text-emerald-300">
          ✓ Real-time STIR/SHAKEN A-Level Attestation ensures your outbound dials show verified caller name without Spam Likely tags.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!areaCode.trim()} leftIcon={<Phone className="w-3.5 h-3.5" />}>
            Activate Number
          </Button>
        </div>
      </form>
    </Modal>
  );
};
