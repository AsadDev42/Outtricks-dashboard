import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppPrimarySidebar, PRIMARY_NAV_ITEMS } from './AppPrimarySidebar';
import { AppSubSidebar } from './AppSubSidebar';
import { CommandPalette } from './CommandPalette';
import { GlobalSearchModal } from './GlobalSearchModal';
import { OnboardingModal } from './OnboardingModal';
import { FloatingCoPilotDrawer } from './FloatingCoPilotDrawer';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { GlobalTabBar } from './GlobalTabBar';
import { X } from 'lucide-react';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [activePrimaryId, setActivePrimaryId] = useState<string>(() => {
    const p = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    if (
      p === '/' ||
      p === '/master-box' ||
      p.startsWith('/master-box/') ||
      p === '/copilot' ||
      p.startsWith('/copilot/') ||
      p === '/chat' ||
      p.startsWith('/chat/') ||
      p === '/ai-chat' ||
      p.startsWith('/ai-chat/') ||
      p === '/dashboard' ||
      p === '/command-center' ||
      p === '/app' ||
      p === '/app/copilot' ||
      p === '/app/dashboard'
    ) {
      return 'copilot';
    }
    const matched = PRIMARY_NAV_ITEMS.find((item) =>
      item.matchPrefixes.some((pref) => p === pref || p.startsWith(`${pref}/`))
    );
    return matched?.id || 'copilot';
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Sync active primary id on location change & close mobile nav
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    if (
      currentPath === '/' || 
      currentPath === '/master-box' ||
      currentPath.startsWith('/master-box/') ||
      currentPath === '/copilot' || 
      currentPath.startsWith('/copilot/') ||
      currentPath === '/chat' ||
      currentPath.startsWith('/chat/') ||
      currentPath === '/ai-chat' ||
      currentPath.startsWith('/ai-chat/') ||
      currentPath === '/dashboard' || 
      currentPath === '/command-center' || 
      currentPath === '/app' || 
      currentPath === '/app/dashboard' || 
      currentPath === '/app/copilot'
    ) {
      setActivePrimaryId('copilot');
    } else {
      const sorted = [...PRIMARY_NAV_ITEMS].sort((a, b) => {
        const maxA = Math.max(...a.matchPrefixes.map((p) => p.length));
        const maxB = Math.max(...b.matchPrefixes.map((p) => p.length));
        return maxB - maxA;
      });
      const matched = sorted.find((item) =>
        item.matchPrefixes.some((prefix) => currentPath === prefix || currentPath.startsWith(`${prefix}/`))
      );
      if (matched) {
        setActivePrimaryId(matched.id);
      }
    }
    setIsMobileNavOpen(false);
  }, [location.pathname]);

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

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080808] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    );
  }

  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const isMasterBoxOrAiChat = 
    activePrimaryId === 'copilot' ||
    activePrimaryId === 'master-box' ||
    currentPath === '/' ||
    currentPath === '/master-box' ||
    currentPath.startsWith('/master-box/') ||
    currentPath === '/copilot' ||
    currentPath.startsWith('/copilot/') ||
    currentPath === '/chat' ||
    currentPath.startsWith('/chat/') ||
    currentPath === '/ai-chat' ||
    currentPath.startsWith('/ai-chat/') ||
    currentPath === '/dashboard' ||
    currentPath === '/command-center' ||
    currentPath === '/app' ||
    currentPath === '/app/copilot' ||
    currentPath === '/app/dashboard';

  const isInboxOrMail =
    activePrimaryId === 'inbox' ||
    activePrimaryId === 'mail' ||
    currentPath === '/inbox' ||
    currentPath.startsWith('/inbox/') ||
    currentPath === '/mail' ||
    currentPath.startsWith('/mail/') ||
    currentPath === '/messages' ||
    currentPath.startsWith('/messages/') ||
    currentPath === '/app/inbox' ||
    currentPath.startsWith('/app/inbox/') ||
    currentPath === '/app/mail' ||
    currentPath.startsWith('/app/mail/');

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080808] text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-150 overflow-x-hidden">
      
      {/* 1. Desktop Persistent Left Navigation (Primary + Sub-Sidebar) */}
      <div className="hidden lg:flex shrink-0">
        <AppPrimarySidebar
          activePrimaryId={activePrimaryId}
          onSelectPrimary={setActivePrimaryId}
        />
        {!isMasterBoxOrAiChat && !isInboxOrMail && (
          <AppSubSidebar
            activePrimaryId={activePrimaryId}
          />
        )}
      </div>

      {/* 2. Mobile / Tablet Responsive Navigation Drawer Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Sliding Navigation Container */}
          <div className="relative flex z-10 shadow-2xl animate-in slide-in-from-left duration-200 h-full">
            <AppPrimarySidebar
              activePrimaryId={activePrimaryId}
              onSelectPrimary={(id) => {
                setActivePrimaryId(id);
              }}
            />
            {!isMasterBoxOrAiChat && !isInboxOrMail && (
              <AppSubSidebar
                activePrimaryId={activePrimaryId}
              />
            )}

            {/* Close Button Top-Right of Drawer */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-20 cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Platform App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden">
        {/* Top SaaS App Header */}
        <AppHeader
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
          onToggleSidebar={() => setIsMobileNavOpen((prev) => !prev)}
          isSidebarCollapsed={!isMobileNavOpen}
        />

        {/* Global Internal Application Tabs */}
        <GlobalTabBar />

        {/* Dynamic SaaS Module Workspace */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 2xl:p-8 max-w-[1920px] w-full mx-auto min-w-0">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Global App Modals & Command Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
      />

      <OnboardingModal />

      {/* Global AI Co-Pilot Floating Assistant */}
      <FloatingCoPilotDrawer />
    </div>
  );
};
