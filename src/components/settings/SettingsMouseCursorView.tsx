import React from 'react';
import { 
  MousePointer, 
  Crosshair, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Zap,
  Target,
  Circle,
  Sun,
  Activity,
  Flame,
  Radio,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useCursor, CursorStyleId, CursorGlowIntensity } from '../../context/CursorContext';
import { useToast } from '../../context/ToastContext';

export const SettingsMouseCursorView: React.FC = () => {
  const { 
    settings, 
    setStyle, 
    setGlowIntensity, 
    setGlowColor, 
    setCustomColorHex,
    setEffectToggle, 
    resetToDefault,
    getComputedGlowColor
  } = useCursor();

  const { success, info } = useToast();

  const CURSOR_STYLES: { id: CursorStyleId; title: string; desc: string; icon: any }[] = [
    { id: 'default', title: 'Platform Default', desc: 'Standard system cursor', icon: MousePointer },
    { id: 'precision', title: 'Precision Crosshair', desc: 'Fine reticle for tables & charts', icon: Crosshair },
    { id: 'glow', title: 'Minimal Blue Glow', desc: 'Classic pointer with blue halo', icon: Sparkles },
    { id: 'soft-glow', title: 'Soft Glow Pointer', desc: 'Pointer with radial halo', icon: Sun },
    { id: 'neon', title: 'Neon Blue', desc: 'High-luminance bright flare', icon: Zap },
    { id: 'pulse', title: 'Electric Pulse', desc: 'Concentric pulse waves', icon: Activity },
    { id: 'focus-ring', title: 'Focus Ring', desc: 'Agile trailing ring', icon: Radio },
    { id: 'trail', title: 'Trail Cursor', desc: '5-particle trajectory', icon: Flame },
    { id: 'magnetic', title: 'Magnetic Glow', desc: 'Reactive button hover glow', icon: Target },
    { id: 'dot', title: 'Dot Cursor', desc: 'Minimalist precision dot', icon: Circle },
    { id: 'ring', title: 'Ring Cursor', desc: 'Hollow reticle with center point', icon: Target },
    { id: 'spotlight', title: 'Spotlight Cursor', desc: 'Ambient flashlight beam', icon: Sun },
  ];

  const GLOW_INTENSITIES: { id: CursorGlowIntensity; title: string; desc: string }[] = [
    { id: 'none', title: 'None', desc: '0px' },
    { id: 'subtle', title: 'Subtle', desc: '24px' },
    { id: 'soft', title: 'Soft', desc: '40px' },
    { id: 'medium', title: 'Medium', desc: '60px' },
    { id: 'strong', title: 'Strong', desc: '85px' },
    { id: 'neon', title: 'Neon', desc: '115px' },
  ];

  const COLOR_PRESETS: { id: string; name: string; hex: string }[] = [
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'purple', name: 'Purple', hex: '#8B5CF6' },
    { id: 'cyan', name: 'Cyan', hex: '#06B6D4' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'green', name: 'Green', hex: '#10B981' },
    { id: 'pink', name: 'Pink', hex: '#EC4899' },
  ];

  const handleReset = () => {
    resetToDefault();
    info('Mouse cursor restored to platform factory defaults.', 'Cursor Reset');
  };

  const activeColorHex = getComputedGlowColor();

  return (
    <div className="space-y-4 font-sans text-xs">
      
      {/* 1. Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <MousePointer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Cursor & Pointer Customization
              </h2>
              <Badge variant="emerald" size="sm">
                Active: {CURSOR_STYLES.find(s => s.id === settings.style)?.title}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant hardware tracking, centered glow halos, and interaction dynamics across Outtricks.
            </p>
          </div>
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

      {/* 2. Cursor Styles Grid (12 Compact Cards) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              1. Select Cursor Style
            </h3>
            <p className="text-[11px] text-slate-500">
              Choose from 12 styles or keep the platform system default.
            </p>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            12 Options
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {CURSOR_STYLES.map((st) => {
            const Icon = st.icon;
            const isSelected = settings.style === st.id;

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setStyle(st.id);
                  success(`Cursor style updated to ${st.title}.`, 'Cursor Updated');
                }}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/[0.08] shadow-xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200/70 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] hover:bg-slate-50/50 dark:hover:bg-white/[0.02]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white text-xs truncate">
                    {st.title}
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    {st.desc}
                  </p>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Glow Intensity & Color (Compact 2-Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Glow Intensity */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              2. Glow Intensity
            </h3>
            <p className="text-[11px] text-slate-500">
              Concentric radial blur radius & ambient halo luminescence.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {GLOW_INTENSITIES.map((g) => {
              const isSelected = settings.glowIntensity === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGlowIntensity(g.id)}
                  className={`py-2 px-1 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/20 font-bold'
                      : 'border-slate-200/70 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="text-xs">{g.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">{g.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glow Color Selector */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              3. Glow & Particle Color
            </h3>
            <p className="text-[11px] text-slate-500">
              Pick a calibrated neon preset or enter a custom hex color.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {COLOR_PRESETS.map((c) => {
              const isSelected = settings.glowColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setGlowColor(c.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/[0.08] font-bold text-slate-900 dark:text-white ring-1 ring-emerald-500/20'
                      : 'border-slate-200/70 dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-0.5" />}
                </button>
              );
            })}

            {/* Custom Color Input */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <input
                type="color"
                value={activeColorHex}
                onChange={(e) => setCustomColorHex(e.target.value)}
                className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                title="Custom Hex Color Picker"
              />
              <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300 font-bold">
                {activeColorHex.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Interaction Dynamics & Effect Toggles */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
            4. Interactive Physics & Dynamics
          </h3>
          <p className="text-[11px] text-slate-500">
            Contextual micro-interactions and visual feedback across the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          
          {/* Hover Glow */}
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white truncate">Hover Glow Expansion</div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Expands halo when hovering controls</p>
            </div>
            <Switch
              checked={settings.effects.hoverGlow}
              onChange={(val) => setEffectToggle('hoverGlow', val)}
            />
          </div>

          {/* Click Ripple */}
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white truncate">Click Ripple Animation</div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Expanding wave on mouse click</p>
            </div>
            <Switch
              checked={settings.effects.clickRipple}
              onChange={(val) => setEffectToggle('clickRipple', val)}
            />
          </div>

          {/* Magnetic Hover */}
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white truncate">Magnetic Reticle Snapping</div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Focus ring snaps to targets</p>
            </div>
            <Switch
              checked={settings.effects.magneticHover}
              onChange={(val) => setEffectToggle('magneticHover', val)}
            />
          </div>

          {/* Button Highlight */}
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white truncate">Button Aura Highlight</div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Illuminates active button borders</p>
            </div>
            <Switch
              checked={settings.effects.buttonHighlight}
              onChange={(val) => setEffectToggle('buttonHighlight', val)}
            />
          </div>

          {/* Trail Effect */}
          <div className="p-3 rounded-xl bg-slate-50/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-white truncate">Trail Particles Stream</div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">5-point trajectory trail</p>
            </div>
            <Switch
              checked={settings.effects.trailEffect}
              onChange={(val) => setEffectToggle('trailEffect', val)}
            />
          </div>

        </div>
      </div>

    </div>
  );
};
