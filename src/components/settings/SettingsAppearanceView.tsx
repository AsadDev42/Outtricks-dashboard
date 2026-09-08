import React from 'react';
import { 
  Moon, 
  Sun, 
  Monitor, 
  Palette, 
  RotateCcw, 
  Check,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  useAppearance, 
  ColorMode, 
  ACCENT_PRESETS
} from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { SettingsMouseCursorView } from './SettingsMouseCursorView';

export const SettingsAppearanceView: React.FC = () => {
  const { 
    theme,
    colorMode, 
    setColorMode,
    accentColor, 
    setAccentColor,
    resetAppearanceDefaults,
  } = useAppearance();

  const { success, info } = useToast();

  const handleReset = () => {
    resetAppearanceDefaults();
    info('Appearance settings restored to platform factory defaults.', 'Appearance Reset');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight">
                Platform Appearance & Visual Tokens
              </h2>
              <Badge variant="primary" size="sm">
                Active: {theme === 'dark' ? 'Neutral Dark' : 'Light Mode'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time customization of color modes and brand accent palettes across the platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset to Default
          </Button>
        </div>
      </div>

      {/* 2. Theme Foundation & Palette */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-slate-950 dark:text-white">
              Theme Foundation & Color Palette
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Mode: {colorMode.toUpperCase()}
          </span>
        </div>

        {/* Color Theme Mode Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Color Theme Mode
            </label>
            <span className="text-[11px] text-slate-400">
              {colorMode === 'dark' ? 'Dark theme active' : colorMode === 'light' ? 'Light theme active' : 'System auto active'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'dark' as ColorMode, title: 'Neutral Dark', desc: 'Deep black & grey surfaces without blue tint', icon: Moon },
              { id: 'light' as ColorMode, title: 'Light Mode', desc: 'Crisp high-readability daylight workspace', icon: Sun },
              { id: 'system' as ColorMode, title: 'System Auto', desc: 'Synchronizes with operating system preference', icon: Monitor },
            ].map((item) => {
              const isSelected = colorMode === item.id;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setColorMode(item.id);
                    success(`Switched theme mode to ${item.title}.`, 'Theme Updated');
                  }}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-primary/80 bg-primary/[0.06] dark:bg-primary/[0.12] text-slate-950 dark:text-white shadow-xs ring-1 ring-primary/30'
                      : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838] hover:bg-slate-50 dark:hover:bg-[#1E1E1E]'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isSelected ? 'bg-primary text-white' : 'bg-slate-200/70 dark:bg-[#262626] text-slate-500 dark:text-slate-400'
                  }`}>
                    <ItemIcon className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0 pr-5">
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {item.desc}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Accent Palette */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Brand Accent Palette
              </label>
              <p className="text-[11px] text-slate-400">
                Drives buttons, active indicators, focus rings, and badges globally.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
              {accentColor.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ACCENT_PRESETS.map((acc) => {
              const isSelected = accentColor.toLowerCase() === acc.hex.toLowerCase();
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    setAccentColor(acc.hex);
                    success(`Accent color updated to ${acc.name}.`, 'Color Changed');
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                      : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0 border border-black/15 dark:border-white/20"
                    style={{ backgroundColor: acc.hex }}
                  />
                  <span className="font-medium text-[11px]">{acc.name.replace(' (Default)', '')}</span>
                  {isSelected && <Check className="w-3 h-3 text-primary ml-0.5" />}
                </button>
              );
            })}

            {/* Custom Hex Color Picker */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#262626] bg-slate-50/60 dark:bg-[#1A1A1A]/60">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                title="Custom Brand Accent Hex Picker"
              />
              <span className="text-[10px] text-slate-400 font-semibold">HEX:</span>
              <span className="font-mono text-[11px] text-slate-800 dark:text-slate-200 font-bold">
                {accentColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Embedded Mouse Cursor & Pointer FX Section */}
      <div className="pt-1">
        <SettingsMouseCursorView />
      </div>

    </div>
  );
};
