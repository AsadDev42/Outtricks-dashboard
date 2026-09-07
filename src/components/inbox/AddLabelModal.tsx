import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useMasterInbox } from '../../context/MasterInboxContext';
import { Tag } from 'lucide-react';

export interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLabelModal: React.FC<AddLabelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createLabel } = useMasterInbox();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createLabel(name.trim(), color);
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Custom Label"
      description="Create a color-coded tag label to organize multi-channel conversations."
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Label Name"
          placeholder="e.g. VIP Customer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Label Color
          </label>
          <div className="flex items-center gap-2">
            {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                  color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Tag className="w-3.5 h-3.5" />}>
            Create Label
          </Button>
        </div>
      </form>
    </Modal>
  );
};
