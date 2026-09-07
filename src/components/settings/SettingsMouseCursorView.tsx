import React, { useState } from 'react';
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
  Sliders,
  Check,
  Palette,
  Eye
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useCursor, CursorStyleId, CursorGlowIntensity, CursorGlowColor, CursorSize, CursorMotion, GLOW_COLOR_MAP } from '../../context/CursorContext';
import { useToast } from '../../context/ToastContext';

export const SettingsMouseCursorView: React.FC = () => {
  const { 
    settings, 
    setStyle, 
    setGlowIntensity, 
    setGlowColor, 
    setCustomColorHex,
    setSize, 
    setMotion, 
    setEffectToggle, 
    resetToDefault,
    getComputedGlowColor
  } = useCursor();

  const { success, info } = useToast();

  const [previewInputText, setPreviewInputText] = useState('');
  const [previewToggle, setPreviewToggle] = useState(true);
  const [previewClickCount, setPreviewClickCount] = useState(0);

  const CURSOR_STYLES: { id: CursorStyleId; title: string; desc: string; icon: any }[] = [
    { id: 'default', title: 'Platform Default', desc: 'Standard system cursor without custom graphics', icon: MousePointer },
    { id: 'precision', title: 'Precision Crosshair', desc: 'Fine reticle for dense table and chart analysis', icon: Crosshair },
    { id: 'glow', title: 'Minimal Blue Glow', desc: 'Classic pointer with subtle ambient blue halo', icon: Sparkles },
    { id: 'soft-glow', title: 'Soft Glow Pointer', desc: 'Pointer with wider atmospheric radial halo', icon: Sun },
    { id: 'neon', title: 'Neon Blue', desc: 'High-luminance bright neon pointer with outer flare', icon: Zap },
    { id: 'pulse', title: 'Electric Pulse', desc: 'Rhythmic expanding concentric pulse waves', icon: Activity },
    { id: 'focus-ring', title: 'Focus Ring', desc: 'Agile trailing circular ring following pointer', icon: Radio },
    { id: 'trail', title: 'Trail Cursor', desc: 'Smooth lightweight 5-particle fading trajectory', icon: Flame },
    { id: 'magnetic', title: 'Magnetic Glow', desc: 'Reactive glow that expands around buttons and cards', icon: Target },
    { id: 'dot', title: 'Dot Cursor', desc: 'Minimalist solid precision dot for clean navigation', icon: Circle },
    { id: 'ring', title: 'Ring Cursor', desc: 'Smooth circular hollow reticle with center point', icon: Target },
    { id: 'spotlight', title: 'Spotlight Cursor', desc: 'Ambient radial flashlight illuminating the UI', icon: Sun },
  ];

  const GLOW_INTENSITIES: { id: CursorGlowIntensity; title: string; desc: string }[] = [
    { id: 'none', title: 'No Glow', desc: '0px halo' },
    { id: 'subtle', title: 'Subtle', desc: '20px radial' },
    { id: 'soft', title: 'Soft', desc: '36px radial' },
    { id: 'medium', title: 'Medium', desc: '55px radial' },
    { id: 'strong', title: 'Strong', desc: '80px radial' },
    { id: 'neon', title: 'Neon', desc: '110px flare' },
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
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Mouse Cursor Customization & Interaction Dynamics
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time interactive pointer styles, ambient glow physics, click ripples, and magnetic hover tracking.
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

      {/* 2. Cursor Styles Grid (12 Cards) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              1. Select Cursor Style (12 Options)
            </h3>
            <p className="text-xs text-slate-500">
              Click a card to immediately activate the pointer style globally across the entire Outtricks platform.
            </p>
          </div>
          <Badge variant="emerald" size="sm">
            Active: {CURSOR_STYLES.find(s => s.id === settings.style)?.title}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
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
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer min-h-[110px] ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-white/[0.04] shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                        : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </div>

                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                    {st.title}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {st.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Glow Customization & Color Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Glow Intensity */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              2. Cursor Glow Intensity
            </h3>
            <p className="text-xs text-slate-500">
              Adjust the ambient radial blur radius and halo luminescence.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {GLOW_INTENSITIES.map((g) => {
              const isSelected = settings.glowIntensity === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGlowIntensity(g.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-1 transition-all cursor-pointer min-h-[70px] ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-white/[0.04] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{g.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{g.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glow Color Selector */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              3. Glow & Particle Color
            </h3>
            <p className="text-xs text-slate-500">
              Pick a calibrated neon preset or enter a custom brand hex color.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {COLOR_PRESETS.map((c) => {
              const isSelected = settings.glowColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setGlowColor(c.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-white/[0.04] font-bold text-slate-900 dark:text-white shadow-xs'
                      : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-0.5" />}
                </button>
              );
            })}

            {/* Custom Color Input */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C]">
              <input
                type="color"
                value={activeColorHex}
                onChange={(e) => setCustomColorHex(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                title="Custom Hex Color Picker"
              />
              <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300 font-bold">
                {activeColorHex.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Size & Motion Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Scale Size */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              4. Cursor Scale & Size
            </h3>
            <p className="text-xs text-slate-500">
              Control the geometric dimensions of the custom pointer overlay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'sm' as CursorSize, title: 'Small', desc: '16px compact' },
              { id: 'md' as CursorSize, title: 'Medium', desc: '24px standard' },
              { id: 'lg' as CursorSize, title: 'Large', desc: '32px expanded' },
              { id: 'xl' as CursorSize, title: 'Extra Large', desc: '40px prominent' },
            ].map((sz) => {
              const isSelected = settings.size === sz.id;
              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setSize(sz.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-1.5 transition-all cursor-pointer min-h-[80px] ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-white/[0.04] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{sz.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{sz.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motion Smoothness */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
              5. Cursor Motion Smoothness
            </h3>
            <p className="text-xs text-slate-500">
              Visual interpolation physics (lerp smoothing) for custom cursor tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { id: 'standard' as CursorMotion, title: 'Standard', desc: '1:1 Instant 0ms Lag' },
              { id: 'smooth' as CursorMotion, title: 'Smooth', desc: 'Fluid Spring Lerp' },
              { id: 'very-smooth' as CursorMotion, title: 'Very Smooth', desc: 'Inertia Aerodynamic' },
            ].map((m) => {
              const isSelected = settings.motion === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMotion(m.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer min-h-[85px] ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-white/[0.04] font-bold text-slate-900 dark:text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-950 dark:text-white">{m.title}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Interaction Dynamics & Effect Toggles */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            6. Interactive Physics & Dynamics Toggles
          </h3>
          <p className="text-xs text-slate-500">
            Enable or disable contextual micro-interactions across the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          
          {/* Hover Glow */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Hover Glow Expansion</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Glow halo expands 40% when hovering buttons and links</p>
            </div>
            <Switch
              checked={settings.effects.hoverGlow}
              onChange={(val) => setEffectToggle('hoverGlow', val)}
            />
          </div>

          {/* Click Ripple */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Click Ripple Animation</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Generates expanding circular acoustic ripple wave upon click</p>
            </div>
            <Switch
              checked={settings.effects.clickRipple}
              onChange={(val) => setEffectToggle('clickRipple', val)}
            />
          </div>

          {/* Magnetic Hover */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Magnetic Reticle Snapping</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Focus ring smoothly binds to interactive target contours</p>
            </div>
            <Switch
              checked={settings.effects.magneticHover}
              onChange={(val) => setEffectToggle('magneticHover', val)}
            />
          </div>

          {/* Button Highlight */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Button Aura Highlight</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Illuminates active button borders with dynamic glow color</p>
            </div>
            <Switch
              checked={settings.effects.buttonHighlight}
              onChange={(val) => setEffectToggle('buttonHighlight', val)}
            />
          </div>

          {/* Trail Effect */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Trail Particles Stream</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Fading multi-point particle trajectory following cursor</p>
            </div>
            <Switch
              checked={settings.effects.trailEffect}
              onChange={(val) => setEffectToggle('trailEffect', val)}
            />
          </div>

        </div>
      </div>

      {/* 6. Live Interactive Playground Preview Zone */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border-2 border-dashed border-emerald-500/30 dark:border-emerald-500/20 shadow-xs space-y-5 text-xs font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-[#202020]">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                Interactive Cursor Preview Zone
              </h3>
              <p className="text-xs text-slate-500">
                Move your mouse around this area to test real-time pointer rendering, click ripples, and magnetic states.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span>Clicks Registered: <strong className="text-emerald-600 dark:text-emerald-400">{previewClickCount}</strong></span>
          </div>
        </div>

        {/* Playground Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Buttons & Click Testing */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white">Button Controls</div>
            <p className="text-[11px] text-slate-500">Hover and click buttons to trigger acoustic ripple waves.</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setPreviewClickCount((c) => c + 1)}
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Primary Button
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPreviewClickCount((c) => c + 1)}
              >
                Secondary
              </Button>
            </div>
          </div>

          {/* Card 2: Interactive Card & Hover States */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Interactive Card Target
              </div>
              <Badge variant="emerald" size="sm">Hover Me</Badge>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Demonstrates magnetic snapping and ambient glow illumination on card bounds.
            </p>
          </div>

          {/* Card 3: Form Fields & Text Caret Verification */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white">Input & Caret Testing</div>
            <input
              type="text"
              placeholder="Hover here to verify natural I-beam text caret..."
              value={previewInputText}
              onChange={(e) => setPreviewInputText(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">Toggle Switch State</span>
              <Switch checked={previewToggle} onChange={setPreviewToggle} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
