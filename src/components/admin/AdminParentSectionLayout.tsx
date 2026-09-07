import React, { useRef } from 'react';
import { Badge, BadgeProps } from '../ui/Badge';
import { useGSAP, gsap } from '../../lib/gsap';

export interface AdminSectionTab {
  id: string;
  title: string;
  icon: React.ElementType;
  count?: number | string;
}

export interface AdminParentSectionLayoutProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badges?: { label: string; variant?: BadgeProps['variant'] }[];
  tabs?: AdminSectionTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  children: React.ReactNode;
}

export const AdminParentSectionLayout: React.FC<AdminParentSectionLayoutProps> = ({
  title,
  description,
  icon: SectionIcon,
  badges = [],
  activeTab,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Smooth GSAP transition on tab switch
  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
        );
      }
    },
    { dependencies: [activeTab], scope: contentRef }
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SectionIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h1 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                {title}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#A0A0A0]">
              {description}
            </p>
          </div>

          {badges.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {badges.map((b, idx) => (
                <Badge key={idx} variant={b.variant || 'emerald'} size="sm">
                  {b.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Content */}
      <div ref={contentRef}>
        {children}
      </div>

    </div>
  );
};