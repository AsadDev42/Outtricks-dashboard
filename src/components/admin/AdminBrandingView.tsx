import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Palette, 
  Globe, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sliders, 
  Building2, 
  User, 
  Sparkles, 
  MousePointer, 
  Type, 
  Layout, 
  Layers, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Mail, 
  Eye, 
  RefreshCw, 
  Save, 
  Copy, 
  Download, 
  Upload, 
  Check, 
  X, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Terminal,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminTeam, AdminPlan } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { useCursor, CursorStyleId } from '../../context/CursorContext';
import { useAppearance } from '../../context/ThemeContext';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

export interface WorkspaceBrandingConfig {
  workspaceId: string;
  workspaceName: string;
  
  // 2. Brand Identity
  brandName: string;
  displayName: string;
  tagline: string;
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  website: string;
  legalCompanyName: string;
  primaryLogoUrl: string;
  darkModeLogoUrl: string;
  lightModeLogoUrl: string;
  faviconUrl: string;
  browserTitle: string;

  // 3. Color System
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
  mainBackgroundColor: string;
  sidebarBackgroundColor: string;
  cardBackgroundColor: string;
  surfaceBackgroundColor: string;
  inputBackgroundColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  mutedTextColor: string;
  borderColor: string;

  // 4. Gradients
  enableGradients: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: string;
  gradientIntensity: 'none' | 'subtle' | 'medium' | 'strong';

  // 5. Typography
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'SF Pro' | 'System Default' | 'Custom';
  fontSizeScale: 'small' | 'default' | 'large' | 'extra-large';
  fontWeight: 'regular' | 'medium' | 'semibold' | 'bold';
  headingStyle: 'compact' | 'standard' | 'large';

  // 6. UI Shape & Geometry
  cornerRadius: 'sharp' | 'subtle' | 'rounded' | 'extra-rounded';
  buttonRadius: string;
  cardRadius: string;
  inputRadius: string;
  modalRadius: string;
  borderStyle: 'subtle' | 'standard' | 'strong' | 'none';
  shadowStyle: 'none' | 'subtle' | 'medium' | 'strong';
  spacingStyle: 'compact' | 'comfortable' | 'spacious';

  // 7. Sidebar Customization
  sidebarMode: 'dark' | 'light' | 'brand' | 'glass';
  sidebarWidth: 'compact' | 'default' | 'wide';
  sidebarLogo: 'primary' | 'custom';
  sidebarActiveState: 'solid' | 'glow' | 'border' | 'pill';
  sidebarHover: 'none' | 'subtle' | 'glow';

  // 8. Top Navigation
  topNavStyle: 'standard' | 'compact' | 'minimal' | 'floating';
  showSearchBar: boolean;
  searchBarStyle: 'rounded' | 'standard';
  topNavBackground: 'default' | 'transparent' | 'brand';

  // 9. Mouse Pointer & Cursor Effects (12 working styles)
  cursorStyle: 
    | 'default' 
    | 'precision' 
    | 'dot' 
    | 'ring' 
    | 'crosshair' 
    | 'minimal-glow' 
    | 'soft-glow' 
    | 'neon-glow' 
    | 'magnetic' 
    | 'trail' 
    | 'spotlight' 
    | 'pulse';
  cursorSize: 'small' | 'default' | 'large';
  cursorColor: string;
  cursorGlow: 'off' | 'subtle' | 'medium' | 'strong';
  cursorTrail: 'off' | 'short' | 'medium' | 'long';
  glowIntensity: 'low' | 'medium' | 'high';
  interactionEffects: {
    hoverGlow: boolean;
    buttonMagnetic: boolean;
    linkHighlight: boolean;
    clickRipple: boolean;
    cardHoverGlow: boolean;
  };

  // 10. Micro Interactions
  hoverEffect: 'none' | 'subtle' | 'lift' | 'glow' | 'scale';
  buttonHover: 'none' | 'darken' | 'lighten' | 'glow' | 'lift';
  cardHover: 'none' | 'lift' | 'border-highlight' | 'glow';
  clickAnimation: 'none' | 'subtle' | 'ripple';
  animationSpeed: 'instant' | 'fast' | 'standard' | 'smooth';

  // 11. Appearance
  appearanceMode: 'dark' | 'light' | 'system';
  enforceAppearance: 'force-dark' | 'force-light' | 'user-choice';

  // 12. Login / Authentication
  loginLogoUrl: string;
  loginBackgroundType: 'color' | 'gradient' | 'image';
  loginBackgroundColor: string;
  loginBackgroundGradient: string;
  loginBackgroundImage: string;
  loginHeading: string;
  loginDescription: string;

  // 13. Email Branding
  emailSenderName: string;
  emailSenderEmail: string;
  emailReplyTo: string;
  emailLogoUrl: string;
  emailFooterText: string;
  emailHeaderColor: string;
  emailButtonColor: string;

  // 14. Custom Domain
  customDomain: string;
  customLoginUrl: string;
  domainStatus: 'connected' | 'pending' | 'not-configured';

  // 15. White-Label Controls
  hideOuttricksBranding: boolean;
  customFooterBranding: string;
  customSupportLink: string;

  // Metadata
  version: number;
  lastUpdated: string;
  updatedBy: string;
}

