import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, Database, Server, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-20 pb-24 font-sans text-slate-700 dark:text-slate-300">
      
      {/* 1. SEO Head */}
      <SEOHead 
        title="Privacy Policy | Outtricks Revenue Operating System"
        description="Learn how Outtricks collects, uses, protects, and handles your account information, workspace data, and contact communications."
        canonical="https://outtricks.com/privacy"
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Legal', url: 'https://outtricks.com/privacy' },
          { name: 'Privacy Policy', url: 'https://outtricks.com/privacy' }
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
            <span className="text-slate-900 dark:text-slate-200 font-bold">Privacy Policy</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-slate-200/80 dark:border-[#2A2A2A]">
              LEGAL & DATA PROTECTION
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Outtricks Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last Updated: August 26, 2026 • Effective Date: January 1, 2026
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Outtricks Inc. (&quot;Outtricks,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the Outtricks AI Revenue Operating System platform. This Privacy Policy describes how we collect, store, process, and safeguard personal and workspace information when you use our website (<Link to="/" className="text-blue-600 dark:text-blue-400 underline">outtricks.com</Link>), platform services, APIs, and customer interfaces.
          </p>

        </div>
      </section>

      {/* =========================================================================
          POLICY CONTENT SECTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-12 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-12 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">01.</span>
              Information We Collect
            </h2>
            <p>
              We collect information to provide, secure, and improve our revenue operating workflows. The types of data collected include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Account & Profile Information:</strong> Full name, professional work email address, company name, job title, and securely hashed passwords when creating a workspace.</li>
              <li><strong>Authentication & OAuth Data:</strong> When signing in via Google Workspace, Microsoft, or Apple OAuth, we receive authorized profile identifiers (such as verified email address and provider account ID) via secure OAuth 2.0 PKCE handshakes.</li>
              <li><strong>Workspace & CRM Data:</strong> Prospect lists, pipeline deal stages, custom activity tags, and internal notes that you intentionally import or create within your workspace.</li>
              <li><strong>Multichannel Campaign Telemetry:</strong> Email sending activity, delivery timestamps, bounce signals, and LinkedIn automation queues configured by authorized workspace members.</li>
              <li><strong>Voice AI Call Records:</strong> Audio streams, real-time WebRTC call transcripts, duration metrics, and qualification ratings initiated through configured Voice AI SDR agents.</li>
              <li><strong>Technical & Log Information:</strong> IP addresses, browser user agent, operating system, device identifiers, and timestamped error diagnostics logged to maintain platform reliability.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">02.</span>
              How We Use Your Information
            </h2>
            <p>
              Outtricks utilizes collected data strictly for operational, security, and service delivery purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li>To provision and maintain isolated workspace environments for your team.</li>
              <li>To execute automated cold email, LinkedIn messaging, and Voice AI outreach sequences per your schedule.</li>
              <li>To synchronize deals, conversation timelines, and task queues in the Unified CRM.</li>
              <li>To detect and prevent abusive activities, rate-limit violations, brute-force login attempts, and credential stuffing.</li>
              <li>To process subscription billing and calculate outbound credit consumption.</li>
              <li>To provide customer support and diagnose technical anomalies reported by users.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">03.</span>
              Cookies & Tracking Technologies
            </h2>
            <p>
              We use first-party cookies and modern web storage exclusively for necessary application functionality and authorized user preferences:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Strictly Necessary Cookies:</strong> Required to maintain authentication sessions, CSRF protection nonces, and security verification tokens.</li>
              <li><strong>Functional Cookies:</strong> Retain UI preferences such as light/dark mode selection and cookie consent preferences.</li>
              <li><strong>Analytics Cookies (Optional):</strong> Aggregated, anonymized performance metrics loaded only when explicit consent is granted.</li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              For complete details, please review our dedicated <Link to="/cookies" className="text-blue-600 dark:text-blue-400 underline font-bold">Cookie Policy</Link>.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">04.</span>
              Data Sharing & Third-Party Processors
            </h2>
            <p>
              We do not sell, rent, or trade your personal or workspace information to third parties. We share data only with verified infrastructure providers strictly necessary to operate our service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Cloud Hosting & Database Infrastructure:</strong> Secure multi-region cloud servers providing encrypted database storage and real-time synchronization.</li>
              <li><strong>Voice & Telephony Gateways:</strong> Low-latency WebRTC routing providers executing Voice AI calls.</li>
              <li><strong>Payment Processing:</strong> PCI-DSS compliant payment gateways for credit card processing (Outtricks does not store plaintext card numbers).</li>
              <li><strong>Email Verification Vendors:</strong> Real-time MX and SMTP syntax verification engines during contact search.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">05.</span>
              Data Security & Retention
            </h2>
            <p>
              We apply comprehensive technical safeguards including TLS 1.3 encryption in transit, cryptographic OAuth state verification, client-side rate limiting, sanitized data models, and isolated tenant workspace permissions.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              We retain workspace data for the duration of your active subscription. If you cancel your account or request data deletion, your data will be permanently removed within 30 days, except where retention is required by applicable legal obligations.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">06.</span>
              Your Rights & Account Deletion
            </h2>
            <p>
              Depending on your jurisdiction, you have specific rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Right of Access & Export:</strong> Request a complete export of your contacts, deals, and activity records.</li>
              <li><strong>Right to Rectification:</strong> Update or correct inaccurate account details directly via account settings.</li>
              <li><strong>Right to Erasure (Account Deletion):</strong> Request the permanent deletion of your user account, workspace records, and contact histories.</li>
              <li><strong>Withdrawal of Consent:</strong> Adjust or withdraw cookie consent preferences at any time via the footer cookie preference controller.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">07.</span>
              Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              If you have any questions regarding this Privacy Policy or wish to exercise your privacy rights, please contact our data protection team:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Outtricks Inc. Data Protection Office</p>
              <p className="text-slate-600 dark:text-slate-400">Email: <span className="font-mono text-blue-600 dark:text-blue-400">privacy@outtricks.com</span></p>
              <p className="text-slate-600 dark:text-slate-400">General Support: <Link to="/contact" className="text-blue-600 dark:text-blue-400 underline">outtricks.com/contact</Link></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
