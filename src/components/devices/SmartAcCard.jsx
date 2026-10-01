import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Thermometer,
  Power,
  Snowflake,
  Leaf,
  RefreshCw,
  Wind,
  Zap,
} from 'lucide-react';

const MODES = [
  {
    id: 'Cool',
    label: 'Cool',
    icon: Snowflake,
    activeClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 border-cyan-400',
    inactiveClass: 'border-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30',
  },
  {
    id: 'Eco',
    label: 'Eco',
    icon: Leaf,
    activeClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 border-emerald-400',
    inactiveClass: 'border-slate-800 text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/30',
  },
  {
    id: 'Auto',
    label: 'Auto',
    icon: RefreshCw,
    activeClass: 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md shadow-indigo-500/30 border-indigo-400',
    inactiveClass: 'border-slate-800 text-slate-400 hover:text-indigo-300 hover:bg-indigo-950/30',
  },
];

export default function SmartAcCard() {
  const { devices, toggleDevice, setAcTemperature, setAcMode, setAcFanSpeed } = useDashboard();
  const ac = devices.ac;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between ${
        ac.isOn
          ? 'bg-gradient-to-br from-cyan-950/60 via-slate-900/90 to-blue-950/50 border-cyan-500/50 shadow-xl shadow-cyan-950/40 glow-cyan'
          : 'bg-slate-900/60 border-slate-800/80 opacity-70'
      }`}
    >
      {/* Decorative Cyan Radial Accent */}
      {ac.isOn && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
      )}

      <div>
        {/* Header with Title, Room, and Power Toggle */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                ac.isOn
                  ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/30'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700'
              }`}
            >
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm tracking-tight">
                {ac.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-cyan-200/80 font-medium">{ac.room}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {ac.isOn ? (ac.mode === 'Eco' ? '650W' : '1400W') : '0W'}
                </span>
              </div>
            </div>
          </div>

          {/* Power Toggle Switch */}
          <button
            onClick={() => toggleDevice('ac')}
            aria-label="Toggle Smart AC"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              ac.isOn ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                ac.isOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Temperature Readout & Slider */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 relative z-10 shadow-inner">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-semibold text-cyan-200/70 uppercase tracking-wider">Target Temp</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl font-mono font-black tracking-tight transition-colors ${
                  ac.isOn ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400'
                }`}
              >
                {ac.temperature}
              </span>
              <span className="text-sm font-bold text-cyan-400">°C</span>
            </div>
          </div>

          {/* Interactive Range Slider (18°C - 30°C) */}
          <input
            type="range"
            min="18"
            max="30"
            step="1"
            value={ac.temperature}
            disabled={!ac.isOn}
            onChange={(e) => setAcTemperature(Number(e.target.value))}
            className="w-full slider-cyan"
            aria-label="AC Temperature Slider"
          />

          <div className="flex justify-between text-[10px] text-cyan-300/80 font-mono font-semibold mt-1">
            <span>18°C Min</span>
            <span>24°C Comfort</span>
            <span>30°C Max</span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mt-4 relative z-10">
          <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-200/80 block mb-2">
            Operating Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = ac.mode === mode.id;
              return (
                <button
                  key={mode.id}
                  disabled={!ac.isOn}
                  onClick={() => setAcMode(mode.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl border text-xs font-bold transition-all ${
                    !ac.isOn
                      ? 'border-slate-800 text-slate-500 opacity-60'
                      : isSelected
                      ? mode.activeClass
                      : mode.inactiveClass
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fan Speed Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fan Velocity</span>
        </span>
        <div className="flex gap-1">
          {['Low', 'Med', 'High'].map((speed) => (
            <button
              key={speed}
              disabled={!ac.isOn}
              onClick={() => setAcFanSpeed(speed)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                ac.fanSpeed === speed && ac.isOn
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
