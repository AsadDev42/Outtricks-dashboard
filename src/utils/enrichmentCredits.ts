/**
 * Outtricks Lead Finder - Centralized Credit Pricing & Calculation Engine
 * 
 * Pricing Source of Truth:
 * - Verified Work Email: 1 credit / lead
 * - Verified Phone / Direct Mobile: 4 credits / lead
 * - Full Detailed Profile: 0.25 credits / lead
 * - Intent-Based Surcharge: +1 credit / lead (applied only when an active intent filter is used)
 */

export interface EnrichmentDataOptions {
  email: boolean;
  phone: boolean;
  fullProfile: boolean;
  intentSurcharge: boolean;
}

export const CREDIT_RATES = {
  EMAIL: 1.0,
  PHONE: 4.0,
  FULL_PROFILE: 0.25,
  INTENT_SURCHARGE: 1.0,
} as const;

export interface CreditCalculationResult {
  leadCount: number;
  emailCost: number;
  phoneCost: number;
  profileCost: number;
  intentCost: number;
  totalCost: number;
  availableBalance: number;
  remainingBalance: number;
  hasSufficientCredits: boolean;
  shortfall: number;
}

/**
 * Format decimal credits cleanly without trailing zeros (e.g. 0.25, 2.5, 62.5, 100)
 */
export function formatCredits(credits: number): string {
  if (Number.isInteger(credits)) {
    return credits.toLocaleString();
  }
  // Trim unnecessary zeros, preserve up to 2 decimal places
  const fixed = Number(credits.toFixed(2));
  return fixed.toLocaleString(undefined, { minimumFractionDigits: fixed % 1 !== 0 ? 1 : 0, maximumFractionDigits: 2 });
}

/**
 * Calculate total credits required and evaluate user's credit balance
 */
export function calculateEnrichmentCredits(
  leadCount: number,
  options: EnrichmentDataOptions,
  availableBalance: number
): CreditCalculationResult {
  const safeCount = Math.max(0, Math.floor(leadCount));
  
  const emailCost = options.email ? safeCount * CREDIT_RATES.EMAIL : 0;
  const phoneCost = options.phone ? safeCount * CREDIT_RATES.PHONE : 0;
  const profileCost = options.fullProfile ? safeCount * CREDIT_RATES.FULL_PROFILE : 0;
  const intentCost = (options.intentSurcharge && (options.email || options.phone || options.fullProfile))
    ? safeCount * CREDIT_RATES.INTENT_SURCHARGE
    : 0;

  const totalCost = emailCost + phoneCost + profileCost + intentCost;
  const remainingBalance = Math.max(0, availableBalance - totalCost);
  const hasSufficientCredits = availableBalance >= totalCost;
  const shortfall = hasSufficientCredits ? 0 : Number((totalCost - availableBalance).toFixed(2));

  return {
    leadCount: safeCount,
    emailCost,
    phoneCost,
    profileCost,
    intentCost,
    totalCost,
    availableBalance,
    remainingBalance,
    hasSufficientCredits,
    shortfall,
  };
}
