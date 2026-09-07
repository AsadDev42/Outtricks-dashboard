/**
 * Centralized Safe Formatting Utilities for Outtricks Platform
 * Prevents "Cannot read properties of undefined (reading 'toLocaleString')" errors globally.
 */

/**
 * Safely format any numeric value with thousand separators
 * @param value Number or numeric string to format
 * @param fallback Fallback string if value is null/undefined/NaN (default: "0")
 */
export function formatNumber(value: number | string | null | undefined, fallback = '0'): string {
  if (value === null || value === undefined || value === '') return fallback;
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num) || !isFinite(num)) return fallback;
  try {
    return num.toLocaleString('en-US');
  } catch {
    return String(num);
  }
}

/**
 * Safely format currency values with optional compact mode
 * @param value Number or numeric string (e.g. 124500, "$124,500", "124500")
 * @param fallback Fallback string (default: "$0")
 * @param compact Whether to format as $124.5K, $1.2M, etc.
 */
export function formatCurrency(
  value: number | string | null | undefined, 
  fallback = '$0',
  compact = false
): string {
  if (value === null || value === undefined || value === '') return fallback;

  let num: number;
  if (typeof value === 'number') {
    num = value;
  } else {
    // Strip $, commas, and spaces
    const cleanStr = String(value).replace(/[\$,\s]/g, '');
    num = Number(cleanStr);
  }

  if (isNaN(num) || !isFinite(num)) return fallback;

  if (compact) {
    if (Math.abs(num) >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
    }
    if (Math.abs(num) >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    }
    if (Math.abs(num) >= 1_000) {
      return `$${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    }
  }

  try {
    return `$${num.toLocaleString('en-US')}`;
  } catch {
    return `$${num}`;
  }
}

/**
 * Safely format compact numbers (1.2K, 24.8K, 1.4M)
 * @param value Number or numeric string
 * @param fallback Fallback string (default: "0")
 */
export function formatCompactNumber(value: number | string | null | undefined, fallback = '0'): string {
  if (value === null || value === undefined || value === '') return fallback;
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num) || !isFinite(num)) return fallback;

  if (Math.abs(num) >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (Math.abs(num) >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (Math.abs(num) >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }

  try {
    return num.toLocaleString('en-US');
  } catch {
    return String(num);
  }
}

/**
 * Safely format percentage values
 * @param value Number (e.g. 24.5 or 0.245) or string ("24.5%")
 * @param isDecimal True if value is in 0..1 range (0.245 -> 24.5%)
 * @param decimals Number of decimal points (default: 1)
 * @param fallback Fallback string (default: "0%")
 */
export function formatPercentage(
  value: number | string | null | undefined,
  isDecimal = false,
  decimals = 1,
  fallback = '0%'
): string {
  if (value === null || value === undefined || value === '') return fallback;

  let num: number;
  if (typeof value === 'number') {
    num = value;
  } else {
    const cleanStr = String(value).replace(/[%,\s]/g, '');
    num = Number(cleanStr);
  }

  if (isNaN(num) || !isFinite(num)) return fallback;

  if (isDecimal) {
    num *= 100;
  }

  return `${num.toFixed(decimals).replace(/\.0$/, '')}%`;
}

/**
 * Safely format date strings
 * @param value Date object, timestamp, or date string
 * @param fallback Fallback string (default: "N/A")
 */
export function formatDate(value: Date | string | number | null | undefined, fallback = 'N/A'): string {
  if (value === null || value === undefined || value === '') return fallback;
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return fallback;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return fallback;
  }
}

/**
 * Safely format time durations in seconds
 * @param seconds Number of seconds
 * @param fallback Fallback string (default: "0s")
 */
export function formatDuration(seconds: number | string | null | undefined, fallback = '0s'): string {
  if (seconds === null || seconds === undefined || seconds === '') return fallback;
  const s = typeof seconds === 'number' ? seconds : Number(seconds);
  if (isNaN(s) || !isFinite(s) || s <= 0) return fallback;

  const mins = Math.floor(s / 60);
  const remSeconds = Math.floor(s % 60);

  if (mins === 0) return `${remSeconds}s`;
  if (mins < 60) return `${mins}m ${remSeconds}s`;

  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours}h ${remMins}m`;
}
