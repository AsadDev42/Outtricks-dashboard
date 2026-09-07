import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-12 px-6 rounded-3xl border border-dashed border-slate-200 dark:border-[#2A2A2A] bg-slate-50/40 dark:bg-[#161616]/40 max-w-lg mx-auto space-y-4 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs border border-emerald-500/20 dark:border-emerald-800/40">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight font-sans">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-sans">
          {description}
        </p>
      </div>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {secondaryActionLabel && (
            <Button variant="secondary" size="sm" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
          {actionLabel && (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
