import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variants = {
    text: 'h-4 w-full rounded-md',
    rectangular: 'rounded-2xl',
    circular: 'rounded-full aspect-square',
  };

  const inlineStyles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={`animate-pulse bg-slate-200/80 dark:bg-[#181818]/80 ${variants[variant]} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
};

export const TableLoadingSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 5,
  cols = 4,
}) => {
  return (
    <div className="w-full space-y-3 p-4">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton key={`head_${c}`} className="h-6 flex-1 rounded-lg" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`row_${r}`} className="flex gap-4 py-2 border-t border-slate-100 dark:border-[#202020]">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={`cell_${r}_${c}`} className="h-8 flex-1 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  );
};
