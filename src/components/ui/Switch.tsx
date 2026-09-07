import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
  id,
}) => {
  const switchId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '_') : undefined);

  const trackSizes = {
    sm: 'w-8 h-4.5 p-0.5',
    md: 'w-11 h-6 p-0.5',
    lg: 'w-14 h-7.5 p-1',
  };

  const thumbSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-5.5 h-5.5',
  };

  const translates = {
    sm: checked ? 'translate-x-3.5' : 'translate-x-0',
    md: checked ? 'translate-x-5' : 'translate-x-0',
    lg: checked ? 'translate-x-6.5' : 'translate-x-0',
  };

  return (
    <label
      htmlFor={switchId}
      className={`inline-flex items-center justify-between gap-4 select-none cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {(label || description) && (
        <div className="space-y-0.5">
          {label && (
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block font-sans">
              {label}
            </span>
          )}
          {description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              {description}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary shrink-0 cursor-pointer ${
          trackSizes[size]
        } ${
          checked
            ? 'bg-primary dark:bg-primary shadow-sm shadow-primary'
            : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        <span
          className={`inline-block rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
            thumbSizes[size]
          } ${translates[size]}`}
        />
      </button>
    </label>
  );
};
