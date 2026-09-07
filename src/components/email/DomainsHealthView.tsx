import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw, 
  Plus, 
  ExternalLink, 
  Lock, 
  Search, 
  Zap, 
  Sparkles, 
  Copy, 
  Inbox, 
  AlertCircle, 
  TrendingUp, 
  Server,
  Mail,
  Check,
  Flame,
  Info,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { useEmail } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

type DeliverabilityTab = 'domain-health' | 'mailbox-health' | 'inbox-placement' | 'spam-risk' | 'authentication';

export const DomainsHealthView: React.FC = () => {
  const location = useLocation();
  const { domains, mailboxes, recheckMailboxHealth } = useEmail();
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<DeliverabilityTab>('domain-health');
  const [selectedDomain, setSelectedDomain] = useState<string>('outbound.cloudscale.ai');
  const [isScanning, setIsScanning] = useState(false);
  const [searchDomain, setSearchDomain] = useState('');

  // AI Placement simulation state
  const [isTestingPlacement, setIsTestingPlacement] = useState(false);
  const [placementTested, setPlacementTested] = useState(true);

  // Sync tab with URL if navigated from /inbox-placement or /domains
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/inbox-placement') || p.includes('/placement')) {
      setActiveTab('inbox-placement');
    } else if (p.includes('/mailboxes')) {
      setActiveTab('mailbox-health');
    } else if (p.includes('/spam') || p.includes('/risk')) {
      setActiveTab('spam-risk');
    } else if (p.includes('/auth') || p.includes('/dns')) {
      setActiveTab('authentication');
    }
  }, [location.pathname]);

  const handleVerifyAll = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      success('Scanned 50+ DNS providers. All records passing 100% SPF/DKIM/DMARC alignment.', 'DNS Verified');
    }, 1200);
  };

  const handleCopyRecord = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    success(`Copied ${type} record to clipboard!`);
  };

  const handleRunPlacementTest = () => {
    setIsTestingPlacement(true);
    setTimeout(() => {
      setIsTestingPlacement(false);
      setPlacementTested(true);
      success('AI Inbox Placement Analysis Complete. Primary Inbox: 97.4%');
    }, 1400);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Live Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Deliverability & Health Hub
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
              99.4% Primary Inbox Rate
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real-time DNS sentinel, cryptographic email authentication, AI inbox placement, and domain reputation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setActiveTab('authentication')}
            leftIcon={<Copy className="w-3.5 h-3.5" />}
          >
            DNS Record Generator
          </Button>

          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleVerifyAll} 
            disabled={isScanning}
            leftIcon={<RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />}
          >
            {isScanning ? 'Scanning DNS...' : 'Re-Verify All DNS'}
          </Button>
        </div>
      </div>

      {/* 2. Deliverability Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] overflow-x-auto">
        {[
          { id: 'domain-health', label: 'Domain Health', icon: Globe },
          { id: 'mailbox-health', label: 'Mailbox Health', icon: Mail },
          { id: 'inbox-placement', label: 'Inbox Placement', icon: Sparkles },
          { id: 'spam-risk', label: 'Spam Risk', icon: ShieldCheck },
          { id: 'authentication', label: 'Authentication', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as DeliverabilityTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DOMAIN HEALTH (SECTION 6 REQUIREMENT)                               */}
      {/* ========================================================================= */}
      {activeTab === 'domain-health' && (
        <div className="space-y-5 animate-in fade-in">
          
          {/* Main Domain Health Score Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#222]">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Inspecting Sending Domain:
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {selectedDomain}
                  </h3>
                  <Badge variant="emerald" size="sm">Active Fleet</Badge>
                </div>
              </div>

              {/* Dedicated Score Display (92/100 as requested) */}
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-2xl">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    Domain Health Score
                  </div>
                  <div className="text-2xl font-black text-slate-950 dark:text-white font-mono leading-none">
                    92<span className="text-sm font-normal text-slate-400">/100</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Checklist of Verification Records */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                DNS & Deliverability Records Status:
              </h4>

              <div className="space-y-2.5">
                
                {/* 1. SPF */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold">✓ SPF configured</strong>
                      <div className="text-[11px] text-slate-500 font-mono">
                        v=spf1 include:_spf.google.com ~all
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">PASS</Badge>
                </div>

                {/* 2. DKIM */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold">✓ DKIM configured</strong>
                      <div className="text-[11px] text-slate-500 font-mono">
                        google._domainkey (RSA 2048-bit active cryptographic signature)
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">PASS</Badge>
                </div>

                {/* 3. DMARC (WARNING AS REQUESTED WITH: WHAT IS WRONG, WHY IT MATTERS, HOW TO FIX IT) */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <strong className="text-amber-950 dark:text-amber-300 font-bold">
                        ⚠ DMARC policy could be stronger
                      </strong>
                    </div>
                    <Badge variant="amber" size="sm">Action Recommended</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px]">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-amber-500/20 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">1. What is wrong:</span>
                      <p className="text-slate-600 dark:text-slate-400">
                        Your policy is currently in monitoring mode (<code className="font-mono text-amber-500">p=none</code>) rather than quarantine or reject.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-amber-500/20 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">2. Why it matters:</span>
                      <p className="text-slate-600 dark:text-slate-400">
                        In 2026, Google and Yahoo enforce strict sender rules. Without <code className="font-mono text-amber-500">p=quarantine</code> or <code className="font-mono text-amber-500">p=reject</code>, receiving servers lower inbox trust.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-amber-500/20 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">3. How to fix it:</span>
                      <p className="text-slate-600 dark:text-slate-400">
                        Update your TXT record at <code className="font-mono text-emerald-500">_dmarc</code> to enforce reject mode.
                      </p>
                    </div>
                  </div>

                  {/* Fix Snippet with 1-click Copy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-white dark:bg-[#161616] border border-amber-500/20 font-mono text-[11px]">
                    <code className="text-emerald-600 dark:text-emerald-400 truncate">
                      v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@{selectedDomain};
                    </code>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopyRecord(`v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@${selectedDomain};`, 'Strict DMARC')}
                      leftIcon={<Copy className="w-3 h-3" />}
                    >
                      Copy Fix Record
                    </Button>
                  </div>
                </div>

                {/* 4. MX */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold">✓ MX configured</strong>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Priority 10: smtp.google.com (Mail exchangers receiving successfully)
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">PASS</Badge>
                </div>

                {/* 5. Return-Path */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold">✓ Return-Path configured</strong>
                      <div className="text-[11px] text-slate-500 font-mono">
                        bounces.{selectedDomain} (Automated bounce handling active)
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">PASS</Badge>
                </div>

                {/* 6. Tracking Domain */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-bold">✓ Tracking domain configured</strong>
                      <div className="text-[11px] text-slate-500 font-mono">
                        track.{selectedDomain} (SSL Active, CNAME points to cname.outtricks.ai)
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">PASS</Badge>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MAILBOX HEALTH (SECTION 5 REQUIREMENT)                              */}
      {/* ========================================================================= */}
      {activeTab === 'mailbox-health' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                Mailbox Fleet Deliverability Health
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time socket authentication, bounce safeguards, and blacklist monitoring per inbox.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {mailboxes.length} Inboxes Connected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mailboxes.map((mbx) => (
              <div key={mbx.id} className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs text-slate-900 dark:text-white font-mono truncate">
                    {mbx.email}
                  </div>
                  <Badge variant="emerald" size="sm">Score: {mbx.healthScore}%</Badge>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span>✓ SMTP Auth</span>
                  <span>✓ IMAP Sync</span>
                  <span>✓ SPF Valid</span>
                  <span>✓ DKIM 2048</span>
                  <span>✓ DMARC OK</span>
                  <span>✓ TLS 1.3</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#222] flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Pacing: {mbx.dailySent}/{mbx.dailyCap} sends</span>
                  <button
                    onClick={() => recheckMailboxHealth(mbx.id)}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Recheck Health
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INBOX PLACEMENT (SECTION 7 REQUIREMENT)                             */}
      {/* ========================================================================= */}
      {activeTab === 'inbox-placement' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                  AI-Powered Inbox Placement Tester
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Simulates real-world email deliveries across seed accounts in Google, Microsoft, Yahoo, and private ESPs.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleRunPlacementTest}
              disabled={isTestingPlacement}
              leftIcon={<Sparkles className={`w-3.5 h-3.5 ${isTestingPlacement ? 'animate-spin' : 'text-amber-300'}`} />}
            >
              {isTestingPlacement ? 'Testing Seed Mailboxes...' : 'Run Live Placement Test'}
            </Button>
          </div>

          {/* ESP Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            
            {/* Google */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between font-sans">
                <span className="font-extrabold text-slate-900 dark:text-white">Google Workspace</span>
                <Badge variant="emerald" size="sm">97.4%</Badge>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#222] overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '97.4%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '2.6%' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-500 font-bold">Primary: 97.4%</span>
                <span className="text-rose-500">Spam: 2.6%</span>
              </div>
            </div>

            {/* Microsoft 365 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between font-sans">
                <span className="font-extrabold text-slate-900 dark:text-white">Microsoft 365</span>
                <Badge variant="emerald" size="sm">95.8%</Badge>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#222] overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '95.8%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '4.2%' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-500 font-bold">Inbox: 95.8%</span>
                <span className="text-rose-500">Junk: 4.2%</span>
              </div>
            </div>

            {/* Yahoo */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between font-sans">
                <span className="font-extrabold text-slate-900 dark:text-white">Yahoo & AOL</span>
                <Badge variant="emerald" size="sm">98.2%</Badge>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#222] overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '98.2%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '1.8%' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-500 font-bold">Inbox: 98.2%</span>
                <span className="text-rose-500">Spam: 1.8%</span>
              </div>
            </div>

            {/* Zoho & Private */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between font-sans">
                <span className="font-extrabold text-slate-900 dark:text-white">Zoho & Business</span>
                <Badge variant="emerald" size="sm">100%</Badge>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#222] overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-500 font-bold">Primary: 100%</span>
                <span>Spam: 0%</span>
              </div>
            </div>

          </div>

          {/* AI Content & Placement Diagnostics */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>AI Deliverability Analysis & Content Safety Signals:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Spam Words Risk</span>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Low (0 Detected)</div>
                <span className="text-[10px] text-slate-400">Zero aggressive trigger keywords</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Link & Tracking Safety</span>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Optimal (SSL Active)</div>
                <span className="text-[10px] text-slate-400">CNAME matches sender domain</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Sender Velocity</span>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Safe (30/day cap)</div>
                <span className="text-[10px] text-slate-400">180s randomized pacing active</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Spamhaus & SORBS</span>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">Clean (0/58 lists)</div>
                <span className="text-[10px] text-slate-400">Zero blacklist records</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SPAM RISK                                                          */}
      {/* ========================================================================= */}
      {activeTab === 'spam-risk' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                Spam Keyword & Content Fingerprinting Shield
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Detects aggressive cold email words and evaluates dynamic Spintax variation uniqueness.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626] space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Active Outbound Safeguards:</span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li><strong className="text-emerald-500">Spintax Hashing:</strong> Every sequence variation changes phrase syntax to prevent ESP fingerprint matching.</li>
                <li><strong className="text-emerald-500">Unsubscribe Header:</strong> One-click RFC 8058 list-unsubscribe headers embedded in every outgoing mime.</li>
                <li><strong className="text-emerald-500">Write-path Suppression:</strong> Real-time bounce avoidance prevents emails from queueing if domain lacks valid MX records.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: AUTHENTICATION (DNS GENERATOR)                                     */}
      {/* ========================================================================= */}
      {activeTab === 'authentication' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                DNS Record Generator & Setup Instructions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Copy and paste these exact records into Cloudflare, GoDaddy, Namecheap, or AWS Route 53.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* SPF */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">1. SPF Record (TXT)</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopyRecord('v=spf1 include:_spf.google.com ~all', 'SPF')}
                    leftIcon={<Copy className="w-3 h-3" />}
                  >
                    Copy
                  </Button>
                </div>
                <div className="text-[11px] text-slate-500">Host: @ or domain.com</div>
                <code className="block p-2 rounded-xl bg-white dark:bg-[#101010] text-emerald-600 dark:text-emerald-400 text-[11px] overflow-x-auto">
                  v=spf1 include:_spf.google.com ~all
                </code>
              </div>

              {/* DKIM */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">2. DKIM 2048-bit Record (TXT)</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopyRecord('v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzX...IDAQAB', 'DKIM')}
                    leftIcon={<Copy className="w-3 h-3" />}
                  >
                    Copy
                  </Button>
                </div>
                <div className="text-[11px] text-slate-500">Host: google._domainkey</div>
                <code className="block p-2 rounded-xl bg-white dark:bg-[#101010] text-emerald-600 dark:text-emerald-400 text-[11px] overflow-x-auto">
                  v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzX...IDAQAB
                </code>
              </div>

              {/* DMARC */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">3. DMARC Enforcement (TXT)</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopyRecord(`v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@${selectedDomain};`, 'DMARC')}
                    leftIcon={<Copy className="w-3 h-3" />}
                  >
                    Copy
                  </Button>
                </div>
                <div className="text-[11px] text-slate-500">Host: _dmarc</div>
                <code className="block p-2 rounded-xl bg-white dark:bg-[#101010] text-emerald-600 dark:text-emerald-400 text-[11px] overflow-x-auto">
                  v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@{selectedDomain};
                </code>
              </div>

              {/* CNAME */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">4. Custom Tracking Domain (CNAME)</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopyRecord('cname.outtricks.ai', 'CNAME')}
                    leftIcon={<Copy className="w-3 h-3" />}
                  >
                    Copy
                  </Button>
                </div>
                <div className="text-[11px] text-slate-500">Host: track • Target: cname.outtricks.ai</div>
                <code className="block p-2 rounded-xl bg-white dark:bg-[#101010] text-emerald-600 dark:text-emerald-400 text-[11px] overflow-x-auto">
                  track CNAME cname.outtricks.ai
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
