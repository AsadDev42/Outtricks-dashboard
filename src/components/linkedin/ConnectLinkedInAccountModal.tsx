import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLinkedIn } from '../../context/LinkedInContext';
import { Linkedin, Globe, ShieldCheck } from 'lucide-react';

export interface ConnectLinkedInAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectLinkedInAccountModal: React.FC<ConnectLinkedInAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectAccount } = useLinkedIn();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('VP of Growth');
  const [profileUrl, setProfileUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    connectAccount({
      name: name.trim(),
      title: title.trim(),
      profileUrl: profileUrl.trim() || `https://linkedin.com/in/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    });
    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connect LinkedIn Profile"
      description="Connect a LinkedIn account securely with dedicated residential 4G proxy."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Account Holder Name"
          placeholder="e.g. Sarah Jenkins"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="LinkedIn Profile URL"
          placeholder="e.g. https://linkedin.com/in/sarah-jenkins"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
        />

        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-800 dark:text-emerald-300">
          ✓ Static residential IP (New York/San Francisco) is automatically assigned to match your geolocation.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!name.trim()} leftIcon={<Linkedin className="w-3.5 h-3.5" />}>
            Connect Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
};
