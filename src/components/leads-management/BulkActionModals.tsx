import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { useLeadsManagement, LeadStatusType, LeadOwnerType } from '../../context/LeadsManagementContext';
import { CheckCircle2, UserCheck, Tag, ListPlus } from 'lucide-react';

// 1. Bulk Status Modal
export const BulkStatusModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkUpdateStatus } = useLeadsManagement();
  const [selectedStatus, setSelectedStatus] = useState<LeadStatusType>('In Sequence');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkUpdateStatus(selectedStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Update Lead Status"
      description={`Update status for ${selection.selectedIds.length} selected leads.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="New Lead Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as LeadStatusType)}
          options={[
            { value: 'New', label: 'New Lead' },
            { value: 'Verified', label: 'Verified Contact' },
            { value: 'In Sequence', label: 'In Sequence' },
            { value: 'Meeting Booked', label: 'Meeting Booked' },
            { value: 'Replied', label: 'Replied' },
            { value: 'Unresponsive', label: 'Unresponsive' },
            { value: 'Archived', label: 'Archived' },
          ]}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Update Status</Button>
        </div>
      </form>
    </Modal>
  );
};

// 2. Bulk Assign Modal
export const BulkAssignModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkUpdateOwner } = useLeadsManagement();
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
      title="Bulk Reassign Owner"
      description={`Reassign ${selection.selectedIds.length} selected leads to a team member.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Select New Owner"
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
          <Button variant="primary" size="sm" type="submit">Reassign Leads</Button>
        </div>
      </form>
    </Modal>
  );
};

// 3. Bulk Tag Modal
export const BulkTagModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkAddTag } = useLeadsManagement();
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    bulkAddTag(newTag.trim());
    setNewTag('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Add Tag"
      description={`Add a custom tag label to ${selection.selectedIds.length} selected leads.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Tag Name"
          placeholder="e.g. Q3 Enterprise Priority"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          required
          autoFocus
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit" disabled={!newTag.trim()}>Add Tag</Button>
        </div>
      </form>
    </Modal>
  );
};

// 4. Bulk Add To List Modal
export const BulkAddToListModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, customLists, bulkAddToList } = useLeadsManagement();
  const [selectedList, setSelectedList] = useState(customLists[0]?.id || 'list_1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkAddToList(selectedList);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add to Target Prospect List"
      description={`Enroll ${selection.selectedIds.length} selected leads into an outbound target list.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Select Target List"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          options={customLists.map((l) => ({ value: l.id, label: `${l.name} (${l.count} leads)` }))}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Enroll Leads</Button>
        </div>
      </form>
    </Modal>
  );
};
