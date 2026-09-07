import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { Card3DTilt } from '../../components/3d/Card3DTilt';
import { RESOURCES_MENU, FREE_TOOLS_MENU } from '../../data/navigation';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  FileText, 
  TrendingUp, 
  Award, 
  Copy, 
  HelpCircle,
  Clock,
  Heart
} from 'lucide-react';

export const ResourcesOverviewPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <SEOHead 
        title="Outbound Sales Resources, Guides & Templates | Outtricks"
        description="Access data-backed outbound playbooks, cold email templates, ROI calculators, and masterclasses."
        canonical="https://outtricks.com/resources"
        keywords={["sales resources","cold email guides","outbound playbooks","lead generation templates"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"}]}
      />
      
      {/* 1. HERO */}
      <PageHeader 
        badge="Knowledge, Playbooks & Tools"
        title="Outbound Resources & Sales Intelligence Hub"
        description="Master modern multi-channel prospecting with battle-tested cold outreach playbooks, templates, certifications, and free AI calculators."
        highlights={["Outbound Playbooks", "50+ Cold Templates", "Certified Academy", "5 Free Tools"]}
      />

      {/* 2. FEATURED RESOURCE SPOTLIGHT */}
      <Card3DTilt maxTilt={4} scale={1.01}>
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-blue-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-indigo-400/30 text-blue-300 text-xs font-sans font-bold uppercase">
              FEATURED MASTERCLASS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              The 2026 Multi-Channel Outbound Playbook
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              How high-growth B2B SaaS teams combine 480M+ verified contacts, multi-inbox cold email, safe LinkedIn messaging, and sub-400ms Voice AI SDRs to generate $100k+ pipelines with zero spam bans.
            </p>
            <div className="flex items-center gap-4 text-xs font-sans text-blue-300">
              <span>• 45 Min Read</span>
              <span>• 12 Free Templates</span>
              <span>• 100% Free Access</span>
            </div>
          </div>

          <Link
            to="/resources/guides"
            className="shrink-0 px-8 py-4 rounded-full bg-white dark:bg-[#141414] text-slate-900 dark:text-white font-extrabold text-xs hover:bg-slate-100 shadow-xl transition-all flex items-center gap-2"
          >
            <span>Read Masterclass Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card3DTilt>

      {/* 3. RESOURCE DIRECTORY GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ALL RESOURCE HUBS
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Explore Documentation, Templates & Guides
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES_MENU.map((item, idx) => (
            <Card3DTilt key={idx} maxTilt={6}>
              <Link
                to={item.href}
                className="bg-white dark:bg-[#141414] p-7 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-clean hover:shadow-clean-lg transition-all space-y-4 group flex flex-col justify-between h-full block"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Resource</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* 4. FREE TOOLS SHOWCASE */}
      <section className="bg-slate-50 dark:bg-[#141414]/60 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-[#2A2A2A] space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">FREE UTILITIES</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">5 Live Interactive Outbound Tools</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No signup required. Test deliverability, score subject lines, and model outbound ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FREE_TOOLS_MENU.map((tool, idx) => (
            <Link
              key={idx}
              to={tool.href}
              className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] shadow-xs hover:border-blue-500 transition-colors space-y-2 group block"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tool.title}
                </h4>
                <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {tool.badge || 'Free'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SIGNUP */}
      <section className="bg-white dark:bg-[#141414] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-[#2A2A2A] shadow-clean text-center space-y-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">WEEKLY OUTBOUND INSIGHTS</span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Join 14,000+ Revenue Leaders
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Get our weekly teardown of the highest-converting cold email copy, LinkedIn playbooks, and AI outbound workflows.
          </p>
        </div>

        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your work email..."
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={newsletterStatus === 'loading'}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shrink-0 cursor-pointer disabled:opacity-50"
          >
            {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {newsletterStatus === 'success' && (
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>You're subscribed! Check your inbox for the latest outbound teardown.</span>
          </div>
        )}

        {newsletterStatus === 'error' && (
          <div className="text-xs font-bold text-rose-500 flex items-center justify-center gap-1.5 animate-in fade-in">
            <span>Please enter a valid work email address.</span>
          </div>
        )}
      </section>

      <CtaBanner />
    </div>
  );
};

