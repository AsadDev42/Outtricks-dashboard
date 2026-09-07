import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: React.ReactNode;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onDismiss,
  icon,
  className = '',
  ...props
}) => {
  const defaultIcons = {
    info: <Info className="w-5 h-5 text-primary shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
  };

  const variants = {
    info: 'bg-primary-muted border-primary-border text-slate-900 dark:text-white',
    success: 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200',
    warning: 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200',
    error: 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200',
  };

  return (
    <div
      role="alert"
      className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="mt-0.5">{icon || defaultIcons[variant]}</div>
      <div className="flex-1 space-y-1 min-w-0">
        {title && <h4 className="text-xs sm:text-sm font-extrabold font-sans">{title}</h4>}
        <div className="text-xs font-sans leading-relaxed opacity-90">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
