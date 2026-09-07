import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9) + Date.now();
    const duration = toast.duration ?? 4000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => {
    return addToast({ type: 'success', message, title });
  }, [addToast]);

  const error = useCallback((message: string, title?: string) => {
    return addToast({ type: 'error', message, title });
  }, [addToast]);

  const info = useCallback((message: string, title?: string) => {
    return addToast({ type: 'info', message, title });
  }, [addToast]);

  const warning = useCallback((message: string, title?: string) => {
    return addToast({ type: 'warning', message, title });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{ toasts: ToastItem[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-200/80 dark:border-emerald-900/60 bg-white/95 dark:bg-[#161616]/95',
          error: 'border-rose-200/80 dark:border-rose-900/60 bg-white/95 dark:bg-[#161616]/95',
          warning: 'border-amber-200/80 dark:border-amber-900/60 bg-white/95 dark:bg-[#161616]/95',
          info: 'border-blue-200/80 dark:border-blue-900/60 bg-white/95 dark:bg-[#161616]/95',
        };

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-start gap-3 transition-all duration-200 animate-in slide-in-from-bottom-3 ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 space-y-0.5 min-w-0">
              {toast.title && (
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {toast.title}
                </div>
              )}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                {toast.message}
              </p>
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action?.onClick();
                    onRemove(toast.id);
                  }}
                  className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
