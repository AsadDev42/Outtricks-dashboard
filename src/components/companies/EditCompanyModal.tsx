import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useCompanies, WorkspaceCompany } from '../../context/CompaniesContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { useToast } from '../../context/ToastContext';

export interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: WorkspaceCompany | null;
}

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  isOpen,
  onClose,
  company,
}) => {
  const { updateCompany } = useCompanies();
  const [formData, setFormData] = useState<Partial<WorkspaceCompany>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        domain: company.domain,
        industry: company.industry,
        headcount: company.headcount,
        revenue: company.revenue,
        funding: company.funding,
        location: company.location,
        description: company.description,
        owner: company.owner,
      });
    }
  }, [company]);

  if (!company) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      updateCompany({
        ...company,
        ...formData,
      } as WorkspaceCompany);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Target Account Profile"
      description={`Update firmographic attributes and metadata for ${company.name}.`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Company Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Domain"
            value={formData.domain || ''}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            required
          />

          <Input
            label="Industry / Sub-Sector"
            value={formData.industry || ''}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          />

          <Select
            label="Headcount Tier"
            value={formData.headcount || '51-200'}
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
            label="Location"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Select
            label="Account Owner"
            value={formData.owner || 'Sarah Jenkins'}
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
          label="Account Overview"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />

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
