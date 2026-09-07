import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  action,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${action ? 'sm:flex-row sm:items-end sm:justify-between' : ''} gap-4 mb-6 sm:mb-8 ${className}`}
    >
      <div className={`space-y-2 ${align === 'center' ? 'max-w-2xl' : 'max-w-3xl'}`}>
        {badge && (
          <div>
            {typeof badge === 'string' ? (
              <Badge variant="primary" size="sm" dot>
                {badge}
              </Badge>
            ) : (
              badge
            )}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight font-sans">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 pt-2 sm:pt-0">{action}</div>}
    </div>
  );
};
