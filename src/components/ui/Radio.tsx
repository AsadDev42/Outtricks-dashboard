import React, { forwardRef } from 'react';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = '',
  orientation = 'vertical',
}) => {
  return (
    <div
      role="radiogroup"
      className={`gap-3 ${
        orientation === 'vertical' ? 'flex flex-col' : 'flex flex-wrap'
      } ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const optionId = `${name}_${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={`inline-flex items-start gap-3 select-none cursor-pointer ${
              option.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={isSelected}
                disabled={option.disabled}
                onChange={() => !option.disabled && onChange(option.value)}
                className="peer sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border transition-all duration-150 flex items-center justify-center ${
                  isSelected
                    ? 'border-primary bg-white dark:bg-[#1C1C1C]'
                    : 'border-slate-300 dark:border-[#2A2A2A] bg-white dark:bg-[#1C1C1C] peer-hover:border-primary'
                } peer-focus-visible:ring-2 peer-focus-visible:ring-primary`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block font-sans">
                {option.label}
              </span>
              {option.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
