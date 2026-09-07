import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  AlertTriangle, 
  Save, 
  CheckCircle2, 
  Trash2, 
  X, 
  Lock, 
  LogOut,
  History,
  Clock,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsAccountView: React.FC = () => {
  const { profileData } = useSettings();
  const { success, error, info } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Active Sessions
  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'Chrome on macOS (Sonoma)', location: 'San Francisco, US', ip: '192.168.1.104', lastActive: 'Current Session (Active)', isCurrent: true },
    { id: 'sess-2', device: 'Mobile Safari on iPhone 15 Pro', location: 'San Francisco, US', ip: '172.56.42.19', lastActive: '2 hours ago', isCurrent: false },
    { id: 'sess-3', device: 'Edge on Windows 11 Enterprise', location: 'New York, US', ip: '72.14.201.89', lastActive: 'Yesterday', isCurrent: false },
  ]);

  // Login History
  const loginHistory = [
    { time: 'Today at 09:14 AM', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / macOS', status: 'Success' },
    { time: 'Yesterday at 04:30 PM', ip: '172.56.42.19', location: 'San Francisco, US', device: 'Mobile Safari / iOS', status: 'Success' },
    { time: 'Aug 26, 2026 at 11:22 AM', ip: '72.14.201.89', location: 'New York, US', device: 'Edge / Windows 11', status: 'Success' },
    { time: 'Aug 22, 2026 at 02:15 AM', ip: '45.132.88.12', location: 'Frankfurt, DE', device: 'Unknown Browser', status: 'Blocked' },
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      error('Password must be at least 8 characters long.', 'Weak Password');
      return;
    }
    if (newPassword !== confirmPassword) {
      error('New passwords do not match.', 'Validation Error');
      return;
    }
    success('Account password updated securely.', 'Password Changed');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRevokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    info('Session terminated immediately.', 'Session Revoked');
  };

  const handleRevokeAllOther = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    success('All other remote device sessions revoked.', 'Sessions Cleared');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Account Security & Authentication Credentials
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Manage login credentials, Two-Factor Authentication (2FA), active hardware sessions, and account governance.
        </p>
      </div>

      {/* 2. Account Information Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Primary Login Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block">Primary Email Account</span>
            <strong className="text-slate-900 dark:text-white text-sm">{profileData.email}</strong>
            <span className="text-[10px] text-emerald-500 font-sans block">✓ Verified SSO & Password Login</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block">Security Tier & Status</span>
            <strong className="text-emerald-600 text-sm">Enterprise High-Assurance</strong>
            <span className="text-[10px] text-slate-400 font-sans block">SOC 2 Type II Encrypted Vault</span>
          </div>
        </div>
      </div>

      {/* 3. Password Change Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-500" />
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Update Password
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl text-xs">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password (min 8 characters)"
            type="password"
            placeholder="••••••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit" leftIcon={<Lock className="w-3.5 h-3.5" />}>
              Save New Password
            </Button>
          </div>
        </form>
      </div>

      {/* 4. Two-Factor Authentication (2FA) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Two-Factor Authentication (2FA / TOTP)
                </h3>
                <Badge variant={twoFactorEnabled ? 'emerald' : 'slate'} size="sm">
                  {twoFactorEnabled ? 'Active' : 'Disabled'}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Protect your account with Google Authenticator, 1Password, or YubiKey hardware tokens.
              </p>
            </div>
          </div>

          <Button
            variant={twoFactorEnabled ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => {
              const next = !twoFactorEnabled;
              setTwoFactorEnabled(next);
              success(next ? 'Two-Factor Authentication activated.' : '2FA disabled.', 'Security Status');
            }}
          >
            {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </Button>
        </div>
      </div>

      {/* 5. Active Hardware Sessions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Active Hardware & Device Sessions ({sessions.length})
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Devices currently authenticated and holding valid JWT session tokens.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRevokeAllOther}
            leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-500" />}
          >
            Sign Out All Other Devices
          </Button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] rounded-2xl border border-slate-200/80 dark:border-[#202020] overflow-hidden bg-slate-50/50 dark:bg-[#141414]/40">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {sess.device} {sess.isCurrent && <span className="text-[10px] text-emerald-500 font-mono font-bold">(Current Device)</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {sess.location} • IP: {sess.ip} • {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => handleRevokeSession(sess.id)}
                  className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer"
                >
                  Revoke Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recent Login Audit Trail */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
          Recent Login History
        </h3>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {loginHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="py-2.5 px-3">{item.time}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{item.ip}</td>
                  <td className="py-2.5 px-3 font-sans text-[11px] text-slate-600 dark:text-slate-400">{item.location}</td>
                  <td className="py-2.5 px-3 font-sans text-[11px] text-slate-600 dark:text-slate-400">{item.device}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge variant={item.status === 'Success' ? 'emerald' : 'rose'} size="sm">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider">
            Danger Zone
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <strong className="text-slate-900 dark:text-white block font-sans text-xs">Deactivate or Delete Account</strong>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Permanently delete your user credentials and disassociate from the workspace.
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Delete Account</h3>
              </div>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Type <strong className="text-rose-600 font-mono">DELETE</strong> to confirm permanent account removal.
            </p>

            <input
              type="text"
              placeholder="DELETE"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-rose-500"
            />

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={deleteConfirmText !== 'DELETE'}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  info('Account deletion request initiated.', 'Account Deactivated');
                }}
              >
                Permanently Delete
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
