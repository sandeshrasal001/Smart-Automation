import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Sun, Power, Sparkles, Moon, Flame } from 'lucide-react';

const PRESETS = [
  {
    id: 'Warm',
    label: 'Warm 2700K',
    color: 'bg-gradient-to-r from-amber-400 to-orange-500',
    activeClass: 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 text-amber-200 border-amber-400/60 shadow-md shadow-amber-500/20',
  },
  {
    id: 'Daylight',
    label: 'Day 4000K',
    color: 'bg-gradient-to-r from-yellow-200 to-amber-300',
    activeClass: 'bg-gradient-to-r from-yellow-400/25 to-amber-400/25 text-yellow-200 border-yellow-300/60 shadow-md shadow-yellow-500/20',
  },
  {
    id: 'Cool',
    label: 'Cool 6500K',
    color: 'bg-gradient-to-r from-cyan-300 to-blue-400',
    activeClass: 'bg-gradient-to-r from-cyan-400/25 to-blue-400/25 text-cyan-200 border-cyan-400/60 shadow-md shadow-cyan-500/20',
  },
  {
    id: 'Amber',
    label: 'Amber Relax',
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    activeClass: 'bg-gradient-to-r from-orange-500/25 to-red-500/25 text-orange-200 border-orange-400/60 shadow-md shadow-orange-500/20',
  },
];

export default function LightingCard() {
  const { devices, toggleDevice, setLightBrightness, setLightColorTemp } = useDashboard();
  const light = devices.livingLight;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between ${
        light.isOn
          ? 'bg-gradient-to-br from-amber-950/60 via-slate-900/90 to-orange-950/50 border-amber-500/50 shadow-xl shadow-amber-950/40 glow-amber'
          : 'bg-slate-900/60 border-slate-800/80 opacity-70'
      }`}
    >
      {/* Decorative Golden Radial Accent */}
      {light.isOn && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
      )}

      <div>
        {/* Header with Title, Room & Toggle */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                light.isOn
                  ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/30'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700'
              }`}
            >
              <Sun className={`w-5 h-5 ${light.isOn ? 'animate-spin-slow' : ''}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm tracking-tight">
                {light.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-amber-200/80 font-medium">{light.room}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {light.isOn ? `${Math.round((light.brightness / 100) * 65)}W` : '0W'}
                </span>
              </div>
            </div>
          </div>

          {/* Power Toggle Switch */}
          <button
            onClick={() => toggleDevice('livingLight')}
            aria-label="Toggle Living Room Lighting"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              light.isOn ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                light.isOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Dynamic Multi-color Glow Strip */}
        <div className="mt-4 h-2.5 rounded-full overflow-hidden bg-slate-950 border border-amber-500/30 p-[1px] relative z-10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 rounded-full transition-all duration-300 shadow-md"
            style={{
              width: light.isOn ? `${light.brightness}%` : '0%',
              boxShadow: light.isOn ? '0 0 16px rgba(245, 158, 11, 0.8)' : 'none',
            }}
          />
        </div>

        {/* Brightness Slider */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 relative z-10 shadow-inner">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-semibold text-amber-200/70 uppercase tracking-wider">Illumination Level</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl font-mono font-black tracking-tight transition-colors ${
                  light.isOn ? 'text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'text-slate-400'
                }`}
              >
                {light.isOn ? light.brightness : 0}
              </span>
              <span className="text-sm font-bold text-amber-400">%</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={light.isOn ? light.brightness : 0}
            disabled={!light.isOn}
            onChange={(e) => setLightBrightness(Number(e.target.value))}
            className="w-full slider-amber"
            aria-label="Lighting Brightness Slider"
          />

          <div className="flex justify-between text-[10px] text-amber-300/80 font-mono font-semibold mt-1">
            <span>0% Off</span>
            <span>50% Ambient</span>
            <span>100% Full Glow</span>
          </div>
        </div>

        {/* Warmth & Color Presets */}
        <div className="mt-4 relative z-10">
          <label className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80 block mb-2">
            Color Spectrum Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => {
              const isSelected = light.colorTemp === preset.id;
              return (
                <button
                  key={preset.id}
                  disabled={!light.isOn}
                  onClick={() => setLightColorTemp(preset.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    !light.isOn
                      ? 'border-slate-800 text-slate-500 opacity-60'
                      : isSelected
                      ? preset.activeClass
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-amber-200 hover:bg-slate-850'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full shadow-sm shrink-0 ${preset.color}`} />
                  <span className="truncate">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Color CRI 98+</span>
        </span>
        <span className="text-[11px] font-mono font-bold text-amber-300">Smooth PWM Dimming</span>
      </div>
    </div>
  );
}
