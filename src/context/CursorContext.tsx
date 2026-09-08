import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type CursorStyleId = 
  | 'default'
  | 'precision'
  | 'crosshair'
  | 'glow'
  | 'minimal-glow'
  | 'soft-glow'
  | 'neon'
  | 'neon-glow'
  | 'pulse'
  | 'focus-ring'
  | 'trail'
  | 'magnetic'
  | 'dot'
  | 'ring'
  | 'spotlight';

export type CursorGlowIntensity = 'none' | 'subtle' | 'soft' | 'medium' | 'strong' | 'neon';

export type CursorGlowColor = 'blue' | 'purple' | 'cyan' | 'white' | 'green' | 'pink' | string;

export type CursorSize = 'sm' | 'md' | 'lg' | 'xl';

export type CursorMotion = 'standard' | 'smooth' | 'very-smooth';

export interface CursorInteractionEffects {
  hoverGlow: boolean;
  clickRipple: boolean;
  magneticHover: boolean;
  buttonHighlight: boolean;
  trailEffect: boolean;
}

export interface CursorSettings {
  style: CursorStyleId;
  glowIntensity: CursorGlowIntensity;
  glowColor: CursorGlowColor;
  customColorHex?: string;
  size: CursorSize;
  motion: CursorMotion;
  effects: CursorInteractionEffects;
}

export const DEFAULT_CURSOR_SETTINGS: CursorSettings = {
  style: 'default',
  glowIntensity: 'none',
  glowColor: 'white',
  customColorHex: '#FFFFFF',
  size: 'md',
  motion: 'standard',
  effects: {
    hoverGlow: false,
    clickRipple: false,
    magneticHover: false,
    buttonHighlight: false,
    trailEffect: false,
  },
};

const STORAGE_KEY = 'outtricks_cursor_settings_v2';

interface CursorContextType {
  settings: CursorSettings;
  setStyle: (style: CursorStyleId) => void;
  setGlowIntensity: (intensity: CursorGlowIntensity) => void;
  setGlowColor: (color: CursorGlowColor) => void;
  setCustomColorHex: (hex: string) => void;
  setSize: (size: CursorSize) => void;
  setMotion: (motion: CursorMotion) => void;
  setEffectToggle: (effectKey: keyof CursorInteractionEffects, enabled: boolean) => void;
  resetToDefault: () => void;
  getComputedGlowColor: () => string;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const GLOW_COLOR_MAP: Record<string, string> = {
  blue: '#3B82F6',
  purple: '#8B5CF6',
  cyan: '#06B6D4',
  white: '#FFFFFF',
  green: '#10B981',
  pink: '#EC4899',
};

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CursorSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CURSOR_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load cursor settings from localStorage', e);
    }
    return DEFAULT_CURSOR_SETTINGS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to persist cursor settings to localStorage', e);
    }
  }, [settings]);

  const setStyle = useCallback((style: CursorStyleId) => {
    setSettings((prev) => {
      // If user picks a specific style, smartly configure default glow if needed
      let newIntensity = prev.glowIntensity;
      let newEffects = { ...prev.effects };

      if (style === 'glow' && newIntensity === 'none') newIntensity = 'soft';
      if (style === 'soft-glow' && (newIntensity === 'none' || newIntensity === 'subtle')) newIntensity = 'soft';
      if (style === 'neon') newIntensity = 'neon';
      if (style === 'pulse' && newIntensity === 'none') newIntensity = 'medium';
      if (style === 'spotlight' && (newIntensity === 'none' || newIntensity === 'subtle')) newIntensity = 'strong';
      if (style === 'magnetic') newEffects.magneticHover = true;
      if (style === 'trail') newEffects.trailEffect = true;

      return {
        ...prev,
        style,
        glowIntensity: newIntensity,
        effects: newEffects,
      };
    });
  }, []);

  const setGlowIntensity = useCallback((glowIntensity: CursorGlowIntensity) => {
    setSettings((prev) => ({ ...prev, glowIntensity }));
  }, []);

  const setGlowColor = useCallback((glowColor: CursorGlowColor) => {
    setSettings((prev) => ({ ...prev, glowColor }));
  }, []);

  const setCustomColorHex = useCallback((customColorHex: string) => {
    setSettings((prev) => ({ ...prev, glowColor: 'custom', customColorHex }));
  }, []);

  const setSize = useCallback((size: CursorSize) => {
    setSettings((prev) => ({ ...prev, size }));
  }, []);

  const setMotion = useCallback((motion: CursorMotion) => {
    setSettings((prev) => ({ ...prev, motion }));
  }, []);

  const setEffectToggle = useCallback((effectKey: keyof CursorInteractionEffects, enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effectKey]: enabled,
      },
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    setSettings(DEFAULT_CURSOR_SETTINGS);
  }, []);

  const getComputedGlowColor = useCallback(() => {
    if (settings.glowColor === 'custom' && settings.customColorHex) {
      return settings.customColorHex;
    }
    return GLOW_COLOR_MAP[settings.glowColor] || '#FFFFFF';
  }, [settings.glowColor, settings.customColorHex]);

  return (
    <CursorContext.Provider
      value={{
        settings,
        setStyle,
        setGlowIntensity,
        setGlowColor,
        setCustomColorHex,
        setSize,
        setMotion,
        setEffectToggle,
        resetToDefault,
        getComputedGlowColor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
