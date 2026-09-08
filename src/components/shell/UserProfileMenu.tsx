import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { AccountSettingsModal } from './AccountSettingsModal';
import { WorkspaceSettingsModal } from './WorkspaceSettingsModal';
import { 
  User, 
  Settings, 
  Building2, 
  CreditCard, 
  Sun, 
  Moon, 
  LogOut, 
  HelpCircle, 
  ShieldCheck, 
  Key, 
  Sparkles,
  ExternalLink,
  ChevronDown 
} from 'lucide-react';

export interface UserProfileMenuProps {
  variant?: 'sidebar' | 'header';
  className?: string;
  isCollapsed?: boolean;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ 
  variant = 'sidebar',
  className = '',
  isCollapsed = true,
}) => {
  const { user, currentWorkspace, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { success } = useToast();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [workspaceSettingsOpen, setWorkspaceSettingsOpen] = useState(false);
  const [initialAccountTab, setInitialAccountTab] = useState('profile');

  if (!user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link
          to="/login"
          className="px-4 py-2 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-full text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/25 transition-all"
        >
          Free Trial
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    success('You have been securely signed out.', 'Logged Out');
    navigate('/login');
  };

  const openAccountTab = (tab: string) => {
    setInitialAccountTab(tab);
    setAccountSettingsOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {variant === 'sidebar' ? (
          isCollapsed ? (
            <Tooltip content={`${user.name} • ${user.title || 'VP of Growth & Revenue'}`} placement="right">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User profile menu"
                className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-white/20 hover:border-primary active:scale-95 transition-all shadow-xs relative cursor-pointer group flex items-center justify-center bg-slate-100 dark:bg-[#141414]"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#090909]" />
              </button>
            </Tooltip>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="User profile menu"
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-primary/40 transition-all cursor-pointer shadow-xs group text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl overflow-hidden relative shrink-0">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-[#090909]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-950 dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {user.title || user.email}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" />
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="User profile menu"
            className="h-10 flex items-center gap-2 px-2 rounded-2xl bg-white/80 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C] border border-slate-200/90 dark:border-[#242424] transition-all cursor-pointer shadow-xs group"
          >
            <Avatar src={user.avatar} name={user.name} size="sm" status="online" />
            <div className="text-left min-w-0 hidden md:block pr-1">
              <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate font-sans">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate font-sans">
                {user.title || user.email}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform shrink-0" />
          </button>
        )}

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[799]"
              onClick={() => setIsOpen(false)}
            />
            <div className={
              variant === 'sidebar'
                ? "absolute left-full bottom-0 ml-3 w-72 sm:w-80 p-2 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl shadow-2xl z-[800] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1.5 font-sans"
                : "absolute right-0 top-full mt-2 w-72 p-2 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl shadow-2xl z-[800] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1.5 font-sans"
            }>
              
              {/* User Card Header */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} name={user.name} size="sm" status="online" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold text-slate-950 dark:text-white truncate">
                        {user.name}
                      </span>
                      <Badge variant="primary" size="sm" dot>
                        Active
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.title || user.email}
                    </div>
                  </div>
                </div>

                {currentWorkspace && (
                  <div className="text-[10px] text-primary font-bold pt-1.5 border-t border-slate-200/50 dark:border-[#282828] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{currentWorkspace.name}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary capitalize shrink-0">
                      {currentWorkspace.role}
                    </span>
                  </div>
                )}
              </div>

              {/* Menu Actions */}
              <div className="space-y-0.5 pt-1">
                <button
                  type="button"
                  onClick={() => openAccountTab('profile')}
                  className="w-full flex items-center justify-start text-left gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="flex-1 text-left">Profile Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWorkspaceSettingsOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-start text-left gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="flex-1 text-left">Workspace & Team</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAccountTab('security')}
                  className="w-full flex items-center justify-start text-left gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="flex-1 text-left">Security & 2FA</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-left">Appearance</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 capitalize">
                    {theme}
                  </span>
                </button>

                <Link
                  to="/resources/help-center"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-start text-left gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="flex-1 text-left">Help & API Docs</span>
                </Link>
              </div>

              {/* Logout */}
              <div className="pt-1 border-t border-slate-100 dark:border-[#202020]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start text-left gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">Sign Out</span>
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      <AccountSettingsModal
        isOpen={accountSettingsOpen}
        onClose={() => setAccountSettingsOpen(false)}
        initialTab={initialAccountTab}
      />

      <WorkspaceSettingsModal
        isOpen={workspaceSettingsOpen}
        onClose={() => setWorkspaceSettingsOpen(false)}
      />
    </>
  );
};

