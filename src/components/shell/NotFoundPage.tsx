import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { SEOHead } from '../seo/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 font-sans text-center">
      <SEOHead
        title="404 Page Not Found | Outtricks"
        description="The requested page could not be located on the Outtricks AI revenue platform."
        noindex={true}
      />

      <div className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md border border-emerald-200 dark:border-emerald-900/60">
          <span className="text-3xl font-black font-mono">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            The page or revenue route you are looking for has moved or does not exist. Use the links below to return to the platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="secondary" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
              Live Sandbox
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-[#202020] text-xs text-slate-400 flex items-center justify-center gap-4">
          <Link to="/pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline">
            Pricing
          </Link>
          <span>•</span>
          <Link to="/platform" className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline">
            Platform Overview
          </Link>
          <span>•</span>
          <Link to="/resources/help-center" className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline">
            Help Docs
          </Link>
        </div>

      </div>
    </div>
  );
};
