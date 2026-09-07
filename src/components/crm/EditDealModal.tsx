import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { useToast } from '../../context/ToastContext';

export interface EditDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: CrmDeal | null;
}

export const EditDealModal: React.FC<EditDealModalProps> = ({
  isOpen,
  onClose,
  deal,
}) => {
  const { activePipeline, updateDeal } = useCrm();
  const [formData, setFormData] = useState<Partial<CrmDeal>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title,
        value: deal.value,
        stageId: deal.stageId,
        owner: deal.owner,
        expectedCloseDate: deal.expectedCloseDate,
        priority: deal.priority,
      });
    }
  }, [deal]);

  if (!deal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      updateDeal({
        ...deal,
        ...formData,
      } as CrmDeal);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Deal Opportunity"
      description={`Update stage, ARR value, and attributes for ${deal.title}.`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Deal Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Contract Value (USD ARR)"
            type="number"
            value={formData.value || 0}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            required
          />

          <Select
            label="Pipeline Stage"
            value={formData.stageId || activePipeline.stages[0]?.id}
            onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
            options={activePipeline.stages.map((s) => ({
              value: s.id,
              label: `${s.name} (${s.probability}%)`,
            }))}
          />

          <Select
            label="Assigned Owner"
            value={formData.owner || 'Sarah Jenkins'}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value as LeadOwnerType })}
            options={[
              { value: 'Sarah Jenkins', label: 'Sarah Jenkins (Growth Lead)' },
              { value: 'Marcus Vance', label: 'Marcus Vance (RevOps)' },
              { value: 'Alex Rivera', label: 'Alex Rivera (SDR)' },
              { value: 'Unassigned', label: 'Unassigned' },
            ]}
          />

          <Input
            label="Target Close Date"
            type="date"
            value={formData.expectedCloseDate || ''}
            onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            required
          />

          <Select
            label="Deal Priority"
            value={formData.priority || 'high'}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            options={[
              { value: 'high', label: 'High Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'low', label: 'Low Priority' },
            ]}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSaving}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