const DEFAULT_WORKSPACE_BRANDING: Record<string, WorkspaceBrandingConfig> = {
  'team-1': {
    workspaceId: 'team-1',
    workspaceName: 'CloudScale Revenue Ops (Acme)',
    brandName: 'CloudScale AI',
    displayName: 'CloudScale Sales OS',
    tagline: 'Autonomous AI Revenue Operating System',
    companyName: 'CloudScale Technologies Inc.',
    supportEmail: 'support@cloudscale.ai',
    supportPhone: '+1 (800) 555-0199',
    website: 'https://cloudscale.ai',
    legalCompanyName: 'CloudScale Technologies Group Inc.',
    primaryLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    darkModeLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    lightModeLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
    browserTitle: 'CloudScale Sales OS',
    primaryColor: '#2563EB',
    secondaryColor: '#4F46E5',
    accentColor: '#10B981',
    successColor: '#10B981',
    warningColor: '#F59E0B',
    errorColor: '#EF4444',
    infoColor: '#3B82F6',
    mainBackgroundColor: '#080808',
    sidebarBackgroundColor: '#161616',
    cardBackgroundColor: '#161616',
    surfaceBackgroundColor: '#1C1C1C',
    inputBackgroundColor: '#1C1C1C',
    primaryTextColor: '#FFFFFF',
    secondaryTextColor: '#94A3B8',
    mutedTextColor: '#64748B',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    enableGradients: true,
    gradientStart: '#2563EB',
    gradientEnd: '#4F46E5',
    gradientDirection: 'to-r',
    gradientIntensity: 'subtle',
    fontFamily: 'Inter',
    fontSizeScale: 'default',
    fontWeight: 'semibold',
    headingStyle: 'standard',
    cornerRadius: 'rounded',
    buttonRadius: '12px',
    cardRadius: '24px',
    inputRadius: '12px',
    modalRadius: '24px',
    borderStyle: 'subtle',
    shadowStyle: 'subtle',
    spacingStyle: 'comfortable',
    sidebarMode: 'dark',
    sidebarWidth: 'default',
    sidebarLogo: 'primary',
    sidebarActiveState: 'glow',
    sidebarHover: 'glow',
    topNavStyle: 'standard',
    showSearchBar: true,
    searchBarStyle: 'rounded',
    topNavBackground: 'default',
    cursorStyle: 'neon-glow',
    cursorSize: 'default',
    cursorColor: '#2563EB',
    cursorGlow: 'medium',
    cursorTrail: 'short',
    glowIntensity: 'medium',
    interactionEffects: {
      hoverGlow: true,
      buttonMagnetic: true,
      linkHighlight: true,
      clickRipple: true,
      cardHoverGlow: true
    },
    hoverEffect: 'lift',
    buttonHover: 'glow',
    cardHover: 'glow',
    clickAnimation: 'subtle',
    animationSpeed: 'fast',
    appearanceMode: 'dark',
    enforceAppearance: 'user-choice',
    loginLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=180&q=80',
    loginBackgroundType: 'gradient',
    loginBackgroundColor: '#080808',
    loginBackgroundGradient: 'linear-gradient(135deg, #080808 0%, #161616 100%)',
    loginBackgroundImage: '',
    loginHeading: 'Welcome to CloudScale Revenue OS',
    loginDescription: 'Sign in to access your autonomous pipeline intelligence.',
    emailSenderName: 'CloudScale Team',
    emailSenderEmail: 'outreach@cloudscale.ai',
    emailReplyTo: 'support@cloudscale.ai',
    emailLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    emailFooterText: 'CloudScale Technologies Group • 100 Montgomery St, San Francisco, CA',
    emailHeaderColor: '#2563EB',
    emailButtonColor: '#2563EB',
    customDomain: 'app.cloudscale.ai',
    customLoginUrl: 'https://app.cloudscale.ai/login',
    domainStatus: 'connected',
    hideOuttricksBranding: true,
    customFooterBranding: 'Powered by CloudScale Revenue Engine',
    customSupportLink: 'https://cloudscale.ai/support',
    version: 4,
    lastUpdated: '2026-08-30 15:40 UTC',
    updatedBy: 'Sarah Jenkins (Super Admin)'
  },
  'team-2': {
    workspaceId: 'team-2',
    workspaceName: 'Apex Outbound Growth',
    brandName: 'Apex Outbound',
    displayName: 'Apex Pipeline Hub',
    tagline: 'High Velocity B2B Prospecting',
    companyName: 'Apex Ventures International',
    supportEmail: 'growth@apexventures.io',
    supportPhone: '+1 (888) 441-2090',
    website: 'https://apexventures.io',
    legalCompanyName: 'Apex Ventures Group LLC',
    primaryLogoUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=120&q=80',
    darkModeLogoUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=120&q=80',
    lightModeLogoUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=120&q=80',
    faviconUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=32&q=80',
    browserTitle: 'Apex Pipeline Hub',
    primaryColor: '#7C3AED',
    secondaryColor: '#EC4899',
    accentColor: '#8B5CF6',
    successColor: '#10B981',
    warningColor: '#F59E0B',
    errorColor: '#EF4444',
    infoColor: '#6366F1',
    mainBackgroundColor: '#080808',
    sidebarBackgroundColor: '#161616',
    cardBackgroundColor: '#161616',
    surfaceBackgroundColor: '#1C1C1C',
    inputBackgroundColor: '#1C1C1C',
    primaryTextColor: '#FFFFFF',
    secondaryTextColor: '#94A3B8',
    mutedTextColor: '#64748B',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    enableGradients: true,
    gradientStart: '#7C3AED',
    gradientEnd: '#EC4899',
    gradientDirection: 'to-r',
    gradientIntensity: 'medium',
    fontFamily: 'Plus Jakarta Sans',
    fontSizeScale: 'default',
    fontWeight: 'semibold',
    headingStyle: 'standard',
    cornerRadius: 'extra-rounded',
    buttonRadius: '14px',
    cardRadius: '28px',
    inputRadius: '14px',
    modalRadius: '28px',
    borderStyle: 'subtle',
    shadowStyle: 'medium',
    spacingStyle: 'comfortable',
    sidebarMode: 'dark',
    sidebarWidth: 'default',
    sidebarLogo: 'primary',
    sidebarActiveState: 'pill',
    sidebarHover: 'glow',
    topNavStyle: 'compact',
    showSearchBar: true,
    searchBarStyle: 'rounded',
    topNavBackground: 'default',
    cursorStyle: 'spotlight',
    cursorSize: 'default',
    cursorColor: '#7C3AED',
    cursorGlow: 'strong',
    cursorTrail: 'medium',
    glowIntensity: 'high',
    interactionEffects: {
      hoverGlow: true,
      buttonMagnetic: true,
      linkHighlight: true,
      clickRipple: true,
      cardHoverGlow: true
    },
    hoverEffect: 'glow',
    buttonHover: 'glow',
    cardHover: 'lift',
    clickAnimation: 'ripple',
    animationSpeed: 'fast',
    appearanceMode: 'dark',
    enforceAppearance: 'force-dark',
    loginLogoUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=180&q=80',
    loginBackgroundType: 'gradient',
    loginBackgroundColor: '#080808',
    loginBackgroundGradient: 'linear-gradient(135deg, #7C3AED 0%, #161616 100%)',
    loginBackgroundImage: '',
    loginHeading: 'Apex Outbound Command Center',
    loginDescription: 'Sign in to accelerate your enterprise sales pipeline.',
    emailSenderName: 'Alex from Apex',
    emailSenderEmail: 'alex.r@apexventures.io',
    emailReplyTo: 'growth@apexventures.io',
    emailLogoUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=120&q=80',
    emailFooterText: 'Apex Ventures Group • New York, NY',
    emailHeaderColor: '#7C3AED',
    emailButtonColor: '#7C3AED',
    customDomain: 'pipeline.apexventures.io',
    customLoginUrl: 'https://pipeline.apexventures.io/login',
    domainStatus: 'pending',
    hideOuttricksBranding: true,
    customFooterBranding: 'Apex Growth Engine',
    customSupportLink: 'https://apexventures.io/help',
    version: 2,
    lastUpdated: '2026-08-29 11:20 UTC',
    updatedBy: 'Alex Rivera (Team Admin)'
  },
  'team-3': {
    workspaceId: 'team-3',
    workspaceName: 'Solaris Sales',
    brandName: 'Solaris Dynamics',
    displayName: 'Solaris CRM',
    tagline: 'Next-Gen Solar Revenue Intelligence',
    companyName: 'Solaris Dynamics Corp.',
    supportEmail: 'support@solarisdynamics.com',
    supportPhone: '+1 (800) 901-7744',
    website: 'https://solarisdynamics.com',
    legalCompanyName: 'Solaris Dynamics Corporation',
    primaryLogoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    darkModeLogoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    lightModeLogoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    faviconUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=32&q=80',
    browserTitle: 'Solaris CRM',
    primaryColor: '#059669',
    secondaryColor: '#10B981',
    accentColor: '#34D399',
    successColor: '#10B981',
    warningColor: '#F59E0B',
    errorColor: '#EF4444',
    infoColor: '#3B82F6',
    mainBackgroundColor: '#080808',
    sidebarBackgroundColor: '#161616',
    cardBackgroundColor: '#161616',
    surfaceBackgroundColor: '#1C1C1C',
    inputBackgroundColor: '#1C1C1C',
    primaryTextColor: '#FFFFFF',
    secondaryTextColor: '#94A3B8',
    mutedTextColor: '#64748B',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    enableGradients: false,
    gradientStart: '#059669',
    gradientEnd: '#10B981',
    gradientDirection: 'to-r',
    gradientIntensity: 'subtle',
    fontFamily: 'Inter',
    fontSizeScale: 'default',
    fontWeight: 'medium',
    headingStyle: 'standard',
    cornerRadius: 'rounded',
    buttonRadius: '12px',
    cardRadius: '24px',
    inputRadius: '12px',
    modalRadius: '24px',
    borderStyle: 'subtle',
    shadowStyle: 'subtle',
    spacingStyle: 'comfortable',
    sidebarMode: 'dark',
    sidebarWidth: 'default',
    sidebarLogo: 'primary',
    sidebarActiveState: 'solid',
    sidebarHover: 'subtle',
    topNavStyle: 'standard',
    showSearchBar: true,
    searchBarStyle: 'rounded',
    topNavBackground: 'default',
    cursorStyle: 'dot',
    cursorSize: 'default',
    cursorColor: '#059669',
    cursorGlow: 'subtle',
    cursorTrail: 'off',
    glowIntensity: 'low',
    interactionEffects: {
      hoverGlow: false,
      buttonMagnetic: false,
      linkHighlight: true,
      clickRipple: true,
      cardHoverGlow: false
    },
    hoverEffect: 'subtle',
    buttonHover: 'lighten',
    cardHover: 'border-highlight',
    clickAnimation: 'subtle',
    animationSpeed: 'fast',
    appearanceMode: 'dark',
    enforceAppearance: 'user-choice',
    loginLogoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=180&q=80',
    loginBackgroundType: 'color',
    loginBackgroundColor: '#080808',
    loginBackgroundGradient: '',
    loginBackgroundImage: '',
    loginHeading: 'Solaris Sales Portal',
    loginDescription: 'Sign in to access solar deals and outreach pipelines.',
    emailSenderName: 'Solaris Support',
    emailSenderEmail: 'support@solarisdynamics.com',
    emailReplyTo: 'support@solarisdynamics.com',
    emailLogoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
    emailFooterText: 'Solaris Dynamics Corporation • Austin, TX',
    emailHeaderColor: '#059669',
    emailButtonColor: '#059669',
    customDomain: '',
    customLoginUrl: '',
    domainStatus: 'not-configured',
    hideOuttricksBranding: false,
    customFooterBranding: 'Powered by Outtricks AI',
    customSupportLink: '',
    version: 1,
    lastUpdated: '2026-08-20 09:00 UTC',
    updatedBy: 'Marcus Vance'
  }
};

