import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { 
  Search, 
  Command, 
  Menu, 
  Sparkles, 
  Plus, 
  Sun, 
  Moon,
  Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export interface AppHeaderProps {
  onOpenCommandPalette: () => void;
  onOpenGlobalSearch: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenCommandPalette,
  onOpenGlobalSearch,
  onToggleSidebar,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-white/90 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#222222] px-4 sm:px-6 font-sans transition-colors shrink-0">
      <div className="h-full w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        
        {/* 1. Left Section (Fixed alignment, Mobile menu toggle) */}
        <div className="flex items-center justify-start gap-3 min-w-0">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="h-10 w-10 flex items-center justify-center rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1C1C1C] transition-colors lg:hidden cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 2. Center Section (Always perfectly centered search bar with fixed max-width and stable height) */}
        <div className="w-full max-w-[420px] lg:max-w-[480px] hidden md:flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="w-full h-10 flex items-center justify-between px-3.5 rounded-full bg-slate-100/90 dark:bg-[#141414] hover:bg-slate-200/80 dark:hover:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#242424] text-xs text-slate-500 dark:text-[#777777] transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#777777] group-hover:text-primary dark:group-hover:text-white transition-colors shrink-0" />
              <span className="truncate dark:text-[#A0A0A0]">Search modules, commands, prospects...</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-[#202020] text-slate-600 dark:text-[#B5B5B5] rounded border border-slate-200 dark:border-[#2A2A2A] shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* 3. Right Section (Evenly spaced actions: Mobile search, Notifications, Theme toggle, Co-Pilot AI) */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          
          {/* Mobile Search Trigger */}
          <button
            type="button"
            onClick={onOpenGlobalSearch}
            className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C] border border-slate-200/90 dark:border-[#242424] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white md:hidden cursor-pointer shadow-xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications */}
          {isAuthenticated && <NotificationCenter />}

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme appearance"
            className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C] border border-slate-200/90 dark:border-[#242424] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Tricksy AI Assistant Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-copilot-drawer'))}
            className="h-10 px-3.5 rounded-2xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold shadow-xs shadow-primary/25 transition-all flex items-center gap-2 cursor-pointer shrink-0 group"
            title="Open Tricksy AI Assistant"
            aria-label="Open Tricksy AI Assistant"
          >
            <Sparkles className="w-4 h-4 animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-sans">Tricksy AI</span>
          </button>
        </div>

      </div>
    </header>
  );
};
