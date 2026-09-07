import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  placement?: 'right' | 'left' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  placement = 'right',
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  footer,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const sizes = {
    sm: placement === 'bottom' ? 'max-h-[40vh]' : 'max-w-sm',
    md: placement === 'bottom' ? 'max-h-[60vh]' : 'max-w-md',
    lg: placement === 'bottom' ? 'max-h-[80vh]' : 'max-w-xl',
    xl: placement === 'bottom' ? 'max-h-[90vh]' : 'max-w-3xl',
    full: placement === 'bottom' ? 'max-h-[95vh]' : 'max-w-full',
  };

  const placements = {
    right: {
      position: 'inset-y-0 right-0 border-l',
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    left: {
      position: 'inset-y-0 left-0 border-r',
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    bottom: {
      position: 'inset-x-0 bottom-0 rounded-t-3xl border-t',
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
    },
  };

  const currentPlacement = placements[placement];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1000] overflow-hidden"
        >
          {/* Backdrop with Motion Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm"
            onClick={() => closeOnBackdrop && onClose()}
          />

          {/* Drawer Panel with Spring Transition */}
          <motion.div
            initial={currentPlacement.initial}
            animate={currentPlacement.animate}
            exit={currentPlacement.exit}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className={`fixed ${currentPlacement.position} ${sizes[size]} w-full bg-white dark:bg-[#161616] border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl z-10 flex flex-col justify-between overflow-hidden ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-6 bg-white dark:bg-[#1C1C1C] border-b border-slate-100 dark:border-[#262626] shrink-0">
                <div className="space-y-1">
                  {title && (
                    <h3 className="text-lg font-extrabold text-slate-950 dark:text-white tracking-tight font-sans">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-xs text-slate-500 dark:text-[#A0A0A0] font-sans">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#222222] transition-colors cursor-pointer shrink-0"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 font-sans">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="p-5 bg-slate-50/70 dark:bg-[#181818] border-t border-slate-100 dark:border-[#262626] flex items-center justify-end gap-3 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};