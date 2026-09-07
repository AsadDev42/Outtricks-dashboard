import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  requireTextConfirmation?: string;
}

export const AdminConfirmModal: React.FC<AdminConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'danger',
  requireTextConfirmation,
}) => {
  const [inputText, setInputText] = React.useState('');

  if (!isOpen) return null;

  const isConfirmed = !requireTextConfirmation || inputText.trim() === requireTextConfirmation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 font-sans animate-in zoom-in-95 duration-150">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              variant === 'danger' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' :
              variant === 'warning' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' :
              'bg-blue-100 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Administrative confirmation required
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>

        {requireTextConfirmation && (
          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              Type <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">{requireTextConfirmation}</span> to confirm:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={requireTextConfirmation}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            {cancelText}
          </Button>

          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="sm"
            disabled={!isConfirmed}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>

      </div>
    </div>
  );
};
