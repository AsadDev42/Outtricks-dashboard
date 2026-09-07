import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { CommandPalette } from './CommandPalette';
import { GlobalSearchModal } from './GlobalSearchModal';
import { OnboardingModal } from './OnboardingModal';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export interface PlatformLayoutProps {
  children: React.ReactNode;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('outtricks_sidebar_collapsed') === 'true';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('outtricks_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080808] text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-150">
      
      {/* 1. Left Persistent SaaS App Sidebar */}
      <AppSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main App Content Viewport */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:pl-18' : 'lg:pl-64'
        }`}
      >
        {/* Top SaaS App Header */}
        <AppHeader
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Dynamic SaaS Module Workspace (No Marketing Navbar, No Marketing Footer) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* 3. Global App Modals & Command Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
      />

      <OnboardingModal />
    </div>
  );
};
