import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/CrmContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';

// 1. Bulk Stage Modal
export const BulkDealStageModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, activePipeline, bulkUpdateStage } = useCrm();
  const [selectedStage, setSelectedStage] = useState(activePipeline.stages[0]?.id || 'stage_1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkUpdateStage(selectedStage);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Update Deal Stage"
      description={`Advance or change pipeline stage for ${selection.selectedIds.length} selected deals.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Target Pipeline Stage"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          options={activePipeline.stages.map((s) => ({
            value: s.id,
            label: `${s.name} (${s.probability}%)`,
          }))}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Update Stage</Button>
        </div>
      </form>
    </Modal>
  );
};

// 2. Bulk Assign Modal
export const BulkDealAssignModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkUpdateOwner } = useCrm();
  const [selectedOwner, setSelectedOwner] = useState<LeadOwnerType>('Sarah Jenkins');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkUpdateOwner(selectedOwner);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Reassign Deal Owner"
      description={`Reassign ${selection.selectedIds.length} selected deals to a team member.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Select New Deal Owner"
          value={selectedOwner}
          onChange={(e) => setSelectedOwner(e.target.value as LeadOwnerType)}
          options={[
            { value: 'Sarah Jenkins', label: 'Sarah Jenkins (Growth Lead)' },
            { value: 'Marcus Vance', label: 'Marcus Vance (RevOps)' },
            { value: 'Alex Rivera', label: 'Alex Rivera (SDR)' },
            { value: 'Unassigned', label: 'Unassigned' },
          ]}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Reassign Deals</Button>
        </div>
      </form>
    </Modal>
  );
};
