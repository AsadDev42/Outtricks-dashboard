import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { CookieConsentBanner } from '../CookieConsentBanner';
import { BackToTopButton } from '../BackToTopButton';
import { FloatingAiChat } from '../FloatingAiChat';
import { SubtleCursorGlow } from '../SubtleCursorGlow';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Public Marketing Website Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      {/* Public Marketing Website Footer */}
      <Footer />

      {/* Ambient Marketing Widgets */}
      <CookieConsentBanner />
      <BackToTopButton />
      <FloatingAiChat />
      <SubtleCursorGlow />
    </div>
  );
};
