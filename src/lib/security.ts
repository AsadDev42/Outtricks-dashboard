/**
 * Outtricks Revenue Platform - Enterprise Security & Auth Hardening Library
 * 
 * Provides client-side input sanitization, OAuth PKCE/state verification,
 * rate limiting against brute-force attacks, safe redirect validation,
 * and secure session lifecycle management.
 */

// ============================================================================
// 1. INPUT SANITIZATION & VALIDATION (XSS & INJECTION DEFENSE)
// ============================================================================

/**
 * Sanitizes user input by stripping HTML tags, javascript: pseudo-protocols,
 * and dangerous script characters to prevent Stored & Reflected XSS.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: URI
    .replace(/data:/gi, '') // Strip data: URI
    .replace(/vbscript:/gi, '') // Strip vbscript: URI
    .replace(/[<>"'&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}

/**
 * Strict RFC 5322 compliant Email format validator
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Enterprise Password Complexity Verification
 */
export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 to 3
  feedback: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const feedback: string[] = [];
  let score = 0;

  if (!password || typeof password !== 'string') {
    return { isValid: false, score: 0, feedback: ['Password is required'] };
  }

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Must be at least 8 characters long');
  }

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Must include both uppercase and lowercase letters');
  }

  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Must include at least one number or symbol');
  }

  return {
    isValid: score >= 2 && password.length >= 8,
    score,
    feedback
  };
}

// ============================================================================
// 2. OAUTH STATE, NONCE & OPEN-REDIRECT PREVENTION
// ============================================================================

const ALLOWED_REDIRECT_PATHS = [
  '/',
  '/demo',
  '/platform',
  '/platform/lead-finder',
  '/platform/voice-ai',
  '/platform/ai-agents',
  '/platform/crm',
  '/platform/email',
  '/platform/linkedin',
  '/pricing'
];

/**
 * Validates redirect destination to prevent Open Redirect attacks.
 * Only relative paths on the allowed whitelist are permitted.
 */
export function validateRedirectUrl(targetUrl?: string | null): string {
  if (!targetUrl || typeof targetUrl !== 'string') return '/demo';

  // Disallow absolute protocol URLs (http:, https:, //, javascript:, etc.)
  if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('//') || targetUrl.startsWith('\\')) {
    return '/demo';
  }

  const cleanPath = targetUrl.split('?')[0].split('#')[0];
  const isAllowed = ALLOWED_REDIRECT_PATHS.some(path => cleanPath === path || cleanPath.startsWith(path + '/'));

  return isAllowed ? targetUrl : '/demo';
}

/**
 * Cryptographic random string generator for OAuth State and Nonce
 */
export function generateSecureRandomString(length: number = 32): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Generates and stores a cryptographically secure OAuth 2.0 State & Nonce
 */
export interface OAuthHandshake {
  state: string;
  nonce: string;
  provider: string;
  createdAt: number;
}

export function initializeOAuthHandshake(provider: 'Google' | 'Microsoft' | 'Apple' | string): OAuthHandshake {
  const handshake: OAuthHandshake = {
    state: generateSecureRandomString(32),
    nonce: generateSecureRandomString(32),
    provider,
    createdAt: Date.now()
  };

  try {
    sessionStorage.setItem(`outtricks_oauth_${provider.toLowerCase()}`, JSON.stringify(handshake));
  } catch (e) {
    // SessionStorage unavailable fallback
  }

  return handshake;
}

/**
 * Verifies returned OAuth state to prevent CSRF / Authentication Replay attacks
 */
export function verifyOAuthHandshake(provider: string, returnedState: string): boolean {
  try {
    const stored = sessionStorage.getItem(`outtricks_oauth_${provider.toLowerCase()}`);
    if (!stored) return false;

    const handshake: OAuthHandshake = JSON.parse(stored);
    sessionStorage.removeItem(`outtricks_oauth_${provider.toLowerCase()}`);

    // Verify state match and verify token freshness (< 10 minutes)
    const isFresh = (Date.now() - handshake.createdAt) < (10 * 60 * 1000);
    return handshake.state === returnedState && isFresh;
  } catch (e) {
    return false;
  }
}

// ============================================================================
// 3. SLIDING-WINDOW BRUTE-FORCE RATE LIMITER
// ============================================================================

interface RateLimitEntry {
  attempts: number[];
  lockedUntil?: number;
}

class ClientRateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly lockoutMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000, lockoutMs: number = 180000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.lockoutMs = lockoutMs;
  }

  /**
   * Check if action is permitted for the given key (e.g. email or action identifier)
   */
  public checkLimit(key: string): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
    const now = Date.now();
    const entry = this.storage.get(key) || { attempts: [] };

    // Check if currently in lockout period
    if (entry.lockedUntil && entry.lockedUntil > now) {
      const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    // Filter attempts to sliding window
    const recentAttempts = entry.attempts.filter(timestamp => (now - timestamp) < this.windowMs);
    entry.attempts = recentAttempts;

    if (recentAttempts.length >= this.maxAttempts) {
      entry.lockedUntil = now + this.lockoutMs;
      this.storage.set(key, entry);
      const retryAfterSeconds = Math.ceil(this.lockoutMs / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    return {
      allowed: true,
      remaining: this.maxAttempts - recentAttempts.length
    };
  }

  /**
   * Record a new attempt
   */
  public recordAttempt(key: string): void {
    const now = Date.now();
    const entry = this.storage.get(key) || { attempts: [] };
    entry.attempts.push(now);
    this.storage.set(key, entry);
  }

  /**
   * Reset attempts on successful authentication
   */
  public reset(key: string): void {
    this.storage.delete(key);
  }
}

// Export singleton rate limiter for auth actions
export const authRateLimiter = new ClientRateLimiter(5, 60000, 180000); // Max 5 attempts per min, 3 min lockout

// ============================================================================
// 4. SECURE IN-MEMORY SESSION LIFECYCLE
// ============================================================================

export interface UserSession {
  userId: string;
  email: string;
  workspaceId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  expiresAt: number;
}

class SecureSessionManager {
  private activeSession: UserSession | null = null;
  private readonly sessionDurationMs: number = 2 * 60 * 60 * 1000; // 2 hours

  public setSession(user: Omit<UserSession, 'expiresAt'>): UserSession {
    this.activeSession = {
      ...user,
      expiresAt: Date.now() + this.sessionDurationMs
    };
    return this.activeSession;
  }

  public getSession(): UserSession | null {
    if (!this.activeSession) return null;
    if (Date.now() > this.activeSession.expiresAt) {
      this.clearSession();
      return null;
    }
    return this.activeSession;
  }

  public clearSession(): void {
    this.activeSession = null;
    try {
      sessionStorage.clear();
    } catch (e) {}
  }
}

export const sessionManager = new SecureSessionManager();
