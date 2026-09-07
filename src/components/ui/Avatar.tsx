import React, { useState } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'busy' | 'offline';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-white dark:ring-slate-900',
    busy: 'bg-amber-500 ring-white dark:ring-slate-900',
    offline: 'bg-slate-400 ring-white dark:ring-slate-900',
  };

  const getInitials = (text?: string) => {
    if (!text) return 'U';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-visible shrink-0 select-none ${sizes[size]} ${className}`}
      {...props}
    >
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold tracking-wider shadow-xs">
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ${statusSizes[size]} ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{ children: React.ReactNode; max?: number; className?: string }> = ({
  children,
  max = 4,
  className = '',
}) => {
  const array = React.Children.toArray(children);
  const visible = array.slice(0, max);
  const remaining = array.length - max;

  return (
    <div className={`flex items-center -space-x-2.5 overflow-hidden ${className}`}>
      {visible.map((child, index) => (
        <div key={index} className="ring-2 ring-white dark:ring-slate-950 rounded-full">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#181818] ring-2 ring-white dark:ring-slate-950 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-extrabold select-none">
          +{remaining}
        </div>
      )}
    </div>
  );
};
