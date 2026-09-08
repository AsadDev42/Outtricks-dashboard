import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useLinkedIn } from '../../context/LinkedInContext';
import { 
  Linkedin, 
  Globe, 
  ShieldCheck, 
  Key, 
  Cookie, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Info,
  Server,
  Sparkles,
  Lock
} from 'lucide-react';

export interface ConnectLinkedInAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectLinkedInAccountModal: React.FC<ConnectLinkedInAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectAccount, proxies } = useLinkedIn();

  // Connection mode tab
  const [connectMethod, setConnectMethod] = useState<'cookie' | 'oauth'>('cookie');

  // Common fields
  const [name, setName] = useState('');
  const [title, setTitle] = useState('VP of Growth & Revenue');
  const [profileUrl, setProfileUrl] = useState('');

  // Cookie fields
  const [liAtCookie, setLiAtCookie] = useState('');
  const [jsessionId, setJsessionId] = useState('');

  // OAuth fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);

  // Proxy settings
  const [selectedProxyId, setSelectedProxyId] = useState<string>('prx_2');

  // Verification states
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeProxy = proxies.find((p) => p.id === selectedProxyId) || proxies[0] || {
    id: 'prx_2',
    name: 'US-East Residential Node 02',
    ip: '198.51.100.89',
    location: 'New York, United States',
    type: 'Residential 4G',
    latency: '36ms',
    status: 'Healthy',
  };

  const resetForm = () => {
    setName('');
    setTitle('VP of Growth & Revenue');
    setProfileUrl('');
    setLiAtCookie('');
    setJsessionId('');
    setEmail('');
    setPassword('');
    setTwoFactorCode('');
    setRequires2FA(false);
    setIsVerifying(false);
    setVerificationStep('');
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter the LinkedIn Account Holder Name.');
      return;
    }

    if (connectMethod === 'cookie') {
      if (!liAtCookie.trim()) {
        setErrorMessage('Please enter your valid LinkedIn "li_at" session cookie.');
        return;
      }
      if (liAtCookie.length < 10) {
        setErrorMessage('The "li_at" cookie appears too short or invalid. It should be an alphanumeric session token.');
        return;
      }
    } else {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please provide a valid LinkedIn login email address.');
        return;
      }
      if (!password.trim() || password.length < 6) {
        setErrorMessage('Please provide your LinkedIn account password (min 6 chars).');
        return;
      }
    }

    // Begin realistic connection simulation
    setIsVerifying(true);
    try {
      setVerificationStep(`Routing through dedicated ${activeProxy.type} (${activeProxy.ip})...`);
      await new Promise((r) => setTimeout(r, 700));

      setVerificationStep(
        connectMethod === 'cookie'
          ? 'Validating LinkedIn li_at session cookie & CSRF headers...'
          : 'Authenticating with LinkedIn Secure OAuth Gateway...'
      );
      await new Promise((r) => setTimeout(r, 800));

      setVerificationStep('Emulating human browser fingerprint (macOS/Chrome 122)...');
      await new Promise((r) => setTimeout(r, 600));

      setVerificationStep('Assigning warmup limits & anti-detection safeguards...');
      await new Promise((r) => setTimeout(r, 500));

      // Successfully connected!
      connectAccount({
        name: name.trim(),
        title: title.trim() || 'Sales Leader',
        profileUrl:
          profileUrl.trim() ||
          `https://linkedin.com/in/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        proxyIp: `${activeProxy.ip} (${activeProxy.type})`,
        proxyLocation: activeProxy.location,
        status: 'Connected',
        safetyScore: 99,
        connectionCount: 650,
      });

      handleClose();
    } catch (err: any) {
      setErrorMessage('Connection failed. Please check your credentials or session cookie.');
      setIsVerifying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Connect LinkedIn Profile"
      description="Connect an account securely with dedicated residential 4G proxy and human browser emulation."
      size="lg"
    >
      <div className="space-y-4 font-sans text-xs">
        {/* Method Toggle Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#222]">
          <button
            type="button"
            onClick={() => {
              setConnectMethod('cookie');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer ${
              connectMethod === 'cookie'
                ? 'bg-white dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Session Cookie (li_at)</span>
            <Badge variant="emerald" size="sm">
              Safest
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => {
              setConnectMethod('oauth');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer ${
              connectMethod === 'oauth'
                ? 'bg-white dark:bg-[#202020] text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>LinkedIn OAuth / Credentials</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-500 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identity details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Account Holder Name"
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isVerifying}
              autoFocus
            />

            <Input
              label="Job Title"
              placeholder="e.g. VP of Sales"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isVerifying}
              required
            />
          </div>

          <Input
            label="LinkedIn Profile URL"
            placeholder="https://www.linkedin.com/in/sarah-jenkins"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            disabled={isVerifying}
          />

          {/* TAB 1: Cookie based connection */}
          {connectMethod === 'cookie' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#242424] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    LinkedIn Session Cookie Authentication
                  </span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Zero 2FA prompts required
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  li_at Session Cookie *
                </label>
                <input
                  type="password"
                  placeholder="AQEDAT... (Paste your li_at cookie here)"
                  value={liAtCookie}
                  onChange={(e) => setLiAtCookie(e.target.value)}
                  disabled={isVerifying}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>JSESSIONID (Optional CSRF Token)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Auto-detected if blank</span>
                </label>
                <input
                  type="text"
                  placeholder="ajax:492810..."
                  value={jsessionId}
                  onChange={(e) => setJsessionId(e.target.value)}
                  disabled={isVerifying}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-200/50 dark:bg-[#1A1A1A] border border-slate-300/60 dark:border-[#2A2A2A] text-[11px] text-slate-500 dark:text-slate-400 space-y-1 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <span>How to find your li_at cookie:</span>
                </div>
                <p>
                  1. Open LinkedIn.com in Chrome & press <code className="text-emerald-500 font-mono">F12</code> to open Developer Tools.
                </p>
                <p>
                  2. Navigate to <strong>Application</strong> → <strong>Cookies</strong> → <strong>https://www.linkedin.com</strong>.
                </p>
                <p>
                  3. Find the cookie named <code className="text-emerald-500 font-mono">li_at</code>, double click its Value, and copy-paste it above.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: OAuth / Direct Credentials */}
          {connectMethod === 'oauth' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#242424] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-slate-900 dark:text-white">
                    LinkedIn Credentials & Direct OAuth
                  </span>
                </div>
                <Badge variant="slate" size="sm">
                  Encrypted TLS 1.3
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="LinkedIn Email / Phone"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isVerifying}
                  required
                />

                <Input
                  label="LinkedIn Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isVerifying}
                  required
                />
              </div>

              <div className="p-3 bg-slate-200/50 dark:bg-[#181818] rounded-xl border border-slate-300/60 dark:border-[#262626] text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  Credentials are automatically processed inside an isolated cloud headless sandbox and swapped for encrypted tokens. We never store raw passwords.
                </span>
              </div>
            </div>
          )}

          {/* Dedicated Proxy Selection & Health Preview */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-slate-900 dark:text-white">
                  Assigned Residential Proxy Node
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active & Healthy</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <label className="text-slate-400 block pb-1">Select Geolocation Node</label>
                <select
                  value={selectedProxyId}
                  onChange={(e) => setSelectedProxyId(e.target.value)}
                  disabled={isVerifying}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#333] bg-white dark:bg-[#181818] text-slate-900 dark:text-white font-medium"
                >
                  {proxies.map((prx) => (
                    <option key={prx.id} value={prx.id}>
                      {prx.location} ({prx.type} • {prx.latency})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Node IP:</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">{activeProxy.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-emerald-500 font-bold">{activeProxy.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fingerprint:</span>
                  <span className="text-slate-700 dark:text-slate-300">macOS Chrome 122</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Static residential IP ensures your account never triggers LinkedIn location alerts or captchas.</span>
            </p>
          </div>

          {/* Verification Progress Modal Overlay */}
          {isVerifying && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 animate-in fade-in">
              <Loader2 className="w-5 h-5 text-emerald-500 animate-spin shrink-0" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Securing LinkedIn Connection...
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                  {verificationStep}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose}
              type="button"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={isVerifying || !name.trim()}
              leftIcon={
                isVerifying ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Linkedin className="w-3.5 h-3.5" />
                )
              }
            >
              {isVerifying ? 'Verifying...' : 'Connect Profile'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
