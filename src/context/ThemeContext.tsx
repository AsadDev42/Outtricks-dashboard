import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ColorMode = 'dark' | 'light' | 'system';
export type InterfaceDensity = 'compact' | 'comfortable' | 'spacious';
export type InterfaceFontSize = 'sm' | 'default' | 'lg' | 'xl';
export type TypographyStack = 'inter' | 'plus-jakarta' | 'system' | 'sf-pro';
export type CornerRadiusStyle = 'sharp' | 'subtle' | 'rounded' | 'extra-rounded';
export type InterfaceContrast = 'standard' | 'high';
export type MotionMode = 'full' | 'reduced' | 'none';
export type SidebarDensity = 'compact' | 'default' | 'comfortable';
export type SidebarBehavior = 'expanded' | 'collapsed' | 'auto';
export type TabStyle = 'standard' | 'compact' | 'minimal';

export type DarkThemePresetId = 'soft-black' | 'pure-black' | 'charcoal' | 'graphite';

export interface DarkThemePreset {
  id: DarkThemePresetId;
  name: string;
  appBg: string;
  surfaceBg: string;
  cardBg: string;
  elevatedBg: string;
  hoverBg: string;
  inputBg: string;
  border: string;
}

export const DARK_THEME_PRESETS: DarkThemePreset[] = [
  {
    id: 'soft-black',
    name: 'Soft Black (Default)',
    appBg: '#080808',
    surfaceBg: '#0D0D0D',
    cardBg: '#161616',
    elevatedBg: '#1C1C1C',
    hoverBg: '#222222',
    inputBg: '#111111',
    border: '#2A2A2A'
  },
  {
    id: 'pure-black',
    name: 'Pure Black',
    appBg: '#050505',
    surfaceBg: '#0A0A0A',
    cardBg: '#111111',
    elevatedBg: '#181818',
    hoverBg: '#1F1F1F',
    inputBg: '#0E0E0E',
    border: '#242424'
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    appBg: '#0B0B0B',
    surfaceBg: '#121212',
    cardBg: '#191919',
    elevatedBg: '#222222',
    hoverBg: '#282828',
    inputBg: '#141414',
    border: '#2C2C2C'
  },
  {
    id: 'graphite',
    name: 'Graphite',
    appBg: '#101010',
    surfaceBg: '#171717',
    cardBg: '#202020',
    elevatedBg: '#292929',
    hoverBg: '#303030',
    inputBg: '#181818',
    border: '#333333'
  }
];

export interface AppearanceSettings {
  colorMode: ColorMode;
  darkPreset: DarkThemePresetId;
  accentColor: string;
  density: InterfaceDensity;
  fontSize: InterfaceFontSize;
  fontFamily: TypographyStack;
  cornerRadius: CornerRadiusStyle;
  contrast: InterfaceContrast;
  motion: MotionMode;
  sidebarDensity: SidebarDensity;
  sidebarBehavior: SidebarBehavior;
  tabStyle: TabStyle;
}

export const DEFAULT_APPEARANCE_SETTINGS: AppearanceSettings = {
  colorMode: 'dark',
  darkPreset: 'soft-black',
  accentColor: '#F97316',
  density: 'comfortable',
  fontSize: 'default',
  fontFamily: 'inter',
  cornerRadius: 'rounded',
  contrast: 'standard',
  motion: 'full',
  sidebarDensity: 'default',
  sidebarBehavior: 'expanded',
  tabStyle: 'standard',
};

