import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  subMessage,
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center space-y-3 ${className}`}>
      <Loader2 className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400 animate-spin`} />
      <div className="space-y-0.5">
        <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
          {message}
        </div>
        {subMessage && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">{subMessage}</p>
        )}
      </div>
    </div>
  );
};
