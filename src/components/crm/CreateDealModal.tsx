import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/CrmContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { Layers } from 'lucide-react';

export interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateDealModal: React.FC<CreateDealModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activePipeline, createDeal } = useCrm();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    companyDomain: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    value: 35000,
    stageId: activePipeline.stages[0]?.id || 'stage_1',
    owner: 'Sarah Jenkins' as LeadOwnerType,
    expectedCloseDate: '2026-10-30',
    priority: 'high' as 'high' | 'medium' | 'low',
    tags: 'Enterprise Outbound, High Intent',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.companyName) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      createDeal({
        title: formData.title,
        companyName: formData.companyName,
        companyDomain: formData.companyDomain || `${formData.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`,
        contactName: formData.contactName || 'Decision Maker',
        contactEmail: formData.contactEmail || `contact@${formData.companyDomain || 'example.com'}`,
        contactPhone: formData.contactPhone || '+1 (555) 000-0000',
        value: Number(formData.value) || 35000,
        stageId: formData.stageId,
        owner: formData.owner,
        expectedCloseDate: formData.expectedCloseDate,
        priority: formData.priority,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Pipeline Deal"
      description="Track a qualified sales opportunity through your revenue pipeline."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Deal Title"
            placeholder="e.g. CloudScale AI - Enterprise Annual Tier"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            autoFocus
          />

          <Input
            label="Target Account / Company"
            placeholder="e.g. CloudScale AI"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />

          <Input
            label="Primary Contact Full Name"
            placeholder="e.g. Sarah Jenkins"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          />

          <Input
            label="Contact Work Email"
            type="email"
            placeholder="e.g. sarah.j@cloudscale.ai"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />

          <Input
            label="Contract Value (USD ARR)"
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            required
          />

          <Select
            label="Initial Pipeline Stage"
            value={formData.stageId}
            onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
            options={activePipeline.stages.map((s) => ({
              value: s.id,
              label: `${s.name} (${s.probability}%)`,
            }))}
          />

          <Input
            label="Target Close Date"
            type="date"
            value={formData.expectedCloseDate}
            onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            required
          />

          <Select
            label="Deal Owner"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value as LeadOwnerType })}
            options={[
              { value: 'Sarah Jenkins', label: 'Sarah Jenkins (Growth Lead)' },
              { value: 'Marcus Vance', label: 'Marcus Vance (RevOps)' },
              { value: 'Alex Rivera', label: 'Alex Rivera (SDR)' },
              { value: 'Unassigned', label: 'Unassigned' },
            ]}
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          placeholder="e.g. Series B, High Intent, Custom MSA"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting} leftIcon={<Layers className="w-3.5 h-3.5" />}>
            Create Deal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
