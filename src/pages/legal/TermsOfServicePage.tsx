import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-20 pt-20 pb-24 font-sans text-slate-700 dark:text-slate-300">
      
      {/* 1. SEO Head */}
      <SEOHead 
        title="Terms of Service | Outtricks Revenue Operating System"
        description="Read the Outtricks Terms of Service governing platform usage, API rules, workspace licensing, AI agent execution, and subscription billing."
        canonical="https://outtricks.com/terms"
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Legal', url: 'https://outtricks.com/terms' },
          { name: 'Terms of Service', url: 'https://outtricks.com/terms' }
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
            <span className="text-slate-900 dark:text-slate-200 font-bold">Terms of Service</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-slate-200/80 dark:border-[#2A2A2A]">
              LEGAL TERMS & CONDITIONS
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Outtricks Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last Updated: August 26, 2026 • Effective Date: January 1, 2026
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Customer,&quot; &quot;User,&quot; or &quot;You&quot;) and Outtricks Inc. (&quot;Outtricks,&quot; &quot;we,&quot; or &quot;us&quot;) governing your access to and use of the Outtricks platform, applications, APIs, and associated services.
          </p>

        </div>
      </section>

      {/* =========================================================================
          TERMS CONTENT SECTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-12 border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl space-y-12 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">01.</span>
              Account Registration & Eligibility
            </h2>
            <p>
              To access the Outtricks platform, you must register for an authorized workspace account. You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li>You are at least 18 years of age and have the legal capacity to enter into binding agreements.</li>
              <li>All registration information submitted (including name, company identity, and work email) is truthful, accurate, and kept up to date.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your workspace.</li>
              <li>You will promptly notify Outtricks upon becoming aware of any unauthorized access to your account.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">02.</span>
              Free Trial, Subscription & Billing
            </h2>
            <p>
              Outtricks offers free trial periods and tiered paid subscription plans:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>7-Day Free Trial:</strong> Free trial access is provided solely for evaluation purposes without requiring payment information. Features, sending limits, and credit quotas may be capped during the trial period.</li>
              <li><strong>Billing Cycle:</strong> Paid subscriptions are billed in advance on a recurring monthly or annual basis depending on your selected tier.</li>
              <li><strong>Credit Quotas:</strong> Outbound email, Contact Search lookups, and Voice AI minutes are allocated per billing cycle. Unused monthly credits do not roll over unless specified in your enterprise agreement.</li>
              <li><strong>Cancellations:</strong> You may cancel your subscription at any time via workspace settings. Cancellation takes effect at the end of the current billing cycle.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">03.</span>
              Acceptable Use Policy
            </h2>
            <p>
              You agree to use Outtricks strictly for lawful business communication. You explicitly agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li>Send deceptive, malicious, fraudulent, or harassing outreach messages.</li>
              <li>Violate applicable electronic communication regulations (including CAN-SPAM, CASL, or local marketing laws).</li>
              <li>Conduct high-volume spamming that impairs mailbox deliverability infrastructure or violates email service provider terms.</li>
              <li>Attempt to reverse-engineer, decompile, or extract proprietary algorithms from the Outtricks platform, AI models, or WebRTC infrastructure.</li>
              <li>Interfere with platform operations via denial-of-service attempts, automated scraping outside documented APIs, or vulnerability probes.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">04.</span>
              AI Features & Automated Workflows
            </h2>
            <p>
              Outtricks incorporates artificial intelligence models for prospect personalization, email generation, Voice AI conversations, and workflow automation:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              <li><strong>Human-in-the-Loop:</strong> While AI agents execute autonomous actions, users remain solely responsible for configuring rules, prompts, approval gates, and compliance guardrails.</li>
              <li><strong>Output Accuracy:</strong> AI-generated outputs are produced based on contextual inputs. Users should review high-stakes proposals or messaging prior to broad dissemination.</li>
              <li><strong>Voice AI Compliance:</strong> When utilizing Voice AI SDR capabilities, you are responsible for adhering to applicable telemarketing recording disclosure laws in your target jurisdictions.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">05.</span>
              Intellectual Property Rights
            </h2>
            <p>
              Outtricks and its licensors retain all right, title, and interest in and to the platform, including software, design systems, algorithms, documentation, and trademarks.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              You retain all ownership rights in your proprietary customer data, uploaded lead lists, and custom campaign content imported into your workspace.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">06.</span>
              Disclaimers & Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              THE OUTTRICKS PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUTTRICKS INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, DATA, OR PIPELINE REVENUE ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-[#202020]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">07.</span>
              Contact & Legal Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              For questions regarding these Terms of Service or commercial agreements, please contact our legal counsel:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Outtricks Inc. Legal Department</p>
              <p className="text-slate-600 dark:text-slate-400">Email: <span className="font-mono text-blue-600 dark:text-blue-400">legal@outtricks.com</span></p>
              <p className="text-slate-600 dark:text-slate-400">Contact: <Link to="/contact" className="text-blue-600 dark:text-blue-400 underline">outtricks.com/contact</Link></p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
