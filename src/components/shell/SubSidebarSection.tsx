import React from 'react';
import { SubSidebarItem } from './SubSidebarItem';

export interface SubSidebarItemConfig {
  title: string;
  href: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SubSidebarSectionProps {
  heading: string;
  items: SubSidebarItemConfig[];
  currentPath: string;
  isCollapsed?: boolean;
  isItemActive: (itemHref: string, currentPath: string) => boolean;
  onItemClick?: () => void;
}

export const SubSidebarSection: React.FC<SubSidebarSectionProps> = ({
  heading,
  items,
  currentPath,
  isCollapsed = false,
  isItemActive,
  onItemClick,
}) => {
  return (
    <div>
      {!isCollapsed && (
        <div className="px-2.5 mb-2 text-[10.5px] font-semibold text-slate-400/80 uppercase tracking-[0.04em] transition-opacity duration-150">
          {heading}
        </div>
      )}

      <div className={isCollapsed ? 'space-y-1.5 flex flex-col items-center' : 'space-y-[3px]'}>
        {items.map((item, idx) => {
          const active = isItemActive(item.href, currentPath);
          return (
            <SubSidebarItem
              key={idx}
              title={item.title}
              href={item.href}
              badge={item.badge}
              icon={item.icon}
              isCollapsed={isCollapsed}
              isActive={active}
              onClick={onItemClick}
            />
          );
        })}
      </div>
    </div>
  );
};
