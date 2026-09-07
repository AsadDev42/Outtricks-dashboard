import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, CheckCircle2, Sliders, Settings2 } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';

export const CookiePolicyPage: React.FC = () => {
  const handleOpenPreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <div className="space-y-16 sm:space-y-20 pt-20 pb-24 font-sans text-slate-700 dark:text-slate-300">
      
      {/* 1. SEO Head */}
      <SEOHead 
        title="Cookie Policy & Tracking Preferences | Outtricks"
        description="Understand how Outtricks utilizes essential, functional, and analytics cookies, and learn how to manage your privacy preferences."
        canonical="https://outtricks.com/cookies"
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Legal', url: 'https://outtricks.com/cookies' },
          { name: 'Cookie Policy', url: 'https://outtricks.com/cookies' }
        ]}
      />

      {/* =========================================================================
          HERO & HEADER
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">Cookie Policy</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-slate-200/80 dark:border-[#2A2A2A]">
              PRIVACY & TRACKING
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Outtricks Cookie Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last Updated: August 26, 2026 • Effective Date: January 1, 2026
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            This Cookie Policy explains how Outtricks Inc. (&quot;Outtricks,&quot; &quot;we,&quot; or &quot;us&quot;) uses cookies, local web storage, and related technologies on our website and revenue management platform.
          </p>

          <div>
            <button
              type="button"
              onClick={handleOpenPreferences}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Settings2 className="w-4 h-4" />
              <span>Manage Cookie Preferences</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          POLICY CONTENT SECTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-12 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-12 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">01.</span>
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make web applications function efficiently, remember user preferences, maintain active login sessions, and provide anonymized usage analytics.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">02.</span>
              Categories of Cookies We Use
            </h2>
            <p>
              We categorize our cookies and web storage into three clear functional groups:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                    Strictly Necessary Cookies
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                    Always Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  These cookies and session tokens are strictly necessary to enable core platform features, including user authentication, session security, CSRF protection, and load balancing. Because the platform cannot function without these items, they cannot be disabled.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                    Functional & Preference Cookies
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
                    Optional
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Functional cookies allow the website to remember choices you make, such as your light/dark theme preference and dashboard filter states, providing a more personalized experience.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                    Analytics & Performance Cookies
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
                    Optional
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Analytics cookies help us understand how visitors interact with the website by collecting aggregated, anonymized metrics on page traffic and error rates. They are only loaded when you provide consent.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">03.</span>
              Managing Your Cookie Preferences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              You can change or withdraw your consent for non-essential cookies at any time using our built-in cookie preferences controller or via your browser settings:
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#222222] hover:bg-slate-200 dark:hover:bg-[#1a2644] text-slate-900 dark:text-white font-bold text-xs transition-all cursor-pointer border border-slate-200 dark:border-[#2A2A2A]"
              >
                Open Cookie Preferences Modal →
              </button>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">04.</span>
              Contact Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              For questions regarding our use of cookies or privacy practices, please contact:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Outtricks Privacy Operations</p>
              <p className="text-slate-600 dark:text-slate-400">Email: <span className="font-mono text-blue-600 dark:text-blue-400">privacy@outtricks.com</span></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
