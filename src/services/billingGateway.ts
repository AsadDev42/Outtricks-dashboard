export type BillingActionResult =
  | { ok: true; redirectedTo: string }
  | { ok: false; reason: 'not_configured' | 'invalid_url' };

const readUrl = (key: 'VITE_BILLING_PORTAL_URL' | 'VITE_BILLING_CHECKOUT_URL') => {
  const value = import.meta.env[key]?.trim();
  if (!value) return null;

  try {
    const url = new URL(value, window.location.origin);
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') return null;
    return url.toString();
  } catch {
    return null;
  }
};

export const billingGateway = {
  isPortalConfigured: () => Boolean(readUrl('VITE_BILLING_PORTAL_URL')),
  isCheckoutConfigured: () => Boolean(readUrl('VITE_BILLING_CHECKOUT_URL')),

  openPortal(): BillingActionResult {
    const url = readUrl('VITE_BILLING_PORTAL_URL');
    if (!url) return { ok: false, reason: 'not_configured' };
    window.location.assign(url);
    return { ok: true, redirectedTo: url };
  },

  openCheckout(): BillingActionResult {
    const url = readUrl('VITE_BILLING_CHECKOUT_URL');
    if (!url) return { ok: false, reason: 'not_configured' };
    window.location.assign(url);
    return { ok: true, redirectedTo: url };
  },
};
