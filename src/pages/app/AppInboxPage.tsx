import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  MasterInboxProvider, 
  useMasterInbox 
} from '../../context/MasterInboxContext';
import { 
  ConversationList, 
  ConversationView, 
  ContactCrmSidebar,
  AddLabelModal,
  ScheduleMeetingModal,
  KeyboardShortcutsModal
} from '../../components/inbox';

const AppInboxPageContent: React.FC = () => {
  const location = useLocation();
  const { 
    setActiveFolder,
    allFilteredConversations,
    activeConversationId,
    setActiveConversationId,
    markAsRead,
    toggleArchived,
    toggleInterested
  } = useMasterInbox();

  const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false);
  const [isScheduleMeetingModalOpen, setIsScheduleMeetingModalOpen] = useState(false);
  const [isContactSidebarOpen, setIsContactSidebarOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  // Synchronize route pathname to activeFolder in context
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/unread')) {
      setActiveFolder('unread');
    } else if (p.includes('/interested')) {
      setActiveFolder('interested');
    } else if (p.includes('/meetings')) {
      setActiveFolder('meetings');
    } else if (p.includes('/archived')) {
      setActiveFolder('archived');
    } else if (p.includes('/labels')) {
      setActiveFolder('labels');
    } else if (p.includes('/email')) {
      setActiveFolder('email');
    } else if (p.includes('/linkedin')) {
      setActiveFolder('linkedin');
    } else if (p.includes('/voice')) {
      setActiveFolder('voice');
    } else {
      setActiveFolder('all');
    }
  }, [location.pathname, setActiveFolder]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          (typeof target.closest === 'function' && Boolean(target.closest('[role="dialog"]'))));

      if (isInputFocused) {
        if (e.key === 'Escape' && isShortcutsModalOpen) {
          setIsShortcutsModalOpen(false);
        }
        return;
      }

      // '?' or 'Shift + /' -> Toggle shortcuts modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (isShortcutsModalOpen) {
          setIsShortcutsModalOpen(false);
        }
        return;
      }

      // 'j' or 'ArrowDown' -> next conversation thread
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (allFilteredConversations.length === 0) return;
        const currentIndex = allFilteredConversations.findIndex((c) => c.id === activeConversationId);
        const nextIndex = currentIndex < allFilteredConversations.length - 1 ? currentIndex + 1 : 0;
        const nextThread = allFilteredConversations[nextIndex];
        if (nextThread) {
          setActiveConversationId(nextThread.id);
          if (nextThread.unread) markAsRead(nextThread.id);
        }
        return;
      }

      // 'k' or 'ArrowUp' -> previous conversation thread
      if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (allFilteredConversations.length === 0) return;
        const currentIndex = allFilteredConversations.findIndex((c) => c.id === activeConversationId);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allFilteredConversations.length - 1;
        const prevThread = allFilteredConversations[prevIndex];
        if (prevThread) {
          setActiveConversationId(prevThread.id);
          if (prevThread.unread) markAsRead(prevThread.id);
        }
        return;
      }

      // 'e' -> mark as read / archive active conversation
      if (e.key === 'e' && activeConversationId) {
        e.preventDefault();
        toggleArchived(activeConversationId);
        return;
      }

      // 's' -> toggle star / interested
      if (e.key === 's' && activeConversationId) {
        e.preventDefault();
        toggleInterested(activeConversationId);
        return;
      }

      // 'r' -> focus reply composer textarea
      if (e.key === 'r' && activeConversationId) {
        e.preventDefault();
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
        if (textarea) {
          textarea.focus();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allFilteredConversations, activeConversationId, isShortcutsModalOpen, setActiveConversationId, markAsRead, toggleArchived, toggleInterested]);

  return (
    <div className="font-sans h-[calc(100vh-7rem)] sm:h-[calc(100vh-8.5rem)] flex flex-col min-w-0">
      <SEOHead
        title="Master Unified Inbox | Outtricks Platform"
        description="Unified conversations across cold email, LinkedIn DMs, and Voice AI call transcripts with real-time response tracking."
        noindex={true}
      />

      {/* 2-Pane / 3-Pane Full-Width Responsive Master Inbox Layout (Zero Sub-Sidebar) */}
      <div className="flex-1 min-h-0 bg-white dark:bg-[#161616] rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden flex relative">
        
        {/* 1. Left Conversation List Pane */}
        <div className={`
          ${mobileView === 'list' ? 'flex w-full md:w-80 lg:w-[380px] xl:w-[420px]' : 'hidden md:flex md:w-80 lg:w-[380px] xl:w-[420px]'}
          shrink-0 h-full
        `}>
          <ConversationList
            onSelectThreadMobile={() => setMobileView('detail')}
            onOpenAddLabelModal={() => setIsAddLabelModalOpen(true)}
            onOpenShortcutsModal={() => setIsShortcutsModalOpen(true)}
          />
        </div>

        {/* 2. Center/Right Conversation View & Reply Composer (Expands to fill all available horizontal space) */}
        <div className={`
          ${mobileView === 'detail' ? 'flex flex-1 w-full absolute inset-0 z-20 md:static md:w-auto' : 'hidden md:flex md:flex-1'}
          h-full min-w-0
        `}>
          <ConversationView
            onOpenScheduleMeetingModal={() => setIsScheduleMeetingModalOpen(true)}
            onToggleContactSidebar={() => setIsContactSidebarOpen(!isContactSidebarOpen)}
            onBackMobile={() => setMobileView('list')}
          />
        </div>

        {/* 3. Collapsible Far-Right Contact & CRM Record Panel */}
        <ContactCrmSidebar
          isOpen={isContactSidebarOpen}
          onClose={() => setIsContactSidebarOpen(false)}
        />

      </div>

      {/* Modals */}
      <AddLabelModal
        isOpen={isAddLabelModalOpen}
        onClose={() => setIsAddLabelModalOpen(false)}
      />

      <ScheduleMeetingModal
        isOpen={isScheduleMeetingModalOpen}
        onClose={() => setIsScheduleMeetingModalOpen(false)}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

    </div>
  );
};

export const AppInboxPage: React.FC = () => {
  return <AppInboxPageContent />;
};

export default AppInboxPage;
