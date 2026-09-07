import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title = "Ready to turn outbound into unstoppable revenue?",
  description = "Join hundreds of growth agencies and B2B SaaS teams consolidating their stack on Outtricks."
}) => {
  return (
    <div className="bg-[#090d16] text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden my-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider font-sans">
            <Zap className="w-3.5 h-3.5 fill-blue-400" />
            7-Day Free Trial • No Credit Card Required
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
            {description}
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link 
            to="/signup" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#141414] text-slate-900 dark:text-white font-bold hover:bg-slate-100 transition-all shadow-md text-center text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/book-a-demo" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-700 transition-all text-center text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Schedule Architecture Demo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
