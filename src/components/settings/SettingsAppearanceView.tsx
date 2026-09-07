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
  Check 
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
  ACCENT_PRESETS 
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

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Appearance, Theme & Visual Design Tokens
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time customization of color modes, neutral dark presets, brand accent palettes, typography scaling, viewport density, and motion physics.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleReset}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset to Default
        </Button>
      </div>

      {/* 1. Color Theme Mode */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              1. Color Theme Mode
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select between neutral black dark mode, crisp daylight light mode, or automatic operating system synchronization.
            </p>
          </div>
          <Badge variant="primary" size="sm">
            Active: {theme === 'dark' ? 'Neutral Dark Surface' : 'Light Surface'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'dark' as ColorMode, title: 'Neutral Dark (Black & Grey)', desc: 'Pure black, charcoal, and graphite surfaces without navy tint', icon: Moon },
            { id: 'light' as ColorMode, title: 'Light Mode', desc: 'Clean high-readability daylight workspace', icon: Sun },
            { id: 'system' as ColorMode, title: 'System Automatic', desc: 'Follows your OS prefers-color-scheme setting', icon: Monitor },
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
                className={`p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer min-h-[105px] ${
                  isSelected
                    ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] shadow-xs ring-2 ring-primary/20'
                    : 'border-slate-200/80 dark:border-[#2A2A2A] hover:bg-slate-50/60 dark:hover:bg-[#222222]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white text-xs">
                    <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                    {item.title}
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                </div>

                <div className="text-[11px] text-slate-500 leading-snug">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Neutral Dark Presets (Active in Dark Mode) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              2. Neutral Dark Presets (Black, Charcoal, Graphite, Soft Black)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Four calibrated neutral dark foundations free of blue/navy tint with high-contrast typography.
            </p>
          </div>
          <Badge variant="slate" size="sm">
            Active Preset: {DARK_THEME_PRESETS.find(p => p.id === (darkPreset || 'soft-black'))?.name || 'Soft Black'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer min-h-[95px] ${
                  isSelected
                    ? 'border-white bg-[#222222] shadow-md ring-2 ring-white/20'
                    : 'border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-[#121212] hover:bg-slate-100 dark:hover:bg-[#1C1C1C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">{preset.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>

                {/* Swatch Preview */}
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="w-3.5 h-3.5 rounded-md border border-white/20" style={{ backgroundColor: preset.appBg }} title={`App: ${preset.appBg}`} />
                  <span className="w-3.5 h-3.5 rounded-md border border-white/20" style={{ backgroundColor: preset.cardBg }} title={`Card: ${preset.cardBg}`} />
                  <span className="w-3.5 h-3.5 rounded-md border border-white/20" style={{ backgroundColor: preset.elevatedBg }} title={`Elevated: ${preset.elevatedBg}`} />
                  <span className="w-3.5 h-3.5 rounded-md border border-white/20" style={{ backgroundColor: preset.border }} title={`Border: ${preset.border}`} />
                  <span className="text-[10px] font-mono text-slate-400 ml-auto">{preset.appBg}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Brand Accent Palette */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            3. Brand Accent Palette (10 Presets + Custom Hex)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Drives primary buttons, active navigation, focus rings, selected badges, and AI indicators globally.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                    : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full shadow-xs border border-black/10 shrink-0"
                  style={{ backgroundColor: acc.hex }}
                />
                <span className="font-medium">{acc.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary ml-0.5" />}
              </button>
            );
          })}

          {/* Custom Hex Color Picker */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C]">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
              title="Custom Brand Accent Hex Picker"
            />
            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 font-bold">
              {accentColor.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Density & Typography Scaling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Interface Density */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              4. Interface Density & Spacing
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust card padding, table row heights, and layout margins globally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { id: 'compact' as InterfaceDensity, title: 'Compact', desc: 'Denser cards and tables' },
              { id: 'comfortable' as InterfaceDensity, title: 'Comfortable', desc: 'Standard SaaS balance' },
              { id: 'spacious' as InterfaceDensity, title: 'Spacious', desc: 'Generous padding & gaps' },
            ].map((d) => {
              const isSelected = density === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDensity(d.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{d.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{d.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interface Text Size */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              5. Interface Text Scale
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Global typography base scale token (--font-scale).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'sm' as InterfaceFontSize, title: 'Small', desc: '14px base scale' },
              { id: 'default' as InterfaceFontSize, title: 'Default', desc: '16px base scale' },
              { id: 'lg' as InterfaceFontSize, title: 'Large', desc: '17.5px base scale' },
              { id: 'xl' as InterfaceFontSize, title: 'Extra Large', desc: '19px base scale' },
            ].map((f) => {
              const isSelected = fontSize === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontSize(f.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-1.5 transition-all cursor-pointer min-h-[85px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{f.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{f.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Typography Stack & Corner Radius */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Typography Stack */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              6. Typography Font Stack
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Native high-performance UI typography stacks with zero layout shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 'inter' as TypographyStack, title: 'Inter (Default)', desc: 'Clean, crisp modern SaaS typeface' },
              { id: 'plus-jakarta' as TypographyStack, title: 'Plus Jakarta Sans', desc: 'Geometric neo-grotesque modern' },
              { id: 'system' as TypographyStack, title: 'System Default', desc: 'OS native font rendering engine' },
              { id: 'sf-pro' as TypographyStack, title: 'SF Pro Stack', desc: 'Apple platform typography aesthetics' },
            ].map((font) => {
              const isSelected = fontFamily === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => setFontFamily(font.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{font.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{font.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Corner Radius */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              7. Corner Radius & Geometry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sets the curvature of cards, buttons, modals, and input fields.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'sharp' as CornerRadiusStyle, title: 'Sharp', desc: '0px - 4px minimal' },
              { id: 'subtle' as CornerRadiusStyle, title: 'Subtle', desc: '6px - 10px slight' },
              { id: 'rounded' as CornerRadiusStyle, title: 'Rounded', desc: '12px - 24px standard' },
              { id: 'extra-rounded' as CornerRadiusStyle, title: 'Extra', desc: '20px - 36px smooth' },
            ].map((r) => {
              const isSelected = cornerRadius === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setCornerRadius(r.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-1.5 transition-all cursor-pointer min-h-[85px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{r.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{r.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 6. UI Contrast & Motion Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Contrast */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              8. Visual Contrast
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enhance border definition and text contrast for maximum accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 'standard' as InterfaceContrast, title: 'Standard Contrast', desc: 'Default balanced SaaS borders' },
              { id: 'high' as InterfaceContrast, title: 'High Contrast', desc: 'Prominent borders & deeper text hierarchy' },
            ].map((c) => {
              const isSelected = contrast === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setContrast(c.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{c.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{c.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motion & Animations */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              9. Animation & Transitions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Controls micro-interactions, modal transitions, and chart animations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { id: 'full' as MotionMode, title: 'Full Motion', desc: '150ms smooth micro-interactions' },
              { id: 'reduced' as MotionMode, title: 'Reduced', desc: '80ms swift minimal transitions' },
              { id: 'none' as MotionMode, title: 'No Motion', desc: '0ms instant zero-lag state changes' },
            ].map((m) => {
              const isSelected = motion === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMotion(m.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{m.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 7. Sidebar & Top Tab Style Customization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Sidebar Density */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              10. Primary Sidebar Spacing
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Spacing between left navigation module icons and sub-items.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { id: 'compact' as SidebarDensity, title: 'Compact', desc: 'Tight vertical icon gaps' },
              { id: 'default' as SidebarDensity, title: 'Default', desc: 'Standard 6px navigation rail' },
              { id: 'comfortable' as SidebarDensity, title: 'Comfortable', desc: 'Spacious icon gaps' },
            ].map((sd) => {
              const isSelected = sidebarDensity === sd.id;
              return (
                <button
                  key={sd.id}
                  type="button"
                  onClick={() => setSidebarDensity(sd.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{sd.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{sd.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Style */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              11. Application Top Tab Style
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual styling of Chrome-style workspace tabs at the top.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { id: 'standard' as TabStyle, title: 'Standard', desc: 'Chrome-style rounded pills' },
              { id: 'compact' as TabStyle, title: 'Compact', desc: 'Slim height & compact font' },
              { id: 'minimal' as TabStyle, title: 'Minimal', desc: 'Clean borderless with underline' },
            ].map((ts) => {
              const isSelected = tabStyle === ts.id;
              return (
                <button
                  key={ts.id}
                  type="button"
                  onClick={() => setTabStyle(ts.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[90px] ${
                    isSelected
                      ? 'border-primary bg-primary-muted/20 dark:bg-white/[0.06] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-primary/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{ts.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{ts.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 8. Live Real-Time Design System Interactive Preview */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-[#121212] border-2 border-dashed border-primary/30 dark:border-primary/25 shadow-xs space-y-5 text-xs font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-[#202020]">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Live Design System Theme Preview
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Immediately updates as you adjust theme, brand accent, corner radius, density, and contrast tokens above.
              </p>
            </div>
          </div>
          <Badge variant="primary" size="sm">
            Live Token Synchronization
          </Badge>
        </div>

        {/* Preview Sandbox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Buttons & Accent Color */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white">Action Buttons</div>
            <p className="text-[11px] text-slate-500">Primary action inherits your active brand accent palette.</p>
            <div className="flex flex-wrap items-center gap-2">
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
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white">Interactive Tab Pills</div>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#1C1C1C] rounded-xl border border-slate-200/60 dark:border-[#202020]">
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

          {/* Card 3: Form Input & Text Scale */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white">Form Field Styling</div>
            <input
              type="text"
              value={previewInput}
              onChange={(e) => setPreviewInput(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Selected Theme Mode:</span>
              <strong className="text-slate-900 dark:text-white capitalize">{theme} ({colorMode})</strong>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Mouse Cursor & Pointer FX Section */}
      <div className="pt-2">
        <SettingsMouseCursorView />
      </div>

    </div>
  );
};
