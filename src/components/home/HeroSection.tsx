import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductShowcaseTabs } from './ProductShowcaseTabs';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden">
      
      {/* Background Atmosphere with Subtle Corporate Blue #3B82F6 Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-[#3B82F6]/15 via-blue-500/10 to-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* =========================================================================
            MAIN HERO CENTRAL CONTENT (Spacious, Balanced, Zero Clutter)
            ========================================================================= */}
        <div className="relative text-center max-w-4xl mx-auto space-y-7 pt-4">
          
          {/* Eyebrow Pill with Pulse Dot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#2563eb]" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
              OUTBOUND, WITHOUT THE BUSYWORK
            </span>
          </div>

          {/* H1 Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
            Turn Every Lead Into a{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Revenue Opportunity.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Outtricks connects prospect discovery, cold email, LinkedIn, Voice AI, follow-ups, and CRM into one continuous revenue workflow.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/platform"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:border-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
              <span>Watch It In Action</span>
            </Link>
          </div>

          {/* 3 Key Stats */}
          <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto border-t border-slate-200/60 dark:border-white/[0.07]">
            <div className="text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">99.4%</div>
              <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Inbox Rate</div>
            </div>
            <div className="text-center space-y-0.5 border-x border-slate-200/60 dark:border-white/[0.07]">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">480M+</div>
              <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Verified Leads</div>
            </div>
            <div className="text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">6</div>
              <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Native Channels</div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            SECTION 2: 7-MODULE INTERACTIVE PRODUCT SHOWCASE (Directly below CTAs)
            ========================================================================= */}
        <div className="pt-2 sm:pt-4">
          <ProductShowcaseTabs />
        </div>

      </div>
    </section>
  );
};
