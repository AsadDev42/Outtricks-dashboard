import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Monitor, 
  Palette, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  Zap, 
  Check,
  Type,
  Layers,
  Sliders,
  Sparkles,
  PauseCircle,
  Square
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  useAppearance, 
  ColorMode, 
  DARK_THEME_PRESETS,
  InterfaceDensity, 
  InterfaceFontSize, 
  TypographyStack, 
  CornerRadiusStyle, 
  InterfaceContrast, 
  MotionMode, 
  SidebarDensity, 
  TabStyle,
  ACCENT_PRESETS,
  FONT_STACKS
} from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { SettingsMouseCursorView } from './SettingsMouseCursorView';

export const SettingsAppearanceView: React.FC = () => {
  const { 
    theme,
    colorMode, 
    setColorMode,
    darkPreset,
    setDarkPreset,
    accentColor, 
    setAccentColor,
    density, 
    setDensity,
    fontSize, 
    setFontSize,
    fontFamily, 
    setFontFamily,
    cornerRadius, 
    setCornerRadius,
    contrast, 
    setContrast,
    motion, 
    setMotion,
    sidebarDensity, 
    setSidebarDensity,
    tabStyle, 
    setTabStyle,
    resetAppearanceDefaults,
  } = useAppearance();

  const { success, info } = useToast();

  const [previewInput, setPreviewInput] = useState('Sarah Jenkins');
  const [previewTab, setPreviewTab] = useState<'campaigns' | 'deals' | 'analytics'>('campaigns');

  const handleReset = () => {
    resetAppearanceDefaults();
    info('Appearance settings restored to platform factory defaults.', 'Appearance Reset');
  };

  const currentDarkPreset = DARK_THEME_PRESETS.find(p => p.id === (darkPreset || 'soft-black')) || DARK_THEME_PRESETS[0];

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
              Real-time customization of color modes, dark surface foundations, brand accent palettes, typography, and interface chrome.
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

        {/* Neutral Dark Presets */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Neutral Dark Foundation Presets
              </label>
              <p className="text-[11px] text-slate-400">
                Calibrated pure dark foundations without navy or blue tints.
              </p>
            </div>
            <span className="text-[11px] font-mono text-primary">
              {currentDarkPreset.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DARK_THEME_PRESETS.map((preset) => {
              const isSelected = (darkPreset || 'soft-black') === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setDarkPreset(preset.id);
                    success(`Dark theme preset changed to ${preset.name}.`, 'Preset Applied');
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2.5 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-primary/80 bg-slate-900 text-white shadow-xs ring-1 ring-primary/30'
                      : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/50 dark:bg-[#181818] hover:border-slate-300 dark:hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs truncate text-slate-900 dark:text-white">
                      {preset.name.replace(' (Default)', '')}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>

                  {/* Visual Swatch Row */}
                  <div className="flex items-center justify-between gap-1 p-1.5 rounded-lg bg-black/40 border border-white/[0.08]">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: preset.appBg }} title={`App Bg: ${preset.appBg}`} />
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: preset.cardBg }} title={`Card Bg: ${preset.cardBg}`} />
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: preset.elevatedBg }} title={`Elevated: ${preset.elevatedBg}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {preset.appBg}
                    </span>
                  </div>
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

      {/* 3. Typography & Scaling */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-slate-950 dark:text-white">
              Typography & Interface Scaling
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {fontFamily.toUpperCase()} • {density.toUpperCase()}
          </span>
        </div>

        {/* Font Stack */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Typography Font Stack
            </label>
            <span className="text-[11px] text-slate-400">
              Native high-performance typefaces with zero layout shifts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'inter' as TypographyStack, title: 'Inter', desc: 'Clean, crisp modern SaaS typeface' },
              { id: 'plus-jakarta' as TypographyStack, title: 'Plus Jakarta Sans', desc: 'Geometric neo-grotesque modern' },
              { id: 'system' as TypographyStack, title: 'System Default', desc: 'OS native font rendering engine' },
              { id: 'sf-pro' as TypographyStack, title: 'SF Pro Stack', desc: 'Apple platform typography aesthetics' },
            ].map((font) => {
              const isSelected = fontFamily === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => {
                    setFontFamily(font.id);
                    success(`Font stack changed to ${font.title}.`, 'Typography Updated');
                  }}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-primary/80 bg-primary/[0.06] dark:bg-primary/[0.12] text-slate-950 dark:text-white shadow-xs ring-1 ring-primary/30'
                      : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                      style={{ fontFamily: FONT_STACKS[font.id] }}
                    >
                      Aa
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-950 dark:text-white">
                      {font.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {font.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Scale & Interface Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          
          {/* Text Size Scale */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Interface Text Scale
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {fontSize === 'sm' ? '14px' : fontSize === 'default' ? '16px' : fontSize === 'lg' ? '17.5px' : '19px'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'sm' as InterfaceFontSize, label: 'Small', px: '14px', sampleSize: 'text-[11px]' },
                { id: 'default' as InterfaceFontSize, label: 'Default', px: '16px', sampleSize: 'text-xs' },
                { id: 'lg' as InterfaceFontSize, label: 'Large', px: '17.5px', sampleSize: 'text-sm' },
                { id: 'xl' as InterfaceFontSize, label: 'XL', px: '19px', sampleSize: 'text-base' },
              ].map((f) => {
                const isSelected = fontSize === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontSize(f.id)}
                    className={`py-2.5 px-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <span className={`font-bold ${f.sampleSize} leading-none`}>Aa</span>
                    <span className="text-[11px] font-semibold">{f.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">{f.px}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interface Density */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Interface Density & Spacing
              </label>
              <span className="text-[11px] text-slate-400 capitalize">
                {density}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'compact' as InterfaceDensity, title: 'Compact', hint: 'Dense tables & lists' },
                { id: 'comfortable' as InterfaceDensity, title: 'Comfortable', hint: 'Balanced SaaS standard' },
                { id: 'spacious' as InterfaceDensity, title: 'Spacious', hint: 'Relaxed gaps & margins' },
              ].map((d) => {
                const isSelected = density === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDensity(d.id)}
                    className={`py-2.5 px-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center gap-1 my-0.5">
                      <span className={`h-1.5 rounded-full bg-current ${d.id === 'compact' ? 'w-2' : d.id === 'comfortable' ? 'w-3.5' : 'w-5'}`} />
                      <span className={`h-1.5 rounded-full bg-current ${d.id === 'compact' ? 'w-2' : d.id === 'comfortable' ? 'w-3.5' : 'w-5'}`} />
                    </div>
                    <span className="text-[11px] font-semibold">{d.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-full">{d.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Surface & Geometry */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-slate-950 dark:text-white">
              Surface Geometry & Contrast
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {cornerRadius.toUpperCase()} • {contrast.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Corner Radius & Geometry */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Corner Radius & Curvature
              </label>
              <span className="text-[11px] text-slate-400">
                Curvature of cards, buttons, & inputs
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sharp' as CornerRadiusStyle, title: 'Sharp', radiusClass: 'rounded-none', range: '0-4px' },
                { id: 'subtle' as CornerRadiusStyle, title: 'Subtle', radiusClass: 'rounded-sm', range: '6-10px' },
                { id: 'rounded' as CornerRadiusStyle, title: 'Rounded', radiusClass: 'rounded-lg', range: '12-24px' },
                { id: 'extra-rounded' as CornerRadiusStyle, title: 'Extra', radiusClass: 'rounded-2xl', range: '20-36px' },
              ].map((r) => {
                const isSelected = cornerRadius === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setCornerRadius(r.id)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className={`w-8 h-8 border-2 border-current flex items-center justify-center ${r.radiusClass}`}>
                      <Square className="w-3.5 h-3.5 opacity-40" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-semibold">{r.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">{r.range}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Contrast */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Visual Contrast & Border Definition
              </label>
              <span className="text-[11px] text-slate-400">
                WCAG compliance & hierarchy depth
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'standard' as InterfaceContrast, title: 'Standard Contrast', desc: 'Balanced default SaaS border lines' },
                { id: 'high' as InterfaceContrast, title: 'High Contrast', desc: 'Enhanced borders & bold text hierarchy' },
              ].map((c) => {
                const isSelected = contrast === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setContrast(c.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{c.title}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {c.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 5. Navigation Chrome & Motion */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#222222]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-slate-950 dark:text-white">
              Navigation Chrome & Motion Physics
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {motion.toUpperCase()} • {sidebarDensity.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Animation & Transitions */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Animation & Transitions
              </label>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'full' as MotionMode, title: 'Full Motion', hint: '150ms micro-physics', icon: Zap },
                { id: 'reduced' as MotionMode, title: 'Reduced Motion', hint: '80ms swift transitions', icon: Sliders },
                { id: 'none' as MotionMode, title: 'No Motion', hint: '0ms instant state change', icon: PauseCircle },
              ].map((m) => {
                const isSelected = motion === m.id;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMotion(m.id)}
                    className={`w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <div>
                        <div className="text-xs font-semibold">{m.title}</div>
                        <div className="text-[10px] text-slate-400">{m.hint}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Sidebar Spacing */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Primary Sidebar Spacing
              </label>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'compact' as SidebarDensity, title: 'Compact Rail', hint: 'Tight vertical icon gaps' },
                { id: 'default' as SidebarDensity, title: 'Standard Rail', hint: 'Default 6px item spacing' },
                { id: 'comfortable' as SidebarDensity, title: 'Comfortable Rail', hint: 'Spacious icon gaps' },
              ].map((sd) => {
                const isSelected = sidebarDensity === sd.id;
                return (
                  <button
                    key={sd.id}
                    type="button"
                    onClick={() => setSidebarDensity(sd.id)}
                    className={`w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{sd.title}</div>
                      <div className="text-[10px] text-slate-400">{sd.hint}</div>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Application Top Tab Style */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Application Top Tab Style
              </label>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'standard' as TabStyle, title: 'Standard Pills', hint: 'Chrome-style rounded tabs' },
                { id: 'compact' as TabStyle, title: 'Compact Tabs', hint: 'Slim height & compact typography' },
                { id: 'minimal' as TabStyle, title: 'Minimal Line', hint: 'Clean borderless with active underline' },
              ].map((ts) => {
                const isSelected = tabStyle === ts.id;
                return (
                  <button
                    key={ts.id}
                    type="button"
                    onClick={() => setTabStyle(ts.id)}
                    className={`w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary/80 bg-primary/[0.08] dark:bg-primary/[0.15] text-slate-950 dark:text-white font-bold shadow-xs ring-1 ring-primary/30'
                        : 'border-slate-200/80 dark:border-[#262626] bg-slate-50/40 dark:bg-[#1A1A1A]/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{ts.title}</div>
                      <div className="text-[10px] text-slate-400">{ts.hint}</div>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 6. Live Real-Time Design System Interactive Preview */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-[#131313] border-2 border-dashed border-primary/30 dark:border-primary/25 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-[#222222]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                Live Design System Interactive Preview
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Immediately updates as you adjust theme mode, brand accent, corner radius, density, and typography above.
              </p>
            </div>
          </div>
          <Badge variant="primary" size="sm">
            Live Token Sync Active
          </Badge>
        </div>

        {/* Preview Sandbox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          
          {/* Card 1: Buttons & Accent Color */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-2.5">
            <div className="font-bold text-xs text-slate-900 dark:text-white">Action Buttons</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Primary action inherits your active brand accent palette.</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Primary CTA
              </Button>
              <Button
                variant="secondary"
                size="sm"
              >
                Secondary
              </Button>
            </div>
          </div>

          {/* Card 2: Interactive Tabs & Navigation */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-2.5">
            <div className="font-bold text-xs text-slate-900 dark:text-white">Interactive Tab Pills</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Previews tab style and active color feedback.</p>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#202020] rounded-xl border border-slate-200/60 dark:border-[#282828] pt-1">
              {(['campaigns', 'deals', 'analytics'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPreviewTab(t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    previewTab === t
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Form Field Styling */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] shadow-xs space-y-2.5">
            <div className="font-bold text-xs text-slate-900 dark:text-white">Form Field Styling</div>
            <input
              type="text"
              value={previewInput}
              onChange={(e) => setPreviewInput(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
              <span>Theme Mode:</span>
              <strong className="text-slate-900 dark:text-white capitalize">{theme} ({colorMode})</strong>
            </div>
          </div>

        </div>
      </div>

      {/* 7. Embedded Mouse Cursor & Pointer FX Section */}
      <div className="pt-1">
        <SettingsMouseCursorView />
      </div>

    </div>
  );
};
