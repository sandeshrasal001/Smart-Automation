import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Shield, Power, Eye, Radio, Zap } from 'lucide-react';

export default function PorchLightCard() {
  const { devices, togglePorchLight } = useDashboard();
  const porch = devices.porchLight;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between ${
        porch.isOn
          ? 'bg-gradient-to-br from-violet-950/60 via-slate-900/90 to-indigo-950/50 border-violet-500/50 shadow-xl shadow-violet-950/40 glow-purple'
          : 'bg-slate-900/60 border-slate-800/80 opacity-70'
      }`}
    >
      {/* Decorative Violet Radial Accent */}
      {porch.isOn && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-violet-500/15 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
      )}

      <div>
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                porch.isOn
                  ? 'bg-gradient-to-tr from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-2 ring-violet-400/30'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700'
              }`}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm tracking-tight">
                {porch.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-violet-200/80 font-medium">{porch.room}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {porch.isOn ? '120W (2400 lm)' : '0W'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={togglePorchLight}
            aria-label="Toggle Porch Floodlight"
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              porch.isOn ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                porch.isOn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Motion Sensor Status */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-violet-500/20 relative z-10 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-violet-200/70 uppercase tracking-wider">PIR Motion Radar</span>
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                porch.motionDetected
                  ? 'bg-rose-500/25 text-rose-300 border-rose-500/50 animate-pulse shadow-sm shadow-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {porch.motionDetected ? '⚠️ Motion Sensed!' : 'Standby / Clear'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className={`w-4 h-4 ${porch.motionDetected ? 'text-rose-400' : 'text-violet-400'}`} />
              <span>Zone 4 (Driveway)</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-violet-300">Range: 12m (140°)</span>
          </div>

          <div className="mt-3.5 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                porch.isOn
                  ? 'bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 shadow-md shadow-violet-500/50'
                  : 'bg-slate-700'
              }`}
              style={{ width: porch.isOn ? '100%' : '0%' }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <Radio className="w-3.5 h-3.5 text-violet-400" />
          <span>Rule #2 Linked</span>
        </span>
        <span className="text-[11px] font-mono font-bold text-violet-300">Night Auto-Trigger</span>
      </div>
    </div>
  );
}
