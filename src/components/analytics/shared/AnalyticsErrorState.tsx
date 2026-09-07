import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '../../ui/Button';

export interface AnalyticsErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const AnalyticsErrorState: React.FC<AnalyticsErrorStateProps> = ({
  title = 'Unable to load analytics telemetry',
  message = 'A temporary network or synchronization error occurred while querying analytics data. Please retry.',
  onRetry,
}) => {
  return (
    <div className="min-h-[300px] rounded-3xl bg-white dark:bg-[#161616] border border-rose-200/80 dark:border-rose-900/60 p-8 flex flex-col items-center justify-center text-center space-y-4 font-sans">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center border border-rose-200 dark:border-rose-800 shadow-xs">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-extrabold text-slate-950 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="primary"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Retry Query
        </Button>
      )}
    </div>
  );
};