export const AdminBrandingView: React.FC = () => {
  const { teams, plans, logAdminAction } = useAdmin();
  const { success, error, info } = useToast();

  // Storage Key
  const STORAGE_KEY = 'outtricks_workspace_brandings_v2';

  // Load Saved Workspace Brandings or fallback
  const [workspaceBrandings, setWorkspaceBrandings] = useState<Record<string, WorkspaceBrandingConfig>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved branding config', e);
    }
    return DEFAULT_WORKSPACE_BRANDING;
  });

  // Selected Workspace ID (Section 1)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('team-1');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | 'identity' 
    | 'colors' 
    | 'typography' 
    | 'navigation' 
    | 'cursor' 
    | 'interactions' 
    | 'auth_email' 
    | 'whitelabel' 
    | 'presets'
  >('identity');

  // Preview Mode
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const { 
    setStyle: setGlobalCursorStyle, 
    setGlowIntensity: setGlobalGlowIntensity, 
    setSize: setGlobalCursorSize, 
    setCustomColorHex: setGlobalCursorColor, 
    setEffectToggle: setGlobalCursorEffect 
  } = useCursor();
  const { setAccentColor: setGlobalAccentColor } = useAppearance();

  // Current Workspace Config
  const currentConfig = useMemo(() => {
    return workspaceBrandings[selectedWorkspaceId] || DEFAULT_WORKSPACE_BRANDING['team-1'];
  }, [workspaceBrandings, selectedWorkspaceId]);

  // Current Team Context
  const currentTeam = useMemo(() => {
    return teams.find(t => t.id === selectedWorkspaceId) || {
      id: selectedWorkspaceId,
      name: currentConfig.workspaceName,
      planId: 'plan-scale',
      planName: 'Scale Plan',
      bundleIds: ['bnd-email', 'bnd-leadgen'],
      membersCount: 8,
      status: 'active'
    };
  }, [teams, selectedWorkspaceId, currentConfig]);

  // Plan Entitlement Check (Section 15: Scale/Enterprise allows white-labeling)
  const isPlanAllowedWhiteLabel = useMemo(() => {
    const plan = plans.find(p => p.id === currentTeam.planId);
    return currentTeam.planId === 'plan-scale' || currentTeam.planId === 'plan-enterprise' || (plan && plan.monthlyPrice >= 799);
  }, [plans, currentTeam]);

  // Update Config Field Helper
  const updateConfigField = <K extends keyof WorkspaceBrandingConfig>(field: K, value: WorkspaceBrandingConfig[K]) => {
    setWorkspaceBrandings(prev => ({
      ...prev,
      [selectedWorkspaceId]: {
        ...prev[selectedWorkspaceId],
        [field]: value,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      }
    }));

    // Real-time synchronization with active global state
    if (field === 'cursorStyle') {
      setGlobalCursorStyle(value as any);
    } else if (field === 'cursorColor') {
      setGlobalCursorColor(value as string);
    } else if (field === 'cursorGlow') {
      setGlobalGlowIntensity(value === 'off' ? 'none' : (value as any));
    } else if (field === 'cursorSize') {
      setGlobalCursorSize(value === 'small' ? 'sm' : value === 'large' ? 'lg' : 'md');
    } else if (field === 'cursorTrail') {
      setGlobalCursorEffect('trailEffect', value !== 'off');
    } else if (field === 'primaryColor') {
      setGlobalAccentColor(value as string);
    }
  };

  // Save Changes
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaceBrandings));
      
      // Inject CSS Variables for the active workspace into document root (Section 20)
      document.documentElement.style.setProperty('--brand-primary', currentConfig.primaryColor);
      document.documentElement.style.setProperty('--brand-secondary', currentConfig.secondaryColor);
      document.documentElement.style.setProperty('--brand-accent', currentConfig.accentColor);
      document.documentElement.style.setProperty('--radius-button', currentConfig.buttonRadius);
      document.documentElement.style.setProperty('--radius-card', currentConfig.cardRadius);

      // Synchronize active cursor & accent
      setGlobalCursorStyle(currentConfig.cursorStyle as any);
      setGlobalCursorColor(currentConfig.cursorColor);
      setGlobalGlowIntensity(currentConfig.cursorGlow === 'off' ? 'none' : (currentConfig.cursorGlow as any));
      setGlobalCursorSize(currentConfig.cursorSize === 'small' ? 'sm' : currentConfig.cursorSize === 'large' ? 'lg' : 'md');
      setGlobalCursorEffect('trailEffect', currentConfig.cursorTrail !== 'off');
      setGlobalAccentColor(currentConfig.primaryColor);

      logAdminAction(
        'UPDATE_WORKSPACE_BRANDING',
        currentConfig.workspaceName,
        undefined,
        `Version ${currentConfig.version + 1}`
      );

      // Increment version
      updateConfigField('version', currentConfig.version + 1);

      success(`Branding changes saved for ${currentConfig.workspaceName}.`, 'Branding Saved');
    } catch (e) {
      error('Failed to persist branding configuration.');
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    const defaultVal = DEFAULT_WORKSPACE_BRANDING[selectedWorkspaceId] || DEFAULT_WORKSPACE_BRANDING['team-1'];
    setWorkspaceBrandings(prev => ({
      ...prev,
      [selectedWorkspaceId]: {
        ...defaultVal,
        workspaceId: selectedWorkspaceId,
        workspaceName: currentConfig.workspaceName
      }
    }));
    info(`Branding reset to initial workspace defaults.`, 'Defaults Restored');
  };

  // Apply Built-In Preset (Section 17)
  const applyPreset = (presetName: string) => {
    let presetOverrides: Partial<WorkspaceBrandingConfig> = {};
    if (presetName === 'Corporate Blue') {
      presetOverrides = {
        primaryColor: '#2563EB',
        secondaryColor: '#1D4ED8',
        accentColor: '#38BDF8',
        cursorStyle: 'neon-glow',
        cursorColor: '#2563EB',
        cornerRadius: 'rounded',
        buttonRadius: '12px',
        cardRadius: '24px'
      };
    } else if (presetName === 'Modern Violet') {
      presetOverrides = {
        primaryColor: '#7C3AED',
        secondaryColor: '#EC4899',
        accentColor: '#8B5CF6',
        cursorStyle: 'spotlight',
        cursorColor: '#7C3AED',
        cornerRadius: 'extra-rounded',
        buttonRadius: '14px',
        cardRadius: '28px'
      };
    } else if (presetName === 'Emerald Growth') {
      presetOverrides = {
        primaryColor: '#059669',
        secondaryColor: '#10B981',
        accentColor: '#34D399',
        cursorStyle: 'dot',
        cursorColor: '#059669',
        cornerRadius: 'rounded',
        buttonRadius: '12px',
        cardRadius: '24px'
      };
    } else if (presetName === 'Obsidian Cyber') {
      presetOverrides = {
        primaryColor: '#0EA5E9',
        secondaryColor: '#6366F1',
        accentColor: '#06B6D4',
        cursorStyle: 'pulse',
        cursorColor: '#0EA5E9',
        cornerRadius: 'sharp',
        buttonRadius: '6px',
        cardRadius: '16px'
      };
    }

    setWorkspaceBrandings(prev => ({
      ...prev,
      [selectedWorkspaceId]: {
        ...prev[selectedWorkspaceId],
        ...presetOverrides,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      }
    }));

    success(`Applied '${presetName}' preset to ${currentConfig.workspaceName}.`, 'Preset Applied');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Card & Workspace Selector (Section 1) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Workspace White-Label & Branding Center
              </h2>
              <Badge variant="blue" size="sm">v{currentConfig.version}.0</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Customize isolated brand identities, typography, custom themes, micro-interactions, and 12 lightweight pointer styles per workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
            >
              Live Preview
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetDefaults}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Defaults
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Workspace Selector Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">Select Workspace:</span>
            <select
              value={selectedWorkspaceId}
              onChange={(e) => setSelectedWorkspaceId(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="team-1">CloudScale Revenue Ops (Acme)</option>
              <option value="team-2">Apex Outbound Growth</option>
              <option value="team-3">Solaris Sales</option>
            </select>
          </div>

          {/* Workspace Telemetry Strip */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1C1C1C] font-mono text-[11px] text-slate-500">
              ID: {currentTeam.id}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-bold text-[11px]">
              Plan: {currentTeam.planName}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1C1C1C] font-mono text-[11px] text-slate-500">
              Members: {(currentTeam as any).membersCount || 8}
            </span>
            {isPlanAllowedWhiteLabel ? (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                <span>White-Label Entitled</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Enterprise White-Label Locked</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 dark:border-[#2A2A2A] text-xs font-bold">
        {[
          { id: 'identity', label: 'Brand Identity & Logos', icon: Building2 },
          { id: 'colors', label: 'Color System & Gradients', icon: Palette },
          { id: 'typography', label: 'Typography & Geometry', icon: Type },
          { id: 'navigation', label: 'Sidebar & Top Nav', icon: Layout },
          { id: 'cursor', label: 'Cursor & Pointer Effects', icon: MousePointer },
          { id: 'interactions', label: 'Micro-Interactions', icon: Sparkles },
          { id: 'auth_email', label: 'Login & Email Branding', icon: Mail },
          { id: 'whitelabel', label: 'White-Label & Domain', icon: Globe },
          { id: 'presets', label: 'Brand Presets & Audit', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1C1C1C]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: Brand Identity & Logos (Section 2) */}
      {activeTab === 'identity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Identity Fields */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Workspace Identity Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Brand Name</label>
                <input
                  type="text"
                  value={currentConfig.brandName}
                  onChange={(e) => updateConfigField('brandName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={currentConfig.displayName}
                  onChange={(e) => updateConfigField('displayName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">System Tagline</label>
                <input
                  type="text"
                  value={currentConfig.tagline}
                  onChange={(e) => updateConfigField('tagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Support Email</label>
                <input
                  type="email"
                  value={currentConfig.supportEmail}
                  onChange={(e) => updateConfigField('supportEmail', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Support Phone</label>
                <input
                  type="text"
                  value={currentConfig.supportPhone}
                  onChange={(e) => updateConfigField('supportPhone', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Website URL</label>
                <input
                  type="text"
                  value={currentConfig.website}
                  onChange={(e) => updateConfigField('website', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Legal Entity Name</label>
                <input
                  type="text"
                  value={currentConfig.legalCompanyName}
                  onChange={(e) => updateConfigField('legalCompanyName', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Logo & Favicon Assets */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>Workspace Brand Assets & Logos</span>
            </h3>

            <div className="space-y-3.5">
              {/* Primary Logo */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentConfig.primaryLogoUrl}
                    alt="Logo"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A]"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Primary Logo</div>
                    <div className="text-[10px] text-slate-400">PNG, SVG, WebP (256x256)</div>
                  </div>
                </div>
                <input
                  type="text"
                  value={currentConfig.primaryLogoUrl}
                  onChange={(e) => updateConfigField('primaryLogoUrl', e.target.value)}
                  placeholder="Logo URL"
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-[11px] text-slate-900 dark:text-white w-48 font-mono"
                />
              </div>

              {/* Dark Mode Logo */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentConfig.darkModeLogoUrl}
                    alt="Dark Logo"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-[#2A2A2A] bg-black"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Dark Mode Logo</div>
                    <div className="text-[10px] text-slate-400">High contrast for dark backgrounds</div>
                  </div>
                </div>
                <input
                  type="text"
                  value={currentConfig.darkModeLogoUrl}
                  onChange={(e) => updateConfigField('darkModeLogoUrl', e.target.value)}
                  placeholder="Dark Logo URL"
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-[11px] text-slate-900 dark:text-white w-48 font-mono"
                />
              </div>

              {/* Favicon & Browser Title (Section 16) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 dark:text-white">Browser Tab Title & Favicon</div>
                  <Badge variant="blue" size="sm">Browser Tab</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={currentConfig.browserTitle}
                    onChange={(e) => updateConfigField('browserTitle', e.target.value)}
                    placeholder="Browser Tab Title"
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={currentConfig.faviconUrl}
                    onChange={(e) => updateConfigField('faviconUrl', e.target.value)}
                    placeholder="Favicon URL"
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Color System & Gradients (Sections 3 & 4) */}
      {activeTab === 'colors' && (
        <div className="space-y-6 text-xs">
          {/* Brand Palette */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-500" />
                <span>Primary Brand & UI Accent Colors</span>
              </h3>
              <span className="text-slate-400 text-[11px]">Design tokens applied in real-time</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: 'Primary Brand', key: 'primaryColor', val: currentConfig.primaryColor },
                { label: 'Secondary', key: 'secondaryColor', val: currentConfig.secondaryColor },
                { label: 'Accent', key: 'accentColor', val: currentConfig.accentColor },
                { label: 'Success', key: 'successColor', val: currentConfig.successColor },
                { label: 'Warning', key: 'warningColor', val: currentConfig.warningColor },
                { label: 'Error', key: 'errorColor', val: currentConfig.errorColor },
                { label: 'Info', key: 'infoColor', val: currentConfig.infoColor },
              ].map((c) => (
                <div key={c.key} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2">
                  <div className="text-[10px] font-bold text-slate-500">{c.label}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={c.val}
                      onChange={(e) => updateConfigField(c.key as any, e.target.value)}
                      className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={c.val}
                      onChange={(e) => updateConfigField(c.key as any, e.target.value)}
                      className="w-full px-2 py-1 rounded-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[10px] uppercase font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradients System (Section 4) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Gradient Acceleration Engine</span>
                </h3>
                <p className="text-slate-400 text-[11px]">Subtle header, card, and hero button gradients</p>
              </div>

              <button
                type="button"
                onClick={() => updateConfigField('enableGradients', !currentConfig.enableGradients)}
                className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                  currentConfig.enableGradients ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-[#181818] text-slate-500'
                }`}
              >
                {currentConfig.enableGradients ? 'Gradients Enabled' : 'Gradients Off'}
              </button>
            </div>

            {currentConfig.enableGradients && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">Gradient Start Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentConfig.gradientStart}
                      onChange={(e) => updateConfigField('gradientStart', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer"
                    />
                    <span className="font-mono font-bold text-[11px]">{currentConfig.gradientStart}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">Gradient End Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentConfig.gradientEnd}
                      onChange={(e) => updateConfigField('gradientEnd', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer"
                    />
                    <span className="font-mono font-bold text-[11px]">{currentConfig.gradientEnd}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">Gradient Intensity</label>
                  <select
                    value={currentConfig.gradientIntensity}
                    onChange={(e) => updateConfigField('gradientIntensity', e.target.value as any)}
                    className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-bold text-xs"
                  >
                    <option value="none">None</option>
                    <option value="subtle">Subtle (Recommended)</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong Vivid</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Typography & Geometry (Sections 5 & 6) */}
      {activeTab === 'typography' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Typography */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-500" />
              <span>Typography & Font Family</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Font Family</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Inter', 'Plus Jakarta Sans', 'SF Pro', 'System Default'] as const).map((font) => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => updateConfigField('fontFamily', font)}
                      className={`p-3 rounded-xl border text-left font-bold ${
                        currentConfig.fontFamily === font
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Scale</label>
                  <select
                    value={currentConfig.fontSizeScale}
                    onChange={(e) => updateConfigField('fontSizeScale', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="small">Small (Dense)</option>
                    <option value="default">Default</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Heading Style</label>
                  <select
                    value={currentConfig.headingStyle}
                    onChange={(e) => updateConfigField('headingStyle', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="compact">Compact</option>
                    <option value="standard">Standard</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* UI Shape & Geometry (Section 6) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>UI Shape & Corner Geometry</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Corner Presets</label>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { id: 'sharp', label: 'Sharp', radius: '4px' },
                    { id: 'subtle', label: 'Subtle', radius: '8px' },
                    { id: 'rounded', label: 'Rounded', radius: '16px' },
                    { id: 'extra-rounded', label: 'Extra', radius: '28px' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        updateConfigField('cornerRadius', r.id as any);
                        updateConfigField('buttonRadius', r.radius);
                        updateConfigField('cardRadius', r.radius);
                      }}
                      className={`p-2.5 rounded-xl border font-bold text-xs ${
                        currentConfig.cornerRadius === r.id
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Shadow Elevation</label>
                  <select
                    value={currentConfig.shadowStyle}
                    onChange={(e) => updateConfigField('shadowStyle', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="none">None</option>
                    <option value="subtle">Subtle</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Layout Spacing</label>
                  <select
                    value={currentConfig.spacingStyle}
                    onChange={(e) => updateConfigField('spacingStyle', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="compact">Compact</option>
                    <option value="comfortable">Comfortable</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Sidebar & Top Nav (Sections 7 & 8) */}
      {activeTab === 'navigation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Sidebar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-500" />
              <span>Sidebar Navigation Customization</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Sidebar Style Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'dark', label: 'Dark Obsidian' },
                    { id: 'light', label: 'Clean Light' },
                    { id: 'brand', label: 'Brand Color Tint' },
                    { id: 'glass', label: 'Glassmorphism' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => updateConfigField('sidebarMode', m.id as any)}
                      className={`p-3 rounded-xl border text-left font-bold ${
                        currentConfig.sidebarMode === m.id
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Active Item State</label>
                  <select
                    value={currentConfig.sidebarActiveState}
                    onChange={(e) => updateConfigField('sidebarActiveState', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="solid">Solid Accent</option>
                    <option value="glow">Soft Glow</option>
                    <option value="border">Left Border Line</option>
                    <option value="pill">Pill Highlight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Sidebar Width</label>
                  <select
                    value={currentConfig.sidebarWidth}
                    onChange={(e) => updateConfigField('sidebarWidth', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="compact">Compact (220px)</option>
                    <option value="default">Default (260px)</option>
                    <option value="wide">Wide (300px)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Top Nav (Section 8) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-500" />
              <span>Top Navigation Bar Appearance</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Top Navigation Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'standard', label: 'Standard Header' },
                    { id: 'compact', label: 'Compact Header' },
                    { id: 'minimal', label: 'Minimal Header' },
                    { id: 'floating', label: 'Floating Island' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateConfigField('topNavStyle', s.id as any)}
                      className={`p-3 rounded-xl border text-left font-bold ${
                        currentConfig.topNavStyle === s.id
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Global Command Search Bar</div>
                  <div className="text-[10px] text-slate-400">Show omni-search input in the top header</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateConfigField('showSearchBar', !currentConfig.showSearchBar)}
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                    currentConfig.showSearchBar ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-[#181818] text-slate-600'
                  }`}
                >
                  {currentConfig.showSearchBar ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Mouse Pointer & Cursor Effects (Section 9 - 12 Working Cursor Styles) */}
      {activeTab === 'cursor' && (
        <div className="space-y-6 text-xs">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-emerald-500" />
                <span>12 Lightweight Cursor & Pointer Effects</span>
              </h3>
              <p className="text-slate-400 text-[11px]">
                High-performance hardware-accelerated pointer styles with zero lag and reduced-motion compliance.
              </p>
            </div>

            {/* 12 Cursor Styles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { id: 'default', label: '1. Platform Default', desc: 'Standard system pointer' },
                { id: 'precision', label: '2. Precision Cross', desc: 'Surgical crosshair precision' },
                { id: 'dot', label: '3. Dot Cursor', desc: 'Minimalist focal dot' },
                { id: 'ring', label: '4. Ring Cursor', desc: 'Smooth geometric target ring' },
                { id: 'crosshair', label: '5. Crosshair Modern', desc: 'Tactical target reticle' },
                { id: 'minimal-glow', label: '6. Minimal Glow', desc: 'Subtle ambient radial glow' },
                { id: 'soft-glow', label: '7. Soft Aura Glow', desc: 'Soft gradient aura' },
                { id: 'neon-glow', label: '8. Neon Cyber Glow', desc: 'High-contrast neon beacon' },
                { id: 'magnetic', label: '9. Magnetic Focus', desc: 'Snaps smoothly to buttons' },
                { id: 'trail', label: '10. Trail Comet', desc: 'Lightweight micro trail' },
                { id: 'spotlight', label: '11. Spotlight Ray', desc: 'Card illumination spotlight' },
                { id: 'pulse', label: '12. Pulse Beacon', desc: 'Rhythmic radar beacon pulse' },
              ].map((styleItem) => (
                <div
                  key={styleItem.id}
                  onClick={() => updateConfigField('cursorStyle', styleItem.id as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    currentConfig.cursorStyle === styleItem.id
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 font-bold'
                      : 'border-slate-200 dark:border-[#202020] hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{styleItem.label}</span>
                    {currentConfig.cursorStyle === styleItem.id && (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{styleItem.desc}</div>
                </div>
              ))}
            </div>

            {/* Cursor Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Cursor Size</label>
                <select
                  value={currentConfig.cursorSize}
                  onChange={(e) => updateConfigField('cursorSize', e.target.value as any)}
                  className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-[#161616] font-bold"
                >
                  <option value="small">Small</option>
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Glow Intensity</label>
                <select
                  value={currentConfig.cursorGlow}
                  onChange={(e) => updateConfigField('cursorGlow', e.target.value as any)}
                  className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-[#161616] font-bold"
                >
                  <option value="off">Off</option>
                  <option value="subtle">Subtle</option>
                  <option value="medium">Medium</option>
                  <option value="strong">Strong</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Trail Length</label>
                <select
                  value={currentConfig.cursorTrail}
                  onChange={(e) => updateConfigField('cursorTrail', e.target.value as any)}
                  className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-[#161616] font-bold"
                >
                  <option value="off">Off</option>
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Cursor Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.cursorColor}
                    onChange={(e) => updateConfigField('cursorColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer"
                  />
                  <span className="font-mono font-bold text-[11px]">{currentConfig.cursorColor}</span>
                </div>
              </div>
            </div>

            {/* Interactive Cursor Playground */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2">
              <div className="text-[10px] font-bold uppercase text-emerald-400 font-mono">Interactive Cursor Test Arena</div>
              <div className="flex items-center gap-3">
                <Button variant="primary" size="sm">Hover Magnetic Test</Button>
                <Button variant="outline" size="sm">Glow Trigger Area</Button>
                <span className="text-slate-400 text-xs">Move pointer across controls to verify responsive feedback.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Micro-Interactions & Appearance (Sections 10 & 11) */}
      {activeTab === 'interactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Micro Interactions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Micro-Interactions & Hover Physics</span>
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Button Hover</label>
                  <select
                    value={currentConfig.buttonHover}
                    onChange={(e) => updateConfigField('buttonHover', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="none">None</option>
                    <option value="glow">Glow Highlight</option>
                    <option value="lift">Lift Elevation</option>
                    <option value="darken">Darken</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Card Hover</label>
                  <select
                    value={currentConfig.cardHover}
                    onChange={(e) => updateConfigField('cardHover', e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                  >
                    <option value="none">None</option>
                    <option value="lift">Lift</option>
                    <option value="border-highlight">Border Highlight</option>
                    <option value="glow">Aura Glow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Animation Speed</label>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {(['instant', 'fast', 'standard', 'smooth'] as const).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => updateConfigField('animationSpeed', spd)}
                      className={`p-2.5 rounded-xl border font-bold capitalize text-xs ${
                        currentConfig.animationSpeed === spd
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Defaults (Section 11) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-500" />
              <span>Workspace Theme Mode Policy</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Default Appearance</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dark', label: 'Dark Mode' },
                    { id: 'light', label: 'Light Mode' },
                    { id: 'system', label: 'System Auto' }
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => updateConfigField('appearanceMode', app.id as any)}
                      className={`p-3 rounded-xl border text-center font-bold ${
                        currentConfig.appearanceMode === app.id
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-white/[0.04] text-blue-600'
                          : 'border-slate-200 dark:border-[#202020] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Theme Policy Enforcement</label>
                <select
                  value={currentConfig.enforceAppearance}
                  onChange={(e) => updateConfigField('enforceAppearance', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                >
                  <option value="user-choice">Allow User Choice (Recommended)</option>
                  <option value="force-dark">Force Dark Mode for all members</option>
                  <option value="force-light">Force Light Mode for all members</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Login & Email Branding (Sections 12 & 13) */}
      {activeTab === 'auth_email' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Login Branding */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Workspace Login & Auth Portal</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Login Heading</label>
                <input
                  type="text"
                  value={currentConfig.loginHeading}
                  onChange={(e) => updateConfigField('loginHeading', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Login Subtitle Description</label>
                <input
                  type="text"
                  value={currentConfig.loginDescription}
                  onChange={(e) => updateConfigField('loginDescription', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Login Logo URL</label>
                <input
                  type="text"
                  value={currentConfig.loginLogoUrl}
                  onChange={(e) => updateConfigField('loginLogoUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Email Branding (Section 13) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>Workspace Outbound Email Identity</span>
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Sender Name</label>
                  <input
                    type="text"
                    value={currentConfig.emailSenderName}
                    onChange={(e) => updateConfigField('emailSenderName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Sender Email</label>
                  <input
                    type="email"
                    value={currentConfig.emailSenderEmail}
                    onChange={(e) => updateConfigField('emailSenderEmail', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Email Footer Compliance Text</label>
                <input
                  type="text"
                  value={currentConfig.emailFooterText}
                  onChange={(e) => updateConfigField('emailFooterText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: White-Label & Custom Domain (Sections 14 & 15) */}
      {activeTab === 'whitelabel' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* White-Label Settings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Enterprise White-Label Controls</span>
              </h3>
              {isPlanAllowedWhiteLabel ? (
                <Badge variant="emerald" size="sm">Unlocked</Badge>
              ) : (
                <Badge variant="amber" size="sm">Scale Plan Required</Badge>
              )}
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Hide "Powered by Outtricks"</div>
                  <div className="text-[10px] text-slate-400">Completely remove Outtricks platform references</div>
                </div>
                <button
                  type="button"
                  disabled={!isPlanAllowedWhiteLabel}
                  onClick={() => updateConfigField('hideOuttricksBranding', !currentConfig.hideOuttricksBranding)}
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                    !isPlanAllowedWhiteLabel
                      ? 'bg-slate-200 dark:bg-[#181818] text-slate-400 cursor-not-allowed'
                      : currentConfig.hideOuttricksBranding
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 dark:bg-[#181818] text-slate-600'
                  }`}
                >
                  {currentConfig.hideOuttricksBranding ? 'Hidden' : 'Visible'}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Custom Footer Branding Text</label>
                <input
                  type="text"
                  disabled={!isPlanAllowedWhiteLabel}
                  value={currentConfig.customFooterBranding}
                  onChange={(e) => updateConfigField('customFooterBranding', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                />
              </div>
            </div>
          </div>

          {/* Custom Domain (Section 14) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Custom Domain & CNAME Mapping</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">Custom Workspace Hostname</label>
                <input
                  type="text"
                  value={currentConfig.customDomain}
                  onChange={(e) => updateConfigField('customDomain', e.target.value)}
                  placeholder="e.g. app.acme-corp.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs font-bold"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                <span className="text-slate-400">DNS Verification Status:</span>
                <span className={`font-mono font-bold text-xs ${
                  currentConfig.domainStatus === 'connected' ? 'text-emerald-500' : 'text-amber-500'
                }`}>
                  {currentConfig.domainStatus === 'connected' ? '✓ SSL Active & Connected' : 'Domain verification not configured.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: Presets & Activity Audit (Sections 17 & 22) */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Presets */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Enterprise Brand Presets</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Corporate Blue', color: '#2563EB', desc: 'Classic enterprise executive theme' },
                { name: 'Modern Violet', color: '#7C3AED', desc: 'Vibrant high-contrast SaaS palette' },
                { name: 'Emerald Growth', color: '#059669', desc: 'Clean revenue-focused palette' },
                { name: 'Obsidian Cyber', color: '#0EA5E9', desc: 'Dark stealth aesthetic with neon accents' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{p.desc}</div>
                  <Button variant="secondary" size="sm" onClick={() => applyPreset(p.name)} className="w-full text-[10px]">
                    Apply to Workspace
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Audit Log */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Branding Change Activity</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { user: currentConfig.updatedBy, action: 'Updated workspace design tokens & primary color', time: currentConfig.lastUpdated },
                { user: 'Sarah Jenkins (Super Admin)', action: 'Configured 12 cursor styles & pointer physics', time: '2026-08-30 12:20 UTC' },
                { user: 'System Migration', action: 'Initialized workspace branding container', time: '2026-08-01 08:00 UTC' }
              ].map((act, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{act.user}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{act.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. LIVE WORKSPACE PREVIEW MODAL / DRAWER (Section 18) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-[#080808] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Preview Toolbar */}
            <div className="p-4 bg-[#161616] border-b border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="font-extrabold text-white">Live Workspace Preview:</span>
                <span className="font-bold text-blue-400">{currentConfig.workspaceName}</span>
              </div>

              {/* Device Selector */}
              <div className="flex items-center gap-1 bg-[#1C1C1C] p-1 rounded-xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${
                    previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${
                    previewDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${
                    previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Simulation Canvas */}
            <div className="p-6 overflow-y-auto flex-1 flex justify-center bg-[#080808]">
              <div 
                className={`transition-all duration-300 rounded-3xl border border-white/[0.08] bg-[#161616] p-5 space-y-5 text-xs text-white shadow-2xl ${
                  previewDevice === 'desktop' ? 'w-full' : previewDevice === 'tablet' ? 'w-[720px]' : 'w-[380px]'
                }`}
                style={{
                  fontFamily: currentConfig.fontFamily === 'Inter' ? 'Inter, sans-serif' : currentConfig.fontFamily === 'Plus Jakarta Sans' ? 'Plus Jakarta Sans, sans-serif' : 'sans-serif'
                }}
              >
                {/* Simulated Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentConfig.primaryLogoUrl}
                      alt="Logo"
                      className="w-8 h-8 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-extrabold text-white text-sm">{currentConfig.displayName}</div>
                      <div className="text-[10px] text-slate-400">{currentConfig.tagline}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: currentConfig.primaryColor }}
                    >
                      Active Plan
                    </span>
                  </div>
                </div>

                {/* Simulated KPI Cards with Workspace Corner Radius & Primary Color */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    className="p-4 bg-[#1C1C1C] border border-white/[0.06] space-y-1"
                    style={{ borderRadius: currentConfig.cardRadius }}
                  >
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Total Pipeline ARR</div>
                    <div className="text-lg font-black" style={{ color: currentConfig.primaryColor }}>
                      $485,000
                    </div>
                  </div>
                  <div 
                    className="p-4 bg-[#1C1C1C] border border-white/[0.06] space-y-1"
                    style={{ borderRadius: currentConfig.cardRadius }}
                  >
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Active Contacts</div>
                    <div className="text-lg font-black text-white">
                      24,850
                    </div>
                  </div>
                  <div 
                    className="p-4 bg-[#1C1C1C] border border-white/[0.06] space-y-1"
                    style={{ borderRadius: currentConfig.cardRadius }}
                  >
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Conversion Rate</div>
                    <div className="text-lg font-black text-emerald-400">
                      28.4%
                    </div>
                  </div>
                </div>

                {/* Simulated Interactive Elements */}
                <div className="space-y-3">
                  <div className="font-bold text-slate-300">Simulated Action Controls</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      className="px-4 py-2 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                      style={{
                        backgroundColor: currentConfig.primaryColor,
                        borderRadius: currentConfig.buttonRadius
                      }}
                    >
                      Primary Action Button
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-white/[0.12] text-white font-bold text-xs hover:bg-white/[0.04]"
                      style={{
                        borderRadius: currentConfig.buttonRadius
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>

                {/* Simulated Footer */}
                <div className="pt-4 border-t border-white/[0.06] text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{currentConfig.customFooterBranding || 'Powered by Outtricks AI'}</span>
                  <span>{currentConfig.legalCompanyName}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
