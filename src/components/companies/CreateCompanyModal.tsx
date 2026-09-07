import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useCompanies, CompanyStatusType } from '../../context/CompaniesContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { Building2 } from 'lucide-react';

export interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createCompany } = useCompanies();
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M - $25M',
    funding: 'Series A ($15M)',
    location: 'San Francisco, CA',
    description: '',
    owner: 'Sarah Jenkins' as LeadOwnerType,
    status: 'Target' as CompanyStatusType,
    tags: 'Tier 1, High Priority',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.domain) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      createCompany({
        name: formData.name,
        domain: formData.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
        industry: formData.industry,
        headcount: formData.headcount,
        revenue: formData.revenue,
        funding: formData.funding,
        location: formData.location,
        description: formData.description || 'Target account enrolled for automated multi-channel prospecting.',
        owner: formData.owner,
        status: formData.status,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Target Company Account"
      description="Add a new target account to your workspace for account-based outbound campaigns."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Company Name"
            placeholder="e.g. DataWave Systems"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            autoFocus
          />

          <Input
            label="Primary Domain"
            placeholder="e.g. datawave.io"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            required
          />

          <Select
            label="Industry / Vertical"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            options={[
              { value: 'Enterprise B2B SaaS', label: 'Enterprise B2B SaaS' },
              { value: 'Cybersecurity & DevOps', label: 'Cybersecurity & DevOps' },
              { value: 'FinTech & B2B Payments', label: 'FinTech & B2B Payments' },
              { value: 'Marketing & Growth Agencies', label: 'Marketing & Growth Agencies' },
              { value: 'E-Commerce & Supply Chain', label: 'E-Commerce & Supply Chain' },
            ]}
          />

          <Select
            label="Employee Headcount"
            value={formData.headcount}
            onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
            options={[
              { value: '1-10', label: '1-10 employees' },
              { value: '11-50', label: '11-50 employees' },
              { value: '51-200', label: '51-200 employees' },
              { value: '201-500', label: '201-500 employees' },
              { value: '501-1000', label: '501-1000 employees' },
              { value: '1000+', label: '1000+ employees' },
            ]}
          />

          <Input
            label="Headquarters Location"
            placeholder="e.g. Austin, TX"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Select
            label="Account Owner"
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

        <Textarea
          label="Company Description (Optional)"
          placeholder="Brief summary of company product and market positioning..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-[#202020]">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting} leftIcon={<Building2 className="w-3.5 h-3.5" />}>
            Create Company
          </Button>
        </div>
      </form>
    </Modal>
  );
};
