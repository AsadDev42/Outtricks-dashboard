import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Zap, Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateRedirectUrl } from '../../lib/security';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('sarah@cloudscale.ai');
  const [password, setPassword] = useState('Outtricks2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, loginWithOAuth, resetPassword } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectDestination = searchParams.get('redirect') || '/demo';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      success('Welcome back to your Outtricks workspace.', 'Signed In');
      navigate(validateRedirectUrl(redirectDestination));
    } else {
      setErrorMessage(res.error || 'Failed to sign in.');
      error(res.error || 'Authentication failed', 'Error');
    }
  };

  const handleOAuthLogin = async (provider: 'Google' | 'Microsoft' | 'Apple') => {
    setErrorMessage(null);
    setAuthProvider(provider);
    setLoading(true);

    const res = await loginWithOAuth(provider);
    setLoading(false);
    setAuthProvider(null);

    if (res.success) {
      success(`Successfully authenticated via ${provider}.`, 'Signed In');
      navigate(validateRedirectUrl(redirectDestination));
    } else {
      setErrorMessage(res.error || `Failed to sign in with ${provider}.`);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email) {
      setErrorMessage('Please enter your work email to receive password reset instructions.');
      return;
    }

    const res = await resetPassword(email);
    if (res.success) {
      setResetSent(true);
      success(`Password reset instructions sent to ${email}`, 'Reset Link Dispatched');
      setTimeout(() => setResetSent(false), 6000);
    } else {
      setErrorMessage(res.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 sm:py-28 relative overflow-hidden font-sans">
      
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <SEOHead 
        title="Sign In to Outtricks Workspace"
        description="Sign in to access your Outtricks unified outbound workspace, campaigns, and lead database."
        canonical="https://outtricks.com/login"
        noindex={true}
      />

      <div className="max-w-md w-full bg-white dark:bg-[#0b101f] rounded-3xl p-7 sm:p-9 border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6 animate-in fade-in duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-950 dark:text-white tracking-tight">Outtricks</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to your revenue operating workspace
          </p>
        </div>

        {/* Security / Validation Error Banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Password Reset Notice */}
        {resetSent && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
            ✓ Password reset instructions sent to <strong>{email}</strong>.
          </div>
        )}

        {/* =====================================================================
            STACKED SOCIAL AUTHENTICATION OPTIONS (ALL 3 FULL WIDTH)
            ===================================================================== */}
        <div className="space-y-2.5">
          
          {/* 1. Google Workspace */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('Google')}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-white/[0.09] hover:bg-slate-50 dark:hover:bg-[#222222] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs hover:border-blue-500/40 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          {/* 2. Microsoft */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('Microsoft')}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-white/[0.09] hover:bg-slate-50 dark:hover:bg-[#222222] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs hover:border-blue-500/40 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
              <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
            <span>Continue with Microsoft</span>
          </button>

          {/* 3. Apple */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('Apple')}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-white/[0.09] hover:bg-slate-50 dark:hover:bg-[#222222] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs hover:border-blue-500/40 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-slate-900 dark:text-white" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.42-6.19-9.88-10.97-20.9-14.34-33.07-3.37-12.18-5.06-23.75-5.06-34.72 0-15.65 4.02-28.76 12.06-39.33 8.04-10.57 18.06-16.03 30.06-16.38 5.68 0 12.11 1.63 19.3 4.9 7.18 3.27 11.96 4.9 14.34 4.9 2.01 0 6.69-1.57 14.03-4.71 7.34-3.14 13.68-4.48 19.03-4.02 14.03.67 25.13 5.48 33.32 14.42-12.44 7.57-18.52 17.84-18.26 30.82.26 10.15 4.15 18.77 11.66 25.86 7.51 7.09 16.59 11.05 27.23 11.89-2.22 6.74-4.89 13.56-8.01 20.46zM119.22 31.02c0-7.39 2.68-14.36 8.04-20.9 5.36-6.54 11.96-10.12 19.8-10.74.22 1.34.33 2.57.33 3.69 0 7.39-2.73 14.47-8.19 21.25-5.46 6.77-12.06 10.51-19.8 11.22-.11-1.45-.18-2.96-.18-4.52z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>

        </div>

        {/* =====================================================================
            DIVIDER: OR CONTINUE WITH EMAIL
            ===================================================================== */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200/80 dark:border-[#2A2A2A] w-full" />
          <span className="bg-white dark:bg-[#0b101f] px-3 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase whitespace-nowrap">
            OR CONTINUE WITH EMAIL
          </span>
        </div>

        {/* =====================================================================
            EMAIL LOGIN FORM
            ===================================================================== */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Email</label>
            <input 
              type="email" 
              required 
              maxLength={120}
              placeholder="alex@company.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                maxLength={100}
                placeholder="••••••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none pr-10 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* PRIMARY CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{authProvider ? `Connecting with ${authProvider}...` : 'Signing In...'}</span>
              </>
            ) : (
              <>
                <span>Sign In to Outtricks</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* BOTTOM CTA & SECURITY */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#202020] text-center">
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SOC2 Type II Certified • 256-Bit TLS Encryption</span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Start 7-day free trial
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
