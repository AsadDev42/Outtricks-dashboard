import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useMasterInbox } from '../../context/MasterInboxContext';
import { Calendar } from 'lucide-react';

export interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeConversation, toggleMeeting } = useMasterInbox();
  const [meetingDate, setMeetingDate] = useState('2026-08-29');
  const [meetingTime, setMeetingTime] = useState('14:00');
  const [title, setTitle] = useState('Executive Architecture Demo & Walkthrough');

  if (!activeConversation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversation.isMeeting) {
      toggleMeeting(activeConversation.id);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Schedule Demo with ${activeConversation.contactName}`}
      description={`Company: ${activeConversation.companyName} • Recipient: ${activeConversation.email}`}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <Input
          label="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Date"
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />

          <Input
            label="Time (EST)"
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
          />
        </div>

        <div className="p-3 bg-blue-50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900/60 rounded-2xl text-[11px] text-blue-800 dark:text-blue-300">
          Calendar invite and Google Meet link will be dispatched to {activeConversation.email}.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
            Confirm Meeting
          </Button>
        </div>
      </form>
    </Modal>
  );
};
