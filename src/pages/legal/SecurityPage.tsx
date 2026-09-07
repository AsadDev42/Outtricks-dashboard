import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Key, Server, Cpu, CheckCircle2, ShieldAlert, FileCode2, EyeOff, Activity } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';

export const SecurityPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-20 pb-24 font-sans text-slate-700 dark:text-slate-300">
      
      {/* 1. SEO Head */}
      <SEOHead 
        title="Security Practices & Infrastructure Architecture | Outtricks"
        description="Explore Outtricks security practices, including OAuth 2.0 PKCE, multi-tenant isolation, in-transit encryption, API rate limiting, and zero-exposure secrets management."
        canonical="https://outtricks.com/security"
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Security', url: 'https://outtricks.com/security' }
        ]}
      />

      {/* =========================================================================
          HERO & HEADER
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">Security</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-slate-200/80 dark:border-[#2A2A2A]">
              PLATFORM SECURITY & TRUST
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Security Practices & Infrastructure
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Verified Technical Safeguards • Last Updated: August 26, 2026
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            At Outtricks, security is engineered into every layer of our revenue operating system. We implement robust, verifiable technical controls to protect workspace data, multichannel communications, authentication lifecycles, and API integrations.
          </p>

        </div>
      </section>

      {/* =========================================================================
          VERIFIED SECURITY CONTROLS (8 CORE PILLARS)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-12 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-12 leading-relaxed text-sm sm:text-base">
          
          {/* Pillar 1: Authentication & OAuth */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Authentication & OAuth 2.0 PKCE
              </h2>
            </div>
            <p>
              We enforce strict authentication safeguards across email/password and social login providers (Google Workspace, Microsoft, Apple):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Cryptographic OAuth State & Nonces:</strong> All OAuth handshakes utilize cryptographically randomized state nonces with 10-minute validity to prevent CSRF and auth replay attacks.</li>
              <li><strong>Open-Redirect Protection:</strong> Post-authentication redirect targets are strictly validated against an internal path whitelist, eliminating open-redirect vulnerabilities.</li>
              <li><strong>Password Complexity:</strong> Enforced minimum entropy requirements including length (&gt;= 8 chars), mixed case, and numeric/special characters. Plaintext passwords are never logged or stored.</li>
            </ul>
          </div>

          {/* Pillar 2: Anti-Brute-Force & Rate Limiting */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Anti-Brute-Force Rate Limiting
              </h2>
            </div>
            <p>
              All authentication and sensitive endpoints are protected by sliding-window rate limiters:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li>Automated thresholds restrict login and signup attempts to a maximum of 5 requests per 60 seconds.</li>
              <li>Repeated failures trigger temporary exponential backoff lockouts (3-minute minimum) to protect user accounts from credential stuffing.</li>
            </ul>
          </div>

          {/* Pillar 3: Input Sanitization & XSS Defense */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Input Sanitization & Injection Defense
              </h2>
            </div>
            <p>
              We implement comprehensive input validation across all user-supplied data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li>Strict regex sanitization strips HTML tags, pseudo-protocols (<code className="text-blue-600 font-mono">javascript:</code>, <code className="text-blue-600 font-mono">data:</code>), and script characters before processing.</li>
              <li>RFC 5322 regex validation on email addresses prevents malformed header injection.</li>
            </ul>
          </div>

          {/* Pillar 4: Encryption in Transit & HTTP Headers */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Encryption in Transit & Security Headers
              </h2>
            </div>
            <p>
              Data transferred between client browsers and Outtricks servers is protected using TLS 1.3 encryption. We enforce key HTTP security policies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><code className="font-mono text-xs bg-slate-100 dark:bg-[#181818] px-1.5 py-0.5 rounded">X-Content-Type-Options: nosniff</code> — Prevents browser MIME-sniffing attacks.</li>
              <li><code className="font-mono text-xs bg-slate-100 dark:bg-[#181818] px-1.5 py-0.5 rounded">Referrer-Policy: strict-origin-when-cross-origin</code> — Prevents cross-origin URL data leakage.</li>
              <li><code className="font-mono text-xs bg-slate-100 dark:bg-[#181818] px-1.5 py-0.5 rounded">Permissions-Policy</code> — Restricts unauthorized camera, microphone, and geolocation access.</li>
            </ul>
          </div>

          {/* Pillar 5: Tenant Isolation & Access Control */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Multi-Tenant Workspace Isolation
              </h2>
            </div>
            <p>
              Every workspace is logically isolated. Database queries enforce workspace boundary checks to ensure that users can never access, query, or modify records belonging to another company or account.
            </p>
          </div>

          {/* Pillar 6: Secrets Management */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <EyeOff className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Zero-Exposure Secrets Management
              </h2>
            </div>
            <p>
              Server-side API keys, database connection strings, and private OAuth client secrets are never bundled into client-side JavaScript. Automated static analysis scans verify zero exposed credentials before production deployments.
            </p>
          </div>

          {/* Pillar 7: Vulnerability Reporting & Contact */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Responsible Vulnerability Disclosure
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              We welcome responsible security research. If you discover a potential vulnerability in our platform, please report it directly to our security team. We investigate all credible reports promptly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Outtricks Security Operations</p>
              <p className="text-slate-600 dark:text-slate-400">Security Inquiries: <span className="font-mono text-blue-600 dark:text-blue-400">security@outtricks.com</span></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
