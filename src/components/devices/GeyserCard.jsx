import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Flame, Power, Clock, Zap, ArrowUp, ShieldCheck } from 'lucide-react';

export default function GeyserCard() {
  const { devices, toggleDevice, triggerGeyserPreheat } = useDashboard();
  const geyser = devices.geyser;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between ${
        geyser.isOn
          ? 'bg-gradient-to-br from-orange-950/60 via-slate-900/90 to-rose-950/50 border-orange-500/50 shadow-xl shadow-orange-950/40 glow-amber'
          : 'bg-slate-900/60 border-slate-800/80 opacity-70'
      }`}
    >
      {/* Decorative Orange Radial Accent */}
      {geyser.isOn && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/15 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
      )}

      <div>
        {/* Header with Title & Power Toggle */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                geyser.isOn
                  ? geyser.isPreheating
                    ? 'bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 text-white shadow-lg shadow-rose-500/40 ring-2 ring-rose-400/40 animate-pulse'
                    : 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/30'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700'
              }`}
            >
              <Flame className={`w-5 h-5 ${geyser.isOn && geyser.isPreheating ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm tracking-tight">
                {geyser.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-orange-200/80 font-medium">{geyser.room}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {geyser.isOn ? (geyser.isPreheating ? '2400W Boost' : '2000W') : '0W'}
                </span>
              </div>
            </div>
          </div>

          {/* Power Toggle Switch */}
          <button
            onClick={() => toggleDevice('geyser')}
            aria-label="Toggle Smart Water Geyser"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              geyser.isOn ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                geyser.isOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto-Timer & Current Water Temp Display */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-orange-500/20 relative z-10 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-orange-200/70 uppercase tracking-wider">Heating Schedule</span>
            <span className="text-[11px] font-mono font-bold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40">
              {geyser.isOn ? 'Cycle Running' : 'Standby'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-xl font-mono font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
                  {geyser.isOn ? `${geyser.timerMinutes} mins` : '--'}
                </div>
                <div className="text-[11px] text-orange-200/70">
                  {geyser.isOn ? 'auto-off timer' : 'Timer paused'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-mono font-black text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                {geyser.currentWaterTemp}°C
              </div>
              <div className="text-[11px] text-slate-300 font-semibold">
                Target: {geyser.targetWaterTemp}°C
              </div>
            </div>
          </div>

          {/* Heating Progress Bar */}
          <div className="mt-3.5 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                geyser.isPreheating
                  ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 animate-pulse shadow-md shadow-rose-500/50'
                  : 'bg-gradient-to-r from-orange-400 to-amber-400 shadow-md shadow-orange-500/40'
              }`}
              style={{
                width: geyser.isOn ? `${Math.min(100, (geyser.timerMinutes / 30) * 100)}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* Quick Preheat Button */}
        <div className="mt-4 relative z-10">
          <button
            onClick={triggerGeyserPreheat}
            className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
              geyser.isPreheating
                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white shadow-xl shadow-rose-500/40 ring-2 ring-rose-400/50 animate-pulse'
                : 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/25'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>
              {geyser.isPreheating ? 'Preheat Boost Active (65°C)' : 'Quick Preheat Boost'}
            </span>
          </button>
        </div>
      </div>

      {/* Safety & Tank Spec */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Anti-Scald Protection</span>
        </span>
        <span className="text-[11px] font-mono font-bold text-orange-300">Cap: 50L Enamel</span>
      </div>
    </div>
  );
}
