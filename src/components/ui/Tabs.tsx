import React from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline' | 'segmented' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  size = 'md',
  className = '',
  fullWidth = false,
}) => {
  const sizes = {
    sm: 'text-xs min-h-[34px] px-3.5 py-1.5 gap-1.5 leading-tight',
    md: 'text-xs sm:text-sm min-h-[40px] px-4 py-2 gap-2 leading-tight',
    lg: 'text-sm sm:text-base min-h-[46px] px-5 py-2.5 gap-2.5 leading-tight',
  };

  // Helper to render label content with vertical centering support for both single-line & multi-line labels
  const renderTabContent = (tab: TabItem) => {
    return (
      <div className="inline-flex items-center justify-center gap-1.5 max-w-full text-center leading-tight">
        {tab.icon && (
          <span className="shrink-0 inline-flex items-center justify-center">
            {tab.icon}
          </span>
        )}
        <span className="inline-flex flex-col items-center justify-center text-center leading-tight">
          {tab.label}
        </span>
        {tab.badge && (
          <span className="shrink-0 inline-flex items-center justify-center">
            {tab.badge}
          </span>
        )}
      </div>
    );
  };

  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        className={`inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#141414] border border-slate-200/80 dark:border-[#242424] box-border ${
          fullWidth ? 'w-full grid' : ''
        } ${className}`}
        style={fullWidth ? { gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` } : undefined}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.id)}
              className={`inline-flex items-center justify-center font-bold rounded-xl transition-all select-none cursor-pointer box-border ${
                sizes[size]
              } ${
                isActive
                  ? 'bg-primary text-white shadow-xs border border-primary'
                  : 'text-slate-600 dark:text-[#8A8A8A] hover:text-slate-950 dark:hover:text-white'
              } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {renderTabContent(tab)}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        className={`flex items-center gap-6 border-b border-slate-200 dark:border-[#242424] overflow-x-auto no-scrollbar box-border ${className}`}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.id)}
              className={`inline-flex items-center justify-center py-2.5 px-1 border-b-2 font-bold transition-all whitespace-nowrap select-none cursor-pointer box-border ${
                sizes[size]
              } ${
                isActive
                  ? 'border-primary text-primary font-black'
                  : 'border-transparent text-slate-500 dark:text-[#8A8A8A] hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-[#333333]'
              } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {renderTabContent(tab)}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: pills variant with perfect vertical centering
  return (
    <div
      role="tablist"
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar box-border ${
        fullWidth ? 'w-full grid' : ''
      } ${className}`}
      style={fullWidth ? { gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` } : undefined}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={`inline-flex items-center justify-center font-bold rounded-2xl transition-all select-none cursor-pointer box-border ${
              sizes[size]
            } ${
              isActive
                ? 'bg-primary text-white shadow-xs border border-transparent'
                : 'bg-white dark:bg-[#141414] text-slate-700 dark:text-[#B5B5B5] hover:bg-slate-50 dark:hover:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#242424]'
            } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {renderTabContent(tab)}
          </button>
        );
      })}
    </div>
  );
};