export const ACCENT_PRESETS = [
  { id: 'green', name: 'Emerald Green (Default)', hex: '#10B981', hoverHex: '#059669', softHex: '#ECFDF5', darkSoftHex: 'rgba(16, 185, 129, 0.15)', glowHex: 'rgba(16, 185, 129, 0.35)' },
  { id: 'outtricks-blue', name: 'Outtricks Blue', hex: '#2563EB', hoverHex: '#1D4ED8', softHex: '#EFF6FF', darkSoftHex: 'rgba(37, 99, 235, 0.15)', glowHex: 'rgba(37, 99, 235, 0.35)' },
  { id: 'electric-blue', name: 'Electric Blue', hex: '#0066FF', hoverHex: '#0052CC', softHex: '#EBF3FF', darkSoftHex: 'rgba(0, 102, 255, 0.15)', glowHex: 'rgba(0, 102, 255, 0.35)' },
  { id: 'indigo', name: 'Indigo', hex: '#6366F1', hoverHex: '#4F46E5', softHex: '#EEF2FF', darkSoftHex: 'rgba(99, 102, 241, 0.15)', glowHex: 'rgba(99, 102, 241, 0.35)' },
  { id: 'purple', name: 'Purple', hex: '#8B5CF6', hoverHex: '#7C3AED', softHex: '#F5F3FF', darkSoftHex: 'rgba(139, 92, 246, 0.15)', glowHex: 'rgba(139, 92, 246, 0.35)' },
  { id: 'violet', name: 'Violet', hex: '#A855F7', hoverHex: '#9333EA', softHex: '#FAF5FF', darkSoftHex: 'rgba(168, 85, 247, 0.15)', glowHex: 'rgba(168, 85, 247, 0.35)' },
  { id: 'cyan', name: 'Cyan', hex: '#06B6D4', hoverHex: '#0891B2', softHex: '#ECFEFF', darkSoftHex: 'rgba(6, 182, 212, 0.15)', glowHex: 'rgba(6, 182, 212, 0.35)' },
  { id: 'teal', name: 'Teal', hex: '#0D9488', hoverHex: '#0F766E', softHex: '#F0FDFA', darkSoftHex: 'rgba(13, 148, 136, 0.15)', glowHex: 'rgba(13, 148, 136, 0.35)' },
  { id: 'orange', name: 'Orange', hex: '#F97316', hoverHex: '#EA580C', softHex: '#FFF7ED', darkSoftHex: 'rgba(249, 115, 22, 0.15)', glowHex: 'rgba(249, 115, 22, 0.35)' },
  { id: 'rose', name: 'Rose', hex: '#F43F5E', hoverHex: '#E11D48', softHex: '#FFF1F2', darkSoftHex: 'rgba(244, 63, 94, 0.15)', glowHex: 'rgba(244, 63, 94, 0.35)' },
];

export const FONT_STACKS: Record<TypographyStack, string> = {
  'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'plus-jakarta': "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  'sf-pro': "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
};

const STORAGE_KEY = 'outtricks_appearance_settings_v2';

interface ThemeContextType {
  theme: 'light' | 'dark'; // Computed active theme
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleTheme: () => void;
  
  darkPreset: DarkThemePresetId;
  setDarkPreset: (preset: DarkThemePresetId) => void;
  
  accentColor: string;
  setAccentColor: (color: string) => void;
  
  density: InterfaceDensity;
  setDensity: (density: InterfaceDensity) => void;
  
  fontSize: InterfaceFontSize;
  setFontSize: (size: InterfaceFontSize) => void;
  
  fontFamily: TypographyStack;
  setFontFamily: (font: TypographyStack) => void;
  
  cornerRadius: CornerRadiusStyle;
  setCornerRadius: (radius: CornerRadiusStyle) => void;
  
  contrast: InterfaceContrast;
  setContrast: (contrast: InterfaceContrast) => void;
  
  motion: MotionMode;
  setMotion: (motion: MotionMode) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  sidebarDensity: SidebarDensity;
  setSidebarDensity: (density: SidebarDensity) => void;
  
  sidebarBehavior: SidebarBehavior;
  setSidebarBehavior: (behavior: SidebarBehavior) => void;
  
  tabStyle: TabStyle;
  setTabStyle: (style: TabStyle) => void;
  
