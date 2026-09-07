import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useToast } from '../../context/ToastContext';
import { Plus, ListPlus, CheckCircle2 } from 'lucide-react';

export interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
}

export const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  selectedCount,
}) => {
  const [selectedList, setSelectedList] = useState('q3_saas_vps');
  const [newListName, setNewListName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      const targetName = isCreatingNew && newListName ? newListName : 'Q3 Enterprise SaaS VPs';
      success(`Added ${selectedCount} leads to "${targetName}".`, 'List Updated');
      onClose();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Leads to Prospect List"
      description={`Add ${selectedCount} selected prospect records to a dedicated target list or active outbound segment.`}
      size="sm"
    >
      <form onSubmit={handleSave} className="space-y-4 font-sans">
        
        {!isCreatingNew ? (
          <div className="space-y-2">
            <Select
              label="Select Existing Prospect List"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              options={[
                { value: 'q3_saas_vps', label: 'Q3 Enterprise SaaS VPs (1,420 leads)' },
                { value: 'fintech_cros', label: 'FinTech CROs & VPs of Sales (840 leads)' },
                { value: 'us_seed_founders', label: 'US Series A/B Founders (2,100 leads)' },
                { value: 'hiring_revops', label: 'Companies Actively Hiring SDRs (650 leads)' },
              ]}
            />
            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Create New Target List</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              label="New List Name"
              placeholder="e.g. Enterprise Security CTOs Q3"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              required
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-bold hover:underline cursor-pointer"
            >
              ← Back to Existing Lists
            </button>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSaving} leftIcon={<ListPlus className="w-3.5 h-3.5" />}>
            Save {selectedCount} Leads
          </Button>
        </div>

      </form>
    </Modal>
  );
};
