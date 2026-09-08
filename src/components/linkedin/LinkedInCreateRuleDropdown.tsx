import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Zap, ChevronDown, Sliders } from 'lucide-react';
import { Button } from '../ui/Button';

export interface LinkedInCreateRuleDropdownProps {
  onOpenCreateRule: () => void;
  onOpenAiRuleBuilder?: () => void;
  buttonVariant?: 'secondary' | 'primary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const LinkedInCreateRuleDropdown: React.FC<LinkedInCreateRuleDropdownProps> = ({
  onOpenCreateRule,
  onOpenAiRuleBuilder,
  buttonVariant = 'secondary',
  size = 'sm',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectAi = () => {
    setIsOpen(false);
    onOpenAiRuleBuilder?.();
  };

  const handleSelectManual = () => {
    setIsOpen(false);
    onOpenCreateRule();
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Consolidated Single Button */}
      <Button
        variant={buttonVariant}
        size={size}
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={<Zap className="w-3.5 h-3.5 text-primary" />}
        rightIcon={
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        }
        className="font-bold cursor-pointer select-none"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Create Rule options"
      >
        Create Rule
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-black/10 dark:shadow-black/50 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top"
        >
          <div className="space-y-1">
            {/* 1. Make Rule with AI */}
            {onOpenAiRuleBuilder && (
              <button
                type="button"
                role="menuitem"
                onClick={handleSelectAi}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#202020] text-left transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Make Rule with AI</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary/15 text-primary">
                      AI
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Generate triggers & actions via prompt
                  </div>
                </div>
              </button>
            )}

            {/* 2. Create Rule Manually */}
            <button
              type="button"
              role="menuitem"
              onClick={handleSelectManual}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#202020] text-left transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#222222] border border-slate-200/80 dark:border-[#2C2C2C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sliders className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Create Rule Manually
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Configure triggers, conditions & steps
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
