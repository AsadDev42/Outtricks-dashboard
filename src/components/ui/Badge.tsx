import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'indigo' | 'cyan' | 'slate' | 'outline' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-muted text-primary border-primary-border',
    blue: 'bg-primary-muted text-primary border-primary-border',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/60',
    amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60',
    rose: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60',
    purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60',
    slate: 'bg-slate-100 dark:bg-[#1C1C1C] text-slate-700 dark:text-[#CCCCCC] border-slate-200 dark:border-[#2A2A2A]',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-[#2A2A2A]',
    liquid: 'liquid-glass-pill text-slate-800 dark:text-slate-200',
  };

  const dotColors = {
    primary: 'bg-primary',
    blue: 'bg-primary',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    cyan: 'bg-cyan-500',
    slate: 'bg-slate-400',
    outline: 'bg-slate-400',
    liquid: 'bg-primary',
  };

  const sizes = {
    sm: 'text-[10px] min-h-[22px] px-2 py-0.5 gap-1 leading-tight',
    md: 'text-[11px] min-h-[26px] px-2.5 py-1 gap-1.5 leading-tight',
    lg: 'text-xs min-h-[30px] px-3 py-1.5 gap-2 leading-tight',
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-center font-bold font-sans rounded-full border transition-all select-none box-border leading-tight whitespace-nowrap shrink-0 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]} ${
            pulse ? 'animate-pulse' : ''
          }`}
        />
      )}
      <span className="inline-flex items-center justify-center leading-tight text-center">
        {children}
      </span>
    </span>
  );
};
