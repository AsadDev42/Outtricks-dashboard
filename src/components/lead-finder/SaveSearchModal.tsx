import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLeadSearch } from '../../context/LeadSearchContext';
import { Bookmark, Sparkles, Check } from 'lucide-react';

export interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchName, setSearchName] = useState('');
  const { saveCurrentSearch, pagination } = useLeadSearch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    saveCurrentSearch(searchName.trim());
    setSearchName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Target ICP Search Preset"
      description={`Save your current 8-dimension filter criteria (${pagination.totalResults} matched prospects) for instant 1-click execution across your team.`}
      size="sm"
    >
      <form onSubmit={handleSave} className="space-y-4 font-sans">
        
        <Input
          label="Search Preset Name"
          placeholder="e.g. US Enterprise SaaS VPs of Sales"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          required
          autoFocus
        />

        <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Dynamic Query Preservation</span>
          </div>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
            This preset will automatically evaluate newly added and updated decision-maker records when executed.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!searchName.trim()}
            leftIcon={<Bookmark className="w-3.5 h-3.5" />}
          >
            Save Preset
          </Button>
        </div>

      </form>
    </Modal>
  );
};
