import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PageHeaderProps {
  badge?: string;
  category?: string;
  categoryHref?: string;
  title: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  highlights?: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  category,
  categoryHref,
  title,
  description,
  primaryCtaText = "Start Free 7-Day Trial",
  primaryCtaHref = "/signup",
  secondaryCtaText = "Book a Live Demo",
  secondaryCtaHref = "/book-a-demo",
  highlights
}) => {
  return (
    <div className="relative pt-8 pb-12 text-center space-y-5 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Breadcrumb / Category Badge */}
      <div className="flex items-center justify-center gap-2 text-xs font-sans font-bold">
        {category && categoryHref && (
          <>
            <Link 
              to={categoryHref} 
              className="text-slate-500 hover:text-primary transition-colors uppercase tracking-wider text-[11px]"
            >
              {category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          </>
        )}
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-muted border border-primary-border text-primary uppercase tracking-wider text-[10px] font-sans font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            {badge}
          </span>
        )}
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
        {title}
      </h1>

      {/* Subtitle / Description */}
      <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
        {description}
      </p>

      {/* Highlights checklist */}
      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
        <Link
          to={primaryCtaHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-xs sm:text-sm shadow-md shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{primaryCtaText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={secondaryCtaHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-[#2A2A2A] shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{secondaryCtaText}</span>
        </Link>
      </div>

    </div>
  );
};
