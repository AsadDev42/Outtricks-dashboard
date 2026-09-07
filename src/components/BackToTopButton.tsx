import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-[#181818] text-white text-[10px] font-sans font-bold tracking-wide shadow-md whitespace-nowrap pointer-events-none animate-in fade-in duration-150 border border-slate-700">
          Back to top
        </div>
      )}

      {/* Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Back to top"
        className="w-11 h-11 rounded-full bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 shadow-md shadow-slate-900/5 hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
