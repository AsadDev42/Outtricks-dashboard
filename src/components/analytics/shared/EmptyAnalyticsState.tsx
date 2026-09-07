import React from 'react';
import { BarChart2, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';

export interface EmptyAnalyticsStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export const EmptyAnalyticsState: React.FC<EmptyAnalyticsStateProps> = ({
  title = 'No analytics telemetry recorded yet',
  description = 'Start campaigns, send outreach messages, or execute workflows to generate live revenue intelligence here.',
  actionLabel,
  onAction,
  icon: Icon = BarChart2,
}) => {
  return (
    <div className="min-h-[320px] rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] p-8 flex flex-col items-center justify-center text-center space-y-4 font-sans">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="sm"
          onClick={onAction}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
