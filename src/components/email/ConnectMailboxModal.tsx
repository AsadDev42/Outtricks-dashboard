import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useEmail, ConnectedMailbox } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';
import { 
  Mail, 
  Globe, 
  ShieldCheck, 
  Server, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle,
  RotateCw, 
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface ConnectMailboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProviderType = 'Google Workspace' | 'Microsoft 365' | 'Custom SMTP';

export const ConnectMailboxModal: React.FC<ConnectMailboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectMailbox } = useEmail();
  const { success, error: toastError } = useToast();

  const [provider, setProvider] = useState<ProviderType>('Google Workspace');

  // OAuth Simulated State
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthConnectedAccount, setOauthConnectedAccount] = useState<{
    email: string;
    name: string;
    provider: ProviderType;
  } | null>(null);

  // Common Fields
  const [email, setEmail] = useState('');
  const [senderName, setSenderName] = useState('Sarah Jenkins');
  const [dailyCap, setDailyCap] = useState(30);
  const [customTrackingDomain, setCustomTrackingDomain] = useState('');

  // Custom SMTP / IMAP Fields
  const [smtpUsername, setSmtpUsername] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Advanced SMTP / IMAP Settings
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpEncryption, setSmtpEncryption] = useState<'STARTTLS' | 'SSL/TLS'>('STARTTLS');

  const [sameAsSmtp, setSameAsSmtp] = useState(true);
  const [imapHost, setImapHost] = useState('');
  const [imapPort, setImapPort] = useState('993');
  const [imapEncryption, setImapEncryption] = useState<'SSL/TLS' | 'STARTTLS'>('SSL/TLS');

  // Connection Test Flow State
  const [isTesting, setIsTesting] = useState(false);
  const [testStage, setTestStage] = useState<string>('');
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'failed';
    latencyMs?: number;
    failedCheck?: string;
    errorMessage?: string;
    checks: {
      smtpAuth: boolean;
      imapAuth: boolean;
      sendingAccess: boolean;
      inboxAccess: boolean;
      spf: boolean;
      dkim: boolean;
      dmarc: boolean;
      mx: boolean;
      trackingDomain: boolean;
    };
  }>({
    status: 'idle',
    checks: {
      smtpAuth: false,
      imapAuth: false,
      sendingAccess: false,
      inboxAccess: false,
      spf: false,
      dkim: false,
      dmarc: false,
      mx: false,
      trackingDomain: false,
    }
  });

  // Handle auto-populating hosts when email domain changes
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!smtpUsername) {
      setSmtpUsername(val);
    }
    const domain = val.includes('@') ? val.split('@')[1] : '';
    if (domain) {
      if (!smtpHost) setSmtpHost(`smtp.${domain}`);
      if (!imapHost) setImapHost(`imap.${domain}`);
      if (!customTrackingDomain) setCustomTrackingDomain(`track.${domain}`);
    }
  };

  // Google OAuth Flow
  const handleGoogleOAuth = () => {
    setOauthLoading(true);
    setTestResult({ status: 'idle', checks: testResult.checks });

    setTimeout(() => {
      setOauthLoading(false);
      const connectedEmail = email.trim() || 'sarah.j@outbound.cloudscale.ai';
      setOauthConnectedAccount({
        email: connectedEmail,
        name: senderName || 'Sarah Jenkins',
        provider: 'Google Workspace',
      });
      setEmail(connectedEmail);
      if (!customTrackingDomain) {
        setCustomTrackingDomain(`track.${connectedEmail.split('@')[1] || 'cloudscale.ai'}`);
      }
      success(`Authorized Google Workspace mailbox: ${connectedEmail}`, 'Google OAuth 2.0 Connected');
    }, 1000);
  };

  // Microsoft 365 OAuth Flow
  const handleMicrosoftOAuth = () => {
    setOauthLoading(true);
    setTestResult({ status: 'idle', checks: testResult.checks });

    setTimeout(() => {
      setOauthLoading(false);
      const connectedEmail = email.trim() || 'growth@send.cloudscale.ai';
      setOauthConnectedAccount({
        email: connectedEmail,
        name: senderName || 'Sarah Jenkins',
        provider: 'Microsoft 365',
      });
      setEmail(connectedEmail);
      if (!customTrackingDomain) {
        setCustomTrackingDomain(`track.${connectedEmail.split('@')[1] || 'cloudscale.ai'}`);
      }
      success(`Authorized Microsoft 365 mailbox: ${connectedEmail}`, 'Microsoft OAuth 2.0 Connected');
    }, 1000);
  };

  // 8-Point Connection Test Flow for Custom SMTP / IMAP
  const handleTestConnection = () => {
    if (!email.trim() || !email.includes('@')) {
      toastError('Please provide a valid sender email address.', 'Missing Email');
      return;
    }
    if (!smtpUsername.trim()) {
      toastError('Please enter a username for SMTP authentication.', 'Missing Username');
      return;
    }
    if (!smtpPassword.trim()) {
      toastError('Please enter a password or App Password for SMTP authentication.', 'Missing Password');
      return;
    }

    const host = smtpHost.trim() || `smtp.${email.split('@')[1] || 'domain.com'}`;
    const iHost = sameAsSmtp ? host.replace('smtp.', 'imap.') : (imapHost.trim() || `imap.${email.split('@')[1] || 'domain.com'}`);

    setIsTesting(true);
    setTestStage('Validating credentials format...');
    setTestResult({
      status: 'idle',
      checks: {
        smtpAuth: false,
        imapAuth: false,
        sendingAccess: false,
        inboxAccess: false,
        spf: false,
        dkim: false,
        dmarc: false,
        mx: false,
        trackingDomain: false,
      }
    });

    setTimeout(() => {
      setTestStage(`Testing SMTP authentication on ${host}:${smtpPort}...`);
    }, 350);

    setTimeout(() => {
      setTestStage(`Testing IMAP handshake on ${iHost}:${imapPort}...`);
    }, 700);

    setTimeout(() => {
      setTestStage('Verifying DNS records (SPF, DKIM, DMARC, MX)...');
    }, 1050);

    setTimeout(() => {
      setIsTesting(false);
      setTestStage('');

      // Test failure condition if password is 'wrong' or 'fail'
      if (smtpPassword.toLowerCase() === 'wrong' || smtpPassword.toLowerCase() === 'error') {
        setTestResult({
          status: 'failed',
          failedCheck: 'SMTP Authentication Failed',
          errorMessage: 'SMTP authentication failed (535 5.7.8 Authentication credentials invalid). Check your username/password or SMTP credentials. If 2FA is active, an App-Specific Password is required.',
          checks: {
            smtpAuth: false,
            imapAuth: false,
            sendingAccess: false,
            inboxAccess: false,
            spf: true,
            dkim: true,
            dmarc: true,
            mx: true,
            trackingDomain: false,
          }
        });
        toastError('SMTP authentication failed. Check credentials.', 'Connection Failed');
        return;
      }

      // Success
      setTestResult({
        status: 'success',
        latencyMs: 38,
        checks: {
          smtpAuth: true,
          imapAuth: true,
          sendingAccess: true,
          inboxAccess: true,
          spf: true,
          dkim: true,
          dmarc: true,
          mx: true,
          trackingDomain: true,
        }
      });
      success('All 9 diagnostic checks passed successfully!', 'Mailbox Handshake Verified');
    }, 1400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let targetEmail = email.trim();
    let targetProvider = provider;

    if (provider === 'Google Workspace' || provider === 'Microsoft 365') {
      if (!oauthConnectedAccount) {
        toastError(`Please click "Connect with ${provider === 'Google Workspace' ? 'Google' : 'Microsoft'}" to authenticate via OAuth.`);
        return;
      }
      targetEmail = oauthConnectedAccount.email;
      targetProvider = oauthConnectedAccount.provider;
    } else {
      if (!targetEmail || !targetEmail.includes('@')) {
        toastError('Please provide a valid sender email address.');
        return;
      }
      if (!smtpUsername.trim() || !smtpPassword.trim()) {
        toastError('Username and password are required for Custom SMTP / IMAP.');
        return;
      }
    }

    const domain = targetEmail.split('@')[1] || 'cloudscale.ai';

    connectMailbox({
      email: targetEmail,
      senderName: senderName.trim() || 'Sales Representative',
      provider: targetProvider,
      status: 'Optimal',
      healthScore: 100,
      dailySent: 0,
      dailyCap: Number(dailyCap) || 30,
      spf: true,
      dkim: true,
      dmarc: true,
      mx: true,
      smtpAuth: true,
      imapAuth: true,
      sendingAccess: true,
      inboxAccess: true,
      sslTls: true,
      blacklistStatus: 'Clean',
      customTrackingDomain: customTrackingDomain.trim() || `track.${domain}`,
      advancedConfig: targetProvider === 'Custom SMTP' ? {
        smtpHost: smtpHost.trim() || `smtp.${domain}`,
        smtpPort: smtpPort,
        smtpEncryption: smtpEncryption,
        imapHost: sameAsSmtp ? (smtpHost.trim() || `smtp.${domain}`).replace('smtp.', 'imap.') : (imapHost.trim() || `imap.${domain}`),
        imapPort: imapPort,
        imapEncryption: imapEncryption,
        username: smtpUsername.trim(),
      } : undefined,
      lastChecked: 'Just now'
    });

    onClose();
  };

  const resetModal = () => {
    setEmail('');
    setOauthConnectedAccount(null);
    setSmtpPassword('');
    setSmtpUsername('');
    setTestResult({ status: 'idle', checks: testResult.checks });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetModal();
        onClose();
      }}
      title="Connect Sending Mailbox"
      description="Add a Google Workspace, Microsoft 365, or Custom SMTP account to the rotation pool."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        
        {/* 1. Mailbox Provider Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
            Mailbox Provider
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Google Workspace */}
            <button
              type="button"
              onClick={() => {
                setProvider('Google Workspace');
                setTestResult({ status: 'idle', checks: testResult.checks });
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 ${
                provider === 'Google Workspace'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#181818] border-slate-200/80 dark:border-[#262626] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#333]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] flex items-center justify-center font-bold text-[10px] text-red-500">
                  G
                </div>
                <span className="font-bold text-xs">Google</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                Workspace / Gmail (OAuth)
              </span>
            </button>

            {/* Microsoft 365 */}
            <button
              type="button"
              onClick={() => {
                setProvider('Microsoft 365');
                setTestResult({ status: 'idle', checks: testResult.checks });
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 ${
                provider === 'Microsoft 365'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#181818] border-slate-200/80 dark:border-[#262626] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#333]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] flex items-center justify-center font-bold text-[10px] text-blue-500">
                  M
                </div>
                <span className="font-bold text-xs">Microsoft</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                365 / Outlook (OAuth)
              </span>
            </button>

            {/* Custom SMTP / IMAP */}
            <button
              type="button"
              onClick={() => {
                setProvider('Custom SMTP');
                setTestResult({ status: 'idle', checks: testResult.checks });
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center sm:items-start sm:text-left gap-1.5 ${
                provider === 'Custom SMTP'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#181818] border-slate-200/80 dark:border-[#262626] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#333]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-xs">Custom</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                SMTP / IMAP Relay
              </span>
            </button>
          </div>
        </div>

        {/* 2. GOOGLE WORKSPACE OAUTH FLOW */}
        {provider === 'Google Workspace' && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3.5">
            {!oauthConnectedAccount ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] flex items-center justify-center mx-auto shadow-xs">
                  <div className="text-xl font-black text-red-500">G</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Connect with Google Workspace
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-0.5">
                    Secure 1-click OAuth 2.0 authorization. No app passwords or complex IMAP/SMTP ports required.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleGoogleOAuth}
                    disabled={oauthLoading}
                    leftIcon={oauthLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : undefined}
                    className="mx-auto"
                  >
                    {oauthLoading ? 'Authenticating with Google...' : 'Connect with Google'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-emerald-950 dark:text-white">
                        ✓ Connected with Google Workspace
                      </div>
                      <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                        {oauthConnectedAccount.email}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOauthConnectedAccount(null)}
                    className="text-[10px] text-slate-400 hover:text-rose-500 underline cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Daily Volume Limit
                    </label>
                    <input
                      type="number"
                      value={dailyCap}
                      onChange={(e) => setDailyCap(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                      min={5}
                      max={100}
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Recommended 30 sends/day for optimal sender score.</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Custom Tracking Domain (Optional)
                    </label>
                    <input
                      type="text"
                      value={customTrackingDomain}
                      onChange={(e) => setCustomTrackingDomain(e.target.value)}
                      placeholder="e.g. track.company.com"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#202020] flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Connection Health:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span>✓ SPF</span>
                    <span>✓ DKIM</span>
                    <span>✓ DMARC</span>
                    <span>✓ MX</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. MICROSOFT 365 OAUTH FLOW */}
        {provider === 'Microsoft 365' && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3.5">
            {!oauthConnectedAccount ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] flex items-center justify-center mx-auto shadow-xs">
                  <div className="text-xl font-black text-blue-500">M</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Connect with Microsoft 365 / Outlook
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-0.5">
                    Connect directly via Microsoft Graph OAuth. No passwords or server endpoints required.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleMicrosoftOAuth}
                    disabled={oauthLoading}
                    leftIcon={oauthLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : undefined}
                    className="mx-auto"
                  >
                    {oauthLoading ? 'Authenticating with Microsoft...' : 'Connect with Microsoft'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-emerald-950 dark:text-white">
                        ✓ Connected with Microsoft 365
                      </div>
                      <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                        {oauthConnectedAccount.email}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOauthConnectedAccount(null)}
                    className="text-[10px] text-slate-400 hover:text-rose-500 underline cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Daily Volume Limit
                    </label>
                    <input
                      type="number"
                      value={dailyCap}
                      onChange={(e) => setDailyCap(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                      min={5}
                      max={100}
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Recommended 30 sends/day for optimal sender score.</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Custom Tracking Domain (Optional)
                    </label>
                    <input
                      type="text"
                      value={customTrackingDomain}
                      onChange={(e) => setCustomTrackingDomain(e.target.value)}
                      placeholder="e.g. track.company.com"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#202020] flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Connection Health:</span>
                  <div className="flex items-center gap-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span>✓ SPF</span>
                    <span>✓ DKIM</span>
                    <span>✓ DMARC</span>
                    <span>✓ MX</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. CUSTOM SMTP / IMAP FLOW */}
        {provider === 'Custom SMTP' && (
          <div className="space-y-3">
            {/* Required Core Credentials */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sender Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="user@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    placeholder="user@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Password / App Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full pl-3 pr-10 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Advanced Settings */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className="flex items-center justify-between w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xs py-1 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-emerald-500" />
                    Advanced connection settings (SMTP / IMAP Host, Ports, TLS)
                  </span>
                  {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isAdvancedOpen && (
                  <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#262626] space-y-3 animate-in fade-in">
                    {/* SMTP */}
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                        <span>SMTP Outbound Server</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={smtpHost}
                            onChange={(e) => setSmtpHost(e.target.value)}
                            placeholder="smtp.domain.com"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="text"
                            value={smtpPort}
                            onChange={(e) => setSmtpPort(e.target.value)}
                            placeholder="Port"
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-center"
                          />
                          <select
                            value={smtpEncryption}
                            onChange={(e) => setSmtpEncryption(e.target.value as any)}
                            className="w-full px-1.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-[11px] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            <option value="STARTTLS">STARTTLS</option>
                            <option value="SSL/TLS">SSL/TLS</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* IMAP */}
                    <div className="pt-2 border-t border-slate-100 dark:border-[#202020]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-400">IMAP Inbound Server</span>
                        <label className="flex items-center gap-1 cursor-pointer text-[10px] text-slate-500">
                          <input
                            type="checkbox"
                            checked={sameAsSmtp}
                            onChange={(e) => setSameAsSmtp(e.target.checked)}
                            className="rounded text-emerald-500 focus:ring-emerald-500 w-3 h-3"
                          />
                          <span>Use same host/credentials as SMTP</span>
                        </label>
                      </div>

                      {!sameAsSmtp && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={imapHost}
                              onChange={(e) => setImapHost(e.target.value)}
                              placeholder="imap.domain.com"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <input
                              type="text"
                              value={imapPort}
                              onChange={(e) => setImapPort(e.target.value)}
                              placeholder="Port"
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-center"
                            />
                            <select
                              value={imapEncryption}
                              onChange={(e) => setImapEncryption(e.target.value as any)}
                              className="w-full px-1.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-[11px] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                            >
                              <option value="SSL/TLS">SSL/TLS</option>
                              <option value="STARTTLS">STARTTLS</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pacing & Custom Tracking Domain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Daily Sending Limit <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={dailyCap}
                  onChange={(e) => setDailyCap(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  min={5}
                  max={100}
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Recommended 30 sends/day for safe warming.</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Custom Tracking Domain (Optional)
                </label>
                <input
                  type="text"
                  value={customTrackingDomain}
                  onChange={(e) => setCustomTrackingDomain(e.target.value)}
                  placeholder="e.g. track.company.com"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Dedicated CNAME with SSL tracking.</span>
              </div>
            </div>

            {/* Diagnostics Feedback Banner */}
            {isTesting && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-2.5 font-mono text-[11px] text-slate-700 dark:text-slate-300 animate-pulse">
                <RotateCw className="w-4 h-4 animate-spin text-emerald-500 shrink-0" />
                <span>{testStage}</span>
              </div>
            )}

            {testResult.status === 'success' && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>✓ Mailbox connected & verified successfully</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {testResult.latencyMs}ms
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] font-mono text-emerald-800 dark:text-emerald-400 pt-1">
                  <span className="flex items-center gap-1">✓ SMTP authentication</span>
                  <span className="flex items-center gap-1">✓ IMAP authentication</span>
                  <span className="flex items-center gap-1">✓ Sending access</span>
                  <span className="flex items-center gap-1">✓ Inbox access</span>
                  <span className="flex items-center gap-1">✓ SPF</span>
                  <span className="flex items-center gap-1">✓ DKIM</span>
                  <span className="flex items-center gap-1">✓ DMARC</span>
                  <span className="flex items-center gap-1">✓ MX</span>
                  <span className="flex items-center gap-1">✓ Tracking domain</span>
                </div>
              </div>
            )}

            {testResult.status === 'failed' && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-rose-950 dark:text-rose-300">
                      {testResult.failedCheck || 'Connection verification failed'}
                    </div>
                    <div className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5">
                      {testResult.errorMessage}
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleTestConnection}
                    leftIcon={<RotateCw className="w-3.5 h-3.5" />}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-[#262626]">
          {provider === 'Custom SMTP' ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTesting || !email.trim() || !smtpUsername.trim() || !smtpPassword.trim()}
              leftIcon={isTesting ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-500" />}
            >
              {isTesting ? 'Testing Handshake...' : 'Test Connection'}
            </Button>
          ) : (
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>OAuth 2.0 Direct Token</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                resetModal();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={
                provider === 'Custom SMTP'
                  ? (!email.trim() || !smtpUsername.trim() || !smtpPassword.trim())
                  : !oauthConnectedAccount
              }
              leftIcon={<Mail className="w-3.5 h-3.5" />}
            >
              Connect Mailbox
            </Button>
          </div>
        </div>

      </form>
    </Modal>
  );
};
