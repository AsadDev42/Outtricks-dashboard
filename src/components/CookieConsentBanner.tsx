import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Check, X, Sliders, Settings2, Sparkles, CheckCircle2 } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  savedAt: number;
}

const STORAGE_KEY = 'outtricks_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
    savedAt: 0
  });

  useEffect(() => {
    // Check if user already saved consent
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setPreferences(parsed);
        setShowBanner(false);
      } else {
        // Show banner after brief delay for smooth appearance
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setShowBanner(true);
    }

    // Listen for custom event to reopen preferences from footer or legal pages
    const handleOpenPreferences = () => {
      setShowModal(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const updated: CookiePreferences = {
      ...prefs,
      necessary: true,
      savedAt: Date.now()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    setPreferences(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      savedAt: Date.now()
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      savedAt: Date.now()
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  return (
    <>
      {/* =====================================================================
          1. BOTTOM FLOATING COOKIE BANNER (For first-time visitors)
          ===================================================================== */}
      {showBanner && !showModal && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300 font-sans">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-950 dark:text-white">
                  We respect your privacy
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  We use cookies to maintain your workspace session, remember preferences, and analyze platform traffic. Read our{' '}
                  <Link to="/cookies" className="text-blue-600 dark:text-blue-400 underline font-bold">Cookie Policy</Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 py-2.5 px-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer text-center"
              >
                Accept All
              </button>
              
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:flex-1 py-2.5 px-3.5 rounded-full bg-slate-100 dark:bg-[#222222] hover:bg-slate-200 dark:hover:bg-[#1a2644] text-slate-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer text-center border border-slate-200 dark:border-[#2A2A2A]"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto p-2.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
                title="Manage Preferences"
                aria-label="Manage Preferences"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          2. COOKIE PREFERENCES MODAL (Interactive Configuration)
          ===================================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="w-full max-w-lg bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#202020] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Cookie Preferences</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Control which cookies you permit on Outtricks</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Category 1: Strictly Necessary (Locked) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Strictly Necessary
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Essential for workspace authentication, security validation, and session management. Cannot be disabled.
                </p>
              </div>

              {/* Category 2: Functional */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Functional & UI Preferences
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Remembers your light/dark theme choice, language settings, and interface filter preferences.
                </p>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Analytics & Performance
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Collects aggregated, anonymous usage data to help us identify performance bottlenecks and improve features.
                </p>
              </div>

              {/* Category 4: Marketing */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Marketing & Conversion
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Helps us evaluate marketing campaign effectiveness across partner channels.
                </p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-[#202020]">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 dark:bg-[#222222] hover:bg-slate-200 dark:hover:bg-[#1a2644] text-slate-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
              >
                Reject All Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
