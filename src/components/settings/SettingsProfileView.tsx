import React, { useState } from 'react';
import { User, Save, Upload, CheckCircle2, RotateCcw, Camera, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsProfileView: React.FC = () => {
  const { profileData, updateProfile } = useSettings();
  const { success } = useToast();
  
  const [formData, setFormData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
  };

  const handlePhotoSelect = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    ];
    const nextIdx = (avatars.indexOf(formData.avatar) + 1) % avatars.length;
    setFormData(prev => ({ ...prev, avatar: avatars[nextIdx] }));
    success('Avatar photo updated.', 'Photo Changed');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Personal Profile & Outbound Identity
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Personal contact details, email signature, regional timezone, and outbound display credentials.
        </p>
      </div>

      {/* 2. Main Profile Form Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl text-xs">
          
          {/* Avatar & Photo Picker */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
            <div className="relative group">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500/40 shadow-md shadow-emerald-500/10"
              />
              <button
                type="button"
                onClick={handlePhotoSelect}
                className="absolute inset-0 rounded-3xl bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                {formData.fullName || 'Sarah Jenkins'}
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                {formData.email}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handlePhotoSelect}
                  leftIcon={<Upload className="w-3.5 h-3.5" />}
                >
                  Upload New Photo
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <Input
              label="Job Title / Designation"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Direct Mobile / WhatsApp"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Select
              label="Timezone Preference"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              options={[
                { value: 'America/Los_Angeles (PST)', label: 'America/Los_Angeles (PST, UTC-8)' },
                { value: 'America/New_York (EST)', label: 'America/New_York (EST, UTC-5)' },
                { value: 'America/Chicago (CST)', label: 'America/Chicago (CST, UTC-6)' },
                { value: 'Europe/London (GMT)', label: 'Europe/London (GMT, UTC+0)' },
                { value: 'Europe/Berlin (CET)', label: 'Europe/Berlin (CET, UTC+1)' },
                { value: 'Asia/Singapore (SGT)', label: 'Asia/Singapore (SGT, UTC+8)' },
                { value: 'Asia/Tokyo (JST)', label: 'Asia/Tokyo (JST, UTC+9)' },
              ]}
            />

            <Select
              label="Platform Language"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              options={[
                { value: 'English (US)', label: 'English (US)' },
                { value: 'English (UK)', label: 'English (UK)' },
                { value: 'Deutsch (German)', label: 'Deutsch (German)' },
                { value: 'Français (French)', label: 'Français (French)' },
                { value: 'Español (Spanish)', label: 'Español (Spanish)' },
              ]}
            />
          </div>

          {/* Outbound Bio / Signature */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Professional Bio & Outbound Signature Preview
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none text-xs leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save Profile Changes
            </Button>
          </div>

        </form>
      </div>

    </div>
  );
};
