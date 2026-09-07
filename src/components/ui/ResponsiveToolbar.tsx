import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  priority?: 'high' | 'medium' | 'low';
  disabled?: boolean;
}

export interface ResponsiveToolbarProps {
  primaryActions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  searchFilter?: React.ReactNode;
  className?: string;
}

export const ResponsiveToolbar: React.FC<ResponsiveToolbarProps> = ({
  primaryActions,
  secondaryActions,
  searchFilter,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs ${className}`}
    >
      {searchFilter && (
        <div className="flex-1 w-full sm:max-w-md">
          {searchFilter}
        </div>
      )}

      <div className="flex items-center flex-wrap gap-2 justify-start sm:justify-end w-full sm:w-auto">
        {secondaryActions}
        {primaryActions}
      </div>
    </div>
  );
};
