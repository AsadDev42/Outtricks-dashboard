import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'outline' | 'subtle';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xs',
    elevated: 'bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)]',
    glass: 'liquid-glass-card',
    outline: 'bg-transparent border border-slate-200 dark:border-[#2A2A2A]',
    subtle: 'bg-slate-50 dark:bg-[#121212] border border-slate-200/70 dark:border-[#202020]',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-primary-border dark:hover:border-primary-border dark:hover:bg-[#1A1A1A] hover:-translate-y-0.5 hover:shadow-md cursor-pointer'
    : 'transition-colors duration-150';

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`space-y-1.5 pb-4 border-b border-slate-100 dark:border-[#202020] mb-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-base sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight font-sans ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`pt-4 mt-5 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between gap-3 ${className}`} {...props}>
    {children}
  </div>
);
