import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePassword, 
  authRateLimiter, 
  initializeOAuthHandshake, 
  sessionManager,
  UserSession 
} from '../lib/security';

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
export type WorkspacePlan = 'starter' | 'pro' | 'scale' | 'enterprise';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  company?: string;
  phone?: string;
  timezone: string;
  language: string;
  themePreference: 'light' | 'dark' | 'system';
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  securityAlerts: boolean;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: UserRole;
  plan: WorkspacePlan;
  credits: number;
  maxCredits: number;
  connectedInboxes: number;
  maxInboxes: number;
  verifiedLeadsCount: number;
  membersCount: number;
  customDomain?: string;
  logo?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  userId?: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActive: string;
}

export interface WorkspaceInvite {
  id: string;
  email: string;
  role: UserRole;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'canceled';
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  teamMembers: TeamMember[];
  invites: WorkspaceInvite[];
  activeSessions: ActiveSession[];
  isOnboardingOpen: boolean;
  
  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: 'Google' | 'Microsoft' | 'Apple') => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, company: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  
  // Profile & Settings actions
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  toggleTwoFactor: () => Promise<boolean>;
  terminateSession: (sessionId: string) => void;
  terminateAllOtherSessions: () => void;
  
  // Workspace actions
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (name: string, plan?: WorkspacePlan) => Promise<{ success: boolean; workspace?: Workspace; error?: string }>;
  updateWorkspace: (workspaceId: string, data: Partial<Workspace>) => Promise<{ success: boolean; error?: string }>;
  inviteMember: (email: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  updateMemberRole: (memberId: string, newRole: UserRole) => Promise<{ success: boolean; error?: string }>;
  removeMember: (memberId: string) => Promise<{ success: boolean; error?: string }>;
  cancelInvite: (inviteId: string) => Promise<{ success: boolean; error?: string }>;
  acceptInvite: (inviteId: string) => Promise<{ success: boolean; error?: string }>;
  
  // Onboarding
  openOnboarding: () => void;
  closeOnboarding: () => void;
  completeOnboarding: (data: { workspaceName: string; targetRole: string; industry: string }) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_sarah_jenkins',
  name: 'Sarah Jenkins',
  email: 'sarah@cloudscale.ai',
  title: 'VP of Growth & Revenue',
  company: 'CloudScale AI',
  phone: '+1 (415) 892-4910',
  timezone: 'America/Los_Angeles (PST)',
  language: 'English (US)',
  themePreference: 'system',
  twoFactorEnabled: true,
  emailNotifications: true,
  securityAlerts: true,
  createdAt: '2026-01-15T08:00:00.000Z',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

const DEFAULT_WORKSPACES: Workspace[] = [
  {
    id: 'ws_cloudscale',
    name: 'CloudScale AI',
    slug: 'cloudscale-ai',
    role: 'owner',
    plan: 'scale',
    credits: 42850,
    maxCredits: 50000,
    connectedInboxes: 24,
    maxInboxes: 50,
    verifiedLeadsCount: 14280,
    membersCount: 8,
    customDomain: 'outbound.cloudscale.ai',
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'ws_growth_agency',
    name: 'SaaS Growth Agency',
    slug: 'saas-growth-agency',
    role: 'admin',
    plan: 'scale',
    credits: 28400,
    maxCredits: 35000,
    connectedInboxes: 16,
    maxInboxes: 30,
    verifiedLeadsCount: 9420,
    membersCount: 5,
    customDomain: 'send.growthagency.io',
    createdAt: '2026-02-01T08:00:00.000Z',
  },
  {
    id: 'ws_hypergrowth',
    name: 'HyperGrowth Labs',
    slug: 'hypergrowth-labs',
    role: 'member',
    plan: 'pro',
    credits: 8750,
    maxCredits: 10000,
    connectedInboxes: 10,
    maxInboxes: 10,
    verifiedLeadsCount: 3100,
    membersCount: 3,
    createdAt: '2026-03-10T08:00:00.000Z',
  }
];

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 'mem_1',
    userId: 'usr_sarah_jenkins',
    name: 'Sarah Jenkins',
    email: 'sarah@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'owner',
    status: 'active',
    joinedAt: '2026-01-15',
    lastActive: 'Just now'
  },
  {
    id: 'mem_2',
    userId: 'usr_marcus_vance',
    name: 'Marcus Vance',
    email: 'marcus@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    status: 'active',
    joinedAt: '2026-01-20',
    lastActive: '12m ago'
  },
  {
    id: 'mem_3',
    userId: 'usr_elena_rostova',
    name: 'Elena Rostova',
    email: 'elena@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    status: 'active',
    joinedAt: '2026-02-05',
    lastActive: '1h ago'
  },
  {
    id: 'mem_4',
    userId: 'usr_david_chen',
    name: 'David Chen',
    email: 'david@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'member',
    status: 'active',
    joinedAt: '2026-02-18',
    lastActive: '3h ago'
  },
  {
    id: 'mem_5',
    userId: 'usr_amira_patel',
    name: 'Amira Patel',
    email: 'amira@cloudscale.ai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'viewer',
    status: 'active',
    joinedAt: '2026-03-01',
    lastActive: 'Yesterday'
  }
];

