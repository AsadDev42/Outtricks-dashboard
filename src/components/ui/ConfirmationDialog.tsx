import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const icons = {
    danger: <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />,
    info: <Info className="w-6 h-6 text-blue-500 shrink-0" />,
    success: <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />,
  };

  const buttonVariants = {
    danger: 'danger' as const,
    warning: 'primary' as const,
    info: 'primary' as const,
    success: 'primary' as const,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#181818]">
            {icons[variant]}
          </div>
          <h3 className="text-lg font-extrabold text-slate-950 dark:text-white tracking-tight">
            {title}
          </h3>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {message}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#2A2A2A]">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[variant]}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
