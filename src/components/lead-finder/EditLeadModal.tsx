import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useToast } from '../../context/ToastContext';
import { LeadDetailData } from '../../context/LeadSearchContext';
import { User, Building2, Mail, Phone, MapPin, Tag } from 'lucide-react';

export interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadDetailData | null;
  onSaveLead: (updatedLead: LeadDetailData) => void;
}

export const EditLeadModal: React.FC<EditLeadModalProps> = ({
  isOpen,
  onClose,
  lead,
  onSaveLead,
}) => {
  const [formData, setFormData] = useState<Partial<LeadDetailData>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { success } = useToast();

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        location: lead.location,
        industry: lead.industry,
        headcount: lead.headcount,
        revenue: lead.revenue,
      });
    }
  }, [lead]);

  if (!lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      const updated: LeadDetailData = {
        ...lead,
        ...formData,
      } as LeadDetailData;
      onSaveLead(updated);
      success(`Updated prospect details for ${updated.name}.`, 'Profile Saved');
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Prospect Profile"
      description="Update contact coordinates, firmographic attributes, and verified channels."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Job Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Company Name"
            value={formData.company || ''}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />

          <Input
            label="Industry / Vertical"
            value={formData.industry || ''}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          />

          <Input
            label="Primary Work Email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Direct Mobile Phone"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input
            label="Location / Region"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Select
            label="Company Headcount"
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
