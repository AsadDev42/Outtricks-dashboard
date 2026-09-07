import React from 'react';

export interface ResponsiveTabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface ResponsiveTabsProps {
  tabs: ResponsiveTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'pill' | 'underline';
}

export const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'pill',
}) => {
  return (
    <div className={`overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 ${className}`}>
      <div
        className={`flex items-center min-w-max gap-1.5 ${
          variant === 'pill'
            ? 'p-1 bg-slate-100 dark:bg-white/[0.04] rounded-2xl border border-slate-200/80 dark:border-[#202020]'
            : 'border-b border-slate-200 dark:border-[#2A2A2A]'
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          if (variant === 'underline') {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={`inline-flex flex-row items-center gap-2 py-3 px-4 text-xs font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive
                        ? 'bg-primary-muted text-primary'
                        : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.badge}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`inline-flex flex-row items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#1C1C1C]'
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    isActive
                      ? 'bg-primary-hover text-white font-bold'
                      : 'bg-slate-200/60 dark:bg-[#181818] text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge}
            </button>
          );
        })}
      </div>
    </div>
  );
};
