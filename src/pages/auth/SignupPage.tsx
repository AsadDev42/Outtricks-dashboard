import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Eye, EyeOff, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validatePassword } from '../../lib/security';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signup, loginWithOAuth } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await signup(formData.name, formData.email, formData.company, formData.password);
    setLoading(false);

    if (res.success) {
      success('Workspace created! Welcome to Outtricks.', 'Account Created');
      navigate('/demo');
    } else {
      setErrorMessage(res.error || 'Failed to create account.');
      error(res.error || 'Signup failed', 'Error');
    }
  };

  const handleOAuthSignup = async (provider: 'Google' | 'Microsoft' | 'Apple') => {
    setErrorMessage(null);
    setAuthProvider(provider);
    setLoading(true);

    const res = await loginWithOAuth(provider);
    setLoading(false);
    setAuthProvider(null);

    if (res.success) {
      success(`Successfully registered via ${provider}.`, 'Welcome to Outtricks');
      navigate('/demo');
    } else {
      setErrorMessage(res.error || `Failed to sign up with ${provider}.`);
    }
  };

  const passCheck = formData.password ? validatePassword(formData.password) : null;

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 sm:py-28 relative overflow-hidden font-sans">
      
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-blue-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <SEOHead 
        title="Start 7-Day Free Outtricks Trial | AI Revenue OS"
        description="Create your Outtricks workspace. Get instant access to 480M+ verified B2B leads, multi-inbox cold email, and Voice AI SDR."
        canonical="https://outtricks.com/signup"
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
            Start Your 7-Day Free Trial
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No credit card required • Full platform access
          </p>
        </div>

        {/* Security / Validation Error Banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* OAuth Social Signup */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleOAuthSignup('Google')}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-white/[0.09] hover:bg-slate-50 dark:hover:bg-[#222222] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs hover:border-blue-500/40 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign Up with Google Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthSignup('Microsoft')}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full bg-white dark:bg-[#1C1C1C] border border-slate-200/90 dark:border-white/[0.09] hover:bg-slate-50 dark:hover:bg-[#222222] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs hover:border-blue-500/40 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
              <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
            <span>Sign Up with Microsoft</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200/80 dark:border-[#2A2A2A] w-full" />
          <span className="bg-white dark:bg-[#0b101f] px-3 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase whitespace-nowrap">
            OR WITH CORPORATE EMAIL
          </span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name</label>
              <input 
                type="text" 
                required 
                placeholder="Sarah Connor"
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company</label>
              <input 
                type="text" 
                required 
                placeholder="CloudScale Inc"
                value={formData.company} 
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Email</label>
            <input 
              type="email" 
              required 
              placeholder="sarah@cloudscale.ai"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="Create a strong password"
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            {passCheck && formData.password && (
              <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                <div className={`h-1.5 flex-1 rounded-full ${passCheck.score >= 2 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-slate-400 font-mono text-[10px]">
                  {passCheck.score >= 2 ? 'Strong' : 'Moderate'}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{authProvider ? `Authenticating with ${authProvider}...` : 'Creating Workspace...'}</span>
              </>
            ) : (
              <>
                <span>Launch 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-[#202020] text-center">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            By registering, you agree to the{' '}
            <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms
            </Link>{' '}
            &{' '}
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Sign in here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
