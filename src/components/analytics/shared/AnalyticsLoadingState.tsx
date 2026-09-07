import React from 'react';

export const AnalyticsLoadingState: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse font-sans">
      {/* 4 Skeleton KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-slate-100 dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-3 h-32"
          >
            <div className="flex justify-between items-center">
              <div className="w-24 h-3 rounded bg-slate-200 dark:bg-[#181818]" />
              <div className="w-12 h-3 rounded bg-slate-200 dark:bg-[#181818]" />
            </div>
            <div className="w-32 h-8 rounded bg-slate-200 dark:bg-[#181818]" />
            <div className="w-40 h-2.5 rounded bg-slate-200 dark:bg-[#181818]" />
          </div>
        ))}
      </div>

      {/* Large Skeleton Chart */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] h-80 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-48 h-4 rounded bg-slate-200 dark:bg-[#181818]" />
          <div className="w-32 h-6 rounded bg-slate-200 dark:bg-[#181818]" />
        </div>
        <div className="w-full h-56 rounded-2xl bg-slate-200/60 dark:bg-[#181818]/60" />
      </div>
    </div>
  );
};