  resetAppearanceDefaults: () => void;
  settings: AppearanceSettings;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to calculate RGB components, dark/light luminance, hover, active, and alpha tints
export function parseHex(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) return null;
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function adjustBrightness(hex: string, percent: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const adjust = (val: number) => {
    const res = Math.round(val + (255 * (percent / 100)));
    return Math.max(0, Math.min(255, res));
  };
  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return `rgba(16, 185, 129, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppearanceSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_APPEARANCE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load appearance settings from localStorage', e);
    }
    return DEFAULT_APPEARANCE_SETTINGS;
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);

  // Compute active theme ('light' or 'dark')
  const theme: 'light' | 'dark' = settings.colorMode === 'system' ? systemTheme : settings.colorMode;

  // Listen for OS color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply all design tokens and classes to document element
  useEffect(() => {
    const root = document.documentElement;

    // 1. Dark / Light class & Neutral Dark Theme Preset
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');

      const preset = DARK_THEME_PRESETS.find(p => p.id === settings.darkPreset) || DARK_THEME_PRESETS[0];
      root.style.setProperty('--color-bg-main', preset.appBg);
      root.style.setProperty('--color-bg-primary', preset.surfaceBg);
      root.style.setProperty('--color-bg-card', preset.cardBg);
      root.style.setProperty('--color-bg-elevated', preset.elevatedBg);
      root.style.setProperty('--color-bg-hover', preset.hoverBg);
      root.style.setProperty('--color-bg-input', preset.inputBg);
      root.style.setProperty('--color-border-default', preset.border);
      root.style.setProperty('--color-text-primary', '#FFFFFF');
      root.style.setProperty('--color-text-secondary', '#B5B5B5');
      root.style.setProperty('--color-text-muted', '#777777');
      root.style.setProperty('--color-text-disabled', '#555555');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.setProperty('--color-bg-main', '#FFFFFF');
      root.style.setProperty('--color-bg-primary', '#F8FAFC');
      root.style.setProperty('--color-bg-card', '#FFFFFF');
      root.style.setProperty('--color-bg-elevated', '#FFFFFF');
      root.style.setProperty('--color-bg-hover', '#F1F5F9');
      root.style.setProperty('--color-bg-input', '#F8FAFC');
      root.style.setProperty('--color-border-default', '#E2E8F0');
      root.style.setProperty('--color-text-primary', '#0B1020');
      root.style.setProperty('--color-text-secondary', '#475569');
      root.style.setProperty('--color-text-muted', '#94A3B8');
      root.style.setProperty('--color-text-disabled', '#CBD5E1');
    }

    // 2. Accent Color & Centralized Tokens
    const foundPreset = ACCENT_PRESETS.find(p => p.hex.toLowerCase() === settings.accentColor.toLowerCase());
    const accentHex = settings.accentColor || '#F97316';
    const rgbObj = parseHex(accentHex) || { r: 249, g: 115, b: 22 };
    const rgbString = `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`;
    const rgbSpaceString = `${rgbObj.r} ${rgbObj.g} ${rgbObj.b}`;

    const accentHover = foundPreset ? foundPreset.hoverHex : adjustBrightness(accentHex, -14);
    const accentActive = adjustBrightness(accentHex, -24);
    const accentGlow = foundPreset ? foundPreset.glowHex : `rgba(${rgbString}, 0.35)`;
    const accentSoft = theme === 'dark' 
      ? (foundPreset ? foundPreset.darkSoftHex : `rgba(${rgbString}, 0.15)`)
      : (foundPreset ? foundPreset.softHex : `rgba(${rgbString}, 0.1)`);
    const accentBorder = theme === 'dark' ? `rgba(${rgbString}, 0.3)` : `rgba(${rgbString}, 0.25)`;
    const activeBg = theme === 'dark' ? `rgba(${rgbString}, 0.12)` : `rgba(${rgbString}, 0.08)`;
    const focusRing = theme === 'dark' ? `rgba(${rgbString}, 0.35)` : `rgba(${rgbString}, 0.25)`;

    // Centralized Design Tokens (Per Master Theme Architecture)
    root.style.setProperty('--accent-primary', accentHex);
    root.style.setProperty('--accent-primary-hover', accentHover);
    root.style.setProperty('--accent-primary-active', accentActive);
    root.style.setProperty('--accent-primary-soft', accentSoft);
    root.style.setProperty('--accent-primary-muted', activeBg);
    root.style.setProperty('--accent-primary-border', accentBorder);
    root.style.setProperty('--accent-primary-text', accentHex);
    root.style.setProperty('--accent-focus', focusRing);
    root.style.setProperty('--accent-ring', focusRing);
    root.style.setProperty('--accent-glow', accentGlow);

    // Primary aliases
    root.style.setProperty('--primary-rgb', rgbSpaceString);
    root.style.setProperty('--primary', accentHex);
    root.style.setProperty('--primary-hover', accentHover);
    root.style.setProperty('--primary-active', accentActive);
    root.style.setProperty('--primary-muted', accentSoft);
    root.style.setProperty('--primary-soft', accentSoft);
    root.style.setProperty('--primary-border', accentBorder);
    root.style.setProperty('--primary-glow', accentGlow);
    root.style.setProperty('--active-background', activeBg);
    root.style.setProperty('--focus-ring', focusRing);

    // Semantic Status Tokens
    root.style.setProperty('--success', '#10B981');
    root.style.setProperty('--success-hover', '#059669');
    root.style.setProperty('--success-soft', 'rgba(16, 185, 129, 0.12)');
    root.style.setProperty('--success-border', 'rgba(16, 185, 129, 0.3)');

    root.style.setProperty('--warning', '#F59E0B');
    root.style.setProperty('--warning-hover', '#D97706');
    root.style.setProperty('--warning-soft', 'rgba(245, 158, 11, 0.12)');
    root.style.setProperty('--warning-border', 'rgba(245, 158, 11, 0.3)');

    root.style.setProperty('--error', '#EF4444');
    root.style.setProperty('--error-hover', '#DC2626');
    root.style.setProperty('--error-soft', 'rgba(239, 68, 68, 0.12)');
    root.style.setProperty('--error-border', 'rgba(239, 68, 68, 0.3)');

    root.style.setProperty('--info', '#3B82F6');
    root.style.setProperty('--info-hover', '#2563EB');
    root.style.setProperty('--info-soft', 'rgba(59, 130, 246, 0.12)');
    root.style.setProperty('--info-border', 'rgba(59, 130, 246, 0.3)');

    // Backwards-compatible aliases
    root.style.setProperty('--color-primary', accentHex);
    root.style.setProperty('--color-primary-hover', accentHover);
    root.style.setProperty('--color-primary-active', accentActive);
    root.style.setProperty('--color-primary-soft', accentSoft);
    root.style.setProperty('--color-primary-border', accentBorder);
    root.style.setProperty('--color-primary-glow', accentGlow);
    root.style.setProperty('--accent', accentHex);
    root.style.setProperty('--accent-hover', accentHover);
    root.style.setProperty('--accent-light', accentSoft);
    root.style.setProperty('--accent-border', accentHex);
    root.style.setProperty('--accent-text', accentHex);

    // 3. Typography Stack
    const fontStack = FONT_STACKS[settings.fontFamily] || FONT_STACKS.inter;
    root.style.setProperty('--font-sans', fontStack);
    document.body.style.fontFamily = fontStack;

    // 4. Font Scaling
    const fontSizes: Record<InterfaceFontSize, string> = {
      'sm': '14px',
      'default': '16px',
      'lg': '17.5px',
      'xl': '19px',
    };
    root.style.fontSize = fontSizes[settings.fontSize] || '16px';
    root.style.setProperty('--font-scale', fontSizes[settings.fontSize] || '16px');

    // 5. Corner Radius Tokens & Classes
    root.classList.remove('radius-sharp', 'radius-subtle', 'radius-rounded', 'radius-extra-rounded');
    root.classList.add(`radius-${settings.cornerRadius}`);

    const radiusMap: Record<CornerRadiusStyle, { sm: string; md: string; lg: string; xl: string; '2xl': string; '3xl': string }> = {
      'sharp': { sm: '2px', md: '4px', lg: '4px', xl: '6px', '2xl': '8px', '3xl': '10px' },
      'subtle': { sm: '4px', md: '6px', lg: '8px', xl: '10px', '2xl': '14px', '3xl': '18px' },
      'rounded': { sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', '3xl': '32px' },
      'extra-rounded': { sm: '8px', md: '12px', lg: '16px', xl: '24px', '2xl': '32px', '3xl': '44px' },
    };
    const rad = radiusMap[settings.cornerRadius] || radiusMap.rounded;
    root.style.setProperty('--radius-sm', rad.sm);
    root.style.setProperty('--radius-md', rad.md);
    root.style.setProperty('--radius-lg', rad.lg);
    root.style.setProperty('--radius-xl', rad.xl);
    root.style.setProperty('--radius-2xl', rad['2xl']);
    root.style.setProperty('--radius-3xl', rad['3xl']);

    // 6. Density Classes
    root.classList.remove('density-compact', 'density-comfortable', 'density-spacious');
    root.classList.add(`density-${settings.density}`);

    // 7. Contrast Classes
    root.classList.remove('contrast-high', 'contrast-standard');
    root.classList.add(`contrast-${settings.contrast}`);

    // 8. Motion Classes
    root.classList.remove('motion-full', 'motion-reduced', 'motion-none');
    root.classList.add(`motion-${settings.motion}`);

    // 9. Tab Style Classes
    root.classList.remove('tab-style-standard', 'tab-style-compact', 'tab-style-minimal');
    root.classList.add(`tab-style-${settings.tabStyle}`);

    // 10. Sidebar Classes
    root.classList.remove('sidebar-compact', 'sidebar-default', 'sidebar-comfortable');
    root.classList.add(`sidebar-${settings.sidebarDensity}`);

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save appearance settings to localStorage', e);
    }
  }, [settings, theme]);

  // Setters
  const setColorMode = useCallback((colorMode: ColorMode) => {
    setSettings(prev => ({ ...prev, colorMode }));
  }, []);

  const setDarkPreset = useCallback((darkPreset: DarkThemePresetId) => {
    setSettings(prev => ({ ...prev, darkPreset }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings(prev => {
      const current = prev.colorMode === 'system' ? systemTheme : prev.colorMode;
      const next = current === 'dark' ? 'light' : 'dark';
      return { ...prev, colorMode: next };
    });
  }, [systemTheme]);

  const setAccentColor = useCallback((accentColor: string) => {
    setSettings(prev => ({ ...prev, accentColor }));
  }, []);

  const setDensity = useCallback((density: InterfaceDensity) => {
    setSettings(prev => ({ ...prev, density }));
  }, []);

  const setFontSize = useCallback((fontSize: InterfaceFontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  }, []);

  const setFontFamily = useCallback((fontFamily: TypographyStack) => {
    setSettings(prev => ({ ...prev, fontFamily }));
  }, []);

  const setCornerRadius = useCallback((cornerRadius: CornerRadiusStyle) => {
    setSettings(prev => ({ ...prev, cornerRadius }));
  }, []);

  const setContrast = useCallback((contrast: InterfaceContrast) => {
    setSettings(prev => ({ ...prev, contrast }));
  }, []);

  const setMotion = useCallback((motion: MotionMode) => {
    setSettings(prev => ({ ...prev, motion }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setSettings(prev => ({ ...prev, motion: prev.motion === 'reduced' ? 'full' : 'reduced' }));
  }, []);

  const setSidebarDensity = useCallback((sidebarDensity: SidebarDensity) => {
    setSettings(prev => ({ ...prev, sidebarDensity }));
  }, []);

  const setSidebarBehavior = useCallback((sidebarBehavior: SidebarBehavior) => {
    setSettings(prev => ({ ...prev, sidebarBehavior }));
  }, []);

  const setTabStyle = useCallback((tabStyle: TabStyle) => {
    setSettings(prev => ({ ...prev, tabStyle }));
  }, []);

  const resetAppearanceDefaults = useCallback(() => {
    setSettings(DEFAULT_APPEARANCE_SETTINGS);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorMode: settings.colorMode,
        setColorMode,
        toggleTheme,
        darkPreset: settings.darkPreset || 'soft-black',
        setDarkPreset,
        accentColor: settings.accentColor,
        setAccentColor,
        density: settings.density,
        setDensity,
        fontSize: settings.fontSize,
        setFontSize,
        fontFamily: settings.fontFamily,
        setFontFamily,
        cornerRadius: settings.cornerRadius,
        setCornerRadius,
        contrast: settings.contrast,
        setContrast,
        motion: settings.motion,
        setMotion,
        reducedMotion: settings.motion === 'reduced' || settings.motion === 'none',
        toggleReducedMotion,
        sidebarDensity: settings.sidebarDensity,
        setSidebarDensity,
        sidebarBehavior: settings.sidebarBehavior,
        setSidebarBehavior,
        tabStyle: settings.tabStyle,
        setTabStyle,
        resetAppearanceDefaults,
        settings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useAppearance = useTheme;
