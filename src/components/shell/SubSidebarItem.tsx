import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export interface SubSidebarItemProps {
  title: string;
  href: string;
  badge?: string;
  isActive: boolean;
  isCollapsed?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  indented?: boolean;
  onClick?: () => void;
}

export const SubSidebarItem: React.FC<SubSidebarItemProps> = ({
  title,
  href,
  badge,
  isActive,
  isCollapsed = false,
  icon: Icon,
  indented = false,
  onClick,
}) => {
  if (isCollapsed) {
    return (
      <Tooltip content={title} placement="right" delay={200}>
        <Link
          to={href}
          onClick={onClick}
          className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer select-none relative group ${
            isActive
              ? 'bg-primary text-white shadow-md shadow-primary/25 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
          }`}
          aria-label={title}
        >
          {Icon ? (
            <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
          ) : (
            <Layers className="w-4 h-4 transition-transform group-hover:scale-110" />
          )}
          {badge && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white dark:ring-[#0F0F0F]" />
          )}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center justify-between min-h-[34px] h-[34px] ${
        indented ? 'pl-4 pr-2.5' : 'px-2.5'
      } rounded-xl text-[13px] transition-all duration-150 cursor-pointer box-border leading-tight shrink-0 select-none ${
        isActive
          ? 'bg-primary text-white font-bold shadow-xs border border-primary/40'
          : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-white/[0.06] border border-transparent'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {Icon && (
          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300'}`} />
        )}
        <span className="truncate inline-flex items-center leading-tight">{title}</span>
      </div>
      {badge && (
        <span
          className={`text-[9px] font-mono px-1.5 py-0.5 rounded inline-flex items-center justify-center leading-none ${
            isActive
              ? 'bg-black/25 text-white font-bold'
              : 'bg-primary-muted text-primary font-bold'
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};
