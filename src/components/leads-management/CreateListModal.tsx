import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { ListPlus } from 'lucide-react';

export interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateListModal: React.FC<CreateListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createCustomList } = useLeadsManagement();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCustomList(name.trim(), description.trim());
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Custom Target List"
      description="Create a dedicated prospect list to segment accounts for cold email cadences or SDR call campaigns."
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Target List Name"
          placeholder="e.g. Enterprise Security CTOs Q3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Textarea
          label="Description (Optional)"
          placeholder="Brief description of this outbound cohort..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<ListPlus className="w-3.5 h-3.5" />}>
            Create List
          </Button>
        </div>
      </form>
    </Modal>
  );
};
