import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  User, 
  ShieldCheck, 
  Key, 
  Bell, 
  Monitor, 
  Smartphone, 
  Check, 
  AlertTriangle,
  Lock,
  Trash2
} from 'lucide-react';

export interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'profile',
}) => {
  const { 
    user, 
    updateProfile, 
    updatePassword, 
    toggleTwoFactor, 
    activeSessions, 
    terminateSession, 
    terminateAllOtherSessions 
  } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateProfile({ name, title, phone });
    setIsSaving(false);
    if (res.success) {
      success('Profile updated successfully!', 'Saved');
    } else {
      error(res.error || 'Failed to update profile', 'Error');
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      error('New passwords do not match.', 'Password Mismatch');
      return;
    }
    setIsSaving(true);
    const res = await updatePassword(currentPass, newPass);
    setIsSaving(false);
    if (res.success) {
      success('Your password has been changed.', 'Password Updated');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      error(res.error || 'Failed to change password', 'Error');
    }
  };

  const handleToggle2FA = async () => {
    const newState = await toggleTwoFactor();
    if (newState) {
      success('Two-factor authentication enabled.', 'Security Enhanced');
    } else {
      success('Two-factor authentication disabled.', 'Security Updated');
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security & 2FA', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'sessions', label: 'Active Sessions', icon: <Monitor className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Account Settings"
      description="Manage your personal profile, credentials, security protocols, and preferences."
      size="lg"
    >
      <div className="space-y-6 font-sans">
        
        {/* Navigation Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="segmented"
          size="sm"
        />

        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <Avatar src={user.avatar} name={user.name} size="lg" status="online" />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                  {user.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <Badge variant="blue" size="sm">
                    Verified Account
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VP of Revenue"
              />
              <Input
                label="Email Address"
                value={user.email}
                disabled
                helperText="Primary workspace email cannot be changed directly."
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        )}

        {/* TAB 2: SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            
            {/* 2FA Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Two-Factor Authentication (2FA)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protect your workspace and lead records with TOTP authenticator verification.
                </p>
              </div>
              <Switch
                checked={user.twoFactorEnabled}
                onChange={handleToggle2FA}
              />
            </div>

            {/* Password Change */}
            <form onSubmit={handleSavePassword} className="space-y-4 pt-2 border-t border-slate-100 dark:border-[#202020]">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Change Password
              </div>
              <Input
                type="password"
                label="Current Password"
                placeholder="••••••••••••"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="password"
                  label="New Password"
                  placeholder="••••••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  placeholder="••••••••••••"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end pt-1">
                <Button type="submit" variant="secondary" size="sm" isLoading={isSaving}>
                  Update Password
                </Button>
              </div>
            </form>

          </div>
        )}

        {/* TAB 3: ACTIVE SESSIONS */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Active Devices & Sessions ({activeSessions.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  terminateAllOtherSessions();
                  success('Logged out of all other devices.', 'Sessions Cleared');
                }}
              >
                Log Out All Other Devices
              </Button>
            </div>

            <div className="space-y-2">
              {activeSessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#181818] shadow-xs">
                      {sess.device.includes('iPhone') ? (
                        <Smartphone className="w-4 h-4 text-slate-500" />
                      ) : (
                        <Monitor className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{sess.device}</span>
                        {sess.isCurrent && (
                          <Badge variant="emerald" size="sm" dot>
                            Current Device
                          </Badge>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {sess.browser} • {sess.location} • {sess.ipAddress}
                      </div>
                    </div>
                  </div>

                  {!sess.isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        terminateSession(sess.id);
                        success('Session terminated.', 'Revoked');
                      }}
                      className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Email Outbound Alerts & Replies
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive instant alerts when prospects reply positively or book meetings.
                </p>
              </div>
              <Switch
                checked={user.emailNotifications}
                onChange={(val) => updateProfile({ emailNotifications: val })}
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Security & Suspicious Login Alerts
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Notify on new browser sign-ins or deliverability anomaly drops.
                </p>
              </div>
              <Switch
                checked={user.securityAlerts}
                onChange={(val) => updateProfile({ securityAlerts: val })}
              />
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
