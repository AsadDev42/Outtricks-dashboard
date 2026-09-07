import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useLeadsManagement, WorkspaceLead, LeadOwnerType, LeadStatusType } from '../../context/LeadsManagementContext';
import { UserPlus, Building2, Mail, Phone } from 'lucide-react';

export interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createLead } = useLeadsManagement();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    owner: 'Sarah Jenkins' as LeadOwnerType,
    status: 'New' as LeadStatusType,
    tagInput: 'High Priority, Inbound',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      createLead({
        name: formData.name,
        title: formData.title,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        industry: formData.industry,
        headcount: formData.headcount,
        owner: formData.owner,
        status: formData.status,
        tags: formData.tagInput.split(',').map((t) => t.trim()).filter(Boolean),
        source: 'CSV Import',
      });
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Prospect Lead"
      description="Manually enroll a decision maker into your workspace database."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            placeholder="e.g. Rachel Adams"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            autoFocus
          />

          <Input
            label="Job Title"
            placeholder="e.g. VP of Demand Generation"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Company Name"
            placeholder="e.g. ScaleFlow Labs"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />

          <Input
            label="Primary Work Email"
            type="email"
            placeholder="e.g. rachel@scaleflow.io"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Direct Mobile Phone"
            placeholder="e.g. +1 (415) 555-0199"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input
            label="Location / City"
            placeholder="e.g. San Francisco, CA"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Select
            label="Assigned Lead Owner"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value as LeadOwnerType })}
            options={[
              { value: 'Sarah Jenkins', label: 'Sarah Jenkins (Growth Lead)' },
              { value: 'Marcus Vance', label: 'Marcus Vance (RevOps)' },
              { value: 'Alex Rivera', label: 'Alex Rivera (SDR)' },
              { value: 'Unassigned', label: 'Unassigned' },
            ]}
          />

          <Select
            label="Initial Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatusType })}
            options={[
              { value: 'New', label: 'New Lead' },
              { value: 'Verified', label: 'Verified Contact' },
              { value: 'In Sequence', label: 'In Sequence' },
            ]}
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          placeholder="e.g. High Priority, Q3 Target, Tech Buyer"
          value={formData.tagInput}
          onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting} leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
            Create Lead
          </Button>
        </div>

      </form>
    </Modal>
  );
};
