import React from 'react';
import { Modal } from '../ui/Modal';
import { MultiChannelAutomationCanvas } from './MultiChannelAutomationCanvas';

export interface MultiChannelCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  customChannelMode?: 'all' | 'linkedin' | 'upwork' | 'email';
  title?: string;
  initialWorkflow?: any;
}

export const MultiChannelCanvasModal: React.FC<MultiChannelCanvasModalProps> = ({
  isOpen,
  onClose,
  customChannelMode = 'all',
  title = 'Visual Multi-Channel Automation Canvas',
  initialWorkflow
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="full"
    >
      <div className="p-2 sm:p-4 h-full">
        <MultiChannelAutomationCanvas
          initialWorkflow={initialWorkflow}
          customChannelMode={customChannelMode}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};
