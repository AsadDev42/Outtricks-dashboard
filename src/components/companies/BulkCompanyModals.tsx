import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { useCompanies, CompanyStatusType } from '../../context/CompaniesContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';

// 1. Bulk Status
export const BulkCompanyStatusModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkUpdateStatus } = useCompanies();
  const [selectedStatus, setSelectedStatus] = useState<CompanyStatusType>('In Outreach');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkUpdateStatus(selectedStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Update Account Status"
      description={`Update status for ${selection.selectedIds.length} selected target accounts.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="New Account Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as CompanyStatusType)}
          options={[
            { value: 'Target', label: 'Target Account' },
            { value: 'Prospecting', label: 'Prospecting' },
            { value: 'In Outreach', label: 'In Outreach' },
            { value: 'Customer', label: 'Customer' },
            { value: 'Churned', label: 'Churned' },
            { value: 'Archived', label: 'Archived' },
          ]}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Update Accounts</Button>
        </div>
      </form>
    </Modal>
  );
};

// 2. Bulk Assign
export const BulkCompanyAssignModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkUpdateOwner } = useCompanies();
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
      title="Bulk Reassign Account Owner"
      description={`Reassign ${selection.selectedIds.length} selected accounts to a team member.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Select New Account Owner"
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
          <Button variant="primary" size="sm" type="submit">Reassign Accounts</Button>
        </div>
      </form>
    </Modal>
  );
};

// 3. Bulk Tag
export const BulkCompanyTagModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, bulkAddTag } = useCompanies();
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
      title="Bulk Add Tag to Accounts"
      description={`Add a custom tag to ${selection.selectedIds.length} selected accounts.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Tag Name"
          placeholder="e.g. Q3 Strategic Account"
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

// 4. Bulk Add To List
export const BulkCompanyAddToListModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selection, customLists, bulkAddToList } = useCompanies();
  const [selectedList, setSelectedList] = useState(customLists[0]?.id || 'clist_1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bulkAddToList(selectedList);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add to Target Account List"
      description={`Enroll ${selection.selectedIds.length} selected accounts into an account list.`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Select
          label="Select Target Account List"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          options={customLists.map((l) => ({ value: l.id, label: `${l.name} (${l.count} accounts)` }))}
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" size="sm" type="submit">Enroll Accounts</Button>
        </div>
      </form>
    </Modal>
  );
};
