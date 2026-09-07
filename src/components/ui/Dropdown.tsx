import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger' | 'header';
  disabled?: boolean;
  divider?: boolean;
  badge?: React.ReactNode;
  shortcut?: string;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  menuClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  placement = 'bottom-right',
  className = '',
  menuClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const placements = {
    'bottom-right': 'top-full right-0 mt-2',
    'bottom-left': 'top-full left-0 mt-2',
    'top-right': 'bottom-full right-0 mb-2',
    'top-left': 'bottom-full left-0 mb-2',
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className={`absolute z-[800] min-w-[220px] p-1.5 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${placements[placement]} ${menuClassName}`}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`div_${index}`}
                  className="my-1.5 border-t border-slate-100 dark:border-[#202020]"
                />
              );
            }

            if (item.variant === 'header') {
              return (
                <div
                  key={`header_${index}`}
                  className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans select-none"
                >
                  {item.label}
                </div>
              );
            }

            const itemVariants = {
              default:
                'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white',
              danger:
                'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50',
              header: '',
            };

            return (
              <button
                key={item.id || `item_${index}`}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between text-left gap-3 px-3 py-2 rounded-xl text-xs font-semibold font-sans transition-colors cursor-pointer select-none ${
                  itemVariants[item.variant || 'default']
                } ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-start text-left gap-2.5 min-w-0 flex-1">
                  {item.icon && <span className="w-4 h-4 shrink-0 inline-flex items-center justify-center text-slate-400">{item.icon}</span>}
                  <span className="truncate text-left flex-1">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.badge}
                  {item.shortcut && (
                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-[#181818] text-slate-500 rounded border border-slate-200 dark:border-[#2A2A2A]">
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
