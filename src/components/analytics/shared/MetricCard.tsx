import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercentage } from '../../../utils/formatters';
import { AnimatedNumber } from '../../ui/AnimatedNumber';

export interface MetricCardProps {
  title: string;
  value: string | number;
  type?: 'currency' | 'number' | 'percentage' | 'compact' | 'raw';
  change?: string | number;
  isPositive?: boolean;
  period?: string;
  supportingLabel?: string;
  sparkline?: number[];
  icon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  type = 'raw',
  change,
  isPositive = true,
  period = 'vs previous period',
  supportingLabel,
  sparkline,
  icon: Icon,
  accentColor,
  onClick,
}) => {
  const numericVal = typeof value === 'number' ? value : Number(String(value).replace(/[\$,\s]/g, ''));
  const isNumeric = !isNaN(numericVal) && isFinite(numericVal);

  const getFormatter = (n: number) => {
    if (type === 'currency') return formatCurrency(n);
    if (type === 'number') return formatNumber(n);
    if (type === 'percentage') return formatPercentage(n);
    return formatNumber(n);
  };

  // Static fallback
  let formattedValue = String(value ?? '0');
  if (type === 'currency') {
    formattedValue = formatCurrency(value);
  } else if (type === 'number') {
    formattedValue = formatNumber(value);
  } else if (type === 'percentage') {
    formattedValue = formatPercentage(value);
  }

  const changeText = change !== undefined ? String(change) : undefined;
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 flex flex-col justify-between transition-all ${
        isClickable ? 'hover:border-white/40 hover:shadow-md cursor-pointer group' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#202020] flex items-center justify-center text-slate-600 dark:text-slate-300">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="text-[10px] text-slate-400 dark:text-[#8A8A8A] font-mono font-bold uppercase tracking-wider">
            {title}
          </span>
        </div>

        {changeText && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold ${
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{changeText.startsWith('+') || changeText.startsWith('-') ? changeText : `+${changeText}`}</span>
          </span>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight font-sans">
          {isNumeric ? (
            <AnimatedNumber value={numericVal} formatter={getFormatter} />
          ) : (
            formattedValue
          )}
        </div>
        {period && (
          <div className="text-[11px] text-slate-500 dark:text-[#777777] font-mono">
            {period}
          </div>
        )}
      </div>

      {(sparkline && sparkline.length > 0) || supportingLabel ? (
        <div className="pt-2.5 border-t border-slate-100 dark:border-[#202020] space-y-2">
          {sparkline && sparkline.length > 0 && (
            <div className="h-6 w-full flex items-end gap-1">
              {sparkline.map((val, i) => {
                const maxVal = Math.max(...sparkline, 1);
                const heightPct = Math.round(((val || 0) / maxVal) * 100);
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-xs bg-emerald-500/20 hover:bg-emerald-500 transition-colors"
                    style={{ height: `${Math.max(15, heightPct)}%` }}
                    title={formatNumber(val)}
                  />
                );
              })}
            </div>
          )}
          {supportingLabel && (
            <p className="text-[10px] text-slate-400 leading-tight">
              {supportingLabel}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
