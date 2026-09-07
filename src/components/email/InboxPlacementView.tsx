import React, { useState } from 'react';
import { 
  Inbox, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  RefreshCw, 
  ChevronRight, 
  Mail, 
  Server, 
  Lock, 
  Check, 
  AlertCircle,
  HelpCircle,
  BarChart2,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

interface PlacementTestResult {
  id: string;
  testedAt: string;
  subject: string;
  senderMailbox: string;
  overallScore: number;
  inboxRate: number;
  promotionsRate: number;
  spamRate: number;
  providers: {
    name: string;
    icon: string;
    inbox: number;
    promotions: number;
    spam: number;
    status: 'optimal' | 'warning' | 'critical';
  }[];
  authChecks: {
    name: string;
    record: string;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }[];
  recommendations: {
    type: 'positive' | 'warning' | 'critical';
    title: string;
    description: string;
  }[];
}

const INITIAL_TEST: PlacementTestResult = {
  id: 'test_latest',
  testedAt: 'Today at 2:15 PM',
  subject: 'Quick question regarding revenue operations at {{company}}',
  senderMailbox: 'alex@reachnexus.io (Google Workspace)',
  overallScore: 94,
  inboxRate: 94.2,
  promotionsRate: 4.5,
  spamRate: 1.3,
  providers: [
    {
      name: 'Google (Gmail & Workspace)',
      icon: 'G',
      inbox: 97.2,
      promotions: 2.8,
      spam: 0.0,
      status: 'optimal',
    },
    {
      name: 'Microsoft (Outlook & 365)',
      icon: 'M',
      inbox: 93.8,
      promotions: 4.8,
      spam: 1.4,
      status: 'optimal',
    },
    {
      name: 'Yahoo Mail & AOL',
      icon: 'Y',
      inbox: 91.5,
      promotions: 6.0,
      spam: 2.5,
      status: 'warning',
    },
    {
      name: 'Zoho Mail & Business ESPs',
      icon: 'Z',
      inbox: 95.0,
      promotions: 3.5,
      spam: 1.5,
      status: 'optimal',
    },
  ],
  authChecks: [
    {
      name: 'SPF Record Alignment',
      record: 'v=spf1 include:_spf.google.com ~all',
      status: 'pass',
      detail: 'SPF validated against sending IP 209.85.220.41. Softfail alignment verified.',
    },
    {
      name: 'DKIM 2048-bit Signature',
      record: 'google._domainkey.reachnexus.io',
      status: 'pass',
      detail: '2048-bit RSA cryptographic signature verified and cryptographically intact.',
    },
    {
      name: 'DMARC Policy Enforcement',
      record: 'v=DMARC1; p=reject; rua=mailto:dmarc@reachnexus.io',
      status: 'pass',
      detail: 'Strict reject policy enabled. Unauthorized spoofing attempts are dropped.',
    },
    {
      name: 'Custom Tracking Domain (CNAME)',
      record: 'track.reachnexus.io -> proxied.outtricks.com',
      status: 'pass',
      detail: 'SSL certificate valid. Shared tracking domain blacklisting risk eliminated.',
    },
  ],
  recommendations: [
    {
      type: 'positive',
      title: 'Optimal Plain-Text to HTML Ratio',
      description: 'Your email copy uses minimal HTML wrappers and clean inline CSS, reducing anti-spam filter suspicion.',
    },
    {
      type: 'warning',
      title: 'Yahoo Mail Soft Placement Shift',
      description: '2.5% of test seed mailboxes placed in Yahoo spam. Ensure sender volume ramps up under 25 emails/day during the first week.',
    },
    {
      type: 'positive',
      title: 'Zero Blacklisted Phrases Detected',
      description: 'AI scan evaluated 150+ spam triggers. Phrases like "100% free", "guarantee", or "click below" are absent.',
    },
  ],
};

export const InboxPlacementView: React.FC = () => {
  const { success } = useToast();
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResult, setTestResult] = useState<PlacementTestResult>(INITIAL_TEST);
  const [selectedMailbox, setSelectedMailbox] = useState('alex@reachnexus.io');

  const handleRunNewTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
      setTestResult({
        ...INITIAL_TEST,
        testedAt: 'Just now',
        inboxRate: 96.5,
        spamRate: 0.8,
        promotionsRate: 2.7,
        overallScore: 96,
      });
      success('AI Inbox Placement test completed across 32 seed inboxes.');
    }, 1800);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner with Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              AI Inbox Placement Tester
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real seed mailbox deliverability testing across Google Workspace, Microsoft 365, Yahoo, and Zoho spam filters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMailbox}
            onChange={(e) => setSelectedMailbox(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-800 dark:text-slate-200 outline-none"
          >
            <option value="alex@reachnexus.io">alex@reachnexus.io</option>
            <option value="sarah@nexusdata.io">sarah@nexusdata.io</option>
            <option value="team@outtricks.ai">team@outtricks.ai</option>
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunNewTest}
            disabled={isRunningTest}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRunningTest ? 'animate-spin' : ''}`} />}
            className="shadow-md shadow-emerald-600/20"
          >
            {isRunningTest ? 'Running Seed Test...' : 'Run Placement Test'}
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overall Deliverability</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{testResult.overallScore}%</span>
            <Badge variant="emerald" size="sm">Optimal</Badge>
          </div>
          <p className="text-[11px] text-slate-500">Calculated over 32 seed inboxes</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Direct Inbox Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{testResult.inboxRate}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${testResult.inboxRate}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promotions / Other</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">{testResult.promotionsRate}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
            <div className="h-full rounded-full bg-amber-500" style={{ width: `${testResult.promotionsRate * 4}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Spam / Junk Folder</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-500 font-mono">{testResult.spamRate}%</span>
            <span className="text-[11px] text-slate-400">Safe (&lt; 2%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#202020] overflow-hidden">
            <div className="h-full rounded-full bg-rose-500" style={{ width: `${testResult.spamRate * 10}%` }} />
          </div>
        </div>

      </div>

      {/* 3. Provider-Level Deliverability Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-[#222222]">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Provider-Level Placement Simulation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of how major consumer & enterprise ESP algorithms categorize your outbound messages.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Last run: {testResult.testedAt}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {testResult.providers.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#242424] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                    {p.icon}
                  </div>
                  <span>{p.name}</span>
                </div>
                <Badge variant={p.status === 'optimal' ? 'emerald' : 'amber'} size="sm">
                  {p.inbox}% Inbox
                </Badge>
              </div>

              {/* Progress Bar Stack */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#2A2A2A] overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: `${p.inbox}%` }} title={`Inbox: ${p.inbox}%`} />
                  <div className="h-full bg-amber-500" style={{ width: `${p.promotions}%` }} title={`Promotions: ${p.promotions}%`} />
                  <div className="h-full bg-rose-500" style={{ width: `${p.spam}%` }} title={`Spam: ${p.spam}%`} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Inbox {p.inbox}%
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Promotions {p.promotions}%
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Spam {p.spam}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Two-Column Details: Authentication Checks & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Authentication Sentinel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Email Authentication Sentinel
              </h3>
            </div>
            <Badge variant="emerald" size="sm">4/4 Validated</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {testResult.authChecks.map((check, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#222222] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">{check.name}</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 truncate">{check.record}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">{check.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Deliverability Insights */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                AI Deliverability Recommendations
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Real-time scan</span>
          </div>

          <div className="space-y-3 text-xs">
            {testResult.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  rec.type === 'positive'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-extrabold text-xs">
                  {rec.type === 'positive' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  )}
                  <span>{rec.title}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
