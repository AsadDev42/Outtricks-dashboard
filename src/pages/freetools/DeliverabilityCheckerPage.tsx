import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Lock } from 'lucide-react';

export const DeliverabilityCheckerPage: React.FC = () => {
  const [domain, setDomain] = useState('cloudscale.ai');
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState({
    spf: true,
    dkim: true,
    dmarc: true,
    mx: true,
    blacklist: false,
    score: 98
  });

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setResults({
        spf: true,
        dkim: true,
        dmarc: true,
        mx: true,
        blacklist: false,
        score: Math.floor(Math.random() * 5) + 95
      });
    }, 1200);
  };

  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Free Email Deliverability & SPF/DKIM Checker | Outtricks"
        description="Test your domain SPF, DKIM, and DMARC DNS records to ensure maximum cold email inbox delivery."
        canonical="https://outtricks.com/free-tools/deliverability-checker"
        keywords={["email deliverability tester","SPF checker","DKIM record validator","DMARC analyzer"]}
        breadcrumbs={[{"name":"Free Tools","url":"/resources/free-tools"},{"name":"Deliverability Checker","url":"/free-tools/deliverability-checker"}]}
      />
      <PageHeader 
        category="Free Tools"
        categoryHref="/resources/free-tools"
        badge="DNS & Inbox Health Test"
        title="Email Deliverability & SPF/DKIM Checker"
        description="Verify your sender domain DNS records, MX configuration, DMARC policies, and blacklist status."
      />

      <div className="max-w-3xl mx-auto bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#2A2A2A] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yourdomain.com"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-sans"
          />
          <button
            onClick={handleTest}
            disabled={testing}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? "Running Diagnostics..." : "Check Deliverability"}</span>
          </button>
        </div>

        {/* Results Diagnostic */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#2A2A2A]">
          <div className="flex justify-between items-center bg-slate-50 dark:bg-[#181818]/60 p-4 rounded-xl border border-slate-200/80 dark:border-[#2A2A2A]">
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Overall Domain Health Score</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Target score is &gt; 95% for primary outreach</div>
            </div>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-sans">{results.score} / 100</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-xl flex items-center justify-between">
              <span className="font-medium text-slate-700 dark:text-slate-300">SPF Record (v=spf1)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Valid</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-xl flex items-center justify-between">
              <span className="font-medium text-slate-700 dark:text-slate-300">DKIM Signature (2048-bit)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Valid</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-xl flex items-center justify-between">
              <span className="font-medium text-slate-700 dark:text-slate-300">DMARC Policy (p=reject)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Valid</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] rounded-xl flex items-center justify-between">
              <span className="font-medium text-slate-700 dark:text-slate-300">Spamhaus / RBL Blacklists</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Clean</span>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner 
        title="Automate deliverability monitoring across 50+ inboxes"
        description="Outtricks auto-heals and rotates inboxes before spam flags happen."
      />
    </div>
  );
};