const DEFAULT_INVITES: WorkspaceInvite[] = [
  {
    id: 'inv_1',
    email: 'alex.taylor@growthagency.io',
    role: 'member',
    invitedBy: 'Sarah Jenkins',
    invitedAt: '2026-08-20',
    expiresAt: '2026-09-20',
    status: 'pending'
  },
  {
    id: 'inv_2',
    email: 'carlos.mendez@paypulse.io',
    role: 'viewer',
    invitedBy: 'Marcus Vance',
    invitedAt: '2026-08-22',
    expiresAt: '2026-09-22',
    status: 'pending'
  }
];

const DEFAULT_SESSIONS: ActiveSession[] = [
  {
    id: 'sess_1',
    device: 'MacBook Pro 16" (macOS Sequoia)',
    browser: 'Chrome 128.0',
    location: 'San Francisco, CA, USA',
    ipAddress: '192.0.2.14',
    lastActive: 'Active now',
    isCurrent: true
  },
  {
    id: 'sess_2',
    device: 'iPhone 15 Pro (iOS 18)',
    browser: 'Safari Mobile',
    location: 'San Francisco, CA, USA',
    ipAddress: '192.0.2.88',
    lastActive: '2h ago',
    isCurrent: false
  },
  {
    id: 'sess_3',
    device: 'Windows 11 Workstation',
    browser: 'Edge 128.0',
    location: 'Austin, TX, USA',
    ipAddress: '198.51.100.42',
    lastActive: 'Yesterday',
    isCurrent: false
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('outtricks_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_USER;
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const saved = localStorage.getItem('outtricks_workspaces');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_WORKSPACES;
  });

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>(() => {
    const saved = localStorage.getItem('outtricks_active_workspace');
    return saved || DEFAULT_WORKSPACES[0].id;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_MEMBERS);
  const [invites, setInvites] = useState<WorkspaceInvite[]>(DEFAULT_INVITES);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(DEFAULT_SESSIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0] || null;

  // Persist user and workspace changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('outtricks_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('outtricks_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('outtricks_workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    if (currentWorkspaceId) {
      localStorage.setItem('outtricks_active_workspace', currentWorkspaceId);
    }
  }, [currentWorkspaceId]);

  // Login action
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const cleanEmail = sanitizeInput(email);

    const rateCheck = authRateLimiter.checkLimit('login_attempt');
    if (!rateCheck.allowed) {
      setIsLoading(false);
      return { success: false, error: `Too many login attempts. Please wait ${rateCheck.retryAfterSeconds || 60} seconds.` };
    }
    authRateLimiter.recordAttempt('login_attempt');

    if (!validateEmail(cleanEmail)) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid work email address.' };
    }

    if (!password || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Please enter your password (minimum 6 characters).' };
    }

    // Simulated secure API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    authRateLimiter.reset('login_attempt');
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    };

    setUser(loggedUser);
    sessionManager.setSession({
      userId: loggedUser.id,
      email: loggedUser.email,
      workspaceId: currentWorkspace?.id || 'ws_cloudscale',
      role: 'admin',
    });

    setIsLoading(false);
    return { success: true };
  }, [currentWorkspace]);

  // OAuth Login action
  const loginWithOAuth = useCallback(async (provider: 'Google' | 'Microsoft' | 'Apple') => {
    setIsLoading(true);
    initializeOAuthHandshake(provider);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email: `user@${provider.toLowerCase().replace(' ', '')}.com`,
      name: `Demo ${provider} User`,
    };

    setUser(loggedUser);
    sessionManager.setSession({
      userId: loggedUser.id,
      email: loggedUser.email,
      workspaceId: currentWorkspace?.id || 'ws_cloudscale',
      role: 'admin',
    });

    setIsLoading(false);
    return { success: true };
  }, [currentWorkspace]);

  // Signup action
  const signup = useCallback(async (name: string, email: string, company: string, password: string) => {
    setIsLoading(true);
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanCompany = sanitizeInput(company);

    if (!cleanName || cleanName.length < 2) {
      setIsLoading(false);
      return { success: false, error: 'Please enter your full name.' };
    }

    if (!validateEmail(cleanEmail)) {
      setIsLoading(false);
      return { success: false, error: 'Please provide a valid corporate work email.' };
    }

    if (!cleanCompany || cleanCompany.length < 2) {
      setIsLoading(false);
      return { success: false, error: 'Please provide your company name.' };
    }

    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      setIsLoading(false);
      return { success: false, error: passCheck.feedback[0] || 'Password does not meet complexity requirements.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 700));

    const newWorkspace: Workspace = {
      id: 'ws_' + Math.random().toString(36).substring(2, 9),
      name: cleanCompany,
      slug: cleanCompany.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      role: 'owner',
      plan: 'scale',
      credits: 10000,
      maxCredits: 10000,
      connectedInboxes: 4,
      maxInboxes: 10,
      verifiedLeadsCount: 500,
      membersCount: 1,
      createdAt: new Date().toISOString(),
    };

    const newUser: UserProfile = {
      ...DEFAULT_USER,
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
    };

    setWorkspaces((prev) => [newWorkspace, ...prev]);
    setCurrentWorkspaceId(newWorkspace.id);
    setUser(newUser);

    sessionManager.setSession({
      userId: newUser.id,
      email: newUser.email,
      workspaceId: newWorkspace.id,
      role: 'owner',
    });

    setIsLoading(false);
    setIsOnboardingOpen(true);
    return { success: true };
  }, []);

  // Logout action
  const logout = useCallback(() => {
    setUser(null);
    sessionManager.clearSession();
    localStorage.removeItem('outtricks_user');
  }, []);

  // Password reset action
  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    const cleanEmail = sanitizeInput(email);

    if (!validateEmail(cleanEmail)) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid email address.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    return { success: true };
  }, []);

  // Confirm password reset
  const confirmPasswordReset = useCallback(async (token: string, newPassword: string) => {
    setIsLoading(true);
    const passCheck = validatePassword(newPassword);
    if (!passCheck.isValid) {
      setIsLoading(false);
      return { success: false, error: passCheck.feedback[0] || 'Password does not meet complexity requirements.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    return { success: true };
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setUser((prev) => (prev ? { ...prev, ...data } : null));
    setIsLoading(false);
    return { success: true };
  }, []);

  // Update password
  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    if (!currentPassword) {
      setIsLoading(false);
      return { success: false, error: 'Current password is required.' };
    }

    const passCheck = validatePassword(newPassword);
    if (!passCheck.isValid) {
      setIsLoading(false);
      return { success: false, error: passCheck.feedback[0] || 'New password does not meet security requirements.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    return { success: true };
  }, []);

  // 2FA Toggle
  const toggleTwoFactor = useCallback(async () => {
    if (!user) return false;
    const newState = !user.twoFactorEnabled;
    setUser((prev) => (prev ? { ...prev, twoFactorEnabled: newState } : null));
    return newState;
  }, [user]);

  // Terminate session
  const terminateSession = useCallback((sessionId: string) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }, []);

  const terminateAllOtherSessions = useCallback(() => {
    setActiveSessions((prev) => prev.filter((s) => s.isCurrent));
  }, []);

  // Workspace actions
  const switchWorkspace = useCallback((workspaceId: string) => {
    const target = workspaces.find((w) => w.id === workspaceId);
    if (target) {
      setCurrentWorkspaceId(target.id);
    }
  }, [workspaces]);

  const createWorkspace = useCallback(async (name: string, plan: WorkspacePlan = 'pro') => {
    setIsLoading(true);
    const cleanName = sanitizeInput(name);

    if (!cleanName || cleanName.length < 2) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid workspace name.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newWs: Workspace = {
      id: 'ws_' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      slug: cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      role: 'owner',
      plan,
      credits: 10000,
      maxCredits: 10000,
      connectedInboxes: 2,
      maxInboxes: 10,
      verifiedLeadsCount: 0,
      membersCount: 1,
      createdAt: new Date().toISOString(),
    };

    setWorkspaces((prev) => [newWs, ...prev]);
    setCurrentWorkspaceId(newWs.id);
    setIsLoading(false);
    return { success: true, workspace: newWs };
  }, []);

  const updateWorkspace = useCallback(async (workspaceId: string, data: Partial<Workspace>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setWorkspaces((prev) =>
      prev.map((w) => (w.id === workspaceId ? { ...w, ...data } : w))
    );
    setIsLoading(false);
    return { success: true };
  }, []);

  // Team Member & Invite actions
  const inviteMember = useCallback(async (email: string, role: UserRole) => {
    setIsLoading(true);
    const cleanEmail = sanitizeInput(email);

    if (!validateEmail(cleanEmail)) {
      setIsLoading(false);
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const alreadyMember = teamMembers.some((m) => m.email.toLowerCase() === cleanEmail.toLowerCase());
    if (alreadyMember) {
      setIsLoading(false);
      return { success: false, error: 'This user is already a member of this workspace.' };
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    const newInvite: WorkspaceInvite = {
      id: 'inv_' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail,
      role,
      invitedBy: user?.name || 'Workspace Admin',
      invitedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
    };

    setInvites((prev) => [newInvite, ...prev]);
    setIsLoading(false);
    return { success: true };
  }, [teamMembers, user]);

  const updateMemberRole = useCallback(async (memberId: string, newRole: UserRole) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    setIsLoading(false);
    return { success: true };
  }, []);

  const removeMember = useCallback(async (memberId: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
    setIsLoading(false);
    return { success: true };
  }, []);

  const cancelInvite = useCallback(async (inviteId: string) => {
    setInvites((prev) => prev.filter((i) => i.id !== inviteId));
    return { success: true };
  }, []);

  const acceptInvite = useCallback(async (inviteId: string) => {
    const inv = invites.find((i) => i.id === inviteId);
    if (!inv) return { success: false, error: 'Invitation not found' };

    const newMember: TeamMember = {
      id: 'mem_' + Math.random().toString(36).substring(2, 9),
      name: inv.email.split('@')[0],
      email: inv.email,
      role: inv.role,
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
    };

    setTeamMembers((prev) => [...prev, newMember]);
    setInvites((prev) => prev.filter((i) => i.id !== inviteId));
    return { success: true };
  }, [invites]);

  // Onboarding
  const openOnboarding = useCallback(() => setIsOnboardingOpen(true), []);
  const closeOnboarding = useCallback(() => setIsOnboardingOpen(false), []);

  const completeOnboarding = useCallback((data: { workspaceName: string; targetRole: string; industry: string }) => {
    if (data.workspaceName && currentWorkspace) {
      updateWorkspace(currentWorkspace.id, { name: data.workspaceName });
    }
    setIsOnboardingOpen(false);
  }, [currentWorkspace, updateWorkspace]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        currentWorkspace,
        workspaces,
        teamMembers,
        invites,
        activeSessions,
        isOnboardingOpen,
        login,
        loginWithOAuth,
        signup,
        logout,
        resetPassword,
        confirmPasswordReset,
        updateProfile,
        updatePassword,
        toggleTwoFactor,
        terminateSession,
        terminateAllOtherSessions,
        switchWorkspace,
        createWorkspace,
        updateWorkspace,
        inviteMember,
        updateMemberRole,
        removeMember,
        cancelInvite,
        acceptInvite,
        openOnboarding,
        closeOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
